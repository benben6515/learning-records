#!/bin/bash

# curl -i http://localhost:3322/notes

curl -i -X POST http://localhost:3322/notes \
  -H "Content-Type:application/json" \
  -d '{oops'

# curl -i -X POST http://localhost:3322/notes \
#   -H "Content-Type:application/json" \
#   -d '{"title":"buy coke"}'

# curl -i -X DELETE http://localhost:3322/notes/2
