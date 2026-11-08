import assert from "node:assert/strict";
import { test } from "node:test";
import { durationParts, durationText, funStatText, shares, streakDots, timeOfDay } from "../src/format";

test("duration: 383,908 minutes is 266 d 14 h", () => {
  assert.equal(durationText(383908), "266 d 14 h");
  assert.deepEqual(durationParts(383908).map((p) => p.value), ["266", "14"]);
});

test("duration: category values from the real account", () => {
  assert.equal(durationText(298044), "206 d 23 h");
  assert.equal(durationText(78542), "54 d 13 h");
  assert.equal(durationText(7322), "5 d 2 h");
});

test("duration: hours format and auto format", () => {
  assert.equal(durationText(298044, "hours"), "4,967 h");
  assert.equal(durationText(200, "auto"), "3 h 20 min");
  assert.equal(durationText(45, "auto"), "45 min");
  assert.equal(durationText(200, "days_hours"), "3 h", "no zero days");
  assert.equal(durationText(1260, "days_hours"), "21 h");
  assert.equal(durationText(45, "days_hours"), "45 min");
  assert.equal(durationText(1440, "days_hours"), "1 d 0 h", "a whole day keeps both parts");
});

test("duration: singular units", () => {
  assert.equal(durationParts(1440 + 60)[0].unit, "unit.day");
  assert.equal(durationParts(1440 + 60)[1].unit, "unit.hour");
});

test("shares always add up to 100", () => {
  const s = shares([298044, 78542, 7322]);
  assert.deepEqual(s, [78, 20, 2]);
  assert.equal(s.reduce((a, b) => a + b, 0), 100);
  assert.equal(shares([1, 1, 1]).reduce((a, b) => a + b, 0), 100);
  assert.deepEqual(shares([0, 0]), [0, 0]);
});

test("fun stat: months, fixed mode", () => {
  assert.equal(funStatText(undefined, 383908, "months"), "That's about 8.8 months of nonstop viewing");
  assert.equal(funStatText(undefined, 383908, "workweeks"), "That's about 160 full-time work weeks");
  assert.match(funStatText(undefined, 383908, "lotr")!, /about 529 times/);
});

test("fun stat: every comparison has its own wording", () => {
  const m = 383908; // about 266 days
  const expected: Record<string, RegExp> = {
    flights: /fly around the world about 144 times/,
    sleep: /about 2\.2 years of sleep at 8 hours a night/,
    movies: /about 3,839 average movies/,
    seasons: /about 415 full 22-episode TV seasons/,
    marathons: /run about 1,422 marathons/,
    moon: /about 89 one-way trips to the Moon/,
    imdb: /whole IMDb Top 250 about 12 times/,
  };
  for (const [mode, re] of Object.entries(expected)) assert.match(funStatText(undefined, m, mode as any)!, re, mode);
  assert.match(funStatText(undefined, 1500, "sleep")!, /about 3 nights of sleep/);
  assert.equal(funStatText(undefined, 1500, "moon"), undefined, "too little for a trip to count twice");
  assert.equal(funStatText(undefined, 1500, "imdb"), undefined);
});

test("fun stat: rotate cycles through every comparison that applies", () => {
  const day = 86_400_000;
  const seen = new Set(Array.from({ length: 10 }, (_, i) => funStatText(undefined, 383908, "rotate", i * day)));
  assert.equal(seen.size, 10);
});

test("fun stat: hidden for tiny totals and rotates by day", () => {
  assert.equal(funStatText(undefined, 600, "rotate"), undefined);
  const day = 86_400_000;
  const seen = new Set([0, 1, 2].map((i) => funStatText(undefined, 383908, "rotate", i * day)));
  assert.equal(seen.size, 3);
});

test("streak dots: streak through yesterday leaves today open", () => {
  const dots = streakDots({
    now: new Date("2026-11-04T10:34:00Z"),
    lastWatchedIso: "2026-11-03T16:38:27+00:00",
    current: 6,
    timeZone: "UTC",
  });
  assert.equal(dots.days.length, 7);
  assert.deepEqual(dots.days.map((d) => d.filled), [true, true, true, true, true, true, false]);
  assert.equal(dots.days[6].today, true);
  assert.equal(dots.stillTimeToday, true);
  assert.equal(dots.days[0].label, "T"); // Thursday Oct 29 2026
});

test("streak dots: watched today fills today", () => {
  const dots = streakDots({
    now: new Date("2026-11-04T20:00:00Z"),
    lastWatchedIso: "2026-11-04T09:00:00Z",
    current: 3,
    timeZone: "UTC",
  });
  assert.deepEqual(dots.days.map((d) => d.filled), [false, false, false, false, true, true, true]);
  assert.equal(dots.todayFilled, true);
  assert.equal(dots.stillTimeToday, false);
});

test("streak dots: a broken streak fills nothing in the window", () => {
  const dots = streakDots({ now: new Date("2026-11-04T10:00:00Z"), lastWatchedIso: "2026-10-20T10:00:00Z", current: 4, timeZone: "UTC" });
  assert.ok(dots.days.every((d) => !d.filled));
  assert.equal(dots.stillTimeToday, false);
});

test("streak dots: time zone decides which day a watch belongs to", () => {
  const args = { now: new Date("2026-11-04T10:00:00Z"), lastWatchedIso: "2026-11-03T23:30:00Z", current: 1 };
  assert.equal(streakDots({ ...args, timeZone: "UTC" }).stillTimeToday, true);
  const nicosia = streakDots({ ...args, timeZone: "Asia/Nicosia" }); // 01:30 on Nov 4 local
  assert.equal(nicosia.todayFilled, true);
});

test("timeOfDay follows the time zone and the 12/24 hour choice", () => {
  assert.equal(timeOfDay("2026-11-10T08:00:00.000Z", "en", "UTC", false), "08:00");
  assert.equal(timeOfDay("2026-11-10T08:00:00.000Z", "en", "Asia/Nicosia", false), "10:00");
  assert.match(timeOfDay("2026-11-10T08:00:00.000Z", "en", "UTC", true)!, /^8:00\s?AM$/);
  assert.equal(timeOfDay("not a date", "en"), undefined);
});
