---
description: Exporta el contenido de la Command Station a OneDrive (solo lectura; no modifica nada en la estación)
argument-hint: (sin argumentos)
---

Exporta una copia legible de la Command Station (`https://claude.ai/artifact/GcprRC86Vef6t6UApE7evC`) a OneDrive, para que el usuario tenga todo el contenido fuera de claude.ai. Usa la herramienta Artifact, acciones `read_db` y `read_asset`, **nunca** `write_db` ni `upload_asset`/`delete_asset` sobre ese enlace — este comando es de solo lectura sobre la Command Station. Las únicas escrituras ocurren en el sistema de archivos local (OneDrive).

**Carpeta de destino (fija, confirmada con el usuario el 2026-10-06):**
`~/Library/CloudStorage/OneDrive-Fiery,LLC/Inèdit Command Station/`
Si esa ruta no existe cuando se ejecute este comando, detente y pregunta — no asumas otra carpeta de OneDrive ni la crees en un sitio distinto (hay varias carpetas `OneDrive-*` sincronizadas en este Mac; `OneDrive-Fiery,LLC` fue la elegida, no `OneDrive-Fiery,LLC(2)` ni las de `ElectronicsforImaging,Inc`).

Dentro de esa carpeta, la estructura es:
```
Contenidos/<carpeta>/…        (colecciones "content" + "folders")
Calendario/calendario.md
Calendario/diseños/…
Notas de versión/…            (colección "releases", HTML EN + ES)
Portal/<sección>/…            (colección "library")
Portal/enlaces.md
_Archivo/…                    (piezas borradas o movidas en la estación; nunca se borran aquí)
_meta/manifest.json           (bookkeeping interno: no es contenido, no lo muestres como entregable)
```

## 0. Preparación

1. Comprueba que la carpeta de destino existe (`ls`); si no, detente y pregunta.
2. Lee `_meta/manifest.json` si existe (primera vez: no existe, trátalo como `{}` con todas las subclaves vacías). Este archivo es la única forma de saber qué se exportó la vez anterior y con qué `updatedAt`; sin él no puedes decidir qué saltar ni qué archivar.
3. Lee con `read_db` (acción `list`, paginando con `query.cursor` si hay `next_cursor`) las 5 colecciones: `content`, `folders`, `items`, `releases`, `library`. Usa `out_dir` apuntando a tu scratchpad si el volumen es alto.

**Nombres de archivo:** legibles, derivados del `title`/`name` del documento. Sustituye `/ \ : * ? " < > |` y caracteres de control por un espacio o guión; colapsa espacios repetidos; recorta a 120 caracteres. No transliteres acentos ni emoji del título (son legibles), pero si el título queda vacío usa "Sin título" (contenidos) o el `id` del documento como última salida.

**Sincronización incremental (regla general para las 4 secciones con archivo por documento — Contenidos, Notas de versión, Portal; Calendario es un único archivo que siempre se regenera entero):**
- Para cada documento, calcula su ruta correcta actual (carpeta/nombre según las reglas de cada sección). Compara con lo que dice el manifiesto:
  - Si el documento no estaba en el manifiesto → es nuevo, créalo.
  - Si estaba con la misma ruta y el mismo `updatedAt` → no toques nada (ni el `.md`/HTML ni el archivo adjunto): cuenta como "sin cambios", no como copiado.
  - Si estaba con la misma ruta pero `updatedAt` distinto → sobrescribe el contenido en esa misma ruta.
  - Si estaba con una ruta distinta a la actual (cambió de carpeta/sección o se renombró) → mueve el archivo antiguo a `_Archivo/<ruta antigua>` (con su adjunto si lo tenía) y crea el archivo nuevo en la ruta actual.
- Al final, para cada colección, cualquier documento que estuviera en el manifiesto de la ejecución anterior y ya no aparezca en la lectura actual (borrado en la estación) → mueve su archivo (y adjunto) de la ruta registrada a `_Archivo/<esa misma ruta>`. **Nunca elimines nada de OneDrive**, solo mueve a `_Archivo/`.
- Reescribe `_meta/manifest.json` al final con el estado nuevo (rutas + `updatedAt` de cada documento que sigue vivo; quita las entradas archivadas).

## 1. Contenidos (`content` + `folders`)

1. Para cada documento de `folders` (`{name, createdAt}`), la carpeta destino es `Contenidos/<name>/`. Además existe siempre `Contenidos/Sin carpeta/` para cualquier `content` cuyo `folderId` esté vacío o no corresponda a ningún `folders.id` vivo.
2. Para cada documento de `content` (campos: `title, body, kind, channel, product, audience, lang, status, tags[], folderId, source, suggestedDate, createdAt, updatedAt`, y opcionalmente `url`, `canvaUrl`, `designUrl`, `designAssetId`, `fileAssetId`/`fileName`/`fileType`/`fileSize`):
   - Archivo `<título saneado>.md` en la carpeta de su `folderId` (resuelta con la tabla del paso 1), con esta cabecera y luego el cuerpo:
     ```
     Tipo: <kind>
     Producto: <nombre legible o "—" si está vacío>
     Canal: <nombre legible o "—">
     Estado: <nombre legible>
     Etiquetas: <tags unidas por ", " o "—">
     Creado: <createdAt en fecha/hora legible>
     Actualizado: <updatedAt en fecha/hora legible>
     Origen: <source o "—">
     Enlaces: <lista de los que existan entre url/canvaUrl/designUrl, o "—">
     Archivo adjunto: <nombre del archivo si fileAssetId o designAssetId existen, si no "—">

     ---

     <body, o "(sin texto)" si está vacío>
     ```
   - Si hay `fileAssetId` o `designAssetId`: descárgalo con `read_asset` (`asset_id` = ese campo) y guarda la copia junto al `.md`, con el mismo nombre base que el `.md` y la extensión que indique el propio resultado de `read_asset` (no la deduzcas del nombre del campo).
3. Nombres legibles para Producto/Canal/Estado: usa exactamente las mismas tablas que `/sync` usa para `calendar.md` (ver más abajo en la sección Calendario) — así todo el repo usa la misma terminología.

## 2. Calendario (`items`)

1. Regenera siempre `Calendario/calendario.md` entero (no es incremental: es una tabla, no documentos sueltos), igual que `12-command-station/calendar.md` de `/sync` pero fechado como exportación a OneDrive. Columnas `Fecha | Canal | Producto | Estado | Título | Canva`, ordenadas por `date` ascendente; sin fecha → sección final "Sin fecha". Nombres legibles:
   - Canal: linkedin→LinkedIn, meta→Instagram y Facebook, newsletter→Newsletter, emailing→Emailing, ferias→Ferias, webinars→Webinars, website→Website, youtube→YouTube.
   - Producto: inedit→Inèdit, neostampa→neoStampa, neotextil→neoTextil, neocatalog→neoCatalog, neomatch→neoMatch; vacío→"—".
   - Estado: idea→Idea, borrador→Borrador, revision→En revisión, aprobado→Aprobado, publicado→Publicado.
   - Columna Canva: solo si el item tiene `canvaUrl` (no `designUrl`, que es un enlace de Claude Design y no se refleja en esta columna) → `[Abrir en Canva](<url>)`; si no, `—`.
2. `Calendario/diseños/`: para cada item con `designAssetId` (un diseño subido a la propia estación, distinto de `canvaUrl`/`designUrl` que son enlaces externos no descargables), descárgalo con `read_asset` y guárdalo ahí con un nombre legible derivado de `title` + fecha (ej. `2026-10-06 — The countdown is on.png`). Aplica la misma regla de sincronización incremental/archivado que en la sección 0. Si ningún item tiene `designAssetId` todavía, la carpeta queda vacía — no inventes archivos ni copies los enlaces de Canva/Claude Design como si fueran el diseño.

## 3. Notas de versión (`releases`)

Cada documento de `releases` tiene `{product, version, date, raw, imagesText, images[], data:{sections[], excluded[], includedIdx[], intro_en, intro_es}, createdAt, updatedAt}`. La Command Station reconstruye el HTML de WordPress a partir de esto con su función `buildReleaseHtml` — replícala tal cual (no inventes otra plantilla), con estas constantes (si en el futuro la Command Station cambia la plantilla, vuelve a leer su código fuente con `action:"read"` sobre el artifact y actualiza esta sección):

**Colores y año por producto:** neostampa `#006699`; neotextil `#da291c`, year `2026`. (Si aparece un `product` nuevo en `releases` que no esté aquí, pregunta antes de inventar su color/plantilla.)

**Etiquetas (L) por idioma:**
- en: newf="New Features", enh="Enhancements", req="Technical Requirements", os="Operating System", adobe="Adobe Requirements", langs="Languages", rights="All rights reserved.", notes="Release Notes", date="Release date:", dl="Download Installers"
- es: newf="Novedades", enh="Mejoras", req="Requisitos técnicos", os="Sistema Operativo", adobe="Requisitos de Adobe", langs="Idiomas", rights="Todos los derechos reservados.", notes="Notas de la versión", date="Fecha de publicación:", dl="Descargar instaladores"

**Requisitos técnicos por defecto (REQ_DEFAULT; si el documento no trae sus propios requisitos, usa estos tal cual, incluida la sintaxis `[Título]`→negrita y `{NOTA:}`→cursiva, línea en blanco = nuevo bloque, salto de línea = `<br/>`):**
- neostampa/en.os: "[Windows]\nWindows 10 Professional (64-bit) or higher\n• Intel® Core™ i5 or equivalent AMD processor with 64-bit support\n• Minimum 8 GB RAM (16 GB recommended)"
- neostampa/en.langs: "• English\n• Spanish\n• Italian\n• German\n• Portuguese\n• Simplified Chinese\n• French\n• Japanese"
- neostampa/es.os: "[Windows]\nWindows 10 Professional (64 bits) o superior\n• Intel® Core™ i5 o procesador AMD equivalente con soporte de 64 bits\n• Mínimo 8 GB de RAM (16 GB recomendados)"
- neostampa/es.langs: "• Inglés\n• Español\n• Italiano\n• Alemán\n• Portugués\n• Chino simplificado\n• Francés\n• Japonés"
- neotextil/en.os: "[macOS]\nMojave 10.15.7 or later\n- 64-bit Intel Mac or Apple Silicon processor\n- 4 GB RAM minimum (16 GB recommended)\n\n[Windows]\nWindows 10 or 11\n- Intel Core i5 or equivalent 64-bit AMD processor\n- 4 GB RAM minimum (16 GB recommended)\n{NOTE:} Plug-ins and panels are not compatible with Windows ARM."
- neotextil/en.adobe: "[Photoshop]\nMinimum: 2025 (26.0)\nRecommended: 2026 (27.8)\nPlease check your operating system's compatibility with the selected Photoshop version.\n\n[Illustrator]\nThe nS QuickPrint v9 panel is not available for Illustrator."
- neotextil/en.langs: "- English\n- Spanish\n- Italian\n- Portuguese\n- Catalan\n- German\n- French\n- Simplified Chinese"
- neotextil/es.os: "[macOS]\nMojave 10.15.7 o posterior\n- Mac Intel de 64 bits o procesador Apple Silicon\n- 4 GB de RAM mínimo (16 GB recomendados)\n\n[Windows]\nWindows 10 u 11\n- Intel Core i5 o procesador AMD equivalente de 64 bits\n- 4 GB de RAM mínimo (16 GB recomendados)\n{NOTA:} Los plug-ins y paneles no son compatibles con Windows ARM."
- neotextil/es.adobe: "[Photoshop]\nMínimo: 2025 (26.0)\nRecomendado: 2026 (27.8)\nVerifica la compatibilidad de tu sistema operativo con la versión de Photoshop seleccionada.\n\n[Illustrator]\nEl panel nS QuickPrint v9 no está disponible para Illustrator."
- neotextil/es.langs: "- Inglés\n- Español\n- Italiano\n- Portugués\n- Catalán\n- Alemán\n- Francés\n- Chino simplificado"

**Construcción del HTML (por idioma `lang` = en/es), replicando `buildReleaseHtml`:**
1. Agrupa `data.sections` (más las `data.excluded` cuyo índice esté en `includedIdx`, tratadas como `kind:"enhancement"`) por `kind` (`"new"` primero, luego `"enhancement"`), y dentro de cada `kind` por `module` (módulos sin nombre van sin subtítulo). Cada item usa su texto en el idioma pedido (`item.en`/`item.es`); omite items sin texto en ese idioma.
2. **neostampa:** título `<h3 style="color:#006699;...">` + (si hay `intro_<lang>`) un párrafo con la intro + por cada `kind` un `<h3>` con el rótulo (`newf`/`enh`) y, por módulo, un `<h4>` opcional + `<ul>` de items. Luego las imágenes de `images[]` (cada una como `<div><img src=... alt=...></div>`), luego la tabla de "Technical Requirements" (dos columnas: Sistema operativo / Idiomas) con los requisitos del paso anterior, y el pie `© <año actual> Inèdit Software. <rights>`.
3. **neotextil:** cabecera con `<h1>neoTextil 2026</h1>` + "Release Notes `<versión>`", tabla con la fecha (formateada en largo: "6 de octubre de 2026" / "6 October 2026"), bloque "Download Installers" con enlaces `.dmg`/`.exe` a `https://www.inedit.com/neoCatalog/neoColorBox/neoTextil/release/neoTextil%202026%20Setup%20v<versión>.dmg` (y `.exe`), igual agrupación de secciones + imágenes que arriba, tabla de requisitos con tres columnas (Sistema operativo / Adobe / Idiomas), mismo pie.
4. Escapa siempre texto libre con un escape HTML básico (`& < > "`).
5. Guarda dos archivos por versión: `Notas de versión/<Producto> <versión> EN.html` y `… ES.html` (nombres legibles, sin caracteres raros). Aplica la regla de sincronización incremental/archivado de la sección 0 (clave = `id` del documento de `releases`; ambos archivos EN/ES se mueven juntos a `_Archivo/` si la versión se borra).

## 4. Portal (`library`)

1. Crea siempre las 6 subcarpetas fijas (aunque estén vacías): `Portal/Brochures/`, `Portal/Flyers/`, `Portal/Listas de precios/` (categoría `precios`), `Portal/Logos/`, `Portal/Diseños/` (categoría `disenos`), `Portal/Otros/`.
2. Para cada documento de `library` (`{category, name, url, assetId, contentType, size, copyName, createdAt, updatedAt}`):
   - Si tiene `assetId`: descárgalo con `read_asset` y guarda la copia en `Portal/<sección>/` con nombre = `name` (quitando cualquier extensión que ya tuviera) + la extensión real que indique `read_asset`/`contentType` (el campo `name` a veces lleva una extensión que no corresponde al tipo real de la copia subida, p. ej. un `.pdf` cuya copia es en realidad una captura `.png` — manda el tipo real, no el de `name`).
   - Si no tiene `assetId` (solo `url`), no hay archivo que copiar: ese elemento solo aparece en `enlaces.md`.
3. Regenera siempre `Portal/enlaces.md` entero: una sección `##` por cada una de las 6 categorías (mismo orden que el paso 1), y dentro una viñeta por documento con su `name`, si tiene copia local la ruta relativa (`Logos/Logo_nS_30x30.png`, por ejemplo — y una nota si la copia es solo una vista previa/captura, no el archivo original), y el enlace de `url` si existe (o "sin enlace de OneDrive registrado en la Command Station" si no). Categorías sin documentos → `_(ninguno)_`.
4. Aplica la sincronización incremental/archivado de la sección 0 a las copias de archivo (no a `enlaces.md`, que siempre se regenera entero).

## 5. Cierre

1. No hagas ningún `write_db`/`upload_asset`/`delete_asset` sobre la Command Station en todo este comando — es de solo lectura sobre ella.
2. Actualiza `_meta/manifest.json` con el estado final (ver sección 0).
3. Responde en español con el recuento de archivos creados/actualizados por carpeta (`Contenidos/`, `Calendario/` + `Calendario/diseños/`, `Notas de versión/`, `Portal/` por sección), cuántos se archivaron en `_Archivo/` (y por qué: borrados o movidos), y cuántos se dejaron sin tocar por no haber cambiado.
