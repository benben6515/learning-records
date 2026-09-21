# OPC UA 實跑筆記

> 搭配 `beginner-guide.md`（概念）與 `server-minimal.py` / `client-minimal.py`（程式）。
> 本文記錄實際動手跑的完整流程，需要兩個終端機視窗：一個跑 server，一個跑 client。

## 步驟 1：進目錄、建環境（只做一次）

```bash
cd /Users/benbenweng/Documents/learning-records/tools/opcua
uv venv .venv
uv pip install --python .venv/bin/python asyncua
```

- `uv venv .venv` 建獨立虛擬環境，不污染系統 Python
- 安裝 `asyncua` 套件（OPC UA client + server，本次實測版本 2.0.1）

之後每天跑只要 `cd` 進目錄即可，不用重裝。

## 步驟 2：終端機 A 跑 server

```bash
.venv/bin/python server-minimal.py
```

看到這行代表成功：

```
server running on opc.tcp://0.0.0.0:4840/freeopcua/server/
```

server 做三件事：

1. 開 port 4840 待命
2. 建 `MyObject` 底下的 `MyVariable`（初始 6.7），之後每秒 +0.1
3. 掛一個 method `ServerMethod`，輸入什麼就乘 2 回傳

這個視窗不要關，server 要一直活著。`Ctrl+C` 才會停。

## 步驟 3：終端機 B 跑 client

```bash
.venv/bin/python client-minimal.py
```

預期輸出：

```
Requested session timeout ...      ← 正常，server 只給 10 分鐘
read: 7.4                          ← 讀 MyVariable
after write: 42.0                  ← 寫入 42.0 再讀回
method call ServerMethod(5) = 10   ← 呼叫 method，5 乘 2
datachange: ns=2;i=2 = 42.0        ← 訂閱推播開始
datachange: ns=2;i=2 = 42.1        ← server 每秒 +0.1，主動推
datachange: ns=2;i=2 = 42.2
...（5 秒後結束）
```

注意：client 沒有輪詢。值變化是 server 主動推的，這就是 Subscription。

## 步驟 4：用 CLI 工具探索（optional）

server 還在跑時，任一終端機：

```bash
# 列 node 樹（像 ls），-d 2 往下兩層
.venv/bin/uals -u opc.tcp://localhost:4840/freeopcua/server/ -d 2

# 讀單一值
.venv/bin/uaread -u opc.tcp://localhost:4840/freeopcua/server/ -n "ns=2;i=2"

# 看即時推播（Ctrl+C 結束）
.venv/bin/uasubscribe -u opc.tcp://localhost:4840/freeopcua/server/ -n "ns=2;i=2"
```

`uals` 輸出會看到 `MyObject`（ns=2;i=1）、`ServerMethod`（ns=2;s=ServerMethod）。

## 步驟 5：收工

兩個視窗各按 `Ctrl+C`，server 停，port 4840 釋放。

卡住時清殘留行程：

```bash
pkill -f server-minimal.py
```

## 常見坑

| 症狀 | 原因 |
|------|------|
| client 卡住後 `BadConnectionClosed` | server 沒開，或 port 4840 被之前的行程占住。`pkill -f server-minimal.py` 清乾淨重開 |
| `BadTypeMismatch` | 寫入型別跟現值不一致。初始 6.7 的 Float 變數要寫 `42.0` 不是 `42` |
| `uals` 只列一層 | 沒加 `-d 2` |
| `Requested session timeout to be 3600000ms, got 600000ms` | 正常訊息，不是錯誤。server 把 session 上限壓到 10 分鐘 |
