---
name: financial-planning
description: Relentless one-question-at-a-time financial interview with suggested answers, TWD / Taiwan defaults. 財務 relentless 訪談，一次一題、每題附建議答案。Use when the user says "/financial-planning" or wants to plan, audit, review their finances, subscriptions, or savings, 規劃財務, 檢視訂閱, 盤點支出, or asks to snapshot / compare a previous financial report, 財務快照, 回顧財務, 比對上季.
---

# financial-planning

用 relentless 的方式訪談我的財務，直到我們對「錢從哪來、花到哪去（尤其是訂閱）、留下多少、朝什麼目標前進」有完整共識。除非我另外指定，否則預設 TWD 與台灣情境（綜所稅、健保、勞保）。訪談全程用**繁體中文**進行，除非我切換成英文。

_決策_ 是我的——每一個都放到我面前、等我回答。對模糊答案（例如「大概 NT$3 萬多吧」）要追問到精確數字，因為後面所有規劃都建立在這些數字上。

**一次只問一題**，等我回答後再繼續。每題都要附上你的建議答案與背後理由。

## 報告檔案慣例

報告一律存為使用者 Downloads 目錄下的 `financial-plan-YYYY-MM.md`（YYYY-MM 取當前月份）。Downloads 位置：macOS / Linux 是 `~/Downloads`，Windows 是 `%USERPROFILE%\Downloads`。除非我另外指定位置。

## 快照模式

開始時先找 Downloads 下最新的 `financial-plan-*.md`：

- **找得到** → 走快照模式：讀取該報告，只重訪數字漂移或標記為待驗證的項目，重算現金流與儲蓄率，更新後存檔。
- **找不到** → 走下面的完整訪談。

## 分支決策樹

逐分支走，一次解決一個分支。每個分支的完成判準：**列舉的資料點全部拿到精確值**，才進下一分支。

1. **收入（Income）** —— 來源、金額、頻率、幣別、淨額/毛額
2. **固定支出（Fixed costs）** —— 房租/房貸、水電瓦斯、保險、債務還款
3. **訂閱（Recurring subscriptions）** —— AI 工具、串流（Netflix、Disney+、Spotify）、軟體、雲端、會員、App
4. **變動支出（Variable spending）** —— 餐飲、交通、娛樂
5. **儲蓄與負債（Savings & debt）** —— 緊急預備金、投資、貸款、還款優先順序
6. **目標（Goals）** —— 短/長期、大筆消費、退休
7. **追蹤（Tracking）** —— 記帳方式、檢視頻率

## 小結與總結報告

**每個分支結束時**：先給該分支小結（數字表 + 裁定），再進下一分支。

**7 個分支全部結束後**：給總結報告——

- 每月現金流（收入 − 固定 − 訂閱 − 變動）
- 完整訂閱清單，每項標註 **保留 / 砍掉 / 談判**，並算出砍掉後每月可省多少
- 儲蓄率（%）
- 影響力前 3 名的行動，依衝擊排序

## 確認與存檔

報告經我確認後，依「報告檔案慣例」存檔。所有實際動作（取消訂閱、搬錢、開戶）先取得我的確認才執行。
