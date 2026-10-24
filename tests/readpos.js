/* Pruebas del sistema de posición de lectura por nota (www/script.js).
 *
 * Extrae el bloque marcado READ-POSITION-START/END y la función save()
 * reales desde script.js, los ejecuta dentro de un DOM (jsdom) y verifica
 * el registro, el guardado con debounce y la restauración.
 *
 * Uso: node tests/readpos.js
 */
'use strict';

var fs = require('fs');
var path = require('path');
var { JSDOM } = require('jsdom');

var ROOT = path.resolve(__dirname, '..');
var SCRIPT = path.join(ROOT, 'www', 'script.js');
var SRC = fs.readFileSync(SCRIPT, 'utf8');

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

function extractMarkedBlock() {
  var start = SRC.indexOf('/* ==== READ-POSITION-START ==== */');
  var end = SRC.indexOf('/* ==== READ-POSITION-END ==== */');
  if (start < 0 || end < 0 || end <= start) {
    throw new Error('No se encontraron los marcadores READ-POSITION en www/script.js');
  }
  return SRC.slice(start, end);
}

/* Extrae una función por nombre contando llaves (cuerpo sin llaves anidadas
 * en cadenas dentro de save()). */
function extractFunction(name) {
  var needle = 'function ' + name + '(';
  var start = SRC.indexOf(needle);
  if (start < 0) throw new Error('No se encontró la función ' + name);
  var i = SRC.indexOf('{', start);
  var depth = 0;
  for (; i < SRC.length; i++) {
    if (SRC[i] === '{') depth++;
    else if (SRC[i] === '}') { depth--; if (depth === 0) return SRC.slice(start, i + 1); }
  }
  throw new Error('Cuerpo no cerrado de ' + name);
}

function sleep(ms) {
  return new Promise(function (r) { setTimeout(r, ms); });
}

function frames(n) {
  return new Promise(function (r) {
    var i = 0;
    function tick() {
      if (++i >= n) return r();
      requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  });
}

/* Crea un .items-area con layout simulado (jsdom no calcula alturas). */
function makeArea(doc, noteId, opts) {
  opts = opts || {};
  var area = doc.createElement('div');
  area.className = 'items-area';
  area.setAttribute('data-note-id', String(noteId));
  Object.defineProperty(area, 'scrollHeight', { configurable: true, get: function () { return opts.scrollHeight || 0; } });
  Object.defineProperty(area, 'clientHeight', { configurable: true, get: function () { return opts.clientHeight || 0; } });
  doc.body.appendChild(area);
  area._opts = opts;
  return area;
}

function makeEnv() {
  var dom = new JSDOM('<!doctype html><html><body></body></html>', {
    url: 'https://localhost/',
    pretendToBeVisual: true
  });
  var win = dom.window;
  var ctx = { win: win, saves: 0, state: { notes: [] } };
  /* Limpia temporizadores/sesiones del entorno anterior (comparten globals). */
  if (global._readPos) {
    if (global._readPos.saveTimer) clearTimeout(global._readPos.saveTimer);
    if (global._readPos.session) global._readPos.session.dead = true;
  }
  /* Mismo convenio que tests/run.js: jsdom sin runScripts expone el DOM
     mediante globals de Node. */
  global.window = win;
  global.document = win.document;
  global.localStorage = win.localStorage;
  global.requestAnimationFrame = function (fn) { return win.requestAnimationFrame(fn); };
  global.cancelAnimationFrame = function (id) { return win.cancelAnimationFrame(id); };
  global.state = ctx.state;
  global._quotaWarned = false;
  /* eval indirecto: las declaraciones quedan en el ámbito global de Node. */
  (0, eval)(extractMarkedBlock());
  (0, eval)(extractFunction('save'));
  /* Se cuenta cada volcado real de save() (jsdom entrega un Storage nuevo
     por acceso, así que el espía se coloca sobre la función). */
  var realSave = global.save;
  global.save = function () { ctx.saves++; return realSave(); };
  ctx.stored = function () {
    var raw = win.localStorage.getItem('appnotas');
    return raw ? JSON.parse(raw) : null;
  };
  ctx.area = makeArea;
  ctx.ReadPos = {
    get session() { return global._readPos.session; },
    get noteId() { return global._readPos.noteId; },
    get saveTimer() { return global._readPos.saveTimer; },
    onRender: global.readPosOnRender,
    onScroll: global.readPosOnScroll,
    shouldRestore: global.readPosShouldRestore,
    /* Simula el cierre del render de nota: apertura + restauración. */
    open: function (noteId) {
      global.readPosOnRender(noteId);
      if (global.readPosShouldRestore(noteId)) global.readPosStartRestore(noteId);
    },
    startRestore: global.readPosStartRestore,
    endRestore: global.readPosEndRestore,
    flush: global.readPosFlush,
    mediaPending: global.readPosMediaPending,
    reset: function () {
      global.readPosEndRestore();
      if (global._readPos.saveTimer) { clearTimeout(global._readPos.saveTimer); global._readPos.saveTimer = null; }
      global._readPos.noteId = null;
      global._readPos.restorePending = false;
      global._readPos.lastAppliedId = null;
      global._readPos.lastApplied = null;
      ctx.saves = 0;
    }
  };
  return ctx;
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

async function main() {
  await suite('registro de posición en memoria', async function () {
    var ctx = makeEnv();
    var area = ctx.area(ctx.win.document, 1, { scrollHeight: 5000, clientHeight: 800 });
    ctx.state.notes.push({ id: 1, title: 'Nota A', createdAt: 111, items: [{ id: 9, type: 'text', text: 'hola' }] }, { id: 2 });
    ctx.ReadPos.onRender(1);
    area.scrollTop = 1400;
    area.dispatchEvent(new ctx.win.Event('scroll'));
    eq('asocia la posición a la nota por id', ctx.state.notes[0].readScrollTop, 1400);
    eq('no toca otras notas', ctx.state.notes[1].readScrollTop, undefined);
    ok('agenda un guardado (no escribe de inmediato)', !!ctx.ReadPos.saveTimer);
    eq('aún no se escribió localStorage', ctx.saves, 0);
    await sleep(700);
    eq('el guardado diferido se ejecuta', ctx.saves, 1);
    var stored = ctx.stored().notes[0];
    eq('persiste la posición', stored.readScrollTop, 1400);
    eq('no modifica el contenido de la nota', JSON.stringify(stored.items), JSON.stringify([{ id: 9, type: 'text', text: 'hola' }]));
    eq('no modifica el título', stored.title, 'Nota A');
    eq('no modifica la fecha de creación', stored.createdAt, 111);
  });

  await suite('ignora scroll sin cambio y áreas ajenas', async function () {
    var ctx = makeEnv();
    var area = ctx.area(ctx.win.document, 1, { scrollHeight: 5000, clientHeight: 800 });
    ctx.state.notes.push({ id: 1, readScrollTop: 1000 });
    area.scrollTop = 1000;
    area.dispatchEvent(new ctx.win.Event('scroll'));
    eq('mismo valor no reprograma guardado', ctx.ReadPos.saveTimer, null);
    area.scrollTop = 0;
    area.dispatchEvent(new ctx.win.Event('scroll'));
    eq('volver al inicio limpia el valor guardado', ctx.state.notes[0].readScrollTop, 0);
    /* Área de nota inexistente: no debe lanzar. */
    var ghost = ctx.area(ctx.win.document, 999, { scrollHeight: 3000, clientHeight: 500 });
    ghost.scrollTop = 200;
    var threw = false;
    try { ghost.dispatchEvent(new ctx.win.Event('scroll')); } catch (e) { threw = true; }
    ok('área de nota inexistente no lanza', !threw);
    /* Un contenedor desplazable que no es la lectura de la nota se ignora. */
    var other = ctx.win.document.createElement('div');
    other.className = 'selection-grid';
    ctx.win.document.body.appendChild(other);
    other.scrollTop = 50;
    other.dispatchEvent(new ctx.win.Event('scroll'));
    eq('otros contenedores desplazables se ignoran', ctx.state.notes[0].readScrollTop, 0);
  });

  await suite('restauración de la posición guardada', async function () {
    var ctx = makeEnv();
    var area = ctx.area(ctx.win.document, 1, { scrollHeight: 5000, clientHeight: 800 });
    ctx.state.notes.push({ id: 1, readScrollTop: 2000 });
    ctx.ReadPos.open(1);
    eq('aplica la posición guardada', area.scrollTop, 2000);
    ok('la sesión quedó activa', !!ctx.ReadPos.session);
    /* Re-render de la misma nota (p. ej. insertar un bloque): la sesión
       continúa y no se reinicia desde cero. */
    var session = ctx.ReadPos.session;
    ctx.ReadPos.onRender(1);
    ok('el re-render mantiene la sesión en curso', ctx.ReadPos.session === session);
    await frames(25);
    ok('la sesión termina con el layout estable', !ctx.ReadPos.session);
    eq('la posición aplicada no se reescribe sola', ctx.state.notes[0].readScrollTop, 2000);
    eq('no hubo guardados espurios', ctx.saves, 0);
  });

  await suite('nota acortada y nota vacía', async function () {
    var ctx = makeEnv();
    ctx.state.notes.push({ id: 1, readScrollTop: 3000 }, { id: 2, readScrollTop: 900 });
    var shortArea = ctx.area(ctx.win.document, 1, { scrollHeight: 1000, clientHeight: 600 });
    ctx.ReadPos.open(1);
    eq('restaura el límite válido más cercano', shortArea.scrollTop, 400);
    ctx.ReadPos.endRestore();
    ctx.ReadPos.reset();
    var emptyArea = ctx.area(ctx.win.document, 2, { scrollHeight: 0, clientHeight: 0 });
    ctx.ReadPos.open(2);
    eq('nota vacía arranca en 0', emptyArea.scrollTop, 0);
  });

  await suite('nota sin posición previa', async function () {
    var ctx = makeEnv();
    ctx.state.notes.push({ id: 1 });
    var area = ctx.area(ctx.win.document, 1, { scrollHeight: 5000, clientHeight: 800 });
    area.scrollTop = 300; /* arrastre heredado del render anterior */
    ctx.ReadPos.open(1);
    eq('no crea sesión de restauración', ctx.ReadPos.session, null);
    eq('respeta el comportamiento habitual (sin forzar scroll)', area.scrollTop, 300);
  });

  await suite('el scroll propio no sobrescribe la posición guardada', async function () {
    var ctx = makeEnv();
    ctx.state.notes.push({ id: 1, readScrollTop: 2500 });
    /* Contenido aún no listo: la restauración aplica un valor limitado. */
    var area = ctx.area(ctx.win.document, 1, { scrollHeight: 100, clientHeight: 100 });
    ctx.ReadPos.open(1);
    /* El evento de scroll generado por nuestro apply llega después. */
    area.dispatchEvent(new ctx.win.Event('scroll'));
    eq('no pisa la posición guardada con el clamping', ctx.state.notes[0].readScrollTop, 2500);
    ctx.ReadPos.endRestore();
    ctx.ReadPos.reset();
    /* El usuario real (que se aleja del valor aplicado) sí se registra. */
    ctx.ReadPos.open(1);
    area._opts.scrollHeight = 5000;
    area.scrollTop = 3100;
    area.dispatchEvent(new ctx.win.Event('scroll'));
    eq('el scroll del usuario corta la restauración y se registra', ctx.state.notes[0].readScrollTop, 3100);
    eq('la sesión quedó cancelada', ctx.ReadPos.session, null);
  });

  await suite('cambio de nota: flush y aislamiento', async function () {
    var ctx = makeEnv();
    var a1 = ctx.area(ctx.win.document, 1, { scrollHeight: 5000, clientHeight: 800 });
    var a2 = ctx.area(ctx.win.document, 2, { scrollHeight: 5000, clientHeight: 800 });
    ctx.state.notes.push({ id: 1 }, { id: 2 });
    ctx.ReadPos.onRender(1);
    a1.scrollTop = 700;
    a1.dispatchEvent(new ctx.win.Event('scroll'));
    ok('hay un guardado pendiente', !!ctx.ReadPos.saveTimer);
    ctx.ReadPos.onRender(2);
    eq('cambiar de nota vuelca el guardado pendiente', ctx.saves, 1);
    eq('sin guardado pendiente tras el flush', ctx.ReadPos.saveTimer, null);
    a2.scrollTop = 123;
    a2.dispatchEvent(new ctx.win.Event('scroll'));
    eq('la posición de la nota 1 no se toca', ctx.state.notes[0].readScrollTop, 700);
    eq('la nota 2 tiene su propia posición', ctx.state.notes[1].readScrollTop, 123);
    await sleep(700);
    eq('la nota 2 persiste con su propio valor', ctx.stored().notes[1].readScrollTop, 123);
    eq('la nota 1 conserva el suyo', ctx.stored().notes[0].readScrollTop, 700);
    ctx.ReadPos.onRender(null);
    eq('cerrar la nota deja el seguimiento en null', ctx.ReadPos.noteId, null);
    eq('sin sesión activa tras cerrar', ctx.ReadPos.session, null);
  });

  await suite('restauración única por apertura y detección de medios', async function () {
    var ctx = makeEnv();
    ctx.state.notes.push({ id: 1, readScrollTop: 800 });
    ctx.area(ctx.win.document, 1, { scrollHeight: 5000, clientHeight: 800 });
    ctx.ReadPos.onRender(1);
    ok('al abrir queda una restauración pendiente', ctx.ReadPos.shouldRestore(1) === true);
    eq('pero se consume: no se repite', ctx.ReadPos.shouldRestore(1), false);
    ctx.ReadPos.onRender(1); /* re-render de la misma nota */
    eq('render repetido no reprograma la restauración', ctx.ReadPos.shouldRestore(1), false);
    ctx.ReadPos.startRestore(1);
    ok('solo la apertura inicia la sesión', !!ctx.ReadPos.session);
    ctx.ReadPos.endRestore();

    var doc = ctx.win.document;
    var box = doc.createElement('div');
    var imgLoading = doc.createElement('img');
    imgLoading.setAttribute('data-ref', 'imagenes/a.webp');
    box.appendChild(imgLoading);
    eq('imagen pendiente mantiene la restauración viva', ctx.ReadPos.mediaPending(box), true);
    imgLoading.removeAttribute('data-ref');
    imgLoading.setAttribute('src', 'data:image/webp;base64,AAAA');
    eq('imagen con src sin decodificar sigue pendiente', ctx.ReadPos.mediaPending(box), true);
    Object.defineProperty(imgLoading, 'complete', { configurable: true, get: function () { return true; } });
    eq('imagen lista ya no bloquea', ctx.ReadPos.mediaPending(box), false);
  });

  await suite('guardado con tope durante scroll continuo', async function () {
    var ctx = makeEnv();
    var area = ctx.area(ctx.win.document, 1, { scrollHeight: 9000, clientHeight: 800 });
    ctx.state.notes.push({ id: 1 });
    /* Scroll continuo: eventos cada 50 ms durante ~1.2 s. */
    for (var i = 1; i <= 24; i++) {
      area.scrollTop = i * 50;
      area.dispatchEvent(new ctx.win.Event('scroll'));
      await sleep(50);
    }
    ok('el scroll continuo no escribe en cada evento', ctx.saves < 12, 'saves=' + ctx.saves);
    ok('pero sí llega a persistir durante el scroll', ctx.saves >= 1, 'saves=' + ctx.saves);
    await sleep(700);
    ok('tras parar se vuelca lo último', ctx.saves >= 1);
    eq('el valor final quedó registrado', ctx.state.notes[0].readScrollTop, 1200);
    eq('y persistido en localStorage', ctx.stored().notes[0].readScrollTop, 1200);
  });

  await suite('el guardado normal de la app absorbe el scroll pendiente', async function () {
    var ctx = makeEnv();
    var area = ctx.area(ctx.win.document, 1, { scrollHeight: 5000, clientHeight: 800 });
    ctx.state.notes.push({ id: 1 });
    ctx.ReadPos.onRender(1);
    area.scrollTop = 640;
    area.dispatchEvent(new ctx.win.Event('scroll'));
    ok('guardado de scroll pendiente', !!ctx.ReadPos.saveTimer);
    /* Un save() de la app (por ejemplo al editar) debe cancelarlo. */
    global.save();
    eq('save() normal cancela el diferido', ctx.ReadPos.saveTimer, null);
    await sleep(700);
    eq('y no se produce una escritura redundante', ctx.saves, 1);
    eq('la posición quedó incluida en ese guardado', ctx.stored().notes[0].readScrollTop, 640);
  });

  await suite('seguridad: error de almacenamiento no rompe el scroll', async function () {
    var ctx = makeEnv();
    var area = ctx.area(ctx.win.document, 1, { scrollHeight: 5000, clientHeight: 800 });
    ctx.state.notes.push({ id: 1 });
    ctx.ReadPos.onRender(1);
    winQuotaError(ctx);
    var realErr = console.error;
    console.error = function () {}; /* save() registra el fallo por consola */
    area.scrollTop = 400;
    var threw = false;
    try { area.dispatchEvent(new ctx.win.Event('scroll')); await sleep(700); } catch (e) { threw = true; }
    finally { console.error = realErr; }
    ok('un fallo de localStorage no interrumpe el registro', !threw);
    eq('el valor sigue en memoria', ctx.state.notes[0].readScrollTop, 400);
  });

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

function winQuotaError(ctx) {
  /* Sustituye el localStorage global por uno que falle al escribir. */
  global.localStorage = {
    getItem: function () { return null; },
    setItem: function () { throw new Error('QuotaExceededError'); }
  };
}

main().catch(function (e) {
  console.error('Error fatal en el runner de posición de lectura:', e);
  process.exit(2);
});
