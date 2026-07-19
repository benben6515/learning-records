# Research 目錄分類

> 2026-07-19 重整，`git mv` 搬移保留歷史。

## 分類總覽

```
research/
├── health/         健康與醫學
├── science/        自然科學原理
├── spirituality/   靈性與神祕學
├── culture/        文化符號與傳統
├── engineering/    工業與工程技術
├── education/      學習進修與課程評測
├── games/          遊戲（既有）
└── epics/          世界神話九大子站（既有，HTML）
```

## 各分類內容

| 分類            | 檔案                                                                                                                                                 |
| --------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
| `health/`       | `breathing-science.md`、`breathing-shamanic.md`、`eye-care-guide-screen-smile.md`、`taiwan-food-health-risks.md`、`life-expectancy-global-trends.md` |
| `science/`      | `entropy-simple.md`、`heliocentrism-deep-research.md`                                                                                                |
| `spirituality/` | `chakra-research.md`、`rune-research.md`                                                                                                             |
| `culture/`      | `flower-language-dictionary-491.md`、`hanakotoba-floriography-guide.md`                                                                              |
| `engineering/`  | `injection-molding-machine.md`                                                                                                                       |
| `education/`    | `omscs-review.md`                                                                                                                                    |
| `games/`        | `expedition-33-english-guide.md`                                                                                                                     |
| `epics/`        | 九大文化神話子站，入口 `index.html`，規範見 `DESIGN.md`                                                                                              |

## 跨分類連結

跨資料夾互引用時相對路徑要手工修正。目前僅一處：

- `health/breathing-shamanic.md` → `../spirituality/chakra-research.md`

斷鏈檢查：

```bash
rg --no-heading '\]\([^)]*\.md\)|related:' research/
rg -n 'research/[a-z-]+\.md' --glob '!research/**' .
```

## 判類捷徑

| 主角是…                | 放哪            |
| ---------------------- | --------------- |
| 身體／疾病／養生       | `health/`       |
| 自然律／宇宙／物理     | `science/`      |
| 能量、脈輪、符文、儀式 | `spirituality/` |
| 花語、民俗、節慶、語言 | `culture/`      |
| 機器、製程、工業技術   | `engineering/`  |
| 課程、考試、進修路線   | `education/`    |
| 遊戲本身               | `games/`        |
| 神話敘事               | `epics/`        |

邊界模糊看主要關懷，跨類用 frontmatter `related:` 標關聯即可。
