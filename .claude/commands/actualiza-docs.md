---
description: Vuelve a descargar la documentación oficial de Inèdit y reporta qué ha cambiado
argument-hint: (sin argumentos)
---

Refresh `00-sources/docs/` from the public Inèdit knowledge base (https://inedit.freshdesk.com/en/support/solutions). This repeats the original indexing task:

1. Before touching anything, capture the current committed state for comparison: `git show HEAD:00-sources/docs/INDEX.md` (save it to a scratch file) and note the current file sizes/hashes of the 6 PDFs in `00-sources/docs/manuals/` (`git diff --stat` will show which changed after step 2, but grab a `shasum` snapshot first since git only tracks binaries as changed/unchanged, not how).
2. Re-run the crawl: for each of the 6 categories (FAQs, neoStampa, neoTextil, neoCatalog, neoMatch, Integration Resources), re-download its "Download Manual" PDF into `00-sources/docs/manuals/` (overwrite in place) and re-list every folder and article (title + URL) to rebuild `00-sources/docs/INDEX.md` from scratch — same method as the original build (parallel sub-agents per category is fine and recommended, each writing its own `00-sources/docs/_section-<slug>.md` the orchestrator then merges and deletes). Update the "fecha de generación" at the top of `INDEX.md`.
3. Diff the new `INDEX.md` against the one captured in step 1: which article URLs are new (not in the old index), which existed before but changed (same URL, different title or folder — a real content change needs opening both articles, but a title/folder change is a reliable proxy you can detect from the index alone), and which disappeared. Compare the new PDF hashes against the step-1 snapshot to report which of the 6 manuals changed.
4. Report to the user in Spanish: counts of new / changed / removed articles per product, and which manuals were updated. If nothing changed at all, say so plainly instead of padding the report.
5. Commit everything (`00-sources/docs/INDEX.md`, `00-sources/docs/manuals/*.pdf`) with a commit message summarizing what changed (e.g. "actualiza-docs: +3 artículos neoStampa, manual neoTextil actualizado"). If nothing changed, don't create an empty commit — say so instead.

Reply in Spanish.
