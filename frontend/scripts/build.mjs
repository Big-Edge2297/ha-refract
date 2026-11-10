import { build, context } from "esbuild";
import { readFileSync } from "node:fs";

const pkg = JSON.parse(readFileSync(new URL("../package.json", import.meta.url), "utf8"));
const options = {
  entryPoints: ["src/index.ts"],
  bundle: true,
  minify: true,
  format: "esm",
  target: "es2021",
  legalComments: "none",
  loader: { ".woff2": "dataurl" },
  outfile: "../custom_components/refract/www/refract-stats-card.js",
  define: { __VERSION__: JSON.stringify(pkg.version) },
  logLevel: "info",
};

if (process.argv.includes("--watch")) {
  const ctx = await context(options);
  await ctx.watch();
  console.log("Watching src/ for changes…");
} else {
  await build(options);
}
