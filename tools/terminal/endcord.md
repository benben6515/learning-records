# Endcord Cheatsheet (macOS · Ghostty)

> Terminal Discord client. On macOS, **`Alt` = `Option (⌥)`**.
> Version 1.5.3 · Binary at `~/.local/bin/endcord` · Config at `~/Library/Application Support/endcord/`
> Terminal: **Ghostty 1.3.1** (`~/.config/ghostty/config`, `macos-option-as-alt = true`)

---

## 🕹 Vim mode (primary navigation — ON)

`vim_mode = True` in config. Two modes: **normal** (default) and **insert**.

| Action                    | Key                     |
| ------------------------- | ----------------------- |
| Tree nav up/down          | `K` / `J`               |
| Enter channel / expand    | `Space`                 |
| Enter insert mode (type)  | `i`                     |
| Back to normal mode       | `Esc`                   |
| **Send message**          | `Esc` then `Enter`      |

⚠️ In insert mode, `Enter` inserts a newline (`␤`) — to send, `Esc` back to normal first, then `Enter`.

**Normal-mode chat keys** (message must be selected via `k`/`j`):

| Action              | Key |
| ------------------- | --- |
| Nav messages        | `k` / `j` |
| Reply               | `r` |
| Edit (own)          | `e` |
| Delete              | `d` |
| Reply ping toggle   | `P` |
| Jump to replied     | `g` |
| Download attachment | `D` |
| Upload              | `U` |
| Open link           | `o` |
| View media          | `v` |
| Reveal spoiler      | `S` |
| Search messages     | `f` |
| Search GIFs         | `F` |
| Profile             | `c` |
| React               | `R` |
| Pinned messages     | `n` |
| Command palette     | `:` |
| Cycle status        | `s` |
| Toggle member list  | `m` |
| Quit                | `Q` |

Original keybindings still work from any mode; vim bindings win on collision.

---

## ⚙️ Legacy Alt keybindings (kept as backup)

Rebound during the Warp era, still in `config.ini` — usable when not in vim normal mode:

| Action                  | **Mine**    |
| ----------------------- | ----------- |
| Tree nav up/down        | `Alt+K` / `Alt+J` |
| Enter channel / expand  | `Alt+L` |
| Join/leave thread       | `Alt+Y` |
| Word jump left/right    | `Alt+B` / `Alt+F` |
| Search GIFs             | `Alt+G` |
| Toggle tab              | `Ctrl+T` |

---

## 🚀 First 60 seconds

| Action                          | Key               |
| ------------------------------- | ----------------- |
| Move around messages            | `k` / `j` (vim) or `↑` / `↓` |
| Navigate channel tree           | `K` / `J` (vim) or `Alt+K` / `Alt+J` |
| Enter channel / expand category | `Space` (vim) or `Alt+L` |
| Open **command palette**        | `:` (vim) or `Ctrl+/` |
| Quick jump to recent channels   | `Ctrl+K` |
| **Quit**                        | `Q` (vim) or `Ctrl+C` |
| Cancel / close popup / escape   | `Esc` |

---

## 🌳 Channel tree (left pane)

| Action                                      | Key                   |
| ------------------------------------------- | --------------------- |
| Navigate tree                               | `K` / `J` (vim) or `Alt+K/J` |
| Enter channel / expand category or server   | `Space` (vim) or `Alt+L` |
| Collapse/expand thread list under a channel | `Alt+H` |
| Join/leave a thread                         | `Alt+Y` |
| View channel info                           | `Alt+I` |
| Next/prev **server** (collapses others)     | `Shift+↑` / `Shift+↓` |
| Toggle tree visibility                      | command `toggle_tree` |

Double-click also expands/enters. **Middle-click** a channel → open in new tab.

---

## 🧵 Threads

Threads live under their parent channel, **collapsed by default** (channel shows `>`).

1. `K`/`J` → navigate to the channel with threads
2. **`Alt+H`** → expand the thread list
3. `K`/`J` → select a thread
4. **`Space`** → open/read the thread
5. **`Alt+Y`** → join or leave it

Commands: `toggle_thread` (current), `toggle_thread_tree` (selected in tree).
**Forum** channel: `Space` to open, `Enter` on a post to view.

---

## 💬 Sending messages

| Action                                            | Key                           |
| ------------------------------------------------- | ----------------------------- |
| Send message                                      | `Esc` → `Enter` (vim) or `Enter` |
| Newline                                           | `Ctrl+N` (or plain `Enter` in insert mode) |
| Paste text **or** file                            | `Ctrl+V` |
| Upload attachment                                 | `Ctrl+U` ⚠️ **broken on macOS** |
| Upload typed text as `.txt`                       | command `send_as_file`        |
| Open external editor                              | `Alt+E`                       |
| Copy / Cut / Select-all                           | `Alt+C` / `Alt+X` / `Alt+A`   |
| Delete word back/fwd                              | `Ctrl+Backspace` / `Ctrl+Del` |

Word jumps: `Alt+B` (left), `Alt+F` (right). Char: `←/→`. Selection: `Shift+←/→`.

---

## ✉️ Acting on a selected message

Select with `k`/`j` (vim) or `↑/↓` first, then (vim keys in normal mode / legacy anywhere):

| Action                      | Vim / Legacy key      |
| --------------------------- | --------------------- |
| **Reply**                   | `r` / `Ctrl+R`        |
| **Edit** (your own)         | `e` / `Ctrl+E`        |
| **Delete**                  | `d` / `Ctrl+D`        |
| Toggle reply **ping**       | `P` / `Ctrl+P`        |
| Jump to the replied message | `g` / `Ctrl+G`        |
| Add **reaction**            | `R` / `Alt+R`         |
| Show reaction details       | `A` / `Alt+W`         |
| View user **profile**       | `c` / `Alt+P`         |
| Copy message **text**       | `y` / `Alt+C`         |
| Copy message **URL**        | `M` / `Alt+U`         |
| Reveal a spoiler            | `S` / `Alt+S`         |
| Vote in a poll              | command `vote <num>`  |

Regex-replace your last message: type `s/old/new/`.

---

## 📎 Images, attachments & media

| Action                                        | Key               |
| --------------------------------------------- | ----------------- |
| **View** image/gif/video/audio (ASCII player) | `v` (vim) / `Ctrl+W` |
| **Download** selected attachment              | `D` (vim) / `Ctrl+L` |
| **Open** link in browser _(macOS)_            | `o` (vim) / `Alt+O` |
| Cycle upload slots                            | `Alt+<` / `Alt+>` |
| Cancel **all** downloads/uploads              | `X` (vim) / `Ctrl+X` |
| Cancel selected attachment                    | `Ctrl+K`          |

**📤 Uploading an image (macOS)** — `Ctrl+U` is broken on macOS (AppleScript bug → [issue #140](https://github.com/sparklost/endcord/issues/140)); it silently does nothing. Use the palette instead:

1. `Ctrl+K` → opens palette (it pre-fills `goto ` — delete it)
2. type `upload ~/path/to/image.png` — `~` and absolute paths both work
3. `Enter`

> ⚡ Fastest loop: Finder → select image → `Option+Cmd+C` (copy path) → `Ctrl+K` → type `upload ` → `Ctrl+V` → `Enter`.

**Media player** (while viewing): `Esc` quit · `Space` pause · `←/→` seek · `↑/↓` volume · `Z` replay.

---

## ✨ Emoji

| Goal                      | How                                                                            |
| ------------------------- | ------------------------------------------------------------------------------ |
| **Send** emoji            | Type `:` + name → assist pops up → `Alt+↑/↓` → insert `Alt+Enter` (or `Enter`) |
| **React** to selected msg | `R` (vim), **or** type `+:name:` at start of line + send                       |
| Search **favorites**      | Type `:**`                                                                     |
| Add/remove favorite       | command `favorite_emoji <name>`                                                |
| **View** a custom emoji   | double-click it, or command `view_emoji`                                       |

Inserted emoji shows as `<123456>` placeholder — don't edit it; renders properly when sent.
If emoji misalign the UI, set `emoji_as_text = True` in config.

---

## 🗂 Tabs

| Action                                   | Key                       |
| ---------------------------------------- | ------------------------- |
| Toggle tabbed state for selected channel | `t` (vim) / `Ctrl+T`      |
| Switch to tab N (1–9, top row)           | `Alt+1`…`Alt+9`           |
| Next / previous tab                      | `Alt+→` / `Alt+←`         |
| Remove a tab                             | middle-click the tab      |
| Remove all tabs                          | command `remove_all_tabs` |

---

## 🔍 Search & discover

| Action                            | Key                        |
| --------------------------------- | -------------------------- |
| Search messages in current server | `f` (vim) / `Ctrl+F`       |
| Search **GIFs**                   | `F` (vim) / `Alt+G`        |
| Show **pinned** messages          | `n` (vim) / `Alt+N`        |
| Channel **summaries**             | `Alt+S`                    |
| Open command palette              | `:` (vim) / `Ctrl+/`       |

In any **popup window**: navigate `Alt+↑/↓`, select `Alt+Enter`.

---

## 👤 You & other people

| Action                               | Key / command          |
| ------------------------------------ | ---------------------- |
| Cycle status (online/idle/dnd/invis) | `s` (vim) / `Alt+D`    |
| Toggle **member list**               | `m` (vim) / `Alt+M`    |
| Set custom status                    | `custom_status <text>` |
| Toggle AFK                           | `toggle_afk`           |
| Block user (from selected msg)       | `block`                |

---

## 🎙 Voice calls

| Action                    | Command                    |
| ------------------------- | -------------------------- |
| Start call in open DM     | `voice_start_call`         |
| Accept incoming           | `voice_accept_call`        |
| Leave call                | `voice_leave_call`         |
| Reject / silence incoming | `voice_reject_call`        |
| List participants         | `voice_list_call`          |
| Mute mic                  | `voice_set_volume_input 0` |

Click volume values in the call UI to toggle mute.

---

## ⌨️ Typing assists (auto-complete)

Type the trigger, a popup appears: `@user` · `@role` · `#channel` · `:emoji:` · `;sticker;` · `@time`
Navigate `Alt+↑/↓`, insert `Alt+Enter`. `Esc` closes.

---

## 🎛 Useful commands (via `:` / `Ctrl+/` or `Ctrl+K` palette)

```
goto #channel        mark_as_read *      toggle_member_list
open_config_dir      show_log            check_for_updates
switch_profile       redraw              about / quit
```

---

## 🍎 macOS / Ghostty notes

- `macos-option-as-alt = true` in `~/.config/ghostty/config` — required for all `Alt+X` bindings.
- **Ghostty config edits require reload**: `Cmd+Shift+,` (or restart). Edits silently don't apply to open windows otherwise.
- ⚠️ **Never pair `macos-option-as-alt` with explicit `keybind = alt+X=esc:X` binds** — the bound key gets swallowed (sends nothing). Diagnosed 2026-08-19: `alt+j/k/l=esc:...` binds ate the keys; plain pass-through works.
- Debug keys: `endcord -k` = keybinding resolver (shows what endcord receives); `cat -v` in shell shows raw bytes (`^[j` = Alt+J working).
- **Open link** = `Alt+O` (not `Ctrl+O`, which macOS reserves).
- UI glitch? Run command `redraw`.
- Spellcheck: `brew install aspell`.
- **`Ctrl+U` upload is broken on macOS** — use `Ctrl+K` → `upload <path>`.
- Keys grabbed by OS (already rebound): `Ctrl+↑/↓` (Mission Control), `Ctrl+←/→` (Spaces), `Ctrl+Space` (Input Sources).
- Vim mode sidesteps most Option-key problems — tree nav needs plain `K`/`J` only.

---

## 🔧 Maintenance

| Task            | Command                                                                                             |
| --------------- | --------------------------------------------------------------------------------------------------- |
| Update          | `bash -c "$(curl -fsSL https://raw.githubusercontent.com/sparklost/endcord/main/tools/install.sh)"` |
| Uninstall       | add ` -- --uninstall` to the above                                                                   |
| Manual remove   | `rm ~/.local/bin/endcord`                                                                           |
| Open config dir | command `open_config_dir` (or `~/Library/Application Support/endcord/`)                             |

⚠️ Third-party client — violates Discord ToS, small ban risk. Avoid unofficial forks.
