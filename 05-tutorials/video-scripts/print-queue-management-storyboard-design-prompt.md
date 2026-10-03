# Screen-Recording & Storyboard Brief — "neoStampa's Printing Job Queue" (Deep-Dive)

**Purpose of this file:** unlike the Print Server intro's storyboard (which used abstract icon-based scenes because it's a concepts video), this tutorial is a hands-on UI walkthrough — it lives or dies on showing the **real** queue window, the real Process/Send flyout, the real Queue Settings dialog, and the real right-click menu. There is no substitute for actual screen-capture footage here, and this brief exists to spell that out and hand off a clean shot list, rather than to generate a mockup storyboard from fabricated UI.

**Status: blocked on real screen-capture footage.** Nothing in this file should be treated as a finished visual asset. No screenshots of the actual queue window, Process/Send dialog, right-click menu, Queue Settings dialog, or cost calculation utility currently exist in this repo (checked `05-tutorials/video-scripts/screenshots/` and `02-dtg-dtf/raw-footage-notes/` — both come up empty for this feature specifically). This needs a dedicated recording session against a live, non-production neoStampa instance before any storyboard or edit can be built.

---

## Why this isn't an icon-based Claude Design storyboard like the intro video

The Print Server intro tutorial is conceptual — "what is this and why does it matter" — so an abstracted, icon-driven storyboard (queue icon, folder icon, arrows) communicates the idea fine, and Claude Design's illustrative style was the right tool for it.

This tutorial is the opposite: it's a reference walkthrough of eighteen specific toolbar buttons, three Process/Send modes, a right-click menu, and a multi-field settings dialog. The entire value of the video is "here's exactly what that button looks like and what happens when you click it." An abstracted mockup of an 18-button toolbar would misrepresent the actual UI (wrong button order, wrong icon shapes, wrong dialog layout) and could teach something incorrect. So: **real screen capture, not illustration, is the deliverable for every UI-facing scene.** Title cards, recap screens, and the cold-open split-view can still use simple graphic treatment (matching the intro video's title-card style, neoStampa blue `#0072CE`), but every scene that shows a button, menu, or dialog must be real.

---

## Full shot list (maps to scenes in `print-queue-management-script.md`)

Record all of these against one continuous demo/test queue session if possible — it keeps job states consistent across shots and avoids re-setup between scenes. Use placeholder job names only (`Job_001.prn`, `SampleFile.plt`, `TestPattern_02.tif`) — no real customer file names, paths, IP addresses, or account info visible anywhere on screen.

| Scene(s) | What to capture | Setup needed beforehand |
|---|---|---|
| 1 | The full queue window with 5–6 jobs in a mix of statuses (waiting, processing, printing, paused, error) visible simultaneously | Queue several test jobs, deliberately pause one, let one fail (or simulate an error state) so the status column shows real variety |
| 2 | A slow, steady pan/zoom across the toolbar (all 18 buttons in view) and the job list; a quick flash of the right-click menu appearing and being dismissed | Same session as above |
| 3 | The Process/Send flyout or dialog opened from a selected waiting job — capture all three options visible (Process Only / Process and Send / Send), then a second take showing the copy-quantity field specifically for Process and Send, and a third showing the "redirect to file" option under Send | Have at least one job in "waiting" (unprocessed) status and one already-processed job available, since Send behaves differently depending on job state |
| 4 | Click Activate queue on a stopped queue (show a job start moving to Processing/Printing), then click Stop queue (show it halt) | Start this shot with the queue in a stopped state |
| 5 | Sequential clicks: View job information (capture whatever panel/dialog opens — full contents, not cropped), Add processed files (capture the file picker filtered to .prn/.plt if it is), Process/Send selected job (can reuse Scene 3 footage), Pause selected job, Stop printing after current copy, Cancel job | Queue a job with 3+ copies specified so "stop after current copy" has something meaningful to demonstrate — a single-copy job won't show the difference |
| 6 | Select a mid-list job, click each of Move to queue head / Move up / Move down / Move to queue bottom in sequence, with the list visibly reordering each time | Queue at least 5 jobs so movement is visually obvious |
| 7 | Reopen job on a finished/cancelled job (show status flip back to waiting), Remove selected jobs on a single job, Delete finished jobs with 2–3 finished jobs present, Delete all jobs **on the test queue only, at the very end of the session** since it clears everything | Save Delete all jobs for last in the recording order — it empties the queue |
| 8 | Cost calculation utility opened from the toolbar — capture full contents; Queue settings dialog opening (just the open action here, contents come in scene 9) | — |
| 9 | Queue Settings dialog, every field visible: temporary folder path, Job ID number, auto-start checkbox, include-Job-ID-in-filename checkbox, retry-failed-jobs setting, retain-processed-jobs setting, pause-duration-between-jobs field | Capture at both default and a couple of fields toggled/edited, so the "before" and "after" state of a checkbox is available for callout animation if needed |
| 10 | Advanced Options: Length Mode toggle (ideally with a Rapport-generated document actually loaded, since the article specifies this only applies to Rapport prints), Bi-directional Print option, Cut Sheet at the End setting, Origin Setup fields (pre-feed lengthwise, displacement widthwise) | Confirm with an SME where these live in the UI — the source article doesn't specify whether they're inside Queue Settings, a separate Advanced Options panel, or per-job settings. **Flagging this as an open question** — don't assume a location without checking against the live software first |
| 11 | Right-click context menu on a job, full menu visible, ideally with a quick side-by-side or overlay comparison against the toolbar to visually reinforce "same functions, different layout" | — |
| 12 | No new capture — reuse the cold-open framing or a clean shot of the full queue window for the recap/end card background | — |

---

## Redaction checklist (apply before any footage leaves the recording machine)

- Blur or replace any real IP address, hostname, or network path
- Blur or remove any real customer/job file names — use the placeholder names above instead
- Blur any license key, serial number, or account identifier that happens to be visible in About/status panels
- If the cost calculation utility pulls in real ink pricing or cost data, replace with placeholder numbers before recording, or blur post-capture

---

## Open questions to resolve before this footage is shot (don't guess these on camera)

1. **Where do Advanced Options (Length Mode, Bi-directional Print, Cut Sheet at the End, Origin Setup) actually live in the UI?** The source article lists them under "Advanced Options" but doesn't say whether that's inside Queue Settings, a separate dialog, or attached to individual jobs. Confirm with an SME or by testing the live software before Scene 10 is recorded — the script's narration is written generically enough to accommodate any of these, but the visual needs the real location.
2. **"Process and Send Simultaneously"** — see the full flag in `print-queue-management-script.md`'s Pre-production notes. If support/SME confirms this refers to true pipeline overlap (processing one job while sending another), this shot list needs an additional capture: two jobs in the list simultaneously showing different active statuses (one "Processing," one "Printing"/"Sending") to demonstrate it honestly. Do not stage or fake this without confirming it's real behavior first.
3. **Exact icon/button visuals** — this brief numbers the 18 buttons in the order given by the source article (left to right), but doesn't assume anything about their glyphs. Capture them as they actually appear; if the toolbar in the live version differs from this order, the script's callout numbering should be checked against reality before final edit.

---

## Once footage exists

With real screen-capture in hand, the next step is either (a) direct video editing against `print-queue-management-script.md`'s timing, or (b) if a lower-third/callout graphic pass is wanted first, a Claude Design pass that composites the *real* screenshots with blue `#0072CE` highlight rings/arrows per scene — similar to how the Print Server intro storyboard treated its screenshot-based scenes (3, 4, 5, 7b), not the fully-illustrated ones. Don't generate illustrated mockups of the toolbar/dialogs as a stand-in — for this video, that would misinform rather than help.
