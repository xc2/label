import { DummySpec } from "@109cafe/dummy-spec";
import { defineConfig } from "@rslib/core";
import { TargetQuery } from "./label/query";
const tripleSlashIndex = process.argv.indexOf("---");
let labels: string[] = [];
if (tripleSlashIndex > -1) {
  labels = process.argv.slice(tripleSlashIndex + 1).filter(Boolean);
}
if (labels.length === 0) {
  labels.push("//...");
}

const tq = new TargetQuery(new DummySpec(__dirname, { ignore: ["**/e2e/**", "**/dist/**"] }));
export default defineConfig(async () => {
  const targets = await tq.query(labels);
  console.log(targets);
  process.exit(1);
});
