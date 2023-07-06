# node notes

## performance

### cluster

```md
master
=> fork() / worker
=> fork() / worker
=> fork() / worker
=> ...

3 instances of Node
1 process
```

- round robin
  - round one by one, that's pretty much
- load balancing
  - distribute request to different services
- horizontal scaling, vertical scaling

### pm2

- pm2: process manage 2
  - using cluster under the hood

```sh
pm2 ls
pm2 start src/server.js
pm2 delete server

pm2 start server.js -i 2 # i for instance
pm2 start server.js -i max

pm2 logs
pm2 start server.js -l log.txt # l for logs

pm2 show PID
pm2 monit

pm2 restart server
pm2 reload server # 0 runtime restart
```

### worker threads

JavaScript don't have multi-treading feature

worker_threads in node.js are based on the `web worker api` and v8 isolated

```md
main tread
=> new work() / worker thread
=> new work() / worker thread
=> new work() / worker thread
=> ...

3 instances of Node
1 process
share memory with others
```

## database

- SQL

### 5 main database

structure query language

1. Relational (MySQL ...)
2. Document (MongoDB ...)
3. Key Value
4. Graph
5. Wide Columnar

- query

```sql
SELECT * FROM uses
WHERE id = 1
```

- Imperative vs Declarative
  - Declarative: What it happen
  - Imperative: How it happen
  - they can both exist (like Python)
- SQL standard
  - SQL86 => SQL98 => ... => SQL2008 => SQL2011 => ...
- Tables: like sheet
- Columns: vertical line, include table head, column type
- Rows: horizontal line, a set of attributes
- Primary Key and Foreign Key
  - a foreign key is a reference to another primary key
- Relational vs NoSQL vs MongoBD Databases
  - need know pros and cons, and design your scheme
- Scalability
- Sharding
  - split and manger multiple database

### comparing sql vs no-sql

|                | MongoDB              | Postgres           |
| -------------- | -------------------- | ------------------ |
| Type           | Document             | Relational         |
| Organized into | Document             | Tables             |
| Query Language | NoSQL                | SQL                |
| Scaling        | Primarily horizontal | Primarily vertical |
| Scheme         | Flexible             | Rigid              |

- requirements
  1. data need to persist between restarts
  2. api nee ds to be stateless for cluster mode
- ACID
  - atomicity
  - consistency
  - isolation
  - durability
- transaction
- more and more new JavaScript build with MongoDB

### mongoose

```md
node
-(Queries)-> Model
-(Uses)-> Schemes
-(Maps to)-> Collection
-(Has many)-> Document
```

```md
web browser

> http
> web application
> http
> node api
> mongodb driver
> database
```

- ObjectID

  - `_id`: it can be parse to timestamp
  - `__v`: auto created by mongo, version key

- referential integrity
- using auto increament id

  - ex:

  ```sql
  CREATE TABLE animals (
    id MEDIUMINT NOT NULL AUTO_INCREMENT,
    name CHAR(30) NOT NULL,
    PRIMARY KEY (id)
  );
  ```
