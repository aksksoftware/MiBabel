/* ==================================================
   DrawingToolbar — barra de herramientas compartida
   --------------------------------------------------
   La usan el editor de dibujos (notas) y el modo dibujo
   de los tableros. Construye:

     [ herramientas ][ ↩ ↪ 🗑 ][ color ][ grosor ]

   y, anclados al boton de color, la paleta rapida y el
   selector de color propio (Android WebView no implementa
   el color chooser nativo de Chromium).

   El componente no conoce el lienzo: el anfitrion conecta
   los callbacks onTool / onColor / onSize / onUndo /
   onRedo / onClear.
   ================================================== */
(function (global) {
  'use strict';

  var COLORS = [
    '#1a1a1a', '#ffffff', '#ff0000', '#ff8c00', '#ffd700', '#32cd32',
    '#00bfff', '#0000ff', '#800080', '#ff69b4', '#8b4513', '#808080'
  ];

  /* Iconos: Font Awesome Free 7.3.1 (CC BY 4.0)
   * https://fontawesome.com/license/free — incrustados como SVG inline con
   * fill="currentColor" para heredar el color del boton sin depender de
   * la carga de ficheros externos. */
  var ICONS = {
    pencil: '<path d="M100.4 417.2C104.5 402.6 112.2 389.3 123 378.5L304.2 197.3L338.1 163.4C354.7 180 389.4 214.7 442.1 267.4L476 301.3L442.1 335.2L260.9 516.4C250.2 527.1 236.8 534.9 222.2 539L94.4 574.6C86.1 576.9 77.1 574.6 71 568.4C64.9 562.2 62.6 553.3 64.9 545L100.4 417.2zM156 413.5C151.6 418.2 148.4 423.9 146.7 430.1L122.6 517L209.5 492.9C215.9 491.1 221.7 487.8 226.5 483.2L155.9 413.5zM510 267.4C493.4 250.8 458.7 216.1 406 163.4L372 129.5C398.5 103 413.4 88.1 416.9 84.6C430.4 71 448.8 63.4 468 63.4C487.2 63.4 505.6 71 519.1 84.6L554.8 120.3C568.4 133.9 576 152.3 576 171.4C576 190.5 568.4 209 554.8 222.5C551.3 226 536.4 240.9 509.9 267.4z"></path>',
    pen: '<path d="M432.5 82.3L382.4 132.4L507.7 257.7L557.8 207.6C579.7 185.7 579.7 150.3 557.8 128.4L511.7 82.3C489.8 60.4 454.4 60.4 432.5 82.3zM343.3 161.2L342.8 161.3L198.7 204.5C178.8 210.5 163 225.7 156.4 245.5L67.8 509.8C64.9 518.5 65.9 528 70.3 535.8L225.7 380.4C224.6 376.4 224.1 372.3 224.1 368C224.1 341.5 245.6 320 272.1 320C298.6 320 320.1 341.5 320.1 368C320.1 394.5 298.6 416 272.1 416C267.8 416 263.6 415.4 259.7 414.4L104.3 569.7C112.1 574.1 121.5 575.1 130.3 572.2L394.6 483.6C414.3 477 429.6 461.2 435.6 441.3L478.8 297.2L478.9 296.7L343.4 161.2z"></path>',
    marker: '<path d="M472.8 64C445.4 64 419.2 74.9 399.8 94.2L382.1 112L369 98.9C340.9 70.8 295.3 70.8 267.2 98.9L167 199C157.6 208.4 157.6 223.6 167 232.9C176.4 242.2 191.6 242.3 200.9 232.9L301.1 132.9C310.5 123.5 325.7 123.5 335 132.9L348.1 145.9L248 246.1L393.9 392L545.8 240.2C565.2 220.8 576 194.6 576 167.2C576 110.2 529.8 64 472.8 64zM166.4 327.7C116.5 377.6 83.1 441.7 70.9 511.2L64.4 547.8C63 555.6 65.5 563.4 71 569C76.5 574.6 84.4 577 92.1 575.7L128.8 569.2C198.3 556.9 262.4 523.6 312.3 473.7L360 425.9L214.1 280L166.4 327.7z"></path>',
    spray: '<path d="M224 64L288 64C305.7 64 320 78.3 320 96L320 176L192 176L192 96C192 78.3 206.3 64 224 64zM96 320C96 267 139 224 192 224L320 224C373 224 416 267 416 320L416 528C416 554.5 394.5 576 368 576L144 576C117.5 576 96 554.5 96 528L96 320zM336 400C336 355.8 300.2 320 256 320C211.8 320 176 355.8 176 400C176 444.2 211.8 480 256 480C300.2 480 336 444.2 336 400zM352 128C352 110.3 366.3 96 384 96C401.7 96 416 110.3 416 128C416 145.7 401.7 160 384 160C366.3 160 352 145.7 352 128zM480 96C497.7 96 512 110.3 512 128C512 145.7 497.7 160 480 160C462.3 160 448 145.7 448 128C448 110.3 462.3 96 480 96zM544 128C544 110.3 558.3 96 576 96C593.7 96 608 110.3 608 128C608 145.7 593.7 160 576 160C558.3 160 544 145.7 544 128zM576 192C593.7 192 608 206.3 608 224C608 241.7 593.7 256 576 256C558.3 256 544 241.7 544 224C544 206.3 558.3 192 576 192zM544 320C544 302.3 558.3 288 576 288C593.7 288 608 302.3 608 320C608 337.7 593.7 352 576 352C558.3 352 544 337.7 544 320zM480 192C497.7 192 512 206.3 512 224C512 241.7 497.7 256 480 256C462.3 256 448 241.7 448 224C448 206.3 462.3 192 480 192z"></path>',
    eraser: '<path d="M210.5 480L333.5 480L398.8 414.7L225.3 241.2L98.6 367.9L210.6 479.9zM256 544L210.5 544C193.5 544 177.2 537.3 165.2 525.3L49 409C38.1 398.1 32 383.4 32 368C32 352.6 38.1 337.9 49 327L295 81C305.9 70.1 320.6 64 336 64C351.4 64 366.1 70.1 377 81L559 263C569.9 273.9 576 288.6 576 304C576 319.4 569.9 334.1 559 345L424 480L544 480C561.7 480 576 494.3 576 512C576 529.7 561.7 544 544 544L256 544z"></path>',
    fill: '<path d="M341.7 135.6L277.3 200L310.7 233.4C323.2 245.9 323.2 266.2 310.7 278.7C298.2 291.2 277.9 291.2 265.4 278.7L232 245.3L135.6 341.7C132.7 344.6 130.5 348.2 129.3 352L450.8 352L504.5 298.3C509.4 293.4 512.1 286.8 512.1 280C512.1 273.2 509.4 266.5 504.5 261.7L378.3 135.6C373.5 130.7 366.9 128 360 128C353.1 128 346.5 130.7 341.7 135.6zM90.3 296.4L186.7 200L137.3 150.6C124.8 138.1 124.8 117.8 137.3 105.3C149.8 92.8 170.1 92.8 182.6 105.3L232 154.7L296.4 90.3C313.3 73.5 336.1 64 360 64C383.9 64 406.7 73.5 423.6 90.3L549.7 216.4C566.5 233.3 576 256.1 576 280C576 303.9 566.5 326.7 549.7 343.6L343.6 549.7C326.7 566.5 303.9 576 280 576C256.1 576 233.3 566.5 216.4 549.7L90.3 423.6C73.5 406.7 64 383.9 64 360C64 336.1 73.5 313.3 90.3 296.4zM544 608C508.7 608 480 579.3 480 544C480 518.8 512.6 464.4 531.2 435.3C537.2 425.9 550.7 425.9 556.7 435.3C575.4 464.4 607.9 518.8 607.9 544C607.9 579.3 579.2 608 543.9 608z"></path>',
    trash: '<path d="M232.7 69.9L224 96L128 96C110.3 96 96 110.3 96 128C96 145.7 110.3 160 128 160L512 160C529.7 160 544 145.7 544 128C544 110.3 529.7 96 512 96L416 96L407.3 69.9C402.9 56.8 390.7 48 376.9 48L263.1 48C249.3 48 237.1 56.8 232.7 69.9zM512 208L128 208L149.1 531.1C150.7 556.4 171.7 576 197 576L443 576C468.3 576 489.3 556.4 490.9 531.1L512 208z"></path>'
  };

  var TOOL_KEYS = [
    ['pencil', 'drawingToolPencil'],
    ['pen', 'drawingToolPen'],
    ['marker', 'drawingToolMarker'],
    ['spray', 'drawingToolSpray'],
    ['eraser', 'drawingToolEraser'],
    ['fill', 'drawingToolFill']
  ];

  function t(key) {
    return typeof global.t === 'function' ? global.t(key) : key;
  }

  function svg(name) {
    return '<svg class="dw-ico" viewBox="0 0 640 640" fill="currentColor" aria-hidden="true">' + ICONS[name] + '</svg>';
  }

  function hexToRgb(hex) {
    var m = /^#?([0-9a-fA-F]{6})$/.exec(String(hex || '').trim());
    if (!m) return null;
    var n = parseInt(m[1], 16);
    return { r: (n >> 16) & 255, g: (n >> 8) & 255, b: n & 255 };
  }

  function rgbToHex(r, g, b) {
    function p(v) {
      var s = Math.round(Math.max(0, Math.min(255, v))).toString(16);
      return s.length < 2 ? '0' + s : s;
    }
    return '#' + p(r) + p(g) + p(b);
  }

  function rgbToHsv(r, g, b) {
    r /= 255; g /= 255; b /= 255;
    var mx = Math.max(r, g, b), mn = Math.min(r, g, b), d = mx - mn;
    var h = 0;
    if (d > 0) {
      if (mx === r) h = ((g - b) / d) % 6;
      else if (mx === g) h = (b - r) / d + 2;
      else h = (r - g) / d + 4;
      h *= 60;
      if (h < 0) h += 360;
    }
    return { h: h, s: mx > 0 ? d / mx : 0, v: mx };
  }

  function hsvToRgb(h, s, v) {
    h = ((h % 360) + 360) % 360;
    var c = v * s;
    var x = c * (1 - Math.abs((h / 60) % 2 - 1));
    var m = v - c;
    var r = 0, g = 0, b = 0;
    if (h < 60) { r = c; g = x; }
    else if (h < 120) { r = x; g = c; }
    else if (h < 180) { g = c; b = x; }
    else if (h < 240) { g = x; b = c; }
    else if (h < 300) { r = x; b = c; }
    else { r = c; b = x; }
    return { r: Math.round((r + m) * 255), g: Math.round((g + m) * 255), b: Math.round((b + m) * 255) };
  }

  function hsvToHex(c) {
    var rgb = hsvToRgb(c.h, c.s, c.v);
    return rgbToHex(rgb.r, rgb.g, rgb.b);
  }

  function trackPointer(el, onMove) {
    function pos(e) {
      var r = el.getBoundingClientRect();
      var x = (e.clientX - r.left) / (r.width || 1);
      var y = (e.clientY - r.top) / (r.height || 1);
      onMove(Math.max(0, Math.min(1, x)), Math.max(0, Math.min(1, y)));
    }
    function up(e) {
      try { el.releasePointerCapture(e.pointerId); } catch (err) { /* noop */ }
      el.removeEventListener('pointermove', pos);
      el.removeEventListener('pointerup', up);
      el.removeEventListener('pointercancel', up);
    }
    el.addEventListener('pointerdown', function (e) {
      if (e.button !== undefined && e.button !== 0) return;
      if (e.cancelable) e.preventDefault();
      try { el.setPointerCapture(e.pointerId); } catch (err) { /* noop */ }
      pos(e);
      el.addEventListener('pointermove', pos);
      el.addEventListener('pointerup', up);
      el.addEventListener('pointercancel', up);
    });
  }

  function toolbarHtml() {
    var html = '<div class="dw-tools" role="group">';
    for (var i = 0; i < TOOL_KEYS.length; i++) {
      var tool = TOOL_KEYS[i][0];
      html += '<button type="button" class="dw-tool' + (tool === 'pencil' ? ' active' : '') +
        '" data-tool="' + tool + '">' + svg(tool) + '</button>';
    }
    html += '</div>' +
      '<span class="dw-sep"></span>' +
      '<button type="button" class="dw-tool" data-act="undo">&#x21A9;</button>' +
      '<button type="button" class="dw-tool" data-act="redo">&#x21AA;</button>' +
      '<button type="button" class="dw-tool" data-act="clear">' + svg('trash') + '</button>' +
      '<span class="dw-sep"></span>' +
      '<span class="dw-color-wrap">' +
      '  <button type="button" class="dw-color" data-act="color"></button>' +
      '</span>' +
      '<span class="dw-size-wrap">' +
      '  <input type="range" class="dw-size-range" min="1" max="40" value="4" />' +
      '  <span class="dw-size-dot"></span>' +
      '</span>';
    return html;
  }

  function paletteHtml() {
    var html = '';
    for (var i = 0; i < COLORS.length; i++) {
      html += '<button type="button" class="dw-swatch" data-color="' + COLORS[i] + '" style="background:' + COLORS[i] + '"></button>';
    }
    html += '<button type="button" class="dw-swatch dw-swatch-custom" data-act="custom"></button>';
    return html;
  }

  function pickerHtml() {
    return '<div class="dw-picker-sv" data-part="sv"><span class="dw-picker-dot" data-part="sv-dot"></span></div>' +
      '<div class="dw-picker-hue" data-part="hue"><span class="dw-picker-dot dw-picker-dot-hue" data-part="hue-dot"></span></div>' +
      '<div class="dw-picker-row">' +
      '  <span class="dw-picker-chip" data-part="chip"></span>' +
      '  <input type="text" class="dw-picker-hex" data-part="hex" maxlength="7" autocomplete="off" spellcheck="false" />' +
      '</div>';
  }

  /* opts: {
       color, size, tool,
       onTool(tool), onColor(color), onSize(size),
       onUndo(), onRedo(), onClear()
     } */
  function create(opts) {
    opts = opts || {};

    var p = {};
    var color = opts.color || '#1a1a1a';
    var hsv = { h: 0, s: 1, v: 1 };

    var root = document.createElement('div');
    root.className = 'dw-toolbar';
    root.innerHTML = toolbarHtml();

    var palette = document.createElement('div');
    palette.className = 'dw-palette hidden';
    palette.setAttribute('role', 'group');
    palette.innerHTML = paletteHtml();

    var picker = document.createElement('div');
    picker.className = 'dw-picker hidden';
    picker.setAttribute('role', 'dialog');
    picker.innerHTML = pickerHtml();

    document.body.appendChild(palette);
    document.body.appendChild(picker);

    p.el = root;
    p.palette = palette;
    p.picker = picker;

    var el = {
      tools: [].slice.call(root.querySelectorAll('.dw-tool[data-tool]')),
      undo: root.querySelector('.dw-tool[data-act="undo"]'),
      redo: root.querySelector('.dw-tool[data-act="redo"]'),
      clear: root.querySelector('.dw-tool[data-act="clear"]'),
      colorBtn: root.querySelector('.dw-color'),
      range: root.querySelector('.dw-size-range'),
      dot: root.querySelector('.dw-size-dot'),
      sv: picker.querySelector('[data-part="sv"]'),
      svDot: picker.querySelector('[data-part="sv-dot"]'),
      hue: picker.querySelector('[data-part="hue"]'),
      hueDot: picker.querySelector('[data-part="hue-dot"]'),
      chip: picker.querySelector('[data-part="chip"]'),
      hex: picker.querySelector('[data-part="hex"]')
    };

    function fire(name, a) {
      var fn = opts[name];
      if (typeof fn !== 'function') return;
      try { fn(a); } catch (err) { console.error(err); }
    }

    function isPaletteOpen() {
      return !palette.classList.contains('hidden');
    }
    function isPickerOpen() {
      return !picker.classList.contains('hidden');
    }

    function updateDot() {
      var v = Number(el.range.value) || 4;
      var d = Math.max(4, Math.min(24, v));
      el.dot.style.width = d + 'px';
      el.dot.style.height = d + 'px';
      el.dot.style.background = color;
    }

    /* La paleta y el selector se anclan al boton de color con coordenadas de
     * viewport (ambos usan position:fixed y viven en <body> para escapar del
     * overflow de la barra). */
    function anchor(panel) {
      var r = el.colorBtn.getBoundingClientRect();
      var w = panel.offsetWidth;
      var h = panel.offsetHeight;
      var left = Math.min(Math.max(8, r.left), Math.max(8, window.innerWidth - w - 8));
      var top = r.top - h - 6;
      if (top < 8) top = Math.min(Math.max(8, r.bottom + 6), Math.max(8, window.innerHeight - h - 8));
      panel.style.left = left + 'px';
      panel.style.top = top + 'px';
    }

    function positionPanels() {
      if (isPaletteOpen()) anchor(palette);
      if (isPickerOpen()) anchor(picker);
    }

    function renderPicker() {
      el.sv.style.background =
        'linear-gradient(to top, #000, rgba(0,0,0,0)),' +
        'linear-gradient(to right, #fff, rgba(255,255,255,0)),' +
        'hsl(' + Math.round(hsv.h) + ',100%,50%)';
      el.svDot.style.left = (hsv.s * 100) + '%';
      el.svDot.style.top = ((1 - hsv.v) * 100) + '%';
      el.svDot.style.background = hsvToHex(hsv);
      el.hueDot.style.left = (hsv.h / 360 * 100) + '%';
      el.hueDot.style.background = hsvToHex({ h: hsv.h, s: 1, v: 1 });
      var hex = hsvToHex(hsv);
      el.chip.style.background = hex;
      if (document.activeElement !== el.hex) el.hex.value = hex;
    }

    function pickAt() {
      var hex = hsvToHex(hsv);
      renderPicker();
      p.setColor(hex);
      fire('onColor', hex);
    }

    function openPalette() {
      closePicker();
      palette.classList.remove('hidden');
      anchor(palette);
    }
    function closePalette() {
      palette.classList.add('hidden');
    }
    function openPicker() {
      closePalette();
      var rgb = hexToRgb(color) || { r: 26, g: 26, b: 26 };
      hsv = rgbToHsv(rgb.r, rgb.g, rgb.b);
      renderPicker();
      picker.classList.remove('hidden');
      anchor(picker);
    }
    function closePicker() {
      picker.classList.add('hidden');
    }

    /* ---------------- API ---------------- */

    p.setActiveTool = function (tool) {
      for (var i = 0; i < el.tools.length; i++) {
        el.tools[i].classList.toggle('active', el.tools[i].getAttribute('data-tool') === tool);
      }
    };
    p.setTool = function (tool) {
      p.setActiveTool(tool);
      fire('onTool', tool);
    };
    p.setColor = function (value) {
      if (!value) return;
      color = value;
      el.colorBtn.setAttribute('data-color', value);
      el.colorBtn.style.background = value;
      updateDot();
    };
    p.setSize = function (value) {
      el.range.value = String(value);
      updateDot();
    };
    p.getColor = function () { return color; };
    p.getSize = function () { return Number(el.range.value) || 4; };
    p.setUndoEnabled = function (on) { el.undo.disabled = !on; };
    p.setRedoEnabled = function (on) { el.redo.disabled = !on; };
    p.setClearEnabled = function (on) { el.clear.disabled = !on; };
    p.closePanels = function () { closePalette(); closePicker(); };
    p.positionPanels = positionPanels;
    p.isPanelOpen = function () { return isPaletteOpen() || isPickerOpen(); };
    p.isPickerOpen = isPickerOpen;

    p.applyLang = function () {
      for (var i = 0; i < TOOL_KEYS.length; i++) {
        var btn = root.querySelector('.dw-tool[data-tool="' + TOOL_KEYS[i][0] + '"]');
        if (btn) btn.title = t(TOOL_KEYS[i][1]);
      }
      el.undo.title = t('drawingUndo');
      el.redo.title = t('drawingRedo');
      el.clear.title = t('drawingClear');
      el.colorBtn.title = t('drawingColor');
      var custom = palette.querySelector('.dw-swatch-custom');
      if (custom) custom.title = t('drawingColorPicker');
      el.hex.title = t('drawingColorHex');
    };

    /* ---------------- eventos ---------------- */

    function onToolClick() {
      p.setTool(this.getAttribute('data-tool'));
    }
    for (var i = 0; i < el.tools.length; i++) el.tools[i].addEventListener('click', onToolClick);

    el.undo.addEventListener('click', function () { fire('onUndo'); });
    el.redo.addEventListener('click', function () { fire('onRedo'); });
    el.clear.addEventListener('click', function () { fire('onClear'); });

    el.colorBtn.addEventListener('click', function (e) {
      e.stopPropagation();
      if (isPickerOpen()) { closePicker(); return; }
      if (isPaletteOpen()) closePalette();
      else openPalette();
    });

    palette.addEventListener('click', function (e) {
      var sw = e.target.closest ? e.target.closest('.dw-swatch') : null;
      if (!sw) return;
      e.stopPropagation();
      if (sw.getAttribute('data-act') === 'custom') { openPicker(); return; }
      var value = sw.getAttribute('data-color');
      p.setColor(value);
      fire('onColor', value);
      closePalette();
    });

    el.range.addEventListener('input', function () {
      updateDot();
      fire('onSize', Number(el.range.value));
    });

    trackPointer(el.sv, function (x, y) {
      hsv.s = x;
      hsv.v = 1 - y;
      pickAt();
    });
    trackPointer(el.hue, function (x) {
      hsv.h = x * 360;
      pickAt();
    });
    el.hex.addEventListener('input', function () {
      var rgb = hexToRgb(el.hex.value);
      if (!rgb) return;
      hsv = rgbToHsv(rgb.r, rgb.g, rgb.b);
      pickAt();
    });
    el.hex.addEventListener('keydown', function (e) {
      if (e.key === 'Enter') { e.preventDefault(); closePicker(); }
    });
    picker.addEventListener('click', function (e) { e.stopPropagation(); });

    function onDocClick(e) {
      if (!palette.contains(e.target) && e.target !== el.colorBtn) closePalette();
      if (!picker.contains(e.target) && e.target !== el.colorBtn) closePicker();
    }
    document.addEventListener('click', onDocClick);

    function onShift() { positionPanels(); }
    window.addEventListener('resize', onShift);
    /* La barra puede vivir dentro de un contenedor con scroll horizontal
       (o ser ella misma la que scrollea): el evento scroll no burbujea,
       asi que lo escuchamos en fase de captura. */
    document.addEventListener('scroll', onShift, true);

    p.destroy = function () {
      document.removeEventListener('click', onDocClick);
      window.removeEventListener('resize', onShift);
      document.removeEventListener('scroll', onShift, true);
      if (palette.parentNode) palette.parentNode.removeChild(palette);
      if (picker.parentNode) picker.parentNode.removeChild(picker);
      if (root.parentNode) root.parentNode.removeChild(root);
    };

    p.setColor(color);
    p.setSize(opts.size || 4);
    p.setActiveTool(opts.tool || 'pencil');
    p.applyLang();

    return p;
  }

  global.DrawingToolbar = { create: create, COLORS: COLORS };
})(typeof window !== 'undefined' ? window : this);
