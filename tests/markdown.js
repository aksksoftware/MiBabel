'use strict';

function parse(ctx, note) {
  return ctx.NoteDoc.parse(note);
}

module.exports = [
  {
    name: 'markdown/render-gfm', run: function (ctx, fx, T) {
      var src = '# Titulo\n\n**negrita** y *cursiva* y ~~tachado~~\n\n- uno\n- [x] dos\n\n| A | B |\n| --- | --- |\n| 1 | 2 |\n\n```js\nvar x = 1;\n```\n';
      var res = ctx.MarkdownEngine.render(src);
      T.contains('heading', res.html, '<h1');
      T.contains('bold', res.html, '<strong>negrita</strong>');
      T.contains('italic', res.html, '<em>cursiva</em>');
      T.contains('strike', res.html, '<del>tachado</del>');
      T.contains('lista', res.html, '<ul>');
      T.contains('checkbox', res.html, 'type="checkbox"');
      T.contains('tabla', res.html, '<table>');
      T.contains('codigo', res.html, '<code');
      T.eq('sin contenido peligroso eliminado', res.removed, 0);
    }
  },
  {
    name: 'markdown/sanitiza-html-y-enlaces', run: function (ctx, fx, T) {
      var src = '<script>alert(1)</script>\n\n[x](javascript:alert(1))\n\n<img src="javascript:alert(1)" onerror="alert(1)">\n\n<span style="color:red">texto</span>\n\n[ok](https://example.com)\n';
      var res = ctx.MarkdownEngine.render(src);
      T.notContains('sin script', res.html, '<script');
      T.notContains('sin javascript', res.html, 'javascript:');
      T.notContains('sin onerror', res.html, 'onerror=');
      T.notContains('sin style', res.html, 'style=');
      T.contains('texto conservado', res.html, 'texto');
      T.contains('enlace seguro', res.html, 'target="_blank"');
      T.contains('rel seguro', res.html, 'rel="noopener noreferrer"');
    }
  },
  {
    name: 'markdown/matematicas-protegidas', run: function (ctx, fx, T) {
      var res = ctx.MarkdownEngine.render('Ecuacion $a^2 + b^2 = c^2$ y bloque:\n\n$$x = 1$$\n');
      T.contains('inline katex', res.html, 'katex');
      T.contains('bloque katex', res.html, 'katex-display');
      var code = ctx.MarkdownEngine.render('`$no-es-math$`');
      T.notContains('codigo no se convierte', code.html, 'katex');
      var conv = ctx.MarkdownEngine.renderForConversion('$$x^2$$\n');
      T.contains('conversion conserva formula', conv, 'md-math-source');
      T.contains('conversion conserva latex', conv, '$$x^2$$');
    }
  },
  {
    name: 'markdown/texto-plano', run: function (ctx, fx, T) {
      var text = ctx.MarkdownEngine.plainText('# Titulo\n\n**Hola** [mundo](https://x.test)\n\n- item\n\n![Foto](imagenes/a.webp)\n');
      T.contains('titulo', text, 'Titulo');
      T.contains('negrita', text, 'Hola');
      T.contains('enlace', text, 'mundo');
      T.contains('item', text, 'item');
      T.contains('imagen', text, 'Foto');
      T.notContains('sin marcas', text, '**');
      T.notContains('sin url', text, 'https://x.test');
    }
  },
  {
    name: 'mdexporter/formato', run: function (ctx, fx, T) {
      var res = ctx.MdExporter.toMarkdown(parse(ctx, fx.formato));
      T.contains('negrita', res.markdown, '**Texto en negrita**');
      T.contains('cursiva', res.markdown, '*Texto en cursiva*');
      T.contains('subrayado', res.markdown, '<u>Texto subrayado</u>');
      T.contains('tachado', res.markdown, '~~Texto tachado~~');
      T.contains('resaltado', res.markdown, '<mark>azul resaltado</mark>');
      T.contains('cita', res.markdown, '> Cita textual');
      T.contains('codigo', res.markdown, '```');
      T.ok('avisa de perdida de color/tamano', res.warnings.some(function (w) { return /color|tama/i.test(w); }), res.warnings.join(' | '));
    }
  },
  {
    name: 'mdexporter/estructura-y-listas', run: function (ctx, fx, T) {
      var res = ctx.MdExporter.toMarkdown(parse(ctx, fx.estructura));
      T.contains('h1', res.markdown, '# Titulo principal');
      T.contains('h2', res.markdown, '## Subtitulo');
      T.contains('h3', res.markdown, '### Subsubtitulo');
      T.contains('nivel 0', res.markdown, '- Elemento de lista nivel 0');
      T.contains('nivel 1', res.markdown, '  - Elemento de lista nivel 1');
      T.contains('nivel 2', res.markdown, '    - Elemento de lista nivel 2');
      T.contains('tarea hecha', res.markdown, '- [x] Elemento completado');
      T.contains('lista html', res.markdown, '- Viñeta HTML');
      T.contains('lista ordenada html', res.markdown, '1. Numerada uno');
      T.contains('salto de linea', res.markdown, 'Linea uno');
    }
  },
  {
    name: 'mdexporter/tablas', run: function (ctx, fx, T) {
      var res = ctx.MdExporter.toMarkdown(parse(ctx, fx.tablas));
      T.contains('cabecera', res.markdown, '| **Magnitud** | **Valor** | **Unidad** |');
      T.contains('separador', res.markdown, '| --- | --- | --- |');
      T.contains('fila', res.markdown, '| Tension | 12 | V |');
      T.ok('avisa de celdas combinadas', res.warnings.some(function (w) { return /combinad/i.test(w); }), res.warnings.join(' | '));
    }
  },
  {
    name: 'mdexporter/imagenes-y-ecuaciones', run: function (ctx, fx, T) {
      var imgs = ctx.MdExporter.toMarkdown(parse(ctx, fx.imagenes));
      T.contains('imagen', imgs.markdown, '](imagenes/pequena.webp)');
      T.contains('caption', imgs.markdown, '*Pequena 120x90*');
      var eq = ctx.MdExporter.toMarkdown(parse(ctx, fx.ecuaciones));
      T.contains('inline', eq.markdown, '$V = I \\cdot R$');
      T.contains('bloque', eq.markdown, '$$');
      T.contains('integral', eq.markdown, '\\int_{0}^{\\infty}');
    }
  },
  {
    name: 'mdexporter/codigo-multilinea', run: function (ctx, fx, T) {
      var res = ctx.MdExporter.toMarkdown({ blocks: [{ type: 'paragraph', role: 'code', runs: [
        { type: 'text', text: 'linea uno' }, { type: 'break' }, { type: 'text', text: 'linea dos' }
      ] }] });
      T.eq('conserva saltos de linea', res.markdown, '```\nlinea uno\nlinea dos\n```\n');
    }
  },
  {
    name: 'mdexporter/vacio-y-recursos', run: function (ctx, fx, T) {
      var empty = ctx.MdExporter.toMarkdown({ blocks: [] });
      T.eq('vacio', empty.markdown, '');
      var doc = parse(ctx, fx.imagenes);
      var refs = ctx.MdExporter.collectAssetRefs(doc);
      T.ok('recolecta imagenes', refs.indexOf('imagenes/pequena.webp') !== -1, refs.join(','));
      T.ok('ignora imagen ausente de otro directorio', refs.indexOf('roto/no-existe.webp') === -1, refs.join(','));
    }
  }
];
