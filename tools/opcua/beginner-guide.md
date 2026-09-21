# OPC UA 入門筆記（以 opcua-asyncio 為例）

> 來源：[FreeOpcUa/opcua-asyncio](https://github.com/FreeOpcUa/opcua-asyncio)（GitHub / PyPI 套件名 `asyncua`）
> 分類：Industrial Communication / Python

---

## 一、OPC UA 是什麼

OPC UA（Open Platform Communications Unified Architecture，標準號 IEC 62541）是工業通訊協定，用於 PLC、感測器、SCADA、MES 之間互傳資料。是工廠自動化的主流標準，用來取代舊的 OPC Classic（綁 COM/DCOM、只能跑 Windows）。

特點：

- **Client-Server 架構**：Server（PLC、設備）暴露資料；Client（監控系統、資料收集器）讀寫。
- 走 `opc.tcp://`，預設 port 4840。
- 內建加密、簽章、憑證（X.509）。
- 平台無關：Python、C#、Java、C 都有實作。

---

## 二、核心概念

讀範例之前，先弄懂五個名詞：

### 1. Address Space（位址空間）

Server 內部是一棵樹，所有東西都是 **Node**。樹的根是 `Root`，下面有標準的 `Objects` folder。

### 2. NodeId

每個 node 的唯一 ID。常見寫法：

- `i=85`：數字 ID（85 是標準的 Objects folder）
- `ns=2;s=MyVariable`：namespace 2 裡的字串 ID

### 3. Node 種類

| 種類 | 意義 | 例子 |
|------|------|------|
| `Object` | 容器 | 「MyMotor」 |
| `Variable` | 資料點 | 溫度 `23.5` |
| `Method` | 可呼叫函式 | `start_motor()` |

### 4. Namespace

標準節點在 ns=0。自己的節點要註冊自己的 namespace URI，拿到一個 `idx`，避免與標準節點撞名。

### 5. Subscription（訂閱）

Client 訂閱某個 node，值變化時 **Server 主動推送** datachange notification，不需要輪詢。這是 OPC UA 相對 Modbus 之類協定的最大優勢之一。

---

## 三、opcua-asyncio 這個 repo

Python asyncio 版的 OPC UA **client + server**，前身是 python-opcua，要求 Python ≥ 3.10。另有 sync wrapper（`asyncua/sync.py`）給不能用 async 的程式。

### 程式碼結構

```
asyncua/ua        # 低階 UA 結構（由 spec XML 自動生成）
asyncua/common    # 高階共用（Node 類別等）
asyncua/client    # Client 實作
asyncua/server    # Server 實作
examples/         # 大量範例，最佳起點
tools/            # CLI：uals、uaread、uawrite、uasubscribe...
```

### 四大類別

- `Server`：建立 OPC UA server
- `Client`：連線、session 管理
- `Node`：節點讀寫、瀏覽
- `Subscription`：管理 monitored items

### 功能支援現況

- Client：連線、瀏覽、讀寫、訂閱（datachange + event）、method call、帳密、憑證、加密、history read 都有。
- Server：建 address space、datachange、event、method、加密、history 都有。
- 尚未實作：WebSocket、XML protocol、session restore、alarm、views。

實測相容：Kepware、Beckhoff、WinCC、B&R、Prosys 等商用 server；商用 client 有 UaExpert。

---

## 四、安裝與範例

```bash
uv pip install asyncua
```

### Server（精簡自 `examples/server-minimal.py`）

```python
import asyncio
from asyncua import Server, ua
from asyncua.common.methods import uamethod

@uamethod
def func(parent, value):
    return value * 2

async def main():
    server = Server()
    await server.init()
    server.set_endpoint("opc.tcp://0.0.0.0:4840/freeopcua/server/")

    # 註冊自己的 namespace
    idx = await server.register_namespace("http://examples.freeopcua.github.io")

    # 建 address space
    myobj = await server.nodes.objects.add_object(idx, "MyObject")
    myvar = await myobj.add_variable(idx, "MyVariable", 6.7)
    await myvar.set_writable()  # 預設 client 不能寫，要打開

    await server.nodes.objects.add_method(
        ua.NodeId("ServerMethod", idx),
        ua.QualifiedName("ServerMethod", idx),
        func,
        [ua.VariantType.Int64],  # 輸入型別
        [ua.VariantType.Int64],  # 輸出型別
    )

    async with server:  # start + 離開時自動 stop
        while True:
            await asyncio.sleep(1)
            await myvar.write_value(await myvar.get_value() + 0.1)

asyncio.run(main())
```

### Client（精簡自 `examples/client-minimal.py`）

```python
import asyncio
from asyncua import Client

url = "opc.tcp://localhost:4840/freeopcua/server/"
ns = "http://examples.freeopcua.github.io"

async def main():
    async with Client(url=url) as client:  # 自動 connect/disconnect
        idx = await client.get_namespace_index(ns)

        # 用路徑找 node：0:Objects 是 ns 0 的 Objects folder
        var = await client.nodes.root.get_child(
            f"0:Objects/{idx}:MyObject/{idx}:MyVariable"
        )
        print(await var.read_value())

        await var.write_value(42.0)  # 初始值 6.7 是 Float，寫 int 會 BadTypeMismatch

        res = await client.nodes.objects.call_method(f"{idx}:ServerMethod", 5)
        print(res)  # 10

asyncio.run(main())
```

### Subscription（值變化推播，不輪詢）

```python
class Handler:
    def datachange_notification(self, node, val, data):
        print(node, val)

async with Client(url=url) as client:
    handler = Handler()
    sub = await client.create_subscription(100, handler)  # 100 ms
    await sub.subscribe_data_change(var)
    await asyncio.sleep(3600)  # 每次變化 handler 都會收到
```

---

## 五、CLI 工具（快速探索用）

```bash
uals -u opc.tcp://localhost:4840/freeopcua/server/   # 列 node children
uaread -u <url> -n i=85 -a BrowseName                # 讀屬性
uawrite -u <url> -n <nodeid> -s <value>              # 寫值
uasubscribe -u <url> -n <nodeid>                     # 看 datachange 推播
uadiscover -u <url>                                  # 找 server / endpoints
```

GUI 探索可用 FreeOpcUa 的 [opcua-client-gui](https://github.com/FreeOpcUa/opcua-client-gui)，或商用軟體 UaExpert。

---

## 六、學習路徑

1. 跑 `server-minimal.py`，用 `uals` 瀏覽它的 address space
2. 跑 `client-minimal.py` 讀寫值
3. 加 subscription，觀察 server 每 +0.1 的推播
4. 要加密就跑 `examples/generate_certificate.sh` 產憑證
5. 進階：history read、自訂 structure、event

## 七、注意事項

- 1.0 版之前 API 仍可能變動（README 明講）。
- 0.9.9 起部分參數改名為 CamelCase（`NodeId`、`QualifiedName`、`LocalizedText`、`DataValue`）。
- 方法命名從 `get_xx`/`set_xx` 改成 `read_xx`/`write_xx`，看舊教學時要留意。
- `write_value()` 型別要跟 node 現值一致：初始 6.7 的 Float 變數寫 int 會 `BadTypeMismatch`，要寫 `42.0`。
- Raspberry Pi 上啟動慢（標準 address space 從 XML 載入約 125 秒）；server 建構子傳 cache file 路徑可降到約 3.5 秒。
