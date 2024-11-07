const { expect, test } = require("bun:test");
test("should work with cjs", () => {
  const a = require("../dist/label");
  expect(a.parse).toBeTruthy();
});
