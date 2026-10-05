# Decision Log (Registro de decisiones)

Rules born from the user's corrections. Every agent follows them. Added via `/aprende`, reviewed monthly.

| Date | Rule | Applies to | Source |
|---|---|---|---|
| 2026-06 | Inèdit is part of Fiery, LLC; EFI is an OEM partner, not the parent | All | User correction |
| 2026-06 | neoStampa is primary; neoTextil and neoCatalog get monthly cadence | strategist, segment agents | User decision |
| 2026-06 | Organize agents by buyer segment, not by product | Orchestrator | User decision |
| 2026-10 | Epson → Fiery → Inèdit verified; mention Epson only in corporate/channel pieces | All | Web verification |
| 2026-10 | No piece reaches the user without passing `brand-reviewer` | Orchestrator | Inèdit OS manual |
| 2026-10 | External content in Spanish and English only | All, localizer | User decision |
| 2026-10 | Priority markets: DTF, DTG, sublimation, roll-to-roll direct-to-fabric; every brief names the technology | All | User decision |
| 2026-10 | New core segment and agent `sublimation-direct-fabric` (weekly) for sublimation and roll-to-roll direct-to-fabric producers | Orchestrator, strategist | User decision |
| 2026-10 | Transfertex·myTFX is the reference case for sublimation/cost control; don't present as news until the date is confirmed | sublimation-direct-fabric, distributor-partners | User-provided press release |
| 2026-10 | Cotton Print Chile added as reference case; say "consistent" not "identical" colours; no ink-savings figure until confirmed | All segment agents, brand-reviewer | User-provided press release |
| 2026-10 | Cotton Print Chile ink saving = 30% (provided by Inèdit); quote exactly, never generalize to other customers | All segment agents, brand-reviewer | User |
| 2026-10 | S3RTEC added as partner-generated DTF case (Hanrun calibration); use in co-marketing pitches | dtg-dtf-acquisition, distributor-partners | User |
| 2026-10 | Optimum Digital USA added as carpet-printing OEM case; carpet is an application inside the direct-to-fabric segment | sublimation-direct-fabric, distributor-partners | User |
| 2026-10 | Repositorio único: `inedit-os-pack`. `inedit-marketing` archivado como `inedit-marketing-ARCHIVO` (solo respaldo histórico, no se vuelve a tocar) | All | User decision |
| 2026-10 | La newsletter general (toda la lista de suscriptores) la redacta el orquestador desde `00-sources/`; no se asigna por defecto a ningún agente de segmento. Pasa siempre por `brand-reviewer` | Orchestrator, existing-customers | User correction |
| 2026-10 | Antes de redactar cualquier pieza, revisar `00-sources/` y usar solo datos que aparezcan ahí o en `CLAUDE.md`; el closing block indica qué archivos de `00-sources/` se usaron | All | User decision |
| 2026-10 | Borradores de la newsletter general van en `11-newsletter/drafts/` (no `10-`, ya usado por `sublimation-direct-fabric`) | Orchestrator | User decision |
| 2026-10 | Nueva sección "Official Resources" en CLAUDE.md: soporte/documentación general y la nota de versión pública de neoStampa 26.9 | All | User decision |
| 2026-10 | neoStampa (DRD) admite X-Rite i1 Pro 3 y cartas Barbieri SpectroSwing desde v26.3 (fuente: release notes, no presentes aún en `00-sources/`) — claim sensible, requiere validación de Producto antes de usarse externamente | All, brand-reviewer | User-provided, pending Product validation |
| 2026-10 | brand-reviewer: para audiencia general/mixta, FAIL si enumera bugs en vez de beneficios, si un beneficio no consta en 00-sources/CLAUDE.md, o si el cierre asume que el lector ya es cliente | brand-reviewer | User decision (origen: v1/v2 newsletter de octubre) |
| 2026-10 | brand-reviewer: en revisión final de pieza externa, FAIL automático si queda cualquier marcador [NEEDS REAL DATA]/[NEEDS INFO] sin resolver, aunque el resto de checks pasen | brand-reviewer | User decision (origen: newsletter octubre, punto 1 del fallback CMYKRGBHF) |
| 2026-10 | `00-sources/docs/` creado: índice de 481 artículos de la documentación pública (inedit.freshdesk.com) + 6 manuales PDF (318 MB) commiteados en `00-sources/docs/manuals/` (el de neoStampa, 102 MB, supera el límite de 100 MB/archivo de GitHub) — asumido porque el repo es local, sin remoto; revisar si algún día se añade uno | Orchestrator | User decision |
| 2026-10 | La Command Station (Claude Artifact) es el panel único de operación; `dashboard.html` queda retirado, no se usa ni se actualiza | All | User decision |
| 2026-10 | Nuevo comando `/sync` sincroniza en dos sentidos con la Command Station: sube `CLAUDE.md`+`decision-log.md` a `config/knowledge` (el repo manda en el conocimiento); baja `items`/`ideas`/`releases` a `12-command-station/` como espejo de solo lectura (la Station manda en calendario/ideas/notas de versión). Nunca escribe en `items`/`ideas`/`releases`/`library` | Orchestrator | User decision |
| 2026-10 | Después de cada `/aprende`, recordar al usuario ejecutar `/sync` para que la Command Station reciba la regla nueva | Orchestrator | User decision |
| 2026-10 | Antes de escribir o responder sobre cualquier función o dato técnico de un producto, consulta la documentación oficial (`00-sources/docs/` o https://inedit.freshdesk.com) y enlaza el artículo exacto. Nunca afirmes que una función no existe sin haberla buscado; si no aparece, dilo y pregunta | All, brand-reviewer | User decision |
| 2026-10 | `/sync` sube también el texto de los 481 artículos de `00-sources/docs/INDEX.md` a la colección `docs` de la Command Station (un documento por artículo, `doc_id` = número de Freshdesk); `config/knowledge` guarda `docsCount` y `docsSyncedAt` | Orchestrator | User decision |
