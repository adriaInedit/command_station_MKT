# Inèdit Software Design System

## Overview

**Inèdit Software** is a Barcelona-based B2B software company specializing in digital solutions for the textile industry. Their product suite covers the full workflow from creative design to production-ready digital printing. As of 2026, Inèdit is part of the **Fiery** group — reflected in the current **inēdit · fiery** lockup logo.

**Website:** https://www.inedit.com/en/

---

## Products

| Product | Type | Description |
|---|---|---|
| **neoStampa** | RIP Software | High-performance digital textile printing RIP. Color calibration, profiling, cost control, multi-printer support. |
| **neoTextil** | Adobe Photoshop Plugin | Textile design plugin for repeat creation, colorways, and automated rapport generation. |
| **neoCatalog** | Workflow / Catalog | Centralized design catalog and workflow management — traceability, collaboration, large-volume design management. |
| **neoMatch** | Color Management | Color matching solution for accurate cross-substrate reproduction. |

---

## Sources

- **Current logo:** `assets/inedit-fiery_logo.png` (full color, transparent) + `assets/inedit-fiery_logo_white.png` (knockout for dark backgrounds) — the inēdit · fiery lockup, rendered from the official vector PDF.
- **Legacy logos (pre-Fiery, archived):** `assets/inedit_logo_negro.png`, `assets/inedit_logo_gris-768x214.png`, `assets/inedit_logo_black.png` — do not use for new work.
- **Fonts:** Full Soho Gothic Pro family — 14 weights/styles in `fonts/`
- **Website:** https://www.inedit.com/en/ (live reference)
- **No Figma or codebase** was provided — visual foundations derived from the website and logo assets.

---

## CONTENT FUNDAMENTALS

### Tone & Voice
- **Professional, direct, expert.** Inèdit speaks to textile industry professionals — designers, production managers, print technicians.
- **Second person "you"** — "your workflow", "your designs", "your printers". Direct address, not passive.
- **Confidence without arrogance.** Technical authority is assumed, not overstated. Precision > superlatives.
- **No emoji.** Copy is clean, factual, and structured. Bullet points are common.
- **Bilingual:** Primary markets are Spanish-speaking + international; website offers EN/ES. Copy tends to be formal in Spanish, direct in English.
- **Sentence case** for most headings; product names always styled as written (neoStampa, neoTextil, neoCatalog — lowercase "neo" + TitleCase suffix).
- **No exclamation marks** in product copy. Measured, not excited.

### Naming Conventions
- Company: **Inèdit** (capital I, ē with macron) — never "Inedit" in formal contexts
- Products: entire name in bold — e.g. **neoStampa**
- "neo" is always lowercase; the product suffix uses title case

### Example Copy Patterns
> "Optimize your color workflow from design to substrate."
> "neoStampa Delta delivers consistent, calibrated output across every printer in your fleet."
> "Move from concept to production-ready artwork faster than ever."

---

## VISUAL FOUNDATIONS

### Color
- **Primary accent:** Orange `#E84020` — used for CTAs, active states, the "ē" in the logo, icon highlights, product chips
- **Brand gray:** `#898989` — the "in" and "dit" in the color logo; secondary text, muted elements
- **Dark text:** `#2B2B2B` — body and heading copy
- **White:** `#FFFFFF` — dominant background; brand is predominantly white-space-forward
- **Light gray bg:** `#F4F4F4` / `#EFEFEF` — alternating section backgrounds
- **No gradients** on brand elements; color is used flat and purposefully
- Dark footer: `#1A1C1D` with white-knockout logo variant (`inedit-fiery_logo_white.png`)

### Product Colors (inferred from site differentiation)
- neoStampa: Orange `#E84020` (matches brand primary)
- neoTextil: Blue `#2D7DD2`
- neoCatalog: Teal `#3AB795`
- neoMatch: Purple `#8B5CF6`

### Typography
- **Single typeface:** Soho Gothic Pro (full 14-style family provided)
- **Headlines:** Bold or ExtraBold, often italic — especially in hero contexts
- **Logo:** Bold Italic (the brand wordmark uses this style)
- **Body:** Regular or Light weight
- **Labels / eyebrows:** Medium or Bold, wide letter-spacing, uppercase
- **Display text:** Bold Italic — a signature Inèdit style. Italic is expressive, not just emphasis.
- **No serif, no monospace** — Soho Gothic Pro covers all roles

### Layout & Spacing
- **Wide gutters, generous whitespace.** Clean, uncluttered layouts.
- **Full-bleed hero sections** with background images (product screenshots, textile imagery)
- **Max content width:** ~1200px centered on page
- **Section rhythm:** alternating white / light-gray backgrounds
- **Grid:** Mostly 3-column feature grids for product benefits; 2-column for text + image

### Backgrounds & Imagery
- **Photography:** Professional textile/print industry imagery — fabric textures, printer hardware, designer workspaces
- **Color temperature:** Neutral to warm; no heavy filters or grain
- **No hand-drawn illustrations** — photography and UI screenshots are the primary visual assets
- **Product screenshots** used extensively as proof of capability (the software UI itself is a visual asset)
- **No background gradients** on the brand itself

### Animation & Interaction
- **Subtle and functional.** Fades and slides on scroll, no bounces or exaggerated easing.
- **Hover states:** Color shift on links (orange on hover); opacity reduction on image cards; arrow icon movement on CTAs
- **CTAs:** Filled orange button with white text; hover darkens to `#C4300F`. No border-only ghost buttons on dark BG.
- **No parallax, no GSAP-heavy animation** — performance-first, B2B context

### Cards & Components
- **Cards:** White background, subtle shadow (`0 4px 12px rgba(0,0,0,0.10)`), minimal border radius (4–8px)
- **No colored left-border accent style** — borders are rare; shadow defines card depth
- **Buttons:** Rounded pill (`border-radius: 9999px`) for primary CTAs; rectangular with small radius for secondary
- **Forms:** Clean, labeled inputs with bottom or full border; no floating labels
- **Nav:** Fixed white top bar with logo left, menu center/right; orange active state; dropdown mega-menus

### Iconography
- See ICONOGRAPHY section below

### Corner Radii
- Small (buttons, tags): 2–4px
- Cards: 4–8px
- Pills (CTAs): 9999px (fully rounded)
- No exaggerated large radii

### Shadows
- Cards: `0 4px 12px rgba(0,0,0,0.10)`
- Modals / elevated: `0 10px 30px rgba(0,0,0,0.15)`
- No inset shadows

---

## ICONOGRAPHY

### Approach
- **Minimal, functional iconography.** Icons are used sparingly — mostly for feature bullets and navigation cues.
- **Style:** Simple, clean outline or filled SVG icons. Stroke weight: 1.5–2px equivalent. Not decorative.
- **No icon font built-in** to the brand.
- **No emoji** used as icons.

### Source
- The product icons (neoTextil, neoStampa, neoCatalog) were provided as `.ai` files (`uploads/Icono_nT_30x30.ai`, `uploads/Icono_nS_30x30.ai`, `uploads/Icono_nC_30x30.ai`) — these are 30×30 Adobe Illustrator files. They are not copyable as SVG without Illustrator. **CDN substitute used:** Lucide Icons (consistent stroke, modern style). See `ui_kits/` for implementation.
- **Substitution flag:** The `.ai` product icon files could not be rendered — a future task is to export them as SVG/PNG and place them in `assets/`.

### Usage
- Navigation arrows: simple chevrons
- Feature bullets: small filled or outline icons (24px, `--color-orange-500` or `--fg2`)
- Product badges: 30×30 product icons on white or colored chips

### Recommended CDN
```html
<script src="https://unpkg.com/lucide@latest/dist/umd/lucide.min.js"></script>
```

---

## FILE INDEX

```
/
├── README.md                  ← This file
├── SKILL.md                   ← Agent skill definition
├── colors_and_type.css        ← All CSS tokens (colors, type, spacing, shadows)
├── fonts/                     ← Full Soho Gothic Pro family (14 OTF files)
├── assets/
│   ├── inedit-fiery_logo.png       ← CURRENT logo (full color, transparent)
│   ├── inedit-fiery_logo_white.png ← CURRENT logo (knockout for dark bg)
│   ├── neoStampa_25_eng.pdf        ← neoStampa 2025 brochure (English)
│   ├── Flyer_DTF_Esp.pdf           ← neoStampa Delta DTF flyer (Spanish)
│   ├── inedit_logo_negro.png       ← LEGACY wordmark (archived)
│   ├── inedit_logo_black.png       ← LEGACY wordmark (archived)
│   └── inedit_logo_gris-768x214.png ← LEGACY color logo (archived)
├── preview/                   ← Design System tab cards (registered assets)
│   ├── colors-brand.html
│   ├── colors-neutrals.html
│   ├── colors-semantic.html
│   ├── colors-products.html
│   ├── type-scale.html
│   ├── type-weights.html
│   ├── type-roles.html
│   ├── spacing-tokens.html
│   ├── radius-shadows.html
│   ├── components-buttons.html
│   ├── components-inputs.html
│   ├── components-cards.html
│   ├── components-badges.html
│   ├── components-nav.html
│   └── brand-logos.html
└── ui_kits/
    ├── website/               ← inedit.com marketing website UI kit
    │   ├── README.md
    │   ├── index.html
    │   └── *.jsx
    ├── neostampa/             ← neoStampa RIP software UI kit
    │   ├── README.md
    │   ├── index.html
    │   └── *.jsx
    ├── neotextil/             ← neoTextil Photoshop plugin UI kit
    │   ├── README.md
    │   ├── index.html
    │   └── *.jsx
    └── neocatalog/            ← neoCatalog workflow UI kit
        ├── README.md
        ├── index.html
        └── *.jsx
```
