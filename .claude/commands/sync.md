---
description: Sincroniza el repositorio con la Command Station (conocimiento sube, calendario/ideas/notas de versión bajan)
argument-hint: (sin argumentos)
---

Unifica `inedit-os-pack` con la Command Station (único panel; no toques `dashboard.html`, ya retirado — ver CLAUDE.md). Artifact: `https://claude.ai/artifact/GcprRC86Vef6t6UApE7evC`. Usa la herramienta Artifact, acciones `read_db` / `write_db`, nunca `publish` sobre ese enlace.

**Dirección del dato — no te la saltes:** el repositorio manda en el conocimiento (sube); la Command Station manda en el calendario, las ideas y las notas de versión (baja). Nunca escribas en las colecciones `items`, `ideas`, `releases` o `library` — son de solo lectura para este comando. Se escribe `config/knowledge` y la colección `docs` (ver sección 2).

## 1. Subir — `CLAUDE.md` + `decision-log.md` → `config/knowledge`

1. Lee `CLAUDE.md` y `00-strategy/decision-log.md` tal cual están ahora en el repo (no uses una versión de memoria).
2. Redacta `kb`: texto plano, máximo 15.000 caracteres, solo hechos (nada de flujo de trabajo, roles ni protocolo), cubriendo: empresa y propiedad (Epson → Fiery → Inèdit, EFI como socio OEM, cuándo mencionar Epson), los cuatro productos con sus capacidades y versión/compatibilidad vigentes, mercados y segmentos prioritarios, voz de marca, los 5 KPIs del scoreboard, los casos de referencia (con sus cifras y citas exactas, y lo que falta de cada uno), ferias, colores corporativos y de producto, y los recursos/documentación oficiales (URLs verbatim). Si algo no cabe, prioriza lo más reciente y lo más citado por los agentes antes que detalle histórico.
3. Redacta `rules`: una lista con una frase por cada fila vigente de la tabla de `decision-log.md` (una entrada de la lista por fila; no fusiones varias filas en una frase ni añadas reglas que no estén en la tabla).
4. Antes de escribir, lee el documento actual: `read_db`, `db_op` "get", `collection` "config", `doc_id` "knowledge" (para poder reportar qué cambia; la herramienta Artifact no expone `if_version` en `write_db`, así que no hay bloqueo optimista real — simplemente lee antes de sobrescribir y repórtalo).
5. Escribe con `write_db`, `db_op` "set", `collection` "config", `doc_id` "knowledge", `data`:
   ```
   {"kb": "<texto>", "rules": ["<regla 1>", "..."], "syncedAt": <epoch ms actual>, "source": "inedit-os-pack@<hash corto de HEAD>"}
   ```
   Obtén el hash con `git rev-parse --short HEAD`.

## 2. Subir — `00-sources/docs/INDEX.md` → colección `docs`

Sube el texto de cada artículo de la documentación oficial para que la Command Station pueda buscarlo y citarlo. Volumen alto (481 artículos a fecha de esta redacción) — no lo hagas tú solo en serie: reparte el trabajo en agentes paralelos (p. ej. uno por sección del índice: FAQs, neoStampa, neoTextil, neoCatalog, neoMatch, Integration Resources) y que cada uno te reporte cuántos artículos escribió, por carpeta.

1. Lee `00-sources/docs/INDEX.md` completo. Para cada fila anota: producto (la sección `##`), carpeta, título, URL EN, URL ES, y el `doc_id` — el número de Freshdesk que aparece en la URL (p. ej. `.../articles/14000157868-...` → `14000157868`).
2. Para cada artículo: descarga la página EN y extrae solo el texto del cuerpo del artículo (sin menú, cabecera, pie ni navegación lateral), máximo 8.000 caracteres. Incluye `url_es` solo si esa URL en español responde (puedes apoyarte en la validación ya hecha en el índice si es reciente, pero si tienes duda, compruébalo).
3. Escribe cada artículo con `write_db`, `collection` "docs", `doc_id` = el número de artículo, `data`:
   ```
   {"product": "<sección del índice>", "folder": "<carpeta>", "title": "<título>", "url_en": "<url>", "url_es": "<url o ausente>", "text": "<texto extraído>", "syncedAt": <epoch ms actual>}
   ```
   Agrupa en lotes de hasta 50 con `db_op` "batch".
4. Tras escribir todo, lee la colección `docs` completa (`read_db`, `list`, paginando con `cursor`) y compárala con los `doc_id` actuales del índice: borra (`write_db`, `db_op` "delete") cualquier documento cuyo artículo ya no esté en `INDEX.md` (artículo retirado de Freshdesk desde la última sincronización).
5. Cuenta los artículos escritos por producto y guarda ese desglose para el informe final.
6. Actualiza `config/knowledge` con `write_db`, `db_op` "update" (merge, no pisa `kb`/`rules`/`source`/`syncedAt`), `collection` "config", `doc_id` "knowledge", `data`: `{"docsCount": <total artículos subidos>, "docsSyncedAt": <epoch ms actual>}`.

## 3. Bajar — Command Station → `12-command-station/`

1. Lee con `read_db`, `db_op` "query" (con `out_dir` apuntando a tu scratchpad) las colecciones `items`, `ideas` y `releases`. Pagina con `query.cursor` si hay `next_cursor`.
2. Genera/sobrescribe `12-command-station/calendar.md`: tabla con columnas `Fecha | Canal | Producto | Estado | Título | Canva`, ordenada por `date` ascendente; los items sin `date` van en una sección final "Sin fecha". Usa estos nombres legibles (no los ids crudos):
   - Canal: linkedin→LinkedIn, meta→Instagram y Facebook, newsletter→Newsletter, emailing→Emailing, ferias→Ferias, webinars→Webinars, website→Website, youtube→YouTube.
   - Producto: inedit→Inèdit, neostampa→neoStampa, neotextil→neoTextil, neocatalog→neoCatalog, neomatch→neoMatch.
   - Estado: idea→Idea, borrador→Borrador, revision→En revisión, aprobado→Aprobado, publicado→Publicado.
   - Columna Canva: si el item tiene `canvaUrl`, enlázalo como `[Abrir en Canva](<url>)`; si no, `—`.
3. Genera/sobrescribe `12-command-station/ideas.md`: una lista con viñetas, una por idea, con fecha (`createdAt`), canal y producto (nombres legibles como arriba) y el texto completo de la idea.
4. Genera `12-command-station/releases/<producto>-<version>.json`: un archivo por documento de `releases`, con el producto en minúsculas y la versión tal cual (p. ej. `neostampa-26.9.json`), conteniendo el documento completo tal como lo devuelve `read_db` (incluyendo su `id`). Borra de esa carpeta los archivos de versiones que ya no existan en la colección.
5. No escribas nada de vuelta en `items`, `ideas`, `releases` ni `library` — esta dirección es solo lectura.

## 4. Cerrar

1. `git add CLAUDE.md 00-strategy/decision-log.md 12-command-station/` (solo lo que de verdad cambió) y comita con el mensaje `sync: Command Station` (o uno más específico si ayuda, pero debe empezar por `sync: Command Station`). Si no hay cambios en ningún sentido, no crees un commit vacío — dilo. (La colección `docs` y `config/knowledge` viven solo en la Command Station, no hay archivo de repo que commitear por la sección 2, salvo que `00-sources/docs/INDEX.md` haya cambiado — eso ya lo gestiona `/actualiza-docs`.)
2. Responde en español, en tres bloques claros:
   - **Subido (conocimiento):** si `kb`/`rules` cambiaron respecto a la versión leída en el paso 1.4 (y en qué, a grandes rasgos), o si no había cambios.
   - **Subido (documentación):** cuántos artículos se escribieron en `docs`, desglosados por producto/sección, cuántos se borraron (si alguno dejó de estar en el índice), y el total resultante guardado en `docsCount`.
   - **Bajado:** cuántos items/ideas/releases se leyeron y qué cambió en `calendar.md`, `ideas.md` y `releases/` respecto a la versión anterior en el repo (nuevos, modificados, eliminados), o que no había cambios.
