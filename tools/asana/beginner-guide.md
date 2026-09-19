# Asana 新手教學

> 整理日期：2026-09-19
> 適用對象：完全沒用過 Asana、公司剛導入的成員
> 官方文件：[Help Center](https://help.asana.com/s/) ｜ [Asana Academy](https://academy.asana.com/) ｜ [Quick Start Guide](https://help.asana.com/s/article/quick-start-guide-to-asana)

---

## 目錄

1. [Asana 是什麼？](#1-asana-是什麼)
2. [核心概念：五層結構](#2-核心概念五層結構)
3. [介面導覽：五個主要區域](#3-介面導覽五個主要區域)
4. [My Tasks：你的個人待辦清單](#4-my-tasks你的個人待辦清單)
5. [任務基本操作](#5-任務基本操作)
6. [專案協作：和同事一起工作](#6-專案協作和同事一起工作)
7. [Inbox：不要漏掉任何更新](#7-inbox不要漏掉任何更新)
8. [新手快捷鍵速查](#8-新手快捷鍵速查)
9. [新手常見地雷](#9-新手常見地雷)
10. [下一步](#10-下一步)

---

## 1. Asana 是什麼？

Asana 是一套**工作管理平台**（work management platform），核心用途是把「工作」從 email 和聊天訊息裡搬出來，變成可追蹤、可指派、有截止日的**任務**。

一句話理解心態轉變：

> **以前：「順便幫我處理一下」（口頭 / email / Slack，講完就忘）**
> **以後：開一張 task、指派給人、設 due date，進度自己會出現**

公司導入後，你的日常大概變成：

- 早上打開 **My Tasks** 看今天該做什麼
- 做事的過程和結果**留在 task 裡**（留言、附檔），不用翻 email
- 打開 **Inbox** 看別人给你的更新和回覆
- 老闆問進度時，直接丟專案連結，不用做報告

---

## 2. 核心概念：五層結構

Asana 的世界由大到小是這樣：

```
Organization（公司）
└── Team（部門／團隊）
    └── Project（專案）
        └── Section（分節）
            └── Task（任務）
                └── Subtask（子任務）
```

### 何時用 Project、Task、Subtask？

官方的判斷框架：

| | 建 Project | 建 Task | 建 Subtask |
|---|---|---|---|
| **投入程度** | 多人、長期、有共同目標 | 一個人的單一行動，幾分鐘到幾天可完成 | 一個 task 需要拆給多人分工 |
| **例子** | 「官網改版專案」 | 「發佈部落格文章」 | 「收集客戶推薦語」 |

軟體開發的例子：

- **Project**：`Sprint 42`、`金流系統重構`
- **Task**：`修正登入頁 XSS 弱點`
- **Subtask**：`寫單元測試`、`code review`、`部署到 staging`

### Task vs Subtask 的常見困惑

一個 task **只能有一個 assignee**（負責人）。如果這件事需要兩個人做，正確做法是拆成 subtasks 分別指派，而不是糾結要指派給誰。

---

## 3. 介面導覽：五個主要區域

登入後左側欄有五個固定入口：

| 區域 | 用途 | 一句話理解 |
|---|---|---|
| **Home** | 個人化儀表板 | 進 Asana 的起點，放最常用的專案 |
| **My Tasks** | 你名下所有任務 | 你的個人待辦清單（最重要！） |
| **Inbox** | 你關注的工作的更新 | 像「工作用的信箱」，只收 task 相關通知 |
| **Starred**（星號） | 你加星號的專案 | 快速書籤 |
| **專案列表** | 你的 Team 下的所有專案 | 團隊共用的地方 |

新手 80% 的時間只會在 **My Tasks**、**Inbox**、**專案** 三個地方之間切換。

---

## 4. My Tasks：你的個人待辦清單

**My Tasks 會自動收集所有指派給你的 task**——不管它來自哪個專案。這是 Asana 最重要的個人頁面。

預設有三個 section，照時間自動分類：

- **Today**：今天到期
- **Upcoming**：近期到期
- **Later**：更久之後

### 建議的每日儀式

1. **早上**：打開 My Tasks，把「今天真的要做」的 task 排前面（拖曳即可）
2. **做完一件事**：打勾完成它（會消失，但紀錄都在）
3. **下班前**：瞄一眼明天到期的 task，心裡有底
4. **Task 快到期做不完**：主動改 due date（別讓它過期變紅字）

### 分類方式隨你定

除了預設的日期分類，也可以自建 section，例如：

- 依優先序：`今天必做` / `本週` / `之後`
- 依狀態：`待處理` / `進行中` / `等別人`

---

## 5. 任務基本操作

### 建立任務

三種入口任你選：

- 左上角橘色 **+ Quick Add** 按鈕（任何頁面都能用，快捷鍵 `Tab + Q`）
- 專案裡的 **Add task** 按鈕
- section 旁的 **+** 號

### 寫好任務標題的秘訣：動詞開頭

| ❌ 不好的標題 | ✅ 好的標題 |
|---|---|
| 產品簡報 | 和產品 lead review 簡報 |
| 會議 | 排 9/25 的 kickoff 會議 |
| 弱點 | 修正登入頁的 XSS 弱點 |

### 任務的六個關鍵欄位

打開任務詳情（右側面板）：

1. **Assignee**：負責人（只能一個，`Tab + M` 指派給自己）
2. **Due date**：截止日（`Tab + D`）
3. **Description**：說明與上下文——把「受託人不需要再問你」當標準寫
4. **Attachments**：附件、連結直接放上來
5. **Subtasks**：拆解步驟
6. **Comments**：過程討論都留在這裡，**@mention 同事**可以把對方拉進這個 task

### 完成 vs 刪除

- 做完 → 打勾 ✅（任務保留紀錄，可隨時查）
- 建錯 → 刪除

**養成習慣：做完就打勾。** 未完成的 task 累積在清單上會造成心理壓力，也是團隊進度的雜訊。

---

## 6. 專案協作：和同事一起工作

### 加入專案

公司導入後，你的 Team 裡通常已經有專案。點左側欄專案名稱即可進入。沒看到就請同事或 admin 把你加進 Team。

### 專案的多種檢視方式

同一批 task，可以切換不同角度看：

- **List**：預設，一條條列表（最通用）
- **Board**：看板，欄位是 section，拖曳卡片（很像 Trello / Kanban）
- **Calendar**：月曆上看 due date 分布
- Timeline / Gantt / Dashboard：付費方案功能，進階再學

### 指派工作給同事

1. 在專案裡建 task（或挑現有的）
2. 點 **Assignee** 欄位，輸入同事名字
3. 設 due date、寫清楚 description
4. 對方會在自己的 My Tasks 和 Inbox 收到

**重點：指派 ≠ 追殺。** Task 被指派後，對方的進度、留言、完成狀態你都看得到，不需要再開會議或寄信追問。

### 分享專案

專案右上角 **Share** 按鈕可以邀請同事，或產生連結。

---

## 7. Inbox：不要漏掉任何更新

**Inbox 只收和你有關的更新**：你負責的 task 被留言、你 @mention 的人回覆、你 follow 的 task 有進度……不會收到不相干的噪音。

- 點一則更新 → 直接跳到該 task，回完自動跳回 Inbox（工作動線非常順）
- **F** = follow / unfollow 該 task
- 處理完按 archive 清空，Inbox 歸零就是今天功德圓滿

### 心態轉變

> 以前：同事在有幾十封信的 thread 裡回覆你
> 以後：更新直接出現在 Inbox，點進去就是那個 task 的完整脈絡

**回覆要留在 task 裡，不要又開一封 email。** 這樣三個月後翻歷史紀錄，脈絡一目了然。

---

## 8. 新手快捷鍵速查

先用這八個就夠了（Mac 上 `Cmd` 對應 Windows 的 `Ctrl`）：

| 快捷鍵 | 功能 |
|---|---|
| `Tab + Q` | 快速新增 task（任何畫面） |
| `Tab + M` | 指派給自己 |
| `Tab + A` | 指派給別人 |
| `Tab + D` | 設 due date |
| `Tab + P` | 把 task 加到另一個專案 |
| `Cmd + Enter` | 完成 task |
| `Enter` | 新增下一筆 task（在清單中連續輸入超快） |
| `Cmd + /` | 顯示完整快捷鍵清單 |

冷知識：在 task 名稱結尾打 `:` 再按 Enter，會自動變成一個 **Section**。

---

## 9. 新手常見地雷

1. **把 Project 當 Task 用**
   ❌ 開一個專案叫「換影印機碳粉」。✅ 這是一張 task。

2. **Task 沒有 assignee 或 due date**
   沒負責人的 task = 沒人會做。沒日期的 task = 永遠不會到期。

3. **開一堆一個人的小專案**
   只有一兩件事要做，先建 task 就好。專案是給「多人、多步驟、有時間軸」的工作用的。

4. **溝通又跑回 email / 聊天軟體**
   Task 裡的討論才是留得下來的紀錄。Slack 上講完的結論，貼一段回 task。

5. **不用 @mention**
   想讓特定人看到或回覆，在留言打 `@` 他的名字，他會被加進 task 並收到通知。

6. **把 My Tasks 當專案用**
   My Tasks 建的 task 預設是**私人的**，別人看不到。要協作就加進專案（`Tab + P`）。

---

## 10. 下一步

- **官方免費課程**：[Get started with Asana](https://academy.asana.com/get-started-course)（約 45 分鐘，自訂進度，跟著做一次最紮實）
- **官方 Quick Start**：[quick-start-guide-to-asana](https://help.asana.com/s/article/quick-start-guide-to-asana)
- **任務深入了解**：[understanding-tasks](https://help.asana.com/s/article/understanding-tasks)
- **有問題就問**：[Asana Forum](https://forum.asana.com/) 官方論壇，回應速度快
- 進階用法（Custom Fields、Rules 自動化、Timeline、Forms、Portfolios）見 [pro-tips.md](./pro-tips.md)
