# 從零到一打造 Vue3 響應式系統

> 來源: https://rian.cc/blog/build-vue3-reactivity/
> 作者: 日安
> 整理時間: 2026-06-13

---

## 目錄

- [Day 1 - 序：為什麼都有 AI 了，還要研究 Vue](#day-1)
- [Day 2 - 基礎建設： Monorepo 與 pnpm Workspace 環境搭建](#day-2)
- [Day 3 - 核心概念： 從「訂閱者模式」看響應式設計](#day-3)
- [Day 4 - 核心概念：收集依賴、觸發更新](#day-4)
- [Day 5 - 核心概念：單向鏈表、雙向鏈表](#day-5)
- [Day 6 - 首次實作： 鏈表應用](#day-6)
- [Day 7 - 關注點分離： 拆分 track、trigger](#day-7)
- [Day 8 - Effect： 深入剖析巢狀 effect](#day-8)
- [Day 9 - Effect：調度器實作應用](#day-9)
- [Day 10 - Effect：為何會被指數級觸發？](#day-10)
- [Day 11 - Effect：Link 節點的複用實作](#day-11)
- [Day 12 - Effect ：多重依賴之指數觸發重現](#day-12)
- [Day 13 - Effect：多重依賴之節點復用解方](#day-13)
- [Day 14 - Effect：清理依賴的場景](#day-14)
- [Day 15 - Effect：依賴清理實作方案](#day-15)
- [Day 16 - 效能處理：LinkPool](#day-16)
- [Day 17 - 效能處理：無限循環](#day-17)
- [Day 18 - Reactive：深入 Proxy 的設計思路](#day-18)
- [Day 19 - Reactive：reactive 的基礎實作](#day-19)
- [Day 20 - Reactive：reactive 極端案例](#day-20)
- [Day 21 - Computed：即時更新基礎實作](#day-21)
- [Day 22 - Computed：深入緩存機制實作](#day-22)
- [Day 23 - Watch：基礎實作](#day-23)
- [Day 24 - Watch：Options](#day-24)
- [Day 25 - Watch ：清理 SideEffect](#day-25)
- [Day 26 - 陣列長度變更處理](#day-26)
- [Day 27 - toRef、toRefs、ProxyRef、unref](#day-27)
- [Day 28 - shallowRef、shallowReactive](#day-28)
- [Day 29 - readonly： 資料唯讀保護實作](#day-29)
- [Day 30 - 完賽心得](#day-30)

---

<a id="day-1"></a>

## Day 1 - 序：為什麼都有 AI 了，還要研究 Vue

> 日期: 2025-09-10

#### 前言

你是否有過對 Vue 的響應式系統感到疑惑的地方？當我們在程式碼中修改一個變數時，畫面上的內容就會自動更新。這個方便快速的背後機制到底是什麼？

了解這個底層邏輯，就是我這次想動手寫這個系列文章的初衷，我相信了解這套系統如何運作，是從「會用 Vue」到「了解 Vue」的關鍵。

有人會想說，AI 都橫空出世這麼久了，我們還有需要自己去了解這些底層嗎？我相信是有這個必要性，縱使 AI 可以快速告訴你答案，但還是有可能會遇到 AI 已經將這個答案告訴你了，你還是不了解這個背後的邏輯跟核心思考。

拆解知識內容，掰開揉碎，再讓腦子吞進去，就是我想做的事。

這個系列文章，主要包含了我對響應式系統原始碼概念的解析與思考，並記錄下整個響應式系統的建構流程。

整個過程以實作為主，從建立一個 `monorepo` 專案開始，這個架構與官方原始碼相同，這樣可以模擬真實官方原始碼的模組化管理。

需要特別說明的是，文中出現的程式碼範例並非出全都自我個人原創，而是來自學習過程中所參考的實作，取用都有取得允許；而相關的理解與延伸，則是我在吸收後的個人整理與筆記。

主要內容範圍包含：我們常用 的API `ref`、`reactive`、`computed`、`watch`，還有 `effect` 與響應式物件之間的關係、鏈表核心概念等等。

希望透過這個系列，不僅能加深自己對 Vue 3 的理解，也能與同樣對底層機制感到好奇的人，分享我一路下來的學習收穫。

---

<a id="day-2"></a>

## Day 2 - 基礎建設： Monorepo 與 pnpm Workspace 環境搭建

> 日期: 2025-09-11

#### 前言

Vue 3 的原始碼由多個模組構成，除了我們常用的核心功能外，還包含了響應式、工具函式等多個獨立模組。為了模擬 Vue 官方的開發環境，管理這些分散的模組，我們會採用 Monorepo 架構來進行專案管理，並且使用 pnpm workspace。

強烈建議大家一定要跟著 coding，只是看過，容易停留在僅是知道的階段。

##### 什麼是 Monorepo？

Monorepo 是一個管理程式碼的方式，指將不同的專案在單一的程式碼倉庫 (repository) 中，對多個不同的專案進行版本控制。

##### Monorepo 的特點

- 集中式開發：所有專案的程式碼都集中在同一個 repository 中。

- 工具共享：因為統一管理，所以CICD、風格化工具等等都可以共用，並且只設定一次。

- 統一版本控制：在 monorepo 進行 commit，可以橫跨多個子專案。

##### 什麼是 pnpm workspace？

pnpm workspace 是 pnpm 套件工具提供的一個功能，核心目標是可以在 repo 裡面安裝相依套件，並且共用 `node_module`，子專案在 repo 中，可以互相引用。

##### pnpm workspace 的特點

- 相依套件提升至根目錄：節省空間。

- 模組共享簡單：用 `workspace:*` 直接引用。

- 集中管理：一個指令可以管理所有子專案，`pnpm install` → 安裝全部專案的相依套件。

#### 環境建置

1. 我們先建立一個資料夾，執行 `pnpm init`。

2. 新增`pnpm-workspace.yaml`，並且我們要管理 `packages` 下面的子專案。

```typescript
packages: -'packages/*'
```

1. 在根目錄下新增 `tsconfig.json`，這是typescript 設定檔（偉哉GPT幫我寫註解）：

```typescript
{
  "compilerOptions": {
    // 編譯輸出 JavaScript 的目標語法版本
    // ESNext：永遠輸出到最��的 ECMAScript 標準
    "target": "ESNext",

    // 模組系統類型
    // ESNext：使用最新的 ES Modules（import / export）
    "module": "ESNext",

    // 模組解析策略
    // "node"：模仿 Node.js 的方式去解析模組 (例如 node_modules, index.ts, package.json 中的 "exports")
    "moduleResolution": "node",

    // 編譯後的輸出資料夾
    "outDir": "dist",

    // 允許直接 import JSON 檔案，編譯器會把 JSON 當作模組
    "resolveJsonModule": true,

    // 是否啟用嚴格模式
    // false：關閉所有嚴格型別檢查（比較寬鬆）
    "strict": false,

    // 編譯時會包含哪些內建 API 定義檔（lib.d.ts）
    // "ESNext"：最新 ECMAScript API
    // "DOM"：瀏覽器環境的 API，例如 document, window
    "lib": ["ESNext", "DOM"],

    // 自訂路徑對應（Path Mapping）
    // "@vue/*" 會對應到 "packages/*/src"
    // 例如 import { reactive } from "@vue/reactivity"
    // 會被解析到 packages/reactivity/src
    "paths": {
      "@vue/*": ["packages/*/src"]
    },

    // 基準目錄，用來搭配 paths 做相對解析
    "baseUrl": "./"
  }
}
```

1. 新增 `packages` 資料夾，裡面會加入許多子專案，包含響應系統等等。

2. 執行 `pnpm i typescript esbuild @types/node -D -w`，`-w`表示是安裝在 workspace。

3. 執行 `pnpm i vue -w` ，安裝 vue，之後更好可以比較。

4. 執行 `npx tsc --init`，初始化專案下的 typescript。

5. 在根目錄的 `package.json` 中加上 `type:module`。

`.js` 會讓 Node.js 預設將 .js 檔案視為 ES Module (ESM)。

6. `.cjs` 如果沒有這個設定，.js 檔案會被當作 CommonJS 模組處理。

7. 接下來我們在`package`資料夾下新增三個子專案目錄`reactivity`、`shared`、`vue`，以及下方檔案：

響應式模組 reactivity: `reactivity/src/index.ts`、`reactivity/package.json`

8. 工具函式 shared: `shared/src/index.ts`、`shared/package.json`

9. 核心功能 vue: `vue/src/index.ts`、`vue/package.json`

10. 為了讓我們的子專案有跟 Vue 官方套件類似的設定，我們先將 `node_modules/.pnpm/@vue+reactivity/reactivity/package.json`複製一份到`reactivity/package.json`，簡化後的內容如下：

```typescript
{
  "name": "@vue/reactivity",
  "version": "1.0.0",
  "description": "響應式模組",
  "main": "dist/reactivity.cjs.js",
  "module": "dist/reactivity.esm.js",
  "files": [
    "index.js",
    "dist"
  ],
  "sideEffects": false,
  "buildOptions": {
    "name": "VueReactivity",
    "formats": [
      "esm-bundler",
      "esm-browser",
      "cjs",
      "global"
    ]
  },
}
```

```typescript
{
  "name": "@vue/shared",
  "version": "1.0.0",
  "description": "工具函式",
  "main": "dist/shared.cjs.js",
  "module": "dist/shared.esm.js",
  "files": [
    "index.js",
    "dist"
  ],
  "sideEffects": false,
  "buildOptions": {
    "name": "VueShared",
    "formats": [
      "esm-bundler",
      "esm-browser",
      "cjs",
      "global"
    ]
  }
}
```

```typescript
{
  "name": "vue",
  "version": "1.0.0",
  "description": "vue核心模組",
  "main": "dist/vue.cjs.js",
  "module": "dist/vue.esm.js",
  "files": [
    "dist"
  ],
  "sideEffects": false,
  "buildOptions": {
    "name": "Vue",
    "formats": [
      "esm-bundler",
      "esm-browser",
      "cjs",
      "global"
    ]
  }
}
```

1. 執行 `pnpm i @vue/shared --workspace --filter @vue/reactivity` 將工具函式專案安裝到響應式模組。

2. 接著在根目錄下新增一個`script/dev.js`：

在根目錄的`package.json`加入`script:node scripts/dev.js --format esm`指令
開發時，我們會透過執行這個腳本來啟動。它會使用 esbuild 進行即時編譯，並在首次編譯後持續監聽檔案變動。

```typescript
/**
 * 打包「開發環境」使用的腳本
 *
 * 用法示例：
 *   node scripts/dev.js --format esm
 *   node scripts/dev.js -f cjs reactive
 *
 * - 位置參數（第一個）用來指定要打包的子套件名稱（對應 packages/<name>）
 * - --format / -f 指定輸出格式：esm | cjs | iife（預設 esm）
 */

import {parseArgs} from 'node:util'
import {resolve, dirname} from 'node:path'
import {fileURLToPath} from 'node:url'
import esbuild from 'esbuild'
import {createRequire} from 'node:module'

/**
 * 解析命令列參數
 * allowPositionals: 允許使用位置參數（例如 reactive）
 * options.format: 支援 --format 或 -f，型別為字串，預設 'esm'
 */
const {
  values: {format},
  positionals,
} = parseArgs({
  allowPositionals: true,
  options: {
    format: {
      type: 'string',
      short: 'f',
      default: 'esm',
    },
  },
})

/**
 * 在 ESM 模式下建立 __filename / __dirname
 * - ESM 沒有這兩個全域變數，因此透過 import.meta.url 轉換得到
 */
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

/**
 * 在 ESM 中建立一個 require()
 * - 用來載入 CJS 風格資源（例如 JSON）
 */
const require = createRequire(import.meta.url)

/**
 * 解析要打包的 target
 * - 若有提供位置參數，取第一個；否則預設打包 packages/vue
 */
const target = positionals.length ? positionals[0] : 'vue'

/**
 * 入口檔案（固定指向 packages/<target>/src/index.ts）
 */
const entry = resolve(__dirname, `../packages/${target}/src/index.ts`)

/**
 * 決定輸出檔路徑
 * - 命名慣例：<target>.<format>.js
 *   例：reactive.cjs.js / reactive.esm.js
 */
const outfile = resolve(__dirname, `../packages/${target}/dist/${target}.${format}.js`)

/**
 * 讀取目標子套件的 package.json
 * - 常見做法是從中讀 buildOptions.name，作為 IIFE/UMD 的全域變數名
 * - 若 package.json 沒有 buildOptions，請自行調整
 */
const pkg = require(`../packages/${target}/package.json`)

/**
 * 建立 esbuild 編譯 context 並進入 watch 模式
 * - entryPoints: 打包入口
 * - outfile: 打包輸出檔案
 * - format: 'esm' | 'cjs' | 'iife'
 * - platform: esbuild 的目標平台（'node' | 'browser'）
 *   * 這裡示範：如果是 cjs，就傾向 node；否則視為 browser
 * - sourcemap: 方便除錯
 * - bundle: 把相依打進去（單檔輸出）
 * - globalName: IIFE/UMD 下掛在 window 的全域名稱（esm/cjs 不會用到）
 */
esbuild
  .context({
    entryPoints: [entry], // 入口檔
    outfile, // 輸出檔
    format, // 輸出格式：esm | cjs | iife
    platform: format === 'cjs' ? 'node' : 'browser', // 目標平台：node 或 browser
    sourcemap: true, // 產生 source map
    bundle: true, // 打包成單檔
    globalName: pkg.buildOptions?.name, // IIFE/UMD 會用到；esm/cjs 可忽略
  })
  .then(async (ctx) => {
    // 啟用 watch：監聽檔案變更並自動重建
    await ctx.watch()
    console.log(`[esbuild] watching "${target}" in ${format} mode → ${outfile}`)
  })
  .catch((err) => {
    console.error('[esbuild] build context error:', err)
    process.exit(1)
  })
```

```typescript
{
  "name": "vue3-source-code",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "type": "module",
  "scripts": {
    "dev": "node scripts/dev.js reactivity --format esm"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "@types/node": "^24.2.1",
    "esbuild": "^0.25.9",
    "typescript": "^5.9.2"
  },
  "dependencies": {
    "vue": "^3.5.18"
  }
}
```

#### 運行測試

- 在`package/reactivity/src/index.ts` 寫一個導出函式

```typescript
export function fn(a, b) {
  return a + b
}
```

- 執行`pnpm dev`，你應該會在`package/reactivity/dist/reactivity.esm.js` 看到以下內容

```typescript
function fn(a, b) {
  return a + b
}
export {fn}
```

那就代表環境建置成功了！

檔案結構如下：

---

<a id="day-3"></a>

## Day 3 - 核心概念： 從「訂閱者模式」看響應式設計

> 日期: 2025-09-12

在正式開始實作我們自己的響應式 API 之前，我們先建立一個簡單的測試環境，來觀察 Vue 官方 `ref`和`effect`的實際情況。
先在`packages/reactivity/`目錄下新增一個`example`資料夾，並建立`index.html`檔案：

- 我們預期進入頁面時，控制台會輸出 `0`

- 一秒後，控制台會輸出 `1`

接著本地啟動這個 `html` 檔案，這邊可以使用 live server 套件，即可在本地中運行。

```typescript
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>
<body>


  <script type="module">
    import { ref, effect } from '../../../node_modules/vue/dist/vue.esm-browser.js'

    const count = ref(0)

    effect(() => {
      console.log('count.value ==>', count.value);
    })

    setTimeout(() => {
      count.value++
    }, 1000)
  </script>
</body>
</html>
```

我們可以看到 `console` 控制台中進入頁面時，出現輸出 `0`，並且一秒後再輸出 `1`。

由於我們目前使用的是 Vue 官方提供的版本，因此這個行為是完全正常的。

我們現在開始實作，現在知道有兩件事：

- 我們進入頁面時，傳入 `effect` 的函式會執行

- `ref` 函式會接收一個初始值，並回傳一個物件。我們可以透過該物件的 `.value` 屬性來存取或修改這個值。

所以我們先在 `package/reactivity/src`下新增兩個檔案，分別是 `ref.ts` 以及`effect.ts`，並且在 `index.ts` 集中匯出。

```typescript
class RefImpl {
  _value // 保存實際數值
  constructor(value) {
    this._value = value //儲存傳入 ref 的數值
  }
}

export function ref(value) {
  return new RefImpl(value) // 建立一個 ref 實例
}
```

```typescript
export function effect(fn) {
  fn() // 執行傳入的函式
}
```

```typescript
export * from './ref'
export * from './effect'
```

接著我們把官方的引用註解，引入我們的 `dist` 檔案，看看是否成功。

```typescript
// import { ref, effect } from '../../../node_modules/vue/dist/vue.esm-browser.js'
import {ref, effect} from '../dist/reactivity.esm.js'

const count = ref(0)

effect(() => {
  console.log('count.value ==>', count.value)
})

setTimeout(() => {
  count.value++
}, 1000)
```

執行後會發現，第一次的輸出是 `undefined`，且一秒後沒有任何變化。這完全正常，畢竟我們還沒實作任何依賴追蹤的機制。

這次沒有成功，讓我們了解了確切的問題所在：

1. 無法取值： `count.value`讀取到的是`undefined`。這是因為我們還沒有定義當讀取 `.value` 時應該做什麼事 (缺少 getter 攔截)。

2. 沒有更新： 修改 `count.value++` 後，`effect`內的函式沒有重新執行。這是因為`effect`和`count` 之間沒有建立任何關聯（缺少訂閱機制）。

為了解決這兩個問題，我們需要引入響應式系統中最核心的設計模式。

我們接下來要解決的核心問題：依賴收集和觸發更新。

#### 響應式系統核心概念

```typescript
const count = ref(0)

effect(() => {
  console.log('count.value ==>', count.value)
})

setTimeout(() => {
  count.value++
}, 1000)
```

參考上方程式碼，我們現在想要做的是進入頁面的時候，`count` 會輸出 `0`，但我們一但修改了`count`，`effect` 的函式輸出就會跟著改變，這也是我們在 Vue3 裡面很常做的事，所以我們可以知道響應式的核心概念就是：當資料發生改變，相關的副作用會自動更新。

這個「資料改變，相關操作自動執行」的模式，其實可以用一個生活化的例子來比喻：出版社與訂閱者。

1. 路人甲（effect 函式） 訂閱了科技雜誌

希望出版社將雜誌自動送到他家，不用他去催促

2. 只要看雜誌（讀取 `count.value`）就自動成為訂閱者 ← 這是依賴收集

3. 出版社（ref） 管理雜誌內容

擁有所有訂閱者的名單 ← 依賴收集的結果

4. 負責儲存最新的雜誌內容（資料值）

5. 自動配送機制

當雜誌有新版（`count.value` 被修改）

6. 出版社會自動寄送雜誌給所有訂閱者（執行 effect） ← 這是觸發更新

```typescript
// 出版社（儲存資料 + 管理訂閱者）
const count = ref(0)

// 路人甲訂閱（當他「閱讀」雜誌時，自動成為訂閱者）
effect(() => {
  console.log('count.value ==>', count.value) // 閱讀雜誌
})

// 出版社發行新版雜誌
setTimeout(() => {
  count.value++ // 新版發行，自動通知所有訂閱者
}, 1000)
```

#### Pub-Sub Pattern 發布訂閱模式

這個「出版社-訂閱者」的互動模式，在軟體設計中被稱為發布-訂閱模式 (Publish-Subscribe Pattern)，或簡稱 Pub-Sub。

##### 傳統發布訂閱模式

```typescript
// 發布者（出版社）
class Publisher {
  constructor() {
    this.subscribers = [] // 訂閱者名單
  }

  // 訂閱方法
  subscribe(subscriber) {
    this.subscribers.push(subscriber)
    console.log(`${subscriber.name} 已訂閱`)
  }

  // 發布方法
  publish(content) {
    console.log(`發布新內容: ${content}`)
    this.subscribers.forEach((sub) => {
      sub.notify(content) // 通知所有訂閱者
    })
  }
}

// 訂閱者
class Subscriber {
  constructor(name) {
    this.name = name
  }

  notify(content) {
    console.log(`${this.name} 收到: ${content}`)
  }
}

// 使用範例
const magazine = new Publisher()
const 路人甲 = new Subscriber('路人甲')
const 路人乙 = new Subscriber('路人乙')

magazine.subscribe(路人甲) // 路人甲訂閱
magazine.subscribe(路人乙) // 路人乙訂閱

magazine.publish('AI 特刊') // 發布新刊
```

#### 圖解

這個模式的運作流程可以分為兩個主要階段：

1. 訂閱階段 (初始化):

- 註冊： 訂閱者 (Subscriber) 需要主動向發布者 (Publisher) 進行註冊。

- 收集： 發布者將所有訂閱者的資訊收集起來，存放在一個名單中。

2. 發布階段 (更新):

- 發布： 當有新內容發布時，發布者會發出通知。

- 通知： 發布者會遍歷訂閱者名單，將新內容逐一發送給所有訂閱者。

#### Vue 發布訂閱模式

```typescript
// 自動訂閱（依賴收集）
effect(() => {
  console.log(count.value) // 讀取即訂閱
})

// 修改時自動通知
count.value++ // 自動觸發更新
```

Vue 發布訂閱模式，與一般傳統發布訂閱模式不同

- 自動訂閱（依賴收集階段）

不需要手動呼叫 subscribe 方法

- effect 讀取 `ref.value` 時，自動建立訂閱關係

- ref 在被讀取時，自動收集當前的 `effect` 作為訂閱者

**自動發布（觸發更新階段）**

- 不需要手動呼叫 publish 方法

- `ref.value` 被修改時，自動通知所有訂閱者

- 相關的 `effect` 自動重新執行

---

<a id="day-4"></a>

## Day 4 - 核心概念：收集依賴、觸發更新

> 日期: 2025-09-13

```typescript
const count = ref(0)

effect(() => {
  console.log('count.value ==>', count.value)
})

setTimeout(() => {
  count.value++
}, 1000)
```

昨天我們的目標是讓一段簡單的 `ref` 和 `effect` 程式碼能夠自動響應。

1. 進入頁面輸出 `count.value ==> 0`

2. 一秒後自動輸出 `count.value ==> 1`

然而，我們初次實作遇到問題：無法正確取值(`undefined`)，也無法在值變更後觸發更新。

為了解決這個問題，我們要去思考 `ref` 需要做的事：

1. 當取得值，`ref` 要怎麼知道誰在讀取？

2. 觸發更新之後，`ref` 要怎麼知道要通知誰？

#### 讓 Ref 知道誰在讀取

```typescript
// 原本的程式碼
class RefImpl {
  _value
  constructor(value) {
    this._value = value
  }
}
```

現在要加入 getter 和 setter，讓 `count.value` 能正常運作：

```typescript
class RefImpl {
  _value

  constructor(value) {
    this._value = value
  }

  // 新增 getter：讀取 value 時觸發
  get value() {
    console.log('有人讀取了 value!')
    return this._value
  }

  // 新增 setter：設定 value 時觸發
  set value(newValue) {
    console.log('有人修改了 value!')
    this._value = newValue
  }
}
```

現在看起來 `count.value` 可以正常返回值，但這個時候還是不知道讀取誰、通知誰。

#### Effect 函式

```typescript
export function effect(fn) {
  fn()
}
```

這時候我們需要儲存當前執行的 effect 函式。

```typescript
// 用來保存目前現在正在執行的 effect 函式
export let activeSub

export function effect(fn) {
  activeSub = fn
  activeSub()
  activeSub = undefined
}
```

這個新版的 `effect` 函式做了三件事：

1. 註冊 Side Effect ： 在執行傳入的函式 `fn`之前，先將它賦值給全域變數`activeSub`。

2. 執行 Side Effect： 立即執行 `fn()`。如果在執行過程中讀取了某個 `ref`的`.value`，這個 `ref`就能透過`activeSub` 知道是誰在讀取它。

3. 清除 Side Effect： 執行完畢後，必須將 `activeSub`清空 (設為`undefined`)。這非常重要，它能確保只有在 `effect`的執行期間，讀取`ref`的行為才會被視為依賴收集。

#### 收集依賴實作

現在我們要讓 `ref` 能夠：

1. 在被讀取時，記錄是誰在讀取（依賴收集）

2. 在被修改時，通知所有讀取者（觸發更新）

我們可以在 getter 在讀取值的時候，判斷`activeSub`是否存在，來確認當下情況是不是要收集依賴。

```typescript
import {activeSub} from './effect'

class RefImpl {
  _value
  subs // 新增：用來儲存訂閱者

  constructor(value) {
    this._value = value
  }

  // 新增 getter：讀取 value 時觸發
  get value() {
    // 依賴收集：如果有 activeSub，就記錄下來
    if (activeSub) {
      this.subs = activeSub
    }
    return this._value
  }

  // 新增 setter：設定 value 時觸發
  set value(newValue) {
    // 觸發更新：如果有訂閱者，就執行它
    if (this.subs) {
      this.subs() // 重新執行 effect
    } // 可簡寫 this.subs?.()
  }
}
```

為了方便在後續的系統中判斷一個變數是否為`ref`物件，我們可以新增一個輔助函式 `isRef` 和一個內部標記：

```typescript
enum ReactiveFlags {
  IS_REF = '__v_isRef'
}

class RefImpl {
  _value;
  subs;  // 新增：用來儲存訂閱者
  [ReactiveFlags.IS_REF] = true

  ...
}

export function isRef(value){
  return !!(value && value[ReactiveFlags.IS_REF])
}
```

現在，讓我們將所有部分串連起來，完整地模擬執行流程。

#### 完整執行流程

##### 頁面初始化與依賴收集

剛開始進入頁面。

```typescript
import {ref, effect} from '../dist/reactivity.esm.js'

const count = ref(0)
```

程式執行：`const count = ref(0)`

- 執行 `ref(0)`，建立一個 `RefImpl` 實例。

- 此時 `count` 實例的內部狀態為：

`_value: 0`

- 沒有任何訂閱者：`subs: undefined`

- 帶有一個內部標記：`__v_isRef: true`

呼叫 `effect` 函式，並傳入匿名函式 `fn` 作為參數。

```typescript
effect(() => {
  console.log('effect', count.value)
})
```

##### 進入 `effect` 函式內部

```typescript
export let activeSub

export function effect(fn) {
  activeSub = fn
  activeSub()
  activeSub = undefined
}
```

1. 設定 `activeSub：` `activeSub` 被賦值為 `fn`：`activeSub = fn`。

2. 立刻執行 `fn()`

執行 `console.log('effect', count.value)`

3. 觸發了 `count` 實例的 `get value()`。

4. 進入 `getter` 內部：

- `if(activeSub)` 條件成立，`activeSub` 正是我們的 `fn`。

```typescript
if (activeSub) {
  this.subs = activeSub
}
```

1. 執行「收集依賴」：`this.subs = activeSub`。

2. 現在 `count` 實例透過 `subs` 屬性，記住了是 `fn` 在依賴它。

3. `getter` 回傳 `this._value`（也就是 0）。

4. `console.log` 輸出：`effect 0`。

`activeSub = undefined`（執行完成後清空，沒有 effect 在執行）。

此時

1. `count.subs` 就是傳入 `effect` 的函式。

2. 依賴關係：`count` → `effect(fn)`。

##### 一秒之後

- `set value(newValue)` 被呼叫，`this._value = 1`。

- `this.subs?.()` 若有訂閱者就呼叫（這裡就是前面存起來的 `effect` 函式）

- 觸發更新 `effect` 函式再次執行

`console.log('effect', count.value)` → 讀 getter → 看見沒有 `activeSub`，所以不會收集依賴。

- 這會直接執行 effect 函式本體，不是再經過 `effect(fn)` 的包裝流程，所以第二次之後執行 effect 時 `activeSub` 是 `undefined`。

- `console.log` 輸出：`effect 1`。

這樣我們就完成響應式依賴收集的最小可行版本。

完整程式碼

`ref.ts`

```typescript
import {activeSub} from './effect'

enum ReactiveFlags {
  IS_REF = '__v_isRef',
}

class RefImpl {
  _value; // 保存實際數值
  // ref 標記，證實是個 ref
  [ReactiveFlags.IS_REF] = true

  subs
  constructor(value) {
    this._value = value
  }

  // 收集依賴
  get value() {
    // 當有人訪問的時候，可以取得 activeSub
    if (activeSub) {
      //當有 activeSub 儲存值，以便更新後觸發
      this.subs = activeSub
    }
    return this._value
  }

  // 觸發更新
  set value(newValue) {
    this._value = newValue
    // 通知 effect 重新執行，取得最新的 value
    this.subs?.()
  }
}

export function ref(value) {
  return new RefImpl(value)
}

export function isRef(value) {
  return !!(value && value[ReactiveFlags.IS_REF])
}
```

`effect.ts`

```typescript
// 用來保存目前現在正在執行的 effect 函式
export let activeSub

export function effect(fn) {
  activeSub = fn
  activeSub()
  activeSub = undefined
}
```

---

<a id="day-5"></a>

## Day 5 - 核心概念：單向鏈表、雙向鏈表

> 日期: 2025-09-14

在昨天，我們建立了響應式的基本運作模式。在繼續深入之前，要先了解 Vue 內部用來優化效能的一個核心概念：資料結構。Vue 3 的響應式系統之所以效率高，內部對資料結構的選擇是關鍵。

一個理想的資料結構需要能有效處理以下操作：

- 動態關聯： effect 與資料之間的依賴關係是能動態建立與解除。

- 快速增刪： 當依賴關係變化時，需要快速地執行新增或移除操作。

為了滿足這些高效能要求，Vue 選擇了鏈表 (Linked List) 作為解決方案。本文將深入探討其運作原理。

#### 單向鏈表

- 型別是物件

- 第一個節點是頭節點、最後一個節點稱為尾節點

- 所有節點都透過 `next` 屬性連結起來。

```typescript
// 頭節點是 head
let head = {value: 1, next: undefined}
const node2 = {value: 2, next: undefined}
const node3 = {value: 3, next: undefined}
const node4 = {value: 4, next: undefined}

// 建立鏈表之間的關系
head.next = node2
node2.next = node3
node3.next = node4
```

##### 刪除中間節點

假設我們要刪除 `node3`，但在單向鏈表中，只有 `node3` 本身的參考是無法直接進行操作，因為我們無法存取到它的前一個節點 (`node2`)。因此，我們必須從頭節點 (`head`) 開始遍歷，直到找到 `node2` 為止：

```typescript
const node3 = {value: 3, next: undefined}

let current = head
while (current) {
  // 找到 node3 的上一個節點
  if (current.next === node3) {
    // 把 node3 的上一個指向 node3 的下一個
    current.next = node3.next
    break
  }
  current = current.next
}

console.log(head) // 輸出新的鏈表 1->2->4
```

#### 雙向鏈表

- 每個節點都有：

`value`: 儲存的值

- `next`: 指向下一個節點

- `prev`: 指向上一個節點

雙向鏈表，沒有尾節點就沒有頭節點。

它最大的優勢在於，從任何一個節點出發，都能夠雙向遍歷，這在特定節點前後進行新增或刪除都能非常快速。

```typescript
// 假設鏈表的頭節點是 head

let head = {value: 1, next: undefined, prev: undefined}

const node2 = {value: 2, next: undefined, prev: undefined}

const node3 = {value: 3, next: undefined, prev: undefined}

const node4 = {value: 4, next: undefined, prev: undefined}

// 建立鏈表之間的關系
head.next = node2
// node2 的上一個節點指向 head
node2.prev = head
// node2 的下一個指向 node3
node2.next = node3
// node3 的上一個節點指向 node2
node3.prev = node2
// node3 的下一個指向 node4
node3.next = node4
// node4 的上一個指向 node3
node4.prev = node3
```

##### 刪除中間節點

假設我們現在手上有中間節點 `node3`要刪除，該怎麼做：

```typescript
const node3 = {value: 3, next: undefined, prev: undefined}

// 如果 node3 有上一個，那就把上一個節點的下一個指向 node3 的下一個
if (node3.prev) {
  node3.prev.next = node3.next
} else {
  head = node3.next
}

if (node3.next) {
  node3.next.prev = node3.prev
}
console.log(head) // 輸出新的鏈表 1->2->4
```

可以看到，在有已知目標節點的前提下，執行刪除行為完全不需要從頭遍歷，時間複雜度為 O(1)。

#### 單向鏈表與雙向鏈表比較

現在我們要在 C 節點之前新增一個 X 節點

#### 單向鏈表

- 時間複雜度： O(n)

- 原因： 需要遍歷找到前一個節點

##### 執行步驟

步驟 1：從頭節點開始遍歷查找

步驟 2：檢查節點 A，不是目標節點的前一個，繼續遍歷

步驟 3：找到目標節點 C 的前一個節點 B（因為 B 的 next 屬性是 C）

步驟 4：新建新節點 X

步驟 5：設定 `X.next = C`

步驟 6：設定 `B.next = X`

#### 雙向鏈表

- 時間複雜度： O(1)

- 原因： 直接通過 prev 指針訪問前一個節點

##### 執行步驟

步驟 1：直接通過目標節點的 prev 指針找到前一個節點

步驟 2：建立新節點 X

步驟 3：設定 `X.next = C`, `X.prev = B`

步驟 4：設定 `B.next = X`, `C.prev = X`

我們可以發現：

- 單向鏈表：結構簡單，適合只需要向前遍歷的場景。

- 雙向鏈表：更靈活但佔用更多記憶體，適合需要雙向操作的場景。

到目前為止，我們已經了解了鏈表的原理。然而在許多可以用來儲存資料集合的結構中，為什麼 Vue 的響應式系統會選擇鏈表，而不是我們更常用的陣列 (Array) 呢？

#### 鏈表與陣列的比較

##### 特性

陣列 (Array) 最大的優點是讀取效能極佳。由於內存空間是連續的，我們可以透過索引 [i] 直接定位到任何元素，時間複雜度為 O(1)。

```typescript
const arr = ['a', 'b', 'c', 'd'] // a=>0  b=>1  c=>2  d=>3

// 刪除陣列的第一項
arr.shift()

console.log(arr) // ['b', 'c', 'd'] b=>0  c=>1  d=>2
```

鏈表：新增、刪除元素更快 (O(1))，但查找元素需要遍歷整個鏈表（O（n））。

```typescript
// 頭節點是 head
let head = {
  value: 1,
  next: {
    value: 2,
    next: {
      value: 3,
      next: {
        value: 4,
        next: null,
      },
    },
  },
}
// 刪除鏈表第一個節點
head = head.next // 將頭節點指向下一個節點 node2
console.log(head)
// 輸出新的頭節點［2, 3， 4］
```

##### 刪除頭、尾項

陣列

- 新增操作需要移動後續元素，可能導致效能下降 （O(n)）。

- 刪除操作同樣需要移動後續元素，效能也為（O(n））。

鏈表

- 新增操作只需修改指針，性能為（O(1)）。

- 刪除操作也只需修改指針，性能為（O(1)）。

總結來說，雖然雙向鏈表在記憶體佔用上略高於單向鏈表，但它可以提供的 O(1) 複雜度的新增與刪除方法，這對於需要頻繁操作依賴集合的響應式系統來說，是非常重要的。
我們理解了鏈表的運作原理後，明天我們會繼續`ref`的實作中，結合我們今天學到的鏈表知識來改造響應式系統。

---

<a id="day-6"></a>

## Day 6 - 首次實作： 鏈表應用

> 日期: 2025-09-15

```typescript
import {ref, effect} from '../dist/reactivity.esm.js'

const count = ref(0)

effect(() => {
  console.log('effect1', count.value)
})

effect(() => {
  console.log('effect2', count.value)
})

setTimeout(() => {
  count.value = 1
}, 1000)
```

昨天，我們了解鏈表的核心觀念，現在要把這些概念結合起來。

首先讓我們從一個常見的場景開始：當一個響應式數據（`ref`）同時被多個 `effect` 依賴時，會發生什麼？

我們預期他可以輸出如下：

```typescript
console.log('effect1', 0)
console.log('effect2', 0)
//1秒後
console.log('effect1', 1)
console.log('effect2', 1)
```

但實際上我們得到的是：

```typescript
console.log('effect1', 0)
console.log('effect2', 0)
//1秒後
console.log('effect2', 1)
```

#### 發生什麼事？

結果很明顯：我們上次做的`ref`實作，只能讓`this.subs`屬性一次記住一個訂閱者，導致後來的`effect`覆蓋前面。這會造成以下問題：

- 每次有新的 `effect` 訂閱時，會覆蓋掉前一個

- 導致只有最後一個 `effect` 能收到更新通知

```typescript
get value(){
  if(activeSub){
    this.subs = activeSub
  }
  return this._value
}
```

##### 第一個`effect`加入

- 執行`console.log('effect1', 0)`

- 收集依賴 `effect(fn1)`，`activeSub = fn1`，然後立刻執行 `fn1()`。

- `fn1` 讀取 `count.value` → 進入 getter：

`activeSub` 存在 → `this.subs = activeSub`（把 `subs` 指到 `fn1`）。

- 回傳 `0`，所以印出 `effect1 0`。

`effect(fn1)` 結束，把 `activeSub` 清回 `undefined`。

##### 第二個`effect`加入

- 執行`console.log('effect2', 0)`

- 收集依賴 `effect(fn2)`，`activeSub = fn2`，執行 `fn2()`。

- `fn2` 讀 `count.value` → getter：

`activeSub` 存在 → `this.subs = activeSub` 覆蓋掉 `fn1`，現在 `subs === fn2`。

- 回傳 `0`，印出 `effect2 0`。

`effect(fn2)` 結束，把 `activeSub` 清回 `undefined`。

##### 一秒後更新觸發

```typescript
set value(newValue){
    this._value = newValue
    this.subs?.()
  }
```

- 執行 `count.value = 1`

- 進入 setter：`this._value = 1`。

- 呼叫 `this.subs?.()` → 直接呼叫目前存在於 `subs` 的函式 `fn2`。

- 因為只有 `fn2` 被呼叫，所以只印出 `console.log('effect2', 1)`。

#### 問題解決方案

接下來我們運用上次說的鏈表，來處理被覆蓋的問題，這邊我們使用雙向鏈表：

```typescript
// 定義鏈表節點結構
interface Link {
  // 保存 effect
  sub: Function
  // 下一個節點
  nextSub: Link
  // 上一個節點
  prevSub: Link
}

class RefImpl {
  _value;
  [ReactiveFlags.IS_REF] = true

  subs: Link //訂閱者鏈表頭節點
  subsTail: Link //訂閱者鏈表尾節點

  constructor(value) {
    this._value = value
  }

  get value() {
    if (activeSub) {
      // 建立節點
      const newLink = {
        sub: activeSub,
        nextSub: undefined,
        prevSub: undefined,
      }

      /**
       * 關聯鏈表關係
       * 1.如果有尾節點，表示鏈表現在有無數個節點，在鏈表尾部新增。
       * 2.如果沒有尾節點，表示是第一次關聯鏈表，第一個節點頭尾相同。
       */
      //
      if (this.subsTail) {
        this.subsTail.nextSub = newLink
        newLink.prevSub = this.subsTail
        this.subsTail = newLink
      } else {
        this.subs = newLink
        this.subsTail = newLink
      }
    }
    return this._value
  }

  set value(newValue) {
    this._value = newValue

    // 取得頭節點
    let link = this.subs
    let queuedEffect = []

    // 遍歷整個鏈表的每一個節點
    // 把每個節點裡的 effect 函數放進陣列
    // 不是放節點本身，是放節點裡的 sub 屬性（effect 函數）
    while (link) {
      queuedEffect.push(link.sub)
      link = link.nextSub
    }

    //觸發更新
    queuedEffect.forEach((effect) => effect())
  }
}
```

#### 解決後執行流程

##### 初始化

- 初始化，在走到 `effect` 之前，頭尾節點都是 `undefined`。

##### 第一個`effect`加入

- `effect(fn1)` 訪問 `count`

- `activeSub = effect1`，馬上執行 `effect1()`。

- `effect1` 讀取 `count.value` → 進 `get`：

`activeSub` 存在 → 建立 `newLink(effect1)`。

- 因為當前 `subsTail` 為`undefined`，所以把 頭節點跟尾節點都指向 `newLink(effect1)`。

輸出 `effect1 0`。
清除`activeSub`：`activeSub = undefined`。

##### 第二個`effect`加入

- `effect(fn2)` 訪問 `count`

- `activeSub = effect2`，執行 `effect2()`。

- `effect2` 讀取 `count.value` → 觸發 `getter`：

`activeSub` 存在 → 建立 `newLink(effect2)`。

- 這次 `subsTail` 存在（指向 `effect1`），所以把 `effect2` 掛在尾端：

`effect1.next = effect2`

- `effect2.prev = effect1`

- `subsTail = effect2`

輸出 `effect2 0`。
清除`activeSub`：`activeSub = undefined`。

##### 一秒後更新觸發

- 執行 `count.value = 1`

- 觸發 setter`this._value = 1`。

- 從 頭節點 開始遍歷鏈表，把每個節點的 `sub`（也就是 effect 函式）放進 `queuedEffect`：

先推 `effect1`，再推 `effect2`

`queuedEffect.forEach(fn => fn())` 依序執行：

- 先跑 `effect1()` → 列印 `effect1 1`

- 再跑 `effect2()` → 列印 `effect2 1`

透過雙向鏈表，我們成功解決了訂閱者被覆蓋的問題。現在無論有多少個 `effect` 依賴，都能在資料變更時收到通知並更新。

---

<a id="day-7"></a>

## Day 7 - 關注點分離： 拆分 track、trigger

> 日期: 2025-09-16

我們的程式碼已經可以運作，但`RefImpl` 同時處理資料儲存和鏈表管理，而且不好擴充，所以需要調整一下程式碼。雖然我們前幾章的程式碼已經可以正常運作，但它存在一個很大的問題：RefImpl 這個類別承擔了太多的責任。

它既要負責儲存數值 (`_value`)，又要管理一整套複雜的鏈表操作。

這種設計違反了軟體工程中的 「單一職責原則 (Single Responsibility Principle)」，會使得程式碼難以閱讀、維護和擴充。

#### ref.ts

首先，我們把 RefImpl 中的鏈表操作抽出來，建立兩個獨立函式：

- trackRef：收集依賴

- triggerRef：觸發更新

```typescript
class RefImpl {
  _value;
  [ReactiveFlags.IS_REF] = true

  subs: Link
  subsTail: Link

  constructor(value) {
    this._value = value
  }

  get value() {
    if (activeSub) {
      trackRef(this)
    }
    return this._value
  }

  set value(newValue) {
    this._value = newValue
    triggerRef(this)
  }
}
```

```typescript
/*
 * 這邊的 dep 是 ref
 * 收集依賴，建立 ref 和 effect 之間的鏈表關係
 */
export function trackRef(dep) {
  const newLink = {
    sub: activeSub,
    nextSub: undefined,
    prevSub: undefined,
  }

  if (dep.subsTail) {
    dep.subsTail.nextSub = newLink
    newLink.prevSub = dep.subsTail
    dep.subsTail = newLink
  } else {
    dep.subs = newLink
    dep.subsTail = newLink
  }
}

/*
 * 觸發 ref 關聯的 effect，重新執行
 */
export function triggerRef(dep) {
  let link = dep.subs
  let queuedEffect = []

  while (link) {
    queuedEffect.push(link.sub)
    link = link.nextSub
  }
  queuedEffect.forEach((effect) => effect())
}
```

接著新增一個 `system.ts` 檔案，存放鏈表相關邏輯，再次拆分：

- trackRef：收集依賴入口函式，判斷是否有 `activeSub`，有的話建立鏈表關係。

`effect(fn)` 在呼叫 `fn()` 前把自己設為 `activeSub`，在 `fn()` 結束後清空，所以我們使用 activeSub 來判斷他是不是當前正在執行的 `effect(fn)`。

triggerRef：觸發更新入口函式，要找通知曾經訂閱過這個 `dep` 的所有 `effect`，因此我們判斷，如果有 `dep` 的有 `subs`，他就觸發更新。
`dep` (dependency) = 被依賴的對象（如 `ref`、`reactive`）
`sub` (subscriber) = 訂閱者（如 `effect`、`watch`）

```typescript
export interface Link {
  sub: Function
  nextSub: Link
  prevSub: Link
}

/*
 * 建立鏈表關係
 * dep 是依賴項，像是ref/computed/reactive
 * sub 是訂閱者，像是 effect
 * 當依賴項目變化(ref)，需要通知訂閱者(effect)
 */
export function link(dep, sub) {
  // 建立新的鏈表節點
  const newLink: Link = {
    sub, // 指向目前的訂閱者 (activeSub)
    nextSub: undefined, // 指向下一個節點 (初始化為空)
    prevSub: undefined, // 指向前一個節點 (初始化為空)
  }

  // 如果 dep 已經有尾端訂閱者 (代表鏈表不是空的)
  if (dep.subsTail) {
    // 把尾端節點的 next 指向新的節點
    dep.subsTail.nextSub = newLink
    // 新節點的 prev 指向原本的尾端
    newLink.prevSub = dep.subsTail
    // 更新 dep 的尾端指標為新節點
    dep.subsTail = newLink
  } else {
    // 如果 dep 還沒有任何訂閱者 (第一次建立鏈表)
    dep.subs = newLink // 鏈表的頭指向新節點
    dep.subsTail = newLink // 鏈表的尾也指向新節點
  }
}

/*
 *  傳播更新的函式
 */
export function propagate(subs) {
  let link = subs
  let queuedEffect = []

  while (link) {
    queuedEffect.push(link.sub)
    link = link.nextSub
  }

  queuedEffect.forEach((effect) => effect())
}
```

```typescript
import {activeSub} from './effect'
import {Link, link, propagate} from './system'

enum ReactiveFlags {
  IS_REF = '__v_isRef',
}

class RefImpl {
  _value;
  [ReactiveFlags.IS_REF] = true

  subs: Link
  subsTail: Link
  constructor(value) {
    this._value = value
  }

  get value() {
    if (activeSub) {
      trackRef(this)
    }
    return this._value
  }

  set value(newValue) {
    this._value = newValue
    triggerRef(this)
  }
}

export function ref(value) {
  return new RefImpl(value)
}

export function idRef(value) {
  return !!(value && value[ReactiveFlags.IS_REF])
}

/*
 * 這邊的 dep 是 ref
 * 收集依賴，建立 ref 和 effect 之間的鏈表關係
 */
export function trackRef(dep) {
  if (activeSub) {
    link(dep, activeSub)
  }
}

/*
 * 觸發 ref 關聯的 effect，重新執行
 */
export function triggerRef(dep) {
  if (dep.subs) {
    propagate(dep.subs)
  }
}
```

#### Effect.ts

```typescript
// 用來保存目前現在正在執行的 effect 函式
export let activeSub

export function effect(fn) {
  activeSub = fn
  activeSub()
  activeSub = undefined
}
```

我們新增一個類別，並且給他一個 `run` 方法：

```typescript
export let activeSub

export class ReactiveEffect {
  constructor(public fn) {}

  run() {
    // 每次執行 fn 之前，把 this 放到 activeSub 上面
    activeSub = this
    try {
      return this.fn()
    } finally {
      // 執行完成後，activeSub 清空
      activeSub = undefined
    }
  }
}

export function effect(fn) {
  const e = new ReactiveEffect(fn)
  e.run()
}
```

##### 為什麼將 `effect` 更改為 `ReactiveEffect` 類別？

主要有三大好處：

1. 狀態封裝： `effect` 本身其實是有狀態的（例如它依賴了誰、是否正在執行等）。類別是封裝這些狀態和相關行為的最好的辦法。

2. 功能擴充： `effect` 成為一個類別後，我們在有需要的時候，可以輕鬆幫它新增更多方法，像是剛剛的 `run()` 就是一個很好的例子。

3. 更好的 this 指向： 在 `run()` 方法中，`activeSub` 被賦值為 `this` (也就是 `ReactiveEffect` 的實例)，方便後續我們從 `effect` 實例上獲取更多需要的資訊。

也因此 effect 從函式變成物件，所以我們要調整一下呼叫方式。

```typescript
export interface Link {
  //由於調整，effect 是物件
  sub: ReactiveEffect
  nextSub:Link
  prevSub:Link
}
...
...
export function propagate(subs){
  ....
  // effect 變成物件，改調用 run 方法
  queuedEffect.forEach(effect => effect.run())
}
```

回顧我們今天完成的事，我們把 `RefImpl` 中複雜的依賴追蹤邏輯，拆分到了獨立的 `system.ts` 模組，並且把 `effect` 變成一個更好維護的 `ReactiveEffect` 類別。

現在，我們的響應式核心是一個由 `RefImpl`（負責資料內容）、ReactiveEffect（負責 Side Effect）、以及 `system.ts`（連結它們的橋樑）所組成的。

明天我們可以開始處理 `effect` 相關的新問題了。

---

<a id="day-8"></a>

## Day 8 - Effect： 深入剖析巢狀 effect

> 日期: 2025-09-17

今天我們來探討一個棘手的邊界情況：巢狀 effect。

當一個`effect`內部又定義了另一個`effect` 時，我們的系統會怎麼運作呢？

```typescript
import {ref, effect} from '../dist/reactivity.esm.js'

const count = ref(0)

const effect1 = effect(() => {
  const effect2 = effect(() => {
    console.log('內層的 Effect', count.value)
  })

  console.log('外部的 Effect', count.value)
})

setTimeout(() => {
  count.value = 1
}, 1000)
```

在這個情況我們預期內外層都有輸出，但是我們得到如下

```typescript
console.log('內層的 Effect', 0)
console.log('外部的 Effect', 0)
console.log('內層的 Effect', 1)
```

官方不建議使用巢狀 `effect`，你可能會想：「既然官方不建議，我只要不這樣寫就好了。」

但是遇見這種「巢狀執行」的場景比想像中更常見。比方說，當一個 `effect` 依賴了一個 `computed` 屬性時，就會隱性觸發巢狀執行：

```typescript
const count = ref(0)
// computed 內部會為計算函式建立一個 effect (我們先叫 effect B)
const double = computed(() => count.value * 2)

// 這是我們手動建立的 effect (我們稱之為 effect A)
effect(() => {
  // 當 effect A 執行，並在這裡讀取 double.value 時...
  // effect B 就必須先回傳計算結果。
  // 這就形成了 effect A 內部觸發了 effect B 執行的巢狀情況。
  console.log('The double value is:', double.value)
})
```

因此，為了處理這種隱性觸發問題，我們需要解決巢狀 `effect` 觸發。

#### 問題解析

##### 初始化頁面

- 執行 `effect1` (`ReactiveEffect A`)：

`activeSub` 設為 `A`。

- 開始執行 `effect1` 的函式 `fnA`。

- 進入 `fnA` 內部，遇到 `effect2` (`ReactiveEffect B`)：

1. `activeSub` 被覆蓋，更新為 `B`。

2. 開始執行 `effect2` 的函式 `fnB`。

3. 在 `fnB` 中，讀取 `count.value`，觸發 `getter`。

4. 依賴收集： `count` 的依賴列表中，只收集了當前的 `activeSub`，也就是 `B`。

5. `console.log` 輸出 `內層的 Effect 0`。

6. `fnB` 執行完畢，`activeSub` 被清空 (`undefined`)。

**回到 `effect1` 的 `fnA` 繼續執行：**

- 此時，程式讀取 `count.value`。

- 依賴收集失敗： 因為 `activeSub` 已經是 `undefined`，所以 `A` 無法被 `count` 收集。

- `console.log` 輸出 `外部的 Effect 0`。

**結果：** `count` 的依賴鏈表上，只有 `B` (`effect2`)，沒有 `A` (`effect1`)。

##### 關鍵問題：執行外層匿名函式 `fn`時，`activeSub` 就被覆蓋、沒有進行收集依賴。

##### 一秒後執行`count.value = 1`

由於依賴收集只有收集內層的 ReactiveEffect（也就是ReactiveEffect B），因此他不會執行 `propagate`，進行觸發更新。

#### 核心思路

後來的 `effect` 覆蓋到前面的 `effect`，這個情況是不是跟函式的「堆疊(Stack)」有點像？

堆疊(Stack) 有兩個主要特性：

1. 後進先出。

2. 一維線性結構。

函式在層層呼叫時，就是被放入一個「呼叫堆疊」中，我們也可以利用這個特性來管理 `activeSub`。

- 在進入內層 `effect` 時，將外層的 `effect`暫存

- 在內層結束後，再從堆疊中取出，並還原外層的 `effect`。

要完成這個方法，可以透過一個暫存變數來模擬。

#### 解決方法

##### 實際做法

1. 外層 `effect` 開始：`activeSub = ReactiveEffect A`

2. 外層 `effect` 執行，遇到內層 `effect`

3. 在內層 `effect` 執行之前：

我們先檢查`activeSub`是不是有值

4. 假設有數值，我們可以先儲存起來

5. 內層 `effect` 執行完成後

不再設定`activeSub = undefined`

6. 而是將`activeSub`復原成執行之前的狀況

於是我們這樣寫

```typescript
export let activeSub

class ReactiveEffect {
  constructor(public fn) {}

  run() {
    //先將當前的 Effect 儲存，用來處理巢狀邏輯
    const prevSub = activeSub
    activeSub = this
    try {
      return this.fn()
    } finally {
      // 執行完成後，恢復之前的 activeSub
      activeSub = prevSub
    }
  }
}

export function effect(fn) {
  const e = new ReactiveEffect(fn)
  e.run()
}
```

他的運作模式是這樣：

此時你會發現，在觸發更新的時候，內層會多輸出一次：

##### 觸發更新為何會多輸出一次？

##### 初始狀態

- `內層的 Effect 0`

- `外部的 Effect 0`

各別輸出一次，這邊沒什麼問題。

##### 初始化後的鏈表結構

##### setTimeout 觸發更新後

- `count.value = 1` 觸發 setter，執行 `propagate`。

- `propagate` 遍歷依賴鏈表。

- 執行`B.run() (effect2)`：

`console.log` 輸出 `內層的 Effect 1 (第一次)`。

執行 `A.run() (effect1)`

- `console.log` 輸出 `外部的 Effect 1`。

- 在 `A` 的函式內部，會重新建立並執行一個全新的內層 `effect`。

- 執行這個新的內層 `effect.run()`：

`console.log` 輸出 `內層的 Effect 1` (第二次)。

因為這樣，所以內層會執行兩次。

乍看之下內層 `effect` 多執行一次似乎沒什麼關係。

但思考一下，如果現在內層的 `effect` 執行的不是 `console.log`，而是更費資源的操作呢？

像是：

- 網路請求

- 複雜且大量的計算

- DOM 的重新佈局

因此我們知道不必要的重複執行會導致效能浪費，甚至有可能引發無法預期的 Bug。

這也就是為什麼官方不推薦我們寫巢狀 `effect`。

---

<a id="day-9"></a>

## Day 9 - Effect：調度器實作應用

> 日期: 2025-09-18

到目前為止，我們的 effect 會在依賴的資料發生變化時，會立刻重新執行。
這種簡單直接的模式在很多情況下都有效，但當遇到密集且連續性的資料變更時，它可能會引發不必要的效能問題。

#### 為什麼需要 Effect 調度器？

```typescript
const count = ref(0)
effect(() => {
  console.log('渲染元件：', count.value)
  //複雜的 DOM 操作
}) // 連續修改
count.value = 1 // 觸發渲染
count.value = 2 // 又觸發渲染
count.value = 3 // 再次觸發渲染
```

在上方案例我們可以看到，如果有複雜的 DOM 操作，造成連續觸發重新渲染三次，但其實我們只要最後一次，這時候我們就需要調度器處理。

#### 什麼是 Effect 調度器？

調度器是一個控制 effect 執行時機的機制：

- 沒有調度器：資料變化 → 立即執行 effect

- 有調度器：資料變化 → 調度器決定何時/如何執行

#### 特性

##### 避免同步連續觸發多次更新

```typescript
// 避免同步連續觸發多次更新
const scheduler = (job) => {
  Promise.resolve().then(job) // 下一個微任務執行
}

effect(
  () => {
    console.log(count.value)
  },
  {scheduler}
)

count.value = 1 // 不會立即執行
count.value = 2 // 不會立即執行
count.value = 3 // 只有最後一次會在微任務中執行
```

##### Vue 元件更新調度

```typescript
effect(
  () => {
    // 元件渲染邏輯
  },
  {
    scheduler: queueJob, // 加入更新隊列，而不是立即更新
  }
)
```

##### 防抖、節流

```typescript
const debounceScheduler = debounce((job) => job(), 100)

effect(
  () => {
    // 高頻觸發的邏輯
  },
  {scheduler: debounceScheduler}
)
```

#### 調度器用法

```typescript
import {ref, effect} from '../dist/reactivity.esm.js'

const count = ref(0)

effect(
  () => {
    console.log('Effect', count.value)
  },
  {
    scheduler() {
      console.log('觸發調度器')
    },
  }
)

setTimeout(() => {
  count.value = 1
}, 1000)
```

##### 目前效果

```typescript
Effect 0
Effect 1
```

##### 預期效果

使用調度器：

- `setTimeout` 賦值不再輸出

```typescript
Effect 0
// 觸發調度器，因此一秒後不輸出 'Effect', 1
```

#### Class 類別知識補充

要實現這個選用的調度器，我們需要利用 JavaScript Class 的特性。

我們先來補充這個知識：

- 一般的類別

```typescript
class Person {
  constructor(name) {
    this.name = name
  }

  sayHi() {
    console.log('我是原型方法', this.name)
  }
}

const p = new Person('張三')

p.sayHi()
// 輸出：我是原型方法 張三
```

##### 建立實例屬性被覆蓋

- 先建立實例 `p`

- `sayHi` 方法重新賦予，於是被覆蓋

- 因為實例屬性的方法優於原型屬性的方法

- 如果沒有實例方法，才會往原型鏈去找原型方法

```typescript
class Person {
  constructor(name) {
    this.name = name
  }

  sayHi() {
    console.log('我是原型方法', this.name)
  }
}

const p = new Person('張三')

p.sayHi = function () {
  console.log('我是實例屬性', this.name)
}

p.sayHi()
// 輸出：我是實例屬性 張三
```

#### 實作調度器

##### 要求

1. 更新時，觸發 `scheduler`

2. 沒有傳入 `scheduler`，仍然要執行 `run()`

##### 實作思路

1. 使用者傳入 scheduler 方法，此為可選方法

2. 因此 scheduler 有可能會被覆蓋（可參考剛剛提到的 Class 類別知識補充）

3. 為了保證觸發更新可以正常實作，新建一個 `notify` 方法

```typescript
export let activeSub

export class ReactiveEffect {
  constructor(public fn) {}

  run() {
    const prevSub = activeSub
    activeSub = this

    try {
      return this.fn()
    } finally {
      activeSub = prevSub
    }
  }

  /*
   * 如果依賴資料發生變化，通知更新。
   */
  notify() {
    this.scheduler()
  }

  /*
   * 預設調用 run 方法，
   * 如果用戶傳入覆蓋調用器，那以用戶的為主
   * 因為實例屬性優於原型屬性
   */

  scheduler() {
    this.run()
  }
}

export function effect(fn, options) {
  const e = new ReactiveEffect(fn)
  // scheduler
  Object.assign(e, options)
  e.run()

  /*
   * 綁定 this
   * 也可替換為 const runner = () => e.run()
   * 但不能使用 const runner = e.run()
   * 會遺失 this
   */
  const runner = e.run.bind(e)

  //將 effect 實例，放入函式屬性
  runner.effect = e

  return runner
}
```

`propagate`函式中更改為執行 `notify` 方法，確保可以執行

```typescript
export function propagate (subs){
  ....
  // 更改為執行 notify 方法
  // 因為 scheduler 方法有可能會被覆蓋
  // 因此使用 notify 確保可以執行
  queuedEffect.forEach(effect => effect.notify())
}
```

為什麼回傳 runner 時需要 `e.run.bind(e)`這麼處理？
如果直接回傳`e.run`會發生什麼？這就涉及到了 this 指向問題。

#### 遺失 this 是指什麼

請參考下方範例：

```typescript
export function effect(fn, options) {
  const e = new ReactiveEffect(fn)
  Object.assign(e, options)
  e.run()

  return e.run //遺失 this
}

// 使用時
const runner = effect(() => console.log('effect'))
runner() // Error! this 是 undefined 或 window
```

#### 圖解 `notify()` 執行步驟

##### 執行原型方法(左)

effect 的預設行為，當我們像這樣使用它時：
`effect(() => { ... })`

1. 資料變化 → `propagate`：
   當響應式資料的值被修改時，會觸發其 setter，最終由 `propagate` 函式開始遍歷依賴資料的 `effect。`

2. `propagate` → `effect.notify()`
   在 `propagate` 的迴圈裡面，我們統一呼叫 `effect.notify()`，讓它作為更新的固定入口點。

3. `effect.notify()` → `scheduler()`
   `notify()` 內部會去呼叫 `this.scheduler()`。在這個情況下，因為我們建立 `effect` 時沒有提供任何 options，所以 `effect` 實例上並不存在自己的 `scheduler` 屬性。

4. `scheduler()` → `run()`
   根據 JavaScript 的原型鏈規則，它會回去尋找 ReactiveEffect 原型上的 `scheduler()` 方法。
   我們預設的 `scheduler()` 方法，就是直接呼叫 `this.run()`。因此，`effect` 的核心邏輯被立即執行。

##### 使用調度器(右)

1. 資料變化 → `propagate` → `effect.notify()`
   前三個步驟跟原形狀況完全相同：資料變更，`propagate` 遍歷並呼叫 `effect.notify()`。

2. `effect.notify()` → `scheduler()`
   `notify()` 內部會呼叫 `this.scheduler()`。但關鍵在於，這次我們在建立 `effect` 時，透過 `options` 傳入了一個自訂的 `scheduler` 函式。

因此 `Object.assign(e, options)` 這個會把函式作為一個實例屬性附加到 `effect` 物件上。

1. `scheduler()` → 使用者的調度器邏輯
   根據 JavaScript 的優先級，實例屬性大於原型方法。因此，JavaScript 在 effect 實例上直接找到這個自訂的 scheduler 並執行。

今天，我們透過引入調度器，將 effect 的核心邏輯以及執行策略進行了分離，當中包含 `fn` 做了什麼，以及 `scheduler` 決定什麼時候做。

---

<a id="day-10"></a>

## Day 10 - Effect：為何會被指數級觸發？

> 日期: 2025-09-19

#### DOM 互動

我們的響應式系統經過前幾天的努力，已經做得差不多，感覺可以加上一下 DOM 的互動，來進行簡單的測試。

```typescript
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Title</title>
    <style>
      body {
        padding: 150px;
      }
    </style>
  </head>
  <body>
    <button id="btn">按鈕</button>
    <script type="module">
      import { ref, effect } from '../dist/reactivity.esm.js'

      const flag = ref(true)

      effect(() => {
        flag.value
        console.count('effect')
      })

      btn.onclick = () => {
        flag.value = !flag.value
      }
    </script>
  </body>
</html>
```

看起來不太妙，目前 effect 出現按鈕指數觸發，這樣一定是不行。
我們預期每次點擊按鈕，`effect` 只會執行一次。但實際情況看起來不太妙。

從 `console.count` 的結果可以看到，`effect` 的執行次數隨著點擊呈現指數級增長。

我們來了解一下問題癥結點。

### 建立 Link 節點問題癥結點

#### 執行步驟圖解

##### 初始化頁面

頁面載入時，`effect` 執行一次。在執行過程中，讀取了 `flag.value`，觸發 getter 進行依賴收集。
系統會建立一個 link1 節點，將 `effect` 與 `flag` 關聯起來。到這裡都符合預期。

##### 點擊第一次按鈕

當按鈕第一次被點擊，`flag.value` 從 `true` 變為 `false`，觸發了 setter。
setter 內的 `propagate` 函式開始遍歷 `flag` 的依賴鏈表。

`propagate` 執行 link1 中儲存的` effect.run()`。

`effect` 函式重新執行，又讀取 `flag.value`。觸發了 getter。

此時問題出現了：執行完畢後，`flag` 的依賴鏈表結構如圖，現在有兩個節點 (link1, link2)，但它們都指向同一個 `effect`，他們分別儲存 `activeSub`。

執行結束後的鏈表：

##### 點擊第二次按鈕

當按鈕又被點擊，`flag.value` 從 `false` 變為 `true`，再次觸發 setter。

`propagate` 開始遍歷依賴鏈表。但這一次，鏈表上有兩個節點 (link1 和 link2)。

propagate 先執行 link1 中的 `effect.run()`。effect 內部讀取 `flag.value`，再次觸發依賴收集，建立了一個新的 link3 節點加到鏈表尾部。

`propagate` 接著執行 link2 中的` effect.run()`。effect 內部又一次讀取 `flag.value`，觸發依賴收集，又建立了一個新的 link4 節點並加到鏈表尾部。

執行結束後的鏈表：

##### 執行完成的鏈表結構

我們可以發現在觸發更新的時候，鏈表上的所有節點全部都會分別建立一個新的節點，因此發生了指數觸發 `effect` 的情況。

#### 關鍵問題點

每次 `Effect` 重新執行時：

1. 沒有檢查是否已經建立過 Link

2. 盲目創建新的 Link 節點

3. 導致鏈表無限增長

因此導致每次點擊按鈕，鏈表上的每一個 Link 都會建立新的 link，並且重複執行，造成指數級增長現象。

因為下個篇幅比較長就先講到這，大家要先理解問題的癥結點在哪，明天實作解決方案，才會知道為什麼要這樣做。

---

<a id="day-11"></a>

## Day 11 - Effect：Link 節點的複用實作

> 日期: 2025-09-20

昨天我們發現了 Effect 的問題：當 `effect` 被重複觸發時，它會不斷重新收集依賴，導致依賴鏈表指數級增長。

要讓 `effect` 記住它「訂閱過誰」，最直接的方法就是讓它自己也有一個參照列表。因此，我們分為兩大步：

- 建立反向依賴鏈表：建立一個新的鏈表，讓 `effect` 知道自己已經訂閱過哪些 `ref`，只要 effect 知道自己訂閱過哪些依賴就可以避免新增多餘的鏈表節點，形成了一個雙向的追蹤關係。

- 實現節點複用機制：下次再次觸發更新之後，就可以藉由查找訂閱過的依賴判斷。如果第一次執行收集過依賴，重復使用之前的鏈表節點，不建立新的節點。如果沒有收集過，就建立一個全新的鏈表節點。

關鍵要素就是：

1. 需要建立一個新的鏈表讓 effect 紀錄曾經收集過的依賴，這個鏈表我們叫`deps`。

2. 需要一個判斷 `effect` 是否是第一次收集依賴的方法。

#### 初始化頁面

之前的步驟，剛進入頁面之後， `effect` 收集依賴，`ref` 的頭節點 `subs` 以及尾節點 `subsTail` 指向 `link`，`link` 的 `sub` 指向 `effect`。

#### 步驟一：建立反向依賴鏈表

我們現在要做的事是在我們現有的 `Ref -> Link -> Effect` 關係上，新增一條從 Effect 出發的反向依賴連結。

之前提到過一個鏈表的必要元素分別是：

- 頭節點

- 尾節點

- 彼此建立的關聯

如上圖，目前頁面上只有一個依賴`flag.value`，我們可以讓這個鏈表的頭節點 `deps` 跟尾節點 `depsTail` 指向 `link`，`link` 的 `dep` 指向依賴，我們就可以透過關係鏈找到 `effect` 訂閱過的依賴。

因此我們可以知道三個關鍵的角色。

##### 三個關鍵角色

###### Effect

- `effect.deps` 鏈表：通過 link，記錄 `effect` 依賴了哪些 ref

- `effect.depsTail`：記錄鏈表尾部，目的在可以快速增加新的鏈表節點

###### Ref(flag)

- `flag.subs` 鏈表：通過 link，記錄有哪些 `effect` 訂閱了此 ref

- `flag.subsTail`：記錄鏈表尾部，目的在可以快速增加新的鏈表節點

###### Link：雙向橋樑節點

Link 是連接 `Effect` 和 `Ref` 的橋樑，同時存在於兩個鏈表中。

核心屬性：

- `link.sub`：指向發起的訂閱者 (`effect`)

- `link.dep`：指向被訂閱的 `ref`

在 Effect 鏈表中的位置：

- `link.nextDep/prevDep`：指向 `effect.deps` 鏈表的下/上一個節點

在 Ref 鏈表中的位置：

- `link.nextSub/prevSub`：指向 `ref.subs` 鏈表的下/上一個節點

透過上面的方法，我們可以知道三件事：

1. 雙向查詢：通過 `Link` 可以找到 `effect` 和 `ref`

2. 雙鏈表成員：`Link` 同時是兩個鏈表的成員

是 `effect.deps` 鏈表的一個節點

3. 是 `ref.subs` 鏈表的一個節點

4. 關係管理：一個 `Link` 代表一個訂閱關係

首先我們更新 `effect.ts` 和` system.ts` 來實作這個新的資料結構。

##### 定義型別

###### `effect.ts`

```typescript
export class ReactiveEffect {

  // 依賴項鏈表的頭節點指向 link
  deps: Link
  // 依賴項鏈表的尾節點指向 link
  depsTail: Link

  ....

}
```

###### `system.ts`

```typescript
/**
 * 依賴項
 */
interface Dep {
  // 訂閱者鏈表頭節點
  subs: Link | undefined
  // 訂閱者鏈表尾節點
  subsTail: Link | undefined
}
/**
 * 訂閱者
 */
interface Sub {
  // 訂閱者鏈表頭節點
  deps: Link | undefined
  // 訂閱者鏈表尾節點
  depsTail: Link | undefined
}

export interface Link {
  // 訂閱者
  sub: Sub
  // 下一個訂閱者節點
  nextSub: Link
  // 上一個訂閱者節點
  prevSub: Link
  //依賴項
  dep: Dep

  //下一個依賴項節點
  nextDep: Link | undefined
}
```

##### 增加 link 判斷

接著，修改 `link` 函式，在建立節點時，將它加入 `sub` 的 `deps` 鏈表。

```typescript
export function link(dep, sub){

    const newLink = {
      sub,
      dep,// 加上依賴項
      nextDep:undefined,
      nextSub:undefined,
      prevSub:undefined
    }
    ...
    ...

    /**
     * 將鏈表節點跟 sub 建立關聯關係
     * 1.如果有尾節點，表示鏈表現在有無數個節點，在鏈表尾部新增。
     * 2.如果沒有尾節點，表示是第一次關聯鏈表，第一個節點頭尾相同。
     */
    if(sub.depsTail){
      sub.depsTail.nextDep = newLink
      sub.depsTail = newLink
    }else{
      sub.deps = newLink
      sub.depsTail = newLink
    }

}

...
...
```

#### 步驟二：實現節點複用機制

每次 effect 重新執行時，如何判斷是「第一次執行」還是「重新執行」？

我們可以利用頭節點`deps`與尾節點`depsTail` 來設定三種狀態：

- 初始狀態：當從未執行過收集依賴：`effect` 的 `dep` 鏈表是沒有頭節點`deps`也沒有尾節點`depsTail`。

- 執行時：正在重新執行中，需要復用節點：將尾節點`depsTail`設定成`undefined`。

- 執行完成：鏈表更新完成：頭尾節點都是`Link`。

當 effect 開始重新執行時，我們將 `depsTail` 設為 `undefined`，但保留 `deps` 頭節點。這樣做的目的是：

1. 標記重新執行的狀態，讓 link 函式可以知道需要復用節點

2. `deps` 鏈表仍然包含之前收集的所有依賴

3. `depsTail` 會在復用過程中遍歷移動

所以往後我們判斷是否是第一次依賴收集：只要有頭節點`deps`，但是尾節點是`undefined`，那我們就可以知道它曾經執行過。

##### 實作 `effect.ts`

```typescript
run(){
    const prevSub = activeSub
    activeSub = this

    // 開始執行，讓尾節點變 undefined
    this.depsTail = undefined

    ...
    ...
  }
```

##### 實作 `system.ts`

```typescript
export function link(dep, sub){

/**
 * 復用節點
 * sub.depsTail 是 undefined，並且有 sub.deps 頭節點，表示要復用
 */
  const currentDep = sub.depsTail
  if(currentDep === undefined && sub.deps){
    // 頭節點所連接的 ref 與當前要連接的 ref 相等的話
    // 表示之前收集過依賴，就不收集了
    if(sub.deps.dep === dep){
      sub.depsTail = sub.deps //移動尾節點指針，指向剛剛復用的節點
      return  // 直接返回，不新增節點
    }
  }
  ...
  ...

}
```

#### 完整執行流程

##### 第一次執行

1. effect 初始化：`deps = undefined`, `depsTail = undefined`

2. 執行 `run()`：`depsTail = undefined`

3. 讀取 `ref.value`

4. `link()` 開始判斷：沒有 `deps` → 建立新鏈表節點

5. 執行結束：`deps = Link1`, `depsTail = Link1`

##### 第二次執行（點擊按鈕）

1. 執行前：`deps = Link1`, `depsTail = Link1`

2. 執行 `run()`：`depsTail = undefined`

3. 讀取 `ref.value`

4. `link()` 開始判斷：

條件：`depsTail = undefined` 、`deps` 存在 、`deps.dep === 當前 dep`

5. 設定好`depsTail`尾節點，`return` 不建立新的節點。

6. 執行結束：`deps = Link1`, `depsTail = Link1`

透過執行順序可以更好解決這個問題，修正程式碼之後，就沒有指數觸發現象。

---

<a id="day-12"></a>

## Day 12 - Effect ：多重依賴之指數觸發重現

> 日期: 2025-09-21

昨天我們解決了單一依賴所導致的指數增長問題。然而，在真實的開發場景中，一個 `effect` 函式往往需要依賴多個響應式變數，現在我們試著新增多個依賴，在範例中加入第二個響應式變數 `count`，並讓 `effect` 同時依賴 `flag` 和 `count`。按鈕的點擊事件只會修改 `count` 的值。

```typescript
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Title</title>
    <style>
      body {
        padding: 150px;
      }
    </style>
  </head>
  <body>
    <button id="btn">按钮</button>
    <script type="module">
      import { ref, effect } from '../dist/reactivity.esm.js'

      const flag = ref(true)
      const count = ref(0)

      effect(() => {
        flag.value
        count.value
        console.count('effect')
      })

      btn.onclick = () => {
        count.value++
      }
    </script>
  </body>
</html>
```

當 `effect` 函式同時依賴 `flag` 和 `count` 兩個響應式變數後，點擊按鈕觸發更新時，問題又回來了，依賴收集再次出現了指數級的增長，為什麼會這樣？

##### 初始化

頁面第一次載入，`effect` 執行一次。它依序讀取 `flag.value` 和 `count.value`，觸發兩次依賴收集。

- `flag` 透過 `Link1` 與 `effect` 關聯。

- `count` 透過 `Link2` 與 `effect` 關聯。

- `effect` 自己的 `deps` 鏈表也記錄`Link1 -> Link2`。

到目前為止，都沒什麼問題。

##### 點擊按鈕執行第一次

當按鈕點擊，`count.value++` 觸發更新，`effect` 的 `run()` 方法被呼叫。

- 執行 `run()`：`depsTail = undefined`。

- `this.deps` 仍然指向 `Link1`。

`(deps && !depsTail)` 的狀態，就是我們用來判斷是否「正在重新執行」的關鍵點。

- 讀取 `flag.value`，觸發第一次 `link()`

`effect` 函式體重新執行，先讀取 `flag.value`，觸發 `link(flag, effect)`。

- `link()` 開始判斷：

條件：`depsTail = undefined` 、頭節點`sub.deps` 存在 `(sub.deps && !sub.depsTail)` 成立。

- 接著檢查 `sub.deps.dep === dep` ( `Link1` 的 `dep` 是否為 `flag`)，成立。

複用成功，`depsTail` 移到 `flag` 的 link。

- 讀取 `count.value`，觸發第二次 `link()`

`effect` 繼續執行，讀取 `count.value`，觸發 `link(count, effect)`。

- `link()` 開始判斷：

`(sub.deps && !sub.depsTail)` 不成立，因為剛剛 `depsTail` 移到 `flag` 的 link。

- 複用檢查直接失敗，建立了一個全新的 `Link3` 節點，並且移動指針。

執行完，`flag` 的依賴 (`Link1`) 被正確複用，但 `count` 的依賴被重複新增了節點 (`Link2` 存在，又新增了 `Link3`)。

導致下一次點擊按鈕，`propagate` 就會觸發 `effect` 執行兩次（透過 `Link2` 和 `Link3`），因此指數增長。

#### 問題分析：為何只有第一個依賴被正確複用？

邏輯問題：

- 我們只檢查了 `sub.deps`（頭節點），它永遠只拿 `effect` 依賴鏈表的第一個節點來比較，導致只有第一個依賴能被複用。

- 一旦第一個依賴複用成功，`depsTail` 就被賦值，後續的依賴檢查全部失敗。

今天我們ㄓ透過圖解，一步步追蹤了內部依賴鏈表的情況。分析後可以知道，問題的根源在於現有的節點複用邏輯存在漏洞：它只會檢查並比對依賴鏈表的第一個節點 (`sub.deps`)。

明天我們將基於這次的問題解析結果，來實作解決方案。

---

<a id="day-13"></a>

## Day 13 - Effect：多重依賴之節點復用解方

> 日期: 2025-09-22

昨天，我們知道當 `effect` 函式依賴多個響應式變數時，會觸發指數級更新。

觀察我們之前的做法：

1. `run()` 函式首先會將 `depsTail` 設為 `undefined`。

```typescript
run(){
    const prevSub = activeSub
    activeSub = this

    // 開始執行，讓尾節點變 undefined
    this.depsTail = undefined

    ...
    ...
  }
```

2. 後續的依賴收集過程中，`depsTail` 會被賦值並指向已複用的節點。

```typescript
export function link(dep, sub){
  const currentDep = sub.depsTail
  if(currentDep === undefined && sub.deps){
    if(sub.deps.dep === dep){
      sub.depsTail = sub.deps //移動尾節點指針，指向剛剛復用的節點
      return
    }
  }
  ...
  ...

}
```

3. 邏輯判斷

```typescript
export function link(dep, sub) {
  const currentDep = sub.depsTail
  // 僅在 depsTail 為 undefined 時，才嘗試從頭節點 sub.deps 開始複用
  if (currentDep === undefined && sub.deps) {
    // 只會檢查依賴鏈表的第一個節點
    if (sub.deps.dep === dep) {
      sub.depsTail = sub.deps // 成功後移動指針
      return
    }
  }

  // 若不符合上述條件，則直接建立新節點...
}
```

深入分析後，我們了解問題在依賴節點的複用邏輯上：

- 檢查範圍過小：複用邏輯只檢查並比對依賴鏈表的第一個節點 (`sub.deps`)。

- 指針提早退出：一旦第一個依賴（例如 `flag`）複用成功，`depsTail` 就被賦值。導致後續依賴（例如 `count`）在檢查時，因爲 `currentDep === undefined` 條件不成立，直接跳過複用檢查，盲目地建立了新的 `Link` 節點。

#### 核心思路

舊的邏輯中，`depsTail` 只是一個標記，用來判斷是否是「第一次執行複用」。現在我們要把它升級為一個「進度指針」。它的作用是標記當前複用檢查進行到了鏈表的哪個位置。

這個思考提供了一個關鍵點：「當 `depsTail` 存在時，代表依賴鏈表的遍歷與複用正在進行中。」

#### 一、實作：擴充檢查邏輯

因此，我們就可以在原有的 `link` 函式中，增加一個額外的檢查邏輯。

當第一個 `if` 條件不成立，但 `depsTail` (`currentDep`) 確實存在時，就意味著我們不應該從頭節點開始檢查，而應該從當前 `depsTail` 所在節點的下一個節點 (`currentDep.nextDep`) 繼續檢查。

依照上面的執行邏輯，`flag` 複用成功後，`depsTail` 指向 `Link1`。我們需要新增的邏輯，就是要從 `Link1` 的 `nextDep`，也就是 `Link2`，繼續進行檢查。

檢查邏輯的核心：如果尾節點 (`depsTail`) 存在，並且這個尾節點還有下一個節點 (`nextDep`)，我們就應該檢查這個 `nextDep` 是否是我們要找的目標，如果是，就直接複用它。

- 確認狀態：檢查 `depsTail` 是否有值。如果有，代表開始復用，並且停在鏈表的某個節點上（像是 `Link1`）。

- 尋找下個節點：我們的下一個目標，自然就是當前 `depsTail` 所指向節點的「下一個節點」，也就是 `currentDep.nextDep` (對應到我們的例子，就是 `Link2`)。

- 進行比對：我們需要判斷這個節點所連接的依賴 (`currentDep.nextDep.dep`)，是否就是我們當前正要處理的依賴 (`count`)。

- 執行複用：如果比對成功，就將 `depsTail` 這個「進度指針」向前移動到這個 `nextDep` 節點上。

```typescript
const currentDep = sub.depsTail
if (currentDep === undefined && sub.deps) {
  // 依賴鏈表頭節點的 ref 與當前要連接的 ref 相等的話，表示之前收集過依賴
  if (sub.deps.dep === dep) {
    sub.depsTail = sub.deps //移動尾節點指針，指向剛剛復用的節點
    return // 直接回傳，不新增節點
  }
} else if (currentDep) {
  //尾節點存在

  // 尾節點的 nextDep 所連接的 ref，等於當前要連接的 ref
  if (currentDep.nextDep?.dep === dep) {
    sub.depsTail = currentDep.nextDep
    //移動尾節點指針，復用尾節點的 nextDep
    return
  }
}
```

#### 二、重構與簡化

目前這個結構雖然已經能正確運行，但我們可以重構得更簡潔。我們發現無論是從頭開始還是從中途繼續，我們的目標都是找到「下一個待檢查節點」。

```typescript
const currentDep = sub.depsTail
// 相同邏輯：根據 currentDep 是否存在，來決定下一個要檢查的節點
const nextDep = currentDep === undefined ? sub.deps : currentDep.nextDep
// 如果 nextDep.dep 等於我當前要收集的 dep
if (nextDep && nextDep.dep === dep) {
  sub.depsTail = nextDep // 移動指針
  return
}
```

#### 完整執行流程

1. 取得 `depsTail` 當前值（`currentDep` = `sub.depsTail`）

2. 根據 `depsTail` 決定要檢查哪個節點：

若 `depsTail` 為 `undefined` → 從頭節點開始（`nextDep` = `sub.deps`）

3. 若 `depsTail` 有值 → 檢查下一個（`nextDep` = `currentDep.nextDep`）

4. 檢查是否可以復用：

`nextDep` 必須存在

`dep`：當前要新增鏈表節點的那個 ref

5. `nextDep.dep` 當前節點的下 一個節點，它所連結的 ref

6. 如果可以復用：

移動 `depsTail` 到 `nextDep`（記錄遍歷進度）

7. 不建立新的 Link，提前返回

透過將 `depsTail` 指針從一個單純的「尾部標記」升級為「遍歷進度指針」，我們解決了多變數依賴下的節點複用問題。

重構後的程式碼不僅修復了指數級更新的 Bug，更用統一的邏輯處理了不同情況下的節點檢查。

---

<a id="day-14"></a>

## Day 14 - Effect：清理依賴的場景

> 日期: 2025-09-23

在解決了鏈表節點指數增長的問題後，我們還需要注意依賴的有效性。

effect 的執行路徑可能因為條件判斷或程式邏輯不同而改變，導致這次執行中不再需要某些依賴。

如果這些過期依賴沒有被清理：

- 會造成 記憶體洩漏：不需要的鏈表節點一直被保留。

- 會導致 不必要的更新：effect 雖然已經不依賴某個 ref，但這個 ref 的變化仍然會觸發 effect。

- 會引發 效能下降：隨著時間累積，無效鏈表節點越來越多，增加整體執行成本。

因此，在收集依賴時，不只要能正確複用，也必須具備 清理過期依賴 的機制。

下面我們來說需要清理依賴的兩個狀況。

### 場景一：條件型依賴

```typescript
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Document</title>
    <style>
      body {
        padding: 150px;
      }
    </style>
  </head>
<body>
  <div id="app"></div>
  <button id="flagBtn">update flag</button>
  <button id="nameBtn">update name</button>
  <button id="ageBtn">update age</button>
  <script type="module">
    // import { ref, effect } from '../../../node_modules/vue/dist/vue.esm-browser.js'
    import { ref, effect } from '../dist/reactivity.esm.js'

    const flag = ref(true)
    const name = ref('姓名')
    const age = ref(18)

      effect(() => {
        console.count('effect')

        if(flag.value){
          app.innerHTML = name.value
        }else{
          app.innerHTML = age.value
        }
      })

      flagBtn.onclick = () => {
        flag.value = !flag.value
      }
      nameBtn.onclick = () => {
        name.value = '姓名' + Math.random()
      }
      ageBtn.onclick = () => {
        age.value++
      }
  </script>
</body>
</html>
```

我們現在有三個變數，`flag`、`name`、`age`

- 如果 `flag` 是 true，那點擊 name會觸發更新，但是點擊 age 不會觸發更新。

- 如果 `flag` 是 false，那點擊 age 會觸發更新，但是點擊 name 不會觸發更新。

這很合理，因為沒有執行的狀況就不應該觸發。

#### 實際情況

- 初始化：輸出 `effect: 1`、 `flag`是 true。

- 點擊 `update flag`：effect 更新，輸出 `effect: 2`、 `flag`是 false。

- 點擊 `update name`：我們期望他沒有反應，因為「如果 `flag` 是 false，點擊 name 不會觸發更新。」

- 但 effect 仍然更新，console 輸出 `effect: 3`。

#### 問題說明

我們先來看一下 effect 以及 name 裡面的內容，執行步驟是初始化後先點擊 `update flag`，再點擊 `update name`。

##### 檢查 Effect 回傳值

```typescript
const e = effect(() => {
  console.count('effect')
  if(flag.value){
    app.innerHTML = name.value
  }else{
    app.innerHTML = age.value
  }
})
...
...
nameBtn.onclick = () => {
  name.value = '姓名' + Math.random()
  console.dir(e)
  console.log(name)
}
```

我們預期 effect 回傳值中，不會有 `name`節點：實際上是正確的，目前 Link 節點是 `flag` → `age`。

我們預期 `name` 回傳值中，不會有頭節點跟尾節點，但實際上輸出結果是自己是正在被訂閱的狀態。

#### 異常情況

我們現在了解異常情況是

- `effect` 裡面訂閱 `flag`、`age` 沒有 `name，`是我們要的正確結果。

- `name` 裡面發現自己被 `effect` 訂閱，但鏈表上沒有它節點，它應該要被清除。

##### Effect 依賴清理圖解問題說明

##### 頁面初始化

遇到 `flag` 收集依賴，建立鏈表節點。

遇到 `name`，建立鏈表節點。

##### 點擊按鈕，觸發更新

點擊按鈕，effect 重新執行，`run` 函式讓`depsTail` 指向`undefined`。

接著`link`函式建立鏈表節點，先檢查是否可以復用，頭節點`desp`存在`depsTail == undefined`，可以復用。

發現可以復用，`depsTail` 指向 link1，此時 `flag` 是 false。

由於 `flag` 是 false，接下來遇到 `age`，之前沒有收集依賴過，於是建立新的鏈表節點。

建立`age`鏈表節點之後，`depsTail` 的 `nextDep` 以及 `depsTail` 指向新節點。

此時你看黃底色的地方，發現 `effect` 已經沒有存 link2，但是 link2 的 `sub` 仍然指向 effect。

所以才會出現 `name` 更新，仍然會讓 effect 執行的情況。

### 場景二：提前返回

```typescript
const flag = ref(true)
const name = ref('姓名')
const age = ref(18)
let count = 0

effect(() => {
  console.count('effect')

  if (count > 0) return
  count++

  if (flag.value) {
    app.innerHTML = name.value
  } else {
    app.innerHTML = age.value
  }
})

flagBtn.onclick = () => {
  flag.value = !flag.value
}
nameBtn.onclick = () => {
  name.value = '姓名' + Math.random()
}
ageBtn.onclick = () => {
  age.value++
}
```

到時候修正會一起調整，所以我們先來說第二種需要清除依賴的狀況。

##### 預期：只會觸發兩次。（因為 `count>0` 會返回，無論如何點擊按鈕就不再觸發）

#### 初始化

- 此時`count`是 `0`，繼續往下執行

`count++`，`count`現在是1。

- 讀到 `flag.value` → 收集依賴：`flag`。

- `flag` 是 `true`，接著讀到 `name.value` → 收集依賴：`name`。

此時 Link 節點是 `flag` → `name`；`depsTail` 指向 `name`。
effect 被 `flag` 與 `name` 兩個 ref 訂閱。

- 點擊 name 按鈕：

觸發 effect 重新 `run()`。

- `depsTail` = `undefined`

- 進入 `effect` 函式，馬上遇到 `if (count > 0) return`被中斷，因此鏈表節點上沒有任何改動。

遇到 return 程式應該會中斷，可是你一直點擊 `name`按鈕，`console.count('effect')` 仍然一直觸發更新。

但遇到 `if (count > 0) return`，effect 沒有存取任何依賴， deps 鏈表上應該要是空的，可是鏈表上面有之前建立的鏈表沒有清除。

此時鏈表上的狀態一直處於：有頭節點`deps`，並且尾節點`depsTail` = `undefined`。

明天我們會來談怎麼清除這些依賴。

---

<a id="day-15"></a>

## Day 15 - Effect：依賴清理實作方案

> 日期: 2025-09-24

在實際狀況，`effect` 函式內部的依賴，常因為條件分支（像是 `if...else`）而發生變化，這種情況稱為「動態依賴」。

動態依賴會帶來一個問題：在某次執行中不再被使用的舊有依賴，如果沒有被處理好，會殘留在依賴列表中。

後續這個失效依賴的來源被修改時，仍然會觸發 `effect` 重新執行，這導致不必要的更新或邏輯錯誤。

#### 前情回顧

- 第一次執行：`flag.value` 為 `true`，`effect` 依賴 `flag` 和 `name`，系統建立依賴鏈表 `link1(flag) -> link2(name)`。

- 觸發更新：`flag.value` 變成 `false`，`effect` 重新執行。

- 第二次執行：`effect` 進入 `else` 分支，需要依賴 `age`。系統會複用 `link1(flag)`，並且幫 `age` 建立新節點 `link3(age)`。在沒有清理機制時，舊的 `link2(name)` 仍然存在在 `effect` 的依賴鏈表中。

此時，如果修改 `name.value`，因為 `link2(name)` 的依賴關係還在，`effect` 會被再次觸發，而當前 `effect` 的輸出內容實際只與 `age` 有關。

#### 依賴清理核心思路

最直接的方法是在每次 `effect` 執行前，清空所有依賴再重新收集，但這樣會造成無法複用已有的鏈表節點，效能會較差。

另一個更有效率的方法是，在執行結束後，找出本次沒訪問到的節點，並只清除那一部分。

##### 場景一：條件性依賴

我們可以在這個情況下加一個判斷，加上判斷之後，讓 `effect` 從 `name` 切換到 `age` 後，`depsTail` 最後的位置會指向 `link3`。

當執行完畢後，`depsTail` 指向 `link3`，而 `link3` 存有一個 `nextDep` 指針，指向舊的 `link2(name)`。這邊提供了一個可以判斷的依據：

「從 `depsTail` 指向節點的 `nextDep` 開始，到鏈表末尾的所有節點，都是本次執行時沒訪問到的依賴。」

以本次案例中：

1. `depsTail` 指向`link3`，

2. `link3` 此時仍然有 `nextDep`

就可以清理 link3 的 `nextDep`，依賴就被清理完成。

##### 狀況二：提前返回

還記得我們上次一直觸發按鈕，鏈表上的狀態一直處於：有頭節點`deps`，並且尾節點`depsTail` = `undefined`。

如果 `effect` 執行時因爲條件判斷而提前 `return`，沒有訪問任何響應式資料。`depsTail` 會保持初始 `undefined` 狀態。

這邊就提供了另一個可以判斷的依據：

「當 `effect` 執行完畢後，如果 `depsTail` 是 `undefined` 並且 `deps` 頭節點存在，就說明本次執行時沒有訪問任何依賴，應該清除所有舊依賴。」

#### 程式碼實作清除依賴

我們使用 `startTrack` 和 `endTrack` 兩個函式來管理 `effect` 的執行週期。

1. `depsTail` 存在，並且 `depsTail` 的 `nextDep` 存在，表示包含`nextDep`的後續鏈表節點應該被移除，傳入`clearTracking`函式。

2. 觸發更新完全沒讀到任何依賴（`depsTail` = `undefined`，並且有`sub.deps`頭節點），此時也應該要被移除，傳入`clearTracking`函式。

```typescript
...
...
export class ReactiveEffect {
...
  run(){
    ...

    }finally{
      endTrack(this)
      activeSub = prevSub
    }
  }
 ...
}

function endTrack(sub){
  const depsTail = sub.depsTail

  /**
   *
   * 狀況一解法： depsTail 存在，並且 depsTail 的 nextDep 存在，表示後續鏈表節點應該移除
   */
  if(depsTail){
    if(depsTail.nextDep){
      clearTracking(depsTail.nextDep)
      depsTail.nextDep = undefined
    }
    // 狀況二：depsTail 不存在，但舊的 deps 頭節點存在，清除所有節點
  }else if(sub.deps){
    clearTracking(sub.deps)
    sub.deps = undefined
  }

}
```

### clearTracking 設計核心

`clearTracking` 函式的工作是從鏈表中移除一個 `link` 節點。

由於 `link` 節點同時存在於 `dep` 的訂閱者列表 (`dep.subs`) 和 `effect` 的依賴列表 (`effect.deps`) 這兩個雙向鏈表中，移除操作需要更新其在 `dep.subs` 列表中的 `prevSub` 和 `nextSub` 指針，然後再沿著 `effect.deps` 列表的 `nextDep` 指針繼續處理下一個待清理的節點。

#### clearTracking 實作

```typescript
/**
 * 清理依賴函式鏈表
 */

function clearTracking(link: Link){
  while(link){
    const { prevSub, nextSub, dep, nextDep} = link

    /**
     * 1. 如果上一個節點有 sub，那就把 nextSub 的下一個節點指向當前節點的下一個節點
     * 2. 如果沒有 sub，表示屬於頭節點，那就把 dep.subs 指向當前節點的下一個節點
     */
    if(prevSub){
      prevSub.nextSub = nextSub
      link.nextSub = undefined
    }else{
      dep.subs = nextSub
    }

    /**
     * 1. 如果下一個節點有 sub，那就把 nextSub 的上一個節點指向當前節點的上一個節點
     * 2. 如果下一個節點沒有 sub，表示屬於尾節點，那就把 dep.subsTail 指向當前節點的上一個節點
     */

    if(nextSub){
      nextSub.prevSub = prevSub
      link.prevSub = undefined
    }else{
      dep.subsTail = prevSub
    }

    link.dep = link.sub = undefined

    link.nextDep = undefined

    link = nextDep
  }
}
...
...
```

#### `system.ts` 調整

```typescript
export function link(dep, sub) {
  /**
   * 復用節點
   * sub.depsTail 是 undefined，並且有 sub.deps 頭節點，表示要復用
   */
  const currentDep = sub.depsTail // = link1
  const nextDep = currentDep === undefined ? sub.deps : currentDep.nextDep
  // nextDep = link1.nextDep = link2
  if (nextDep && nextDep.dep === dep) {
    // link2.dep (name) === age ? → false! 不能復用，需要建立新 link
    sub.depsTail = nextDep
    return
  }

  const newLink = {
    sub,
    dep,
    nextDep, //  讓link3的 nextDep 變成 link2
    nextSub: undefined,
    prevSub: undefined,
  }

  if (dep.subsTail) {
    dep.subsTail.nextSub = newLink
    newLink.prevSub = dep.subsTail
    dep.subsTail = newLink
  } else {
    dep.subs = newLink
    dep.subsTail = newLink
  }

  if (sub.depsTail) {
    sub.depsTail.nextDep = newLink
    sub.depsTail = newLink
  } else {
    sub.deps = newLink
    sub.depsTail = newLink
  }
}
```

#### 重構調整：完整程式碼

##### `system.ts`

```typescript
/**
 * 依賴項
 */
interface Dep {
  // 訂閱者鏈表頭節點
  subs: Link | undefined
  // 訂閱者鏈表尾節點
  subsTail: Link | undefined
}
/**
 * 訂閱者
 */
interface Sub {
  // 訂閱者鏈表頭節點
  deps: Link | undefined
  // 訂閱者鏈表尾節點
  depsTail: Link | undefined
}

export interface Link {
  // 訂閱者
  sub: Sub
  // 下一個訂閱者節點
  nextSub: Link
  // 上一個訂閱者節點
  prevSub: Link
  //依賴項
  dep: Dep

  //下一個依賴項節點
  nextDep: Link | undefined
}

export function link(dep, sub) {
  /**
   * 復用節點
   * sub.depsTail 是 undefined，並且有 sub.deps 頭節點，表示要復用
   */
  const currentDep = sub.depsTail
  const nextDep = currentDep === undefined ? sub.deps : currentDep.nextDep
  // 如果 nextDep.dep 等於我當前要收集的 dep
  if (nextDep && nextDep.dep === dep) {
    sub.depsTail = nextDep // 移動指針
    return
  }

  const newLink = {
    sub,
    dep,
    nextDep, // 讓link3的 nextDep 變成 link2
    nextSub: undefined,
    prevSub: undefined,
  }
  // 將鏈表節點跟 dep 建立關聯關係
  if (dep.subsTail) {
    dep.subsTail.nextSub = newLink
    newLink.prevSub = dep.subsTail
    dep.subsTail = newLink
  } else {
    dep.subs = newLink
    dep.subsTail = newLink
  }

  /**
   * 將鏈表節點跟 sub 建立關聯關係
   * 1.如果有尾節點，表示鏈表現在有無數個節點，在鏈表尾部新增。
   * 2.如果沒有尾節點，表示是第一次關聯鏈表，第一個節點頭尾相同。
   */
  if (sub.depsTail) {
    sub.depsTail.nextDep = newLink
    sub.depsTail = newLink
  } else {
    sub.deps = newLink
    sub.depsTail = newLink
  }
}

export function propagate(subs) {
  let link = subs
  let queuedEffect = []

  while (link) {
    queuedEffect.push(link.sub)
    link = link.nextSub
  }

  queuedEffect.forEach((effect) => effect.notify())
}

/**
 * 開始追蹤，將 depsTail 設為 undefined
 */

export function startTrack(sub) {
  sub.depsTail = undefined
}

/**
 * 結束追蹤，找到需要清理的依賴
 */

export function endTrack(sub) {
  const depsTail = sub.depsTail

  /**
   * 1. depsTail 存在，並且 depsTail 的 nextDep 存在，表示後續鏈表節點應該移除
   * 2. 觸發更新完全沒讀到任何依賴（depsTail undefined，並且有頭節點），
   * 那就把所有節點清除，否則 effect 函式會繼續被那些不相干的依賴觸發。
   */
  if (depsTail) {
    if (depsTail.nextDep) {
      clearTracking(depsTail.nextDep)
      depsTail.nextDep = undefined
    }
  } else if (sub.deps) {
    clearTracking(sub.deps)
    sub.deps = undefined
  }
}

/**
 * 清理依賴函式鏈表
 */

function clearTracking(link: Link) {
  while (link) {
    const {prevSub, nextSub, dep, nextDep} = link

    /**
     * 1. 如果上一個節點有 sub，那就把 nextSub 的下一個節點指向當前節點的下一個節點
     * 2. 如果沒有 sub，表示屬於頭節點，那就把 dep.subs 指向當前節點的下一個節點
     */
    if (prevSub) {
      // 如果我有上一個節點
      prevSub.nextSub = nextSub
      link.nextSub = undefined
    } else {
      // 我沒有上一個節點，我是要被刪除的頭節點
      dep.subs = nextSub
    }

    /**
     * 1. 如果下一個節點有 sub，那就把 nextSub 的上一個節點指向當前節點的上一個節點
     * 2. 如果下一個節點沒有 sub，表示屬於尾節點，那就把 dep.subsTail 指向當前節點的上一個節點
     */

    if (nextSub) {
      // 如果我有下一個節點
      nextSub.prevSub = prevSub
      link.prevSub = undefined
    } else {
      // 我沒有下一個節點，我是要被刪除的尾節點
      dep.subsTail = prevSub
    }

    // 清空引用
    link.dep = undefined
    link.sub = undefined
    link.nextDep = undefined

    // 處理下一個要移除的節點
    link = nextDep
  }
}
```

####

```typescript
import {Link, startTrack, endTrack} from './system'

export let activeSub

export class ReactiveEffect {
  // 依賴項鏈表的頭節點指向 link
  deps: Link

  // 依賴項鏈表的尾節點指向 link
  depsTail: Link

  constructor(public fn) {}

  run() {
    const prevSub = activeSub
    activeSub = this
    startTrack(this)

    try {
      return this.fn()
    } finally {
      endTrack(this)
      activeSub = prevSub
    }
  }

  notify() {
    this.scheduler()
  }

  scheduler() {
    this.run()
  }
}

export function effect(fn, options) {
  const e = new ReactiveEffect(fn)

  Object.assign(e, options)

  e.run()

  const runner = e.run.bind(e)

  runner.effect = e

  return runner
}
```

#### 執行結果

##### 第一次 effect 執行完畢

- `flag.value` 是 `true`。

- `effect` 執行後，依賴了 `flag` 和 `name`。

- `effect` 內部形成了一個依賴鏈表： link1(flag) -> link2(name)。

- 此時 `effect` 物件的狀態是：

`effect.deps` 指向 `link1` (頭節點)

- `effect.depsTail `指向 `link2` (尾節點)

##### 第二次 `effect` 執行（`flag.value` 變成 `false）`

- 當 `flag.value` 變成 `false` 時，會觸發 `effect.run()`。

- 第 1 步：`startTrack(this)` 執行

- 在 `run` 方法的一開始，`startTrack` 會先將` effect.depsTail` 重設為 `undefined`。

`effect.deps` 仍然指向 `link1`。

- `effect.depsTail` 現在是 `undefined`。

`track` 被呼叫，接著進入 `link(flag的dep, effect)` 函式。

`effect` 的狀態變成：

- `effect.deps` 指向 `link1`。

- `effect.depsTail` 指向 `link1`。

##### 程式碼進入 `else` ，讀取到 `age.value`

- `track` 再次被呼叫，進入 `link(age的dep, effect)` 函式。

```typescript
function link(dep, sub) {
  // 找到下一個可能的復用節點
  const currentDep = sub.depsTail // 現在是 link1
  const nextDep = currentDep === undefined ? sub.deps : currentDep.nextDep
  // 因為 currentDep 是 link1���所以 nextDep = link1.nextDep，也就是 link2(name)

  // 判斷是否可復用
  // nextDep (link2) 存在，但 link2 的 dep 是 name，可是我們現在要收集的是 age，條件不成立。
  if (nextDep && nextDep.dep === dep) {
    sub.depsTail = nextDep
    return
  }

  // 由於條件不成立，建立一個新的 link 節點 (link3)
  const newLink = {
    // 這個節點就是 link3
    sub,
    dep,
    // newLink 的 nextDep 被賦值為我們剛剛計算出的 nextDep 變數，也就是 link2(name)
    nextDep,
    nextSub: undefined,
    prevSub: undefined,
  }
}
```

- 當我們為 `age` 建立新的節點 `link3` 時，我們把「上一個節點 (link1) 的下一個節點 (link2)」這個資訊，預先存入了 link3 的 nextDep 屬性中。

所以我們可以看到：

- `effect` 依賴了 `flag` 和 `age`。

- `link1` 被復用，`link3` 是新建的。

- `effect.depsTail` 指向 `link3`。

- `link3.nextDep` 指向此次未訪問的 `link2`。

失效的依賴是要實現響應式系統時需要處理的一個問題。這次我們利用 `deps` 鏈表和 `depsTail` 指標，在 `effect` 執行完畢後，能夠確認並移除不再使用的依賴項目。

---

<a id="day-16"></a>

## Day 16 - 效能處理：LinkPool

> 日期: 2025-09-25

昨天，我們完成了「依賴清理」機制，讓 `effect` 能夠正確處理動態變化的依賴關係。然而，這也帶來了一個新的效能問題：當依賴頻繁變化時，系統需要不斷地建立和刪除 Link 節點，每次建立依賴關係都會觸發記憶體分配，頻繁的分配/釋放會導致：

- 垃圾回收壓力增大：GC 執行得越頻繁，就越可能造成應用程式的短暫卡頓。

- 記憶體碎片化：頻繁處理和釋放小塊記憶體，可能導致記憶體空間中出現大量不連續的記憶體碎片。

- 效能下降：記憶體管理本身的成本

我們可以透過物件池（Object Pool）的設計模式來解決這個問題。

#### Object Pool 設計模式

物件池（Object Pool）是一種設計模式，用於管理和重複使用物件，避免頻繁新增和刪除物件帶來的效能耗損。

與其在需要時新增、在用完時刪除，不如將可重複使用的物件統一管理起來，實現循環利用。
這個物件池就像一個「倉庫」，預先存放一批可以重複使用的物件。當需要物件時從池中取出，使用完畢後放回到池中，而不是刪除。

這樣可以達到：

- 重複使用已分配的記憶體：避免了大量的記憶體分配操作

- 減少垃圾回收次數：降低對主執行緒的干擾

#### Link Pool

LinkPool 採用單向鏈表結構，並且依照後進先出 (LIFO) 的原則 。主要是因為新增、刪除節點都只需要用到頭節點的操作，時間複雜度為 O(1)，效率比較高。

#### Link Pool 生命週期

我們接下來的執行步驟如下：

- LinkPool 未使用

- 移除 Link2 節點

- 移除 Link1 節點

- 復用在 linkPool 的節點

可以觀察一下他們的鏈表關係以及 LinkPool 的使用。

##### 初始化

`linkPool` 池是空的，什麼都還沒跑。沒有回收節點可用。

##### 移除 Link2

透過`endTrack(sub)` 判定有「尾段過期」→ 呼叫 `clearTracking(Link2)`

##### 移除 Link1

透過`endTrack(sub)` 判定有「尾段過期」→ 呼叫 `clearTracking(Link1)`

##### 加入 Link1

執行 `link(dep, sub)`，這次 `if (linkPool)` 為 true，走重用分支。

#### LinkPool 程式碼實作

```typescript
interface Dep {
  subs: Link | undefined
  subsTail: Link | undefined
}

interface Sub {
  deps: Link | undefined
  depsTail: Link | undefined
}

export interface Link {
  sub: Sub
  nextSub: Link
  prevSub: Link
  dep: Dep

  nextDep: Link | undefined
}

let linkPool: Link

export function link(dep, sub) {
  const currentDep = sub.depsTail
  const nextDep = currentDep === undefined ? sub.deps : currentDep.nextDep
  if (nextDep && nextDep.dep === dep) {
    sub.depsTail = nextDep
    return
  }

  let newLink

  /**
   * 查看 linkPool 是否存在，如果存在，表示有復用節點
   */

  if (linkPool) {
    newLink = linkPool
    linkPool = linkPool.nextDep
    newLink.nextDep = nextDep
    newLink.dep = dep
    newLink.sub = sub
  } else {
    /**
     * 如果 linkPool 不存在，表示沒有復用節點，那就新建一個節點
     */
    newLink = {
      sub,
      dep,
      nextDep,
      nextSub: undefined,
      prevSub: undefined,
    }
  }

  if (dep.subsTail) {
    dep.subsTail.nextSub = newLink
    newLink.prevSub = dep.subsTail
    dep.subsTail = newLink
  } else {
    dep.subs = newLink
    dep.subsTail = newLink
  }

  if (sub.depsTail) {
    sub.depsTail.nextDep = newLink
    sub.depsTail = newLink
  } else {
    sub.deps = newLink
    sub.depsTail = newLink
  }
}

export function propagate(subs) {
  let link = subs
  let queuedEffect = []

  while (link) {
    queuedEffect.push(link.sub)
    link = link.nextSub
  }

  queuedEffect.forEach((effect) => effect.notify())
}

export function startTrack(sub) {
  sub.depsTail = undefined
}

export function endTrack(sub) {
  const depsTail = sub.depsTail

  if (depsTail) {
    if (depsTail.nextDep) {
      clearTracking(depsTail.nextDep)
      depsTail.nextDep = undefined
    }
  } else if (sub.deps) {
    clearTracking(sub.deps)
    sub.deps = undefined
  }
}

function clearTracking(link: Link) {
  while (link) {
    const {prevSub, nextSub, dep, nextDep} = link

    if (prevSub) {
      prevSub.nextSub = nextSub
      link.nextSub = undefined
    } else {
      dep.subs = nextSub
    }

    if (nextSub) {
      nextSub.prevSub = prevSub
      link.prevSub = undefined
    } else {
      dep.subsTail = prevSub
    }

    link.dep = undefined
    link.sub = undefined

    /**
     * 把不要的節點放回 linkPool 去復用
     */
    link.nextDep = linkPool
    linkPool = link

    link = nextDep
  }
}
```

透過對 link 和 clearTracking 函式的修改，我們完成了 LinkPool 機制。這看起來是一個很小的修改，但實際上是對響應式系統底層的重要效能優化。Link 節點的生命週期從「用完後刪除」變成了「循環再生」，從根本上解決因動態依賴而產生的頻繁記憶體分配與回收問題。

---

<a id="day-17"></a>

## Day 17 - 效能處理：無限循環

> 日期: 2025-09-26

打造響應式系統時，容易遇到的狀況，就是 effect 在執行期間同時「讀取」又「寫入」同一個依賴，這會造成自我觸發（self-trigger）。

effect 為了讀值而被追蹤進依賴，但它在同一次執行中又改了這個值，導致立刻再次觸發自己，形成無限迴圈。

可以看下面範例

```typescript
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Document</title>
    <style>
      body {
        padding: 150px;
      }
    </style>
  </head>
<body>
  <div id="app"></div>
  <script type="module">
    // import { ref, effect } from '../../../node_modules/vue/dist/vue.esm-browser.js'
    import { ref, effect } from '../dist/reactivity.esm.js'

     const count = ref(0)

      effect(() => {
        console.log(count++)
      })
  </script>
</body>
</html>
```

你打開控制台，你會看到：

#### 問題分析

```typescript
effect(() => {
  console.log(count++) // 這裡有兩個操作！
})
```

實際上等同：

```typescript
effect(() => {
  console.log(count.value) // 1. 讀取 count（收集依賴）
  count.value++ // 2. 修改 count（觸發更新）
})
```

- 讀取 `count.value`：這會觸發依賴收集，將當前的 `effect` 註冊為 `count` 的訂閱者。

- 修改 `count.value++`：這會觸發更新，Vue 的響應式系統會遍歷所有訂閱者，並執行。由於 `effect` 自身就是訂閱者，它會被重新執行，從而形成了自我觸發的無限循環。

#### 無限循環的流程

同一個 effect 在追蹤期間讀了 `count`，又立刻寫回 `count`，使自己被再度排入執行隊列；這個「讀→寫→再排隊」的節奏每輪都發生一次，因此形成無限迴圈。

#### 解決方法

Vue 3 使用 `tracking` 標記來防止同一個 effect 在執行期間被重複加入隊列：

#### 程式碼實作

- `effect.ts`

```typescript
import { Link, startTrack, endTrack } from './system'

export let activeSub;

export class ReactiveEffect {

...
  tracking = false // 是否正在收集依賴

....
```

- `system.ts`

```typescript
...
...

export function propagate(subs) {
  let link = subs
  let queuedEffect = []

  while (link) {
    const sub = link.sub

    // 只有不在執行中的才加入隊列
    if(!sub.tracking){
      queuedEffect.push(sub)
    }
    link = link.nextSub
  }

  queuedEffect.forEach(effect => effect.notify())
}

/**
 * 開始追蹤，將 depsTail 設為 undefined
 */

export function startTrack(sub) {
  sub.depsTail = undefined
  sub.tracking = true // 標記為正在執行
}

/**
 * 結束追蹤，找到需要清理的依賴
 */

export function endTrack(sub) {
  sub.tracking = false // 執行結束，取消標記
 ....

}
```

如果我們沒有 tracking 機制，effect 在讀 count 時會被收集，寫 count 時又觸發自己，接著再執行自己，永遠停不下來。

---

<a id="day-18"></a>

## Day 18 - Reactive：深入 Proxy 的設計思路

> 日期: 2025-09-27

在之前的文章中，我們已經完成了 ref 實作，它能將原始值包裝成響應式物件。現在，我們要接續完成另一部分的響應式系統核心：reactive 函式。我們的目標是接收一個完整的物件，並回傳一個代理物件，使其所有屬性都具備響應性。

#### 目標設定

我們的目標很明確：完成一個 reactive 函式，讓行為跟 Vue 的官方範例一樣。

##### 環境建置

```typescript
// import { reactive, effect } from '../../../node_modules/vue/dist/vue.esm-browser.js'
import {reactive, effect} from '../dist/reactivity.esm.js'

const state = reactive({
  a: 0,
})
effect(() => {
  console.log(state.a)
})

setTimeout(() => {
  state.a = 1
}, 1000)
```

我們期待初始化頁面輸出 0，一秒鐘後輸出1。

用註解的官方的範例，我們很明顯看到輸出值。

我們先在`src`底下新增一個 `reactive.ts`

```typescript
export function reactive(target) {}
```

並且在 `index.ts` 引入

```typescript
export * from './ref'
export * from './effect'
export * from './reactive'
```

另外我們在 `shared/src/index.ts` 存放工具函式這邊寫一個物件判斷函式。

```typescript
export function isObject(value) {
  return typeof value === 'object' && value !== null
}
```

#### 核心思路

我們再另外寫一個函式`createReactiveObject`，我們實際的邏輯並不在 `reactive`函式中。

主要是`createReactiveObject`之後其他地方會用到，像是 `shallowReactive` 之類的。

```typescript
export function reactive(target) {
  return createReactiveObject(target)
}
```

接下來思考 `createReactiveObject`他本身的限制，以及我們的需求，

1. 他只能傳入物件類型，所以我們要去判斷他的型別。

2. `reactive` 的核心是用一個 `Proxy` 物件來處理。

3. `Proxy` 的物件中會需要 get 和 set 處理收集依賴、觸發更新。

- 收集依賴：`target` 本身就是依賴，因此我們需要在收集依賴時，把 `target` 跟 `effect`(也就是`sub`)建立關聯關係。

- 觸發更新：通知之前收集的依賴，重新執行。

##### 為什麼 Vue 3 的 `reactive()` 特別適合使用 Proxy？

主要是因為有幾個特性

- `Proxy` 可以攔截並自定義物件的各種操作，不只是屬性的讀取和設置

- 與 Vue 2 使用 `Object.defineProperty()` 相比，`Proxy` 的最大優勢是可以偵測新增的屬性

- `Proxy` 可以直接攔截陣列的索引操作和 length 變更

- `Proxy` 可以處理 `Map`、`Set`、`WeakMap`、`WeakSet` 等集合類型

看來針對物件類型的 `reactive`，`Proxy` 物件的確是一個更好的解決方案，那我們開始實作！

#### 初步實作 - 借鏡 Ref 實作

```typescript
import {isObject} from '@vue/shared'

function createReactiveObject(target) {
  // reactive 只處理物件
  if (!isObject(target)) return target

  // 建立 target 的代理物件
  const proxy = new Proxy(target, {
    get(target, key) {
      // 收集依賴：綁定target的屬性與effect的關係
      console.log(target, key)
      return Reflect.get(target, key)
    },
    set(target, key, newValue) {
      // 觸發更新：通知之前收集的依賴，重新執行effect
      console.log(target, key, newValue)
      return Reflect.set(target, key, newValue)
    },
  })

  return proxy
}
```

我們來看一下，實際上的輸出值：

看來好像蠻接近的，但依照我們寫 `ref` 的經驗，我們還需要做鏈表相關邏輯。

先回顧一下我們的 ref 之前怎麼寫的：

```typescript
export function trackRef(dep) {
  if (activeSub) {
    link(dep, activeSub)
  }
}

export function triggerRef(dep) {
  if (dep.subs) {
    propagate(dep.subs)
  }
}
```

- get有一個`trackRef`函式，`trackRef`函式判斷是不是有`effect`(`activeSub`)，有的話將依賴(`dep`)以及`effect`(`activeSub`)傳入`link`函式跟做鏈表關聯關係。

- set有一個 `triggerRef`函式，`triggerRef`函式判斷是不是收集的依賴有`effect`，有的話就傳入`propagate`作觸發更新。

看來這個依賴(`dep`)很重要，那什麼是依賴？

```typescript
class RefImpl {
  _value;
  [ReactiveFlags.IS_REF] = true

  subs: Link
  subsTail: Link
  constructor(value) {
    this._value = value
  }

  get value() {
    if (activeSub) {
      trackRef(this)
    }
    return this._value
  }

  set value(newValue) {
    this._value = newValue
    triggerRef(this)
  }
}
```

我們可以看到傳入只有

- sub

- subsTail

那我們可以認定只要有這兩個屬性，他就是一個 `dep`，那我們可以建立一個 Dep 類別，其他照 ref 的 trackRef 和 triggerRef 邏輯複製過來，並修改。

```typescript
import { activeSub } from './effect'
import { link, propagate, Link } from './system'

function createReactiveObject(target){
  // reactive 只處理物件
  if(!isObject(target)) return target

  // 建立 target 的代理物件
  const proxy = new Proxy(target, {
    get(target, key){
      // 收集依賴：綁定target的屬性與effect的關係
      track(target, key)
      return Reflect.get(target, key)
    },
    set(target, key, newValue){
      // 觸發更新：通知之前收集的依賴，重新執行effect
      trigger(target, key)
      return Reflect.set(target, key, newValue)
    }
  })

  return proxy
}

class Dep{
  subs: Link
  subsTail: Link
  constructor
}

function track(target, key){
  if(!activeSub)return
  link(dep, activeSub) // 有問題
}

function trigger(target, key){
  if (dep.subs) {
    propagate(dep.subs) // 有問題
  }
}
```

這邊有個地方要注意，觸發通知的話要先更新數值，再去通知重新執行，所以 set 這邊要這樣寫：

```typescript
set(target, key, newValue){
  const res = Reflect.set(target, key, newValue)
  // 觸發更新：通知之前收集的依賴，重新執行effect
  trigger(target, key)
  return res
}
```

名稱重複，調整一下 `system.ts` interface 名稱。

```typescript
interface Dependency {
  subs: Link | undefined
  subsTail: Link | undefined
}

export interface Link {
  ...
  dep: Dependency
  ...
}
```

感覺新建一個`Dep`類別的實例，傳進 `track`就可以了，不過使用者傳入的 `target` 物件跟我們的新建的`Dep`似乎沒有關係。

看起來我們遇到了一些問題：

- 我們不能再用一個 Dep 來管理所有依賴，必須為物件的每個屬性都維護一個 Dep。

- 如何建立 target.a → Dep for a 的對應關係？

- 如何在不污染原始 target 物件的情況下，儲存 target、key 與 Dep 之間的關聯？

為了解決這個問題，我們需要引入一個更複雜的資料結構來儲存，明天我們再接續探討。

---

<a id="day-19"></a>

## Day 19 - Reactive：reactive 的基礎實作

> 日期: 2025-09-28

上一次我們提到：

- 每個物件的每個屬性都需要自己的 Dep。

- 如何建立 `target.a` → Dep 的對應關係？

- 如何在不污染原始物件的情況下儲存這個關係？

我們可以先來做一個簡單的比較

#### Ref、Reactive 比較

RefReactive資料結構單一值物件（多個屬性）依賴儲存直接在實例上（this）需要一個外部的的儲存機制一個 ref一個 Dep多個 Dep（每個屬性一個）

Ref 可以用 `this` 因為它就是一個實例。

但 Reactive 的每個屬性都需要自己的 Dep，要存在哪？

那我們這時候可以建立一個 `Weak Map` 物件。

#### 什麼是 Weak Map？

- `WeakMap` 是一種 鍵值對集合（key-value pairs）。

- key 只能是物件（不能是字串、數字、布林），value 可以是任意型別。

- 弱引用（weak reference）：如果一個物件只被 WeakMap 當 key 使用，而程式中沒有其它變數參考它，這個物件就會被垃圾回收（GC）自動清掉。

看來來正好適合我們去做關聯關係。

#### 核心概念

`WeakMap` 建立一個全域的 `targetMap`，它的三層巢狀結構如下：

1. 第一層 `targetMap` (WeakMap) ：`key` 是原始的目標物件 `target`，`value` 是第二層的 `depsMap`。 `{ target => depsMap }`

2. 第二層 `depsMap` (Map) ：`key` 是 `target` 物件中的屬性名 `key`，`value` 是第三層的 `dep`。 `{ key => dep }`

3. 第三層 `dep` (Dep 實例) ：依賴的容器，儲存了所有訂閱該屬性變更的 `effect`。 `{ subs, subsTail }`

##### 為何不直接用 Map？

因為如果使用一般的 Map，Map 會一直保持對 target 物件的引用，只要它還存在於 Map 中，GC 就無法回收，導致記憶體洩漏。

```typescript
const targetMap = new WeakMap()
```

它的結構會長這樣

```typescript
target = {
  a: 0,
  b: 1,
}

tagetMap = {
  [obj]: {
    a: Dep,
    b: Dep,
  },
}
```

這樣子 Dep 跟 target 就有關係了，一個屬性對應一個 Dep，我們可以通過 target 找到 obj 對應的物件，還可以透過屬性a找到Dep實例，這樣就可以建立關聯關係。

`targetMap` 的 key 是 obj ，value 是一個 map，這個 map 裡面，map 裡面的 key 就是 obj 的屬性，value 就是對應的 dep，這樣就可以收集依賴。

等到需要觸發更新，透過 obj 找到對應的 Map，再透過 key 找到對應的 Dep 通知更新。

#### 收集依賴

收集依賴有分為首次收集依賴，跟之前已經收集過了，所以我們可以這樣寫。

```typescript
function track(target, key) {
  if (!activeSub) return
  // 透過 targetMap 取得 target 的依賴
  let depsMap = targetMap.get(target)

  //首次收集依賴，之前沒有收集過，就新建一個
  // key:obj / value:depsMap
  if (!depsMap) {
    depsMap = new Map()
    targetMap.set(target, depsMap)
  }

  let dep = depsMap.get(key)

  // 收集依賴：第一次建立物件依賴關聯，並且保存到depsMap中
  // key:key / value:Dep
  if (!dep) {
    dep = new Dep()
    depsMap.set(key, dep)
  }

  console.log(targetMap, dep)

  link(dep, activeSub)
}
```

可以 `console.log` 看起來`targetMap`跟`dep`：

看起來的確是我們想的那樣，接下來做觸發更新。

#### 觸發更新

觸發更新的話，原本是寫去找依賴 (`dep`)的 `effect`(sub)，如果找到，就傳入`propagate`，現在我們的 `dep` 都存入了`depsMap`，那我們就理應去`depsMap`找：

```typescript
function trigger(target, key) {
  const depsMap = targetMap.get(target)
  // 如果 depsMap 不存在，表示沒有收集過依賴，直接返回
  if (!depsMap) return

  const dep = depsMap.get(key)
  // 如果依賴不存在，表示這個 key 沒有在effect中被使用過，直接返回
  if (!dep) return

  // 找到依賴，觸發更新
  propagate(dep.subs)
}
```

接下來回去看我們的範例，初始化成功輸出0，一秒之後輸出1。

看起來成功了，接下來我們來測試 `reactive` 中 `getter` 的響應追蹤：

```typescript
//import { reactive, effect } from '../../../node_modules/vue/dist/vue.esm-browser.js'
import {reactive, effect} from '../dist/reactivity.esm.js'

const state = reactive({
  a: 0,
  get count() {
    return this.a
  },
})
effect(() => {
  console.log(state.count)
})

setTimeout(() => {
  state.a = 1
}, 1000)
```

預期結果是先輸出 0，一秒後輸出 1。但實際執行後，我們發現只有初始的 0 被輸出，`state.a = 1` 的更新並未觸發 `effect`。

透過在 `track` 函式中輸出 `(target, key)`，發現只有 `count` 屬性被追蹤了，`a` 屬性並沒有。

原因在於 `return this.a` 上，在 `getter` 內部，`this` 預設指向的是原始的 `target` 物件，而不是我們的 `proxy` 物件。

因此 `this.a` 的取值過程繞過了 `Proxy` 的 `get` ，`a` 屬性的依賴自然也沒辦法收集。

```typescript
const state = reactive({
  a: 0,
  get count() {
    return this.a // this 應該指向誰？
  },
})
```

它應該要指向我們的 Proxy 物件而不是原始物件，這樣它在觸發`getter`的時候，才會執行`track(target, key)`。

那我們要怎麼做？

`Proxy` 的 `handler` 提供第三個參數 `receiver`，它指向的就是 `proxy` 物件本身，因此我們只需要將它傳遞給 `Reflect.get` 就可以修正 `this` 的指向。

```typescript
function createReactiveObject(target) {
  // reactive 只處理物件
  if (!isObject(target)) return target

  // 建立 target 的代理物件
  const proxy = new Proxy(target, {
    get(target, key, receiver) {
      // 收集依賴：綁定target的屬性與effect的關係
      track(target, key)
      return Reflect.get(target, key, receiver)
    },
    set(target, key, newValue, receiver) {
      const res = Reflect.set(target, key, newValue, receiver)
      // 觸發更新：通知之前收集的依賴，重新執行effect
      trigger(target, key)
      return res
    },
  })

  return proxy
}
```

這樣我們就完成，也可以看到初始化 `console.log` 輸出0，一秒之後輸出1。

#### 執行步驟

回顧我們今天：

- 我們引入了以 `WeakMap` 為核心的 `targetMap` 資料結構，解決在不污染原始物件的前提下，為多屬性物件管理各自依賴。

- 我們實作與 `targetMap` 配套的 `track` 和 `trigger` 函式。

- 我們利用 `Proxy` 的 `receiver` 參數，修正 `getter` 中 `this` 指向的問題。

---

<a id="day-20"></a>

## Day 20 - Reactive：reactive 極端案例

> 日期: 2025-09-29

我們完成 `reactive` 的基本實踐後，接下來有幾個有可能會發生的情況：

- 原始物件傳入 Reactive 物件

- Reactive 物件傳入 Reactive 物件

- Reactive 物件重複賦相同數值

- 巢狀物件傳入 Ref 物件

- 解構傳入 Reactive 物件的 Ref 物件，並同步數值。

- 初始化巢狀 Reactive 物件

#### 第一個情況：原始物件傳入 Reactive 物件

這是最基本但也最直觀的一個案例。

如果我們把同一個原始物件多次傳入 reactive，目前的簡化版本會回傳不同的 Proxy 實例。

```typescript
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8" />
  <title>Document</title>
  <style>
    body {
      padding: 150px;
    }
  </style>
</head>

<body>
  <div id="app"></div>
  <script type="module">
    // import { reactive, effect } from '../../../node_modules/vue/dist/vue.esm-browser.js'
    import { reactive, effect } from '../dist/reactivity.esm.js'

    const obj = {
      a:0
    }

    const state = reactive(obj)
    const state2 = reactive(obj)
    console.log(state === state2)

    effect(() => {
      console.log(state.a)
    })

    setTimeout(() => {
      state.a = 1
    }, 1000)
  </script>
</body>

</html>
```

當我們將同一個原始物件多次傳入 `reactive` 函式時，會發現返回的代理物件彼此不相等 (`state !== state2`)，這與官方的行為（返回相等的代理物件）不符。

為什麼 `state !== state2` ？原因在於我們目前的 `createReactiveObject` 函式，每次調用它都會無條件地 `new Proxy()` 一個新的代理物件。

```typescript
function createReactiveObject(target) {
  if (!isObject(target)) return target

  // 這邊每次都會新增新的代理物件
  const proxy = new Proxy(target, {
    get(target, key, receiver) {
      track(target, key)
      return Reflect.get(target, key, receiver)
    },
    set(target, key, newValue, receiver) {
      const res = Reflect.set(target, key, newValue, receiver)
      trigger(target, key)
      return res
    },
  })

  return proxy
}
```

因此我們需要做一些處理，避免讓相同物件被重複代理的情況。

```typescript
/**
 * 儲存 target 和響應式物件的關聯關係
 * key:target / value:proxy
 */

const reactiveMap = new WeakMap()

function createReactiveObject(target) {
  // reactive 只處理物件
  if (!isObject(target)) return target

  // 如果這個 target 已經被 reactive 過了，直接返回已經建立好的 proxy
  const existingProxy = reactiveMap.get(target)
  if (existingProxy) {
    return existingProxy
  }

  const proxy = new Proxy(target, {
    get(target, key, receiver) {
      track(target, key)
      return Reflect.get(target, key, receiver)
    },
    set(target, key, newValue, receiver) {
      const res = Reflect.set(target, key, newValue, receiver)
      trigger(target, key)
      return res
    },
  })

  // 儲存 target 和響應式物件的關聯關係
  reactiveMap.set(target, proxy)

  return proxy
}
```

如果沒有快取機制，會導致以下問題：

- 記憶體浪費：重複建立無用的代理物件。

- 依賴分裂：兩個不同的 proxy 操作同一個 target，但彼此的依賴追蹤卻不一致，可能導致更新失效或重複觸發。

#### 第二個情況：Reactive 物件傳入 Reactive 物件

```typescript
<body>
  <div id="app"></div>
  <script type="module">
    // import { reactive, effect } from '../../../node_modules/vue/dist/vue.esm-browser.js'
    import { reactive, effect } from '../dist/reactivity.esm.js'

    const obj = {
      a:0
    }

    const state = reactive(obj)
    const state2 = reactive(state)
    console.log(state === state2)
  </script>
</body>
```

在官方的實現中，預期結果為 `true`，因此我們需要進行處理，以確保返回快取的代理物件。

但是官方實際做法是他在代理物件 get 訪問某一個特殊屬性，他就會返回快取的代理物件，我們想一下其他方法：其實可以透過引入 `reactiveSet`，解決了重複代理的問題。

```typescript
/**
 * 保存使用所有使用 reactive 建立的響應式物件
 * 用於檢查是否重複 reactive
 */
const reactiveSet = new Set()

function createReactiveObject(target) {
  // reactive 只處理物件
  if (!isObject(target)) return target

  // 如果這個 target 儲存在 reactiveSet 中
  // 表示 target 是一個響應式物件，直接返回已經建立好的 proxy
  if(reactiveSet.has(target)){
    return target
  }
  ...
  ...
})

  // 儲存 target 和響應式物件的關聯關係
  reactiveMap.set(target, proxy)

  // 儲存使用 reactive 建立的響應式物件
  reactiveSet.add(proxy)

  return proxy
}

// 判斷 target 是否為響應式物件
// 只要在 reactiveSet 中存在，就表示是響應式物件
export function isReactive(target) {
  return reactiveSet.has(target)
}
```

這裡的重點是避免重複代理。如果傳入的已經是 proxy，就應該直接返回它。

Vue 官方是透過 Proxy 內部的 `get` handler 監聽特殊屬性（例如 \_`_v_isReactive`）來辨識，
但我們也可以用一個 reactiveSet 來記錄所有已建立的代理，簡化判斷邏輯。

這個設計說明一個核心原則：響應式系統必須能分辨 target 與 proxy 的身份，否則會陷入無窮的代理鏈。

#### 第三個情況：Reactive 物件重複賦相同數值

```typescript
<body>
  <div id="app"></div>
  <script type="module">
    // import { reactive, effect } from '../../../node_modules/vue/dist/vue.esm-browser.js'
    import { reactive, effect } from '../dist/reactivity.esm.js'

    const state = reactive({
      a:0
    })

    effect(() => {
      console.log(state.a)
    })

    setTimeout(() => {
      state.a = 0
    }, 1000)
  </script>
</body>
```

實作上述程式碼，會發現賦予相同數值，控制台會重複輸出兩次，但官方的只有一次。
官方 Vue 的行為是不會重複觸發，因為它會檢查新舊值是否相同。

所以我們現在要做的是，當設定的新值與舊值相同時，我們應該避免觸發不必要的更新通知。

先在 `@vue/shared` 新增一個輔助函式，來判斷數值是否改變過：

```typescript
export function isObject(value) {
  return typeof value === 'object' && value !== null
}
// 判斷新值和舊值是否發生過變化，如果變化就返回 true，沒變化就返回 false
export function hasChanged(newValue, oldValue) {
  return !Object.is(newValue, oldValue)
}
```

引入到`reactive.ts`：

```typescript
import { isObject, hasChanged } from '@vue/shared'
...
...
set(target, key, newValue, receiver) {
    const oldValue = target[key]
    const res = Reflect.set(target, key, newValue, receiver)
    if(hasChanged(newValue, oldValue)){
      // 如果舊值不等於新值，則觸發更新
      trigger(target, key)
    }
    return res
}
...
```

#### 第四個情況：巢狀物件傳入 Ref 物件

為了避免多層巢狀物件傳入 `ref` 的情況，我們判斷傳入 `ref` 的型別，如果它是物件就使用 `reactive`物件。

```typescript
import {isObject} from '@vue/shared'
import {reactive} from './reactive'

enum ReactiveFlags {
  IS_REF = '__v_isRef',
}

class RefImpl {
  _value;
  [ReactiveFlags.IS_REF] = true

  subs: Link
  subsTail: Link
  constructor(value) {
    // 如果 value 是物件，則使用 reactive 轉換為響應式物件
    this._value = isObject(value) ? reactive(value) : value
  }

  get value() {
    if (activeSub) {
      trackRef(this)
    }
    return this._value
  }

  set value(newValue) {
    // 如果新值和舊值發生過變化，則更新
    if (hasChanged(newValue, this._value)) {
      // 如果新值是物件，則使用 reactive 轉換為響應式物件
      this._value = isObject(newValue) ? reactive(newValue) : newValue
      triggerRef(this)
    }
  }
}
```

如果 `ref` 的值是物件，為了讓它繼續有響應式追蹤，所以我們需要在內部把它轉換成 reactive。

#### 第五種情況：解構傳入 Reactive 物件的 Ref 物件，並同步數值。

為了正確處理 `ref` 與 `reactive` 的整合，所以我們要做三件事：

- ref 傳入 reactive，要可以直接拿到值，不需要`.value`

```typescript
<body>
  <div id="app"></div>
  <script type="module">
    // import { reactive, effect } from '../../../node_modules/vue/dist/vue.esm-browser.js'
    import { reactive,ref, effect } from '../dist/reactivity.esm.js'

    // 如果 target.a 是一個 ref，就直接把值給他，不用.value
    const a = ref(0)
    const state = reactive({
      a
    })

    effect(() => {
      // 不用 state.a.value 也可以拿到值
      console.log('reactive', state.a)
    })
  </script>
</body>
```

- ref 傳入 reactive，當 reative 更新數值，ref 數值也要同步更新

```typescript
<body>
  <div id="app"></div>
  <script type="module">
    // import { reactive, effect } from '../../../node_modules/vue/dist/vue.esm-browser.js'
    import { reactive,ref, effect } from '../dist/reactivity.esm.js'

    const a = ref(0)
    const state = reactive({
      a
    })

    effect(() => {
      console.log('reactive', state.a)
    })

    setTimeout(() => {
      //這樣 value 同步更新
      state.a = 1
      console.log('ref', a.value)
    }, 1000)
  </script>
</body>
```

- `ref` 傳入 `reative`，如果 `reative` 更新一個新的 `ref`，原本 `ref` 變數不同步更新。

```typescript
<body>
  <div id="app"></div>
  <script type="module">
    // import { reactive, effect } from '../../../node_modules/vue/dist/vue.esm-browser.js'
    import { reactive,ref, effect } from '../dist/reactivity.esm.js'

    const a = ref(0)
    const state = reactive({
      a
    })

    effect(() => {
      console.log('reactive', state.a)
    })

    setTimeout(() => {
      //這樣 value 不同步更新
      state.a = ref(1)
      console.log('ref', a.value)
    }, 1000)
  </script>
</body>
```

#### 實作

- `ref` 傳入 `reactive`，解構 `.value`

```typescript
...
...
  get(target, key, receiver) {
    // 收集依賴：綁定target的屬性與effect的關係
    track(target, key)
    const res = Reflect.get(target, key,receiver)
    // 如果 res 是一個 ref，則返回 res.value
    if(isRef(res)){
      return res.value
    }
    return res
  },
  ...
  ...
}
```

這樣解構之後，的確可以直接取值，不需要 `.value`，但是 a 裡面的 `value` 卻還是沒有更新。

- 確認新舊數值是否發生變化，決定是否觸發更新 ref。

首先在`@vue/shared`，導出一個輔助函式來判斷是否發生變化：

```typescript
// 判斷新值和舊值是否發生過變化，如果變化就返回 true，沒變化就返回 false
export function hasChanged(newValue, oldValue) {
  return !Object.is(newValue, oldValue)
}
```

再來修改 `Proxy` 物件 `setter`：

```typescript
set(target, key, newValue, receiver) {

  const oldValue = target[key]

  /**
   * const a = ref(0)
   * target = { a }
   * 更新 target.a = 1 時，他就等於更新了 a.value
   * a.value = 1
   */
  if(isRef(oldValue) && !isRef(newValue)){
    oldValue.value = newValue

    // 改了 ref 的值，會通知 sub 更新
    // 所以要 return 不然下方 trigger 又會觸發 trigger 更新 會觸發兩次
    return true
  }

  const res = Reflect.set(target, key, newValue, receiver)

  if(hasChanged(newValue, oldValue)){
    // 如果舊值不等於新值，則觸發更新
    // 觸發更新：通知之前收集的依賴，重新執行effect
    trigger(target, key)
  }
  return res
}
```

#### 第六種情況：初始化巢狀 Reactive 物件

```typescript
<body>
  <div id="app"></div>
  <script type="module">
    // import { reactive, effect } from '../../../node_modules/vue/dist/vue.esm-browser.js'
    import { ref, reactive, effect } from '../dist/reactivity.esm.js'

    const state = reactive({
      a: {
        b: 0
      }
    })

    effect(() => {
      console.log(state.a.b)
    })

    setTimeout(() => {
      state.a.b = 1
    }, 1000)
  </script>
</body>
```

執行上述程式碼後，我們會發現 `effect` 沒有在 `state.a.b` 被修改後重新觸發。

因為屬性 a 的物件（紅色）不屬於響應式，但最外層物件（橘色）是屬於響應式。

```typescript
get(target, key, receiver) {
    track(target, key)
    const res = Reflect.get(target, key,receiver)
    console.log(res)
    if(isRef(res)){
      return res.value
    }
    return res
  },
```

我們在`trigger`函式`console`，發現它沒有反應，因為只要不是響應式物件，就無法觸發更新。

```typescript
export function trigger(target, key) {
  console.log('trigger', target, key)
  ...
}
// 沒有反應
```

所以我們更新一下，如果發現這個屬性的值本身也是一個物件，我們就把它也轉換成響應式物件。

```typescript
get(target, key, receiver) {
    track(target, key)
    const res = Reflect.get(target, key,receiver)
    if(isRef(res)){
      return res.value
    }

    if(isObject(res)){
      /**
       * 如果 res 是物件，則將其轉換為響應式物件
       */
      return reactive(res)
    }
    return res
  },
```

#### 重構調整程式碼

為了提升效能並遵循單一職責原則，我們應該將 `Proxy` 的處理邏輯（handlers）抽離成一個獨立的物件。

若不抽離，每次調用 `createReactiveObject` 都會重新建立一個 `handlers` 物件，造成不必要的耗損。抽離後，所有代理物件便可以共用同一份 `handlers`。

`baseHandlers.ts`

```typescript
import {hasChanged, isObject} from '@vue/shared'
import {track, trigger} from './dep'
import {isRef} from './ref'
import {reactive} from './reactive'

export const mutableHandlers = {
  get(target, key, receiver) {
    // 收集依賴：綁定target的屬性與effect的關係
    track(target, key)
    const res = Reflect.get(target, key, receiver)
    // 如果 res 是一個 ref，則返回 res.value
    if (isRef(res)) {
      // target = {a:ref(0)}
      return res.value
    }

    if (isObject(res)) {
      /**
       * 如果 res 是物件，則將其轉換為響應式物件
       */
      return reactive(res)
    }
    return res
  },
  set(target, key, newValue, receiver) {
    const oldValue = target[key]

    /**
     * const a = ref(0)
     * target = { a }
     * 更新 target.a = 1 時，他就等於更新了 a.value
     * a.value = 1
     */
    if (isRef(oldValue) && !isRef(newValue)) {
      oldValue.value = newValue

      // 改了 ref 的值，會通知 sub 更新
      // 所以要 return 不然下方 trigger 又會觸發 trigger 更新 會觸發兩次
      return true
    }

    const res = Reflect.set(target, key, newValue, receiver)

    if (hasChanged(newValue, oldValue)) {
      // 如果舊值不等於新值，則觸發更新
      // 觸發更新：通知之前收集的依賴，重新執行effect
      trigger(target, key)
    }
    return res
  },
}
```

`dep.ts`

```typescript
import {Link, link, propagate} from './system'
import {activeSub} from './effect'

class Dep {
  subs: Link
  subsTail: Link
  constructor() {}
}

const targetMap = new WeakMap()

export function track(target, key) {
  if (!activeSub) return
  // 透過 targetMap 取得 target 的依賴

  let depsMap = targetMap.get(target)

  // 首次收集依賴，之前沒有收集過，就新建一個
  // key:obj / value:depsMap

  if (!depsMap) {
    depsMap = new Map()
    targetMap.set(target, depsMap)
  }

  let dep = depsMap.get(key)

  //收集依賴：第一次建立物件依賴關聯，並且保存到depsMap中
  // key:key / value:Dep
  if (!dep) {
    dep = new Dep()
    depsMap.set(key, dep)
  }

  link(dep, activeSub)
}

export function trigger(target, key) {
  const depsMap = targetMap.get(target)
  // 如果 depsMap 不存在，表示沒有收集過依賴，直接返回
  if (!depsMap) return

  const dep = depsMap.get(key)
  // 如果依賴不存在，表示這個 key 沒有在effect中被使用過，直接返回
  if (!dep) return

  // 找到依賴，觸發更新
  propagate(dep.subs)
}
```

`reactive.ts`

```typescript
import {isObject} from '@vue/shared'
import {mutableHandlers} from './baseHandlers'

/**
 * 儲存 target 和響應式物件的關聯關係
 * key:target / value:proxy
 */

const reactiveMap = new WeakMap()

/**
 * 保存使用所有使用 reactive 建立的響應式物件
 * 用於檢查是否重複 reactive
 */
const reactiveSet = new Set()

function createReactiveObject(target) {
  // reactive 只處理物件
  if (!isObject(target)) return target

  // 如果這個 target 儲存在 reactiveSet 中
  // 表示 target 是一個響應式物件，直接返回已經建立好的 proxy
  if (reactiveSet.has(target)) {
    return reactiveMap.get(target)
  }

  // 如果這個 target 已經被 reactive 過了，直接返回已經建立好的 proxy
  const existingProxy = reactiveMap.get(target)
  if (existingProxy) {
    return existingProxy
  }

  // 建立 target 的代理物件
  const proxy = new Proxy(target, mutableHandlers)

  // 儲存 target 和響應式物件的關聯關係
  reactiveMap.set(target, proxy)

  // 儲存使用 reactive 建立的響應式物件
  reactiveSet.add(proxy)

  return proxy
}

export function reactive(target) {
  return createReactiveObject(target)
}

// 判斷 target 是否為響應式物件
// 只要在 reactiveSet 中存在，就表示是響應式物件
export function isReactive(target) {
  return reactiveSet.has(target)
}
```

這六個情境案例，分別是：

- 快取機制：避免重複代理與依賴分裂。

- 身份辨識：區分原始物件、代理物件與 `ref`。

- 效能優化：避免不必要的觸發。

- API 體驗：隱藏 `.value`，提升開發者直覺。

- Lazy 策略：動態轉換巢狀物件，提升初始化效能。

- 工程化：抽離 `handlers`，讓程式碼更具可維護性。

這些設計選擇的背後，都是在效能、易用性、與一致性之間的權衡。
理解這些極端案例，不只是能寫出響應式系統，更能了解 Vue 3 背後的設計思維。

---

<a id="day-21"></a>

## Day 21 - Computed：即時更新基礎實作

> 日期: 2025-09-30

今天我們要在保持既有鏈表架構不變的前提下，來實作 computed 的惰性計算 + 快取（dirty 旗標）與調度邏輯。

#### 範例演示

```typescript
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8" />
  <title>Document</title>
  <style>
    body {
      padding: 150px;
    }
  </style>
</head>

<body>
  <div id="app"></div>
  <script type="module">
    import { ref, computed, effect } from '../../../node_modules/vue/dist/vue.esm-browser.js'
    // import { ref, computed, effect } from '../dist/reactivity.esm.js'

    const count = ref(0)

    const c = computed(() => {
      return count.value + 1
    })

    effect(() => {
      console.log(c.value)
    })

    setTimeout(() => {
      console.log(count.value)
    }, 1000)

  </script>
</body>

</html>
```

先看官方程式碼的效果：

可以看到控制台，它會先輸出`1`，再輸出`2`，中間的 computed 只在需要時重算（惰性）。

執行順序是：

##### 初始化

- 初始化變數：`count`、`c`

- 初始化 `effect`，立刻執行`console.log(c.value)`

- 收集 computed 依賴，觸發計算函式 `() => count.value + 1`。

- 讀取了 `count.value`，函式回傳 `0 + 1`，結果是 `1`，輸出`1`。

##### 一秒之後

- `count.value = 1` 被執行。

- Vue 偵測到 `count` 的值從 `0` 變成了 `1`。

- 當 `count.value` 被修改時，它會通知所有訂閱它的對象，這邊包含`c`。

- `c` 接收到通知後，重新計算自己的值，並接著通知所有訂閱 `c` 的對象（也就是 `effect`），最終觸發 `effect` 的重新執行。

- `effect` 收到通知，於是自動重新執行它內部的函式：`() => console.log(c.value)`。

effect 它再次讀取 `c.value`。

- 重新執行計算函式 `() => count.value + 1`。

- 此時，`count.value` 的值已經是 `1`。

- `c` 計算出的新值為 `1 + 1 = 2`，輸出`2`。

那我們可以看這個過程中，computed 在這當中扮演的角色如下圖。

#### 設計核心

首先`computed` 具有雙重角色：

- 訂閱者 (Sub)，它會收集其執行函式（getter）中所訪問到的所有響應式依賴。

- **依賴項 (Dep)，**當 `effect` 訪問 `computed` 的 `.value` 時，`computed` 會將這個 `effect` 收集起來，建立關聯。

- computed 接收有可能是函式，也有可能是一個物件。

判斷是否為函式，函式有 getter

- 判斷是否為物件，物件有傳入的 getter 和 setter

怎麼樣是一個 Sub？怎麼樣是一個 Dep？可以查看之前定義的 interface。

```typescript
/**
 * 依賴項
 */
export interface Dependency {
  // 訂閱者鏈表頭節點
  subs: Link | undefined
  // 訂閱者鏈表尾節點
  subsTail: Link | undefined
}
/**
 * 訂閱者
 */
export interface Sub {
  // 訂閱者鏈表頭節點
  deps: Link | undefined
  // 訂閱者鏈表尾節點
  depsTail: Link | undefined
  // 是否正在收集依賴
  tracking: boolean
}
```

Sub

- 有 `deps` 頭節點

- 有 `depsTail` 尾節點

- 有是否正在收集依賴的標記

Dep

- 有 `subs` 頭節點

- 有 `subsTail` 尾節點

- 一定是響應式，會是 ref 或是 reactive

#### 實作

我們先在 `@vue/shared`，新增一個函式判斷式。

```typescript
export function isFunction(value) {
  return typeof value === 'function'
}
```

由於 computed 接收有可能是函式，也有可能是一個物件，所以我們新增一個 `computed.ts`，導出一個 computed 函式，來判斷它是物件還是函式。

- 傳入是函式：

表示只有 getter(computed 唯讀)

傳入是物件：

- 表示有 getter 跟 setter

```typescript
export function computed(getterOptions) {
  let getter
  let setter
  if (isFunction(getterOptions)) {
    getter = getterOptions
  } else {
    getter = getterOptions.get
    setter = getterOptions.set
  }

  // ComputedRefImpl 是 computed 實際的響應式實作類別，再將 getter 跟 setter 傳入
  return new ComputedRefImpl(getter, setter)
}
```

接著讓我們再來實作 `ComputedRefImpl` 類別，把 Dep 和 Sub 所需要的屬性加入：

```typescript
class ComputedRefImpl implements Dependency, Sub {
  // computed 是 ref，所以他會有這個標誌，通過 isRef 也回傳 true
  [ReactiveFlags.IS_REF] = true

  // 保存 fn 返回值
  _value

  // 如果是 Dep，要關聯 Subs，觸發更新要通知執行 fn
  subs: Link
  subsTail: Link

  // 如果是 Sub，要知道哪些 Dep 被收集
  deps: Link
  depsTail: Link
  tracking = false

  constructor(
    public fn, //getter，但原始碼是fn，為了保持跟 effect 一致
    private setter
  ) {}
  get value() {
    this.update()
    return this._value
  }
  set value(newValue) {
    // 如果他有傳入 setter，表示是物件傳入
    if (this.setter) {
      this.setter(newValue)
    } else {
      console.warn('computed is readonly')
    }
  }

  update() {
    this._value = this.fn()
  }
}
```

我們執行這段程式碼，表面上看，它似乎能正確計算出結果：

但其實目前 `get value()` 每次讀取都直接 `update()`，都沒有導入快取/dirty 與，在多次讀值或多個 effect 下會一直重複計算。

我們剛剛提到 computed 他有雙重角色，那麼我們要如何讓 `computed` 同時做 `Dep` 和 `Sub` 的角色呢？

回顧我們先前的邏輯，就可以知道：

#### 當 Computed 作為 Dep

我們先在 `get value()` 裡建立與當前 activeSub 的關聯（`link(this, activeSub)`），同時改成只有在 dirty 時才 update，避免每次讀值都重算。

```typescript
class ComputedRefImpl implements Dependency, Sub {
 ...
 ...
  get value() {
    this.update()
    if(activeSub){
      link(this,activeSub)
    }
    console.log('computed',this)
    return this._value
  }
  ...
  ...
}
```

接下來 console 看看是不是正常收集到 Fn

看來有正確儲存 fn ，表示我們建立好關聯關係。

我們現在已經完成下方紅色區塊連結的地方：

#### 當 Computed 作為 Sub

我們需要在 fn 執行期間，收集訪問的響應式，因此我們看一下之前寫的 effect 的邏輯。

computed 的 `getter` 執行時仍需收集依賴。沿用先前的 `setActiveSub` / `startTrack` / `endTrack` 機制，不需要改寫 effect 架構。

我們只在 `ComputedRefImpl.update()` 內部包一層收集區段就好。

```typescript
export function setActiveSub(sub) {
  activeSub = sub
}

export class ReactiveEffect {
...
run() {
    const prevSub = activeSub
    setActiveSub(this)
    startTrack(this)

    try {

      return this.fn()

    } finally {
      endTrack(this)
      setActiveSub(prevSub)
    }
  }
...
...
}
```

我們透過 `setActiveSub` 來重新賦值給 `activeSub` 變數，再引入 `computed.ts`

```typescript
import { activeSub, setActiveSub } from './effect'
...
...
update(){

    // 為了在 fn 執行期間，收集訪問的響應式
    const prevSub = activeSub
    setActiveSub(this)
    startTrack(this)

    try {
      this._value =  this.fn()

    } finally {
      endTrack(this)
      setActiveSub(prevSub)
      console.log(this)
    }
  }
...
...
```

在 console 控制台上，我們可以看到 dep 也被成功儲存。

這樣看來，下方紅色圈起來的地方也已經完成。

#### 報錯

但你應該還會發現有一個錯誤。

原因是 `Ref` 在 setTimeout 觸發更新會執行 `setter`

```typescript
...
...
set value(newValue) {
    if(hasChanged(newValue, this._value)){
      this._value = isObject(newValue) ? reactive(newValue) : newValue
      triggerRef(this)
    }
}
...
```

然而執行到`propagate`函式

```typescript
export function propagate(subs) {
  let link = subs
  let queuedEffect = []

  while (link) {
    const sub = link.sub

    // 只有不在執行中的才加入隊列
    if (!sub.tracking) {
      queuedEffect.push(sub)
    }
    link = link.nextSub
  }

  queuedEffect.forEach((effect) => effect.notify())
}
```

`propagate` 函式預期所有 `sub` 都有一個 `run()` 方法，但我們的 `ComputedRefImpl` 類別沒有這個方法。

我們目前已經分別完成兩部份的鏈表，分別是：

- 讓 `computed` 成為 `count` 的訂閱者 (Sub)

- 讓 `computed` 成為 `effect` 的依賴項目 (Dep)

現在，我們需要將這兩段依賴鏈路串��起來，形成完整的更新流程。

#### 解決問題

執行觸發更新時：

- ref 觸發更新

- 通過 Sub 找到 computed

- computed 執行更新

- computed 再通過 computed 本身的 sub 鏈表

- 找到所有的 sub 重新執行

因此我們現在要做的就是：

1. 處理 computed 更新

2. 讓 computed 通過 sub 鏈表，通知其他 sub 更新。

還記得我們原本在 computed 怎麼執行更新？

之前我們在 `ComputedRefImpl` 中已經定義了 `update` 方法，可以用它來更新 computed 的值。

```typescript
export function processComputedUpdate(sub) {
  // 通知 computed 更新
  sub.update()
  // 通知 sub 鏈表的其他 sub 更新
  propagate(sub.subs)
}

export function propagate(subs) {
  let link = subs
  let queuedEffect = []

  while (link) {
    const sub = link.sub

    if (!sub.tracking) {
      // 如果 link.sub有 update 方法，表是傳入的是 computed
      if ('update' in sub) {
        processComputedUpdate(sub)
      } else {
        queuedEffect.push(sub)
      }
    }
    link = link.nextSub
  }

  queuedEffect.forEach((effect) => effect.notify())
}
```

所以我們可以透過傳入的 sub 是否有 `update` 方法來判斷他是不是 computed，如果傳入的是 computed，那除了觸發更新函式之外，還需要通知 sub 鏈表上的所有 sub 更新。

我們執行這段程式碼，表面上看，它似乎能正確計算出結果：

但如果 `index.html` 你這樣寫：

```typescript
const count = ref(0)
const c = computed(() => {
  console.count('computed')
  return count.value + 1
})

effect(() => {
  console.log(c.value)
})

setTimeout(() => {
  count.value = 1
}, 1000)
```

你會發現它其實是觸發三次。

如果用官方的範例，發現它其實執行兩次而已。

這個問題的根源在於 `get value()` 的實作：每次訪問 `.value` 都會直接觸發 `update()` 方法，因此完全沒有實現緩存。

```typescript
get value() {
    this.update()
    ...
    ...
  }
```

今天我們加上快取與 `dirty`，並以 `notify()` 充當調度器：上游變更只標髒、下游讀取才重算。下篇我們再補上更進一步的同一 tick 多次讀值只算一次、以及多層 computed 鏈的範例，確認效能與語意

`computed` 完整程式碼：

```typescript
import {ReactiveFlags} from './ref'
import {Dependency, Sub, Link, link, startTrack, endTrack} from './system'
import {isFunction} from '@vue/shared'
import {activeSub, setActiveSub} from './effect'

class ComputedRefImpl implements Dependency, Sub {
  // computed 是 ref，所以他會有這個標誌，通過 isRef 也回傳 true
  [ReactiveFlags.IS_REF] = true
  // 保存 fn 返回值
  _value
  // 如果是 Dep，要關聯 Subs，觸發更新要通知執行 fn
  subs: Link
  subsTail: Link

  // 如果是 Sub，要知道哪些 Dep 被收集
  deps: Link
  depsTail: Link
  tracking = false
  constructor(
    public fn, //getter，源碼是fn，保持跟 effect 一致
    private setter
  ) {}
  get value() {
    this.update()

    if (activeSub) {
      link(this, activeSub)
    }
    return this._value
  }
  set value(newValue) {
    if (this.setter) {
      this.setter(newValue)
    } else {
      console.warn('computed is readonly')
    }
  }

  update() {
    /**
     * 收集依賴
     * 為了在 fn 執行期間，收集訪問的響應式
     */

    const prevSub = activeSub
    setActiveSub(this)
    startTrack(this)

    try {
      this._value = this.fn()
    } finally {
      endTrack(this)
      setActiveSub(prevSub)
    }
  }
}

export function computed(getterOptions) {
  let getter
  let setter
  if (isFunction(getterOptions)) {
    getter = getterOptions
  } else {
    // 傳入是物件，物件有 get 和 set
    getter = getterOptions.get
    setter = getterOptions.set
  }

  return new ComputedRefImpl(getter, setter)
}
```

---

<a id="day-22"></a>

## Day 22 - Computed：深入緩存機制實作

> 日期: 2025-10-01

在上一篇文章中，我們提到將透過「緩存」的機制來解決 `computed` 在訪問時重複執行的問題。

在 Vue 3 的原始碼裡，`computed` 是靠一個「髒值標記（dirty flag）」來判斷需不需要重新計算的。

#### Computed 緩存解決方案

#### 核心邏輯

在 computed 中記錄髒標記：當髒標記是 true，才需要進行更新；當髒標記是 false，則表示需要進行緩存。

```typescript
class ComputedRefImpl implements Dependency, Sub {
  ...
  ...
  tracking = false

  // 計算屬性是否需要重新計算，如果為 true，則重新計算
  dirty = true

  ...
  ...
  get value() {
    if(this.dirty){
      this.update()
    }
  ...
  ...
  }

  update(){
  ...
  ...
    try {

      this._value =  this.fn()
      // 調用 update 更新後，將 dirty 更改為 false
      this.dirty = false
    } finally {
      endTrack(this)
      setActiveSub(prevSub)
    }
  }
}
```

再回去看，現在已經有進行緩存，只執行兩次，可是我們又發現了另一個問題，如果你把 `index.html` 設定為以下：

```typescript
<body>
  <div id="app"></div>
  <script type="module">
    // import { ref, computed, effect } from '../../../node_modules/vue/dist/vue.esm-browser.js'
    import { ref, computed, effect } from '../dist/reactivity.esm.js'

    const count = ref(0)

    const c = computed(() => {
      console.log('computed')
      return count.value + 1
    })

    // effect(() => {
    //   console.log(c.value)
    // })

    console.log(c.value)
    count.value = 1

  </script>
</body>
```

你會發現 `count.value` 數值變更之後，他還是訪問 `computed`，但是依賴 `computed` 的數值被變更時，我們當下不一定會訪問 `computed`。

查看一下官方程式碼，`count.value` 數值變更後，`computed` 沒有被訪問。

但是我們的版本，他又再訪問一次`computed`：

遇到這個狀況我們可以怎麼做？我們可以做髒標記，等下次`computed`被 effect 訪問再執��更新。

```typescript
...
...
export function processComputedUpdate(sub) {
  // 有 sub.subs（effect 鏈表的頭節點），再進行更新
  if(sub.subs){
    sub.update()
    propagate(sub.subs)
  }
}

export function propagate(subs) {
  let link = subs
  let queuedEffect = []

  while (link) {
    const sub = link.sub

    if(!sub.tracking){
      if ('update' in sub) {
        // 被 effect 進行訪問，計算屬性需要重新計算
        sub.dirty = true
        processComputedUpdate(sub)
      } else {
        queuedEffect.push(sub)
      }
    }
    link = link.nextSub
  }

  queuedEffect.forEach(effect => effect.notify())
}
...
...
```

這樣就可以解決緩存的問題。可是我們又發現了新的問題。

#### Effect 重複執行問題

```typescript
<body>
  <div id="app"></div>
  <script type="module">
    // import { ref, computed, effect } from '../../../node_modules/vue/dist/vue.esm-browser.js'
    import { ref, computed, effect } from '../dist/reactivity.esm.js'

    const count = ref(0)

    const c = computed(() => {
      console.log('computed')
      return count.value * 0
    })

    effect(() => {
      console.log(c.value)
    })

    setTimeout(() => {
      count.value = 1
    }, 1000)

  </script>
</body>
```

現在我們發現，computed 執行兩次，這個沒什麼問題，有問題是 effect 的數值沒有改動，但是它也執行兩次，如果數值沒變，只要執行一次就好了。

回顧我們在 Ref 實作，當觸發更新時，也是新值和舊值不相同的時候，才會觸發更新，在這邊我們也用相同作法。

```typescript
import { hasChanged } from '@vue/shared'
...
...
class ComputedRefImpl implements Dependency, Sub {
  ...
  ...
  update(){
   ...
   ...
    try {
      // 更新前的值
      const oldValue = this._value
      // 更新的值
      this._value =  this.fn()
      this.dirty = false
      return hasChanged(oldValue, this._value)
    } finally {
      endTrack(this)
      setActiveSub(prevSub)
    }
  }
}
```

先將更新前的值保存起來，用`hasChanged`判斷數值是否改變，再從 update 函式返回值判斷：

```typescript
export function processComputedUpdate(sub) {
  // update 返回值如果是 true
  // 表示數值不同，effect 執行
  if (sub.subs && sub.update()) {
    propagate(sub.subs)
  }
}
```

得到期望結果，`computed` 執行兩次、`effect` 執行一次。

感覺我們解決了這個問題，但其實發現這個只是非常片面的解決方案，因為 effect 它在訪問相同依賴的時候，會重複觸發。

#### Effect 訪問相同依賴重複觸發問題

```typescript
<body>
  <div id="app"></div>
  <script type="module">
    // import { ref, computed, effect } from '../../../node_modules/vue/dist/vue.esm-browser.js'
    import { ref, computed, effect } from '../dist/reactivity.esm.js'

    const count = ref(0)

    effect(() => {
      console.count('effect')
      console.log(count.value)
      count.value
    })

    setTimeout(() => {
      count.value = 1
    }, 1000)

  </script>
</body>
```

可以看到這樣它觸發了三次，你如果查看一下 count：

```typescript
effect(() => {
  console.count('effect')
  console.log(count.value)
  count.value
})
console.log(count)
```

會發現它收集了相同依賴收集兩次，這時候該怎麼解決？

原始碼在`link`函式裡面，每次建立關聯關係前都會去遍歷鏈表，確認是不是有建立過關聯關係。

#### 方法一：在 link 函式判斷是否有建立過關聯關係

```typescript
export function link(dep, sub) {
  /**
   * 復用節點
   * sub.depsTail 是 undefined，並且有 sub.deps 頭節點，表示要復用
   */
  const currentDep = sub.depsTail
  const nextDep = currentDep === undefined ? sub.deps : currentDep.nextDep
  // 如果 nextDep.dep 等於我當前要收集的 dep
  if (nextDep && nextDep.dep === dep) {
    sub.depsTail = nextDep  // 移動指針
    return
  }

  /**
   * 如果 dep 和 sub 建立過關聯關係，就直接返回。
   */

  let existingLink = sub.deps;
  while (existingLink) {
    // 如果在鏈表中找到了與當前 dep 相同的依賴項
    if (existingLink.dep === dep) {
      // 表示這個關聯已經建立過了，直接返回，不做任何事
      return;
    }
    // 移動到下一個依賴項節點
    existingLink = existingLink.nextDep;
  }
  ...
  ...
}
```

- 在 `link` 函式一開始，就先進行檢查。

- 從 `sub.deps` (訂閱者的依賴鏈表頭部) 開始進行遍歷。

沿著 `nextDep` 指標移動，檢查每一個鏈表節點 (`Link`)。

- 在每一個節點上，判斷 `link.dep` 是否與我們正要連結的 `dep` 是同一個。

如果是，代表已經建立過關聯關係，我們就可以直接 `return`。
如果遍歷完整個鏈表都沒有找到，那才繼續執行後面新增鏈表節點的邏輯。

這邊注意，需要寫在復用節點的邏輯後面：若檢查建立過依賴關係時提前退出，depsTail 標記會一直保持是 `undefined`，依賴會被錯誤清理。

#### 方法二：重構髒標記

這邊換另一個比較簡易一點的方法，我們不管他們是不是有建立過關聯關係，重點是我們只要讓 effect 函式執行一次就可以了，這樣我們只要調整髒標記處理。

```typescript
export class ReactiveEffect {

  ...
  ...
  dirty = false // 是否需要重新計算
  ...
```

我們先在 effect 函式，加一個髒標記。

```typescript
export function propagate(subs) {
  ...
  ...

    // 不在執行中的才加入隊列 以及 他是髒標記是 false 才執行
    if(!sub.tracking && !sub.dirty){
      // 開始執行，髒標記設定為初始值
      sub.dirty = true
      if ('update' in sub) {
        processComputedUpdate(sub)
      } else {
        queuedEffect.push(sub)
      }
    }
  ...
  ...
}

export function endTrack(sub) {
  sub.tracking = false // 執行結束，取消標記
  const depsTail = sub.depsTail
  sub.dirty = false // fn 執行結束，追蹤完
...
...
}
```

並且在觸發更新時，增加髒標記的判斷。

如果有多個依賴同時觸發這個 `effect`，它也只會被加入佇列一次。因為一旦 `dirty` 變成 `true`，下一次的 `!sub.dirty` 判斷就會是 `false`跳過 `if` 區塊。

在 `endTrack` 中，`sub.dirty` 被設為 `false`。這代表 `effect` 剛剛成功執行完畢，它的狀態是「乾淨的」，不需要再次執行。

```typescript
..
..
update(){
    ...
    ...
    try {
      // 更新前的值
      const oldValue = this._value
      // 更新的值
      this._value =  this.fn()
      this.dirty = false// 刪除髒標記初始化
      return hasChanged(oldValue, this._value)
    } finally {
      endTrack(this)
      setActiveSub(prevSub)
    }
  }
  ..
  ..
```

清除在 `computed.ts` 的髒標記初始化，因為我們已經在 `endTrack` 函式，統一處理初始化。

##### 髒標記的判斷與運作流程

1. 初始化：一個 `effect` 在執行完畢後，`dirty` 標記會被設為 `false`，表示「這是最新狀態，不需要執行」。

2. 觸發更新時：當依賴項目變更，`propagate` 函式會檢查 `effect` 是否為 `dirty: false`。

3. 加入佇列前：只有當 `dirty` 為 `false` 時，才會將馬上設定為 `true`，然後再將 `effect` 加入待執行佇列。

4. 防止重複：這個「先將設定為 `true` 再入列」的機制，可以保證在同一個事件迴圈中，縱使有多個依賴項目觸發同一個 `effect`，它也只會被加入佇列一次，避免了不必要的重複執行。

---

<a id="day-23"></a>

## Day 23 - Watch：基礎實作

> 日期: 2025-10-02

watch 是 Vue 非常重要的一個 API，它允許開發者在響應式資料發生變化時，執行特定的副作用（side effects）。這些副作用可以是異步行為，像是發起請求，也可以是需要基於狀態變化執行的複雜邏輯。

在實作之前，我們先來回憶在實作 `effect` 的時候，我們有做一個 Scheduler 調度器，然而`watch` 的核心原理與 `effect` 的調度器（Scheduler）密切相關。

調度器的設計目標是：當響應式數據變更時，不直接重新執行 `effect` 的主體函式，而是執行一個指定的調度函式。

細節可以回去看之前寫的文章。

#### 核心概念

`watch` 本質上是 `effect` 的一種應用。它利用了調度器機制，來實現『監聽資料變更，並執行指定 callback 函式』的功能。

- effect：當資料發生變化時，本身會重新執行。

- watch：當資料發生變化時，執行一個自訂的函式，訂且在這個函式中呼叫使用者提供的 callback 函式。

#### Watch

接收參數：

- source：要監聽的來源

- cb：要執行的 callback 函式

- options：其他選項，如 `deep`、`immediate`、`once`

返回值：一個函式，主要目的是停止監聽

#### 基礎實作

我們建立一個 `watch.ts`檔案，並且導出。

在實作 `watch` 時，我們直接使用 `ReactiveEffect` 類別，而不是 `effect` 函式。

主要原因是 `effect` 函式返回的是 `runner`，我們無法直接取得內部 `fn` 的返回值，但如果直接使用 `ReactiveEffect` 實例，可以通過呼叫 `effect.run()` 來取得返回值。

```typescript
export function effect(fn, options) {

  const e = new ReactiveEffect(fn)

  Object.assign(e, options)

  e.run()

  const runner = e.run.bind(e)

  runner.effect = e

  return runner <= 沒有 fn 返回值

}
```

然而`ReactiveEffect`類別需要傳入一個函式，但是 source 參數不一定是函式，他有可能是一個 ref 物件，因此一開始我們利用 getter 包裝成一個函式。

```typescript
import {isRef} from './ref'
import {ReactiveEffect} from './effect'

export function watch(source, cb, options) {
  let getter // 做成函式 傳入 effect

  if (isRef(source)) {
    // source 有可能是 ref 物件，進行函式的包裝
    getter = () => source.value
  }

  /**
   * 使用 effect 類別，而不使用 effect 函式，是因為 effect 沒有返回 effect.run() 返回值
   */
  const effect = new ReactiveEffect(getter) //effect 要接收一個函式
}
```

接下來，我們需要定義 `job` 函式，它將作為 `effect` 的調度器。當監聽的資料發生改變時，`job` 函式會被觸發，主要功能如下：

1. 取得新值：調用 `effect.run()`，這會重新執行 `getter` 並返回最新的值（`newValue`）。

2. 執行 callback：調用用戶傳入的 `cb(newValue, oldValue)`。

3. 更新舊值：將本次的 `newValue` 賦給 `oldValue`，為下一次變更做準備。

```typescript
import {isRef} from './ref'
import {ReactiveEffect} from './effect'

export function watch(source, cb, options) {
  let getter // 做成函式 傳入 effect

  if (isRef(source)) {
    // source 有可能是 ref 物件，進行函式的包裝
    getter = () => source.value
  }

  let oldValue

  function job() {
    // 執行 effect 的函式，得到新的數值，不能直接執行 getter，因為要收集依賴
    const newValue = effect.run()
    cb(newValue, oldValue)

    // 這次更新的新數值就是下次的舊數值
    oldValue = newValue
  }

  /**
   * 使用 effect 類別，而不使用 effect 函式，是因為 effect 沒有返回 effect.run() 返回值
   */
  const effect = new ReactiveEffect(getter) //effect 要接收一個函式

  effect.scheduler = job

  oldValue = effect.run() // 收集依賴後，得到 run 返回值，取得舊的數值

  return () => {} // 停止監聽
}
```

我們實作看看 `index.html`

```typescript
<body>
  <div id="app"></div>
  <script type="module">
    // import { ref, computed, effect } from '../../../node_modules/vue/dist/vue.esm-browser.js'
    import { ref, watch } from '../dist/reactivity.esm.js'

    const count = ref(0)

    watch(count, (newVal, oldVal) => {
      console.log('newVal, oldVal', newVal, oldVal)
    })

    setTimeout(() => {
      count.value = 1
    }, 1000)

  </script>
</body>
```

##### 初始化

- `watch` 建立一個內部的 `effect` 來監聽 `count`

- `effect` 會立即執行一次，主要目的有兩個：

1. 註冊依賴：存取 `count.value`，讓 `watch` 開始追蹤 `count` 的後續變化。

2. 取得初始值：讀取 `count` 的當前值 `0`，並將其存放在 `watch` 函式內部的 `oldValue` 變數中。

- 重點： `console.log` 在這個階段不會被執行。

##### 更新時 (1 秒後 `setTimeout` 執行)

- `count.value` 的值被更新為 `1`。

- 資料變動觸發`watch` 內部建立的 `effect`，但它執行的是我們自訂的調度器 (`scheduler`)。

- `scheduler`已經被賦予成 `job`，直接呼叫 `job` 函式。

- `job` 內部會：

1. 呼叫 `effect.run()` 來取得 `count` 的新值 `1`。

2. 呼叫您提供的回呼函式，並傳入 `(newValue: 1, oldValue: 0)`。

3. `console.log` 因此印出 `newVal, oldVal 1 0`。

4. 將新值 `1` 存在 `oldValue`，確保下次更新`oldValue`是正確的舊值。

#### 停止監聽函式

停止監聽函式剛剛我們沒有寫，接著完成。

```typescript
<body>
  <div id="app"></div>
  <script type="module">
    // import { ref, watch, effect } from '../../../node_modules/vue/dist/vue.esm-browser.js'
    import { ref, watch } from '../dist/reactivity.esm.js'

    const count = ref(0)

    const stop = watch(count, (newVal, oldVal) => {
      console.log('newVal, oldVal', newVal, oldVal)
    })

    setTimeout(() => {
      count.value = 1
      setTimeout(() => {
        stop()
        count.value = 2
      }, 1000)
    }, 1000)

  </script>
</body>
```

這個範例會輸出兩次，如果我們希望不要輸出第二次結果，應該怎麼做？

首先我們先做一個 `active` 的監聽標記：

- 在 `run` 方法中，如果沒有監聽標記，我們就返回 fn 的返回值

- 在類別裡面寫一個 `stop` 停止監聽方法：

`stop` 方法的核心是清除 `effect` 實例上收集到的所有依賴。這可以通過組合使用 `startTrack` 和 `endTrack` 來實現：

- 首先，呼叫 `startTrack(this)`，此操作會重置 `effect` 內部的依賴追蹤指針。

- 接著，立即呼叫 `endTrack(this)`，此操作會清除從指針當前位置到依賴列表末尾的所有依賴項。

- 將兩者連續呼叫，就可以清除該 `effect` 的全部依賴。最後，通過將 `active` 標記設為 `false`，可以阻止 `effect` 後續被意外重新執行。

`effect.ts`

```typescript
export class ReactiveEffect implements Sub {

  active = true // 是否啟動監聽

...
...

  }

  run() {

    if(!this.active) {
      return this.fn()
    }

   ...
   ...
  }

...
...

  stop() {
    // 停止監聽
    if(this.active) {
      startTrack(this)
      endTrack(this)
      this.active = false
    }
  }

}
```

接著寫一個 `stop` 做返回函式。

`watch.ts`

```typescript
export function watch(source, cb, options) {
...
...

  function stop() {
    effect.stop()
  }

  return () => {
    stop()
  }
}
```

這樣子就會輸出一次。

總結來說，我們透過直接利用 `ReactiveEffect` 類別及其調度器（Scheduler）功能，完成了基礎的 `watch` 實作。

關鍵在於透過 `job` 函式攔截更新通知，並在其中執行 `effect.run()` 以取得新舊值，最終呼叫使用者 callback。

同時，我們也為其增加了 `stop` 方法，實現了手動停止監聽的功能。

下一篇我們會探討 `watch` 的 `option` 參數的實作。

---

<a id="day-24"></a>

## Day 24 - Watch：Options

> 日期: 2025-10-03

Watch Options 我們常用的選項：

- `immediate`：初始化馬上執行一次

- `deep`：深層監聽

- `once`：只執行一次，就停止監聽

我們先寫接受三個參數，預設值是空的物件。

```typescript
export function watch(source, cb, options) {

  const { immediate, once, deep } = options || {}
...
...
}
```

##### immediate

當 `immediate` 選項為 `true` 時，`watch` 會在初始化階段立即執行一次 `job` 函式，此時的 callback 函式中 `oldValue` 為 `undefined`。如果 `immediate` 為 `false`（或未提供），則 `watch` 在初始化時僅只會執行 `effect.run()` 來收集依賴並取得初始的 `oldValue`，但不會觸發 callback。

```typescript
export function watch(source, cb, options) {

  const { immediate, once, deep } = options || {}

 ...
 ...

  if(immediate) {
    // 第一次立即執行一次
    job()
  }else{
    // 因為不是第一次執行，才會得到舊的資料，收集依賴
    oldValue = effect.run() // 收集依賴後，得到 run 返回值，取得舊的數值
  }
...
...
}
```

##### Once

為了實現 `once` 功能，我們需要對使用者傳入的 callback 函式進行包裝。我們將原本的 callback 函式暫存起來，然後用一個新的匿名函式覆寫 `cb`。

在這個新的函式中，我們先呼叫原始的 callback 函式，之後立即執行 `stop()` 函式，從而達到『執行一次後即停止』的效果。

```typescript
export function watch(source, cb, options) {

  const { immediate, once, deep } = options || {}

  if(once) {
    const _cb = cb
    cb = (...args) => {
      _cb(...args)
      stop()
    }
  }
...
...
}
```

##### Deep

深層監聽（`deep: true`）的原理是：在依賴收集階段，遍歷地訪問被監聽對象的所有巢狀屬性。這個過程會觸發每一個屬性的 `getter`，從而將它們全部作為 `watch` 內部 `effect` 的依賴項進行收集。一旦任何深層屬性發生變化，`watch` 都能收到通知。

```typescript
import { isObject } from '@vue/shared'

export function watch(source, cb, options) {

  const { immediate, once, deep } = options || {}

 ...
 ...
  if(deep){
    const baseGetter = getter
    getter = () => traverse(baseGetter())
  }
...
}

function traverse(value) {
  // 檢查類型
  if(!isObject(value)) {
    return
  }
  for(const key in value) {
    traverse(value[key])
  }
  return value
}
```

這樣可以解決，但在使用上面有可能會遇到循環引用的問題，因此需要調整一下：

```typescript
function traverse(value, seen = new Set()) {
  if (!isObject(value)) {
    return value
  }
  // 如果之前訪問過，就回傳原本的值，預防循環引用
  if (seen.has(value)) {
    return value
  }

  seen.add(value)

  for (const key in value) {
    traverse(value[key], seen)
  }
  return value
}
```

我們用 `Set` 結構來記錄在單次遍歷中所有已訪問過的物件。在遍歷到一個新物件前，先檢查它是不是存在 `Set` 中。

如果存在，說明遇到了循環引用，要立即停止目前的遞迴，從而避免堆疊溢出。

Deep 在3.5版本有一個新的功能，遇到巢狀物件監聽，可以指定監聽層級，像是下方範例：

```typescript
<body>
  <div id="app"></div>
  <script type="module">
    // import { ref, watch, effect } from '../../../node_modules/vue/dist/vue.esm-browser.js'
    import { ref, watch } from '../dist/reactivity.esm.js'

    const state = ref({
      a: {
        b: 1,
        c: {
          d: 1
        }
      }
    })

    watch(state, (newVal, oldVal) => {
      console.log('newVal, oldVal', newVal, oldVal)
    }, { deep: 2 })

    setTimeout(() => {
      state.value.a.c.d = 2
      console.log('更新了')
    }, 1000)

  </script>
</body>
```

當 `deep` 的值是數字時，它代表了監聽的遞迴層級。例如 `deep: 2` 指的是監聽應深入到目標物件的第二層屬性。在上述範例中，修改 `state.value.a.b`（第二層）應該觸發監聽，而修改 `state.value.a.c.d`（第四層）則不應該觸發。

如果你切換到官方程式碼，控制台不會輸出任何結果。

```typescript
if (deep) {
  const baseGetter = getter
  const depth = deep === true ? Infinity : deep
  getter = () => traverse(baseGetter(), depth)
}

function traverse(value, depth = Infinity, seen = new Set()) {
  // 如果不是物件，或是監聽層級到了，就回傳原本的值
  if (!isObject(value) || depth <= 0) {
    return value
  }
  // 如果之前訪問過，就回傳原本的值，預防循環引用
  if (seen.has(value)) {
    return value
  }

  depth--

  seen.add(value)

  for (const key in value) {
    traverse(value[key], depth, seen)
  }
  return value
}
```

透過在遞迴函式 `traverse` 中傳遞並遞減 `depth` 計數，我們就能精確控制依賴收集的深度。

##### reactive 與 function 處理

我們把剛剛的程式碼改成 reactive 之後，發現控制台報錯

確認一下官方的解決方案：

```typescript
<body>
  <div id="app"></div>
  <script type="module">
    import { reactive, watch, effect } from '../../../node_modules/vue/dist/vue.esm-browser.js'
    // import { reactive, watch } from '../dist/reactivity.esm.js'

    const state = reactive({
      a: {
        b: 1,
        c: {
          d: 1
        }
      }
    })

    watch(state, (newVal, oldVal) => {
      console.log('newVal, oldVal', newVal, oldVal)
    },
    // { deep: 2 }
  )

    setTimeout(() => {
      state.a.c.d = 2
      console.log('更新了')
    }, 1000)

  </script>
</body>
```

查看控制台你會發現，當 `watch` 的監聽來源是 `reactive` 物件時，`deep` 選項會預設為 `true`。

因此，我們需要調整 `getter` 的初始化邏輯來應對此情況：

- 首先，當來源是 `reactive` 物件時，`getter` 應直接返回該物件

- 其次，若用戶未提供 `deep` 選項，則應將 `deep` 的值預設為 `true`。

所以我們接下來要做：

如果 reactive 傳入，預設 `deep:true`，如果有傳入層級，以傳入層級為主。

```typescript
if (isRef(source)) {
  // source 有可能是 ref 物件，進行函式的包裝
  getter = () => source.value
} else if (isReactive(source)) {
  // 如果 source 是 reactive，直接賦值給 getter
  getter = () => source
  if (!deep) deep = true
  // 如果 source 是函式，直接賦值給 getter
} else if (isFunction(source)) {
  getter = source
}
```

這樣就不會報錯，而且 `reactive` 也預設監聽。

我們目前已經完成 `watch` 的 `options`實作，除了擴充了 `immediate`、`once`、`deep`等常用方法，我們還透過遞迴遍歷與 `Set` 解決了深度監聽中的循環引用問題，並解決了對 `ref`、`reactive` 及 `getter` 函式等多種來源的處理。

---

<a id="day-25"></a>

## Day 25 - Watch ：清理 SideEffect

> 日期: 2025-10-04

`watch` 的一個核心用途是在響應式資料發生改變時，執行 Side Effect。

然而，當 Side Effect 是非同步或需要手動清理時，就會出現一個常見的問題：如果監聽的資料在短時間內多次變更，前一次的 Side Effect可能沒清理乾淨，就會與下一次的 Side Effect 產生衝突或造成資源洩漏。

```typescript
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8" />
  <title>Document</title>
  <style>
    #app,#div{
      width: 100px;
      height: 100px;
      background-color: red;
      margin-bottom: 10px;
    }
    #div{
      background-color: blue;
    }
  </style>
</head>

<body>
  <div id="app"></div>
  <div id="div"></div>
  <button id="button">按鈕</button>
  <script type="module">
    // import { ref, watch, effect } from '../../../node_modules/vue/dist/vue.esm-browser.js'
    import { ref, watch } from '../dist/reactivity.esm.js'

    const flag = ref(true)

      watch(flag, (newVal, oldVal) => {
        const dom = newVal ? app : div

        function handler () {
          console.log(newVal ? '點擊app' : '點擊div')
        }

        dom.addEventListener('click', handler)
    },
    { immediate: true }
  )

  button.onclick = () => {
    flag.value = !flag.value
  }

  </script>
</body>

</html>
```

上述範例是一個常見的資源洩漏問題：現在可以看到有兩個色塊，點了`app` 會被觸發，點擊 `div` 沒有反應，點擊按鈕，當 `flag` 從 `true` 變為 `false` 時，此時`div` 點擊後會被觸發，但你點擊 `app` 控制台仍然有輸出，這是因為`app` 元素上註冊的 `click` 事件監聽器並沒有被移除。

因此，即使邏輯上它不應該再響應點擊，但 click 監聽器依然殘留在記憶體中並繼續觸發。

官方的解決方案是，有一個`onCleanup`函式：

```typescript
<body>
  <div id="app"></div>
  <div id="div"></div>
  <button id="button">按鈕</button>
  <script type="module">
    import { ref, watch, effect } from '../../../node_modules/vue/dist/vue.esm-browser.js'
    // import { ref, watch } from '../dist/reactivity.esm.js'

    const flag = ref(true)

      watch(flag, (newVal, oldVal, onCleanup) => {
        const dom = newVal ? app : div

        function handler () {
          console.log(newVal ? '點擊app' : '點擊div')
        }

        dom.addEventListener('click', handler)

      onCleanup(() => {
        dom.removeEventListener('click', handler)
      })
    },
    { immediate: true }
  )

  button.onclick = () => {
    flag.value = !flag.value
  }

  </script>
</body>
```

我們現在在監聽的時候綁一個監聽事件，`onCleanup` 接受一個 callback 函式，我們在函式中寫移除事件。

`onCleanup` 註冊的 callback 函式會在下一次 `watch` callback 即將執行**之前被呼叫，**這個時機確保了我們在新的副作用出現前，清理掉上一個過期的 Side Effect。

你會發現回去點 `app`，它不會再被觸發了。

```typescript
export function watch(source, cb, options) {
...
...
  let cleanup = null

  function onCleanup(cb) {
    cleanup = cb
  }

  function job() {

    if(cleanup) {
      // 確認是不是要清理之前的 sideEffect 函式
      cleanup()
      cleanup = null
    }

    // 執行 effect 的函式，得到新的數值，不能直接執行 getter，因為要收集依賴
    const newValue = effect.run()

    cb(newValue, oldValue, onCleanup)

    oldValue = newValue
  }
...
...
}
```

我們儲存外部傳入 `onCleanup` 的 callback 函式，把它儲存到變數之中，接著判斷，如果 `onCleanup` 傳入函式存在，在每次執行 `job` 函式之前，先執行一次清理函式。

`onCleanup` 是 `watch` API 中一個很重要但容易被忽略的特性。它為開發者提供了一個標準化的機制，來應對 Side Effect 帶來的挑戰：資源洩漏（如未移除的事件監聽器）與非同步競爭條��（如過期的網路請求）。

---

<a id="day-26"></a>

## Day 26 - 陣列長度變更處理

> 日期: 2025-10-05

在我們建構響應式系統的過程中，雖然對於原生 JavaScript 物件的處理已經算蠻完善，但陣列 (Array) 與普通物件的屬性不同，陣列的 `length` 屬性與其數值索引之間有緊密的聯動關係。

#### 手動變更陣列長度

最直接改變陣列長度的方式就是手動賦值 。雖然這在日常開發中不被鼓勵，但一個健全的響應式系統必須能正確處理這種情況 。

```typescript
<body>
  <div id="app"></div>
  <script type="module">
    // import { ref, watch, effect } from '../../../node_modules/vue/dist/vue.esm-browser.js'
    import { reactive, effect } from '../dist/reactivity.esm.js'

    const state = reactive(['a', 'b', 'c','d'])

    effect(() => {
      console.log(state.length)
    })

    setTimeout(() => {
      state.length = 2
    }, 1000)
  </script>
</body>
```

在上述範例中，我們直接修改了陣列長度，它會觸發更新（通常我們會避免直接更改陣列長度的做法）。

像這樣直接更改陣列長度，多餘長度的數值會被刪除，如下圖：

```typescript
<body>
  <div id="app"></div>
  <script type="module">
    // import { ref, watch, effect } from '../../../node_modules/vue/dist/vue.esm-browser.js'
    import { reactive, effect } from '../dist/reactivity.esm.js'

    const state = reactive(['a', 'b', 'c','d'])

    effect(() => {
      console.log(state[3])
    })

    setTimeout(() => {
      state.length = 2
    }, 1000)
  </script>
</body>
```

執行這段程式碼，控制台會先輸出 `d`，這符合預期。然而，一秒後當`state.length` 被修改為 2 時，`console.log` 並沒有再次執行 。

然而，問題出在哪裡？

我們的 `effect` 依賴的是 `state[3]`。當 `state.length` 被修改為 2 時，索引為 3 的元素實際上已經被刪除了。

因此，這個 `effect` 所依賴的 `key ('3')` 後續不會再發生任何 `set` 行為，導致它再也沒有機會被重新觸發。依賴關係因此遺失。

在進行「刪除」操作，僅觸發了 `state` 物件 `length` 屬性的 `set`，並未觸發索引 `'3'` 的 `set`。

所以我們需要做的是，當 `length` 被短時，我們要找出所有依賴「被刪除索引」的 `effect`，並通知它們重新執行 ：

```typescript
export function trigger(target, key) {
  const depsMap = targetMap.get(target)
  // 如果 depsMap 不存在，表示沒有收集過依賴，直接返回
  if (!depsMap) return

  const targetIsArray = Array.isArray(target)

  if (targetIsArray && key === 'length') {
    depsMap.forEach((dep, depKey) => {
      if (depKey >= length || depKey === 'length') {
        // 通知訪問大於等於 length 的 effect 以及 訪問了 length 的 effect 重新執行
        propagate(dep.subs)
      }
    })
  } else {
    // 如果不是陣列，並且更新的不是length，則直接取得依賴
    const dep = depsMap.get(key)
    // 如果依賴不存在，表示這個 key 沒有在effect中被使用過，直接返回
    if (!dep) return

    // 找到依賴，觸發更新
    propagate(dep.subs)
  }
}
```

`state.length = 2` 時，`effect` 會被重新觸發，現在看我們的範例程式碼，會發現觸發更新結果是 `undefined`，因為`state[3]`不存在。

#### 陣列方法導致長度變更

會影響陣列長度除了直接賦值之外，像是我們常用的陣列方法：`pop`、`push`、`shift` 等等，都會隱性地影響到陣列長度：

```typescript
<body>
  <div id="app"></div>
  <script type="module">
    // import { ref, watch, effect } from '../../../node_modules/vue/dist/vue.esm-browser.js'
    import { reactive, effect } from '../dist/reactivity.esm.js'

    const state = reactive(['a', 'b', 'c','d'])

    effect(() => {
      console.log(state.length)
    })

    setTimeout(() => {
      state.push('e')
    }, 1000)
  </script>
</body>
```

這邊可以看到我增加了一個索引，但是依賴 `length` 的 `effect` 並沒有觸發更新：

那麼，當 `push` 這類方法被呼叫時，我們如何偵測到 `length` 的隱性變更呢？

關鍵在於攔截 `set` 操作。`push('e')` 的底層操作，除了在索引 `4` 上設置新值，也會修改 `length` 屬性。

我們可以在 `set` 代理中，比較操作前後的陣列長度，如果不一致，就主動觸發 `length` 屬性的依賴更新：

```typescript
export const mutableHandlers = {
  ...
  ...
  set(target, key, newValue, receiver) {
    const oldValue = target[key]
    const targetIsArray = Array.isArray(target)
    // 如果 target 是陣列，取得其舊長度
    const oldLength = targetIsArray ? target.length : 0
    const res = Reflect.set(target, key, newValue, receiver)
    if(isRef(oldValue) && !isRef(newValue)){
      oldValue.value = newValue

      // 改了 ref 的值，會通知 sub 更新
      // 所以要 return 不然下方 trigger 又會觸發 trigger 更新 會觸發兩次
      return res
    }
    if(hasChanged(newValue, oldValue)){
      // 如果舊值不等於新值，則觸發更新
      // 觸發更新：通知之前收集的依賴，重新執行effect
      trigger(target, key)
    }

    // 如果 target 是陣列，取得其新長度
    const newLength = targetIsArray ? newValue.length : 0

    // 如果 target 是陣列，並且新長度不等於舊長度，並且 key 不是 length，則觸發更新
    if(targetIsArray && newLength !== oldLength && key !== 'length'){
      trigger(target, 'length')
    }
    return res
  }
}
```

在觸發更新前，我們取得新值跟舊值：

- 當依賴是陣列類型

- 更新前的陣列長度跟更新後陣列長度不同

- 並且 key 不是 length，就觸發更新：避免重複觸發，因為我們剛剛在 trigger 函式已經寫了觸發更新。

今天我們聚焦於陣列 `length` 屬性的特殊性。透過分別在 `trigger` 函式和 `set` 代理中增加特殊的處理邏輯：

- 在 `trigger` 中：處理了手動縮短 `length` 時，對已刪除索引的依賴觸發。

- 在 `set` 中：處理了陣列方法隱性改變 `length` 時，對 `length` 屬性的依賴觸發。

---

<a id="day-27"></a>

## Day 27 - toRef、toRefs、ProxyRef、unref

> 日期: 2025-10-06

響應式系統之中`reactive` 能夠將一個物件轉換為深層的響應式物件，但是在開發過程中我們時常會需要用到解構賦值，這時候會導致響應性遺失。

#### 問題解析

```typescript
<body>
  <div id="app"></div>
  <script type="module">
    import { reactive, toRef, effect } from '../../../node_modules/vue/dist/vue.esm-browser.js'
    // import { reactive, effect, ref } from '../dist/reactivity.esm.js'

    const state = reactive({
      name: 'a',
      age: 18
    })

    const { name } = state

    effect(() => {
      console.log(name)
    })

    setTimeout(() => {
      state.name = 'b'
    }, 1000)
  </script>
</body>
```

執行這段程式碼，你會發現解構出來的屬性會遺失響應式，所以 `setTimeout` 不會觸發更新。

為了解決上述問題，我們通常會用 `toRef` ，讓解構出來的變數可以觸發響應式更新：

```typescript
<body>
  <div id="app"></div>
  <script type="module">
    import { reactive, toRef, effect } from '../../../node_modules/vue/dist/vue.esm-browser.js'
    // import { reactive, effect, ref } from '../dist/reactivity.esm.js'

    const state = reactive({
      name: 'a',
      age: 18
    })

    const name = toRef(state, 'name')

    effect(() => {
      console.log(name.value)
    })

    setTimeout(() => {
      state.name = 'b'
    }, 1000)
  </script>
</body>
```

#### 核心原理

如果這時候去看這個 `name` 輸出的類型

你會發現他跟我們在使用的 `RefImpl` 類型不同，它是一個特製的 `ObjectRefImpl`類別，並多了兩個屬性`_object`、`_key`，它們分別儲存了原始物件、屬性名稱。

這個`toRef`我們可以知道他接受一個物件以及 key，所以我們可以這樣寫：

```typescript
export function toRef(target, key) {
  return {
    get value() {
      return target[key]
    },
    set value(newValue) {
      target[key] = newValue
    },
  }
}
```

這樣子其實就可以更新，但官方範例是屬於個類別，所以我們也改寫成類別：

```typescript
class ObjectRefImpl {
  [ReactiveFlags.IS_REF] = true
  constructor(
    public _object,
    public key
  ) {}

  get value() {
    return this._object[this.key]
  }

  set value(newValue) {
    this._object[this.key] = newValue
  }
}

export function toRef(target, key) {
  return new ObjectRefImpl(target, key)
}
```

這樣可以將我們解構出來的變數，重新賦予響應性。

#### toRefs

當需要處理多個屬性時，可以使用 `toRefs`，它會遍歷一個`reactive` 物件，並將其所有屬性都轉換為 `ref`，使用如下：

```typescript
<body>
  <div id="app"></div>
  <script type="module">
    import { reactive, toRefs, effect } from '../../../node_modules/vue/dist/vue.esm-browser.js'
    // import { reactive, effect, toRef } from '../dist/reactivity.esm.js'

    const state = reactive({
      name: 'a',
      age: 18
    })
    const {name, age} = toRefs(state)

    effect(() => {
      console.log(age.value)
    })

    setTimeout(() => {
      state.age++
    }, 1000)
  </script>
</body>
```

輸出`age`之後，可以看到它也是`ObjectRefImpl`類別。

那我們可以知道`toRefs` 的實現非常直觀，它遍歷目標物件的所有 `key`，並為每一個 `key` 呼叫 `toRef` ：

```typescript
export function toRefs(target) {
  const res = {}
  for (const key in target) {
    res[key] = new ObjectRefImpl(target, key)
  }
  return res
}
```

ps.`toRefs`原始碼中有另外寫判斷邏輯，確認傳入是不是響應式物件，這邊我們就省略判斷，讓它可以觸發更新：

雖然 `toRefs` 解決了響應性遺失的問題，但到處都是 `.value`，所以我們這邊需要兩個輔助工具。

#### unref

`unref` 是一個簡單的輔助函式，如果參數是 `ref`，它返回 `.value`；如果不是，則直接返回參數本身 。

```typescript
export function unref(value) {
  return isRef(value) ? value.value : value
}
```

#### ProxyRef

`proxyRefs` 可以將一個包含 `ref` 的物件（例如 `toRefs` 的回傳值）轉換為一個特殊的代理。當存取這個代理的屬性時，它會解包成`ref`。它跟 `reactive` 很像，不直接用 `reactive` 是因為 reactive 是深層物件，而 `proxyRef` 是淺層的物件。

```typescript
export function proxyRefs(target) {
  return new Proxy(target, {
    get(...args) {
      const res = Reflect.get(...args)
      return unref(res)
    },
    set(target, key, newValue, receiver) {
      return Reflect.set(target, key, newValue, receiver)
    },
  })
}
```

這樣就完成了`proxyRefs`。

今天我們重點在於：

- 直接從 `reactive` 物件中解構，會失去響應性，所以可以使用 `toRefs` 將整個物件的所有屬性轉換成 ref，再進行解構。

- 使用 `toRefs` 將整個物件的所有屬性轉換成 ref，再進行解構。這樣每個被解構出來的變數都與原始物件進行了響應式連結。

- 選擇性地使用 `proxyRefs` 來建立一個自動解包的代理物件。

---

<a id="day-28"></a>

## Day 28 - shallowRef、shallowReactive

> 日期: 2025-10-07

`ref` 與 `reactive` 都屬於深層響應的 API 。它們會遞迴地將內部所有巢狀物件都轉換為響應式代理 。多數情況下非常方便，但當處理大型資料結構時，這種深度監聽的效能開銷可能會造成瓶頸。這時候我們就會使用到 `shallowRef` 或 `shallowReactive`：

#### ShallowRef

`shallowRef` 會建立一個 ref，但只對 `.value` 屬性本身的賦值操作具有響應性，它並不會將 `.value` 的內容轉換為響應式物件。

```typescript
<body>
  <div id="app"></div>
  <script type="module">
    import {  shallowReactive, shallowRef, effect } from '../../../node_modules/vue/dist/vue.esm-browser.js'
    // import { reactive, effect, toRefs } from '../dist/reactivity.esm.js'

    const c = shallowRef({
        count: 1
    });

    effect(() => {
      console.log(c.value.count)
    })

    setTimeout(() => {
      c.value.count++
    }, 1000)
  </script>
</body>
```

查看上述程式碼，你會觀察到`effect`只輸出一次，然而一秒鐘後`setTimeout`，並沒有輸出第二次。

如果希望輸出第二次的話，必須要把`c.value.count++`更改為`c.value = { count: 2 }`。

依照慣例我們可以看到，`console.log(c)`的結果，他是屬於一個 `RefImpl` 類別的物件，但差異性是`__v_isShallow`是`true`，由此我們可以知道它們是一樣的東西，但是透過這個標記來告訴類別說，我們現在這個物件是不是屬於淺層響應式物件。

```typescript
// 如果 value 是物件，則使用 reactive 轉換為響應式物件
const convert = (value) => (isObject(value) ? reactive(value) : value)

class RefImpl implements Dependency {
  _value;
  [ReactiveFlags.IS_REF] = true
  private _isShallow: boolean

  subs: Link
  subsTail: Link
  constructor(value, isShallow) {
    // 如果 isShallow 是 true，代表屬於淺層物件，直接回傳
    this._value = isShallow ? value : convert(value)
  }

  get value() {
    if (activeSub) {
      trackRef(this)
    }
    return this._value
  }

  set value(newValue) {
    // 如果新值和舊值發生過變化，則更新
    if (hasChanged(newValue, this._value)) {
      // 如果 isShallow 是 true，代表屬於淺層物件，直接回傳
      this._value = this._isShallow ? newValue : convert(newValue)
      triggerRef(this)
    }
  }
}
```

所以我們的實現思路是這樣：

- 幫`RefImpl` 類別增加一個 `private` 的 `_isShallow` 屬性

- 將「檢查值是否為物件，若是則用`reactive` 轉換」的邏輯封裝成 `convert` 函式 。

- 在`constructor` 和 `setter` 中，根據 `_isShallow` 標記來決定是直接賦值，還是要經過 `convert` 函式處理 。

#### ShallowReactive

`shallowReactive` 只對物件的第一層屬性進行代理，任何對巢狀物件的修改都不會觸發響應 。

```typescript
<body>
  <div id="app"></div>
  <script type="module">
    import {  shallowReactive, shallowRef, effect } from '../../../node_modules/vue/dist/vue.esm-browser.js'
    // import { reactive, effect, toRefs } from '../dist/reactivity.esm.js'

    const state = shallowReactive({
      a:1,
      b:{
        c:1
      }
    })

    effect(() => {
      console.log(state.b.c)
    })

    setTimeout(() => {
      state.b.c++
    }, 1000)
  </script>
</body>
```

`shallowReactive` 也是一樣的效果，`state.b.c++`沒有反應，需要變更為`state.b = { c: 2 } }`，`effect`才會觸發輸出。

`reactive` 是通過`mutableHandlers`來處理，因此我們需要先重構這個`mutableHandlers`：

```typescript
const set = (target, key, newValue, receiver) => {
 ...
 ...
}

const get = (target, key, receiver) => {
    // 收集依賴：綁定target的屬性與effect的關係
    track(target, key)
    const res = Reflect.get(target, key,receiver)
    // 如果 res 是一個 ref，則返回 res.value
    if(isRef(res)){
      // target = {a:ref(0)}
      return res.value
    }

    if(isObject(res)){
      /**
       * 如果 res 是物件，則將其轉換為響應式物件
       */
      return reactive(res)
    }
    return res
}

export const mutableHandlers = {
  get,
  set
}
```

先將 `getter` 跟 `setter` 抽出來，再來調整 `getter`。

```typescript
function createGetter(isShallow = false) {
  return function get(target, key, receiver) {
    track(target, key)
    const res = Reflect.get(target, key, receiver)
    if (isRef(res)) {
      return res.value
    }

    if (isObject(res)) {
      // 關鍵：如果是 shallow，直接回傳原始物件，不再遞迴呼叫 reactive
      return isShallow ? res : reactive(res)
    }
    return res
  }
}

const get = createGetter()
```

我們將`get` 的邏輯抽離成一個工廠函式 `createGetter`，並用 `isShallow` 參數來控制是否要遞迴地將巢狀物件轉換為 `reactive` 。

```typescript
const shallowGet = createGetter(true)

export const shallowReactiveHandlers = {
  get: shallowGet,
  set,
}
```

建立不同 handler 並導出，之後我們在`reactive.ts` 引入

```typescript
import {mutableHandlers, shallowReactiveHandlers} from './baseHandlers'

function createReactiveObject(target, handlers, proxyMap) {
  if (!isObject(target)) return target

  // 如果這個 target 儲存在 reactiveSet 中
  // 表示 target 是一個響應式物件，直接返回已經建立好的 proxy
  if (reactiveSet.has(target)) {
    return proxyMap.get(target)
  }

  // 如果這個 target 已經被 reactive 過了，直接返回已經建立好的 proxy
  const existingProxy = proxyMap.get(target)
  if (existingProxy) {
    return existingProxy
  }

  // 根據傳入參數 handler，建立 target 的代理物件
  const proxy = new Proxy(target, handlers)

  // 儲存 target 和響應式物件的關聯關係
  proxyMap.set(target, proxy)

  reactiveSet.add(proxy)

  return proxy
}
```

調整`createReactiveObject`函式，讓它可以根據 `handler` 以及 `proxyMap` 來決定是不是要建立深層響應式物件。

```typescript
// 新增 shallowReactive 的快取
const shallowReactiveMap = new WeakMap()

export function reactive(target) {
  return createReactiveObject(target, mutableHandlers, reactiveMap)
}

// 新增 shallowReactive 函式
export function shallowReactive(target) {
  return createReactiveObject(target, shallowReactiveHandlers, shallowReactiveMap)
}
```

這樣我們就完成了 `shallowReactive`，現在`shallowReactive`以及`shallowRef`都已經完成。

「深層響應」為帶來了開發上的便利，而「淺層響應」則讓我們有更近一步優化效能的機會。在一般開發過程中，我們應該優先使用 `ref` 和 `reactive`，當遇到明確的效能瓶頸時，可以觀察我們自己在使用資料的情況，適度替換成`shallow` 版本。

---

<a id="day-29"></a>

## Day 29 - readonly： 資料唯讀保護實作

> 日期: 2025-10-08

在開始 readonly 之前，我們先講一下 Proxy 的補充知識：

#### Proxy

`Proxy` 是實現 `reactive`、`readonly` 等功能的核心。它會在目標物件前架設一個「代理」或「攔截層」，讓我們有機會對外界的存取操作進行自訂處理。

##### 攔截與代理

`Proxy` 的工作模式可以想像成一個保全：

- 目標物件 (`target`)：是公司內部的辦公室。

- 代理物件 (`proxy`)：保全本人。

- 處理器 (`handler`)：是保全應對手冊，裡面寫了存取物件時的該如何處理的邏輯。

任何外部程式碼（訪客）要存取物件屬性（進辦公室）都需要經過 `Proxy`（保全），`Proxy` 可以知道 `handler`（保全手冊）來決定如何回應。

在`handler` 中，最關鍵的陷阱 (trap) 之一就是 `get`。`get(target, key, receiver)`：這個陷阱的觸發時機是當程式碼試圖讀取代理物件屬性時，縱使原始物件沒有這個屬性，它也可以透過 handler 的規則下去處理。

了解這些之後，可以開始實作了！

readonly 只接受物件參數，在前面的文章有寫到 ref 如果傳入是物件的話，那就會回傳一個 reactive，因此在 readonly 實作，我們只要針對 reactive 完成就可以。

```typescript
<body>
  <div id="app"></div>
  <script type="module">
    import {  readonly, reactive, effect } from '../../../node_modules/vue/dist/vue.esm-browser.js'
    // import { readonly, effect, reactive } from '../dist/reactivity.esm.js'

    const state = reactive({
      a:1,
      b:{
        c:1
      }
    })

    const readonlyState = readonly(state)

    effect(() => {
      console.log(readonlyState.a)
    })

    setTimeout(() => {
      state.a++
    }, 1000)
  </script>
</body>
```

如果你設定一個`readonly`物件，修改傳入的物件，readonly 仍然會接受到響應式的觸發更新。

```typescript
setTimeout(() => {
  readonlyState.a++
}, 1000)
```

但如果你修改的是 readonly 物件，那就會跳出警告。

查看這個 readonly 物件，可以發現它就是 reactive 物件，是由 `_isReadonly` 旗標來判斷，這跟我們上一個章節在寫 `shallow` 的時候特別像。

首先，我們先在 `ref.ts` 增加附註的旗標，分別是 `IS_REACTIVE` 以及 `IS_READONLY`：

```typescript
export enum ReactiveFlags {
  IS_REF = '__v_isRef',
  IS_REACTIVE = '__v_isReactive',
  IS_READONLY = '__v_isReadonly',
}
```

接著調整一下 reactive，我們移除原有的 `Set` 檢查，改為透過旗標來判斷是否需要重複代理。

```typescript
import { ReactiveFlags } from './ref'
...
...
function createReactiveObject(target, handlers, proxyMap) {
  // reactive 只處理物件
  if (!isObject(target)) return target

  // 統一處理「防止重複代理」的情況，這個檢查取代了 reactiveSet
  if (target[ReactiveFlags.IS_REACTIVE]) {
    return target
  }

  // 如果這個 target 已經被 reactive 過了，直接返回已經建立好的 proxy
  const existingProxy = proxyMap.get(target)
  if (existingProxy) {
    return existingProxy
  }

  // 建立 target 的代理物件
  const proxy = new Proxy(target, handlers)

  // 儲存使用 reactive 建立的響應式物件
  proxyMap.set(target, proxy)

  return proxy
}
...
...
// 調整 reactive 判斷
export function isReactive(target) {
  return !!(target && target[ReactiveFlags.IS_REACTIVE])
}

// 先新增一個空物件，等一下再來補充
export function readonly(target) {
  return {}
}

// 新增 readonly 判斷
export function isReadonly(value) {
  return !!(value && value[ReactiveFlags.IS_READONLY])
}
```

接著回到`baseHandlers.ts`，新增一個 `readonlyHandler`。

```typescript
// 導入旗標
import { isRef, ReactiveFlags } from './ref'
// 引入 readonly 函式，
import { reactive, readonly } from './reactive'

// 擴充 createGetter，它接受一個 isReadonly 參數，並且檢查
function createGetter(isShallow = false, isReadonly = false) {
  return function get(target, key, receiver) {
    //讓 isReactive 以及 isReadonly 可以進行判斷
    if (key === ReactiveFlags.IS_REACTIVE) {
      return !isReadonly
    } else if (key === ReactiveFlags.IS_READONLY) {
      return isReadonly
    }

    track(target, key)
    const res = Reflect.get(target, key, receiver)
    if (isRef(res)) {
      return res.value
    }

    if (isObject(res)) {
      // 如果屬於唯讀，那返回一個
      return isReadonly ? readonly(res) : isShallow ? res : reactive(res)
    }
    return res
  }
}

...
...
// 建立唯讀的 getter
const readonlyGet = createGetter(false, true)
// 建立唯讀的 handler，並且阻止 setter 修改跟刪除
export const readonlyHandlers = {
  get: readonlyGet,
  set(target, key) {
    console.warn(`Set operation on key "${String(key)}" failed: target is readonly.`)
    return true // 阻止修改
  },
  deleteProperty(target, key) {
    console.warn(`Delete operation on key "${String(key)}" failed: target is readonly.`)
    return true // 阻止刪除
  }
}
```

`createGetter` 的旗標邏輯是：縱使旗標是原始物件上一個不存在的屬性，但當外部程式碼（如 `isReadonly`）訪問它時，代理物件的 `getter` 會被觸發。 JavaScript 引擎會發現它是一個代理物件，因此 `getter` 會根據傳入的 `isReadonly` 參數回傳對應的布林值。

我們回到 `reactive.ts`，完成 `readonly` 的實作：

```typescript
import { mutableHandlers, shallowReactiveHandlers, readonlyHandlers } from './baseHandlers'

// 建立一個 readonly 快取map
const readonlyMap = new WeakMap()
...
...
function createReactiveObject(target, handlers, proxyMap) {
  // reactive 只處理物件
  if (!isObject(target)) return target

  // 如果遇到重複代理，或是唯讀物件，無需處理，並且返回本身物件
  if (target[ReactiveFlags.IS_REACTIVE] || target[ReactiveFlags.IS_READONLY]) {
    return target
  }

  // 如果這個 target 已經被 reactive 過了，直接返回已經建立好的 proxy
  const existingProxy = proxyMap.get(target)
  if (existingProxy) {
    return existingProxy
  }

  // 建立 target 的代理物件
  const proxy = new Proxy(target, handlers)

  // 儲存使用 reactive 建立的響應式物件
  proxyMap.set(target, proxy)

  return proxy
}
...
...
export function readonly(target) {
  return createReactiveObject(target, readonlyHandlers, readonlyMap)
}
```

這樣我們就完成了 `readonly`的實作。

#### 循環引用

有些人可能會發現我們遇到循環引用的狀態

```typescript
ref.ts -> reactive.ts -> baseHandlers.ts -> ref.ts
```

這個問題在 CommonJS 是需要特別注意跟避免，但在現代的 ESM 中可以正常運作。

##### 什麼是循環引用？

在過往 CommonJS 中，`require()` 是同步執行的，當模組 A 依賴模組 B，而模組 B 同時也依賴模組 A 時，這會導致其中一個模組在被引入時沒有初始化完全，引發執行時的錯誤。

##### 即時綁定

ESM 的 `import`/`export` 機制與 CommonJS 完全不同。它導出的不是一個值的拷貝，而是一個即時綁定，可以把它想像成一個指向原始變數記憶體位置的指標。

ESM 透過一個巧妙的兩階段過程來處理模組，從而解決了循環引用的問題：

- 第一階段：解析與綁定

JavaScript 引擎首先會掃描所有相關的模組檔案，解析 `import` 和 `export` 語句，建立一個完整的「依賴圖」。

- 在這個階段，引擎會為所有 `export` 的變數、函式、類別在記憶體中建立綁定並分配空間，但不會執行任何程式碼。

**第二階段：執行與賦值**

- 在所有綁定都建立好之後，引擎才開始執行每個模組的主體程式碼，將實際的函式或值放到之前預留的記憶體位置中。

- 以我們這次來說：當 `baseHandlers.ts` 需要 `import { readonly } from './reactive'` 時，它得到的是 `readonly` 這個函式的「即時綁定」。

- `baseHandlers.ts` 模組（像是 `createGetter` 函式的定義）可以順利執行完畢。

- 之後，`reactive.ts` 模組也會執行，將 `readonly` 函式的定義填充到它的綁定中。

##### 關鍵是執行時機

最關鍵的一點是：

`baseHandlers.ts` 裡的 `createGetter` 的`get` 只是定義了`readonly`，它並沒有被立即呼叫。

它要等到未來某個代理物件的屬性被存取時，才會被真正執行，而到那個時候，所有模組早就完成了第二階段的執行。因此，呼叫 `readonly(res)` 不會有任何問題。

---

<a id="day-30"></a>

## Day 30 - 完賽心得

> 日期: 2025-10-09

我們回顧一下這三十天所學習到的：

#### 目錄

##### 環境

- Day 2 - 基礎建設： Monorepo 與 pnpm Workspace 環境搭建

##### 響應式基礎

- Day 3 - 核心概念： 從「訂閱者模式」看響應式設計

- Day 4 - 核心概念：收集依賴、觸發更新

- Day 5 - 核心概念：單向鏈表、雙向鏈表

- Day 6 - 首次實作： 鏈表應用

- Day 7 - 關注點分離：拆分 track、trigger

##### Effect

- Day 8 - Effect： 深入剖析巢狀 effect

- Day 9 - Effect：調度器實作應用

- Day 10 - Effect：為何會被指數級觸發？

- Day 11 - Effect：Link 節點的複用實作

- Day 12 - Effect ：多重依賴之指數觸發重現

- Day 13 - Effect：多重依賴之節點復用解方

- Day 14 - Effect：清理依賴的場景

- Day 15 - Effect：依賴清理實作方案

##### 效能處理

- Day 16 - 效能處理：LinkPool

- Day 17 - 效能處理：無限循環

##### Reactive

- Day 18 - Reactive：深入 Proxy 的設計思路

- Day 19 - Reactive：reactive 的基礎實作

- Day 20 - Reactive：reactive 極端案例

- Day 26 - 陣列長度變更處理

##### Computed

- Day 21 - Computed：即時更新基礎實作

- Day 22 - Computed：深入緩存機制實作

##### Watch

- Day 23 - Watch：基礎實作

- Day 24 - Watch：Options

- Day 25 - Watch ：清理 SideEffect

##### toRef、shallow、readonly

- Day 27 - toRef、toRefs、ProxyRef、unref

- Day 28 - shallowRef、shallowReactive

- Day 29 - readonly： 資料唯讀保護實作

#### 心得

在學習 Vue 3 的過程中，我很幸運能遇到遠方的幫助。他是 Vue3 的核心成員，也是 vue-draggable 的作者。如果你有興趣，可以去他的 GitHub repo 幫他點個 star。

我真的很感謝他，因為在他的協助下，我對響應式系統核心機制有了更深的理解。不只釐清了原理，也讓我更有動力想完整梳理這段學習過程。順便說，我還被誇很會畫圖 XD

這三十天我也深刻感受到，「筆記」跟「教學文章」其實差非常多。就算現在 AI 已經很強了，我的文章還是常常潤了又潤，筆誤依舊不少，只是希望讀者能更清楚理解我真正想表達的內容。

最艱難的時候是連假，如果早上沒能發文，回到家還要趕快補上，心裡常常覺得早知道應該更早開賽才對 嗚嗚 QQ…

不過，我相信透過這些循序漸進的實作，大家會更明白 Vue3 的響應式系統，其實是許多開發者長年累月在開源社群中不斷改良與設計的成果，而不是什麼黑魔法盒子。

最後，還是要謝謝一路耐心讀完文章的大家，也辛苦你們幫我抓了那麼多筆誤 XDD

YAAA～謝謝大家，我完賽啦～～～ 🎉

---
