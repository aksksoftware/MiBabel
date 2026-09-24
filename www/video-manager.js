/* VideoManager: sistema híbrido para videos en Tableros (y notas).
 *
 * Objetivo: evitar cierres de la app, picos de memoria y cargas innecesarias
 * al trabajar con videos grandes.
 *
 * Dos modos:
 *   - "inline" (video pequeño, size <= MAX_INLINE_VIDEO_SIZE_BYTES):
 *       usa el mecanismo existente (base64 -> ImageManager.save -> ref).
 *   - "file" (video pesado, size > MAX_INLINE_VIDEO_SIZE_BYTES):
 *       el archivo se copia a almacenamiento persistente POR CHUNKS
 *       (nunca se carga completo en JS, nunca se convierte a Base64 gigante,
 *       nunca va dentro del JSON del Tablero) y el Tablero guarda SOLO una
 *       referencia + metadatos. La reproducción usa una URL reproducible
 *       (Capacitor.convertFileSrc sobre getUri) sin leer el archivo en JS,
 *       con carga bajo demanda (click en Reproducir) y preload="none".
 *
 * Flujo:
 *   video pequeño -> almacenamiento/representación directa (existente)
 *   video pesado  -> archivo persistente + referencia (nuevo)
 *   usuario pulsa reproducir -> carga bajo demanda (nuevo)
 *   usuario elimina -> referencia + limpieza segura con refcount (nuevo)
 */

var VideoManager = (function() {

  /* ============================================================
   * 3. Límite de tamaño configurable (ÚNICO lugar donde se define).
   * Cambiar este valor a 20/50/100 MB es trivial y no requiere
   * tocar ningún otro archivo. Solo determina el modo de
   * almacenamiento, NO garantiza reproducibilidad en el WebView.
   * ============================================================ */
  var MAX_INLINE_VIDEO_SIZE_BYTES = 50 * 1024 * 1024; /* 50 MB */

  /* Tamaño de chunk para copiar archivos grandes sin picos de memoria.
   * Pico máximo en JS ~= CHUNK_SIZE * 1.4 (overhead base64 por chunk). */
  var CHUNK_SIZE_BYTES = 2 * 1024 * 1024; /* 2 MB */

  var VIDEO_DIR = 'videos';
  var DEBUG = true; /* logs de desarrollo con prefijo [MiBabel][Video] */

  /* Cache de URLs reproducibles por ref (no contiene datos binarios,
   * solo strings de URL; seguro mantener en memoria). */
  var _playableUrlCache = {};
  var _playableUrlKind = {}; /* ref -> 'native' | 'blob' */

  function log() {
    if (!DEBUG) return;
    var args = ['[MiBabel][Video]'].concat(Array.prototype.slice.call(arguments));
    console.log.apply(console, args);
  }

  function logErr() {
    var args = ['[MiBabel][Video][ERROR]'].concat(Array.prototype.slice.call(arguments));
    console.warn.apply(console, args);
  }

  /* ¿Hay entorno nativo Capacitor con Filesystem + convertFileSrc? */
  function isNative() {
    return (typeof Capacitor !== 'undefined' &&
      Capacitor.Plugins && Capacitor.Plugins.Filesystem &&
      typeof Capacitor.convertFileSrc === 'function');
  }

  /* ¿ImageManager está listo para operar en modo nativo? */
  function isNativeReady() {
    if (!isNative()) return false;
    if (typeof ImageManager !== 'undefined' && ImageManager.isNative) {
      return ImageManager.isNative();
    }
    return true;
  }

  function getMode(sizeBytes) {
    return (sizeBytes <= MAX_INLINE_VIDEO_SIZE_BYTES) ? 'inline' : 'file';
  }

  function formatSize(bytes) {
    if (bytes === undefined || bytes === null || isNaN(bytes)) return '';
    if (bytes < 1024) return bytes + ' B';
    var kb = bytes / 1024;
    if (kb < 1024) return (kb < 10 ? kb.toFixed(1) : Math.round(kb)) + ' KB';
    var mb = kb / 1024;
    if (mb < 1024) return (mb < 10 ? mb.toFixed(1) : Math.round(mb)) + ' MB';
    var gb = mb / 1024;
    return (gb < 10 ? gb.toFixed(2) : Math.round(gb * 10) / 10) + ' GB';
  }

  function sanitizeExt(name, fallback) {
    var ext = '';
    if (name && name.indexOf('.') >= 0) {
      ext = name.split('.').pop().toLowerCase().replace(/[^a-z0-9]/g, '');
    }
    if (!ext) ext = fallback || 'mp4';
    return ext;
  }

  function sanitizeBase(name) {
    if (!name) return 'video';
    var base = name.replace(/\.[^.]*$/, '').replace(/[^\w\-áéíóúñü. ]/gi, '_').trim();
    return base || 'video';
  }

  function readChunkAsBase64(blob) {
    return new Promise(function(resolve, reject) {
      var reader = new FileReader();
      reader.onload = function(e) {
        try {
          var res = e.target.result || '';
          var idx = res.indexOf(',');
          resolve(idx >= 0 ? res.substring(idx + 1) : res);
        } catch (err) { reject(err); }
      };
      reader.onerror = function() { reject(new Error('Error leyendo chunk')); };
      reader.readAsDataURL(blob);
    });
  }

  /* Copia un File grande al almacenamiento persistente POR CHUNKS.
   * - Nunca mantiene el archivo completo en memoria JS.
   * - Nunca crea un Base64 gigante ni un JSON gigante.
   * - Cada chunk RAW mide un múltiplo de 3 bytes: su Base64 no lleva
   *   padding intermedio, así la concatenación en disco/IndexedDB sigue
   *   siendo un Base64 válido y continuo en todas las plataformas.
   * - Cede el turno entre chunks (setTimeout 0) para no congelar la UI.
   * - onProgress(escritos, total) para mostrar progreso.
   * Devuelve Promise que resuelve al terminar la copia. */
  function saveLargeFile(ref, file, onProgress) {
    var total = file.size || 0;
    log('Archivo detectado: ' + formatSize(total) + ' (' + (file.name || '?') + ')');
    log('Modo seleccionado: archivo (límite ' + formatSize(MAX_INLINE_VIDEO_SIZE_BYTES) + ')');
    if (!total) {
      /* Archivo vacío: crea entrada para que stat() funcione. */
      return ImageManager.writeChunk(ref, '', true).then(function() {
        if (onProgress) onProgress(0, 0);
      });
    }
    /* Múltiplo de 3 para evitar padding Base64 intermedio (ver arriba). */
    var rawChunk = CHUNK_SIZE_BYTES - (CHUNK_SIZE_BYTES % 3);
    var offset = 0;
    var first = true;
    return new Promise(function(resolve, reject) {
      function next() {
        if (offset >= total) { resolve(); return; }
        var end = Math.min(offset + rawChunk, total);
        var blob;
        try {
          blob = file.slice(offset, end);
        } catch (e) { reject(e); return; }
        readChunkAsBase64(blob).then(function(b64) {
          return ImageManager.writeChunk(ref, b64, first);
        }).then(function() {
          first = false;
          offset = end;
          if (onProgress) {
            try { onProgress(offset, total); } catch (e) {}
          }
          /* Cede el turno: la UI sigue respondiendo durante la copia. */
          setTimeout(next, 0);
        }).catch(function(err) {
          logErr('Error copiando chunk en offset ' + offset + ':', err);
          reject(err);
        });
      }
      next();
    });
  }

  /* Verifica existencia SIN leer contenido (stat, no readFile). */
  function fileExists(ref) {
    if (typeof ImageManager === 'undefined' || !ImageManager.exists) {
      return Promise.resolve(false);
    }
    return ImageManager.exists(ref);
  }

  function getFileSize(ref) {
    if (typeof ImageManager === 'undefined' || !ImageManager.stat) {
      return Promise.resolve(null);
    }
    return ImageManager.stat(ref).then(function(info) {
      return (info && typeof info.size === 'number') ? info.size : null;
    }).catch(function() { return null; });
  }

  /* Obtiene una URL reproducible para <video> SIN leer el archivo en JS.
   * Nativo: Filesystem.getUri + Capacitor.convertFileSrc (streaming directo,
   * cero memoria JS). Fallback web (solo desarrollo): Blob + ObjectURL. */
  function getPlayableSrc(ref, mimeType) {
    if (_playableUrlCache[ref]) {
      return Promise.resolve(_playableUrlCache[ref]);
    }
    if (isNativeReady()) {
      return ImageManager.stat(ref).then(function(info) {
        if (!info) {
          var err = new Error('Archivo no encontrado: ' + ref);
          err.code = 'NOT_FOUND';
          throw err;
        }
        return ImageManager.getUri(ref);
      }).then(function(uri) {
        if (!uri) throw new Error('URI inválida para: ' + ref);
        var src = Capacitor.convertFileSrc(uri);
        log('Fuente reproducible (nativa) para ' + ref);
        _playableUrlCache[ref] = src;
        _playableUrlKind[ref] = 'native';
        return src;
      }).catch(function(err) {
        if (err && err.code === 'NOT_FOUND') throw err;
        logErr('URI inválida o stat fallido para ' + ref + ':', err);
        throw err;
      });
    }
    /* Fallback web: única vía disponible sin plugin nativo. */
    return ImageManager.read(ref).then(function(base64) {
      if (!base64) {
        var err2 = new Error('Archivo no encontrado: ' + ref);
        err2.code = 'NOT_FOUND';
        throw err2;
      }
      var blob = base64ToBlob(base64, mimeType);
      var url = URL.createObjectURL(blob);
      _playableUrlCache[ref] = url;
      _playableUrlKind[ref] = 'blob';
      return url;
    });
  }

  function base64ToBlob(base64, mime) {
    var binary = atob(base64);
    var len = binary.length;
    var bytes = new Uint8Array(len);
    for (var i = 0; i < len; i++) bytes[i] = binary.charCodeAt(i);
    return new Blob([bytes], { type: mime || 'video/mp4' });
  }

  /* Libera recursos de reproducción de un <video> (pausa + quita src).
   * NO borra el archivo físico. Para URLs blob del fallback se conserva
   * el cache (igual que _mediaBlobUrls); solo se revoca al eliminar. */
  function releaseVideoElement(videoEl) {
    if (!videoEl) return;
    try {
      videoEl.pause();
    } catch (e) {}
    try {
      videoEl.removeAttribute('src');
      videoEl.load();
    } catch (e) {}
  }

  function releaseAllIn(container) {
    if (!container || !container.querySelectorAll) return;
    var vids = container.querySelectorAll('video');
    Array.prototype.forEach.call(vids, function(v) { releaseVideoElement(v); });
  }

  function forgetCachedUrl(ref) {
    var url = _playableUrlCache[ref];
    if (url && _playableUrlKind[ref] === 'blob') {
      try { URL.revokeObjectURL(url); } catch (e) {}
    }
    delete _playableUrlCache[ref];
    delete _playableUrlKind[ref];
  }

  /* Cuenta cuántas referencias (tableros, notas, papelera) apuntan a ref.
   * Incluye elementos/nodes tanto inline como file (ambos usan el.ref). */
  function countRefs(ref) {
    if (!ref || typeof state === 'undefined' || !state) return 0;
    var n = 0;
    function checkElRef(r) { if (r === ref) n++; }
    (state.boards || []).forEach(function(b) {
      (b.elements || []).forEach(function(el) { checkElRef(el.ref); });
    });
    (state.notes || []).forEach(function(note) {
      (note.items || []).forEach(function(it) {
        checkElRef(it.src || it.ref);
      });
    });
    (state.trash || []).forEach(function(t) {
      if (!t || !t.data) return;
      if (t.type === 'board' && t.data.elements) {
        t.data.elements.forEach(function(el) { checkElRef(el.ref); });
      }
      if (t.type === 'note' && t.data.items) {
        t.data.items.forEach(function(it) { checkElRef(it.src || it.ref); });
      }
    });
    return n;
  }

  /* Elimina el archivo físico SOLO si nadie más lo referencia.
   * Devuelve Promise<boolean> (true si se eliminó). */
  function deletePhysicalIfOrphan(ref) {
    if (!ref) return Promise.resolve(false);
    if (countRefs(ref) > 0) {
      log('Conservando archivo compartido: ' + ref);
      return Promise.resolve(false);
    }
    forgetCachedUrl(ref);
    if (typeof _mediaBlobUrls !== 'undefined' && _mediaBlobUrls[ref]) {
      try { URL.revokeObjectURL(_mediaBlobUrls[ref]); } catch (e) {}
      delete _mediaBlobUrls[ref];
    }
    log('Eliminando archivo huérfano: ' + ref);
    return ImageManager.delete(ref).then(function() { return true; }).catch(function(err) {
      logErr('Error eliminando ' + ref + ':', err);
      return false;
    });
  }

  function isHeavyElement(el) {
    return !!(el && el.type === 'video' && el.mode === 'file' && el.ref);
  }

  function isHeavyItem(item) {
    return !!(item && item.type === 'video' && item.mode === 'file' && (item.src || item.ref));
  }

  function heavyRefOf(elOrItem) {
    if (!elOrItem) return null;
    return elOrItem.ref || elOrItem.src || null;
  }

  /* Metadatos de videos pesados dentro de un tablero (para export). */
  function collectHeavyFromBoard(board) {
    var out = [];
    (board.elements || []).forEach(function(el) {
      if (isHeavyElement(el)) {
        out.push({
          ref: el.ref,
          mediaId: el.mediaId || null,
          name: el.name || 'video',
          size: el.size || 0,
          mimeType: el.mimeType || 'video/mp4'
        });
      }
    });
    return out;
  }

  function collectHeavyFromNote(note) {
    var out = [];
    (note.items || []).forEach(function(item) {
      if (isHeavyItem(item)) {
        out.push({
          ref: item.src || item.ref,
          mediaId: item.mediaId || null,
          name: item.name || 'video',
          size: item.size || 0,
          mimeType: item.mimeType || 'video/mp4'
        });
      }
    });
    return out;
  }

  /* Migración barata de un elemento legacy (sin mode):
   * el archivo YA está en almacenamiento persistente (solo hay un ref),
   * así que basta con stat() para conocer el tamaño SIN leer contenido.
   * Si supera el límite, se marca mode:'file' + metadatos y se guarda.
   * Nunca lee el contenido. Devuelve Promise<boolean> (true si migró). */
  function maybeMigrateElement(board, el) {
    if (!board || !el || el.type !== 'video' || !el.ref) return Promise.resolve(false);
    if (el.mode === 'file' || el.mode === 'inline') return Promise.resolve(false);
    if (el.src && String(el.src).indexOf('data:') === 0) {
      /* Formato antiguo con datos embebidos: migración individual y
       * segura solo cuando el usuario lo reproduzca (ver script.js). */
      return Promise.resolve(false);
    }
    return getFileSize(el.ref).then(function(size) {
      if (size === null) return false;
      if (size > MAX_INLINE_VIDEO_SIZE_BYTES) {
        el.mode = 'file';
        el.mediaId = el.mediaId || el.ref.replace(/^videos\//, '').replace(/\.[^.]*$/, '');
        el.name = el.name || el.ref.split('/').pop();
        el.size = size;
        el.mimeType = el.mimeType || guessMime(el.ref);
        el.createdAt = el.createdAt || Date.now();
        log('Migrado a modo archivo (stat, sin leer contenido): ' + el.ref +
          ' ' + formatSize(size));
        return true;
      }
      el.mode = 'inline';
      return true;
    }).catch(function() { return false; });
  }

  function guessMime(refOrName) {
    var ext = sanitizeExt(refOrName, '');
    var map = { mp4: 'video/mp4', webm: 'video/webm', ogg: 'video/ogg', ogv: 'video/ogg', mov: 'video/quicktime', m4v: 'video/x-m4v', '3gp': 'video/3gpp' };
    return map[ext] || 'video/mp4';
  }

  function buildElementMeta(file, ref, mediaId, extra) {
    return {
      mode: 'file',
      mediaId: mediaId,
      name: file.name || 'video',
      size: file.size || 0,
      mimeType: file.type || guessMime(file.name || ref),
      createdAt: Date.now(),
      origWidth: extra && extra.width ? extra.width : 0,
      origHeight: extra && extra.height ? extra.height : 0
    };
  }

  return {
    MAX_INLINE_VIDEO_SIZE_BYTES: MAX_INLINE_VIDEO_SIZE_BYTES,
    CHUNK_SIZE_BYTES: CHUNK_SIZE_BYTES,
    VIDEO_DIR: VIDEO_DIR,
    DEBUG: DEBUG,
    log: log,
    logErr: logErr,
    isNative: isNative,
    isNativeReady: isNativeReady,
    getMode: getMode,
    formatSize: formatSize,
    sanitizeExt: sanitizeExt,
    sanitizeBase: sanitizeBase,
    guessMime: guessMime,
    saveLargeFile: saveLargeFile,
    fileExists: fileExists,
    getFileSize: getFileSize,
    getPlayableSrc: getPlayableSrc,
    releaseVideoElement: releaseVideoElement,
    releaseAllIn: releaseAllIn,
    forgetCachedUrl: forgetCachedUrl,
    countRefs: countRefs,
    deletePhysicalIfOrphan: deletePhysicalIfOrphan,
    isHeavyElement: isHeavyElement,
    isHeavyItem: isHeavyItem,
    heavyRefOf: heavyRefOf,
    collectHeavyFromBoard: collectHeavyFromBoard,
    collectHeavyFromNote: collectHeavyFromNote,
    maybeMigrateElement: maybeMigrateElement,
    buildElementMeta: buildElementMeta
  };
})();

/* Alias global del límite para que sea trivial de localizar/cambiar. */
var MAX_INLINE_VIDEO_SIZE_BYTES = VideoManager.MAX_INLINE_VIDEO_SIZE_BYTES;
