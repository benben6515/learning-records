# Tree Visualize 演算法筆記

> 對應檔案：`tree-visualize.html`
> 一個純前端（SVG）樹狀結構視覺化工具。點擊任一節點會高亮「從該節點到根的路徑」，其他節點變灰；下方有同步的 1D 陣列檢視。

---

## 目錄

1. [資料結構](#1-資料結構)
2. [樹狀版面配置 `layout()`](#2-樹狀版面配置-layout)
3. [祖先鏈查找 `ancestors()`](#3-祖先鏈查找-ancestors)
4. [父節點查找 `findParentName()`](#4-父節點查找-findparentname)
5. [節點查找 `nodeMap.get()`](#5-節點查找-nodemapget)
6. [渲染 `render()`](#6-渲染-render)
7. [1D 陣列檢視 `renderArray()`](#7-1d-陣列檢視-renderarray)
8. [互動邏輯](#8-互動邏輯)
9. [優化紀錄](#9-優化紀錄)
10. [複雜度總覽](#10-複雜度總覽)

---

## 1. 資料結構

```js
const nodeMap = new Map()   // id -> node，O(1) 查找
const mk = (name, children = []) => {
  const n = { id: nextId++, name, children, parent: null }
  nodeMap.set(n.id, n)
  return n
}
```

每個節點：

| 欄位 | 說明 |
|------|------|
| `id` | 全域自增序號，唯一識別 |
| `name` | 顯示名稱 |
| `children` | 子節點陣列 |
| `parent` | **指向父節點（優化後新增）**，根為 `null` |
| `depth` / `x` / `y` | layout 階段計算的繪圖座標 |

> 設計重點：用 `nodeMap`（id → node）+ `parent` 指標，把所有查找從 O(n) DFS 降到 O(1) / O(depth)。

---

## 2. 樹狀版面配置 `layout()`

**兩階段後序 DFS**（葉子優先決定 x 座標）：

```js
function layout() {
  let leafX = 0                          // 葉子計數器（從左到右）
  rec(root, 0)
}

function rec(n, depth) {
  n.depth = depth
  n.y = depth * gapY + padY             // y = 深度 × 行距

  if (無子節點) {                         // 葉子：直接分配下一格 x
    n.x = leafX * (nodeW + gapX) + padX + nodeW/2
    leafX++
    return
  }

  n.children.forEach(c => rec(c, depth+1))   // 先遞迴子節點
  n.x = (firstChild.x + lastChild.x) / 2      // 父 = 子節點水平中點
}
```

### 為什麼這樣排？

- **葉子先決定 x**：從左到右依序佔格，保證不重疊。
- **內部節點 = 子節點中點**：視覺上置中於子樹正上方。
- 這是經典 **Knuth-style tidy tree** 排版（Reingold–Tilford 演算法的簡化版）。

> 注意：簡化版在大子樹時可能讓父節點偏離真正視覺中心，但對中小型樹已足夠。

---

## 3. 祖先鏈查找 `ancestors(id)`

回傳「目標節點 → … → 根」的完整 id 集合。

```js
function ancestors(id) {
  const set = new Set()
  let n = nodeMap.get(id)          // O(1) 找起點
  while (n) {                       // 沿 parent 指標向上走
    set.add(n.id)
    n = n.parent
  }
  return set
}
```

**複雜度：O(depth)** — 只走從節點到根的鏈長，不碰其他分支。

---

## 4. 父節點查找 `findParentName(id)`

```js
function findParentName(id) {
  const n = nodeMap.get(id)
  return n && n.parent ? n.parent.name : null
}
```

**複雜度：O(1)** — 直接讀 `parent` 指標。根節點回傳 `null`。

用途：渲染時在「新建節點」下方顯示 `↑ 父節點名稱`。

---

## 5. 節點查找 `nodeMap.get(id)`

取代原本的 `findByPosition`（O(n) DFS）。所有「按 id 取節點」的地方統一用：

```js
const node = nodeMap.get(id)   // O(1)
```

使用點：`select`、`addChild`、`rename`。

---

## 6. 渲染 `render()`

三步驟：

| 步驟 | 做什麼 | 複雜度 |
|------|--------|--------|
| `layout()` | 計算所有節點 x/y | O(n) |
| 邊界計算 | DFS 找 maxX/maxY → 決定 SVG viewBox | O(n) |
| 畫邊 + 畫節點 | 兩次 DFS 生成 HTML 字串 | O(n) |

### 邊（edge）分類

```js
const isPath = pathSet.has(n.id) && pathSet.has(c.id)   // 兩端都在路徑上
const dim    = activeId !== null && !isPath             // 有選取但不在路徑 → 變灰
// class: edge | edge path | edge dimmed
```

### 邊是貝茲曲線（平滑 S 型）

```js
my = (y1 + y2) / 2
d = `M${x1},${y1} C${x1},${my} ${x2},${my} ${x2},${y2}`
```

控制點共用 `my`（垂直中點），產生自然彎曲。

### 節點 class 組合

| class | 意義 | 視覺 |
|-------|------|------|
| `active` | 被點選的節點 | 藍底亮框 |
| `ancestor` | 路徑上的祖先 | 深藍底 |
| `dimmed` | 非路徑節點 | 變灰 |
| `new` | 剛建立的節點 | 金框 + pulse 動畫 + `↑父名` |

> 優化關鍵：`nodesWalk` 內每個節點都呼叫 `findParentName(n.id)`。原本是 O(n) DFS → 整個 render 變 **O(n²)**；優化後 `findParentName` 是 O(1)，render 降回 **O(n)**。

---

## 7. 1D 陣列檢視 `renderArray()`

把整棵樹**攤平成一維**顯示：

```js
const rest = []
walk(n => { if (n !== root) rest.push(n) })   // 收集所有非根節點
rest.sort((a, b) => a.id - b.id)              // 依 id 排序 = 建立順序
const list = [root, ...rest]                  // 根永遠排第一
```

**重點**：
- 陣列順序 = **節點建立順序**（newest 在最後）。
- 高亮狀態與樹**完全同步**（共用 `activeId` / `pathSet`）。

---

## 8. 互動邏輯

### `select(id)` — 點擊選取

```
activeId = id
pathSet = ancestors(id)     // O(depth)
newId   = null              // 清除「新建標記」
render()
```

### `addChild()` — 新增子節點

```
parent = nodeMap.get(activeId)                 // O(1)
child  = mk(parent.name + "." + (children+1))  // 自動命名如 "Node.1.2"
child.parent = parent                          // 設父指標
parent.children.push(child)
newId   = child.id                             // 標記為新 → pulse + 父名
activeId = child.id                            // 自動選中新節點
```

### `rename()` — 改名

```
node = nodeMap.get(activeId)
node.name = prompt(...)
render()
```

---

## 9. 優化紀錄

### 問題
原始版本**所有查詢都是 O(n) DFS**，且 `render` 對每個節點呼叫 `findParentName`，導致：

| 操作 | 原本 | 問題 |
|------|------|------|
| `ancestors(id)` | O(n) DFS | 每次點擊都全樹遍歷 |
| `findParentName(id)` | O(n) DFS | O(1) 能解的事 |
| `findByPosition(id)` | O(n) DFS | 只用 `.target`，回傳的 parentArr/index 從沒用到 |
| `render()` 內呼叫 `findParentName` × n 次 | **O(n²)** | 節點多時明顯卡頓 |

### 手法：加 `parent` 指標 + `nodeMap`

1. **`nodeMap`（`Map<id, node>`）**：建立節點時即註冊，所有「按 id 取節點」變 O(1)。
2. **`parent` 指標**：`addChild` 時設定 `child.parent = parent`。
3. **`ancestors`** 改為沿 `parent` 向上走 → O(depth)。
4. **`findParentName`** 改為讀 `n.parent.name` → O(1)。
5. **刪除 `findByPosition`**：原 API 的 `parentArr`/`index` 從未被使用，直接用 `nodeMap.get(id)` 取代。

### 改動前後對照

| 演算法 | 優化前 | 優化後 |
|--------|--------|--------|
| `ancestors(id)` | O(n) 樹 DFS + 布林冒泡 | **O(depth)** 沿 parent 走 |
| `findParentName(id)` | O(n) 樹 DFS | **O(1)** 讀 parent.name |
| 按 id 取節點 | O(n) `findByPosition` DFS | **O(1)** `nodeMap.get` |
| `render()` 整體 | **O(n²)**（每節點跑一次 DFS） | **O(n)** |

---

## 10. 複雜度總覽（優化後）

| 演算法 | 技法 | 複雜度 |
|--------|------|--------|
| `layout` | 後序 DFS（葉子優先定 x） | O(n) |
| `ancestors` | 沿 parent 指標上溯 | O(depth) |
| `findParentName` | 讀 parent 指標 | O(1) |
| `nodeMap.get` | hash map 查找 | O(1) |
| `render` | 雙 DFS（邊 + 節點） | O(n) |
| `renderArray` | DFS 收集 + 排序 | O(n log n) |

---

## 後續可擴充

- **刪除節點**：需同步從 `nodeMap` 移除子樹所有 id（DFS 刪除），並清 `parent` 指標。
- **拖曳排序**：layout 需改用 Reingold–Tilford 完整版才不會錯位。
- **大量節點**：SVG 字串拼接在數千節點時仍可能卡，可改用 canvas 或 virtual DOM。
