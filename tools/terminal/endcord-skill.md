# Endcord Automation via tmux

以 endcord（Discord TUI）在 detached tmux session 內遙控：讀頻道、切 channel/thread、發訊息、mention。比 Interceptor/Chrome 輕量許多，適合 headless 操作。

## 環境前提

- `endcord`（在 `$PATH` 中，或以絕對路徑指定），登入任意 profile
- `tmux`
- endcord 設定：`~/Library/Application Support/endcord/config.ini`（vim_mode = True）
- token 存 keychain：`security find-generic-password -s endcord -a profiles -w`（JSON：`profiles[].token`，可打 Discord REST API 用）

## 啟動

```bash
tmux new-session -d -s endcord -x 200 -y 50 endcord
# 大一點的 -x/-y 避免 capture 被截斷；太小視窗 endcord 可能不渲染
```

## 讀畫面

```bash
tmux capture-pane -t endcord -p          # 全畫面
tmux capture-pane -t endcord -p | grep -v '^$' | head -30   # 去空行
```

## 關鍵 keybindings（config.ini，vim_mode）

| 按鍵 | 作用 |
|------|------|
| `M-k` / `M-j` | 樹狀圖上/下移 |
| `M-l` | 開啟選取的頻道/thread |
| `M-h` | 收合/展開選取頻道的 threads（toggle） |
| `C-/` | 進入 command mode |
| `i` / Esc | INSERT / NORMAL 模式切換 |
| `C-v` | 貼上（endcord 自己的 paste，走 clipboard） |
| `Enter` | 發送訊息 |
| `C-b` | 跳到聊天底部 |

## Command mode（C-/ 後輸入）

- `goto <#CHANNEL_ID>` — 理論上可跳到任意頻道，**但對「樹中未顯示的 thread」無效**（見下方坑）
- `channel` — 顯示目前頻道資訊（標題列也一直有）
- `toggle_thread` — join/leave 目前開的 thread

## 導航到 thread 的可靠流程

`goto` 對隱藏 thread 失效（`find_parents_from_id` 只找得回 gateway 同步且顯示在樹裡的）。穩定做法是用樹狀導航：

```bash
# 1. 展開 parent 頻道的 threads（選到 parent 上按 M-h）
# 2. M-j 移動到目標 thread
# 3. M-l 開啟
for i in 1 2 3; do tmux send-keys -t endcord M-j; sleep 0.15; done
tmux send-keys -t endcord M-l
```

判斷頻道有隱藏 threads：樹狀圖中頻道前綴是 `🡲`（pointer）而非空白，表示底下有 threads 收合中。thread 前綴是 `⤙`。

## 發送訊息（已驗證的成功公式）

**不要用 `tmux send-keys -l` 打中文長字串 — 會掉字**（實測多位元組字元被吃掉）。用 clipboard 貼上：

```bash
# 1. 進 INSERT 並把文字放進 clipboard
tmux send-keys -t endcord i
printf '<@USER_ID> 這是測試訊息' | pbcopy

# 2. 貼上（C-v 是 endcord 綁的 paste，會讀系統 clipboard）
tmux send-keys -t endcord C-v
sleep 0.8

# 3. capture 檢查輸入行文字是否完整，再 Enter 發送
tmux capture-pane -t endcord -p | tail -5
tmux send-keys -t endcord Enter
```

Mention 語法同 Discord 原始格式：`<@USER_ID>`、`<@&ROLE_ID>`、`<#CHANNEL_ID>`，送出後自動解析為 ping／頻道連結。

## 查 channel / thread 資訊（REST API，免 TUI）

```bash
TOKEN=$(security find-generic-password -s endcord -a profiles -w \
  | python3 -c "import json,sys; print(json.load(sys.stdin)['profiles'][0]['token'])")
curl -s -H "Authorization: $TOKEN" \
  "https://discord.com/api/v9/channels/<CHANNEL_ID>" | python3 -m json.tool
# 回 name/type/guild_id/parent_id/thread_metadata；type 11 = public thread
```

## 已知坑

| 症狀 | 原因 | 解法 |
|------|------|------|
| `goto <#id>` 沒反應 | 目標 thread 在樹中隱藏（收合） | 樹狀導航：parent 上 `M-h` 展開 → `M-j` → `M-l` |
| 樹中看不到某個新 thread | 同步資料其實在，只是收合 | 同上；`🡲` 前綴＝有隱藏 threads |
| send-keys 打中文掉字 | tmux send-keys 對多位元組字元不可靠 | `pbcopy` + endcord `C-v` 貼上 |
| `C-x` 在輸入框 | 觸發 cancel downloads 確認（Y/n） | 誤觸時按 `n` + Enter 脫困 |
| capture 全空 | 視窗太小 endcord 不渲染 | `tmux resize-window -x 200 -y 50` 或開 session 時指定 |
| thread 建立時間想確認 | — | snowflake：`((id>>22)+1420070400000)/1000` 轉 timestamp |

## 相關

- Interceptor/Chrome 版（trusted events、DOM 讀取）：`scripts/discord.md`
- Webhook 單向發送：`scripts/discord-webhook.sh`
