# Inèdit Software — Marketing Operations Brief

This file is the shared brain for every agent working in this repo. Read this before doing any task in any subfolder. It is not segment-specific — it's the context every "team member" needs regardless of which workstream they're handling.

## Corporate Context: Inèdit Is Part of Fiery, LLC (via Epson)

**Ownership chain (verified Oct 2026):** Seiko Epson acquired Fiery, LLC on 2 Dec 2024 (USD 568.7M); Fiery kept its own name and structure. Fiery then acquired Inèdit (announced 12 Nov 2025, closed 8 Jan 2026). So the chain is **Epson → Fiery → Inèdit**. Three facts matter a lot for marketing and should not be confused:

1. **Inèdit retains its own independent brand and product suite** — Fiery's stated intent is to continue Inèdit as a distinct brand, not absorb or rename it. Day-to-day marketing for neoStampa, neoTextil, neoCatalog, and neoMatch should continue under the Inèdit name/identity, not be rebranded as "Fiery" or "Epson" products.
2. **EFI is a separate company, not Inèdit's parent.** EFI (Electronics For Imaging) was the seller in the Inèdit transaction and is now an OEM partner of Inèdit going forward (via EFI Reggiani), not an owner. If older material anywhere implies an EFI–Inèdit ownership relationship, that's outdated — correct it.
3. **Mention Epson only in corporate or channel pieces, never in product content.** A neoStampa feature post or tutorial has no reason to reference Epson. Fiery Digital Factory is a sibling product under the same Fiery umbrella — never position Inèdit against it publicly.

**Company facts:** HQ at C/ del Rocà 6, 08394 Sant Vicenç de Montalt (Barcelona). 25+ years in business. Also offers consulting, training, and custom/OEM software services alongside the three core products.

**Logo usage implication:** the existing co-branded "inēdit | fiery" lockup in `brand/shared/logos/` reflects this real corporate relationship (Inèdit as part of Fiery), not an arbitrary partnership the company opted into — it can be used more broadly than the earlier caution in this file suggested, though it's still worth checking whether a given piece of content (e.g. something product-specific aimed at a narrow segment) needs the corporate affiliation visible at all, or whether the plain Inèdit product branding is more appropriate.

## What Inèdit Software Does

Inèdit Software develops specialized digital solutions for the textile and digital printing industries, helping textile manufacturers, printers, designers, and brands improve productivity, color accuracy, and workflow efficiency. Rather than offering isolated tools, Inèdit provides an integrated ecosystem connecting design, color management, production, and catalog management. The four products map to different stages or needs of the textile production process — agents should be precise about which one a piece of content is actually about and not blend their audiences or messaging together.

### neoStampa — Production & Color Management

RIP (Raster Image Processor) software for digital textile printing. Enables accurate, repeatable color results while optimizing production efficiency and reducing operational costs.

- Key capabilities: advanced color management and ICC profiling, printer calibration and linearization, spot color matching, multi-device color consistency, support for a wide range of textile inks and substrates, cost estimation and ink consumption control, image editing and production prep, step-and-repeat/nesting, production workflow automation, integration with major digital printer manufacturers.
- Typical users: digital textile printers, print service providers, industrial textile manufacturers, fashion/apparel producers, home décor and soft signage printers.
- Position in workflow: the production/printing stage — ensures designs are reproduced accurately and efficiently on digital printing equipment.
- Compatibility: the supported-printer database lists 1,452 models (Epson 183, Mimaki 154, HP 128, Roland 94, Mutoh 86, Canon 46) — this figure changes with each build, so re-check [the supported-printers page](https://www.inedit.com/es/soporte-impresion-digital-textil/impresoras-soportadas-rip-software/) before quoting it in content rather than relying on this snapshot.

### neoMatch — Color-Library Calibration

Part of the Digital Printing family alongside neoStampa. Generates Lab values from X-Rite i1 Pro spectrophotometer measurements or imported color libraries (e.g. Pantone); after printing, computes the Lab difference and proposes corrected references so colors match within neoStampa profiles, and flags colors that can never be reproduced accurately on a given setup.

- Key capability: **Delta Checker** — verifies whether a calibration is still valid across substrates, and controls the effect of washing/steaming by comparing before/after measurements.
- Supported spectrophotometer: X-Rite i1 Pro (don't claim broader hardware compatibility — e.g. Barbieri devices — without confirmation).
- Offer: 30-day free trial.
- Brand color: `[NEEDS INFO]` — not yet assigned, don't guess one.
- Typical users: the same production/QA teams using neoStampa, wherever color-reference consistency across batches matters most.

### neoTextil — Design Creation

A professional design environment built as Adobe Photoshop plug-ins, specifically for textile and surface pattern design (current version: neoTextil 2025). Extends Photoshop with industry-specific tools for creating, editing, coloring, visualizing, and prepping textile designs.

- Key capabilities: seamless repeat and rapport creation, pattern development and editing, colorway generation, textile-specific design workflows, fabric/texture visualization, collection development support, design prep for digital printing, integration with neoStampa production workflows, and **Quick Rapport** — an AI-assisted feature (using Adobe AI technology) that automatically generates pattern repeats to accelerate design creation.
- Typical users: textile designers, surface pattern designers, fashion design teams, home textile designers, textile studios/design departments, brands developing textile collections.
- Position in workflow: the design/development stage — moves teams from concept to production-ready designs.
- Relationship to neoStampa: neoTextil creates and prepares designs; neoStampa reproduces them accurately during printing. Together they bridge design and production.

### neoCatalog — Collection & Asset Management

A centralized platform for managing textile collections, designs, colorways, samples, and related product information across the development lifecycle. Helps teams organize, search, share, and control design assets and collaborate across departments and external partners.

- Key capabilities: centralized design/collection repository, digital asset management, colorway and variant organization, collection development management, search/filtering, workflow and approval processes, cross-team collaboration (design, sales, merchandising, production), version control and asset tracking, integration with neoTextil and neoStampa.
- Typical users: textile manufacturers, fashion brands, home textile companies, design studios, product development teams, sales and merchandising departments.
- Position in workflow: the information/asset hub connecting design, development, sales, and production.
- Relationship to the others: manages the designs created in neoTextil and the production assets used by neoStampa.

### The Full Ecosystem (use this framing when content spans more than one product)

neoTextil (design creation) → neoCatalog (collection & asset management) → neoStampa (production & color management). Together they let textile companies streamline workflows, improve collaboration, reduce errors, accelerate time-to-market, and maintain consistent color quality across the full product lifecycle. This three-stage framing is useful for any content (e.g. a distributor pitch, an exhibition talking point) that wants to position Inèdit as more than a single point-tool. neoMatch sits alongside neoStampa in this framing — it's a calibration companion to the production stage, not a separate stage of its own.

## Segment Priority: neoStampa Primary, neoTextil/neoCatalog Secondary

The four core customer segments below (1–3, plus Segment 6) are built around neoStampa/neoMatch and remain the primary marketing focus — they run on the full weekly cadence described in `00-strategy/daily-cadence.md`. Two additional lightweight segments exist for neoTextil and neoCatalog (handled by the `neotextil-designers` and `neocatalog-teams` agents, numbered 4–5), but they run on a **monthly**, not weekly, cadence and should not be expected to receive comparable time or output volume. If priority shifts later, update this section and the affected agents' cadence notes — don't let cadence drift silently.

## The Core Problem This Plan Solves

Marketing here was previously reactive and single-channel (mainly email), without segmentation, without a consistent scoreboard, and without room for creative work. Every agent's job is to produce *segment-specific, measurable* work — never generic "textile industry" messaging.

## The Core Customer Segments (memorize these distinctions)

1. **Existing Customers** — Retain & upsell. They already trust Inèdit's color management. Message: "your investment keeps paying off." Needs quantified proof (time saved, reprints avoided, accuracy gains). Risk if ignored: quiet churn at renewal.
2. **DTG/DTF & New Garment Decorators** — Acquisition. Newer entrants, less loyal, price/ease-of-use sensitive, discover tools via YouTube and peer forums. Message: practical fixes for white-ink and color-drift problems, shown on real garments, not abstract color theory. Risk if ignored: they default to whatever RIP came bundled with their printer. Handled by `dtg-dtf-acquisition`.
3. **Printer-Brand & Distributor Partners** — Channel growth. They don't buy neoStampa directly, they recommend/bundle it. Built on technical reliability and co-marketing, not promotional tone. Message: neoStampa as the color layer that makes their hardware look its best. Risk if ignored: distributors default to a competitor's bundled RIP. Handled by `distributor-partners`.

## Two Lightweight Secondary Segments (monthly cadence)

4. **neoTextil Designers** — textile/surface pattern designers and design studios. Handled by the `neotextil-designers` agent. Message centers on design-to-production workflow and the Quick Rapport AI feature.
5. **neoCatalog Teams** — product development, sales, and merchandising teams. Handled by the `neocatalog-teams` agent. Message centers on cross-team collaboration and asset/version control.

## A Fourth Core Segment: Segment 6 — Sublimation & Roll-to-Roll Direct-to-Fabric Producers (core, weekly)

Numbered 6 (not 4) because it was added after the two secondary segments were already numbered — don't let the numbering gap read as a priority signal; this segment runs on the same **weekly** cadence as segments 1–3. Industrial textile mills and fabric printers running sublimation or roll-to-roll direct-to-fabric lines. Message: repeatable color across batches, fabrics, and post-treatment (steaming/washing), hitting customer color references, and cost per meter. Risk if ignored: each new production line defaults to the manufacturer's or a competitor's RIP. Handled by `sublimation-direct-fabric`, working out of `10-sublimation-direct-fabric/`.

**Priority markets by print technology** (applies to segments 2 and 6): digital textile printing here means **DTF, DTG, sublimation, and roll-to-roll direct-to-fabric**. Every brief should name the specific technology — DTF/DTG routes to `dtg-dtf-acquisition`, sublimation and roll-to-roll direct-to-fabric routes to `sublimation-direct-fabric`.

## Brand Voice (applies everywhere)

- Confident but not hype-driven — textile/print buyers are technical and skeptical of marketing fluff.
- Specific over abstract: real numbers, real garments, real workflows — never vague claims like "amazing results."
- Collaborative tone reflecting Inèdit's actual relationship with clients — "we work with you," not "we sell to you."
- Never invent statistics, customer quotes, or specific performance numbers. If a number is needed and not provided, flag it as `[NEEDS REAL DATA: ...]` rather than guessing.

## Inèdit OS — How We Work (operating protocol)

This repo is the source of truth that agents read. The human-readable mirror is the Claude Doc "Manual de operaciones · Inèdit OS" (tabs: Manual + Base de conocimiento) — every change enters through `/aprende` and is applied to both on the same day.

### Roles

- **The user (Marketing Specialist)** sets goals and gives final approval. Nothing is published or sent without an explicit "aprobado".
- **Main Claude session = orchestrator.** Reads the brief, picks the segment agent by *who the piece is for*, chains the transversal agents, returns one package.
- **General newsletter (full subscriber list):** drafted directly by the orchestrator from `00-sources/` material — never assigned to a segment agent by default. Always goes through `brand-reviewer` before reaching the user.
- **Segment agents (write):** `existing-customers`, `dtg-dtf-acquisition`, `sublimation-direct-fabric`, `distributor-partners` (core, weekly); `neotextil-designers`, `neocatalog-teams` (secondary, monthly).
- **Transversal agents (support):** `strategist` (plans, calendars, launches, trade shows), `brand-reviewer` (mandatory gate before anything reaches the user), `localizer` (language/market adaptation), `analyst` (results vs. the five KPIs).
- Agents write copy and visual briefs only. Final visuals → Claude Design or Canva; video → Descript.

### Standard flow

brief → orchestrator → (strategist if it's a campaign) → segment agent → brand-reviewer
→ fails: back to segment agent · passes: user approval
→ not approved: the correction becomes a rule via `/aprende`, orchestrator re-runs
→ approved: localizer / visual brief → user publishes → analyst measures → learnings feed the next brief.

Simple fixes may skip steps (segment agent → brand-reviewer directly).

### Brief template (empty fields become open questions — never invented)

Objective · Audience (segment + print technology) · Product/topic · Channel & format · Language(s) · Key message & CTA · Deadline · Reference material.

### Closing block — every agent delivery ends with

- **Entregado:** what is attached, plus which `00-sources/` files (if any) were used as grounding — or "CLAUDE.md only" if none.
- **Supuestos:** decisions made without confirmation.
- **Preguntas abiertas:** what is needed from the user.
- **Siguiente paso propuesto:** which agent acts next.

### Approval levels

- Internal (drafts, plans): a reply in chat is enough.
- External (posts, customer emails, press): explicit "aprobado" first.
- Sensitive (prices, new compatibility claims, customer cases, Fiery/Epson mentions): extra validation from Product or the customer.

### Learning loop

User correction → orchestrator proposes a rule with `/aprende` → user confirms → rule is added to `00-strategy/decision-log.md` and to the affected agent file (and to the Claude Doc). Review the log monthly and retire stale rules.

### Git discipline

This repo is a single git repository (`inedit-os-pack`, no other active copy — see decision-log). After every `/aprende` and after every edit to a file in `.claude/agents/` or `.claude/commands/`, make a commit whose message explains the change (e.g. `aprende: cita exacta de Cotton Print, no generalizar`, not `update files`). Don't batch unrelated changes into one commit. Never commit a `.env`/`.env.*` file — `.gitignore` already excludes them; if one ever shows up in `git status`, stop and fix `.gitignore` before committing anything.

### Language

Talk to the user in Spanish. Deliverables are written in Spanish and/or English only (newsletter: English). Catalan is internal only.

## Reference Cases (shared by all agents — use only what is written here)

| Case | Segment(s) | What it proves | Usable quote | Missing |
|---|---|---|---|---|
| **Cotton Print Chile** (Santiago, Aug 2025) — DTG on Kornit + roll-sublimated fabrics, garments, merchandising; sustainability-focused | `dtg-dtf-acquisition`, `sublimation-direct-fabric`, `existing-customers` | Prints exclusively with neoStampa: color faithful to the original design, consistency across fabrics, garments and machines, **30% ink savings** without losing color intensity (figure provided by Inèdit, Oct 2026) | Company quote (no named person): customers "no longer need to compromise between creativity and precision" | `[NEEDS REAL DATA: name/title of spokesperson, printer models]` |
| **Transfertex · myTFX** — sustainable transfer paper producer, design platform | `sublimation-direct-fabric`, `distributor-partners` | neoStampa reads encrypted myTFX files and prints only the purchased meters (pay per meter); 25+ year partnership | André Peters (MD Transfertex): "a long-standing and trusting partnership" | `[NEEDS REAL DATA: release year, platform still active, usage figures]` |
| **S3RTEC Printer & Inks** (Spain, Apr 2026) — printer & ink partner | `dtg-dtf-acquisition`, `distributor-partners` | Partner-generated proof: calibrated a Hanrun DTF printer with neoStampa Delta v26.1 (ICC profile, linearization, ink cut) and posted it on its own; message: fewer test prints, faithful and consistent color | Their LinkedIn post (Spanish), tagging Inèdit and Nanjing Hanrun | `[NEEDS REAL DATA: official distributor status, number of test prints saved, calibration time]` |
| **Optimum Digital USA** (Atlanta) — manufacturer of industrial inkjet printers for carpet and textile | `sublimation-direct-fabric`, `distributor-partners` | OEM partner trains its carpet-printing customers on neoStampa; profiling and color-matching workflows (incl. Pantone) adapted to carpet, "very positive results"; thanks Inèdit for technical support | LinkedIn post (EN) with color charts and Pantone patches | `[NEEDS REAL DATA: post author/date, number of customers trained, measured results; is "Optimum Digital Planet" (0 models in the printer DB) the same brand?]` |

Rules: never say "identical colours" when reusing Cotton Print — say "consistent". Quote the saving as "30% less ink" — don't round it up, don't turn it into "up to" or extend it to other customers. Cotton Print is the go-to case for Spanish-language LatAm content; S3RTEC is the go-to example of a partner promoting neoStampa on its own — use it in distributor co-marketing pitches ("this is what partners like S3RTEC already do"), and reshare/engage rather than rewrite their post. Optimum Digital is the go-to case for carpet printing and for US content (coordinate US messaging with Fiery). Don't claim spectrophotometer compatibility beyond X-Rite i1 Pro without confirmation (the post mentions a Barbieri device).

## Logos

Official logo files live in `brand/shared/logos/` (color and white/reverse versions), showing the "inēdit | fiery" co-branded lockup. This reflects Inèdit's actual corporate relationship with Fiery, LLC (see "Corporate Context" above) — it's accurate to use in most Inèdit-branded content, not a partnership mark that needs case-by-case justification. See `brand/shared/logos/README.md` for details. If a given piece of content is narrowly product-focused and the corporate affiliation isn't relevant to include, that's a judgment call, not a strict rule — flag uncertainty rather than guessing if unsure.

A standalone Inèdit-only logo also exists (`inedit-logo-color.svg` / `INEDIT_RGB_POSITIVO.png`) for product-specific pieces where Fiery context isn't relevant — use it instead of the co-branded lockup in that case, per the judgment call above.

## Official Colors (visual brand — distinct from voice/tone above)

Two separate color references exist, and agents should be precise about which applies:

**General Inèdit corporate colors** (use for company-wide content — the company logo, general one-pagers, exhibition booth branding not tied to one product): Orange `#FE5000` (PANTONE 021 C) and Cool Gray `#888B8D` (PANTONE Cool Gray 8 C). Full detail, including format-by-use-case rules (Pantone/CMYK/RGB/HTML), in `brand/shared/typography-colors/corporate-colors.md`.

**Per-product colors** (use when content is specifically about one product — these are not interchangeable with each other or with the general corporate colors above):

| Product | Flat/Print Color |
|---|---|
| neoTextil | Red — `#DA291C` |
| neoStampa | Blue — `#0072CE` |
| neoCatalog | Green — `#509E2F` |

Full reference (gradients, Pantone, CMYK) in `brand/shared/typography-colors/product-colors.md`.

Any content brief intended for visual execution (Claude Design) should specify which of these applies and the correct exact color — general corporate orange/gray for company-wide content, the specific product color for product-specific content. Note: `#0072CE` already appears throughout existing neoStampa templates and is correct there — but don't reuse it for neoTextil or neoCatalog content just because it's the most established color in the repo so far.

## The Scoreboard (the only metrics that matter)

Tracked in `00-strategy/kpi-scoreboard.md`. Every agent's output should be traceable to one of these:
- Trial signups (neoStampa)
- Qualified demo requests
- Existing-customer upgrade rate
- Active distributor co-marketing deals
- Newsletter → trial click-through rate

Do not introduce new vanity metrics (followers, opens, impressions) as primary success measures.

## Folder Map — Where Things Live

- `00-strategy/` — the plan itself, the daily cadence, the live scoreboard, and `decision-log.md` (the learning-loop record — see "Learning loop" above). Read-only for most agents; only update the scoreboard/log when explicitly asked or via `/aprende`.
- `00-sources/` — general source material (brochures, flyers, release notes) that feeds the general subscriber newsletter and other cross-segment pieces. Drafted by the orchestrator directly, not routed to a segment agent. See `00-sources/README.md`.
- `01-existing-customers/` `02-dtg-dtf/` `03-distributors/` — segment-specific work in progress (briefs → drafts → sent/published).
- `04-social/` — cross-segment social content calendar, fed by what's shipping elsewhere.
- `05-tutorials/` — customer-facing tutorial backlog and scripts, fed by Sales questions.
- `06-exhibitions/` — one subfolder per trade show, each with its own timeline and lead log.
- `07-releases/` — the general release-launch playbook, reused whenever a real release date is confirmed.
- `08-neotextil-designers/` `09-neocatalog-teams/` — lightweight, monthly-cadence work for the two secondary segments. Simpler structure than the core three since volume is lower.
- `10-sublimation-direct-fabric/` — Segment 6, core/weekly work (briefs → drafts → sent), same structure as `01-existing-customers/`. Numbered 10 (not 6) purely to avoid colliding with the already-numbered `09-neocatalog-teams/` — the number is a folder-ordering artifact, not a priority signal (see Segment 6 note above).
- `brand/` — split by product: `shared/` (company logo, master typography/colors) plus `neostampa/`, `neotextil/`, `neocatalog/` (each with its own `templates/` and `assets/`). See `brand/README.md` for the full breakdown. Voice/tone guidance (not visual) stays in this file, above.
- `outputs/` — final, ready-to-send/ready-to-publish work lands here. Nothing in `outputs/` should still have placeholder text or `[NEEDS REAL DATA]` markers.
- `.claude/agents/` — one file per agent (segment + transversal). `.claude/commands/` — slash commands, currently `/aprende` (log a correction as a rule) and `/revisa` (review an already-published piece against this brief).

## How to Work in This Repo

1. Every task starts by checking `00-strategy/kpi-scoreboard.md` and the relevant segment's brief — don't create work in a vacuum.
2. Draft work stays in that workstream's own folder (e.g. drafts in `02-dtg-dtf/video-scripts/`) until it's genuinely final.
3. Only move finished, reviewed work into `outputs/`.
4. If a task touches visual design (graphics, one-pagers, thumbnails), produce the *copy and content brief* here, and note clearly that the next step is Claude Design — don't attempt to generate finished visual assets as code.
5. Flag anything uncertain rather than inventing it. A flagged gap is useful; a confident wrong number is not.
6. Before drafting any piece, check `00-sources/` for relevant brochures, flyers, or release notes. Use only data that appears there or in this file (`CLAUDE.md`) — never invent beyond those two sources. State in the closing block which `00-sources/` files were used.
