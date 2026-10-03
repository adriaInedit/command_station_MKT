# Brand Folder — How It's Organized

This folder splits into a `shared/` layer (things true across all of Inèdit) and one subfolder per product (`neostampa/`, `neotextil/`, `neocatalog/`), since each product likely has its own visual treatment even under the same parent brand.

## `shared/`

- `logos/` — the main Inèdit Software company logo, in whatever formats you have (SVG, PNG, etc.). Use this when content represents the company as a whole rather than a single product (e.g. the email footer, a general company one-pager, exhibition booth branding that isn't product-specific).
- `typography-colors/` — contains two official color reference files:
  - `corporate-colors.md` — the general Inèdit orange (`#FE5000`) and cool gray (`#888B8D`), with usage rules for when to use Pantone vs. CMYK vs. RGB vs. HTML.
  - `product-colors.md` — each product's own color (neoTextil red, neoStampa blue, neoCatalog green), with gradients and Pantone values.
  - If Inèdit's full official brand guidelines PDF exists beyond these color pages, it also belongs here.

## `neostampa/` `neotextil/` `neocatalog/`

Each product folder has the same two subfolders:
- `templates/` — reusable starting points for that product's content: the email template structure, a one-pager layout, a social graphic template. The existing neoStampa email HTML (the "What's new in neoStampa 2026" template) belongs in `neostampa/templates/`.
- `assets/` — finished, exported visual assets specific to that product: product screenshots, the product's own logo lockup (if it has one distinct from the main Inèdit logo), icons used in its materials, exported graphics from Claude Design.

## Why split this way instead of one flat folder

Without the split, an agent (or you) working on neoTextil content would have to manually figure out which template or asset in a shared pile actually belongs to neoTextil versus neoStampa. Splitting by product removes that guesswork — the `neotextil-designers` agent only ever needs to look in `brand/neotextil/`, `brand/shared/`, and its own working folder.

## What Goes Where: Quick Reference

| You have... | Goes in... |
|---|---|
| The Inèdit company logo | `shared/logos/` |
| Master color palette / typography guide | `shared/typography-colors/` |
| neoStampa email template (the existing HTML) | `neostampa/templates/` |
| A neoStampa product screenshot | `neostampa/assets/` |
| neoTextil's Quick Rapport feature graphic | `neotextil/assets/` |
| A one-pager template for distributor outreach | `neostampa/templates/` (since current distributor work is neoStampa-focused) |
| A finished Claude Design export for a neoCatalog post | `neocatalog/assets/` |

## Note on Claude Design Workflow

Per `CLAUDE.md`, agents write copy and content briefs only — they don't generate finished visuals. Once you've taken a brief into Claude Design and have a finished asset, export it back into the relevant product's `assets/` folder here (not into the workstream folder where the brief originated), so `brand/` stays the single place to find anything visual, regardless of which workstream commissioned it.
