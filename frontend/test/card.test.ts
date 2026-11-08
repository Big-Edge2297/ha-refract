import assert from "node:assert/strict";
import { beforeEach, test } from "node:test";
import { JSDOM } from "jsdom";

const dom = new JSDOM("<!doctype html><html><body></body></html>", { url: "http://localhost/" });
for (const key of Object.getOwnPropertyNames(dom.window)) {
  if (!(key in globalThis)) (globalThis as any)[key] = (dom.window as any)[key];
}
(globalThis as any).window = dom.window;
(globalThis as any).document = dom.window.document;
(globalThis as any).customElements = dom.window.customElements;
(globalThis as any).HTMLElement = dom.window.HTMLElement;
// Node ships its own Event/CustomEvent; jsdom elements need jsdom's.
(globalThis as any).Event = dom.window.Event;
(globalThis as any).CustomEvent = dom.window.CustomEvent;

const { RefractStatsCard } = await import("../src/refract-stats-card");
await import("../src/editor");
const { makeHass, PREFIX, last7Days, catchUpShows, westworld, states: baseStates } = await import("./fixture");
const { weekdayName } = await import("../src/format");
const { resolveLayout } = await import("../src/types");

type Card = InstanceType<typeof RefractStatsCard>;
const ENTITY = `sensor.${PREFIX}next_up`;

const BARS = { library_style: "bar", watch_time_style: "bar" };

async function mount(config: Record<string, unknown>, hass = makeHass()): Promise<Card> {
  const el = document.createElement("refract-stats-card") as Card;
  el.setConfig({ type: "custom:refract-stats-card", entity: ENTITY, ...config } as any);
  el.hass = hass;
  document.body.appendChild(el);
  await el.updateComplete;
  return el;
}
const text = (el: Card) => (el.shadowRoot!.querySelector("ha-card")?.textContent ?? "").replace(/\s+/g, " ").trim();
const click = async (el: Card, node: Element | null) => {
  assert.ok(node, "element to click exists");
  (node as HTMLElement).click();
  await el.updateComplete;
};

beforeEach(() => {
  document.body.innerHTML = "";
  window.localStorage.clear();
});

test("renders the hero with human durations", async () => {
  const el = await mount({ fun_stat_mode: "months" });
  const t = text(el);
  assert.match(t, /Refract Codex/);
  assert.match(t, /Total watch time 266 days 14 hours/);
  assert.match(t, /Library 896/);
  assert.match(t, /Movies seen 661/);
  assert.match(t, /Episodes watched 7,959/);
  assert.match(t, /That's about 8\.8 months of nonstop viewing/);
  assert.doesNotMatch(t, /383,908|298,044|78,542|7,322/, "raw minutes never reach the card");
});

test("library status bar and watch-time split", async () => {
  const el = await mount(BARS);
  const t = text(el);
  assert.match(t, /Library Watched · 803/);
  assert.match(t, /Up to Date · 23/);
  assert.match(t, /Watching · 3/);
  assert.match(t, /Plan to Watch · 63/);
  assert.match(t, /Other · 4/);
  assert.equal(el.shadowRoot!.querySelector("svg.donut"), null, "the donut is gone");
  assert.match(t, /206 d 23 h/);
  assert.match(t, /54 d 13 h/);
  assert.match(t, /5 d 2 h/);
  assert.match(t, /TV shows · 78%/);
  assert.match(t, /Movies · 20%/);
  assert.match(t, /Anime · 2%/);
});

function withStatuses(byStatus: Record<string, number>) {
  const key = `sensor.${PREFIX}library_total`;
  return makeHass({ states: { ...baseStates, [key]: { ...baseStates[key], attributes: { ...baseStates[key].attributes, by_status: byStatus } } } });
}

test("library shows every status Refract reports, including on hold and dropped", async () => {
  const el = await mount(BARS, withStatuses({ completed: 803, up_to_date: 23, in_progress: 3, planned: 64, on_hold: 2, dropped: 2 }));
  const t = text(el);
  assert.match(t, /Watched · 803/);
  assert.match(t, /Plan to Watch · 64/);
  assert.match(t, /On Hold · 2/);
  assert.match(t, /Dropped · 2/);
  assert.doesNotMatch(t, /Other/);
  assert.equal(el.shadowRoot!.querySelectorAll(".status-bar > span").length, 6);
  const legend = [...el.shadowRoot!.querySelectorAll(".status-legend .swatch")].map((x) => x.getAttribute("style"));
  assert.match(legend[4]!, /--c-on-hold/);
  assert.match(legend[5]!, /--c-dropped/);
});

test("library statuses: aliases merge, empty ones are skipped and unknown ones get a readable name", async () => {
  const el = await mount(BARS, withStatuses({ completed: 5, paused: 1, on_hold: 2, never: 0, "waiting-room": 3 }));
  const t = text(el);
  assert.match(t, /Watched · 5/);
  assert.match(t, /On Hold · 3/, "paused and on_hold are the same status");
  assert.match(t, /Waiting room · 3/);
  assert.doesNotMatch(t, /Never/);
});

test("library list style mirrors the Refract app's breakdown, with its wording and percentages", async () => {
  const el = await mount(
    { library_style: "list", watch_time_style: "bar" },
    withStatuses({ completed: 802, up_to_date: 23, in_progress: 3, planned: 64, on_hold: 2, dropped: 2 }),
  );
  const root = el.shadowRoot!;
  const rows = [...root.querySelectorAll(".stat-row")].map((r) => r.textContent!.replace(/\s+/g, " ").trim());
  assert.deepEqual(rows, ["Watched 802 90%", "Up to Date 23 3%", "Watching 3 0%", "Plan to Watch 64 7%", "On Hold 2 0%", "Dropped 2 0%"]);
  assert.equal(root.querySelectorAll(".status-bar > span").length, 6, "the bar stays on top");
  assert.equal(root.querySelector(".status-legend"), null, "no legend in list style");
  const dots = [...root.querySelectorAll(".stat-dot")].map((d) => d.getAttribute("style"));
  assert.match(dots[0]!, /--c-completed/);
  assert.match(dots[5]!, /--c-dropped/);
});

test("library list style also works without per-status data (older integration)", async () => {
  const el = await mount({ library_style: "list", watch_time_style: "bar" });
  const rows = [...el.shadowRoot!.querySelectorAll(".stat-row")].map((r) => r.textContent!.replace(/\s+/g, " ").trim());
  assert.equal(rows[0], "Watched 803 90%");
  assert.match(rows[rows.length - 1], /^Other 4 /);
});

test("watch time and library are breakdown lists by default, and the bar is one setting away", async () => {
  const t = await mount({});
  assert.ok(t.shadowRoot!.querySelectorAll(".stat-row").length > 6, "list rows for both");
  assert.equal(t.shadowRoot!.querySelector(".status-legend"), null);
  assert.ok((await mount(BARS)).shadowRoot!.querySelector(".status-legend"));
});

test("the library bar has a legend", async () => {
  const el = await mount(BARS);
  assert.ok(el.shadowRoot!.querySelector(".status-legend"));
  assert.equal(el.shadowRoot!.querySelector(".stat-row"), null);
});

const finishWith = (attributes: Record<string, unknown>, state = "100") =>
  makeHass({ states: { ...baseStates, [`sensor.${PREFIX}still_to_finish`]: { entity_id: "f", state, attributes } } });
const none = { count: 0, minutes: 0, episodes: 0, not_started: 0, started: 0, unknown_episodes: 0 };

test("still to finish shows just the total and a counter row per kind, with no extra wording", async () => {
  const el = await mount({});
  const panel = el.shadowRoot!.querySelector(".panel.finish")!;
  const t = panel.textContent!.replace(/\s+/g, " ").trim();
  assert.equal(t, "Still to finish 26 days 5 hours 26 movies to finish 2 d 2 h 37 TV shows to finish 24 d 3 h");
  assert.doesNotMatch(t, /non-stop|Estimate|Not counting|episodes|not started/, "no extra wording");
  assert.equal(panel.querySelector(".finish-hours, .finish-note, .finish-sub"), null);
  const rows = [...panel.querySelectorAll(".finish-row")].map((r) => r.textContent!.replace(/\s+/g, " ").trim());
  assert.deepEqual(rows, ["26 movies to finish 2 d 2 h", "37 TV shows to finish 24 d 3 h"]);
  assert.match(panel.querySelectorAll(".finish-time")[0].getAttribute("style")!, /--c-movies/);
  assert.match(panel.querySelectorAll(".finish-time")[1].getAttribute("style")!, /--c-shows/);
});

test("still to finish adds an anime row only when there is anime, and uses singular wording", async () => {
  const hass = finishWith({
    movies: { count: 1, minutes: 100 },
    shows: { ...none, count: 1, episodes: 1, not_started: 1, minutes: 40 },
    anime: { ...none, count: 2, episodes: 24, started: 2, minutes: 600 },
    estimated: false,
    unknown_episode_shows: 0,
  }, "740");
  const el = await mount({}, hass);
  const panel = el.shadowRoot!.querySelector(".panel.finish")!;
  const rows = [...panel.querySelectorAll(".finish-row")].map((r) => r.textContent!.replace(/\s+/g, " ").trim());
  assert.deepEqual(rows, ["1 movie to finish 1 h", "1 TV show to finish 40 min", "2 anime to finish 10 h"]);
});

test("still to finish stays quiet about shows without an episode count", async () => {
  const hass = finishWith({
    movies: { count: 0, minutes: 0 },
    shows: { ...none, count: 3, started: 1, not_started: 2, episodes: 6, unknown_episodes: 2, minutes: 240 },
    anime: none,
    estimated: true,
    unknown_episode_shows: 2,
  }, "240");
  const t = text(await mount({}, hass));
  assert.doesNotMatch(t, /Not counting|without an episode count/);
  assert.match(t, /3 TV shows to finish 4 h/);
});

test("still to finish copes with no time data, nothing left, a missing sensor and its switch", async () => {
  const noTime = await mount({}, finishWith({ movies: { count: 4 }, shows: { ...none, count: 0 }, anime: none, estimated: true }, "unknown"));
  assert.equal(noTime.shadowRoot!.querySelector(".panel.finish"), null, "an unknown state hides the section");

  const noMinutes = await mount({}, finishWith({ movies: { count: 4, minutes: null }, shows: none, anime: none, estimated: true, unknown_episode_shows: 0 }, "0"));
  const panel = noMinutes.shadowRoot!.querySelector(".panel.finish")!;
  assert.equal(panel.querySelector(".finish-total"), null);
  assert.match(panel.textContent!, /4 movies to finish/);

  const empty = await mount({}, finishWith({ movies: none, shows: none, anime: none, estimated: false, unknown_episode_shows: 0 }, "0"));
  assert.match(empty.shadowRoot!.querySelector(".panel.finish")!.textContent!, /Nothing left to finish/);

  const { [`sensor.${PREFIX}still_to_finish`]: _gone, ...rest } = baseStates;
  assert.equal((await mount({}, makeHass({ states: rest }))).shadowRoot!.querySelector(".panel.finish"), null, "older integration");
  assert.equal((await mount({ show_still_to_finish: false })).shadowRoot!.querySelector(".panel.finish"), null);
  assert.ok((await mount({ layout: "compact" })).shadowRoot!.querySelector(".panel.finish"), "compact shows it");
  assert.equal((await mount({ layout: "full", show_still_to_finish: false })).shadowRoot!.querySelector(".panel.finish") !== null, true, "full ignores the switches");
});

test("watch time breakdown list mirrors the library list: bar on top, one row per kind with time and share", async () => {
  const el = await mount({ watch_time_style: "list" });
  const root = el.shadowRoot!;
  const panel = [...root.querySelectorAll(".panel")].find((p) => p.querySelector(".label")?.textContent === "Watch time")!;
  const rows = [...panel.querySelectorAll(".stat-row")].map((r) => r.textContent!.replace(/\s+/g, " ").trim());
  assert.deepEqual(rows, ["TV shows 206 d 23 h 78%", "Movies 54 d 13 h 20%", "Anime 5 d 2 h 2%"]);
  assert.equal(panel.querySelectorAll(".stack > span").length, 3, "the bar stays on top");
  assert.equal(panel.querySelector(".watch-cols"), null, "no columns in list style");
  assert.match(panel.querySelectorAll(".stat-dot")[1].getAttribute("style")!, /--c-movies/);
});

test("watch time bar: percentage after the title with a dot, no brackets", async () => {
  const el = await mount(BARS);
  assert.ok(el.shadowRoot!.querySelector(".watch-cols"));
  assert.equal([...el.shadowRoot!.querySelectorAll(".panel")].filter((p) => p.querySelector(".label")?.textContent === "Watch time")[0].querySelector(".stat-row"), null);
  assert.match(text(el), /TV shows · 78%/);
});

test("the editor offers the watch time style and the still to finish switch", async () => {
  const editor = document.createElement("refract-stats-card-editor") as any;
  editor.setConfig({ type: "custom:refract-stats-card", entity: ENTITY, layout: "custom" });
  editor.hass = makeHass();
  document.body.appendChild(editor);
  await editor.updateComplete;
  const names: string[] = [];
  const walk = (schema: any[]) => schema.forEach((f) => (f.schema ? walk(f.schema) : names.push(f.name)));
  walk(editor.shadowRoot.querySelector("ha-form").schema);
  assert.ok(names.includes("watch_time_style") && names.includes("show_still_to_finish") && names.includes("library_style"));
});

test("the editor lists the settings in rows: layout and duration, watch time and library style, then the row counts", async () => {
  const editor = document.createElement("refract-stats-card-editor") as any;
  editor.setConfig({ type: "custom:refract-stats-card", entity: ENTITY });
  editor.hass = makeHass();
  document.body.appendChild(editor);
  await editor.updateComplete;
  const grid = editor.shadowRoot.querySelector("ha-form").schema.find((f: any) => f.type === "grid");
  assert.deepEqual(
    grid.schema.map((f: any) => f.name),
    ["layout", "duration_format", "watch_time_style", "library_style", "queue_length", "airing_length"],
  );
});

test("sections appear in the designed order", async () => {
  const t = text(await mount({ show_actions: false }));
  const order = ["Total watch time", "Watch time TV shows", "Library Watched", "Still to finish", "Streak", "Average per week", "Last 7 days", "Next up", "Catch-up backlog", "Airing this week"];
  const at = order.map((label) => t.indexOf(label));
  assert.ok(at.every((i) => i >= 0), `all sections render: ${at}`);
  assert.deepEqual([...at].sort((x, y) => x - y), at, "in order");
});

test("still to finish total looks exactly like Total watch time: same markup, written-out units, no accent color", async () => {
  const el = await mount({});
  const hero = el.shadowRoot!.querySelector(".hero-main .big")!;
  const finish = el.shadowRoot!.querySelector(".panel.finish .big")!;
  const norm = (n: Element) => n.textContent!.replace(/\s+/g, " ").trim();
  assert.equal(norm(hero), "266 days 14 hours");
  assert.equal(norm(finish), "26 days 5 hours");
  const shape = (n: Element) => [...n.querySelectorAll(".part")].map((p) => [...p.children].map((c) => c.className.trim()).join("|"));
  assert.deepEqual(shape(finish), shape(hero), "same part, number and unit structure");
  const css = String((RefractStatsCard as any).styles.cssText);
  assert.doesNotMatch(css, /\.finish-big\s+\.num/, "the numbers aren't recolored");
  assert.doesNotMatch(css, /\.finish-big\s+\.unit/, "the units aren't resized");
});

test("still to finish says days and hours in the other duration formats too", async () => {
  const hours = await mount({ duration_format: "hours" });
  assert.equal(hours.shadowRoot!.querySelector(".panel.finish .big")!.textContent!.replace(/\s+/g, " ").trim().replace(/\d+/, "N"), "N hours");
});

test("by default still to finish sits below the library and above the streak", async () => {
  const { resolveSectionOrder } = await import("../src/types");
  const order = resolveSectionOrder(undefined);
  assert.ok(order.indexOf("library") < order.indexOf("still_to_finish"));
  assert.ok(order.indexOf("still_to_finish") < order.indexOf("streak"));
  assert.equal(order.indexOf("still_to_finish") - order.indexOf("library"), 1, "right below the library");
  assert.equal(order.indexOf("streak") - order.indexOf("still_to_finish"), 1, "right above the streak");
});

test("streak and average sit side by side by default", async () => {
  const el = await mount({});
  const rows = [...el.shadowRoot!.querySelectorAll(".grid")];
  assert.equal(rows.length, 1);
  assert.match(rows[0].textContent!, /Streak.*Average per week/s);
});

test("section_order rearranges the sections", async () => {
  const el = await mount({
    show_actions: false,
    section_order: ["airing", "next_up", "hero", "average", "library"],
  });
  const t = text(el);
  const labels = ["Airing this week", "Next up", "Total watch time", "Average per week", "Library Watched", "Watch time TV shows", "Still to finish", "Streak", "Last 7 days", "Catch-up backlog"];
  const at = labels.map((label) => t.indexOf(label));
  assert.ok(at.every((i) => i >= 0), `all sections render: ${at}`);
  assert.deepEqual([...at].sort((x, y) => x - y), at, "listed sections first, the rest in the default order");
  assert.ok(t.indexOf("Refract Codex") < t.indexOf("Airing this week"), "header stays on top");
});

test("streak and average share a row only when they are neighbours", async () => {
  const together = await mount({ section_order: ["average", "streak"] });
  const rows = together.shadowRoot!.querySelectorAll(".grid");
  assert.equal(rows.length, 1);
  assert.match(rows[0].textContent!, /Average per week.*Streak/s);

  const apart = await mount({ section_order: ["streak", "library", "average"] });
  assert.equal(apart.shadowRoot!.querySelectorAll(".grid").length, 2, "one row each when separated");
});

test("section_order ignores unknown and duplicate entries and still honours show_* switches", async () => {
  const { resolveSectionOrder, SECTION_IDS } = await import("../src/types");
  assert.deepEqual(resolveSectionOrder(undefined), [...SECTION_IDS]);
  assert.deepEqual(resolveSectionOrder("nope"), [...SECTION_IDS]);
  const mixed = resolveSectionOrder(["airing", "bogus", "airing", "hero"]);
  assert.deepEqual(mixed.slice(0, 2), ["airing", "hero"]);
  assert.equal(mixed.length, SECTION_IDS.length);

  const t = text(await mount({ section_order: ["airing", "hero"], show_airing: false }));
  assert.doesNotMatch(t, /Airing this week/);
  assert.match(t, /Total watch time/);
});

test("compact ignores section_order and the switches; custom follows both", async () => {
  const compact = text(await mount({ layout: "compact", section_order: ["next_up", "hero"], show_hero: false }));
  const at = ["Total watch time", "Still to finish", "Next up"].map((l) => compact.indexOf(l));
  assert.deepEqual([...at].sort((x, y) => x - y), at, "default order");
  assert.ok(at.every((i) => i >= 0));
  const custom = text(await mount({ layout: "custom", section_order: ["next_up", "streak", "hero"], show_still_to_finish: false }));
  const c = ["Next up", "Streak", "Total watch time"].map((l) => custom.indexOf(l));
  assert.ok(c.every((i) => i >= 0), `custom sections render: ${c}`);
  assert.deepEqual([...c].sort((x, y) => x - y), c);
  assert.doesNotMatch(custom, /Still to finish/);
});

test("the fun stat is a highlighted pill under the big number", async () => {
  const el = await mount({ fun_stat_mode: "months" });
  const fun = el.shadowRoot!.querySelector(".hero-main .fun");
  assert.ok(fun, "inside the main hero block");
  assert.match(fun!.textContent!, /8\.8 months of nonstop viewing/);
  const off = await mount({ fun_stat: false });
  assert.equal(off.shadowRoot!.querySelector(".fun"), null);
});

test("next up", async () => {
  const el = await mount({});
  const t = text(el);
  assert.match(t, /Next up Westworld 2016/);
  assert.match(t, /S1 E7 · Trompe L'Oeil/);
  assert.match(t, /6 of 36 aired episodes/);
  assert.match(t, /30 remaining/);
  assert.equal(el.shadowRoot!.querySelector(".poster"), null, "no poster without a TMDB key");
});

test("streak is always dots, with the longest streak underneath", async () => {
  const el = await mount({});
  assert.equal(el.shadowRoot!.querySelector("svg.gauge"), null);
  assert.equal(el.shadowRoot!.querySelectorAll(".dot").length, 7);
  assert.match(text(el), /Streak 6 days/);
  assert.match(text(el), /Longest: 24 days/);
});

test("the old streak options are accepted and ignored", async () => {
  const el = await mount({ streak_style: "gauge", show_streak_toggle: true });
  assert.equal(el.shadowRoot!.querySelectorAll(".dot").length, 7);
  assert.equal(el.shadowRoot!.querySelector(".seg button"), null);
});

test("average per week shows an estimated figure and the trend", async () => {
  const t = text(await mount({}));
  assert.match(t, /Average per week ~2\.5 h/);
  assert.match(t, /2\.8 episodes and movies a week/);
  assert.match(t, /▲ 12% vs previous 4 weeks/);
});

test("average per week says '1 episode or movie' for exactly one", async () => {
  const hass = makeHass({
    states: { ...baseStates, [`sensor.${PREFIX}average_per_week`]: { entity_id: "a", state: "0.9", attributes: { items_per_week: 1, change_percent: null, estimated: true } } },
  });
  const t = text(await mount({}, hass));
  assert.match(t, /1 episode or movie a week/);
  assert.doesNotMatch(t, /vs previous/, "no percentage without a fair baseline");
});

test("the catch-up estimate under a day shows hours only", async () => {
  const hass = makeHass({
    states: { ...baseStates, [`sensor.${PREFIX}catch_up`]: { entity_id: "c", state: "33", attributes: { show_count: 1, estimated_minutes: 1260, shows: [{ title: "Westworld", remaining: 33, is_anime: false }] } } },
  });
  const t = text(await mount({}, hass));
  assert.match(t, /33 aired episodes waiting, about 21 h/);
  assert.doesNotMatch(t, /0 d/);
});

test("average per week falls back to viewings when hours are unknown", async () => {
  const hass = makeHass({
    states: { ...baseStates, [`sensor.${PREFIX}average_per_week`]: { entity_id: "a", state: "unknown", attributes: { items_per_week: 3.5, change_percent: -8, estimated: true } } },
  });
  const t = text(await mount({}, hass));
  assert.match(t, /Average per week 3\.5 a week/);
  assert.match(t, /▼ 8%/);
});

test("last 7 days: one bar per day, today marked, busiest day named, totals in the legend", async () => {
  const el = await mount({});
  const root = el.shadowRoot!;
  assert.equal(root.querySelectorAll(".bars .day").length, 7);
  assert.equal(root.querySelectorAll(".bars .day.today").length, 1);
  assert.equal(root.querySelectorAll(".bars .bar.empty").length, 3, "days with nothing watched get a flat stub");
  const busiest = weekdayName(last7Days[3].date, "en", "long");
  assert.match(text(el), new RegExp(`Busiest day · ${busiest}`));
  assert.match(text(el), /Episodes 8 Movies 3/);
  const tallest = Math.max(...[...root.querySelectorAll<HTMLElement>(".bar")].map((b) => parseInt(b.style.height)));
  assert.equal(tallest, 84, "the busiest day fills the chart");
});

test("last 7 days shows the episodes watched above each bar", async () => {
  const el = await mount({});
  const counts = [...el.shadowRoot!.querySelectorAll(".day")].map((d) => d.querySelector(".day-count")?.textContent?.trim() ?? "");
  assert.deepEqual(counts, ["1", "", "2", "3", "", "2", ""], "episodes only; days without episodes show nothing");
  const day = el.shadowRoot!.querySelectorAll(".day")[3];
  assert.ok(day.querySelector(".slot")!.firstElementChild!.classList.contains("day-count"), "the number sits above the bar");
});

test("average per week: items line sits in the middle and the trend is the last row of the tile", async () => {
  const el = await mount({});
  const tile = el.shadowRoot!.querySelector(".panel.average")!;
  const kids = [...tile.children].map((c) => c.className.split(" ")[0]);
  assert.deepEqual(kids, ["label", "metric", "avg-mid", "trend"]);
  assert.match(tile.querySelector(".avg-mid")!.textContent!, /2\.8 episodes and movies a week/);
  assert.match(tile.querySelector(".trend")!.textContent!, /▲ 12% vs previous 4 weeks/);
});

test("last 7 days with nothing watched says so and names no busiest day", async () => {
  const days = last7Days.map((d) => ({ ...d, episodes: 0, movies: 0 }));
  const hass = makeHass({
    states: { ...baseStates, [`sensor.${PREFIX}last_7_days`]: { entity_id: "l", state: "0", attributes: { days, episodes: 0, movies: 0, busiest_day: null } } },
  });
  const t = text(await mount({}, hass));
  assert.match(t, /Nothing watched in the last 7 days/);
  assert.doesNotMatch(t, /Busiest day/);
});

test("catch-up backlog: headline, estimate and rows, without a ready badge", async () => {
  const el = await mount({});
  const t = text(el);
  assert.match(t, /Catch-up backlog 39 aired episodes waiting, about 1 d 5 h/);
  assert.doesNotMatch(t, /Ready now/);
  const rows = [...el.shadowRoot!.querySelectorAll(".c-row")].map((r) => r.textContent!.replace(/\s+/g, " ").trim());
  assert.deepEqual(rows, ["Westworld 30", "Lupin 9"]);
  assert.equal(el.shadowRoot!.querySelector(".poster"), null);
  const widths = [...el.shadowRoot!.querySelectorAll<HTMLElement>(".c-row .progress > span")].map((s) => s.style.width);
  assert.deepEqual(widths, ["100%", "30%"], "bars are relative to the biggest backlog");
});

test("catch-up backlog when there is nothing waiting", async () => {
  const hass = makeHass({
    states: { ...baseStates, [`sensor.${PREFIX}catch_up`]: { entity_id: "c", state: "0", attributes: { show_count: 0, shows: [] } } },
  });
  const t = text(await mount({}, hass));
  assert.match(t, /You're all caught up/);
  assert.doesNotMatch(t, /Ready now/);
});

test("catch-up length limit with show all", async () => {
  const many = Array.from({ length: 8 }, (_, i) => ({ title: `Show ${i}`, year: 2000 + i, is_anime: false, remaining: 10 - i, tmdb_id: i, poster_url: null }));
  const hass = makeHass({
    states: { ...baseStates, [`sensor.${PREFIX}catch_up`]: { entity_id: "c", state: "52", attributes: { show_count: 8, shows: many } } },
  });
  const el = await mount({ queue_length: 3 }, hass);
  assert.equal(el.shadowRoot!.querySelectorAll(".c-row").length, 3);
  assert.match(text(el), /Show all 8/);
  await click(el, el.shadowRoot!.querySelector(".catchup .link"));
  assert.equal(el.shadowRoot!.querySelectorAll(".c-row").length, 8);
  assert.match(text(el), /Show less/);
});

test("airing this week: weekday chips, today highlighted, anime colored", async () => {
  const el = await mount({});
  const rows = [...el.shadowRoot!.querySelectorAll(".a-row")];
  assert.equal(rows.length, 2);
  assert.match(rows[0].textContent!, /Today\s+Westworld S1 · E10/);
  assert.match(rows[0].querySelector(".badge.warn")!.textContent!, /Finale/);
  assert.match(rows[0].querySelector(".a-time")!.textContent!, /8:00/, "exact air time, in the user's clock format");
  assert.match(rows[1].querySelector(".badge.accent")!.textContent!, /Premiere/);
  assert.equal(rows[1].querySelector(".a-time"), null, "no time when Refract doesn't know it");
  assert.ok(rows[0].querySelector(".a-day.today"));
  assert.match(rows[1].textContent!, /Frieren S1 · E3/);
  assert.match(rows[1].querySelector<HTMLElement>(".swatch")!.getAttribute("style")!, /--c-anime/);
});

test("airing this week with nothing scheduled", async () => {
  const hass = makeHass({
    states: { ...baseStates, [`sensor.${PREFIX}airing_this_week`]: { entity_id: "a", state: "0", attributes: { episodes: [] } } },
  });
  assert.match(text(await mount({}, hass)), /Nothing airing in the next 7 days/);
});

test("airing length limit", async () => {
  const items = Array.from({ length: 6 }, (_, i) => ({ date: last7Days[6].date, show: `Show ${i}`, season: 1, number: i + 1, is_anime: false }));
  const hass = makeHass({
    states: { ...baseStates, [`sensor.${PREFIX}airing_this_week`]: { entity_id: "a", state: "6", attributes: { episodes: items } } },
  });
  const el = await mount({ airing_length: 2 }, hass);
  assert.equal(el.shadowRoot!.querySelectorAll(".a-row").length, 2);
  await click(el, el.shadowRoot!.querySelector(".airing .link"));
  assert.equal(el.shadowRoot!.querySelectorAll(".a-row").length, 6);
});

function withPosters() {
  const nextKey = `sensor.${PREFIX}next_up`;
  const shows = [
    { title: "Westworld", year: 2016, is_anime: false, remaining: 30, tmdb_id: 63247, poster_url: "https://img/ww.jpg" },
    { title: "Lupin", year: 2021, is_anime: false, remaining: 9, tmdb_id: 96677, poster_url: null },
  ];
  return makeHass({
    states: {
      ...baseStates,
      [nextKey]: { ...baseStates[nextKey], attributes: { ...baseStates[nextKey].attributes, poster_url: "https://img/ww.jpg" } },
      [`sensor.${PREFIX}catch_up`]: { entity_id: "c", state: "39", attributes: { show_count: 2, shows } },
    },
  });
}

test("posters: next up gets a poster slot and the backlog gets thumbnails, with an initial as fallback", async () => {
  const el = await mount({}, withPosters());
  const root = el.shadowRoot!;
  const big = root.querySelector(".panel.next .poster.lg");
  assert.ok(big, "poster slot beside next up");
  assert.equal(big!.querySelector("img")!.getAttribute("src"), "https://img/ww.jpg");
  const thumbs = [...root.querySelectorAll(".c-row .poster.sm")];
  assert.equal(thumbs.length, 2);
  assert.ok(thumbs[0].querySelector("img"));
  assert.equal(thumbs[1].querySelector("img"), null, "no poster for Lupin");
  assert.equal(thumbs[1].textContent!.trim(), "L", "falls back to the initial");
});

test("posters: a broken image hides itself and reveals the initial", async () => {
  const el = await mount({}, withPosters());
  const img = el.shadowRoot!.querySelector(".panel.next .poster img") as HTMLImageElement;
  img.dispatchEvent(new window.Event("error"));
  assert.equal(img.style.display, "none");
  assert.equal(el.shadowRoot!.querySelector(".panel.next .poster")!.textContent!.trim(), "W");
});

test("posters can be turned off", async () => {
  const el = await mount({ show_posters: false }, withPosters());
  assert.equal(el.shadowRoot!.querySelector(".poster"), null);
});

test("compact layout shows total watch time, still to finish and next up only", async () => {
  const t = text(await mount({ layout: "compact" }));
  assert.match(t, /Total watch time/);
  assert.match(t, /Still to finish/);
  assert.match(t, /Next up/);
  assert.doesNotMatch(t, /Streak|Catch-up|Airing|Last 7 days|Average per week|Library Watched|Watch time TV shows/);
});

test("full layout shows every section and ignores the switches and the order", async () => {
  const t = text(await mount({ layout: "full", show_hero: false, show_airing: false, section_order: ["airing", "hero"] }));
  const order = ["Total watch time", "Watch time TV shows", "Library Watched", "Still to finish", "Streak", "Average per week", "Last 7 days", "Next up", "Catch-up backlog", "Airing this week"];
  const at = order.map((l) => t.indexOf(l));
  assert.ok(at.every((i) => i >= 0), `all sections render: ${at}`);
  assert.deepEqual([...at].sort((x, y) => x - y), at);
});

test("a card from before the custom layout that hides sections keeps working as custom", async () => {
  assert.equal(resolveLayout({ show_airing: false }), "custom");
  assert.equal(resolveLayout({ section_order: ["airing"] }), "custom");
  assert.equal(resolveLayout({ show_queue: false }), "custom");
  assert.equal(resolveLayout({}), "full");
  assert.equal(resolveLayout({ show_posters: false, show_actions: true }), "full");
  assert.equal(resolveLayout({ layout: "full", show_airing: false }), "full");
  assert.doesNotMatch(text(await mount({ show_airing: false })), /Airing this week/);
});

test("section toggles hide sections", async () => {
  const t = text(
    await mount({ ...BARS, show_hero: false, show_catchup: false, show_next_up: false, show_airing: false, show_last_7_days: false, show_average: false, show_streak: false }),
  );
  assert.doesNotMatch(t, /Total watch time|Catch-up|Next up|Airing|Last 7 days|Average per week|Streak/);
  assert.match(t, /Watched · 803/);
});

test("show_queue still hides the catch-up backlog, and show_catchup wins when both are set", async () => {
  assert.doesNotMatch(text(await mount({ show_queue: false })), /Catch-up backlog/);
  assert.match(text(await mount({ show_queue: false, show_catchup: true })), /Catch-up backlog/);
});

test("mark watched is off by default", async () => {
  const hass = makeHass({ services: { refract: { mark_episode_watched: {} } } });
  const el = await mount({}, hass);
  assert.equal(el.shadowRoot!.querySelector(".action"), null);
});

test("mark watched stays hidden when the action doesn't exist", async () => {
  const el = await mount({ show_actions: true }, makeHass({ services: {} }));
  assert.equal(el.shadowRoot!.querySelector(".action"), null);
});

test("mark watched asks for confirmation, then calls the action and refreshes", async () => {
  const calls: any[] = [];
  const hass = makeHass({
    services: { refract: { mark_episode_watched: {} } },
    callService: async (...args: any[]) => void calls.push(args),
  });
  const el = await mount({ show_actions: true }, hass);
  const button = () => el.shadowRoot!.querySelector(".action");
  assert.match(button()!.textContent!, /Mark watched/);
  await click(el, button());
  assert.match(button()!.textContent!, /Mark watched\?/);
  assert.equal(calls.length, 0, "first tap only asks");
  await click(el, button());
  await new Promise((r) => setTimeout(r, 20));
  await el.updateComplete;
  assert.deepEqual(calls[0], ["refract", "mark_episode_watched", { season: 1, number: 7, tmdb_id: 63247 }]);
  assert.equal(calls[1][0], "homeassistant");
  assert.equal(calls[1][1], "update_entity");
  assert.match(button()!.textContent!, /Marked/);
});

test("mark watched without confirmation fires on the first tap", async () => {
  const calls: any[] = [];
  const hass = makeHass({ services: { refract: { mark_episode_watched: {} } }, callService: async (...a: any[]) => void calls.push(a) });
  const el = await mount({ show_actions: true, confirm_actions: false, config_entry_id: "abc123" }, hass);
  await click(el, el.shadowRoot!.querySelector(".action"));
  await new Promise((r) => setTimeout(r, 20));
  assert.deepEqual(calls[0][2], { season: 1, number: 7, tmdb_id: 63247, config_entry_id: "abc123" });
});

test("a failing action shows an error state", async () => {
  const hass = makeHer();
  function makeHer() {
    return makeHass({
      services: { refract: { mark_episode_watched: {} } },
      callService: async () => {
        throw new Error("Rate limited");
      },
    });
  }
  const el = await mount({ show_actions: true, confirm_actions: false }, hass);
  await click(el, el.shadowRoot!.querySelector(".action"));
  await new Promise((r) => setTimeout(r, 20));
  await el.updateComplete;
  const button = el.shadowRoot!.querySelector(".action")!;
  assert.equal(button.getAttribute("data-state"), "error");
  assert.equal(button.getAttribute("title"), "Rate limited");
});

const WS = { services: { refract: { mark_episode_watched: {} } } };
const nextTile = (el: Card) => (el.shadowRoot!.querySelector(".panel.next")?.textContent ?? "").replace(/\s+/g, " ").trim();
const rowFor = (el: Card, title: string) =>
  [...el.shadowRoot!.querySelectorAll(".c-row")].find((r) => r.querySelector(".c-name")?.textContent === title) as HTMLElement | undefined;

test("clicking a backlog show puts it in Next up and marks its episode", async () => {
  const calls: any[] = [];
  const el = await mount({ show_actions: true, confirm_actions: false }, makeHass({ ...WS, callService: async (...a: any[]) => void calls.push(a) }));
  assert.match(nextTile(el), /Westworld/);
  assert.equal(rowFor(el, "Westworld")!.getAttribute("role"), null, "the show already in Next up isn't pickable");

  await click(el, rowFor(el, "Lupin")!);
  assert.match(nextTile(el), /Lupin 2021 S3 E1 · Chapter 1/);
  assert.match(nextTile(el), /11 of 20 aired episodes/);
  assert.doesNotMatch(nextTile(el), /Back to up next/, "no extra link in the tile");
  assert.equal(el.shadowRoot!.querySelector(".next .link"), null);
  assert.equal(rowFor(el, "Lupin")!.getAttribute("aria-pressed"), "true");

  await click(el, el.shadowRoot!.querySelector(".action"));
  await new Promise((r) => setTimeout(r, 20));
  assert.deepEqual(calls[0], ["refract", "mark_episode_watched", { season: 3, number: 1, tmdb_id: 96677 }]);
});

test("the picked show stays in Next up and moves on to its next episode after marking", async () => {
  const el = await mount({ show_actions: true, confirm_actions: false }, makeHass(WS));
  await click(el, rowFor(el, "Lupin")!);
  const lupinAfter = { ...catchUpShows[1], remaining: 8, next_episode: { ...catchUpShows[1].next_episode, number: 2, name: "Chapter 2", is_season_premiere: false } };
  const states = {
    ...baseStates,
    [`sensor.${PREFIX}catch_up`]: { entity_id: "c", state: "38", attributes: { show_count: 2, shows: [catchUpShows[0], lupinAfter] } },
  };
  el.hass = makeHass({ ...WS, states });
  await el.updateComplete;
  assert.match(nextTile(el), /Lupin 2021 S3 E2 · Chapter 2/);
});

test("tapping the original show's row, the picked row again, or finishing the show returns to the default", async () => {
  const el = await mount({ show_actions: true });
  assert.equal(rowFor(el, "Westworld")!.getAttribute("role"), null, "not tappable while it is the one shown");
  await click(el, rowFor(el, "Lupin")!);
  assert.equal(rowFor(el, "Westworld")!.getAttribute("role"), "button", "tappable once another show took over");
  await click(el, rowFor(el, "Westworld")!);
  assert.match(nextTile(el), /Westworld/);
  assert.equal(rowFor(el, "Westworld")!.getAttribute("role"), null, "back to the default, so it is not tappable again");
  assert.equal(rowFor(el, "Lupin")!.getAttribute("aria-pressed"), "false");

  await click(el, rowFor(el, "Lupin")!);
  await click(el, rowFor(el, "Lupin")!);
  assert.match(nextTile(el), /Westworld/);

  await click(el, rowFor(el, "Lupin")!);
  const states = {
    ...baseStates,
    [`sensor.${PREFIX}catch_up`]: { entity_id: "c", state: "30", attributes: { show_count: 1, shows: [catchUpShows[0]] } },
  };
  el.hass = makeHass({ states });
  await el.updateComplete;
  assert.match(nextTile(el), /Westworld/, "a show with nothing left falls back to the default");
  el.hass = makeHass();
  await el.updateComplete;
  assert.match(nextTile(el), /Westworld/, "and doesn't jump back if it returns later");
});

test("switching shows cancels a pending confirmation", async () => {
  const calls: any[] = [];
  const el = await mount({ show_actions: true }, makeHass({ ...WS, callService: async (...a: any[]) => void calls.push(a) }));
  await click(el, el.shadowRoot!.querySelector(".action")); // Westworld asks "Mark watched?"
  assert.match(el.shadowRoot!.querySelector(".action")!.textContent!, /Mark watched\?/);
  await click(el, rowFor(el, "Lupin")!);
  assert.match(nextTile(el), /Lupin/);
  assert.doesNotMatch(el.shadowRoot!.querySelector(".action")!.textContent!, /Mark watched\?/, "starts over for the new show");
  assert.equal(calls.length, 0);
});

test("backlog rows can be picked with the keyboard", async () => {
  const el = await mount({ show_actions: true });
  const row = rowFor(el, "Lupin")!;
  assert.equal(row.getAttribute("tabindex"), "0");
  row.dispatchEvent(new (dom.window as any).KeyboardEvent("keydown", { key: "Enter", bubbles: true }));
  await el.updateComplete;
  assert.match(nextTile(el), /Lupin/);
});

test("backlog rows aren't pickable when Next up is hidden or the episode is unknown", async () => {
  const hidden = await mount({ show_next_up: false });
  assert.equal(hidden.shadowRoot!.querySelectorAll(".c-row.pickable").length, 0);

  const bare = catchUpShows.map(({ next_episode, aired_episodes, ...rest }) => rest);
  const states = {
    ...baseStates,
    [`sensor.${PREFIX}shows_waiting`]: { entity_id: "w", state: "1", attributes: { items: [] } },
    [`sensor.${PREFIX}catch_up`]: { entity_id: "c", state: "39", attributes: { show_count: 2, shows: bare } },
  };
  const el = await mount({}, makeHass({ states }));
  assert.equal(el.shadowRoot!.querySelectorAll(".c-row.pickable").length, 0, "no episode to mark, nothing to pick");
});

test("older integrations: the next episode comes from the shows waiting sensor", async () => {
  const bare = catchUpShows.map(({ next_episode, aired_episodes, ...rest }) => rest);
  const states = {
    ...baseStates,
    [`sensor.${PREFIX}catch_up`]: { entity_id: "c", state: "39", attributes: { show_count: 2, shows: bare } },
  };
  const el = await mount({}, makeHass({ states }));
  await click(el, rowFor(el, "Lupin")!);
  assert.match(nextTile(el), /Lupin 2021 S3 E1 · Chapter 1/);
});

test("a pending confirmation doesn't carry over when the episode changes underneath it", async () => {
  const calls: any[] = [];
  const el = await mount({ show_actions: true }, makeHass({ ...WS, callService: async (...a: any[]) => void calls.push(a) }));
  await click(el, el.shadowRoot!.querySelector(".action")); // confirm for Westworld S1 E7
  const moved = { ...westworld, next_episode: { ...westworld.next_episode, number: 8 } };
  el.hass = makeHass({ ...WS, callService: async (...a: any[]) => void calls.push(a), states: { ...baseStates, [`sensor.${PREFIX}next_up`]: { entity_id: "n", state: "Westworld", attributes: moved } } });
  await el.updateComplete;
  await click(el, el.shadowRoot!.querySelector(".action"));
  assert.equal(calls.filter((c) => c[1] === "mark_episode_watched").length, 0, "asks again for the new episode");
});

test("friendly messages for missing config or unknown entities", async () => {
  const el = document.createElement("refract-stats-card") as Card;
  el.setConfig({ type: "custom:refract-stats-card" });
  el.hass = makeHass();
  document.body.appendChild(el);
  await el.updateComplete;
  assert.match(text(el), /Choose a Refract entity/);

  const missing = await mount({ entity: "sensor.nope_next_up" });
  assert.match(text(missing), /Couldn't find any Refract entities for sensor\.nope_next_up/);
});

test("custom colors become CSS variables", async () => {
  const el = await mount({ color_movies: "#ff0000", color_accent: "#00ff00" });
  const style = el.shadowRoot!.querySelector("ha-card")!.getAttribute("style")!;
  assert.match(style, /--refract-color-movies:\s*#ff0000/);
  assert.match(style, /--refract-color-accent:\s*#00ff00/);
});

test("re-renders only when a Refract entity changes", async () => {
  const hass = makeHass();
  const el = await mount(BARS, hass);
  let renders = 0;
  const original = (el as any).render.bind(el);
  (el as any).render = () => (renders++, original());

  el.hass = { ...hass, states: { ...hass.states, "light.kitchen": { entity_id: "light.kitchen", state: "on", attributes: {} } } };
  await el.updateComplete;
  assert.equal(renders, 0, "unrelated entity change is ignored");

  el.hass = { ...hass, states: { ...hass.states, [`sensor.${PREFIX}completed`]: { entity_id: "c", state: "804", attributes: {} } } };
  await el.updateComplete;
  assert.equal(renders, 1);
  assert.match(text(el), /Watched · 804/);
});

test("stub config picks the Refract next up sensor", () => {
  const hass = makeHass();
  assert.deepEqual(RefractStatsCard.getStubConfig(hass), { entity: ENTITY });
});

test("editor emits a clean config without defaults", async () => {
  const editor = document.createElement("refract-stats-card-editor") as any;
  editor.setConfig({ type: "custom:refract-stats-card", entity: ENTITY });
  editor.hass = makeHass();
  document.body.appendChild(editor);
  await editor.updateComplete;
  const form = editor.shadowRoot.querySelector("ha-form");
  assert.ok(form, "ha-form rendered");
  assert.equal(form.data.layout, "full", "defaults are shown in the form");

  let emitted: any;
  editor.addEventListener("config-changed", (e: CustomEvent) => (emitted = e.detail.config));
  form.dispatchEvent(
    new CustomEvent("value-changed", { detail: { value: { ...form.data, layout: "compact", show_actions: true, color_movies: "" } } }),
  );
  assert.deepEqual(emitted, { type: "custom:refract-stats-card", entity: ENTITY, layout: "compact", show_actions: true });
  await editor.updateComplete;
  assert.ok(editor.shadowRoot.querySelector("ha-alert"), "warns when the action is unavailable");
});

test("editor reorders sections with the arrows and keeps the YAML clean", async () => {
  const editor = document.createElement("refract-stats-card-editor") as any;
  editor.setConfig({ type: "custom:refract-stats-card", entity: ENTITY, layout: "custom" });
  editor.hass = makeHass();
  document.body.appendChild(editor);
  await editor.updateComplete;
  const rows = () => [...editor.shadowRoot.querySelectorAll(".order-row")] as HTMLElement[];
  assert.equal(rows().length, 11);
  assert.match(rows()[0].textContent!, /Watch time summary/);
  assert.equal(editor.shadowRoot.querySelector(".order-reset"), null, "no reset button on the default order");

  const emitted: any[] = [];
  editor.addEventListener("config-changed", (e: CustomEvent) => emitted.push(e.detail.config));
  (rows()[1].querySelectorAll("ha-icon-button")[0] as HTMLElement).click(); // move "Watch time split" up
  await editor.updateComplete;
  assert.deepEqual(emitted[0].section_order.slice(0, 3), ["watch_time", "hero", "library"]);
  assert.equal(emitted[0].entity, ENTITY);
  assert.match(rows()[0].textContent!, /Watch time split/);

  // other edits keep the order
  const form = editor.shadowRoot.querySelector("ha-form");
  form.dispatchEvent(new CustomEvent("value-changed", { detail: { value: { ...form.data, queue_length: 7 } } }));
  assert.deepEqual(emitted[1].section_order.slice(0, 2), ["watch_time", "hero"]);

  // moving it back to the default removes the option
  (rows()[0].querySelectorAll("ha-icon-button")[1] as HTMLElement).click();
  await editor.updateComplete;
  assert.equal(emitted[2].section_order, undefined);
  assert.equal(emitted[2].layout, "custom");
});

const editorFor = async (config: Record<string, unknown>) => {
  const editor = document.createElement("refract-stats-card-editor") as any;
  editor.setConfig({ type: "custom:refract-stats-card", entity: ENTITY, ...config });
  editor.hass = makeHass();
  document.body.appendChild(editor);
  await editor.updateComplete;
  const names: string[] = [];
  const walk = (schema: any[]) => schema.forEach((f) => (f.schema ? walk(f.schema) : names.push(f.name)));
  walk(editor.shadowRoot.querySelector("ha-form").schema);
  return { editor, names, panel: editor.shadowRoot.querySelector("ha-expansion-panel") };
};

test("the sections and their order only show up in the editor for the custom layout", async () => {
  for (const layout of [undefined, "full", "compact"]) {
    const { names, panel } = await editorFor(layout ? { layout } : {});
    assert.ok(!names.includes("show_hero") && !names.includes("show_airing"), `no section switches for ${layout}`);
    assert.equal(panel, null, `no section order for ${layout}`);
    assert.ok(names.includes("show_posters") && names.includes("fun_stat") && names.includes("layout"), "other settings stay");
  }
  const { editor, names, panel } = await editorFor({ layout: "custom" });
  assert.ok(names.includes("show_hero") && names.includes("show_airing"));
  assert.match(panel.getAttribute("header"), /Section order/);
  // section order sits directly under Sections, before posters and the other settings
  const wrap = editor.shadowRoot.querySelector(".wrap");
  const kids = [...wrap.children].map((c: any) => c.tagName.toLowerCase());
  assert.deepEqual(kids.slice(0, 3), ["ha-form", "ha-expansion-panel", "ha-form"]);
  const first = wrap.children[0].schema.map((f: any) => f.title ?? f.name);
  assert.equal(first[first.length - 1], "Sections");
  assert.equal(wrap.children[2].schema[0].name, "show_posters");
});

test("the layout list offers Full, Compact and Custom, and switching shows the section settings", async () => {
  const { editor } = await editorFor({});
  const grid = editor.shadowRoot.querySelector("ha-form").schema.find((f: any) => f.type === "grid");
  assert.deepEqual(grid.schema[0].selector.select.options.map((o: any) => o.value), ["full", "compact", "custom"]);
  const form = editor.shadowRoot.querySelector("ha-form");
  let emitted: any;
  editor.addEventListener("config-changed", (e: CustomEvent) => (emitted = e.detail.config));
  form.dispatchEvent(new CustomEvent("value-changed", { detail: { value: { ...form.data, layout: "custom" } } }));
  assert.equal(emitted.layout, "custom");
  await editor.updateComplete;
  assert.ok(editor.shadowRoot.querySelector("ha-expansion-panel"), "section order appears");
});

test("an old card with hidden sections opens as custom, and choosing Full sticks", async () => {
  const { editor } = await editorFor({ show_airing: false });
  const form = editor.shadowRoot.querySelector("ha-form");
  assert.equal(form.data.layout, "custom");
  let emitted: any;
  editor.addEventListener("config-changed", (e: CustomEvent) => (emitted = e.detail.config));
  form.dispatchEvent(new CustomEvent("value-changed", { detail: { value: { ...form.data, layout: "full" } } }));
  assert.equal(emitted.layout, "full", "written down so it isn't read as custom again");
  assert.equal(resolveLayout(emitted), "full");
});

test("editor shows the legacy show_queue value on the catch-up switch", async () => {
  const editor = document.createElement("refract-stats-card-editor") as any;
  editor.setConfig({ type: "custom:refract-stats-card", entity: ENTITY, show_queue: false });
  editor.hass = makeHass();
  document.body.appendChild(editor);
  await editor.updateComplete;
  assert.equal(editor.shadowRoot.querySelector("ha-form").data.show_catchup, false);
});

test("loading the bundle twice doesn't throw and keeps the first registration", async () => {
  const { defineOnce } = await import("../src/define");
  const warnings: string[] = [];
  const originalWarn = console.warn;
  console.warn = (m: string) => void warnings.push(String(m));
  try {
    const first = customElements.get("refract-stats-card");
    class Impostor extends (dom.window as any).HTMLElement {}
    assert.doesNotThrow(() => defineOnce("refract-stats-card")(Impostor as unknown as CustomElementConstructor));
    assert.equal(customElements.get("refract-stats-card"), first, "first registration wins");
    assert.match(warnings[0], /already registered/);
  } finally {
    console.warn = originalWarn;
  }
});

// ------------------------------------------------------------ most watched

const without = (key: string) => {
  const { [`sensor.${PREFIX}${key}`]: _gone, ...rest } = baseStates;
  return makeHass({ states: rest });
};

test("most watched shows the leader of each ranking with photos, flag and decade", async () => {
  const el = await mount({});
  const panel = el.shadowRoot!.querySelector(".panel.picks")!;
  assert.ok(panel, "the section is there");
  const tiles = [...panel.querySelectorAll(".pick-text")].map((x) => x.textContent!.replace(/\s+/g, " ").trim());
  assert.deepEqual(tiles, [
    "Actor Bryan Cranston 4 titles · 121 h",
    "Director Vince Gilligan 2 titles · 98 h",
    "Writer Jonathan Nolan 1 title · 61 h",
    "Decade 2010s 312 titles · 1,450 h",
    "Genre Drama 401 titles · 2,800 h",
    "Country United States 640 titles · 3,900 h",
  ]);
  const imgs = [...panel.querySelectorAll("img")].map((i) => i.getAttribute("src"));
  assert.deepEqual(imgs, ["https://image.tmdb.org/t/p/w185/bryan.jpg", "https://image.tmdb.org/t/p/w185/vince.jpg"]);
  assert.equal(panel.querySelector(".initials")!.textContent, "JN", "no photo: the initials");
  assert.equal(panel.querySelector(".flag")!.textContent, "\u{1F1FA}\u{1F1F8}");
  assert.match(panel.querySelector(".picks-foot")!.textContent!.replace(/\s+/g, " "), /Based on 812 of 896 titles · TMDB/);
  assert.equal(panel.querySelector(".picks-foot a")!.getAttribute("href"), "https://www.themoviedb.org");
});

test("only the custom layout chooses and orders the most watched tiles", async () => {
  const labelsOf = async (config: Record<string, unknown>) =>
    [...(await mount(config)).shadowRoot!.querySelectorAll(".panel.picks .pick-label")].map((x) => x.textContent);
  const items = ["country", "actor", "bogus", "actor"];
  assert.deepEqual(await labelsOf({ layout: "custom", top_picks_items: items }), ["Country", "Actor"]);
  const all = ["Actor", "Director", "Writer", "Decade", "Genre", "Country"];
  assert.deepEqual(await labelsOf({ layout: "full", top_picks_items: items }), all, "full shows all six");
  assert.deepEqual(await labelsOf({ layout: "compact", top_picks_items: items }), [], "compact hides the section");
  assert.deepEqual(await labelsOf({}), all);
  // a card that picked tiles before this only applied to custom is read as custom
  assert.deepEqual(await labelsOf({ top_picks_items: ["genre"] }), ["Genre"]);
});

test("most watched is left out without the sensor, without data and in compact", async () => {
  const noSensor = await mount({}, without("top_picks"));
  assert.equal(noSensor.shadowRoot!.querySelector(".panel.picks"), null);
  assert.equal((await mount({ layout: "compact" })).shadowRoot!.querySelector(".panel.picks"), null);
  assert.equal((await mount({ layout: "custom", show_top_picks: false })).shadowRoot!.querySelector(".panel.picks"), null);
  assert.ok((await mount({ layout: "custom" })).shadowRoot!.querySelector(".panel.picks"));
});

test("most watched says it is still building while TMDB details are collected", async () => {
  const building = (attributes: Record<string, unknown>, state = "0") =>
    makeHass({ states: { ...baseStates, [`sensor.${PREFIX}top_picks`]: { entity_id: "p", state, attributes } } });
  const el = await mount({}, building({ total: 896, pending: 896 }));
  const panel = el.shadowRoot!.querySelector(".panel.picks")!;
  assert.match(panel.textContent!, /Still building/);
  assert.match(panel.textContent!, /Collecting details from TMDB/);
  assert.equal(panel.querySelector(".pick"), null);
  const partial = await mount({}, building({ total: 896, pending: 84, actor: [{ name: "A B", hours: 5, titles: 1 }] }, "812"));
  assert.match(partial.shadowRoot!.querySelector(".panel.picks")!.textContent!, /Still building/);
  assert.ok(partial.shadowRoot!.querySelector(".panel.picks .pick"));
  const done = await mount({}, building({ total: 0, pending: 0 }));
  assert.match(done.shadowRoot!.querySelector(".panel.picks")!.textContent!, /Nothing to show yet/);
});

test("the editor offers the most watched switch and tiles only for the custom layout", async () => {
  for (const layout of [undefined, "full", "compact"]) {
    const { names } = await editorFor(layout ? { layout } : {});
    assert.ok(!names.includes("top_picks_items") && !names.includes("show_top_picks"), `nothing for ${layout}`);
  }
  const custom = await editorFor({ layout: "custom" });
  assert.ok(custom.names.includes("show_top_picks") && custom.names.includes("top_picks_items"));
  const { editor } = custom;
  const form = editor.shadowRoot.querySelector("ha-form");
  let emitted: any;
  editor.addEventListener("config-changed", (e: CustomEvent) => (emitted = e.detail.config));
  form.dispatchEvent(new CustomEvent("value-changed", { detail: { value: { ...form.data, top_picks_items: ["actor", "genre"] } } }));
  assert.deepEqual(emitted.top_picks_items, ["actor", "genre"]);
  form.dispatchEvent(new CustomEvent("value-changed", { detail: { value: { ...form.data, top_picks_items: ["actor", "director", "writer", "decade", "genre", "country"] } } }));
  assert.equal(emitted.top_picks_items, undefined, "the default list is not written to the YAML");
});
