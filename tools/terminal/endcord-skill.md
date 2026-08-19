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

| 按鍵          | 作用                                       |
| ------------- | ------------------------------------------ |
| `M-k` / `M-j` | 樹狀圖上/下移                              |
| `M-l`         | 開啟選取的頻道/thread                      |
| `M-h`         | 收合/展開選取頻道的 threads（toggle）      |
| `C-/`         | 進入 command mode                          |
| `i` / Esc     | INSERT / NORMAL 模式切換                   |
| `C-v`         | 貼上（endcord 自己的 paste，走 clipboard） |
| `Enter`       | 發送訊息                                   |
| `C-b`         | 跳到聊天底部                               |

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

## Slash commands（app commands，2026-08-19 實戰驗證）

### TUI 內操作流程（vim mode）

輸入 `/` 開 assist → 過濾 app → `Alt+Enter` 選取 → 打子指令 → `Alt+Enter` → 打 `--opt=value` → popup 停在 `EXECUTE` → `Alt+Enter` 執行。

```
i → /athena → (popup) Alt+Enter 選 app
  → " mute" → (popup) Alt+Enter 選指令
  → " --who=26" → (popup EXECUTE) Alt+Enter 執行
```

指令字串格式（README）：`/[bot_name] [command] [subcommand] --[option]=[value]`
- `bot_name` = app 全名 lower + 空格換 `_`（**含中文**，如 `雅典娜_athena`）→ 自動化打不出來，必須靠 assist 插入
- popup 導航一律 `Alt+↑/↓` + `Alt+Enter`（vim mode 下也一樣）

### 巨坑：endcord 1.5.3 bug — `Unknown Integration (10005)`

**症狀**：TUI 送 slash command 給 2026 新式 guild apps（雅典娜/狄俄尼索斯等）→ log 出現 `send_interaction: Response code 400; Error code: 10005 - Unknown Integration`。老 app（Craig）正常。

**根因**：endcord `discord.py send_interaction` 的 payload 缺 **`data.guild_id`** — 新式 Apps 系統（有 `integration_types` 的）必須帶，老 app 不用。

**解法**：extension monkey-patch（已安裝於 `~/Library/Application Support/endcord/Extensions/fix-interaction-guild-id/`）：

```python
def send_interaction(guild_id, ...):
    if interaction_type == 2 and guild_id:
        interaction_data.setdefault("guild_id", guild_id)  # 关鍵一行
    return original(...)
```

附贈自訂指令 `:mute26` — 直接用 endcord 真正的 `session_id` 送 interaction（REST 直送用隨機 session_id 會 204 成功但 **ephemeral 回應遺失**，因為回應是經 gateway session 推回來的）。

### REST 直送 interaction（免 TUI，除錯用）

```bash
# 抓 guild 的 app commands（command id/version 從這來）
curl -s -H "Authorization: $TOKEN" \
  "https://discord.com/api/v9/guilds/<GUILD_ID>/application-command-index"

# payload 关鍵：data 內必須有 guild_id（新式 apps）
curl -s -X POST -H "Authorization: $TOKEN" -H "Content-Type: application/json" \
  -d '{"type":2,"application_id":"<APP_ID>","guild_id":"<GID>","channel_id":"<CID>",
       "session_id":"<uuid4.hex>","nonce":"<rand64>",
       "data":{"version":"<CMD_VERSION>","id":"<CMD_ID>","name":"mute","type":1,
               "guild_id":"<GID>",   ← 沒這行就 10005
               "options":[{"type":3,"name":"who","value":"26"}],"attachments":[]},
       "analytics_location":"slash_ui"}' \
  "https://discord.com/api/v9/interactions"   # 204 = 成功
```

注意：Cloudflare 擋 python urllib UA（403 error 1010），要用 curl。 ephemeral 回應只會經 gateway session 送達，REST 直送看不到 — 要看回應必須走 endcord 內（extension 或 TUI）。

### 除錯工具

- `endcord -d`（debug mode）→ log 出現 `App command string: ...`（已 parse）、`send_interaction: Response code ...`（HTTP 結果）
- log 位置：`~/Library/Application Support/endcord/endcord.log`（每次啟動 rotate 成 `-prev`）
- `Debug/commands_guild.json` — endcord 快取的 guild commands（含 id/version/options/choices）
- `Input code: N` in log = 按鍵代碼；`28`=Esc、`27`=Alt+Enter 相關、`26`=popup 導航
- `:show_log`、`:dump_chat`、`:redraw`（UI 亂掉時）

## 自動觸發 slash command（mute26loop，方案 A 設計）

### 需求

- 每 65 秒觸發一次雅典娜 /mute who:26（配合 60s cooldown + 5s 緩衝）
- 預設跑 1 小時（~55 次），可隨時延長/停止
- 觸發要走 endcord 內部（session_id 正確 → ephemeral 回應可見）

### 設計（extension `fix-interaction-guild-id` v0.3）

用 `on_main_loop` access point（主迴圈每圈執行、thread-safe）：

```python
# __init__ 增加 state
self.loop_enabled = False
self.loop_interval = 65        # 秒，> 60s cooldown
self.loop_duration = 3600      # 預設 1 小時
self.loop_started = None       # time.monotonic()
self.loop_last_sent = 0.0

# on_main_loop：主迴圈每圈檢查
def on_main_loop(self):
    if not self.loop_enabled: return
    now = time.monotonic()
    if now - self.loop_started >= self.loop_duration:
        self.loop_enabled = False          # 到時自動停
        self.app.update_extra_line("mute26loop: done")
        return
    if now - self.loop_last_sent >= self.loop_interval:
        self._send_mute26()                # 重用 mute26 的 send_interaction
        self.loop_last_sent = now

# 指令（on_execute_command 擴充）
# :mute26loop            → toggle on/off（off 保留剩餘時間，重新 on 繼續）
# :mute26loop 90         → toggle + 自訂 interval
# :mute26loop 65 7200    → interval + duration 秒
```

### 使用

```
:mute26loop          # 開跑（65s × 1h）；再打一次 = 停
:mute26loop 65 1800  # 自訂 interval / duration
```

### 為什麼選 extension 內建計時器（vs 外部迴圈）

- 不依賴 herdr pane 活著 / NORMAL mode / 按鍵注入（實測殘影、popup 卡住都會讓外部按鍵失效）
- 跑在主迴圈 = thread-safe，ephemeral 回應正常渲染
- 內建 duration 上限 + toggle，防止忘記關

### 風險備註

每 65s 一次 = 每小時 ~55 次 interaction，規律模式有觸發 Discord anti-spam filter 的理論風險（endcord FAQ 有警告）。已評估可接受。

## 已知坑

| 症狀                    | 原因                                | 解法                                                    |
| ----------------------- | ----------------------------------- | ------------------------------------------------------- |
| `goto <#id>` 沒反應     | 目標 thread 在樹中隱藏（收合）      | 樹狀導航：parent 上 `M-h` 展開 → `M-j` → `M-l`          |
| 樹中看不到某個新 thread | 同步資料其實在，只是收合            | 同上；`🡲` 前綴＝有隱藏 threads                          |
| send-keys 打中文掉字    | tmux send-keys 對多位元組字元不可靠 | `pbcopy` + endcord `C-v` 貼上                           |
| `C-x` 在輸入框          | 觸發 cancel downloads 確認（Y/n）   | 誤觸時按 `n` + Enter 脫困                               |
| capture 全空            | 視窗太小 endcord 不渲染             | `tmux resize-window -x 200 -y 50` 或開 session 時指定   |
| thread 建立時間想確認   | —                                   | snowflake：`((id>>22)+1420070400000)/1000` 轉 timestamp |
| slash command 送不出（log 10005） | endcord bug：payload 缺 `data.guild_id`（新式 guild apps） | extension `fix-interaction-guild-id` 已修；REST 直送參考上方 |
| `/athena` parse 失敗（Invalid app command） | bot_name 必須是 app 全名（含中文如 `雅典娜_athena`） | 靠 assist 選取插入全名，不要手打 |
| 指令列出現雙空格（`athena␣␣mute`）→ parse 失敗 | assist 插入後又手動補空白 | `Alt+Enter` 插入後接續打的字自帶前導空白即可 |
| REST 送 interaction 204 但沒看到 ephemeral 回應 | 回應綁 gateway `session_id`，隨機 UUID 收不到 | 走 endcord 內（TUI 或 extension 用 `app.session_id`） |
| herdr send-text 打中文掉字 | 同 tmux 問題，多位元組被吃 | 純靠 assist 插入；或 `pbcopy`+`C-v`（在 INSERT 有效） |
| vim INSERT 下 Enter 不送出 | INSERT 的 Enter = 換行（`␤`） | 送出：`Esc` 回 NORMAL → `Enter` |
| voice channel 上按 `Space`（vim tree） | 直接觸發「加入語音」不是開聊天 | 語音頻道沒有文字聊天；Esc 不一定能取消，用 `:voice_leave_call` |
| 輸入列殘留幽靈文字（如 `:26`）刪不掉 | slash command 狀態的 rendering glitch | `:redraw` 指令修復 |
| log 裡有 traceback（mouse_events ValueError） | endcord 1.5.3 背景_thread bug，不影響 TUI | 忽略；TUI 仍可操作 |
