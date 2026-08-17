# 0001 — Course kickoff: environment audit + technique-first scope

**Date:** 2026-08-17
**Status:** accepted

## Context
The learner asked to be taught "how to create panes like in sci-fi movies", with an explicit constraint: **use existing terminal tools first — don't write shell scripts.** An interview clarified the mission: *terminal* panes (not web FUI), goal = **learn the techniques**, terminal = modern stack (Ghostty primary, Warp installed).

## Environment audit (verified, not assumed)
- tmux 3.7b installed, **zero prior config** → teach clean, from scratch
- starship installed with an existing hand-tuned `~/.config/starship.toml` → lessons must include a backup step before preset overwrite
- Ghostty config already has `0xProto Nerd Font Mono`, `background-opacity 0.66`, `background-blur 20`, theme `opencode` → font lesson becomes a *verification*, theming lesson is a one-line theme swap; keep their existing settings
- btop installed; fastfetch / cmatrix / cbonsai / cool-retro-term absent → Lesson 01/06 install steps
- Verified available before writing lessons: `starship preset catppuccin-powerline`, brew formulae `fastfetch cmatrix cbonsai`, casks `cool-retro-term` + `font-jetbrains-mono-nerd-font`

## Decisions
1. **Mental model = 4-layer stack** (emulator → multiplexer → prompt → TUI props). Every lesson names which layer it touches; quizzes test layer ownership. This is the course's transferable knowledge.
2. **Lesson order follows dependency + payoff curve**: props (instant wow, zero config) → tmux grid → tmux theme → prompt theme → emulator theme + assembly → CRT finale (which *teaches* layer swappability as the capstone insight).
3. **Config-not-scripts enforced throughout**: every customization in the course is either an off-the-shelf tool, a brew package, or declarative config (`tmux.conf`, `starship.toml`, Ghostty `config`). No shell scripting anywhere.
4. **Workspace conventions mirror sibling courses** (`english/`, `loop-engineering/`): EN lessons + TW mirrors (`lessons-tw/`, `reference-tw/`), root `index.html`, shared `assets/` with quiz/checklist/theme widgets ported from the english course (class contract preserved, storage key `st-theme`).
5. Personalization to ZPD: lesson 03's Nerd Font step is a verification (they already run one); lesson 04 backs up their existing starship.toml; lesson 05 changes one word of their Ghostty config instead of rewriting it.

## Consequences
- The learner can verify each lesson's win visually without teacher presence (checklists + quizzes give immediate feedback).
- The graduation test (Lesson 06) is "rebuild the bridge from memory in under 3 minutes" — retrieval practice, not recognition.
- Future courses can build on this: window managers, FUI/web dashboards, or tmux advanced (layouts, resurrect).
- If Catppuccin releases breaking plugin changes, `reference/tmux-cheatsheet.html`'s full-config block is the single place to update (plus TW mirror).
