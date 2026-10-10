/* ==================================================
   DrawingNote — puente entre DrawingEditor y las notas
   --------------------------------------------------
   - Item de nota: { id, type:'drawing', drawingId, previewRef, drawing }
   - La vista previa (PNG/WebP) se muestra como una imagen normal
     (reutiliza loadNoteImages) y el modelo estructurado se guarda
     en item.drawing para poder reeditar sin perdidas.
   - Doble toque / doble clic / lápiz en la esquina = reeditar.
   ================================================== */
(function (global) {
  'use strict';

  var ESC = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' };

  function esc(s) {
    return String(s === null || s === undefined ? '' : s).replace(/[&<>"']/g, function (c) {
      return ESC[c];
    });
  }

  function t(key) {
    return typeof global.t === 'function' ? global.t(key) : key;
  }

  function findNote(noteId) {
    if (!global.state || !global.state.notes) return null;
    for (var i = 0; i < global.state.notes.length; i++) {
      if (global.state.notes[i].id === noteId) return global.state.notes[i];
    }
    return null;
  }

  function findItem(note, itemId) {
    if (!note || !note.items) return null;
    for (var i = 0; i < note.items.length; i++) {
      if (note.items[i].id === itemId) return note.items[i];
    }
    return null;
  }

  /* Referencias de archivo de un item de dibujo (vista previa + fondo). */
  function refs(item) {
    var out = [];
    if (!item || item.type !== 'drawing') return out;
    if (item.previewRef) out.push(String(item.previewRef));
    var bg = item.drawing && item.drawing.background;
    if (bg && bg.type === 'image' && bg.ref) out.push(String(bg.ref));
    return out;
  }

  function collectFromItems(items) {
    var out = [];
    (items || []).forEach(function (it) {
      refs(it).forEach(function (r) { if (out.indexOf(r) === -1) out.push(r); });
    });
    return out;
  }

  /* ---------------- creación ---------------- */

  function start() {
    var note = findNote(global.state ? global.state.activeNoteId : null);
    if (!note) return;
    var afterId = (typeof global.activeItemId !== 'undefined') ? global.activeItemId : null;
    global.DrawingEditor.start({
      onSave: function (res) { insertItem(note.id, afterId, res); },
      onCancel: function () {}
    });
  }

  function insertItem(noteId, afterId, res) {
    var note = findNote(noteId);
    if (!note || !res) return;
    if (!note.items) note.items = [];
    var item = {
      id: typeof global.genId === 'function' ? global.genId() : Date.now(),
      type: 'drawing',
      drawingId: res.drawingId || null,
      previewRef: res.previewRef || null,
      drawing: res.drawing
    };
    var idx = -1;
    if (afterId !== null && afterId !== undefined) {
      note.items.forEach(function (it, i) { if (it.id === afterId) idx = i; });
    }
    if (idx >= 0) note.items.splice(idx + 1, 0, item);
    else note.items.push(item);
    global.save();
    global.renderNoteContent();
  }

  /* ---------------- edición ---------------- */

  function open(noteId, itemId) {
    if (!global.DrawingEditor || global.DrawingEditor.isOpen()) return;
    var note = findNote(noteId);
    var item = findItem(note, itemId);
    if (!item || item.type !== 'drawing') return;

    if (!item.drawing || typeof item.drawing !== 'object') {
      item.drawing = { width: 900, height: 1200, background: { type: 'solid' }, strokes: [] };
    }

    global.DrawingEditor.open({
      mode: 'edit',
      drawing: global.DrawingEngine.normalize(item.drawing),
      previewRef: item.previewRef || null,
      drawingId: item.drawingId || null,
      onSave: function (res) {
        item.drawing = res.drawing;
        item.previewRef = res.previewRef;
        if (res.drawingId) item.drawingId = res.drawingId;
        global.save();
        global.renderNoteContent();
      },
      onCancel: function () {}
    });
  }

  /* ---------------- HTML del item ---------------- */

  function itemHtml(noteId, item) {
    var ref = item.previewRef || '';
    var label = t('drawingPreview');
    var html = '';
    html += '<div class="list-item image-item drawing-item" data-id="' + esc(item.id) + '"' +
      ' data-drawing-id="' + esc(item.drawingId || '') + '"' +
      ' ondblclick="DrawingNote.open(' + esc(noteId) + ', ' + esc(item.id) + ')"' +
      ' ontouchstart="DrawingNote.touchStart(event)"' +
      ' ontouchend="DrawingNote.touchEnd(event, ' + esc(noteId) + ', ' + esc(item.id) + ')">';
    html += '<div class="image-container">';
    if (ref) {
      html += '<img src="" data-ref="' + esc(ref) + '" alt="' + esc(label) + '" />';
    } else {
      html += '<div class="drawing-missing">&#x270F; ' + esc(t('drawingPreviewMissing')) + '</div>';
    }
    html += '</div>';
    html += '<span class="item-actions">';
    html += '<button class="btn btn-sm btn-icon" title="' + esc(t('edit')) + '"' +
      ' onclick="event.stopPropagation();DrawingNote.open(' + esc(noteId) + ', ' + esc(item.id) + ')">&#x270F;</button>';
    html += '<button class="btn btn-sm btn-icon" title="' + esc(t('del')) + '"' +
      ' onclick="event.stopPropagation();deleteItem(' + esc(noteId) + ', ' + esc(item.id) + ')">&times;</button>';
    html += '</span></div>';
    return html;
  }

  /* ---------------- doble toque (fallback móvil) ---------------- */

  var lastTap = { t: 0, id: null, x: 0, y: 0, sx: 0, sy: 0, st: 0 };

  function touchStart(e) {
    if (!e.changedTouches || !e.changedTouches.length) return;
    var p = e.changedTouches[0];
    lastTap.sx = p.clientX;
    lastTap.sy = p.clientY;
    lastTap.st = e.timeStamp || Date.now();
  }

  function touchEnd(e, noteId, itemId) {
    if (!e.changedTouches || !e.changedTouches.length) return;
    var now = e.timeStamp || Date.now();
    var p = e.changedTouches[0];
    var moved = Math.sqrt(
      Math.pow(p.clientX - lastTap.sx, 2) + Math.pow(p.clientY - lastTap.sy, 2)
    );
    var held = now - lastTap.st;
    if (moved > 30 || held > 500) { lastTap.t = 0; lastTap.id = null; return; }

    var sincePrev = now - lastTap.t;
    var nearPrev = lastTap.id === itemId &&
      Math.sqrt(Math.pow(p.clientX - lastTap.x, 2) + Math.pow(p.clientY - lastTap.y, 2)) < 40;

    if (sincePrev > 0 && sincePrev < 400 && nearPrev) {
      lastTap.t = 0;
      lastTap.id = null;
      open(noteId, itemId);
      return;
    }
    lastTap.t = now;
    lastTap.id = itemId;
    lastTap.x = p.clientX;
    lastTap.y = p.clientY;
  }

  global.DrawingNote = {
    start: start,
    open: open,
    itemHtml: itemHtml,
    refs: refs,
    collectFromItems: collectFromItems,
    touchStart: touchStart,
    touchEnd: touchEnd
  };
})(typeof window !== 'undefined' ? window : this);
