# GLOSSARY — Sci-Fi Terminal Panes

The course vocabulary. Used consistently in every lesson; adhere to these definitions.

| Term | Definition |
|---|---|
| **Terminal emulator** | The GUI app that draws a terminal (Ghostty, Warp, iTerm2). Owns fonts, colors, transparency, blur. |
| **Multiplexer** | A tool that splits one terminal into many virtual ones (tmux). Owns panes, status line, borders. |
| **Session** | tmux's top unit: a named workspace that survives terminal closure. Contains windows. |
| **Window** | A full-screen tab inside a tmux session. Contains panes. |
| **Pane** | One rectangular split region inside a tmux window — the "sci-fi panel" itself. |
| **Prefix key** | tmux's mode-shift chord, default `Ctrl-b`. Pressed first, then a command key. |
| **Status line** | tmux's colored bar (default: bottom) showing sessions/windows. Theming it is half the movie look. |
| **TUI** | Terminal User Interface — a full-screen interactive app drawn in the terminal (btop, fastfetch). |
| **CLI** | Command-Line Interface — prints output and exits (non-interactive). Contrast with TUI. |
| **Prompt** | The line where you type, rendered by a prompt engine (starship). Owns the segmented powerline look. |
| **Powerline** | Prompt style with colored arrow-separated segments; needs special glyphs. |
| **Nerd Font** | A font patched with thousands of extra icons/glyphs ( ). Required by powerline segments and themed status bars. |
| **Glyph** | One symbol in a font; nerd-font glyphs are the icons in status bars and prompts. |
| **Palette / flavour** | A named color set. Catppuccin's flavours: latte, frappé, macchiato, **mocha** (darkest, default here). |
| **Theme** | A declarative color configuration applied to a tool (Ghostty `theme =`, tmux plugin). |
| **TPM** | Tmux Plugin Manager — installs tmux themes/plugins via git, activated with `prefix + I`. |
| **True color (24-bit)** | 16.7M-color mode; needed for pastel palettes to render exactly. Ghostty enables it by default. |
| **CRT** | Cathode-Ray Tube — the old curved glowing monitor; CRT effects = scanlines, phosphor glow, curvature (cool-retro-term). |
| **Phosphor** | The glowing coating of CRT screens; "phosphor green" is the classic matrix color. |
| **Rice** | Slang: customizing a desktop/terminal's appearance. The hobby behind r/unixporn. |
| **Bridge console** | This course's name for the finished layout: themed tmux panes running btop + fastfetch + cmatrix + cbonsai. |
