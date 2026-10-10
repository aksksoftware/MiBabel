/* Notas de prueba que reproducen el modelo real de MiBabel.
 *
 * Formas usadas aqui verificadas contra www/script.js:
 *   - item.type: 'text' | 'list' | (sin type => lista) | 'image' |
 *     'audio' | 'video' | 'table'
 *   - item.text: HTML crudo de contenteditable (execCommand produce
 *     <b>/<i>/<u>, style="color: rgb(...)", <ul>/<ol>, style="text-align")
 *   - LaTeX: '$$...$$' bloque y '$...$' inline
 *   - Enlaces: '[(destino)]' nota,  '[{url}]' externo
 *   - Tabla: cells[] plano con {text,rowspan,colspan} y null en ranuras cubiertas
 *   - Imagen: {src:'imagenes/<uuid>.webp', width, height, caption}
 *   - Dibujo: {type:'drawing', drawingId, previewRef, drawing:{version,width,height,background,strokes}}
 *   - Fondo: {color:'default'|'white'|'yellow', design:'none'|'lined'|'grid'|'dotted'}
 */
'use strict';

function item(id, type, text, extra) {
  var o = { id: id, text: text };
  if (type) o.type = type;
  if (extra) for (var k in extra) o[k] = extra[k];
  return o;
}

module.exports = {

  /* ---------------- Caso 1: texto con formato ---------------- */
  formato: {
    id: 1,
    title: 'Caso 1 Texto',
    items: [
      item(11, 'text', 'Texto normal'),
      item(12, 'text', '<b>Texto en negrita</b>'),
      item(13, 'text', '<i>Texto en cursiva</i>'),
      item(14, 'text', '<u>Texto subrayado</u>'),
      item(15, 'text', '<b><i><u>Negrita + cursiva + subrayado</u></i></b>'),
      item(16, 'text', '<s>Texto tachado</s> y <del>borrado</del>'),
      item(17, 'text', '<span style="color: rgb(255,0,0);">Texto rojo</span> y ' +
        '<span style="color: #0000ff; background-color: rgb(255,255,0);">azul resaltado</span>'),
      item(18, 'text', '<span style="font-size: 20px;">Texto grande</span> y ' +
        '<span style="font-size: 9px;">texto pequeno</span>'),
      item(19, 'text', '<b style="font-size: 20px;">Titulo pegado en negrita</b>'),
      item(20, 'text', '<span style="font-weight: 700; font-size: 24px;">Subtitulo pegado</span>'),
      item(21, 'text', '<h2>Encabezado h2 pegado</h2>'),
      item(22, 'text', '<blockquote>Cita textual</blockquote>'),
      item(23, 'text', '<pre>codigo en monoespaciado</pre>')
    ],
    background: { color: 'default', design: 'none' }
  },

  /* ---------------- Caso 2: estructura ---------------- */
  estructura: {
    id: 2,
    title: 'Caso 2 Estructura',
    items: [
      item(31, 'text', '<h1>Titulo principal</h1>'),
      item(32, 'text', '<h2>Subtitulo</h2>'),
      item(33, 'text', '<h3>Subsubtitulo</h3>'),
      item(34, 'text', 'Primer parrafo.'),
      item(35, 'text', 'Parrafo centrado', { _align: 'center' }),
      item(36, 'list', 'Elemento de lista nivel 0', { level: 0 }),
      item(37, 'list', 'Elemento de lista nivel 1', { level: 1 }),
      item(38, 'list', 'Elemento de lista nivel 2', { level: 2 }),
      item(39, 'list', 'Elemento completado', { level: 0, checked: true }),
      item(40, 'list', 'Otro elemento', { level: 0 }),
      /* Sin type => lista (compatibilidad hacia atras) */
      { id: 41, text: 'Item sin type heredado', level: 0, checked: false },
      item(42, 'text', '<ul><li>Viñeta HTML</li><li>Segunda viñeta</li></ul>'),
      item(43, 'text', '<ol><li>Numerada uno</li><li>Numerada dos</li></ol>'),
      item(44, 'text', 'Linea uno<br>Linea dos<br>Linea tres'),
      item(45, 'text', 'Parrafo con <div style="text-align: center;">alineacion centrada</div> y <div style="text-align: right;">derecha</div> y <div style="text-align: justify;">justificado largo que necesita varias lineas para poder comprobar que eljustificado se aplica de verdad en el PDF final</div>')
    ],
    background: { color: 'default', design: 'none' }
  },

  /* ---------------- Caso 3: tablas ---------------- */
  tablas: {
    id: 3,
    title: 'Caso 3 Tablas',
    items: [
      item(51, 'text', 'Tabla pequena:'),
      {
        id: 52, type: 'table', rows: 3, cols: 3,
        cells: [
          { text: '<b>Magnitud</b>', rowspan: 1, colspan: 1 },
          { text: '<b>Valor</b>', rowspan: 1, colspan: 1 },
          { text: '<b>Unidad</b>', rowspan: 1, colspan: 1 },
          { text: 'Tension', rowspan: 1, colspan: 1 },
          { text: '12', rowspan: 1, colspan: 1 },
          { text: 'V', rowspan: 1, colspan: 1 },
          { text: 'Corriente', rowspan: 1, colspan: 1 },
          { text: '2', rowspan: 1, colspan: 1 },
          { text: 'A', rowspan: 1, colspan: 1 }
        ]
      },
      item(53, 'text', 'Tabla con formato, celdas vacias y multilinea:'),
      {
        id: 54, type: 'table', rows: 4, cols: 4, align: 'center',
        cells: [
          { text: '<b><u>Encabezado A</u></b>', rowspan: 1, colspan: 2 },
          { text: '<b>Encabezado B</b>', rowspan: 1, colspan: 2 },
          { text: '<i>Fila 2 col 1</i>', rowspan: 1, colspan: 1 },
          { text: '<span style="color: rgb(0,128,0);">verde</span>', rowspan: 1, colspan: 1 },
          { text: '', rowspan: 1, colspan: 1 },
          { text: 'celda<br>multilinea<br>con tres lineas', rowspan: 1, colspan: 1 },
          { text: 'Fila 3 col 1', rowspan: 1, colspan: 1 },
          { text: 'F3C2', rowspan: 1, colspan: 1 },
          { text: 'F3C3', rowspan: 1, colspan: 1 },
          { text: 'F3C4', rowspan: 1, colspan: 1 },
          { text: 'Fila 4 col 1', rowspan: 1, colspan: 1 },
          { text: 'F4C2', rowspan: 1, colspan: 1 },
          { text: '', rowspan: 1, colspan: 1 },
          { text: 'F4C4', rowspan: 1, colspan: 1 }
        ]
      },
      item(55, 'text', 'Tabla con celdas combinadas:'),
      {
        id: 56, type: 'table', rows: 3, cols: 3,
        cells: [
          { text: '<b>Combinada 2x2</b>', rowspan: 2, colspan: 2 },
          null,
          { text: 'B1', rowspan: 1, colspan: 1 },
          null,
          { text: 'B2', rowspan: 1, colspan: 1 },
          { text: 'C1', rowspan: 1, colspan: 1 },
          { text: 'C2', rowspan: 1, colspan: 1 },
          { text: 'C3', rowspan: 1, colspan: 1 }
        ]
      },
      item(57, 'text', 'Tabla grande (30 filas) para forzar salto de pagina:'),
      (function () {
        var cells = [];
        for (var r = 0; r < 30; r++) {
          cells.push({ text: r === 0 ? '<b>Fila ' + r + '</b>' : 'Fila ' + r, rowspan: 1, colspan: 1 });
          cells.push({ text: 'Columna B valor ' + r * 7, rowspan: 1, colspan: 1 });
          cells.push({ text: 'Columna C ' + (r % 2 ? 'par' : 'impar'), rowspan: 1, colspan: 1 });
        }
        return { id: 58, type: 'table', rows: 30, cols: 3, cells: cells };
      })()
    ],
    background: { color: 'default', design: 'none' }
  },

  /* ---------------- Caso 4: imagenes ---------------- */
  imagenes: {
    id: 4,
    title: 'Caso 4 Imagenes',
    items: [
      item(61, 'text', 'Imagen pequena:'),
      { id: 62, type: 'image', src: 'imagenes/pequena.webp', width: 120, height: 90, caption: 'Pequena 120x90' },
      item(63, 'text', 'Imagen mediana:'),
      { id: 64, type: 'image', src: 'imagenes/mediana.webp', width: 480, height: 320, caption: '<b>Mediana</b> con <i>caption</i> en negrita y cursiva' },
      item(65, 'text', 'Imagen enorme que excede el ancho util de la pagina (3000x1800):'),
      { id: 66, type: 'image', src: 'imagenes/enorme.webp', width: 3000, height: 1800, caption: 'Enorme 3000x1800' },
      item(67, 'text', 'Imagen alta que no cabe en el resto de la pagina (600x2400):'),
      { id: 68, type: 'image', src: 'imagenes/alta.webp', width: 600, height: 2400, caption: 'Alta 600x2400' },
      item(69, 'text', 'Imagen sin dimensiones declaradas:'),
      { id: 70, type: 'image', src: 'imagenes/sin-tamano.webp', width: 0, height: 0, caption: 'Sin tamano' },
      item(71, 'text', 'Imagen ausente en disco (debe degradarse sin romper):'),
      { id: 72, type: 'image', src: 'roto/no-existe.webp', width: 200, height: 150, caption: 'Ausente' }
    ],
    background: { color: 'default', design: 'none' }
  },

  /* ---------------- Caso 5: ecuaciones ---------------- */
  ecuaciones: {
    id: 5,
    title: 'Caso 5 Ecuaciones',
    items: [
      item(81, 'text', 'Ecuacion inline en una frase: la ley de Ohm es $V = I \\cdot R$ hoy.'),
      item(82, 'text', 'Varias inline: $a^2 + b^2 = c^2$ y $\\frac{1}{2}mv^2$ junto a $E = mc^2$.'),
      item(83, 'text', 'Ecuacion de bloque:'),
      item(84, 'text', '$$\n\\int_{0}^{\\infty} e^{-x^2} dx = \\frac{\\sqrt{\\pi}}{2}\n$$'),
      item(85, 'text', 'Segunda de bloque:'),
      item(86, 'text', '$$\n\\sum_{i=1}^{n} i = \\frac{n(n+1)}{2}\n$$'),
      item(87, 'text', 'Ecuacion con caracteres fuera del juego de la fuente: $$\\forall x \\in \\mathbb{R}, x^2 \\ge 0 \\Rightarrow \\sqrt{x^2} = |x|$$'),
      item(88, 'text', 'Acentos y simbolos: ñ á é í ó ú ü ¡¿ ° ± × ÷ · Ω π € — “comillas”'),
      item(89, 'text', 'Ciclos: circo, ritmo, mayor, llaves {} y parentesis ().'),
      item(90, 'text', 'Texto con $ y $ signos de moneda: pago $5 y luego $10.')
    ],
    background: { color: 'default', design: 'none' }
  },

  /* ---------------- Caso 6: documento largo ---------------- */
  largo: (function () {
    var items = [item(101, 'text', '<h1>Informe largo</h1>')];
    for (var i = 0; i < 120; i++) {
      items.push(item(200 + i, 'text',
        '<b>Seccion ' + (i + 1) + '.</b> Lorem ipsum dolor sit amet, consectetur ' +
        'adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna ' +
        'aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris ' +
        'nisi ut aliquip ex ea commodo consequat. Consequat ' + i + '.'));
      if (i % 5 === 0) items.push(item(400 + i, 'list', 'Punto ' + (i + 1), { level: i % 10 === 0 ? 1 : 0 }));
    }
    return { id: 6, title: 'Caso 6 Documento largo', items: items, background: { color: 'default', design: 'none' } };
  })(),

  /* ---------------- Caso 7: nota antigua ---------------- */
  /* Formas de versiones previas: sin background, sin type en items,
   * cover como data URL, item sin text, cells sin rowspan/colspan,
   * video con src en vez de ref, source unknown. */
  antiguo: {
    id: 7,
    title: 'Nota antigua',
    /* background ausente */
    /* cover ausente */
    items: [
      { id: 111, text: 'Texto plano sin formato' },
      { id: 112, text: '', level: 0 },
      { id: 113, type: 'list', text: 'Lista antigua', level: 0 },
      { id: 114, type: 'list', text: 'Lista antigua anidada', level: 2, checked: true },
      { id: 115, text: '<B>NEGRITA EN MAYUSCULAS</B> <FONT COLOR="#FF0000" SIZE="5">color y tamano antiguos</FONT>' },
      { id: 116, text: '<div style="text-align:center">centrado antiguo</div>' },
      { id: 117, type: 'table', rows: 2, cols: 2, cells: [
        { text: 'A' }, { text: 'B' }, { text: 'C' }, { text: 'D' }
      ] },
      { id: 118, type: 'video', src: 'videos/viejo.mp4' },
      { id: 119, type: 'audio', ref: 'audios/viejo.m4a' },
      { id: 120, type: 'desconocido', text: 'tipo desconocido que no debe perderse' },
      { id: 121, type: 'image', src: 'imagenes/ Antigua.webp', width: 100, height: 100 },
      { id: 122, text: 'Ecuacion antigua $$\\frac{a}{b}$$' },
      { id: 123, type: 'table', rows: 2, cols: 2, cells: null },
      { id: 124, text: null },
      { id: 125, text: '$$' }
    ]
  },

  /* ---------------- Caso 8: tema oscuro ---------------- */
  /* Colores que el usuario pudo elegir en tema oscuro; algunos son
   * ilegibles sobre papel blanco y el exportador debe corregirlos. */
  temaOscuro: {
    id: 8,
    title: 'Caso 8 Tema oscuro',
    items: [
      item(131, 'text', 'Texto normal (debe ser oscuro, no blanco)'),
      item(132, 'text', '<span style="color: rgb(255,255,255);">Blanco sobre papel blanco</span>'),
      item(133, 'text', '<span style="color: rgb(255,215,0);">Amarillo sobre papel blanco</span>'),
      item(134, 'text', '<span style="color: rgb(0,0,0);">Negro explicito</span>'),
      item(135, 'text', '<span style="background-color: rgb(255,255,255); color: rgb(255,255,255);">Blanco sobre blanco</span>'),
      item(136, 'text', '<b style="color: rgb(255,255,255);">Negrita blanca</b>')
    ],
    background: { color: 'yellow', design: 'lined' }
  },

  fondos: {
    id: 9,
    title: 'Fondos de papel',
    items: [
      item(141, 'text', 'Papel blanco con renglones.'),
      item(142, 'list', 'Elemento sobre renglones', { level: 0 })
    ],
    background: { color: 'white', design: 'lined' }
  },

  /* ---------------- Caso 9: contenido combinado ---------------- */
  combinado: {
    id: 10,
    title: 'Caso 9 Contenido combinado',
    items: [
      item(151, 'text', '<h1>Documento completo</h1>'),
      item(152, 'text', '<h2>Seccion con formato</h2>'),
      item(153, 'text', 'Texto con <b>negrita</b>, <i>cursiva</i>, <u>subrayado</u>, ' +
        '<b><i><u>las tres</u></i></b> y <s>tachado</s> junto a ' +
        '<span style="color: rgb(200,30,30);">color</span> y ' +
        '<span style="background-color: rgb(255,240,100);">resaltado</span>.'),
      item(154, 'text', 'Ecuacion inline $E = mc^2$ dentro del parrafo.'),
      item(155, 'list', 'Primer elemento', { level: 0 }),
      item(156, 'list', 'Segundo elemento', { level: 1 }),
      item(157, 'list', 'Tercero completado', { level: 0, checked: true }),
      { id: 158, type: 'image', src: 'imagenes/combinada.webp', width: 400, height: 260, caption: 'Figura 1' },
      item(159, 'text', 'Tabla tras la imagen:'),
      {
        id: 160, type: 'table', rows: 2, cols: 2,
        cells: [
          { text: '<b>Dato</b>', rowspan: 1, colspan: 1 },
          { text: '<b>Medida</b>', rowspan: 1, colspan: 1 },
          { text: 'Masa', rowspan: 1, colspan: 1 },
          { text: '5 kg', rowspan: 1, colspan: 1 }
        ]
      },
      item(161, 'text', 'Ecuacion de bloque tras la tabla:'),
      item(162, 'text', '$$\n\\frac{d}{dx} x^n = n x^{n-1}\n$$'),
      item(163, 'text', 'Texto final con enlace a otra nota [(Nota antigua)] y externo ' +
        '[{https://es.wikipedia.org/wiki/Borges}] y simbolos → ≤ ≠ √ ∑ ∞ ° µ Ω.'),
      { id: 164, type: 'audio', ref: 'audios/nota.wav', name: 'nota.wav', size: 2048, mimeType: 'audio/wav' },
      { id: 165, type: 'video', ref: 'videos/pelicula.mp4', mode: 'file', name: 'pelicula.mp4', size: 10485760, mimeType: 'video/mp4' }
    ],
    background: { color: 'white', design: 'grid' }
  },

  /* ---------------- Caso: dibujos (item de nota con modelo estructurado) ---------------- */
  /* Forma real de www/script.js:
   *   {id, type:'drawing', drawingId, previewRef:'imagenes/dibujo-<drawingId>.webp',
   *    drawing:{version,width,height,background:{type},strokes}}
   * El exportador rasteriza `previewRef`; un item sin previewRef se omite
   * con warning en vez de romper el documento. */
  dibujos: {
    id: 30,
    title: 'Caso 30 Dibujos',
    items: [
      item(301, 'text', 'Antes del dibujo'),
      {
        id: 302,
        type: 'drawing',
        drawingId: 'dibujoabc',
        previewRef: 'imagenes/dibujo-dibujoabc.webp',
        drawing: {
          version: 1,
          width: 330,
          height: 440,
          background: { type: 'grid' },
          strokes: [
            {
              tool: 'pencil', color: '#e74c3c', size: 4, opacity: 1, blend: 'source-over',
              x0: 10, y0: 10, pts: [[10, 10], [50, 60], [90, 20]], fill: null
            }
          ],
          createdAt: 1700000000000,
          updatedAt: 1700000001000
        }
      },
      item(303, 'list', 'Después del dibujo', { level: 0 }),
      {
        id: 304,
        type: 'drawing',
        drawingId: 'sinprev',
        drawing: { version: 1, width: 300, height: 300, background: { type: 'solid' }, strokes: [] }
      },
      {
        id: 305,
        type: 'drawing',
        drawingId: 'ancho',
        previewRef: 'imagenes/dibujo-ancho.webp',
        drawing: { version: 1, width: 2000, height: 500, background: { type: 'lined' }, strokes: [] }
      }
    ],
    background: { color: 'default', design: 'none' }
  },

  /* ---------------- Casos limite adicionales ---------------- */
  vacia: { id: 11, title: 'Nota vacia', items: [] },

  soloTexto: {
    id: 12, title: 'Solo texto', items: [item(171, 'text', 'Una sola linea de texto.')]
  },

  nombreWeird: {
    id: 13,
    title: '  Título/Con:caracteres\\inválidos*?<>|"  ',
    items: [item(181, 'text', 'Contenido.')]
  },

  sinTitulo: {
    id: 14, title: '', items: [item(191, 'text', 'Nota sin titulo.')]
  },

  caracteresRaros: {
    id: 15,
    title: 'Caracteres raros',
    items: [
      item(201, 'text', 'Emoji: 😀🎉 y simbolos: ☀♠♥♦♣→←↔↑↓✓✗'),
      item(202, 'text', 'CJK: 日本語中文한국어'),
      item(203, 'text', 'RTL: مرحبا שלום'),
      item(204, 'text', ' mathematicos: ∑∫√≈≠≤≥∅∈∞πΩµ'),
      item(205, 'text', 'Comillas “curvas” y «angulares» y — raya – menos'),
      item(206, 'text', 'Tablas y saltos \\n\\r\\n literales')
    ]
  },

  tablaGrandeAnidada: {
    id: 16,
    title: 'Tabla extrema',
    items: [
      {
        id: 211, type: 'table', rows: 12, cols: 6,
        cells: (function () {
          var cells = [];
          for (var r = 0; r < 12; r++) {
            for (var c = 0; c < 6; c++) {
              cells.push({
                text: (r === 0 ? '<b>' : '') + 'R' + r + 'C' + c + (r === 0 ? '</b>' : ''),
                rowspan: 1, colspan: 1
              });
            }
          }
          return cells;
        })()
      }
    ]
  },

  htmlRaro: {
    id: 17,
    title: 'HTML inesperado',
    items: [
      item(221, 'text', '<div><p>Anidado sin cerrar</div>'),
      item(222, 'text', '<span style="font-size:huge">tamano raro</span>'),
      item(223, 'text', '<span style="color:rgb(1,2)">color malformado</span>'),
      item(224, 'text', '<table><tr><td>tabla html anidada</td></tr></table>'),
      item(225, 'text', '<script>alert(1)</script>texto tras script'),
      item(226, 'text', '<img src="imagenes/inline.webp" width="80" height="60" alt="inline">'),
      item(227, 'text', '<a href="https://ejemplo.com">enlace</a> y <a>sin href</a>'),
      item(228, 'text', '&lt;escapado&gt; &amp; entidades &nbsp; espacios')
    ]
  },

  diario: {
    id: 18,
    title: '2024-3-15',
    diary: true,
    diaryDate: '2024-3-15',
    items: [item(231, 'text', 'Entrada del diario con $x^2$ y una lista:'), item(232, 'list', 'Tarea hecha', { level: 0 })],
    events: [{ uuid: 'e1', title: 'Reunion', time: '10:00' }],
    tasks: [{ uuid: 't1', title: 'Comprar pan', time: '18:00', status: 'completed' }],
    background: { color: 'yellow', design: 'dotted' }
  }
};
