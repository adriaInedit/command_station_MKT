# Inèdit OS — Marketing Operations Repo

Clean, reorganized successor to the original `inedit-marketing` repo, now running the **Inèdit OS** operating protocol (see "Inèdit OS — How We Work" in `CLAUDE.md`): every piece flows brief → orchestrator → segment agent → `brand-reviewer` → your approval → publish → `analyst`, with corrections captured permanently via `/aprende`.

## First-Time Setup

1. Open this folder in Claude Code.
2. Claude Code reads `CLAUDE.md` at the root automatically — the shared brief every agent gets before doing anything.
3. Agents live in `.claude/agents/`, slash commands in `.claude/commands/` — nothing to install, Claude Code picks both up automatically.
4. The `00-strategy/kpi-scoreboard.md` baseline is still `[TBD]` — filling it in with real numbers is the first real task.

## How to Work Here

- **`/brief [encargo]`** — opens a new request, routes it to the right segment agent.
- **`/revisa [texto o ruta]`** — runs `brand-reviewer` on a draft.
- **`/aprende [corrección]`** — turns a correction into a permanent rule in `00-strategy/decision-log.md` and the affected agent file.
- **`/campana [objetivo]`** — asks `strategist` for a full campaign/launch/trade-show plan.
- **`/adapta [idioma/canal] [texto]`** — runs `localizer`, then re-checks with `brand-reviewer`.
- **`/estado`** — status summary across all workstreams and `outputs/`.

You can also invoke any agent directly by name (`@sublimation-direct-fabric ...`) if you already know which lane a task belongs to.

## Segments (see `CLAUDE.md` for full detail)

| # | Segment | Agent | Cadence |
|---|---|---|---|
| 1 | Existing Customers | `existing-customers` | Weekly (core) |
| 2 | DTG/DTF & New Garment Decorators | `dtg-dtf-acquisition` | Weekly (core) |
| 3 | Printer-Brand & Distributor Partners | `distributor-partners` | Weekly (core) |
| 4 | neoTextil Designers | `neotextil-designers` | Monthly (secondary) |
| 5 | neoCatalog Teams | `neocatalog-teams` | Monthly (secondary) |
| 6 | Sublimation & Roll-to-Roll Direct-to-Fabric Producers | `sublimation-direct-fabric` | Weekly (core) — works out of `10-sublimation-direct-fabric/` |

Transversal (support) agents: `strategist`, `brand-reviewer` (mandatory gate), `localizer`, `analyst`.

## Folder Index

| Folder | Purpose |
|---|---|
| `00-strategy/` | 90-day plan, daily cadence, live KPI scoreboard, `decision-log.md` |
| `01-existing-customers/` `02-dtg-dtf/` `03-distributors/` `10-sublimation-direct-fabric/` | Core weekly segment work (briefs → drafts → sent) |
| `04-social/` | Cross-segment content calendar |
| `05-tutorials/` | Customer-facing how-to video/guide backlog |
| `06-exhibitions/` | One subfolder per trade show |
| `07-releases/` | Reusable release-launch playbook |
| `08-neotextil-designers/` `09-neocatalog-teams/` | Secondary, monthly-cadence segments |
| `brand/` | Voice guide, logos, colors, per-product templates/assets |
| `outputs/` | Final, ready-to-ship work only — no placeholders, ever |
| `skills/` | HyperFrames/media/design skills actually used by agents |

## What Changed From the Original Repo

This pack was cleaned up from `inedit-marketing`: dropped ~54 tool-mirror skill folders, `node_modules`, Python venvs, and old editor-tool zips that weren't marketing content. It then layered in the **Inèdit OS** protocol (orchestrator, `brand-reviewer` gate, closing-block format, `/aprende` learning loop), a fourth product (**neoMatch**), and a sixth segment (**sublimation-direct-fabric**) — all staged earlier and merged into `CLAUDE.md` on 2026-10-03 (see `00-strategy/decision-log.md` for the exact rules).

## Live Dashboard

An "Agentic OS" dashboard (agents, cadence, pipeline status, KPI scoreboard) is published as a Claude Artifact — see the link shared in chat. It reads from this repo's real files, not invented numbers.
