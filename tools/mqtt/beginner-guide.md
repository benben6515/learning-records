# MQTT 入門筆記（以 paho-mqtt 為例）

> 來源：[eclipse-paho/paho.mqtt.python](https://github.com/eclipse-paho/paho.mqtt.python)（GitHub / PyPI 套件名 `paho-mqtt`）
> 分類：IoT Communication / Python
> 姊妹篇：[OPC UA 入門筆記](../opcua/beginner-guide.md)

---

## 一、MQTT 是什麼

MQ Telemetry Transport。輕量 pub/sub 訊息協定，1999 年 IBM 為石油管線監控設計，目標：低頻寬、不穩定網路、低運算力設備都能用。現在是 IoT 上雲的事實標準：AWS IoT Core、Azure IoT Hub、阿里雲、EMQX 全都講 MQTT。

**跟 OPC UA 核心差異**：

| | MQTT | OPC UA |
|---|------|--------|
| 架構 | Pub/Sub，經 Broker 中轉 | Client/Server 直連 |
| 語意 | 無。Topic + 原始 payload（自己約定，常 JSON） | 豐富。節點帶型別、單位、結構 |
| 資料發現 | 沒有。要先知道 topic | Browse address space |
| 重量 | 極輕，header 最小 2 bytes | 重，完整 stack |
| 適合 | 設備對雲、大量 sensor、手機推播 | 設備對 SCADA/MES、廠內 |

常見組合：廠內 OPC UA，出閘道器轉 MQTT 上雲。互補，不是競爭。

協定版本：MQTT 3.1.1（最普及）與 MQTT 5（2019 標準化，見第四節）。paho-mqtt 預設講 3.1.1，要 5 要明確指定。

---

## 二、核心概念

### 1. Broker（代理人）

所有訊息經 broker 中轉。Publisher 和 Subscriber 永遠不直接連線、互不知道對方存在。

常見 broker：

- **Mosquitto**：開源、C 寫的、單機。開發/小規模首選
- **EMQX**：開源核心（Erlang）、可叢集、百萬級連線、附 dashboard 與 rule engine
- **HiveMQ**：商用、Java
- **AWS IoT Core / Azure IoT Hub**：雲端代管服務

### 2. Topic

UTF-8 字串，`/` 分層：`factory/line1/motor2/temp`。

萬用字元（只有 **訂閱端** 能用，publish 不行）：

- `+`：單層。`factory/+/motor2/temp` 匹配 line1、line2…（`+` 本身也算一層）
- `#`：多層，只能放最後。`factory/#` 匹配 factory 下所有層級

系統 topic 以 `$` 開頭（如 `$SYS/`），broker 自用，別拿來發布。

### 3. QoS（服務品質）

| 等級 | 保證 | 機制 |
|------|------|------|
| 0 | 最多一次（可丟） | 發了就算 |
| 1 | 至少一次（可重複） | PUBLISH → PUBACK，沒收到就重發（DUP flag） |
| 2 | 恰好一次 | 四向握手，最慢 |

握手細節見第三節。

### 4. Retained Message（保留訊息）

publish 時帶 `retain=True`，broker 就把該 topic 的**最後一筆**訊息存起來。任何新 subscriber 一連線，立刻收到這筆。適合「最新狀態」：目前溫度、開關位置。

清掉 retained：對同 topic 發一筆 **空 payload** 的 retained 訊息。

### 5. Last Will（遺言，LWT）

連線時先向 broker 註冊「如果我**異常**斷線（沒走 disconnect），幫我發這則訊息」。broker 靠 keepalive 逾時偵測，逾時就代發遺言。

經典模式：

- `device1/status` 註冊遺言 `offline`（retain）
- 連線成功後自己發 `online`（retain）
- 別人訂 `device1/status` 就知道死活

注意：正常呼叫 disconnect 不觸發遺言。

### 6. Keep Alive

心跳間隔（秒）。client 超過 1.5 倍間隔沒送出任何封包，broker 判定斷線、觸發 LWT。paho 的 background loop 會自動 ping。

### 7. Session

- `clean session = True`：斷線即丟訂閱與未送訊息
- `clean session = False`：broker 記住訂閱與 QoS 1/2 待補訊息，重連補發。**離線收訊**靠這個

---

## 三、QoS 握手細節

### QoS 1：至少一次

```
Publisher                Broker                Subscriber
   |--- PUBLISH (pktid) -->|                         |
   |<------- PUBACK -------|                         |
   |                        |--- PUBLISH (pktid) --->|
   |                        |<------- PUBACK --------|
```

- 送方逾時沒收到 PUBACK → 重發，DUP flag = 1
- **重複的來源**：PUBACK 在路上掉了，broker 其實已收到並處理，重發就造成重複。所以是「至少一次」
- 未確認的訊息靠 16-bit **Packet ID** 追蹤，存在 in-flight window。window 滿 → 阻塞（broker 端參數 `max_inflight_messages`，paho 端也有對應設定）

### QoS 2：恰好一次（四向握手）

```
Publisher                Broker
   |--- PUBLISH (pktid) --->|
   |<------- PUBREC ---------|     ← 「我收到了」
   |------- PUBREL --------->|     ← 「可以完成了」
   |<------- PUBCOMP ---------|    ← 「完成」
```

- 前兩步：確保「到達」，broker 記下 pktid 狀態
- 後兩步：確保「釋放」，狀態解除
- 重複的 PUBLISH 靠 pktid 狀態表擋掉 → 不重複也不遺失
- 代價：4 個封包 + 兩端狀態。只用於重複有害的場景（計費、控制指令）

### 關鍵：QoS 是逐段的，不是端到端

publisher→broker 的 QoS 1 **不會**自動讓 broker→subscriber 也 QoS 1。生效值：

```
effective QoS = min(publish QoS, subscribe QoS)
```

訂閱時宣告的 QoS 是「我最多接受到這等級」，只降不升。要端到端可靠，兩段都要設。

---

## 四、MQTT 5 新功能（相對 3.1.1）

| 功能 | 說明 |
|------|------|
| **Reason Code** | ACK 帶失敗原因（0x87 Not Authorized、0x97 Quota Exceeded）。3.1.1 只會默默逾時 |
| **Properties** | 每種封包都可帶 key-value 中繼資料，含自訂 User Property（等於 HTTP header） |
| **Topic Alias** | 長 topic 送一次註冊成短整數 alias，之後只送 alias，省頻寬 |
| **Enhanced Auth** | AUTH 封包多步質詢/回應（類 SASL），不只帳密和客戶端憑證 |
| **Session 改制** | `clean start`（連線當下）+ `session expiry interval`（狀態存多久），取代一顆 clean session 旗標 |
| **Receive Maximum** | 雙向協商 in-flight 上限（flow control），慢消費者不會拖爆 broker |
| **Message Expiry** | 排隊中的訊息可設到期時間，過期即丟 |
| **Shared Subscription** | `$share/g1/demo/#`：同 group 的多個 subscriber **輪流**收 → 負載平衡、工作佇列模式 |
| **Will Delay Interval** | 遺言延遲 N 秒才發。網路閃斷快速重連就不會誤報 offline |
| **Payload Format / Content Type** | 宣告 payload 是 JSON、utf-8 等 |

實務：broker 幾乎都支援 5 了，新專案直接用 5。paho 建立連線時指定 `MQTTv5`，回呼簽名也跟 3.1.1 不同（多 `properties` 參數）。

---

## 五、Broker 生態：Mosquitto / EMQX / AWS IoT Core

### Mosquitto

- `brew install mosquitto`，conf 在 `/opt/homebrew/etc/mosquitto.conf`
- 預設只聽 localhost:1883（安全預設，要對外自己改 conf）
- 附 `mosquitto_pub` / `mosquitto_sub` CLI，探索測試神器
- 單機、無叢集（只有 bridge 橋接）。小規模夠用

### EMQX

- Erlang 寫的，主打通聯規模（官方稱單叢集億級連線）
- 開源核心 Apache 2.0 + 企業版。中國公司，國內用得多
- Dashboard：`http://localhost:18083`（預設 admin/public），看連線、topic、流量
- Rule Engine：SQL 語法篩訊息 → 轉發 Kafka / DB / HTTP / 另一個 MQTT
- 快速起：`docker run -d -p 1883:1883 -p 18083:18083 emqx/emqx`
- 支援叢集、MQTT 5、shared subscription

### AWS IoT Core

雲端代管，不是自己裝的 broker。特點：

- **一律 mTLS**：裝置必須 X.509 憑證，port 8883，沒有明文選項
- **Thing**：裝置在雲上的身分註冊
- **IoT Policy**：JSON 文件掛在憑證上，管 topic 級 ACL（`iot:Connect` / `iot:Publish` / `iot:Subscribe` / `iot:Receive`）
- **不支援 QoS 2**，只有 0/1。踩雷熱點
- 訊息上限 **128 KB**
- **Device Shadow**：`$aws/things/<thing>/shadow/...` 保留 topic，一份 desired/reported 狀態 JSON（digital twin），離線裝置也能讀寫目標狀態
- **Rules Engine**：`SELECT * FROM 'factory/#'` → 轉 S3 / DynamoDB / Lambda / Kinesis
- Shared subscription 支援

選型：本機開發/小專案 Mosquitto；自架中大規模 EMQX；全家桶在 AWS 就 IoT Core。

---

## 六、paho-mqtt 這個套件

Eclipse Paho 專案的 Python 實作，MQTT 界的 asyncua——事實標準 client。

```
paho.mqtt.client     # 核心 Client
paho.mqtt.enums      # CallbackAPIVersion 等
paho.mqtt.properties # MQTT 5 properties
paho.mqtt.subscribe / publish  # one-liner helper
```

四大角色：

- `Client`：連線、publish、subscribe
- 回呼：`on_connect` / `on_disconnect` / `on_message` / `on_subscribe`
- `loop_start()`（背景 thread）或 `loop_forever()`（阻塞）驅動網路事件
- QoS、retain、LWT 全支援

**2.x API break**：必須明確傳 `callback_api_version=CallbackAPIVersion.VERSION2`，不傳會 DeprecationWarning（之後直接炸）。網上舊教學幾乎全是 v1 寫法。v2 回呼簽名也變（`on_connect` 多 `properties`，reason code 變 ReasonCode 物件）。

要 asyncio：用 `aiomqtt` 或 `gmqtt`（兩者都是 async 優先的 MQTT client），paho 本體以 thread 為主。

---

## 七、安裝與範例

```bash
brew install mosquitto          # broker
uv venv .venv
uv pip install --python .venv/bin/python paho-mqtt
```

### Publisher（= `pub-minimal.py`）

```python
import json
import time
import paho.mqtt.client as mqtt
from paho.mqtt.enums import CallbackAPIVersion

TOPIC_TEMP = "demo/sensor/temp"
TOPIC_STATUS = "demo/sensor/status"

client = mqtt.Client(
    callback_api_version=CallbackAPIVersion.VERSION2,  # 2.x 必要
    client_id="pub-minimal",
)
# LWT：異常斷線時 broker 代發 offline（retain，讓新訂閱者也看得到）
client.will_set(TOPIC_STATUS, "offline", qos=1, retain=True)
client.connect("localhost", 1883, keepalive=30)
client.loop_start()

client.publish(TOPIC_STATUS, "online", qos=1, retain=True)

temp = 20.0
try:
    while True:
        temp += 0.1
        payload = json.dumps({"temp": round(temp, 1), "unit": "C"})
        info = client.publish(TOPIC_TEMP, payload, qos=1, retain=True)
        info.wait_for_publish()  # 等 broker PUBACK（教學用，實務可省）
        time.sleep(2)
except KeyboardInterrupt:
    client.publish(TOPIC_STATUS, "offline", qos=1, retain=True)  # 正常下線自己說
    client.loop_stop()
    client.disconnect()
```

### Subscriber（= `sub-minimal.py`）

```python
import paho.mqtt.client as mqtt
from paho.mqtt.enums import CallbackAPIVersion

def on_connect(client, userdata, flags, reason_code, properties):
    print("connected:", reason_code)
    client.subscribe("demo/#", qos=1)

def on_message(client, userdata, message):
    flag = " [retained]" if message.retained else ""
    print(f"{message.topic} (qos={message.qos}){flag}: {message.payload.decode()}")

client = mqtt.Client(
    callback_api_version=CallbackAPIVersion.VERSION2,
    client_id="sub-minimal",
)
client.on_connect = on_connect   # 回呼要在 connect 前掛好
client.on_message = on_message
client.connect("localhost", 1883, keepalive=30)
client.loop_forever()
```

`message.retained == True` 代表這筆是 broker 補發的舊 retained 訊息，不是新鮮資料。

---

## 八、CLI 工具（快速探索用）

```bash
# 看所有 demo 訊息（-v 顯示 topic）
mosquitto_sub -t 'demo/#' -v

# 只看新訊息，跳過 retained 補發
mosquitto_sub -t 'demo/#' -v -R

# 手動發一筆
mosquitto_pub -t demo/sensor/temp -m '{"temp": 99.9, "unit": "C"}'

# 發 retained
mosquitto_pub -t demo/sensor/temp -m '{"temp": 0.0}' -r
```

topic 一定要用引號包起來——`#` `+` 是 shell 特殊字元。

GUI 可用 [MQTTX](https://mqttx.app/（跨平台 client，等於 OPC UA 界的 UaExpert）。

---

## 九、學習路徑

1. 起 mosquitto，跑 `pub-minimal.py` + `sub-minimal.py`，看訊息流
2. Ctrl+C 殺 subscriber 再重開 → 立刻收到 retained 舊值，體會 retain
3. `kill -9` 殺 publisher（模擬異常斷線）→ subscriber 收到 `status = offline` 遺言；正常 Ctrl+C 則收到自己發的 offline
4. 用 `mosquitto_sub -t 'demo/#' -v` 當第三隻眼睛
5. 進階：shared subscription（開兩個 sub 看輪流收）、clean session=False 離線補發、MQTT 5 properties
6. 再進階：EMQX dashboard、AWS IoT Core mTLS + Shadow

## 十、注意事項

- paho-mqtt 2.x：`callback_api_version` 必傳；舊教學碼照抄會炸
- 回呼（`on_connect`/`on_message`）要在 `connect()` **之前**掛，否則漏事件
- QoS 是逐段的：publish QoS 1 ≠ 端到端 QoS 1，取決於訂閱端宣告
- QoS 1 天然可能重複（PUBACK 掉封包），消費端要能容忍或去重
- `kill -9` 不觸發 disconnect，但**會**觸發 LWT；正常 `disconnect()` 不觸發 LWT
- AWS IoT Core 沒有 QoS 2；訊息上限 128 KB
- mosquitto 預設只聽 localhost，對外要改 conf（且記得開認證，別裸奔 1883）
