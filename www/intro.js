/* ==== INTRO DE INICIO MiBabel (Biblioteca de Babel) ====
 * Blanco → hexágono central → isotipo → logotipo1 → vuelo al header.
 *
 * Cuatro elementos y una idea por etapa, sin medir layout ni dibujar
 * geometría: el hexágono es un <polygon> estático en viewBox, el isotipo
 * y el logotipo son los assets oficiales (Isotipo.png / Logotipo1.png) y
 * todo el movimiento vive en style.css (sección INTRO) como transiciones
 * de transform/opacity del compositor.
 *
 * Secuencia de estados (cada uno agrega una clase al contenedor):
 *
 *   INTRO_HEX               s-hex      el hexágono aparece
 *   INTRO_ISOTYPE           s-iso      entra el isotipo en el hexágono
 *   INTRO_WORDMARK          s-word     aparece el logotipo debajo
 *   INTRO_ISOTYPE_OUT       s-isoout   isotipo y hexágono se desvanecen
 *   INTRO_HEADER_TRANSITION s-head     el fondo se aclara y el logotipo vuela
 *   INTRO_COMPLETE          s-done     se retira la intro del DOM
 *
 * La etapa final espera a script.js (BabelIntro.markReady()): la intro no
 * usa un setTimeout ciego para decidir cuándo mostrar la aplicación. Hay
 * dos failsafes (y una red de seguridad en index.html): si algo falla, la
 * intro se retira y MiBabel se abre igual.
 *
 * Rendimiento:
 *   - Cero requestAnimationFrame: la animación es CSS del compositor.
 *   - Sin canvas, sin medición de layout, sin listener de resize.
 *   - Sin filtros ni sombras animados; will-change solo en el logotipo
 *     que vuela.
 *   - Al terminar se limpian temporizadores y referencias, y la intro se
 *     elimina del DOM (no puede re-ejecutarse).
 */
(function () {
  'use strict';

  var READY_FAILSAFE_MS = 6200;
  var HARD_FAILSAFE_MS = 9500;

  /* Línea de tiempo. `at` es el momento absoluto de entrada (ms desde el
     inicio); la etapa final usa `after` (ms después de la anterior). */
  var STAGES = [
    { id: 'INTRO_HEX', cls: 's-hex', at: 0 },
    { id: 'INTRO_ISOTYPE', cls: 's-iso', at: 500 },
    { id: 'INTRO_WORDMARK', cls: 's-word', at: 1200 },
    { id: 'INTRO_ISOTYPE_OUT', cls: 's-isoout', at: 1800 },
    { id: 'INTRO_HEADER_TRANSITION', cls: 's-head', at: 2200, waitReady: true },
    { id: 'INTRO_COMPLETE', cls: 's-done', after: 700 }
  ];
  var HEAD_INDEX = STAGES.length - 2;
  /* índice de la última etapa realmente entrada (evita dobles entradas) */
  var stageIdx = -1;

  /* Protección contra reinyecciones accidentales del script */
  if (window.BabelIntro && window.BabelIntro.isRunning &&
      window.BabelIntro.isRunning()) return;

  var root = document.getElementById('babelIntro');
  if (!root) return;

  var word = document.getElementById('bintWord');
  var headerLogo = document.getElementById('headerLogo');
  var headerTrigger = document.querySelector('.menu-trigger');

  var appReady = false;
  var removed = false;
  var headWaiting = false;
  var compactRemoved = false;
  var started = false;
  var stageId = 'INTRO_START';
  var timers = [];
  var readyTimer = null;
  var hardTimer = null;
  var reduced = false;
  try {
    reduced = !!(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  } catch (e) {}

  window.BabelIntro = {
    /* Lo llama script.js cuando la interfaz principal ya está renderizada */
    markReady: function () {
      if (removed) return;
      appReady = true;
      if (headWaiting) {
        headWaiting = false;
        enter(HEAD_INDEX);
      }
    },
    /* true mientras esta intro controle la animación (la usa index.html) */
    isRunning: function () { return !removed; },
    /* etapa actual (útil para diagnóstico) */
    stage: function () { return stageId; },
    /* diagnóstico: etapa actual y modo reducido */
    diagnostics: function () {
      return { stage: stageId, reduced: reduced };
    }
  };

  try {
    build();
    /* Arrancar en DOMContentLoaded: los scripts con defer ya ejecutaron y
     * la cadena de etapas no compite con ellos en el hilo principal. */
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', start, false);
    } else {
      start();
    }
  } catch (e) {
    console.warn('[Intro] no se pudo iniciar; se omite la intro', e);
    finish();
  }

  /* --------------------------------------------------------------- build */

  function build() {
    /* El logotipo volador es siempre el asset sobre fondo claro: la intro
     * empieza en blanco y el isotipo/wordmark se pintan en su color real. */
    if (word) word.src = 'Logotipo1.png';
    /* Se oculta el logo real: el volador aterriza exactamente en su lugar */
    if (headerLogo) headerLogo.style.visibility = 'hidden';
  }

  /* --------------------------------------------------------------- start */

  function start() {
    if (started || removed) return;
    started = true;
    readyTimer = setTimeout(function () {
      if (removed || appReady) return;
      console.warn('[Intro] la app no se marco lista a tiempo: se continua igual');
      appReady = true;
      if (headWaiting) {
        headWaiting = false;
        enter(HEAD_INDEX);
      }
    }, READY_FAILSAFE_MS);
    hardTimer = setTimeout(function () {
      if (removed) return;
      console.warn('[Intro] failsafe: se retira la intro');
      finish();
    }, HARD_FAILSAFE_MS);
    enter(0);
  }

  /* Entrada a una etapa: agrega la clase y programa la siguiente. Si la
     etapa exige la app lista y aún no lo está, espera (sin bloquear: los
     failsafes cubren ese caso). */
  function enter(i) {
    if (removed || i < 0 || i >= STAGES.length || i <= stageIdx) return;
    var st = STAGES[i];
    if (st.waitReady && !appReady) {
      headWaiting = true;
      stageId = 'WAITING_READY';
      return;
    }
    stageIdx = i;
    stageId = st.id;
    root.classList.add(st.cls);
    if (st.id === 'INTRO_COMPLETE') { finish(); return; }
    if (st.id === 'INTRO_HEADER_TRANSITION') headerTransition();

    var next = STAGES[i + 1];
    if (!next) {
      timers.push(setTimeout(finish, 700));
      return;
    }
    var delay = next.at !== undefined ? next.at - (st.at || 0) : (next.after || 700);
    timers.push(setTimeout(function () { enter(i + 1); }, Math.max(0, delay)));
  }

  /* Traslado continuo: el mismo <img> del logotipo se mide y se lleva con
     una única transformación al rectángulo real del logo del header. */
  function headerTransition() {
    if (reduced) {
      root.classList.add('bint-reduced-head');
      if (headerLogo) headerLogo.style.visibility = '';
      return;
    }
    if (!word) return;
    var target = headerLogo ? headerLogo.getBoundingClientRect() : null;
    if ((!target || !target.width) && headerTrigger) {
      /* el header puede estar en modo compacto: se mide sin él y se
         restaura el estado original al terminar */
      if (headerTrigger.classList.contains('compact')) {
        headerTrigger.classList.remove('compact');
        compactRemoved = true;
      }
      target = headerLogo ? headerLogo.getBoundingClientRect() : null;
    }
    var cur = word.getBoundingClientRect();
    if (!target || !target.width || !cur.width) {
      root.classList.add('bint-no-flight');
      return;
    }
    var dx = (target.left + target.width / 2) - (cur.left + cur.width / 2);
    var dy = (target.top + target.height / 2) - (cur.top + cur.height / 2);
    var sc = target.width / cur.width;
    word.style.transform = 'translate(-50%,-50%) translate3d(' +
      dx.toFixed(1) + 'px,' + dy.toFixed(1) + 'px,0) scale(' + sc.toFixed(4) + ')';
  }

  function finish() {
    if (removed) return;
    removed = true;
    var i;
    for (i = 0; i < timers.length; i++) clearTimeout(timers[i]);
    timers = [];
    clearTimeout(readyTimer);
    clearTimeout(hardTimer);
    if (compactRemoved && headerTrigger) headerTrigger.classList.add('compact');
    if (headerLogo) headerLogo.style.visibility = '';
    try {
      if (root.parentNode) root.parentNode.removeChild(root);
    } catch (e) {
      console.warn('[Intro] no se pudo retirar del DOM', e);
    }
    stageId = 'INTRO_COMPLETE';
    /* La app ya no depende de esta intro */
    window.BabelIntro = {
      markReady: function () {},
      isRunning: function () { return false; },
      stage: function () { return 'INTRO_COMPLETE'; },
      diagnostics: function () { return { stage: 'INTRO_COMPLETE', reduced: reduced }; }
    };
  }
})();
