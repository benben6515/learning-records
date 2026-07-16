# Symlink（符號連結）Cheat Sheet

> macOS / Linux 通用。軟連結（symbolic link）= 一個「指到別處」的捷徑檔案，刪連結不影響目標。

---

## 基本語法：`ln -s`

```bash
ln -s <目標 target> <連結名字 link>
```

**記法**：順序跟 `cp` / `mv` 一樣 —— 「來源在前、結果在後」。

```bash
ln -s ~/ai/AGENTS.md ~/AGENTS.md
#     ↑ 已存在的目標     ↑ 要新建的連結
# 結果：~/AGENTS.md 指向 ~/ai/AGENTS.md
```

- `-s` = symbolic（軟連結，幾乎都用這個）
- 沒有 `-s` 是 hard link（硬連結，很少用）

---

## ⚠️ 三大坑（踩過都會斷鏈或建錯位置）

### 坑 1：target 一律用「絕對路徑」

`target` 會被**原樣字串存進去**，將來是以「連結所在目錄」為基準解析，不是你當下的 cwd。

```bash
# ❌ 危險：相對路徑
cd ~/foo
ln -s bar/baz.txt ~/link        # 存進去的是字串 "bar/baz.txt"
                                # ~/link 會去 ~/bar/baz.txt 找 → 斷鏈

# ✅ 安全：絕對路徑
ln -s ~/foo/bar/baz.txt ~/link
```

> 實例：`~/.opencode/skills/ui-ux-pro-max → ~/ai-skills/...`（路徑拼錯）就是這類斷鏈。

### 坑 2：改寫「目錄連結」必須 `-sfn`

```bash
ln -sfn ~/ai/skills/ui-ux-pro-max ~/.opencode/skills/ui-ux-pro-max
#   ^^
# -f  force：覆蓋已存在的連結
# -n  no-deref：把目錄連結當一般檔案對待（關鍵！）
```

**沒加 `-n` 會出事**：`ln -sf` 看到連結指向目錄，會「走進去」把新連結建在**目標裡面**，而不是替換它。

口訣：**檔案連結用 `-sf`、目錄連結用 `-sfn`**。

### 坑 3：刪連結用 `rm`，且不要加斜線

```bash
rm ~/AGENTS.md                  # ✅ 刪「連結本身」，目標檔不動
rm ~/.agents/skills/pr-inline-comment   # ✅ 目錄連結也用 rm
```

不要這樣：
- `rmdir ~/link` —— 對「指向目錄的連結」無效（它不是目錄）
- `rm ~/link/`（加斜線）—— 會去刪**目標裡的東西**，不是刪連結

刪連結**永遠不影響目標**（這是 symlink 最安全的地方）。

---

## 常用操作總表

| 想做的事 | 指令 |
|---------|------|
| 建檔案連結 | `ln -s /abs/target ~/link` |
| 建目錄連結 | `ln -s /abs/targetdir ~/link` |
| 改寫已存在的**檔案**連結 | `ln -sf /abs/newtarget ~/link` |
| 改寫已存在的**目錄**連結 | `ln -sfn /abs/newtarget ~/link` |
| 刪連結（檔案/目錄皆可） | `rm ~/link` |
| 也可用 unlink | `unlink ~/link` |

---

## 檢視與排查

```bash
ls -la ~/AGENTS.md
# lrwxr-xr-x ... AGENTS.md -> /Users/benbenweng/ai/AGENTS.md
# ↑ 開頭的 l = symlink；-> 後面就是 target

ls -la ~/.agents/skills/        # 看整個目錄，一眼分出誰是 link、誰是實體

readlink ~/AGENTS.md            # 只印 target 路徑
readlink -f ~/AGENTS.md         # 一路解析到底（link 指 link 也展開）

test -e ~/AGENTS.md && echo OK  # 目標是否存在（斷鏈為 false）
test -L ~/AGENTS.md && echo "是 symlink"
```

---

## 找出斷鏈（broken symlink）

```bash
find ~/.opencode -xtype l                            # 列出該目錄下所有斷鏈
find ~ -maxdepth 3 -type l ! -exec test -e {} \; -print 2>/dev/null   # 全家掃（淺層）
```

 `-xtype l`：找到「目標不存在」的連結（與 `-type l` 不同，後者是列出所有連結）。

---

## 實戰範例（取自 ~/ai symlink 整理）

```bash
# 1. 讓 ~/AGENTS.md 指到 source of truth
ln -s ~/ai/AGENTS.md ~/AGENTS.md

# 2. 把新 skill 接進 pi 的 skill 目錄（逐個 symlink）
ln -s ~/ai/skills/pr-inline-comment ~/.agents/skills/pr-inline-comment

# 3. 修一個指錯路徑的斷鏈（目錄連結 → 用 -sfn）
ln -sfn ~/ai/skills/ui-ux-pro-max ~/.opencode/skills/ui-ux-pro-max

# 4. 確認有接好
ls -la ~/.agents/skills/pr-inline-comment && readlink -f ~/.agents/skills/pr-inline-comment
```

---

## 黃金三守則

1. **target 用絕對路徑**
2. **目錄連結改寫要 `-sfn`**
3. **刪連結用 `rm`、不加斜線**
