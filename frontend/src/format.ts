import type { DurationFormat, FunStatMode, HassEntity, HomeAssistant } from "./types";
import { languageOf, tn } from "./localize";

const DAY_MS = 86_400_000;

export function parseNum(state?: HassEntity): number | undefined {
  if (!state) return undefined;
  const s = state.state;
  if (s === "unknown" || s === "unavailable" || s === "" || s == null) return undefined;
  const n = Number(s);
  return Number.isFinite(n) ? n : undefined;
}

export function isUsable(state?: HassEntity): state is HassEntity {
  return !!state && state.state !== "unavailable" && state.state !== "unknown";
}

export function fmtNumber(n: number, lang = "en", maxFractionDigits = 0): string {
  try {
    return new Intl.NumberFormat(lang, { maximumFractionDigits: maxFractionDigits }).format(n);
  } catch {
    return String(Math.round(n));
  }
}

/** Text keys of the units; the card picks the plural form with `tn(hass, unit, n)`. */
export type UnitKey = "unit.day" | "unit.hour" | "unit.min";
export interface DurationPart {
  value: string;
  /** The number itself, which decides the plural form of the unit. */
  n: number;
  unit: UnitKey;
  short: string;
}

/** Abbreviations that differ from "d", "h" and "min": jours, giorni, uur. */
const ABBREVIATIONS: Record<string, Partial<Record<"d" | "h" | "min", string>>> = {
  fr: { d: "j" },
  it: { d: "g" },
  nl: { h: "u" },
};

const part = (n: number, unit: "d" | "h" | "min", lang: string): DurationPart => {
  const value = fmtNumber(n, lang);
  const short = ABBREVIATIONS[lang.split("-")[0]]?.[unit] ?? unit;
  if (unit === "d") return { value, n, unit: "unit.day", short };
  if (unit === "h") return { value, n, unit: "unit.hour", short };
  return { value, n, unit: "unit.min", short };
};

/** Breaks a number of minutes into display parts such as 266 days + 14 hours. */
export function durationParts(minutes: number, format: DurationFormat = "days_hours", lang = "en"): DurationPart[] {
  const total = Math.max(0, Math.round(minutes));
  const days = Math.floor(total / 1440);
  const hours = Math.floor((total % 1440) / 60);
  const mins = total % 60;

  if (format === "hours") {
    const allHours = Math.floor(total / 60);
    return allHours > 0 ? [part(allHours, "h", lang)] : [part(mins, "min", lang)];
  }
  if (format === "auto") {
    if (days >= 1) return [part(days, "d", lang), part(hours, "h", lang)];
    if (hours >= 1) return [part(hours, "h", lang), part(mins, "min", lang)];
    return [part(mins, "min", lang)];
  }
  // days + hours, but nothing is padded with a zero: "21 h" rather than "0 d 21 h"
  if (days >= 1) return [part(days, "d", lang), part(hours, "h", lang)];
  if (hours >= 1) return [part(hours, "h", lang)];
  return [part(mins, "min", lang)];
}

/** Compact text such as "206 d 23 h". */
export function durationText(minutes: number, format: DurationFormat = "days_hours", lang = "en"): string {
  return durationParts(minutes, format, lang)
    .map((p) => `${p.value} ${p.short}`)
    .join(" ");
}

/** Whole-number percentages that add up to exactly 100 (largest remainder). */
export function shares(values: number[]): number[] {
  const total = values.reduce((a, b) => a + b, 0);
  if (total <= 0) return values.map(() => 0);
  const raw = values.map((v) => (v / total) * 100);
  const floors = raw.map(Math.floor);
  let left = 100 - floors.reduce((a, b) => a + b, 0);
  const order = raw
    .map((r, i) => ({ i, frac: r - Math.floor(r) }))
    .sort((a, b) => b.frac - a.frac);
  for (const { i } of order) {
    if (left <= 0) break;
    floors[i] += 1;
    left -= 1;
  }
  return floors;
}

// ---------------------------------------------------------------- fun stats

type FunKind = Exclude<FunStatMode, "rotate">;

/**
 * Comparisons that divide the total by the length of something. Shown from two of them up.
 * Approximations: a flight around the world at about 900 km/h, an average movie of 100 minutes,
 * a 22-episode season of 42 minutes, a marathon in 4 h 30, an Apollo trip to the Moon of 3 days,
 * and the IMDb Top 250 as 250 films of about 130 minutes.
 */
const RATIO_MINUTES: Partial<Record<FunKind, number>> = {
  workweeks: 40 * 60,
  lotr: 228 + 235 + 263,
  flights: 2670,
  movies: 100,
  seasons: 22 * 42,
  marathons: 270,
  moon: 3 * 1440,
  imdb: 250 * 130,
};

/** The order they rotate in. */
const FUN_KINDS: FunKind[] = ["months", "workweeks", "lotr", "flights", "sleep", "movies", "seasons", "marathons", "moon", "imdb"];

function funText(hass: HomeAssistant | undefined, kind: FunKind, minutes: number): string | undefined {
  const lang = languageOf(hass);
  // The plural form follows the number as it is shown: 1.0 months is "1 month", 1.4 is "1.4 months".
  const say = (key: string, value: number, digits = 0) => {
    const shown = digits ? Math.round(value * 10 ** digits) / 10 ** digits : Math.round(value);
    return tn(hass, key, shown, { n: fmtNumber(value, lang, digits) });
  };
  const days = minutes / 1440;
  if (kind === "months") {
    if (days < 1) return undefined;
    if (days < 30) return say("fun.days", days);
    const months = days / 30.4375;
    if (months < 24) return say("fun.months", months, 1);
    return say("fun.years", months / 12, 1);
  }
  if (kind === "sleep") {
    const nights = minutes / (8 * 60);
    if (nights < 365) return nights >= 2 ? say("fun.sleep_nights", nights) : undefined;
    return say("fun.sleep_years", nights / 365.25, 1);
  }
  const unit = RATIO_MINUTES[kind];
  if (!unit) return undefined;
  const times = minutes / unit;
  return times >= 2 ? say(`fun.${kind}`, times) : undefined;
}

/** One friendly comparison for the hero. Rotates once a day in "rotate" mode. */
export function funStatText(
  hass: HomeAssistant | undefined,
  minutes: number,
  mode: FunStatMode = "rotate",
  now: number = Date.now(),
): string | undefined {
  if (!(minutes >= 1440)) return undefined;
  if (mode !== "rotate") return funText(hass, mode, minutes);
  const available = FUN_KINDS.filter((k) => funText(hass, k, minutes));
  if (!available.length) return undefined;
  const pick = available[Math.floor(now / DAY_MS) % available.length];
  return funText(hass, pick, minutes);
}

// ------------------------------------------------------------------ streak

/** Day number (days since epoch) of an instant in a given time zone. */
export function localDayIndex(date: Date, timeZone?: string): number {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(date);
  const get = (type: string) => Number(parts.find((p) => p.type === type)?.value);
  return Math.round(Date.UTC(get("year"), get("month") - 1, get("day")) / DAY_MS);
}

export interface StreakDay {
  label: string;
  filled: boolean;
  today: boolean;
}

export interface StreakDots {
  days: StreakDay[];
  todayFilled: boolean;
  /** The streak ran through yesterday, so today can still extend it. */
  stillTimeToday: boolean;
}

/**
 * Builds the last seven days. The sensors have no per-day history, so the days
 * are inferred from the streak length and the timestamp of the last watch.
 */
export function streakDots(opts: {
  now: Date;
  lastWatchedIso?: string;
  current: number;
  timeZone?: string;
  lang?: string;
}): StreakDots {
  const { now, lastWatchedIso, current, timeZone, lang = "en" } = opts;
  const today = localDayIndex(now, timeZone);
  const last = lastWatchedIso ? new Date(lastWatchedIso) : undefined;
  const lastIdx = last && !isNaN(last.getTime()) ? localDayIndex(last, timeZone) : undefined;
  const label = new Intl.DateTimeFormat(lang, { weekday: "narrow", timeZone: "UTC" });

  const days: StreakDay[] = [];
  for (let i = 6; i >= 0; i--) {
    const idx = today - i;
    const filled = lastIdx !== undefined && current > 0 && idx <= lastIdx && idx > lastIdx - current;
    days.push({ label: label.format(new Date(idx * DAY_MS)), filled, today: i === 0 });
  }
  const todayFilled = days[6].filled;
  return {
    days,
    todayFilled,
    stillTimeToday: !todayFilled && current > 0 && lastIdx === today - 1,
  };
}

// ------------------------------------------------------------------- days

/** `YYYY-MM-DD` of an instant in a time zone (undefined = the browser's). */
export function isoDay(date: Date, timeZone?: string): string {
  const parts = new Intl.DateTimeFormat("en-CA", { timeZone, year: "numeric", month: "2-digit", day: "2-digit" }).formatToParts(date);
  const get = (type: string) => parts.find((p) => p.type === type)?.value ?? "";
  return `${get("year")}-${get("month")}-${get("day")}`;
}

/** Weekday name of a plain `YYYY-MM-DD` date, in the user's language. */
export function weekdayName(iso: string, lang: string, style: "narrow" | "short" | "long"): string {
  return new Intl.DateTimeFormat(lang, { weekday: style, timeZone: "UTC" }).format(new Date(`${iso}T00:00:00Z`));
}

/** Clock time of an instant, in the user's time zone and 12/24 h preference ("08:00" / "8:00 AM"). */
export function timeOfDay(iso: string, lang: string, timeZone?: string, hour12?: boolean): string | undefined {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return undefined;
  try {
    return new Intl.DateTimeFormat(lang, { hour: "numeric", minute: "2-digit", timeZone, hour12 }).format(date);
  } catch {
    return undefined;
  }
}
