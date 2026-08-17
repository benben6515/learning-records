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

| Action | Key |
|---|---|
| 新 tab | `prefix+c` |
| 分割右 / 下 | `prefix+v` / `prefix+-` |
| pane 間移動 | `prefix+h/j/k/l` |
| Workspace 導航 | `prefix+w` |
| Detach（全部繼續跑） | `prefix+q` |

| 輔助 | Key |
|---|---|
| 全部鍵位說明（可按 `/` 過濾） | `prefix+?` |
| 設定畫面 | `prefix+s` |

### Pro（其餘鍵位）

**Panes：**

| Action | Key |
|---|---|
| Zoom 聚焦 pane | `prefix+z` |
| 關 pane | `prefix+x` |
| 交換 pane 位置 | `prefix+shift+h/j/k/l` |
| 調整大小模式 | `prefix+r`（再用 h/j/k/l 調，Esc 離開） |
| Copy mode | `prefix+[` |
| 編輯 scrollback（送進 $EDITOR） | `prefix+e` |
| 前一個 pane | `prefix+tab` |

**Tabs：**

| Action | Key |
|---|---|
| 下一 / 上一 tab | `prefix+n` / `prefix+p` |
| 跳到 tab 1–9 | `prefix+1..9` |
| 改名 tab | `prefix+shift+t` |
| 關 tab | `prefix+shift+x` |

**Workspace / Session：**

| Action | Key |
|---|---|
| 新 workspace | `prefix+shift+n` |
| 改名 workspace | `prefix+shift+w` |
| 關 workspace | `prefix+shift+d` |
| Goto picker（快速跳） | `prefix+g`（再用 `j/k` 導航，方向鍵永遠是 pane 左右移） |
| 收 / 開 sidebar | `prefix+b` |
| 新 git worktree | `prefix+shift+g` |
| 重載設定 | `prefix+shift+r` |

**Copy mode（`prefix+[` 進入後）：**

| 按鍵 | 功能 |
|---|---|
| `h/j/k/l` | 單字元移動 |
| `w` / `b` / `e` | 下一 / 上一單字、單字尾（tmux 慣例） |
| `{` / `}`` | 段落上下 |
| `PageUp/Down`、`Ctrl-B/F`、`Ctrl-U/D` | 翻頁 / 半頁 |
| `/` / `?` | 向前 / 向後搜尋（大小寫敏感：查詢含大寫時） |
| `n` / `N` | 重複搜尋同 / 反方向 |
| `v` 或 `Space` | 開始選取 |
| `y` 或 `Enter` | 複製選取 |
| `q` / `Esc` | 離開（Esc 先清選取/搜尋，再按才離開） |

注意：copy mode **不會暫停 pane 程序**，輸出繼續即時更新；滑鼠拖選不用進 copy mode 就能複製。

### Prefix-free（進階：直接鍵，不按 prefix）

`Ctrl+Alt` 家族幾乎在所有 terminal / OS 都沒被占用，最安全：

```toml
# ~/.config/herdr/config.toml
[keys]
focus_pane_left  = ["prefix+h", "ctrl+alt+h"]
focus_pane_down  = ["prefix+j", "ctrl+alt+j"]
focus_pane_up    = ["prefix+k", "ctrl+alt+k"]
focus_pane_right = ["prefix+l", "ctrl+alt+l"]
previous_tab     = ["prefix+p", "ctrl+alt+["]
next_tab         = ["prefix+n", "ctrl+alt+]"]
new_tab          = ["prefix+c", "ctrl+alt+c"]
split_vertical   = ["prefix+v", "ctrl+alt+d"]
split_horizontal = ["prefix+-", "ctrl+alt+shift+d"]
zoom             = ["prefix+z", "ctrl+alt+z"]
```

避免這些已被占用的：`ctrl+alt+方向鍵`（GNOME/Ghostty 切桌面）、`ctrl+alt+t`（Linux 開 terminal）、`ctrl+alt+l/a`（KDE）。

改完跑 `herdr server reload-config` 生效；回到預設鍵位用 `herdr config reset-keys`。

## 核心概念

| 概念 | 說明 |
|---|---|
| Workspace | 專案級容器（tabs + panes + agents），一個專案一個 workspace |
| Tab / Pane | pane 是真 terminal process，detach 後照活 |
| Agent | pane 內被辨識的 agent 程序（Claude Code、Codex、opencode…） |
| Session | 背景常駐，reattach 隨時接回 |

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
