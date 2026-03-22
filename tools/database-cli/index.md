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
\q             離開 psql
\?             顯示幫助
\h COMMAND     顯示 SQL 命令幫助
\! command     執行 shell 命令
\copy          匯入/匯出資料
```

### 實用查詢

```sql
SELECT version();
SELECT current_database();
SELECT current_user;
SELECT pg_size_pretty(pg_database_size('db_name'));
SELECT pg_stat_activity;  -- 查看連線狀態
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
SHOW STATUS;
SHOW VARIABLES LIKE 'max_connections';
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
.header on/off  顯示/隱藏標題
.separator ,    設定分隔符號
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
db.collection.dropIndex('name_1')
db.collection.stats()
db.collection.dataSize()
db.stats()
```

### 管理

```javascript
db.dropDatabase()
db.collection.drop()
db.currentOp()
db.killOp(opId)
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
KEYS pattern
EXPIRE key seconds
TTL key
TYPE key
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
DBSIZE
FLUSHDB
FLUSHALL
SAVE
BGSAVE
MONITOR
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
