import type { HomeAssistant } from "./types";

type Dict = Record<string, string>;

const en: Dict = {
  "card.name": "Refract stats",
  "card.description": "Watch time, library, streak and what to watch next from your Refract account.",
  "empty.no_entity": "Choose a Refract entity to get started.",
  "empty.not_found": "Couldn't find any Refract entities for {entity}.",
  "empty.nothing_up_next": "Nothing up next. Add a show or mark an episode watched.",
  "hero.total": "Total watch time",
  "hero.library": "Library",
  "hero.movies_seen": "Movies seen",
  "hero.episodes": "Episodes",
  "unit.days": "days",
  "unit.day": "day",
  "unit.hours": "hours",
  "unit.hour": "hour",
  "unit.min": "min",
  "header.last_watched": "Last watched",
  "library.title": "Library",
  "library.titles": "titles",
  "library.movies": "Movies",
  "library.shows": "TV shows",
  "library.anime": "Anime",
  "status.completed": "Completed",
  "status.up_to_date": "Up to date",
  "status.watchlist": "Watchlist",
  "status.in_progress": "In progress",
  "status.other": "Other",
  "watch.title": "Watch time",
  "streak.title": "Streak",
  "streak.gauge": "Gauge view",
  "streak.dots": "Dots view",
  "streak.longest": "Longest: {n} {unit}",
  "streak.best": "Best {n}",
  "streak.still_time": "still time today",
  "streak.none": "No active streak",
  "streak.record": "Your longest streak",
  "next.title": "Next up",
  "next.progress": "{watched} of {aired} aired episodes",
  "next.remaining": "{n} remaining",
  "next.mark": "Mark watched",
  "next.confirm": "Mark watched?",
  "next.busy": "Marking…",
  "next.done": "Marked",
  "next.error": "Couldn't mark watched",
  "queue.title": "Waiting",
  "queue.shows": "{n} shows",
  "queue.show_all": "Show all {n}",
  "queue.show_less": "Show less",
  "queue.left": "{n} left",
  "badge.premiere": "Premiere",
  "badge.finale": "Finale",
  "badge.mid_finale": "Mid-season finale",
  "badge.not_aired": "Not aired",
  "badge.anime": "Anime",
  "fun.months": "That's about {n} months of nonstop viewing",
  "fun.years": "That's about {n} years of nonstop viewing",
  "fun.days": "That's about {n} days of nonstop viewing",
  "fun.workweeks": "That's about {n} full-time work weeks",
  "fun.lotr": "Enough for the extended Lord of the Rings trilogy about {n} times",
};

const dictionaries: Record<string, Dict> = { en };

export function languageOf(hass?: HomeAssistant): string {
  return hass?.locale?.language || hass?.language || "en";
}

export function t(hass: HomeAssistant | undefined, key: string, vars: Record<string, string | number> = {}): string {
  const lang = languageOf(hass).split("-")[0];
  const dict = dictionaries[lang] ?? en;
  let text = dict[key] ?? en[key] ?? key;
  for (const [name, value] of Object.entries(vars)) {
    text = text.replace(`{${name}}`, String(value));
  }
  return text;
}
