/* ==================================================
   DrawingEditor — menú de creación + editor modal de dibujos
   --------------------------------------------------
   - Menú de creación: elige el fondo (liso / renglones /
     cuadriculado / puntos / imagen del dispositivo) y abre
     el lienzo.
   - Editor modal: cabecera (Cancelar · título · Guardar),
     viewport con gestos y barra de herramientas.
   - Al guardar se genera una vista previa PNG/WebP del lienzo
     y se persiste junto con el modelo estructurado.
   ================================================== */
(function (global) {
  'use strict';

  var COLORS = [
    '#1a1a1a', '#ffffff', '#ff0000', '#ff8c00', '#ffd700', '#32cd32',
    '#00bfff', '#0000ff', '#800080', '#ff69b4', '#8b4513', '#808080'
  ];

  var els = {};
  var canvas = null;
  var current = null;
  var pending = null;
  var saving = false;
  var prevOverflow = null;

  function t(key) {
    return typeof global.t === 'function' ? global.t(key) : key;
  }

  function status(msg) {
    if (typeof global.setStatus === 'function') { try { global.setStatus(msg); } catch (e) {} }
  }

  /* ---------------- DOM ---------------- */

  function ensureDom() {
    if (els.overlay) return;

    var wrap = document.createElement('div');

    /* Iconos de la barra de herramientas: Font Awesome Free 7.3.1 (CC BY 4.0)
     * https://fontawesome.com/license/free — incrustados como SVG inline con
     * fill="currentColor" para heredar el color del botón sin depender de
     * la carga de ficheros externos. */
    wrap.innerHTML =
      '<div class="dialog-overlay hidden" id="dwCreateOverlay">' +
      '  <div class="dialog dw-create-dialog">' +
      '    <h3 id="dwCreateTitle" data-i18n="drawingCreateTitle">Nuevo dibujo</h3>' +
      '    <div class="dw-create-label" id="dwCreateBgLabel" data-i18n="drawingBackground">Fondo</div>' +
      '    <div class="dw-bg-options">' +
      '      <button type="button" class="dw-bg-opt" data-bg="solid"><span class="dw-bg-prev dw-bg-solid"></span><span data-i18n="drawingBgSolid">Liso</span></button>' +
      '      <button type="button" class="dw-bg-opt" data-bg="lined"><span class="dw-bg-prev dw-bg-lined"></span><span data-i18n="drawingBgLined">Renglones</span></button>' +
      '      <button type="button" class="dw-bg-opt" data-bg="grid"><span class="dw-bg-prev dw-bg-grid"></span><span data-i18n="drawingBgGrid">Cuadriculado</span></button>' +
      '      <button type="button" class="dw-bg-opt" data-bg="dotted"><span class="dw-bg-prev dw-bg-dotted"></span><span data-i18n="drawingBgDotted">Puntos</span></button>' +
      '      <button type="button" class="dw-bg-opt" data-bg="image"><span class="dw-bg-prev dw-bg-image">&#x1F5BC;</span><span data-i18n="drawingBgImage">Imagen del dispositivo</span></button>' +
      '    </div>' +
      '    <div class="dialog-actions">' +
      '      <button type="button" class="btn" id="dwCreateCancelBtn" data-i18n="cancel">Cancelar</button>' +
      '    </div>' +
      '  </div>' +
      '</div>' +
      '<div class="dw-overlay hidden" id="dwOverlay">' +
      '  <div class="dw-header">' +
      '    <button type="button" class="btn dw-ghost" id="dwCancelBtn" data-i18n="cancel">Cancelar</button>' +
      '    <div class="dw-title" id="dwTitle" data-i18n="drawingCreateTitle">Dibujo</div>' +
      '    <button type="button" class="btn btn-primary" id="dwSaveBtn" data-i18n="drawingSave">Guardar</button>' +
      '  </div>' +
      '  <div class="dw-viewport" id="dwViewport"></div>' +
      '  <div class="dw-toolbar">' +
      '    <div class="dw-tools" role="group">' +
      '      <button type="button" class="dw-tool active" data-tool="pencil" data-i18n-title="drawingToolPencil" title="Lápiz"><svg class="dw-ico" viewBox="0 0 640 640" fill="currentColor" aria-hidden="true"><path d="M100.4 417.2C104.5 402.6 112.2 389.3 123 378.5L304.2 197.3L338.1 163.4C354.7 180 389.4 214.7 442.1 267.4L476 301.3L442.1 335.2L260.9 516.4C250.2 527.1 236.8 534.9 222.2 539L94.4 574.6C86.1 576.9 77.1 574.6 71 568.4C64.9 562.2 62.6 553.3 64.9 545L100.4 417.2zM156 413.5C151.6 418.2 148.4 423.9 146.7 430.1L122.6 517L209.5 492.9C215.9 491.1 221.7 487.8 226.5 483.2L155.9 413.5zM510 267.4C493.4 250.8 458.7 216.1 406 163.4L372 129.5C398.5 103 413.4 88.1 416.9 84.6C430.4 71 448.8 63.4 468 63.4C487.2 63.4 505.6 71 519.1 84.6L554.8 120.3C568.4 133.9 576 152.3 576 171.4C576 190.5 568.4 209 554.8 222.5C551.3 226 536.4 240.9 509.9 267.4z"></path></svg></button>' +
      '      <button type="button" class="dw-tool" data-tool="pen" data-i18n-title="drawingToolPen" title="Pluma"><svg class="dw-ico" viewBox="0 0 640 640" fill="currentColor" aria-hidden="true"><path d="M432.5 82.3L382.4 132.4L507.7 257.7L557.8 207.6C579.7 185.7 579.7 150.3 557.8 128.4L511.7 82.3C489.8 60.4 454.4 60.4 432.5 82.3zM343.3 161.2L342.8 161.3L198.7 204.5C178.8 210.5 163 225.7 156.4 245.5L67.8 509.8C64.9 518.5 65.9 528 70.3 535.8L225.7 380.4C224.6 376.4 224.1 372.3 224.1 368C224.1 341.5 245.6 320 272.1 320C298.6 320 320.1 341.5 320.1 368C320.1 394.5 298.6 416 272.1 416C267.8 416 263.6 415.4 259.7 414.4L104.3 569.7C112.1 574.1 121.5 575.1 130.3 572.2L394.6 483.6C414.3 477 429.6 461.2 435.6 441.3L478.8 297.2L478.9 296.7L343.4 161.2z"></path></svg></button>' +
      '      <button type="button" class="dw-tool" data-tool="marker" data-i18n-title="drawingToolMarker" title="Marcador"><svg class="dw-ico" viewBox="0 0 640 640" fill="currentColor" aria-hidden="true"><path d="M472.8 64C445.4 64 419.2 74.9 399.8 94.2L382.1 112L369 98.9C340.9 70.8 295.3 70.8 267.2 98.9L167 199C157.6 208.4 157.6 223.6 167 232.9C176.4 242.2 191.6 242.3 200.9 232.9L301.1 132.9C310.5 123.5 325.7 123.5 335 132.9L348.1 145.9L248 246.1L393.9 392L545.8 240.2C565.2 220.8 576 194.6 576 167.2C576 110.2 529.8 64 472.8 64zM166.4 327.7C116.5 377.6 83.1 441.7 70.9 511.2L64.4 547.8C63 555.6 65.5 563.4 71 569C76.5 574.6 84.4 577 92.1 575.7L128.8 569.2C198.3 556.9 262.4 523.6 312.3 473.7L360 425.9L214.1 280L166.4 327.7z"></path></svg></button>' +
      '      <button type="button" class="dw-tool" data-tool="spray" data-i18n-title="drawingToolSpray" title="Aerógrafo"><svg class="dw-ico" viewBox="0 0 640 640" fill="currentColor" aria-hidden="true"><path d="M224 64L288 64C305.7 64 320 78.3 320 96L320 176L192 176L192 96C192 78.3 206.3 64 224 64zM96 320C96 267 139 224 192 224L320 224C373 224 416 267 416 320L416 528C416 554.5 394.5 576 368 576L144 576C117.5 576 96 554.5 96 528L96 320zM336 400C336 355.8 300.2 320 256 320C211.8 320 176 355.8 176 400C176 444.2 211.8 480 256 480C300.2 480 336 444.2 336 400zM352 128C352 110.3 366.3 96 384 96C401.7 96 416 110.3 416 128C416 145.7 401.7 160 384 160C366.3 160 352 145.7 352 128zM480 96C497.7 96 512 110.3 512 128C512 145.7 497.7 160 480 160C462.3 160 448 145.7 448 128C448 110.3 462.3 96 480 96zM544 128C544 110.3 558.3 96 576 96C593.7 96 608 110.3 608 128C608 145.7 593.7 160 576 160C558.3 160 544 145.7 544 128zM576 192C593.7 192 608 206.3 608 224C608 241.7 593.7 256 576 256C558.3 256 544 241.7 544 224C544 206.3 558.3 192 576 192zM544 320C544 302.3 558.3 288 576 288C593.7 288 608 302.3 608 320C608 337.7 593.7 352 576 352C558.3 352 544 337.7 544 320zM480 192C497.7 192 512 206.3 512 224C512 241.7 497.7 256 480 256C462.3 256 448 241.7 448 224C448 206.3 462.3 192 480 192z"></path></svg></button>' +
      '      <button type="button" class="dw-tool" data-tool="eraser" data-i18n-title="drawingToolEraser" title="Borrador"><svg class="dw-ico" viewBox="0 0 640 640" fill="currentColor" aria-hidden="true"><path d="M210.5 480L333.5 480L398.8 414.7L225.3 241.2L98.6 367.9L210.6 479.9zM256 544L210.5 544C193.5 544 177.2 537.3 165.2 525.3L49 409C38.1 398.1 32 383.4 32 368C32 352.6 38.1 337.9 49 327L295 81C305.9 70.1 320.6 64 336 64C351.4 64 366.1 70.1 377 81L559 263C569.9 273.9 576 288.6 576 304C576 319.4 569.9 334.1 559 345L424 480L544 480C561.7 480 576 494.3 576 512C576 529.7 561.7 544 544 544L256 544z"></path></svg></button>' +
      '      <button type="button" class="dw-tool" data-tool="fill" data-i18n-title="drawingToolFill" title="Relleno"><svg class="dw-ico" viewBox="0 0 640 640" fill="currentColor" aria-hidden="true"><path d="M341.7 135.6L277.3 200L310.7 233.4C323.2 245.9 323.2 266.2 310.7 278.7C298.2 291.2 277.9 291.2 265.4 278.7L232 245.3L135.6 341.7C132.7 344.6 130.5 348.2 129.3 352L450.8 352L504.5 298.3C509.4 293.4 512.1 286.8 512.1 280C512.1 273.2 509.4 266.5 504.5 261.7L378.3 135.6C373.5 130.7 366.9 128 360 128C353.1 128 346.5 130.7 341.7 135.6zM90.3 296.4L186.7 200L137.3 150.6C124.8 138.1 124.8 117.8 137.3 105.3C149.8 92.8 170.1 92.8 182.6 105.3L232 154.7L296.4 90.3C313.3 73.5 336.1 64 360 64C383.9 64 406.7 73.5 423.6 90.3L549.7 216.4C566.5 233.3 576 256.1 576 280C576 303.9 566.5 326.7 549.7 343.6L343.6 549.7C326.7 566.5 303.9 576 280 576C256.1 576 233.3 566.5 216.4 549.7L90.3 423.6C73.5 406.7 64 383.9 64 360C64 336.1 73.5 313.3 90.3 296.4zM544 608C508.7 608 480 579.3 480 544C480 518.8 512.6 464.4 531.2 435.3C537.2 425.9 550.7 425.9 556.7 435.3C575.4 464.4 607.9 518.8 607.9 544C607.9 579.3 579.2 608 543.9 608z"></path></svg></button>' +
      '    </div>' +
      '    <span class="dw-sep"></span>' +
      '    <button type="button" class="dw-tool" id="dwUndoBtn" data-i18n-title="drawingUndo" title="Deshacer">&#x21A9;</button>' +
      '    <button type="button" class="dw-tool" id="dwRedoBtn" data-i18n-title="drawingRedo" title="Rehacer">&#x21AA;</button>' +
      '    <button type="button" class="dw-tool" id="dwClearBtn" data-i18n-title="drawingClear" title="Limpiar"><svg class="dw-ico" viewBox="0 0 640 640" fill="currentColor" aria-hidden="true"><path d="M232.7 69.9L224 96L128 96C110.3 96 96 110.3 96 128C96 145.7 110.3 160 128 160L512 160C529.7 160 544 145.7 544 128C544 110.3 529.7 96 512 96L416 96L407.3 69.9C402.9 56.8 390.7 48 376.9 48L263.1 48C249.3 48 237.1 56.8 232.7 69.9zM512 208L128 208L149.1 531.1C150.7 556.4 171.7 576 197 576L443 576C468.3 576 489.3 556.4 490.9 531.1L512 208z"></path></svg></button>' +
      '    <span class="dw-sep"></span>' +
      '    <span class="dw-color-wrap">' +
      '      <button type="button" class="dw-color" id="dwColorBtn" data-i18n-title="drawingColor" title="Color"></button>' +
      '    </span>' +
      '    <span class="dw-size-wrap">' +
      '      <input type="range" id="dwSizeRange" min="1" max="40" value="4" />' +
      '      <span class="dw-size-dot" id="dwSizeDot"></span>' +
      '    </span>' +
      '  </div>' +
      '  <div class="dw-palette hidden" id="dwPalette" role="group"></div>' +
      '  <div class="dw-picker hidden" id="dwPicker" role="dialog">' +
      '    <div class="dw-picker-sv" id="dwPickerSV"><span class="dw-picker-dot" id="dwPickerDot"></span></div>' +
      '    <div class="dw-picker-hue" id="dwPickerHue"><span class="dw-picker-dot dw-picker-dot-hue" id="dwPickerHueDot"></span></div>' +
      '    <div class="dw-picker-row">' +
      '      <span class="dw-picker-chip" id="dwPickerChip"></span>' +
      '      <input type="text" class="dw-picker-hex" id="dwPickerHex" maxlength="7" autocomplete="off" spellcheck="false" title="…" data-i18n-title="drawingColorHex" />' +
      '    </div>' +
      '  </div>' +
      '</div>';

    document.body.appendChild(wrap);

    els.wrap = wrap;
    els.overlay = wrap.querySelector('#dwOverlay');
    els.createOverlay = wrap.querySelector('#dwCreateOverlay');
    els.viewport = wrap.querySelector('#dwViewport');
    els.title = wrap.querySelector('#dwTitle');
    els.cancelBtn = wrap.querySelector('#dwCancelBtn');
    els.saveBtn = wrap.querySelector('#dwSaveBtn');
    els.undoBtn = wrap.querySelector('#dwUndoBtn');
    els.redoBtn = wrap.querySelector('#dwRedoBtn');
    els.clearBtn = wrap.querySelector('#dwClearBtn');
    els.colorBtn = wrap.querySelector('#dwColorBtn');
    els.palette = wrap.querySelector('#dwPalette');
    els.picker = wrap.querySelector('#dwPicker');
    els.pickerSV = wrap.querySelector('#dwPickerSV');
    els.pickerDot = wrap.querySelector('#dwPickerDot');
    els.pickerHue = wrap.querySelector('#dwPickerHue');
    els.pickerHueDot = wrap.querySelector('#dwPickerHueDot');
    els.pickerChip = wrap.querySelector('#dwPickerChip');
    els.pickerHex = wrap.querySelector('#dwPickerHex');
    els.toolbar = wrap.querySelector('.dw-toolbar');
    els.sizeRange = wrap.querySelector('#dwSizeRange');
    els.sizeDot = wrap.querySelector('#dwSizeDot');
    els.createTitle = wrap.querySelector('#dwCreateTitle');
    els.createCancel = wrap.querySelector('#dwCreateCancelBtn');
    els.fileInput = document.getElementById('dwBgImageInput');
    if (!els.fileInput) {
      els.fileInput = document.createElement('input');
      els.fileInput.type = 'file';
      els.fileInput.id = 'dwBgImageInput';
      els.fileInput.accept = 'image/png,image/jpeg,image/webp,image/gif';
      els.fileInput.style.display = 'none';
      document.body.appendChild(els.fileInput);
    }
    els.toolBtns = [].slice.call(wrap.querySelectorAll('.dw-tool[data-tool]'));
    els.bgOpts = [].slice.call(wrap.querySelectorAll('.dw-bg-opt'));

    buildPalette();
    bindPickerControls();
    bindEvents();
  }

  function buildPalette() {
    var html = '';
    for (var i = 0; i < COLORS.length; i++) {
      html += '<button type="button" class="dw-swatch" data-color="' + COLORS[i] + '" style="background:' + COLORS[i] + '"></button>';
    }
    html += '<button type="button" class="dw-swatch dw-swatch-custom" id="dwCustomColor" title="…" data-i18n-title="drawingColorPicker"></button>';
    els.palette.innerHTML = html;
  }

  /* La paleta vive como hijo directo de .dw-overlay para escapar del
   * overflow del toolbar; se ancla al boton de color con coordenadas de
   * viewport (el overlay ocupa inset:0). */
  function positionPalette() {
    if (!els.palette || !els.colorBtn || els.palette.classList.contains('hidden')) return;
    var r = els.colorBtn.getBoundingClientRect();
    var w = els.palette.offsetWidth;
    var h = els.palette.offsetHeight;
    var left = Math.min(Math.max(8, r.left), Math.max(8, window.innerWidth - w - 8));
    var top = r.top - h - 6;
    if (top < 8) top = r.bottom + 6;
    els.palette.style.left = left + 'px';
    els.palette.style.top = top + 'px';
  }

  function openPalette() {
    closePicker();
    els.palette.classList.remove('hidden');
    positionPalette();
  }

  function closePalette() {
    if (els.palette) els.palette.classList.add('hidden');
  }

  /* ---------------- selector de color propio ----------------
   * Android WebView no implementa el color chooser nativo de Chromium
   * (<input type="color"> / showPicker() no hace nada), asi que el
   * selector vive dentro de .dw-overlay y no depende de la plataforma. */

  var pickerHSV = { h: 0, s: 1, v: 1 };

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

  function renderPicker() {
    if (!els.pickerSV) return;
    els.pickerSV.style.background =
      'linear-gradient(to top, #000, rgba(0,0,0,0)),' +
      'linear-gradient(to right, #fff, rgba(255,255,255,0)),' +
      'hsl(' + Math.round(pickerHSV.h) + ',100%,50%)';
    els.pickerDot.style.left = (pickerHSV.s * 100) + '%';
    els.pickerDot.style.top = ((1 - pickerHSV.v) * 100) + '%';
    els.pickerDot.style.background = hsvToHex(pickerHSV);
    els.pickerHueDot.style.left = (pickerHSV.h / 360 * 100) + '%';
    els.pickerHueDot.style.background = hsvToHex({ h: pickerHSV.h, s: 1, v: 1 });
    var hex = hsvToHex(pickerHSV);
    els.pickerChip.style.background = hex;
    if (document.activeElement !== els.pickerHex) els.pickerHex.value = hex;
  }

  function pickAt() {
    var hex = hsvToHex(pickerHSV);
    renderPicker();
    applyColor(hex);
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

  function bindPickerControls() {
    trackPointer(els.pickerSV, function (x, y) {
      pickerHSV.s = x;
      pickerHSV.v = 1 - y;
      pickAt();
    });
    trackPointer(els.pickerHue, function (x) {
      pickerHSV.h = x * 360;
      pickAt();
    });
    els.pickerHex.addEventListener('input', function () {
      var rgb = hexToRgb(els.pickerHex.value);
      if (!rgb) return;
      pickerHSV = rgbToHsv(rgb.r, rgb.g, rgb.b);
      pickAt();
    });
    els.pickerHex.addEventListener('keydown', function (e) {
      if (e.key === 'Enter') { e.preventDefault(); closePicker(); }
    });
    els.picker.addEventListener('click', function (e) { e.stopPropagation(); });
  }

  function isPickerOpen() {
    return !!(els.picker && !els.picker.classList.contains('hidden'));
  }

  function positionPicker() {
    if (!els.picker || !els.colorBtn || els.picker.classList.contains('hidden')) return;
    var r = els.colorBtn.getBoundingClientRect();
    var w = els.picker.offsetWidth;
    var h = els.picker.offsetHeight;
    var left = Math.min(Math.max(8, r.left), Math.max(8, window.innerWidth - w - 8));
    var top = r.top - h - 6;
    if (top < 8) top = Math.min(Math.max(8, r.bottom + 6), Math.max(8, window.innerHeight - h - 8));
    els.picker.style.left = left + 'px';
    els.picker.style.top = top + 'px';
  }

  function openPicker() {
    closePalette();
    var rgb = hexToRgb(els.colorBtn.getAttribute('data-color')) || { r: 26, g: 26, b: 26 };
    pickerHSV = rgbToHsv(rgb.r, rgb.g, rgb.b);
    els.picker.classList.remove('hidden');
    renderPicker();
    positionPicker();
  }

  function closePicker() {
    if (els.picker) els.picker.classList.add('hidden');
  }

  function bindEvents() {
    els.cancelBtn.addEventListener('click', doCancel);
    els.saveBtn.addEventListener('click', doSave);
    els.undoBtn.addEventListener('click', function () { if (canvas) canvas.undo(); });
    els.redoBtn.addEventListener('click', function () { if (canvas) canvas.redo(); });
    els.clearBtn.addEventListener('click', doClear);
    els.createCancel.addEventListener('click', function () { hideCreate(); });

    els.toolBtns.forEach(function (b) {
      b.addEventListener('click', function () { setTool(b.getAttribute('data-tool')); });
    });

    els.colorBtn.addEventListener('click', function (e) {
      e.stopPropagation();
      if (isPickerOpen()) { closePicker(); return; }
      if (els.palette.classList.contains('hidden')) openPalette();
      else closePalette();
    });
    els.palette.addEventListener('click', function (e) {
      var sw = e.target.closest ? e.target.closest('.dw-swatch') : null;
      if (!sw) return;
      e.stopPropagation();
      if (sw.id === 'dwCustomColor') { openPicker(); return; }
      applyColor(sw.getAttribute('data-color'));
    });

    els.sizeRange.addEventListener('input', function () {
      if (canvas) canvas.setSize(Number(els.sizeRange.value));
      updateSizeDot();
    });

    document.addEventListener('click', function (e) {
      if (!els.palette.contains(e.target) && e.target !== els.colorBtn) {
        closePalette();
      }
      var inPicker = els.picker && els.picker.contains(e.target);
      if (!inPicker && e.target !== els.colorBtn) closePicker();
    });

    els.bgOpts.forEach(function (b) {
      b.addEventListener('click', function () { onBgOption(b.getAttribute('data-bg')); });
    });

    els.fileInput.addEventListener('change', onBgFile);

    document.addEventListener('keydown', onKeydown, false);

    window.addEventListener('resize', onViewportShift);
    if (els.toolbar) els.toolbar.addEventListener('scroll', onViewportShift);
  }

  function onViewportShift() {
    positionPalette();
    positionPicker();
  }

  function isOpen() {
    return !!(current && els.overlay && !els.overlay.classList.contains('hidden'));
  }

  function onKeydown(e) {
    if (e.key === 'Escape') {
      if (isPickerOpen()) { e.preventDefault(); closePicker(); return; }
      if (isOpen()) { e.preventDefault(); doCancel(); return; }
      if (els.createOverlay && !els.createOverlay.classList.contains('hidden')) {
        e.preventDefault();
        hideCreate();
      }
      return;
    }
    if (!isOpen()) return;
    if ((e.ctrlKey || e.metaKey) && !e.altKey && !e.shiftKey && (e.key === 'z' || e.key === 'Z')) {
      e.preventDefault();
      if (canvas) canvas.undo();
      return;
    }
    if ((e.ctrlKey || e.metaKey) && !e.altKey && e.shiftKey && (e.key === 'z' || e.key === 'Z')) {
      e.preventDefault();
      if (canvas) canvas.redo();
    }
  }

  /* ---------------- etiquetas i18n ---------------- */

  function labelize() {
    var nodes = els.wrap.querySelectorAll('[data-i18n]');
    for (var i = 0; i < nodes.length; i++) nodes[i].textContent = t(nodes[i].getAttribute('data-i18n'));
    var titles = els.wrap.querySelectorAll('[data-i18n-title]');
    for (var j = 0; j < titles.length; j++) titles[j].title = t(titles[j].getAttribute('data-i18n-title'));
    if (current) {
      els.title.textContent = t(current.mode === 'edit' ? 'drawingEditTitle' : 'drawingCreateTitle');
    }
    updateSizeDot();
  }

  /* ---------------- menú de creación ---------------- */

  function openCreate(handlers) {
    ensureDom();
    pending = handlers || null;
    labelize();
    els.createOverlay.classList.remove('hidden');
  }

  function hideCreate(keepPending) {
    if (els.createOverlay) els.createOverlay.classList.add('hidden');
    if (!keepPending) pending = null;
  }

  function takePending() {
    var p = pending;
    pending = null;
    return p;
  }

  function defaultSize() {
    var w = 900;
    var area = document.querySelector('.items-area');
    if (area && area.clientWidth > 80) w = Math.max(240, Math.round(area.clientWidth - 40));
    return { width: w, height: Math.round(w * 4 / 3) };
  }

  function onBgOption(kind) {
    hideCreate(true);
    if (kind === 'image') {
      els.fileInput.value = '';
      els.fileInput.click();
      return;
    }
    var size = defaultSize();
    open({
      mode: 'create',
      drawing: global.DrawingEngine.create({ width: size.width, height: size.height, background: { type: kind } })
    });
  }

  function onBgFile() {
    var f = els.fileInput.files && els.fileInput.files[0];
    els.fileInput.value = '';
    if (!f) return;
    if (f.size > 5 * 1024 * 1024) { alert(t('drawingImageTooLarge')); return; }
    if (typeof global.ImageConverter === 'undefined') { alert(t('drawingImageError')); return; }
    status(t('drawingLoading'));
    global.ImageConverter.toWebP(f, 0.85).then(function (res) {
      status('');
      var ref = 'imagenes/' + (typeof global.generateImageId === 'function' ? global.generateImageId() : global.DrawingEngine.uid('bg')) + '.webp';
      var bgPending = { ref: ref, base64: res.base64, w: res.width, h: res.height };
      var drawing = global.DrawingEngine.create({
        width: res.width,
        height: res.height,
        background: { type: 'image', ref: ref, w: res.width, h: res.height }
      });
      var img = new Image();
      img.onload = function () {
        open({ mode: 'create', drawing: drawing, bgImage: img, pendingBg: bgPending });
      };
      img.onerror = function () { alert(t('drawingImageError')); };
      img.src = 'data:image/webp;base64,' + res.base64;
    }).catch(function (err) {
      console.error('drawing bg image error:', err);
      status('');
      alert(t('drawingImageError'));
    });
  }

  /* ---------------- editor ---------------- */

  function open(opts) {
    ensureDom();
    var merged = {};
    if (pending && (!opts || opts.mode !== 'edit')) {
      for (var k in pending) if (Object.prototype.hasOwnProperty.call(pending, k)) merged[k] = pending[k];
    }
    pending = null;
    if (opts) for (var j in opts) if (Object.prototype.hasOwnProperty.call(opts, j)) merged[j] = opts[j];

    current = merged;
    current.mode = current.mode || 'create';
    saving = false;

    els.createOverlay.classList.add('hidden');
    labelize();
    els.overlay.classList.remove('hidden');
    closePalette();
    closePicker();
    els.saveBtn.disabled = false;

    prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    applyColor(current.color || '#1a1a1a');
    els.sizeRange.value = String(current.size || 4);
    updateSizeDot();
    setActiveTool('pencil');

    canvas = new global.DrawingCanvas(els.viewport, current.drawing, {
      bgImage: current.bgImage || null,
      onChange: onCanvasChange
    });
    canvas.setTool('pencil');
    canvas.setColor(els.colorBtn.getAttribute('data-color') || '#1a1a1a');
    canvas.setSize(Number(els.sizeRange.value));
    canvas.mount();
    onCanvasChange();

    current.bgPromise = null;
    var bgType = current.drawing.background ? current.drawing.background.type : null;
    if (bgType === 'image') {
      if (current.bgImage) {
        current.bgPromise = ensureDecoded(current.bgImage);
      } else {
        current.bgPromise = loadBgImage(current.drawing.background);
      }
    }
  }

  /* Garantiza que el bitmap esta decodificado en memoria antes de usarlo. */
  function ensureDecoded(img) {
    if (!img) return Promise.resolve(null);
    if (typeof img.decode !== 'function') return Promise.resolve(img);
    return img.decode().then(function () { return img; }).catch(function () { return img; });
  }

  /* Carga el fondo de imagen del dibujo. Devuelve SIEMPRE una promesa para
   * que doSave() pueda esperar a que el bitmap esté listo antes de generar
   * la vista previa. */
  function loadBgImage(bg) {
    if (!bg || !bg.ref || typeof global.ImageManager === 'undefined') {
      if (bg && bg.type === 'image') {
        console.warn('[dibujo] fondo type=image sin ref o sin ImageManager', bg && bg.ref);
      }
      return Promise.resolve(null);
    }
    var ref = bg.ref;
    return global.ImageManager.read(ref).then(function (b64) {
      if (!b64) {
        console.warn('[dibujo] read() devolvio vacio para el fondo:', ref);
        return null;
      }
      if (!canvas) return null;
      var mime = typeof global.ImageConverter !== 'undefined'
        ? global.ImageConverter.getMimeFromRef(ref)
        : 'image/webp';
      var img = new Image();
      var ready = new Promise(function (resolve, reject) {
        img.onload = function () { resolve(img); };
        img.onerror = function () { reject(new Error('decode ' + ref)); };
      });
      img.src = 'data:' + mime + ';base64,' + b64;
      return ready.then(function () {
        /* decode() garantiza el bitmap en memoria: sin el, drawImage del
         * preview puede fallar bajo presion de memoria en Android. */
        return ensureDecoded(img);
      }).then(function () {
        if (canvas) canvas.setBgImage(img);
        else console.warn('[dibujo] fondo cargado tras cerrar el editor:', ref);
        return img;
      });
    }).catch(function (e) {
      console.warn('[dibujo] no se pudo cargar el fondo:', ref, e && e.message);
      return null;
    });
  }

  function onCanvasChange(state) {
    if (!els.undoBtn) return;
    els.undoBtn.disabled = !state.canUndo();
    els.redoBtn.disabled = !state.canRedo();
    els.clearBtn.disabled = !(current && current.drawing && current.drawing.strokes.length);
  }

  function setActiveTool(tool) {
    els.toolBtns.forEach(function (b) {
      b.classList.toggle('active', b.getAttribute('data-tool') === tool);
    });
  }

  function setTool(tool) {
    if (!canvas) return;
    canvas.setTool(tool);
    setActiveTool(tool);
  }

  function applyColor(color) {
    if (!color) return;
    els.colorBtn.setAttribute('data-color', color);
    els.colorBtn.style.background = color;
    if (canvas) canvas.setColor(color);
  }

  function updateSizeDot() {
    if (!els.sizeDot) return;
    var v = Number(els.sizeRange.value) || 4;
    var d = Math.max(4, Math.min(24, v));
    els.sizeDot.style.width = d + 'px';
    els.sizeDot.style.height = d + 'px';
    els.sizeDot.style.background = els.colorBtn.getAttribute('data-color') || '#1a1a1a';
  }

  function doClear() {
    if (!canvas) return;
    if (!confirm(t('drawingClearConfirm'))) return;
    canvas.clear();
    onCanvasChange(canvas.state);
  }

  /* ---------------- guardar ---------------- */

  function makePreview(drawing, bgImage, wantExt) {
    var maxDim = 1600;
    var s = Math.min(1, maxDim / Math.max(drawing.width, drawing.height));
    var c = global.DrawingEngine.renderToCanvas(drawing, s, bgImage);
    if (!c) return Promise.resolve(null);
    var mime = wantExt === 'png' ? 'image/png' : 'image/webp';

    function fromBlob(blob) {
      if (!blob) return Promise.reject(new Error('preview encode'));
      var ext = String(blob.type || '').indexOf('png') !== -1 ? 'png' : 'webp';
      return new Promise(function (resolve, reject) {
        var fr = new FileReader();
        fr.onload = function () {
          resolve({ base64: String(fr.result).split(',')[1], ext: ext });
        };
        fr.onerror = function () { reject(fr.error || new Error('preview read')); };
        fr.readAsDataURL(blob);
      });
    }

    try {
      if (c.toBlob) {
        return new Promise(function (resolve, reject) {
          c.toBlob(function (blob) {
            if (!blob) { reject(new Error('preview encode')); return; }
            fromBlob(blob).then(resolve, reject);
          }, mime, 0.86);
        });
      }
      var url = c.toDataURL(mime, 0.86);
      var isPng = url.indexOf('data:image/png') === 0;
      return Promise.resolve({
        base64: String(url).split(',')[1],
        ext: isPng ? 'png' : 'webp'
      });
    } catch (e) {
      return Promise.reject(e);
    }
  }

  function doSave() {
    if (saving || !current || !canvas) return;
    saving = true;
    els.saveBtn.disabled = true;
    status(t('drawingSaving'));

    var drawing = canvas.drawing;
    var previewRef = current.previewRef || null;
    var wantExt = previewRef ? String(previewRef).split('.').pop() : null;
    var pendingBg = current.pendingBg || null;
    var bgPromise = current.bgPromise || null;

    var chain = pendingBg
      ? global.ImageManager.save(pendingBg.ref, pendingBg.base64)
      : Promise.resolve();

    /* Espera a que el fondo de imagen este decodificado antes de pintar el
     * preview: sin esto, guardar deprisa dejaba el fondo en blanco. */
    chain = chain.then(function () {
      if (!bgPromise) return null;
      return bgPromise.catch(function (e) {
        console.warn('[dibujo] la carga de fondo fallo antes de guardar:', e && e.message);
        return null;
      });
    });

    chain.then(function () {
      /* El usuario pudo cancelar mientras cargaba el fondo. */
      if (!current || !canvas) return { skipped: true };
      var bgImage = canvas ? canvas.bgImage : null;
      var bgType = drawing.background ? drawing.background.type : null;
      var bgListo = bgType !== 'image' || !!(bgImage && bgImage.width && bgImage.height);
      console.log('[dibujo] guardar preview', JSON.stringify({
        type: bgType, ref: drawing.background ? drawing.background.ref : null,
        tieneBgImage: !!bgImage, w: bgImage ? bgImage.width : null,
        h: bgImage ? bgImage.height : null, previewAnterior: previewRef
      }));

      /* Nunca degradamos una vista previa que ya llevaba la imagen: si el
       * fondo no esta disponible, conservamos el preview existente. */
      if (!bgListo && previewRef) {
        console.warn('[dibujo] fondo no disponible; se conserva la vista previa anterior:', previewRef);
        return { reused: previewRef };
      }
      if (!bgListo) {
        console.warn('[dibujo] fondo no disponible y no hay vista previa previa; se genera igual');
      }
      return makePreview(drawing, bgImage, wantExt).then(function (enc) {
        return { enc: enc };
      });
    }).then(function (res) {
      if (res.skipped) return null;
      if (res.reused) return res.reused;
      var enc = res.enc;
      if (!enc || !enc.base64) throw new Error('preview vacia');
      var ref = previewRef;
      if (!ref) {
        var id = current.drawingId || global.DrawingEngine.uid('d');
        current.drawingId = id;
        ref = 'imagenes/dibujo-' + id + '.' + enc.ext;
      }
      return global.ImageManager.save(ref, enc.base64).then(function () { return ref; });
    }).then(function (ref) {
      if (!ref || !canvas || !current) return;
      canvas.markSaved();
      var out = {
        drawing: drawing,
        previewRef: ref,
        drawingId: current.drawingId || null
      };
      var cb = current.onSave;
      closeEditor();
      status('');
      if (cb) cb(out);
    }).catch(function (err) {
      console.error('Error guardando dibujo:', err);
      saving = false;
      els.saveBtn.disabled = false;
      status('');
      alert(t('drawingSaveError'));
    });
  }

  function doCancel() {
    if (!current) return;
    if (canvas && canvas.isDirty()) {
      if (!confirm(t('drawingDiscardConfirm'))) return;
    }
    var cb = current.onCancel;
    closeEditor();
    if (cb) cb();
  }

  function closeEditor() {
    if (canvas) { canvas.destroy(); canvas = null; }
    closePalette();
    closePicker();
    if (els.overlay) els.overlay.classList.add('hidden');
    if (typeof prevOverflow === 'string') { document.body.style.overflow = prevOverflow; }
    prevOverflow = null;
    current = null;
    pending = null;
    saving = false;
  }

  /* ---------------- API ---------------- */

  global.DrawingEditor = {
    start: openCreate,
    open: open,
    hideCreate: hideCreate,
    isOpen: isOpen,
    applyLang: function () { if (els.wrap) labelize(); }
  };
})(typeof window !== 'undefined' ? window : this);
