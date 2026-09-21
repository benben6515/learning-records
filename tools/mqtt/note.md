# MQTT 實跑筆記

> 搭配 `beginner-guide.md`（概念）與 `pub-minimal.py` / `sub-minimal.py`（程式）。
> 本文記錄實際動手跑的完整流程，需要三個終端機視窗：broker、publisher、subscriber。

## 步驟 1：裝 broker 與環境（只做一次）

```bash
brew install mosquitto

cd /Users/benbenweng/Documents/learning-records/tools/mqtt
uv venv .venv
uv pip install --python .venv/bin/python paho-mqtt
```

- `mosquitto` = broker（訊息中轉站）
- `paho-mqtt` = Python client（本次實測版本 2.x）

之後每天跑只要 `cd` 進目錄，broker 不用重裝。

## 步驟 2：終端機 A 起 broker

```bash
mosquitto -c /opt/homebrew/etc/mosquitto.conf
```

看到這行代表成功：

```
1727xxxxx: mosquitto version 2.x.x running
```

預設只聽 localhost:1883。這個視窗不要關，`Ctrl+C` 停 broker。

若用 `brew services start mosquitto` 背景跑，就不需要終端機 A，停用用 `brew services stop mosquitto`。**擇一**，兩個同時開會 port 衝突。

## 步驟 3：終端機 B 跑 subscriber

```bash
.venv/bin/python sub-minimal.py
```

預期輸出：

```
connected: Success
```

之後安靜等訊息。先跑 subscriber 再跑 publisher，才能看到完整的 publish 流。

## 步驟 4：終端機 C 跑 publisher

```bash
.venv/bin/python pub-minimal.py
```

B 的預期輸出：

```
demo/sensor/status (qos=1): online
demo/sensor/temp (qos=1): {"temp": 20.1, "unit": "C"}
demo/sensor/temp (qos=1): {"temp": 20.2, "unit": "C"}
...（每 2 秒一筆）
```

publisher 做的事：

1. 連線後發 `status = online`（retained，之後的新訂閱者立刻看得到）
2. 每 2 秒發一筆 JSON 溫度到 `demo/sensor/temp`（QoS 1 + retained）
3. 註冊了遺言：異常斷線時 broker 代發 `status = offline`

## 步驟 5：玩三個實驗

### 實驗 1：retained

Ctrl+C 殺掉 subscriber，再重跑。**一連線立刻收到** `demo/sensor/temp ... [retained]`——那是 broker 補發的舊值，不是新資料。`message.retained == True` 就是這個意思。

### 實驗 2：LWT 遺言

在 publisher 視窗 `kill -9 <pid>`（暴力殺 = 沒走 disconnect）。約 30–45 秒後（keepalive 逾時）subscriber 收到：

```
demo/sensor/status (qos=1): offline
```

對照組：正常 `Ctrl+C` publisher，它會自己發 offline 然後乾淨離線，幾乎立刻收到。

### 實驗 3：第三隻眼睛

再開一個終端機：

```bash
mosquitto_sub -t 'demo/#' -v
```

topic 要引號包起來（`#` 是 shell 特殊字元）。加 `-R` 可跳過 retained 補發。

## 步驟 6：收工

各視窗 `Ctrl+C`。broker 若在終端機 A 跑就 `Ctrl+C`；若用 brew services 就 `brew services stop mosquitto`。

卡住時清殘留：

```bash
pkill mosquitto
lsof -i :1883   # 確認 port 釋放
```

## 常見坑

| 症狀 | 原因 |
|------|------|
| DeprecationWarning 或回呼行為怪 | paho 2.x 必須 `callback_api_version=CallbackAPIVersion.VERSION2`。網上舊教學都是 v1 寫法 |
| `OSError: Address already in use` port 1883 | brew services 和手動 `mosquitto` 同時在跑。`brew services stop mosquitto` 或 `pkill mosquitto` 清一邊 |
| 新 subscriber 冒出一筆舊資料 | retained message，正常行為。`message.retained` 可辨識，CLI 加 `-R` 跳過 |
| 重連後同一筆訊息出現兩次 | QoS 1 = at least once，PUBACK 掉了就重發。消費端要能去重 |
| `on_message` 沒被呼叫 | 回呼在 `connect()` 之後才掛，漏掉事件。回呼一律先掛再連 |
| `mosquitto_sub` 沒輸出 | topic 沒引號被 shell 吃掉，或 broker 根本沒起來。`lsof -i :1883` 先查 |
| 想發 QoS 2 給 AWS IoT Core | 不支援。AWS IoT 只有 QoS 0/1 |
