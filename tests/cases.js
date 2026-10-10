/* Casos de prueba de la exportacion de notas (spec 22).
 *
 * Cada caso: { name, run(ctx, fixtures, T) }.
 * ctx: { win, NoteDoc, PdfExporter, DocxExporter, TxtExporter, PDFLib,
 *        docx, JSZip, ImageManager, ImageConverter, renderTextToCanvas }
 * T: { ok, eq, contains, notContains, suite }
 */
'use strict';

var fs = require('fs');
var path = require('path');

var WWW = path.resolve(__dirname, '..', 'www');

function prodDeps(ctx) {
  return {
    fetchFont: function (kind) {
      var file = {
        regular: 'NotoSans-Regular.ttf',
        bold: 'NotoSans-Bold.ttf',
        italic: 'NotoSans-Italic.ttf',
        boldItalic: 'NotoSans-BoldItalic.ttf'
      }[kind] || 'NotoSans-Regular.ttf';
      return Promise.resolve(new Uint8Array(fs.readFileSync(path.join(WWW, 'lib', file))));
    },
    loadImageBytes: function (ref) {
      return ctx.ImageManager.read(ref).then(function (b64) {
        if (!b64) return null;
        return ctx.ImageConverter.webpToPng(b64, 0, 0).then(function (png) {
          return { bytes: ctx.ImageConverter.base64ToBytes(png), width: 120, height: 90 };
        });
      });
    },
    renderEquation: function (latex, display, maxW) {
      return ctx.renderTextToCanvas(display ? '$$' + latex + '$$' : '$' + latex + '$', maxW)
        .then(function (r) {
          return {
            bytes: ctx.ImageConverter.base64ToBytes(r.base64),
            width: r.width, height: r.height
          };
        });
    }
  };
}

function parse(ctx, note) {
  return ctx.NoteDoc.parse(note);
}

/* Descomprime el blob DOCX y devuelve sus XML como texto. */
async function unzipDocx(ctx, blob) {
  var ab = await blob.arrayBuffer();
  var zip = await ctx.JSZip.loadAsync(ab);
  async function get(p) {
    var f = zip.file(p);
    return f ? f.async('string') : null;
  }
  var media = [];
  zip.forEach(function (rel) {
    if (rel.indexOf('word/media/') === 0 && rel.slice(-1) !== '/') media.push(rel);
  });
  return {
    document: await get('word/document.xml'),
    numbering: await get('word/numbering.xml'),
    media: media
  };
}

/* Pagina falsa que graba todas las operaciones de dibujo. */
function mockPage() {
  var ops = [];
  ['drawText', 'drawLine', 'drawRectangle', 'drawCircle', 'drawImage'].forEach(function (m) {
    ops[m] = [];
  });
  return {
    ops: ops,
    drawText: function (t, o) { ops.drawText.push({ text: t, o: o }); },
    drawLine: function (o) { ops.drawLine.push(o); },
    drawRectangle: function (o) { ops.drawRectangle.push(o); },
    drawCircle: function (o) { ops.drawCircle.push(o); },
    drawImage: function (img, o) { ops.drawImage.push({ o: o }); }
  };
}

var PNG_BYTES = Buffer.from(
  'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk' +
  'YPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==', 'base64');

async function realFontsAndCtx(ctx, note, withMedia) {
  var P = ctx.PDFLib;
  var pdfDoc = await P.PDFDocument.create();
  if (ctx.win.fontkit && pdfDoc.registerFontkit) {
    try { pdfDoc.registerFontkit(ctx.win.fontkit); } catch (e) { /* noop */ }
  }
  var faces = {};
  var kinds = { regular: 'NotoSans-Regular.ttf', bold: 'NotoSans-Bold.ttf', italic: 'NotoSans-Italic.ttf', boldItalic: 'NotoSans-BoldItalic.ttf' };
  var fk = {};
  for (var k of Object.keys(kinds)) {
    var buf = fs.readFileSync(path.join(WWW, 'lib', kinds[k]));
    faces[k] = await pdfDoc.embedFont(buf);
    try { fk[k] = ctx.win.fontkit.create(buf); } catch (e) { /* sin cobertura */ }
  }
  var fonts = { faces: faces, fk: fk, synth: {} };
  var doc = parse(ctx, note);
  ctx.PdfExporter.prepareText(doc, fonts);
  var mediaCtx = { images: {}, equations: {}, warnings: [], deps: prodDeps(ctx) };
  var R = {
    P: P, fonts: fonts, W: ctx.PdfExporter.PAGE.contentW,
    palette: doc.palette, paper: doc.background,
    imagesDrawn: {}, tableHeaders: {},
    ctx: mediaCtx
  };
  if (withMedia) {
    /* Rellena imagenes y ecuaciones con bytes reales (PNG 1x1). */
    (function collect(b) {
      (b || []).forEach(function (block) {
        if (!block) return;
        if (block.type === 'image' && block.ref) mediaCtx.images[block.ref] = { bytes: PNG_BYTES, width: 120, height: 90 };
        if (block.type === 'equation') mediaCtx.equations['b:' + block.latex] = { bytes: PNG_BYTES, width: 200, height: 40 };
        (block.runs || []).forEach(function (r) {
          if (r && r.type === 'equation') mediaCtx.equations[(r.display ? 'b:' : 'i:') + r.latex] = { bytes: PNG_BYTES, width: 120, height: 24 };
        });
        if (block.type === 'list') block.items.forEach(function (it) { collect(it.blocks); });
        if (block.type === 'table') block.rows.forEach(function (row) {
          row.forEach(function (c) { if (c) collect(c.blocks); });
        });
      });
    })(doc.blocks);
    var embedded = await pdfDoc.embedPng(PNG_BYTES);
    R.imagesDrawn[PNG_BYTES] = embedded;
  }
  var laid = ctx.PdfExporter.layoutForTest(doc, fonts, mediaCtx);
  R.tableHeaders = laid.tableHeaders;
  return { doc: doc, fonts: fonts, R: R, items: laid.items, tableHeaders: laid.tableHeaders, pdfDoc: pdfDoc };
}

/* Replica la paginacion del exportador sobre paginas falsas y devuelve
 * las ops por pagina para verificar limites. */
function drawAll(R, items, tableHeaders) {
  var TOP = 841.89 - 50, BOTTOM = 50, MARGIN = 50;
  var pages = [mockPage()];
  var page = pages[0];
  var y = TOP;
  var started = {}, onPage = {};
  function newPage() {
    page = mockPage();
    pages.push(page);
    y = TOP;
    onPage = {};
  }
  function headers(item) {
    if (!item.tableId || onPage[item.tableId] || !started[item.tableId]) return;
    (tableHeaders[item.tableId] || []).forEach(function (hh) {
      if (y - hh.h < BOTTOM) newPage();
      hh.draw(R, page, MARGIN, y);
      y -= hh.h;
    });
    onPage[item.tableId] = true;
  }
  for (var i = 0; i < items.length; i++) {
    var it = items[i];
    if (it.keepWithNext && i + 1 < items.length) {
      if (y - it.h - items[i + 1].h < BOTTOM && y < TOP - 1) newPage();
    }
    if (it.tableId) { headers(it); started[it.tableId] = true; onPage[it.tableId] = true; }
    if (it.atomic && y - it.h < BOTTOM && y < TOP - 1) {
      newPage();
      if (it.tableId) { started[it.tableId] = true; onPage[it.tableId] = true; }
    }
    if (y - it.h < BOTTOM) {
      if (it.split) {
        var frags = it.split(R, TOP - BOTTOM);
        if (frags && frags.length) {
          frags.forEach(function (f) {
            if (y - f.h < BOTTOM) newPage();
            f.draw(R, page, MARGIN, y);
            y -= f.h;
          });
          continue;
        }
      }
      if (y < TOP - 1) newPage();
    }
    it.draw(R, page, MARGIN, y);
    y -= it.h;
  }
  return pages.map(function (p) { return p.ops; });
}

function allTextWithin(pagesOps, T, label) {
  var badT = [], badI = [];
  pagesOps.forEach(function (ops) {
    ops.drawText.forEach(function (d) {
      if (!(d.o.x >= -0.5 && d.o.x <= 595.28 + 0.5 && d.o.y >= 0 && d.o.y <= 841.89)) badT.push(d);
    });
    ops.drawImage.forEach(function (d) {
      var o = d.o;
      if (!(o.x >= 0 && o.x + o.width <= 595.28 + 0.5 && o.y >= 0 && o.y + o.height <= 841.89)) badI.push(d);
    });
  });
  T.ok(label + ': texto dentro de la pagina', badT.length === 0,
    badT.length ? JSON.stringify(badT.slice(0, 3).map(function (d) { return { t: d.text, x: d.o.x, y: d.o.y }; })) : '');
  T.ok(label + ': imagenes dentro de la pagina', badI.length === 0,
    badI.length ? JSON.stringify(badI.slice(0, 3)) : '');
}

function drawnTexts(ops) {
  return ops.drawText.map(function (d) { return d.text; }).join('\n');
}

module.exports = [

  /* ================= Parser: formato (Caso 1) ================= */
  {
    name: 'parser/texto-con-formato', run: function (ctx, fx, T) {
      var doc = parse(ctx, fx.formato);
      T.eq('13 bloques', doc.blocks.length, 13);
      function runs(i) { return doc.blocks[i].runs; }
      T.ok('negrita', runs(1).some(function (r) { return r.bold && r.text.indexOf('negrita') !== -1; }));
      T.ok('cursiva', runs(2).some(function (r) { return r.italic; }));
      T.ok('subrayado', runs(3).some(function (r) { return r.underline; }));
      var combo = runs(4).filter(function (r) { return r.type === 'text' && /\S/.test(r.text); });
      T.ok('triple formato simultaneo', combo.length === 1 && combo[0].bold && combo[0].italic && combo[0].underline);
      T.ok('tachado s+del', runs(5).filter(function (r) { return r.strike; }).length === 2);
      var red = runs(6).filter(function (r) { return r.color === '#ff0000'; });
      T.ok('color rgb()', red.length === 1);
      var hl = runs(6).filter(function (r) { return r.highlight === '#ffff00'; });
      T.ok('resaltado', hl.length === 1);
      var sizes = runs(7).map(function (r) { return r.size || null; });
      T.ok('tamanos 15pt y 6.75pt', sizes.indexOf(15) !== -1 && sizes.indexOf(6.75) !== -1);
      T.ok('h2 pegado es heading 2', doc.blocks[10].type === 'heading' && doc.blocks[10].level === 2);
      T.ok('blockquote es cita', doc.blocks[11].role === 'quote');
      T.ok('pre es codigo', doc.blocks[12].role === 'code');
    }
  },

  /* ================= Parser: estructura (Caso 2) ================= */
  {
    name: 'parser/estructura', run: function (ctx, fx, T) {
      var doc = parse(ctx, fx.estructura);
      T.ok('h1/h2/h3', doc.blocks[0].level === 1 && doc.blocks[1].level === 2 && doc.blocks[2].level === 3);
      var list = doc.blocks[5];
      T.ok('lista agrupada de 6', list.type === 'list' && list.items.length === 6);
      T.eq('niveles', list.items.map(function (x) { return x.level; }), [0, 1, 2, 0, 0, 0]);
      T.ok('checkbox', list.items[3].checked === true);
      T.ok('ul html', doc.blocks[6].type === 'list' && !doc.blocks[6].ordered);
      T.ok('ol html', doc.blocks[7].type === 'list' && doc.blocks[7].ordered);
      var br = doc.blocks[8];
      T.ok('br conserva 3 lineas', br.runs.filter(function (r) { return r.type === 'break'; }).length === 2);
      T.eq('alineaciones por div', [doc.blocks[10].align, doc.blocks[12].align, doc.blocks[14].align],
        ['center', 'right', 'justify']);
    }
  },

  /* ================= Parser: orden de listas/tablas anidadas =================
   * Regresion: <ul>/<ol>/<table> dentro de un contenedor (div) se emitian
   * ANTES del texto acumulado (las listas se iban arriba del documento en
   * PDF/DOCX/TXT) y, con dos listas separadas por texto en el mismo
   * contenedor, la primera se perdia. */
  {
    name: 'parser/orden-listas-anidadas', run: function (ctx, fx, T) {
      function noteOf(html) {
        return { id: 1, title: 'orden', createdAt: 1, items: [{ type: 'text', text: html }] };
      }
      function types(doc) {
        return doc.blocks.map(function (b) { return b.type; });
      }
      function texts(doc) {
        return doc.blocks.map(function (b) {
          if (b.type === 'list') {
            return b.items.map(function (it) {
              return (it.blocks || []).map(function (x) {
                return (x.runs || []).map(function (r) { return r.text || ''; }).join('');
              }).join(' ');
            }).join('|');
          }
          if (b.type === 'table') {
            return (b.rows || []).map(function (row) {
              return row.filter(Boolean).map(function (cell) {
                return (cell.blocks || []).map(function (x) {
                  return (x.runs || []).map(function (r) { return r.text || ''; }).join('');
                }).join(' ');
              }).join('|');
            }).join(' ');
          }
          return (b.runs || []).map(function (r) { return r.text || ''; }).join('');
        });
      }

      var a = parse(ctx, noteOf(
        '<div>Parrafo uno</div><div><ul><li>Item lista A</li></ul></div><div>Parrafo dos</div>'));
      T.eq('lista anidada en su posicion', types(a), ['paragraph', 'list', 'paragraph']);
      T.eq('orden de textos', texts(a), ['Parrafo uno', 'Item lista A', 'Parrafo dos']);

      var b = parse(ctx, noteOf(
        '<div>uno<ul><li>A</li></ul>dos<ul><li>B</li></ul>tres</div>'));
      T.eq('dos listas en un contenedor', types(b),
        ['paragraph', 'list', 'paragraph', 'list', 'paragraph']);
      T.eq('ninguna lista se pierde', texts(b), ['uno', 'A', 'dos', 'B', 'tres']);

      var c = parse(ctx, noteOf(
        '<div>Texto antes<div><table><tr><td>celda</td></tr></table></div>Texto despues</div>'));
      T.eq('tabla anidada en su posicion', types(c), ['paragraph', 'table', 'paragraph']);
      T.eq('textos alrededor de la tabla', texts(c), ['Texto antes', 'celda', 'Texto despues']);

      var d = parse(ctx, noteOf('<div>uno<hr>dos</div>'));
      T.eq('hr anidado conserva la regla', types(d), ['paragraph', 'rule', 'paragraph']);

      var e = parse(ctx, noteOf('<div>antes<ol start="2"><li>x</li><li>y</li></ol>despues</div>'));
      T.eq('ol anidada numerada', types(e), ['paragraph', 'list', 'paragraph']);
      T.ok('ol anidada es ordenada', e.blocks[1].ordered === true && e.blocks[1].start === 2);
      T.eq('items de la ol', texts(e), ['antes', 'x|y', 'despues']);

      /* El orden debe llegarse igual a los tres formatos. */
      var note = {
        id: 2, title: 'Lista en su sitio', createdAt: 1,
        items: [
          { type: 'text', text: '<div>Parrafo uno</div><div><ul><li>Item lista A</li></ul></div><div>Parrafo dos</div>' }
        ]
      };
      var doc = parse(ctx, note);
      var txt = ctx.TxtExporter.toText(doc, {});
      T.ok('TXT: parrafo antes de la lista',
        txt.indexOf('Parrafo uno') !== -1 && txt.indexOf('Parrafo uno') < txt.indexOf('Item lista A'));
      T.ok('TXT: parrafo despues de la lista',
        txt.indexOf('Item lista A') < txt.indexOf('Parrafo dos'));
    }
  },

  /* ================= Parser: tablas ================= */
  {
    name: 'parser/tablas', run: function (ctx, fx, T) {
      var doc = parse(ctx, fx.tablas);
      var t1 = doc.blocks[1];
      T.ok('tabla 3x3', t1.type === 'table' && t1.rows.length === 3 && t1.cols === 3);
      T.eq('cabecera detectada', t1.headerRows, 1);
      var t2 = doc.blocks[3];
      T.eq('alineacion tabla', t2.align, 'center');
      T.ok('colspan origen', t2.rows[0][0].colspan === 2);
      var t3 = doc.blocks[5];
      T.ok('rowspan+colspan 2x2', t3.rows[0][0].rowspan === 2 && t3.rows[0][0].colspan === 2);
      T.ok('tabla grande 30 filas', doc.blocks[7].rows.length === 30);
    }
  },

  /* ================= Parser: ecuaciones ================= */
  {
    name: 'parser/ecuaciones', run: function (ctx, fx, T) {
      var doc = parse(ctx, fx.ecuaciones);
      var inline = doc.blocks[0].runs.filter(function (r) { return r.type === 'equation'; });
      T.ok('inline detectada', inline.length === 1 && inline[0].latex === 'V = I \\cdot R' && !inline[0].display);
      var multi = doc.blocks[1].runs.filter(function (r) { return r.type === 'equation'; });
      T.eq('tres inline', multi.length, 3);
      var b1 = doc.blocks[3].runs.filter(function (r) { return r.type === 'equation'; });
      T.ok('bloque display', b1.length === 1 && b1[0].display === true);
      var money = doc.blocks[9].runs;
      T.ok('sintaxis moneda igual que la app', money.some(function (r) { return r.type === 'equation'; }));
    }
  },

  /* ================= Parser: nota antigua (Caso 7) ================= */
  {
    name: 'parser/nota-antigua', run: function (ctx, fx, T) {
      var doc = parse(ctx, fx.antiguo);
      T.ok('sin fondo -> default/none', doc.background.color === 'default' && doc.background.design === 'none');
      var texts = [];
      doc.blocks.forEach(function (b) {
        if (b.runs) texts.push(ctx.NoteDoc.runsToPlainText(b.runs));
        if (b.type === 'list') b.items.forEach(function (it) {
          (it.blocks || []).forEach(function (x) { if (x.runs) texts.push(ctx.NoteDoc.runsToPlainText(x.runs)); });
        });
        if (b.type === 'table') b.rows.forEach(function (r) {
          r.forEach(function (c) {
            if (c) (c.blocks || []).forEach(function (x) { if (x.runs) texts.push(ctx.NoteDoc.runsToPlainText(x.runs)); });
          });
        });
      });
      var all = texts.join('\n');
      ['Texto plano', 'Lista antigua', 'NEGRITA', 'centrado antiguo', 'tipo desconocido',
        'Ecuacion antigua', 'A', 'B', 'C', 'D'].forEach(function (s) {
        T.contains('conserva: ' + s, all, s);
      });
      T.ok('aviso tipo desconocido', doc.warnings.some(function (w) { return w.indexOf('desconocido') !== -1; }));
      T.ok('aviso tabla sin celdas', doc.warnings.some(function (w) { return w.indexOf('tabla') !== -1; }));
      var medias = doc.blocks.filter(function (b) { return b.type === 'media'; });
      T.eq('video legacy + audio', medias.length, 2);
      T.ok('video legacy usa src', medias[0].ref === 'videos/viejo.mp4');
    }
  },

  /* ================= Parser: HTML hostil ================= */
  {
    name: 'parser/html-inseguro', run: function (ctx, fx, T) {
      var doc = parse(ctx, fx.htmlRaro);
      T.ok('script no genera bloque propio con codigo', doc.blocks.every(function (b) {
        return ctx.NoteDoc.runsToPlainText(b.runs || []).indexOf('alert') === -1;
      }));
      T.ok('texto tras script conservado', doc.blocks.some(function (b) {
        return ctx.NoteDoc.runsToPlainText(b.runs || []).indexOf('texto tras script') !== -1;
      }));
      T.ok('tabla html anidada parseada', doc.blocks.some(function (b) { return b.type === 'table'; }));
      T.ok('img inline es run imagen', doc.blocks.some(function (b) {
        return (b.runs || []).some(function (r) { return r.type === 'image'; });
      }));
    }
  },

  /* ================= Parser: tema oscuro (Caso 8) ================= */
  {
    name: 'parser/tema-oscuro-legible', run: function (ctx, fx, T) {
      var doc = parse(ctx, fx.temaOscuro);
      var base = doc.background.base;
      doc.blocks.forEach(function (b, i) {
        (b.runs || []).forEach(function (r) {
          if (r.type === 'text' && r.color) {
            var fixed = ctx.NoteDoc.ensureLegible(r.color, base, doc.palette.text);
            T.ok('contraste bloque ' + i + ' (' + r.color + ' -> ' + fixed + ')',
              ctx.NoteDoc.contrastRatio(fixed, base) >= 3.0);
          }
        });
      });
    }
  },

  /* ================= TXT ================= */
  {
    name: 'txt/todas-las-fixtures', run: function (ctx, fx, T) {
      Object.keys(fx).forEach(function (k) {
        var text = ctx.TxtExporter.toText(parse(ctx, fx[k]));
        T.ok(k + ' no vacio', text.trim().length > 0, text.slice(0, 120));
      });
    }
  },
  {
    name: 'txt/estructura', run: function (ctx, fx, T) {
      var text = ctx.TxtExporter.toText(parse(ctx, fx.estructura));
      T.contains('titulo doc', text, 'Caso 2 Estructura');
      T.contains('h1 con ===', text, 'Titulo principal');
      T.contains('h2 con ##', text, '## Subtitulo');
      T.contains('h3 con ###', text, '### Subsubtitulo');
      T.contains('vineta', text, '• Viñeta HTML');
      T.contains('numerada', text, '1. Numerada uno');
      T.contains('checkbox', text, '[x] Elemento completado');
      T.contains('anidada indentada', text, '    • Elemento de lista nivel 1');
      T.notContains('sin simulacion de alineacion', text, '   Primer parrafo');
    }
  },
  {
    name: 'txt/tablas', run: function (ctx, fx, T) {
      var text = ctx.TxtExporter.toText(parse(ctx, fx.tablas));
      ['Magnitud', 'Valor', 'Unidad', 'Tension', '12', 'Corriente',
        'celda multilinea', 'Combinada 2x2', 'Fila 29'].forEach(function (s) {
        T.contains('celda: ' + s, text, s);
      });
      T.ok('rejilla ascii', text.indexOf('+') !== -1 && text.indexOf('|') !== -1);
    }
  },
  {
    name: 'txt/ecuaciones-e-imagenes', run: function (ctx, fx, T) {
      var eq = ctx.TxtExporter.toText(parse(ctx, fx.ecuaciones));
      T.contains('latex inline', eq, '$V = I \\cdot R$');
      T.contains('bloque abre', eq, '[ECUACIÓN]');
      T.contains('latex bloque', eq, '\\int_{0}^{\\infty}');
      T.contains('bloque cierra', eq, '[/ECUACIÓN]');
      var img = ctx.TxtExporter.toText(parse(ctx, fx.imagenes));
      ['pequena.webp', 'mediana.webp', 'enorme.webp', 'alta.webp',
        'sin-tamano.webp', 'no-existe.webp'].forEach(function (s) {
        T.contains('imagen: ' + s, img, s);
      });
      T.contains('caption', img, 'Pequena 120x90');
    }
  },
  {
    name: 'txt/combinado', run: function (ctx, fx, T) {
      var text = ctx.TxtExporter.toText(parse(ctx, fx.combinado));
      ['Documento completo', '## Seccion con formato', 'Primer elemento', 'Segundo elemento',
        '[x] Tercero completado', '[IMAGEN: combinada.webp]', 'Figura 1', 'Masa', '5 kg',
        '[ECUACIÓN]', '\\frac{d}{dx}', 'Nota antigua', 'https://es.wikipedia.org/wiki/Borges',
        '[AUDIO', 'nota.wav', '[VIDEO', 'pelicula.mp4'].forEach(function (s) {
        T.contains('combinado: ' + s, text, s);
      });
    }
  },
  {
    name: 'txt/diario', run: function (ctx, fx, T) {
      var text = ctx.TxtExporter.toText(parse(ctx, fx.diario));
      ['Reunion', '10:00', 'Comprar pan', '18:00', '[x]'].forEach(function (s) {
        T.contains('diario: ' + s, text, s);
      });
    }
  },

  /* ================= DOCX ================= */
  {
    name: 'docx/formato-editable', run: async function (ctx, fx, T) {
      var res = await ctx.DocxExporter.build(parse(ctx, fx.formato), prodDeps(ctx));
      var x = await unzipDocx(ctx, res.blob);
      T.contains('negrita', x.document, '<w:b/>');
      T.contains('cursiva', x.document, '<w:i/>');
      T.contains('subrayado', x.document, '<w:u ');
      T.contains('tachado', x.document, '<w:strike');
      T.contains('color rojo', x.document, '<w:color w:val="ff0000"');
      T.contains('resaltado', x.document, '<w:shd w:fill="ffff00"');
      T.contains('heading style', x.document, 'w:val="Heading2"');
    }
  },
  {
    name: 'docx/listas-reales', run: async function (ctx, fx, T) {
      var res = await ctx.DocxExporter.build(parse(ctx, fx.estructura), prodDeps(ctx));
      var x = await unzipDocx(ctx, res.blob);
      T.contains('numPr presente', x.document, '<w:numPr>');
      T.ok('numeracion decimal definida', !!x.numbering && x.numbering.indexOf('w:val="decimal"') !== -1);
      T.ok('niveles ordenados %1.', !!x.numbering && x.numbering.indexOf('%1.') !== -1);
      T.ok('vinetas definidas', !!x.numbering && x.numbering.indexOf('w:val="bullet"') !== -1);
      T.contains('checkbox', x.document, '☑');
    }
  },
  {
    name: 'docx/tablas-reales', run: async function (ctx, fx, T) {
      var res = await ctx.DocxExporter.build(parse(ctx, fx.tablas), prodDeps(ctx));
      var x = await unzipDocx(ctx, res.blob);
      var nTbl = (x.document.match(/<w:tbl>/g) || []).length;
      T.eq('4 tablas', nTbl, 4);
      T.contains('bordes', x.document, '<w:tblBorders>');
      T.contains('gridSpan/colspan', x.document, '<w:gridSpan');
      T.contains('vMerge/rowspan', x.document, '<w:vMerge');
      T.contains('celda', x.document, 'Corriente');
    }
  },
  {
    name: 'docx/imagenes-y-ecuaciones', run: async function (ctx, fx, T) {
      var res = await ctx.DocxExporter.build(parse(ctx, fx.combinado), prodDeps(ctx));
      var x = await unzipDocx(ctx, res.blob);
      T.ok('imagenes embebidas', x.media.length >= 2, x.media.join(','));
      T.contains('latex en descripcion', x.document, 'descr="\\frac{d}{dx} x^n = n x^{n-1}"');
      T.contains('hipervinculo externo', x.document, '<w:hyperlink');
      T.contains('audio referenciado', x.document, 'nota.wav');
      T.contains('video referenciado', x.document, 'pelicula.mp4');
    }
  },
  {
    name: 'docx/imagen-ausente-no-rompe', run: async function (ctx, fx, T) {
      var res = await ctx.DocxExporter.build(parse(ctx, fx.imagenes), prodDeps(ctx));
      var x = await unzipDocx(ctx, res.blob);
      T.contains('marcador imagen ausente', x.document, 'no-existe.webp');
      T.ok('warning registrado', res.warnings.some(function (w) { return w.indexOf('no-existe') !== -1; }),
        res.warnings.join(' | '));
    }
  },
  {
    name: 'docx/tema-oscuro-legible', run: async function (ctx, fx, T) {
      var res = await ctx.DocxExporter.build(parse(ctx, fx.temaOscuro), prodDeps(ctx));
      var x = await unzipDocx(ctx, res.blob);
      T.notContains('sin blanco puro', x.document, 'w:val="FFFFFF"');
    }
  },

  /* ================= PDF ================= */
  {
    name: 'pdf/todas-las-fixtures-generan', run: async function (ctx, fx, T) {
      for (var k of Object.keys(fx)) {
        var res = await ctx.PdfExporter.build(parse(ctx, fx[k]), prodDeps(ctx));
        var pdf = await ctx.PDFLib.PDFDocument.load(res.bytes);
        T.ok(k + ' pdf valido (' + pdf.getPageCount() + ' pag)', pdf.getPageCount() >= 1);
      }
    }
  },
  {
    name: 'pdf/paginacion', run: async function (ctx, fx, T) {
      var short = await ctx.PdfExporter.build(parse(ctx, fx.soloTexto), prodDeps(ctx));
      var p1 = await ctx.PDFLib.PDFDocument.load(short.bytes);
      T.eq('nota corta: 1 pagina', p1.getPageCount(), 1);
      var long = await ctx.PdfExporter.build(parse(ctx, fx.largo), prodDeps(ctx));
      var p2 = await ctx.PDFLib.PDFDocument.load(long.bytes);
      T.ok('documento largo: varias paginas', p2.getPageCount() > 2, 'pags=' + p2.getPageCount());
      var tabs = await ctx.PdfExporter.build(parse(ctx, fx.tablas), prodDeps(ctx));
      var p3 = await ctx.PDFLib.PDFDocument.load(tabs.bytes);
      T.ok('tabla 30 filas: varias paginas', p3.getPageCount() > 1, 'pags=' + p3.getPageCount());
    }
  },
  {
    name: 'pdf/contenido-y-limites', run: async function (ctx, fx, T) {
      var env = await realFontsAndCtx(ctx, fx.combinado, true);
      var pagesOps = drawAll(env.R, env.items, env.tableHeaders);
      var txt = pagesOps.map(drawnTexts).join('\n');
      /* Los segmentos son palabras: se verifica por palabra. */
      ['Documento', 'completo', 'negrita', 'cursiva', 'subrayado', 'Primer', 'elemento',
        'Masa', '5', 'kg', 'Nota', 'antigua'].forEach(function (s) {
        T.contains('dibuja: ' + s, txt, s);
      });
      allTextWithin(pagesOps, T, 'combinado');
      var nLines = pagesOps.reduce(function (a, o) { return a + o.drawLine.length; }, 0);
      T.ok('hay subrayados', nLines > 0);
      var nImg = pagesOps.reduce(function (a, o) { return a + o.drawImage.length; }, 0);
      T.ok('imagen + ecuacion dibujadas', nImg >= 2, 'imgs=' + nImg);
    }
  },
  {
    name: 'pdf/tablas-dibujan-bordes', run: async function (ctx, fx, T) {
      var env = await realFontsAndCtx(ctx, fx.tablas, true);
      var pagesOps = drawAll(env.R, env.items, env.tableHeaders);
      var txt = pagesOps.map(drawnTexts).join('\n');
      ['Magnitud', 'Tension', 'Corriente', 'Combinada', '2x2', 'Fila', '29'].forEach(function (s) {
        T.contains('celda: ' + s, txt, s);
      });
      var nRect = pagesOps.reduce(function (a, o) { return a + o.drawRectangle.length; }, 0);
      T.ok('rectangulos de tabla', nRect > 10, 'rects=' + nRect);
      T.ok('tabla grande pagina en varias paginas mock', pagesOps.length > 1, 'pags=' + pagesOps.length);
      allTextWithin(pagesOps, T, 'tablas');
    }
  },
  {
    name: 'pdf/glifos-sustitucion', run: async function (ctx, fx, T) {
      var env = await realFontsAndCtx(ctx, fx.caracteresRaros, false);
      var pagesOps = drawAll(env.R, env.items, env.tableHeaders);
      var txt = pagesOps.map(drawnTexts).join('\n');
      T.contains('flecha sustituida', txt, '->');
      T.contains('sumatoria sustituida', txt, 'Σ');
      T.notContains('sin tofu de emoji', txt, '😀');
    }
  },
  {
    name: 'pdf/tamano-archivo', run: async function (ctx, fx, T) {
      var res = await ctx.PdfExporter.build(parse(ctx, fx.formato), prodDeps(ctx));
      T.ok('fuentes subseteadas (<200KB)', res.bytes.length < 200 * 1024, 'bytes=' + res.bytes.length);
      var long = await ctx.PdfExporter.build(parse(ctx, fx.largo), prodDeps(ctx));
      T.ok('doc 10 paginas (<500KB)', long.bytes.length < 500 * 1024, 'bytes=' + long.bytes.length);
    }
  },
  {
    name: 'pdf/texto-extraible-e2e', run: async function (ctx, fx, T) {
      var hasPdftotext = false;
      try {
        require('child_process').execSync('which pdftotext', { stdio: 'ignore' });
        hasPdftotext = true;
      } catch (e) { /* entorno sin poppler: se omite */ }
      if (!hasPdftotext) { T.ok('pdftotext no disponible, omitido', true); return; }
      var res = await ctx.PdfExporter.build(parse(ctx, fx.combinado), prodDeps(ctx));
      var tmp = require('os').tmpdir() + '/mibabel-e2e-' + Date.now() + '.pdf';
      fs.writeFileSync(tmp, res.bytes);
      var text = require('child_process').execSync('pdftotext -layout ' + tmp + ' -').toString();
      try { fs.unlinkSync(tmp); } catch (e) { /* noop */ }
      ['Documento completo', 'negrita', 'Primer elemento', 'Masa', '5 kg',
        'Nota antigua', 'https://es.wikipedia.org/wiki/Borges',
        'Figura 1', '[AUDIO', 'nota.wav', '[VIDEO', 'pelicula.mp4',
        '->', '<=', '!=']
        .forEach(function (s) { T.contains('pdf contiene: ' + s, text, s); });
    }
  },
  {
    name: 'pdf/tema-oscuro', run: async function (ctx, fx, T) {
      var res = await ctx.PdfExporter.build(parse(ctx, fx.temaOscuro), prodDeps(ctx));
      T.ok('genera sin error', res.bytes.length > 1000);
      T.ok('sin warnings de perdida', !res.warnings.some(function (w) { return /omitid|no encontrada/i.test(w); }),
        res.warnings.join(' | '));
    }
  },

  /* ---------------- Dibujos (item de nota con modelo estructurado) ---------------- */
  {
    name: 'notedoc/dibujos-a-bloque-imagen', run: function (ctx, fx, T) {
      var doc = parse(ctx, fx.dibujos);
      var imgs = doc.blocks.filter(function (b) { return b.type === 'image'; });
      T.eq('dos dibujos con vista previa', imgs.length, 2, JSON.stringify(imgs));
      T.ok('marcados como drawing', imgs.every(function (b) { return b.drawing === true; }));
      T.eq('primer ref', imgs[0].ref, 'imagenes/dibujo-dibujoabc.webp');
      T.eq('primer ancho', imgs[0].width, 330);
      T.eq('primer alto', imgs[0].height, 440);
      T.eq('sin caption', imgs[0].caption, null);
      T.eq('segundo ancho', imgs[1].width, 2000);
      T.ok('el item sin preview se omite con warning',
        doc.warnings.some(function (w) { return w === 'dibujo sin vista previa'; }),
        doc.warnings.join(' | '));
      var texts = doc.blocks.filter(function (b) { return b.type === 'paragraph' || b.type === 'text'; });
      T.ok('texto antes conservado', doc.blocks.some(function (b) { return JSON.stringify(b).indexOf('Antes del dibujo') !== -1; }));
      T.ok('lista despues conservada', doc.blocks.some(function (b) { return b.type === 'list'; }), JSON.stringify(doc.blocks.map(function (b) { return b.type; })));
      T.ok('texto del bloque', texts.length >= 1);
    }
  },
  {
    name: 'txt/dibujos-marcador', run: function (ctx, fx, T) {
      var text = ctx.TxtExporter.toText(parse(ctx, fx.dibujos));
      T.ok('marcador presente', text.indexOf('[Dibujo]') !== -1, text);
      var n = (text.match(/\[Dibujo\]/g) || []).length;
      T.eq('dos marcadores (solo con preview)', n, 2, text);
      T.notContains('no usa etiqueta de imagen', text, '[IMAGEN: Dibujo]');
      T.contains('texto antes', text, 'Antes del dibujo');
      T.contains('lista despues', text, '• Después del dibujo');
    }
  },
  {
    name: 'docx/dibujos-emplbebidos', run: async function (ctx, fx, T) {
      var res = await ctx.DocxExporter.build(parse(ctx, fx.dibujos), prodDeps(ctx));
      var x = await unzipDocx(ctx, res.blob);
      T.eq('dos vistas previas embebidas', x.media.length, 2, x.media.join(','));
      T.contains('texto antes', x.document, 'Antes del dibujo');
      T.contains('lista despues', x.document, 'Después del dibujo');
      T.ok('sin avisos de imagen perdida', res.warnings.length === 0, res.warnings.join(' | '));
    }
  },
  {
    name: 'pdf/dibujos-emplbebidos', run: async function (ctx, fx, T) {
      var res = await ctx.PdfExporter.build(parse(ctx, fx.dibujos), prodDeps(ctx));
      var pdf = await ctx.PDFLib.PDFDocument.load(res.bytes);
      T.ok('pdf valido', pdf.getPageCount() >= 1);
      T.ok('sin avisos de imagen perdida', res.warnings.length === 0, res.warnings.join(' | '));
    }
  }
];
