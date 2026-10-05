#!/bin/bash

PORT=3322

# curl -i http://localhost:$PORT/notes

# curl -i -X POST http://localhost:$PORT/notes \
#   -H "Content-Type:application/json" \
#   -d '{oops'

curl -i -X POST http://localhost:$PORT/notes \
  -H "Content-Type:application/json" \
  -d '{"title":"buy coke"}'

# curl -i -X DELETE http://localhost:$PORT/notes/2

# curl -i -X PUT http://localhost:$PORT/notes/7 \
#   -H "Content-Type:application/json" \
#   -d '{"title":"buy book"}'

# curl -i -X POST http://localhost:$PORT/notes \
#   -H "content-type:application/json" \
#   -d '{"title":"a\"); DROP TABLE notes;--"}'

# ------ auth ------
SID=f03c355a8cedb1a9f9fe4f1e128604fa7f1ecf036b43d1a0c91cb2b3dd06104f
# curl -i -X POST http://localhost:$PORT/auth/register \
#   -H "content-type: application/json" \
#   -d '{"email":"admin@test.dev","password":"admin"}'
#
# curl -i -X POST http://localhost:$PORT/auth/login \
#   -H "content-type: application/json" \
#   -d '{"email":"admin@test.dev","password":"admin"}'

# curl -i -b "sid=$SID" http://localhost:$PORT/auth/me

curl -i -b "sid=$SID" http://localhost:$PORT/notes

# curl -i -X POST http://localhost:$PORT/notes \
#   -b "sid=$SID" \
#   -H "Content-Type:application/json" \
#   -d '{"title":"buy coke"}'
