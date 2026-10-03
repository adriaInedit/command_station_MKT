# neoStampa Printing Queue — Step-by-Step Guide to Every Tool

**Status:** Draft — ready for review
**Format:** Written support/tutorial guide (not a video script)
**Segment:** Customer-facing (neoStampa). Primary audience: Existing Customers running daily production queues. Secondary: Printer-Brand/Distributor Partners supporting their own customers on this screen.
**Product:** neoStampa — Print Server / Printing Job Queue
**Brand color:** neoStampa Blue `#0072CE` (product-specific — flag this color for Claude Design if this guide is turned into a formatted PDF/web page)
**Scoreboard link:** Supports existing-customer upgrade rate (reduces support-ticket friction on a screen customers use daily) and newsletter → trial click-through (shows trial users how deep the software goes)
**Sources:** All pulled directly from the Inèdit Freshdesk Help Center (https://inedit.freshdesk.com/en/support/home) — every article link relevant to the printing queue is cited inline and listed again in full at the bottom.

---

## Before you start: what "the printing queue" actually is

In neoStampa, the printing queue lives inside **Print Server** — described in the source documentation as "an embedded application component in neoStampa" that functions as the printing queue.¹ You'll interact with two connected pieces:

- **neoStampa itself**, where you prepare a job and choose how it gets to the queue (via RIP Options).
- **Print Server**, the standalone queue application — the job list, toolbar, and settings covered in this guide.

Requirements before any of this works: neoStampa must be installed, and your license must include Print Server access.¹

---

## Part 1 — Starting Print Server

Print Server can be started three different ways, depending on your workflow.¹

1. **As neoStampa's default printer queue** — configured inside neoStampa's Printer Configuration settings, so jobs route from neoStampa to Print Server automatically. (Full steps in Part 2 below.)
2. **Manual launch** — run `neoPrintServer.exe` directly from your neoStampa program folder (e.g. `C:\Program Files\Inedit\neoStampa 10`) to start and close the queue as needed.
3. **Desktop shortcut** — generate one from the Print Server Configuration settings for quick access.

**Closing Print Server:** it stays active in your taskbar's hidden icons, where you can show, hide, or quit it. To fully disable the connection, go to neoStampa's Printer Configuration and disable the connection option for the local Print Server driver.¹

---

## Part 2 — Setting Print Server as your default printing queue

Steps, in order²:

1. Launch neoStampa and open the printer driver configuration.
2. Add your printer driver, then enable **"Use the local Print Server."** This configures the driver to print through Print Server.
3. Use the **Start** button in that dialog to run the application. The **"Auto"** option controls whether Print Server activates automatically whenever neoStampa starts.
4. When you're ready to print, from the neoStampa document view select **Print!** to open RIP Options, then click **"Start Print Server..."** to start the queue. neoStampa automatically assigns a port starting at 49090.
5. A new Print Server window opens and becomes your default printer queue.
6. Back in RIP Options, click **Print!** at the bottom to send the job into the Print Server queue.

---

## Part 3 — Setting Print Server as a remote printer

If Print Server is running on a different machine than the one you're printing from, use this configuration instead³:

1. Launch neoStampa and open the printer driver configuration.
2. Add your printer driver. In connection settings, select the remote Printer Server and choose connection type **"PRNSVR: (PrintServer)."**
3. Click **"Options..."** and select your remote Print Server's IP address from the list.
4. Use **"Test..."** to confirm the IP and port are correct and that the remote server is reachable.
5. Prepare your job, select **Print!**, choose your scheme (or the default) in RIP Options, and click **Print!** to send it to the remote server.
6. To pull in remote printer schemes, open the printer scheme dialog and click **"Refresh"** beneath the scheme list tab. Note: remote schemes are locked and read-only.

---

## Part 4 — Getting a job into the queue

There are three ways a job reaches the Print Server queue⁴:

- **Created and generated** directly, in a supported image file format.
- **Drag-and-drop** a prepared XJB file straight into the queue window.
- **Sent from neoStampa**, via the Print Server connection described in Parts 1–3.

If you're building a job directly in Print Server's own job editor⁴:

1. Click the **new job** button in the main Print Server window to open the job editor.
2. Add source files using the **'+'** button below the source file list (single or multiple files).
3. Configure job settings: width/height in **Size/Rapport settings**, drop and orientation (auto-detected if embedded in the file), XY position offsets in the **Start** fields, and colorway (for multichannel designs).
4. Choose output options: a **Layout** from the dropdown (or "None"), a printing scheme, and optional comments.
5. Send the job to the queue via drag-and-drop or the send function.

Once jobs are listed:

6. Check the checkbox next to each job's name to enable it for processing.
7. Click **Print** to start ripping.
8. Watch the **status column** for each job's individual ripping progress.

---

## Part 5 — The queue toolbar: every button, left to right

This is the reference list for the 18-button toolbar across the top of the Printing Job Queue window.⁵ Exact on-screen tooltip wording may vary slightly by neoStampa version — treat the function, not the exact label, as authoritative.

| # | Button | What it does |
|---|---|---|
| 1 | **Activate the job queue** | Starts the queue processing and printing jobs in order. |
| 2 | **Stop the job queue** | Halts the entire queue — use for anything affecting the printer itself (paper change, maintenance). |
| 3 | **View job information** | Opens details for the selected job — settings it was queued with, file info, status history. |
| 4 | **Add processed file (.prn, .plt)** | Brings an already-processed file straight into the queue, skipping processing entirely. |
| 5 | **Process/Send selected job** | Opens the three-option Process/Send menu (see Part 6) for the selected job. |
| 6 | **Pause selected job** | Holds just that one job without affecting the rest of the queue. |
| 7 | **Stop printing after current copy** | If multiple copies are queued, finishes the copy currently printing instead of cutting it off mid-print. |
| 8 | **Cancel job** | Stops the selected job outright. |
| 9 | **Move job to queue head** | Sends the job straight to the front — next to print. |
| 10 | **Move job up** | Nudges the job one position up. |
| 11 | **Move job down** | Nudges the job one position down. |
| 12 | **Move job to queue bottom** | Sends the job to the back of the line. |
| 13 | **Reopen job** | Returns a finished/cancelled job to waiting status, so it can print again without re-setup. |
| 14 | **Remove selected jobs** | Takes specific jobs out of the list. |
| 15 | **Delete finished jobs** | Clears every job marked done, in one click. |
| 16 | **Delete all jobs** | Removes every job in the queue regardless of status. **This cannot be undone — there is no separate confirmation beyond your selection, so use deliberately.** |
| 17 | **Cost of printing utility** | Opens ink consumption / cost estimate for jobs in the queue. |
| 18 | **Job queue settings** | Opens the queue's configuration panel (Part 7). |

Buttons 9–12 (reordering) are how you push a rush job to the front without cancelling and requeueing it. Buttons 13–16 manage the list itself, not individual job state.

---

## Part 6 — Process/Send modes (queue-level)

When you use button 5 above, or the equivalent right-click option, you're choosing between three modes⁵:

- **Process Only** — prepares the job (rasterizes it, applies color/layout settings) without sending anything to the printer. Use this when the file needs to be ready but you're not printing immediately.
- **Process and Send** — processes and sends the job to the printer in one action, with a copy-quantity option. The one-click choice when a job is ready to print right now.
- **Send** — transmits an already-processed job to the printer, or redirects it to a file instead of printing directly (useful for archiving or handing off to another machine).

Additional controls available in this window: copy quantity, file destination selection, bi-directional print, cut sheet at the end, and origin setup (pre-feed lengthwise / displacement widthwise).⁵

**Length Mode** (Rapport prints only): available when activated in RIP with a generated Rapport document — lets you set the printout length directly.⁵

---

## Part 7 — Important distinction: this is different from RIP Options' "Process and Send Simultaneously"

This is worth calling out explicitly because the naming is easy to confuse, and it resolves an open question from an earlier tutorial script in this repo (`05-tutorials/video-scripts/print-queue-management-script.md`).

**RIP Options** — the dialog that opens from neoStampa's own **Print!** command — has its own, separate set of three processing choices⁶:

- **Process and Send Simultaneously** — processes and sends data to the printer *concurrently*. Per the source article: "printing start[s] faster, because the moment some data has been processed, this is already sent." Trade-off: on an underpowered computer or with complex files, this can cause printer pauses and banding.
- **Process Only** — generates print files (`.pro`, `.plt`, `.prn`) for sending later without reprocessing. Related settings: "Start job queue if it's stopped," "Keep the job after processed," "Check printer status before sending," "Print selected objects only separately."
- **RIP & Print with Print Server** — sends the job to Print Server via "Send to Print Server," including the "Start Print Server..." button and options for destination scheme, output path, and XJB export.

So there are genuinely **two different three-way choices at two different stages**:

1. **RIP Options** (in neoStampa, before the job ever reaches the queue) — Process and Send Simultaneously / Process Only / RIP & Print with Print Server.
2. **The queue's own Process/Send button** (Part 6, inside Print Server) — Process Only / Process and Send / Send.

The term "Process and Send Simultaneously" belongs to RIP Options, not the queue toolbar — and it specifically describes overlapping the processing and transmission stages for speed, with a named trade-off (potential banding on underpowered setups). If you're updating the existing video script's open item about this phrase, this is the confirming source.

RIP Options also includes two more tabs worth knowing⁶:

- **Pages and Copies** — select all pages or specific ones, set number of copies, and add a pause between copies to prevent transmission errors.
- **Statistics** — printout information including "User Text," position/distance settings, and a "[Setup]..." button.
- **Print and Cut** (for printers that support it) — print/cut activation toggles, speed/pressure/acceleration adjustments, size correction, and an "Export Paths" button that exports cropping data as `.ct5` files for CiberCut software.

---

## Part 8 — The right-click menu

Right-clicking any job in the queue list opens a context menu with the same functions as the toolbar, just laid out differently — same actions, faster access without moving to the toolbar first.⁵

---

## Part 9 — Queue Settings (button 18)

Fields inside the Job Queue Settings panel⁵:

- **Temp folder** — selection and browse.
- **Job ID number** — editable, for your own numbering scheme.
- **Keep jobs after processing** — retain processed jobs in the queue instead of clearing them.
- **Retry on error** — automatically retries a job instead of just failing, useful on network connections that occasionally drop.
- **Auto-start queue on program launch** — starts the queue automatically the moment Print Server/neoStampa launches, useful for unattended machines.
- **Apply Job ID to output name** — includes the Job ID in the output filename, helpful for tracing a printed file back to its queue entry later.
- **Pause time (seconds) between jobs** — adds a gap between one job finishing and the next starting, if your workflow needs it.

The broader **Print Server Configuration and Settings** panel (a separate, larger settings surface than the queue-only settings above) covers⁷:

- **Printer settings** — current driver, default schema, split job pages (No / For all jobs / Only for rapport jobs / Print rapport pages only), finished-jobs handling (Delete / Keep in Queue / Archive), "use machine repeat mode for rapport pages," auto-retry on error, delay between printed copies.
- **Folders** — temporary folder and jobs archive location.
- **General** — language, default units (cm, mm, m, ft, px, in, pt, yd), column header sort, dropped-file deletion, "append Job ID to the output job name."
- **Engine settings** — pre-configured system defaults; modify cautiously.
- **Columns** — custom field selector with ordering, supporting CustomField variables from XJB files (Order_id, Name, Company, etc.).
- **Log system** — WebAPI remote control with a security token, "use local neoControl," "compute cost" calculation toggle, remote neoControl server configuration, and a notify URL for webhook registration.
- **Shortcut link** — a "generate a desktop link" button.
- **Output options** — control bars (printed length ruler, bar position, job list report printing), margin/space settings, and a Statistic section for on-printout text formatting and content.

---

## Part 10 — Automating input: Hot Folders

Hot Folders are a separate but related tool: instead of manually loading jobs, they monitor a folder and automatically process whatever's dropped into it.⁸

1. From the main window's button bar, click the **Hot Folder** button to open the Hot Folders dialog.
2. Click **'New'** to open the Hot Folder configuration window.
3. Configure:
   - **Active** — turns automatic printing on.
   - **Interval time** — how often the folder is checked for new files.
   - **Path** — use the three-dot button to select the input directory.
   - **Recursive** — treats subfolder contents as a single job.
   - **Subfolders as single jobs** — combines all items in a subfolder into one job.
4. **Smart file naming** — the system reads naming patterns to auto-adjust jobs:
   - `_c[n]` — copies count
   - `_z[n]` — zoom percentage
   - `_r[n]` — rotation (90/180/270°)
   - `_m[nxm]` — mosaic layout
   - `_s[XxY]` — size in points
   - Example: `Design_m23x12_z50_r90.psd`
5. **Page configuration** — roll width, image positioning (Origin X/Y, with a center option), design spacing, nesting, rotation allowance, page scaling, EasyCut mode.
6. **Printing triggers** — choose one or more: minimum document count, minimum printout length, or idle time without new files.
7. **Output & actions** — destination printer, output folder, and post-processing (delete or move processed files).

**If the Hotfolder stops processing**, two known causes⁹:

- The application is running with administrator privileges — this can conflict with folder access rights. Fix: close the app, right-click the shortcut → Properties → Compatibility tab → uncheck "Run this program as an administrator" → save and restart.
- The Hotfolder configuration dialog is open — per the source article, "the Hotfolder will not process files while the Hotfolder configuration dialog is open." Close it to resume.

After either fix, restart and drop a test file in to confirm processing has resumed.

---

## Part 11 — Troubleshooting the queue and Print Server connection

**"Connection with Server Failed (Error Code 0)"** — occurs when neoStampa's Cost Calculation can't reach the Consumption server.¹⁰ Causes: Cost Compute service disabled, connection timeout, version mismatch between neoStampa and server components, or the Consumption server being unreachable.

Steps:
1. Go to **Edit → Preferences → Logging** and confirm Cost Compute is enabled and correctly configured.
2. Go to **Configuration → Log** and check that the Cost Compute service is running.
3. Confirm the server IP is correct, the server is powered on and reachable, and no firewall/network policy is blocking communication.
4. After any upgrade, confirm neoStampa and Print Server/Cost Compute component versions are compatible.
5. If it persists, contact Support with: an error screenshot, both apps' version numbers, whether the server is local or remote, and any Print Server logs.

**"Failed to connect to Print Server (127.0.0.1 Port Error)"** — occurs when `neoPrintServer.exe` is still running in the background, or the communication port is already occupied by a previous instance.¹¹

Steps:
1. Close neoStampa.
2. Open Task Manager (Ctrl+Shift+Esc), find `neoPrintServer.exe` under Processes or Details, select it, and End Task if it's running.
3. Restart neoStampa and confirm Print Server starts normally.
4. If the problem persists, restart your computer, then relaunch neoStampa.
5. If it still fails after a reboot, check that security software or a firewall isn't blocking `neoPrintServer.exe`, and contact Support with a screenshot, neoStampa version, Windows version, and any recent system changes (updates, antivirus, firewall).

---

## Sources (all links used, from https://inedit.freshdesk.com/en/support/home)

1. Start working with Print Server — https://inedit.freshdesk.com/en/support/solutions/articles/14000138803-start-working-with-print-server
2. Print Server as default neoStampa printing queue — https://inedit.freshdesk.com/en/support/solutions/articles/14000137155-print-server-as-default-neostampa-printing-queue
3. Print Server as remote printer — https://inedit.freshdesk.com/en/support/solutions/articles/14000137156-print-server-as-remote-printer
4. Print Jobs Load and Rip Print Server — https://inedit.freshdesk.com/en/support/solutions/articles/14000138864-print-jobs-load-and-rip-print-server
5. neoStampa's Printing Job Queue — https://inedit.freshdesk.com/en/support/solutions/articles/14000138790-neostampa-s-printing-job-queue
6. RIP Options — https://inedit.freshdesk.com/en/support/solutions/articles/14000138789-rip-options
7. Print Server Configurations and Settings — https://inedit.freshdesk.com/en/support/solutions/articles/14000138804-print-server-configurations-and-settings
8. Hot Folders Configuration in neoStampa — https://inedit.freshdesk.com/en/support/solutions/articles/14000138796-hot-folders-configuration-in-neostampa
9. Why does the Hotfolder stop processing? — https://inedit.freshdesk.com/en/support/solutions/articles/14000166484-why-does-the-hotfolder-stop-processing-
10. Connection with Server Failed (Error Code 0) — https://inedit.freshdesk.com/en/support/solutions/articles/14000166560-connection-with-server-failed-error-code-0-
11. Failed to connect to Print Server (127.0.0.1 Port Error) — https://inedit.freshdesk.com/en/support/solutions/articles/14000166559-failed-to-connect-to-print-server-127-0-0-1-port-error-

Also referenced for navigation context (not directly cited above):
- neoStampa category — https://inedit.freshdesk.com/en/support/solutions/14000068560
- Print Server folder (Section 11) — https://inedit.freshdesk.com/en/support/solutions/folders/14000127397

---

## Open items before this moves to `outputs/`

- `[NEEDS CONFIRMATION]` — all UI labels above were extracted from the Freshdesk articles as fetched today (2026-09-14) by an automated content-extraction pass, not typed verbatim by a human reader of the live article. Before publishing, have someone spot-check button tooltips and field names against the live article and, ideally, the actual application UI (versions can drift from documentation).
- `[NEEDS REAL DATA]` — no performance numbers, timings, or customer-facing stats are included in this draft, consistent with brand voice guidance; none should be added without a real source.
- No CTA/link has been added yet — decide whether this guide gets a trial/demo link, a "related videos" cross-link to the video-script series in `05-tutorials/video-scripts/`, or ships purely as reference content.
- **Cross-reference:** Part 7 above directly resolves the open SME-confirmation item in `05-tutorials/video-scripts/print-queue-management-script.md` (line 18–20) about "Process and Send Simultaneously" — it's a real RIP Options label, distinct from the queue's own "Process and Send" button, and does describe concurrent processing/sending (with a named banding trade-off). Recommend routing this finding back to whoever owns that script before it's finalized.
