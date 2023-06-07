# node notes

## performance

### cluster

```md
master
  => worker
  => worker
  => ...
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
