# Pi Agent 新手教學

> 整理日期：2026-08-13
> 適用對象：第一次使用 Pi 的開發者
> 官方文件：[pi.dev/docs](https://pi.dev/docs/latest)

---

## 目錄

1. [Pi 是什麼？](#1-pi-是什麼)
2. [安裝](#2-安裝)
3. [設定 Provider](#3-設定-provider)
4. [第一次啟動](#4-第一次啟動)
5. [基本操作：問問題](#5-基本操作問問題)
6. [基本操作：修改程式碼](#6-基本操作修改程式碼)
7. [Session 管理（樹狀結構）](#7-session-管理樹狀結構)
8. [檔案參考與指令注入](#8-檔案參考與指令注入)
9. [分享與匯出](#9-分享與匯出)
10. [Pi vs 其他 Agent](#10-pi-vs-其他-agent)
11. [常用快捷鍵速查表](#11-常用快捷鍵速查表)
12. [下一步](#12-下一步)

---

## 1. Pi 是什麼？

Pi 是由 Mario Zechner（BadLogic）開發的**極簡終端 coding agent**，核心理念是：

> **「適應你的工作流，而不是要你適應它。」**

跟 Claude Code、OpenCode 等「太空船」型 agent 不同，Pi 刻意不內建很多功能（MCP、sub-agents、plan mode、權限彈窗），而是透過 **Extensions、Skills、Packages** 讓你自己決定要什麼。

### Pi 的特色

| 特色              | 說明                                                       |
| ----------------- | ---------------------------------------------------------- |
| 極簡核心          | 只內建最基本的 read/bash/edit/write/grep/find/ls 工具      |
| 高度可擴展        | Extensions（TypeScript）可自訂工具、命令、快捷鍵、事件、UI |
| 相容 Agent Skills | 可直接用 Claude Code / OpenCode / Codex 的 skills          |
| 15+ Providers     | Anthropic、OpenAI、Google、Azure、Bedrock、Groq、Ollama 等 |
| 樹狀 Session      | 所有對話分支存在一棵樹裡，可隨時導航、fork、回溯           |
| 四種模式          | Interactive（TUI）、Print/JSON、RPC、SDK                   |
| 自我修改          | 可以叫 Pi 幫自己寫 extension，寫完 `/reload` 即可          |

---

## 2. 安裝

### macOS / Linux（推薦）

```bash
curl -fsSL https://pi.dev/install.sh | sh
```

### npm（跨平台）

```bash
npm install -g --ignore-scripts @earendil-works/pi-coding-agent
```

> `--ignore-scripts` 停用安裝時的 lifecycle scripts，Pi 不需要它們。

### 其他套件管理器

```bash
# pnpm
pnpm add -g --ignore-scripts @earendil-works/pi-coding-agent

# bun
bun add -g --ignore-scripts @earendil-works/pi-coding-agent

# Windows PowerShell
powershell -c "irm https://pi.dev/install.ps1 | iex"
```

### 驗證安裝

```bash
pi --version
```

---

## 3. 設定 Provider

### 方式一：OAuth 登入（訂閱型 provider）

在 Pi TUI 中執行：

```
/login
```

選擇 provider，Pi 會引導你完成 OAuth 流程。

### 方式二：API Key（環境變數）

```bash
# Anthropic
export ANTHROPIC_API_KEY="sk-ant-..."

# OpenAI
export OPENAI_API_KEY="sk-..."

# Google
export GOOGLE_API_KEY="..."

# Groq
export GROQ_API_KEY="..."
```

加入 `~/.zshrc` 或 `~/.bashrc` 使其永久生效。

### 支援的 Providers

| Provider    | API Key 環境變數          |
| ----------- | ------------------------- |
| Anthropic   | `ANTHROPIC_API_KEY`       |
| OpenAI      | `OPENAI_API_KEY`          |
| Google      | `GOOGLE_API_KEY`          |
| Azure       | 透過 `settings.json` 設定 |
| Bedrock     | 使用 AWS credentials      |
| Mistral     | `MISTRAL_API_KEY`         |
| Groq        | `GROQ_API_KEY`            |
| Cerebras    | `CEREBRAS_API_KEY`        |
| xAI         | `XAI_API_KEY`             |
| HuggingFace | `HF_API_KEY`              |
| Kimi        | `KIMI_API_KEY`            |
| MiniMax     | `MINIMAX_API_KEY`         |
| NVIDIA      | `NVIDIA_API_KEY`          |
| OpenRouter  | `OPENROUTER_API_KEY`      |
| Ollama      | 本地，不需 key            |

---

## 4. 第一次啟動

### 進入專案並啟動

```bash
cd /path/to/your/project
pi
```

### 初始化 context files

Pi 啟動時會自動讀取 `AGENTS.md`（或 `CLAUDE.md`），從以下位置載入：

1. `~/.pi/agent/AGENTS.md` — 全域指令
2. 父目錄往上搜尋
3. 當前目錄的 `AGENTS.md`

```bash
# 建立全域 AGENTS.md
mkdir -p ~/.pi/agent
echo "# 全域指令" > ~/.pi/agent/AGENTS.md

# 在專案中建立
echo "# 專案指令" > AGENTS.md
```

> **建議**：在專案中放 `AGENTS.md` 寫入專案慣例、build 指令、安全規則等。

---

## 5. 基本操作：問問題

直接在輸入框打字即可。Pi 的 TUI 有四個區域：

| 區域         | 內容                                                   |
| ------------ | ------------------------------------------------------ |
| **啟動標頭** | 快捷鍵提示、已載入的 context files、skills、extensions |
| **訊息區**   | 使用者訊息、回應、工具呼叫與結果                       |
| **編輯器**   | 你打字的地方（邊框顏色 = 當前 thinking level）         |
| **頁尾**     | 工作目錄、session 名稱、token/成本、當前 model         |

### 範例：理解 codebase

```
Give me a quick summary of the codebase.
```

### 範例：解釋特定檔案

用 `@` 引用檔案：

```
How is auth handled in @src/api/index.ts?
```

> 輸入 `@` 後跳出模糊搜尋清單，選檔案即可。

---

## 6. 基本操作：修改程式碼

### 直接請它改

```
Add input validation to the form in @src/components/ContactForm.tsx.
Use the same pattern as @src/components/LoginForm.tsx.
```

> **重點**：Pi 沒有 plan mode（內建），但你可以先叫它「給我計畫」再執行。或者安裝 plan-mode extension。

### 餵圖片

用 `Ctrl+V` 貼上剪貼簿中的圖片：

```
Recreate this UI design: [paste image]
```

### 中途插入訊息（Steering）

Pi 的一大特色是 agent 工作時你可以插入訊息：

| 按鍵            | 行為                                                       |
| --------------- | ---------------------------------------------------------- |
| **`Enter`**     | Steering message — 當前 tool 完成後立即送達，中斷剩餘 tool |
| **`Alt+Enter`** | Follow-up message — 等 agent 完全做完後才送達              |
| **`Escape`**    | 中斷 agent，恢復編輯器                                     |
| **`Alt+Up`**    | 把佇列中的訊息取回編輯器                                   |

> 這讓你可以即時導引 agent 的方向，不用等它做完。

---

## 7. Session 管理（樹狀結構）

Pi 的 session 是**樹狀結構**，所有對話分支存在一棵樹裡，全部在一個檔案中。

### 常用指令

| 指令           | 說明                                           |
| -------------- | ---------------------------------------------- |
| `/tree`        | 視覺化 session 樹，可跳到任意分支              |
| `/fork`        | 從先前的使用者訊息 fork 出新 session           |
| `/clone`       | 複製當前分支到新 session                       |
| `/new`         | 開新 session                                   |
| `/resume`      | 從先前的 session 中選擇                        |
| `/session`     | 顯示當前 session 資訊（ID、檔案、token、成本） |
| `/name <name>` | 命名 session                                   |

### CLI session 選項

```bash
pi -c                  # 繼續最近的 session
pi -r                  # 瀏覽並選擇 session
pi --no-session        # 不保留 session（無痕模式）
pi --name "my task"    # 啟動時命名
pi --fork <id>         # Fork 某個 session
```

### Compaction（壓縮）

當 context 接近上限時，Pi 會自動摘要舊訊息：

```
/compact               # 手動壓縮
/compact "保留程式碼片段"  # 帶自訂指令壓縮
```

---

## 8. 檔案參考與指令注入

### `@` — 引用檔案

```
@src/index.ts
@src/api/router.ts @src/api/handler.ts
```

也可在 CLI 直接傳入：

```bash
pi @code.ts @test.ts "Review these files"
```

### `!` — 執行 Shell 指令

```
!ls -la
!git status
!npm test
```

指令輸出會發送給 model。

### `!!` — 隱藏的 Shell 指令

```
!!export SECRET=abc123
```

執行但不把輸出發送給 model。

### `Ctrl+G` — 外部編輯器

按下 `Ctrl+G` 把 prompt 送到 `$EDITOR`（VS Code 需設 `EDITOR="code --wait"`）。

---

## 9. 分享與匯出

| 指令             | 說明                                 |
| ---------------- | ------------------------------------ |
| `/export [file]` | 匯出為 HTML                          |
| `/share`         | 上傳為 GitHub gist，產生可分享的連結 |
| `/import <file>` | 從 JSONL 匯入 session                |

> **技巧**：Pi 也支援 print mode 做一次性查詢：`pi -p "Summarize this codebase"`

---

## 10. Pi vs 其他 Agent

| 功能             | Pi                      | OpenCode          | Claude Code       |
| ---------------- | ----------------------- | ----------------- | ----------------- |
| MCP              | ❌ 用 extension 加      | ✅ 內建           | ✅ 內建           |
| Sub-agents       | ❌ 用 tmux 或 extension | ✅ 內建           | ✅ 內建           |
| Plan mode        | ❌ 用 extension         | ✅ 內建           | ✅ 內建           |
| 權限彈窗         | ❌ 用 extension         | ✅ 內建           | ✅ 內建           |
| Background bash  | ❌ 用 tmux              | ✅ 內建           | ✅ 內建           |
| Session 樹       | ✅ 內建                 | 線性              | 線性              |
| Steering message | ✅ 內建                 | 有限              | 有限              |
| Skills 相容性    | Agent Skills 標準       | Agent Skills 標準 | Agent Skills 標準 |
| 自我修改         | ✅ 可幫自己寫 extension | ❌                | ❌                |
| 套件生態         | 5,299+ Pi packages      | plugins           | —                 |
| 授權             | MIT                     | 開源              | 閉源              |

> **適合誰**：喜歡極簡、想要完全控制、不介意自己裝東西的人。如果你想要開箱即用，OpenCode 或 Claude Code 可能更適合。

---

## 11. 常用快捷鍵速查表

### 輸入與訊息

| 快捷鍵        | 功能                                     |
| ------------- | ---------------------------------------- |
| `Enter`       | 送出訊息（或 steering message）          |
| `Shift+Enter` | 換行                                     |
| `Alt+Enter`   | Follow-up message（等 agent 做完後送達） |
| `Escape`      | 中斷 / 取消                              |
| `Alt+Up`      | 取回佇列中的訊息                         |
| `Ctrl+G`      | 外部編輯器                               |
| `Ctrl+V`      | 貼上圖片/文字                            |

### Model 與 Thinking

| 快捷鍵         | 功能                    |
| -------------- | ----------------------- |
| `Ctrl+L`       | 開啟 model 選擇器       |
| `Ctrl+P`       | 循環切換 model          |
| `Shift+Ctrl+P` | 反向循環 model          |
| `Shift+Tab`    | 循環 thinking level     |
| `Ctrl+T`       | 收合/展開 thinking 區塊 |

### Session 與工具

| 快捷鍵   | 功能                      |
| -------- | ------------------------- |
| `Ctrl+X` | 複製上一則回應            |
| `Ctrl+O` | 收合/展開 tool 輸出       |
| `Ctrl+D` | 離開 Pi（編輯器為空時）   |
| `Ctrl+Z` | 暫停到背景（macOS/Linux） |

### 編輯器（Readline 風格）

| 快捷鍵              | 功能                |
| ------------------- | ------------------- |
| `Ctrl+A` / `Ctrl+E` | 行首 / 行尾         |
| `Ctrl+W`            | 刪除前一個單字      |
| `Ctrl+U` / `Ctrl+K` | 刪除到行首 / 行尾   |
| `Ctrl+Y`            | 貼上最近刪除的文字  |
| `Alt+B` / `Alt+F`   | 往前/往後移一個單字 |

> 更多快捷鍵請見 [Pro Tips](./pro-tips.md)

---

## 12. 下一步

| 想做的事             | 去哪看                                                        |
| -------------------- | ------------------------------------------------------------- |
| 進階操作技巧         | [Pi Pro Tips](./pro-tips.md)                                  |
| 實戰配置範例         | [Pi Setup After 6 Months of Use](./pi-setup-6-months-eero-alvar.md) |
| Pi × Obsidian 工作流 | [Pi Agent Obsidian Workflow](./pi-agent-obsidian-workflow.md) |
| 安裝套件             | [pi.dev/packages](https://pi.dev/packages)                    |
| 寫 Extension         | [Extensions 文件](https://pi.dev/docs/latest/extensions)      |
| 設定 Skills          | [Skills 文件](https://pi.dev/docs/latest/skills)              |
| Keybindings          | [Keybindings 文件](https://pi.dev/docs/latest/keybindings)    |
| SDK / RPC            | [SDK 文件](https://pi.dev/docs/latest/sdk)                    |
| 加入社群             | [Discord](https://discord.com/invite/3cU7Bz4UPx)              |

---

## 新手 5 分鐘快速上手

```bash
# 1. 安裝
curl -fsSL https://pi.dev/install.sh | sh

# 2. 設定 API key
export ANTHROPIC_API_KEY="sk-ant-..."

# 3. 進入專案
cd ~/my-project

# 4. 啟動
pi

# 5. 開始問問題！
```

---

## 常見問題

**Q：Pi 支援哪些程式語言？**
A：所有語言。Pi 透過 LLM 運作，不限制語言。

**Q：Pi 免費嗎？**
A：Pi 本身是 MIT 開源免費的，但你需要 LLM API key（Anthropic/OpenAI 等），那些要花錢。也可以用 Ollama 跑本地模型，完全免費。

**Q：Pi 沒有 MCP 怎麼辦？**
A：Pi 認為你不需要 MCP——用 CLI 工具 + Skills 就能達成同樣的事。或者安裝 `pi-mcp-adapter` extension。

**Q：Pi 沒有 plan mode？**
A：內建沒有，但你可以口頭要求 Pi 先給計畫，或安裝 [plan-mode extension](https://github.com/earendil-works/pi/tree/main/packages/coding-agent/examples/extensions/plan-mode/)。

**Q：如何切換 model？**
A：按 `Ctrl+L` 開啟選擇器，或 `Ctrl+P` 快速循環。

**Q：Pi 和 OpenCode 哪個好？**
A：看你需求。Pi 更輕量、更可定制，但需要自己設定；OpenCode 開箱即用、功能更全。可以兩個都試。
