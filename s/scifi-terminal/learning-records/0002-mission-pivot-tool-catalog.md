# 0002 — Mission pivot: from technique lessons to tool catalog

**Date:** 2026-08-18
**Status:** accepted

## Context
One day after kickoff the learner reported they already run Ghostty + a tmux-like multiplexer and know the course material ("課程我都會了"). Their actual request: *"know which TOOLS give the hack look"* — i.e., expand Layer 4 (TUI props), the one layer the original course only sampled (btop/fastfetch/cmatrix/cbonsai).

## Decision
- Treat lessons 0001–0006 as completed/skippable; do not reteach.
- Deliver the request as a **reference card**, not lessons: `reference/hack-toolbox.html` + TW mirror. ~40 tools grouped by bridge role (engine room / registry / comms / war room / archive / logs / mood), each with a ★ hack-theatre rating, one-line effect, and exact command.
- **Every formula verified against Homebrew before publishing** (2026-08). Corrections found: `pipes` → formula name `pipes-sh`; `hollywood`, `peaclock`, `s-tui` NOT in brew — replaced by `genact` (fake busy-work), `tty-clock`, and `asitop`/`macmon` (Apple Silicon native) respectively.
- Includes a one-command "starter kit" install line of the highest-density picks.

## Consequences
- ZPD recalibrated: learner is past basics → future sessions lead with **discovery and curation** (new tools, r/unixporn finds, theme news), not fundamentals.
- The toolbox card is the new entry point of the workspace; index.html and both TOCs link it first under Reference sheets.
- If tools rename/vanish from brew, the card's footer notes the verification date — re-verify before recommending installs after long gaps.
