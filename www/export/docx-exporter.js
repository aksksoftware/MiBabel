/* MiBabel - Exportador DOCX.
 *
 * Convierte el documento intermedio (NoteDoc) en un .docx editable usando
 * la libreria `docx` que ya trae la app (www/lib/docx.umd.js).
 *
 * Conserva: negrita, cursiva, subrayado, tachado, color, resaltado,
 * tamano, alineacion, titulos (estilos Heading), listas reales de Word
 * (vinetas y numeradas, anidadas), tablas reales con bordes, imagenes,
 * ecuaciones como imagen con el LaTeX en la descripcion accesible,
 * citas, codigo, reglas horizontales y referencias a audio/video.
 *
 * No lee nada del DOM ni de script.js: todo lo que necesita (bytes de
 * imagenes, raster de ecuaciones) llega por `deps` para poder probarlo
 * aislado y reutilizar el codigo real de la app en produccion.
 *
 *   deps.loadImageBytes(ref) -> Promise<{bytes, width, height} | null>
 *   deps.renderEquation(latex, display, maxWidthPx)
 *        -> Promise<{bytes, width, height} | null>
 */
(function (global) {
  'use strict';

  /* A4 con margenes de 2 cm, igual que el PDF (spec 10). */
  var PAGE_W_TWIP = 11906;
  var MARGIN_TWIP = 1134;
  var CONTENT_TWIP = PAGE_W_TWIP - MARGIN_TWIP * 2;
  /* Ancho util para imagenes en px (Word: 96 dpi). */
  var MAX_IMG_PX = 600;

  var BASE_PT = 11;

  function resolveDocx() {
    var D = global.docx;
    if (!D || !D.Document || !D.Packer) {
      throw new Error('libreria DOCX no disponible');
    }
    return D;
  }

  /* ------------------------------------------------------------------ *
   * Recoleccion previa de medios (paralela, con errores aislados)
   * ------------------------------------------------------------------ */
  function collectMedia(doc, ctx) {
    var jobs = [];
    function visit(block) {
      if (!block) return;
      if (block.type === 'image') {
        if (block.dataUrl) {
          jobs.push(global.NoteDoc.resolveDataImage(
            ctx.cache.images, 'data:' + (block.ref || ''), block.dataUrl,
            ctx.deps.probeDataUrl));
        } else if (block.ref) {
          jobs.push(loadImage(ctx, block.ref));
        }
        (block.caption || []).forEach(visit);
      } else if (block.type === 'list') {
        block.items.forEach(function (it) { (it.blocks || []).forEach(visit); });
      } else if (block.type === 'table') {
        block.rows.forEach(function (row) {
          row.forEach(function (cell) {
            if (cell) (cell.blocks || []).forEach(visit);
          });
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
                ctx.cache.images, 'inline:' + r.src.slice(0, 64), r.src,
                ctx.deps.probeDataUrl));
            }
            else ctx.warnings.push('imagen inline no embebida: ' + String(r.src).slice(0, 80));
          }
        });
      }
    }
    (doc.blocks || []).forEach(visit);
    return Promise.all(jobs.map(function (j) {
      return j.catch(function () { /* aislado: el warn ya se registro */ });
    }));
  }

  function loadImage(ctx, ref) {
    if (ctx.cache.images[ref] !== undefined) return Promise.resolve();
    var loader = ctx.deps.loadImageBytes;
    if (typeof loader !== 'function') {
      ctx.warnings.push('sin cargador de imagenes: ' + ref);
      ctx.cache.images[ref] = null;
      return Promise.resolve();
    }
    return loader(ref).then(function (res) {
      ctx.cache.images[ref] = res && res.bytes ? res : null;
      if (!ctx.cache.images[ref]) ctx.warnings.push('imagen no encontrada: ' + ref);
    }).catch(function () {
      ctx.cache.images[ref] = null;
      ctx.warnings.push('imagen no encontrada: ' + ref);
    });
  }

  function loadEquation(ctx, latex, display) {
    var key = (display ? 'b:' : 'i:') + latex;
    if (ctx.cache.equations[key] !== undefined) return Promise.resolve();
    var renderer = ctx.deps.renderEquation;
    if (typeof renderer !== 'function') {
      ctx.cache.equations[key] = null;
      ctx.warnings.push('sin render de ecuaciones');
      return Promise.resolve();
    }
    return renderer(latex, display, display ? 560 : 320).then(function (res) {
      ctx.cache.equations[key] = res && res.bytes ? res : null;
      if (!ctx.cache.equations[key]) ctx.warnings.push('ecuacion no renderizada: ' + latex.slice(0, 60));
    }).catch(function () {
      ctx.cache.equations[key] = null;
      ctx.warnings.push('ecuacion no renderizada: ' + latex.slice(0, 60));
    });
  }

  /* ------------------------------------------------------------------ *
   * Runs -> hijos de parrafo
   * ------------------------------------------------------------------ */
  /* `defaults` ({italics, size, color, font}) se aplica solo cuando el run
   * no trae ese atributo: sirve para citas, codigo y captions. */
  function runToTextRun(D, run, ctx, palette, defaults) {
    var opts = { text: run.text };
    var def = defaults || {};
    if (run.bold) opts.bold = true;
    if (run.italic || def.italics) opts.italics = true;
    if (run.underline) opts.underline = {};
    if (run.strike) opts.strike = true;
    if (run.sup) opts.superScript = true;
    if (run.sub) opts.subScript = true;
    if (run.color) opts.color = legible(run.color, palette).replace('#', '');
    else if (def.color) opts.color = def.color;
    if (run.highlight) opts.shading = { fill: run.highlight.replace('#', '') };
    if (run.size) opts.size = Math.max(12, Math.min(144, Math.round(run.size * 2)));
    else if (def.size) opts.size = def.size;
    if (run.font === 'monospace') opts.font = 'Consolas';
    else if (run.font) opts.font = run.font;
    else if (def.font) opts.font = def.font;
    if (run.link || run.noteLink) {
      /* Enlace: color de enlace + subrayado, como en la app. */
      if (!run.color && !def.color) opts.color = palette.link.replace('#', '');
      if (!run.underline) opts.underline = {};
    }
    return new D.TextRun(opts);
  }

  /* Spec 12: nunca texto ilegible sobre fondo blanco de Word. */
  function legible(color, palette) {
    if (global.NoteDoc && global.NoteDoc.ensureLegible) {
      return global.NoteDoc.ensureLegible(color, '#ffffff', palette.text);
    }
    return color || palette.text;
  }

  /* Convierte runs en uno o mas Paragraph (los <br> parten el parrafo). */
  function runsToParagraphs(D, runs, ctx, paraOpts, runDefaults) {
    var out = [];
    var current = [];
    function flush() {
      if (!current.length) return;
      out.push(new D.Paragraph(Object.assign({}, paraOpts, { children: current })));
      current = [];
    }
    (runs || []).forEach(function (r) {
      if (!r) return;
      if (r.type === 'break' && !r.rule) { flush(); return; }
      if (r.type === 'text') {
        var text = r.text || '';
        if (!text) return;
        if (r.link) {
          current.push(new D.ExternalHyperlink({
            children: [runToTextRun(D, r, ctx, ctx.palette, runDefaults)],
            link: r.link
          }));
        } else {
          current.push(runToTextRun(D, r, ctx, ctx.palette, runDefaults));
        }
        return;
      }
      if (r.type === 'tab') { current.push(new D.TextRun('\t')); return; }
      if (r.type === 'equation') {
        var img = equationChild(D, r.latex, !!r.display, ctx);
        if (img) current.push(img);
        else current.push(new D.TextRun({ text: '$' + r.latex + '$', font: 'Consolas' }));
        return;
      }
      if (r.type === 'image') {
        var key = 'inline:' + String(r.src || '').slice(0, 64);
        var cached = ctx.cache.images[key];
        if (cached && cached.bytes) {
          try {
            var dims = fitInline(cached, r);
            current.push(new D.ImageRun({
              type: 'png', data: cached.bytes,
              transformation: { width: dims.w, height: dims.h }
            }));
          } catch (e) { ctx.warnings.push('imagen inline omitida'); }
        }
        return;
      }
    });
    flush();
    if (!out.length) out.push(new D.Paragraph(Object.assign({}, paraOpts, { children: [new D.TextRun('')] })));
    return out;
  }

  function equationChild(D, latex, display, ctx) {
    var key = (display ? 'b:' : 'i:') + latex;
    var cached = ctx.cache.equations[key];
    if (!cached || !cached.bytes) return null;
    try {
      var dims = display
        ? fitBlock(cached, MAX_IMG_PX)
        : fitInline(cached, null);
      return new D.ImageRun({
        type: 'png',
        data: cached.bytes,
        transformation: { width: dims.w, height: dims.h },
        altText: { title: 'ecuacion', description: latex, name: 'ecuacion' }
      });
    } catch (e) {
      ctx.warnings.push('ecuacion omitida: ' + latex.slice(0, 60));
      return null;
    }
  }

  function fitBlock(entry, maxW) {
    var w = entry.width || 300, h = entry.height || 60;
    if (w <= 0) w = 300;
    if (h <= 0) h = 60;
    if (w > maxW) { h = Math.round(h * maxW / w); w = maxW; }
    return { w: Math.max(1, w), h: Math.max(1, h) };
  }

  function fitInline(entry, run) {
    var w = entry.width || 60, h = entry.height || 20;
    var maxH = 30;
    if (run && run.width && run.height) { w = run.width; h = run.height; }
    if (h > maxH) { w = Math.round(w * maxH / h); h = maxH; }
    if (w > 320) { h = Math.round(h * 320 / w); w = 320; }
    return { w: Math.max(1, w), h: Math.max(1, h) };
  }

  /* ------------------------------------------------------------------ *
   * Bloques -> Paragraph / Table
   * ------------------------------------------------------------------ */
  var ALIGN_MAP = null;
  function alignOf(D, align) {
    if (!ALIGN_MAP) {
      ALIGN_MAP = {
        left: D.AlignmentType.LEFT,
        center: D.AlignmentType.CENTER,
        right: D.AlignmentType.RIGHT,
        justify: D.AlignmentType.JUSTIFIED
      };
    }
    return ALIGN_MAP[align] || D.AlignmentType.LEFT;
  }

  function headingStyle(D, level) {
    var H = D.HeadingLevel;
    return [H.HEADING_1, H.HEADING_2, H.HEADING_3, H.HEADING_4, H.HEADING_5, H.HEADING_6][
      Math.max(1, Math.min(6, level || 1)) - 1];
  }

  function blockToDocx(D, block, ctx, depth) {
    if (!block) return [];
    switch (block.type) {
      case 'heading': {
        var hp = {
          heading: headingStyle(D, block.level),
          alignment: alignOf(D, block.align),
          keepNext: true,
          spacing: { before: 240, after: 120 }
        };
        return runsToParagraphs(D, block.runs, ctx, hp);
      }
      case 'paragraph': {
        var po = {
          alignment: alignOf(D, block.align),
          spacing: { before: 40, after: 80 }
        };
        if (block.role === 'quote') {
          po.indent = { left: 720 };
          po.border = { left: { style: D.BorderStyle.SINGLE, size: 12, color: '999999', space: 8 } };
        }
        if (block.role === 'code') {
          po.shading = { fill: 'F2F2F2' };
          po.indent = { left: 360 };
        }
        /* El parser ya marca los runs de codigo con font monospace. */
        return runsToParagraphs(D, block.runs, ctx, po);
      }
      case 'list':
        return listToDocx(D, block, ctx, depth || 0);
      case 'table':
        return [tableToDocx(D, block, ctx)];
      case 'image':
        return imageToDocx(D, block, ctx);
      case 'media':
        return [mediaToDocx(D, block, ctx)];
      case 'equation': {
        var img = equationChild(D, block.latex, true, ctx);
        if (img) {
          return [new D.Paragraph({
            children: [img], alignment: D.AlignmentType.CENTER,
            spacing: { before: 120, after: 120 }
          })];
        }
        return [new D.Paragraph({
          children: [new D.TextRun({ text: block.latex, font: 'Consolas' })],
          spacing: { before: 120, after: 120 }
        })];
      }
      case 'rule':
        return [new D.Paragraph({
          border: { bottom: { style: D.BorderStyle.SINGLE, size: 6, color: '999999', space: 1 } },
          spacing: { before: 120, after: 120 },
          children: [new D.TextRun('')]
        })];
      case 'spacer':
        return [new D.Paragraph({ children: [new D.TextRun('')], spacing: { before: 60, after: 60 } })];
      default:
        ctx.warnings.push('bloque no soportado en DOCX: ' + block.type);
        if (block.runs) return runsToParagraphs(D, block.runs, ctx, {});
        if (block.blocks) {
          var acc = [];
          block.blocks.forEach(function (b) { acc = acc.concat(blockToDocx(D, b, ctx, depth)); });
          return acc;
        }
        return [];
    }
  }

  function listToDocx(D, block, ctx, depth) {
    var out = [];
    (block.items || []).forEach(function (item) {
      var level = Math.max(0, Math.min(8, (depth || 0) + (item.level || 0)));
      var prefix = !!item.checked;
      (item.blocks || []).forEach(function (sub, idx) {
        if (sub.type === 'list') {
          out = out.concat(listToDocx(D, sub, ctx, level + 1));
          return;
        }
        if (sub.type === 'paragraph') {
          var opts = {
            alignment: alignOf(D, sub.align),
            spacing: { before: 20, after: 20 }
          };
          if (block.ordered) opts.numbering = { reference: 'mb-ordered', level: level };
          else opts.bullet = { level: level };
          /* El checkbox se antepone como run: cae en el primer parrafo. */
          var runs = (prefix && idx === 0)
            ? [{ type: 'text', text: '☑ ' }].concat(sub.runs || [])
            : sub.runs;
          out = out.concat(runsToParagraphs(D, runs, ctx, opts));
          return;
        }
        /* Imagen/tabla dentro de un item: se emite tal cual tras el item. */
        out = out.concat(blockToDocx(D, sub, ctx, level + 1));
      });
      if (!(item.blocks || []).length) {
        var emptyOpts = { spacing: { before: 20, after: 20 } };
        if (block.ordered) emptyOpts.numbering = { reference: 'mb-ordered', level: level };
        else emptyOpts.bullet = { level: level };
        out.push(new D.Paragraph(Object.assign({}, emptyOpts, {
          children: [new D.TextRun(item.checked ? '☑' : '')]
        })));
      }
    });
    return out;
  }

  function tableToDocx(D, block, ctx) {
    var cols = Math.max(1, block.cols || 1);
    var colW = Math.floor(CONTENT_TWIP / cols);
    var columnWidths = [];
    for (var i = 0; i < cols; i++) columnWidths.push(colW);

    var border = function () {
      return { style: D.BorderStyle.SINGLE, size: 4, color: '999999' };
    };

    var rows = block.rows.map(function (row, ri) {
      var cells = [];
      for (var c = 0; c < cols; c++) {
        var cell = row[c];
        if (!cell) continue; /* ranura cubierta por rowspan/colspan */
        var children = [];
        (cell.blocks || []).forEach(function (b) {
          children = children.concat(blockToDocx(D, b, ctx, 0));
        });
        if (!children.length) children.push(new D.Paragraph({ children: [new D.TextRun('')] }));
        var cellOpts = { children: children, verticalAlign: D.VerticalAlign.TOP };
        if (cell.colspan > 1) cellOpts.columnSpan = cell.colspan;
        if (cell.rowspan > 1) cellOpts.rowSpan = cell.rowspan;
        var isHeader = ri < (block.headerRows || 0) || cell.header;
        if (isHeader) cellOpts.shading = { fill: 'EFEFEF' };
        cellOpts.borders = { top: border(), left: border(), bottom: border(), right: border() };
        if (cell.blocks.length === 1 && cell.blocks[0].type === 'paragraph' && cell.blocks[0].align) {
          /* La alineacion ya viaja en cada parrafo; nada extra que hacer. */
        }
        cells.push(new D.TableCell(cellOpts));
      }
      if (!cells.length) cells.push(new D.TableCell({ children: [new D.Paragraph('')] }));
      return new D.TableRow({ children: cells });
    });

    return new D.Table({
      columnWidths: columnWidths,
      rows: rows,
      width: { size: 100, type: D.WidthType.PERCENTAGE },
      layout: D.TableLayoutType.FIXED,
      borders: {
        top: border(), left: border(), bottom: border(),
        right: border(), insideH: border(), insideV: border()
      }
    });
  }

  function imageToDocx(D, block, ctx) {
    var out = [];
    var key = block.dataUrl ? 'data:' + (block.ref || '') : block.ref;
    var cached = key ? ctx.cache.images[key] : null;
    if (cached && cached.bytes) {
      try {
        var dims = fitBlock(cached, MAX_IMG_PX);
        if (block.width && block.height) {
          dims = fitKnown(block.width, block.height, MAX_IMG_PX);
        }
        out.push(new D.Paragraph({
          children: [new D.ImageRun({
            type: 'png', data: cached.bytes,
            transformation: { width: dims.w, height: dims.h }
          })],
          alignment: D.AlignmentType.CENTER,
          spacing: { before: 120, after: block.caption ? 40 : 120 }
        }));
      } catch (e) {
        ctx.warnings.push('imagen omitida en DOCX: ' + (block.name || block.ref || ''));
        out.push(captionFallback(D, block, ctx));
      }
    } else {
      out.push(captionFallback(D, block, ctx));
    }
    if (block.caption && block.caption.length) {
      block.caption.forEach(function (cap) {
        out = out.concat(runsToParagraphs(D, cap.runs, ctx, {
          alignment: D.AlignmentType.CENTER,
          spacing: { before: 0, after: 120 }
        }, { italics: true, size: 18, color: '666666' }));
      });
    }
    return out;
  }

  function captionFallback(D, block, ctx) {
    return new D.Paragraph({
      children: [new D.TextRun({
        text: '[IMAGEN: ' + (block.name || block.ref || 'imagen') + ']',
        italics: true, color: '666666'
      })],
      alignment: D.AlignmentType.CENTER,
      spacing: { before: 120, after: 120 }
    });
  }

  function fitKnown(w, h, maxW) {
    w = Number(w) || 300; h = Number(h) || 200;
    if (w > maxW) { h = Math.round(h * maxW / w); w = maxW; }
    return { w: Math.max(1, w), h: Math.max(1, h) };
  }

  function mediaToDocx(D, block, ctx) {
    var kind = block.kind === 'audio' ? 'AUDIO' : 'VIDEO';
    var parts = [kind + ': ' + (block.name || '')];
    if (block.size) parts.push(formatSize(block.size));
    return new D.Paragraph({
      children: [new D.TextRun({ text: '[' + parts.join(' · ') + ']', color: '666666', italics: true })],
      shading: { fill: 'F7F7F7' },
      spacing: { before: 80, after: 80 }
    });
  }

  function formatSize(bytes) {
    var n = Number(bytes);
    if (!isFinite(n) || n <= 0) return '';
    if (n < 1024) return n + ' B';
    if (n < 1048576) return (n / 1024).toFixed(1) + ' KB';
    return (n / 1048576).toFixed(1) + ' MB';
  }

  /* ------------------------------------------------------------------ *
   * Documento
   * ------------------------------------------------------------------ */
  function numberingConfig(D) {
    function bulletLevels() {
      var bullets = ['•', 'o', '–', '•', 'o', '–', '•', 'o', '–'];
      return bullets.map(function (ch, level) {
        return {
          level: level,
          format: D.LevelFormat.BULLET,
          text: ch,
          alignment: D.AlignmentType.LEFT,
          style: { paragraph: { indent: { left: (level + 1) * 360, hanging: 360 } } }
        };
      });
    }
    function orderedLevels() {
      var fmts = ['%1.', '%2.', '%3)', '%4.', '%5.', '%6)', '%7.', '%8.', '%9.'];
      return fmts.map(function (t, level) {
        return {
          level: level,
          format: D.LevelFormat.DECIMAL,
          text: t,
          alignment: D.AlignmentType.LEFT,
          style: { paragraph: { indent: { left: (level + 1) * 720, hanging: 360 } } }
        };
      });
    }
    return {
      config: [
        { reference: 'mb-bullet', levels: bulletLevels() },
        { reference: 'mb-ordered', levels: orderedLevels() }
      ]
    };
  }

  function buildDocument(D, doc, ctx) {
    var children = [];
    if (doc.title) {
      children.push(new D.Paragraph({
        heading: D.HeadingLevel.TITLE,
        children: [new D.TextRun(doc.title)]
      }));
    }
    (doc.blocks || []).forEach(function (block) {
      children = children.concat(blockToDocx(D, block, ctx, 0));
    });
    if (!children.length) {
      children.push(new D.Paragraph({ children: [new D.TextRun('')] }));
    }
    return new D.Document({
      numbering: numberingConfig(D),
      sections: [{
        properties: {
          page: {
            size: { width: PAGE_W_TWIP, height: 16838 },
            margin: { top: MARGIN_TWIP, right: MARGIN_TWIP, bottom: MARGIN_TWIP, left: MARGIN_TWIP }
          }
        },
        children: children
      }]
    });
  }

  function build(doc, deps, options) {
    var D = resolveDocx();
    var ctx = {
      D: D,
      deps: deps || {},
      options: options || {},
      palette: (doc && doc.palette) || { text: '#222222', link: '#0b5cad' },
      cache: { images: {}, equations: {} },
      warnings: []
    };
    return collectMedia(doc, ctx).then(function () {
      var document = buildDocument(D, doc, ctx);
      return D.Packer.toBlob(document).then(function (blob) {
        return { blob: blob, warnings: ctx.warnings.slice() };
      });
    });
  }

  /* Variante de solo-estructura para pruebas: devuelve los hijos sin
   * empaquetar (requiere collectMedia previo si hay imagenes). */
  function buildChildren(doc, deps) {
    var D = resolveDocx();
    var ctx = {
      D: D,
      deps: deps || {},
      options: {},
      palette: (doc && doc.palette) || { text: '#222222', link: '#0b5cad' },
      cache: { images: {}, equations: {} },
      warnings: []
    };
    var children = [];
    (doc.blocks || []).forEach(function (block) {
      children = children.concat(blockToDocx(D, block, ctx, 0));
    });
    return { children: children, warnings: ctx.warnings };
  }

  global.DocxExporter = {
    build: build,
    buildChildren: buildChildren,
    numberingConfig: function () { return numberingConfig(resolveDocx()); }
  };

  if (typeof module !== 'undefined' && module.exports) module.exports = global.DocxExporter;

})(typeof window !== 'undefined' ? window : globalThis);
