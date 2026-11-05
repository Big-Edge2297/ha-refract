import assert from "node:assert/strict";
import { test } from "node:test";
import { accountName, discover, matchKey, splitAccountName } from "../src/discovery";
import { buildModel } from "../src/model";
import { PREFIX, makeHass, states } from "./fixture";

test("matchKey prefers the longest key and splits the prefix", () => {
  assert.deepEqual(matchKey("refract_codex_next_up"), { key: "next_up", prefix: "refract_codex_" });
  assert.deepEqual(matchKey("refract_codex_stats_watch_time_movies_minutes")?.key, "stats_watch_time_movies_minutes");
  assert.equal(matchKey("refract_codex_movies")?.key, "movies");
  assert.equal(matchKey("refract_codex_unrelated"), undefined);
});

test("discovery by name prefix finds every sensor", () => {
  const d = discover(makeHass(), { entity: `sensor.${PREFIX}next_up` });
  assert.equal(d.prefix, PREFIX);
  assert.equal(d.entities.library_total, `sensor.${PREFIX}library_total`);
  assert.equal(d.entities.watchlist, `sensor.${PREFIX}watchlist`); // sensor, not the todo entity
  assert.equal(Object.keys(d.entities).length, 22);
});

test("discovery works from a non-sensor anchor such as the todo list", () => {
  const d = discover(makeHass(), { entity: `todo.${PREFIX}watchlist` });
  assert.equal(d.entities.next_up, `sensor.${PREFIX}next_up`);
});

test("discovery by device survives renamed entity ids", () => {
  const hass = makeHass({
    states: {
      ...states,
      "sensor.my_custom_name": { entity_id: "sensor.my_custom_name", state: "5", attributes: {} },
    },
    entities: {
      "sensor.my_custom_name": { entity_id: "sensor.my_custom_name", device_id: "dev1", platform: "refract", translation_key: "completed" },
      [`sensor.${PREFIX}next_up`]: { entity_id: `sensor.${PREFIX}next_up`, device_id: "dev1", platform: "refract" },
      "sensor.other_account_completed": { entity_id: "sensor.other_account_completed", device_id: "dev2", platform: "refract" },
    },
    devices: { dev1: { id: "dev1", name: "Refract (Codex)" } },
  });
  const d = discover(hass, { entity: `sensor.${PREFIX}next_up` });
  assert.equal(d.entities.completed, "sensor.my_custom_name");
  assert.equal(d.deviceId, "dev1");
  assert.equal(accountName(hass, d), "Refract (Codex)");
});

test("manual entity overrides win", () => {
  const d = discover(makeHass(), { entity: `sensor.${PREFIX}next_up`, entities: { completed: "sensor.custom" } });
  assert.equal(d.entities.completed, "sensor.custom");
});

test("account name parsing", () => {
  assert.deepEqual(splitAccountName("Refract (Codex)"), { main: "Refract", sub: "Codex" });
  assert.deepEqual(splitAccountName("My Refract"), { main: "My Refract" });
  assert.deepEqual(splitAccountName(undefined), { main: "Refract" });
});

test("model reproduces the numbers from the screenshots", () => {
  const hass = makeHass();
  const m = buildModel(hass, discover(hass, { entity: `sensor.${PREFIX}next_up` }), { type: "x" });
  assert.equal(m.accountMain, "Refract");
  assert.equal(m.accountSub, "Codex");
  assert.equal(m.library.total, 896);
  assert.equal(m.library.other, 4); // 896 - (803 + 3 + 23 + 63)
  assert.equal(m.episodesWatched, 7959);
  assert.equal(m.moviesWatched, 661);
  assert.deepEqual(m.streak, { current: 6, longest: 24 });
  assert.equal(m.minutes.total, 383908);
  assert.equal(m.last?.title, "Westworld");
  assert.equal(m.waiting, 20);
});

test("model: next up, and a queue that excludes the next-up show", () => {
  const hass = makeHass();
  const m = buildModel(hass, discover(hass, { entity: `sensor.${PREFIX}next_up` }), { type: "x" });
  assert.equal(m.next.kind, "item");
  if (m.next.kind !== "item") return;
  assert.equal(m.next.item.title, "Westworld");
  assert.equal(m.next.item.season, 1);
  assert.equal(m.next.item.number, 7);
  assert.equal(m.next.item.tmdbId, 63247);
  assert.deepEqual(m.queue.map((q) => q.title), ["Lupin"]);
  assert.equal(m.queue[0].premiere, true);
});

test("model: missing permissions hide data instead of showing zeros", () => {
  const limited = Object.fromEntries(Object.entries(states).filter(([id]) => !id.includes("stats_") && !id.endsWith("next_up") && !id.endsWith("shows_waiting")));
  const hass = makeHass({ states: limited });
  const m = buildModel(hass, discover(hass, { entity: `sensor.${PREFIX}completed` }), { type: "x" });
  assert.equal(m.minutes.total, undefined);
  assert.equal(m.streak, undefined);
  assert.equal(m.next.kind, "hidden");
  assert.equal(m.queue.length, 0);
  assert.equal(m.library.total, 896);
});

test("model: unavailable or unknown sensors are treated as missing", () => {
  const hass = makeHass({
    states: {
      ...states,
      [`sensor.${PREFIX}stats_streak_current_days`]: { entity_id: "x", state: "unavailable", attributes: {} },
      [`sensor.${PREFIX}next_up`]: { entity_id: "y", state: "unknown", attributes: {} },
    },
  });
  const m = buildModel(hass, discover(hass, { entity: `sensor.${PREFIX}completed` }), { type: "x" });
  assert.equal(m.streak, undefined);
  assert.equal(m.next.kind, "empty");
});
