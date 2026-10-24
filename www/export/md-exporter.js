var MdExporter = (function () {
  'use strict';

  function _escapeText(s) {
    return String(s == null ? '' : s)
      .replace(/\\/g, '\\\\')
      .replace(/([`*_[\]<>])/g, '\\$1');
  }

  function _escapeLineStarts(s) {
    return String(s)
      .replace(/^(\s*)([#>+-])/gm, '$1\\$2')
      .replace(/^(\s*)(\d+)\./gm, '$1$2\\.');
  }

  function _codeSpan(text) {
    var t = String(text == null ? '' : text);
    if (!t) return '';
    var fence = '`';
    while (t.indexOf(fence) !== -1) fence += '`';
    var pad = /^\s|\s$/.test(t) ? ' ' : '';
    return fence + pad + t + pad + fence;
  }

  function _textOf(runs) {
    return (runs || []).map(function (r) {
      if (!r) return '';
      if (r.type === 'text') return r.text || '';
      if (r.type === 'break') return '\n';
      if (r.type === 'tab') return '\t';
      if (r.type === 'equation') return (r.display ? '$$' : '$') + (r.latex || '') + (r.display ? '$$' : '$');
      if (r.type === 'image') return r.name || '';
      return '';
    }).join('');
  }

  function _formatRun(run, warnings, ctx) {
    if (!run) return '';
    if (run.type === 'break') return run.blockBreak ? '\n\n' : '  \n';
    if (run.type === 'tab') return '\t';
    if (run.type === 'equation') {
      if (run.display) return '\n$$\n' + (run.latex || '') + '\n$$\n';
      return '$' + (run.latex || '') + '$';
    }
    if (run.type === 'image') {
      var src = run.src || run.ref || '';
      if (!src) {
        warnings.push('imagen sin referencia');
        return _escapeText(run.name || '');
      }
      return '![' + _escapeText(run.name || '') + '](' + src + ')';
    }
    if (run.type !== 'text') return _escapeText(run.text || '');

    var text = _escapeLineStarts(_escapeText(run.text || ''));
    if (run.highlight) text = '<mark>' + text + '</mark>';
    if (run.sup) text = '<sup>' + text + '</sup>';
    if (run.sub) text = '<sub>' + text + '</sub>';
    if (run.strike) text = '~~' + text + '~~';
    if (run.underline) text = '<u>' + text + '</u>';
    if (run.italic) text = '*' + text + '*';
    if (run.bold) text = '**' + text + '**';
    if (run.link) {
      text = '[' + text + '](' + run.link + ')';
    } else if (run.noteLink) {
      text = '[' + text + '](mibabel-note:' + encodeURIComponent(String(run.noteLink)) + ')';
    }
    if (run.color || run.size || run.font) {
      if (!ctx.lossWarned) {
        warnings.push('se omitieron colores, tamanos o tipografias sin equivalente Markdown');
        ctx.lossWarned = true;
      }
    }
    return text;
  }

  function _inline(runs, warnings, ctx) {
    var out = '';
    (runs || []).forEach(function (r) { out += _formatRun(r, warnings, ctx); });
    return out;
  }

  function _blockToInline(block, warnings, ctx) {
    if (!block) return '';
    if (block.type === 'paragraph') return _inline(block.runs, warnings, ctx).replace(/\n{2,}/g, ' ').replace(/\s*\n\s*/g, ' ');
    if (block.type === 'heading') return _inline(block.runs, warnings, ctx);
    if (block.type === 'equation') return (block.display ? '$$' : '$') + (block.latex || '') + (block.display ? '$$' : '$');
    if (block.type === 'image') return '![' + _escapeText(block.name || '') + '](' + (block.ref || block.dataUrl || '') + ')';
    if (block.type === 'media') return '[' + _escapeText(block.name || block.kind || 'media') + '](' + (block.ref || '') + ')';
    if (block.type === 'rule') return '---';
    if (block.type === 'list') {
      return (block.items || []).map(function (it) { return _textOfBlockList(it, warnings, ctx); }).join('; ');
    }
    if (block.type === 'table') {
      warnings.push('tabla anidada convertida a texto');
      return _tableText(block, warnings, ctx);
    }
    return _textOf(block.runs).replace(/\n/g, ' ');
  }

  function _textOfBlockList(item, warnings, ctx) {
    return (item.blocks || []).map(function (b) { return _blockToInline(b, warnings, ctx); }).filter(Boolean).join(' ');
  }

  function _renderList(block, warnings, ctx) {
    var lines = [];
    var start = Number(block.start) > 0 ? Number(block.start) : 1;
    (block.items || []).forEach(function (item, idx) {
      var indent = '  '.repeat((ctx.depth || 0) + (Number(item.level) || 0));
      var marker = block.ordered ? (start + idx) + '. ' : '- ';
      var task = (item.checked === true || item.task === true) ? (item.checked ? '[x] ' : '[ ] ') : '';
      var inner = [];
      (item.blocks || []).forEach(function (b) {
        if (!b) return;
        if (b.type === 'list') {
          inner.push(_renderList(b, warnings, { depth: 0, lossWarned: ctx.lossWarned }));
        } else if (b.type === 'paragraph') {
          inner.push(_inline(b.runs, warnings, ctx).replace(/\n{2,}/g, '  \n'));
        } else if (b.type === 'heading') {
          inner.push('**' + _inline(b.runs, warnings, ctx) + '**');
        } else if (b.type === 'rule') {
          inner.push('---');
        } else if (b.type === 'table') {
          warnings.push('tabla dentro de lista convertida a texto');
          inner.push(_tableText(b, warnings, ctx));
        } else {
          inner.push(_blockToInline(b, warnings, ctx));
        }
      });
      if (!inner.length) inner.push('');
      var first = inner.shift() || '';
      lines.push(indent + marker + task + first);
      inner.forEach(function (line) {
        String(line).split('\n').forEach(function (l) {
          lines.push(indent + '  ' + l);
        });
      });
    });
    return lines.join('\n');
  }

  function _cellText(cell, warnings, ctx) {
    if (!cell) return '';
    var text = (cell.blocks || []).map(function (b) {
      return _blockToInline(b, warnings, ctx);
    }).filter(Boolean).join(' <br> ');
    return text.replace(/\|/g, '\\|').replace(/\n/g, '<br>');
  }

  function _alignMarker(align) {
    if (align === 'center') return ':---:';
    if (align === 'right') return '---:';
    return '---';
  }

  function _tableText(block, warnings, ctx) {
    var rows = block.rows || [];
    if (!rows.length) return '';
    var cols = block.cols || (rows[0] ? rows[0].length : 0) || 1;
    var headerCount = Math.max(0, Math.min(block.headerRows || 0, rows.length));
    var header = [];
    var body = [];
    var hasMerge = false;

    function rowToCells(row) {
      var cells = [];
      for (var c = 0; c < cols; c++) {
        var cell = row && row[c];
        var text = _cellText(cell, warnings, ctx);
        cells.push(text);
        if (cell && ((cell.colspan || 1) > 1 || (cell.rowspan || 1) > 1)) hasMerge = true;
        if (cell && (cell.colspan || 1) > 1) {
          for (var k = 1; k < cell.colspan; k++) cells.push('');
        }
      }
      while (cells.length < cols) cells.push('');
      return cells.slice(0, cols);
    }

    if (headerCount > 0) {
      header = rowToCells(rows[0]);
      body = rows.slice(1).map(rowToCells);
    } else {
      header = [];
      for (var c = 0; c < cols; c++) header.push('');
      body = rows.map(rowToCells);
    }
    if (hasMerge) warnings.push('se perdieron celdas combinadas de una tabla (rowspan/colspan)');

    var out = [];
    out.push('| ' + header.join(' | ') + ' |');
    out.push('| ' + header.map(function () { return _alignMarker(block.align); }).join(' | ') + ' |');
    body.forEach(function (cells) { out.push('| ' + cells.join(' | ') + ' |'); });
    return out.join('\n');
  }

  function _renderBlock(block, warnings, ctx) {
    if (!block) return '';
    switch (block.type) {
      case 'heading':
        return '#'.repeat(Math.max(1, Math.min(6, block.level || 1))) + ' ' + _inline(block.runs, warnings, ctx);
      case 'paragraph': {
        var text = _inline(block.runs, warnings, ctx);
        if (block.role === 'code') {
          var raw = _textOf(block.runs);
          var fence = '```';
          while (raw.indexOf(fence) !== -1) fence += '`';
          return fence + '\n' + raw + '\n' + fence;
        }
        if (block.role === 'quote') {
          return text.split('\n').map(function (line) { return '> ' + line; }).join('\n');
        }
        return text;
      }
      case 'list':
        return _renderList(block, warnings, ctx);
      case 'table':
        return _tableText(block, warnings, ctx);
      case 'equation':
        return (block.display ? '$$\n' + (block.latex || '') + '\n$$' : '$' + (block.latex || '') + '$');
      case 'image': {
        if (block.isCover) {
          warnings.push('la portada de la nota no se incluye en Markdown');
          return '';
        }
        var src = block.ref || block.dataUrl || '';
        if (!src) { warnings.push('imagen sin referencia'); return _escapeText(block.name || ''); }
        var img = '![' + _escapeText(block.name || '') + '](' + src + ')';
        var caption = block.caption ? _cellText({ blocks: block.caption }, warnings, ctx) : '';
        return caption ? img + '\n\n*' + caption + '*' : img;
      }
      case 'media': {
        var label = (block.kind === 'audio' ? 'Audio' : 'Video') + ': ' + (block.name || '');
        if (!block.ref) {
          warnings.push((block.kind || 'multimedia') + ' sin archivo asociado');
          return '*' + _escapeText(label) + '*';
        }
        var media = '[' + _escapeText(label) + '](' + block.ref + ')';
        if (block.heavy) {
          warnings.push('video pesado local: se exporta solo la referencia, no el archivo');
          media += '\n\n*Video local no incluido en el paquete.*';
        }
        return media;
      }
      case 'rule':
        return '---';
      case 'spacer':
        return '';
      default:
        if (block.runs) return _inline(block.runs, warnings, ctx);
        warnings.push('bloque no reconocido omitido: ' + (block.type || 'desconocido'));
        return '';
    }
  }

  function toMarkdown(doc, options) {
    options = options || {};
    var warnings = [];
    var ctx = { depth: 0, lossWarned: false };
    var blocks = doc && Array.isArray(doc.blocks) ? doc.blocks : [];
    var parts = [];
    blocks.forEach(function (block) {
      var text = _renderBlock(block, warnings, ctx);
      if (text === null || text === undefined) return;
      if (!String(text).trim() && block.type !== 'spacer') return;
      parts.push(String(text));
    });
    var markdown = parts.join('\n\n').replace(/\n{3,}/g, '\n\n').replace(/^\s+|\s+$/g, '');
    if (options.title) markdown = '# ' + _escapeText(options.title) + '\n\n' + markdown;
    if (markdown) markdown += '\n';
    return { markdown: markdown, warnings: warnings };
  }

  function collectAssetRefs(doc) {
    var refs = [];
    function push(ref) {
      if (ref && /^(imagenes|audios|videos)\//.test(ref) && refs.indexOf(ref) === -1) refs.push(ref);
    }
    function scanBlocks(blocks) {
      (blocks || []).forEach(function (block) {
        if (!block) return;
        if (block.type === 'image' && block.ref) push(block.ref);
        if (block.type === 'media' && block.ref && !block.heavy) push(block.ref);
        if (block.type === 'table') {
          (block.rows || []).forEach(function (row) {
            (row || []).forEach(function (cell) {
              if (cell && cell.blocks) scanBlocks(cell.blocks);
            });
          });
        }
        if (block.type === 'list') {
          (block.items || []).forEach(function (it) { scanBlocks(it.blocks); });
        }
        if (block.type === 'paragraph' || block.type === 'heading') {
          (block.runs || []).forEach(function (r) {
            if (r && r.type === 'image') push(r.src || r.ref);
          });
        }
      });
    }
    scanBlocks(doc && doc.blocks);
    return refs;
  }

  return {
    toMarkdown: toMarkdown,
    collectAssetRefs: collectAssetRefs
  };
})();

if (typeof window !== 'undefined') window.MdExporter = MdExporter;
if (typeof module !== 'undefined' && module.exports) module.exports = MdExporter;
