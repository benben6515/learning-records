# FinLab US counterparts - S&P 100 price-factor backtests

scripts/finlab/ 台股策略的美股對應版。finlab 只有台股資料，這批回測用
yfinance adjusted close、universe 為現任 S&P 100（snapshot 2026-09-22），
成本模型 fee 0 + SEC fee 0.00278%（賣方）、無 slippage；訊號 T 收盤產生、
T+1 收盤成交（無前視偏差）。每個策略的細節報告在同目錄 HTML。

## Caveats

- **存活者偏差**：universe 是今天的 S&P 100 成分，絕對報酬偏樂觀，
  只適合策略間與對 SPY 的相對比較，不能外推為可實現報酬。
- **不是台股數字的對照組**：市場、universe、成本都不同，
  與 reports/finlab/SUMMARY.md 的 CAGR 不可直接互比。
- **移除的因子**：ROE / 月營收 YoY / PB / 殖利率 / FCF / 投信籌碼都需要
  歷史基本面時間序列，yfinance 沒有（只有最近幾季快照），
  硬回測會引入前視偏差，故對應策略只保留價量因子。

## TW -> US mapping

| scripts/finlab/ | US counterpart | 差異 |
|---|---|---|
| momentum-strategy sim1 | momentum_12_1 | 直接對應 |
| momentum-strategy sim2 | momentum_composite_price | 移除 ROE>10、營收YoY>0 |
| low-volatility-strategy (低波/高波) | low_vol_30 / high_vol_30_control | 直接對應 |
| low-volatility-strategy 優化版 | risk_adj_optimized | 移除 ROE>5、營收YoY>0 |
| program-trading 動能輪動 | momentum_rotation | pool 移除市值前200+ROE+營收 |
| program-trading 均線趨勢過濾 | trend_filter | pool 移除市值前200 |
| stock-selection 四因子複合 | multifactor_price | 四因子→動能+低波(2×) |

## Not reproduced（缺歷史資料）

- monthly-revenue-momentum.py — 月營收 YoY 需歷史基本面（yfinance 無）
- stock-selection.py 價值＋品質＋股息 — PB / 殖利率 / ROE 歷史（yfinance 無）
- stock-selection.py 籌碼選股 — 投信買賣超為台股專屬資料
- strategy-library-batch1.py FCF 多因子 — 自由現金流 / 借款歷史（yfinance 無）

## Results

```
[RESULT] file=momentum_strategy name=momentum_12_1 CAGR 30.15% MDD -51.33% sharpe 1.10 win 67.71% window 2008-02-01 ~ 2026-09-21
[RESULT] file=momentum_strategy name=momentum_composite_price CAGR 36.15% MDD -53.19% sharpe 1.10 win 59.73% window 2008-04-01 ~ 2026-09-21
[RESULT] file=low_volatility_strategy name=low_vol_30 CAGR 12.63% MDD -43.53% sharpe 0.74 win 68.16% window 2008-02-01 ~ 2026-09-21
[RESULT] file=low_volatility_strategy name=high_vol_30_control CAGR 23.89% MDD -61.43% sharpe 0.89 win 67.26% window 2008-02-01 ~ 2026-09-21
[RESULT] file=low_volatility_strategy name=risk_adj_optimized CAGR 26.79% MDD -46.93% sharpe 1.07 win 64.71% window 2008-04-01 ~ 2026-09-21
[RESULT] file=program_trading name=momentum_rotation CAGR 22.25% MDD -30.42% sharpe 1.07 win 69.23% window 2018-01-17 ~ 2026-09-21
[RESULT] file=program_trading name=trend_filter CAGR 43.72% MDD -39.53% sharpe 1.27 win 65.05% window 2018-02-01 ~ 2026-09-21
[RESULT] file=stock_selection name=multifactor_price CAGR 11.99% MDD -27.70% sharpe 0.79 win 68.27% window 2018-01-17 ~ 2026-09-21
```

SPY buy & hold（全資料窗口，含息 adjusted close）：CAGR 8.53% MDD -62.40% sharpe 0.44
（2006-01-03 ~ 2026-09-21；
各策略窗口的 SPY 對照見 run.log 的 [BENCH] 行與各 HTML）
