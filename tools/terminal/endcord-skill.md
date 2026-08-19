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
i → /exampleapp → (popup) Alt+Enter 選 app
  → " mute" → (popup) Alt+Enter 選指令
  → " --who=<TARGET>" → (popup EXECUTE) Alt+Enter 執行
```

指令字串格式（README）：`/[bot_name] [command] [subcommand] --[option]=[value]`
- `bot_name` = app 全名 lower + 空格換 `_`（**含中文**，如 `<BOT_APP_NAME>`）→ 自動化打不出來，必須靠 assist 插入
- popup 導航一律 `Alt+↑/↓` + `Alt+Enter`（vim mode 下也一樣）

### 巨坑：endcord 1.5.3 bug — `Unknown Integration (10005)`

**症狀**：TUI 送 slash command 給 2026 新式 guild apps → log 出現 `send_interaction: Response code 400; Error code: 10005 - Unknown Integration`。老 app（Craig）正常。

**根因**：endcord `discord.py send_interaction` 的 payload 缺 **`data.guild_id`** — 新式 Apps 系統（有 `integration_types` 的）必須帶，老 app 不用。

**解法**：extension monkey-patch（已安裝於 `~/Library/Application Support/endcord/Extensions/fix-interaction-guild-id/`）：

```python
def send_interaction(guild_id, ...):
    if interaction_type == 2 and guild_id:
        interaction_data.setdefault("guild_id", guild_id)  # 關鍵一行
    return original(...)
```

附贈自訂指令 `:mute_target` — 直接用 endcord 真正的 `session_id` 送 interaction（REST 直送用隨機 session_id 會 204 成功但 **ephemeral 回應遺失**，因為回應是經 gateway session 推回來的）。

### REST 直送 interaction（免 TUI，除錯用）

```bash
# 抓 guild 的 app commands（command id/version 從這來）
curl -s -H "Authorization: $TOKEN" \
  "https://discord.com/api/v9/guilds/<GUILD_ID>/application-command-index"

# payload 關鍵：data 內必須有 guild_id（新式 apps）
curl -s -X POST -H "Authorization: $TOKEN" -H "Content-Type: application/json" \
  -d '{"type":2,"application_id":"<APP_ID>","guild_id":"<GID>","channel_id":"<CID>",
       "session_id":"<uuid4.hex>","nonce":"<rand64>",
       "data":{"version":"<CMD_VERSION>","id":"<CMD_ID>","name":"mute","type":1,
               "guild_id":"<GID>",   ← 沒這行就 10005
               "options":[{"type":3,"name":"who","value":"<TARGET>"}],"attachments":[]},
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

## 自動觸發 slash command（muteloop，方案 A 設計）

### 需求

- 每 65 秒觸發一次<BOT> /mute who:<TARGET>（配合 60s cooldown + 5s 緩衝）
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
        self.app.update_extra_line("muteloop: done")
        return
    if now - self.loop_last_sent >= self.loop_interval:
        self._send_mute_target()                # 重用 mute_target 的 send_interaction
        self.loop_last_sent = now

# 指令（on_execute_command 擴充）
# :muteloop            → toggle on/off（off 保留剩餘時間，重新 on 繼續）
# :muteloop 90         → toggle + 自訂 interval
# :muteloop 65 7200    → interval + duration 秒
```

### 使用

```
:muteloop          # 開跑（65s × 1h）；再打一次 = 停
:muteloop 65 1800  # 自訂 interval / duration
```

### 實戰驗證（2026-08-19 v0.3 重建版）

Extension 原始碼曾遺失，本節為依設計重建後實測通過的版本。

- 安裝位置：`~/Library/Application Support/endcord/Extensions/fix-interaction-guild-id/fix-interaction-guild-id.py`
- 載入確認：`grep -A1 'Loaded' ~/Library/Application Support/endcord/endcord.log` → `fix-interaction-guild-id 0.3.0 - OK`
- v0.3 重建版改動：target 寫死 guild `<GUILD_ID>` / channel `<TARGET_VOICE_CHANNEL_ID>`（目標語音頻道）— `:mute_target` 不受目前瀏覽頻道影響
- 實測結果：15s × 45s 測試版觸發 4 次到期自動停；65s × 3600s 正式版運作正常，log 每次送出記 `mute_target sent`；查次數 `grep -c 'mute_target sent' ~/Library/Application Support/endcord/endcord.log`
- `:mute_target` 送出成功在 extra line 顯示 `mute_target: sent`（extension 自製回饋，bot 的 ephemeral 回應走 gateway 正常送達）

### 為什麼選 extension 內建計時器（vs 外部迴圈）

- 不依賴 herdr pane 活著 / NORMAL mode / 按鍵注入（實測殘影、popup 卡住都會讓外部按鍵失效）
- 跑在主迴圈 = thread-safe，ephemeral 回應正常渲染
- 內建 duration 上限 + toggle，防止忘記關

### 風險備註

每 65s 一次 = 每小時 ~55 次 interaction，規律模式有觸發 Discord anti-spam filter 的理論風險（endcord FAQ 有警告）。已評估可接受。

## herdr 遙控 endcord（2026-08-19 實戰）

使用者自己的 endcord 跑在 herdr pane，直接遙控即可，不用另開 tmux session（兩個實例並行會互相搶 gateway 事件）。

### 基本操作

```bash
# 找 endcord pane：pane list + process-info 看 foreground_processes
herdr pane list
for p in <PANE_ID_A> <PANE_ID>; do herdr pane process-info --pane $p; done   # 找 name=endcord

# 讀畫面（--format text 純文字）
herdr pane read <PANE_ID> --source visible --lines 45 --format text

# 按鍵 / 打字
herdr pane send-keys <PANE_ID> ctrl+/     # 進 command mode（herdr 語法：ctrl+/，不是 C-/）
herdr pane send-keys <PANE_ID> Enter
herdr pane send-text <PANE_ID> 'muteloop 65 3600 '   # send-text 只打字不執行

# 重啟 pane 內 endcord（remember_state 會回到原頻道）
herdr pane send-keys <PANE_ID> C-c        # C-c 是單鍵所以 C- 語法 OK
herdr pane send-text <PANE_ID> 'endcord'; herdr pane send-keys <PANE_ID> Enter
```

### herdr vs tmux key 語法差異

- herdr 用長名：`ctrl+/`、`ctrl+d`；寫 `C-/` 會回 `invalid_key` 錯誤
- 單字母修飾鍵兩邊都通：`C-c`、`Enter`、`Escape`、`UP`
- `herdr pane send-text` 打 ASCII 安全；中文一樣會掉字（同 tmux 坑）

### Command assist 兩段式 Enter（巨坑）

command mode（`ctrl+/`）輸入指令後 assist 面板自動開啟，**Enter 是兩段式**（`insert_assist` 邏輯）：

1. 第一次 Enter → 插入指令名 + 空格進輸入行
2. 第二次 Enter → 才真正執行指令

**在 command mode 按 Esc 會把輸入行內容當成普通訊息發送到目前頻道** — 實測 `mute_target` 就這樣噴進當時瀏覽的頻道，還被頻道路人注意到。遙控時嚴禁用 Esc 退出 command mode。

### 誤發訊息快刪（REST，勿用 TUI）

TUI 刪除流程（`C-d` → Y/n 確認框）在遙控下 UP 選取不可靠、容易刪錯則。直接 REST：

```bash
TOKEN=$(security find-generic-password -s endcord -a profiles -w \
  | python3 -c "import json,sys; print(json.load(sys.stdin)['profiles'][0]['token'])")
# 自己的 uid 先查：curl -s -H "Authorization: $TOKEN" https://discord.com/api/v9/users/@me
MSG=$(curl -s -H "Authorization: $TOKEN" "https://discord.com/api/v9/channels/<CID>/messages?limit=20" \
  | python3 -c "import json,sys
for m in json.load(sys.stdin):
    if m['author']['id']=='<MY_UID>' and m['content'].strip()=='<TEXT>': print(m['id']); break")
curl -s -X DELETE -H "Authorization: $TOKEN" "https://discord.com/api/v9/channels/<CID>/messages/$MSG"
```

### 完整 loop 啟動/停止序列

```bash
# 啟動：ctrl+/ → 打指令 → Enter（插入）→ Enter（執行）
herdr pane send-keys <PANE_ID> ctrl+/; sleep 0.6
herdr pane send-text <PANE_ID> 'muteloop 65 3600 '; sleep 0.5
herdr pane send-keys <PANE_ID> Enter; sleep 1
herdr pane send-keys <PANE_ID> Enter; sleep 2
# extra line 應顯示：muteloop: on, every 65s, 3599s left

# 停止：同序列打 'muteloop '（toggle off）
# 驗證：grep -c 'mute_target sent' ~/Library/Application Support/endcord/endcord.log
```

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
| `/athena` parse 失敗（Invalid app command） | bot_name 必須是 app 全名（含中文如 `<BOT_APP_NAME>`） | 靠 assist 選取插入全名，不要手打 |
| 指令列出現雙空格（`athena␣␣mute`）→ parse 失敗 | assist 插入後又手動補空白 | `Alt+Enter` 插入後接續打的字自帶前導空白即可 |
| REST 送 interaction 204 但沒看到 ephemeral 回應 | 回應綁 gateway `session_id`，隨機 UUID 收不到 | 走 endcord 內（TUI 或 extension 用 `app.session_id`） |
| herdr send-text 打中文掉字 | 同 tmux 問題，多位元組被吃 | 純靠 assist 插入；或 `pbcopy`+`C-v`（在 INSERT 有效） |
| vim INSERT 下 Enter 不送出 | INSERT 的 Enter = 換行（`␤`） | 送出：`Esc` 回 NORMAL → `Enter` |
| voice channel 上按 `Space`（vim tree） | 直接觸發「加入語音」不是開聊天 | 語音頻道沒有文字聊天；Esc 不一定能取消，用 `:voice_leave_call` |
| 輸入列殘留幽靈文字（如 `:_target`）刪不掉 | slash command 狀態的 rendering glitch | `:redraw` 指令修復 |
| log 裡有 traceback（mouse_events ValueError） | endcord 1.5.3 背景_thread bug，不影響 TUI | 忽略；TUI 仍可操作 |
