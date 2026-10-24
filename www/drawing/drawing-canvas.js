/* ==================================================
   DrawingCanvas — capa de interaccion de DrawingEngine
   --------------------------------------------------
   - Pointer Events + touch-action:none (1 dedo = dibujar,
     2 dedos = pan/zoom; el trazo en curso se cancela al
     empezar el gesto para no dejar trazos accidentales).
   - Compositing: base offscreen (fondo + trazos fijos) +
     trazo actual repintado por frame.
   - El gesto de pan/zoom transforma el lienzo con CSS; el
     lienzo solo se re-rasteriza al terminar el gesto.
   ================================================== */
(function (global) {
  'use strict';

  var E = global.DrawingEngine;
  if (!E) return;

  function ptrCount(map) {
    var n = 0;
    for (var k in map) if (Object.prototype.hasOwnProperty.call(map, k)) n++;
    return n;
  }

  function DrawingCanvas(viewport, drawing, options) {
    this.viewport = viewport;
    this.drawing = drawing;
    this.options = options || {};

    /* hostLayer: el lienzo no gestiona su propio encuadre (lo hace el
       contenedor que lo aloja, p. ej. el zoom/pan de un tablero). Se usa un
       <canvas> ya presente en el DOM, se fija la transformacion en 1:1 y se
       delegan los gestos (pinza/rueda) al contenedor. */
    this.hostLayer = !!this.options.hostLayer;
    this.gestures = !this.hostLayer;
    this.enabled = this.options.enabled !== false;

    this.state = new E.History(drawing);
    this.tool = 'pencil';
    this.color = '#1a1a1a';
    this.size = 4;
    this.bgImage = this.options.bgImage || null;

    this.canvas = null;
    this.ctx = null;
    this.base = null;
    this.baseCtx = null;

    this.cssScale = 1;
    this.viewScale = 1;
    this.tx = 0;
    this.ty = 0;
    this.renderScale = 1;

    this.pointers = {};
    this.mode = 'idle';
    this._g = null;
    this._stroke = null;
    this._eraseSnap = null;
    this._erasePath = null;
    this._eraseRadius = 8;
    this._renderSet = null;
    this._rect = null;
    this._baseDirty = false;
    this._raf = 0;
    this._layoutTimer = 0;
    this._pendingFit = true;
    this.destroyed = false;

    var self = this;
    this._onDown = function (e) { self._onPointerDown(e); };
    this._onMove = function (e) { self._onPointerMove(e); };
    this._onUp = function (e) { self._onPointerUp(e); };
    this._onWheel = function (e) { self._onWheel(e); };
    this._onCtx = function (e) { e.preventDefault(); };
    this._onResize = function () { self.handleResize(); };
  }

  /* ---------------- ciclo de vida ---------------- */

  DrawingCanvas.prototype.mount = function () {
    if (this.canvas) return;
    var cv = this.options.canvas || null;
    if (cv) {
      if (cv.parentNode !== this.viewport) this.viewport.appendChild(cv);
    } else {
      cv = document.createElement('canvas');
      cv.className = 'dw-canvas';
      cv.setAttribute('aria-label', 'Lienzo de dibujo');
      this.viewport.appendChild(cv);
    }
    this.canvas = cv;
    this.ctx = cv.getContext('2d');
    this.base = document.createElement('canvas');
    this.baseCtx = this.base.getContext('2d');

    cv.addEventListener('pointerdown', this._onDown);
    cv.addEventListener('pointermove', this._onMove);
    cv.addEventListener('pointerup', this._onUp);
    cv.addEventListener('pointercancel', this._onUp);
    cv.addEventListener('lostpointercapture', this._onUp);
    cv.addEventListener('wheel', this._onWheel, { passive: false });
    this.viewport.addEventListener('contextmenu', this._onCtx);

    if (typeof ResizeObserver !== 'undefined') {
      this._ro = new ResizeObserver(this._onResize);
      this._ro.observe(this.viewport);
    }

    this.fit();
    if (this._pendingFit) {
      var self = this;
      setTimeout(function () { if (!self.destroyed) self.fit(); }, 60);
    }
  };

  DrawingCanvas.prototype.destroy = function () {
    this.destroyed = true;
    if (this._raf) { cancelAnimationFrame(this._raf); this._raf = 0; }
    if (this._layoutTimer) { clearTimeout(this._layoutTimer); this._layoutTimer = 0; }
    if (this._ro) { try { this._ro.disconnect(); } catch (e) {} this._ro = null; }
    if (this.canvas) {
      this.canvas.removeEventListener('pointerdown', this._onDown);
      this.canvas.removeEventListener('pointermove', this._onMove);
      this.canvas.removeEventListener('pointerup', this._onUp);
      this.canvas.removeEventListener('pointercancel', this._onUp);
      this.canvas.removeEventListener('lostpointercapture', this._onUp);
      this.canvas.removeEventListener('wheel', this._onWheel);
      if (!this.options.canvas && this.canvas.parentNode) this.canvas.parentNode.removeChild(this.canvas);
    }
    this.viewport.removeEventListener('contextmenu', this._onCtx);
    this.canvas = null;
    this.ctx = null;
    this.base = null;
    this.baseCtx = null;
    this.pointers = {};
    this.mode = 'idle';
    this._stroke = null;
    this._renderSet = null;
    this._eraseSnap = null;
    this._erasePath = null;
  };

  /* ---------------- estado ---------------- */

  DrawingCanvas.prototype.setTool = function (tool) {
    if (this.mode === 'stroke') this._abort();
    this.tool = E.TOOLS[tool] ? tool : 'pencil';
  };
  DrawingCanvas.prototype.setEnabled = function (on) {
    if (!on && this.mode === 'stroke') this._abort();
    this.enabled = !!on;
    if (!on) { this.pointers = {}; this.mode = 'idle'; }
  };
  DrawingCanvas.prototype.setColor = function (color) { this.color = color; };
  DrawingCanvas.prototype.setSize = function (size) { this.size = E.clamp(Number(size) || 4, 1, 40); };
  DrawingCanvas.prototype.setBgImage = function (img) {
    this.bgImage = img || null;
    this._invalidateBase();
  };

  DrawingCanvas.prototype.undo = function () {
    if (this.mode === 'stroke') this._abort();
    if (!this.state.undo()) return false;
    this._invalidateBase();
    this._emit();
    return true;
  };

  DrawingCanvas.prototype.redo = function () {
    if (this.mode === 'stroke') this._abort();
    if (!this.state.redo()) return false;
    this._invalidateBase();
    this._emit();
    return true;
  };

  DrawingCanvas.prototype.clear = function () {
    if (this.mode === 'stroke') this._abort();
    if (!this.drawing.strokes.length) return false;
    this.state.commit([]);
    this._invalidateBase();
    this._emit();
    return true;
  };

  DrawingCanvas.prototype.isDirty = function () { return this.state.isDirty(); };
  DrawingCanvas.prototype.markSaved = function () {
    this.drawing.updatedAt = Date.now();
    this.state.markSaved();
  };

  DrawingCanvas.prototype._emit = function () {
    if (this.options.onChange) {
      try { this.options.onChange(this.state); } catch (e) { console.error(e); }
    }
  };

  /* ---------------- layout ---------------- */

  DrawingCanvas.prototype.fit = function () {
    if (!this.canvas) { this._pendingFit = true; return; }
    if (this.hostLayer) {
      this._pendingFit = false;
      this.cssScale = 1;
      this.viewScale = 1;
      this.tx = 0;
      this.ty = 0;
      this._layout();
      this._invalidateBase();
      return;
    }
    var vw = this.viewport.clientWidth;
    var vh = this.viewport.clientHeight;
    if (!vw || !vh || !this.canvas) { this._pendingFit = true; return; }
    this._pendingFit = false;
    var W = this.drawing.width, H = this.drawing.height;
    var maxS = E.maxScaleFor(W, H);
    var s = E.clamp(Math.min(vw / W, vh / H), E.MIN_SCALE, maxS);
    this.cssScale = s;
    this.viewScale = 1;
    this.tx = Math.round((vw - W * s) / 2);
    this.ty = Math.round((vh - H * s) / 2);
    this._layout();
    this._invalidateBase();
  };

  DrawingCanvas.prototype._applyTransform = function () {
    if (!this.canvas) return;
    var W = this.drawing.width, H = this.drawing.height;
    this.canvas.style.width = (W * this.cssScale) + 'px';
    this.canvas.style.height = (H * this.cssScale) + 'px';
    this.canvas.style.transform = 'translate(' + this.tx + 'px,' + this.ty + 'px) scale(' + this.viewScale + ')';
    this._rect = null;
  };

  DrawingCanvas.prototype._layout = function () {
    if (!this.canvas) return;
    this._applyTransform();
    var W = this.drawing.width, H = this.drawing.height;
    var ratio = Math.min(2, global.devicePixelRatio || 1);
    var rs = Math.min(Math.max(this.cssScale * ratio, this.cssScale), E.maxScaleFor(W, H));
    if (this.options.maxRasterScale) rs = Math.min(rs, this.options.maxRasterScale);
    this.renderScale = Math.max(0.05, rs);
    var bw = Math.max(1, Math.round(W * this.renderScale));
    var bh = Math.max(1, Math.round(H * this.renderScale));
    if (this.canvas.width !== bw) this.canvas.width = bw;
    if (this.canvas.height !== bh) this.canvas.height = bh;
    if (this.base) {
      if (this.base.width !== bw) this.base.width = bw;
      if (this.base.height !== bh) this.base.height = bh;
    }
    this._baseDirty = true;
    this._schedule();
  };

  DrawingCanvas.prototype._deferLayout = function () {
    if (this._layoutTimer) clearTimeout(this._layoutTimer);
    var self = this;
    this._layoutTimer = setTimeout(function () {
      self._layoutTimer = 0;
      if (self.destroyed || !self.canvas) return;
      if (self.mode === 'stroke') return;
      self._layout();
      self._invalidateBase();
    }, 160);
  };

  DrawingCanvas.prototype.handleResize = function () {
    if (this.destroyed || !this.canvas) return;
    if (this.hostLayer) return;
    if (this.mode === 'gesture' || this.mode === 'gestureEnd') return;
    if (this._pendingFit) { this.fit(); return; }
    var total = this.cssScale * this.viewScale;
    this._clampTranslate(total);
    this._applyTransform();
    this._deferLayout();
  };

  DrawingCanvas.prototype._clampTranslate = function (total) {
    var vw = this.viewport.clientWidth, vh = this.viewport.clientHeight;
    if (!vw || !vh) return;
    var w = this.drawing.width * total, h = this.drawing.height * total;
    var M = 60;
    this.tx = E.clamp(this.tx, Math.min(vw - w - M, -M), Math.max(M, vw - w + M));
    this.ty = E.clamp(this.ty, Math.min(vh - h - M, -M), Math.max(M, vh - h + M));
  };

  /* ---------------- render ---------------- */

  DrawingCanvas.prototype._invalidateBase = function () {
    this._baseDirty = true;
    this._schedule();
  };

  DrawingCanvas.prototype._schedule = function () {
    if (this._raf || this.destroyed) return;
    var self = this;
    this._raf = requestAnimationFrame(function () {
      self._raf = 0;
      self._frame();
    });
  };

  DrawingCanvas.prototype._frame = function () {
    if (this.destroyed || !this.canvas) return;
    if (this._baseDirty) {
      this._baseDirty = false;
      this._renderBase();
    }
    this._composite();
  };

  DrawingCanvas.prototype._renderBase = function () {
    var ctx = this.baseCtx;
    if (!ctx) return;
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, this.base.width, this.base.height);
    E.paint(ctx, this.drawing, {
      scale: this.renderScale,
      bgImage: this.bgImage,
      strokes: this._renderSet || this.drawing.strokes
    });
  };

  DrawingCanvas.prototype._composite = function () {
    var ctx = this.ctx;
    if (!ctx || !this.base) return;
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    ctx.drawImage(this.base, 0, 0);
    var b = this._stroke;
    if (b) {
      ctx.setTransform(this.renderScale, 0, 0, this.renderScale, 0, 0);
      E.paintStroke(ctx, b.stroke);
    }
  };

  /* ---------------- punteros ---------------- */

  DrawingCanvas.prototype._computeRect = function () {
    if (!this._rect && this.canvas) this._rect = this.canvas.getBoundingClientRect();
    return this._rect || { left: 0, top: 0, width: 1, height: 1 };
  };

  DrawingCanvas.prototype._pointFromEvent = function (e) {
    var rect = this._computeRect();
    var kx = rect.width / this.drawing.width;
    var ky = rect.height / this.drawing.height;
    if (!kx || !ky) return { x: 0, y: 0 };
    return { x: (e.clientX - rect.left) / kx, y: (e.clientY - rect.top) / ky };
  };

  DrawingCanvas.prototype._onPointerDown = function (e) {
    if (this.destroyed || !this.enabled) return;
    if (e.pointerType === 'mouse' && e.button !== 0 && e.button !== undefined && e.button !== -1) return;
    if (e.isPrimary === false && ptrCount(this.pointers) === 0) return;
    if (e.cancelable) e.preventDefault();

    this.pointers[e.pointerId] = { x: e.clientX, y: e.clientY };
    try { this.canvas.setPointerCapture(e.pointerId); } catch (err) { /* noop */ }

    var n = ptrCount(this.pointers);
    if (this.mode === 'gestureEnd') {
      if (n >= 2) { if (this.gestures) this._beginGesture(); return; }
      this.mode = 'idle';
      this._g = null;
    }
    if (n === 1) {
      this._startAt(e);
    } else if (n >= 2) {
      this._abort();
      if (this.gestures) this._beginGesture();
      else this.mode = 'gestureEnd';
    }
  };

  DrawingCanvas.prototype._startAt = function (e) {
    var p = this._pointFromEvent(e);
    this._rect = null;
    this._rect = this._computeRect();
    this.mode = 'stroke';

    if (this.tool === 'fill') {
      this._doFill(p);
      return;
    }
    if (this.tool === 'eraser') {
      this._eraseSnap = this.drawing.strokes;
      this._erasePath = [[p.x, p.y]];
      this._eraseRadius = E.sizeFor('eraser', this.size);
      this._renderSet = E.eraseStrokes(this._eraseSnap, this._erasePath, this._eraseRadius);
      this._invalidateBase();
      return;
    }
    this._stroke = new E.StrokeBuilder(this.tool, this.color, this.size);
    this._stroke.move(p.x, p.y);
    this._schedule();
  };

  DrawingCanvas.prototype._doFill = function (p) {
    var fill;
    try {
      fill = E.floodFill(this.drawing, p.x, p.y, this.color, this.bgImage);
    } catch (err) {
      console.error('floodFill error:', err);
      fill = null;
    }
    if (!fill) return;
    this.state.commit(this.drawing.strokes.concat([fill]));
    this._invalidateBase();
    this._emit();
  };

  DrawingCanvas.prototype._onPointerMove = function (e) {
    if (this.destroyed) return;
    if (!Object.prototype.hasOwnProperty.call(this.pointers, e.pointerId)) return;
    this.pointers[e.pointerId] = { x: e.clientX, y: e.clientY };

    if (this.mode === 'gesture') { this._updateGesture(); return; }
    if (this.mode !== 'stroke') return;
    if (ptrCount(this.pointers) > 1) return;
    if (this.tool === 'fill') return;

    var p = this._pointFromEvent(e);
    if (this.tool === 'eraser') { this._eraseTo(p); return; }
    if (this._stroke && this._stroke.move(p.x, p.y)) this._schedule();
  };

  DrawingCanvas.prototype._eraseTo = function (p) {
    var path = this._erasePath;
    if (!path) return;
    var last = path[path.length - 1];
    var dx = p.x - last[0], dy = p.y - last[1];
    if (dx * dx + dy * dy < 1) return;
    path.push([p.x, p.y]);
    this._renderSet = E.eraseStrokes(this._eraseSnap, path, this._eraseRadius);
    this._invalidateBase();
  };

  DrawingCanvas.prototype._onPointerUp = function (e) {
    if (this.destroyed) return;
    if (!Object.prototype.hasOwnProperty.call(this.pointers, e.pointerId)) return;
    delete this.pointers[e.pointerId];
    try { this.canvas.releasePointerCapture(e.pointerId); } catch (err) { /* noop */ }
    var n = ptrCount(this.pointers);

    if (this.mode === 'stroke' && n === 0) {
      this._endStroke();
    } else if (this.mode === 'gesture' && n < 2) {
      this.mode = 'gestureEnd';
      this._g = null;
      this._rebase();
    } else if (this.mode === 'gestureEnd' && n === 0) {
      this.mode = 'idle';
      this._g = null;
    } else if (this.mode === 'gesture' && n >= 2) {
      this._beginGesture();
    }
    if (n === 0) { this.mode = 'idle'; this._g = null; }
  };

  DrawingCanvas.prototype._endStroke = function () {
    this.mode = 'idle';
    this._g = null;

    if (this.tool === 'fill') { this._schedule(); return; }

    if (this.tool === 'eraser') {
      var result = this._renderSet;
      this._eraseSnap = null;
      this._erasePath = null;
      this._renderSet = null;
      if (result && result !== this.drawing.strokes) {
        this.state.commit(result);
        this._emit();
      }
      this._invalidateBase();
      return;
    }

    var b = this._stroke;
    this._stroke = null;
    if (b) {
      var s = b.done();
      if (s && s.points.length) {
        this.state.commit(this.drawing.strokes.concat([s]));
        this._emit();
      }
    }
    this._invalidateBase();
  };

  DrawingCanvas.prototype._abort = function () {
    var hadErase = !!this._eraseSnap;
    var hadStroke = !!this._stroke;
    this._stroke = null;
    this._eraseSnap = null;
    this._erasePath = null;
    this._renderSet = null;
    this._g = null;
    if (hadErase) this._invalidateBase();
    else if (hadStroke) this._schedule();
  };

  /* ---------------- gestos ---------------- */

  DrawingCanvas.prototype._twoPointers = function () {
    var ids = Object.keys(this.pointers);
    if (ids.length < 2) return null;
    return [this.pointers[ids[0]], this.pointers[ids[1]]];
  };

  DrawingCanvas.prototype._beginGesture = function () {
    var pts = this._twoPointers();
    if (!pts) return;
    var dx = pts[1].x - pts[0].x, dy = pts[1].y - pts[0].y;
    this._g = {
      dist: Math.max(1, Math.sqrt(dx * dx + dy * dy)),
      mid: { x: (pts[0].x + pts[1].x) / 2, y: (pts[0].y + pts[1].y) / 2 }
    };
    this.mode = 'gesture';
    this._rect = null;
  };

  DrawingCanvas.prototype._updateGesture = function () {
    var pts = this._twoPointers();
    if (!pts || !this._g) return;
    var dx = pts[1].x - pts[0].x, dy = pts[1].y - pts[0].y;
    var dist = Math.max(1, Math.sqrt(dx * dx + dy * dy));
    var mid = { x: (pts[0].x + pts[1].x) / 2, y: (pts[0].y + pts[1].y) / 2 };
    var g = this._g;
    var k = this.cssScale * this.viewScale;
    if (!k) return;

    var lx = (g.mid.x - this.tx) / k;
    var ly = (g.mid.y - this.ty) / k;
    var maxS = E.maxScaleFor(this.drawing.width, this.drawing.height);
    var newView = E.clamp(this.viewScale * (dist / g.dist), E.MIN_SCALE, maxS);
    var k1 = this.cssScale * newView;
    if (!isFinite(k1) || k1 <= 0) return;

    this.viewScale = newView;
    this.tx = mid.x - lx * k1;
    this.ty = mid.y - ly * k1;
    this._clampTranslate(k1);
    this._applyTransform();

    g.dist = dist;
    g.mid = mid;
  };

  DrawingCanvas.prototype._rebase = function () {
    var total = E.clamp(
      this.cssScale * this.viewScale,
      E.MIN_SCALE,
      E.maxScaleFor(this.drawing.width, this.drawing.height)
    );
    this.cssScale = total;
    this.viewScale = 1;
    this._clampTranslate(total);
    this._layout();
    this._invalidateBase();
    this._rect = null;
  };

  DrawingCanvas.prototype._onWheel = function (e) {
    if (this.destroyed || this.hostLayer) return;
    if (!e.ctrlKey && !e.metaKey) return;
    if (e.cancelable) e.preventDefault();
    if (this.mode === 'stroke' || this.mode === 'gesture') return;

    var vp = this.viewport.getBoundingClientRect();
    var vx = e.clientX - vp.left;
    var vy = e.clientY - vp.top;
    var k = this.cssScale;
    if (!k) return;
    var lx = (vx - this.tx) / k;
    var ly = (vy - this.ty) / k;
    var factor = Math.pow(0.9987, e.deltaY);
    var k1 = E.clamp(k * factor, E.MIN_SCALE, E.maxScaleFor(this.drawing.width, this.drawing.height));
    if (!isFinite(k1) || k1 <= 0) return;

    this.cssScale = k1;
    this.tx = vx - lx * k1;
    this.ty = vy - ly * k1;
    this._clampTranslate(k1);
    this._applyTransform();
    this._deferLayout();
  };

  DrawingCanvas.prototype.reflow = function () {
    if (this.destroyed || !this.canvas) return;
    this._layout();
    this._invalidateBase();
  };

  global.DrawingCanvas = DrawingCanvas;
})(typeof window !== 'undefined' ? window : this);
