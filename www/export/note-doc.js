/* MiBabel - Capa intermedia de representacion de notas.
 *
 * Convierte el modelo interno de MiBabel (note.items[] con HTML crudo) en una
 * representacion estructurada independiente del formato de destino. Es el
 * unico lugar donde se interpreta el contenido de una nota: PDF, DOCX y TXT
 * consumen este mismo documento.
 *
 * No modifica la nota original. Toda la normalizacion ocurre en memoria.
 *
 * Bloques:  heading | paragraph | list | table | image | media |
 *           equation | rule | spacer
 * Runs:    text | break | tab | equation | image
 */
(function (global) {
  'use strict';

  /* ------------------------------------------------------------------ *
   * Constantes de papel (replican www/style.css:160-301)
   * ------------------------------------------------------------------ */
  var PAPER_UNIT_PX = 32;

  var PAPER_COLORS = ['default', 'white', 'yellow'];
  var PAPER_DESIGNS = ['none', 'lined', 'grid', 'dotted'];

  /* Resolucion del color de papel a un color plano imprimible.
   * 'default' se imprime sobre blanco: la apariencia oscura del tema de la
   * interfaz es una concerns de pantalla, no de documento (spec 12). */
  var PAPER_BASE = {
    default: '#ffffff',
    white: '#ffffff',
    yellow: '#fdf0b0'
  };

  /* Mezcla alfa sobre el color base, replicando los rgba() de style.css. */
  function blend(fg, alpha, bg) {
    var f = parseColor(fg), b = parseColor(bg);
    if (!f || !b) return bg;
    return rgbToHex([
      Math.round(f[0] * alpha + b[0] * (1 - alpha)),
      Math.round(f[1] * alpha + b[1] * (1 - alpha)),
      Math.round(f[2] * alpha + b[2] * (1 - alpha))
    ]);
  }

  /* Patrones por color de papel, tal como los define style.css. */
  function resolvePaper(bg) {
    var color = PAPER_COLORS.indexOf(bg && bg.color) !== -1 ? bg.color : 'default';
    var design = PAPER_DESIGNS.indexOf(bg && bg.design) !== -1 ? bg.design : 'none';
    var base = PAPER_BASE[color];
    var line, dot;
    if (color === 'default') {
      /* body.light -> --paper-line-light: rgba(0,0,0,0.16) */
      line = blend('#000000', 0.16, base);
      dot = line;
    } else {
      /* --paper-line-paper: rgba(90,130,190,0.42) */
      line = blend('rgb(90,130,190)', 0.42, base);
      /* --paper-dot-paper: rgba(90,130,190,0.55) */
      dot = blend('rgb(90,130,190)', 0.55, base);
    }
    return {
      color: color,
      design: design,
      base: base,
      line: line,
      dot: dot,
      unit: PAPER_UNIT_PX,
      textured: color === 'white' || color === 'yellow'
    };
  }

  /* ------------------------------------------------------------------ *
   * Colores
   * ------------------------------------------------------------------ */
  var NAMED_COLORS = {
    black: '#000000', silver: '#c0c0c0', gray: '#808080', grey: '#808080',
    white: '#ffffff', maroon: '#800000', red: '#ff0000', purple: '#800080',
    fuchsia: '#ff00ff', green: '#008000', lime: '#00ff00', olive: '#808000',
    yellow: '#ffff00', navy: '#000080', blue: '#0000ff', teal: '#008080',
    aqua: '#00ffff', orange: '#ffa500', transparent: null, inherit: null,
    initial: null, currentcolor: null
  };

  function parseColor(value) {
    if (value === null || value === undefined) return null;
    var v = String(value).trim().toLowerCase();
    if (!v) return null;
    if (v === 'transparent') return null;
    if (NAMED_COLORS.hasOwnProperty(v)) return NAMED_COLORS[v];
    var m = v.match(/^#([0-9a-f]{3,8})$/);
    if (m) {
      var h = m[1];
      if (h.length === 3) return '#' + h[0] + h[0] + h[1] + h[1] + h[2] + h[2];
      if (h.length === 6) return '#' + h;
      if (h.length === 4) return '#' + h[0] + h[0] + h[1] + h[1] + h[2] + h[2] + h[3] + h[3];
      if (h.length === 8) return '#' + h.slice(0, 6);
      return null;
    }
    m = v.match(/^rgba?\(([^)]+)\)$/);
    if (m) {
      var parts = m[1].split(/[\s,\/]+/).filter(function (x) { return x !== ''; });
      if (parts.length >= 3) {
        var r = clamp255(parseFloat(parts[0]));
        var g = clamp255(parseFloat(parts[1]));
        var b = clamp255(parseFloat(parts[2]));
        if (isNaN(r) || isNaN(g) || isNaN(b)) return null;
        var a = parts.length > 3 ? parseFloat(parts[3]) : 1;
        /* El color de fondo con alfa se conserva como color solido
         * aproximado; el alfa real no tiene equivalente en los formatos. */
        return rgbToHex([r, g, b]);
      }
    }
    m = v.match(/^hsla?\(([^)]+)\)$/);
    if (m) {
      var hp = m[1].split(/[\s,\/]+/).filter(function (x) { return x !== ''; });
      if (hp.length >= 3) {
        return hslToHex(parseFloat(hp[0]), parseFloat(hp[1]), parseFloat(hp[2]));
      }
    }
    return null;
  }

  function clamp255(n) { return Math.max(0, Math.min(255, Math.round(n))); }

  function rgbToHex(c) {
    return '#' + [c[0], c[1], c[2]].map(function (v) {
      var s = clamp255(v).toString(16);
      return s.length < 2 ? '0' + s : s;
    }).join('');
  }

  function hslToHex(h, s, l) {
    if (isNaN(h) || isNaN(s) || isNaN(l)) return null;
    h = ((h % 360) + 360) % 360 / 360; s /= 100; l /= 100;
    if (s === 0) { var g = clamp255(l * 255); return rgbToHex([g, g, g]); }
    var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    var p = 2 * l - q;
    return rgbToHex([hue2rgb(p, q, h + 1 / 3), hue2rgb(p, q, h), hue2rgb(p, q, h - 1 / 3)]);
  }

  function hue2rgb(p, q, t) {
    if (t < 0) t += 1;
    if (t > 1) t -= 1;
    if (t < 1 / 6) return p + (q - p) * 6 * t;
    if (t < 1 / 2) return q;
    if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
    return p;
  }

  /* Luminancia relativa WCAG, usada por el guard de legibilidad. */
  function luminance(hex) {
    var c = parseColor(hex);
    if (!c) return 1;
    var ch = [1, 3, 5].map(function (i) {
      var v = parseInt(c.substr(i, 2), 16) / 255;
      return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
    });
    return 0.2126 * ch[0] + 0.7152 * ch[1] + 0.0722 * ch[2];
  }

  function contrastRatio(a, b) {
    var la = luminance(a), lb = luminance(b);
    var hi = Math.max(la, lb), lo = Math.min(la, lb);
    return (hi + 0.05) / (lo + 0.05);
  }

  /* Spec 12: el documento exportado debe ser legible sea cual sea el tema de
   * la interfaz. Si el usuario eligio un color que sobre el papel de destino
   * queda ilegible (p.ej. blanco sobre papel blanco, posible desde la paleta
   * de la app), se oscurece en vez de perder el texto. */
  function ensureLegible(color, bg, fallback) {
    var c = parseColor(color);
    if (!c) return fallback;
    if (contrastRatio(c, bg) >= 3.0) return c;
    var target = luminance(bg) > 0.4 ? '#000000' : '#ffffff';
    var best = c;
    for (var i = 1; i <= 20; i++) {
      best = mixHex(c, target, i / 20);
      if (contrastRatio(best, bg) >= 3.0) break;
    }
    if (contrastRatio(best, bg) < 3.0) return fallback;
    return best;
  }

  function mixHex(a, b, t) {
    var ca = parseColor(a) || '#000000', cb = parseColor(b) || '#000000';
    return rgbToHex([
      parseInt(ca.substr(1, 2), 16) * (1 - t) + parseInt(cb.substr(1, 2), 16) * t,
      parseInt(ca.substr(3, 2), 16) * (1 - t) + parseInt(cb.substr(3, 2), 16) * t,
      parseInt(ca.substr(5, 2), 16) * (1 - t) + parseInt(cb.substr(5, 2), 16) * t
    ]);
  }

  /* ------------------------------------------------------------------ *
   * Tamano de fuente
   * ------------------------------------------------------------------ */
  var BASE_FONT_PT = 11;

  var ABSOLUTE_PT = {
    'xx-small': 6, 'x-small': 7, small: 8.5, medium: 11,
    'large': 13, 'x-large': 17, 'xx-large': 22
  };

  /* <font size="1..7"> (HTML legacy) */
  var FONT_SIZE_TAG = {
    1: 8.5, 2: 10, 3: 11, 4: 13, 5: 15, 6: 18, 7: 22
  };

  function parseFontSize(value) {
    if (!value) return null;
    var v = String(value).trim().toLowerCase();
    if (!v) return null;
    if (ABSOLUTE_PT[v] !== undefined) return ABSOLUTE_PT[v];
    var m = v.match(/^(-?[\d.]+)\s*(px|pt|em|rem|%)?$/);
    if (!m) return null;
    var n = parseFloat(m[1]);
    if (isNaN(n) || n <= 0) return null;
    var unit = m[2] || 'px';
    if (unit === 'pt') return n;
    if (unit === 'em' || unit === 'rem') return n * BASE_FONT_PT;
    if (unit === '%') return n * BASE_FONT_PT / 100;
    /* px: 1px = 0.75pt. El editor trabaja en px a 16px de base. */
    return n * 0.75;
  }

  function normalizeFontFamily(value) {
    if (!value) return null;
    var v = String(value).split(',')[0].trim().replace(/^["']|["']$/g, '');
    if (!v) return null;
    var lower = v.toLowerCase();
    if (lower === 'inherit' || lower === 'initial' || lower === 'unset') return null;
    var generic = ['serif', 'sans-serif', 'monospace', 'cursive', 'fantasy', 'system-ui'];
    if (generic.indexOf(lower) !== -1) {
      if (lower === 'monospace') return 'monospace';
      return null;
    }
    return v;
  }

  /* ------------------------------------------------------------------ *
   * Utilidades de estilo HTML
   * ------------------------------------------------------------------ */
  function parseStyleString(css) {
    var out = {};
    if (!css) return out;
    String(css).split(';').forEach(function (decl) {
      var i = decl.indexOf(':');
      if (i < 0) return;
      var key = decl.slice(0, i).trim().toLowerCase();
      var val = decl.slice(i + 1).trim();
      if (key) out[key] = val;
    });
    return out;
  }

  function textDecorationLine(style) {
    var d = style['text-decoration'] || style['text-decoration-line'];
    if (!d) return null;
    d = String(d).toLowerCase();
    if (d === 'none') return null;
    return d;
  }

  /* ------------------------------------------------------------------ *
   * Contexto de estilo acumulado durante el recorrido del DOM
   * ------------------------------------------------------------------ */
  function StyleContext(base) {
    this.bold = !!base.bold;
    this.italic = !!base.italic;
    this.underline = !!base.underline;
    this.strike = !!base.strike;
    this.color = base.color || null;
    this.highlight = base.highlight || null;
    this.size = base.size || null;
    this.font = base.font || null;
    this.link = base.link || null;
    this.sup = !!base.sup;
    this.sub = !!base.sub;
  }

  StyleContext.prototype.child = function (patch) {
    var c = new StyleContext(this);
    if (!patch) return c;
    for (var k in patch) {
      if (Object.prototype.hasOwnProperty.call(patch, k)) c[k] = patch[k];
    }
    return c;
  };

  StyleContext.prototype.toRun = function (text) {
    var run = { type: 'text', text: text };
    if (this.bold) run.bold = true;
    if (this.italic) run.italic = true;
    if (this.underline) run.underline = true;
    if (this.strike) run.strike = true;
    if (this.sup) run.sup = true;
    if (this.sub) run.sub = true;
    if (this.color) run.color = this.color;
    if (this.highlight) run.highlight = this.highlight;
    if (this.size) run.size = this.size;
    if (this.font) run.font = this.font;
    if (this.link) run.link = this.link;
    return run;
  };

  /* ------------------------------------------------------------------ *
   * Normalizacion de runs
   * ------------------------------------------------------------------ */
  function normalizeRuns(list) {
    var out = [];
    for (var i = 0; i < list.length; i++) {
      var r = list[i];
      if (!r) continue;
      if (r.type !== 'text') { out.push(r); continue; }
      var text = String(r.text === null || r.text === undefined ? '' : r.text);
      if (!text) continue;
      text = text.replace(/ /g, ' ');
      /* Espacios al inicio/fin de un run con formato se conservan; los
       * intercalados se colapsan solo si son multiples. */
      text = text.replace(/[ \t]{2,}/g, '  ');
      var last = out[out.length - 1];
      if (last && last.type === 'text' && sameFormat(last, r)) {
        last.text += text;
      } else {
        out.push(r);
      }
    }
    return out;
  }

  function sameFormat(a, b) {
    return !!a.bold === !!b.bold && !!a.italic === !!b.italic &&
      !!a.underline === !!b.underline && !!a.strike === !!b.strike &&
      !!a.sup === !!b.sup && !!a.sub === !!b.sub &&
      (a.color || null) === (b.color || null) &&
      (a.highlight || null) === (b.highlight || null) &&
      (a.size || null) === (b.size || null) &&
      (a.font || null) === (b.font || null) &&
      (a.link || null) === (b.link || null);
  }

  function runsToPlainText(runs) {
    var s = '';
    (runs || []).forEach(function (r) {
      if (!r) return;
      if (r.type === 'text') s += r.text;
      else if (r.type === 'break') s += r.rule ? '\n---\n' : '\n';
      else if (r.type === 'tab') s += '\t';
      else if (r.type === 'equation') s += (r.display ? '$$' + r.latex + '$$' : '$' + r.latex + '$');
      else if (r.type === 'image') s += '[imagen]';
    });
    return s;
  }

  function runsHaveContent(runs) {
    return (runs || []).some(function (r) {
      if (!r) return false;
      if (r.type === 'text') return /\S/.test(r.text || '');
      return true;
    });
  }

  function blocksHaveContent(blocks) {
    return (blocks || []).some(function (b) {
      if (!b) return false;
      if (b.type === 'paragraph' || b.type === 'heading') return runsHaveContent(b.runs);
      if (b.type === 'list') return b.items.length > 0;
      if (b.type === 'table') return b.rows.length > 0;
      return true;
    });
  }

  /* ------------------------------------------------------------------ *
   * Parser de HTML -> runs
   *
   * Se replica exactamente la semantica de MiBabel para que lo exportado
   * coincida con lo que el usuario ve:
   *   - LaTeX:  $$...$$  (bloque)  y  $...$  (inline, sin saltos de linea)
   *   - Enlaces a notas:  [(destino)]     Enlaces externos:  [{url}]
   * ------------------------------------------------------------------ */

  /* Substitucion de sintaxis interna por runs tipados. */
  function splitInternalSyntax(text, ctx, out) {
    if (!text) return;
    /* Enlaces, antes que LaTeX: pueden contener '$'. */
    var linkRe = /\[\(([^\]]+)\)\]|\[\{([^\]]+)\}\]|\[\[([^\]]+)\]\]/g;
    var last = 0, m;
    while ((m = linkRe.exec(text)) !== null) {
      if (m.index > last) emitLatex(text.slice(last, m.index), ctx, out);
      var isNote = m[1] !== undefined;
      var isUrl = m[2] !== undefined;
      var target = m[1] !== undefined ? m[1] : (m[2] !== undefined ? m[2] : m[3]);
      var run = ctx.child(isNote || isUrl ? {} : {}).toRun(target);
      if (isUrl) run.link = target;
      if (isNote) run.noteLink = target;
      run.kind = 'note-link';
      out.push(run);
      last = m.index + m[0].length;
    }
    if (last < text.length) emitLatex(text.slice(last), ctx, out);
  }

  /* Detecta $$...$$ y $...$ con los mismos limites que renderLatexInHtml(). */
  function emitLatex(text, ctx, out) {
    if (!text) return;
    if (text.indexOf('$') === -1) { pushText(text, ctx, out); return; }
    var buf = '';
    var i = 0;
    while (i < text.length) {
      var ch = text.charAt(i);
      if (ch === '\\' && i + 1 < text.length && text.charAt(i + 1) === '$') {
        /* \$ escapado: se emite como literal */
        buf += '$';
        i += 2;
        continue;
      }
      if (ch === '$') {
        /* Bloque: $$...$$ */
        if (text.charAt(i + 1) === '$') {
          var end = text.indexOf('$$', i + 2);
          if (end !== -1) {
            var latex = text.slice(i + 2, end);
            if (latex.trim()) {
              if (buf) { pushText(buf, ctx, out); buf = ''; }
              out.push({ type: 'equation', latex: latex.trim(), display: true });
            } else {
              buf += '$$';
            }
            i = end + 2;
            continue;
          }
        }
        /* Inline: $...$ sin saltos de linea, no codicioso */
        var close = -1;
        var j = i + 1;
        while (j < text.length) {
          if (text.charAt(j) === '\n') break;
          if (text.charAt(j) === '$') { close = j; break; }
          j++;
        }
        if (close !== -1) {
          var inl = text.slice(i + 1, close);
          if (inl.trim()) {
            if (buf) { pushText(buf, ctx, out); buf = ''; }
            out.push({ type: 'equation', latex: inl.trim(), display: false });
          } else {
            buf += '$';
          }
          i = close + 1;
          continue;
        }
      }
      buf += ch;
      i++;
    }
    if (buf) pushText(buf, ctx, out);
  }

  function pushText(text, ctx, out) {
    if (!text) return;
    out.push(ctx.toRun(text));
  }

  var SKIP_TAGS = { SCRIPT: 1, STYLE: 1, NOSCRIPT: 1, HEAD: 1, META: 1, LINK: 1, TITLE: 1 };

  var HEADING_TAGS = { H1: 1, H2: 2, H3: 3, H4: 4, H5: 5, H6: 6 };

  /* Elementos que abren y cierran un parrafo. */
  var BLOCK_TAGS = {
    DIV: 1, P: 1, SECTION: 1, ARTICLE: 1, HEADER: 1, FOOTER: 1, MAIN: 1,
    ADDRESS: 1, FIGURE: 1, FIGCAPTION: 1, CENTER: 1, BODY: 1, HTML: 1,
    H1: 1, H2: 1, H3: 1, H4: 1, H5: 1, H6: 1, LI: 1, TR: 1, DD: 1, DT: 1,
    BLOCKQUOTE: 1, PRE: 1, DETAILS: 1, SUMMARY: 1
  };

  /* Recorre un nodo DOM acumulando estilo y emitiendo runs. */
  function walkInline(node, ctx, out) {
    if (!node) return;
    if (node.nodeType === 3) {
      splitInternalSyntax(node.nodeValue, ctx, out);
      return;
    }
    if (node.nodeType !== 1) return;
    var tag = String(node.tagName || '').toUpperCase();
    if (SKIP_TAGS[tag]) return;

    var child = ctx;
    var patch = stylePatch(node, tag);
    if (patch) child = ctx.child(patch);

    /* Bloques que contienen bloques: se delega al parser de bloques.
     * El marcador viaja EN el flujo de runs para que pushParagraphs()
     * los emita exactamente donde aparecen. Diferirlos por un canal
     * lateral (estado) los adelantaba al principio del contenedor y
     * perdía los que iban separados por texto. */
    if (tag === 'UL' || tag === 'OL') {
      out.push({
        type: 'break', blockBreak: true,
        deferred: { kind: 'list', node: node, ordered: tag === 'OL', start: orderedStart(node) }
      });
      return;
    }
    if (tag === 'TABLE') {
      out.push({ type: 'break', blockBreak: true, deferred: { kind: 'table', node: node } });
      return;
    }
    if (tag === 'HR') {
      out.push({ type: 'break', rule: true, blockBreak: true });
      return;
    }
    if (tag === 'BR') {
      out.push({ type: 'break' });
      return;
    }
    if (tag === 'IMG') {
      var img = imageRunFromNode(node);
      if (img) out.push(img);
      return;
    }

    /* Un bloque abre y cierra parrafo: se marca con saltos para que
     * pushParagraphs() lo separe correctamente. */
    var isBlock = !!BLOCK_TAGS[tag];
    if (isBlock) out.push({ type: 'break', blockBreak: true });

    for (var i = 0; i < node.childNodes.length; i++) {
      walkInline(node.childNodes[i], child, out);
    }

    if (isBlock) out.push({ type: 'break', blockBreak: true });
  }

  function orderedStart(node) {
    var s = node.getAttribute && node.getAttribute('start');
    var n = parseInt(s, 10);
    return isNaN(n) || n < 1 ? 1 : n;
  }

  function stylePatch(node, tag) {
    var patch = null;
    var style = parseStyleString(node.getAttribute ? node.getAttribute('style') : null);

    if (tag === 'B' || tag === 'STRONG') patch = set(patch, 'bold', true);
    if (tag === 'I' || tag === 'EM' || tag === 'CITE' || tag === 'DFN' || tag === 'VAR') patch = set(patch, 'italic', true);
    if (tag === 'U' || tag === 'INS') patch = set(patch, 'underline', true);
    if (tag === 'S' || tag === 'STRIKE' || tag === 'DEL') patch = set(patch, 'strike', true);
    if (tag === 'SUP') patch = set(patch, 'sup', true);
    if (tag === 'SUB') patch = set(patch, 'sub', true);
    if (tag === 'MARK') patch = set(patch, 'highlight', '#ffff00');

    if (tag === 'FONT') {
      var fc = parseColor(node.getAttribute('color'));
      if (fc) patch = set(patch, 'color', fc);
      var fam = normalizeFontFamily(node.getAttribute('face'));
      if (fam) patch = set(patch, 'font', fam);
      var fs = node.getAttribute('size');
      if (fs !== null && fs !== undefined && fs !== '') {
        var n = parseInt(fs, 10);
        if (FONT_SIZE_TAG[n]) patch = set(patch, 'size', FONT_SIZE_TAG[n]);
      }
    }

    var color = parseColor(style.color);
    if (color) patch = set(patch, 'color', color);
    var bg = style['background-color'] || style.background;
    var hcolor = parseColor(bg);
    if (hcolor) patch = set(patch, 'highlight', hcolor);
    var fsize = parseFontSize(style['font-size']);
    if (fsize) patch = set(patch, 'size', fsize);
    var ffam = normalizeFontFamily(style['font-family']);
    if (ffam) patch = set(patch, 'font', ffam);

    var weight = style['font-weight'];
    if (weight) {
      if (weight === 'bold' || weight === 'bolder' || parseInt(weight, 10) >= 600) patch = set(patch, 'bold', true);
      if (weight === 'normal' || weight === 'lighter' || parseInt(weight, 10) <= 400) patch = set(patch, 'bold', false);
    }
    var fst = style['font-style'];
    if (fst === 'italic' || fst === 'oblique') patch = set(patch, 'italic', true);
    if (fst === 'normal') patch = set(patch, 'italic', false);

    var deco = textDecorationLine(style);
    if (deco) {
      if (deco.indexOf('underline') !== -1) patch = set(patch, 'underline', true);
      if (deco.indexOf('line-through') !== -1) patch = set(patch, 'strike', true);
    }

    if (tag === 'A') {
      var href = node.getAttribute && node.getAttribute('href');
      if (href) patch = set(patch, 'link', href);
    }
    return patch;
  }

  function set(obj, key, value) {
    if (!obj) obj = {};
    obj[key] = value;
    return obj;
  }

  function imageRunFromNode(node) {
    var src = node.getAttribute('src') || '';
    if (!src) return null;
    var w = parseInt(node.getAttribute('width'), 10) || 0;
    var h = parseInt(node.getAttribute('height'), 10) || 0;
    return {
      type: 'image',
      src: src,
      name: node.getAttribute('alt') || '',
      width: w > 0 ? w : null,
      height: h > 0 ? h : null
    };
  }

  /* ------------------------------------------------------------------ *
   * Parser de HTML -> bloques
   * ------------------------------------------------------------------ */

  /* Convierte HTML de item en una lista de bloques.
   * baseCtx: estilo heredado (ej. tamano de fuente de una celda). */
  function parseHtmlToBlocks(html, options) {
    options = options || {};
    var baseCtx = options.context || new StyleContext({});
    var warnings = options.warnings || null;

    var body = parseFragment(html);
    if (!body) {
      /* Sin DOM disponible: degradacion segura a texto plano. */
      var plain = htmlToTextFallback(html);
      if (!plain) return [];
      var outB = [];
      plain.split(/\n{2,}/).forEach(function (chunk) {
        var t = chunk.trim();
        if (!t) return;
        outB.push({ type: 'paragraph', align: 'left', runs: [baseCtx.toRun(t)] });
      });
      return outB;
    }

    var blocks = [];
    var current = newRuns();
    var curAlign = 'left';

    function flush() {
      pushParagraphs(blocks, current.runs, curAlign, null, baseCtx, warnings);
      current = newRuns();
    }

    /* Itera los hijos del cuerpo: BODY en si no aporta contenido. */
    var node = body.firstChild;
    while (node) {
      if (node.nodeType === 3) {
        splitInternalSyntax(node.nodeValue, baseCtx, current.runs);
      } else if (node.nodeType === 1) {
        var tag = String(node.tagName || '').toUpperCase();
        if (SKIP_TAGS[tag]) { node = node.nextSibling; continue; }

        if (tag === 'UL' || tag === 'OL') {
          flush();
          var listBlock = parseListElement(node, baseCtx, warnings);
          if (listBlock) blocks.push(listBlock);
          node = node.nextSibling;
          continue;
        }
        if (tag === 'TABLE') {
          flush();
          var tbl = parseTableElement(node, baseCtx, warnings);
          if (tbl) blocks.push(tbl);
          node = node.nextSibling;
          continue;
        }
        if (tag === 'HR') {
          flush();
          blocks.push({ type: 'rule' });
          node = node.nextSibling;
          continue;
        }
        if (HEADING_TAGS[tag]) {
          flush();
          blocks.push(parseHeadingElement(node, HEADING_TAGS[tag], baseCtx));
          node = node.nextSibling;
          continue;
        }
        if (tag === 'BLOCKQUOTE') {
          flush();
          var quoteRuns = [];
          walkInline(node, baseCtx, quoteRuns);
          pushParagraphs(blocks, quoteRuns, readAlign(node) || curAlign, 'quote', baseCtx, warnings);
          node = node.nextSibling;
          continue;
        }
        if (tag === 'PRE') {
          flush();
          var codeRuns = [];
          walkInline(node, baseCtx.child({ font: 'monospace' }), codeRuns);
          pushParagraphs(blocks, codeRuns, 'left', 'code', baseCtx, warnings);
          node = node.nextSibling;
          continue;
        }
        if (tag === 'CODE') {
          walkInline(node, baseCtx.child({ font: 'monospace' }), current.runs);
          node = node.nextSibling;
          continue;
        }

        var align = readAlign(node);
        var prevAlign = curAlign;
        if (align) curAlign = align;
        walkInline(node, baseCtx, current.runs);
        /* La alineacion del elemento solo aplica a su propio contenido:
         * se restaura la delPadre para los siguientes hermanos. */
        if (align) { flush(); curAlign = prevAlign; }
      }
      node = node.nextSibling;
    }
    flush();

    function newRuns() { return { runs: [] }; }

    return blocks;
  }

  /* Inserta en `blocks` los parrafos que surgen de `runs`, partiendo en los
   * marcadores de salto de bloque que emite walkInline(). Los marcadores
   * `deferred` (lista/tabla) y los `rule` (hr) se emiten EN el punto exacto
   * en que aparecen: si se emitieran fuera del flujo se adelantaban al
   * principio del contenedor o se perdian. */
  function pushParagraphs(blocks, runs, align, role, ctx, warnings) {
    var group = [];
    var base = ctx || new StyleContext({});

    function emitParagraph() {
      var norm = normalizeRuns(group);
      group = [];
      if (!runsHaveContent(norm)) return;
      var blk = { type: 'paragraph', align: normalizeAlign(align), runs: norm };
      if (role) blk.role = role;
      blocks.push(blk);
    }

    for (var i = 0; i < runs.length; i++) {
      var r = runs[i];
      if (r && r.type === 'break' && r.blockBreak) {
        emitParagraph();
        if (r.rule) {
          blocks.push({ type: 'rule' });
        } else if (r.deferred && r.deferred.kind === 'list') {
          var lb = parseListElement(r.deferred.node, base, warnings);
          if (lb) blocks.push(lb);
        } else if (r.deferred && r.deferred.kind === 'table') {
          var tb = parseTableElement(r.deferred.node, base, warnings);
          if (tb) blocks.push(tb);
        }
        continue;
      }
      group.push(r);
    }
    emitParagraph();
  }

  function normalizeAlign(a) {
    if (a === 'center' || a === 'right' || a === 'justify') return a;
    return 'left';
  }

  function readAlign(node) {
    if (!node || !node.getAttribute) return null;
    var direct = node.style && node.style.textAlign ? node.style.textAlign : null;
    if (!direct) {
      var css = parseStyleString(node.getAttribute('style'));
      direct = css['text-align'];
    }
    if (!direct) return null;
    direct = String(direct).toLowerCase();
    if (direct === 'center' || direct === 'right' || direct === 'justify') return direct;
    if (direct === 'start') return 'left';
    if (direct === 'end') return 'right';
    return null;
  }

  function parseHeadingElement(node, level, baseCtx) {
    var raw = [];
    walkInline(node, baseCtx, raw);
    /* El propio <hN> emite saltos de bloque que no forman parte del texto. */
    var runs = normalizeRuns(raw.filter(function (r) {
      return !(r.type === 'break' && r.blockBreak);
    }));
    return {
      type: 'heading',
      level: Math.max(1, Math.min(6, level)),
      align: readAlign(node) || 'left',
      runs: runs.length ? runs : [baseCtx.toRun(node.textContent || '')]
    };
  }

  /* ------------------------------------------------------------------ *
   * Listas
   * ------------------------------------------------------------------ */
  function parseListElement(node, baseCtx, warnings) {
    var tag = String(node.tagName || '').toUpperCase();
    var ordered = tag === 'OL';
    var items = [];
    var children = node.childNodes;
    for (var i = 0; i < children.length; i++) {
      var child = children[i];
      if (child.nodeType !== 1) continue;
      var ctag = String(child.tagName || '').toUpperCase();
      if (ctag !== 'LI') {
        /* Contenido no-LI dentro de una lista: se-promociona a item. */
        var extra = parseHtmlToBlocks(serializeNode(child), { context: baseCtx, warnings: warnings });
        if (extra.length) {
          items.push({ level: 0, checked: false, blocks: extra });
        }
        continue;
      }
      items.push(parseListItem(child, baseCtx, warnings));
    }
    if (!items.length) return null;
    return {
      type: 'list',
      ordered: ordered,
      start: orderedStart(node),
      items: items
    };
  }

  function parseListItem(node, baseCtx, warnings) {
    var blocks = parseHtmlToBlocks(serializeNode(node), { context: baseCtx, warnings: warnings });
    /* El propio <li> puede bringing alineacion propia. */
    var align = readAlign(node);
    if (align && blocks.length === 1 && blocks[0].type === 'paragraph') {
      blocks[0].align = align;
    }
    return { level: 0, checked: false, blocks: blocks };
  }

  function checkedFromNode(node) {
    if (!node) return false;
    var input = node.querySelector && node.querySelector('input[type="checkbox"]');
    if (input) return !!input.checked || input.hasAttribute('checked');
    var cls = node.className || '';
    if (typeof cls === 'string' && /\bchecked\b|\bdone\b/.test(cls)) return true;
    return false;
  }

  /* ------------------------------------------------------------------ *
   * Tablas
   * ------------------------------------------------------------------ */
  function parseTableElement(node, baseCtx, warnings) {
    var tableNode = node.tagName && String(node.tagName).toUpperCase() === 'TABLE' ? node : node.querySelector('table');
    if (!tableNode) return null;
    return tableFromNode(tableNode, baseCtx, warnings);
  }

  function tableFromNode(tableNode, baseCtx, warnings) {
    var trs = [];
    collectRows(tableNode, trs);
    if (!trs.length) return null;
    var grid = [];
    var maxCols = 0;
    trs.forEach(function (tr) {
      var row = [];
      var occupied = {};
      var tds = tr.childNodes;
      for (var i = 0; i < tds.length; i++) {
        var td = tds[i];
        if (td.nodeType !== 1) continue;
        var ttag = String(td.tagName || '').toUpperCase();
        if (ttag !== 'TD' && ttag !== 'TH') continue;
        var col = 0;
        while (occupied[col]) col++;
        var cs = parseInt(td.getAttribute('colspan'), 10) || 1;
        var rs = parseInt(td.getAttribute('rowspan'), 10) || 1;
        var align = readAlign(td) || readAlign(tr);
        var ctx = baseCtx.child({
          bold: ttag === 'TH' ? true : undefined,
          italic: undefined
        });
        var blocks = parseHtmlToBlocks(serializeNode(td), { context: ctx, warnings: warnings });
        var cell = {
          blocks: blocks.length ? blocks : [{ type: 'paragraph', align: 'left', runs: [] }],
          rowspan: rs,
          colspan: cs,
          align: align,
          header: ttag === 'TH',
          empty: !(td.textContent || '').trim()
        };
        for (var rr = 0; rr < rs; rr++) {
          for (var cc = 0; cc < cs; cc++) {
            occupied[col + cc] = (rr === 0 && cc === 0) ? cell : 'covered';
          }
        }
        row.push({ at: col, cell: cell });
        col += cs;
      }
      trs[trs.indexOf(tr)] = null;
      var normalized = [];
      var width = 0;
      for (var c = 0; c < col; c++) {
        normalized.push(null);
        width = Math.max(width, c + 1);
      }
      for (var k = 0; k < row.length; k++) {
        normalized[row[k].at] = row[k].cell;
      }
      maxCols = Math.max(maxCols, width);
      grid.push(normalized);
    });
    var out = [];
    grid.forEach(function (r) { if (r) out.push(r); });
    for (var i = 0; i < out.length; i++) {
      for (var j = 0; j < maxCols; j++) if (!out[i][j]) out[i][j] = null;
    }
    return buildTable(out, maxCols, readAlign(tableNode), detectHeader(out));
  }

  function collectRows(node, acc) {
    for (var i = 0; i < node.childNodes.length; i++) {
      var c = node.childNodes[i];
      if (c.nodeType !== 1) continue;
      var tag = String(c.tagName || '').toUpperCase();
      if (tag === 'TR') acc.push(c);
      else if (tag === 'THEAD' || tag === 'TBODY' || tag === 'TFOOT') collectRows(c, acc);
    }
  }

  /* Fila 0 uniformemente en negrita y con contenido -> se trata como cabecera.
   * MiBabel no tiene concepto de cabecera; se infiere para poder repetirla
   * al partir la tabla entre paginas. */
  function detectHeader(rows) {
    if (!rows.length || rows.length < 2) return 0;
    var first = rows[0];
    if (!first || !first.length) return 0;
    var allBold = first.every(function (cell) {
      if (!cell) return false;
      return cell.blocks.some(function (b) {
        return (b.runs || []).some(function (r) { return r.type === 'text' && r.bold && /\S/.test(r.text || ''); });
      });
    });
    return allBold ? 1 : 0;
  }

  function buildTable(rows, cols, align, headerRows) {
    return {
      type: 'table',
      align: normalizeAlign(align),
      rows: rows,
      cols: cols,
      headerRows: Math.max(0, Math.min(headerRows || 0, rows.length))
    };
  }

  /* ------------------------------------------------------------------ *
   * Serializacion / fragmento HTML
   * ------------------------------------------------------------------ */
  function parseFragment(html) {
    var str = String(html === null || html === undefined ? '' : html);
    if (!str) return null;
    try {
      if (typeof DOMParser !== 'undefined') {
        var doc = new DOMParser().parseFromString('<!doctype html><html><body>' + str + '</body></html>', 'text/html');
        if (doc && doc.body) return doc.body;
      }
    } catch (e) {
      console.warn('[NoteDoc] DOMParser unavailable, falling back', e);
    }
    try {
      if (typeof document !== 'undefined' && document.implementation && document.implementation.createHTMLDocument) {
        var d2 = document.implementation.createHTMLDocument('');
        var b2 = d2.createElement('body');
        b2.innerHTML = str;
        return b2;
      }
    } catch (e2) {
      console.warn('[NoteDoc] createHTMLDocument failed, falling back', e2);
    }
    return null;
  }

  function serializeNode(node) {
    if (!node) return '';
    if (node.nodeType === 3) return node.nodeValue;
    if (typeof node.outerHTML === 'string' && node.outerHTML) return node.outerHTML;
    if (node.nodeType === 1 && node.childNodes) {
      var s = '<' + node.tagName.toLowerCase();
      if (node.attributes) {
        for (var i = 0; i < node.attributes.length; i++) {
          var a = node.attributes[i];
          if (a.name === 'contenteditable' || a.name.indexOf('on') === 0) continue;
          s += ' ' + a.name + '="' + String(a.value).replace(/"/g, '&quot;') + '"';
        }
      }
      s += '>';
      for (var j = 0; j < node.childNodes.length; j++) s += serializeNode(node.childNodes[j]);
      return s + '</' + node.tagName.toLowerCase() + '>';
    }
    return '';
  }

  function htmlToTextFallback(html) {
    return String(html || '')
      .replace(/<\s*br\s*\/?\s*>/gi, '\n')
      .replace(/<\/\s*(p|div|li|tr|h[1-6])\s*>/gi, '\n')
      .replace(/<[^>]*>/g, '')
      .replace(/&nbsp;/gi, ' ')
      .replace(/&lt;/gi, '<').replace(/&gt;/gi, '>')
      .replace(/&quot;/gi, '"').replace(/&#0?39;/gi, "'")
      .replace(/&amp;/gi, '&')
      .replace(/\n{3,}/g, '\n\n')
      .trim();
  }

  /* ------------------------------------------------------------------ *
   * Nota -> documento
   * ------------------------------------------------------------------ */
  function parse(note, options) {
    options = options || {};
    var warnings = [];
    var doc = {
      type: 'document',
      title: '',
      noteId: note && note.id,
      createdAt: note && note.createdAt,
      diary: !!(note && note.diary),
      diaryDate: (note && note.diaryDate) || '',
      background: resolvePaper(normalizeBackground(note && note.background)),
      blocks: [],
      warnings: warnings
    };
    if (!note) return doc;

    doc.title = String(note.title || '').trim();
    doc.palette = buildPalette(doc.background.base);

    /* Portada: contenido de la nota, no puede perderse. */
    var cover = normalizeCover(note.cover);
    if (cover) doc.blocks.push(cover);

    var items = Array.isArray(note.items) ? note.items : [];
    if (!items.length) {
      doc.blocks.push({
        type: 'paragraph', align: 'left', muted: true,
        runs: [{ type: 'text', text: options.emptyLabel || 'Sin contenido' }]
      });
      return doc;
    }

    doc.blocks = blocksFromItems(items, options, warnings);

    /* Contenido adicional del diario: eventos y tareas. */
    if (note.diary) {
      var extra = diaryBlocks(note, warnings);
      if (extra.length) doc.blocks = doc.blocks.concat(extra);
    }
    return doc;
  }

  function normalizeBackground(bg) {
    /*Compatibilidad hacia atras: 'background' pudo ser un string plano. */
    if (!bg) return { color: 'default', design: 'none' };
    if (typeof bg === 'string') {
      if (PAPER_COLORS.indexOf(bg) !== -1) return { color: bg, design: 'none' };
      if (PAPER_DESIGNS.indexOf(bg) !== -1) return { color: 'default', design: bg };
      return { color: 'default', design: 'none' };
    }
    return {
      color: PAPER_COLORS.indexOf(bg.color) !== -1 ? bg.color : 'default',
      design: PAPER_DESIGNS.indexOf(bg.design) !== -1 ? bg.design : 'none'
    };
  }

  function normalizeCover(cover) {
    if (!cover) return null;
    var str = String(cover);
    if (str.indexOf('ref:') === 0) {
      return {
        type: 'image', ref: str.slice(4), name: '', width: null, height: null,
        caption: null, align: 'center', isCover: true
      };
    }
    if (/^(data:|https?:|file:|blob:|capacitor:)/i.test(str)) {
      return { type: 'image', dataUrl: str, name: '', width: null, height: null, caption: null, align: 'center', isCover: true };
    }
    return null;
  }

  function buildPalette(base) {
    var onPaper = luminance(base) > 0.4;
    return {
      paper: base,
      text: onPaper ? '#222222' : '#f2f2f2',
      heading: onPaper ? '#000000' : '#ffffff',
      muted: onPaper ? '#5a5a5a' : '#a8a8a8',
      border: onPaper ? '#9a9a9a' : '#555555',
      rule: onPaper ? '#b0b0b0' : '#666666',
      link: onPaper ? '#0b5cad' : '#6fb3ff',
      quoteBar: onPaper ? '#9a9a9a' : '#666666',
      codeBg: onPaper ? '#f2f2f2' : '#2a2a2a',
      mediaBg: onPaper ? '#f7f7f7' : '#262626',
      headerBg: onPaper ? '#efefef' : '#3a3a3a',
      defaultText: onPaper ? '#222222' : '#f2f2f2'
    };
  }

  /* Dispatcher de items. Punto unico de compatibilidad hacia atras:
   * cualquier forma de item desconocida se degrada a parrafo de texto
   * en vez de descartarse. */
  function blocksFromItems(items, options, warnings) {
    var blocks = [];
    var pendingList = null;

    function closeList() {
      if (pendingList && pendingList.items.length) blocks.push(pendingList);
      else if (pendingList && pendingList.items.length === 0) { /* nada */ }
      pendingList = null;
    }

    function pushListItem(item, ordered) {
      var level = Math.max(0, Math.min(8, Number(item.level) || 0));
      var entry = {
        level: level,
        checked: !!item.checked,
        blocks: itemHtmlToBlocks(item.text, warnings, options)
      };
      if (!pendingList || pendingList.ordered !== !!ordered) {
        closeList();
        pendingList = { type: 'list', ordered: !!ordered, start: 1, items: [] };
      }
      pendingList.items.push(entry);
    }

    for (var i = 0; i < items.length; i++) {
      var item = items[i];
      if (!item || typeof item !== 'object') continue;
      var type = normalizeItemType(item);

      switch (type) {
        case 'image': {
          closeList();
          var img = imageBlockFromItem(item, warnings);
          if (img) blocks.push(img);
          break;
        }
        case 'drawing': {
          closeList();
          var dwg = drawingBlockFromItem(item, warnings);
          if (dwg) blocks.push(dwg);
          break;
        }
        case 'audio':
        case 'video': {
          closeList();
          blocks.push(mediaBlockFromItem(item, type, warnings));
          break;
        }
        case 'table': {
          closeList();
          var tbl = tableBlockFromItem(item, warnings, options);
          if (tbl) blocks.push(tbl);
          break;
        }
        case 'list': {
          pushListItem(item, false);
          break;
        }
        case 'text': {
          closeList();
          var tblocks = itemHtmlToBlocks(item.text, warnings, options);
          /* Upgrade a titulo cuando el usuario escribio una linea grande y
           * en negrita (patron habitual al pegar contenido). */
          blocks = blocks.concat(promoteHeading(tblocks));
          break;
        }
        default: {
          /* Tipo desconocido: se preserva el texto en lugar de perderlo. */
          closeList();
          warnings.push('tipo de item no soportado: ' + String(item.type));
          blocks = blocks.concat(itemHtmlToBlocks(item.text, warnings, options));
        }
      }
    }
    closeList();
    return blocks;
  }

  function normalizeItemType(item) {
    var t = item.type;
    if (t === 'image' || t === 'audio' || t === 'video' || t === 'table' || t === 'text' || t === 'list' || t === 'drawing') return t;
    /* Sin tipo => lista (comportamiento de la app, isListType en script.js). */
    if (t === undefined || t === null || t === '') return 'list';
    return String(t);
  }

  function itemHtmlToBlocks(html, warnings, options) {
    var str = html === null || html === undefined ? '' : String(html);
    if (!str.trim()) return [];
    var blocks = parseHtmlToBlocks(str, { warnings: warnings });
    blocks = blocks.filter(function (b) { return b.type !== 'spacer'; });
    return blocks;
  }

  /* Un parrafo uniforme, en negrita y con cuerpo >= 15pt se promueve a
   * titulo. Nunca se aplica a listas ni a celdas. */
  function promoteHeading(blocks) {
    var out = [];
    blocks.forEach(function (b) {
      if (b.type !== 'paragraph' || !b.runs.length) { out.push(b); return; }
      var texts = b.runs.filter(function (r) { return r.type === 'text' && /\S/.test(r.text || ''); });
      var others = b.runs.filter(function (r) { return r.type !== 'text'; });
      if (!texts.length || others.length) { out.push(b); return; }
      var allBold = texts.every(function (r) { return r.bold; });
      var sizes = texts.map(function (r) { return r.size || BASE_FONT_PT; });
      var minSize = Math.min.apply(null, sizes);
      var uniformSize = minSize === Math.max.apply(null, sizes);
      if (allBold && uniformSize && minSize >= 15) {
        var level = minSize >= 22 ? 1 : (minSize >= 18 ? 2 : 3);
        out.push({ type: 'heading', level: level, align: b.align, runs: b.runs, promoted: true });
      } else {
        out.push(b);
      }
    });
    return out;
  }

  function imageBlockFromItem(item, warnings) {
    var ref = item.src || item.ref || null;
    if (!ref) {
      warnings.push('imagen sin referencia');
      return null;
    }
    return {
      type: 'image',
      ref: String(ref),
      name: refName(item, ref),
      width: Number(item.width) > 0 ? Number(item.width) : null,
      height: Number(item.height) > 0 ? Number(item.height) : null,
      caption: item.caption ? itemHtmlToBlocks(item.caption, warnings, {}) : null,
      align: 'center'
    };
  }

  /* Dibujo de la nota: se exporta como la vista previa rasterizada
   * (mismo ref que la app) conservando las dimensiones logicas. */
  function drawingBlockFromItem(item, warnings) {
    var ref = item.previewRef || null;
    if (!ref) {
      warnings.push('dibujo sin vista previa');
      return null;
    }
    var d = item.drawing && typeof item.drawing === 'object' ? item.drawing : {};
    var w = Number(d.width) > 0 ? Number(d.width) : null;
    var h = Number(d.height) > 0 ? Number(d.height) : null;
    return {
      type: 'image',
      drawing: true,
      ref: String(ref),
      name: 'Dibujo',
      width: w,
      height: h,
      caption: null,
      align: 'center'
    };
  }

  /* MiBabel no guarda el nombre original del archivo de imagen (solo
   * imagenes/<uuid>.webp), asi que se usa el identificador del ref. */
  function refName(item, ref) {
    if (item.name) return String(item.name);
    var base = String(ref).split('/').pop();
    return base || String(ref);
  }

  function mediaBlockFromItem(item, kind, warnings) {
    var ref = item.ref || item.src || null;
    var name = item.name || (ref ? String(ref).split('/').pop() : '');
    if (!ref && !name) {
      warnings.push('multimedia ' + kind + ' sin referencia');
    }
    return {
      type: 'media',
      kind: kind,
      ref: ref ? String(ref) : null,
      name: name || (kind === 'audio' ? 'audio' : 'video'),
      size: Number(item.size) > 0 ? Number(item.size) : null,
      mimeType: item.mimeType || null,
      heavy: !!(item.mode === 'file')
    };
  }

  /* Tabla desde el formato interno de MiBabel: cells[] plano con rowspan,
   * colspan y null en las ranuras cubiertas por una union. */
  function tableBlockFromItem(item, warnings, options) {
    var R = Math.max(1, Math.min(200, Number(item.rows) || 0));
    var C = Math.max(1, Math.min(60, Number(item.cols) || 0));
    var cells = Array.isArray(item.cells) ? item.cells : [];
    if (!R || !C) return null;
    if (!cells.length) {
      warnings.push('tabla sin celdas');
      return null;
    }

    var occupied = {};
    var rows = [];
    for (var r = 0; r < R; r++) {
      var row = [];
      for (var c = 0; c < C; c++) {
        row.push(null);
        occupied[r + ':' + c] = null;
      }
      rows.push(row);
    }

    for (var r2 = 0; r2 < R; r2++) {
      for (var c2 = 0; c2 < C; c2++) {
        var flatIdx = r2 * C + c2;
        var slot = occupied[r2 + ':' + c2];
        if (slot) {
          slot.covered++;
          continue;
        }
        var cell = cells[flatIdx];
        if (cell === null || cell === undefined) {
          /* Hueco real: celda vacia */
          rows[r2][c2] = {
            blocks: [{ type: 'paragraph', align: 'left', runs: [] }],
            rowspan: 1, colspan: 1, align: null, header: false, empty: true, covered: 0
          };
          continue;
        }
        var cs = clampSpan(cell.colspan, 1, C - c2);
        var rs = clampSpan(cell.rowspan, 1, R - r2);
        var text = cell.text === null || cell.text === undefined ? '' : String(cell.text);
        var blocks = text.trim()
          ? parseHtmlToBlocks(text, { warnings: warnings })
          : [];
        var cellBlock = {
          blocks: blocks.length ? blocks : [{ type: 'paragraph', align: 'left', runs: [] }],
          rowspan: rs,
          colspan: cs,
          align: null,
          header: false,
          empty: !text.trim(),
          covered: 0
        };
        rows[r2][c2] = cellBlock;
        for (var rr = 0; rr < rs; rr++) {
          for (var cc = 0; cc < cs; cc++) {
            occupied[(r2 + rr) + ':' + (c2 + cc)] = cellBlock;
          }
        }
      }
    }

    var headerRows = detectInternalHeader(rows, item);
    return buildTable(rows, C, normalizeAlign(item.align), headerRows);
  }

  function clampSpan(v, min, max) {
    var n = parseInt(v, 10);
    if (isNaN(n) || n < min) return min;
    if (n > max) return max;
    return n;
  }

  function detectInternalHeader(rows, item) {
    if (typeof item.headerRows === 'number') return Math.max(0, Math.min(item.headerRows, rows.length));
    if (rows.length < 2) return 0;
    var first = rows[0];
    var allBold = first.every(function (cell) {
      if (!cell) return false;
      return (cell.blocks || []).some(function (b) {
        return (b.runs || []).some(function (r) { return r.type === 'text' && r.bold && /\S/.test(r.text || ''); });
      });
    });
    return allBold ? 1 : 0;
  }

  function diaryBlocks(note, warnings) {
    var blocks = [];
    var events = Array.isArray(note.events) ? note.events : [];
    var tasks = Array.isArray(note.tasks) ? note.tasks : [];
    if (!events.length && !tasks.length) return blocks;

    var plain = { warnings: warnings };
    if (events.length) {
      blocks.push({ type: 'heading', level: 2, align: 'left', runs: [{ type: 'text', text: 'Eventos' }], muted: true });
      blocks.push({
        type: 'list', ordered: false, start: 1,
        items: events.map(function (ev) {
          return {
            level: 0, checked: false,
            blocks: [{
              type: 'paragraph', align: 'left',
              runs: [{ type: 'text', text: [ev.title, ev.time].filter(Boolean).join('  ·  ') }]
            }]
          };
        })
      });
    }
    if (tasks.length) {
      blocks.push({ type: 'heading', level: 2, align: 'left', runs: [{ type: 'text', text: 'Tareas' }], muted: true });
      blocks.push({
        type: 'list', ordered: false, start: 1,
        items: tasks.map(function (tk) {
          return {
            level: 0, checked: tk.status === 'completed',
            blocks: [{
              type: 'paragraph', align: 'left',
              runs: [{ type: 'text', text: [tk.title, tk.time].filter(Boolean).join('  ·  ') }]
            }]
          };
        })
      });
    }
    return blocks;
  }

  /* Decodifica un data:URL a bytes. Puro y sincrono. */
  function decodeDataUrl(url) {
    try {
      var m = String(url).match(/^data:([^;,]+)?(;base64)?,(.*)$/);
      if (!m || !m[3]) return null;
      var bin = typeof atob === 'function' ? atob(m[3])
        : Buffer.from(m[3], 'base64').toString('binary');
      var bytes = new Uint8Array(bin.length);
      for (var i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
      return { bytes: bytes, width: null, height: null };
    } catch (e) { return null; }
  }

  /* Resuelve una imagen data:URL en la cache: bytes sync + dimensiones
   * async via probeFn(url)->Promise<{width,height}|null>. */
  function resolveDataImage(cache, key, url, probeFn) {
    if (cache[key] !== undefined) return Promise.resolve(cache[key]);
    var entry = decodeDataUrl(url);
    cache[key] = entry;
    if (!entry || typeof probeFn !== 'function') return Promise.resolve(entry);
    return probeFn(url).then(function (dims) {
      if (dims && dims.width > 0 && dims.height > 0) {
        entry.width = dims.width;
        entry.height = dims.height;
      }
      return entry;
    }).catch(function () { return entry; });
  }

  /* ------------------------------------------------------------------ *
   * API
   * ------------------------------------------------------------------ */
  global.NoteDoc = {
    parse: parse,
    decodeDataUrl: decodeDataUrl,
    resolveDataImage: resolveDataImage,
    resolvePaper: resolvePaper,
    normalizeBackground: normalizeBackground,
    parseHtmlToBlocks: parseHtmlToBlocks,
    runsToPlainText: runsToPlainText,
    runsHaveContent: runsHaveContent,
    blocksHaveContent: blocksHaveContent,
    normalizeRuns: normalizeRuns,
    normalizeAlign: normalizeAlign,
    parseColor: parseColor,
    contrastRatio: contrastRatio,
    ensureLegible: ensureLegible,
    luminance: luminance,
    mixHex: mixHex,
    BASE_FONT_PT: BASE_FONT_PT,
    PAPER_COLORS: PAPER_COLORS,
    PAPER_DESIGNS: PAPER_DESIGNS
  };

  if (typeof module !== 'undefined' && module.exports) module.exports = global.NoteDoc;

})(typeof window !== 'undefined' ? window : globalThis);
