---
description: Importa exports de oportunidades de Salesforce (CSV) desde OneDrive al Libro de Ventas y a "Resultados y Analista" de la Command Station
argument-hint: (sin argumentos)
---

Importa las oportunidades que se exportan manualmente desde Salesforce — **de cualquier fase, no solo cerrada-ganada** — a **dos sitios** con alcance distinto:
- **Libro de Ventas** (`https://claude.ai/code/artifact/672eddad-d52f-4057-855a-5cb29976ad6f`) — el ticker y el acumulado diario/trimestral; es un libro de ventas reales, así que solo cuenta las cerrada-ganada.
- La colección `sales` de la **Command Station de marketing** (`https://claude.ai/artifact/GcprRC86Vef6t6UApE7evC`) — alimenta la sección "Ventas" dentro de "Resultados y Analista", con **todas** las oportunidades (ganadas, pipeline abierto y perdidas) y filtros dinámicos por fase, propietario, país y trimestre — el usuario elige qué ver.

Este comando no toca `CLAUDE.md` ni `decision-log.md` del Inèdit OS de marketing, y no mezcles su commit/informe con los de `/sync` o `/onedrive` — pero sí escribe en la Command Station (colección `sales`, nunca otra).

Carpeta de OneDrive: `~/Library/CloudStorage/OneDrive-Fiery,LLC/Ventas Salesforce/Importar/` (con `_importados/` dentro). Créalas si no existen.

## 1. Leer los CSV nuevos

1. Para cada archivo `.csv` que esté directamente en `Importar/` (ignora lo que ya esté en `_importados/`), ejecuta `python3 .claude/scripts/import_ventas.py "<archivo>"`. Es un script de solo librería estándar: detecta columnas de Salesforce por nombre en inglés o español (`Amount`/`Importe`, `Close Date`/`Fecha de cierre`, `Stage`/`Fase`/`Etapa`, y opcionalmente nombre de oportunidad, cuenta, propietario y país — `Country`/`País`). Incluye **toda fila con importe y fecha válidos, sea cual sea su fase** — cada operación lleva su `stage` (texto real, p. ej. "Propuesta Aceptada", "Esperando Pago", "Closed Won") y un `stageGroup` derivado ("ganada" si contiene "won"/"ganad", "perdida" si contiene "lost"/"perdid", "abierta" en cualquier otro caso — pipeline en curso). Devuelve JSON: `{"deals", "won", "by_stage_group", "skipped_bad_row", "total_rows", "daily":[{date,amount,dealCount}], "quarterly":[...], "deal_records":[{doc_id,id,opportunity,account,owner,country,date,quarter,amount,stage,stageGroup}]}` o `{"error": "...", "headers":[...]}` si no reconoce las columnas obligatorias (importe, fecha de cierre, fase). `daily`/`quarterly` ya vienen calculados solo sobre las `won` (cerrada-ganada); `deal_records` incluye todas. `doc_id` ya viene saneado (prefijo `sf-`), generado a partir del id real de Salesforce si existe, o si no de cuenta+oportunidad+fecha+importe — estable entre reimportaciones del mismo export, así que escribir con "set" nunca duplica una operación.
2. Si devuelve `error`: no escribas nada de ese archivo. Muévelo a `Importar/_importados/_no-reconocidos/` (créala si hace falta) y repórtalo con las cabeceras que tenía, para que se pueda revisar el formato del export — no adivines columnas.
3. Si devuelve datos: revisa que los importes y fechas tengan sentido (ej. nada en 1970, importes no absurdos) antes de escribir. Si algo se ve claramente mal, no sigas con ese archivo — repórtalo.

## 2. Fusionar en el Libro de Ventas (`db`, colecciones `daily` y `quarterly`) — solo cerrada-ganada

Los importes de un mismo día pueden venir repartidos en varios archivos (exports solapados) — por eso la fusión es **aditiva por día** y las columnas de acumulado se **recalculan siempre desde cero** al final, nunca de forma incremental (evita que un desajuste se propague). Este paso usa solo `daily`/`quarterly` (ya filtrados a cerrada-ganada por el script) — no toca `deal_records`.

1. Para cada día que aparezca en los `daily` de los archivos nuevos: lee el documento actual de `db.collection("daily").doc(<fecha AAAA-MM-DD>)` (si no existe, parte de `{amount:0, dealCount:0}`), suma `amount` y `dealCount`, y guárdalo con `write_db`, `db_op` "set" (`collection` "daily", `doc_id` = la fecha).
2. Lee la colección `daily` completa (`read_db`, `list`, ordenando por `date`). Recorre en orden cronológico y recalcula para cada documento: `quarter` (trimestre natural de la fecha), `runningTotalQTD` (acumulado desde el primer día de ese trimestre) y `runningTotalAllTime` (acumulado desde el primer día de toda la colección). Reescribe cada documento con esos tres campos actualizados (`write_db`, `db_op` "batch", grupos de hasta 50).
3. Recalcula `quarterly` desde esa misma colección `daily` ya recalculada: agrupa por `quarter`, suma `amount` y `dealCount`, y escribe un documento por trimestre en `db.collection("quarterly")` con `doc_id` = el trimestre (p. ej. `2026-Q3`) — `write_db`, `db_op` "set" por cada uno (o "batch" si hay varios).
4. No toques ninguna otra colección de este Artifact.

## 3. Escribir en la Command Station de marketing (`sales`, para "Resultados y Analista") — todas las fases

1. Para cada operación de `deal_records` (de todos los archivos nuevos, **cualquier fase**), escribe con `write_db`, `db_op` "set" (o "batch", grupos de hasta 50) sobre la Command Station de marketing (`https://claude.ai/artifact/GcprRC86Vef6t6UApE7evC`), `collection` "sales", `doc_id` = el `doc_id` que da el script, `data` = el resto de campos del registro (`opportunity`, `account`, `owner`, `country`, `date`, `quarter`, `amount`, `stage`, `stageGroup`) más `importedAt` (epoch ms actual). Como el `doc_id` es estable, reimportar el mismo export no duplica nada: simplemente sobrescribe (y actualiza la fase si una oportunidad avanzó, p. ej. de "Propuesta Aceptada" a "Closed Won").
2. No escribas en ninguna otra colección de la Command Station de marketing (ni `items`, ni `metrics`, ni `content`…) — solo `sales`.

## 4. Cerrar

1. Mueve cada archivo procesado con éxito a `Importar/_importados/` (si ya existe un archivo con ese nombre, añade un sufijo de fecha/hora).
2. Responde en español: cuántas operaciones (`deals`) se importaron en total y por archivo, el desglose por `by_stage_group` (ganada/abierta/perdida), cuántas filas se descartaron por datos inválidos, y si algún archivo se movió a `_no-reconocidos/` (con el motivo). Menciona los dos destinos (Libro de Ventas, solo cerrada-ganada, y la colección `sales` de la Command Station, todas las fases).
3. No hay nada que comitear en `inedit-os-pack` salvo que este propio comando o el script cambien — los datos de ventas viven en los dos Artifacts, no en el repo.
