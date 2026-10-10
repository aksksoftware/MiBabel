/* Harness de pruebas para la exportacion de notas de MiBabel.
 *
 * Levanta un DOM (jsdom), carga los modulos de www/export y verifica cada
 * formato de salida. No modifica ningun archivo de la aplicacion.
 *
 * Uso: node tests/run.js [filtro]
 */
'use strict';

var fs = require('fs');
var path = require('path');
var { JSDOM } = require('jsdom');

var ROOT = path.resolve(__dirname, '..');
var WWW = path.join(ROOT, 'www');

var stats = { passed: 0, failed: 0 };
var failures = [];
var currentSuite = '';

function ok(name, cond, detail) {
  if (cond) { stats.passed++; return true; }
  stats.failed++;
  failures.push({ suite: currentSuite, name: name, detail: detail || '' });
  return false;
}

function eq(name, actual, expected) {
  var a = safe(actual), b = safe(expected);
  return ok(name, a === b, 'esperado ' + b + '\n      obtenido  ' + a);
}

function safe(v) {
  if (typeof v === 'string') return v;
  try { return JSON.stringify(v); } catch (e) { return String(v); }
}

function contains(name, haystack, needle) {
  return ok(name, String(haystack).indexOf(String(needle)) !== -1,
    'no se encontro ' + safe(needle) + ' en ' + preview(haystack));
}

function notContains(name, haystack, needle) {
  return ok(name, String(haystack).indexOf(String(needle)) === -1,
    'si se encontro ' + safe(needle) + ' en ' + preview(haystack));
}

function preview(v) {
  var s = String(v);
  return s.length > 400 ? s.slice(0, 400) + '...' : s;
}

async function suite(name, fn) {
  currentSuite = name;
  try {
    await fn();
  } catch (e) {
    stats.failed++;
    failures.push({ suite: name, name: 'excepcion no controlada', detail: e && e.stack ? e.stack : String(e) });
  }
}

function makeEnv() {
  var dom = new JSDOM('<!doctype html><html><body></body></html>', {
    url: 'https://localhost/',
    pretendToBeVisual: true
  });
  var win = dom.window;
  global.window = win;
  global.document = win.document;
  global.DOMParser = win.DOMParser;
  global.Blob = win.Blob;
  global.FileReader = win.FileReader;
  /* Node >= 21 expone global.navigator de solo lectura; no se pisa. */
  global.Image = win.Image;
  global.URL = win.URL;
  return win;
}

/* Cargador de scripts de www/export/*.js dentro de la ventana de jsdom. */
function loadModules(win, names) {
  names.forEach(function (name) {
    var file = path.join(WWW, 'export', name + '.js');
    win.eval(fs.readFileSync(file, 'utf8'));
  });
}

/* Carga una libreria de www/lib en el ambito de Node y la expone en la ventana. */
function loadLib(win, relPath, globalName) {
  var lib = require(path.join(WWW, 'lib', relPath));
  global[globalName] = lib;
  win[globalName] = lib;
  return lib;
}

/* -------------------------------------------------------------- *
 * Stubs de multimedia
 * -------------------------------------------------------------- */

/* Genera un PNG real de las medidas pedidas usando pdf-lib, para que los
 * exportadores exerciseden el camino de incrustacion de imagenes sin
 * depender de Image/canvas de jsdom. */
async function makePng(pdfLib, w, h, rgb) {
  /* PNG minimo valido via un PDF->no; usamos una imagen 1x1 escalada:
   * para las pruebas solo importa que los bytes sean PNG valido. */
  return PNG_1x1;
}

/* PNG 1x1 transparente, valido para embedPng/embedJpg. */
var PNG_1x1 = Buffer.from(
  'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk' +
  'YPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==', 'base64');

/* Imagenes WebP minimas (1x1) para pasar por ImageConverter.webpToPng. */
var WEBP_1x1 = Buffer.from(
  'UklGRhoAAABXRUJQVlA4TA0AAAAvAAAAEAcQERGIiP4HAA==', 'base64').toString('base64');

function installStubs(ctx) {
  var win = ctx.win;
  var imgCounter = 0;

  /* ImageManager: devuelve base64 para cualquier ref conocida. */
  ctx.ImageManager = {
    isNative: function () { return false; },
    read: function (ref) {
      if (!ref) return Promise.resolve(null);
      if (ref.indexOf('roto/') === 0) return Promise.resolve(null); /* Ausente */
      return Promise.resolve(WEBP_1x1);
    },
    readArrayBuffer: function (ref) { return Promise.resolve(null); }
  };

  /* ImageConverter: el codigo real convierte WebP->PNG con canvas. En pruebas
   * se devuelve el PNG valido directamente, pero se conservan las firmas. */
  ctx.ImageConverter = {
    webpToPng: function (base64, w, h) {
      return Promise.resolve(PNG_1x1.toString('base64'));
    },
    base64ToBytes: function (base64) {
      return new Uint8Array(Buffer.from(base64, 'base64'));
    },
    getMimeFromRef: function (ref) {
      return 'image/webp';
    }
  };

  /* renderTextToCanvas: replica el contrato real
   * (Promise<{base64,width,height}>) midiendo el texto. */
  ctx.renderTextToCanvas = function (html, maxWidth) {
    var plain = String(html || '').replace(/<[^>]*>/g, ' ');
    plain = plain.replace(/&[a-z]+;/gi, ' ');
    var width = Math.min(maxWidth || 600, Math.max(40, plain.length * 7 + 24));
    var height = Math.max(28, 24 + Math.ceil(plain.length / Math.max(1, Math.floor(width / 7))) * 21);
    return Promise.resolve({
      base64: PNG_1x1.toString('base64'),
      width: width,
      height: height
    });
  };
}

module.exports = { makeEnv: makeEnv, loadModules: loadModules, loadLib: loadLib };

/* -------------------------------------------------------------- *
 * Arranque
 * -------------------------------------------------------------- */
async function main() {
  var filter = (process.argv[2] || '').toLowerCase();
  var win = makeEnv();

  var ctx = { win: win };
  installStubs(ctx);

  loadLib(win, 'fontkit.umd.min.js', 'fontkit');
  loadLib(win, 'pdf-lib.min.js', 'PDFLib');
  loadLib(win, 'docx.umd.js', 'docx');
  loadLib(win, 'jszip.min.js', 'JSZip');

  loadModules(win, ['note-doc', 'pdf-exporter', 'docx-exporter', 'txt-exporter']);

  ctx.NoteDoc = win.NoteDoc;
  ctx.PdfExporter = win.PdfExporter;
  ctx.DocxExporter = win.DocxExporter;
  ctx.TxtExporter = win.TxtExporter;
  ctx.PDFLib = win.PDFLib;
  ctx.docx = win.docx;
  ctx.JSZip = win.JSZip;

  if (!ctx.NoteDoc) {
    console.error('No se cargo www/export/note-doc.js');
    process.exit(2);
  }

  var cases = require('./cases');
  for (var i = 0; i < cases.length; i++) {
    var c = cases[i];
    if (filter && c.name.toLowerCase().indexOf(filter) === -1) continue;
    await suite(c.name, function () {
      return c.run(ctx, require('./fixtures'), { ok: ok, eq: eq, contains: contains, notContains: notContains, suite: suite });
    });
  }

  var out = '';
  if (failures.length) {
    out += '\nFALLOS (' + failures.length + ')\n';
    failures.forEach(function (f) {
      out += '  [' + f.suite + '] ' + f.name + (f.detail ? '\n      ' + f.detail : '') + '\n';
    });
  }
  out += '\n' + stats.passed + ' correctas, ' + stats.failed + ' fallidas\n';
  process.stdout.write(out);
  process.exitCode = stats.failed ? 1 : 0;
}

main().catch(function (e) {
  console.error('Error fatal en el runner:', e);
  process.exit(2);
});
