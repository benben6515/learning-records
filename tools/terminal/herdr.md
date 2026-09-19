# Herdr — Agent 原生的 Terminal Workspace Manager (macOS · Ghostty)

> tmux/Zellij 同類的 terminal multiplexer（Rust），定位「the runtime your coding agents live on」。
> 重點：terminal 活在背景 server 裡 — 闔上筆電、斷網、重開機，agent 繼續跑。
> 版本 0.8.0（stable）· [herdr.dev](https://herdr.dev) · [docs](https://herdr.dev/docs/)

---

## 架構位置

```
Ghostty / iTerm          ← terminal emulator：視窗、字型、渲染
   └─ herdr              ← multiplexer：pane、session 持久化、agent 狀態
         └─ zsh + Atuin  ← shell：歷史、Ctrl-R 搜尋
```

- herdr **不是** terminal emulator — 外層仍需一個 terminal app
- 在 herdr pane 裡 Atuin 完全正常（互動 zsh → hooks 照記錄、Ctrl-R 照觸發）

## 安裝（brew，已完成）

```zsh
brew install herdr
herdr --version    # 0.8.0
```

更新走 `brew upgrade herdr`（`herdr update` 只給官方式安裝器用）。

## 快速開始

```zsh
cd ~/your-project
herdr              # 啟動或接上預設背景 session（不用管 socket）
```

- 滑鼠優先：點 sidebar 切 tab/pane、拖邊框調大小、右鍵開分割選單 — 免背快捷鍵
- 有 tmux 肌肉記憶：prefix 同樣是 `Ctrl+B`
- 丟 `claude` / `opencode` / `pi` 進 pane → 自動辨識為 agent
- pane 會標示狀態：**working**（跑液中）/ **blocked**（等你回覆）/ **idle**

## Keybindings

### Beginner（官方建議：先學這五個）

prefix = `Ctrl+B`（按完放開，再按下一鍵）

| Action               | Key                     |
| -------------------- | ----------------------- |
| 新 tab               | `prefix+c`              |
| 分割右 / 下          | `prefix+v` / `prefix+-` |
| pane 間移動          | `prefix+h/j/k/l`        |
| Workspace 導航       | `prefix+w`              |
| Detach（全部繼續跑） | `prefix+q`              |

| 輔助                          | Key        |
| ----------------------------- | ---------- |
| 全部鍵位說明（可按 `/` 過濾） | `prefix+?` |
| 設定畫面                      | `prefix+s` |

### Pro（其餘鍵位）

**Panes：**

| Action                          | Key                                     |
| ------------------------------- | --------------------------------------- |
| Zoom 聚焦 pane                  | `prefix+z`                              |
| 關 pane                         | `prefix+x`                              |
| 交換 pane 位置                  | `prefix+shift+h/j/k/l`                  |
| 調整大小模式                    | `prefix+r`（再用 h/j/k/l 調，Esc 離開） |
| Copy mode                       | `prefix+[`                              |
| 編輯 scrollback（送進 $EDITOR） | `prefix+e`                              |
| 前一個 pane                     | `prefix+tab`                            |

**Tabs：**

| Action          | Key                     |
| --------------- | ----------------------- |
| 下一 / 上一 tab | `prefix+n` / `prefix+p` |
| 跳到 tab 1–9    | `prefix+1..9`           |
| 改名 tab        | `prefix+shift+t`        |
| 關 tab          | `prefix+shift+x`        |

**Workspace / Session：**

| Action                | Key                                                     |
| --------------------- | ------------------------------------------------------- |
| 新 workspace          | `prefix+shift+n`                                        |
| 改名 workspace        | `prefix+shift+w`                                        |
| 關 workspace          | `prefix+shift+d`                                        |
| Goto picker（快速跳） | `prefix+g`（再用 `j/k` 導航，方向鍵永遠是 pane 左右移） |
| 收 / 開 sidebar       | `prefix+b`                                              |
| 新 git worktree       | `prefix+shift+g`                                        |
| 重載設定              | `prefix+shift+r`                                        |

**Copy mode（`prefix+[` 進入後）：**

| 按鍵                                  | 功能                                        |
| ------------------------------------- | ------------------------------------------- |
| `h/j/k/l`                             | 單字元移動                                  |
| `w` / `b` / `e`                       | 下一 / 上一單字、單字尾（tmux 慣例）        |
| `{` / `}``                            | 段落上下                                    |
| `PageUp/Down`、`Ctrl-B/F`、`Ctrl-U/D` | 翻頁 / 半頁                                 |
| `/` / `?`                             | 向前 / 向後搜尋（大小寫敏感：查詢含大寫時） |
| `n` / `N`                             | 重複搜尋同 / 反方向                         |
| `v` 或 `Space`                        | 開始選取                                    |
| `y` 或 `Enter`                        | 複製選取                                    |
| `q` / `Esc`                           | 離開（Esc 先清選取/搜尋，再按才離開）       |

注意：copy mode **不會暫停 pane 程序**，輸出繼續即時更新；滑鼠拖選不用進 copy mode 就能複製。

### Prefix-free（進階：直接鍵，不按 prefix）

`Ctrl+Alt` 家族幾乎在所有 terminal / OS 都沒被占用，最安全：

```toml
# ~/.config/herdr/config.toml
[keys]
focus_pane_left    = ["prefix+h", "ctrl+alt+h"]
focus_pane_down    = ["prefix+j", "ctrl+alt+j"]
focus_pane_up      = ["prefix+k", "ctrl+alt+k"]
focus_pane_right   = ["prefix+l", "ctrl+alt+l"]
previous_tab       = ["prefix+p", "ctrl+alt+["]
next_tab           = ["prefix+n", "ctrl+alt+]"]
new_tab            = ["prefix+c", "ctrl+alt+c"]
previous_workspace = ["prefix+shift+p", "ctrl+alt+shift+["]
next_workspace     = ["prefix+shift+n", "ctrl+alt+shift+]"]
new_workspace      = ["prefix+shift+c", "ctrl+alt+shift+c"]
split_vertical     = ["prefix+v", "ctrl+alt+d"]
split_horizontal   = ["prefix+-", "ctrl+alt+shift+d"]
zoom               = ["prefix+z", "ctrl+alt+z"]
```

避免這些已被占用的：`ctrl+alt+方向鍵`（GNOME/Ghostty 切桌面）、`ctrl+alt+t`（Linux 開 terminal）、`ctrl+alt+l/a`（KDE）。

改完跑 `herdr server reload-config` 生效；回到預設鍵位用 `herdr config reset-keys`。

## 核心概念

| 概念       | 說明                                                        |
| ---------- | ----------------------------------------------------------- |
| Workspace  | 專案級容器（tabs + panes + agents），一個專案一個 workspace |
| Tab / Pane | pane 是真 terminal process，detach 後照活                   |
| Agent      | pane 內被辨識的 agent 程序（Claude Code、Codex、opencode…） |
| Session    | 背景常駐，reattach 隨時接回                                 |

## 常用指令

```zsh
herdr                      # 啟動/接上預設 session
herdr --session <name>     # 指名 session
herdr status               # client/server 狀態、socket 路徑
herdr server stop          # 關掉背景 server（pane 內程序會 exit）
herdr session stop <name>  # 關指定 session
herdr session attach <name># 接回指定 session
herdr --remote <ssh-target># SSH bridge，遠端機器上的 session
```

CLI 有完整 JSON API（`herdr api ...`、`herdr pane ...`、`herdr workspace ...`），可寫腳本自動化，
agent 也能透過同一個 local socket API 驅動 herdr（開 pane、提示你…）。

## 生存法則

- **不怕斷線**：detach（關視窗）≠ 停止；`herdr` 再接回
- **升級後**：`brew upgrade herdr` 完，如果 client/server protocol 有變，跑 `herdr server stop` 再 `herdr`
- **完全關閉**：`herdr server stop`（注意：會砍掉所有 pane 內的程序）

---

# Plugins（2026-09-19 安裝 · herdr 0.9.1）

> 注意：目前 config（omarchy quattro 風格）**prefix 已改為 `Ctrl+Space`**（不是上面的 `Ctrl+B`）。
> 以下 plugin 快捷鍵全部以 `Ctrl+Space` 為 prefix。

## 已安裝清單

| Plugin                        | 版本                  | 用途                                         | Keybinding                                         |
| ----------------------------- | --------------------- | -------------------------------------------- | -------------------------------------------------- |
| `herdr-portal`                | 1.2.0（已英文化）     | 全域任務看板（TUI + 網頁）                   | `p+b` TUI · `p+Shift+B` 網頁                       |
| `annotate`                    | 0.4.0（full 版）      | 終端機/文件/agent 回覆加註解，送回給 agent   | `p+a` 註解 · `p+o` review 文件 · `p+l` review 回覆 |
| `zenbu-labs.terminal-browser` | 0.1.1（本體 v0.11.1） | 終端機裡的真 Chromium 瀏覽器                 | 無（CLI / action）                                 |
| `afogel.shepherdr`            | 0.1.0                 | subagent 派工成可見 pane、codex 二審、resume | `p+s` 二審 · `p+Shift+S` resume                    |

> `p` = `Ctrl+Space`。安裝指令：`herdr plugin install <owner/repo[/subdir]> --yes`

## 管理指令

```zsh
herdr plugin list                        # 清單 + 版本 + config 路徑
herdr plugin install owner/repo --yes    # 安裝（--yes 跳過確認）
herdr plugin uninstall <id>              # 移除（含 managed checkout）
herdr plugin action list --plugin <id>   # 看有什麼 action
herdr plugin action invoke <id>.<action> # 手動觸發 action
herdr config check && herdr server reload-config   # 改 config 後生效
```

Keybindings 設在 `~/.config/herdr/config.toml` 的 `[[keys.command]]` 區段（type = "plugin_action"）。

## herdr-portal — 全域看板

監看所有 workspaces 的每個 agent，waiting / running / ready 三欄 kanban。

**TUI 看板**（`Ctrl+Space` `b`）：

| 按鍵           | 功能                                               |
| -------------- | -------------------------------------------------- |
| `↑↓←→` / click | 選卡片 · `Enter` 跳進該 pane（看板自動關閉）       |
| `N` / `s` `S`  | 新 tab / 新 pane（右/下，繼承選中卡片的目錄）      |
| `E`            | 改名（Tab 切換 pane 標題 / tab 名 / workspace 名） |
| `X`            | 釋放閒置 pane（掃描 → 勾選 → Enter 兩次确认）      |
| `U`            | 檢查新版，再按一次執行更新                         |
| `d` / `D`      | mo clean 磁碟預覽 / 清理                           |
| `Q`            | 離開                                               |

**網頁大螢幕**（`Ctrl+Space` `Shift+B`）：可丟第二螢幕；點卡片跳轉並帶前景、點 `↩` 直接從瀏覽器回覆 blocked 的 agent。

**英文化 patch**：UI 原為簡體中文（無語言設定），已直接改 checkout 原始碼。
Patch 腳本存在 `~/.config/herdr/portal-english-patch/`（translate + fix 兩支）。
**重新安裝/升級 portal 會覆蓋**，要重跑 patch。

## annotate — human-in-the-loop review

**註解終端機文字**：滑鼠選取 → `Ctrl+Space` `a` → 打字 → `Ctrl+S` 存。

| 按鍵                    | 功能                                                                           |
| ----------------------- | ------------------------------------------------------------------------------ |
| `p+Shift+A`             | 複製所有註解成 Markdown                                                        |
| `p+m`                   | 管理註解（`y` 複製單條 · `c` 全複製 · `Shift+C` 複製+歸檔 · `Tab` 歸檔）       |
| `p+o`                   | 開此資料夾文件樹，review plan / spec / README（`c` 註解 · `a` 標 OK · `d` 刪） |
| `p+l`                   | 直接 review 該 agent 的最後回覆                                                |
| `E` / Send              | **註解變成 agent 的下一條訊息**（帶行號 + 引用原文）                           |
| Ctrl-click `file://…md` | 開該檔案繼續 review                                                            |

## terminal-browser — 終端機裡的瀏覽器

需要 kitty graphics protocol 的 terminal（Ghostty OK）。渲染路徑：Electron offscreen → GPU pixels → terminal。

```zsh
terminal-browser                          # 直接開
terminal-browser open <url> --split right # 右側 split 開網頁
terminal-browser ls                       # 列出開著的瀏覽器
terminal-browser action                   # agent 相容 CLI：snapshot / click / fill / eval
```

瀏覽器內（macOS）：`Cmd+T` 新分頁 · `Cmd+L` 網址 · `Cmd+P` 指令面板 · `Cmd+R` 重載 · `F12` DevTools · `Ctrl+G` 選元素送給 agent · `Ctrl+Q` 離開。

殺手級用法：讓 agent 自己 `terminal-browser action ...` 操作開著的網頁（驗證 UI、填表、截圖），或寫完 HTML 自動開預覽 split。SSH 場景用 `terminal-browser --ssh <target>`（本地渲染、遠端代理請求）。

## shepherdr — subagent 派工 + 二審

把委派的 subagent 變成**可見、可審計的 pane**（不是黑盒子 in-process subagent）。

| 按鍵 / 指令                                                           | 功能                                                                 |
| --------------------------------------------------------------------- | -------------------------------------------------------------------- |
| `p+s`                                                                 | 請 codex 對**當前 worktree 的 git diff** 做第二意見審查（獨立 pane） |
| `p+Shift+S`                                                           | 重開最近一次可 resume 的 dispatch（互動模式，自己批准 tool calls）   |
| `herdr plugin pane open --plugin afogel.shepherdr --entrypoint board` | dispatch board：所有任務 + SESSION 欄                                |

設計上配合 superpowers 工作流：`HERDR_ENV=1` 時 overlay 自動把 implementer/reviewer dispatch 成可見 pane，並擷取 session id 供 resume。

**Vendor 鏈**：implementer `claude → cursor` · reviewer `codex → cursor`。
⚠️ 派工 agent 跑在 bypass 權限模式（`--dangerously-skip-permissions` 等），只用在可以放手的 repo。
依賴：Rust ≥ 1.85（edition2024）。安裝時已把 rustup stable 從 1.75.0 升到 1.98.1。

## 已移除 / 不採用

| Plugin                       | 原因                                                                                                                                          |
| ---------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| `aigora.lantern`             | 聊天 helper 白名單不支援 opencode（只吃 agent/devin/claude/codex/grok/pi）；spawn 的 agents 倒是可設 `HELPER_SPAWN_KIND="opencode"`。已移除。 |
| `ogulcancelik/herdr-browser` | **已 deprecated**（manifest 已移除、不再維護），官方後繼 = terminal-browser。                                                                 |

## Marketplace 須知

- 索引：[herdr.dev/plugins](https://herdr.dev/plugins/)（1200+，`herdr-plugin` topic 自動收錄，**無人工審查**）
- plugins 以你的權限執行、可讀終端機內容 → 裝前掃 `herdr-plugin.toml` + 腳本；可用 `--ref` 釘版本
- 更新 = 重新 `plugin install`（v1 無 `plugin update`）
