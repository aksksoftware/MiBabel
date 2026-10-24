/* ==================================================
   DrawingEngine — motor de dibujo vectorial reutilizable de MiBabel
   --------------------------------------------------
   - Sin dependencias de la app (solo Canvas/DOM).
   - Coordenadas LOGICAS del lienzo (no pixeles de pantalla).
   - Modelo persistible: background + strokes.
   - Pintado programatico (sin texturas): papel, renglones, cuadricula,
     puntos, imagen de fondo, brochazos, relleno por inundacion.
   - Historial por referencia de arreglos (copy-on-write).
   ================================================== */
(function (global) {
  'use strict';

  var SCHEMA = 1;
  var BG_TYPES = ['solid', 'lined', 'grid', 'dotted', 'image', 'transparent'];
  var TOOL_LIST = ['pencil', 'pen', 'marker', 'spray', 'eraser', 'fill'];

  var PATTERN_STEP = 32;
  var PAPER = '#ffffff';
  var PAPER_LINE = 'rgba(0,0,0,0.15)';
  var PAPER_DOT = 'rgba(0,0,0,0.30)';

  var SAMPLE_MIN = 1.6;
  var MAX_POINTS = 6000;
  var SPRAY_SAMPLE = 6;
  var SPRAY_PARTICLES = 5;
  var MAX_SPRAY_POINTS = 10000;

  var MAX_RASTER_PIXELS = 12000000;
  var MAX_FILL_PIXELS = 4000000;
  var MAX_HISTORY = 60;

  var MIN_SCALE = 0.12;
  var MAX_SCALE = 6;

  var TOOLS = {
    pencil: { factor: 1, alpha: 1 },
    pen: { factor: 0.6, alpha: 1 },
    marker: { factor: 2.6, alpha: 0.45 },
    spray: { factor: 2, alpha: 1 },
    eraser: { factor: 3, alpha: 1 },
    fill: { factor: 1, alpha: 1 }
  };

  /* ---------------- utilidades ---------------- */

  function r1(n) { return Math.round(n * 10) / 10; }

  function uid(prefix) {
    return (prefix || 's') + Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
  }

  function num(v, dflt) {
    var n = Number(v);
    return isFinite(n) ? n : dflt;
  }

  function clamp(v, a, b) { return v < a ? a : (v > b ? b : v); }

  function sizeFor(tool, baseSize) {
    var spec = TOOLS[tool] || TOOLS.pencil;
    return Math.max(1, Math.round(num(baseSize, 4) * spec.factor * 10) / 10);
  }

  function maxScaleFor(w, h) {
    var px = Math.max(1, w) * Math.max(1, h);
    var s = Math.sqrt(MAX_RASTER_PIXELS / px);
    return clamp(s, MIN_SCALE, MAX_SCALE);
  }

  /* ---------------- modelo ---------------- */

  function normalizeBackground(bg) {
    if (typeof bg === 'string') bg = { type: bg };
    bg = bg && typeof bg === 'object' ? bg : {};
    var type = BG_TYPES.indexOf(bg.type) !== -1 ? bg.type : 'solid';
    var out = { type: type };
    if (type === 'image') {
      out.ref = bg.ref ? String(bg.ref) : null;
      out.w = Math.max(1, Math.round(num(bg.w, 1)));
      out.h = Math.max(1, Math.round(num(bg.h, 1)));
    }
    return out;
  }

  function cleanColor(v, dflt) {
    if (typeof v !== 'string') return dflt;
    var s = v.trim();
    if (!s) return dflt;
    if (/^#[0-9a-fA-F]{3}$/.test(s) || /^#[0-9a-fA-F]{6}$/.test(s)) return s.toLowerCase();
    if (/^#[0-9a-fA-F]{8}$/.test(s)) return s.toLowerCase();
    if (/^rgba?\(/.test(s)) return s;
    return dflt;
  }

  function normalizeStroke(s) {
    if (!s || typeof s !== 'object') return null;
    var tool = TOOLS[s.tool] ? s.tool : 'pencil';
    var color = cleanColor(s.color, '#1a1a1a');
    var size = clamp(num(s.size, 4), 0.5, 400);

    if (tool === 'fill') {
      var src = Array.isArray(s.rects) ? s.rects : [];
      var rects = [];
      for (var i = 0; i < src.length; i++) {
        var rr = src[i];
        if (!Array.isArray(rr) || rr.length < 4) continue;
        var rx = Math.round(num(rr[0], 0));
        var ry = Math.round(num(rr[1], 0));
        var rw = Math.round(num(rr[2], 0));
        var rh = Math.round(num(rr[3], 0));
        if (rw <= 0 || rh <= 0) continue;
        rects.push([rx, ry, rw, rh]);
      }
      if (!rects.length) return null;
      return { id: typeof s.id === 'string' ? s.id : uid(), tool: 'fill', color: color, size: size, rects: rects };
    }

    var srcP = Array.isArray(s.points) ? s.points : [];
    var points = [];
    for (var j = 0; j < srcP.length; j++) {
      var p = srcP[j];
      if (Array.isArray(p)) {
        var x = num(p[0], NaN), y = num(p[1], NaN);
        if (isFinite(x) && isFinite(y)) points.push([r1(x), r1(y)]);
      } else if (p && typeof p === 'object' && isFinite(p.x) && isFinite(p.y)) {
        points.push([r1(p.x), r1(p.y)]);
      }
      if (points.length >= MAX_SPRAY_POINTS) break;
    }
    if (!points.length) return null;
    return {
      id: typeof s.id === 'string' ? s.id : uid(),
      tool: tool,
      color: color,
      size: size,
      points: points
    };
  }

  function normalize(d) {
    d = d && typeof d === 'object' ? d : {};
    var w = Math.max(1, Math.round(num(d.width, 900)));
    var h = Math.max(1, Math.round(num(d.height, Math.round(w * 4 / 3))));
    var src = Array.isArray(d.strokes) ? d.strokes : [];
    var strokes = [];
    for (var i = 0; i < src.length; i++) {
      var s = normalizeStroke(src[i]);
      if (s) strokes.push(s);
    }
    return {
      version: SCHEMA,
      width: w,
      height: h,
      background: normalizeBackground(d.background),
      strokes: strokes,
      createdAt: Math.round(num(d.createdAt, Date.now())),
      updatedAt: Math.round(num(d.updatedAt, Date.now()))
    };
  }

  function create(opts) {
    opts = opts || {};
    var w = Math.max(1, Math.round(num(opts.width, 900)));
    var h = Math.max(1, Math.round(num(opts.height, Math.round(w * 4 / 3))));
    return normalize({
      version: SCHEMA,
      width: w,
      height: h,
      background: opts.background,
      strokes: [],
      createdAt: opts.createdAt || Date.now(),
      updatedAt: opts.updatedAt || Date.now()
    });
  }

  function clone(d) { return JSON.parse(JSON.stringify(d)); }

  /* ---------------- pintado ---------------- */

  function paintBackground(ctx, drawing, bgImage) {
    var w = drawing.width, h = drawing.height;
    var bg = drawing.background || { type: 'solid' };
    if (bg.type === 'transparent') return;
    ctx.fillStyle = PAPER;
    ctx.fillRect(0, 0, w, h);
    if (bg.type === 'image') {
      if (bgImage && bgImage.width && bgImage.height) {
        try {
          ctx.drawImage(bgImage, 0, 0, w, h);
        } catch (e) {
          console.warn('[dibujo] drawImage del fondo fallo:', e && e.name, e && e.message);
        }
      } else {
        console.warn('[dibujo] fondo type=image sin bgImage utilizable', {
          tieneBgImage: !!bgImage,
          width: bgImage ? bgImage.width : null,
          height: bgImage ? bgImage.height : null,
          complete: bgImage ? bgImage.complete : null
        });
      }
      return;
    }
    if (bg.type === 'solid') return;

    if (bg.type === 'dotted') {
      ctx.fillStyle = PAPER_DOT;
      ctx.beginPath();
      for (var dy = PATTERN_STEP / 2; dy < h; dy += PATTERN_STEP) {
        for (var dx = PATTERN_STEP / 2; dx < w; dx += PATTERN_STEP) {
          ctx.moveTo(dx + 1.3, dy);
          ctx.arc(dx, dy, 1.3, 0, Math.PI * 2);
        }
      }
      ctx.fill();
      return;
    }

    ctx.strokeStyle = PAPER_LINE;
    ctx.lineWidth = 1;
    ctx.beginPath();
    if (bg.type === 'lined' || bg.type === 'grid') {
      for (var y = PATTERN_STEP; y < h; y += PATTERN_STEP) {
        ctx.moveTo(0, y + 0.5);
        ctx.lineTo(w, y + 0.5);
      }
    }
    if (bg.type === 'grid') {
      for (var x = PATTERN_STEP; x < w; x += PATTERN_STEP) {
        ctx.moveTo(x + 0.5, 0);
        ctx.lineTo(x + 0.5, h);
      }
    }
    ctx.stroke();
  }

  function paintFill(ctx, stroke) {
    var rects = stroke.rects;
    if (!rects || !rects.length) return;
    ctx.save();
    ctx.globalAlpha = 1;
    ctx.fillStyle = stroke.color;
    ctx.beginPath();
    for (var i = 0; i < rects.length; i++) {
      var r = rects[i];
      ctx.rect(r[0], r[1], r[2], r[3]);
    }
    ctx.fill();
    ctx.restore();
  }

  function paintSpray(ctx, stroke) {
    var pts = stroke.points;
    if (!pts || !pts.length) return;
    var rad = Math.max(0.5, stroke.size * 0.16);
    ctx.save();
    ctx.globalAlpha = 1;
    ctx.fillStyle = stroke.color;
    ctx.beginPath();
    for (var i = 0; i < pts.length; i++) {
      ctx.moveTo(pts[i][0] + rad, pts[i][1]);
      ctx.arc(pts[i][0], pts[i][1], rad, 0, Math.PI * 2);
    }
    ctx.fill();
    ctx.restore();
  }

  function paintStroke(ctx, stroke) {
    if (!stroke) return;
    if (stroke.tool === 'fill') return paintFill(ctx, stroke);
    if (stroke.tool === 'spray') return paintSpray(ctx, stroke);
    var pts = stroke.points;
    if (!pts || !pts.length) return;
    var spec = TOOLS[stroke.tool] || TOOLS.pencil;
    ctx.save();
    ctx.globalAlpha = spec.alpha == null ? 1 : spec.alpha;
    ctx.strokeStyle = stroke.color;
    ctx.fillStyle = stroke.color;
    ctx.lineWidth = stroke.size;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    if (pts.length === 1) {
      ctx.beginPath();
      ctx.arc(pts[0][0], pts[0][1], stroke.size / 2, 0, Math.PI * 2);
      ctx.fill();
    } else {
      ctx.beginPath();
      ctx.moveTo(pts[0][0], pts[0][1]);
      for (var i = 1; i < pts.length; i++) ctx.lineTo(pts[i][0], pts[i][1]);
      ctx.stroke();
    }
    ctx.restore();
  }

  function paintAll(ctx, strokes) {
    if (!strokes) return;
    for (var i = 0; i < strokes.length; i++) paintStroke(ctx, strokes[i]);
  }

  /* opts: { scale, bgImage, strokes } */
  function paint(ctx, drawing, opts) {
    opts = opts || {};
    var scale = opts.scale || 1;
    ctx.setTransform(scale, 0, 0, scale, 0, 0);
    paintBackground(ctx, drawing, opts.bgImage);
    paintAll(ctx, opts.strokes || drawing.strokes);
  }

  function renderToCanvas(drawing, scale, bgImage, strokes) {
    var c = document.createElement('canvas');
    c.width = Math.max(1, Math.round(drawing.width * scale));
    c.height = Math.max(1, Math.round(drawing.height * scale));
    var ctx = c.getContext('2d');
    if (!ctx) return null;
    paint(ctx, drawing, { scale: scale, bgImage: bgImage, strokes: strokes });
    return c;
  }

  /* ---------------- constructor de trazos ---------------- */

  function StrokeBuilder(tool, color, baseSize) {
    var spec = TOOLS[tool] || TOOLS.pencil;
    this.tool = TOOLS[tool] ? tool : 'pencil';
    this.stroke = {
      id: uid(),
      tool: this.tool,
      color: cleanColor(color, '#1a1a1a'),
      size: sizeFor(this.tool, baseSize),
      points: []
    };
    this._alpha = spec.alpha;
    this._last = null;
    this._acc = 0;
    this._full = false;
  }

  StrokeBuilder.prototype._emitSpray = function (x, y) {
    var pts = this.stroke.points;
    var radius = this.stroke.size;
    var added = false;
    for (var i = 0; i < SPRAY_PARTICLES; i++) {
      if (pts.length >= MAX_SPRAY_POINTS) { this._full = true; break; }
      var a = Math.random() * Math.PI * 2;
      var rr = radius * Math.sqrt(Math.random());
      pts.push([r1(x + Math.cos(a) * rr), r1(y + Math.sin(a) * rr)]);
      added = true;
    }
    return added;
  };

  StrokeBuilder.prototype._moveSpray = function (x, y) {
    if (!this._last) {
      this._last = [x, y];
      this._acc = 0;
      return this._emitSpray(x, y);
    }
    if (this._full) { this._last = [x, y]; return false; }
    var ax = this._last[0], ay = this._last[1];
    var dx = x - ax, dy = y - ay;
    var segLen = Math.sqrt(dx * dx + dy * dy);
    if (segLen < 0.4) return false;
    var ux = dx / segLen, uy = dy / segLen;
    var pos = 0;
    var remaining = segLen;
    var toNext = SPRAY_SAMPLE - this._acc;
    var changed = false;
    var guard = 0;
    while (remaining >= toNext && toNext > 0 && guard++ < 4000) {
      pos += toNext;
      changed = this._emitSpray(ax + ux * pos, ay + uy * pos) || changed;
      remaining -= toNext;
      this._acc = 0;
      toNext = SPRAY_SAMPLE;
    }
    this._acc += remaining;
    this._last = [x, y];
    return changed;
  };

  StrokeBuilder.prototype.move = function (x, y) {
    if (!isFinite(x) || !isFinite(y)) return false;
    if (this.tool === 'spray') return this._moveSpray(x, y);
    var pts = this.stroke.points;
    if (!pts.length) {
      this._last = [r1(x), r1(y)];
      pts.push(this._last);
      return true;
    }
    if (pts.length >= MAX_POINTS) return false;
    var dx = x - this._last[0], dy = y - this._last[1];
    if (dx * dx + dy * dy < SAMPLE_MIN * SAMPLE_MIN) return false;
    this._last = [r1(x), r1(y)];
    pts.push(this._last);
    return true;
  };

  StrokeBuilder.prototype.done = function () {
    if (this.stroke.tool !== 'spray' && this.stroke.points.length) return this.stroke;
    if (this.stroke.points.length) return this.stroke;
    return null;
  };

  /* ---------------- historial ---------------- */

  function History(drawing) {
    this.drawing = drawing;
    this.undoStack = [];
    this.redoStack = [];
    this.version = 0;
    this.savedVersion = 0;
  }

  History.prototype.commit = function (strokes) {
    if (!strokes || strokes === this.drawing.strokes) return false;
    this.undoStack.push(this.drawing.strokes);
    if (this.undoStack.length > MAX_HISTORY) this.undoStack.shift();
    this.redoStack.length = 0;
    this.drawing.strokes = strokes;
    this.drawing.updatedAt = Date.now();
    this.version++;
    return true;
  };

  History.prototype.undo = function () {
    if (!this.undoStack.length) return false;
    this.redoStack.push(this.drawing.strokes);
    this.drawing.strokes = this.undoStack.pop();
    this.drawing.updatedAt = Date.now();
    this.version++;
    return true;
  };

  History.prototype.redo = function () {
    if (!this.redoStack.length) return false;
    this.undoStack.push(this.drawing.strokes);
    this.drawing.strokes = this.redoStack.pop();
    this.drawing.updatedAt = Date.now();
    this.version++;
    return true;
  };

  History.prototype.canUndo = function () { return this.undoStack.length > 0; };
  History.prototype.canRedo = function () { return this.redoStack.length > 0; };
  History.prototype.isDirty = function () { return this.version !== this.savedVersion; };
  History.prototype.markSaved = function () { this.savedVersion = this.version; };
  History.prototype.reset = function () {
    this.undoStack.length = 0;
    this.redoStack.length = 0;
    this.savedVersion = this.version;
  };

  /* ---------------- borrado estructurado ---------------- */

  function pathBBox(path, pad) {
    var x0 = Infinity, y0 = Infinity, x1 = -Infinity, y1 = -Infinity;
    for (var i = 0; i < path.length; i++) {
      if (path[i][0] < x0) x0 = path[i][0];
      if (path[i][0] > x1) x1 = path[i][0];
      if (path[i][1] < y0) y0 = path[i][1];
      if (path[i][1] > y1) y1 = path[i][1];
    }
    if (!isFinite(x0)) return null;
    return { x0: x0 - pad, y0: y0 - pad, x1: x1 + pad, y1: y1 + pad };
  }

  function buildGrid(path, radius) {
    var cell = Math.max(radius, 2);
    var map = Object.create(null);
    for (var i = 0; i < path.length; i++) {
      var gx = Math.floor(path[i][0] / cell);
      var gy = Math.floor(path[i][1] / cell);
      for (var ox = -1; ox <= 1; ox++) {
        for (var oy = -1; oy <= 1; oy++) {
          var key = (gx + ox) + ',' + (gy + oy);
          var arr = map[key];
          if (!arr) { arr = map[key] = []; }
          arr.push(path[i][0], path[i][1]);
        }
      }
    }
    return { cell: cell, map: map, r2: radius * radius };
  }

  function gridHit(grid, x, y) {
    var gx = Math.floor(x / grid.cell);
    var gy = Math.floor(y / grid.cell);
    var arr = grid.map[gx + ',' + gy];
    if (!arr) return false;
    var r2 = grid.r2;
    for (var i = 0; i < arr.length; i += 2) {
      var dx = arr[i] - x, dy = arr[i + 1] - y;
      if (dx * dx + dy * dy <= r2) return true;
    }
    return false;
  }

  function inBox(box, x, y) {
    return !box || (x >= box.x0 && x <= box.x1 && y >= box.y0 && y <= box.y1);
  }

  function segBoxOverlap(box, a, b) {
    if (!box) return true;
    var x0 = Math.min(a[0], b[0]), x1 = Math.max(a[0], b[0]);
    var y0 = Math.min(a[1], b[1]), y1 = Math.max(a[1], b[1]);
    return !(x1 < box.x0 || x0 > box.x1 || y1 < box.y0 || y0 > box.y1);
  }

  function segHits(a, b, grid, radius) {
    var dx = b[0] - a[0], dy = b[1] - a[1];
    var len = Math.sqrt(dx * dx + dy * dy);
    var step = Math.max(0.5, Math.min(radius * 0.6, 2));
    var k = Math.min(128, Math.max(1, Math.ceil(len / step)));
    var ux = dx / len, uy = dy / len;
    for (var j = 0; j <= k; j++) {
      var t = j / k;
      if (gridHit(grid, a[0] + ux * len * t, a[1] + uy * len * t)) return true;
    }
    return false;
  }

  function splitStroke(s, grid, radius, box) {
    var pts = s.points;
    var n = pts.length;
    if (!n) return [];

    if (n === 1) {
      return (inBox(box, pts[0][0], pts[0][1]) && gridHit(grid, pts[0][0], pts[0][1])) ? [] : [s];
    }

    var removed = new Array(n);
    var severed = new Array(n);
    for (var i = 0; i < n; i++) {
      removed[i] = inBox(box, pts[i][0], pts[i][1]) && gridHit(grid, pts[i][0], pts[i][1]);
    }
    severed[0] = false;
    for (var j = 1; j < n; j++) {
      severed[j] = segBoxOverlap(box, pts[j - 1], pts[j]) &&
        segHits(pts[j - 1], pts[j], grid, radius);
    }

    var runs = [];
    var cur = null;
    for (var k = 0; k < n; k++) {
      var broken = k > 0 && (severed[k] || removed[k]);
      if (broken && cur) { runs.push(cur); cur = null; }
      if (removed[k]) continue;
      if (!cur) cur = [];
      cur.push(pts[k]);
    }
    if (cur) runs.push(cur);

    var out = [];
    for (var m = 0; m < runs.length; m++) {
      if (runs[m].length < 2 && n > 1) continue;
      var copy = {};
      for (var key in s) if (Object.prototype.hasOwnProperty.call(s, key)) copy[key] = s[key];
      copy.id = uid();
      copy.points = runs[m];
      out.push(copy);
    }
    return out;
  }

  function eraseSpray(s, grid, box) {
    var pts = s.points;
    var kept = [];
    for (var i = 0; i < pts.length; i++) {
      if (inBox(box, pts[i][0], pts[i][1]) && gridHit(grid, pts[i][0], pts[i][1])) continue;
      kept.push(pts[i]);
    }
    if (!kept.length) return [];
    if (kept.length === pts.length) return [s];
    var copy = {};
    for (var key in s) if (Object.prototype.hasOwnProperty.call(s, key)) copy[key] = s[key];
    copy.points = kept;
    return [copy];
  }

  function buildDiscRows(path, radius) {
    var map = Object.create(null);
    var r = Math.ceil(radius);
    for (var i = 0; i < path.length; i++) {
      var cx = path[i][0], cy = path[i][1];
      var y0 = Math.floor(cy) - r, y1 = Math.floor(cy) + r;
      for (var y = y0; y <= y1; y++) {
        var arr = map[y];
        if (!arr) { arr = map[y] = []; }
        arr.push(cx, cy);
      }
    }
    return map;
  }

  function subtractSpan(spans, x0, x1) {
    var out = [];
    for (var i = 0; i < spans.length; i++) {
      var a = spans[i][0], b = spans[i][1];
      if (x1 < a || x0 > b) { out.push(spans[i]); continue; }
      if (x0 > a) out.push([a, x0 - 1]);
      if (x1 < b) out.push([x1 + 1, b]);
    }
    return out;
  }

  function eraseFillStroke(s, discRows, radius) {
    var rects = s.rects;
    if (!rects || !rects.length) return null;
    var r2 = radius * radius;
    var out = [];

    for (var ri = 0; ri < rects.length; ri++) {
      var rx = rects[ri][0], ry = rects[ri][1];
      var rw = rects[ri][2], rh = rects[ri][3];
      if (rw <= 0 || rh <= 0) continue;
      var open = Object.create(null);

      for (var y = ry; y < ry + rh; y++) {
        var discs = discRows[y];
        var spans = [[rx, rx + rw - 1]];
        if (discs && discs.length) {
          for (var d = 0; d < discs.length; d += 2) {
            var cx = discs[d], cy = discs[d + 1];
            var dy = y - cy;
            var t = r2 - dy * dy;
            if (t < 0) continue;
            var half = Math.floor(Math.sqrt(t));
            spans = subtractSpan(spans, Math.round(cx) - half, Math.round(cx) + half);
            if (!spans.length) break;
          }
        }
        if (!spans.length) continue;
        var seen = Object.create(null);
        for (var si = 0; si < spans.length; si++) {
          var a = spans[si][0], b = spans[si][1];
          if (b < a) continue;
          var key = a + ':' + b;
          seen[key] = 1;
          var rect = open[key];
          if (rect && rect[1] + rect[3] === y) {
            rect[3]++;
          } else {
            rect = [a, y, b - a + 1, 1];
            open[key] = rect;
            out.push(rect);
          }
        }
      }
    }

    if (!out.length) return null;
    var copy = {};
    for (var key2 in s) if (Object.prototype.hasOwnProperty.call(s, key2)) copy[key2] = s[key2];
    copy.rects = out;
    return copy;
  }

  function eraseStrokes(originals, path, radius) {
    if (!originals || !originals.length || !path || !path.length) return originals;
    var box = pathBBox(path, radius);
    var grid = buildGrid(path, radius);
    var discRows = buildDiscRows(path, radius);
    var out = [];
    for (var i = 0; i < originals.length; i++) {
      var s = originals[i];
      if (!s) continue;
      if (s.tool === 'fill') {
        var f = eraseFillStroke(s, discRows, radius);
        if (f) out.push(f);
        continue;
      }
      if (s.tool === 'spray') {
        var parts = eraseSpray(s, grid, box);
        for (var p = 0; p < parts.length; p++) out.push(parts[p]);
        continue;
      }
      var split = splitStroke(s, grid, radius, box);
      for (var k = 0; k < split.length; k++) out.push(split[k]);
    }
    return out;
  }

  /* ---------------- relleno por inundacion ---------------- */

  function floodFill(drawing, x, y, color, bgImage) {
    var W = drawing.width, H = drawing.height;
    if (!global.document) return null;
    var scale = 1;
    if (W * H > MAX_FILL_PIXELS) {
      scale = Math.max(0.25, Math.sqrt(MAX_FILL_PIXELS / (W * H)));
    }
    var cw = Math.max(1, Math.round(W * scale));
    var ch = Math.max(1, Math.round(H * scale));

    var c = document.createElement('canvas');
    c.width = cw;
    c.height = ch;
    var ctx = c.getContext('2d', { willReadFrequently: true });
    if (!ctx) return null;
    paint(ctx, drawing, { scale: scale, bgImage: bgImage });

    var data;
    try {
      data = ctx.getImageData(0, 0, cw, ch).data;
    } catch (e) { return null; }

    var sx = clamp(Math.round(x * scale), 0, cw - 1);
    var sy = clamp(Math.round(y * scale), 0, ch - 1);
    var i0 = (sy * cw + sx) * 4;
    var sr = data[i0], sg = data[i0 + 1], sb = data[i0 + 2], sa = data[i0 + 3];

    var fc = parseColor(color);
    if (sr === fc[0] && sg === fc[1] && sb === fc[2] && sa === fc[3]) return null;

    var visited = new Uint8Array(cw * ch);

    function match(px, py) {
      if (px < 0 || py < 0 || px >= cw || py >= ch) return false;
      var vi = py * cw + px;
      if (visited[vi]) return false;
      var di = vi * 4;
      return data[di] === sr && data[di + 1] === sg && data[di + 2] === sb && data[di + 3] === sa;
    }

    var rowSpans = Object.create(null);
    var stack = [[sx, sy]];

    while (stack.length) {
      var cell = stack.pop();
      var py = cell[1], px = cell[0];
      if (!match(px, py)) continue;

      var x0 = px;
      while (x0 - 1 >= 0 && match(x0 - 1, py)) x0--;
      var x1 = x0;
      while (x1 < cw && match(x1, py)) x1++;
      var a = x0, b = x1 - 1;

      var spans = rowSpans[py];
      if (!spans) { spans = rowSpans[py] = []; }
      spans.push([a, b]);
      for (var vx = a; vx <= b; vx++) visited[py * cw + vx] = 1;

      for (var d = -1; d <= 1; d += 2) {
        var ny = py + d;
        if (ny < 0 || ny >= ch) continue;
        var nx = Math.max(0, a - 1);
        var nend = Math.min(cw - 1, b + 1);
        while (nx <= nend) {
          if (match(nx, ny)) {
            var s = nx;
            while (s - 1 >= 0 && match(s - 1, ny)) s--;
            stack.push([s, ny]);
            var e = s;
            while (e + 1 < cw && match(e + 1, ny)) e++;
            nx = e + 1;
          } else {
            nx++;
          }
        }
      }
    }

    var ys = Object.keys(rowSpans).map(Number).sort(function (p, q) { return p - q; });
    if (!ys.length) return null;

    var rects = [];
    var open = Object.create(null);
    for (var yi = 0; yi < ys.length; yi++) {
      var yy = ys[yi];
      var row = rowSpans[yy];
      row.sort(function (p, q) { return p[0] - q[0]; });
      var seen = Object.create(null);
      for (var ri = 0; ri < row.length; ri++) {
        var ra = row[ri][0], rb = row[ri][1];
        if (rb < ra) continue;
        var key = ra + ':' + rb;
        seen[key] = 1;
        var rect = open[key];
        if (rect && rect[1] + rect[3] === yy) {
          rect[3]++;
        } else {
          rect = [ra, yy, rb - ra + 1, 1];
          open[key] = rect;
          rects.push(rect);
        }
      }
      for (var ok in open) {
        if (!seen[ok]) delete open[ok];
      }
    }

    if (!rects.length) return null;

    if (scale !== 1) {
      for (var k = 0; k < rects.length; k++) {
        var rx = Math.floor(rects[k][0] / scale);
        var ry = Math.floor(rects[k][1] / scale);
        var rr2 = Math.ceil((rects[k][0] + rects[k][2]) / scale) - rx;
        var rh2 = Math.ceil((rects[k][1] + rects[k][3]) / scale) - ry;
        rects[k] = [rx, ry, Math.max(1, rr2), Math.max(1, rh2)];
      }
    }

    return {
      id: uid(),
      tool: 'fill',
      color: color,
      size: sizeFor('fill', 4),
      rects: rects
    };
  }

  function parseColor(color) {
    var c = String(color || '#000000').trim();
    if (c.charAt(0) === '#') {
      var hex = c.slice(1);
      if (hex.length === 3) hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
      return [
        parseInt(hex.slice(0, 2), 16),
        parseInt(hex.slice(2, 4), 16),
        parseInt(hex.slice(4, 6), 16),
        255
      ];
    }
    var m = c.match(/rgba?\(([^)]+)\)/);
    if (m) {
      var parts = m[1].split(',').map(function (v) { return parseFloat(v); });
      return [
        Math.round(parts[0] || 0),
        Math.round(parts[1] || 0),
        Math.round(parts[2] || 0),
        parts.length > 3 && isFinite(parts[3]) ? Math.round(parts[3] * 255) : 255
      ];
    }
    return [0, 0, 0, 255];
  }

  /* ---------------- export ---------------- */

  global.DrawingEngine = {
    SCHEMA: SCHEMA,
    BG_TYPES: BG_TYPES,
    TOOLS: TOOLS,
    TOOL_LIST: TOOL_LIST,
    MIN_SCALE: MIN_SCALE,
    MAX_SCALE: MAX_SCALE,
    sizeFor: sizeFor,
    maxScaleFor: maxScaleFor,
    create: create,
    normalize: normalize,
    clone: clone,
    uid: uid,
    clamp: clamp,
    paintBackground: paintBackground,
    paintStroke: paintStroke,
    paintAll: paintAll,
    paint: paint,
    renderToCanvas: renderToCanvas,
    StrokeBuilder: StrokeBuilder,
    History: History,
    eraseStrokes: eraseStrokes,
    floodFill: floodFill,
    parseColor: parseColor
  };
})(typeof window !== 'undefined' ? window : this);
