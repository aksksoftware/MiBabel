/* ==================================================
   DrawingBoard — modo dibujo de los tableros
   --------------------------------------------------
   Capa de dibujo transparente, unica y persistente por
   tablero. Reutiliza el motor existente (DrawingEngine +
   DrawingCanvas + DrawingToolbar); no hay un segundo
   sistema de dibujo.

   - El <canvas> vive dentro de .board-canvas-inner, de modo
     que hereda el transform de zoom del tablero; su tamano
     es el area del tablero, asi que las coordenadas del
     tablero y del lienzo coinciden sin conversiones.
   - DrawingCanvas se monta en modo hostLayer: no gestiona
     su propio encuadre ni sus gestos, por lo que el pan y
     el zoom del tablero siguen funcionando.
   - Guardar persiste el modelo en board.drawing; cancelar
     descarta y repinta la capa desde el modelo guardado.
   ================================================== */
(function (global) {
  'use strict';

  var E = global.DrawingEngine;

  /* Raster de la capa: el tablero mide 3000x3000 como minimo y su propio
     zoom hace innecesaria una resolucion alta, asi que acotamos la memoria
     del lienzo (y de su capa base) en Android. */
  var MAX_RASTER_PIXELS = 6000000;

  var session = null;

  /* Ajustes recordados entre sesiones (no se persisten). */
  var lastTool = 'pencil';
  var lastColor = '#1a1a1a';
  var lastSize = 4;

  function t(key) {
    return typeof global.t === 'function' ? global.t(key) : key;
  }

  function status(msg) {
    if (typeof global.setStatus === 'function') { try { global.setStatus(msg); } catch (e) {} }
  }

  function rasterScale(w, h) {
    var px = Math.max(1, w) * Math.max(1, h);
    var s = 1;
    if (px > MAX_RASTER_PIXELS) s = Math.sqrt(MAX_RASTER_PIXELS / px);
    return Math.max(0.05, s);
  }

  function layerSize(board, maxX, maxY) {
    var d = board && board.drawing;
    return {
      w: Math.max(1, Math.round(Math.max(maxX || 0, (d && d.width) || 0))),
      h: Math.max(1, Math.round(Math.max(maxY || 0, (d && d.height) || 0)))
    };
  }

  function activeBoard() {
    var st = global.state;
    if (!st || !st.boards) return null;
    for (var i = 0; i < st.boards.length; i++) {
      if (st.boards[i].id === st.activeBoardId) return st.boards[i];
    }
    return null;
  }

  function layerEl(container) {
    return container ? container.querySelector('.board-draw-layer') : null;
  }

  /* La capa del tablero nunca pinta fondo: se ve el tablero debajo. */
  function transparent(drawing) {
    if (drawing && drawing.background && drawing.background.type === 'transparent') return drawing;
    var d = E.clone(drawing);
    d.background = { type: 'transparent' };
    return d;
  }

  /* Marca HTML de la capa (solo si el tablero ya tiene trazos). */
  function layerHtml(board, maxX, maxY) {
    if (!E || !board || !board.drawing || !board.drawing.strokes || !board.drawing.strokes.length) return '';
    var s = layerSize(board, maxX, maxY);
    var rs = rasterScale(s.w, s.h);
    return '<canvas class="board-draw-layer" aria-label="' + t('drawingPreview') + '" width="' +
      Math.max(1, Math.round(s.w * rs)) + '" height="' + Math.max(1, Math.round(s.h * rs)) +
      '" style="width:' + s.w + 'px;height:' + s.h + 'px;"></canvas>';
  }

  /* Repinta la capa fuera del modo dibujo, a partir del modelo guardado. */
  function mountLayer(container, board) {
    var cv = layerEl(container);
    if (!cv || !E || !board || !board.drawing) return;
    var ctx = null;
    try { ctx = cv.getContext('2d'); } catch (e) { ctx = null; }
    if (!ctx) return;
    var cssW = parseFloat(cv.style.width) || cv.width;
    var rs = cv.width / (cssW || 1);
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, cv.width, cv.height);
    try {
      E.paint(ctx, transparent(board.drawing), { scale: rs });
    } catch (err) {
      console.warn('[dibujo] no se pudo pintar la capa del tablero:', err);
    }
  }

  /* ---------------- sesion ---------------- */

  function setTool(tool) {
    lastTool = tool;
    if (session) session.canvas.setTool(tool);
  }

  function setColor(color) {
    if (!color) return;
    lastColor = color;
    if (session) session.canvas.setColor(color);
  }

  function setSize(size) {
    lastSize = size;
    if (session) session.canvas.setSize(size);
  }

  function syncButtons(state) {
    if (!session || !session.tb || !state) return;
    session.tb.setUndoEnabled(state.canUndo());
    session.tb.setRedoEnabled(state.canRedo());
    session.tb.setClearEnabled(!!(session.drawing.strokes && session.drawing.strokes.length));
  }

  function doClear() {
    if (!session) return;
    if (!confirm(t('drawingClearConfirm'))) return;
    session.canvas.clear();
  }

  function buildBar() {
    var bar = document.createElement('div');
    bar.className = 'fmt-bar board-fmt-bar';

    session.tb = global.DrawingToolbar.create({
      tool: lastTool,
      color: lastColor,
      size: lastSize,
      onTool: setTool,
      onColor: setColor,
      onSize: setSize,
      onUndo: function () { if (session) session.canvas.undo(); },
      onRedo: function () { if (session) session.canvas.redo(); },
      onClear: doClear
    });

    /* Herramientas en un contenedor con scroll propio y acciones fijas:
       en pantallas estrechas la barra no desborda y Guardar/Cancelar
       siguen siempre a la vista. */
    var tools = document.createElement('div');
    tools.className = 'fmt-scroll';
    tools.appendChild(session.tb.el);
    bar.appendChild(tools);

    var actions = document.createElement('div');
    actions.className = 'fmt-actions';

    var cancelBtn = document.createElement('button');
    cancelBtn.type = 'button';
    cancelBtn.className = 'btn';
    cancelBtn.setAttribute('data-i18n', 'cancel');
    cancelBtn.textContent = t('cancel');
    cancelBtn.addEventListener('click', discard);
    actions.appendChild(cancelBtn);

    var saveBtn = document.createElement('button');
    saveBtn.type = 'button';
    saveBtn.className = 'btn btn-primary';
    saveBtn.setAttribute('data-i18n', 'drawingSave');
    saveBtn.textContent = t('drawingSave');
    saveBtn.addEventListener('click', commit);
    actions.appendChild(saveBtn);

    bar.appendChild(actions);

    return bar;
  }

  function start() {
    if (session) return;
    if (!E || !global.DrawingCanvas || !global.DrawingToolbar) return;

    var board = activeBoard();
    var container = document.getElementById('boardContent');
    if (!board || !container) return;

    var wrap = container.querySelector('.board-canvas-wrap');
    var inner = wrap && wrap.querySelector('.board-canvas-inner');
    if (!inner) return;

    var size = layerSize(
      board,
      parseFloat(inner.style.width) || inner.clientWidth,
      parseFloat(inner.style.height) || inner.clientHeight
    );

    var drawing = E.normalize(board.drawing ? E.clone(board.drawing) : null);
    drawing.width = size.w;
    drawing.height = size.h;
    drawing.background = { type: 'transparent' };

    var cv = layerEl(container);
    if (!cv) {
      cv = document.createElement('canvas');
      cv.className = 'board-draw-layer';
      inner.appendChild(cv);
    }
    cv.classList.add('board-draw-active');

    session = {
      board: board,
      drawing: drawing,
      container: container,
      canvas: null,
      tb: null,
      bar: null
    };

    session.canvas = new global.DrawingCanvas(inner, drawing, {
      canvas: cv,
      hostLayer: true,
      maxRasterScale: rasterScale(size.w, size.h),
      onChange: syncButtons
    });
    session.canvas.setTool(lastTool);
    session.canvas.setColor(lastColor);
    session.canvas.setSize(lastSize);

    session.bar = buildBar();
    container.appendChild(session.bar);
    container.classList.add('board-drawing');

    session.canvas.mount();
    syncButtons(session.canvas.state);
    status('');
  }

  function stop() {
    if (!session) return;
    var s = session;
    session = null;
    if (s.canvas) s.canvas.destroy();
    if (s.tb) s.tb.destroy();
    if (s.bar && s.bar.parentNode) s.bar.parentNode.removeChild(s.bar);
    if (s.container) s.container.classList.remove('board-drawing');
    var cv = layerEl(s.container);
    if (cv) cv.classList.remove('board-draw-active');
  }

  function persist() {
    if (typeof global.save === 'function') { try { global.save(); } catch (e) { console.error(e); } }
  }

  function refresh() {
    if (typeof global.renderBoardContent === 'function') global.renderBoardContent();
  }

  /* Guarda el dibujo y cierra el modo dibujo. */
  function commit() {
    if (!session || !session.canvas) return;
    var board = session.board;
    session.canvas.markSaved();
    board.drawing = session.canvas.drawing;
    stop();
    persist();
    refresh();
  }

  /* Persiste sin re-renderizar: lo usa renderBoardContent() si necesita
     reconstruir el DOM mientras el modo dibujo esta activo (evita perder
     los trazos y evita la recursion). */
  function flush() {
    if (!session || !session.canvas) return;
    session.board.drawing = session.canvas.drawing;
    stop();
    persist();
  }

  /* Descarta los cambios y vuelve al ultimo estado guardado. */
  function discard() {
    if (!session || !session.canvas) return;
    if (session.canvas.isDirty() && !confirm(t('drawingDiscardConfirm'))) return;
    stop();
    refresh();
  }

  function isActive() {
    return !!session;
  }

  function onKeydownCapture(e) {
    if (!session || e.key !== 'Escape') return;
    e.preventDefault();
    e.stopPropagation();
    if (session.tb && session.tb.isPanelOpen()) { session.tb.closePanels(); return; }
    discard();
  }

  document.addEventListener('keydown', onKeydownCapture, true);

  global.DrawingBoard = {
    layerHtml: layerHtml,
    mountLayer: mountLayer,
    layerSize: layerSize,
    rasterScale: rasterScale,
    start: start,
    save: commit,
    flush: flush,
    cancel: discard,
    isActive: isActive
  };
})(typeof window !== 'undefined' ? window : this);
