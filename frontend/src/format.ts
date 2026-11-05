import type { DurationFormat, FunStatMode, HassEntity, HomeAssistant } from "./types";
import { languageOf, t } from "./localize";

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

export type UnitKey = "unit.days" | "unit.day" | "unit.hours" | "unit.hour" | "unit.min";
export interface DurationPart {
  value: string;
  unit: UnitKey;
  short: string;
}

const part = (n: number, unit: "d" | "h" | "min", lang: string): DurationPart => {
  const value = fmtNumber(n, lang);
  if (unit === "d") return { value, unit: n === 1 ? "unit.day" : "unit.days", short: "d" };
  if (unit === "h") return { value, unit: n === 1 ? "unit.hour" : "unit.hours", short: "h" };
  return { value, unit: "unit.min", short: "min" };
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
  return [part(days, "d", lang), part(hours, "h", lang)];
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

const LOTR_EXTENDED_MINUTES = 228 + 235 + 263;

type FunKind = Exclude<FunStatMode, "rotate">;

function funText(hass: HomeAssistant | undefined, kind: FunKind, minutes: number): string | undefined {
  const lang = languageOf(hass);
  const days = minutes / 1440;
  switch (kind) {
    case "months": {
      if (days < 1) return undefined;
      if (days < 30) return t(hass, "fun.days", { n: fmtNumber(days, lang) });
      const months = days / 30.4375;
      if (months < 24) return t(hass, "fun.months", { n: fmtNumber(months, lang, 1) });
      return t(hass, "fun.years", { n: fmtNumber(months / 12, lang, 1) });
    }
    case "workweeks": {
      const weeks = minutes / 60 / 40;
      return weeks >= 2 ? t(hass, "fun.workweeks", { n: fmtNumber(weeks, lang) }) : undefined;
    }
    case "lotr": {
      const times = minutes / LOTR_EXTENDED_MINUTES;
      return times >= 2 ? t(hass, "fun.lotr", { n: fmtNumber(times, lang) }) : undefined;
    }
  }
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
  const kinds: FunKind[] = ["months", "workweeks", "lotr"];
  const available = kinds.filter((k) => funText(hass, k, minutes));
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
