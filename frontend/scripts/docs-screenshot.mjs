// Renders the card from the demo page in a real browser (Playwright), for two jobs:
//
//   npm run docs:screenshot            the picture for docs/dashboard-card.png
//   npm run check:visual               checks of the layout at a few widths and display scalings
//
// Playwright is not a dependency of the card (it is a big download), so install it when you need this:
//
//   npm install --no-save playwright && npx playwright install chromium
//
// Options:  --out <file>      where the docs picture goes (default ../docs/dashboard-card.png)
//           --width <px>      card width of the docs picture (default 488, where the hero tiles stack
//                             and Streak and Average per week sit side by side)
//           --scale <n>       pixel ratio of the docs picture (default 3)
//           --theme <name>    dark (default) or light
//           --pad <px>        dark margin around the card in the docs picture (default 72)
//           --yearly          draw the four pages of the yearly wrap side by side (default out ../docs/yearly-wrap.png,
//                             width 380, scale 2) instead of the whole card
//           --monthly         draw the running month and the four pages of a finished month side by side (default
//                             out ../docs/monthly-wrap.png, width 380, scale 2)
//           --check           run the visual checks instead; pictures land in .screenshots/
// Environment: CHROMIUM_PATH to use an installed browser instead of Playwright's, PORT for the demo server.
//
// Fonts: Home Assistant uses Roboto. If @fontsource/roboto is installed it is loaded (so the picture matches
// Home Assistant), otherwise the system's sans-serif is used. The icons come from the Material Design Icons
// font on a CDN; without internet access, install @mdi/font too (npm install --no-save @mdi/font) and it is
// served from node_modules instead.

import { spawn } from "node:child_process";
import { existsSync, mkdirSync, readFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const frontend = resolve(here, "..");
const args = process.argv.slice(2);
const flag = (name) => args.includes(`--${name}`);
const option = (name, fallback) => {
  const at = args.indexOf(`--${name}`);
  return at >= 0 && args[at + 1] ? args[at + 1] : fallback;
};

let chromium;
try {
  ({ chromium } = await import("playwright"));
} catch {
  console.error("Playwright is not installed. Run:\n  npm install --no-save playwright && npx playwright install chromium");
  process.exit(2);
}

const port = Number(process.env.PORT) || 5199;
const server = spawn(process.execPath, ["scripts/demo-server.mjs"], { cwd: frontend, env: { ...process.env, PORT: String(port) }, stdio: "ignore" });
const stop = () => server.kill();
process.on("exit", stop);
for (const signal of ["SIGINT", "SIGTERM"]) process.on(signal, () => process.exit(130));

const url = `http://localhost:${port}/`;
for (let i = 0; ; i++) {
  try {
    if ((await fetch(url)).ok) break;
  } catch {
    /* not up yet */
  }
  if (i > 50) throw new Error("the demo server did not start");
  await new Promise((r) => setTimeout(r, 100));
}

/** Roboto as @font-face rules with the files inlined, when @fontsource/roboto is installed. */
function robotoCss() {
  const dir = join(frontend, "node_modules", "@fontsource", "roboto", "files");
  const faces = [400, 500, 700].map((w) => ({ w, file: join(dir, `roboto-latin-${w}-normal.woff2`) })).filter((f) => existsSync(f.file));
  return faces
    .map((f) => `@font-face{font-family:Roboto;font-weight:${f.w};src:url(data:font/woff2;base64,${readFileSync(f.file).toString("base64")}) format("woff2")}`)
    .join("");
}

const browser = await chromium.launch(process.env.CHROMIUM_PATH ? { executablePath: process.env.CHROMIUM_PATH } : {});
const fonts = robotoCss();

/** Opens the demo at a card width and display scaling, and returns the page. */
async function open({ width, scale, theme = "dark", wrapYear = "never" }) {
  const page = await browser.newPage({ viewport: { width: Math.max(1000, width + 100), height: 1400 }, deviceScaleFactor: scale });
  const mdi = join(frontend, "node_modules", "@mdi", "font");
  if (existsSync(mdi)) {
    await page.route("**/cdn.jsdelivr.net/**", (route) => {
      const name = new URL(route.request().url()).pathname.split("/").pop();
      const file = join(mdi, name.endsWith(".css") ? "css" : "fonts", name);
      return existsSync(file) ? route.fulfill({ path: file, headers: { "access-control-allow-origin": "*" } }) : route.abort();
    });
  }
  const errors = [];
  page.on("pageerror", (e) => errors.push(String(e)));
  page.on("console", (m) => m.type() === "error" && !/Failed to load resource/.test(m.text()) && errors.push(m.text()));
  await page.goto(url);
  if (fonts) await page.addStyleTag({ content: fonts });
  await page.waitForSelector("refract-stats-card");
  await page.selectOption("#theme", theme);
  await page.selectOption("#wrapyear", wrapYear); // the Year button only shows in December and January, or when asked for
  await page.evaluate((w) => {
    const input = document.getElementById("width");
    input.value = String(w);
    input.dispatchEvent(new Event("input"));
  }, width);
  await page.waitForTimeout(1500); // fonts, icons and the poster images
  return { page, errors };
}

if (flag("yearly") || flag("monthly")) {
  const yearly = flag("yearly");
  const width = Number(option("width", 380));
  const scale = Number(option("scale", 2));
  const out = resolve(frontend, option("out", yearly ? "../docs/yearly-wrap.png" : "../docs/monthly-wrap.png"));
  const { page } = await open({ width, scale, theme: option("theme", "dark"), wrapYear: yearly ? "always" : "never" });
  const click = async (selector, index = 0) => {
    await page.evaluate(([s, i]) => document.querySelector("refract-stats-card").shadowRoot.querySelectorAll(s)[i].click(), [selector, index]);
    await page.waitForTimeout(300);
  };
  const shoot = async () => {
    const el = (await page.evaluateHandle(() => document.querySelector("refract-stats-card").shadowRoot.querySelector(".wrap-pages"))).asElement();
    return (await el.screenshot()).toString("base64");
  };
  const shots = [];
  if (yearly) await click(".wrap-view"); // the demo offers the Year button
  else {
    shots.push(await shoot()); // the running month
    await click(".wrap-arrow", 0); // back to the last finished month
  }
  for (let i = 0; i < 4; i++) {
    if (i) await click(".wrap-tap.next");
    shots.push(await shoot());
  }
  const gap = 24;
  const count = shots.length;
  const sheet = await browser.newPage({ viewport: { width: count * width + (count + 1) * gap, height: 400 }, deviceScaleFactor: scale });
  await sheet.setContent(
    `<body style="margin:0;background:#111"><div style="display:flex;gap:${gap}px;padding:${gap}px;align-items:flex-start">${shots
      .map((b) => `<img src="data:image/png;base64,${b}" style="width:${width}px">`)
      .join("")}</div></body>`,
  );
  await sheet.waitForTimeout(300);
  mkdirSync(dirname(out), { recursive: true });
  await sheet.screenshot({ path: out, fullPage: true });
  console.log(`wrote ${out}`);
} else if (!flag("check")) {
  const width = Number(option("width", 488));
  const scale = Number(option("scale", 3));
  const pad = Number(option("pad", 72));
  const out = resolve(frontend, option("out", "../docs/dashboard-card.png"));
  const { page } = await open({ width, scale, theme: option("theme", "dark") });
  mkdirSync(dirname(out), { recursive: true });
  // the card, then the dark margin around it
  const shot = await page.locator("#host").screenshot();
  const framed = await browser.newPage({ viewport: { width: 400, height: 400 }, deviceScaleFactor: scale });
  const dataUrl = `data:image/png;base64,${shot.toString("base64")}`;
  await framed.setContent(
    `<body style="margin:0;background:#111"><img id="i" src="${dataUrl}" style="display:block;margin:${pad / scale}px;width:${width}px"></body>`,
  );
  await framed.locator("#i").waitFor();
  await framed.setViewportSize({ width: width + 2 * (pad / scale), height: 400 });
  await framed.screenshot({ path: out, fullPage: true });
  console.log(`wrote ${out}`);
} else {
  const outDir = join(frontend, ".screenshots");
  mkdirSync(outDir, { recursive: true });
  const failures = [];
  for (const scale of [1, 1.25, 1.5]) {
    for (const width of [340, 380, 488]) {
      const label = `${width}px @${scale}x`;
      const { page, errors } = await open({ width, scale });
      const result = await page.evaluate(() => {
        const root = document.querySelector("refract-stats-card").shadowRoot;
        const problems = [];
        // content wider than its box is only a problem when it shows (a box that clips it on purpose is fine)
        const spills = (el) => !/^(hidden|clip)$/.test(getComputedStyle(el).overflowX) && el.scrollWidth > el.clientWidth + 1;
        const card = document.getElementById("host");
        if (spills(card)) problems.push("the card scrolls sideways");
        // the title tiles under the total watch time keep their label on one line (a longer label would
        // wrap and make the whole row taller)
        for (const grid of root.querySelectorAll(".tiles")) {
          for (const tile of grid.children) {
            const label = tile.querySelector(".label, .muted");
            if (label) {
              const style = getComputedStyle(label);
              const line = parseFloat(style.lineHeight) || parseFloat(style.fontSize) * 1.4;
              if (label.getBoundingClientRect().height > line * 1.5) problems.push(`a tile label wraps: ${label.textContent.trim()}`);
            }
            if (spills(tile)) problems.push(`a tile's text overflows: ${tile.textContent.trim().replace(/\s+/g, " ")}`);
          }
        }
        for (const panel of root.querySelectorAll(".panel")) {
          if (spills(panel)) problems.push(`a panel scrolls sideways: ${panel.className}`);
        }
        return problems;
      });
      for (const e of errors) result.push(`console error: ${e}`);
      for (const bar of [".stack", ".status-bar"]) {
        const el = await page.evaluateHandle((s) => document.querySelector("refract-stats-card").shadowRoot.querySelector(s), bar);
        const element = el.asElement();
        if (element) await element.screenshot({ path: join(outDir, `${bar.slice(1)}-${width}-${scale}x.png`) });
      }
      await page.locator("#host").screenshot({ path: join(outDir, `card-${width}-${scale}x.png`) });
      console.log(`${result.length ? "FAIL" : "ok  "} ${label}${result.length ? `\n     ${result.join("\n     ")}` : ""}`);
      if (result.length) failures.push(label);
      await page.close();
    }
  }
  console.log(`pictures in ${outDir}`);
  await browser.close();
  stop();
  process.exit(failures.length ? 1 : 0);
}

await browser.close();
stop();
