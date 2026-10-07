---
description: Importa exports de oportunidades de Salesforce (CSV) desde OneDrive al Libro de Ventas
argument-hint: (sin argumentos)
---

Importa a **Libro de Ventas** (`https://claude.ai/code/artifact/672eddad-d52f-4057-855a-5cb29976ad6f`) las oportunidades cerradas-ganadas que se exportan manualmente desde Salesforce. **Este comando es independiente del Inèdit OS de marketing** (no toca `CLAUDE.md`, `decision-log.md` ni la Command Station de marketing) — es un panel de ventas aparte, así que no mezcles sus commits ni su informe con los de `/sync` o `/onedrive`.

Carpeta de OneDrive: `~/Library/CloudStorage/OneDrive-Fiery,LLC/Ventas Salesforce/Importar/` (con `_importados/` dentro). Créalas si no existen.

## 1. Leer los CSV nuevos

1. Para cada archivo `.csv` que esté directamente en `Importar/` (ignora lo que ya esté en `_importados/`), ejecuta `python3 .claude/scripts/import_ventas.py "<archivo>"`. Es un script de solo librería estándar: detecta columnas de Salesforce por nombre en inglés o español (`Amount`/`Importe`, `Close Date`/`Fecha de cierre`, `Stage`/`Fase`/`Etapa`, más opcionalmente nombre de oportunidad, cuenta y propietario), se queda solo con las filas cuya `Stage` contenga "won" o "ganad" (cerrada-ganada; el resto del pipeline se descarta), y devuelve JSON: `{"deals", "skipped_not_won", "skipped_bad_row", "total_rows", "daily":[{date,amount,dealCount}], "quarterly":[...]}` o `{"error": "...", "headers":[...]}` si no reconoce las columnas obligatorias (importe, fecha de cierre, fase).
2. Si devuelve `error`: no escribas nada de ese archivo. Muévelo a `Importar/_importados/_no-reconocidos/` (créala si hace falta) y repórtalo con las cabeceras que tenía, para que se pueda revisar el formato del export — no adivines columnas.
3. Si devuelve datos: revisa que los importes y fechas tengan sentido (ej. nada en 1970, importes no absurdos) antes de escribir. Si algo se ve claramente mal, no sigas con ese archivo — repórtalo.

## 2. Fusionar en el Libro de Ventas (`db`, colecciones `daily` y `quarterly`)

Los importes de un mismo día pueden venir repartidos en varios archivos (exports solapados) — por eso la fusión es **aditiva por día** y las columnas de acumulado se **recalculan siempre desde cero** al final, nunca de forma incremental (evita que un desajuste se propague).

1. Para cada día que aparezca en los `daily` de los archivos nuevos: lee el documento actual de `db.collection("daily").doc(<fecha AAAA-MM-DD>)` (si no existe, parte de `{amount:0, dealCount:0}`), suma `amount` y `dealCount`, y guárdalo con `write_db`, `db_op` "set" (`collection` "daily", `doc_id` = la fecha).
2. Lee la colección `daily` completa (`read_db`, `list`, ordenando por `date`). Recorre en orden cronológico y recalcula para cada documento: `quarter` (trimestre natural de la fecha), `runningTotalQTD` (acumulado desde el primer día de ese trimestre) y `runningTotalAllTime` (acumulado desde el primer día de toda la colección). Reescribe cada documento con esos tres campos actualizados (`write_db`, `db_op` "batch", grupos de hasta 50).
3. Recalcula `quarterly` desde esa misma colección `daily` ya recalculada: agrupa por `quarter`, suma `amount` y `dealCount`, y escribe un documento por trimestre en `db.collection("quarterly")` con `doc_id` = el trimestre (p. ej. `2026-Q3`) — `write_db`, `db_op` "set" por cada uno (o "batch" si hay varios).
4. No toques ninguna otra colección de este Artifact ni de la Command Station de marketing.

## 3. Cerrar

1. Mueve cada archivo procesado con éxito a `Importar/_importados/` (si ya existe un archivo con ese nombre, añade un sufijo de fecha/hora).
2. Responde en español: cuántas operaciones (`deals`) se importaron en total y por archivo, cuántas filas se descartaron por no estar "cerrada-ganada" y cuántas por datos inválidos, y si algún archivo se movió a `_no-reconocidos/` (con el motivo).
3. No hay nada que comitear en `inedit-os-pack` salvo que este propio comando o el script cambien — los datos de ventas viven solo en el Artifact "Libro de Ventas", no en el repo.
