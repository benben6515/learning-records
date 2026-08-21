# slk + Slack REST API 操作技能（xoxc/xoxd cookie 認證）

> 實戰累積的踩坑與解析筆記。前置知識見 [slk.md](slk.md)（TUI 使用教學）。
> 適用情境：agent 或腳本直接讀寫 Slack，不建 Slack App、不用 admin 權限。

## 認證模型（單一真實來源）

```
Token 檔：~/.local/share/slk/tokens/TXXXXXXXXXX.json   (0600)
├── access_token → xoxc-...   （Bearer header）
└── cookie         → xoxd-... （URL-encoded，原樣使用，組成 Cookie: d=<值>）
```

REST 呼叫兩個 header：

```python
AUTH   = "Bearer xoxc-..."          # json["access_token"]
COOKIE = "d=xoxd-..."               # "d=" + json["cookie"]
```

- `xoxd` 內含 `%2B` 等 URL encoding 是**正常的**，不要解碼
- Cookie 登出即失效（TUI、MCP、REST 全一起死）→ 重新從瀏覽器取：
  `xoxc` 在 localStorage `localConfig_v2`，`d` 是 slack.com 的 cookie

## 踩過的坑

### 1. token JSON 的 `cookie` 欄位多帶 `d=` 前綴 → 整個 slk 空白

- 慢性中毒型 bug：REST 手測都會過（自己組 header），但 slk 內部 cookie jar
  直接 `Value: dCookie`，帶前綴變 `d=d=xoxd-...` → auth 全失敗
- 症狀：sidebar "No channels"、狀態列卡 `● Connecting`
- **`cookie` 欄位永遠填純值 `xoxd-...`**

### 2. rtk 包 curl 大回應會截斷 JSON

- `rtk curl ... | python3 -c json.load` → `JSONDecodeError: Invalid control character`
- rtk 為省 token 會過濾輸出，超過一定大小的 JSON就被破壞
- **解法：Slack REST 一律走純 Python `urllib.request`**，不經 rtk、不落檔：

```python
import json, urllib.request
def api(url):
    req = urllib.request.Request(url, headers={"Authorization": AUTH, "Cookie": COOKIE})
    return json.load(urllib.request.urlopen(req))
```

### 3. slk 安裝（v0.15.0，macOS arm64）

- installer `getslk.sh` 要 sudo → 手動裝：release asset 命名是
  **小寫底線** `slk_0.15.0_darwin_arm64.tar.gz`（不是 goreleaser 預設的
  `slk_Darwin_arm64.tar.gz`）
- 解壓後放 `/opt/homebrew/bin/slk`

### 4. Herdr 控制 slk pane

- 讀畫面：`herdr pane read wA:pK --source visible`（**沒有** `--screen` 選項）
- 重啟 TUI：`herdr pane send-keys wA:pK Q` → `herdr pane run wA:pK slk`
- 逐鍵操作見下方「用 Herdr 遙控 slk 發訊息」

### 5. sidebar 圖標語意（讀源碼 `internal/ui/sidebar/model.go` 證實）

| 圖標      | 意義                            |
| --------- | ------------------------------- |
| `#`       | 公開頻道                        |
| `◆`       | 私有頻道                        |
| `▣`       | **App/bot 的 DM**（不是頻道！） |
| `●` / `○` | DM（線上/離線）                 |

「上下班打卡」「請假申請」這類 `▣` 項目 = Workflow Builder app 的 DM，
用 conversations.list 找不到，要走 im 類型查。

## REST API 速查

### 列頻道（types 分開查，一次查不全）

```python
# public+private：
api(".../conversations.list?types=private_channel,public_channel&limit=200" + cursor 翻頁)
# 群組 DM：types=mpim        → 回傳在 groups[]
# 一對一 DM：types=im        → 回傳在 channels[]，欄位 user = 對象 user_id
```

翻頁：`response_metadata.next_cursor`，空字串結束。

### bot DM 反查（`▣` 項目 → 對話 ID）

```python
for im in api(".../conversations.list?types=im")["channels"]:
    u = api(f".../users.info?user={im['user']}")["user"]
    # u["real_name"] 是顯示名稱（如 "上下班打卡 Punch in and out"）
    # Workflow Builder bot 的 name 前綴是 wf_bot_
```

### 讀訊息

```python
api(f".../conversations.history?channel={ch}&limit=100")
# 往更舊翻頁：&oldest={最後一則 ts}（注意方向：oldest 是游標不是過濾）
```

### Permalink 反解（重要技巧）

`https://<workspace>.slack.com/archives/DXXXXXXXXXX/p1784705289473959`
→ channel = `DXXXXXXXXXX`，ts = `1784705289.473959`（p 後每 6 位補一個點）
→ 精準抓單則：

```python
api(f".../conversations.history?channel={ch}&latest={ts}&oldest={ts}&inclusive=true")
```

### Slack Lists（內部 API，未文件化）

List URL `…/lists/{team}/{list_id}?record_id={rec}` 反解：

```python
api(f"https://slack.com/api/lists.records.info?list_id={list_id}&id={rec}")
# 注意參數是 id（不是 record_id/item_id），其他組合都會噴 invalid_arguments
```

- 回傳 `list.title`、`list.list_metadata.schema`（欄位定義 + select choices 對照表）、`record.fields[]`
- 欄位值解碼：`field["text"]`（rich_text 已展平）、select 值要拿 `value` 去 schema choices 換 label、user 欄位是 user_id 要再查 `users.info`
- 一般 channel/message 的 API 對 Lists 全部 `unknown_method`，只有這條路

### 發訊息

```python
data = json.dumps({"channel": ch, "text": text}).encode()
req = urllib.request.Request(".../chat.postMessage", data=data, headers={
    "Authorization": AUTH, "Cookie": COOKIE,
    "Content-Type": "application/json; charset=utf-8"})
# 回應 .ok == true 才算成功，失敗看 .error（not_authed = token/cookie 過期）
```

## Workflow Builder 解析（打卡系統實戰）

「上下班打卡」流程全貌（從訊息證據還原）：

1. **上班**：捷徑選單（閃電）→ modal 表單（工作事項+地點）→ 送出
   - app DM（`DXXXXXXXXXX`）收到「打卡完成」+ **下班按鈕**
     （attachments→blocks→actions→button，`action_id` 是 UUID）
   - 同步公告到 `#punch-channel`（`CXXXXXXXXXX`）
2. **下班**：點 DM 裡那顆按鈕 → 完成訊息 + "clicked _下班卡_"

關鍵 ID 都在訊息 JSON 裡：`app_id` / `workflow_id` / `trigger_id` / `bot_id`。
辨識技巧：**bot name 前綴 `wf_bot_` = Workflow Builder 專屬 bot**。

### slk 能否觸發 workflow？

| 觸發方式                       | slk                                               |
| ------------------------------ | ------------------------------------------------- |
| emoji reaction 觸發的 workflow | ✅ `r`/`R` 反 emoji 即可                          |
| 捷徑 modal 表單（打卡上班）    | ❌ 無 shortcuts 無 modal                          |
| 訊息按鈕（打卡下班）           | ❌ 按鈕渲染成灰色標籤（源碼明寫 non-interactive） |

按鈕理論上可逆向瀏覽器 DevTools Network 錄到的內部端點重現，但屬
未文件化 API，脆弱且有 TOS 風險，目前不做。

## 用 Herdr 遙控 slk 發訊息（實測流程）

```bash
herdr pane send-keys wA:pK ctrl+t        # 開 fuzzy finder
herdr pane send-text wA:pK "test-channel" # 打頻道名
herdr pane send-keys wA:pK enter         # 進頻道
herdr pane send-keys wA:pK i             # insert mode
herdr pane send-text wA:pK "hi"          # 打字
herdr pane send-keys wA:pK enter         # 送出
herdr pane send-keys wA:pK esc           # 回 normal（之後 G 跳最新驗證）
herdr pane read wA:pK --source visible   # 讀畫面驗證
```

## 相關基礎設施

- **slack-mcp-server**（opencode.json 的 `slack` MCP）：同一組 token，
  給 agent 用的高階工具
