# Qbot（UFund-Me）策略研究筆記

> 研究日期：2026-08-31
> 範圍：[UFund-Me/Qbot](https://github.com/UFund-Me/Qbot) 的 `docs/` 策略文件盤點與核心邏輯整理，供日後實作參考。
> 線上文檔：https://ufund-me.github.io/Qbot

## 專案定位

AI 自動量化投研平台（Python，本地部署），涵蓋資料取得 → 策略開發 → 回測 → 模擬交易 → 實盤全流程。架構：

```
Qbot = 智能交易策略 + 回測系統 + 自動化量化交易 (+ 可視化)
        ├── quant.ai — qlib、深度學習策略（AI 策略核心）
        ├── BackTest — backtrader、easyquant
        └── 交易執行 — vnpy、pytrader、pyfunds
        └── quantstats — 績效儀表板
```

核心理念：**策略是量化的核心，因子是策略的核心**。流程 = 自動因子挖掘 → 單因子回測驗證 → 因子庫 → 有機組合成預測模型 → 組合優化 → 交易執行。

## docs/ 結構

```
docs/
├── 01-新手指引/
├── 02-经典策略/          # 01-股票 / 02-基金 / 03-期貨
├── 03-智能策略/          # 拐點、網格、漲停開板、model_zoo
├── tutorials_code/       # 16 個教學案例
└── notebook/
```

## 經典策略（02-经典策略/01-股票）

### 1. 多因子選股 ⭐⭐⭐（文檔最完整）

- **理論基礎**：CAPM → 市場異象（Basu 盈利市值比、Banz 小市值效應）→ Fama-French 三因子/五因子。文檔附模型對照表（Carhart 四因子、Hou-Xue-Zhang、Stambaugh-Yuan、DHS 等）。
- **三因子模型**：`E[Ri] − Rf = α + β·(E[Rm]−Rf) + s·E[SMB] + h·E[HML]`
  - SMB（規模因子）＝三個小市值組合等權平均 − 三個大市值組合等權平均
  - HML（價值因子）＝兩個高 BM 組合等權平均 − 兩個低 BM 組合等權平均
  - 分組：市值二分（B/S）× BM 按 30%/70% 分位三分（L/M/H）
- **策略邏輯**：假設三因子完全有效 → alpha 截距即價格偏離均衡。alpha<0 低估 → 買入；取 alpha 最小且 <0 的 10 檔開倉。
- **步驟**：取市值+BM 資料 → 排序分組 → 算 SMB/HML → 回歸算 alpha → 買 alpha 最小 10 檔。
- 回測：2017-07 ~ 2017-10，初始 1000 萬，標的滬深 300 成分股，每月調倉。代碼基於掘金 `gm.api`。

### 2. 小市值 ⭐⭐⭐

- **理論**：因子投資脈絡——CAPM（1964）→ Ross 套利定價 APT（1976）多因子模型。因子 = 系統性風險的風險溢價；α 顯著不為零 = 異象（anomaly）。因子分「定價因子」與「異象因子」。
- **規模因子**：Banz（1981）發現小市值股月均收益高 0.4%。A 股 2016 前規模因子顯著性超過歐美；2017-2018 大市值反超，有效性存疑。
- **策略邏輯**：每月第一個交易日，取全市場市值最小前 30 檔等權買入（倉位 80%），跌出前 30 即平倉。
- 回測：2005-01 ~ 2020-10，全部 A 股，初始 100 萬。

### 3. 布林線均值回歸 ⭐⭐⭐

- **原理**：布林帶＝中軌（N 日 MA）± k 個標準差。價格短期可突破上下軌，長期回歸帶內 → 突破即買賣信號。
- **信號**：向上突破上軌 → 賣出；向下突破下軌 → 買入。
- 參數：maPeriod=26、stdPeriod=26、stdRange=1。判斷「穿越」（今日過軌且昨日未過）避免連續觸發。
- 回測：SHSE.600004，2009-09 ~ 2020-03，初始 1000 元。

### 4. 配對交易 ⭐⭐（backtrader 教學筆記）

- **原理**：找兩檔走勢高相關股票，價差長期固定區間波動；偏離時做多偏低、做空偏高，回歸均值平倉賺價差。
- **選股**：tushare 取同業（銀行）股票，基本面相近 → 相關性高 → 篩相關係數最高一對。
- 資料源：tushare（`pro.daily` / `stock_basic` / `daily_basic`），backtrader 回測。

### 5. 均值策略（雙均線）⭐⭐

- backtrader `SmaCross`：10 日均線上穿 30 日均線 → 買入（金叉）；下穿 → 平倉（死叉）。
- 資料：tushare 取 A 股日線，本地 CSV 快取。

### ⚠️ 空殼文件（只有標題/外連）

- Alpha對沖、指數增強、RSRS 擇時（僅兩個外部連結：beefyheisenberg 量化筆記、shidaotec）、量化二-選股
- 期貨：雙均線、網格交易；基金：4433 法則

## 智能策略（03-智能策略）

### 拐點交易

- **買入**：基準價 × 跌幅比例 → 跌幅閾值價；最新價突破後追蹤「突破後最低價」× 回調比例 → 回調閾值價；再突破即掛單買。
- **賣出**：鏡像（漲幅閾值 → 追蹤最高價 → 回調閾值 → 掛單賣）。
- 本質 = 順勢突破 + 回調確認進場。文件無代碼無回測結果。

### 網格交易

- 參數：價格中樞 p、網格寬度 w、每格數量 v。漲過格線超 1 分錢 → 賣 v 股；跌至格線 → 買 v 股；單向波動超 4 格停止處理。
- 適用震盪市，賺波動差價。例：現價 10 元持 4000 股，11 元減至 3000、9 元增至 5000…（中樞 10、寬度 1、每格 1000）。

### ⚠️ 漲停開板策略、model_zoo — 佔位文件

## README 策略池全覽（比 docs 完整）

**經典**（選股/擇時）：布林均值回歸、移動均線+KDJ、簡單移動均線、雙均線、ARBR 情緒、阿隆指標、RSI 背離、StochRSI、RSRS 擇時、麻雀優化 SSA、小市值、市場低估值、配對交易、網格交易、拐點交易、海龜策略、趨勢交易、動態平衡、指數增強、Alpha 對沖、多因子選股
**因子組合**：RSI+CCI、MACD+ADX、MACD+KDJ、alphalens 多因子、多策略整合

**智能策略五大類**（基於 qlib，約 300+ 模型 / 40+ 論文）：

| 類別 | 模型 |
|---|---|
| GBDT | XGBoost (KDD'16)、LightGBM (NIPS'17)、Catboost (NIPS'18)、DoubleEnsemble (ICDM'20)、TabNet |
| RNN/CNN | MLP、GRU、LSTM、ALSTM、ADARNN (KDD'21)、ADD、KRNN、Sandwich |
| RL | （強化學習預測、Q-Learning） |
| Transformer | Transformer、TCTS (ICML'21)、TRA (KDD'21)、TCN (KDD'18)、IGMTF、HIST、Localformer、TFT、GATs、SFM |
| LLM | ChatGPT、FinGPT |

**交易指標**：alpha-101、alpha-191、EMA/MACD/KDJ/RSRS/RSI/StochRSI/BIAS/BOLL/OBV/SAR/PSY/ARBR/CR/BBI/EMV/TRIX/DMA/DMI/CCI/ROC/ENE/SKDJ/LWR + deap 遺傳算法自動因子生成。

## 源碼位置

- `qbot/strategies/`：可跑策略——adx、arbr、boll（+bt/test 版）、bigger_than_ema、lstm_bt、multi_strategy_bt、rl_strategy_bt、sma_cross_bt、ssa_bt、undervalued_stock_picking
- `docs/tutorials_code/`：01.begin、02.easy_macd、02_HighFreq_Backtest、03-05.macd/kdj（A 股版）、06.average_profit、07-08.harami 孕線、09.custom_data_source、10.converted_bond 可轉債、11.eastmoney+Grafana、11_RandomForest、13.alphalens 因子回測、13_Transformer、15.rl_learning
- `backend/pytrader/strategies/workflow_by_code.py`：AI 策略本地入口

## 實作依賴

- 策略代碼多依賴**掘金量化 `gm.api`**（需 token）；backtrader 教學用 **tushare**（需 token）
- backtrader、vnpy、qlib、tushare、easyquant 為底層框架
- wxPython、Ta-Lib 需手動裝（wheel 在 dev/）；Mac 需 hdf5 + pythonw
- Python 3.8/3.9，建議 conda

## 評估（給自己的提醒）

1. docs 品質參差——有料的是多因子選股、小市值、布林線、配對交易四篇；AI 策略文檔幾乎沒寫完
2. AI 策略實際看 README + qlib；本地練手從 `qbot/strategies/` + tutorials_code 著手
3. 需要大陸券商/量化平台生態（掘金、tushare），台灣市場標的不適用，僅可參考策略邏輯
4. 官方聲明：回測結果不代表實盤，勿輕易用於實盤
