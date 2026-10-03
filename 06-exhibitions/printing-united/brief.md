# Printing United — Exhibition Brief

Status: draft, content-complete pending 3 fields — **show is Sept 23–25, only 3 days out from today (2026-09-20), so this is time-critical.** Created 2026-09-20 by Adrià (adriavalles@inedit.com).

## What's confirmed (as of 2026-09-20, from Adrià directly)

- Show name: Printing United, **September 23–25** (assumed 2026, same as today's date — not explicitly stated, low-risk assumption but worth a final glance before send).
- **Booth 1449.**
- On-booth focus: **all of neoStampa's new features** — treated as a live product demo, not a generic "come say hi" show.
- Feature content (2026-09-20 revision) replaced with the 14-feature list Adrià supplied directly: Quick Calibration, Different Printers/Same Color, Print What You See, Save up to 30% White Ink, Control Center, Optimize Color Gamut, Punch, Highlight Effect, Choke System, Calibrate Color Libraries, 16 Inks + Fluors, Cutting Machines, Color Knock Out, Connect Your Web-to-Print. Laid out as a compact 2-column grid (title + one-line description) rather than long paragraphs, to keep the email short. Minor copy cleanup only (typo fixes: "Efciently"→"Efficiently", "Incude"→"Include", "fluorecent"→"fluorescent", "Efect"→"Effect") — no content invented.
- Note: two items in the source list ("Choke System", "Connect Your Web-to-Print") name **neoStampa Delta** specifically, not neoStampa generically — kept as given, but worth confirming with Adrià whether the booth demo is neoStampa Delta specifically or neoStampa broadly, since the email otherwise refers to "neoStampa" throughout.
- Header image: reused the existing hosted neoStampa banner asset already used in production neoStampa emails (Pardot-hosted `heading_ns_inedit_fiery3.png`) — real, already-live asset, not a placeholder.
- Email built to match the real Salesforce/Pardot production template Adrià supplied (XHTML transitional doctype, 600px table layout, `-apple-system`/SF Pro font stack, `#0072CE` neoStampa blue, same footer with social links, real company address, and `{{Unsubscribe}}` / `{{EmailPreferenceCenter}}` merge fields) — not the earlier generic draft's styling.

- Venue: **Las Vegas** (confirmed 2026-09-20).
- Header image: swapped to `/Users/adriavallesbaradad/Desktop/firma_printing_united.png` (900x224px), a Printing United Expo banner supplied by Adrià. It independently confirms **Sept 23–25, 2026, Las Vegas, Booth 1449** — matches everything already in the draft, no conflicts. The graphic itself contains a "GET A FREE TICKET HERE" call-to-action baked into the image.

## Flag worth a second look (not blocking)

- The header banner shows the **Fiery logo only** — no Inèdit or neoStampa branding in the image itself. CLAUDE.md's Corporate Context section says day-to-day Inèdit marketing should stay under the Inèdit identity, not be rebranded as "Fiery." This may be intentional (a shared Fiery-family booth presence, or an official show-supplied asset used as-is), but worth a quick confirm with Adrià that a Fiery-only header is the right call for an Inèdit-audience send, given the body content is 100% neoStampa-specific.

## What's NOT confirmed yet (must be filled before send)

- `[NEEDS REAL DATA: hosted URL for firma_printing_united.png]` — needs uploading to Salesforce Marketing Cloud Content Builder; a local file path won't render in an email client.
- `[NEEDS REAL DATA: free-ticket registration link]` — the header image says "GET A FREE TICKET HERE," so the image should probably link to Printing United registration (possibly with an exhibitor/badge code), not a generic homepage. Currently a placeholder.
- `[NEEDS REAL DATA: booth demo booking / show landing page URL]` — the CTA button link lower in the email.
- Confirm neoStampa 26.6 is still the version on the show floor (flagged inline in the HTML) — if a newer build ships before the 23rd, the three feature blocks need updating to match.

## Segment targeting

Per `00-strategy/daily-cadence.md` Section 6, exhibitions most often target **Distributors + DTG/DTF**, less often **Existing Customers**. Printing United is a broad industry show, so this draft treats all three as plausible booth visitors but keeps each segment's hook distinct rather than blending them into generic "come see us" copy — see the three short bullets in the email under "Why stop by," one per segment.

## Materials reuse (per CLAUDE.md — don't create new collateral from scratch)

- Booth demo: reuse the existing DTG/DTF acquisition demo workflow (white-ink/color-accuracy walkthrough), not a new script.
- Distributor conversation: reuse the existing distributor one-pager as the in-person leave-behind (see `03-distributors/`) — not drafted here.
- Logo: reuse the co-branded `inēdit | fiery` lockup from `brand/shared/logos/` — see reasoning below.

## Logo / branding judgment call (revised 2026-09-20)

Superseded by Adrià's direction: the booth content is specifically "all of neoStampa's new features," so this is product-specific, not general corporate content. Switched from the general corporate palette to **neoStampa blue `#0072CE`** per the product-colors rule in CLAUDE.md, and reused the existing hosted `heading_ns_inedit_fiery3.png` header banner (the "neoStampa by Inèdit" lockup already used in real neoStampa release emails) instead of the plain co-branded `inēdit | fiery` mark — consistent with how the team's actual neoStampa emails are branded.

## CTA / KPI tie-in

CTA is "Book a demo at our booth," tied to **Qualified demo requests** on the scoreboard (`00-strategy/kpi-scoreboard.md`). Chosen over a generic trial-signup CTA because an in-person booth demo is the natural conversion point for a trade show — visitors are already there to see the product live, not to self-serve a trial signup. Distributor co-marketing is the secondary goal but happens face-to-face at the booth, not through the email CTA itself.

## Next steps before this can move to `outputs/`

1. Confirm all `[NEEDS REAL DATA]` items above with Sales/ops (per T-6 in the daily cadence).
2. Upload the logo (and any other embedded images) to Salesforce Marketing Cloud's Content Builder / CDN and swap in the real hosted URL.
3. Decide whether to send this as one general version (current draft) or split into segment-specific sends — flagged as open in the email draft itself.
4. Create `timeline.md` (T-6/T-4/T-2/T-1/During/After) and `leads-log.md` once the date is confirmed and prep actually starts.
