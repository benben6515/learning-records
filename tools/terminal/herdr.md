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
