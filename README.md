# 📚 MiBabel

[svg](https://github.com/aksksoftware/MiBabel#-mibabel)

**MiBabel** es una aplicación de notas para Android inspirada en el concepto de *La Biblioteca de Babel*  de Jorge Luis Borges. Su objetivo es ofrecer un espacio donde organizar  conocimiento, ideas y material de estudio de forma sencilla, rápida y  completamente local.

## ✦ Características

MiBabel busca combinar la simplicidad de una aplicación de notas con herramientas que permitan organizar y trabajar con distintos tipos de información. 

### 📝 Notas

Permite crear y organizar notas para almacenar texto, información y material de estudio.

Las notas cuentan con diferentes herramientas de edición y personalización, entre ellas:

* Texto con diferentes colores.
* Subrayado
* Resaltado
* Cursiva
* Negrita
* Imágenes
* Videos
* Audios
* Tablas
* Fórmulas LaTeX
* Fondos con textura de papel.
* Papel blanco y amarillo.
* Fondos lisos.
* Fondos rayados.
* Fondos cuadriculados.
* Fondos punteados.
* Adaptación automática del contenido al cambiar la orientación de la pantalla.
* Búsqueda de contenido dentro de las notas.

### 🔎 Búsqueda

MiBabel incorpora un sistema de búsqueda para encontrar rápidamente contenido dentro de las notas.

La búsqueda permite localizar coincidencias y desplazarse directamente hasta ellas, facilitando la navegación en documentos extensos.

### 🗂️ Tableros

Los tableros permiten reunir diferentes elementos en un mismo espacio para organizar material de forma más visual.

Pueden utilizarse para combinar contenido y recursos relacionados con un tema determinado.

Es posible crear enlaces para conectar tableros con notas y notas con notas

#### 🎥 Videos

Los videos de los tableros utilizan un sistema de referencias para evitar cargar innecesariamente todo el contenido multimedia en memoria.

Esto permite trabajar de manera más eficiente con videos pesados y reduce los problemas de rendimiento que pueden producirse al intentar reproducirlos directamente dentro del tablero.

### 🃏 Tarjetas de estudio

MiBabel incorpora un sistema de **tarjetas de estudio** pensado para facilitar la memorización y el repaso de conceptos.

Las tarjetas permiten crear conjuntos de preguntas y respuestas para estudiar un tema determinado. Cada conjunto puede organizarse de acuerdo con la materia, tema o contenido que se quiera aprender.

El sistema está pensado especialmente para utilizar el método de **recuperación activa (active recall)**: en lugar de limitarse a releer información, el usuario debe intentar recordar la respuesta antes de consultarla.

Las tarjetas pueden utilizarse para estudiar vocabulario, definiciones, fórmulas, conceptos científicos, fechas históricas, idiomas y cualquier otro contenido que pueda dividirse en preguntas y respuestas.

Los conjuntos de tarjetas forman parte de las herramientas de estudio de MiBabel y pueden convivir con las notas, registros y demás sistemas de organización de la aplicación.

### 🧩 Registros

MiBabel cuenta con un sistema de registros que permite almacenar diferentes tipos de datos mediante una sintaxis propia. 

Por ejemplo:

```text
@Registro{
    var1 = "hola mundo";
    var2 = 1256;
    var3 = 45,67;
    var4 = false;
}
```

La sintaxis está diseñada para ser legible tanto en una sola línea como distribuida en varias líneas.

Los datos no solo quedan guardados en Registros, si no que se los puede invocar en las notas normales mediate los siguiente comandos:
 @MiRegistro para mostrar el historial completo de todo el registro
 @MiRegistro/variable para mostrar todo el historial de una variable
 @MiRegistro/variable[YYYY-MM-DD] para una fecha específica
 @MiRegistro/variable[YYYY-MM-DD:YYYY-MM-DD] para un intervalo de tiempo

### 📔 Diario

MiBabel incorpora un **Diario** pensado para registrar y consultar acontecimientos, pensamientos, actividades o cualquier tipo de información asociada a una fecha concreta.

El Diario utiliza un calendario organizado por días, permitiendo acceder rápidamente a las notas correspondientes a cada fecha. Cada día puede contener múltiples registros, que se presentan de forma compacta para facilitar la navegación.

Una de las características principales del Diario es su integración con el **sistema de registros de MiBabel**. Los registros permiten almacenar datos estructurados asociados a una determinada fecha, haciendo posible que el Diario no sea solamente una colección de textos, sino también una herramienta para guardar y consultar información.

De esta manera, los registros pueden utilizarse para llevar un seguimiento de diferentes actividades o valores a lo largo del tiempo. 

El sistema está diseñado para que un mismo día pueda contener diferentes notas y registros, permitiendo combinar **texto libre** con **información estructurada** dentro de una misma fecha.

En lugar de tratar el Diario simplemente como un calendario, MiBabel busca convertirlo en un **registro cronológico de la información personal del usuario**.

### 🔄 Hábitos

MiBabel incorpora un sistema de **Hábitos** orientado al seguimiento de actividades que se realizan de manera recurrente.

Cada hábito puede contar con un **objetivo**, un contador de progreso y un historial de cumplimiento. Esto permite registrar cuánto se ha avanzado y consultar la evolución de una actividad a lo largo del tiempo.

El sistema también permite llevar un **registro de rachas (streaks)**, mostrando la continuidad con la que se cumple un hábito. Las rachas pueden reiniciarse cuando se interrumpe el cumplimiento, manteniendo un historial independiente de los períodos anteriores.

Los hábitos están pensados para actividades de distinta naturaleza: estudiar, leer determinada cantidad de páginas, realizar ejercicio, practicar un idioma o cualquier otra actividad que pueda medirse mediante un objetivo.

Además, el sistema está relacionado con la filosofía de **registros de MiBabel**: en lugar de limitarse a indicar si una actividad fue realizada o no, permite conservar información cuantificable sobre su progreso y evolución a lo largo del tiempo.

### 📤 Exportación

Las notas pueden exportarse a diferentes formatos para facilitar su almacenamiento y utilización fuera de MiBabel.

Actualmente se contemplan:

* PDF
* DOCX
* TXT

### 📱 Funcionamiento local

MiBabel está diseñado para trabajar principalmente de manera local. Las notas y su contenido permanecen en el dispositivo, sin depender de un servicio externo para su funcionamiento básico.

Esto permite utilizar la aplicación sin necesidad de mantener una conexión permanente a Internet.

---

## 🎨 Filosofía de diseño

MiBabel busca mantener una estética inspirada en los libros, cuadernos y documentos tradicionales.

La interfaz utiliza un estilo sobrio y de inspiración editorial, con márgenes amplios y diferentes fondos de papel para que las notas puedan sentirse más cercanas a un documento físico.

La idea no es convertir la aplicación en un simple editor de texto, sino crear un espacio personal para almacenar conocimiento.

---

## 📖 La Biblioteca de Babel

El nombre **MiBabel** hace referencia al cuento *La Biblioteca de Babel* de Jorge Luis Borges.

En el cuento, la biblioteca contiene todas las posibles combinaciones de caracteres. MiBabel toma esa idea como inspiración, pero la lleva a un contexto mucho más práctico: en lugar de una biblioteca infinita de textos posibles, busca ser una pequeña biblioteca personal donde el usuario pueda construir y organizar su propio conocimiento.

---

## 🛠️ Tecnologías

MiBabel está desarrollado utilizando tecnologías web y empaquetado como aplicación nativa para Android mediante Capacitor.

### Tecnologías principales

* HTML
* CSS
* JavaScript
* Capacitor
* Android

El proyecto también utiliza diferentes herramientas y librerías para trabajar con archivos y documentos, incluyendo:

* PDF
* DOCX
* Sistema de archivos local

---

## 📦 Instalación y desarrollo

### Requisitos

Para trabajar con el código fuente se recomienda disponer de:

* Node.js
* npm
* Android Studio
* Android SDK
* JDK
* Capacitor CLI

### Clonar el repositorio

```bash
git clone https://github.com/aksksoftware/MiBabel.git
cd MiBabel
```

### Instalar dependencias

```bash
npm install
```

### Sincronizar con Android

```bash
npx cap sync android
```

### Abrir el proyecto en Android Studio

```bash
npx cap open android
```

Desde Android Studio es posible compilar y ejecutar MiBabel en un dispositivo Android o en un emulador.

---

## 🗃️ Estructura general

El proyecto está dividido principalmente entre el contenido web de la aplicación y el proyecto Android generado mediante Capacitor.

```text
MiBabel/
├── www/              # Aplicación web
├── android/          # Proyecto Android
├── package.json
├── capacitor.config.*
└── ...
```

---

## 🚀 Versiones

### MiBabel 1.6.0

La versión 1.6.0 incorpora varias mejoras y nuevas funciones:

* Mejoras en el rendimiento de los videos de los tableros.
* Nuevo sistema de asignación de registros.
* Corrección del espacio vacío sobre el header.
* Texto con color.
* Nuevos fondos con textura de papel.
* Fondos lisos, rayados, cuadriculados y punteados.
* Sistema de búsqueda dentro de las notas.
* Mejoras en la adaptación del contenido.

---

## 🗺️ Próximas funciones

MiBabel continúa en desarrollo. Algunas de las funciones contempladas para futuras versiones incluyen:

* Gráficos para las variables de los registros.
* Sistema de anotación de partidas de ajedrez.
* Agregar una intro personalizada para cuando se inicie la aplicación.
* Agregar un resumen a fin de año que cuente acerca de cómo y cuanto usaste MiBabel, y que se pueda compartir.


---

## 🤝 Contribuciones

MiBabel es un proyecto en desarrollo.

Si encontrás un error, tenés una sugerencia o querés proponer una mejora, podés abrir un **Issue** en el repositorio.

Las contribuciones, ideas y reportes de errores son bienvenidos.

---

## 📄 Licencia

La información sobre la licencia del proyecto se incorporará en esta sección.

---

## 👤 Autor

**aksksoftware**

GitHub:
https://github.com/aksksoftware/MiBabel

---

> *«El universo (que otros llaman la Biblioteca) se compone de un número indefinido, y tal vez infinito, de galerías hexagonales...»*

— Jorge Luis Borges, *La Biblioteca de Babel*
