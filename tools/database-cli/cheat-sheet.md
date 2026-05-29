# SQL Cheatsheet

A quick-reference for SQL commands in CLI environments (MySQL, PostgreSQL, SQLite).

---

## 1. Connection & Setup

### MySQL

```bash
# Connect to local server
mysql -u root -p

# Connect to specific database on a remote host
mysql -u user -p -h host.example.com -P 3306 mydb

# Connect with defaults file
mysql --defaults-file=~/.my.cnf

# Execute a single query and exit
mysql -u root -p -e "SELECT VERSION();"
```

### PostgreSQL (psql)

```bash
# Connect to local database
psql -U postgres -d mydb

# Connect to remote host
psql -U user -h host.example.com -p 5432 -d mydb

# Connect with connection string
psql "postgresql://user:pass@host:5432/mydb"

# Execute a single query and exit
psql -U postgres -d mydb -c "SELECT version();"

# Run SQL file
psql -U postgres -d mydb -f script.sql
```

### SQLite

```bash
# Open (or create) a database file
sqlite3 mydb.db

# Open in read-only mode
sqlite3 -readonly mydb.db

# Execute a query and exit
sqlite3 mydb.db "SELECT sqlite_version();"

# Import SQL file
sqlite3 mydb.db < script.sql
```

---

## 2. Database Management

```sql
-- Create database
CREATE DATABASE mydb;
CREATE DATABASE mydb CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;  -- MySQL

-- Drop database
DROP DATABASE IF EXISTS mydb;

-- Show databases (MySQL / psql)
SHOW DATABASES;                          -- MySQL
\l                                       -- psql

-- Switch database
USE mydb;                               -- MySQL
\c mydb                                 -- psql

-- Current database
SELECT DATABASE();                      -- MySQL
SELECT current_database();              -- PostgreSQL
```

---

## 3. Table Operations

### CREATE TABLE

```sql
CREATE TABLE users (
    id          INT PRIMARY KEY AUTO_INCREMENT,   -- MySQL
    -- id       SERIAL PRIMARY KEY,                -- PostgreSQL
    -- id       INTEGER PRIMARY KEY AUTOINCREMENT,  -- SQLite
    username    VARCHAR(50)    NOT NULL UNIQUE,
    email       VARCHAR(255)   NOT NULL,
    age         INT,
    balance     DECIMAL(10,2) DEFAULT 0.00,
    is_active   BOOLEAN        DEFAULT TRUE,
    bio         TEXT,
    created_at  TIMESTAMP      DEFAULT CURRENT_TIMESTAMP
);
```

**Common Data Types Reference**

| Type            | MySQL                    | PostgreSQL                    | SQLite           |
| --------------- | ------------------------ | ----------------------------- | ---------------- |
| Integer         | `INT`, `BIGINT`          | `INTEGER`, `BIGINT`, `SERIAL` | `INTEGER`        |
| Decimal         | `DECIMAL(p,s)`           | `NUMERIC(p,s)`                | `REAL`           |
| Variable string | `VARCHAR(n)`             | `VARCHAR(n)`                  | `TEXT`           |
| Fixed string    | `CHAR(n)`                | `CHAR(n)`                     | `TEXT`           |
| Large text      | `TEXT`                   | `TEXT`                        | `TEXT`           |
| Boolean         | `TINYINT(1)` / `BOOLEAN` | `BOOLEAN`                     | `INTEGER`        |
| Date            | `DATE`                   | `DATE`                        | `TEXT`           |
| Timestamp       | `DATETIME`, `TIMESTAMP`  | `TIMESTAMP`                   | `TEXT`           |
| Blob/Binary     | `BLOB`                   | `BYTEA`                       | `BLOB`           |
| JSON            | `JSON`                   | `JSON`, `JSONB`               | (via extensions) |
| Auto-increment  | `AUTO_INCREMENT`         | `SERIAL`                      | `AUTOINCREMENT`  |

### ALTER TABLE

```sql
-- Add column
ALTER TABLE users ADD COLUMN phone VARCHAR(20);

-- Drop column
ALTER TABLE users DROP COLUMN phone;

-- Rename column
ALTER TABLE users RENAME COLUMN username TO user_name;      -- PostgreSQL, SQLite
ALTER TABLE users CHANGE COLUMN username user_name VARCHAR(50);  -- MySQL

-- Modify column type
ALTER TABLE users MODIFY COLUMN email VARCHAR(500);         -- MySQL
ALTER TABLE users ALTER COLUMN email TYPE VARCHAR(500);     -- PostgreSQL

-- Add constraint
ALTER TABLE orders ADD CONSTRAINT fk_user
    FOREIGN KEY (user_id) REFERENCES users(id);

-- Rename table
ALTER TABLE users RENAME TO accounts;
```

### DROP & TRUNCATE

```sql
DROP TABLE IF EXISTS users;
TRUNCATE TABLE users;           -- Reset table, faster than DELETE (no WHERE)
TRUNCATE users RESTART IDENTITY; -- PostgreSQL: reset sequences too
```

---

## 4. CRUD Operations

### INSERT

```sql
-- Single row
INSERT INTO users (username, email, age)
VALUES ('alice', 'alice@example.com', 30);

-- Multiple rows
INSERT INTO users (username, email, age) VALUES
    ('bob', 'bob@example.com', 25),
    ('carol', 'carol@example.com', 28);

-- Insert from select
INSERT INTO archive_users (username, email)
SELECT username, email FROM users WHERE is_active = FALSE;

-- Upsert (insert or update on conflict)
INSERT INTO users (username, email) VALUES ('alice', 'new@mail.com')
    ON DUPLICATE KEY UPDATE email = VALUES(email);                    -- MySQL
INSERT INTO users (username, email) VALUES ('alice', 'new@mail.com')
    ON CONFLICT (username) DO UPDATE SET email = EXCLUDED.email;      -- PostgreSQL
INSERT OR REPLACE INTO users (username, email) VALUES ('alice', 'new@mail.com');  -- SQLite
```

### SELECT

```sql
-- Basic
SELECT * FROM users;
SELECT username, email FROM users;

-- WHERE
SELECT * FROM users WHERE age >= 18 AND is_active = TRUE;
SELECT * FROM users WHERE age BETWEEN 20 AND 30;
SELECT * FROM users WHERE username IN ('alice', 'bob', 'carol');
SELECT * FROM users WHERE email IS NULL;

-- Pattern matching
SELECT * FROM users WHERE username LIKE 'a%';       -- starts with 'a'
SELECT * FROM users WHERE email LIKE '%@gmail.com';
SELECT * FROM users WHERE username ILIKE 'ALI%';    -- PostgreSQL case-insensitive

-- ORDER BY
SELECT * FROM users ORDER BY created_at DESC;
SELECT * FROM users ORDER BY age ASC, username ASC;

-- LIMIT / OFFSET
SELECT * FROM users LIMIT 10;
SELECT * FROM users ORDER BY id LIMIT 10 OFFSET 20;   -- page 3 (page size 10)
SELECT * FROM users ORDER BY id LIMIT 20, 10;          -- MySQL: offset 20, limit 10

-- DISTINCT
SELECT DISTINCT city FROM users;
SELECT COUNT(DISTINCT city) FROM users;
```

### UPDATE

```sql
UPDATE users SET email = 'new@mail.com' WHERE id = 1;
UPDATE users SET is_active = FALSE, balance = 0 WHERE last_login < '2025-01-01';
UPDATE users SET balance = balance + 100 WHERE is_active = TRUE;
```

### DELETE

```sql
DELETE FROM users WHERE id = 1;
DELETE FROM users WHERE is_active = FALSE AND created_at < '2024-01-01';
DELETE FROM users;   -- Remove all rows (slow, logged, triggers fire)
```

---

## 5. Joins

```
  INNER JOIN          LEFT JOIN           RIGHT JOIN          FULL OUTER JOIN
  ┌─────┐┌─────┐     ┌─────┐┌─────┐     ┌─────┐┌─────┐     ┌─────┐ ┌─────┐
  │  A  ████  B  │     │  A  ████████  │     │  ██████████ B  │     │  A  ████████  B  │
  │     └┘└     │     │     └┘└     │     │     └┘└     │     │     └ ┘└     │
  └─────────────┘     └─────────────┘     └─────────────┘     └─────────────┘
   matching rows       all A + match       all B + match       all rows from both
```

### Examples (using `users` and `orders` tables)

```sql
-- INNER JOIN: only rows with matches in both tables
SELECT u.username, o.total
FROM users u
INNER JOIN orders o ON u.id = o.user_id;

-- LEFT JOIN: all users, with orders if they exist (NULL if none)
SELECT u.username, o.total
FROM users u
LEFT JOIN orders o ON u.id = o.user_id;

-- RIGHT JOIN: all orders, with user info if it exists
SELECT u.username, o.total
FROM users u
RIGHT JOIN orders o ON u.id = o.user_id;

-- FULL OUTER JOIN: all rows from both tables (not supported in MySQL)
SELECT u.username, o.total
FROM users u
FULL OUTER JOIN orders o ON u.id = o.user_id;

-- CROSS JOIN: every combination (cartesian product)
SELECT u.username, p.name
FROM users u
CROSS JOIN products p;

-- SELF JOIN: join a table to itself
SELECT e.name AS employee, m.name AS manager
FROM employees e
LEFT JOIN employees m ON e.manager_id = m.id;

-- Multiple joins
SELECT u.username, o.total, p.name
FROM users u
INNER JOIN orders o ON u.id = o.user_id
INNER JOIN order_items oi ON o.id = oi.order_id
INNER JOIN products p ON oi.product_id = p.id;
```

### LEFT JOIN to find rows with NO match

```sql
-- Users who have never placed an order
SELECT u.username
FROM users u
LEFT JOIN orders o ON u.id = o.user_id
WHERE o.id IS NULL;
```

---

## 6. Aggregation

```sql
-- Basic aggregates
SELECT COUNT(*) FROM users;
SELECT COUNT(email) FROM users;           -- counts non-NULL
SELECT SUM(balance) FROM users;
SELECT AVG(age) FROM users;
SELECT MIN(created_at), MAX(created_at) FROM users;

-- GROUP BY
SELECT city, COUNT(*) AS user_count, AVG(age) AS avg_age
FROM users
GROUP BY city;

-- GROUP BY with multiple columns
SELECT city, is_active, COUNT(*)
FROM users
GROUP BY city, is_active;

-- HAVING (filter after aggregation — WHERE filters before)
SELECT city, COUNT(*) AS cnt
FROM users
GROUP BY city
HAVING COUNT(*) > 10;

-- Full example
SELECT city,
       COUNT(*) AS total_users,
       SUM(CASE WHEN is_active THEN 1 ELSE 0 END) AS active_users,
       ROUND(AVG(balance), 2) AS avg_balance
FROM users
WHERE age >= 18
GROUP BY city
HAVING COUNT(*) > 5
ORDER BY total_users DESC
LIMIT 10;
```

---

## 7. Subqueries

```sql
-- In WHERE (scalar subquery)
SELECT * FROM users
WHERE age > (SELECT AVG(age) FROM users);

-- In WHERE (list subquery)
SELECT * FROM orders
WHERE user_id IN (SELECT id FROM users WHERE is_active = TRUE);

-- EXISTS
SELECT * FROM users u
WHERE EXISTS (SELECT 1 FROM orders o WHERE o.user_id = u.id);

-- NOT EXISTS
SELECT * FROM users u
WHERE NOT EXISTS (SELECT 1 FROM orders o WHERE o.user_id = u.id);

-- In FROM (derived table)
SELECT city, avg_age
FROM (
    SELECT city, AVG(age) AS avg_age
    FROM users
    GROUP BY city
) AS city_stats
WHERE avg_age > 30;

-- CTE (Common Table Expression) — cleaner alternative to derived tables
WITH active_users AS (
    SELECT * FROM users WHERE is_active = TRUE
),
user_orders AS (
    SELECT user_id, COUNT(*) AS order_count
    FROM orders
    GROUP BY user_id
)
SELECT au.username, COALESCE(uo.order_count, 0) AS orders
FROM active_users au
LEFT JOIN user_orders uo ON au.id = uo.user_id
ORDER BY orders DESC;

-- Recursive CTE (e.g., org chart)
WITH RECURSIVE org AS (
    SELECT id, name, manager_id, 1 AS level
    FROM employees WHERE manager_id IS NULL
    UNION ALL
    SELECT e.id, e.name, e.manager_id, o.level + 1
    FROM employees e JOIN org o ON e.manager_id = o.id
)
SELECT * FROM org ORDER BY level;
```

---

## 8. Indexes

```sql
-- Create index
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_city_age ON users(city, age);   -- composite

-- Unique index
CREATE UNIQUE INDEX idx_users_username ON users(username);

-- Partial index (PostgreSQL)
CREATE INDEX idx_active_users ON users(email) WHERE is_active = TRUE;

-- Expression index (PostgreSQL)
CREATE INDEX idx_lower_email ON users(LOWER(email));

-- Drop index
DROP INDEX idx_users_email;                       -- PostgreSQL, SQLite
DROP INDEX idx_users_email ON users;              -- MySQL

-- Show indexes
SHOW INDEX FROM users;                            -- MySQL
\di                                               -- psql
```

**When to index:**

- Columns used in `WHERE`, `JOIN`, `ORDER BY`, `GROUP BY`
- High-cardinality columns (many distinct values)
- Avoid over-indexing — indexes slow down writes

---

## 9. String Functions

```sql
-- Concatenation
CONCAT(first_name, ' ', last_name)                           -- MySQL, PostgreSQL
first_name || ' ' || last_name                               -- PostgreSQL, SQLite

-- Substring
SUBSTRING(email, 1, 4)                                       -- first 4 chars
SUBSTRING(email FROM POSITION('@' IN email) + 1)             -- domain part (PostgreSQL)

-- Case
UPPER(username)
LOWER(username)

-- Length
LENGTH(username)
CHAR_LENGTH(username)                                         -- same as LENGTH in most cases

-- Trim
TRIM('  hello  ')                    -- both sides
LTRIM('  hello')                     -- left
RTRIM('hello  ')                     -- right

-- Replace
REPLACE(email, '@old.com', '@new.com')

-- Pattern matching
WHERE email LIKE '%@gmail.com'        -- % = any chars, _ = single char
WHERE username REGEXP '^[a-z]+'       -- MySQL regex
WHERE username ~ '^[a-z]+'            -- PostgreSQL regex
WHERE username ~* '^[a-z]+'           -- PostgreSQL case-insensitive regex

-- Other useful
LEFT(str, n)                          -- first n chars (MySQL, PostgreSQL)
RIGHT(str, n)                         -- last n chars
REVERSE(str)                          -- reverse string
LPAD(str, len, pad)                   -- left-pad to length
RPAD(str, len, pad)                   -- right-pad to length
```

---

## 10. Date Functions

```sql
-- Current date/time
NOW()                                -- current timestamp
CURRENT_DATE                         -- current date
CURRENT_TIMESTAMP                    -- same as NOW()

-- Extract parts
YEAR(created_at)
MONTH(created_at)
DAY(created_at)
EXTRACT(YEAR FROM created_at)        -- PostgreSQL standard
DATE_PART('year', created_at)        -- PostgreSQL

-- Format (MySQL)
DATE_FORMAT(created_at, '%Y-%m-%d')
DATE_FORMAT(created_at, '%Y-%m-%d %H:%i:%s')
DATE_FORMAT(created_at, '%M %D, %Y')

-- Format (PostgreSQL)
TO_CHAR(created_at, 'YYYY-MM-DD')
TO_CHAR(created_at, 'YYYY-MM-DD HH24:MI:SS')

-- Arithmetic
DATE_ADD(NOW(), INTERVAL 7 DAY)                        -- MySQL
NOW() - INTERVAL '7 days'                               -- PostgreSQL
DATE(created_at)                                         -- cast to date

-- Difference
DATEDIFF('2025-12-31', '2025-01-01')                    -- MySQL: days between
created_at - INTERVAL '30 days'                          -- PostgreSQL

-- SQLite (limited built-in date functions)
DATE('now')
DATE('now', '+7 days')
STRFTIME('%Y-%m-%d', created_at)
```

---

## 11. Advanced

### UNION

```sql
-- Combine result sets (removes duplicates)
SELECT city FROM users
UNION
SELECT city FROM suppliers;

-- Keep duplicates
SELECT city FROM users
UNION ALL
SELECT city FROM suppliers;
```

### CASE WHEN

```sql
SELECT username,
       CASE
           WHEN age < 18 THEN 'minor'
           WHEN age BETWEEN 18 AND 65 THEN 'adult'
           ELSE 'senior'
       END AS age_group
FROM users;

-- CASE in aggregation
SELECT
    COUNT(*) AS total,
    SUM(CASE WHEN is_active THEN 1 ELSE 0 END) AS active,
    SUM(CASE WHEN NOT is_active THEN 1 ELSE 0 END) AS inactive
FROM users;
```

### Views

```sql
-- Create view
CREATE VIEW active_users AS
    SELECT id, username, email FROM users WHERE is_active = TRUE;

-- Use view
SELECT * FROM active_users;

-- Create or replace
CREATE OR REPLACE VIEW active_users AS ...      -- PostgreSQL, MySQL

-- Drop view
DROP VIEW IF EXISTS active_users;
```

### Transactions

```sql
-- Standard (PostgreSQL, SQLite)
BEGIN;
UPDATE accounts SET balance = balance - 100 WHERE id = 1;
UPDATE accounts SET balance = balance + 100 WHERE id = 2;
COMMIT;
-- or ROLLBACK; to undo

-- MySQL
START TRANSACTION;
-- ... statements ...
COMMIT;
-- or ROLLBACK;

-- Savepoint (partial rollback)
BEGIN;
UPDATE accounts SET balance = balance - 100 WHERE id = 1;
SAVEPOINT after_debit;
UPDATE accounts SET balance = balance + 100 WHERE id = 2;
-- If something went wrong:
ROLLBACK TO SAVEPOINT after_debit;
COMMIT;
```

### Window Functions

```sql
-- Row number
SELECT username, ROW_NUMBER() OVER (ORDER BY balance DESC) AS rank
FROM users;

-- Rank with partition
SELECT username, city, balance,
       RANK() OVER (PARTITION BY city ORDER BY balance DESC) AS city_rank
FROM users;

-- Running total
SELECT username, created_at, balance,
       SUM(balance) OVER (ORDER BY created_at) AS running_total
FROM users;

-- Lag / Lead
SELECT date, revenue,
       revenue - LAG(revenue) OVER (ORDER BY date) AS daily_change
FROM daily_sales;
```

---

## 12. CLI-Specific Tips

### PostgreSQL (psql) Meta-Commands

```
\l                    List databases
\c dbname             Connect to database
\dt                   List tables
\dt+                  List tables with sizes
\d tablename          Describe table (columns, types, indexes, constraints)
\d+ tablename         Extended description (with storage info)
\du                   List roles/users
\dn                   List schemas
\df                   List functions
\di                   List indexes
\dv                   List views
\dx                   List extensions
\timing               Toggle query timing
\x                    Toggle expanded display (vertical)
\q                    Quit
\! command            Run shell command
\i file.sql           Execute SQL file
\copy                 Import/export (uses client, not server)
\?                    Help on meta-commands
\h SQL_COMMAND        Help on SQL command
\pset format          Set output format (aligned, html, latex, etc.)
```

### MySQL CLI

```sql
-- System commands (no semicolon needed)
SHOW DATABASES;
SHOW TABLES;
SHOW TABLES LIKE 'user%';
DESCRIBE users;                        -- or: DESC users;
SHOW CREATE TABLE users;
SHOW COLUMNS FROM users;
SHOW INDEX FROM users;
SHOW PROCESSLIST;
SHOW STATUS;
SHOW VARIABLES LIKE 'max_connections';
SELECT VERSION();
SELECT USER();
SELECT NOW();

-- Ctrl+C   cancel current query
-- Ctrl+D   exit
```

### SQLite CLI

```
.tables                    List tables
.tables pattern            List tables matching pattern
.schema                    Show all CREATE statements
.schema tablename          Show CREATE for one table
.headers on                Show column headers
.mode csv                  CSV output mode
.mode column               Column-aligned output
.mode list                 List mode (default, pipe-separated)
.mode insert TABLE         Generate INSERT statements
.separator ,               Set separator for list mode
.nullvalue NULL            Display text for NULLs
.timer on                  Show query timing
.width 10 20 30            Set column widths
.read file.sql             Execute SQL file
.dump                      Dump entire database as SQL
.output file.txt           Send output to file
.stdout                    Reset output to stdout
.import file.csv tablename Import CSV into table
.help                      Show all dot-commands
.quit                      Quit
```

---

## 13. Import / Export

### MySQL

```bash
# Dump entire database
mysqldump -u root -p mydb > mydb_backup.sql

# Dump single table
mysqldump -u root -p mydb users > users_backup.sql

# Dump with gzip
mysqldump -u root -p mydb | gzip > mydb_backup.sql.gz

# Restore from dump
mysql -u root -p mydb < mydb_backup.sql

# Export CSV (from CLI)
mysql -u root -p -e "
    SELECT * FROM users INTO OUTFILE '/tmp/users.csv'
    FIELDS TERMINATED BY ','
    ENCLOSED BY '\"'
    LINES TERMINATED BY '\n';
" mydb

-- Or from within mysql client:
SELECT * FROM users
INTO OUTFILE '/tmp/users.csv'
FIELDS TERMINATED BY ',' ENCLOSED BY '"' LINES TERMINATED BY '\n';

-- Load CSV
LOAD DATA INFILE '/tmp/users.csv'
INTO TABLE users
FIELDS TERMINATED BY ',' ENCLOSED BY '"' LINES TERMINATED BY '\n'
IGNORE 1 ROWS;
```

### PostgreSQL

```bash
# Dump database (custom format, compressed)
pg_dump -U postgres -F c mydb > mydb_backup.dump

# Dump as plain SQL
pg_dump -U postgres mydb > mydb_backup.sql

# Dump all databases
pg_dumpall -U postgres > all_dbs.sql

# Restore from custom dump
pg_restore -U postgres -d mydb mydb_backup.dump

# Restore plain SQL
psql -U postgres -d mydb < mydb_backup.sql
```

```sql
-- Export CSV (server-side, requires superuser usually)
COPY users TO '/tmp/users.csv' WITH CSV HEADER;

-- Export CSV (client-side, no superuser needed)
\copy users TO '/tmp/users.csv' WITH CSV HEADER;

-- Export specific columns
\copy (SELECT username, email FROM users WHERE is_active) TO '/tmp/active.csv' WITH CSV HEADER;

-- Import CSV
\copy users FROM '/tmp/users.csv' WITH CSV HEADER;
```

### SQLite

```bash
# Export entire database as SQL
sqlite3 mydb.db .dump > backup.sql

# Export to CSV
sqlite3 mydb.db <<EOF
.headers on
.mode csv
.output users.csv
SELECT * FROM users;
.quit
EOF

# Import CSV
sqlite3 mydb.db <<EOF
.mode csv
.import users.csv users
.quit
EOF

# Backup (safe copy)
sqlite3 mydb.db ".backup 'mydb_backup.db'"
```

---

## 14. Performance

### EXPLAIN & ANALYZE

```sql
-- View query plan (no execution)
EXPLAIN SELECT * FROM users WHERE email = 'test@example.com';

-- Execute and show actual timings (PostgreSQL)
EXPLAIN ANALYZE SELECT * FROM users WHERE email = 'test@example.com';

-- MySQL
EXPLAIN SELECT * FROM users WHERE email = 'test@example.com';
EXPLAIN FORMAT=JSON SELECT * FROM users WHERE email = 'test@example.com';  -- detailed

-- SQLite
EXPLAIN QUERY PLAN SELECT * FROM users WHERE email = 'test@example.com';
```

**What to look for:**

- **Seq Scan** (full table scan) vs **Index Scan** — index scan is usually faster
- **Join strategy** — Nested Loop, Hash Join, Merge Join
- **Estimated vs Actual rows** — large mismatch = stale statistics
- **Filter conditions** — which filters are applied and how selective they are

### Optimization Tips

```sql
-- Update statistics (PostgreSQL)
ANALYZE users;

-- Update statistics (MySQL)
ANALYZE TABLE users;

-- Show table sizes
-- PostgreSQL
SELECT relname AS table,
       pg_size_pretty(pg_total_relation_size(relid)) AS total_size
FROM pg_stat_user_tables ORDER BY pg_total_relation_size(relid) DESC;

-- MySQL
SELECT table_name,
       ROUND(data_length / 1024 / 1024, 2) AS data_mb,
       ROUND(index_length / 1024 / 1024, 2) AS index_mb
FROM information_schema.tables
WHERE table_schema = 'mydb'
ORDER BY data_length DESC;

-- Find slow queries (PostgreSQL)
SELECT query, calls, total_exec_time, mean_exec_time
FROM pg_stat_statements ORDER BY total_exec_time DESC LIMIT 10;

-- Find slow queries (MySQL)
SELECT * FROM mysql.slow_log ORDER BY start_time DESC LIMIT 10;
SHOW FULL PROCESSLIST;   -- see currently running queries
```

### Common Optimization Checklist

| Tip                      | Details                                            |
| ------------------------ | -------------------------------------------------- |
| Index WHERE/JOIN columns | Most impactful single change                       |
| Avoid `SELECT *`         | Fetch only needed columns                          |
| Use `LIMIT`              | Especially in exploration queries                  |
| Index foreign keys       | Speeds up JOINs and CASCADE deletes                |
| Use `EXPLAIN`            | Verify the optimizer uses your indexes             |
| Vacuum / Optimize        | `VACUUM` (PostgreSQL), `OPTIMIZE TABLE` (MySQL)    |
| Update statistics        | `ANALYZE` after bulk loads                         |
| Batch inserts            | Use multi-row INSERT or COPY instead of row-by-row |
| Connection pooling       | Avoid opening/closing connections per query        |
| Partitioning             | For very large tables (time-series, etc.)          |
| Avoid N+1 queries        | Fetch related data with JOINs, not loops           |

---

> **Quick reminder:** SQL keywords are case-insensitive (`SELECT` = `select`), but convention is UPPER CASE for keywords. Table/column names may be case-sensitive depending on the database and OS.
