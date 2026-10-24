# AGENTS.md

## Project

MiBabel is an offline Android notes app. The real app is vanilla HTML/CSS/JS in `www/`, wrapped by Capacitor; `android/` is the native shell. There is no framework, bundler, transpiler, or workspace setup.

## Commands

- `npm install`
- `npm test` — export + Markdown suites (`tests/run.js`).
- `node tests/run.js pdf` — run only suites whose name contains the filter (e.g. `pdf`, `markdown/`, `mdexporter/`).
- `node tests/readpos.js` — read-position suite; **not** included in `npm test`.
- After changing `www/`: `npx cap sync android`, then build/run with Android Studio (`npx cap open android`) or `android/gradlew`.
- No lint, formatter, typecheck, or dev-server script exists.

## Architecture

- `www/script.js` (huge) contains app state, rendering, i18n, diary/records/habits, boards, backup/import. Scripts load in a strict order via `defer` tags in `www/index.html`; register new scripts there.
- No ES modules: files use `var`, IIFEs, and browser globals (`window.X` / `global.X`). Keep ES5-compatible syntax for old Android WebViews (polyfills at the top of `script.js`).
- Media refs (`imagenes/<uuid>.webp`, `audios/`, `videos/`) go through `ImageManager` (Capacitor Filesystem under `DATA` when native, in-memory fallback in a browser). Only refs/metadata are stored in app state.
- Notes are `state.notes[].items[]` with raw contenteditable HTML. Export is note -> `www/export/note-doc.js` (`NoteDoc.parse`) -> PDF/DOCX/TXT/MD exporters. New item types or formatting must be handled in `NoteDoc`, every exporter, and tests.
- Drawing: `www/drawing/*` (engine, canvas, toolbar, editor, note/board bridges). Markdown: `www/markdown/markdown-engine.js`, sanitized with DOMPurify.
- Browser libraries are vendored in `www/lib/` and loaded by `index.html`, not imported from `node_modules`; update them manually.
- Native bridge: `MainActivity.java` exposes `AndroidDownloader` / `AndroidBridge` (`AppBridge.java`); exports use it to write into Android Downloads.

## Data and migrations

- All app data is a single `localStorage` key: `appnotas`.
- Backups are `.anbk` ZIPs with `manifest.json` (`formatVersion` currently 7), `notas.json`, `configuracion.json`, and media. `importData()` accepts versions 1–7.
- Schema changes require updating `exportData`, `importData`, and `load()` migrations together.
- UI strings live in `langData` for en/es/fr/pt/ru/de/it. `t(key)` falls back to the key, so missing translations render raw keys.

## Testing gotchas

- `tests/run.js` builds jsdom, stubs media (`ImageManager`, `ImageConverter`, `renderTextToCanvas`), loads `www/lib` bundles plus export modules. A new exporter must be registered in `loadModules`/`ctx` there and added to `tests/cases.js` or `tests/markdown.js`.
- `tests/readpos.js` extracts the block between `/* ==== READ-POSITION-START ==== */` and `/* ==== READ-POSITION-END ==== */`, plus the function named `save()`, from `www/script.js`. Keep those markers and names intact.
- Tests are the only automated verification; run both suites after changing `script.js`, export code, or Markdown handling.

## Android

- Capacitor: `appId com.aksk.notas`, `webDir www`. Android package `com.aksk.notas`, minSdk 24, target/compileSdk 36, Java 21.
- Version lives in `android/app/build.gradle` (`versionCode 16`, `versionName 1.0.0`); README version text may be stale.
- `android/app/src/main/assets/public/` is generated and gitignored; never edit it. Edit `www/` and sync.
- Release signing expects `android/app/key.properties` + `android/mibabel.keystore` (keystore is gitignored). Do not commit keystores or add credentials.

## Do not touch

- `.git_dañado/` (corrupt old repo backup) and `android.bak/` (stale Android backup) are ignored local backups. Do not edit, build, or copy from them.
