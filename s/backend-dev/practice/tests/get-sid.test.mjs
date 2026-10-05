import test from "node:test"
import assert from "node:assert/strict"
import { getSid } from "../utils/index.mjs"

test("returns the sid when a decoy cookie merely starts with sid", () => {
  const req = { headers: { cookie: "sidebar=hide; sid=the-real-one" } }
  assert.equal(getSid(req), "the-real-one")
})

test("returns undefined when no cookie header exists", () => {
  assert.equal(getSid({ headers: {} }), undefined)
})
