/* MiBabel - Exportador TXT.
 *
 * Serializa el documento intermedio a texto plano estructurado.
 * Prioridad: legibilidad + estructura + cero perdida de informacion.
 * No intenta simular alineacion, color, tamano ni otros rasgos visuales
 * que TXT no soporta (spec 4 y 14).
 */
(function (global) {
  'use strict';

  var NoteDoc = global.NoteDoc;

  var MAX_WIDTH = 100;      /* Ancho maximo de las tablas ASCII */
  var MAX_CELL = 46;        /* Ancho maximo de una celda */
  var INDENT = '    ';      /* Sangria por nivel de lista */

  /* ------------------------------------------------------------------ *
   * Runs -> texto
   * ------------------------------------------------------------------ */
  function runsToText(runs, opts) {
    opts = opts || {};
    var s = '';
    (runs || []).forEach(function (r) {
      if (!r) return;
      switch (r.type) {
        case 'text':
          s += r.text || '';
          break;
        case 'break':
          s += r.rule ? '\n---\n' : '\n';
          break;
        case 'tab':
          s += '\t';
          break;
        case 'equation':
          /* La fuente de verdad es el LaTeX: la informacion matematica
           * no se pierde nunca. */
          s += opts.inlineEquationsAsBlocks
            ? '\n[ECUACIÓN]\n' + r.latex + '\n[/ECUACIÓN]\n'
            : (r.display ? '\n[ECUACIÓN]\n' + r.latex + '\n[/ECUACIÓN]\n' : '$' + r.latex + '$');
          break;
        case 'image':
          s += '[IMAGEN' + (r.name ? ': ' + r.name : '') + ']';
          break;
        default:
          break;
      }
    });
    return s;
  }

  /* Colapsa a una sola linea: las celdas deben caber en la rejilla. */
  function toSingleLine(text) {
    return String(text || '')
      .replace(/\r\n?/g, '\n')
      .replace(/[\n\t]+/g, ' ')
      .replace(/ {2,}/g, ' ')
      .trim();
  }

  function displayWidth(s) {
    return String(s || '').length;
  }

  function pad(s, width, align) {
    var len = displayWidth(s);
    if (len >= width) return String(s);
    var padLen = width - len;
    if (align === 'right') return new Array(padLen + 1).join(' ') + s;
    if (align === 'center') {
      var left = Math.floor(padLen / 2);
      return new Array(left + 1).join(' ') + s + new Array(padLen - left + 1).join(' ');
    }
    return s + new Array(padLen + 1).join(' ');
  }

  /* ------------------------------------------------------------------ *
   * Bloques
   * ------------------------------------------------------------------ */
  function headingToText(block, out, state) {
    var text = toSingleLine(runsToText(block.runs));
    if (!text) return;
    var level = Math.max(1, Math.min(6, block.level || 1));
    state.pending.push({ type: 'heading', level: level, text: text });
  }

  function flushHeadings(out, state) {
    state.pending.forEach(function (h) {
      switch (h.level) {
        case 1:
          out.push(h.text);
          out.push(sep('=', h.text.length));
          break;
        case 2:
          out.push('## ' + h.text);
          break;
        case 3:
          out.push('### ' + h.text);
          break;
        case 4:
          out.push('#### ' + h.text);
          break;
        case 5:
          out.push('##### ' + h.text);
          break;
        default:
          out.push('###### ' + h.text);
          break;
      }
    });
    state.pending.length = 0;
  }

  function sep(ch, len) {
    var n = Math.max(4, Math.min(MAX_WIDTH, len || 8));
    return new Array(n + 1).join(ch);
  }

  function paragraphToText(block, out, state, indent, prefix, suffix) {
    flushHeadings(out, state);
    var raw = runsToText(block.runs);
    if (!raw.trim()) {
      /* Parrafo vacio con contenido no textual: conserva la referencia. */
      return;
    }
    var pad0 = indent || '';
    var lines = raw.replace(/\r\n?/g, '\n').split('\n');
    var first = true;
    lines.forEach(function (line) {
      var marker = first && prefix ? prefix + ' ' : '';
      var tail = (first && suffix) ? suffix : '';
      first = false;
      if (!line.trim() && !marker.trim()) { out.push(''); return; }
      out.push(pad0 + marker + line + tail);
    });
  }

  /* `depth` es la profundidad base a la que se imprime la lista; cada item
   * suma su propio nivel. */
  function listToText(block, out, state, depth) {
    flushHeadings(out, state);
    var counters = [];
    block.items.forEach(function (item) {
      var level = Math.max(0, Math.min(8, item.level || 0));
      var pad0 = new Array(depth + level + 1).join(INDENT);
      var marker;
      if (block.ordered) {
        counters[level] = (counters[level] === undefined ? (block.start || 1) - 1 : counters[level]) + 1;
        marker = counters[level] + '.' + (item.checked ? ' [x]' : '');
      } else {
        marker = item.checked ? '[x]' : '•';
      }
      var emitted = false;
      item.blocks.forEach(function (sub) {
        if (sub.type === 'list') {
          listToText(sub, out, state, depth + level + 1);
          emitted = true;
          return;
        }
        if (sub.type === 'paragraph') {
          paragraphToText(sub, out, state, pad0, emitted ? null : marker, null);
          emitted = true;
          return;
        }
        if (!emitted) { out.push(pad0 + marker); emitted = true; }
        blockToText(sub, out, state, pad0);
      });
      if (!emitted) out.push(pad0 + marker);
    });
  }

  function imageToText(block, out, state, indent) {
    flushHeadings(out, state);
    var pad0 = indent || '';
    if (block.drawing) {
      out.push(pad0 + '[Dibujo]');
      return;
    }
    var label = block.name || (block.ref ? String(block.ref).split('/').pop() : 'imagen');
    out.push(pad0 + '[IMAGEN: ' + label + ']');
    if (block.caption && block.caption.length) {
      var cap = toSingleLine(captionText(block.caption));
      if (cap) out.push(pad0 + '  ' + cap);
    }
  }

  function captionText(captionBlocks) {
    return (captionBlocks || [])
      .map(function (b) { return runsToText(b.runs); })
      .join(' ')
      .trim();
  }

  function mediaToText(block, out, state, indent) {
    flushHeadings(out, state);
    var pad0 = indent || '';
    var kind = block.kind === 'audio' ? 'AUDIO' : 'VIDEO';
    var parts = [kind + ': ' + (block.name || '')];
    if (block.size) parts.push(formatSize(block.size));
    if (block.mimeType) parts.push(block.mimeType);
    out.push(pad0 + '[' + parts.join(' · ') + ']');
  }

  function formatSize(bytes) {
    var n = Number(bytes);
    if (!isFinite(n) || n <= 0) return '';
    if (n < 1024) return n + ' B';
    if (n < 1048576) return (n / 1024).toFixed(1) + ' KB';
    return (n / 1048576).toFixed(1) + ' MB';
  }

  function equationToText(block, out, state, indent) {
    flushHeadings(out, state);
    var pad0 = indent || '';
    out.push(pad0 + '[ECUACIÓN]');
    block.latex.split('\n').forEach(function (l) { out.push(pad0 + '  ' + l); });
    out.push(pad0 + '[/ECUACIÓN]');
  }

  function ruleToText(out, state, indent) {
    flushHeadings(out, state);
    out.push((indent || '') + new Array(41).join('-'));
  }

  /* ------------------------------------------------------------------ *
   * Tablas -> rejilla ASCII
   * ------------------------------------------------------------------ */
  function tableToText(block, out, state, indent) {
    flushHeadings(out, state);
    var pad0 = indent || '';
    var grid = gridForText(block);
    if (!grid.rows.length) return;

    var widths = [];
    grid.cols.forEach(function (c) { widths.push(c); });
    /* Ajuste al ancho maximo: se encoge la columna mas ancha primero. */
    var total = widths.reduce(function (a, b) { return a + b + 3; }, 1);
    while (total > MAX_WIDTH) {
      var widest = 0;
      for (var i = 1; i < widths.length; i++) if (widths[i] > widths[widest]) widest = i;
      if (widths[widest] <= 8) break;
      widths[widest]--;
      total--;
    }

    function line(ch) {
      var parts = widths.map(function (w) { return new Array(w + 3).join(ch); });
      return pad0 + '+' + parts.join('+') + '+';
    }
    function rowLine(cells, aligns) {
      var out2 = [];
      for (var c = 0; c < widths.length; c++) {
        var text = cells[c] === undefined ? '' : cells[c];
        if (displayWidth(text) > widths[c]) {
          text = text.slice(0, Math.max(0, widths[c] - 1)) + '…';
        }
        out2.push(' ' + pad(text, widths[c], aligns && aligns[c]) + ' ');
      }
      return pad0 + '|' + out2.join('|') + '|';
    }

    out.push(line('-'));
    grid.rows.forEach(function (row, ri) {
      out.push(rowLine(row.cells, row.aligns));
      if (ri === grid.headerRows - 1) out.push(line('-'));
    });
    out.push(line('-'));
  }

  /* Colapsa rowspan/colspan para que la rejilla siga siendo legible:
   * colspan concatena horizontalmente, rowspan deja la celda en la fila
   * de origen. No se pierde texto. */
  function gridForText(block) {
    var C = Math.max(1, block.cols || 1);
    var matrix = [];
    block.rows.forEach(function (row) {
      var r = [];
      for (var c = 0; c < C; c++) {
        var cell = row[c];
        r.push(cell ? cellText(cell) : '');
      }
      matrix.push(r);
    });
    /* colspan: concatena las celdas cubiertas a la derecha. */
    block.rows.forEach(function (row, ri) {
      for (var c = 0; c < C; c++) {
        var cell = row[c];
        if (!cell || !cell.colspan || cell.colspan <= 1) continue;
        var parts = [matrix[ri][c]];
        for (var k = 1; k < cell.colspan && c + k < C; k++) {
          if (matrix[ri][c + k]) parts.push(matrix[ri][c + k]);
          matrix[ri][c + k] = '';
        }
        matrix[ri][c] = toSingleLine(parts.join(' '));
      }
    });
    /* rowspan: deja las filas siguientes vacias. */
    block.rows.forEach(function (row, ri) {
      for (var c = 0; c < C; c++) {
        var cell = row[c];
        if (!cell || !cell.rowspan || cell.rowspan <= 1) continue;
        for (var k = 1; k < cell.rowspan && ri + k < matrix.length; k++) {
          matrix[ri + k][c] = '';
        }
      }
    });

    var aligns = [];
    for (var i = 0; i < C; i++) aligns.push(block.align === 'center' ? 'center' : (block.align === 'right' ? 'right' : 'left'));

    /* Anchos de columna a partir del contenido. */
    var cols = [];
    for (var j = 0; j < C; j++) cols.push(1);
    matrix.forEach(function (row) {
      row.forEach(function (cell, j) {
        cols[j] = Math.max(cols[j], Math.min(MAX_CELL, displayWidth(cell)));
      });
    });

    return {
      cols: cols,
      headerRows: block.headerRows || 0,
      rows: matrix.map(function (row) {
        return { cells: row, aligns: aligns };
      })
    };
  }

  function cellText(cell) {
    var parts = (cell.blocks || [])
      .map(function (b) {
        if (b.type === 'list') {
          return b.items.map(function (it) {
            return (b.ordered ? '1. ' : '• ') + (it.blocks || [])
              .map(function (x) { return runsToText(x.runs); }).join(' ').trim();
          }).join(' ');
        }
        return runsToText(b.runs);
      })
      .filter(function (s) { return s && s.trim(); });
    return toSingleLine(parts.join(' '));
  }

  /* ------------------------------------------------------------------ *
   * Dispatcher
   * ------------------------------------------------------------------ */
  function blockToText(block, out, state, indent) {
    if (!block) return;
    switch (block.type) {
      case 'heading': headingToText(block, out, state); break;
      case 'paragraph': paragraphToText(block, out, state, indent, null, null); break;
      case 'list': listToText(block, out, state, indent ? indentLevel(indent) : 0); break;
      case 'table': tableToText(block, out, state, indent); break;
      case 'image': imageToText(block, out, state, indent); break;
      case 'media': mediaToText(block, out, state, indent); break;
      case 'equation': equationToText(block, out, state, indent); break;
      case 'rule': ruleToText(out, state, indent); break;
      case 'spacer': break;
      default:
        /* Bloque desconocido: se conserva su texto en vez de descartarlo. */
        if (block.runs) paragraphToText(block, out, state, indent, null, null);
        else if (block.blocks) block.blocks.forEach(function (b) { blockToText(b, out, state, indent); });
        break;
    }
  }

  function indentLevel(indent) {
    return Math.floor(String(indent).length / INDENT.length);
  }

  /* ------------------------------------------------------------------ *
   * Entrada publica
   * ------------------------------------------------------------------ */
  function toText(doc, options) {
    options = options || {};
    var out = [];
    var state = { pending: [] };

    if (doc.title) {
      out.push(doc.title);
      out.push(sep('='));
      out.push('');
    }

    doc.blocks.forEach(function (block) {
      blockToText(block, out, state, '');
      out.push('');
    });
    flushHeadings(out, state);

    /* Normalizacion final: sin mas de un salto de linea seguido y sin
     * espacios finales, que solo estorban en un archivo de texto. */
    var text = out.join('\n')
      .replace(/[ \t]+$/gm, '')
      .replace(/\n{3,}/g, '\n\n')
      .replace(/^\n+/, '')
      .replace(/\n+$/, '\n');

    if (!text.trim()) text = (options.emptyLabel || 'Sin contenido') + '\n';
    return text;
  }

  global.TxtExporter = {
    toText: toText,
    toBlob: function (doc, options) {
      var text = toText(doc, options);
      return new global.Blob([text], { type: 'text/plain;charset=utf-8' });
    },
    runsToText: runsToText,
    gridForText: gridForText
  };

  if (typeof module !== 'undefined' && module.exports) module.exports = global.TxtExporter;

})(typeof window !== 'undefined' ? window : globalThis);
