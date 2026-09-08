#!/bin/bash

PORT=3322

# curl -i http://localhost:$PORT/notes

# curl -i -X POST http://localhost:$PORT/notes \
#   -H "Content-Type:application/json" \
#   -d '{oops'

# curl -i -X POST http://localhost:$PORT/notes \
#   -H "Content-Type:application/json" \
#   -d '{"title":"buy coke"}'

# curl -i -X DELETE http://localhost:$PORT/notes/2

curl -i -X PUT http://localhost:$PORT/notes/7 \
  -H "Content-Type:application/json" \
  -d '{"title":"buy book"}'

# curl -i -X POST http://localhost:$PORT/notes \
#   -H "content-type:application/json" \
#   -d '{"title":"a\"); DROP TABLE notes;--"}'
