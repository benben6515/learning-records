# NOTES — teaching preferences & working notes

## Preferences
- **Traditional Chinese or English only.** No Simplified Chinese. Technical terms stay in English.
- **Tools-first constraint**: the learner explicitly asked to avoid shell scripts — use existing terminal tools first. Honor this in every lesson; config files are fine.
- Course is **technique-oriented**: they want to *learn how it works*, not just get a pretty screenshot. Include the "why" and the layer-ownership mental model.
- TW mirror (`lessons-tw/`, `reference-tw/`) required — matches sibling courses (`english/`, `loop-engineering/`).

## Environment notes (verified, not guessed)
- tmux 3.7b, config path `~/.config/tmux/tmux.conf` (did not exist at kickoff)
- starship present with an existing `~/.config/starship.toml` → Lesson 04 includes a **backup step** before overwriting with a preset
- Ghostty already uses 0xProto Nerd Font Mono → Lesson 03's font step is a *verification* (render a glyph), not an install
- Ghostty already has opacity 0.66 + blur 20 → Lesson 05 focuses on `theme = catppuccin-mocha` + assembly, keeps their existing settings
- Verified available: `starship preset catppuccin-powerline`, brew formulae `fastfetch cmatrix cbonsai`, casks `cool-retro-term font-jetbrains-mono-nerd-font`

## Session log
- **2026-08-17 — kickoff.** Scope agreed via interview: terminal panes (not web FUI), learn-techniques mission, full 6-lesson course incl. CRT finale. Workspace created; all lessons + references + TW mirrors written.
- **2026-08-18 — mission pivot.** Learner reports already fluent (uses Ghostty + a tmux-like multiplexer daily; "課程我都會了"). Actual need: a **curated catalog of hack-looking TUI tools** (btop/htop/fastfetch-style props), not technique lessons. Delivered as `reference/hack-toolbox.html` + TW mirror (~40 tools, grouped by bridge role, every formula verified against brew: `pipes` → `pipes-sh`; `hollywood`/`peaclock`/`s-tui` absent from brew — genact/tty-clock/asitop substitute). Future sessions: lead with tool recommendations & discovery, not basics.
