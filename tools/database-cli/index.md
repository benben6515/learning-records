# Database CLI 速查表

## PostgreSQL (`psql`)

### 連線

```bash
psql -h host -p port -U user -d database
psql -U postgres                    # 本地連線
psql postgresql://user:pass@host:port/db  # URI 連線
```

### 資料庫操作

```sql
\l              列出所有資料庫
\c database     切換資料庫
\dn             列出所有 schema
\dt             列出所有資料表
\dt+            列出資料表（含大小）
\dt schema.*    列出指定 schema 的資料表
\d table_name   查看資料表結構
\d+ table_name  查看詳細結構
\df             列出所有函數
\dv             列出所有 view
\di             列出所有 index
\du             列出所有使用者/角色
\dp             列出資料表權限
\conninfo       顯示當前連線資訊
```

### 輸出格式

```sql
\x             切換垂直/水平顯示
\a             切換對齊模式
\t             只顯示資料（不顯示標題）
\T html        設定 HTML 輸出格式
\pset format csv       設定 CSV 格式
\o file.txt    輸出到檔案
\o             停止輸出到檔案
```

### 編輯與歷史

```sql
\e             用編輯器編輯查詢
\ef function   用編輯器編輯函數
\s             顯示命令歷史
\s file.txt    儲存歷史到檔案
```

### 其他

```sql
\timing        顯示執行時間
\watch N       每 N 秒重新執行查詢
\q             離開 psql
\?             顯示幫助
\h COMMAND     顯示 SQL 命令幫助
\! command     執行 shell 命令
\copy          匯入/匯出資料
\set VAR val   設定變數
\unset VAR     刪除變數
```

### 實用查詢

```sql
SELECT version();
SELECT current_database();
SELECT current_user;
SELECT pg_size_pretty(pg_database_size('db_name'));
SELECT pg_size_pretty(pg_total_relation_size('table_name'));  -- 資料表大小

-- 查看連線狀態
SELECT pid, usename, state, query FROM pg_stat_activity WHERE state = 'active';

-- 查詢執行計畫
EXPLAIN ANALYZE SELECT * FROM table_name WHERE id = 1;

-- 鎖定狀況
SELECT * FROM pg_locks pl JOIN pg_stat_activity psa ON pl.pid = psa.pid;

-- 終止特定連線
SELECT pg_terminate_backend(pid) FROM pg_stat_activity WHERE usename = 'username';
```

---

## MySQL (`mysql`)

### 連線

```bash
mysql -h host -P port -u user -p database
mysql -u root -p
mysql --host=host --user=user --password=db
```

### 資料庫操作

```sql
SHOW DATABASES;
USE database;
SHOW TABLES;
SHOW TABLE STATUS;
DESCRIBE table_name;
DESC table_name;
SHOW CREATE TABLE table_name;
SHOW INDEX FROM table_name;
SHOW COLUMNS FROM table_name;
SHOW GRANTS FOR 'user'@'host';
SHOW ENGINES;
SHOW WARNINGS;
SHOW ERRORS;
```

### 輸出格式

```bash
mysql -e "SELECT ..." -t    # 表格輸出
mysql -e "SELECT ..." -v    # 垂直輸出
mysql -e "SELECT ..." -H    # HTML 輸出
mysql -e "SELECT ..." -X    # XML 輸出
```

### 互動模式

```sql
\G             垂直顯示結果
\T             開始 tee（記錄到檔案）
\t             停止 tee
\c             取消當前查詢
\r             重新連線
\! command     執行 shell 命令
\q             離開
\h             幫助
```

### 實用查詢

```sql
SELECT VERSION();
SELECT DATABASE();
SELECT USER();
SHOW PROCESSLIST;
SHOW FULL PROCESSLIST;         -- 顯示完整 SQL
SHOW STATUS;
SHOW VARIABLES LIKE 'max_connections';
SHOW VARIABLES LIKE 'innodb_%';

-- 查詢執行計畫
EXPLAIN SELECT * FROM table_name WHERE id = 1;
EXPLAIN FORMAT=JSON SELECT * FROM table_name;

-- 終止查詢
KILL QUERY thread_id;
KILL CONNECTION thread_id;
```

---

## SQLite (`sqlite3`)

### 連線

```bash
sqlite3 database.db
sqlite3 :memory:    # 記憶體資料庫
```

### 資料庫操作

```sql
.databases      列出資料庫
.tables         列出資料表
.schema         顯示所有 schema
.schema table   顯示指定資料表 schema
.indices        列出所有 index
.indices table  列出指定資料表的 index
```

### 輸出格式

```sql
.mode list      列表模式
.mode csv       CSV 模式
.mode column    欄位模式
.mode line      單行模式
.mode insert    INSERT 語句模式
.mode html      HTML 模式
.mode json      JSON 模式
.mode table     表格模式（帶邊框）
.mode box       方框模式
.header on/off  顯示/隱藏標題
.separator ,    設定分隔符號
.nullvalue NULL 設定 NULL 顯示方式
.width 10 20    設定欄位寬度
```

### 匯入匯出

```sql
.output file.txt    輸出到檔案
.output stdout      恢復輸出
.import file.csv table  匯入 CSV
.dump           匯出整個資料庫
.read file.sql  執行 SQL 檔案
```

### 其他

```sql
.help           幫助
.quit           離開
.exit           離開
.timer on/off   計時
.show           顯示當前設定
.stats on/off   顯示執行統計

-- PRAGMA 指令
PRAGMA table_info(table_name);   -- 查看欄位資訊
PRAGMA foreign_keys = ON;        -- 啟用外鍵約束
PRAGMA integrity_check;          -- 檢查資料庫完整性
PRAGMA journal_mode = WAL;       -- 設定 WAL 模式（提升並發）
VACUUM;                          -- 壓縮資料庫
```

### Dot-command 規則（官網 cli.html §3）

- Dot-command 由 CLI 程式處理（非 SQLite 函式庫），`sqlite3_exec()` 內不會生效
- 必須從行首 `.` 開始（前面不能有空白），且獨占一行——不能出現在 SQL 中間或續行提示 `...>` 時
- 沒有註解語法；整行註解用行首 `#`
- 尾端裸 `;` 會被忽略（3.52.0+）；多數指令可縮寫：`.q` = `.quit`
- 引號規則：`'...'` 與 `"..."` 各視為單一參數（引號移除）；反斜線跳脫（`\n`、`\"` 等）只在雙引號內有效

### 進階開檔（`.open`）

```sql
.open ex1.db            關閉目前資料庫並開啟新檔（不存在則建立）
.open :memory:          記憶體資料庫
.open --readonly f.db   唯讀開啟
.open --ifexists f.db   檔案不存在就報錯（避免誤建空資料庫）
.open --new f.db        清空重建（⚠️ 無確認直接銷毀舊資料）
.open --append f.db     附加到既有檔案尾端（appendvfs）
.open --zip f.zip       把 ZIP 當資料庫開
.save FILE              等同 .backup（⚠️ 直接覆蓋不提示）
```

### 進階輸出模式

```sql
.mode                  顯示目前模式
.mode --list           列出所有模式
.mode box              Unicode 表格框線（新版預設）
.mode quote            SQL 字面值格式（逗號分隔）
.mode markdown         Markdown 表格
.mode json             JSON
.mode ascii            ASCII 控制字元分隔（單元/記錄分隔符）
.mode list --colsep "|"
.mode csv --titles on|off
.mode --once box       只有下一個 SQL 用 box，之後自動還原
```

### I/O 導向

```sql
.output FILE           之後輸出全導向檔案；.output 還原 stdout
.once FILE             只有下一個指令輸出到檔案
.once |open -f         第一字元為 | 時，輸出當作 shell 指令的 stdin
.once -e               存暫存 .txt 再用系統文字編輯器開啟
.once -x / .excel      存暫存 .csv 再用預設試算表開啟
.once -w / .www        用瀏覽器以 HTML 表格顯示（--plain 純文字）
.read FILE             執行檔案內的 SQL 與 dot-command
.read |script.sh       執行指令，以其輸出當作輸入
.shell CMD / .system   執行 shell 指令（Mac 開檔：.system open data.csv）
.system xdg-open f.csv Linux 開檔
```

### 檔案 I/O 與 edit() SQL 函數（CLI 內建擴充）

```sql
-- 讀檔成 BLOB 寫入
INSERT INTO images(name,type,img) VALUES('icon','jpeg',readfile('icon.jpg'));

-- BLOB 寫回檔案，回傳寫入位元組數
SELECT writefile('icon.jpg',img) FROM images WHERE name='icon';

-- edit()：把值寫入暫存檔、開編輯器（預設 $VISUAL）、回傳改後內容
UPDATE docs SET body=edit(body) WHERE name='report-15';
UPDATE pics SET img=edit(img,'gimp') WHERE id='pic-1542';   -- 非文字檔指定程式
SELECT length(edit(img,'gimp')) WHERE id='pic-1542';        -- 只想看不想改
```

### CSV 匯入匯出細節（⚠️ 常見陷阱）

```sql
.import --csv --skip 1 data.csv tab1    --csv/--ascii 指定分隔符；--skip N 跳過前 N 列
.import --schema temp file.csv tab1     --schema 指定目標表所在的附加資料庫或 TEMP
```

- **表格不存在**：自動建立，第一列變成欄位名稱，資料從第二列開始
- **表格已存在**：第一列也當資料（有標頭需 `--skip 1`）
- 不加 `--csv` 時，分隔符沿用**目前的輸出模式**設定（易踩雷）
- TSV 陷阱：`.mode tabs` 輸出不加引號，資料含 `"` 時 `.import` 會讀錯；正確做法 `.mode csv -colsep "\t"`

```bash
# 匯出 CSV 標準流程
sqlite3 ex1.db ".mode csv --titles on" ".once dataout.csv" "SELECT * FROM tab1;"
```

### ZIP 封存當資料庫

```bash
sqlite3 file.zip        # 自動偵測 ZIP（不限副檔名，JAR/DOCX/ODP 皆可）
```

```sql
SELECT name, sz, method FROM zip;      -- 每個檔案一列
-- 欄位：name, mode(權限), mtime, sz(解壓後大小), rawdata, data(解壓內容), method
SELECT name, (100.0*length(rawdata))/sz FROM zip ORDER BY 2;   -- 壓縮率
SELECT writefile(name,content) FROM zip WHERE name LIKE 'docProps/%';  -- 解壓特定檔案
-- 本質 = 記憶體 DB 內的 zipfile 虛擬表（CLI 專屬技巧，應用程式需自行載入模組）
CREATE VIRTUAL TABLE zip USING zipfile('document.docx');
```

### 備份、遷移與損壞救援

```bash
# .dump：整個資料庫 → UTF-8 SQL 文字（可壓縮歸檔、跨引擎遷移）
sqlite3 ex1.db .dump | gzip -c > ex1.dump.gz
zcat ex1.dump.gz | sqlite3 ex2.db
sqlite3 ex1.db .dump | psql ex2          # 遷移到 PostgreSQL

# .recover：直接讀取頁面救資料
sqlite3 broken.db ".recover" > rescued.sql
```

- `.dump` 遇到損壞即停止；`.recover` 會救出所有未損壞部分
- 無法歸屬的孤兒列 → `lost_and_found` 表（`rootpgno, pgno, nfield, id, c0, c1...`），可用 `.recover --lost-and-found orphaned_rows` 改名

### 校驗與自測

```sql
.sha3sum                        -- 資料庫「內容」的 SHA3 雜湊（VACUUM 不會改變它）
.sha3sum --sha3-256 tbl%        -- 預設 256；可 --sha3-224/384/512、--schema 含 schema
.selftest                       -- 依 selftest 表執行測試；無表則跑 PRAGMA integrity_check
.selftest --init                -- 建表並記錄所有表的 SHA3，之後驗證未變
```

### SQLite Archive（`.archive` / `-A`）

```bash
# 類 zip/unzip 的內建封存（底層 sqlar，需 zlib）
sqlite3 new_archive.db -Acv file1 file2          # 建立（-A 後選項不能有空格）
sqlite3 -Axf archive.zip                         # 解壓 ≈ unzip
sqlite3 -At archive.zip                          # 列出 ≈ unzip -l
sqlite3 -Acf archive2.zip dir/                   # 打包目錄 ≈ zip -r
```

```sql
.ar -c --file new_archive.db f1 f2     -- 建立（f 可省略 → 以 main 資料庫本身當封存）
.ar -x --verbose                        -- 解壓
.ar -u                                  -- 僅更新有變動的檔案（3.28.0 前等同 -i）
.ar -gCx headers *.h                    -- -g 用 glob 匹配；無匹配會報錯
```

### SQL 參數（`.param`）

```sql
SELECT * FROM t WHERE name = $name;     -- 具名參數：$var、:name、@name、?N
.param init                             -- 建立 sqlite_parameters 暫存表
.param set @name "'Alice'"              -- ⚠️ VALUE 會先被當 SQL 求值；純文字要包兩層引號
.param set ?15 42
.param list / .param clear / .param unset @name
```

### 索引建議（`.expert`，實驗性）

```sql
.expert                                 -- 先開啟
SELECT * FROM x1 WHERE a=? AND b>?;     -- 再下查詢
-- → 輸出建議：CREATE INDEX x1_idx_000123a7 ON x1(a, b); 與 EXPLAIN QUERY PLAN
.expert --sample 100                    -- 取樣比例（預設 0 = 只看 schema；大表取樣昂貴）
```

### 多重連線（3.37.0+）

```sql
.conn            列出連線（0-9，最多 10 個）
.conn 1          切換/建立連線
.conn close 1    關閉連線
-- 一次只有一個作用中；輸出格式等設定「跨連線共用」，.open 只影響當前連線
```

### 內建擴充（CLI 有、函式庫沒有）

```sql
SELECT decimal_add('1.1','2.2');        -- decimal：精確十進位運算
SELECT value FROM generate_series(1,10,2);   -- generate_series 表值函數
SELECT base64(x'4869'), base85(blob);   -- base64/base85 編解碼
SELECT 'abc' REGEXP '^a';               -- POSIX 擴充 regex（REGEXP 運算子）
-- UINT collating sequence：文字欄位內含數字時的數值感知排序
```

### Shell Script 用法

```bash
sqlite3 ex1.db 'select * from tbl1' | awk ...   # 第二參數 = 執行後輸出 list 模式並離開
sqlite3 test.db ".mode box" "SELECT * FROM users;"   # 多參數依序執行；讀完參數即離開（不讀 stdin）
sqlite3 -batch -bail db.db < script.sql          # -batch 強制批次 I/O；-bail 出錯即停
sqlite3 ex1.db ".exit 1"                          # .exit 可帶結束碼
```

- SQL 結束符：`;` 為主；CLI 另接受單獨一行 `GO` 或 `/`（SQL Server/Oracle 相容，僅 CLI 有效）

### 常用 CLI 選項

```bash
sqlite3 -csv -header test.db            # 開檔前先設格式（單雙破折號皆可，由左至右覆蓋）
sqlite3 -readonly f.db                  # 唯讀
sqlite3 -init ~/.sqliterc f.db          # 指定初始化檔
sqlite3 -cmd ".mode box" f.db           # 讀 stdin 前先執行指令
sqlite3 -zip f.zip                      # ZIP 當資料庫
sqlite3 -nullvalue NULL f.db            # NULL 顯示文字（預設空字串）
sqlite3 -separator ";" f.db             # 欄位分隔符（預設 |）
sqlite3 -echo f.db                      # 執行前印出輸入
sqlite3 -newline '\n' f.db              # 列分隔符
# 其他：-json -line -list -markdown -quote -table -tabs -ascii -box -column -nofollow
#       -bail -batch -interactive -deserialize -append -A(archive) -safe -version
```

### --safe 安全模式

```bash
sqlite3 --safe f.db < untrusted.sql     # 限制只能碰指定的資料庫檔案
```

- 停用：`.open`（`:memory:`/`--hexdb` 除外）、`ATTACH`、`edit()`/`readfile()`/`writefile()`/`load_extension()`、`.archive`、`.backup`/`.save`、`.import`、`.load`、`.shell`/`.system`、`.excel`/`.once`/`.output`
- 逃生口：CLI 加 `--nonce STRING` + 執行 `.nonce STRING`，僅放行「緊接的下一個」指令——最後手段，慎用
- `--unsafe-testing`：關閉防禦性檢查，可能啟用會造成損壞的功能，行為異常不算 bug

### 進階 dot-command 速覽

```sql
.eqp on|off|full     自動 EXPLAIN QUERY PLAN
.lint fkeys-indexes  檢查 schema 問題
.dbinfo              資料庫檔案資訊
.intck               漸進式完整性檢查
.clone FILE          複製資料庫到新檔
.backup / .restore   線上備份與還原
.schema --indent     縮排格式化 schema
.cd DIR / .print / .log / .trace / .stats / .timer
.nonce / .auth / .session / .imposter   -- 安全與測試類
.help                完整指令清單（60+ 個）
```

---

## MongoDB (`mongosh`)

### 連線

```bash
mongosh
mongosh "mongodb://host:port"
mongosh "mongodb+srv://cluster/db" -u user -p
```

### 資料庫操作

```javascript
show dbs                列出資料庫
use database            切換資料庫
db                      顯示當前資料庫
show collections        列出 collections
```

### CRUD 操作

```javascript
db.collection.find()
db.collection.findOne()
db.collection.insertOne({ name: "test" })
db.collection.insertMany([{...}, {...}])
db.collection.updateOne({ _id: 1 }, { $set: { name: "new" } })
db.collection.updateMany({}, { $set: { status: "active" } })
db.collection.deleteOne({ _id: 1 })
db.collection.deleteMany({ status: "inactive" })
```

### 查詢技巧

```javascript
db.collection.find().pretty()
db.collection.find().limit(10)
db.collection.find().skip(10)
db.collection.find().sort({name: 1})
db.collection.find().count()
db.collection.find({field: {$gt: 10}})
db.collection.find({$or: [{a: 1}, {b: 2}]})
```

### 索引與統計

```javascript
db.collection.getIndexes()
db.collection.createIndex({name: 1})
db.collection.createIndex({name: 1}, {unique: true})    // 唯一索引
db.collection.createIndex({field: "text"})              // 全文索引
db.collection.dropIndex('name_1')
db.collection.stats()
db.collection.dataSize()
db.stats()
```

### Aggregation

```javascript
db.collection.aggregate([
  { $match: { status: "active" } },
  { $group: { _id: "$category", count: { $sum: 1 } } },
  { $sort: { count: -1 } },
  { $limit: 10 }
])

db.collection.countDocuments({ status: "active" })
db.collection.distinct("field")                        // 取不重複值
```

### 查詢分析

```javascript
db.collection.explain("executionStats").find({name: "test"})
db.collection.find().explain("allPlansExecution")
```

### 管理

```javascript
db.dropDatabase()
db.collection.drop()
db.currentOp()
db.killOp(opId)
db.createUser({ user: "name", pwd: "pass", roles: ["readWrite"] })
db.getUsers()
```

---

## Redis (`redis-cli`)

### 連線

```bash
redis-cli
redis-cli -h host -p port -a password
redis-cli -u redis://user:pass@host:port
redis-cli --csv          # CSV 輸出
redis-cli --raw          # 原始輸出
```

### 基本操作

```bash
SET key value
GET key
DEL key
EXISTS key
KEYS pattern              # 危險：生產環境避免使用
SCAN 0 MATCH pattern COUNT 100  # 安全替代 KEYS
EXPIRE key seconds
PEXPIRE key milliseconds  # 毫秒精度
TTL key
PTTL key                  # 毫秒精度
PERSIST key               # 移除過期時間
TYPE key
RENAME key newkey
OBJECT ENCODING key       # 查看底層編碼
```

### 資料型別

```bash
# String
SET key value
GET key
INCR key
DECR key
APPEND key value

# Hash
HSET hash field value
HGET hash field
HGETALL hash
HDEL hash field
HKEYS hash
HVALS hash

# List
LPUSH list value
RPUSH list value
LPOP list
RPOP list
LRANGE list 0 -1
LLEN list

# Set
SADD set member
SREM set member
SMEMBERS set
SISMEMBER set member
SCARD set

# Sorted Set
ZADD zset score member
ZRANGE zset 0 -1 WITHSCORES
ZREM zset member
ZCARD zset
```

### 資訊與管理

```bash
INFO
INFO memory
INFO stats
INFO replication          # 主從複製狀態
DBSIZE
SELECT db_index           # 切換資料庫（0-15）
FLUSHDB                   # 清空當前資料庫
FLUSHALL                  # 清空所有資料庫（危險）
SAVE
BGSAVE
BGREWRITEAOF              # 重寫 AOF
MONITOR                   # 即時監控指令流
CONFIG GET maxmemory
CONFIG SET maxmemory 256mb
CONFIG GET save
SLOWLOG GET 10            # 查看慢查詢記錄
CLIENT LIST               # 查看所有客戶端連線
CLIENT KILL id            # 終止指定客戶端
```

### 效能測試

```bash
redis-benchmark
redis-benchmark -t set,get -n 100000
```

---

## 通用技巧

### 快速匯出資料

```bash
# PostgreSQL
psql -c "COPY (SELECT * FROM table) TO STDOUT WITH CSV HEADER" > output.csv

# MySQL
mysql -e "SELECT * FROM table" -B > output.tsv

# SQLite
sqlite3 db.db ".mode csv" ".output out.csv" "SELECT * FROM table;"

# MongoDB
mongoexport --db=db --collection=col --out=output.json
```

### 執行 SQL 檔案

```bash
psql -f script.sql
mysql < script.sql
sqlite3 db.db < script.sql
```

### 備份與還原

```bash
# PostgreSQL
pg_dump db > backup.sql
pg_restore -d db backup.dump

# MySQL
mysqldump db > backup.sql
mysql db < backup.sql

# SQLite
cp db.db backup.db

# MongoDB
mongodump --db=db --out=backup/
mongorestore --db=db backup/db/
```

---

## 速查表

| 資料庫     | CLI 工具    | 列出資料庫       | 列出資料表         | 離開    |
| ---------- | ----------- | ---------------- | ------------------ | ------- |
| PostgreSQL | `psql`      | `\l`             | `\dt`              | `\q`    |
| MySQL      | `mysql`     | `SHOW DATABASES` | `SHOW TABLES`      | `\q`    |
| SQLite     | `sqlite3`   | `.databases`     | `.tables`          | `.quit` |
| MongoDB    | `mongosh`   | `show dbs`       | `show collections` | `exit`  |
| Redis      | `redis-cli` | `INFO keyspace`  | `KEYS *`           | `exit`  |
