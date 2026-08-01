# Glossary — Loop Engineering

本課程的領域語言。每堂課皆遵守此處的譯名與定義。EN 對照附於其後。

| 詞彙 (繁中) | English | 定義 |
|---|---|---|
| **迴圈工程** | loop engineering | 「取代那個自己 prompt agent 的你」——設計一套會自動發現工作、分派、驗證、寫回狀態、決定下一步的系統，讓它去驅動 agent。 |
| **遞迴目標** | recursive goal | loop 的本質：你定義一個目的，agent 用 sub-agent 與外部記憶體反覆迭代，直到完成或交回給人。 |
| **馴具／框架** | harness | 單一 agent、單次 session 的環境設定：工具、context、權限、規則。是「沙盒」。 |
| **迴圈（對比 harness）** | loop (vs harness) | harness ＋ 排程 ＋ 狀態 ＋ 驗證鏈。在時間上反覆編排 harness 的跑。 |
| **工廠模型** | factory model | 「建造軟體的系統」：管線、agent、檢查、交棒。loop engineering ＝ 經營工廠樓層，而非手組每一件。 |
| **六個 Primitives（＋Memory）** | the six primitives (+ memory) | 排程／worktree／skills／MCP connectors／sub-agent（maker-checker）／state（記憶）。loop 的零件詞彙表。 |
| **排程／自動化** | automations / scheduling | loop 的心跳。沒有排程就只是一次性 agent run。形式：`/loop`、cron、GitHub Actions、`/goal`。 |
| **工作樹** | worktree | 隔離的 git checkout，共享歷史但各自有工作目錄。讓多 agent 並行不互踩。 |
| **技能** | skill | 意圖的持久記憶（`SKILL.md`＋選用腳本／參考）。封裝專案慣例、build 指令、「我們不這樣做因為某次事故」。付清 intent debt 的單位。 |
| **連接器（MCP）** | plugins / connectors (MCP) | 讓 loop 能動到真實工具：開 PR、更新 Linear、貼 Slack、查 DB。從「評論員」變「操作員」。 |
| **子代理；製作者／檢查者分工** | sub-agent; maker/checker split | 一個 agent 寫、另一個 agent 驗。**實作者絕不評分自己的作業**——這是結構性原則，不是模型限制。 |
| **狀態／記憶（在磁碟上）** | memory / state (on disk) | 跨 session 的持久脊椎（`STATE.md`、Linear board）。模型每次都從零開始、會忘；狀態必須落在磁碟上。常是 loop 最重要的產物。 |
| **意圖債** | intent debt | 每次session agent 都冷啟動，缺漏的意圖會被「自信的猜測」填滿。skills 是還債方式。 |
| **理解債** | comprehension debt | repo 實際內容與「你真正理解多少」的差距。loop 出貨愈快，此債長愈快——除非你讀它寫了什麼。 |
| **認知棄守** | cognitive surrender | 放任 loop 跑、自己不再有意見的舒適陷阱。用判斷力設計 loop 是解藥；用 loop 逃避思考是加速器。 |
| **編排稅** | orchestration tax | 協調並行 agent 的人力成本（review 頻寬、merge 衝突、context 切換）。worktree 拿掉機械碰撞，**你仍是並行數的天花板**。 |
| **自主等級 L1/L2/L3** | autonomy levels L1/L2/L3 | L1 僅報告 → L2 協助修復 → L3 unattended。分階上線：先 report-only，別太早放手。 |
| **Loop Ready 分數** | Loop Ready score | loop 是否可上線的評分 rubric（`loop-audit`）。 |
| **模式** | patterns | 可複製的生產 loop：daily triage、pr babysitter、ci sweeper、dependency sweeper、changelog drafter、post-merge cleanup、issue triage。各有 cadence、自主等級、token 成本。 |
| **`/goal` vs `/loop`** | /goal vs /loop | `/loop`＝依 cadence 重跑；`/goal`＝跑到某可驗證條件成立為止，且由「另一個」模型檢查是否完成（maker/checker 套用在停止條件上）。 |
