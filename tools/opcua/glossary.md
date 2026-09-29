# OPC UA 名詞表

> 搭配 `beginner-guide.md`（詳解）與 `note.md`（實跑）。條目按學習順序排列。

---

## 基礎

**OPC UA**（Open Platform Communications Unified Architecture）
工業通訊協定，標準號 IEC 62541。PLC、感測器、SCADA、MES 之間互傳資料的主流標準。走 `opc.tcp://`，預設 port 4840。

**OPC Classic / OPC DA**
舊版 OPC（DA = Data Access）。架構在 Windows COM/DCOM 上，只能跑 Windows，DCOM 設定惡名昭彰。OPC UA 是其後繼。

**Client / Server**
Server（PLC、設備、閘道器）持有資料並暴露；Client（SCADA、MES、資料收集器）連線讀寫。注意角色跟 MQTT 相反：OPC UA 是資料生產方當 server。

**Endpoint**
Server 的連線網址，如 `opc.tcp://0.0.0.0:4840/freeopcua/server/`。一個 server 可開多個 endpoint，各綁不同安全設定。

**UaExpert**
最常用的商用測試 client（Unified Automation 出品），GUI 瀏覽 address space。等於 MQTT 界的 MQTTX。

## Address Space（資訊模型）

**Address Space**
Server 內部的節點樹。所有東西都是 node，根是 `Root`，下面有標準的 `Objects` folder。這是 OPC UA 跟「只會吐 tag 值」的舊協定最大差別：資料帶語意。

**Node**（節點）
樹上每個元素。三大類：

| 種類 | 意義 | 例子 |
|------|------|------|
| Object | 容器 | 「MyMotor」 |
| Variable | 資料點 | 溫度 `23.5` |
| Method | 可呼叫函式 | `start_motor()` |

**NodeId**
節點唯一 ID。寫法：`i=85`（數字，85 是標準 Objects folder）、`ns=2;s=MyVariable`（namespace 2 的字串 ID）。

**Namespace（ns）**
ID 命名空間。標準節點在 ns=0；自己的節點要註冊自己的 namespace URI 換一個 `idx`，避免跟標準撞名。`ns=2` 的 2 就是註冊後拿到的 idx。

**QualifiedName**
帶 namespace 的名稱，如 `2:MyVariable`。避免不同 ns 同名混淆。

**Browse**（瀏覽）
沿著樹走、發現節點的操作。Client 不用事先讀文件，自己 Browse 就知道 server 有什麼。`uals` 就是 CLI 版。

**Companion Specification**（伴隨規範）
各產業協會基於 OPC UA 制定的標準資訊模型：機械（OPC 40001）、塑膠機（Euromap 83）、包裝機（OPC 40002）。有規範，不同廠牌機台建模方式一致。

## 資料

**Variant**
值的容器，帶型別資訊（Float、Int64、String…）。所以寫值時型別要對：Float 變數寫 int 會 `BadTypeMismatch`。

**DataValue**
節點的完整值：Value + StatusCode + SourceTimestamp + ServerTimestamp。不只數字，還帶「這個值新鮮嗎、健康嗎」。

**Bad / StatusCode**
OPC UA 的狀態碼慣例。`Good` = 正常；`Bad` 開頭 = 出事。常見：

| StatusCode | 原因 |
|------------|------|
| `BadTypeMismatch` | 寫入型別跟節點現值不一致 |
| `BadConnectionClosed` | 連線斷了（server 沒開、port 被占） |
| `BadSessionIdInvalid` | session 過期或失效 |
| `BadNotWritable` | 變數沒 `set_writable()` |

## 通訊

**Subscription / Monitored Item**
Client 訂閱節點後，值變化時 **Server 主動推播** datachange notification，不用輪詢。相對 Modbus 這類輪詢協定的最大優勢之一。每個被訂閱的節點就是一個 monitored item。

**Publishing Interval**
Subscription 的推播週期（ms），如 100 = 100ms。另外 monitored item 有自己的 sampling interval，兩者取小生效。

**Session**
Client-Server 的工作階段，帶認證與狀態，可跨越底層 TCP 連線重建（reconnect 不用重登）。有 timeout，server 可壓上限。

**Method Call**
遠端呼叫 server 上的函式，可帶輸入參數、拿回傳值。如 `ServerMethod(5) → 10`。

## 安全

**Security Policy**
加密/簽章演算法組合：`None`、`Basic256Sha256`、`Aes256Sha256RsaPss` 等。

**Security Mode**
`None` / `Sign` / `SignAndEncrypt`。只簽不加密 = Sign。工廠內網常見偷懶開 None，外部連線務必 SignAndEncrypt。

**X.509 憑證**
應用程式層互認用。Client 和 server 第一次連線要互換憑證、放進對方 trust list——「連不上」的頭號原因。

**User Authentication**
使用者層認證：帳密、憑證、匿名。跟應用程式憑證是兩層，不要混。

## 進階

**History Read**
讀節點的歷史值（server 有開 history 存儲時）。

**PubSub**
MQTT 式的一對多廣播模式（2018+），無連線、跑 UDP 或 MQTT/AMQP。跟傳統 Client-Server 並存，適合大規模 sensor 和上雲。

**asyncua**
Python 實作（本筆記主角），前身 python-opcua。`Server` / `Client` / `Node` / `Subscription` 四大類。

**uals / uaread / uawrite / uasubscribe**
asyncua 附的 CLI 探索工具：列樹、讀值、寫值、看推播。等於 MQTT 界的 `mosquitto_sub` / `mosquitto_pub`。
