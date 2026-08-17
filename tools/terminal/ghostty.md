# Ghostty 設定筆記 (macOS)

> 版本 1.3.1 · 設定在 `~/.config/ghostty/config` · 自訂主題在 `~/.config/ghostty/themes/opencode`
> 驗證指令：`/Applications/Ghostty.app/Contents/MacOS/ghostty +validate-config`
> 重載：視窗內 `Cmd+Shift+,`

---

## 實際設定檔（`~/.config/ghostty/config`）

```toml
# Ghostty — translated from Warp settings (~/.warp/settings.toml)

# ── Theme ─────────────────────────────────────────
theme = opencode

# ── Font ─────────────────────────────────────────
font-family = FiraCode Nerd Font Propo
font-size = 13
# Warp line_height_ratio 1.2 ≈ +2pt on a 13pt font (Ghostty uses a point delta)
adjust-cell-height = 2

# ── Cursor ───────────────────────────────────────
cursor-style = block
cursor-style-blink = true

# ── Window ───────────────────────────────────────
background-opacity = 0.37
background-blur-radius = 10
window-padding-x = 4
window-padding-y = 4
macos-titlebar-style = transparent
window-theme = dark

# ── Panes ────────────────────────────────────────
unfocused-split-opacity = 1.0
focus-follows-mouse = true

# ── Option key ───────────────────────────────────
macos-option-as-alt = left

# ── Clipboard ────────────────────────────────────
clipboard-write = allow

# ── Close without confirm ────────────────────────
confirm-close-surface = false

# ── Keybindings ──────────────────────────────────
keybind = cmd+opt+j=toggle_split_zoom
```

## 自訂主題（`~/.config/ghostty/themes/opencode`）

```
palette = 0=#1e1e1e
palette = 1=#e06c75
palette = 2=#7fd88f
palette = 3=#e5c07b
palette = 4=#5c9cf5
palette = 5=#9d7cd8
palette = 6=#56b6c2
palette = 7=#eeeeee
palette = 8=#323232
palette = 9=#e06c75
palette = 10=#7fd88f
palette = 11=#e5c07b
palette = 12=#5c9cf5
palette = 13=#9d7cd8
palette = 14=#56b6c2
palette = 15=#eeeeee
background = #0a0a0a
foreground = #eeeeee
cursor-color = #efefef
selection-background = #5c9cf5
selection-foreground = #0a0a0a
```

---

## 目前設定

| 項目        | 設定值                                                                  | 備註                               |
| ----------- | ----------------------------------------------------------------------- | ---------------------------------- |
| 主題        | `theme = opencode`                                                      | 16 色 palette + cursor + selection |
| 字型        | FiraCode Nerd Font Propo 13                                             |                                    |
| 行高        | `adjust-cell-height = 2`                                                | 用點數 delta 調整                  |
| 游標        | `cursor-style = block` + blink                                          | 也可 bar / underline               |
| 視窗        | `background-opacity = 0.37` + `background-blur-radius = 10`             | 太透可調 0.7–0.8                   |
| Padding     | `window-padding-x/y = 4` + `macos-titlebar-style = transparent`         |                                    |
| 分割 pane   | `unfocused-split-opacity = 1.0`（不暗化）+ `focus-follows-mouse = true` |                                    |
| Option 鍵   | `macos-option-as-alt = left`                                            | 左 opt 當 meta                     |
| 剪貼簿      | `clipboard-write = allow`                                               | 允許 osc52 寫入                    |
| 最大化 pane | `keybind = cmd+opt+j=toggle_split_zoom`                                 | 自訂                               |

## 沒有的東西

- **側邊 tab**：macOS 版只有系統原生水平 tab bar（Linux GTK 版有 `gtk-tab-location`）。側邊欄需求由 herdr 的 sidebar 滿足（見 `atuin.md` 同目錄的 `herdr.md`）
- **AI 功能**：純 terminal，無雲端、無 telemetry

## 常用 keybind

### Beginner（跟瀏覽器 / 一般 macOS app 同邏輯）

| 按鍵                        | 功能                           |
| --------------------------- | ------------------------------ |
| `Cmd+N`                     | 新視窗                         |
| `Cmd+T` / `Cmd+W`           | 新 tab / 關 tab（或分割 pane） |
| `Cmd+D` / `Cmd+Shift+D`     | 垂直 / 水平分割                |
| `Cmd+[` / `Cmd+]`           | 切換分割 pane                  |
| `Cmd+1…8` / `Cmd+9`         | 跳到第 N 個 tab / 最後一個 tab |
| `Cmd+-` / `Cmd+=` / `Cmd+0` | 字級小 / 大 / 重設             |
| `Cmd+Enter`                 | 全螢幕切換                     |

### Pro

| 按鍵                          | 功能                                 |
| ----------------------------- | ------------------------------------ |
| `Cmd+Shift+Enter`             | Zoom 目前分割 pane（同 `Cmd+Opt+J`） |
| `Cmd+Shift+P`                 | Command palette（搜尋所有指令）      |
| `Cmd+K`                       | 清空畫面（同 shell `clear`）         |
| `Cmd+Shift+,`                 | 重載設定檔                           |
| `Cmd+,`                       | 開啟設定檔（在 $EDITOR）             |
| `Cmd+Shift+J`                 | 把畫面內容寫入剪貼簿（純文字）       |
| `Cmd+Home` / `Cmd+End`        | 捲到頂 / 底                          |
| `Cmd+PageUp` / `Cmd+PageDown` | 向上 / 下翻頁                        |
| `Cmd+J`                       | 捲到選取處                           |
| `Ctrl+Tab` / `Ctrl+Shift+Tab` | 下一 / 上一 tab                      |
| `Cmd+Opt+J`                   | 最大化 pane（自訂）                  |

### 自訂語法

```ini
# ~/.config/ghostty/config
keybind = trigger=action
# 例：Cmd+Opt+J 最大化 pane（已設定）
keybind = cmd+opt+j=toggle_split_zoom
# 解綁（讓按鍵穿透給 shell 內的程式）：
keybind = alt+one=unbind
```
