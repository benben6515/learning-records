# Pi Setup After 6 Months of Use — Eero Alvar 的 Pi 配置演進

> 整理日期：2026-08-27
> 來源：[Pi Setup After 6 Months of Use](https://www.youtube.com/watch?v=iKwPaB5TUdI)（Eero Alvar，2026-08-25，19:08）
> 前置：上一支 config 影片是 4 個月前，之後幾乎所有東西都換了

---

## 一句話總結

YouTuber Eero Alvar 分享使用 Pi 六個月後的完整配置：留下了 4 個舊 extension（Bash Guard、ask-question、custom header、web tools），新增了 5 個核心 extension——**interactive sub-agents**（tmux pane 內的非同步多 agent 協作）、**browser**（Playwright 頭less瀏覽器）、**dictate**（內建 whisper 語音輸入）、**observational memory**（觀察式三層記憶系統）、**prompt snippets**（可組合的迷你行為指令）——並公開了他的 learning system。

---

## 配置總覽

```
~/.pi/agent/
├── extensions/
│   ├── bash-guard            ← 留任（新增關閉開關）
│   ├── ask-user-question     ← 留任（新增 popup 協調機制）
│   ├── custom-header         ← 留任（不變）
│   ├── web-tools             ← 留任（不變）
│   ├── interactive-subagents ← 新：tmux 非同步 sub-agents
│   ├── browser               ← 新：Playwright headless 瀏覽器
│   ├── dictate               ← 新：whisper 語音轉文字
│   ├── observational-memory  ← 新：三層記憶系統
│   └── prompt-snippets       ← 新：可組合行為指令
├── skills/
│   ├── pdf-reader            ← 留任
│   ├── youtube-transcript    ← 留任
│   ├── web-debug             ← 新：搭配 browser extension
│   └── analyze-session       ← 分析歷史 session 挖重複指令
└── （learning system 隨影片公開）
```

---

## 1. 留任的 Extensions（與上次 config 影片相比）

| Extension          | 狀態                                                     |
| ------------------ | -------------------------------------------------------- |
| Bash Guard         | 只加了一個關閉開關——他每個 session 第一件事就是關掉它      |
| Ask user question  | 功能不變（讓 AI 反問使用者）；新增與其他 popup extension 的協調，避免 UI 互相覆蓋 |
| Custom header      | 不變（大大的 Pi 字樣標頭）                                |
| Web tools          | 不變                                                     |

> 其餘一切全部是新的。

---

## 2. Interactive Sub-Agents（重頭戲）

取代他之前拍的同步式 sub-agents（舊版仍適合整合進 app/產品）。本版本是 **Daniel Grosser 的 interactive sub agents 的 fork**，他主要簡化了 agent 的使用體驗。

### 核心特性

| 特性             | 說明                                                                 |
| ---------------- | -------------------------------------------------------------------- |
| 非同步執行       | tool call 立即返回，sub-agent session 在背景跑                       |
| 需要 tmux        | sub-agents 生成在 multiplexer pane 裡（原版支援多種 multiplexer，他只留 tmux） |
| 雙向互動         | 人 ↔ sub-agent、orchestrator ↔ sub-agent 都可以傳 follow-up 訊息     |
| 自動喚醒         | sub-agent 做完後自動喚醒 orchestrator                                |
| Ask question     | 每個 sub-agent 都有 ask question 工具，可向上提問                    |
| 具名定址         | agents 有名字，訊息用名字指定送達對象；resume 與 steering 統一成一個 tool |
| 自動結束         | agent 停止生成且沒有等待中的問題/sub-agent 時自動 exit 並回傳最後訊息（原版的獨立 done tool 不可靠——太早呼叫或根本沒呼叫） |
| Markdown 定義    | 一個 sub-agent = 一個 markdown 檔；sub-agent 可以再 spawn 自己的 sub-agents |
| 自動排版         | pane 自動平衡排列                                                     |
| 最大可觀察性     | 「實際的 session 就在眼前」——比任何 observability 工具都強            |

### Chain of Command 示範

```
Master ──spawn──▶ Worker ──spawn──▶ Scout
  ▲                                  │
  └──── 問題向上呈報 ◀── 問題向上呈報 ──┘
```

- Scout 有疑問 → 問 Worker → Worker 呈報 Master → 答案原路返回
- 有 pending 問題時 session 不會關閉，Scout 停在那裡等答案
- 他的原則：**「Agents 永遠不該猜實作細節」**——必須有釐清的管道

### 其他細節

- 他簡化了 spawn tool 的 schema（欄位變少，agent 更好操作）
- 示範用 7 個 sub-agents 解 Riemann hypothesis，agent 回：「Claim: the Riemann hypothesis is true. Proof: deferred to a future session.」（喜劇演員）

---

## 3. Browser Extension

| 項目     | 內容                                                         |
| -------- | ------------------------------------------------------------ |
| 引擎     | Playwright 驅動的 headless browser                            |
| 工具數   | 註冊 8 個 tools（佔一定 context）                            |
| 預設狀態 | **停用**——他極簡化 context，要用時下 `browser on` 指令開啟   |
| 用途     | 網頁開發必備：導航、跑 JS、截圖、讀 console、點擊            |

示範：拿一個壞掉的 web app 讓 Pi debug——開網站 → 截圖 → 讀 console → 找到 bug → 修復 → 點擊驗證 → 再截圖確認，全自動。

---

## 4. Dictate Extension

- 他整支影片的口述就是用它打的
- Pi 內建的極簡 **whisper 語音轉文字**流程
- 有獨立影片介紹，此處不展開

---

## 5. Observational Memory（觀察式記憶系統）

他自己實作的 **Maestra observational memory**（已有現成的直接實作 repo，但他想自己做一版——自嘲「最可能的情況是我做得更糟」）。

### 核心概念

1. 訊息歷史切成分塊（chunks）
2. **Observer agents** 把每塊蒸餾成小觀察（observations）——記憶的原子單位
3. Compaction 完全**確定性**（deterministic）：就是觀察清單，不是自由文字摘要
   - 傳統 LLM compaction 會產生「摘要的摘要」複合衰減；觀察不會隨 compaction 循環衰減

### 三層記憶架構

| 層           | 內容                                 | 角色           |
| ------------ | ------------------------------------ | -------------- |
| Working      | 實際訊息歷史（compaction tail）      | 工作記憶       |
| Short-term   | Observations（時間戳記、高密度）     | 短期記憶       |
| Long-term    | 依主題分類的 markdown memory files + index | 長期記憶 |

- 為「可能永遠不結束的 session」設計：observation pool 滿了 → 最舊的觀察由 **consolidator agent** 依主題整併進 markdown 檔
- Compaction block 頂部有：**journey block**（consolidator 維護、嚴格 token 上限，幫 agent 定位 session 脈絡）+ **memory index**（依主題找記憶檔）

### UI 與指令

| 元素             | 說明                                                                |
| ---------------- | ------------------------------------------------------------------- |
| 三個 gauge       | ① 距下一次 observer 生成（每 10,000 tokens 一個 chunk）② 距下一次 consolidation ③ X = 距下一次 compaction |
| 頂部狀態列       | 顯示目前 in-flight 的 agents（observer、consolidator）              |
| `/om`            | 啟用 observational memory                                           |
| `/om status`     | 完整統計 + session 時間軸：每格 ≈10k tokens；最淺色=已整併、灰=已觀察未整併、最深=未觀察；直線=compaction 切點 |

- Compaction 確定性且**瞬間發生**——mid-turn 直接換掉，agent 不用停下來等
- 示範數據：observer 一次產生 14 個 observations；consolidator 一次整併 85 個 observations

---

## 6. Prompt Snippets（行為指令的中間道路）

### 動機：現有機制都不理想

| 機制              | 問題                                                       |
| ----------------- | ---------------------------------------------------------- |
| System prompt / AGENTS.md | 永遠佔 context、不可見（要打開檔案才知道寫了什麼）、行為卻是情境相依的 |
| Skills            | 情境相依但笨重、預設 agent 自己觸發——「我要自己控制 agent」 |

### 解法：極小、單一、獨立的行為指令，可自由組合

- 按 `Alt+S` 開啟 snippets 選單
- `Tab` 瀏覽預覽——即時看到將 prepend/append 什麼
- 選取後 Enter，送出 prompt 時自動附加
- Snippets 就是 markdown 檔，可指定排序

### 他常用的 snippets

- `ask questions`
- `verify, don't assume`
- `orchestrator mode`
- `delegate exploration`

> 觀察：這類指令放在**訊息裡**比放在 system prompt / AGENTS.md 裡更有分量。

### 這些 snippet 怎麼來的

用他的 **analyze-session skill**（幾支 Python 腳本，解析/搜尋 Pi sessions）挖掘自己數個月、跨多個專案**重複寫過無數次的指令**，收斂出這些高頻行為指令。

---

## 7. Skills

| Skill              | 來源       | 功能                                  |
| ------------------ | ---------- | ------------------------------------- |
| PDF reader         | 上次影片   | 讀 PDF                                |
| YouTube transcript | 上次影片   | 抓 YouTube 字幕                       |
| Web debug          | 新         | 教 agent 怎麼用 browser extension 偵錯網頁 |
| Analyze session    | 新（提及） | 解析搜尋歷史 sessions，挖出行為模式   |

> 他的原則：skills 不需要多。

---

## 8. Learning System 公開

- 上一支影片的 learning system **需求量巨大**，隨本次 config 一起釋出
- 可以完整復刻影片中的設定（需搭配其他 extensions），也可以剝開來單獨試用
- 他鼓勵：拿去試、抄想法、改成適合自己工作流的樣子

---

## 值得帶走的思想

| 思想 | 出處 |
| ---- | ---- |
| Agents 永遠不該猜實作細節——要有釐清管道 | Sub-agents 的 ask question |
| Observability 的極致是把實際 session 放在你眼前（tmux panes） | Interactive sub-agents |
| 摘要的摘要會衰減；確定性觀察清單不會 | Observational memory |
| 記憶要分層：working / short-term / long-term，各有明確介面 | Observational memory |
| 行為指令放訊息裡比放 system prompt 更有分量；情境相依的行為不該永久佔 context | Prompt snippets |
| 高頻行為指令可以從自己的歷史 sessions 資料探勘出來 | Analyze-session skill |
| Context 是資產：8 個 browser tools 平時停用，要時再開 | Browser extension |
| 不可靠的 agent 行為（忘記呼叫 done tool）就用機制解決（自動退出條件） | Sub-agents 改進 |

---

## 與本 vault 既有筆記的關係

- Pi 基礎與安裝：[beginner-guide.md](./beginner-guide.md)
- 官方功能與進階操作：[pro-tips.md](./pro-tips.md)
- Pi × Obsidian 工作流（Karpathy 三層架構）：[pi-agent-obsidian-workflow.md](./pi-agent-obsidian-workflow.md)
- 本片是**個人配置實戰**，展示 Pi extension 系統的天花板：sub-agents、記憶系統、語音輸入都能自己長出來，印證 Pi「極簡核心 + 自我擴展」的設計哲學
