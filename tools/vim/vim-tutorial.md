# Vim 完整教學

## 四種模式

| 模式    | 進入方式             | 用途       |
| ------- | -------------------- | ---------- |
| Normal  | `Esc`                | 移動、操作 |
| Insert  | `i` / `a` / `o`      | 編輯文字   |
| Visual  | `v` / `V` / `Ctrl+v` | 選取文字   |
| Command | `:`                  | 執行命令   |

---

## 基礎操作

### 移動

```
h j k l        左 下 上 右
w / W          下一個單字（含標點 / 不含標點）
b / B          上一個單字
e / E          單字結尾
0              行首
^              第一個非空白字元
$              行尾
gg             檔案開頭
G              檔案結尾
:{number}      跳到第 n 行
{number}G      跳到第 n 行
%              跳到對應括號
```

### 編輯

```
i              游標前插入
I              行首插入
a              游標後插入
A              行尾插入
o              新增下一行
O              新增上一行
s              刪除字元並插入
S              刪除整行並插入
```

### 刪除與複製

```
x              刪除字元
X              刪除前一個字元
dd             刪除整行
dw             刪除單字
d$ / D         刪除到行尾
d0             刪除到行首
yy / Y         複製整行
yw             複製單字
p              貼上（游標後）
P              貼上（游標前）
```

### 復原與重做

```
u              復原
Ctrl+r         重做
.              重複上一個操作
```

### 存檔與離開

```
:w             儲存
:q             離開
:wq / :x / ZZ  儲存並離開
:q! / ZQ       強制離開（不儲存）
:w {file}      另存新檔
:e {file}      開啟檔案
```

---

## 進階技巧

### 搜尋與取代

```
/pattern       向下搜尋
?pattern       向上搜尋
n              下一個匹配
N              上一個匹配
*              搜尋游標下的單字
#              反向搜尋游標下的單字

:%s/old/new/g        全部取代
:%s/old/new/gc       全部取代（逐一確認）
:s/old/new/g         當前行取代
:1,10s/old/new/g     第 1-10 行取代
```

### Visual Mode 選取

```
v              字元選取
V              行選取
Ctrl+v         區塊選取（垂直編輯）
o              切換選取端點
```

### 區塊編輯（Pro Tip）

```
Ctrl+v         進入區塊選取
選取範圍
I              在區塊前插入
輸入文字
Esc            套用到所有行
```

### 分頁與分割視窗

```
:tabnew        新增分頁
:tabclose      關閉分頁
gt / gT        切換分頁

:split         水平分割
:vsplit        垂直分割
Ctrl+w h/j/k/l 切換視窗
Ctrl+w q       關閉視窗
Ctrl+w _       最大化水平
Ctrl+w |       最大化垂直
Ctrl+w =       平均分配
```

### 暫存器（Register）

```
"ay            複製到暫存器 a
"ap            從暫存器 a 貼上
"+y            複製到系統剪貼簿
"+p            從系統剪貼板貼上
:reg           查看所有暫存器
```

### 巨集（Macro）

```
qa             開始錄製巨集到暫存器 a
q              停止錄製
@a             執行巨集 a
@@             重複上個巨集
10@a           執行巨集 a 10 次
```

---

## Pro Tips

### 1. 快速移動

```
zz             將當前行置中
zt             將當前行置頂
zb             將當前行置底
H / M / L      螢幕上 / 中 / 下
Ctrl+u / d     上 / 下 翻半頁
Ctrl+f / b     上 / 下 翻整頁
```

### 2. 文字物件（Text Objects）

```
ciw            改變整個單字
ci"            改變雙引號內容
ci( / ci)      改變括號內容
ci{ / ci}      改變大括號內容
cit            改變 HTML 標籤內容
diw            刪除整個單字
yiW            複製整個單字（含標點）
```

### 3. 快速編輯

```
r              取代單一字元
R              進入取代模式
J              合併下一行
~              切換大小寫
gU             轉大寫
gu             轉小寫
```

### 4. 標記（Mark）

```
ma             設標記 a
`a             跳到標記 a（精確位置）
'a             跳到標記 a（行首）
:marks         查看所有標記
```

### 5. 折疊（Fold）

```
zf             建立折疊
zo             開啟折疊
zc             關閉折疊
za             切換折疊
zR             開啟所有折疊
zM             關閉所有折疊
```

### 6. 自動補全

```
Ctrl+n         下一個補全
Ctrl+p         上一個補全
Ctrl+x Ctrl+f  檔案路徑補全
Ctrl+x Ctrl+l  整行補全
```

### 7. 多檔編輯

```
:bn            下一個 buffer
:bp            上一個 buffer
:bd            關閉 buffer
:ls            列出所有 buffer
```

### 8. 常用組合技

```
dip            刪除段落
ggdG           刪除整個檔案
:%!sort        排序整個檔案
:%!jq .        格式化 JSON
:g/pattern/d   刪除所有匹配行
:v/pattern/d   刪除所有不匹配行
```

---

## 學習資源

### 互動教學

```
vimtutor       終端機輸入，約 30 分鐘
```

### 遊戲學習

- [Vim Adventures](https://vim-adventures.com/)
- [OpenVim](https://www.openvim.com/)
- [VimBeGood](https://github.com/ThePrimeagen/vim-be-good)（Vim 內遊戲）

### 我的設定檔

- [github.com/benben6515/dotfiles](https://github.com/benben6515/dotfiles/blob/main/.vimrc)

---

## 速查表

```
┌─────────────────────────────────────────────────┐
│  移動      │ h j k l w b 0 $ gg G %            │
│  編輯      │ i a o x dd yy p u .               │
│  搜尋      │ / ? n N * #                       │
│  取代      │ :%s/old/new/g                     │
│  檔案      │ :w :q :wq :q! :e                  │
│  視窗      │ :split :vsplit Ctrl+w             │
│  文字物件  │ ciw ci" ci( cit                   │
│  巨集      │ qa q @a                           │
└─────────────────────────────────────────────────┘
```

---

## 練習建議

1. **第一天**：熟悉 `h j k l` 移動、`i` 插入、`Esc` 回 Normal、`:wq` 存檔
2. **第一週**：加入 `dd` `yy` `p` `u`、搜尋 `/`
3. **第二週**：學習 Visual mode、文字物件 `ciw`
4. **持續**：每天學一個新指令，慢慢累積

**最重要的觀念**：保持在 Normal mode，只有要輸入文字才進 Insert mode
