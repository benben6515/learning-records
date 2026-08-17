# Mission: Build Sci-Fi Movie Terminal Panes (technique-first)

## Why
The learner wants a terminal that looks like the bridge console of a spaceship in a sci-fi movie — split panes, glowing monitors, system readouts, matrix rain — and, more importantly, wants to **understand the techniques** well enough to rebuild the look on any machine. The stated constraint: **use existing terminal tools first; do not write shell scripts.** Every visual effect should come from an off-the-shelf tool or a declarative config file, never from custom scripting.

## Success looks like
- Can explain the **4-layer stack** from memory: emulator → multiplexer (panes) → prompt → TUI props, and which layer owns which visual effect.
- Can build the "bridge console" layout (btop + fastfetch + cmatrix + cbonsai in themed tmux panes) **from memory**, on a fresh machine, using only brew + config files.
- Can read a tmux/Ghostty/starship config and predict what it will look like — config literacy, not copy-paste.
- Can walk the full path: theme a status bar, theme a prompt, theme an emulator, and run CRT effects — and knows which knob lives where.

## Constraints
- **Tools first, scripts never** (for this course). Config files (`tmux.conf`, `starship.toml`, Ghostty `config`) are in-bounds because they are declarative settings, not programs.
- **~15 minutes per lesson.** Each lesson ends with one tangible visible win.
- **Environment**: macOS, Ghostty (primary; Warp also installed), tmux 3.7b (was unconfigured at kickoff), starship (configured), btop installed. Homebrew at `/opt/homebrew`.
- **Bilingual**: every lesson exists in English and Traditional Chinese.

## Out of scope (for now)
- Writing shell scripts, shell functions, or prompt-generating code — deliberately excluded by mission.
- Zellij (alternative multiplexer) — tmux is installed and is the standard.
- Web-based FUI (Fantasy User Interfaces) — possible future course.
- Neovim/editor theming — different course; the console look does not need it.

## Environment snapshot (audited at kickoff)
- tmux 3.7b — installed, **zero config** (no tmux.conf, no TPM)
- starship — installed, custom `starship.toml` exists
- Ghostty — `~/.config/ghostty/config` already has: `0xProto Nerd Font Mono` (a Nerd Font — powerline glyphs already render), `background-opacity 0.66`, `background-blur 20`, theme `opencode`
- btop — installed; fastfetch / cmatrix / cbonsai / cool-retro-term — not installed (Lesson 01 / 06)
