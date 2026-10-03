# Audio Script (Voiceover Only) — "What Is Print Server? A Beginner's Guide"

**Source:** `print-server-intro-script.md` — this is the narration track only, extracted for recording/TTS, with visuals and on-screen text stripped out.
**Estimated runtime:** 5–6 minutes
**Tone:** calm, confident, professional — not salesy. Natural pacing, no rush.

---

**[0:00–0:20]**
If you're printing job by job, manually babysitting neoStampa every time something needs to go to press — there's a faster way. It's called Print Server, and it's built into neoStampa. Let's look at what it actually does.

**[0:20–0:45]**
Print Server is a separate component that comes with neoStampa. Think of it as a dedicated queue manager — jobs go in, Print Server handles getting them printed, in order, without you standing at the computer for each one.

**[0:45–1:10]**
You can set it up two ways. Route it as your default printing queue directly inside neoStampa's Printer Configuration — every job goes straight to the queue automatically. Or launch it as its own standalone application and control it separately. Either way, once it's running, this queue window is where you'll spend your time.

**[1:10–2:00]**
This is job number one: queue management. Every job that comes in shows up here with its status — waiting, printing, finished, or flagged with an error. Need to bump an urgent job to the top? Drag it up. Need to hold a job without deleting it? Disable it — it stays in the list but won't print until you switch it back on. If a job fails, you'll see exactly why, right in the log — no guessing.

**[2:00–2:20]**
You also decide what happens to jobs once they're done — delete them, keep them in the list for reference, or archive them so you can reprint later without resetting everything from scratch.

**[2:20–3:15]**
Job number two: Hot Folder. This is the simplest way to automate printing. You point Print Server at a folder on your network. Anyone — or any system — that drops a file into that folder triggers an automatic print, using whatever scheme and layout you've pre-set. No one has to open neoStampa. No one has to click print. This is especially useful if you've got other software on-site — an order system, a design tool, anything that can save a file to a shared folder — that needs to trigger printing without a person in the loop.

**[3:15–4:15]**
Job number three, and this is where it gets interesting for anyone running online ordering or a web-to-print storefront: Print Server can also be controlled remotely, over your network, by another piece of software. That means a website where a customer uploads their own design and places an order can talk directly to Print Server — submitting the job, checking on its status, and getting notified the moment it's done printing. All without a person manually re-entering that order into neoStampa. To make that connection, Print Server generates its own security token — a bit like a password just for that connection. Your website or ordering platform uses that token to prove it's allowed to submit jobs, so nobody else on the network can push print jobs into your queue. This is a more technical setup — it's built for developers connecting a website or ordering platform to Print Server, not something you configure by hand for a single job. If that's you, or your IT team, our support site has the full technical reference for exactly how to wire that connection up.

**[4:15–4:35]**
One more thing this unlocks: Print Server can act as a remote printer target across your own network too — useful if design and production happen in different rooms, buildings, or even sites, and you want jobs routed to the right machine without walking a USB drive over.

**[4:35–5:00]**
So — three things to remember. Print Server manages your printing queue, so you're not babysitting every job. Hot Folder automates printing from a shared folder, no manual clicks required. And for web-to-print or multi-location setups, it can be connected remotely so other systems submit jobs directly.

**[5:00–5:20]**
If you're already running neoStampa, Print Server is included — it's just a matter of turning it on. Check the link below for the full setup guide, or reach out and we'll walk you through it.

---

*Full script with visuals and on-screen text: `print-server-intro-script.md`. CTA link at the end still needs confirming (trial vs. demo vs. support article) before this is treated as final for recording.*
