/* Pruebas del núcleo del Modo Lectura (anclaje y aplicación no destructiva). */
'use strict';

module.exports = [
  {
    name: 'reading/normaliza-anotaciones', run: function (ctx, fx, T) {
      var RA = ctx.ReadingAnnotations;
      var note = {
        id: 1,
        items: [{ id: 10, type: 'text', text: 'Hola mundo' }],
        annotations: [
          null,
          { type: 'nope', segments: [{ itemId: 10, quote: 'Hola' }] },
          { type: 'highlight', segments: [{ itemId: '10', quote: '  Hola  ', prefix: 5 }] },
          { id: 'dup', type: 'comment', text: 'nota', y: 'x', expanded: 1, segments: [{ itemId: 10, quote: 'mundo' }] },
          { id: 'dup', type: 'bold', segments: [{ itemId: 10, quote: 'Hola' }] }
        ]
      };
      RA.normalizeNote(note);
      T.eq('descarta invalidas', note.annotations.length, 3);
      T.eq('itemId numerico', note.annotations[0].segments[0].itemId, 10);
      T.eq('recorta quote', note.annotations[0].segments[0].quote, 'Hola');
      T.eq('prefix no string', note.annotations[0].segments[0].prefix, '');
      T.eq('color por defecto', note.annotations[0].color, '#ffff00');
      T.eq('comentario y invalida', note.annotations[1].y, null);
      T.eq('comentario expanded bool', note.annotations[1].expanded, true);
      T.ok('ids unicos', note.annotations[1].id !== note.annotations[2].id);
      T.eq('annotationsHidden por defecto', note.annotationsHidden, false);

      var md = { id: 2, type: 'markdown', markdown: 'Hola', annotations: [
        { type: 'bold', segments: [{ itemId: null, quote: 'Hola' }] }
      ] };
      RA.normalizeNote(md);
      T.eq('markdown normaliza itemId a md', md.annotations[0].segments[0].itemId, 'md');
    }
  },
  {
    name: 'reading/segmento-con-contexto', run: function (ctx, fx, T) {
      var RA = ctx.ReadingAnnotations;
      var seg = RA.makeSegment('  uno dos tres  ', 2, 9, 'md');
      T.eq('quote recortado', seg.quote, 'uno dos');
      T.eq('itemId md', seg.itemId, 'md');
      T.contains('prefix', seg.prefix, '');
      T.eq('startHint', seg.startHint, 2);
      T.eq('segmento vacio', RA.makeSegment('   ', 0, 3, 1), null);
    }
  },
  {
    name: 'reading/busca-rango-exacto-y-repetido', run: function (ctx, fx, T) {
      var RA = ctx.ReadingAnnotations;
      var text = 'alfa beta alfa gamma alfa beta';
      var r1 = RA.findRange(text, { quote: 'alfa', prefix: 'gamma ', suffix: ' beta', startHint: null });
      T.eq('elige ocurrencia por contexto', r1.start, 21);
      var r2 = RA.findRange(text, { quote: 'alfa', prefix: '', suffix: ' gamma', startHint: null });
      T.eq('elige primera por sufijo', r2.start, 10);
      var r3 = RA.findRange(text, { quote: 'beta', startHint: 5 });
      T.eq('startHint literal', r3.start, 5);
      var r4 = RA.findRange(text, { quote: 'beta', startHint: 999 });
      T.eq('startHint invalido cae a busqueda', r4.start, 5);
      T.eq('sin coincidencia', RA.findRange(text, { quote: 'zzz' }), null);
    }
  },
  {
    name: 'reading/fallback-espacios', run: function (ctx, fx, T) {
      var RA = ctx.ReadingAnnotations;
      var r = RA.findRange('hola\n   mundo cruel', { quote: 'hola mundo', prefix: '', suffix: '' });
      T.ok('encuentra con espacios normalizados', !!r);
      T.eq('inicio', r.start, 0);
      T.eq('fin cubre saltos', r.end, 13);
    }
  },
  {
    name: 'reading/poda-por-item-y-faltantes', run: function (ctx, fx, T) {
      var RA = ctx.ReadingAnnotations;
      var note = {
        id: 2,
        items: [{ id: 10 }, { id: 11 }],
        annotations: [
          { id: 'a', type: 'bold', segments: [{ itemId: 10, quote: 'x' }, { itemId: 99, quote: 'y' }] },
          { id: 'b', type: 'bold', segments: [{ itemId: 99, quote: 'z' }] }
        ]
      };
      RA.pruneItem(note, 10);
      T.eq('conserva anotacion con otro segmento', note.annotations.length, 2);
      T.eq('quita segmento del item', note.annotations[0].segments.length, 1);
      RA.pruneMissing(note);
      T.eq('descarta items inexistentes', note.annotations.length, 0);

      var md = { id: 3, type: 'markdown', items: [], annotations: [
        { id: 'c', type: 'bold', segments: [{ itemId: 'md', quote: 'a' }] },
        { id: 'd', type: 'bold', segments: [{ itemId: 10, quote: 'b' }] }
      ] };
      RA.pruneMissing(md);
      T.eq('markdown conserva md', md.annotations.length, 1);
      T.eq('markdown descarta numericos', md.annotations[0].id, 'c');
    }
  },
  {
    name: 'reading/aplica-y-desenvuelve', run: function (ctx, fx, T) {
      var RA = ctx.ReadingAnnotations;
      var win = ctx.win;
      var root = win.document.createElement('div');
      root.innerHTML = '<p>Hola <b>mundo</b> cruel</p>';
      var ann = { id: 'r1', type: 'highlight', color: '#ffff00' };
      var res = RA.applySegment(root, ann, { itemId: 10, quote: 'mundo cruel' });
      T.ok('aplica rango', !!res);
      T.eq('texto intacto', root.textContent, 'Hola mundo cruel');
      var spans = root.querySelectorAll('span.ra-highlight');
      T.eq('dos spans por nodo', spans.length, 2);
      T.eq('atributo id', spans[0].getAttribute('data-ra-id'), 'r1');
      T.eq('color css', spans[0].style.getPropertyValue('--ra-color'), '#ffff00');
      RA.unwrapAll(root);
      T.eq('sin spans', root.querySelectorAll('span[data-ra-id]').length, 0);
      T.eq('texto restaurado', root.textContent, 'Hola mundo cruel');
    }
  },
  {
    name: 'reading/offsets-numericos', run: function (ctx, fx, T) {
      var RA = ctx.ReadingAnnotations;
      var win = ctx.win;
      var root = win.document.createElement('div');
      root.innerHTML = '<p>Hola <b>mundo</b> cruel</p>';
      var p = root.querySelector('p');
      var b = root.querySelector('b');
      T.eq('inicio', RA.offsetAtPoint(root, p.firstChild, 0), 0);
      T.eq('primer nodo', RA.offsetAtPoint(root, p.firstChild, 2), 2);
      T.eq('nodo anidado', RA.offsetAtPoint(root, b.firstChild, 3), 8);
      T.eq('ultimo nodo', RA.offsetAtPoint(root, p.lastChild, 3), 13);
      T.eq('fin', RA.offsetAtPoint(root, p.lastChild, 6), 16);
      var start = RA.offsetAtPoint(root, p.firstChild, 5);
      var end = RA.offsetAtPoint(root, b.firstChild, 5);
      T.eq('offset inicio numerico', typeof start, 'number');
      T.eq('offset fin numerico', typeof end, 'number');
      var seg = RA.makeSegment(RA.textOf(root), start, end, 10);
      T.ok('segmento desde offsets', !!seg);
      T.eq('quote correcto', seg.quote, 'mundo');
      T.eq('prefix correcto', seg.prefix, 'Hola ');
      T.eq('suffix correcto', seg.suffix, ' cruel');
    }
  },
  {
    name: 'reading/ignora-formulas-y-medios', run: function (ctx, fx, T) {
      var RA = ctx.ReadingAnnotations;
      var win = ctx.win;
      var root = win.document.createElement('div');
      root.innerHTML = '<p>antes <span class="katex">x=1</span> despues</p><img src="a.webp" alt="foto">';
      T.eq('texto anotable', RA.textOf(root), 'antes  despues');
      var res = RA.applySegment(root, { id: 'r2', type: 'underline' }, { quote: 'antes despues' });
      T.ok('aplica entre formula', !!res);
      T.eq('no toca formula', root.querySelector('.katex').textContent, 'x=1');
      T.eq('no toca imagen', root.querySelector('img').getAttribute('alt'), 'foto');
    }
  }
];
