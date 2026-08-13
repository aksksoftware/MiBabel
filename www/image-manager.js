/* ImageManager: almacenamiento de imágenes basado en archivos */
/* Usa Capacitor Filesystem cuando está disponible, fallback en memoria para desarrollo */
/* Extendido para soportar audio y video (MediaManager) */

var ImageManager = (function() {
  var _store = {};
  var _useCapacitor = typeof Capacitor !== 'undefined' && Capacitor.Plugins && Capacitor.Plugins.Filesystem;
  var _initialized = false;
  var IMG_DIR = 'imagenes';
  var AUDIO_DIR = 'audios';
  var VIDEO_DIR = 'videos';

  function _capacitor() {
    return _useCapacitor ? Capacitor.Plugins.Filesystem : null;
  }

  /* Inicializa todos los directorios multimedia */
  function _initDir(dir) {
    return _capacitor().mkdir({
      path: dir,
      directory: 'DATA',
      recursive: true
    }).then(function() {
      return true;
    }).catch(function(err) {
      if (err.message && err.message.indexOf('EXIST') !== -1) return true;
      console.warn('MediaManager.initDir error:', dir, err);
      return true;
    });
  }

  return {
    init: function() {
      if (!_useCapacitor) { _initialized = true; return Promise.resolve(); }
      return Promise.all([
        _initDir(IMG_DIR),
        _initDir(AUDIO_DIR),
        _initDir(VIDEO_DIR)
      ]).then(function() {
        _initialized = true;
      }).catch(function(err) {
        console.warn('MediaManager.init error:', err);
        _initialized = true;
      });
    },

    /* Guarda un archivo multimedia. ref: 'imagenes/uuid.ext' | 'audios/uuid.ext' | 'videos/uuid.ext', data: base64 */
    save: function(ref, base64Data) {
      if (!ref || !base64Data) return Promise.reject('Invalid args');
      if (_useCapacitor && _initialized) {
        return _capacitor().writeFile({
          path: ref,
          data: base64Data,
          directory: 'DATA',
          encoding: 'base64'
        });
      }
      _store[ref] = base64Data;
      return Promise.resolve();
    },

    /* Lee un archivo y devuelve string base64 */
    read: function(ref) {
      if (!ref) return Promise.reject('No ref');
      if (_useCapacitor && _initialized) {
        return _capacitor().readFile({
          path: ref,
          directory: 'DATA',
          encoding: 'base64'
        }).then(function(result) {
          return result.data;
        }).catch(function(err) {
          console.warn('MediaManager.read error:', ref, err.message);
          return null;
        });
      }
      return Promise.resolve(_store[ref] || null);
    },

    /* Lee un archivo como ArrayBuffer */
    readArrayBuffer: function(ref) {
      return this.read(ref).then(function(base64) {
        if (!base64) return null;
        var binary = atob(base64);
        var buf = new ArrayBuffer(binary.length);
        var view = new Uint8Array(buf);
        for (var i = 0; i < binary.length; i++) view[i] = binary.charCodeAt(i);
        return buf;
      });
    },

    /* Elimina un archivo multimedia */
    delete: function(ref) {
      if (_useCapacitor && _initialized) {
        return _capacitor().deleteFile({
          path: ref,
          directory: 'DATA'
        }).catch(function(err) {
          console.warn('MediaManager.delete error:', ref, err.message);
        });
      }
      delete _store[ref];
      return Promise.resolve();
    },

    /* Verifica si un archivo existe */
    exists: function(ref) {
      if (_useCapacitor && _initialized) {
        return _capacitor().stat({
          path: ref,
          directory: 'DATA'
        }).then(function() { return true; }).catch(function() { return false; });
      }
      return Promise.resolve(!!_store[ref]);
    },

    /* Lista todos los archivos en un directorio */
    _listDir: function(dir) {
      if (_useCapacitor && _initialized) {
        return _capacitor().readdir({
          path: dir,
          directory: 'DATA'
        }).then(function(result) {
          var files = result.files || [];
          return files.map(function(f) { return dir + '/' + f.name; });
        }).catch(function() { return []; });
      }
      return Promise.resolve(Object.keys(_store).filter(function(k) {
        return k.indexOf(dir + '/') === 0;
      }));
    },

    /* Lista imágenes */
    listImages: function() { return this._listDir(IMG_DIR); },
    /* Lista audios */
    listAudios: function() { return this._listDir(AUDIO_DIR); },
    /* Lista videos */
    listVideos: function() { return this._listDir(VIDEO_DIR); },
    /* Lista todo */
    list: function() { return this._listDir(IMG_DIR); },

    /* Recolecta referencias multimedia usadas por notas y tableros */
    collectUsedRefs: function() {
      var refs = {};
      /* Notas */
      (state.notes || []).forEach(function(note) {
        if (note.cover && note.cover.indexOf('ref:') === 0) {
          refs[note.cover.substring(4)] = true;
        }
        (note.items || []).forEach(function(item) {
          var itemRef = item.src || item.ref;
          if (itemRef && (item.type === 'image' || item.type === 'audio' || item.type === 'video')) {
            refs[itemRef] = true;
          }
        });
      });
      /* Tarjetas de estudio: imágenes data-ref embebidas en front/back */
      (state.studySets || []).forEach(function(set) {
        (set.cards || []).forEach(function(card) {
          var content = (card.front || '') + ' ' + (card.back || '');
          var refMatch = content.match(/data-ref="([^"]+)"/g);
          if (refMatch) {
            refMatch.forEach(function(m) {
              var ref = m.match(/"([^"]+)"/);
              if (ref && ref[1]) refs[ref[1]] = true;
            });
          }
        });
      });
      /* Tableros: postits (imágenes embebidas en contenido) */
      (state.boards || []).forEach(function(board) {
        /* Escanea postits existentes en busca de imágenes embebidas */
        (board.postits || []).forEach(function(p) {
          if (p.text) {
            var imgMatch = p.text.match(/<img[^>]+src="([^"]+)"/g);
            if (imgMatch) {
              imgMatch.forEach(function(m) {
                var src = m.match(/src="([^"]+)"/);
                if (src && src[1]) refs[src[1]] = true;
              });
            }
          }
        });
        /* Escanea elementos multimedia */
        (board.elements || []).forEach(function(el) {
          if (el.ref) refs[el.ref] = true;
        });
      });
      /* Papelera */
      (state.trash || []).forEach(function(t) {
        if (t.type === 'note' && t.data && t.data.items) {
          t.data.items.forEach(function(item) {
            var itemRef = item.src || item.ref;
            if (itemRef && (item.type === 'image' || item.type === 'audio' || item.type === 'video')) {
              refs[itemRef] = true;
            }
          });
        }
        if (t.type === 'board' && t.data && t.data.elements) {
          t.data.elements.forEach(function(el) {
            if (el.ref) refs[el.ref] = true;
          });
        }
      });
      return Object.keys(refs);
    },

    /* Elimina archivos huérfanos (no referenciados) */
    cleanupOrphans: function() {
      var used = this.collectUsedRefs();
      var self = this;
      return Promise.all([
        this._listDir(IMG_DIR),
        this._listDir(AUDIO_DIR),
        this._listDir(VIDEO_DIR)
      ]).then(function(results) {
        var files = results[0].concat(results[1]).concat(results[2]);
        var promises = [];
        files.forEach(function(ref) {
          if (used.indexOf(ref) === -1) {
            if (typeof _mediaBlobUrls !== 'undefined' && _mediaBlobUrls[ref]) {
              URL.revokeObjectURL(_mediaBlobUrls[ref]);
              delete _mediaBlobUrls[ref];
            }
            promises.push(self.delete(ref));
          }
        });
        return Promise.all(promises);
      });
    }
  };
})();

/* ImageConverter: utilidades de conversión de formatos de imagen */
var ImageConverter = (function() {

  function _loadImage(src) {
    return new Promise(function(resolve, reject) {
      var img = new Image();
      img.onload = function() { resolve(img); };
      img.onerror = function() { reject(new Error('Failed to load image')); };
      img.src = src;
    });
  }

  function _canvasToBase64(canvas, mime, quality) {
    return new Promise(function(resolve, reject) {
      canvas.toBlob(function(blob) {
        if (!blob) { reject(new Error('Canvas toBlob failed')); return; }
        var reader = new FileReader();
        reader.onload = function(e) {
          resolve(e.target.result.split(',')[1]);
        };
        reader.onerror = reject;
        reader.readAsDataURL(blob);
      }, mime, quality);
    });
  }

  return {
    /* Convierte un File a WebP, devuelve { base64, width, height } */
    toWebP: function(file, quality) {
      var dataUrl = URL.createObjectURL(file);
      return _loadImage(dataUrl).then(function(img) {
        var canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        var ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0);
        URL.revokeObjectURL(dataUrl);
        return _canvasToBase64(canvas, 'image/webp', quality || 0.85).then(function(base64) {
          return { base64: base64, width: img.width, height: img.height };
        });
      }).catch(function() {
        URL.revokeObjectURL(dataUrl);
        var reader = new FileReader();
        return new Promise(function(resolve, reject) {
          reader.onload = function(e) {
            var full = e.target.result;
            var b64 = full.split(',')[1];
            _loadImage(full).then(function(img) {
              resolve({ base64: b64, width: img.width, height: img.height });
            }).catch(function() {
              resolve({ base64: b64, width: 0, height: 0 });
            });
          };
          reader.onerror = reject;
          reader.readAsDataURL(file);
        });
      });
    },

    /* Convierte WebP (base64) a PNG (base64) */
    webpToPng: function(webpBase64, width, height) {
      return _loadImage('data:image/webp;base64,' + webpBase64).then(function(img) {
        var canvas = document.createElement('canvas');
        canvas.width = width || img.width;
        canvas.height = height || img.height;
        var ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        return _canvasToBase64(canvas, 'image/png');
      });
    },

    /* Convierte base64 a Uint8Array */
    base64ToBytes: function(base64) {
      var binary = atob(base64);
      var bytes = new Uint8Array(binary.length);
      for (var i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
      return bytes;
    },

    /* Obtiene el MIME type según la extensión del archivo */
    getMimeFromRef: function(ref) {
      var ext = ref.split('.').pop().toLowerCase();
      var map = {
        webp: 'image/webp', png: 'image/png', jpg: 'image/jpeg',
        jpeg: 'image/jpeg', gif: 'image/gif',
        mp3: 'audio/mpeg', m4a: 'audio/mp4', aac: 'audio/aac',
        mp4: 'video/mp4', webm: 'video/webm', ogg: 'video/ogg'
      };
      return map[ext] || 'application/octet-stream';
    }
  };
})();

/* Genera un identificador único para archivos de imagen */
function generateImageId() {
  var ts = Date.now().toString(36);
  var rand = Math.random().toString(36).substring(2, 11);
  return ts + '-' + rand;
}

/* AudioConverter: lectura de archivos de audio */
var AudioConverter = (function() {
  return {
    /* Lee un File de audio y devuelve base64 */
    toBase64: function(file) {
      return new Promise(function(resolve, reject) {
        var reader = new FileReader();
        reader.onload = function(e) {
          var b64 = e.target.result.split(',')[1];
          resolve(b64);
        };
        reader.onerror = function() { reject(new Error('Error reading audio file')); };
        reader.readAsDataURL(file);
      });
    },

    /* Obtiene duración de un archivo de audio */
    getDuration: function(file) {
      return new Promise(function(resolve, reject) {
        var url = URL.createObjectURL(file);
        var audio = new Audio();
        audio.onloadedmetadata = function() {
          resolve(audio.duration);
          URL.revokeObjectURL(url);
        };
        audio.onerror = function() {
          URL.revokeObjectURL(url);
          reject(new Error('Failed to load audio metadata'));
        };
        audio.src = url;
      });
    }
  };
})();

/* VideoConverter: lectura de archivos de video */
var VideoConverter = (function() {
  return {
    /* Lee un File de video y devuelve { base64, width, height } */
    toBase64: function(file) {
      return new Promise(function(resolve, reject) {
        var reader = new FileReader();
        reader.onload = function(e) {
          var b64 = e.target.result.split(',')[1];
          resolve(b64);
        };
        reader.onerror = function() { reject(new Error('Error reading video file')); };
        reader.readAsDataURL(file);
      });
    },

    /* Obtiene dimensiones del video */
    getDimensions: function(file) {
      return new Promise(function(resolve, reject) {
        var url = URL.createObjectURL(file);
        var video = document.createElement('video');
        video.preload = 'metadata';
        video.onloadedmetadata = function() {
          resolve({ width: video.videoWidth, height: video.videoHeight });
          URL.revokeObjectURL(url);
        };
        video.onerror = function() {
          URL.revokeObjectURL(url);
          reject(new Error('Failed to load video metadata'));
        };
        video.src = url;
      });
    }
  };
})();

