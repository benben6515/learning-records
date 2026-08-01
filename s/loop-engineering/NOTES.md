# Notes — Loop Engineering

教學筆記與學習者偏好。

## 語言偏好
- **全程使用繁體中文**（2026-07-31 明確要求）。溝通、lesson、reference 皆以繁中為主；英文版作為鏡像並存。

## 主題確認（重要修正，2026-07-31）
- 一開始誤把「loop engineering」當成**程式迴圈**（loop invariant 那套），並錯誤地建了一整批內容。學習者導正：指的是 **Cobus Greyling 的 Loop Engineering**（https://github.com/cobusgreyling/loop-engineering）——**設計用來驅動 AI coding agent 的迴圈系統**。錯誤內容已刪除、整批重做。
- **教訓**：對「loop」這類多義詞，務必先確認具體所指，再動手。已記入此筆記避免重犯。

## 起點與任務
- **重度 AI agent 使用者**：日常用 opencode、skills、AGENTS.md、sub-agent。目前是「手動逐句 prompt」的使用者。
- 成果選擇：**先建立完整心智模型**（概念＋6 primitives＋風險＋自主等級），**通用範例**、不綁 repo。知識先行，動手與採用評估之後再說。
- 動機：理解這個新 paradigm，把自己從「prompter」升級成「loop designer」。

## ZPD 觀察
- 熟悉：AI coding agent、prompting、skills/AGENTS.md、sub-agent、git worktree（可能用過）。
- 半熟：cron／排程、MCP（聽過但未必深）。
- 陌生（待教）：loop 作為「recursive goal」的觀念、harness vs loop 的區分、maker/checker 作為結構性原則、state-on-disk 的必要性、L1/L2/L3 分階、三種 debt。
- 第一課切入點：從他「正在做的事」（手動 prompt）對比「loop 要他變成的事」（設計系統），用 Cherny／Steinberger 的名言當 hook。

## 資源備註（已讀過的正本）
- **Cobus Greyling essay**（https://cobusgreyling.substack.com/p/loop-engineering）：起源文。recursive goal、harness vs loop 三層、6 parts、Grok 對照、early/economics 警告。
- **Addy Osmani 長文**（https://addyosmani.com/blog/loop-engineering/）：最完整好讀的解釋。五pieces＋memory、Codex/Claude Code 對照表、comprehension debt、cognitive surrender、「Build the loop. Stay the engineer.」
- **repo docs/concepts.md**：詞彙表（intent/comprehension debt、cognitive surrender、orchestration tax、harness vs loop 公式）。
- **repo docs/primitives.md**：6 primitives 詳釋＋「最小可行 loop = 排程＋一個 triage skill＋state 檔」。
