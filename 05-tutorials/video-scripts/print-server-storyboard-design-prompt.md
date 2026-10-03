# Claude Design Prompt — "What Is Print Server?" Storyboard (Final, with real screenshots)

**Purpose of this file:** a ready-to-paste prompt for the Claude Design skill (`/design`) to generate a **10-artboard storyboard** for the animated explainer video scripted in `print-server-intro-script.md`, built using real neoStampa/Print Server screenshots supplied by the user.

**Important scope note:** Claude Design produces a static, multi-artboard visual canvas (an Artifact) — it does not render a moving video file. What this prompt produces is the complete, frame-accurate visual design for every scene, laid out in sequence, with the real screenshots composited in. That canvas is the asset an animator/video editor then imports and animates (adding motion, transitions, voiceover, timing) to produce the final video file. If a rendered `.mp4` is the end goal, this storyboard is the step right before it, not a replacement for it.

**Before running this prompt:** have the following screenshots ready to attach (see the "SCREENSHOTS TO ATTACH" list below for exactly which scene each one feeds). Blur or crop out any real IP address, port number, or the WebAPI security token itself before attaching — the script's pre-production notes call this out explicitly, and it applies here too.

---

## Prompt to paste into Claude Design

```
Design a 10-artboard storyboard for a short animated explainer video called
"What Is Print Server? A Beginner's Guide" — a customer tutorial for Inèdit
Software's neoStampa product. Each artboard is one storyboard frame
representing one scene of the video (16:9 landscape, one artboard per scene,
labeled with its scene number and timecode). This is a storyboard/animatic
reference for a motion designer to animate from — not the final animation
itself, so keep each frame clean, readable as a single freeze-frame, and
focused on ONE key visual idea plus its on-screen text.

BRAND
- Product: neoStampa (this is entirely neoStampa-specific content)
- Primary color: neoStampa Blue #0072CE
- Accent/neutral: Cool Gray #888B8D — use sparingly, for secondary UI chrome
  or de-emphasized elements
- Do NOT use the general corporate orange (#FE5000) or the neoTextil/neoCatalog
  colors — this is single-product content
- Style: clean flat 2D vector / modern motion-graphics style. Simple geometric
  icons and shapes, generous white space, no photorealism, no literal
  pixel-accurate screenshots — abstract/simplified UI mockups instead.
- Typography: clean sans-serif, confident but not shouty — matches a brand
  voice that is "confident but not hype-driven, specific over abstract"

STYLE GUIDE ARTBOARD (create this first, as artboard 0)
A small reference artboard showing: the color palette swatches (#0072CE plus
white/light neutrals and #888B8D), the icon set to be reused throughout
(printer, queue/list, folder, browser/laptop, lock or key for the security
token, arrow/connector), and one example of the on-screen text treatment
(lower-third style caption bar).

SCENES (one artboard each, 16:9)

Scene 1 — 0:00–0:20
Split frame: left side a single idle printer icon, greyed out; right side the
same printer actively mid-print with a small stack of job icons queued behind
it, in neoStampa blue. Small Inèdit logo mark, bottom corner.

Scene 2 — 0:20–0:45
Simple horizontal flow diagram, three icons connected by arrows, left to
right: neoStampa icon → Print Server icon → printer icon. Caption bar at
bottom: "Print Server = your printing queue, automated."

Scene 3 — 0:45–1:10
Use the attached screenshot of neoStampa's Printer Configuration screen
(showing the "set Print Server as default queue" option) as the base of this
frame. Composite it inside a clean laptop/monitor frame, add a soft blue
glow/highlight ring around the default-queue toggle so it reads clearly as a
callout, and add a small arrow pointing at it. Keep surrounding UI chrome
slightly desaturated so the highlighted control is the obvious focal point.

Scene 4 — 1:10–2:00
Use the attached screenshot of the Print Server queue window as the base of
this frame. Highlight three things with callout circles/arrows and short
labels: a job row's status indicator ("Status at a glance"), the
enable/disable toggle on a row ("Enable / disable"), and one row visually
lifted/offset with a motion-cue arrow showing it being dragged up the list
("Reorder"). Desaturate the rest of the screenshot slightly so the callouts
pop.

Scene 5 — 2:00–2:20
Use the attached screenshot (or cropped detail) of the Finished Jobs setting
in Print Server Configuration, showing the Delete / Keep in Queue / Archive
options. Add a simple highlight box around that control group.

Scene 6 — 2:20–3:15
Folder icon on the left labeled "Hot Folder," a file/document icon animating
(dashed motion-path arrow) into the folder, then a second arrow from the
folder straight into a printer icon on the right — no computer/monitor in
this path at all, to visually reinforce "no one has to open neoStampa."
Caption: "Drop a file → it prints. That's it."

Scene 7 — 3:15–4:15 (two beats on one artboard, or split into 7a/7b if that
reads cleaner)
7a: laptop/browser icon labeled "Web store / ordering system" with an arrow
into a Print Server icon, then into a printer icon. Caption: "Web-to-print:
your storefront talks directly to the queue."
7b: add a small lock/key icon on the connecting arrow between the browser and
Print Server, with a short caption: "Print Server generates a token → your
website uses it to connect securely." If a screenshot of the WebAPI toggle in
Log System & External Connections is attached (with the actual token value
and any IP/port blurred out, per the standing instruction above), use a
cropped detail of it as a small inset in the corner of this frame rather than
the full panel — it's a supporting detail, not the focal point of the frame.

Scene 8 — 4:15–4:35
Two simplified building/location icons (e.g. two rounded rectangles labeled
"Design studio" and "Production floor") connected by a dashed network line,
each with a small printer icon, illustrating jobs routed between locations.

Scene 9 — 4:35–5:00
Clean title-card style frame: "Print Server — three jobs, one queue." with
three numbered icon+label rows appearing as a simple vertical list: queue
icon "Manage the queue," folder icon "Automate with Hot Folder," browser icon
"Connect remotely for web-to-print."

Scene 10 — 5:00–5:20
End card: Inèdit logo (use the plain Inèdit product logo, not the co-branded
Fiery lockup — this is product-specific tutorial content, not corporate
messaging), "neoStampa" wordmark, and two CTA text placeholders: "Set up
Print Server →" and "Questions? Talk to us →" — leave the actual URLs as
placeholder text, they'll be filled in once the CTA destination is confirmed.

Keep all ten scene artboards laid out left-to-right on the canvas in scene
order so the sequence reads as a filmstrip.
```

---

## Screenshots to attach when running this prompt

| For scene | Screenshot needed | Redact before attaching |
|---|---|---|
| 3 | neoStampa → Printer Configuration, showing the "set Print Server as default queue" option | — |
| 4 | Print Server queue window with a few jobs listed (mixed statuses if possible) | Any real customer/job names visible in the Title column |
| 5 | Print Server Configuration → Finished Jobs setting (Delete / Keep in Queue / Archive) | — |
| 7b (optional) | Log System & External Connections panel showing the WebAPI toggle and Security token field | The token value itself and any real IP/port |

If a screenshot isn't available for a given scene, fall back to an abstracted icon-based mockup for that frame instead (simplified boxes/labels, not a fake detailed UI) rather than leaving it blank.

## Notes for whoever runs this

- Scenes 1, 2, 6, 8, 9, and 10 stay icon/diagram-based by design (they're conceptual beats — queue flow, Hot Folder automation, remote printing, recap, end card) — don't force real screenshots into these; they'd clutter frames that are meant to communicate an idea, not a UI.
- Scene 7's token mention is deliberately kept as a small supporting visual (a lock icon on the connector, optional inset screenshot), matching how it's handled in the voiceover — a beginner-level mention, not a security deep-dive.
- Once Claude Design generates the storyboard artboards, review against the script's still-open items (`[NEEDS REAL DATA]`, `[NEEDS CONFIRMATION]` CTA link) before treating any part of this as final — the storyboard doesn't resolve those, only the script content does.
- Output of this prompt is a visual design canvas (artboards), not a rendered video — per this repo's workflow, this .md file is the content brief; Claude Design produces the storyboard; an animator/video tool turns that into the actual moving `.mp4`.
