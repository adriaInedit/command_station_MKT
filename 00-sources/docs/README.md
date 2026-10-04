# 00-sources/docs/ — Official Documentation Mirror

Mirrors the public Inèdit knowledge base: https://inedit.freshdesk.com/en/support/solutions (Spanish: swap `/en/` for `/es/`).

## Contents

- **`INDEX.md`** — every indexed article, grouped by product (FAQs, neoStampa, neoTextil, neoCatalog, neoMatch, Integration Resources) and folder, with the article title and its English + Spanish URL. Carries a "fecha de generación" at the top — check it before trusting the index as current.
- **`manuals/`** — the official PDF manual for each of the 6 sections, downloaded from that section's "Download Manual" link, when one exists. As of the 2026-10-04 generation, **none of the 6 sections had a "Download Manual" link** (confirmed independently per section, both via rendered page and raw HTML) — this folder is currently empty. Re-check with `/actualiza-docs` rather than assuming this is permanent.

## How this gets built / refreshed

Built by crawling each of the 6 category pages and every folder inside them (WebFetch), downloading each section's manual PDF (curl), and deriving the Spanish URL for each article by string-swapping `/en/` → `/es/` (not fetched separately — assumed to mirror the English URL structure). Run `/actualiza-docs` to redo this and get a diff report (new / changed / removed articles, which manuals changed) instead of doing it by hand.

## How to use this

Per `CLAUDE.md` → "Official Resources": check here first for any technical/product claim before drafting. When a piece mentions a specific feature, link to that feature's exact row in `INDEX.md` (EN or ES column, matching the piece's language) — never link to a category homepage when a specific article exists. If a manual's content contradicts `CLAUDE.md`, flag it to the user rather than choosing one silently.
