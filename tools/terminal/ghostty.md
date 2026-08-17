# Ghostty 設定筆記 (macOS)

> 版本 1.3.1 · 設定在 `~/.config/ghostty/config` · 自訂主題在 `~/.config/ghostty/themes/opencode`
> 驗證指令：`/Applications/Ghostty.app/Contents/MacOS/ghostty +validate-config`
> 重載：視窗內 `Cmd+Shift+,`

---

## 目前設定

| 項目 | 設定值 | 備註 |
|---|---|---|
| 主題 | `theme = opencode` | 16 色 palette + cursor + selection |
| 字型 | FiraCode Nerd Font Propo 13 | |
| 行高 | `adjust-cell-height = 2` | 用點數 delta 調整 |
| 游標 | `cursor-style = block` + blink | 也可 bar / underline |
| 視窗 | `background-opacity = 0.37` + `background-blur-radius = 10` | 太透可調 0.7–0.8 |
| Padding | `window-padding-x/y = 4` + `macos-titlebar-style = transparent` | |
| 分割 pane | `unfocused-split-opacity = 1.0`（不暗化）+ `focus-follows-mouse = true` | |
| Option 鍵 | `macos-option-as-alt = left` | 左 opt 當 meta |
| 剪貼簿 | `clipboard-write = allow` | 允許 osc52 寫入 |
| 最大化 pane | `keybind = cmd+opt+j=toggle_split_zoom` | 自訂 |

## 沒有的東西

- **側邊 tab**：macOS 版只有系統原生水平 tab bar（Linux GTK 版有 `gtk-tab-location`）。側邊欄需求由 herdr 的 sidebar 滿足（見 `tools/herdr.md`）
- **AI 功能**：純 terminal，無雲端、無 telemetry

## 常用 keybind（預設）

| 按鍵 | 功能 |
|---|---|
| `Cmd+T` / `Cmd+W` | 新 tab / 關 tab |
| `Cmd+D` / `Cmd+Shift+D` | 垂直 / 水平分割 |
| `Cmd+[` / `Cmd+]` | 切換分割 pane |
| `Cmd+1…9` | 跳到第 N 個 tab |
| `Cmd+Shift+,` | 重載設定 |
| `Cmd+Opt+J` | 最大化 pane（自訂） |
