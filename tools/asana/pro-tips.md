# Asana 進階用法（Pro Tips）

> 整理日期：2026-09-19
> 適用對象：已會建專案／任務／指派，想讓 Asana 自動化、結構化的使用者
> 前置閱讀：[beginner-guide.md](./beginner-guide.md)
> 官方文件：[Workflow 課程](https://academy.asana.com/path/creating-basic-workflows-course-series) ｜ [定價比較](https://asana.com/pricing)

> 💰 = 需 Starter 方案（舊名 Premium）　💰💰 = 需 Advanced 方案（舊名 Business）
> Asana 已把方案改名：Basic→**Personal**、Premium→**Starter**、Business→**Advanced**，舊文章對照時注意。

---

## 目錄

1. [心法：三種專案藍圖](#1-心法三種專案藍圖)
2. [Custom Fields：讓任務帶結構化資料](#2-custom-fields讓任務帶結構化資料)
3. [Views：List / Board / Timeline / Calendar / Dashboard](#3-viewslist--board--timeline--calendar--dashboard)
4. [Task Dependencies：任務相依](#4-task-dependencies任務相依-💰)
5. [Rules：自動化例行事務](#5-rules自動化例行事務)
6. [Forms：需求入口](#6-forms需求入口-💰)
7. [Templates 與 Bundles](#7-templates-與-bundles)
8. [Multi-homing：一個 task 出現在多個專案](#8-multi-homing一個-task-出現在多個專案)
9. [Portfolios、Workload、Goals](#9-portfoliosworkloadgoals-💰💰)
10. [Approvals 與 Proofing](#10-approvals-與-proofing-💰💰)
11. [報告與追蹤](#11-報告與追蹤)
12. [軟體開發工作流](#12-軟體開發工作流)
13. [整合：Slack / Gmail / GitHub](#13-整合slack--gmail--github)
14. [My Tasks 進階整理法](#14-my-tasks-進階整理法)
15. [進階快捷鍵](#15-進階快捷鍵)
16. [團隊最佳實務](#16-團隊最佳實務)

---

## 1. 心法：三種專案藍圖

官方 Academy 提出的核心思考：**先辨認工作型態，再選專案藍圖**。

| 藍圖 | 適用 | 結構特徵 | 例子 |
|---|---|---|---|
| **Deadline-bound**（有截止日的專案） | 從開始到結束、有明確交付日 | Section = 階段，task 有依序日期 | 產品發佈、官網改版 |
| **Ongoing process**（持續流程） | 同樣的流程不斷重複 | Section = 流程狀態（待處理→進行中→完成），配合 Form + Rules | 客服工單、內容請求 |
| **Reference**（參考資料庫） | 收集與整理資訊，不太會「完成」 | Section = 主題分類 | 競品分析、會議紀錄庫 |

90% 的專案混亂都來自：**用 deadline 專案的結構去跑 ongoing 流程**（或反過來）。建專案前先問自己：這個工作會結束嗎？

---

## 2. Custom Fields：讓任務帶結構化資料

Custom fields 是把欄位加到 task 上（所有方案都有，但 💰 起才有管理儀表板與跨專案標準化）。

常用欄位類型：

- **Single / Multi-select**：`優先級: P0/P1/P2`、`狀態: 待審/通過/退回`
- **Number**：`預估工時`、`story points`、`預算`
- **Text**：`Jira ticket ID`
- **Date**：`上市日`
- **People**：`Reviewer`
- 💰💰 **Formula**：自動計算，如 `預估工時 × 時薪 = 成本`

### 用法心法

- 用 custom field 取代「把資訊寫在標題裡」——`[P0] 修登入 bug` ❌ → 標題乾淨 + `優先級=P0` ✅
- 欄位可以 **Group by / Sort / Filter**，這是 dashboard 和報告的資料基礎
- 💰💰 可 **Lock** 欄位設定，防止成員亂改全公司統一欄位的定義
- **先在全組統一定義，再開始用**——兩個專案的「優先級」定義不同是混亂之源

---

## 3. Views：List / Board / Timeline / Calendar / Dashboard

同一批 task 的不同切面，右上角切換：

| View | 最適合 | 方案 |
|---|---|---|
| **List** | 詳細資訊、批次編輯 | 全部 |
| **Board** | Kanban 流程（欄 = section，拖曳推進） | 全部 |
| **Calendar** | 看負載分布、避開日期撞期 | 全部 |
| **Timeline**（甘特） | 排程、依賴、調整順序 | 💰 |
| **Dashboard** | 專案內圖表：進度、分佈、燃盜 | 全部（專案內） |

- Timeline 上拖 task 直接改日期，調整依賴後 💰 可看 **Critical path** 找出影響交付日的關鍵鏈
- 專案內的 sort / filter / group **不會自動儲存**——調好之後要記得存成預設檢視

---

## 4. Task Dependencies：任務相依 💰

標記「這個 task 要等那個 task」：

- 在 task 詳情 **Add dependency**：設 blocking（擋住別人）或 waiting on（被擋）
- 前面的 task 完成時，後面的 task 自動通知負責人「可以開工了」
- Timeline view 上會畫出箭頭，改前面日期會連動後面

軟體開發典型應用：`合併 PR` → `部署 staging` → `QA 驗證` → `部署 production`，一條依賴鏈，任何一環延期全鏈可視。

---

## 5. Rules：自動化例行事務

**Rules = 觸發條件 + 動作**。免費版只有基本規則，💰 起無限使用，💰💰 可用自訂 rule builder（含條件邏輯）。

實用例子：

- Form 收到新回覆 → 自動 assign 給值班 PM + 塞進「待分類」section
- Task 被移到「Done」→ 自動把狀態欄位改成 `完成` + 通知 PM
- Task 設了 due date 今天 → 自動把負責人加為 collaborator
- Task 即將逾期 → 自動留言 @負責人

### 設計原則

1. **先跑一週手動流程，再自動化重複的部分**——流程沒穩定就自動化，只會放大混亂
2. 自動化「分派、通知、改欄位」這類機械動作；**判斷類的工作留給人**
3. 專案右上 **Customize → Rules** 管理

---

## 6. Forms：需求入口 💰

Form = 專案的對外申請表單，回覆自動變成 task 進入專案。

典型場景：

- **IT / 行政**：設備申請、權限申請
- **行銷**：內容請求（設計、文案）
- **開發**：bug 回報表單（讓非工程同仁用固定格式回報）
- 💰💰 **Branching**：答案不同就出現不同後續問題（如「報銷類型=差旅」才顯示「出差地點」欄位），最多五層

搭配 Rules 就是完整的 intake 系統：表單進來 → 自動分派 → 看板推進，requester 在 task 裡直接收到進度更新，不用再問「我提的單呢？」

---

## 7. Templates 與 Bundles

- **Project templates** 💰：把標準流程存成模板。每個 sprint、每次活動、每個客戶 onboarding 用同一套結構開新專案
- **Task templates**：重複性工作（如「每月結帳檢查清單」）存成 template task，一鍵帶出整組 subtasks
- **Workflow bundles** 💰💰：把 rules + custom fields + template 打包成 bundle，套到多個專案統一管理
- 官方也有免費的 [template library](https://asana.com/templates) 可直接套用

---

## 8. Multi-homing：一個 task 出現在多個專案

**Task 可以同時屬於多個專案**（`Tab + P` 加入）。這是 Asana 的招牌設計，解決「這件事既屬於 A 專案也屬於 B 專案」的問題。

- 在任一個專案完成它，**所有專案同時完成**——不會有兩份不同步的複本
- 典型用法：工程任務同時出現在 `Sprint 42` 和 `金流重構` 兩個專案
- 注意：My Tasks 裡自建的 task 預設是**私人**的；multi-home 到專案後，專案成員就看得見了

---

## 9. Portfolios、Workload、Goals 💰💰

管理層與跨部門協作的三件套：

- **Portfolios**：把多個專案收進一個組合，總覽各專案進度狀態（紅黃綠燈）。適合「一次管 10 個專案的 PM／主管」
- **Workload**：依 task 數與 effort 欄位看**每個人的負載量**，過載的人一眼可見，直接拖曳重分配
- **Goals**：公司目標（OKR）層級，目標可連結到實際的專案，進度自動累計

> 軟體開發情境：Portfolio 管 `Q4 Roadmap`（內含 6 個專案），Workload 看團隊谁過載，Goal 連 `Q4 上線三個新功能`。

---

## 10. Approvals 與 Proofing 💰💰

- **Approvals**：把 task 標記為核准類型（Approve / Reject / Needs changes 三鍵），簽核流程有明確狀態與紀錄。適合：合約核可、發佈放行、報銷審批
- **Proofing**：直接在**圖片和 PDF 上留言標註**，意見自動變成 task。設計 review、版型確認神器，取代來回寄截圖

---

## 11. 報告與追蹤

- **Project dashboards**（全方案）：專案內建圖表——open tasks 分佈、依 assignee 的完成數、即將到期數
- **Universal reporting**：跨專案做圖表和報告，存起來定期自動更新
- **Status updates**：專案定期發狀態更新（紅黃綠燈 + 摘要），訂閱者自動收到——**取代週會上的口頭進度報告**
- **Advanced search**（全方案）：全文搜尋 + 條件組合，可存成常用搜尋
- 匯出：CSV / JSON / PDF（全方案）

---

## 12. 軟體開發工作流

Asana 不是 Jira，但輕量級開發協作夠用：

### Sprint 專案結構建議

```
Sprint 42（Project, 板自 Board 藍圖）
├── Section: To Do
├── Section: In Progress
├── Section: Code Review
├── Section: QA
└── Section: Done
```

- **Custom fields**：`Type: Bug/Feature/Tech Debt`、`Points: 1/2/3/5/8`、`Sprint: 42`
- **Board view**：站立會議直接投屏看板推進度
- 💰 **Dependencies**：串部署鏈
- 💰💰 **Workload**：sprint 規劃時看誰還有容量

### 與開發工具串接

- **GitHub**：PR / issue 連結 Asana task，PR 狀態更新同步到 task（免費 app）
- **Jira Cloud 雙向同步** 💰：工程在 Jira、其他團隊在 Asana 的混合環境必備
- Task 上直接貼 PR / commit 連結也是務實的輕量做法

---

## 13. 整合：Slack / Gmail / GitHub

全方案都有 100+ 整合，最常用的三個：

| 整合 | 用法 |
|---|---|
| **Slack** | 訊息一鍵轉 task；task 有更新時通知到指定頻道。鐵律：**Slack 只負責觸發，脈絡留在 Asana** |
| **Gmail** | 信件轉 task（保留內文）；Google Drive 附件直接掛在 task 上 |
| **GitHub** | PR 關聯 task，狀態自動同步 |

另外：任何 task 都有 email 地址（`x@mail.asana.com`），從任何信箱寄信就能建 task，寄進來的 task 會出現在 My Tasks 的 **Recently assigned**。

---

## 14. My Tasks 進階整理法

- **Sort + Group by 可以疊加**：例如 group by 優先級，group 內再 sort by due date
- My Tasks 的檢視偏好會自動記憶（專案檢視則要手動儲存）
- 進階自訂 section 範例（狀態流）：

```
📥 Recently assigned（自動）
🔥 今天必做
🔄 進行中
⏸ 等別人（blocked）
📅 本週
🗄 Later
```

- 每天早上 5 分鐘「清 inbox + 排今天」是維持系統不腐爛的最低維護成本
- 💰 My Tasks 也能用 custom fields 和 rules

---

## 15. 進階快捷鍵

在 [beginner 八鍵](./beginner-guide.md#8-新手快捷鍵速查)之上加這些：

| 快捷鍵 | 功能 |
|---|---|
| `Tab + C` | 在選中 task 留言 |
| `Tab + S` | 跳到 subtasks |
| `Tab + T` | 加 tag |
| `Tab + X` | Focus mode（全螢幕單 task） |
| `Tab + Z` / `Tab + I` | 跳到 My Tasks / Inbox |
| `Tab + N` | 新增 section |
| `Tab + Y` / `U` / `L` | 標記 Today / Upcoming / Later |
| `Cmd + ↑ / ↓` | 上下移動 task |
| `Cmd + Shift + ↑ / ↓` | 跳到上/下一個 section |
| `Cmd + Click` | 多選 task（批次改 assignee / date / 刪除） |
| `Cmd + C` / `Cmd + V` | 複製貼上 task（貼上多行 = 一次建多個 task） |
| `Tab + Backspace` | 刪除選中 task |
| `J` / `K` | Inbox 內下/上移動 |
| `Tab + /` | 搜尋 |

---

## 16. 團隊最佳實務

導入成敗在慣例（convention），不在功能：

1. **命名規範先行**：專案名加前綴如 `[行銷] 2026 Q4 活動`、`[IT] 設備申請`
2. **一個 task 一個負責人**：多人合作就拆 subtask 分開指派
3. **沒有 assignee 的 task 不該存在**；沒有 due date 的要有理由
4. **Section 語意全組統一**：不要 A 專案的「Done」等於 B 專案的「QA 完」
5. **Custom fields 寧少勿多**：每個欄位都要有人維護，沒人看的欄位會變雜訊
6. **會議結論開 task 不開 email**：跨部門溝通全部走 task + @mention
7. **每季清理**：封存死專案、合併重複欄位、刪過期 rule

---

## 延伸資源

- [Asana Academy：Creating basic workflows](https://academy.asana.com/path/creating-basic-workflows-course-series)（三種藍圖各 15 分鐘）
- [Asana Forum](https://forum.asana.com/)——實務問題的最好出處
- [Help Center：My Tasks](https://help.asana.com/s/article/my-tasks) ｜ [Multi-home](https://academy.asana.com/tasks-in-multiple-projects) ｜ [鍵盤快捷鍵](https://help.asana.com/s/article/asana-keyboard-shortcuts)
- [官方定價與功能比較表](https://asana.com/pricing)——確認功能屬於哪個方案
