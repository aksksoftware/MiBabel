/* MiBabel - Exportador PDF.
 *
 * Convierte el documento intermedio (NoteDoc) en un PDF con pdf-lib que
 * conserva el formato visual de la nota: negrita/cursiva/subrayado/tachado
 * (con las 4 variantes reales de Noto Sans), color, resaltado, tamano,
 * alineacion (incluido justificado), titulos, listas anidadas con
 * checkboxes, tablas reales con bordes y paginacion, imagenes con
 * proporcion, ecuaciones rasterizadas, fondo de papel (color + renglones /
 * cuadricula / puntos) y saltos de pagina seguros.
 *
 * No lee nada del DOM ni de script.js. Todo lo externo llega por `deps`:
 *
 *   deps.fetchFont(kind) -> Promise<ArrayBuffer|Uint8Array>
 *        kind: 'regular' | 'bold' | 'italic' | 'boldItalic'
 *   deps.loadImageBytes(ref) -> Promise<{bytes, width, height} | null>
 *   deps.renderEquation(latex, display, maxWidthPx)
 *        -> Promise<{bytes, width, height} | null>
 *
 * Arquitectura: parse (NoteDoc) -> preparar texto (filtro de glifos) ->
 * recolectar medios -> layout (items de flujo con altura) -> paginacion ->
 * dibujo. El layout se hace una sola vez con metricas reales de la fuente.
 */
(function (global) {
  'use strict';

  /* A4 en puntos, margenes como el exportador original (spec 10). */
  var PAGE_W = 595.28;
  var PAGE_H = 841.89;
  var MARGIN = 50;
  var CONTENT_W = PAGE_W - MARGIN * 2;
  var TOP_Y = PAGE_H - MARGIN;
  var BOTTOM_Y = MARGIN;

  var BASE_PT = 11;
  var LINE_FACTOR = 1.4;
  var PARA_AFTER = 6;
  var LIST_INDENT = 20;
  var CELL_PAD = 5;
  var TABLE_FONT = 10;

  /* Unidad del patron de papel: 32px CSS -> 24pt. */
  var PAPER_UNIT_PT = 24;

  /* Sustituciones para glifos ausentes en Noto Sans (verificado por
   * cobertura con fontkit). Nunca se pierde el contenido: o hay un
   * equivalente legible o se cuenta en warnings. */
  var SUBSTITUTIONS = {
    '→': '->', '←': '<-', '↔': '<->', '↑': '^', '↓': 'v',
    '⇒': '=>', '⇐': '<=', '⇔': '<=>',
    '✓': '[ok]', '✔': '[ok]', '✗': '[x]', '✘': '[x]',
    '☐': '[ ]', '☑': '[x]',
    '∑': 'Σ', '∏': 'Π', '∆': 'Δ',
    '∫': 'S', '∂': 'd', '∀': 'A', '∈': 'in', '∅': 'Ø',
    '√': 'sqrt', '∞': 'oo',
    '≤': '<=', '≥': '>=', '≠': '!=', '≈': '~=',
    '◦': 'o', '▪': '-', '▪︎': '-',
    'ﬀ': 'ff', 'ﬁ': 'fi', 'ﬂ': 'fl', 'ﬃ': 'ffi', 'ﬄ': 'ffl'
  };

  function resolvePdfLib() {
    var P = global.PDFLib;
    if (!P || !P.PDFDocument) throw new Error('libreria PDF no disponible');
    return P;
  }

  function hexToRgb(P, hex) {
    var c = String(hex || '#000000');
    var m = c.match(/^#([0-9a-f]{6})$/i);
    if (!m) return P.rgb(0, 0, 0);
    return P.rgb(
      parseInt(m[1].substr(0, 2), 16) / 255,
      parseInt(m[1].substr(2, 2), 16) / 255,
      parseInt(m[1].substr(4, 2), 16) / 255
    );
  }

  /* ------------------------------------------------------------------ *
   * Fuentes
   * ------------------------------------------------------------------ */
  function loadFonts(P, deps, warnings) {
    var kinds = ['regular', 'bold', 'italic', 'boldItalic'];
    var jobs = kinds.map(function (kind) {
      if (typeof deps.fetchFont !== 'function') return Promise.resolve(null);
      return deps.fetchFont(kind).then(function (buf) {
        return buf ? { kind: kind, buf: buf } : null;
      }).catch(function () {
        warnings.push('fuente no cargada: ' + kind);
        return null;
      });
    });
    return Promise.all(jobs).then(function (arr) {
      return { slots: arr };
    });
  }

  /* Crea un PDFDocument temporal solo para incrustar y medir. El documento
   * final se crea despues; las fuentes se re-incrustan alli. Para no medir
   * dos veces se conservan los bytes y se reutilizan. */
  function embedFonts(P, pdfDoc, fontSlots, warnings) {
    var out = { faces: {}, fk: {}, synth: {} };
    var jobs = fontSlots.map(function (slot) {
      if (!slot) return Promise.resolve();
      /* subset:true reduce cada cara de ~620KB a unos pocos KB: solo viajan
       * los glifos usados. Decisivo en Android (spec 20). */
      return pdfDoc.embedFont(slot.buf, { subset: true }).then(function (font) {
        out.faces[slot.kind] = font;
      }).catch(function () {
        warnings.push('fuente no incrustada: ' + slot.kind);
      });
    });
    return Promise.all(jobs).then(function () {
      /* fontkit para cobertura de glifos (si esta disponible). */
      if (global.fontkit) {
        fontSlots.forEach(function (slot) {
          if (!slot) return;
          try { out.fk[slot.kind] = global.fontkit.create(slot.buf); } catch (e) { /* sin cobertura */ }
        });
      }
      /* Cadenas de reserva por estilo. */
      if (!out.faces.regular && P.StandardFonts) {
        return pdfDoc.embedFont(P.StandardFonts.Helvetica).then(function (f) {
          out.faces.regular = f;
          out.fallbackStandard = true;
          return out;
        });
      }
      return out;
    });
  }

  function faceFor(out, run) {
    var want = 'regular';
    if (run.bold && run.italic) want = 'boldItalic';
    else if (run.bold) want = 'bold';
    else if (run.italic) want = 'italic';
    if (out.faces[want]) return { font: out.faces[want], kind: want, synth: null };
    /* Reserva: Helvetica / Helvetica-Bold / Oblique. */
    if (out.std && out.std[want]) return { font: out.std[want], kind: want, synth: null };
    /* Ultimo recurso: negrita sintetizada con doble trazado. */
    if (want === 'bold' || want === 'boldItalic') {
      var base = out.faces.italic && (want === 'boldItalic' || run.italic) ? out.faces.italic : out.faces.regular;
      if (base) return { font: base, kind: 'regular', synth: 'bold' };
    }
    if (want === 'italic' && out.faces.regular) {
      return { font: out.faces.regular, kind: 'regular', synth: null };
    }
    return { font: out.faces.regular, kind: 'regular', synth: null };
  }

  function embedStandards(P, pdfDoc, out) {
    if (!P.StandardFonts || out.faces.bold || out.faces.italic) return Promise.resolve();
    var jobs = [];
    var map = {};
    if (!out.faces.bold) jobs.push(pdfDoc.embedFont(P.StandardFonts.HelveticaBold).then(function (f) { map.bold = f; }));
    if (!out.faces.italic) jobs.push(pdfDoc.embedFont(P.StandardFonts.HelveticaOblique).then(function (f) { map.italic = f; }));
    if (!out.faces.boldItalic) jobs.push(pdfDoc.embedFont(P.StandardFonts.HelveticaBoldOblique).then(function (f) { map.boldItalic = f; }));
    return Promise.all(jobs.map(function (j) { return j.catch(function () {}); })).then(function () {
      out.std = map;
    });
  }

  /* ------------------------------------------------------------------ *
   * Cobertura de glifos + filtro de texto
   * ------------------------------------------------------------------ */
  function buildCoverage(fonts, texts) {
    var cov = {}; /* kind -> {cp: true} */
    var needFk = Object.keys(fonts.fk).length > 0;
    if (!needFk) return null;
    var cps = {};
    texts.forEach(function (t) {
      var s = String(t || '');
      for (var i = 0; i < s.length; i++) {
        var cp = s.codePointAt(i);
        cps[cp] = true;
        if (cp > 0xFFFF) i++;
      }
    });
    Object.keys(fonts.fk).forEach(function (kind) {
      var fk = fonts.fk[kind];
      var map = {};
      Object.keys(cps).forEach(function (cp) {
        try { map[cp] = !!fk.hasGlyphForCodePoint(Number(cp)); } catch (e) { map[cp] = true; }
      });
      cov[kind] = map;
    });
    return cov;
  }

  function filterText(text, kind, coverage, stats) {
    var s = String(text === null || text === undefined ? '' : text);
    if (!coverage || !coverage[kind]) return s;
    var map = coverage[kind];
    var out = '';
    for (var i = 0; i < s.length; i++) {
      var cp = s.codePointAt(i);
      var ch = cp > 0xFFFF ? s.slice(i, i + 2) : s[i];
      if (cp > 0xFFFF) i++;
      if (map[cp]) { out += ch; continue; }
      if (SUBSTITUTIONS[ch] !== undefined) {
        out += SUBSTITUTIONS[ch];
        stats.substituted++;
      } else {
        /* Sin equivalente: se elimina pero se cuenta (spec 18). */
        stats.dropped++;
      }
    }
    return out;
  }

  function collectTexts(doc) {
    var arr = [];
    function runs(rs) { (rs || []).forEach(function (r) { if (r && r.type === 'text') arr.push(r.text); }); }
    function visit(b) {
      if (!b) return;
      if (b.runs) runs(b.runs);
      if (b.type === 'list') b.items.forEach(function (it) { (it.blocks || []).forEach(visit); });
      if (b.type === 'table') b.rows.forEach(function (row) {
        row.forEach(function (c) { if (c) (c.blocks || []).forEach(visit); });
      });
      if (b.type === 'image' && b.caption) b.caption.forEach(visit);
    }
    if (doc.title) arr.push(doc.title);
    (doc.blocks || []).forEach(visit);
    arr.push('• 0123456789 []');
    return arr;
  }

  /* Aplica el filtro a todos los runs de texto del documento (fresco por
   * exportacion, la mutacion es segura) y devuelve estadisticas. */
  function prepareText(doc, fonts) {
    var stats = { substituted: 0, dropped: 0 };
    var coverage = buildCoverage(fonts, collectTexts(doc));
    function runs(rs) {
      (rs || []).forEach(function (r) {
        if (!r || r.type !== 'text') return;
        var tmp = { bold: r.bold, italic: r.italic };
        var f = faceFor(fonts, tmp);
        r.text = filterText(r.text, f.kind, coverage, stats);
      });
    }
    function visit(b) {
      if (!b) return;
      if (b.runs) runs(b.runs);
      if (b.type === 'list') b.items.forEach(function (it) { (it.blocks || []).forEach(visit); });
      if (b.type === 'table') b.rows.forEach(function (row) {
        row.forEach(function (c) { if (c) (c.blocks || []).forEach(visit); });
      });
      if (b.type === 'image' && b.caption) b.caption.forEach(visit);
    }
    if (doc.title) {
      var tr = { text: doc.title };
      var tf = faceFor(fonts, { bold: true });
      doc.title = filterText(doc.title, tf.kind, coverage, stats);
    }
    (doc.blocks || []).forEach(visit);
    return stats;
  }

  /* ------------------------------------------------------------------ *
   * Medios
   * ------------------------------------------------------------------ */
  function collectMedia(doc, ctx) {
    var jobs = [];
    function visit(block) {
      if (!block) return;
      if (block.type === 'image') {
        if (block.dataUrl) {
          jobs.push(global.NoteDoc.resolveDataImage(
            ctx.images, 'data:' + (block.ref || ''), block.dataUrl,
            ctx.deps.probeDataUrl));
        } else if (block.ref) {
          jobs.push(loadImage(ctx, block.ref));
        }
        (block.caption || []).forEach(visit);
      } else if (block.type === 'list') {
        block.items.forEach(function (it) { (it.blocks || []).forEach(visit); });
      } else if (block.type === 'table') {
        block.rows.forEach(function (row) {
          row.forEach(function (cell) { if (cell) (cell.blocks || []).forEach(visit); });
        });
      } else if (block.type === 'equation') {
        jobs.push(loadEquation(ctx, block.latex, true));
      } else if (block.runs) {
        block.runs.forEach(function (r) {
          if (!r) return;
          if (r.type === 'equation') jobs.push(loadEquation(ctx, r.latex, !!r.display));
          else if (r.type === 'image' && r.src) {
            if (/^data:/i.test(r.src)) {
              jobs.push(global.NoteDoc.resolveDataImage(
                ctx.images, 'inline:' + r.src.slice(0, 64), r.src,
                ctx.deps.probeDataUrl));
            }
          }
        });
      }
    }
    (doc.blocks || []).forEach(visit);
    return Promise.all(jobs.map(function (j) { return j.catch(function () {}); }));
  }

  function loadImage(ctx, ref) {
    if (ctx.images[ref] !== undefined) return Promise.resolve();
    if (typeof ctx.deps.loadImageBytes !== 'function') {
      ctx.images[ref] = null;
      ctx.warnings.push('imagen no cargada: ' + ref);
      return Promise.resolve();
    }
    return ctx.deps.loadImageBytes(ref).then(function (res) {
      ctx.images[ref] = res && res.bytes ? res : null;
      if (!ctx.images[ref]) ctx.warnings.push('imagen no encontrada: ' + ref);
    }).catch(function () {
      ctx.images[ref] = null;
      ctx.warnings.push('imagen no encontrada: ' + ref);
    });
  }

  function loadEquation(ctx, latex, display) {
    var key = (display ? 'b:' : 'i:') + latex;
    if (ctx.equations[key] !== undefined) return Promise.resolve();
    if (typeof ctx.deps.renderEquation !== 'function') {
      ctx.equations[key] = null;
      ctx.warnings.push('ecuacion sin render: ' + latex.slice(0, 60));
      return Promise.resolve();
    }
    return ctx.deps.renderEquation(latex, display, display ? 560 : 320).then(function (res) {
      ctx.equations[key] = res && res.bytes ? res : null;
      if (!ctx.equations[key]) ctx.warnings.push('ecuacion no renderizada: ' + latex.slice(0, 60));
    }).catch(function () {
      ctx.equations[key] = null;
      ctx.warnings.push('ecuacion no renderizada: ' + latex.slice(0, 60));
    });
  }

  function imageKind(bytes) {
    if (!bytes || bytes.length < 4) return null;
    if (bytes[0] === 0x89 && bytes[1] === 0x50 && bytes[2] === 0x4E && bytes[3] === 0x47) return 'png';
    if (bytes[0] === 0xFF && bytes[1] === 0xD8 && bytes[2] === 0xFF) return 'jpg';
    return null;
  }

  function embedImage(P, pdfDoc, ctx, entry) {
    var key = entry.bytes;
    if (ctx.embedded[key]) return Promise.resolve(ctx.embedded[key]);
    var kind = imageKind(entry.bytes);
    var p = kind === 'jpg' ? pdfDoc.embedJpg(entry.bytes) : pdfDoc.embedPng(entry.bytes);
    return p.then(function (img) {
      ctx.embedded[key] = img;
      return img;
    });
  }

  /* ------------------------------------------------------------------ *
   * Layout de runs -> lineas
   * ------------------------------------------------------------------ */
  function runSize(run, basePt) {
    var s = run.size || basePt;
    return Math.max(6, Math.min(72, s));
  }

  /* Tokeniza runs en palabras conservando el estilo de cada una. */
  function tokenize(runs, fonts, basePt) {
    var tokens = [];
    (runs || []).forEach(function (r) {
      if (!r) return;
      if (r.type === 'break' && !r.rule) { tokens.push({ br: true }); return; }
      if (r.type === 'tab') { tokens.push({ word: '\t', tab: true, run: r }); return; }
      if (r.type === 'equation' || r.type === 'image') { tokens.push({ media: r }); return; }
      if (r.type !== 'text') return;
      var text = String(r.text || '');
      if (!text) return;
      var parts = text.split(/(\s+)/);
      parts.forEach(function (p) {
        if (!p) return;
        if (/^\s+$/.test(p)) {
          if (p.indexOf('\n') !== -1) {
            var nls = p.split('\n');
            for (var i = 0; i < nls.length - 1; i++) {
              if (nls[i]) tokens.push({ word: ' ', run: r });
              tokens.push({ br: true });
            }
            if (nls[nls.length - 1]) tokens.push({ word: ' ', run: r });
          } else {
            tokens.push({ word: ' ', run: r });
          }
        } else {
          tokens.push({ word: p, run: r });
        }
      });
    });
    return tokens;
  }

  function segWidth(fonts, word, run, size) {
    var f = faceFor(fonts, run);
    try {
      return f.font.widthOfTextAtSize(word, size);
    } catch (e) {
      return word.length * size * 0.5;
    }
  }

  /* Envuelve tokens en lineas. Devuelve {lines, height}. */
  function wrapTokens(tokens, fonts, maxW, basePt, ctx, opts) {
    opts = opts || {};
    var lines = [];
    var cur = [];
    var curW = 0;
    var spaceW = {};

    function sp(run) {
      var size = runSize(run || {}, basePt);
      var key = size + '|' + (run && run.bold ? 'b' : '') + (run && run.italic ? 'i' : '');
      if (spaceW[key] === undefined) {
        spaceW[key] = segWidth(fonts, ' ', run || {}, size);
      }
      return spaceW[key];
    }

    function lineH(segs) {
      var h = 0;
      segs.forEach(function (s) {
        if (s.media) h = Math.max(h, s.mediaH);
        else h = Math.max(h, s.size * LINE_FACTOR);
      });
      return h || basePt * LINE_FACTOR;
    }

    function pushLine() {
      if (!cur.length) return;
      lines.push({ segs: cur, width: curW, height: lineH(cur) });
      cur = [];
      curW = 0;
    }

    tokens.forEach(function (t) {
      if (t.br) { pushLine(); return; }
      if (t.tab) {
        var tw = sp(t.run) * 4;
        if (curW + tw > maxW && cur.length) pushLine();
        cur.push({ tab: true, width: tw, size: runSize(t.run, basePt) });
        curW += tw;
        return;
      }
      if (t.media) {
        var m = mediaSeg(t.media, fonts, basePt, ctx);
        if (!m) return;
        if (m.width > maxW) {
          var k = maxW / m.width;
          m.width = maxW; m.height = m.height * k; m.mediaH = m.mediaH * k;
        }
        if (curW + m.width > maxW && cur.length) pushLine();
        cur.push(m);
        curW += m.width;
        return;
      }
      var size = runSize(t.run, basePt);
      if (t.word === ' ') {
        if (!cur.length) return; /* sin espacios lideres */
        var w = sp(t.run);
        if (curW + w > maxW) { pushLine(); return; }
        cur.push({ space: true, width: w, size: size, run: t.run });
        curW += w;
        return;
      }
      var ww = segWidth(fonts, t.word, t.run, size);
      if (ww > maxW) {
        /* Palabra mas larga que la linea: partir por caracteres. */
        if (cur.length) pushLine();
        var frag = '';
        for (var i = 0; i < t.word.length; i++) {
          var fw = segWidth(fonts, frag + t.word[i], t.run, size);
          if (fw > maxW && frag) {
            cur.push(mkSeg(frag, t.run, size));
            curW = segWidth(fonts, frag, t.run, size);
            pushLine();
            frag = t.word[i];
          } else {
            frag += t.word[i];
          }
        }
        if (frag) {
          cur.push(mkSeg(frag, t.run, size));
          curW = segWidth(fonts, frag, t.run, size);
        }
        return;
      }
      if (curW + ww > maxW && cur.length) pushLine();
      /* Sin espacio lider tras un salto. */
      cur.push(mkSeg(t.word, t.run, size));
      curW += ww;
    });
    pushLine();

    function mkSeg(word, run, size) {
      var f = faceFor(fonts, run);
      return {
        text: word, run: run, size: size,
        font: f.font, synth: f.synth,
        width: segWidth(fonts, word, run, size)
      };
    }

    var height = 0;
    lines.forEach(function (l) { height += l.height; });
    return { lines: lines, height: height };
  }

  /* Segmento para ecuacion inline o imagen inline. */
  function mediaSeg(media, fonts, basePt, ctx) {
    if (media.type === 'equation') {
      var key = (media.display ? 'b:' : 'i:') + media.latex;
      var e = ctx.equations[key];
      if (e && e.bytes) {
        var h = basePt * 1.5;
        var w = h * (e.width || 60) / (e.height || 20);
        return { img: e, mediaH: h, width: w, height: h, eqLatex: media.latex };
      }
      var txt = '$' + media.latex + '$';
      return {
        text: txt, run: { font: 'monospace' }, size: basePt,
        font: faceFor(fonts, {}).font, synth: null,
        width: segWidth(fonts, txt, {}, basePt)
      };
    }
    if (media.type === 'image') {
      var k = 'inline:' + String(media.src || '').slice(0, 64);
      var im = ctx.images[k];
      if (im && im.bytes) {
        var ih = basePt * 1.5;
        var iw = ih * 1.5;
        return { img: im, mediaH: ih, width: iw, height: ih };
      }
      return null;
    }
    return null;
  }

  /* ------------------------------------------------------------------ *
   * Dibujo de una linea
   * ------------------------------------------------------------------ */
  function drawLine(P, page, R, line, x, yTop, align, maxW) {
    var y = yTop;
    var segs = line.segs;
    /* Recorta espacios finales para medir el ancho real. */
    var last = segs.length - 1;
    while (last >= 0 && segs[last].space) last--;
    var realW = 0;
    for (var i = 0; i <= last; i++) realW += segs[i].width || 0;

    var startX = x;
    if (align === 'center') startX = x + (maxW - realW) / 2;
    else if (align === 'right') startX = x + (maxW - realW);
    var cx = startX;

    var gaps = null;
    if (align === 'justify' && !line.isLast) {
      var nGaps = 0;
      for (var g = 0; g <= last; g++) if (segs[g].space) nGaps++;
      if (nGaps > 0) gaps = (maxW - realW) / nGaps;
    }

    for (var s = 0; s <= last; s++) {
      var sg = segs[s];
      if (sg.space) { cx += sg.width + (gaps || 0); continue; }
      if (sg.tab) { cx += sg.width; continue; }
      if (sg.img) {
        var drawn = R.imagesDrawn[sg.img.bytes];
        if (drawn) {
          var iy = y - line.height + (line.height - sg.height) / 2;
          page.drawImage(drawn, { x: cx, y: iy, width: sg.width, height: sg.height });
        }
        cx += sg.width;
        continue;
      }
      var size = sg.size;
      var baseline = y - size * 1.069;
      var color = sg.run && sg.run.color
        ? hexToRgb(P, legible(sg.run.color, R))
        : hexToRgb(P, R.palette.text);
      /* Resaltado detras del texto. */
      if (sg.run && sg.run.highlight) {
        page.drawRectangle({
          x: cx - 1, y: baseline - size * 0.25,
          width: sg.width + 2, height: size * 1.32,
          color: hexToRgb(P, sg.run.highlight)
        });
      }
      var opts = { x: cx, y: baseline, size: size, font: sg.font, color: color };
      if (sg.synth === 'bold') {
        page.drawText(sg.text, opts);
        page.drawText(sg.text, Object.assign({}, opts, { x: cx + size * 0.03 }));
      } else {
        page.drawText(sg.text, opts);
      }
      /* Subrayado / tachado. */
      var thick = Math.max(0.6, size / 14);
      if (sg.run && sg.run.underline) {
        page.drawLine({
          start: { x: cx, y: baseline - size * 0.14 },
          end: { x: cx + sg.width, y: baseline - size * 0.14 },
          thickness: thick, color: color
        });
      }
      if (sg.run && sg.run.strike) {
        page.drawLine({
          start: { x: cx, y: baseline + size * 0.28 },
          end: { x: cx + sg.width, y: baseline + size * 0.28 },
          thickness: thick, color: color
        });
      }
      cx += sg.width;
    }
  }

  function legible(color, R) {
    if (global.NoteDoc && global.NoteDoc.ensureLegible) {
      return global.NoteDoc.ensureLegible(color, R.paper.base, R.palette.text);
    }
    return color || R.palette.text;
  }

  /* ------------------------------------------------------------------ *
   * Items de flujo
   * ------------------------------------------------------------------ */
  function layoutBlocks(blocks, L, out) {
    out = out || [];
    blocks.forEach(function (b) {
      layoutBlock(b, L, 0, out);
    });
    return out;
  }

  function layoutBlock(b, L, depth, items) {
    if (!b) return;
    switch (b.type) {
      case 'heading': {
        var hs = headingSize(b.level);
        var wrapped = wrapTokens(tokenize(b.runs, L.fonts, hs), L.fonts, L.W, hs, L.ctx);
        wrapped.lines.forEach(function (ln, i) {
          ln.isLast = i === wrapped.lines.length - 1;
        });
        items.push({
          h: wrapped.height + 10 + (b.level <= 2 ? 4 : 0),
          keepWithNext: true,
          draw: (function (w, size, level, align) {
            return function (R, page, x, yTop) {
              var yy = yTop - (level <= 2 ? 2 : 4);
              w.lines.forEach(function (ln) {
                drawLine(R.P, page, R, ln, x, yy, align, R.W);
                yy -= ln.height;
              });
            };
          })(wrapped, hs, b.level, b.align || 'left'),
          heading: true, size: hs
        });
        break;
      }
      case 'paragraph': {
        var base = BASE_PT;
        var wrapped2 = wrapTokens(tokenize(b.runs, L.fonts, base), L.fonts, L.W, base, L.ctx);
        wrapped2.lines.forEach(function (ln, i) {
          ln.isLast = i === wrapped2.lines.length - 1;
        });
        var role = b.role;
        wrapped2.lines.forEach(function (ln, i) {
          items.push({
            h: ln.height + (i === wrapped2.lines.length - 1 ? PARA_AFTER : 0),
            draw: (function (line, isLast, align) {
              return function (R, page, x, yTop) {
                var yy = yTop;
                if (role === 'quote') {
                  page.drawLine({
                    start: { x: x - 8, y: yTop + 2 },
                    end: { x: x - 8, y: yTop - line.height - 2 },
                    thickness: 2.5, color: hexToRgb(R.P, R.palette.quoteBar)
                  });
                }
                if (role === 'code') {
                  page.drawRectangle({
                    x: x - 4, y: yTop - line.height - 1,
                    width: R.W + 8, height: line.height + 2,
                    color: hexToRgb(R.P, R.palette.codeBg)
                  });
                }
                drawLine(R.P, page, R, line, x, yy, align, R.W);
              };
            })(ln, ln.isLast, b.align || 'left')
          });
        });
        if (!wrapped2.lines.length) {
          items.push({ h: BASE_PT * LINE_FACTOR + PARA_AFTER, draw: function () {} });
        }
        break;
      }
      case 'list':
        layoutList(b, L, depth, items);
        break;
      case 'table':
        layoutTable(b, L, items);
        break;
      case 'image': {
        var img = imageItem(b, L);
        if (img) items.push(img);
        break;
      }
      case 'media': {
        var h = 34;
        items.push({
          h: h + PARA_AFTER,
          draw: (function (block) {
            return function (R, page, x, yTop) {
              var label = (block.kind === 'audio' ? '[AUDIO' : '[VIDEO') +
                (block.name ? ': ' + block.name : '') +
                (block.size ? ' · ' + formatSize(block.size) : '') + ']';
              page.drawRectangle({
                x: x, y: yTop - h, width: R.W, height: h,
                color: hexToRgb(R.P, R.palette.mediaBg),
                borderColor: hexToRgb(R.P, R.palette.border), borderWidth: 0.75
              });
              var f = R.fonts.faces.regular;
              var tw = 0;
              try { tw = f.widthOfTextAtSize(label, 10); } catch (e) { tw = label.length * 5; }
              page.drawText(label, {
                x: x + (R.W - tw) / 2, y: yTop - h / 2 - 3.5,
                size: 10, font: f, color: hexToRgb(R.P, R.palette.muted)
              });
            };
          })(b)
        });
        break;
      }
      case 'equation': {
        var eq = equationItem(b, L, true);
        if (eq) items.push(eq);
        break;
      }
      case 'rule': {
        items.push({
          h: 14,
          draw: function (R, page, x, yTop) {
            page.drawLine({
              start: { x: x, y: yTop - 7 },
              end: { x: x + R.W, y: yTop - 7 },
              thickness: 0.9, color: hexToRgb(R.P, R.palette.rule)
            });
          }
        });
        break;
      }
      case 'spacer':
        items.push({ h: 8, draw: function () {} });
        break;
      default: {
        if (b.runs) layoutBlock({ type: 'paragraph', runs: b.runs, align: 'left' }, L, depth, items);
        else if (b.blocks) b.blocks.forEach(function (x) { layoutBlock(x, L, depth, items); });
        break;
      }
    }
  }

  function headingSize(level) {
    return [18, 15, 13, 12, 11, 11][Math.max(1, Math.min(6, level || 1)) - 1];
  }

  function formatSize(bytes) {
    var n = Number(bytes);
    if (!isFinite(n) || n <= 0) return '';
    if (n < 1024) return n + ' B';
    if (n < 1048576) return (n / 1024).toFixed(1) + ' KB';
    return (n / 1048576).toFixed(1) + ' MB';
  }

  /* ------------------------------------------------------------------ *
   * Listas
   * ------------------------------------------------------------------ */
  function layoutList(block, L, depth, items) {
    var counters = {};
    (block.items || []).forEach(function (item) {
      var level = Math.max(0, Math.min(8, (depth || 0) + (item.level || 0)));
      var indent = level * LIST_INDENT;
      var marker, markerW;
      if (block.ordered) {
        counters[level] = (counters[level] || (block.start || 1) - 1) + 1;
        marker = counters[level] + '.';
      } else if (item.checked) {
        marker = 'checked';
      } else {
        marker = '•';
      }
      var f = L.fonts.faces.regular;
      try { markerW = f.widthOfTextAtSize(marker === 'checked' ? '' : marker, BASE_PT) + 6; }
      catch (e) { markerW = 14; }
      if (marker === 'checked') markerW = 16;

      (item.blocks || []).forEach(function (sub, si) {
        if (sub.type === 'list') {
          layoutList(sub, L, level + 1, items);
          return;
        }
        if (sub.type === 'paragraph' || sub.type === 'heading') {
          var wrapped = wrapTokens(
            tokenize(sub.runs, L.fonts, BASE_PT),
            L.fonts, L.W - indent - markerW, BASE_PT, L.ctx
          );
          wrapped.lines.forEach(function (ln, li) {
            ln.isLast = li === wrapped.lines.length - 1;
            items.push({
              h: ln.height + (ln.isLast ? PARA_AFTER - 2 : 0),
              draw: (function (line, first, align) {
                return function (R, page, x, yTop) {
                  var mx = x + indent;
                  if (first) {
                    if (marker === 'checked') {
                      drawCheckbox(R, page, mx, yTop - BASE_PT * 0.95, true);
                    } else {
                      page.drawText(marker, {
                        x: mx, y: yTop - BASE_PT * 1.069,
                        size: BASE_PT, font: R.fonts.faces.regular,
                        color: hexToRgb(R.P, R.palette.text)
                      });
                    }
                  }
                  drawLine(R.P, page, R, line, mx + markerW, yTop, align, R.W - indent - markerW);
                };
              })(ln, li === 0, sub.align || 'left')
            });
          });
          if (!wrapped.lines.length && si === 0) {
            items.push({
              h: BASE_PT * LINE_FACTOR,
              draw: (function () {
                return function (R, page, x, yTop) {
                  if (marker === 'checked') drawCheckbox(R, page, x + indent, yTop - BASE_PT * 0.95, true);
                };
              })()
            });
          }
          return;
        }
        /* Otros bloques dentro del item (imagen, tabla...): indentados. */
        var before = items.length;
        layoutBlock(sub, Object.assign({}, L, { W: L.W - indent - 8 }), 0, items);
        for (var k = before; k < items.length; k++) {
          (function (it) {
            var orig = it.draw;
            it.draw = function (R, page, x, yTop) { orig(R, page, x + indent + 8, yTop); };
          })(items[k]);
        }
      });
      if (!(item.blocks || []).length) {
        items.push({
          h: BASE_PT * LINE_FACTOR + PARA_AFTER - 2,
          draw: (function () {
            return function (R, page, x, yTop) {
              if (marker === 'checked') drawCheckbox(R, page, x + indent, yTop - BASE_PT * 0.95, true);
              else {
                page.drawText(marker, {
                  x: x + indent, y: yTop - BASE_PT * 1.069,
                  size: BASE_PT, font: R.fonts.faces.regular,
                  color: hexToRgb(R.P, R.palette.text)
                });
              }
            };
          })()
        });
      }
    });
  }

  /* Checkbox vectorial: independiente de la fuente, siempre visible. */
  function drawCheckbox(R, page, x, y, checked) {
    var s = 8;
    page.drawRectangle({
      x: x, y: y, width: s, height: s,
      borderColor: hexToRgb(R.P, R.palette.text), borderWidth: 1
    });
    if (checked) {
      page.drawLine({
        start: { x: x + 1.5, y: y + 3.5 }, end: { x: x + 3.5, y: y + 1.5 },
        thickness: 1.4, color: hexToRgb(R.P, R.palette.text)
      });
      page.drawLine({
        start: { x: x + 3.5, y: y + 1.5 }, end: { x: x + 7, y: y + 6.5 },
        thickness: 1.4, color: hexToRgb(R.P, R.palette.text)
      });
    }
  }

  /* ------------------------------------------------------------------ *
   * Tablas
   * ------------------------------------------------------------------ */
  function layoutTable(block, L, items) {
    var cols = Math.max(1, block.cols || 1);
    var colW = (L.W - 1) / cols;
    var colWs = [];
    for (var i = 0; i < cols; i++) colWs.push(colW);

    /* Pre-layout de cada celda con su ancho real (colspan sumado). */
    var grid = block.rows.map(function (row) {
      var out = [];
      for (var c = 0; c < cols; c++) {
        var cell = row[c];
        if (!cell) { out.push(null); continue; }
        var w = 0;
        for (var k = 0; k < (cell.colspan || 1) && c + k < cols; k++) w += colWs[c + k];
        out.push(layoutCell(cell, L, w - CELL_PAD * 2));
      }
      return out;
    });

    /* Alturas de fila: la celda origen absorbe todo su contenido para no
     * solapar nunca el texto con los bordes. */
    var rowHs = grid.map(function (row) {
      var h = 0;
      row.forEach(function (cell) {
        if (cell) h = Math.max(h, cell.height + CELL_PAD * 2);
      });
      return Math.max(h, TABLE_FONT * LINE_FACTOR + CELL_PAD * 2);
    });

    var tableId = 't' + (L.tableSeq++);
    var headerCount = Math.min(block.headerRows || 0, grid.length);
    var headerItems = [];
    for (var hr = 0; hr < headerCount; hr++) {
      headerItems.push(makeRowItem(block, grid, rowHs, colWs, hr, tableId, true, L));
    }
    grid.forEach(function (row, ri) {
      if (ri < headerCount) {
        items.push(headerItems[ri]);
        return;
      }
      items.push(makeRowItem(block, grid, rowHs, colWs, ri, tableId, false, L));
    });
    L.tableHeaders[tableId] = headerItems;
    /* Espacio despues de la tabla. */
    items.push({ h: PARA_AFTER + 2, draw: function () {} });
  }

  function layoutCell(cell, L, innerW) {
    var lines = [];
    var height = 0;
    (cell.blocks || []).forEach(function (b) {
      if (b.type === 'paragraph' || b.type === 'heading') {
        var w = wrapTokens(tokenize(b.runs, L.fonts, TABLE_FONT), L.fonts, Math.max(20, innerW), TABLE_FONT, L.ctx);
        w.lines.forEach(function (ln, i) { ln.isLast = i === w.lines.length - 1; });
        w.lines.forEach(function (ln) {
          lines.push({ line: ln, align: b.align || cell.align || 'left' });
          height += ln.height;
        });
      } else if (b.type === 'list') {
        b.items.forEach(function (it) {
          var marker = b.ordered ? '1.' : '•';
          (it.blocks || []).forEach(function (sub) {
            if (!sub.runs) return;
            var w2 = wrapTokens(tokenize(sub.runs, L.fonts, TABLE_FONT), L.fonts, Math.max(20, innerW - 12), TABLE_FONT, L.ctx);
            w2.lines.forEach(function (ln, i) {
              lines.push({ line: ln, align: 'left', marker: i === 0 ? marker : null });
              height += ln.height;
            });
          });
        });
      } else if (b.type === 'equation') {
        var key = 'b:' + (b.latex || '');
        var e = L.ctx.equations[key];
        if (e && e.bytes) {
          var eh = TABLE_FONT * 1.6;
          var ew = Math.min(innerW, eh * (e.width || 100) / (e.height || 30));
          lines.push({ img: e, imgW: ew, imgH: eh, align: 'center' });
          height += eh + 2;
        } else if (b.latex) {
          var wt = wrapTokens(
            tokenize([{ type: 'text', text: b.latex, font: 'monospace' }], L.fonts, TABLE_FONT),
            L.fonts, Math.max(20, innerW), TABLE_FONT, L.ctx);
          wt.lines.forEach(function (ln) {
            lines.push({ line: ln, align: 'left' });
            height += ln.height;
          });
        }
      } else if (b.type === 'image') {
        var ref = b.dataUrl ? 'data:' + (b.ref || '') : b.ref;
        var im = ref ? L.ctx.images[ref] : null;
        if (im && im.bytes) {
          var iw = Math.min(innerW, 180);
          var ih = iw * 0.75;
          lines.push({ img: im, imgW: iw, imgH: ih, align: 'center' });
          height += ih + 2;
        } else {
          lines.push({ line: { segs: [{ text: '[IMAGEN]', run: {}, size: TABLE_FONT, font: L.fonts.faces.regular, width: 60 }], width: 60, height: TABLE_FONT * LINE_FACTOR }, align: 'left' });
          height += TABLE_FONT * LINE_FACTOR;
        }
      }
    });
    return { lines: lines, height: height };
  }

  function makeRowItem(block, grid, rowHs, colWs, ri, tableId, isHeader, L) {
    var h = rowHs[ri];
    return {
      h: h,
      tableId: tableId,
      isHeader: isHeader,
      rowIndex: ri,
      /* Fila atomica: si no entra, va entera a la pagina siguiente. Si ni
       * en una pagina entera entra, se fragmenta por lineas. */
      atomic: true,
      draw: function (R, page, x, yTop) {
        drawTableRow(R, page, x, yTop, block, grid[ri], colWs, h, ri, isHeader);
      },
      /* Fragmentacion de emergencia para filas mas altas que la pagina. */
      split: function (R, maxH) {
        return splitRow(block, grid[ri], colWs, rowHs[ri], ri, isHeader, L, maxH);
      }
    };
  }

  function drawTableRow(R, page, x, yTop, block, cells, colWs, h, ri, isHeader) {
    var P = R.P;
    var cols = colWs.length;
    var cx = x;
    var edges = [x];
    for (var c = 0; c < cols; c++) {
      var cell = cells[c];
      var span = (cell && cell.cell && cell.cell.colspan) || 1;
      var w = 0;
      for (var k = 0; k < span && c + k < cols; k++) w += colWs[c + k];
      var x0 = cx;
      cx += w;
      edges.push(cx);
      if (!cell || !cell.lines) continue;
      var bg = (isHeader || (cell.cell && cell.cell.header)) ? R.palette.headerBg : null;
      if (bg) {
        page.drawRectangle({ x: x0, y: yTop - h, width: w, height: h, color: hexToRgb(P, bg) });
      }
      var yy = yTop - CELL_PAD;
      cell.lines.forEach(function (entry) {
        if (entry.img) {
          var drawn = R.imagesDrawn[entry.img.bytes];
          if (drawn) {
            var ix = entry.align === 'center' ? x0 + (w - entry.imgW) / 2 : x0 + CELL_PAD;
            page.drawImage(drawn, { x: ix, y: yy - entry.imgH, width: entry.imgW, height: entry.imgH });
          }
          yy -= entry.imgH + 2;
          return;
        }
        var lw = w - CELL_PAD * 2;
        var lxx = x0 + CELL_PAD;
        if (entry.marker) {
          page.drawText(entry.marker, {
            x: lxx, y: yy - TABLE_FONT * 1.069,
            size: TABLE_FONT, font: R.fonts.faces.regular,
            color: hexToRgb(P, R.palette.text)
          });
          lxx += 12;
          lw -= 12;
        }
        drawLine(P, page, R, entry.line, lxx, yy, entry.align || 'left', lw);
        yy -= entry.line.height;
      });
      c += span - 1;
    }
    /* Bordes: marco + horizontales + verticales en los bordes de celda. */
    var border = hexToRgb(P, R.palette.border);
    page.drawRectangle({
      x: x, y: yTop - h, width: cx - x, height: h,
      borderColor: border, borderWidth: 0.75
    });
    for (var e = 1; e < edges.length - 1; e++) {
      page.drawLine({
        start: { x: edges[e], y: yTop }, end: { x: edges[e], y: yTop - h },
        thickness: 0.5, color: border
      });
    }
    page.drawLine({
      start: { x: x, y: yTop - h }, end: { x: cx, y: yTop - h },
      thickness: 0.75, color: border
    });
  }

  /* Parte una fila demasiado alta en fragmentos dibujables por pagina. */
  function splitRow(block, cells, colWs, h, ri, isHeader, L, maxH) {
    /* Agrupa las lineas de cada celda en fragmentos que quepan en maxH. */
    var cols = colWs.length;
    var frags = [];
    var cur = null;
    function newFrag() {
      cur = { cells: [], h: 0 };
      for (var c = 0; c < cols; c++) cur.cells.push(null);
      frags.push(cur);
    }
    newFrag();
    for (var c = 0; c < cols; c++) {
      var cell = cells[c];
      if (!cell || !cell.lines) continue;
      var acc = [];
      var accH = 0;
      cell.lines.forEach(function (entry) {
        var eh = entry.img ? entry.imgH + 2 : entry.line.height;
        if (accH + eh > maxH - CELL_PAD * 2 && acc.length) {
          cur.cells[c] = { lines: acc, height: accH, cell: cell.cell };
          cur.h = Math.max(cur.h, accH + CELL_PAD * 2);
          newFrag();
          acc = []; accH = 0;
        }
        acc.push(entry); accH += eh;
      });
      if (acc.length) {
        if (!cur.cells[c]) {
          cur.cells[c] = { lines: acc, height: accH, cell: cell.cell };
          cur.h = Math.max(cur.h, accH + CELL_PAD * 2);
        } else {
          /* La celda ya ocupada en este fragmento: sigue en el siguiente. */
          newFrag();
          cur.cells[c] = { lines: acc, height: accH, cell: cell.cell };
          cur.h = Math.max(cur.h, accH + CELL_PAD * 2);
        }
      }
    }
    return frags.filter(function (f) {
      return f.cells.some(function (cc) { return cc && cc.lines.length; });
    }).map(function (f) {
      return {
        h: Math.max(f.h, TABLE_FONT * LINE_FACTOR + CELL_PAD * 2),
        draw: function (R, page, x, yTop) {
          drawTableRow(R, page, x, yTop, block, f.cells, colWs, Math.max(f.h, 1), ri, isHeader);
        }
      };
    });
  }

  /* ------------------------------------------------------------------ *
   * Imagenes y ecuaciones de bloque
   * ------------------------------------------------------------------ */
  function imageItem(b, L) {
    var key = b.dataUrl ? 'data:' + (b.ref || '') : b.ref;
    var entry = key ? L.ctx.images[key] : null;
    var captionBlocks = b.caption || [];
    if (!entry || !entry.bytes) {
      L.ctx.warnings.push('imagen omitida: ' + (b.name || b.ref || ''));
      var items = [{
        h: 22 + PARA_AFTER,
        draw: function (R, page, x, yTop) {
          var label = '[IMAGEN: ' + (b.name || b.ref || 'imagen') + ']';
          page.drawRectangle({
            x: x, y: yTop - 22, width: R.W, height: 22,
            color: hexToRgb(R.P, R.palette.mediaBg),
            borderColor: hexToRgb(R.P, R.palette.border), borderWidth: 0.75
          });
          page.drawText(label, {
            x: x + 8, y: yTop - 15, size: 10,
            font: R.fonts.faces.regular, color: hexToRgb(R.P, R.palette.muted)
          });
        }
      }];
      captionBlocks.forEach(function (cap) {
        layoutBlock({ type: 'paragraph', runs: cap.runs, align: 'center' }, L, 0, items);
      });
      return items.length === 1 ? items[0] : { h: 0, group: items };
    }
    var natW = entry.width || b.width || 300;
    var natH = entry.height || b.height || 200;
    if (b.width && b.height) { natW = b.width; natH = b.height; }
    if (natW <= 0) natW = 300;
    if (natH <= 0) natH = 200;
    var scale = Math.min(1, L.W / natW);
    var dw = natW * scale, dh = natH * scale;
    var maxH = (TOP_Y - BOTTOM_Y) * 0.92;
    if (dh > maxH) { dw = dw * maxH / dh; dh = maxH; }
    var out = [{
      h: dh,
      atomic: true,
      draw: (function (w, hgt) {
        return function (R, page, x, yTop) {
          var drawn = R.imagesDrawn[entry.bytes];
          if (drawn) {
            page.drawImage(drawn, { x: x + (R.W - w) / 2, y: yTop - hgt, width: w, height: hgt });
          }
        };
      })(dw, dh)
    }];
    captionBlocks.forEach(function (cap) {
      var wrapped = wrapTokens(tokenize(cap.runs, L.fonts, 9), L.fonts, L.W, 9, L.ctx);
      wrapped.lines.forEach(function (ln) {
        out.push({
          h: ln.height,
          draw: (function (line) {
            return function (R, page, x, yTop) {
              drawLine(R.P, page, R, line, x, yTop, 'center', R.W);
            };
          })(ln)
        });
      });
    });
    out.push({ h: PARA_AFTER + 4, draw: function () {} });
    return { h: 0, group: out };
  }

  function equationItem(b, L, display) {
    var key = (display ? 'b:' : 'i:') + (b.latex || '');
    var e = L.ctx.equations[key];
    if (!e || !e.bytes) {
      /* Sin raster: el LaTeX como texto monoespaciado (no se pierde). */
      var wrapped = wrapTokens(
        tokenize([{ type: 'text', text: display ? b.latex : '$' + b.latex + '$', font: 'monospace' }], L.fonts, 10),
        L.fonts, L.W, 10, L.ctx
      );
      var items = wrapped.lines.map(function (ln) {
        return {
          h: ln.height,
          draw: (function (line) {
            return function (R, page, x, yTop) {
              drawLine(R.P, page, R, line, x, yTop, display ? 'center' : 'left', R.W);
            };
          })(ln)
        };
      });
      items.push({ h: PARA_AFTER, draw: function () {} });
      return { h: 0, group: items };
    }
    var w = e.width || 300, hgt = e.height || 40;
    var scale = Math.min(1, L.W / w);
    var dw = w * scale, dh = hgt * scale;
    return {
      h: dh + PARA_AFTER + 2,
      atomic: true,
      draw: function (R, page, x, yTop) {
        var drawn = R.imagesDrawn[e.bytes];
        if (drawn) {
          page.drawImage(drawn, { x: x + (R.W - dw) / 2, y: yTop - dh, width: dw, height: dh });
        }
      }
    };
  }

  /* ------------------------------------------------------------------ *
   * Paginacion y dibujo
   * ------------------------------------------------------------------ */
  function flatten(items) {
    var out = [];
    items.forEach(function (it) {
      if (!it) return;
      if (it.group) it.group.forEach(function (g) { out.push(g); });
      else out.push(it);
    });
    return out;
  }

  function paginate(P, pdfDoc, R, items, paper) {
    var pages = [];
    var page = pdfDoc.addPage([PAGE_W, PAGE_H]);
    pages.push(page);
    paintPaper(P, page, paper);
    var y = TOP_Y;
    var startedTables = {};
    var pageTables = {};

    function newPage() {
      page = pdfDoc.addPage([PAGE_W, PAGE_H]);
      pages.push(page);
      paintPaper(P, page, paper);
      y = TOP_Y;
      pageTables = {};
    }

    function ensureHeaders(item) {
      if (!item.tableId || pageTables[item.tableId]) return;
      if (!startedTables[item.tableId]) return; /* la tabla empieza aqui */
      var headers = R.tableHeaders[item.tableId] || [];
      headers.forEach(function (hh) {
        if (y - hh.h < BOTTOM_Y) newPage();
        hh.draw(R, page, MARGIN, y);
        y -= hh.h;
      });
      pageTables[item.tableId] = true;
    }

    for (var i = 0; i < items.length; i++) {
      var it = items[i];
      /* keep-with-next: el titulo no queda huerfano al final. */
      if (it.keepWithNext && i + 1 < items.length) {
        var nxt = items[i + 1];
        if (y - it.h - nxt.h < BOTTOM_Y && y < TOP_Y - 1) {
          newPage();
        }
      }
      if (it.tableId) {
        ensureHeaders(it);
        startedTables[it.tableId] = true;
        pageTables[it.tableId] = true;
      }
      if (it.atomic && y - it.h < BOTTOM_Y && y < TOP_Y - 1) {
        newPage();
        if (it.tableId) {
          startedTables[it.tableId] = true;
          pageTables[it.tableId] = true;
        }
      }
      if (y - it.h < BOTTOM_Y) {
        if (it.split) {
          /* Fila mas alta que la pagina: fragmentar. */
          var frags = it.split(R, TOP_Y - BOTTOM_Y);
          if (frags && frags.length) {
            frags.forEach(function (f) {
              if (y - f.h < BOTTOM_Y) newPage();
              f.draw(R, page, MARGIN, y);
              y -= f.h;
            });
            continue;
          }
        }
        /* Sin fragmentacion posible: pagina nueva aunque desborde. */
        if (y < TOP_Y - 1) newPage();
      }
      it.draw(R, page, MARGIN, y);
      y -= it.h;
    }
    return pages;
  }

  function paintPaper(P, page, paper) {
    /* Base de papel: solo se pinta si no es blanca para no engordar el PDF. */
    if (paper && paper.base && paper.base !== '#ffffff') {
      page.drawRectangle({
        x: 0, y: 0, width: PAGE_W, height: PAGE_H,
        color: hexToRgb(P, paper.base)
      });
    }
    if (!paper || !paper.design || paper.design === 'none') return;
    var lineColor = hexToRgb(P, paper.line);
    var dotColor = hexToRgb(P, paper.dot);
    var step = PAPER_UNIT_PT;
    if (paper.design === 'lined' || paper.design === 'grid') {
      for (var y = PAGE_H - step; y > 0; y -= step) {
        page.drawLine({
          start: { x: 0, y: y }, end: { x: PAGE_W, y: y },
          thickness: 0.6, color: lineColor
        });
      }
    }
    if (paper.design === 'grid') {
      for (var x = step; x < PAGE_W; x += step) {
        page.drawLine({
          start: { x: x, y: 0 }, end: { x: x, y: PAGE_H },
          thickness: 0.6, color: lineColor
        });
      }
    }
    if (paper.design === 'dotted') {
      for (var dy = PAGE_H - step / 2; dy > 0; dy -= step) {
        for (var dx = step / 2; dx < PAGE_W; dx += step) {
          page.drawCircle({ x: dx, y: dy, size: 1.1, color: dotColor, borderWidth: 0 });
        }
      }
    }
  }

  /* ------------------------------------------------------------------ *
   * Entrada publica
   * ------------------------------------------------------------------ */
  function build(doc, deps, options) {
    var P = resolvePdfLib();
    deps = deps || {};
    options = options || {};
    var warnings = [];

    /* PDFDocument.create() es asincrono en esta version de pdf-lib. */
    return Promise.resolve().then(function () {
      return P.PDFDocument.create();
    }).then(function (pdfDoc) {
      if (global.fontkit && pdfDoc.registerFontkit) {
        try { pdfDoc.registerFontkit(global.fontkit); } catch (e) { /* opcional */ }
      }
      return pdfDoc;
    }).then(function (pdfDoc) {
      return loadFonts(P, deps, warnings).then(function (slots) {
        return { pdfDoc: pdfDoc, slots: slots };
      });
    }).then(function (env0) {
      var pdfDoc = env0.pdfDoc;
      return embedFonts(P, pdfDoc, env0.slots.slots, warnings).then(function (fonts) {
        return { pdfDoc: pdfDoc, fonts: fonts };
      });
    }).then(function (env1) {
      var pdfDoc = env1.pdfDoc, fonts = env1.fonts;
      if (!fonts.faces.regular) {
        return Promise.reject(new Error('sin fuente base para el PDF'));
      }
      return embedStandards(P, pdfDoc, fonts).then(function () { return env1; });
    }).then(function (env1) {
      var fonts = env1.fonts;
      var ctx = {
        images: {}, equations: {}, embedded: {},
        deps: deps, warnings: warnings
      };
      var stats = prepareText(doc, fonts);
      if (stats.substituted > 0) warnings.push(stats.substituted + ' caracteres sustituidos por equivalencia de glifo');
      if (stats.dropped > 0) warnings.push(stats.dropped + ' caracteres sin glifo omitidos');
      return collectMedia(doc, ctx).then(function () {
        return { pdfDoc: env1.pdfDoc, fonts: fonts, ctx: ctx };
      });
    }).then(function (env) {
      var pdfDoc = env.pdfDoc, fonts = env.fonts, ctx = env.ctx;
      var R = {
        P: P, fonts: fonts, W: CONTENT_W,
        palette: (doc && doc.palette) || { text: '#222222' },
        paper: (doc && doc.background) || { base: '#ffffff', design: 'none' },
        imagesDrawn: {},
        tableHeaders: {}
      };
      /* Incrusta cada imagen una sola vez. */
      var allBytes = [];
      Object.keys(ctx.images).forEach(function (k) {
        if (ctx.images[k] && ctx.images[k].bytes) allBytes.push(ctx.images[k]);
      });
      Object.keys(ctx.equations).forEach(function (k) {
        if (ctx.equations[k] && ctx.equations[k].bytes) allBytes.push(ctx.equations[k]);
      });
      var seen = {};
      var jobs = allBytes.map(function (entry) {
        if (seen[entry.bytes]) return Promise.resolve();
        seen[entry.bytes] = true;
        return embedImage(P, pdfDoc, ctx, entry).then(function (img) {
          R.imagesDrawn[entry.bytes] = img;
        }).catch(function () {
          /* Si una imagen no incrusta, se dibuja su marcador. */
        });
      });
      return Promise.all(jobs).then(function () { return R; }).then(function (R2) {
        R2.ctx = ctx;
        var L = {
          W: CONTENT_W, fonts: fonts, ctx: ctx,
          tableSeq: 0, tableHeaders: R2.tableHeaders
        };
        var items = [];
        /* Titulo del documento. */
        if (doc.title) {
          layoutBlock({ type: 'heading', level: 1, runs: [{ type: 'text', text: doc.title, bold: true }], align: 'left' }, L, 0, items);
        }
        layoutBlocks(doc.blocks || [], L, items);
        items = flatten(items);
        paginate(P, pdfDoc, R2, items, R2.paper);
        return pdfDoc.save().then(function (bytes) {
          /* ctx.warnings es el mismo arreglo que warnings: no duplicar. */
          return { bytes: bytes, warnings: warnings.slice() };
        });
      });
    });
  }

  /* Costura de pruebas: layout sin dibujar. Requiere fuentes incrustadas.
   * Devuelve {items, tableHeaders} para poder replicar la paginacion. */
  function layoutForTest(doc, fonts, ctx) {
    var L = {
      W: CONTENT_W, fonts: fonts, ctx: ctx || { images: {}, equations: {}, warnings: [] },
      tableSeq: 0, tableHeaders: {}
    };
    var items = [];
    if (doc.title) {
      layoutBlock({ type: 'heading', level: 1, runs: [{ type: 'text', text: doc.title, bold: true }], align: 'left' }, L, 0, items);
    }
    layoutBlocks(doc.blocks || [], L, items);
    return { items: flatten(items), tableHeaders: L.tableHeaders };
  }

  global.PdfExporter = {
    build: build,
    layoutForTest: layoutForTest,
    prepareText: prepareText,
    SUBSTITUTIONS: SUBSTITUTIONS,
    PAGE: { w: PAGE_W, h: PAGE_H, margin: MARGIN, contentW: CONTENT_W, top: TOP_Y, bottom: BOTTOM_Y }
  };

  if (typeof module !== 'undefined' && module.exports) module.exports = global.PdfExporter;

})(typeof window !== 'undefined' ? window : globalThis);
