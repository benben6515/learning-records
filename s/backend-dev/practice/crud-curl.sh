#!/bin/bash

PORT=3322

curl -i http://localhost:$PORT/notes # 200 []
curl -i -X POST -H "content-type: application/json" \
  -d '{"title":"buy milk"}' http://localhost:$PORT/notes # 201 {id:1,…}
curl -i http://localhost:$PORT/notes/1                   # 200 / 404
curl -i -X POST -d '{}' http://localhost:$PORT/notes     # 400 驗證
curl -i -X POST -d '{oops' http://localhost:$PORT/notes  # 500 防護網
curl -i -X DELETE http://localhost:$PORT/notes/1         # 204 無內文
