import { DummyQuery } from "@109cafe/dummy";
import { type LibConfig, defineConfig } from "@rslib/core";
const tripleSlashIndex = process.argv.indexOf("--");
let labels: string[] = [];
if (tripleSlashIndex > -1) {
  labels = process.argv.slice(tripleSlashIndex + 1).filter(Boolean);
}
if (labels.length === 0) {
  labels.push("//...");
}

const tq = new DummyQuery(__dirname, { ignore: ["**/e2e/**", "**/dist/**"] });
export default defineConfig(async () => {
  const targets = await tq.query(labels);
  const rslibConfigs = Object.values(targets)
    .map<LibConfig>((v: any) => v.rule)
    .filter(Boolean);
  return { lib: rslibConfigs };
});
