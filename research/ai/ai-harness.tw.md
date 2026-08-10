# AI Harness：含義、範圍與 Harness Engineering

> 研究日期：2026-08-10
> 範圍：研究如何將語言模型轉化為代理程式的軟體，以及相關的術語與工程實務。資料來源僅限第一方文件、規格與原始碼儲存庫。

## 範圍與定義

**AI harness** 並不是一個全業界通用的標準化技術術語。在本次檢視的第一方資料中，不同供應商以此指涉彼此重疊、但層次不同的系統。Anthropic 目前的術語表提供了最清楚的狹義定義：**agentic harness** 是模型周邊的工具、上下文管理與執行環境，包括檔案存取、Shell 執行、權限控管、記憶載入與行動迴圈。Claude 是模型；Claude Code 是 harness。[1]

本報告採用以下工作性區分：

- **代理程式腳手架（agent scaffolding）**：將一次模型呼叫轉化為代理程式執行的執行期層，包括代理迴圈、工具、上下文／狀態處理、權限、護欄，以及終止或預算控制。
- **AI harness**：這些腳手架的總稱；在較廣義的語境中，也包括使代理工作變得可用且可靠的周邊工作流程與環境。
- **Harness engineering**：更廣泛的工程實務，用於設計、觀測、限制、評估並持續改善代理的環境、程式庫、回饋迴圈與運作流程。OpenAI 以較廣義的方式使用此術語；其案例涵蓋程式庫知識、代理可理解性、結構性約束、可觀測性、審查、測試與清理，而不只是模型呼叫迴圈。[7]

這個區分是分析用的框架，並不表示業界已採用完全相同的邊界。因此，在設計文件中可以使用 **AI harness** 作為實用的總稱，但應明確說明所指的層次。

## 研究發現

### 1. 供應商確實使用此術語，但業界沒有統一定義

Anthropic 在術語表中明確定義了「agentic harness」，並另外定義 agentic loop。術語表將 harness 描述為模型周邊的工具、上下文管理與執行環境；迴圈則是反覆取得上下文、採取行動、驗證並重複的循環。[1] [2]

Anthropic 也將「harness」用於動態生成的多代理工作流程：Claude Code 可以建立針對特定任務的 harness，用來啟動與協調子代理。[6] 這比術語表中對單一代理執行期的描述更廣。

OpenAI 則以 **harness engineering** 指稱更廣泛的軟體工程運作模式。其 Codex 案例研究指出，團隊的工作重心轉向設計環境、明確表達意圖與建立回饋迴圈；內容包括程式庫內的知識、代理可理解性、UI 與可觀測性存取、架構不變量、測試、審查與週期性清理。[7]

綜合這些來源，可以確認供應商確實使用此術語，但沒有共同定義或規範性的介面。MCP 確實提供了連接 AI 應用程式與外部上下文、工具的正式開放協定；然而，其規格定義的是 host、client、server、resource、prompt 與 tool，而不是完整的「AI harness」執行期或工程學科。[9] 因此，較安全的結論是：**AI harness 是非標準化術語**，而 MCP 等個別元件可能已被標準化。

### 2. 代理程式腳手架是可執行的核心

Anthropic 的 Agent SDK 概覽表示，該 SDK 提供與 Claude Code 相同的工具、代理迴圈與上下文管理。它列出的內建能力包括工具、hooks、子代理、MCP、權限、工作階段、skills、指令、記憶與 plugins。[3] 其代理迴圈文件描述了可執行的序列：接收提示與上下文、讓模型請求工具、執行工具、將結果回傳給模型、重複以上流程直到不再有工具呼叫，最後回傳包含用量與工作階段資訊的結果。[2]

OpenAI 的 Agents SDK 提供了相近的執行期抽象。Agent 是一個設定了指令、工具，以及可選執行期行為的 LLM；這些行為包括 handoff、護欄與結構化輸出。其 `Runner` 負責管理回合、工具、護欄、handoff 與工作階段；生命週期 hooks 則可觀測代理、模型、工具與 handoff 事件。[4]

這些 API 顯示，以下內容屬於**代理程式腳手架**：

1. 能夠接收工具結果並繼續執行的模型呼叫迴圈。
2. 工具介面與執行環境。
3. 上下文與工作階段的延續性，必要時包括壓縮或可恢復能力。
4. 權限、核准、預算與其他安全控制。
5. 可觀測性與生命週期 hooks。
6. 終止條件與明確的結果狀態。

代理框架、SDK 或 CLI 可以實作其中大部分能力，但產品名稱本身不是定義。一個直接包在 API 外的手寫迴圈也可以是 harness；一個框架則可能只公開 harness 的部分能力。

### 3. 長時間執行的工作會使腳手架變成持久且有狀態的系統

Anthropic 對長時間執行代理的研究指出一個特定失敗模式：每個新的上下文視窗都不會自動擁有前一個工作階段的記憶。其解法是將初始化與增量式開發分離，並為下一個工作階段留下持久化產物。初始化代理會建立環境、`init.sh` 腳本、進度檔案與初始 commit；後續的開發工作階段則以增量方式進行，並記錄狀態。[5]

Anthropic 隨附的第一方 quickstart 儲存庫將此模式具體化。它使用初始化代理、程式代理、作為可測試事實來源的 `feature_list.json`、`claude-progress.txt`、Git 歷史、環境設定腳本，以及沙箱／安全層。[8]

這仍然屬於代理程式腳手架，但已超越記憶體內的迴圈。此時 harness 必須管理持久狀態、復原、增量範圍、驗證，以及跨工作階段的安全執行。關鍵設計原則不是「加入更多提示」，而是留下可檢查的產物，以及供下一次執行使用的乾淨、可驗證狀態。[5]

### 4. 更廣義的 harness engineering 會改造環境，而不只是提示

OpenAI 的 Codex 報告將程式庫描述為代理的系統記錄來源。一份簡短的 `AGENTS.md` 可作為通往結構化文件、計畫、schema 與其他版本化產物的地圖；linter 與 CI 則以機械方式檢查這套知識庫。[7] 報告也描述了如何讓應用程式、日誌、指標與 trace 直接對代理可理解，使代理能夠重現、檢查並驗證自己的工作。

同一份報告將架構與品質規則視為可執行的控制。自訂 linter、結構測試、日誌規則、依賴邊界、審查迴圈與週期性清理，將人類判斷編碼成可以反覆套用於代理生成變更的規則。[7] 這就是廣義的 **harness engineering**：目標是代理執行周邊的完整社會技術控制系統，而不只是呼叫模型的程式碼。

Anthropic 的 harness 設計指南也從不同角度得出相容的結論。它將 harness 稱為模型周邊的軟體腳手架，並將迴圈、工具、上下文管理與護欄列為核心。接著，它討論 harness 如何強制執行 UX、成本與安全邊界，提供可供稽核的型別化行動，並透過 skills 與子代理逐步揭露上下文。[10]

因此，實務上的邊界可以整理如下：

| 層次 | 主要關注 | 常見產物 |
| --- | --- | --- |
| 代理程式腳手架 | 讓模型能執行、採取行動、持續上下文，並安全停止 | 迴圈、工具、工作階段、權限、hooks、預算 |
| Harness engineering | 讓重複性的代理工作可靠、可理解、可測試、可治理且可維護 | 程式庫地圖、計畫、評估、CI、linter、可觀測性、沙箱、審查與清理迴圈 |

兩個層次會重疊。進度檔案或驗證迴圈可能在執行期 harness 內實作，但也可能成為更廣泛工程系統的一部分。

### 5. 編排是 harness 的一種技術，不是完整定義

Anthropic 的動態工作流程文件描述了分類後執行、分散執行後綜合、對抗式驗證、生成後篩選、競賽，以及持續迴圈直到完成等模式。這些工作流程可以選擇模型、在 worktree 中隔離子代理，並在中斷後恢復。[6]

OpenAI 的 SDK 文件同樣區分了兩種方式：manager-style orchestration 由中央代理將專家代理當作工具呼叫；handoff 則是將控制權移交給專家代理。[4] 這些都是有效的 harness 技術，但多代理編排並非必要條件。只要具備工具、狀態、權限與驗證的單一代理迴圈，仍然可以是 harness。

### 6. 驗證是 harness 的一級責任

Anthropic 的代理迴圈文件將工具執行與反覆回饋視為工作階段的核心；其長時間代理研究則指出，明確的瀏覽器端到端測試能提升代理找出程式碼檢查所遺漏錯誤的能力。[2] [5] OpenAI 的報告同樣描述了如何公開 UI、日誌、指標與 trace，讓 Codex 能夠驗證行為，而不只是生成程式碼。[7]

因此，harness 應定義代理如何知道工作已完成。對於會改變外部狀態的任務，「模型產生了回答」是一個很弱的終止條件。測試、型別化結果驗證、瀏覽器檢查、政策檢查、人工作業核准或其他領域特定的驗收訊號，在正確性重要時都應屬於 harness 的一部分。

## 實務含義

1. **在架構文件中說明層次。** 如果指的是迴圈、工具、權限、工作階段與預算，請使用「執行期代理腳手架」。如果指的是程式庫結構、CI、可觀測性、評估、治理與維護，請使用「harness engineering」。只有在先定義的情況下才使用「AI harness」。
2. **從最小可執行 harness 開始。** 實作有邊界的迴圈、刻意維持精簡的工具介面、明確權限、結果 schema，以及可見的終止原因。只有當任務的收益足以抵銷協調成本時，才加入子代理或動態編排。Anthropic 明確警告，動態工作流程可能消耗更多 token，較適合複雜且高價值的任務。[6]
3. **為長時間執行的代理提供持久狀態。** 使用可檢查的進度、任務／功能狀態、commit 或等效的檢查點，以及可重現的設定指令。這能降低新工作階段猜測先前發生什麼事的需要。[5] [8]
4. **讓環境對代理可理解。** 將穩定的專案知識放在程式碼附近，提供通往更深層來源的地圖，公開驗證所需的訊號，並將重要的架構規則編碼成檢查，而不是只依賴文字說明。[7]
5. **將安全視為 harness 的一部分。** 當代理能夠執行程式碼或修改資料時，工具權限、沙箱、核准閘門、型別化行動與隔離不是可有可無的裝飾。MCP 規格本身也強調同意、授權、隱私，以及執行任意工具時應保持謹慎。[9]
6. **不要將互通性與編排混為一談。** MCP 可以標準化工具與上下文的連接方式，但應用程式仍需要自己的迴圈、狀態模型、權限、驗證與運作控制。[9]
7. **隨模型能力提升重新評估腳手架。** Anthropic 指出，為較舊模型加入的 workaround，可能會隨能力變化而成為不必要的負擔。Harness engineering 不只包含增加更多層，也包括刪除已過時的約束。[10]

## 限制與待解問題

- 「此術語非標準化」是有證據範圍的結論：它根據本次檢視的第一方來源得出，並非對所有供應商、標準組織或內部工程詞彙的完整調查。
- 最明確的定義來自 Anthropic 與 OpenAI，因此使用的詞彙反映了兩家公司的產品與工程優先事項。Anthropic 的案例偏重於程式設計、研究與多代理工作流程；OpenAI 的廣義說法則以一次 Codex 產品建置實驗為基礎。[5] [6] [7]
- 供應商文件描述的是預期行為與報告的經驗，而不是對所有 harness 設計的獨立基準測試。這些來源支持相關機制的存在與組成，但不能證明某一種 harness 架構普遍優於其他架構。
- 「Harness」也可能指評估 harness、基準測試執行器、測試 harness 或特定任務的編排程式。本報告聚焦於代理執行期與代理工程的含義；如果主題是評估系統，應另稱為 evaluation harness。
- 仍有一些待解問題：模型與 harness 應如何分工、多少上下文應預先載入而多少應按需探索、如何獨立於模型能力衡量 harness 品質，以及如何在模型升級之間保護與維護長時間狀態。Anthropic 明確將持續調整 harness 假設視為一項進行中的設計問題。[10]

## 參考資料

1. Anthropic，〈Glossary: Agentic harness〉。https://code.claude.com/docs/en/glossary#agentic-harness（存取日期：2026-08-10）。
2. Anthropic，〈How the agent loop works〉。https://code.claude.com/docs/en/agent-sdk/agent-loop（存取日期：2026-08-10）。
3. Anthropic，〈Agent SDK overview〉。https://docs.anthropic.com/en/docs/claude-code/sdk（存取日期：2026-08-10）。
4. OpenAI，〈Agents〉，OpenAI Agents SDK 文件。https://openai.github.io/openai-agents-python/agents/（存取日期：2026-08-10）。
5. Anthropic，〈Effective harnesses for long-running agents〉。https://www.anthropic.com/engineering/effective-harnesses-for-long-running-agents（存取日期：2026-08-10）。
6. Anthropic，〈A harness for every task: dynamic workflows in Claude Code〉。https://claude.com/blog/a-harness-for-every-task-dynamic-workflows-in-claude-code（存取日期：2026-08-10）。
7. OpenAI，〈Harness engineering: leveraging Codex in an agent-first world〉。https://openai.com/index/harness-engineering/（存取日期：2026-08-10）。
8. Anthropic，`claude-quickstarts/autonomous-coding`，第一方原始碼儲存庫。https://github.com/anthropics/claude-quickstarts/tree/main/autonomous-coding（存取日期：2026-08-10）。
9. Model Context Protocol，〈Specification〉。https://modelcontextprotocol.io/specification/2025-06-18（存取日期：2026-08-10）。
10. Anthropic，〈Agent Harness Design: 3 Patterns for Harnessing Claude's Intelligence〉。https://claude.com/blog/harnessing-claudes-intelligence（存取日期：2026-08-10）。
