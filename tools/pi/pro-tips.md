# Pi Agent Pro Tips

> 整理日期：2026-08-13
> 來源：[pi.dev/docs](https://pi.dev/docs/latest)、[Keybindings](https://pi.dev/docs/latest/keybindings)、[Usage](https://pi.dev/docs/latest/usage)
> 前置：先讀 [Pi 新手教學](./beginner-guide.md)

---

## 目錄

1. [Steering Messages（即時導引）](#1-steering-messages即時導引)
2. [Session 樹進階操作](#2-session-樹進階操作)
3. [Extensions：讓 Pi 長出新功能](#3-extensions讓-pi-長出新功能)
4. [Skills 系統與跨 Harness 共用](#4-skills-系統與跨-harness-共用)
5. [Prompt Templates](#5-prompt-templates)
6. [Pi Packages 生態](#6-pi-packages-生態)
7. [四種模式（Interactive / Print / RPC / SDK）](#7-四種模式)
8. [Compaction 策略](#8-compaction-策略)
9. [Context Engineering](#9-context-engineering)
10. [自訂 Keybindings](#10-自訂-keybindings)
11. [CLI 進階用法](#11-cli-進階用法)
12. [安全與容器化](#12-安全與容器化)
13. [熱門套件推薦](#13-熱門套件推薦)

---

## 1. Steering Messages（即時導引）

Pi 最獨特的功能之一：agent 工作時你可以插入訊息。

| 按鍵            | 送達時機         | 行為                                             |
| --------------- | ---------------- | ------------------------------------------------ |
| **`Enter`**     | 當前 tool 完成後 | Steering — 中斷剩餘排程的 tool，立即讀取你的訊息 |
| **`Alt+Enter`** | agent 完全做完後 | Follow-up — 排在佇列最後                         |
| **`Alt+Up`**    | 立即             | 把佇列中的訊息取回編輯器                         |
| **`Escape`**    | 立即             | 中斷 agent，恢復編輯器                           |

### 使用場景

- Agent 正在改錯檔案？按 `Enter` 插入「等等，改 src/api/ 不是 src/utils/」
- Agent 做完一輪你想追加要求？按 `Alt+Enter` 排入 follow-up
- 改變主意了？按 `Alt+Up` 取回佇列訊息

### 設定

在 `/settings` 中可調整 `steeringMode` 和 `followUpMode`。

---

## 2. Session 樹進階操作

Pi 的 session 不是線性的——它是一棵**樹**，每次 `/tree` 導航並從某個節點續聊就會產生新分支。

### `/tree` 導航快捷鍵

| 快捷鍵                     | 功能                       |
| -------------------------- | -------------------------- |
| `Ctrl+Left` / `Alt+Left`   | 收合分支，或跳到上一段開頭 |
| `Ctrl+Right` / `Alt+Right` | 展開分支，或跳到下一段     |
| `Shift+L`                  | 編輯節點標籤（bookmark）   |
| `Shift+T`                  | 切換標籤時間戳顯示         |

### `/tree` 過濾器

| 快捷鍵   | 過濾模式         |
| -------- | ---------------- |
| `Ctrl+D` | 預設視圖         |
| `Ctrl+T` | 隱藏 tool 結果   |
| `Ctrl+U` | 只顯示使用者訊息 |
| `Ctrl+L` | 只顯示有標籤的   |
| `Ctrl+A` | 顯示全部         |
| `Ctrl+O` | 循環切換過濾器   |

### Fork vs Clone vs Tree

| 操作                 | 說明                                        |
| -------------------- | ------------------------------------------- |
| `/tree` → 選節點續聊 | 在同一棵樹中建立新分支                      |
| `/fork`              | 從先前的使用者訊息建立**新的 session 檔案** |
| `/clone`             | 複製**當前活躍分支**到新 session 檔案       |

> **技巧**：實驗新方向時用 `/tree` 分支，想保留獨立副本時用 `/fork`。

---

## 3. Extensions：讓 Pi 長出新功能

Extensions 是 TypeScript 模組，能力遠比 Skills 強大。

### Extension 能做什麼

| 能力                 | 說明                                            |
| -------------------- | ----------------------------------------------- |
| 註冊自訂工具         | 讓 LLM 可以呼叫你的自訂函數                     |
| 註冊命令與快捷鍵     | 新增 `/my-command` 或綁定快捷鍵                 |
| 訂閱事件             | startup、session、model、tool、project_trust 等 |
| 自訂 TUI 元件        | dialog、widget、status bar、overlay             |
| 實作 RAG / 長期記憶  | 在每輪前注入 context、過濾歷史                  |
| 自訂 compaction 策略 | 主題式摘要、程式碼感知摘要                      |
| 註冊自訂 provider    | 接入任何 API                                    |

### 讓 Pi 自己寫 Extension

Pi 最酷的功能——直接開口要求：

```
I need a plan mode extension. Build it for me.
```

Pi 會修改自己的程式碼，然後你執行 `/reload` 即可使用。

### 官方範例（50+ 個）

| Extension                                                                                                                          | 功能            |
| ---------------------------------------------------------------------------------------------------------------------------------- | --------------- |
| [subagent](https://github.com/earendil-works/pi/tree/main/packages/coding-agent/examples/extensions/subagent/)                     | Sub-agent 功能  |
| [plan-mode](https://github.com/earendil-works/pi/tree/main/packages/coding-agent/examples/extensions/plan-mode/)                   | Plan mode       |
| [permission-gate](https://github.com/earendil-works/pi/tree/main/packages/coding-agent/examples/extensions/permission-gate.ts)     | 權限確認彈窗    |
| [protected-paths](https://github.com/earendil-works/pi/tree/main/packages/coding-agent/examples/extensions/protected-paths.ts)     | 路徑保護        |
| [ssh](https://github.com/earendil-works/pi/tree/main/packages/coding-agent/examples/extensions/ssh.ts)                             | SSH 執行        |
| [sandbox](https://github.com/earendil-works/pi/tree/main/packages/coding-agent/examples/extensions/sandbox/)                       | 沙盒執行        |
| [custom-compaction](https://github.com/earendil-works/pi/tree/main/packages/coding-agent/examples/extensions/custom-compaction.ts) | 自訂 compaction |

### 載入方式

```bash
# 從檔案
pi -e ./my-extension.ts

# 從 npm
pi -e npm:my-extension

# 從 git
pi -e git:github.com/user/pi-ext

# 多個
pi -e ./ext1.ts -e npm:ext2

# 只載入指定的，忽略其他
pi --no-extensions -e ./my-extension.ts
```

---

## 4. Skills 系統與跨 Harness 共用

Pi 實作了 **Agent Skills 標準**，與 Claude Code、OpenAI Codex 的 skills 完全相容。

### 跨 Harness 共用 Skills

```json
// ~/.pi/agent/settings.json
{
  "skills": ["~/.claude/skills", "~/.codex/skills"]
}
```

> 你不需要複製 skills——直接指向其他 agent 的 skill 目錄即可。

### Skill 結構

```
my-skill/
├── SKILL.md          # 必須：frontmatter + 指令
├── scripts/          # 輔助腳本
├── references/       # 按需載入的詳細文件
└── assets/           # 範本、設定等
```

### Progressive Disclosure

只有 skill 的**描述**常駐在 context 中，完整指令按需載入——這大幅節省 token。

### 手動觸發

```
/skill:my-skill
```

### 設定 skills 路徑

```json
// ~/.pi/agent/settings.json
{
  "skills": ["~/.pi/agent/skills", "~/ai/skills"]
}
```

CLI 也可直接指定：

```bash
pi --skill ./my-skill
pi --no-skills   # 停用所有 skill 探索
```

---

## 5. Prompt Templates

Prompt templates 是 Markdown 檔案，用 `/name` 展開成可重複使用的 prompt。

### 建立範本

```bash
mkdir -p ~/.pi/agent/prompts
echo "Review the following code for security issues:\n\n{{selection}}" > ~/.pi/agent/prompts/security-review.md
```

### 使用

在 TUI 中：

```
/security-review
```

Pi 會展開範本內容到編輯器中。

### 變數

支援 `{{selection}}`、`{{file}}` 等變數（視 extension 支援而定）。

---

## 6. Pi Packages 生態

Pi 有 5,299+ 個套件，可從 npm 或 git 安裝。

### 套件管理指令

```bash
pi install npm:<package>         # 從 npm 安裝
pi install git:github.com/u/repo # 從 git 安裝
pi install npm:<pkg> -l          # 安裝為專案層級
pi remove <source>               # 移除
pi list                          # 列出已安裝
pi update --all                  # 更新 Pi + 所有套件
pi update --self                 # 只更新 Pi 本身
pi config                        # 啟用/停用套件資源
```

### 套件可包含

- Extensions
- Skills
- Prompt Templates
- Themes

### 發布自己的套件

打包成 npm 套件或 git repo 即可分享。

> 瀏覽套件：[pi.dev/packages](https://pi.dev/packages)

---

## 7. 四種模式

| 模式            | 指令             | 用途                             |
| --------------- | ---------------- | -------------------------------- |
| **Interactive** | `pi`             | 完整 TUI 體驗                    |
| **Print**       | `pi -p "query"`  | 一次性查詢，輸出後退出           |
| **JSON**        | `pi --mode json` | 結構化事件流，適合腳本/整合      |
| **RPC**         | `pi --mode rpc`  | stdin/stdout JSONL，非 Node 整合 |
| **SDK**         | 嵌入 Node.js     | 程式化呼叫                       |

### Print Mode 管線整合

```bash
# 管線輸入
cat README.md | pi -p "Summarize this text"

# 一次性查詢
pi -p "List all .ts files in src/"

# 帶圖片
pi -p @screenshot.png "What's in this image?"
```

### JSON Mode（事件流）

```bash
pi --mode json "Fix the bug in auth"
# 輸出 JSON lines 事件流，可用 jq 或其他工具解析
```

### RPC Mode

透過 stdin/stdout JSONL 溝通，適合從 Python、Rust 等非 Node 語言整合。

---

## 8. Compaction 策略

當 context 接近上限，Pi 自動摘要舊訊息。你也可以完全自訂。

### 手動壓縮

```
/compact                      # 基本壓縮
/compact "保留所有程式碼片段"   # 帶自訂指令
```

### 自訂 Compaction（透過 Extension）

實作主題式壓縮、程式碼感知摘要、或用不同 model 做摘要：

```typescript
// custom-compaction.ts
// 參考: examples/extensions/custom-compaction.ts
```

### 壓縮與 Session 樹

`/tree` 可以顯示被 compaction 摘要過的分支。放棄的分支也會被摘要儲存。

---

## 9. Context Engineering

Pi 的 system prompt 是[最小的](https://github.com/earendil-works/pi/blob/main/packages/coding-agent/src/core/system-prompt.ts)，讓你做真正的 context engineering。

### Context Files 層次

```
~/.pi/agent/AGENTS.md          ← 全域指令
├── /parent/AGENTS.md          ← 父目錄
│   └── /parent/child/AGENTS.md ← 當前目錄
```

### Override 機制

在同一目錄放 `AGENTS.override.md`，Pi 會用它取代 `AGENTS.md`（其他目錄的仍正常疊加）。

### SYSTEM.md

- `.pi/SYSTEM.md` — 取代預設 system prompt（專案層級）
- `~/.pi/agent/SYSTEM.md` — 全域取代

### APPEND_SYSTEM.md

不想取代、只想附加？

- `.pi/APPEND_SYSTEM.md`（專案）
- `~/.pi/agent/APPEND_SYSTEM.md`（全域）

### 停用 context files

```bash
pi --no-context-files   # 或 -nc
```

---

## 10. 自訂 Keybindings

設定檔：`~/.pi/agent/keybindings.json`

### 基本格式

```json
{
  "tui.editor.historyPrevious": "ctrl+p",
  "tui.editor.deleteWordBackward": ["ctrl+w", "alt+backspace"]
}
```

每個 action 可以是單一按鍵或陣列。修改後執行 `/reload` 即可生效。

### Emacs 風格

```json
{
  "tui.editor.historyPrevious": "ctrl+p",
  "tui.editor.historyNext": "ctrl+n",
  "tui.editor.cursorLeft": ["left", "ctrl+b"],
  "tui.editor.cursorRight": ["right", "ctrl+f"],
  "tui.editor.cursorWordLeft": ["alt+left", "alt+b"],
  "tui.editor.cursorWordRight": ["alt+right", "alt+f"],
  "tui.editor.deleteCharBackward": ["backspace", "ctrl+h"],
  "tui.input.newLine": ["shift+enter", "ctrl+j"]
}
```

### Vim 風格（在編輯器中用 hjkl）

```json
{
  "tui.editor.cursorUp": ["up", "alt+k"],
  "tui.editor.cursorDown": ["down", "alt+j"],
  "tui.editor.cursorLeft": ["left", "alt+h"],
  "tui.editor.cursorRight": ["right", "alt+l"],
  "tui.editor.cursorWordLeft": ["alt+left", "alt+b"],
  "tui.editor.cursorWordRight": ["alt+right", "alt+w"]
}
```

### Key 格式

- Modifiers: `ctrl`、`shift`、`alt`、`super`（可組合）
- Keys: `a-z`、`0-9`、`escape`、`enter`、`tab`、`f1`-`f12` 等
- 範例: `ctrl+shift+x`、`alt+ctrl+x`、`super+k`

> `super` 需要 Kitty keyboard protocol 支援的終端機。

---

## 11. CLI 進階用法

### Model 選項

```bash
# 指定 provider + model
pi --provider openai --model gpt-4o "Help me"

# 帶 provider prefix
pi --model openai/gpt-4o "Help me"

# 帶 thinking level
pi --model sonnet:high "Solve this complex problem"

# 限制 Ctrl+P 循環的 model
pi --models "claude-*,gpt-4o"

# 列出可用 model
pi --list-models
```

### Thinking Levels

```
off → minimal → low → medium → high → xhigh → max
```

```bash
pi --thinking high
# 或在 TUI 中用 Shift+Tab 循環
```

### Tool 控制

```bash
# 只用特定工具（唯讀模式）
pi --tools read,grep,find,ls -p "Review the code"

# 排除特定工具
pi --exclude-tools ask_question

# 停用所有內建工具
pi --no-builtin-tools

# 完全停用工具
pi --no-tools
```

### Session 控制

```bash
pi -c                  # 繼續最近 session
pi -r                  # 瀏覽選擇
pi --no-session        # 無痕模式
pi --name "release audit" -p "Audit this repo"
pi --session <id>      # 用特定 session
pi --fork <id>         # Fork 某個 session
pi --session-dir ~/sessions  # 自訂 session 目錄
```

### 資源控制

```bash
# 只載入指定 extension
pi --no-extensions -e ./my-ext.ts

# 只載入指定 skill
pi --no-skills --skill ./my-skill

# 只載入指定 theme
pi --no-themes --theme ./my-theme
```

### System Prompt 控制

```bash
# 完全取代 system prompt
pi --system-prompt "You are a code reviewer"

# 附加到 system prompt
pi --append-system-prompt "Always respond in Traditional Chinese"
```

### TUI Mode

```bash
pi --tui-mode fullscreen    # 實驗性全螢幕模式
pi --tui-mode regular       # 預設模式
```

> Fullscreen 模式下，transcript 在終端視窗內捲動，編輯器和狀態欄固定在底部。

---

## 12. 安全與容器化

### Project Trust

Pi 在啟動時會詢問是否信任含專案層級設定的目錄：

```
/trust     # 儲存信任決策
```

### 沙盒選項

| 方式      | 說明                 |
| --------- | -------------------- |
| Gondolin  | Pi 官方沙盒          |
| Docker    | 容器化執行           |
| OpenShell | 沙盒執行             |
| Extension | `sandbox/` extension |

### 非互動模式的 trust

```bash
pi -p "query" -a     # --approve 信任專案設定
pi -p "query" -na    # --no-approve 忽略專案設定
```

---

## 13. 熱門套件推薦

| 套件                     | 安裝                                  | 功能                        |
| ------------------------ | ------------------------------------- | --------------------------- |
| `pi-obsidian`            | `pi install pi-obsidian`              | Obsidian CLI skill          |
| `pi-subagents`           | `pi install pi-subagents`             | Sub-agent 功能              |
| `pi-web-access`          | `pi install pi-web-access`            | 網頁存取                    |
| `pi-mcp-adapter`         | `pi install pi-mcp-adapter`           | MCP 整合                    |
| `@patimweb/pi-mindplace` | `pi install @patimweb/pi-mindplace`   | Graphifi 知識圖譜           |
| `pi-share-hf`            | `git:github.com/badlogic/pi-share-hf` | 發布 session 到 HuggingFace |
| `pi-doom`                | `git:github.com/badlogic/pi-doom`     | 在 Pi 裡玩 DOOM（真的）     |

### Graphifi（知識圖譜）

```bash
# 安裝
pipex install graphify --yes
pi install @patimweb/pi-mindplace

# 使用
pi  # 然後要求：build the graph
# 查詢：explain Kubernetes
# 查詢：everything I know about X
```

> Graphifi 用 tree-sitter 解析筆記/程式碼結構，建立知識圖譜，可降低 token 消耗最多 70×。

---

## 所有 Slash 指令一覽

| 指令                | 說明                                      |
| ------------------- | ----------------------------------------- |
| `/login` `/logout`  | 管理 OAuth/API-key 認證                   |
| `/llama`            | 下載/載入/卸載 llama.cpp 本地模型         |
| `/model`            | 切換 model                                |
| `/scoped-models`    | 啟用/停用 Ctrl+P 循環的 model             |
| `/settings`         | Thinking level、theme、訊息送達模式       |
| `/resume`           | 選擇先前 session                          |
| `/new`              | 新 session                                |
| `/name <name>`      | 命名 session                              |
| `/session`          | 顯示 session 資訊                         |
| `/tree`             | 導航 session 樹                           |
| `/trust`            | 儲存專案信任決策                          |
| `/fork`             | 從先前訊息 fork                           |
| `/clone`            | 複製當前分支                              |
| `/compact [prompt]` | 手動壓縮 context                          |
| `/copy`             | 複製上一則回應                            |
| `/export [file]`    | 匯出 HTML/JSONL                           |
| `/import <file>`    | 匯入 JSONL session                        |
| `/share`            | 上傳 GitHub gist                          |
| `/reload`           | 重新載入 extensions/skills/prompts/themes |
| `/hotkeys`          | 顯示所有快捷鍵                            |
| `/changelog`        | 顯示版本歷史                              |
| `/quit`             | 離開                                      |

---

## 設定檔位置速查

| 檔案/目錄                      | 用途                   |
| ------------------------------ | ---------------------- |
| `~/.pi/agent/AGENTS.md`        | 全域指令               |
| `~/.pi/agent/SYSTEM.md`        | 全域 system prompt     |
| `~/.pi/agent/APPEND_SYSTEM.md` | 全域附加 system prompt |
| `~/.pi/agent/settings.json`    | 全域設定               |
| `~/.pi/agent/keybindings.json` | 快捷鍵設定             |
| `~/.pi/agent/skills/`          | 全域 skills            |
| `~/.pi/agent/extensions/`      | 全域 extensions        |
| `~/.pi/agent/prompts/`         | 全域 prompt templates  |
| `~/.pi/agent/sessions/`        | Session 儲存目錄       |
| `~/.pi/agent/trust.json`       | 專案信任決策           |
| `.pi/settings.json`            | 專案層級設定           |
| `.pi/extensions/`              | 專案 extensions        |
| `.pi/skills/`                  | 專案 skills            |
| `.pi/SYSTEM.md`                | 專案 system prompt     |
| `AGENTS.md`                    | 專案指令               |

---

## 參考連結

- [Pi 官網](https://pi.dev)
- [Pi 文件](https://pi.dev/docs/latest)
- [Pi 套件目錄](https://pi.dev/packages)
- [Pi GitHub](https://github.com/earendil-works/pi)
- [Keybindings 文件](https://pi.dev/docs/latest/keybindings)
- [Extensions 文件](https://pi.dev/docs/latest/extensions)
- [Skills 文件](https://pi.dev/docs/latest/skills)
- [Pi 部落格文（設計理念）](https://mariozechner.at/posts/2025-11-30-pi-coding-agent/)
- [Discord 社群](https://discord.com/invite/3cU7Bz4UPx)
