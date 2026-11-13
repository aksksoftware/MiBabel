/* Núcleo del Modo Lectura: anclaje de anotaciones y aplicación no
 * destructiva sobre el DOM renderizado.
 *
 * Las anotaciones NUNCA modifican el contenido guardado de la nota.
 * Se guardan como metadatos (note.annotations) y se reconstruyen en
 * cada render del modo lectura. El anclaje combina:
 *   - itemId (bloque estable de la nota normal, o "md" en Markdown)
 *   - quote (texto seleccionado)
 *   - prefix / suffix (contexto cercano)
 *   - startHint (pista de posición, nunca referencia única)
 */
var ReadingAnnotations = (function () {
  'use strict';

  var TYPES = { highlight: 1, textColor: 1, underline: 1, bold: 1, comment: 1 };
  var SHOW_TEXT = 4;

  function uid(prefix) {
    return (prefix || 'ra') + '_' + Date.now().toString(36) + '_' +
      Math.random().toString(36).slice(2, 9);
  }

  function clamp(v, min, max) {
    if (v < min) return min;
    if (v > max) return max;
    return v;
  }

  function normalizeItemId(id) {
    if (id === null || id === undefined || id === '') return null;
    if (id === 'md') return 'md';
    var n = Number(id);
    return isNaN(n) ? String(id) : n;
  }

  function makeSegment(text, start, end, itemId) {
    text = String(text == null ? '' : text);
    start = clamp(Math.floor(start || 0), 0, text.length);
    end = clamp(Math.floor(end || 0), 0, text.length);
    if (start > end) { var tmp = start; start = end; end = tmp; }
    while (start < end && /\s/.test(text.charAt(start))) start++;
    while (end > start && /\s/.test(text.charAt(end - 1))) end--;
    if (end <= start) return null;
    return {
      itemId: normalizeItemId(itemId),
      quote: text.slice(start, end),
      prefix: text.slice(Math.max(0, start - 40), start),
      suffix: text.slice(end, Math.min(text.length, end + 40)),
      startHint: start
    };
  }

  function cloneSegments(segments) {
    return (segments || []).map(function (s) {
      return {
        itemId: s.itemId,
        quote: s.quote,
        prefix: s.prefix || '',
        suffix: s.suffix || '',
        startHint: typeof s.startHint === 'number' ? s.startHint : null
      };
    });
  }

  function findAll(text, needle) {
    var out = [];
    if (!needle) return out;
    var pos = text.indexOf(needle);
    while (pos !== -1) {
      out.push(pos);
      pos = text.indexOf(needle, pos + needle.length);
    }
    return out;
  }

  function commonSuffixLen(a, b) {
    a = a || ''; b = b || '';
    var i = 0;
    while (i < a.length && i < b.length &&
      a.charAt(a.length - 1 - i) === b.charAt(b.length - 1 - i)) i++;
    return i;
  }

  function commonPrefixLen(a, b) {
    a = a || ''; b = b || '';
    var i = 0;
    while (i < a.length && i < b.length && a.charAt(i) === b.charAt(i)) i++;
    return i;
  }

  /* Texto normalizado + mapa de índices al original. Colapsa espacios
   * consecutivos para tolerar diferencias de maquetado/Markdown. */
  function normalizeWithMap(text) {
    var out = '';
    var map = [];
    var inWs = false;
    for (var i = 0; i < text.length; i++) {
      var ch = text.charAt(i);
      if (/\s/.test(ch)) {
        if (!inWs) { out += ' '; map.push(i); inWs = true; }
      } else {
        out += ch;
        map.push(i);
        inWs = false;
      }
    }
    return { text: out, map: map };
  }

  function bestOccurrence(text, quote, prefix, suffix, occurrences) {
    if (!occurrences.length) return -1;
    if (occurrences.length === 1) return occurrences[0];
    var best = occurrences[0];
    var bestScore = -1;
    for (var i = 0; i < occurrences.length; i++) {
      var idx = occurrences[i];
      var score = commonSuffixLen(text.slice(0, idx), prefix) +
        commonPrefixLen(text.slice(idx + quote.length), suffix);
      if (score > bestScore) { bestScore = score; best = idx; }
    }
    return best;
  }

  function findRange(text, segment) {
    if (!text || !segment || typeof segment.quote !== 'string' || !segment.quote) return null;
    var quote = segment.quote;
    var prefix = segment.prefix || '';
    var suffix = segment.suffix || '';
    var hint = segment.startHint;

    /* Pista rápida: solo se acepta si el texto coincide literalmente. */
    if (typeof hint === 'number' && hint >= 0 &&
        text.substr(hint, quote.length) === quote) {
      return { start: hint, end: hint + quote.length };
    }

    var occ = findAll(text, quote);
    if (occ.length) {
      var idx = bestOccurrence(text, quote, prefix, suffix, occ);
      return { start: idx, end: idx + quote.length };
    }

    /* Fallback tolerante a espacios (Markdown, saltos de línea, etc.). */
    var nt = normalizeWithMap(text);
    var nq = normalizeWithMap(quote).text;
    if (!nq) return null;
    var nOcc = findAll(nt.text, nq);
    if (!nOcc.length) return null;
    var nIdx = bestOccurrence(nt.text, nq, prefix, suffix, nOcc);
    var start = nt.map[nIdx];
    var endNorm = nIdx + nq.length;
    var end = endNorm >= nt.map.length ? text.length : nt.map[endNorm];
    if (start === undefined || end === undefined || end <= start) return null;
    return { start: start, end: end };
  }

  function rangesOverlap(aStart, aEnd, bStart, bEnd) {
    return aStart < bEnd && bStart < aEnd;
  }

  function normalizeNote(note) {
    if (!note) return note;
    if (!Array.isArray(note.annotations)) note.annotations = [];
    var isMd = note.type === 'markdown';
    var seen = {};
    var clean = [];
    note.annotations.forEach(function (a) {
      if (!a || typeof a !== 'object' || !TYPES[a.type] || !Array.isArray(a.segments)) return;
      var segs = [];
      a.segments.forEach(function (s) {
        if (!s || typeof s.quote !== 'string') return;
        var quote = s.quote.replace(/^\s+|\s+$/g, '');
        if (!quote) return;
        segs.push({
          itemId: isMd ? 'md' : normalizeItemId(s.itemId),
          quote: quote,
          prefix: typeof s.prefix === 'string' ? s.prefix : '',
          suffix: typeof s.suffix === 'string' ? s.suffix : '',
          startHint: typeof s.startHint === 'number' ? s.startHint : null
        });
      });
      if (!segs.length) return;
      var id = a.id && !seen[String(a.id)] ? String(a.id) : uid('ra');
      seen[id] = true;
      var ann = {
        id: id,
        type: a.type,
        noteId: note.id != null ? note.id : (a.noteId != null ? a.noteId : null),
        segments: segs,
        createdAt: a.createdAt || Date.now()
      };
      if (a.type === 'highlight' || a.type === 'textColor') {
        ann.color = a.color || (a.type === 'highlight' ? '#ffff00' : '#000000');
      }
      if (a.type === 'comment') {
        ann.text = String(a.text || '');
        ann.y = (typeof a.y === 'number' && isFinite(a.y)) ? a.y : null;
        ann.expanded = !!a.expanded;
      }
      clean.push(ann);
    });
    note.annotations = clean;
    if (typeof note.annotationsHidden !== 'boolean') note.annotationsHidden = false;
    return note;
  }

  function pruneItem(note, itemId) {
    if (!note || !Array.isArray(note.annotations)) return;
    var sid = String(itemId);
    note.annotations.forEach(function (a) {
      a.segments = (a.segments || []).filter(function (s) {
        return String(s.itemId) !== sid;
      });
    });
    note.annotations = note.annotations.filter(function (a) {
      return a.segments && a.segments.length;
    });
  }

  function pruneMissing(note) {
    if (!note || !Array.isArray(note.annotations)) return;
    var valid = {};
    (note.items || []).forEach(function (it) { valid[String(it.id)] = true; });
    var md = note.type === 'markdown';
    note.annotations = note.annotations.filter(function (a) {
      a.segments = (a.segments || []).filter(function (s) {
        if (md) return s.itemId === 'md' || s.itemId === null || s.itemId === undefined;
        return !!valid[String(s.itemId)];
      });
      return a.segments.length;
    });
  }

  function _doc() {
    return typeof document !== 'undefined' ? document : null;
  }

  function _isSkipped(node, root) {
    var p = node.parentNode;
    while (p && p !== root) {
      if (p.nodeType === 1) {
        var tag = (p.tagName || '').toLowerCase();
        if (/^(script|style|svg|img|video|audio|button|input|select|textarea)$/.test(tag)) return true;
        if (p.classList) {
          if (p.classList.contains('katex') || p.classList.contains('katex-block') ||
              p.classList.contains('katex-inline') || p.classList.contains('mibabel-search-hit') ||
              p.classList.contains('ra-bubble') || p.classList.contains('ra-delete-zone')) return true;
        }
      }
      p = p.parentNode;
    }
    return false;
  }

  function eligibleTextNodes(root) {
    var doc = _doc();
    if (!doc || !root) return [];
    var walker;
    try { walker = doc.createTreeWalker(root, SHOW_TEXT, null, false); }
    catch (e) { return []; }
    var nodes = [];
    while (walker.nextNode()) {
      var n = walker.currentNode;
      if (!n.nodeValue || _isSkipped(n, root)) continue;
      nodes.push(n);
    }
    return nodes;
  }

  function textOf(root) {
    return eligibleTextNodes(root).map(function (n) { return n.nodeValue; }).join('');
  }

  /* Desplazamiento dentro del texto "anotable" de root. Clona el
   * contenido previo y lo mide con la misma función textOf, de modo
   * que las anotaciones y la selección usan exactamente el mismo
   * criterio (excluye fórmulas, medios y controles). */
  function offsetAtPoint(root, container, offset) {
    var doc = _doc();
    if (!doc || !root) return 0;
    try {
      var pre = doc.createRange();
      pre.setStart(root, 0);
      pre.setEnd(container, offset);
      var div = doc.createElement('div');
      div.appendChild(pre.cloneContents());
      return textOf(div).length;
    } catch (e) {
      var nodes = eligibleTextNodes(root);
      var total = 0;
      for (var i = 0; i < nodes.length; i++) {
        if (nodes[i] === container) return total + Math.min(offset, nodes[i].nodeValue.length);
        total += nodes[i].nodeValue.length;
      }
      return total;
    }
  }

  function classFor(ann) {
    switch (ann.type) {
      case 'highlight': return 'ra-highlight';
      case 'textColor': return 'ra-text-color';
      case 'underline': return 'ra-underline';
      case 'bold': return 'ra-bold';
      case 'comment': return 'ra-comment-anchor';
      default: return '';
    }
  }

  /* Aplica una anotación a un root. Devuelve el rango resuelto y los
   * wrappers creados, sin alterar el texto (solo nodos <span>). */
  function applySegment(root, ann, segment) {
    var doc = _doc();
    if (!doc || !root || !ann || !segment) return null;
    var text = textOf(root);
    var range = findRange(text, segment);
    if (!range) return null;

    var nodes = eligibleTextNodes(root);
    var entries = [];
    var pos = 0;
    for (var i = 0; i < nodes.length; i++) {
      var len = nodes[i].nodeValue.length;
      entries.push({ node: nodes[i], start: pos, end: pos + len });
      pos += len;
    }

    var wrappers = [];
    /* De atrás hacia delante: dividir un nodo posterior no altera los
     * desplazamientos de los nodos anteriores. */
    for (var j = entries.length - 1; j >= 0; j--) {
      var e = entries[j];
      var s = Math.max(range.start, e.start);
      var en = Math.min(range.end, e.end);
      if (s >= en) continue;
      var node = e.node;
      var localStart = s - e.start;
      var localEnd = en - e.start;
      var nodeLen = node.nodeValue.length;
      if (localEnd < nodeLen) node.splitText(localEnd);
      if (localStart > 0) node = node.splitText(localStart);
      var span = doc.createElement('span');
      span.className = classFor(ann);
      span.setAttribute('data-ra-id', ann.id);
      if (ann.type === 'comment') span.setAttribute('data-ra-comment-id', ann.id);
      if (ann.color) span.style.setProperty('--ra-color', ann.color);
      node.parentNode.insertBefore(span, node);
      span.appendChild(node);
      wrappers.unshift(span);
    }
    return { start: range.start, end: range.end, wrappers: wrappers, first: wrappers[0] || null };
  }

  function unwrapAll(root) {
    if (!root) return;
    var spans = root.querySelectorAll('span[data-ra-id]');
    for (var i = 0; i < spans.length; i++) {
      var span = spans[i];
      var parent = span.parentNode;
      if (!parent) continue;
      while (span.firstChild) parent.insertBefore(span.firstChild, span);
      parent.removeChild(span);
      if (parent.normalize) parent.normalize();
    }
  }

  return {
    TYPES: TYPES,
    uid: uid,
    normalizeItemId: normalizeItemId,
    makeSegment: makeSegment,
    cloneSegments: cloneSegments,
    findRange: findRange,
    rangesOverlap: rangesOverlap,
    normalizeNote: normalizeNote,
    pruneItem: pruneItem,
    pruneMissing: pruneMissing,
    eligibleTextNodes: eligibleTextNodes,
    textOf: textOf,
    offsetAtPoint: offsetAtPoint,
    applySegment: applySegment,
    unwrapAll: unwrapAll
  };
})();

if (typeof window !== 'undefined') window.ReadingAnnotations = ReadingAnnotations;
if (typeof module !== 'undefined' && module.exports) module.exports = ReadingAnnotations;
