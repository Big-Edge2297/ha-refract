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
const { makeHass, PREFIX } = await import("./fixture");

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
  assert.match(t, /Episodes 7,959/);
  assert.match(t, /That's about 8\.8 months of nonstop viewing/);
  assert.doesNotMatch(t, /383,908|298,044|78,542|7,322/, "raw minutes never reach the card");
});

test("library, status bar and watch-time split", async () => {
  const t = text(await mount({}));
  assert.match(t, /Movies 693/);
  assert.match(t, /TV shows 202/);
  assert.match(t, /Anime 1/);
  assert.match(t, /Completed 803/);
  assert.match(t, /Other 4/);
  assert.match(t, /206 d 23 h/);
  assert.match(t, /54 d 13 h/);
  assert.match(t, /5 d 2 h/);
  assert.match(t, /78%/);
});

test("next up and queue", async () => {
  const el = await mount({});
  const t = text(el);
  assert.match(t, /Next up Westworld 2016/);
  assert.match(t, /S1 E7 · Trompe L'Oeil/);
  assert.match(t, /6 of 36 aired episodes/);
  assert.match(t, /30 remaining/);
  assert.match(t, /Waiting · 20 shows/);
  assert.match(t, /Lupin/);
  assert.match(t, /Premiere/);
  assert.equal(el.shadowRoot!.querySelectorAll(".q-row").length, 1);
});

test("streak: gauge by default, dots after switching, choice is remembered", async () => {
  const el = await mount({});
  assert.ok(el.shadowRoot!.querySelector("svg.gauge"));
  assert.match(text(el), /Longest: 24 days/);
  await click(el, el.shadowRoot!.querySelector('button[aria-label="Dots view"]'));
  assert.equal(el.shadowRoot!.querySelectorAll(".dot").length, 7);
  assert.equal(el.shadowRoot!.querySelector("svg.gauge"), null);
  assert.match(text(el), /6 days/);
  const again = await mount({});
  assert.equal(again.shadowRoot!.querySelectorAll(".dot").length, 7, "remembered across cards");
});

test("streak_style: dots in config, and the switch can be hidden", async () => {
  const el = await mount({ streak_style: "dots", show_streak_toggle: false });
  assert.equal(el.shadowRoot!.querySelectorAll(".dot").length, 7);
  assert.equal(el.shadowRoot!.querySelector(".seg"), null);
});

test("compact layout keeps hero, streak and next up only", async () => {
  const t = text(await mount({ layout: "compact" }));
  assert.match(t, /Total watch time/);
  assert.match(t, /Streak/);
  assert.match(t, /Next up/);
  assert.doesNotMatch(t, /Waiting|Watch time Shows|Completed 803/);
});

test("section toggles hide sections", async () => {
  const t = text(await mount({ show_hero: false, show_queue: false, show_next_up: false }));
  assert.doesNotMatch(t, /Total watch time|Waiting|Next up/);
  assert.match(t, /Completed 803/);
});

test("queue length limit with show all", async () => {
  const hass = makeHass();
  const many = Array.from({ length: 8 }, (_, i) => ({
    show: { title: `Show ${i}`, year: 2000 + i, is_anime: false, ids: { refract: `id-${i}`, tmdb: i } },
    next_episode: { season: 1, number: 2, aired: true },
    aired_episodes: 10,
    remaining_episodes: 5,
  }));
  hass.states = { ...hass.states, [`sensor.${PREFIX}shows_waiting`]: { entity_id: "x", state: "8", attributes: { items: many } } };
  const el = await mount({ queue_length: 3 }, hass);
  assert.equal(el.shadowRoot!.querySelectorAll(".q-row").length, 3);
  assert.match(text(el), /Show all 8/);
  await click(el, el.shadowRoot!.querySelector(".queue .link"));
  assert.equal(el.shadowRoot!.querySelectorAll(".q-row").length, 8);
  assert.match(text(el), /Show less/);
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
