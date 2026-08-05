# Endcord Cheatsheet (macOS · Warp)

> Terminal Discord client. On macOS, **`Alt` = `Option (⌥)`**.
> Version 1.5.3 · Binary at `~/.local/bin/endcord` · Config at `~/Library/Application Support/endcord/`

---

## ⚙️ My custom keybindings (rebound for Warp)

`Ctrl+Arrow` and `Ctrl+Space` are grabbed by macOS/Warp, so these were rebound in `config.ini`:

| Action                  | Default      | **Mine**    |
| ----------------------- | ------------ | ----------- |
| Tree nav up             | `Ctrl+↑`     | **`Alt+K`** |
| Tree nav down           | `Ctrl+↓`     | **`Alt+J`** |
| Enter channel / expand  | `Ctrl+Space` | **`Alt+L`** |
| Join/leave thread       | `Alt+J`      | **`Alt+Y`** |
| Word jump left (input)  | `Ctrl+←`     | **`Alt+B`** |
| Word jump right (input) | `Ctrl+→`     | **`Alt+F`** |
| Search GIFs             | `Alt+F`      | **`Alt+G`** |

All other keys below are endcord defaults.

---

## 🚀 First 60 seconds

| Action                          | Key               |
| ------------------------------- | ----------------- |
| Move around messages            | `↑` / `↓`         |
| Navigate channel tree           | `Alt+K` / `Alt+J` |
| Enter channel / expand category | `Alt+L`           |
| Open **command palette**        | `Ctrl+/`          |
| Quick jump to recent channels   | `Ctrl+K`          |
| **Quit**                        | `Ctrl+C`          |
| Cancel / close popup / escape   | `Esc`             |

---

## 🌳 Channel tree (left pane)

| Action                                      | Key                   |
| ------------------------------------------- | --------------------- |
| Navigate tree                               | `Alt+K` / `Alt+J`     |
| Enter channel / expand category or server   | `Alt+L`               |
| Collapse/expand thread list under a channel | `Alt+H`               |
| Join/leave a thread                         | `Alt+Y`               |
| View channel info                           | `Alt+I`               |
| Next/prev **server** (collapses others)     | `Shift+↑` / `Shift+↓` |
| Toggle tree visibility                      | command `toggle_tree` |

Double-click also expands/enters. **Middle-click** a channel → open in new tab.

---

## 🧵 Threads

Threads live under their parent channel, **collapsed by default** (channel shows `>`).

1. `Alt+K/J` → navigate to the channel with threads
2. **`Alt+H`** → expand the thread list
3. `Alt+K/J` → select a thread
4. **`Alt+L`** → open/read the thread
5. **`Alt+Y`** → join or leave it

Commands: `toggle_thread` (current), `toggle_thread_tree` (selected in tree).
**Forum** channel: `Alt+L` to open, `Enter` on a post to view.

---

## 💬 Sending messages

| Action                                            | Key                           |
| ------------------------------------------------- | ----------------------------- |
| Send message                                      | `Enter`                       |
| Newline (`Shift+Enter` doesn't work in terminals) | `Ctrl+N`                      |
| Paste text **or** file                            | `Ctrl+V`                      |
| Upload attachment                                 | `Ctrl+U` ⚠️ **broken on macOS** |
| Upload typed text as `.txt`                       | command `send_as_file`        |
| Undo / Redo                                       | `Alt+Z` / `Alt+Shift+Z`       |
| Open external editor                              | `Alt+E`                       |
| Copy / Cut / Select-all                           | `Alt+C` / `Alt+X` / `Alt+A`   |
| Delete word back/fwd                              | `Ctrl+Backspace` / `Ctrl+Del` |

Word jumps: `Alt+B` (left), `Alt+F` (right). Char: `←/→`. Selection: `Shift+←/→`.

---

## ✉️ Acting on a selected message

Select with `↑/↓` first, then:

| Action                      | Key                  |
| --------------------------- | -------------------- |
| **Reply**                   | `Ctrl+R`             |
| **Edit** (your own)         | `Ctrl+E`             |
| **Delete**                  | `Ctrl+D`             |
| Toggle reply **ping**       | `Ctrl+P`             |
| Jump to the replied message | `Ctrl+G`             |
| Add **reaction**            | `Alt+R`              |
| Show reaction details       | `Alt+W`              |
| View user **profile**       | `Alt+P`              |
| Copy message **text**       | `Alt+C`              |
| Copy message **URL**        | `Alt+U`              |
| Reveal a spoiler            | `Alt+S`              |
| Vote in a poll              | command `vote <num>` |

Regex-replace your last message: type `s/old/new/`.

---

## 📎 Images, attachments & media

| Action                                        | Key               |
| --------------------------------------------- | ----------------- |
| **View** image/gif/video/audio (ASCII player) | `Ctrl+W`          |
| **Download** selected attachment              | `Ctrl+L`          |
| **Open** link in browser _(macOS)_            | `Alt+O`           |
| Cycle upload slots                            | `Alt+<` / `Alt+>` |
| Cancel **all** downloads/uploads              | `Ctrl+X`          |
| Cancel selected attachment                    | `Ctrl+K`          |

**📤 Uploading an image (macOS)** — `Ctrl+U` is broken on macOS (AppleScript bug → [issue #140](https://github.com/sparklost/endcord/issues/140)); it silently does nothing. Use the palette instead:

1. `Ctrl+K` → opens palette (it pre-fills `goto ` — delete it)
2. type `upload ~/path/to/image.png` — `~` and absolute paths both work
3. `Enter`

> ⚡ Fastest loop: Finder → select image → `Option+Cmd+C` (copy path) → `Ctrl+K` → type `upload ` → `Ctrl+V` → `Enter`.

> ⚠️ Pasting an image **from clipboard** via `Ctrl+V` doesn't work on Warp (needs kitty graphics protocol). Paste a *path*, not the image.

**To check an image:** select message → `Ctrl+W` (ASCII art in Warp). For a _real_ image use `Alt+O` (browser), `Ctrl+L` (download), or enable `native_media_player = True` to open in Preview.

**Media player** (while viewing): `Esc` quit · `Space` pause · `←/→` seek · `↑/↓` volume · `Z` replay.

---

## ✨ Emoji

| Goal                      | How                                                                            |
| ------------------------- | ------------------------------------------------------------------------------ |
| **Send** emoji            | Type `:` + name → assist pops up → `Alt+↑/↓` → insert `Alt+Enter` (or `Enter`) |
| **React** to selected msg | `Alt+R`, **or** type `+:name:` at start of line + send                         |
| Search **favorites**      | Type `:**`                                                                     |
| Add/remove favorite       | command `favorite_emoji <name>`                                                |
| **View** a custom emoji   | double-click it, or command `view_emoji`                                       |

Inserted emoji shows as `<123456>` placeholder — don't edit it; renders properly when sent.
If emoji misalign the UI, set `emoji_as_text = True` in config.

---

## 🗂 Tabs

| Action                                   | Key                       |
| ---------------------------------------- | ------------------------- |
| Toggle tabbed state for selected channel | `Ctrl+T`                  |
| Switch to tab N (1–9, top row)           | `Alt+1`…`Alt+9`           |
| Next / previous tab                      | `Alt+→` / `Alt+←`         |
| Remove a tab                             | middle-click the tab      |
| Remove all tabs                          | command `remove_all_tabs` |

---

## 🔍 Search & discover

| Action                            | Key                 |
| --------------------------------- | ------------------- |
| Search messages in current server | `Ctrl+F`            |
| Search **GIFs**                   | `Alt+G` _(rebound)_ |
| Show **pinned** messages          | `Alt+N`             |
| Channel **summaries**             | `Alt+S`             |
| Open command palette              | `Ctrl+/`            |

In any **popup window**: navigate `Alt+↑/↓`, select `Alt+Enter`.

---

## 👤 You & other people

| Action                               | Key / command          |
| ------------------------------------ | ---------------------- |
| Cycle status (online/idle/dnd/invis) | `Alt+D`                |
| Toggle **member list**               | `Alt+M`                |
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

## 🎛 Useful commands (via `Ctrl+/` or `Ctrl+K` palette)

```
goto #channel        mark_as_read *      toggle_member_list
open_config_dir      show_log            check_for_updates
switch_profile       redraw              about / quit
```

---

## 🍎 macOS / Warp notes

- **Open link** = `Alt+O` (not `Ctrl+O`, which macOS reserves).
- `Alt` is the `Option (⌥)` key.
- UI glitch? Run command `redraw`.
- Warp doesn't support kitty graphics protocol → in-terminal images are ASCII only. Use `native_media_player = True` or `Alt+O` for real images.
- Spellcheck: `brew install aspell`.
- Keys grabbed by OS/terminal (already rebound): `Ctrl+↑/↓` (Mission Control), `Ctrl+←/→` (Warp), `Ctrl+Space` (Input Sources).
- **`Ctrl+U` upload is broken on macOS** — osascript syntax error ([issue #140](https://github.com/sparklost/endcord/issues/140)); does nothing silently → use `Ctrl+K` → `upload <path>`.
- **`Ctrl+/` may be grabbed by Warp** → open the palette with `Ctrl+K` instead (it runs `command_palette; type 'goto '`).
- **Pasting an image from clipboard (`Ctrl+V`) doesn't work on Warp** — only text/paths paste. Use `upload <path>`.

---

## 🔧 Maintenance

| Task            | Command                                                                                             |
| --------------- | --------------------------------------------------------------------------------------------------- |
| Update          | `bash -c "$(curl -fsSL https://raw.githubusercontent.com/sparklost/endcord/main/tools/install.sh)"` |
| Uninstall       | add `-- --uninstall` to the above                                                                   |
| Manual remove   | `rm ~/.local/bin/endcord`                                                                           |
| Open config dir | command `open_config_dir` (or `~/Library/Application Support/endcord/`)                             |

⚠️ Third-party client — violates Discord ToS, small ban risk. Avoid unofficial forks.
