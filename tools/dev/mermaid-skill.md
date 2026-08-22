# Mermaid 操作技能（agent 用）

> 目標：讀完這份就能**一次寫對** Mermaid，不依賴試錯。
> 教學筆記見 [mermaid.md](mermaid.md)；這份是速查 + 硬規則。

## 硬規則（寫圖前先掃一遍）

1. **文字含特殊字元必加雙引號**：`( ) [ ] { } : ; ,` 出現在標籤內 → `A["v2.0 (beta)"]`。含引號用 `#quot;`。
2. **`end` 是保留字**：任何節點 id 或標籤等於小寫 `end` 都會炸。用 `End`、`ending` 或 `["end"]`（引號內的 end 在部分圖型仍炸，直接避開這個詞）。
3. **換行**：`<br/>`，不是 `\n`。
4. **連線文字兩側留邊界**：優先用 `A -->|text| B`；`A -- text --> B` 的 text 開頭不可是 `o` 或 `x`（會被解析成 `--o` / `--x`）。
5. **id 與 label 分開想**：`id[label]` 中 id 只能是英數與底線。要顯示中文就 `C1[中文標籤]`，不要拿中文當 id（ER/sequence 的 participant 例外，可 `participant U as 使用者`）。
6. **subgraph 標題含空格或特殊字元**：`subgraph sg1[Group Name]`（id + 方括號標題）。
7. **註解**：`%%` 開頭整行註解，不能放在語法行尾。
8. **一張圖一個宣告**：不能兩個 `flowchart` 接在一起；要多圖就多個 code block。

## 選圖決策

| 需求                              | 用                            |
| :-------------------------------- | :---------------------------- |
| 流程 / 決策 / 分支                | `flowchart TD`（複雜改 LR）   |
| 前後端 / API / 協定訊息順序       | `sequenceDiagram`             |
| 狀態轉移、生命週期                | `stateDiagram-v2`             |
| OOP 類別、繼承關係                | `classDiagram`                |
| 資料庫 schema                     | `erDiagram`                   |
| 排程 / 任務相依                   | `gantt`                       |
| 佔比                              | `pie`                         |
| 時間軸大事記                      | `timeline`                    |
| 階層腦力激盪                      | `mindmap`                     |
| git 分支策略                      | `gitGraph`                    |
| 架構分層（不要求精準 UML）        | `flowchart` + subgraph 就夠   |

不確定就用 flowchart——它最寬容、渲染支援最廣。

## Flowchart 速查

```
flowchart TD
    %% 節點形狀
    A[矩形] --> B(圓角) --> C([體育場])
    C --> D{菱形} --> E[(DB)] --> F((圓))
    D --> G[/平行四邊形/] --> H[[次程序]]

    %% 連線
    X1 --> X2          %% 實線箭頭
    X1 --- X2          %% 實線無箭頭
    X1 -.-> X2         %% 虛線
    X1 ==> X2          %% 粗線
    X1 --o X2          %% 圓端點
    X1 --x X2          %% 叉端點
    X1 <--> X2         %% 雙向
    X1 -->|label| X2   %% 帶文字（優先用這個）
    X1 ----> X2        %% 拉長（更多橫線）

    %% 集合運算
    S1 --> S2 & S3     %% 一對多
    S4 & S5 --> S6     %% 多對一

    %% 分組
    subgraph sg1[前端]
        direction LR
        A --> B
    end
    sg1 --> C

    %% 樣式
    A:::hl --> B
    classDef hl fill:#f96,stroke:#333,stroke-width:2px
    style A fill:#f9f   %% 單點直改
```

- 方向：`TD` `BT` `LR` `RL`。子圖內可再 `direction`。
- 點擊外部連結：`click A "https://..." "tooltip" _blank`。

## SequenceDiagram 速查

```
sequenceDiagram
    autonumber
    participant U as 使用者
    participant F as 前端
    participant S as 伺服器

    U->>F: 點擊登入
    activate F
    F->>+S: POST /login
    S-->>-F: 200 OK + JWT
    F-->>-U: 顯示成功

    alt 成功
        S-->>F: token
    else 失敗
        S--xF: 401
    end

    loop 每 30 秒
        F->>S: refresh token
    end

    par 平行A
        F->>S: req1
    and 平行B
        F->>S: req2
    end

    Note over U,S: 跨參與者註解
    Note right of S: 單邊註解
```

- 箭頭：`->>` 實心、`-->>` 虛線回傳、`-x` 失敗、`-)` 非同步。
- 啟用：顯式 `activate X` / `deactivate X`，或速寫 `->>+` / `-->>-`（成對出現）。
- 區塊：`alt/else`、`opt`、`loop`、`par/and`、`break`、`critical/option`、`rect rgb(200,230,255)`。

## 狀態 / 類別 / ER 速查

```
stateDiagram-v2
    [*] --> Idle
    Idle --> Loading : 開始
    Loading --> Done : 成功
    state join_state <<join>>
    Loading --> Error : 失敗
    Error --> Idle
    Done --> [*]
    note right of Idle : 初始狀態
```

```
classDiagram
    direction LR
    class Animal {
        +String name
        +isMammal() boolean
    }
    Animal <|-- Dog          %% 繼承
    Flyable <|.. Bird        %% 實現介面
    Car *-- Engine           %% 組合
    Team o-- Player          %% 聚合
    User --> Account         %% 關聯
    Service ..> Logger       %% 依賴
    Animal "1" --> "0..*" Dog : 擁有
```

```
erDiagram
    CUSTOMER ||--o{ ORDER : 下單
    ORDER ||--|{ LINE_ITEM : 包含
    CUSTOMER ||--o| VIP : 升級
    CUSTOMER {
        string id PK
        string email UK
    }
    ORDER {
        int id PK
        int customer_id FK
    }
```

- ER 基數：`||` 恰一、`|o` 零或一、`}o` 零或多、`}|` 一或多。左實體—線—右實體，語意是「左 → 右」。
- 類別可見性：`+` public、`-` private、`#` protected。

## 甘特 / Pie / Timeline / Mindmap 速查

```
gantt
    title 專案時程
    dateFormat YYYY-MM-DD
    section 階段一
        需求訪談 :done, t1, 2026-09-01, 5d
        視覺設計 :active, t2, after t1, 10d
    section 階段二
        開發 :t3, after t2, 20d
        上線 :milestone, m1, after t3, 0d
```

- 任務格式：`名稱 :旗標, id, 起點, 工期`。旗標：`done` `active` `crit` `milestone`。相依用 `after id`，不要手算日期。

```
pie title 時間分配
    "Coding" : 60
    "會議" : 40
```

```
timeline
    title 演進
    2024 : v1 上線
    2025 : v2 重構 : 團隊擴編
    2026 : v3 AI 功能
```

```
mindmap
  root((主題))
    分支一
      葉A
      葉B
    分支二
      葉C
```

- mindmap **只靠縮排分層**，輸出時保持 2 空格一層，嚴禁 tab。

## 主題與外觀

```
%%{init: {"theme": "dark"}}%%
flowchart LR
    A --> B
```

- 主題：`default` `neutral` `dark` `forest` `base` `mono`。
- 手繪風（v11+，舊環境不支援）：`%%{init: {"look": "handDrawn"}}%%`。注意雙引號成對、結尾雙 `}`。
- 自訂色：`%%{init: {"theme":"base","themeVariables":{"primaryColor":"#f0f4ff"}}}%%`。

## 驗證流程（輸出前必做）

1. 語法沒把握 → 先在本檔對照速查，套用「硬規則」逐條掃。
2. 要交付 rendered 產物（SVG/PNG）時用 CLI：

```bash
npx -y @mermaid-js/mermaid-cli -i in.mmd -o out.svg
npx -y @mermaid-js/mermaid-cli -i in.mmd -o out.png -w 1600 -b transparent
```

   exit 0 = 語法合法；噴錯會附行號，回來修再跑。
3. 交付 Markdown 時，code fence 用三個反引號 + `mermaid`；**文件內含多個 mermaid block 時每個都要獨立 fence**。
4. 目標環境版本未知 → 避免-beta 圖型（`xychart-beta` `sankey-beta` `block-beta` `packet`）與 `look`，改用基本圖型。

## 高頻錯誤 → 修法

| 症狀                                   | 原因 / 修法                              |
| :------------------------------------- | :--------------------------------------- |
| 整張圖不出現，只看到 code              | fence 語言拼錯（`mermaid` 全小寫）或環境不支援 |
| Parse error 指向 subgraph 附近         | 標籤有裸 `end` 或 subgraph 標題沒加括號  |
| 節點文字斷在奇怪位置                   | 有 `( )` 沒包引號 → `A["..."]`           |
| 連線變成圓點/叉叉端                    | label 開頭是 `o`/`x` → 改 `-->|text|`    |
| 中文 id 噴錯                           | id 改英數，中文放 label                  |
| `&` 之後整行失效                       | 該行有特殊字元沒引號                     |
| mindmap 全擠成一層                     | 縮排被 tab / 貼上破壞，改 2 空格         |
| mermaid.live 正常、GitHub 不渲染       | GitHub 版本舊，用了 `-beta` 或新版屬性   |
