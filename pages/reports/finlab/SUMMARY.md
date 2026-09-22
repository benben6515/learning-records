# FinLab official strategies - reproduction summary

Re-runs of the official strategy.py files (scripts/finlab/), each sim also dumped to an HTML report in this folder. Windows/cost models are whatever each official script sets (most use full fee 0.1425% + tax).

```
[RESULT] file=low_volatility_strategy name=sim1 CAGR 30.67% MDD -39.83% sharpe 1.04 win 53.21% window 2013-06-28 ~ 2026-09-21
[RESULT] file=momentum_strategy name=sim1 CAGR 10.07% MDD -60.73% sharpe 0.42 win 45.65% window 2008-04-30 ~ 2026-09-21
[RESULT] file=momentum_strategy name=sim2 CAGR 33.40% MDD -41.88% sharpe 1.09 win 53.27% window 2013-09-30 ~ 2026-09-21
[RESULT] file=monthly_revenue_momentum name=月營收動能10檔 CAGR 49.98% MDD -35.55% sharpe 1.46 win 43.71% window 2015-02-11 ~ 2026-06-18
[RESULT] file=monthly_revenue_momentum name=月營收動能20檔 CAGR 43.07% MDD -37.85% sharpe 1.43 win 45.40% window 2015-02-11 ~ 2026-06-18
[RESULT] file=program_trading name=動能輪動 CAGR 27.15% MDD -42.92% sharpe 1.04 win 52.87% window 2018-03-14 ~ 2026-09-21
[RESULT] file=program_trading name=均線趨勢過濾 CAGR 21.62% MDD -48.68% sharpe 0.74 win 49.18% window 2018-01-31 ~ 2026-09-21
[RESULT] file=program_trading name=月營收公告自動換股 CAGR 28.50% MDD -48.08% sharpe 0.94 win 51.78% window 2018-03-14 ~ 2026-09-21
[RESULT] file=stock_selection name=四因子複合 CAGR 21.03% MDD -24.78% sharpe 1.37 win 56.17% window 2018-03-14 ~ 2026-09-21
[RESULT] file=stock_selection name=價值＋品質＋股息 CAGR 20.82% MDD -32.19% sharpe 1.05 win 57.84% window 2018-03-31 ~ 2026-09-21
[RESULT] file=stock_selection name=籌碼選股 CAGR 14.69% MDD -43.97% sharpe 0.56 win 48.79% window 2018-01-31 ~ 2026-09-21
[RESULT] file=strategy_library_batch1 name=自由現金流多因子 CAGR 23.51% MDD -31.39% sharpe 1.16 win 49.38% window 2018-01-31 ~ 2026-09-21
```

Official published numbers for reference (snapshot 2026-06~08, full fee):

| strategy | CAGR | sharpe | MDD |
|---|---|---|---|
| four-factor-composite | 20.1% | 1.46 | -24.8% |
| monthly-revenue-momentum (10) | 50.0% | 1.46 | -35.5% |
| fcf-multifactor | 24.5% | 1.31 | -30.9% |
| value-quality-composite | 22.9% | 1.25 | -32.2% |
| momentum-rotation | 29.0% | 1.23 | -41.5% |
| composite-momentum | 36.4% | 1.18 | -40.1% |
| low-volatility-optimized | 33.3% | 1.13 | -38.2% |
| revenue-momentum-program | 29.1% | 1.05 | -47.2% |
| trend-filter-program | 26.2% | 0.95 | -42.5% |
| chips-institutional-flow | 16.5% | 0.70 | -39.3% |
