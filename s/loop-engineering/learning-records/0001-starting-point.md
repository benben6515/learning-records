# 主題確立與起點（含一次主題誤判的修正）

**Status:** active

學習者要學的是 **Cobus Greyling 的 Loop Engineering**（https://github.com/cobusgreyling/loop-engineering）——設計用來驅動 AI coding agent 的迴圈系統，**不是**程式裡的迴圈。

**一次高價值的修正（記錄以免重犯）：** 首次互動時把「loop engineering」誤判為程式迴圈（loop invariant 那套），並錯誤地建了一整批內容（MISSION/lesson/reference/glossary 全錯主題）。學習者導正後已全數刪除、整批重做。教訓：對「loop」「harness」「agent」這類多義詞，**先確認具體所指再動手**。已寫進 NOTES.md。

**任務範圍（pin 在 MISSION.md）：** 成果＝**先建立完整心智模型**（知識先行、通用範例、不綁 repo）。順序：典範轉移 → 六 primitives → 讓 loop 可靠的兩根支柱（maker/checker、state on disk）＋ skills → 自主等級 → 風險 → 生產模式。動手 scaffold 與採用評估是之後的階段，現在 out of scope。

**起點（學習者現況）：**
- 重度 AI agent 使用者（opencode、skills、AGENTS.md、sub-agent），目前是「手動逐句 prompt」的使用者——正好是 loop engineering 要「取代」的那個角色，動機強。
- 熟悉 prompting、skills/AGENTS.md；半熟 cron/MCP；陌生：loop 作為 recursive goal、harness vs loop、maker/checker 結構原則、state-on-disk、L1/L2/L3、三種 debt。

**已建立的基礎選擇（影響後續 session）：**
- 正本來源：Cobus essay（起源）、Addy Osmani 長文（最完整好讀）、repo concepts.md/primitives.md（精確定義）。全收進 RESOURCES.md。
- 語言偏好：**全程繁中**（2026-07-31 確認）；lessons-tw（繁中主）／lessons（英）雙軌。
- 課程 arc 定為 8 堂（見 lessons-tw/0000-table-of-contents.html）。

**已交付：** workspace 重做完成——MISSION/NOTES/RESOURCES/GLOSSARY/index/目錄（繁中＋英）＋第 01 課〈Loop Engineering 是什麼〉（繁中＋英）＋基礎小抄（繁中＋英）。第 02 課起按 ZPD 逐堂生成。

**下一課方向（第 02 課）：** 六個 primitives（＋Memory）逐一展開，工具中立（必要時附 Claude Code／Codex／Grok／opencode 對照）。先建立詞彙表，再於第 03～05 課深入支柱與 skills。
