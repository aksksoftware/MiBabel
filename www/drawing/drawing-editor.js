/* ==================================================
   DrawingEditor — menú de creación + editor modal de dibujos
   --------------------------------------------------
   - Menú de creación: elige el fondo (liso / renglones /
     cuadriculado / puntos / imagen del dispositivo) y abre
     el lienzo.
   - Editor modal: cabecera (Cancelar · título · Guardar),
     viewport con gestos y DrawingToolbar (compartida con el
     modo dibujo de los tableros).
   - Al guardar se genera una vista previa PNG/WebP del lienzo
     y se persiste junto con el modelo estructurado.
   ================================================== */
(function (global) {
  'use strict';

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

    document.body.appendChild(wrap);

    els.wrap = wrap;
    els.overlay = wrap.querySelector('#dwOverlay');
    els.createOverlay = wrap.querySelector('#dwCreateOverlay');
    els.viewport = wrap.querySelector('#dwViewport');
    els.title = wrap.querySelector('#dwTitle');
    els.cancelBtn = wrap.querySelector('#dwCancelBtn');
    els.saveBtn = wrap.querySelector('#dwSaveBtn');
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
    els.bgOpts = [].slice.call(wrap.querySelectorAll('.dw-bg-opt'));

    /* Barra de herramientas compartida con el modo dibujo de los tableros. */
    els.toolbar = global.DrawingToolbar.create({
      onTool: function (tool) { if (canvas) canvas.setTool(tool); },
      onColor: function (color) { if (canvas) canvas.setColor(color); },
      onSize: function (size) { if (canvas) canvas.setSize(size); },
      onUndo: function () { if (canvas) canvas.undo(); },
      onRedo: function () { if (canvas) canvas.redo(); },
      onClear: doClear
    });
    els.overlay.appendChild(els.toolbar.el);

    bindEvents();
  }


  function bindEvents() {
    els.cancelBtn.addEventListener('click', doCancel);
    els.saveBtn.addEventListener('click', doSave);
    els.createCancel.addEventListener('click', function () { hideCreate(); });

    els.bgOpts.forEach(function (b) {
      b.addEventListener('click', function () { onBgOption(b.getAttribute('data-bg')); });
    });

    els.fileInput.addEventListener('change', onBgFile);

    document.addEventListener('keydown', onKeydown, false);
  }

  function isOpen() {
    return !!(current && els.overlay && !els.overlay.classList.contains('hidden'));
  }

  function onKeydown(e) {
    if (e.key === 'Escape') {
      if (els.toolbar && els.toolbar.isPanelOpen()) { e.preventDefault(); els.toolbar.closePanels(); return; }
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
    if (els.toolbar) els.toolbar.applyLang();
    if (current) {
      els.title.textContent = t(current.mode === 'edit' ? 'drawingEditTitle' : 'drawingCreateTitle');
    }
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
    els.toolbar.closePanels();
    els.saveBtn.disabled = false;

    prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    els.toolbar.setColor(current.color || '#1a1a1a');
    els.toolbar.setSize(current.size || 4);
    els.toolbar.setActiveTool('pencil');

    canvas = new global.DrawingCanvas(els.viewport, current.drawing, {
      bgImage: current.bgImage || null,
      onChange: onCanvasChange
    });
    canvas.setTool('pencil');
    canvas.setColor(els.toolbar.getColor());
    canvas.setSize(els.toolbar.getSize());
    canvas.mount();
    onCanvasChange(canvas.state);

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
    if (!state || !els.toolbar) return;
    els.toolbar.setUndoEnabled(state.canUndo());
    els.toolbar.setRedoEnabled(state.canRedo());
    els.toolbar.setClearEnabled(!!(current && current.drawing && current.drawing.strokes.length));
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
    if (els.toolbar) els.toolbar.closePanels();
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
