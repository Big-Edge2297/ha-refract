import assert from "node:assert/strict";
import { beforeEach, test } from "node:test";
import { JSDOM } from "jsdom";

const dom = new JSDOM("<!doctype html><html><body></body></html>", { pretendToBeVisual: true });
Object.assign(globalThis, {
  window: dom.window,
  document: dom.window.document,
  HTMLElement: dom.window.HTMLElement,
  customElements: dom.window.customElements,
  CustomEvent: dom.window.CustomEvent,
  Node: dom.window.Node,
  ShadowRoot: dom.window.ShadowRoot,
  CSSStyleSheet: dom.window.CSSStyleSheet,
  MutationObserver: dom.window.MutationObserver,
  Event: dom.window.Event,
});

const { ENGLISH, LANGUAGES, t, tn, pluralCategory } = await import("../src/localize");
const { de } = await import("../src/translations/de");
const { fr } = await import("../src/translations/fr");
const { es } = await import("../src/translations/es");
const { it: itDict } = await import("../src/translations/it");
const { nl } = await import("../src/translations/nl");
const { pt } = await import("../src/translations/pt");
const { pl } = await import("../src/translations/pl");
const { funStatText, durationParts } = await import("../src/format");
const { makeHass } = await import("./fixture");

const TRANSLATIONS: Record<string, Record<string, string>> = { de, fr, es, it: itDict, nl, pt, pl };
const PLURAL_SUFFIX = /_(one|two|few|many|zero)$/;
const placeholders = (s: string) => new Set([...s.matchAll(/\{(\w+)\}/g)].map((m) => m[1]));
const hassIn = (language: string) => makeHass({ locale: { language, time_zone: "server" } as any, language } as any);

beforeEach(() => {
  document.body.innerHTML = "";
});

test("the card is translated into the languages the docs promise", () => {
  assert.deepEqual([...LANGUAGES].sort(), ["de", "en", "es", "fr", "it", "nl", "pl", "pt"]);
});

test("every translation has every English text, nothing unknown, and the same placeholders", () => {
  const baseKeys = Object.keys(ENGLISH).filter((k) => !PLURAL_SUFFIX.test(k));
  const singularKeys = Object.keys(ENGLISH).filter((k) => k.endsWith("_one"));
  for (const [code, dict] of Object.entries(TRANSLATIONS)) {
    for (const key of baseKeys) {
      assert.ok(dict[key]?.trim(), `${code}: ${key} is translated`);
      assert.deepEqual(placeholders(dict[key]), placeholders(ENGLISH[key]), `${code}: ${key} keeps its placeholders`);
    }
    for (const key of singularKeys) assert.ok(dict[key]?.trim(), `${code}: ${key} has a singular form`);
    for (const [key, text] of Object.entries(dict)) {
      const base = key.replace(PLURAL_SUFFIX, "");
      assert.ok(base in ENGLISH, `${code}: ${key} is a known text`);
      const family = new Set<string>();
      for (const [k, v] of Object.entries(ENGLISH)) if (k.replace(PLURAL_SUFFIX, "") === base) placeholders(v).forEach((p) => family.add(p));
      for (const p of placeholders(text)) assert.ok(family.has(p), `${code}: ${key} uses an unknown placeholder {${p}}`);
      assert.ok(text.trim() === text && text.length > 0, `${code}: ${key} has no stray spaces`);
    }
    // only Polish needs more forms than one and other
    if (code !== "pl") assert.ok(!Object.keys(dict).some((k) => /_(few|many|two|zero)$/.test(k)), `${code}: no extra plural forms`);
  }
});

test("a language and region picks the language, anything unknown falls back to English", () => {
  assert.equal(t(hassIn("de"), "hero.library"), "Bibliothek");
  assert.equal(t(hassIn("de-AT"), "hero.library"), "Bibliothek");
  assert.equal(t(hassIn("pt-BR"), "hero.library"), "Biblioteca");
  assert.equal(t(hassIn("xx"), "hero.library"), "Library");
  assert.equal(t(undefined, "hero.library"), "Library");
  assert.equal(t(hassIn("de"), "no.such.key"), "no.such.key");
  assert.equal(t(hassIn("fr"), "empty.not_found", { entity: "sensor.x" }), "Aucune entité Refract trouvée pour sensor.x.");
});

test("plural forms follow the language", () => {
  const unit = (lang: string, n: number) => tn(hassIn(lang), "unit.day", n);
  assert.deepEqual([1, 2, 5].map((n) => unit("en", n)), ["day", "days", "days"]);
  assert.deepEqual([1, 2, 5].map((n) => unit("de", n)), ["Tag", "Tage", "Tage"]);
  // Polish: one, few (2-4, 22-24), many (0, 5-21, 25-31), other (fractions)
  assert.deepEqual([1, 2, 5, 12, 22, 25, 1.5].map((n) => unit("pl", n)), ["dzień", "dni", "dni", "dni", "dni", "dni", "dnia"]);
  const hours = (n: number) => tn(hassIn("pl"), "unit.hour", n);
  assert.deepEqual([1, 2, 5, 14, 22, 1.5].map(hours), ["godzina", "godziny", "godzin", "godzin", "godziny", "godziny"]);
  const movies = (n: number) => tn(hassIn("pl"), "finish.movies", n, { n });
  assert.deepEqual([1, 3, 7, 24].map(movies), ["1 film do dokończenia", "3 filmy do dokończenia", "7 filmów do dokończenia", "24 filmy do dokończenia"]);
  // French counts 0 and 1.5 as singular
  assert.equal(tn(hassIn("fr"), "unit.day", 1.5), "jour");
  assert.equal(pluralCategory("en", 1), "one");
  assert.equal(pluralCategory("not a language", 2), "other");
  // a plural form a language doesn't have falls back to its general form
  assert.equal(tn(hassIn("de"), "unit.day", 0), "Tage");
});

test("durations carry their number so the unit can follow the language", () => {
  const [d, h] = durationParts(1440 + 60);
  assert.deepEqual([d.unit, d.n, h.unit, h.n], ["unit.day", 1, "unit.hour", 1]);
  assert.equal(tn(hassIn("pl"), d.unit, d.n), "dzień");
  assert.equal(tn(hassIn("pl"), "unit.hour", durationParts(5 * 1440 + 3 * 60)[1].n), "godziny");
});

test("every fun stat reads properly in every language, for any amount of time", () => {
  const modes = ["months", "workweeks", "lotr", "flights", "sleep", "movies", "seasons", "marathons", "moon", "imdb"] as const;
  const amounts = [1500, 3 * 1440, 40 * 1440, 70 * 1440, 400 * 1440, 383908, 5_000_000];
  for (const lang of Object.keys(TRANSLATIONS)) {
    for (const mode of modes) {
      for (const minutes of amounts) {
        const text = funStatText(hassIn(lang), minutes, mode);
        if (text === undefined) continue;
        assert.ok(!/[{}]|^fun\./.test(text), `${lang}/${mode}/${minutes}: "${text}" is filled in`);
        assert.match(text, /\d/, `${lang}/${mode}/${minutes} shows a number`);
      }
    }
  }
  // singular and plural of "months": 1.0 months, 1.4 months, 3 months
  const months = (m: number) => funStatText(hassIn("de"), Math.round(m * 30.4375 * 1440), "months");
  assert.match(months(1.0)!, /1 Monat Dauerschauen/);
  assert.match(months(3)!, /3 Monate Dauerschauen/);
  assert.match(funStatText(hassIn("pl"), 5 * 40 * 1440 * 1.5, "workweeks") ?? "x", /tygodni/);
});

test("compact durations use the abbreviations of the language", async () => {
  const { durationText } = await import("../src/format");
  const minutes = 206 * 1440 + 23 * 60;
  assert.equal(durationText(minutes, "days_hours", "en"), "206 d 23 h");
  assert.equal(durationText(minutes, "days_hours", "de"), "206 d 23 h");
  assert.equal(durationText(minutes, "days_hours", "fr"), "206 j 23 h");
  assert.equal(durationText(minutes, "days_hours", "it-IT"), "206 g 23 h");
  assert.equal(durationText(minutes, "days_hours", "nl"), "206 d 23 u");
  assert.equal(durationText(45, "days_hours", "nl"), "45 min");
});
