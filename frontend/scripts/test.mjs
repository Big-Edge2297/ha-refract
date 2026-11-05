import { build } from "esbuild";
import { readdirSync, rmSync } from "node:fs";
import { spawnSync } from "node:child_process";

rmSync(".test-build", { recursive: true, force: true });
const entries = readdirSync("test")
  .filter((f) => f.endsWith(".test.ts"))
  .map((f) => `test/${f}`);

await build({
  entryPoints: entries,
  outdir: ".test-build",
  bundle: true,
  format: "esm",
  platform: "browser", // resolves lit's browser build; jsdom provides the DOM
  target: "es2022",
  external: ["jsdom", "node:*"],
  outExtension: { ".js": ".mjs" },
  define: { __VERSION__: '"test"' },
  logLevel: "warning",
});

const built = readdirSync(".test-build")
  .filter((f) => f.endsWith(".mjs"))
  .map((f) => `.test-build/${f}`);
const run = spawnSync(process.execPath, ["--test", ...built], { stdio: "inherit" });
process.exit(run.status ?? 1);
