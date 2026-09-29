# MQTT 名詞表

> 搭配 `beginner-guide.md`（詳解）與 `note.md`（實跑）。條目按學習順序排列。

---

## 基礎

**MQTT**（MQ Telemetry Transport）
輕量 pub/sub 訊息協定，1999 年 IBM 為石油管線監控設計。IoT 上雲事實標準。版本 3.1.1 與 5。

**Broker**（代理人）
訊息中轉站。所有訊息經它轉發，publisher 和 subscriber 互不認識、不直連。Mosquitto、EMQX、AWS IoT Core 都是。

**Publisher / Subscriber**
發布者（送訊息到 topic）/ 訂閱者（訂 topic 收訊息）。同一支程式可以同時扮演兩者。

**Payload**
訊息本體，就是一段 bytes。MQTT 不解讀內容，格式自己約定（常見 JSON）。

**Keep Alive**
心跳間隔（秒）。client 超過 1.5 倍間隔沒送任何封包，broker 判定斷線。背景 loop 自動處理。

## Topic

**Topic**
訊息的地址，`/` 分層字串，如 `factory/line1/motor2/temp`。

**`+` 萬用字元**
單層。`factory/+/motor2/temp` 匹配 line1、line2…。只有訂閱能用，publish 不行。

**`#` 萬用字元**
多層，只能放最後。`factory/#` 匹配 factory 下全部。

**`$` 開頭 topic**
系統保留（如 `$SYS/`），broker 自用，別拿來發布。

## QoS（Quality of Service）

**QoS**
訊息的保證等級：允許丟、允許重複、還是必須剛好一次。保證越強封包越多越慢，是權衡不是免費午餐。

**QoS 0 — At most once**（最多一次）
發出去就算，掉了不管。像平信。適合：高頻 sensor 數據，掉一筆沒差。

**QoS 1 — At least once**（至少一次）
沒收到 PUBACK 就重發，一定到、但可能重複。適合：多數場景，只要操作可重複（冪等）。

**QoS 2 — Exactly once**（恰好一次）
四向握手，不丟不重複。代價最大。適合：重複有害的（計費、下單）。

**QoS 1 會重複的原理**
PUBACK 掉封包：broker 已收到處理，但 ACK 沒回到 sender，sender 只能重發，broker 又處理一次。sender 分不清「訊息沒到」還是「ACK 沒回來」。

**QoS 2 四向握手**
`PUBLISH → PUBREC → PUBREL → PUBCOMP`。前兩步確保「到達」，後兩步確保「釋放」。靠 Packet ID 狀態表擋重複。

**有效 QoS = min(publish QoS, subscribe QoS)**
QoS 逐段協商，不是端到端。訂閱時宣告的 QoS 是上限，只降不升。publish QoS 2、訂閱 QoS 0，最後那段就是 0。

## 可靠性機制

**Packet ID**
QoS 1/2 訊息的 16-bit 流水號，追蹤「這筆確認了沒」。QoS 0 不用。

**DUP flag**
重發標記。QoS 1/2 訊息重發時設 1，告訴對方「這筆我送過了」。

**In-flight window**
已送出、還沒確認的訊息暫存區。滿了就阻塞。broker 端 `max_inflight_messages`、MQTT 5 用 Receive Maximum 協商。

**Retained Message**（保留訊息）
publish 帶 `retain=True`，broker 記住該 topic 最後一筆，新訂閱者一連線立刻收到。適合「最新狀態」。清掉：發一筆空 payload 的 retained。

**LWT / Last Will**（遺言）
連線時預先註冊的訊息，client **異常**斷線（沒走 disconnect）時 broker 代發。經典用法：`status` 遺言 `offline`、上線自己發 `online`。正常 `disconnect()` 不觸發。

**Will Delay Interval**（MQTT 5）
遺言延遲 N 秒才發。網路閃斷快速重連就不誤報 offline。

**Session / Clean Session**
斷線後 broker 要不要記住你。`clean=True` 全忘；`clean=False` 記住訂閱和 QoS 1/2 待補訊息，重連補發 = 離線收訊。MQTT 5 改為 `clean start` + `session expiry interval`。

## 握手封包

| 封包 | 方向 | 意義 |
|------|------|------|
| PUBLISH | 發訊息 | 本體 |
| PUBACK | 回 | QoS 1「收到了」 |
| PUBREC | 回 | QoS 2「我收到了」 |
| PUBREL | 去 | QoS 2「可以完成了」 |
| PUBCOMP | 回 | QoS 2「完成」 |

## MQTT 5

**Reason Code**
ACK 帶失敗原因（0x87 Not Authorized、0x97 Quota Exceeded）。3.1.1 只會默默逾時。

**Properties / User Property**
封包可帶 key-value 中繼資料，等於 HTTP header。

**Topic Alias**
長 topic 註冊成短整數 alias，之後只送整數省頻寬。

**Receive Maximum**
雙向協商 in-flight 上限，flow control。

**Shared Subscription**
`$share/g1/demo/#`：同 group 的多個 subscriber 輪流收。負載平衡、工作佇列模式。

**Message Expiry**
排隊訊息可設到期時間，過期即丟。

## 生態

**Mosquitto**
開源單機 broker，C 寫的。開發/小規模首選。附 `mosquitto_pub` / `mosquitto_sub` CLI。

**EMQX**
開源核心可叢集的 broker（Erlang），百萬級連線、dashboard、rule engine。自架中大規模首選。

**AWS IoT Core**
AWS 的雲端代管 MQTT 服務。強制 mTLS（X.509）、沒有 QoS 2、訊息上限 128 KB、權限用 JSON policy 管到 topic 級。

**Device Shadow**
AWS 的數位分身。`$aws/things/<thing>/shadow/` 存 desired/reported 狀態 JSON，裝置離線照樣寫 desired、上線讀回補執行。

**paho-mqtt**
Eclipse Paho 的 Python client，事實標準。2.x 必須傳 `callback_api_version=CallbackAPIVersion.VERSION2`。

**MQTTX**
跨平台 GUI client，探索測試用。等於 OPC UA 界的 UaExpert。
