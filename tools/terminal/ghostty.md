# Ghostty 設定筆記 (macOS)

> 版本 1.3.1 · 設定在 `~/.config/ghostty/config` · 自訂主題在 `~/.config/ghostty/themes/`
> 驗證指令：`/Applications/Ghostty.app/Contents/MacOS/ghostty +validate-config`
> 重載：視窗內 `Cmd+Shift+,`

---

## 實際設定檔（`~/.config/ghostty/config`）

```toml
# Ghostty

# ── Theme (custom: night-owl) ─────────────────────
# 內建主題位置：/Applications/Ghostty.app/Contents/Resources/ghostty/themes
theme = custom-night-owl
window-theme = dark

# ── Font (13, line-height 1.2) ────────────────────
font-family = 0xProtoNerdFont
font-size = 13

# -calt：關掉 Contextual Alternates（如 != 變 ≠）
# -liga / dlig：關掉標準 ligatures、開啟 discretionary ligatures
font-feature = -calt
font-feature = dlig

# line_height_ratio 1.2 ≈ +2pt on a 13pt font (Ghostty uses a point delta)
adjust-cell-height = 2

# ── Cursor ────────────────────────────────────────
cursor-style = block
cursor-style-blink = true

# no-cursor：讓 vim/nvfs 完全掌控游標形狀（insert=bar, normal=block）
shell-integration-features = no-cursor,sudo,title,path

# Option+click 直接把游標移過去（同 iTerm）
cursor-click-to-move = true

# 打字時隱藏滑鼠指標
mouse-hide-while-typing = true

# ── Window ────────────────────────────────────────
background-opacity = 0.6
background-blur-radius = 8
window-padding-x = 4
window-padding-y = 4
macos-titlebar-style = transparent

# ── Panes（不暗化未聚焦 pane、hover 即聚焦）────────
unfocused-split-opacity = 1.0
focus-follows-mouse = true

# ── Option key（左 opt 當 meta）───────────────────
macos-option-as-alt = left

# ── Clipboard（osc52 write_only）──────────────────
clipboard-write = allow

# ── Close ─────────────────────────────────────────
confirm-close-surface = true

# ── Keybindings ───────────────────────────────────
keybind = cmd+opt+j=toggle_split_zoom

# ── Quality of life ───────────────────────────────
# bold 不額外變色（主題渲染更乾淨）
bold-is-bright = false

# 啟動時還原上次 session 的視窗/tabs/splits
window-save-state = always

# 最後一個視窗關閉就整個離開（預設會留在背景）
quit-after-last-window-closed = true

# 真全螢幕（menu bar 隱藏），Cmd+Ctrl+F 或 Cmd+Enter
macos-non-native-fullscreen = visible-menu
```

## 目前使用主題（`~/.config/ghostty/themes/custom-night-owl`）

```
palette = 0=#011627
palette = 1=#ef5350
palette = 2=#22da6e
palette = 3=#addb67
palette = 4=#82aaff
palette = 5=#c792ea
palette = 6=#21c7a8
palette = 7=#ffffff
palette = 8=#577686
palette = 9=#ef5350
palette = 10=#22da6e
palette = 11=#ffeb95
palette = 12=#82aaff
palette = 13=#c792ea
palette = 14=#7fdbca
palette = 15=#ffffff
background = #011627
foreground = #d6deeb
cursor-color = #7e57c2
cursor-text = #ffffff
selection-background = #5f7e97
selection-foreground = #dfe5ee
```

（同目錄另有舊主題 `opencode` 備用）

---

## 目前設定

| 項目        | 設定值                                                                   | 備註                                       |
| ----------- | ------------------------------------------------------------------------ | ------------------------------------------ |
| 主題        | `theme = custom-night-owl`                                               | Night Owl 變體，16 色 + cursor + selection |
| 字型        | 0xProtoNerdFont 13                                                       | `-calt` + `dlig`（關注音符號化、開 dlig）  |
| 行高        | `adjust-cell-height = 2`                                                 | 用點數 delta 調整                          |
| 游標        | `cursor-style = block` + blink                                           | shell-integration 用 `no-cursor` 讓 vim 接手形狀 |
| 游標移動    | `cursor-click-to-move = true`                                            | Option+click 跳游標（同 iTerm）            |
| 滑鼠        | `mouse-hide-while-typing = true`                                         | 打字時隱藏指標                             |
| 視窗        | `background-opacity = 0.6` + `background-blur-radius = 8`                | 太透可調 0.7–0.8                           |
| Padding     | `window-padding-x/y = 4` + `macos-titlebar-style = transparent`          |                                            |
| 分割 pane   | `unfocused-split-opacity = 1.0`（不暗化）+ `focus-follows-mouse = true`  |                                            |
| Option 鍵   | `macos-option-as-alt = left`                                             | 左 opt 當 meta                             |
| 剪貼簿      | `clipboard-write = allow`                                                | 允許 osc52 寫入                            |
| 關閉確認    | `confirm-close-surface = true`                                           | 關閉前會確認                               |
| 最大化 pane | `keybind = cmd+opt+j=toggle_split_zoom`                                  | 自訂                                       |
| Session     | `window-save-state = always` + `quit-after-last-window-closed = true`    | 還原上次狀態、關完視窗即離開               |
| 全螢幕      | `macos-non-native-fullscreen = visible-menu`                             | Cmd+Ctrl+F / Cmd+Enter                     |
| 其他        | `bold-is-bright = false`                                                 | bold 不變色                                |

## 沒有的東西

- **側邊 tab**：macOS 版只有系統原生水平 tab bar（Linux GTK 版有 `gtk-tab-location`）。側邊欄需求由 herdr 的 sidebar 滿足（見同目錄的 `herdr.md`）
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
| `Opt+Click`                   | 游標移到點擊處（`cursor-click-to-move`）|

### 自訂語法

```ini
# ~/.config/ghostty/config
keybind = trigger=action
# 例：Cmd+Opt+J 最大化 pane（已設定）
keybind = cmd+opt+j=toggle_split_zoom
# 解綁（讓按鍵穿透給 shell 內的程式）：
keybind = alt+one=unbind
```

## 主題檔：custom-night-owl（`~/.config/ghostty/themes/custom-night-owl`）

```
palette = 0=#011627
palette = 1=#ef5350
palette = 2=#22da6e
palette = 3=#addb67
palette = 4=#82aaff
palette = 5=#c792ea
palette = 6=#21c7a8
palette = 7=#ffffff
palette = 8=#577686
palette = 9=#ef5350
palette = 10=#22da6e
palette = 11=#ffeb95
palette = 12=#82aaff
palette = 13=#c792ea
palette = 14=#7fdbca
palette = 15=#ffffff
background = #011627
foreground = #d6deeb
cursor-color = #7e57c2
cursor-text = #ffffff
selection-background = #5f7e97
selection-foreground = #dfe5ee
```

> 原始版（官方 Night Owl）的 `palette 8 = #575656`，已調亮為 `#577686`
