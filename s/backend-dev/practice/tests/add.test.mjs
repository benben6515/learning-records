import test from "node:test"
import assert from "node:assert/strict"

const add = (a, b) => a + b

test("add: 3, 5, sould be 8", () => {
  assert.equal(add(3, 5), 8)
})

test("add: '1', 2, sould be '12'", () => {
  assert.equal(add('1', 2), '12')
})
