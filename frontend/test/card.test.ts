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
const { makeHass, PREFIX, last7Days, states: baseStates } = await import("./fixture");
const { weekdayName } = await import("../src/format");

type Card = InstanceType<typeof RefractStatsCard>;
const ENTITY = `sensor.${PREFIX}next_up`;

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
  const el = await mount({});
  const t = text(el);
  assert.match(t, /Library Completed 803/);
  assert.match(t, /Up to date 23/);
  assert.match(t, /In progress 3/);
  assert.match(t, /Watchlist 63/);
  assert.match(t, /Other 4/);
  assert.equal(el.shadowRoot!.querySelector("svg.donut"), null, "the donut is gone");
  assert.match(t, /206 d 23 h/);
  assert.match(t, /54 d 13 h/);
  assert.match(t, /5 d 2 h/);
  assert.match(t, /TV shows \(78%\)/);
  assert.match(t, /Movies \(20%\)/);
  assert.match(t, /Anime \(2%\)/);
});

function withStatuses(byStatus: Record<string, number>) {
  const key = `sensor.${PREFIX}library_total`;
  return makeHass({ states: { ...baseStates, [key]: { ...baseStates[key], attributes: { ...baseStates[key].attributes, by_status: byStatus } } } });
}

test("library shows every status Refract reports, including on hold and dropped", async () => {
  const el = await mount({}, withStatuses({ completed: 803, up_to_date: 23, in_progress: 3, planned: 64, on_hold: 2, dropped: 2 }));
  const t = text(el);
  assert.match(t, /Completed 803/);
  assert.match(t, /Watchlist 64/);
  assert.match(t, /On hold 2/);
  assert.match(t, /Dropped 2/);
  assert.doesNotMatch(t, /Other/);
  assert.equal(el.shadowRoot!.querySelectorAll(".status-bar > span").length, 6);
  const legend = [...el.shadowRoot!.querySelectorAll(".status-legend .swatch")].map((x) => x.getAttribute("style"));
  assert.match(legend[4]!, /--c-on-hold/);
  assert.match(legend[5]!, /--c-dropped/);
});

test("library statuses: aliases merge, empty ones are skipped and unknown ones get a readable name", async () => {
  const el = await mount({}, withStatuses({ completed: 5, paused: 1, on_hold: 2, never: 0, "waiting-room": 3 }));
  const t = text(el);
  assert.match(t, /Completed 5/);
  assert.match(t, /On hold 3/, "paused and on_hold are the same status");
  assert.match(t, /Waiting room 3/);
  assert.doesNotMatch(t, /Never/);
});

test("sections appear in the designed order", async () => {
  const t = text(await mount({ show_actions: false }));
  const order = ["Total watch time", "Watch time TV shows", "Library Completed", "Streak", "Average per week", "Last 7 days", "Next up", "Catch-up backlog", "Airing this week"];
  const at = order.map((label) => t.indexOf(label));
  assert.ok(at.every((i) => i >= 0), `all sections render: ${at}`);
  assert.deepEqual([...at].sort((x, y) => x - y), at, "in order");
});

test("section_order rearranges the sections", async () => {
  const el = await mount({
    show_actions: false,
    section_order: ["airing", "next_up", "hero", "average", "library"],
  });
  const t = text(el);
  const labels = ["Airing this week", "Next up", "Total watch time", "Average per week", "Library Completed", "Watch time TV shows", "Streak", "Last 7 days", "Catch-up backlog"];
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

test("compact layout follows section_order too", async () => {
  const t = text(await mount({ layout: "compact", section_order: ["next_up", "streak", "hero"] }));
  const at = ["Next up", "Streak", "Total watch time"].map((l) => t.indexOf(l));
  assert.ok(at.every((i) => i >= 0), `compact sections render: ${at}`);
  assert.deepEqual([...at].sort((x, y) => x - y), at);
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

test("last 7 days with nothing watched says so and names no busiest day", async () => {
  const days = last7Days.map((d) => ({ ...d, episodes: 0, movies: 0 }));
  const hass = makeHass({
    states: { ...baseStates, [`sensor.${PREFIX}last_7_days`]: { entity_id: "l", state: "0", attributes: { days, episodes: 0, movies: 0, busiest_day: null } } },
  });
  const t = text(await mount({}, hass));
  assert.match(t, /Nothing watched in the last 7 days/);
  assert.doesNotMatch(t, /Busiest day/);
});

test("catch-up backlog: headline, estimate, rows and the ready badge", async () => {
  const el = await mount({});
  const t = text(el);
  assert.match(t, /Catch-up backlog Ready now 39 aired episodes waiting, about 1 d 5 h/);
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

test("compact layout keeps hero, streak and next up only", async () => {
  const t = text(await mount({ layout: "compact" }));
  assert.match(t, /Total watch time/);
  assert.match(t, /Streak/);
  assert.match(t, /Next up/);
  assert.doesNotMatch(t, /Catch-up|Airing|Last 7 days|Average per week|Library Completed|Watch time Shows/);
});

test("section toggles hide sections", async () => {
  const t = text(
    await mount({ show_hero: false, show_catchup: false, show_next_up: false, show_airing: false, show_last_7_days: false, show_average: false, show_streak: false }),
  );
  assert.doesNotMatch(t, /Total watch time|Catch-up|Next up|Airing|Last 7 days|Average per week|Streak/);
  assert.match(t, /Completed 803/);
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
  const el = await mount({}, hass);
  let renders = 0;
  const original = (el as any).render.bind(el);
  (el as any).render = () => (renders++, original());

  el.hass = { ...hass, states: { ...hass.states, "light.kitchen": { entity_id: "light.kitchen", state: "on", attributes: {} } } };
  await el.updateComplete;
  assert.equal(renders, 0, "unrelated entity change is ignored");

  el.hass = { ...hass, states: { ...hass.states, [`sensor.${PREFIX}completed`]: { entity_id: "c", state: "804", attributes: {} } } };
  await el.updateComplete;
  assert.equal(renders, 1);
  assert.match(text(el), /Completed 804/);
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
  editor.setConfig({ type: "custom:refract-stats-card", entity: ENTITY });
  editor.hass = makeHass();
  document.body.appendChild(editor);
  await editor.updateComplete;
  const rows = () => [...editor.shadowRoot.querySelectorAll(".order-row")] as HTMLElement[];
  assert.equal(rows().length, 9);
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
  form.dispatchEvent(new CustomEvent("value-changed", { detail: { value: { ...form.data, layout: "compact" } } }));
  assert.deepEqual(emitted[1].section_order.slice(0, 2), ["watch_time", "hero"]);

  // moving it back to the default removes the option
  (rows()[0].querySelectorAll("ha-icon-button")[1] as HTMLElement).click();
  await editor.updateComplete;
  assert.equal(emitted[2].section_order, undefined);
  assert.equal(emitted[2].layout, "compact");
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
