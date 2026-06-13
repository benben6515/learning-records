# Vue Meetup 導讀 — Vue 小聚

- **主辦：** Akasa Lab
- **日期：** 2026-06-13
- **連結：** https://meetup.akasa-lab.dev/
- **投影片：** [Google Drive](https://drive.google.com/file/d/1PDq8JyvRjnvsZlmJ-Ay3bA9Dflw9FsdA/view?usp=sharing)
- **Frontend Demo：** https://github.com/fortes1219/socket-meetup-frontend
- **Backend Demo：** https://github.com/fortes1219/socket-meetup-backend

## 核心問題

每個分頁都連 WebSocket 會讓成本線性放大。高頻資料場景下，每個 client 不只是一條 socket，還有 parse、render、GC 等完整 runtime 成本。

## 解決方案：Realtime Ownership

- **Realtime Owner** — 被允許直接連 `/quote` 接收 realtime tick 的分頁
- **Follower** — 不連 `/quote`，可看 REST history，必要時可 reclaim 權限
- **Control Plane** — BroadcastChannel 只傳 control message（leader election, invalidation, snapshot），不傳 K 線 tick
- **Data Plane** — WebSocket `/quote` 傳 realtime tick，只由 leader 消費

## 架構重點

| 層                  | 技術               | 用途                                           |
| ------------------- | ------------------ | ---------------------------------------------- |
| Server state        | TanStack Query     | trading-pairs REST data                        |
| Client coordination | Pinia              | leader role, socket state, subscription intent |
| K 線 history        | REST API           | 已收線的可追溯資料                             |
| Realtime tick       | Socket.IO `/quote` | 未收線 tick，僅 leader                         |
| Control signal      | Socket.IO `/`      | `callUpdate` invalidation                      |
| Cross-tab           | BroadcastChannel   | 不傳 tick，只做協調                            |

## Refetch Storm 與 Jitter

- Admin CRUD commit 後 emit `callUpdate`，leader 經 dedupe + jitter 再 refetch
- Jitter 將同步 N QPS 攤平為 N/W QPS
- Follower 套用 leader 的 snapshot，不額外發 request

## Demo 場景

1. Home realtime owner — BTCUSDT K 線 + 現價跳動
2. 第二分頁 follower / reclaim — 不開 socket，操作時重新取得 owner
3. 交易對切換 — reload history + resubscribe
4. Admin CRUD — mutation → `callUpdate` → jitter refetch

## 重點 Takeaways

- BroadcastChannel 不是行情匯流排，是 control plane
- `maxRealtimeOwners = 1` 是 demo policy；production 應依 user/device/plan 調整
- SharedWorker 可行但有 iOS Safari 支援、reconnect、worker recovery 等 tradeoff
- closed K 線才落 DB，未收線是 presentation realtime
- 前端不是只有畫 UI；每個 client 都會製造系統成本
