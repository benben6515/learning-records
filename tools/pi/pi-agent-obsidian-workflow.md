# Pi Agent × Obsidian — 第二大腦工作流筆記

> 來源：YouTube 影片 + Pi 官方文件 (pi.dev) 補充
>
> - Pi 介紹影片：<https://www.youtube.com/watch?v=OMFIPv8a4qA>
> - Pi × Obsidian × Graphifi 整合影片：<https://www.youtube.com/watch?v=JnQcPzjC6Vo>
> - 官網：<https://pi.dev> | 文件：<https://pi.dev/docs> | 套件：<https://pi.dev/packages>
>   整理日期：2026-07-15

## 一句話總結

Pi 是一個極簡主義的終端 coding agent（由 Mario Zechner / BadLogic 開發），核心理念是「適應你的工作流，而不是要你適應它」。透過 Obsidian CLI + Pi 的 Obsidian skill + Graphifi 知識圖譜，可以把 Obsidian vault 變成 AI agent 的第二大腦——讓 agent 能搜尋筆記、理解連結結構、甚至用知識圖譜大幅降低 token 消耗。

---

## Karpathy 的三層架構（影片的核心框架）

Andrej Karpathy 提出的 LLM × 知識庫架構，是整個工作流的理論基礎：

| 層級 | 動作                                | 對應工具                           |
| ---- | ----------------------------------- | ---------------------------------- |
| 1    | 記筆記（Taking notes）              | Obsidian / 任何 markdown 編輯器    |
| 2    | 有地方讀（A place to read them）    | Obsidian vault = 你的第二大腦      |
| 3    | 持續問答（Q&A on an ongoing basis） | Pi agent + Obsidian CLI + Graphifi |

關鍵洞察：**很多 agent 沒有一個好的地方存放資訊**。Chat history 不等於記憶——它混雜了 lessons learned、暫時性對話、工具輸出。把知識寫成 MD 檔存到一個中央位置（就像把 code 存進 Git repo），才是真正的知識系統。

---

## Pi Agent 是什麼？

### 基本資料

| 項目     | 內容                                                                                                              |
| -------- | ----------------------------------------------------------------------------------------------------------------- |
| 名稱     | Pi（pi.dev，aka "shitty coding agent.ai"）                                                                        |
| 開發者   | Mario Zechner（BadLogic）— 開源愛好者，知名遊戲開發函式庫作者                                                     |
| 公司     | Earendil Inc.                                                                                                     |
| 授權     | MIT License                                                                                                       |
| 語言     | TypeScript / JavaScript                                                                                           |
| 安裝     | `npm install -g --ignore-scripts @earendil-works/pi-coding-agent` 或 `curl -fsSL https://pi.dev/install.sh \| sh` |
| npm 套件 | `@earendil-works/pi-coding-agent`                                                                                 |
| 套件生態 | 5,299+ 個 Pi packages（截至 2026-07）                                                                             |

來源：[pi.dev](https://pi.dev)、[Pi Documentation](https://pi.dev/docs)

### 核心哲學：極簡 + 可擴展

Pi 的設計理念跟 Claude Code、OpenCode 等「太空船」型 agent 完全相反：

**Pi 刻意不內建的東西：**

| 功能                           | Pi 的態度                     | 其他 agent                      |
| ------------------------------ | ----------------------------- | ------------------------------- |
| MCP（Model Context Protocol）  | ❌ 不內建                     | Claude Code, OpenCode 內建      |
| Sub-agents                     | ❌ 不內建（用 tmux 或裝擴充） | 多數 agent 內建                 |
| Plan mode                      | ❌ 不內建                     | Claude Code 內建                |
| Background bash                | ❌ 不內建                     | OpenCode 內建                   |
| 權限彈窗（Permission gates）   | ❌ 不內建                     | 多數 agent 內建                 |
| Session compaction（自動摘要） | ✅ 有，但可自訂               | OpenCode 的 compaction 常被批評 |

**Pi 內建的東西：**

| 功能             | 說明                                                                                                                               |
| ---------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| Skills           | 相容 Agent Skills 標準，可直接用 Claude Code / OpenCode / Codex 的 skills                                                          |
| Extensions       | TypeScript 模組，可註冊自訂工具、命令、快捷鍵、事件                                                                                |
| Prompt Templates | Markdown 檔，用 `/name` 展開成可重複使用的 prompt                                                                                  |
| Themes           | 自訂 UI 配色                                                                                                                       |
| Pi Packages      | 把 extensions + skills + templates 打包，透過 npm 或 git 分享                                                                      |
| 15+ Providers    | Anthropic, OpenAI, Google, Azure, Bedrock, Mistral, Groq, Cerebras, xAI, HuggingFace, Kimi, MiniMax, NVIDIA, OpenRouter, Ollama 等 |
| 四種模式         | Interactive（TUI）、Print/JSON（腳本用）、RPC、SDK                                                                                 |
| 樹狀 Session     | 所有對話分支存在一棵樹裡，可 `/tree` 導航、fork、回溯                                                                              |
| 分享             | `/export` 匯出 HTML、`/share` 上傳 GitHub gist                                                                                     |

### Pi 的四種使用模式

| 模式        | 指令                                | 用途                 |
| ----------- | ----------------------------------- | -------------------- |
| Interactive | `pi`                                | 完整 TUI 互動體驗    |
| Print/JSON  | `pi -p "query"` 或 `pi --mode json` | 腳本自動化、管線整合 |
| RPC         | JSON over stdin/stdout              | 非 Node 整合         |
| SDK         | 嵌入你的應用                        | 程式化呼叫           |

### 重要操作

| 操作                  | 指令 / 快捷鍵        | 說明                                          |
| --------------------- | -------------------- | --------------------------------------------- |
| 切換 model            | `/model` 或 `Ctrl+L` | 單次切換                                      |
| 循環切換最愛 model    | `Ctrl+P`             | 快速切換                                      |
| 查看所有 model        | `pi list models`     | 列出可用模型                                  |
| 導航 session 樹       | `/tree`              | 視覺化所有分支                                |
| 匯出 session          | `/export`            | HTML 格式                                     |
| 分享 session          | `/share`             | GitHub gist                                   |
| 重載設定              | `/reload`            | 修改 extension/skill 後重新載入               |
| 發送 steering message | `Enter`              | 在 agent 工作中插入訊息（下一個 tool 後送達） |
| 發送 follow-up        | `Alt+Enter`          | 等 agent 完成後送達                           |
| 編輯 prompt           | `Ctrl+G`             | 把 prompt 送到外部編輯器                      |
| 執行 ad-hoc bash      | `!`                  | 在對話中直接跑 bash                           |
| 離開                  | `Ctrl+D`             | 回到 CLI（不存 session）                      |
| 恢復 session          | `pi -r`              | 回到上次離開的點                              |
| 無記憶模式            | `pi --no-session`    | 不保留任何 session                            |
| 標記檔案              | `@file`              | 把檔案加入 context（類似 Cursor）             |
| Inline 查詢           | `pi -p "query"`      | 一次性查詢，查完就走                          |

### 設定檔位置

| 檔案/目錄                         | 用途                                                      |
| --------------------------------- | --------------------------------------------------------- |
| `~/.pi/agent/`                    | 全域 agent 設定（AGENTS.md, skills/, extensions/）        |
| `~/.pi/agent/agent_settings.json` | 主要設定檔                                                |
| `~/.pi/agent/settings.json`       | settings（skills 路徑等）                                 |
| `.pi/settings.json`               | 專案層級設定                                              |
| `.pi/extensions/`                 | 專案層級 extensions                                       |
| `.pi/skills/`                     | 專案層級 skills                                           |
| `AGENTS.md`                       | 專案指令（啟動時從 `~/.pi/agent/`、父目錄、當前目錄載入） |
| `SYSTEM.md`                       | 取代或附加到預設 system prompt                            |

### Skills（技能系統）

Pi 實作了 **Agent Skills 標準**，這表示：

- 跟 Claude Code、OpenAI Codex 的 skills **完全相容**
- 可以直接指向其他 agent 的 skill 目錄使用
- Progressive disclosure：只有描述常駐 context，完整指令按需載入（省 token）

設定跨 harness 共用 skills：

```json
// ~/.pi/agent/settings.json
{
  "skills": ["~/.claude/skills", "~/.codex/skills"]
}
```

Skill 結構：

```
my-skill/
├── SKILL.md              # 必須：frontmatter + 指令
├── scripts/              # 輔助腳本
├── references/           # 按需載入的詳細文件
└── assets/               # 範本、設定等
```

用 `/skill:name` 手動觸發 skill。

### Extensions（擴充系統）

Extensions 是 TypeScript 模組，能力遠比 Skills 強大：

- 註冊自訂工具（LLM 可呼叫）
- 註冊命令、快捷鍵
- 訂閱生命週期事件（startup, session, model, tool 等）
- 自訂 TUI 元件（dialog, widget, status bar, overlay）
- 實作 RAG、長期記憶、動態 context 注入
- 自訂 compaction 策略
- 註冊自訂 provider

Pi 可以自己幫你寫 extension——你只需開口要求，Pi 會修改自己的程式碼，然後 `/reload` 即可。

### Pi Packages（套件系統）

| 項目 | 說明                                               |
| ---- | -------------------------------------------------- |
| 安裝 | `pi install npm:<package-name>`                    |
| 來源 | npm registry 或 git repo                           |
| 內容 | 可包含 extension + skill + prompt template + theme |
| 分享 | 打包成 npm 套件或 git repo 發布                    |
| 數量 | 5,299+ 個（截至 2026-07）                          |

熱門套件（影片提及）：

| 套件                     | 功能                                      |
| ------------------------ | ----------------------------------------- |
| `pi-obsidian`            | Obsidian CLI 的 skill 封裝                |
| Graphifi (pipex install) | 知識圖譜，token 消耗降低最多 70×          |
| `@patimweb/pi-mindplace` | Graphifi 的 Pi 版本（Graphifi for notes） |
| `pi-subagents`           | 加入 sub-agent 功能                       |
| `pi-web-access`          | 網頁存取                                  |
| `pi-mcp-adapter`         | MCP 整合                                  |
| babysitter               | 降低幻覺（但會變慢）                      |

---

## Obsidian CLI — 讓 Obsidian 變成可腳本化

### 安裝與設定

Obsidian 在近期版本（2025 後）加入了官方 CLI：

1. 更新 Obsidian 到最新版
2. Settings → 找到「Command Line Interface」啟用按鈕
3. 如果終端找不到 `obsidian` 命令，CLI 的執行檔叫 `obsidian-cli`，藏在 Obsidian app 路徑下
4. Symlink 到 PATH：`ln -s /path/to/Obsidian.app/Contents/Resources/obsidian-cli ~/.local/bin/obsidian-cli`
5. **確保 Obsidian app 在執行中**，CLI 才能操作 vault

### 為什麼 CLI 比 grep/ripgrep 更好？

| 方式              | 結果                         | 問題                                     |
| ----------------- | ---------------------------- | ---------------------------------------- |
| grep / ripgrep    | 原始文字匹配                 | 沒有結構、沒有排名、不理解 Obsidian 語意 |
| Obsidian CLI 搜尋 | 依標題、相關性排序的筆記列表 | agent 可以「挑筆記」而不是「挑行」       |

Obsidian CLI 搜尋理解的東西：

- Tags（標籤）
- Vault 內的路徑
- Frontmatter 欄位（YAML metadata）
- Wiki links 和 backlinks（雙向連結）
- Obsidian 的筆記語意結構

### Obsidian CLI 主要命令

| 命令          | 功能                                                                                  |
| ------------- | ------------------------------------------------------------------------------------- |
| 建立筆記      | `obsidian-cli new "title"` + 參數                                                     |
| 讀取筆記      | `obsidian-cli read "note-name"`                                                       |
| 附加內容      | `obsidian-cli append "note-name" --text "..."`（自動轉 markdown，含 to-do list 語法） |
| 搜尋          | `obsidian-cli search "keyword"`（回傳標題 + 相關匹配）                                |
| 查看          | `obsidian-cli view "note-name"` 或在 Obsidian 中開啟                                  |
| 每日筆記      | `obsidian-cli daily`                                                                  |
| 任務          | `obsidian-cli tasks`（可過濾 done/to-do/檔案）                                        |
| 連結/反向連結 | `obsidian-cli links "note-name"` / `backlinks "note-name"`                            |
| 隨機筆記      | `obsidian-cli random`（可用於每日複習舊筆記）                                         |
| 截圖          | `obsidian-cli screenshot`（拍下 Obsidian UI，含分頁、選單狀態——給 agent 看 UI 用）    |

### 注意事項

- CLI 的 UX 不是為人類設計的（沒有 fuzzy list、沒有自動補全），需要提供完整名稱或路徑
- 但這對 agent 來說反而無所謂——agent 本來就給精確路徑

---

## Pi × Obsidian 整合工作流

### 架構圖

```
┌─────────────────────────────────────────────────────┐
│                   你的 Obsidian Vault                 │
│         (Markdown 檔 = 你的第二大腦)                   │
│                                                       │
│  ┌─────────┐  ┌──────────┐  ┌─────────────────────┐ │
│  │  筆記   │  │  Tags    │  │  Wiki Links /       │ │
│  │         │  │Frontmatter│  │  Backlinks (圖譜)   │ │
│  └────┬────┘  └────┬─────┘  └────────┬────────────┘ │
│       │            │                  │               │
└───────┼────────────┼──────────────────┼──────────────┘
        │            │                  │
        ▼            ▼                  ▼
┌─────────────────────────────────────────────────────┐
│              Obsidian CLI (obsidian-cli)              │
│     搜尋 / 讀取 / 建立 / 截圖 / 連結 / 任務            │
└───────────────────────┬─────────────────────────────┘
                        │
                        ▼
┌─────────────────────────────────────────────────────┐
│                   Pi Agent (TUI)                     │
│                                                      │
│  ┌──────────────┐  ┌────────────┐  ┌─────────────┐ │
│  │ pi-obsidian  │  │ Graphifi   │  │ 其他 skills │ │
│  │   (skill)    │  │ (知識圖譜)  │  │             │ │
│  └──────────────┘  └────────────┘  └─────────────┘ │
│                                                      │
│  → 搜尋 vault    → Q&A on 知識庫    → 自動寫筆記     │
│  → 理解連結      → 降低 token      → 截圖 debug     │
└─────────────────────────────────────────────────────┘
```

### 安裝步驟

```bash
# 1. 安裝 Pi
npm install -g --ignore-scripts @earendil-works/pi-coding-agent
# 或
curl -fsSL https://pi.dev/install.sh | sh

# 2. 設定 provider（以 Anthropic 為例）
export ANTHROPIC_API_KEY="sk-ant-..."

# 3. 安裝 Obsidian CLI skill for Pi
pi install pi-obsidian

# 4. （可選）安裝 Graphifi 知識圖譜
pipex install graphify --yes    # Graphifi 本體
pi install @patimweb/pi-mindplace  # Pi 專用的 Graphifi wrapper

# 5. 啟動 Pi
pi
```

### Karpathy 三層 × 實際工具對應

| Karpathy 層級     | 做什麼           | 工具                                                    |
| ----------------- | ---------------- | ------------------------------------------------------- |
| Layer 1: 記筆記   | 寫筆記、整理知識 | Obsidian（GUI）/ Neovim（terminal）/ Pi 幫你寫          |
| Layer 2: 有地方讀 | 儲存 + 結構化    | Obsidian vault（Markdown + tags + links + frontmatter） |
| Layer 3: 持續問答 | 查詢知識庫       | Pi agent → Obsidian CLI（搜尋）→ Graphifi（圖譜查詢）   |

### 實際使用場景

**場景 1：讓 Pi 搜尋你的 vault**

```
# 在 Pi 裡直接問
> 我關於 Kubernetes 的筆記有哪些？
# Pi 透過 Obsidian CLI 搜尋，回傳標題列表 + 相關筆記
```

**場景 2：讓 Pi 幫你寫筆記**

```
> 把這段研究總結寫成一則筆記存到 research/ 目錄
# Pi 透過 Obsidian CLI 建立新筆記，自動寫入 markdown
```

**場景 3：Graphifi 知識圖譜查詢**

```bash
# 建構圖譜（分析整個 vault）
pi  # 然後要求：build the graph
# Graphifi 會用 tree-sitter 解析所有筆記，建立知識圖譜
# 產出：report, JSON, wiki index, graph HTML

# 查詢
> explain Kubernetes
# 圖譜推理層會找出所有相關連結 + context

> everything I know about Kubernetes
# 回傳所有相關筆記，Pi 編譯成結構化回答 + 引用來源
```

**場景 4：自動化腳本**

```bash
# 晨間自動化腳本範例
#!/bin/bash
# 1. 開啟每日筆記
obsidian-cli daily
# 2. 加入待辦事項
obsidian-cli append "$(date +%Y-%m-%d)" --text "- [ ] 檢查 notes inbox (PARA method)"
# 3. 用 Pi 查詢未完成任務
pi -p "列出我 vault 裡所有未完成的任務"
# 4. 隨機複習一則舊筆記
obsidian-cli random
```

**場景 5：截圖 debug**

```bash
# 讓 Pi 看到 Obsidian 的 UI 狀態
> obsidian-cli screenshot
# Pi 可以看到分頁、選單、面板狀態
# 用於 debug plugin 或修正 workflow
```

---

## Graphifi — 知識圖譜降低 Token 消耗

### 這是什麼？

Graphifi 原本是為 code repo 設計的知識圖譜工具，用 tree-sitter 解析程式碼結構。影片作者突發奇想把它跑在 Obsidian notes vault 上——結果出奇地好用。

### 工作原理

1. 用 tree-sitter 解析所有筆記
2. 建構知識圖譜（節點 = 筆記，邊 = 連結/語意相似）
3. 產出索引：report（分析報告）、JSON、wiki index
4. 查詢時走圖譜而非掃描全文

### 產出物

| 檔案       | 內容                                                                         |
| ---------- | ---------------------------------------------------------------------------- |
| Report     | 「神筆記」分析（最多邊/最連結的筆記）、意外連結發現、tag 分析、cohesion 計算 |
| JSON       | 結構化圖譜資料                                                               |
| Wiki Index | 知識庫索引                                                                   |
| Graph HTML | 視覺化圖譜（很漂亮但看不太懂）                                               |

### Token 節省效果

| 場景                    | 原本 | Graphifi 後    | 改善           |
| ----------------------- | ---- | -------------- | -------------- |
| Code repo（設計目標）   | 基準 | 最多 70× 降低  | 70×            |
| Notes vault（影片實測） | 基準 | 有降低但非 70× | 「你自行判斷」 |

注意：Graphifi 原本設計給相對小的 code repo，跑在整個 notes vault 上可能超過預期大小。影片中跑了 5 分鐘才完成整個 vault。

### Graphifi 安裝支援的 IDE / Agent

| 平台              | 原生支援 | Pi 版本                        |
| ----------------- | -------- | ------------------------------ |
| Claude            | ✅       | ❌                             |
| Cursor            | ✅       | ❌                             |
| Codex             | ✅       | ❌                             |
| OpenCode          | ✅       | ❌                             |
| Aider             | ✅       | ❌                             |
| Copilot / VS Code | ✅       | ❌                             |
| Clohermes         | ✅       | ❌                             |
| Kiro (AWS)        | ✅       | ❌                             |
| **Pi**            | ❌       | ✅（`@patimweb/pi-mindplace`） |

---

## 為什麼選 Obsidian 而不是 AI 筆記工具？

影片作者的觀點（也是為什麼這個工作流有價值）：

| AI 筆記工具（Notion AI 等）      | Obsidian + Pi                                 |
| -------------------------------- | --------------------------------------------- |
| 你的資料鎖在訂閱制裡             | Markdown = 你的檔案                           |
| AI workspace 只存在他們的伺服器  | 本地檔案，可 Git 版控                         |
| AI memories/graph 只在訂閱期有效 | 「如果 Obsidian 明天消失，筆記還在」          |
| 強迫你接受 agent 的世界觀        | Obsidian 不強迫任何世界觀                     |
| 不能用 Neovim 編輯               | Markdown = portable, diffable, 可用任何編輯器 |

核心論點：**Markdown 很無聊，但無聊會贏。** 無聊 = 可攜 = 可 diff = 可 Git = 可 Neovim。

### 但要記住

> This does not make Obsidian a magical second brain that thinks for you. You can't outsource thinking yet. If you don't compile notes and read them, this isn't knowledge.

圖譜再大，如果你不讀筆記，這些都只是花更多 token 的方式而已。

---

## 適合誰 / 不適合誰

### 適合

- 已經在用 Obsidian 的人，想讓 agent 存取你的 vault
- 喜歡終端工作流（Neovim, tmux, CLI）的開發者
- 覺得 Claude Code / OpenCode 太肥、太多功能的人
- 想要 agent 能理解筆記結構（tags, links, frontmatter）而非只 grep 文字
- 重視資料可攜性和自主權的人
- 已經有跨 harness skills 想共用的人（Pi 相容 Agent Skills 標準）

### 不適合

- 想要開箱即用、不喜歡設定的人（Obsidian CLI 的 UX 對人類不友善）
- 需要 sub-agents / plan mode 等功能的人（Pi 不內建，要自己裝擴充）
- 不喜歡終端的人（Pi 純 TUI）
- 期望 AI 幫你思考的人（工具再強，不讀筆記 = 沒用）

---

## 個人對照（MASTER 的情境）

| 面向           | Pi + Obsidian               | 目前 Hermes + learning-records | Claude Code / OpenCode |
| -------------- | --------------------------- | ------------------------------ | ---------------------- |
| 筆記儲存       | Obsidian vault (Markdown)   | learning-records/ (Markdown)   | 各自的 skills          |
| Agent 存取筆記 | Obsidian CLI + Graphifi     | read_file / search_files       | grep / 內建搜尋        |
| 知識圖譜       | Graphifi（tree-sitter）     | 無                             | 無                     |
| Token 效率     | Graphifi 降低消耗           | search_files 已經不錯          | compaction 有問題      |
| 可攜性         | Markdown + Git              | Markdown + Git                 | Markdown + Git         |
| 學習曲線       | 中等（CLI + Graphifi 設定） | 低（Hermes 已設定好）          | 低                     |
| Skills 共用    | 相容 Agent Skills 標準      | Hermes 自己的 skill 格式       | 各自格式               |

**我的判斷：** MASTER 目前的 Hermes 工作流已經很成熟（learning-records vault + skills 系統 + search_files），Obsidian + Pi 的價值主要在 Graphifi 知識圖譜和 Obsidian 的 link 結構。如果 MASTER 之後想嘗試 Pi 作為 coding agent（影片作者認為它「too early to say, but Pi is a keeper」），Obsidian 整合是自然延伸。但如果只是為了 Obsidian 整合就切換，ROI 不高——Hermes 已經能做大部分類似的事。

---

## 實用資源

| 資源                           | 連結                                                              |
| ------------------------------ | ----------------------------------------------------------------- |
| Pi 官網                        | <https://pi.dev>                                                  |
| Pi 文件                        | <https://pi.dev/docs>                                             |
| Pi 套件目錄                    | <https://pi.dev/packages>                                         |
| Pi GitHub                      | <https://github.com/earendil-works/pi-coding-agent>（從官網連結） |
| Obsidian 官網                  | <https://obsidian.md>                                             |
| Graphifi                       | `pipex install graphify`                                          |
| Pi Mindplace (Graphifi for Pi) | `pi install @patimweb/pi-mindplace`                               |
| Karpathy LLM × KB 原文         | 影片中引用，搜尋 "Karpathy LLM knowledge base second brain"       |
| Agent Skills 標準              | <https://pi.dev/docs/latest/skills>（Pi 實作的規範）              |
| TV (fuzzy TUI for notes)       | 影片中推薦的終端筆記瀏覽工具                                      |

## 相關筆記

- learning-records vault 本身就是這套「第二大腦」概念的實踐
