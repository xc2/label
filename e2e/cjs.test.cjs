const { expect, test } = require("bun:test");
test("should work with cjs", () => {
  const a = require("../dist");
  expect(a.parse).toBeTruthy();
});
