# Ollama Cloud — 模型 / Context / Usage Level 對照表

> Ollama 把跑不動的大模型自動 **offload 到自家雲端**，本機工具照常運作。
> 計價方式跟 opencode Go 完全不同：**不是 per-token 計費，而是以 GPU 時間 / 模型用量等級（Usage Level 1–4）吃方案額度**，沒有 token 上限。
> 本檔把 Ollama 官方每個 cloud tag 的 Context / Usage / Size / 多模態整理出來，方便挑模型與估算額度消耗。

---

## 📌 維護用 Prompt（下次更新直接貼這段）

```
讀 https://docs.ollama.com/cloud 抓官方 cloud 說明（方案、concurrency、usage 計量、reset 規則）。
再 curl https://ollama.com/search?c=cloud 取得所有 cloud 模型 family 清單。
對每個 cloud tag（model:cloud）curl https://ollama.com/library/<model>:cloud 解析 header 的
Usage / Context / Size / Input（Modalities）四個 badge，以及 capabilities badge（vision/tools/thinking）。
重點抓：
  - Usage level（low / medium / high / extra high → 對應 L1–L4）
  - Context tokens（128K / 198K / 200K / 256K / 512K / 976K / 1M）
  - Size（parameters）
  - Input modalities（Text only vs Text,Image → 是否支援 vision）
  - cloud invocation tag（多數是 <model>:cloud，少數如 gemini-3-flash-preview 用 :latest）
更新本檔的「模型總覽對照表」「Context 上限」「Vision / 多模態」「方案與額度」「退役清單」五節，
並標註抓取日期。同時對照同目錄 opencode-go-models.md，標出兩邊重疊的模型。
```

- Ollama Cloud 來源：<https://docs.ollama.com/cloud>
- 模型清單來源：<https://ollama.com/search?c=cloud>（各 `:cloud` tag 頁 badge）
- 資料抓取日：**2026-07-27**

---

## 🗺 目前可用模型 Overview（速查）

> 共 **20 個 active cloud tag**（含 2 個 2026-07-31 即將退役）。按 **Usage Level（吃額度速率）** 由輕到重排列；越下面每次 request 吃越多方案額度。

| Cloud Tag                    |       Usage       |         Context | Vision | 一句話定位                           |
| ---------------------------- | :---------------: | --------------: | :----: | ------------------------------------ |
| `gpt-oss:20b-cloud`          |      L1 low       |            128K |   ❌   | OpenAI 20B，最輕量 reasoning         |
| `gemma4:31b-cloud`           |      L1 low       |            256K |   ✅   | Google 多模態，便宜又能看圖          |
| `nemotron-3-nano:30b-cloud`  |      L1 low       |          **1M** |   ❌   | 30B 卻給到 1M context                |
| `qwen3.5:cloud`（=9b）       |     L2 medium     |            256K |   ✅   | 小型多模態預設 tag                   |
| `gpt-oss:120b-cloud`         |     L2 medium     |            128K |   ❌   | gpt-oss 旗艦                         |
| `nemotron-3-super:cloud`     |     L2 medium     |            256K |   ❌   | NVIDIA 120B / 12B active 高效 MoE    |
| `minimax-m2.5:cloud`         |     L2 medium     |            198K |   ❌   | ⚠️ **7/31 退役** → m2.7              |
| `minimax-m2.7:cloud`         |     L2 medium     |            200K |   ❌   | M2 現役；office / agent 強           |
| `deepseek-v4-flash:cloud`    |     L2 medium     |          **1M** |   ❌   | **最划算的 1M context**              |
| `qwen3.5:397b-cloud`         |     L2 medium     |            256K |   ✅   | Qwen3.5 旗艦（A17B active）          |
| `mistral-large-3:675b-cloud` |     L2 medium     |            256K |   ✅   | Mistral 旗艦；Apache 2.0             |
| `glm-5.1:cloud`              |      L3 high      |            198K |   ❌   | agentic engineering（GLM 上一代）    |
| `glm-5.2:cloud`              |      L3 high      | **976K**（≈1M） |   ❌   | 真正可用的 1M；long-horizon 旗艦     |
| `minimax-m3:cloud`           |      L3 high      |         512K~1M |   ✅   | 原生多模態；MSA 架構；agent 強       |
| `kimi-k2.5:cloud`            |      L3 high      |            256K |   ✅   | ⚠️ **7/31 退役** → k2.6              |
| `kimi-k2.6:cloud`            |      L3 high      |            256K |   ✅   | swarm agent、長程 coding             |
| `kimi-k2.7-code:cloud`       |      L3 high      |            256K |   ✅   | coding 專版；thinking token 省 ~30%  |
| `nemotron-3-ultra:cloud`     |      L3 high      |            256K |   ❌   | 長程 agent；550B / 55B active        |
| `deepseek-v4-pro:cloud`      | **L4 extra high** |          **1M** |   ❌   | **唯一 L4**；frontier 推理；最燒額度 |
| `gemini-3-flash-preview`     |    （未標示）     |          **1M** |   ✅   | speed 旗艦；preview；無 Usage badge  |

**挑選速記**：

- **省額度又長文** → `nemotron-3-nano:30b`（L1+1M）或 `deepseek-v4-flash`（L2+1M）
- **純 coding agent** → `kimi-k2.7-code`（L3）或 `glm-5.2`（L3，976K）
- **多模態 + 旗艦** → `gemini-3-flash-preview`（1M+vision）或 `minimax-m3`（512K~1M+vision）
- **省到極致** → `gpt-oss:20b` / `gemma4:31b`（皆 L1，gemma4 送 vision）

---

## 🧾 方案與額度

| 方案     | 價格                     | 並發模型數 | 用量                     | 說明                                                  |
| -------- | ------------------------ | ---------: | ------------------------ | ----------------------------------------------------- |
| **Free** | $0                       |          1 | Light                    | 評估大模型、小模型 coding assistant                   |
| **Pro**  | **$20/月**（或 $200/年） |      **3** | **50× Free**             | 日常 coding、深研究、較大模型；可上傳私有模型         |
| **Max**  | $100/月                  |         10 | **5× Pro**（=250× Free） | ⚠️ **新訂閱暫停**（產能擴充中）；長時間 agent、多並發 |
| Team     | 即將推出                 |          — | 共享額度                 | SSO、集中計費、MDM installer                          |

- **沒有 token 上限**。Usage 反映「實際 GPU 使用率」（模型大小 × request 持續時間）；短 request、共享快取 context 消耗較少。硬體/架構變快，同方案能用得更多。
- **重置週期**：session 額度每 **5 小時** reset、weekly 額度每 **7 天** reset。
- **超額 fallback**：Pro / Max 可在 console 開 **Extra usage balance**（預付餘額），先用方案額度、用完再扣餘額（pay-as-you-go）。
- **90% 額度**會寄 email 提醒（可在 settings 關閉）。
- **並發超額**：request 進 queue，等 slot 釋出；queue 滿才會被拒。

### Usage Level（吃額度的速率）

每個模型在 tag 頁有 `Usage` badge，分四級（官方說法：level 1 小模型 → level 4 超大模型）：

| Level  | badge 文字   | 模型（本次抓取）                                                                                                  |
| :----: | ------------ | ----------------------------------------------------------------------------------------------------------------- |
| **L1** | `low`        | gpt-oss:20b、gemma4:31b、nemotron-3-nano:30b                                                                      |
| **L2** | `medium`     | gpt-oss:120b、qwen3.5 (9b / 397b)、nemotron-3-super、minimax-m2.5 / m2.7、deepseek-v4-flash、mistral-large-3:675b |
| **L3** | `high`       | glm-5.1、glm-5.2、minimax-m3、kimi-k2.5 / k2.6 / k2.7-code、nemotron-3-ultra                                      |
| **L4** | `extra high` | **deepseek-v4-pro**（唯一 L4）                                                                                    |

> 含義：L1 模型每次 request 吃很少額度 → 同方案能跑超多次；L4 的 deepseek-v4-pro 最快撞額度。
> ⚠️ `gemini-3-flash-preview` 是 preview 模型，頁面**未標示 Usage level**（也沒有 Size/Context badge，僅在 tag 表顯示 1M context）。

---

## 🧮 模型總覽對照表

欄位：`Context` context 上限 / `Usage` 額度等級（L1–L4）/ `Size` 參數量 / `Modalities` 輸入型態 / `Vision`。

### Open-weight 小～中模型（L1–L2）

| Cloud Tag                    | Context |   Usage   |               Size | Modalities  | Vision | 備註                                   |
| ---------------------------- | ------: | :-------: | -----------------: | ----------- | :----: | -------------------------------------- |
| `gpt-oss:20b-cloud`          |    128K |  L1 low   |                20B | Text        |   ❌   | OpenAI 開源；Apache 2.0；MXFP4         |
| `gpt-oss:120b-cloud`         |    128K | L2 medium |               120B | Text        |   ❌   | gpt-oss 旗艦                           |
| `nemotron-3-nano:30b-cloud`  |  **1M** |  L1 low   | 30B（3.5B active） | Text        |   ❌   | Mamba-2 + MoE 混合架構                 |
| `gemma4:31b-cloud`           |    256K |  L1 low   |          31B dense | Text, Image |   ✅   | Google；E2B/E4B 為 edge 版（非 cloud） |
| `qwen3.5:cloud`（=9b）       |    256K | L2 medium |                ~9B | Text, Image |   ✅   | 預設 tag，小型多模態                   |
| `qwen3.5:397b-cloud`         |    256K | L2 medium |               397B | Text, Image |   ✅   | Qwen3.5 旗艦（A17B active）            |
| `nemotron-3-super:cloud`     |    256K | L2 medium | 120B（12B active） | Text        |   ❌   | NVIDIA；高效率 MoE                     |
| `mistral-large-3:675b-cloud` |    256K | L2 medium |               675B | Text, Image |   ✅   | Apache 2.0；多語言                     |

### MiniMax 系列（L2–L3）

| Cloud Tag            |                     Context |   Usage   |       Size | Modalities  | Vision | 備註                             |
| -------------------- | --------------------------: | :-------: | ---------: | ----------- | :----: | -------------------------------- |
| `minimax-m2.5:cloud` |                        198K | L2 medium |       230B | Text        |   ❌   | ⚠️ **2026-07-31 退役** → m2.7    |
| `minimax-m2.7:cloud` |                        200K | L2 medium |       229B | Text        |   ❌   | M2 系列現役；office/agent 強     |
| `minimax-m3:cloud`   | **512K**（保證值，最高 1M） |  L3 high  | （未公告） | Text, Image |   ✅   | MSA 架構；原生多模態；1M context |

### Kimi 系列（L3）

| Cloud Tag              | Context |  Usage  |  Size | Modalities  | Vision | 備註                                          |
| ---------------------- | ------: | :-----: | ----: | ----------- | :----: | --------------------------------------------- |
| `kimi-k2.5:cloud`      |    256K | L3 high | 1.04T | Text, Image |   ✅   | ⚠️ **2026-07-31 退役** → k2.6                 |
| `kimi-k2.6:cloud`      |    256K | L3 high | 1.04T | Text, Image |   ✅   | 長程 coding、swarm agent                      |
| `kimi-k2.7-code:cloud` |    256K | L3 high | 1.04T | Text, Image |   ✅   | K2.6 之上的 coding 版；thinking token 省 ~30% |

### GLM 系列（L3）

| Cloud Tag       |         Context |  Usage  | Size | Modalities | Vision | 備註                                               |
| --------------- | --------------: | :-----: | ---: | ---------- | :----: | -------------------------------------------------- |
| `glm-5.1:cloud` |            198K | L3 high | 756B | Text       |   ❌   | agentic engineering；純文字                        |
| `glm-5.2:cloud` | **976K**（≈1M） | L3 high | 756B | Text       |   ❌   | 真正可用的 1M context；long-horizon 旗艦；MIT 授權 |

### DeepSeek 系列（L2 / L4）

| Cloud Tag                 | Context |       Usage       |                                    Size | Modalities | Vision | 備註                                           |
| ------------------------- | ------: | :---------------: | --------------------------------------: | ---------- | :----: | ---------------------------------------------- |
| `deepseek-v4-flash:cloud` |  **1M** |     L2 medium     | 158B（badge）／284B total（13B active） | Text       |   ❌   | 最划算的 1M context；3 種 thinking 模式        |
| `deepseek-v4-pro:cloud`   |  **1M** | **L4 extra high** |                      1.6T（49B active） | Text       |   ❌   | **唯一 L4**；frontier 推理；3 種 thinking 模式 |

### Nemotron Ultra / Gemini（L3 / preview）

| Cloud Tag                | Context |   Usage    |               Size | Modalities  | Vision | 備註                                                                                |
| ------------------------ | ------: | :--------: | -----------------: | ----------- | :----: | ----------------------------------------------------------------------------------- |
| `nemotron-3-ultra:cloud` |    256K |  L3 high   | 550B（55B active） | Text        |   ❌   | 長程 agent；NVFP4 加速                                                              |
| `gemini-3-flash-preview` |  **1M** | （未標示） |        （preview） | Text, Image |   ✅   | speed 旗艦；頁面無 Usage/Size badge；run 指令為 `ollama run gemini-3-flash-preview` |

---

## 📏 Context 上限一覽（由大到小）

| Context                     | 模型                                                                                                                     |
| --------------------------- | ------------------------------------------------------------------------------------------------------------------------ |
| **1M**                      | deepseek-v4-pro、deepseek-v4-flash、nemotron-3-nano:30b、gemini-3-flash-preview                                          |
| **976K（≈1M）**             | glm-5.2                                                                                                                  |
| **512K（保證值，最高 1M）** | minimax-m3                                                                                                               |
| **256K**                    | kimi-k2.5 / k2.6 / k2.7-code、qwen3.5（9b / 397b）、gemma4:31b、nemotron-3-super、nemotron-3-ultra、mistral-large-3:675b |
| **200K**                    | minimax-m2.7                                                                                                             |
| **198K**                    | glm-5.1、minimax-m2.5                                                                                                    |
| **128K**                    | gpt-oss:20b、gpt-oss:120b                                                                                                |

> 反直覺亮點：
>
> - 最小的 **nemotron-3-nano:30b（L1）** 與 **deepseek-v4-flash（L2）** 都給到 **1M context**——便宜又能塞超長文。
> - **glm-5.2** 的 badge 顯示 **976K**（非整數 1M），但官方 README 與 opencode Go 都宣稱 1M；以官方 badge 為準 ~976K。
> - **MiniMax M3** 是「保證 512K、最高 1M」（MSA 稀疏注意力架構才能撐）。
> - opencode Go 上同模型常給到完整 1M（如 glm-5.2 = 1,048,576）；Ollama 這邊以各 `:cloud` tag 的 badge 為準。

---

## 👁 Vision / 多模態支援

來源：各 tag 頁 `Input` 欄與 capabilities badge。有 `image` 即支援視覺（圖片輸入）。

| Cloud Tag                       | Modalities  | Vision |
| ------------------------------- | ----------- | :----: |
| gemma4:31b                      | Text, Image |   ✅   |
| qwen3.5（9b / 397b）            | Text, Image |   ✅   |
| minimax-m3                      | Text, Image |   ✅   |
| kimi-k2.5 / k2.6 / k2.7-code    | Text, Image |   ✅   |
| mistral-large-3:675b            | Text, Image |   ✅   |
| gemini-3-flash-preview          | Text, Image |   ✅   |
| gpt-oss:20b / 120b              | Text        |   ❌   |
| nemotron-3-nano / super / ultra | Text        |   ❌   |
| minimax-m2.5 / m2.7             | Text        |   ❌   |
| glm-5.1 / 5.2                   | Text        |   ❌   |
| deepseek-v4-flash / pro         | Text        |   ❌   |

**小記**：

- **6 / 20 個 cloud tag 支援 vision**：gemma4:31b、qwen3.5 兩檔、minimax-m3、Kimi K2.x 三檔、mistral-large-3、gemini-3-flash-preview。
- 反直覺點：**Kimi K2.x（1T 巨獸）原生多模態**，但 **DeepSeek V4 / GLM-5.x 全系列純文字**；**MiniMax M3 有 vision，M2.x 沒有**。
- **沒有任何一個能直接生圖/生影片**（output 都是 text）。
- 注意 gemma4 的 **E2B / E4B edge 版**支援 audio（但那不是 cloud tag）；cloud 版 `31b-cloud` 只吃 Text + Image。

---

## 🔌 Endpoints & Model ID

cloud 模型走 **Ollama 原生 API**（`http://localhost:11434`，由本機 Ollama 代理到雲端），或直接打 ollama.com API：

| 用途         | 指令 / Endpoint                                                             |
| ------------ | --------------------------------------------------------------------------- |
| CLI 執行     | `ollama run <model>:cloud`                                                  |
| 列出可用模型 | `ollama list`（本機）／ `GET https://ollama.com/api/tags`（API key 模式）   |
| Chat API     | `POST http://localhost:11434/api/chat`（model 填 `<model>:cloud`）          |
| API key 模式 | 設 `OLLAMA_API_KEY`，直接打 `https://ollama.com`（當成 remote Ollama host） |

完整 cloud tag 一覽：<https://ollama.com/search?c=cloud>

```
# 範例
ollama run deepseek-v4-flash:cloud
ollama run glm-5.2:cloud
ollama run kimi-k2.7-code:cloud
ollama run gemini-3-flash-preview      # 注意：無 :cloud 後綴（preview 模型）
```

> ⚠️ `gemini-3-flash-preview` 是特例：README 寫 `:cloud`，但官網 tag 表只有 `:latest`，CLI 亦可用無後綴 `ollama run gemini-3-flash-preview`。

---

## 🗓 即將退役 / 已退役（Cloud Only）

退役**只影響 cloud 模型**，本地模型不受影響；用戶會提前收到 email 通知。

### 即將退役（2026-07-31）

| 模型                 | 建議替代             |
| -------------------- | -------------------- |
| `minimax-m2.5:cloud` | `minimax-m2.7:cloud` |
| `kimi-k2.5:cloud`    | `kimi-k2.6:cloud`    |

### 近期已退役（節錄，2026-06 ~ 07）

| 模型                                                                         | 建議替代               |
| ---------------------------------------------------------------------------- | ---------------------- |
| `deepseek-v3.1:671b` / `deepseek-v3.2`                                       | `deepseek-v4-flash`    |
| `glm-4.6` / `glm-4.7` / `glm-5`                                              | `glm-5.1` → `glm-5.2`  |
| `kimi-k2-thinking` / `kimi-k2:1t`                                            | `kimi-k2.6`            |
| `minimax-m2` / `m2.1`                                                        | `minimax-m3`           |
| `qwen3-coder-next` / `qwen3-coder:480b` / `qwen3-next:80b` / `qwen3-vl:235b` | `qwen3.5:397b-cloud`   |
| `gemma3` 全系列                                                              | `gemma4`               |
| `devstral-2:123b`                                                            | `mistral-large-3:675b` |
| `gemini-3-flash-preview`（曾列）                                             | （見上）               |

---

## 🧠 觀察 / 重點

1. **計價邏輯完全不同於 opencode Go**。Go 是「per-token 扣使用價值 $」，Ollama Cloud 是「**GPU 時間吃方案額度**，沒有 token 上限」。所以這邊沒有 $/1M tokens 欄位——要看的是 **Usage Level（L1–L4）**：L1 模型每次 request 吃極少額度、L4 的 deepseek-v4-pro 最快撞牆。
2. **沒有 cache 價，也沒有 cache 槓桿**。opencode Go 有獨立的 `CacheR`/`CacheW` per-1M-token 單價（cache read 通常只有 input 的 1/5–1/10），agentic loop 裡靠它省非常多；Ollama Cloud 是 GPU-time 計費、cache 效益不透明且**無獨立價**。實測上 GitHub [issue #16714](https://github.com/ollama/ollama/issues/16714) 用戶回報：agentic loop 該有的 cache 省錢效果在 Ollama Cloud 上**完全不存在**（上游 DeepSeek / Kimi 的多層 TTL prompt cache 沒被暴露或回饋）。重度 agent 用戶的單位成本會比 opencode Go 高。cache-aware per-token pricing 官方列為 **coming soon**。
3. **挑模型的性價比甜區**：
   - **長 context 便宜跑**：`nemotron-3-nano:30b`（L1 + 1M ctx）與 `deepseek-v4-flash`（L2 + 1M ctx）——又要長文、又省額度。
   - **純 coding agent**：`kimi-k2.7-code`（L3，thinking token 比 K2.6 省 ~30%）或 `glm-5.2`（L3，976K 穩定長 context）。
   - **多模態 + 旗艦**：`gemini-3-flash-preview`（1M、vision、speed 優先）或 `minimax-m3`（512K–1M、vision、agent 強）。
   - **要省到極致**：`gpt-oss:20b` / `gemma4:31b`（皆 L1），gemma4 還送 vision。
4. **Vision 落點**：支援的只有 gemma4、qwen3.5 兩檔、minimax-m3、Kimi K2.x 三檔、mistral-large-3、gemini-3-flash-preview——**6 / 20**。DeepSeek V4 / GLM-5.x / Nemotron 全系列都純文字。
5. **Max 新訂閱暫停**。官方說雲端 token 量每月翻倍、加上 kimi-k3 即將上架，產能追不上，所以暫停 Max 新訂閱保護既有用戶。要重度使用現在只能上 Pro + Extra usage balance。
6. **並發是硬限制**：Free 僅 1、Pro 3、Max 10 個模型同時跑。多 agent workflow（同時開多個 coding session）會直接卡在 Free/Pro 的並發上限。
7. **與 opencode Go 的模型重疊**（同模型、不同計價／context）：
   - **重疊 8 個**：glm-5.1、glm-5.2、minimax-m3 / m2.7 / m2.5、kimi-k2.7-code / k2.6、deepseek-v4-pro / v4-flash。
   - 差異：opencode Go 多了 **Grok 4.5、Kimi K3、MiMo-V2.5 / Pro、Qwen3.7 Max/Plus、Qwen3.6 Plus**（Ollama 沒上）；Ollama Cloud 多了 **gpt-oss、Nemotron 全系列、gemma4、qwen3.5、mistral-large-3、gemini-3-flash-preview**（opencode Go 沒上）。
   - Context 差異範例：`glm-5.2` 在 Go 是完整 1,048,576，在 Ollama badge 顯示 **976K**；`kimi-k2.6 / k2.7-code` 兩邊都是 256K（Go 標 262,144）。
8. **隱私**：主要 host 在美國（NVIDIA Cloud Partners），視產能可能路由到歐洲 / 新加坡；**不記錄、不訓練、零資料留存**。MiniMax M3 另標明「US-based、zero data retention、已取得商用授權」。
9. **退役節奏快**：開源模型迭代快，Ollama 每 1–2 個月就退役一輪（glm-4.x → 5.x、kimi-k2 → k2.5 → k2.6、gemma3 → gemma4）。依賴特定 tag 的工具要定期更新；本地 pull 的舊模型則永遠可用。
