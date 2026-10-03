# Product Color Branding (Official)

Source: official Inèdit brand guidelines slide ("Colores de programas"). This is the authoritative color reference for all three products — agents and templates should pull exact values from here, never approximate or reuse one product's color for another.

## How the System Works

Each product has a two-color gradient (a lighter and a darker tone of the same hue) for on-screen use, plus a single flat "summary" color for print and situations where a gradient isn't needed or practical.

> [!IMPORTANT]
> The gradient colors are screen-only. For print, or on-screen contexts where a gradient isn't appropriate, use the flat Pantone/summary color instead.

## neoTextil — Red

- **Icon:** white "nT" on red square
- **Gradient — Light:** RGB 255/0/0 · `#FF0000`
- **Gradient — Dark:** RGB 143/0/0 · `#8F0000`
- **Flat / Print summary color — PANTONE 485 C**
  - CMYK: 0/95/100/0
  - RGB: 218/41/28
  - HTML: `#DA291C`

## neoStampa — Blue

- **Icon:** white "nS" on blue square
- **Gradient — Light:** RGB 0/159/255 · `#009FFF`
- **Gradient — Dark:** RGB 0/67/183 · `#0043B7`
- **Flat / Print summary color — PANTONE 285 C**
  - CMYK: 90/48/0/0
  - RGB: 0/114/206
  - HTML: `#0072CE`

> Note: `#0072CE` was already in use across the repo's existing templates (the neoStampa email, the 90-day plan doc, the daily cadence doc) as if it were a general brand blue. It is in fact neoStampa's specific product color and happens to be correct for that product, but should not be reused for neoTextil or neoCatalog content going forward — use this file to confirm the right color per product instead of copying `#0072CE` by habit.

## neoCatalog — Green

- **Icon:** white "nC" on green square
- **Gradient — Light:** RGB 92/191/63 · `#5CBF3F`
- **Gradient — Dark:** RGB 15/101/42 · `#0F652A`
- **Flat / Print summary color — PANTONE 362 C**
  - CMYK: 78/0/100/2
  - RGB: 80/158/47
  - HTML: `#509E2F`

## Quick Copy-Paste Table

| Product | Flat/Print HTML | Gradient Light | Gradient Dark | Pantone |
|---|---|---|---|---|
| neoTextil | `#DA291C` | `#FF0000` | `#8F0000` | 485 C |
| neoStampa | `#0072CE` | `#009FFF` | `#0043B7` | 285 C |
| neoCatalog | `#509E2F` | `#5CBF3F` | `#0F652A` | 362 C |

## Usage Guidance for Agents and Templates

- When producing copy/content briefs intended for visual execution (Claude Design), specify the correct product color from this table in the brief rather than leaving color unspecified or guessing.
- HTML email templates, social graphics, and one-pagers for a given product should use that product's flat/print color as the primary accent unless a gradient is specifically appropriate for an on-screen-only piece.
- General Inèdit-wide content (not tied to one product) should use `brand/shared/` colors if/when those are defined — do not default to neoStampa's blue as a stand-in "general" brand color just because it's currently the most-used.
