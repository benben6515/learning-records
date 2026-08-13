# OpenCode TUI Pro Tips

> 整理日期：2026-08-13
> 來源：[opencode.ai/docs/tui](https://opencode.ai/docs/tui/)、[/docs/keybinds](https://opencode.ai/docs/keybinds/)

---

## 導覽與 Session 管理

| 快捷鍵 | 指令 | 說明 |
|--------|------|------|
| `ctrl+x l` | `/sessions` | 列出並切換過去的 session（別名：`/resume`、`/continue`） |
| `ctrl+x n` | `/new` | 開啟新 session（別名：`/clear`） |
| `ctrl+x g` | — | 開啟 session **timeline**，可跳到對話中的任意時間點 |
| `ctrl+x s` | — | 開啟 status view |
| `ctrl+x b` | — | 切換側邊欄（sidebar）顯示/隱藏 |

---

## Undo / Redo（基於 Git）

| 快捷鍵 | 指令 | 說明 |
|--------|------|------|
| `ctrl+x u` | `/undo` | 復原上一則訊息，**同時 revert 檔案變更**（需在 Git repo 中） |
| `ctrl+x r` | `/redo` | 重做已復原的訊息，檔案變更也會一併恢復 |

> **技巧**：可以連續執行多次 `/undo` 來回溯好幾輪對話。

---

## Context（上下文）管理

| 快捷鍵 | 指令 | 說明 |
|--------|------|------|
| `ctrl+x c` | `/compact` | 壓縮當前 session，在對話中途釋放 context 空間（別名：`/summarize`） |
| — | `@` | 模糊搜尋檔案；輸入 `@alias/` 可展開 reference 內的檔案清單 |
| — | `!` | 在訊息開頭輸入 `!` 可執行 shell 指令，輸出會自動加入對話 |
| `ctrl+x h` | — | 切換 conceal（隱藏/顯示冗長的 tool 輸出） |
| `ctrl+x y` | — | 將訊息複製到剪貼簿 |

### `@` 參考用法範例

```
How is auth handled in @packages/functions/src/api/index.ts?
Compare our setup with @docs/README.md
```

### `!` Bash 指令範例

```
!ls -la
```

輸出會以 tool result 的形式加入對話。

---

## Model 與 Thinking（推理）

| 快捷鍵 | 指令 | 說明 |
|--------|------|------|
| `ctrl+t` | — | 循環切換 **model variant**（例如開關 extended thinking） |
| — | `/thinking` | 顯示/隱藏 model 的推理過程區塊 |
| `ctrl+x m` | `/models` | 列出所有可用 model |
| `ctrl+f` | — | 將當前 model 加入/移除收藏 |
| `f2` / `shift+f2` | — | 循環切換最近使用的 model |
| `ctrl+a` | — | 切換 provider |

> **注意**：`/thinking` 只控制推理區塊是否**顯示**，不會啟用/關閉推理能力。要切換實際推理能力請用 `ctrl+t`。

---

## 編輯器整合

| 快捷鍵 | 指令 | 說明 |
|--------|------|------|
| `ctrl+x e` | `/editor` | 在 `$EDITOR` 中撰寫 prompt（VS Code 需設 `EDITOR="code --wait"`） |
| `ctrl+x x` | `/export` | 將完整對話匯出為 Markdown 並在編輯器中開啟 |

### 設定 EDITOR

```bash
# Vim / Neovim
export EDITOR=nvim

# VS Code（GUI 編輯器需要 --wait）
export EDITOR="code --wait"
```

加入 `~/.zshrc` 或 `~/.bashrc` 使其永久生效。

---

## 輸入框 Readline 編輯快捷鍵

| 快捷鍵 | 動作 |
|--------|------|
| `ctrl+a` | 游標移到行首 |
| `ctrl+e` | 游標移到行尾 |
| `ctrl+b` / `ctrl+f` | 往前/往後移一個字元 |
| `alt+b` / `alt+f` | 往前/往後移一個單字 |
| `ctrl+u` | 刪除從游標到行首 |
| `ctrl+k` | 刪除從游標到行尾 |
| `ctrl+w` | 刪除前一個單字 |
| `alt+d` | 刪除下一個單字 |
| `ctrl+d` | 刪除游標下的字元 |
| `ctrl+g` | 中止正在執行的回應 / 關閉彈出視窗 |
| `ctrl+z` | （macOS/Linux）暫停 TUI，回到 shell |

---

## 進階配置（`tui.json`）

檔案位置：專案根目錄或 `~/.config/opencode/tui.json`

### which-key（快捷鍵導覽面板）

```json
{
  "keybinds": {
    "which_key_toggle": "ctrl+alt+k"
  }
}
```

按下 `ctrl+alt+k` 會彈出面板顯示所有可用快捷鍵，非常適合探索新功能。

### Attention 通知與音效

```json
{
  "attention": {
    "enabled": true,
    "notifications": true,
    "sound": true,
    "volume": 0.4
  }
}
```

當 agent 完成、需要權限確認或發生錯誤時，播放音效並顯示桌面通知。

### 其他實用選項

```json
{
  "$schema": "https://opencode.ai/tui.json",
  "theme": "opencode",
  "mouse": false,
  "scroll_acceleration": { "enabled": true },
  "diff_style": "stacked",
  "leader_timeout": 2000,
  "cursor": {
    "style": "block",
    "blinking": true
  }
}
```

| 選項 | 說明 |
|------|------|
| `mouse: false` | 停用滑鼠捕捉，保留終端原生選取/捲動行為 |
| `scroll_acceleration.enabled` | macOS 風格的平滑捲動加速 |
| `diff_style: "stacked"` | 在窄終端強制使用單欄 diff（`"auto"` 則自動適應） |
| `leader_timeout` | 按 leader 鍵後等待下一鍵的毫秒數（預設 `2000`） |
| `cursor` | 控制游標樣式（`block`/`underline`/`line`）與閃爍 |

---

## 工作流程技巧

### 1. 先 Plan 再 Build

- 按 **`Tab`** 切換到 **Plan mode**（右下角會顯示指示器）
- 在 Plan mode 中 opencode 只提供建議，不做任何變更
- 反覆迭代計畫後，再按 **`Tab`** 切回 Build mode 實際執行

### 2. 分享對話

```
/share
```

產生一個可分享的對話連結並複製到剪貼簿。

### 3. 初始化專案

```
/init
```

自動分析專案並生成或更新 `AGENTS.md`。建議將 `AGENTS.md` commit 到 Git。

### 4. Command Palette

按 **`ctrl+p`** 開啟命令面板，可搜尋任何設定或動作，包括隱藏使用者名稱等選項。

### 5. 拖放圖片

將圖片直接拖放進終端機，opencode 會掃描圖片內容並加入 prompt。

---

## 所有 Slash 指令一覽

| 指令 | 快捷鍵 | 說明 |
|------|--------|------|
| `/connect` | — | 新增 provider 並輸入 API key |
| `/compact` | `ctrl+x c` | 壓縮 session（別名：`/summarize`） |
| `/details` | — | 切換 tool 執行細節顯示 |
| `/editor` | `ctrl+x e` | 在外部編輯器撰寫訊息 |
| `/exit` | `ctrl+x q` | 離開 opencode（別名：`/quit`、`/q`） |
| `/export` | `ctrl+x x` | 匯出對話為 Markdown |
| `/help` | — | 顯示說明 |
| `/init` | — | 引導建立/更新 `AGENTS.md` |
| `/models` | `ctrl+x m` | 列出可用 model |
| `/new` | `ctrl+x n` | 新 session（別名：`/clear`） |
| `/redo` | `ctrl+x r` | 重做已復原的訊息 |
| `/sessions` | `ctrl+x l` | 列出/切換 session（別名：`/resume`、`/continue`） |
| `/share` | — | 分享當前 session |
| `/themes` | `ctrl+x t` | 列出可用主題 |
| `/thinking` | — | 切換推理區塊顯示 |
| `/undo` | `ctrl+x u` | 復原上一則訊息（含檔案變更） |
| `/unshare` | — | 取消分享 session |

---

## Leader Key 機制

opencode 使用 **leader key**（預設 `ctrl+x`）來避免與終端機快捷鍵衝突。

- 先按 `ctrl+x`，再按對應鍵。例如：`ctrl+x` → `n` = 新 session
- `leader_timeout`（預設 2000ms）控制等待下一鍵的時間
| 快捷鍵 | 說明 |
| `ctrl+alt+k` | 切換 which-key 面板 |
| `ctrl+alt+shift+k` | 切換 which-key 佈局 |

---

## 參考連結

- [TUI 文件](https://opencode.ai/docs/tui/)
- [Keybinds 文件](https://opencode.ai/docs/keybinds/)
- [Themes](https://opencode.ai/docs/themes/)
- [Commands（自訂指令）](https://opencode.ai/docs/commands/)
