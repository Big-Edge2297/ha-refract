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
  "hero.episodes": "Episodes watched",
  "unit.days": "days",
  "unit.day": "day",
  "unit.hours": "hours",
  "unit.hour": "hour",
  "unit.min": "min",
  "unit.h": "h",
  "header.last_watched": "Last watched",
  "library.title": "Library",
  "library.titles": "titles",
  "library.movies": "Movies",
  "library.shows": "TV shows",
  "library.anime": "Anime",
  "status.completed": "Watched",
  "status.up_to_date": "Up to Date",
  "status.watchlist": "Plan to Watch",
  "status.in_progress": "Watching",
  "status.on_hold": "On Hold",
  "status.dropped": "Dropped",
  "status.other": "Other",
  "watch.title": "Watch time",
  "finish.title": "Still to finish",
  "finish.none": "Nothing left to finish",
  "finish.movies": "{n} movies to finish",
  "finish.movies_one": "1 movie to finish",
  "finish.shows": "{n} TV shows to finish",
  "finish.shows_one": "1 TV show to finish",
  "finish.anime": "{n} anime to finish",
  "finish.anime_one": "1 anime to finish",
  "streak.title": "Streak",
  "streak.longest": "Longest: {n} {unit}",
  "streak.best": "Best {n}",
  "streak.still_time": "still time today",
  "streak.none": "No active streak",
  "next.title": "Next up",
  "next.progress": "{watched} of {aired} aired episodes",
  "next.remaining": "{n} remaining",
  "next.mark": "Mark watched",
  "next.confirm": "Mark watched?",
  "next.busy": "Marking…",
  "next.done": "Marked",
  "next.error": "Couldn't mark watched",
  "avg.title": "Average per week",
  "avg.vs_previous": "vs previous 4 weeks",
  "avg.estimated": "Estimated from your average runtime",
  "avg.items_unit": "a week",
  "avg.items_line": "{n} episodes and movies a week",
  "avg.items_line_one": "1 episode or movie a week",
  "days7.title": "Last 7 days",
  "days7.busiest": "Busiest day · {day}",
  "days7.episodes": "Episodes",
  "days7.movies": "Movies",
  "days7.none": "Nothing watched in the last 7 days",
  "catchup.title": "Catch-up backlog",
  "catchup.pick": "Show {title} in Next up",
  "catchup.waiting": "aired episodes waiting",
  "catchup.about": "about {time}",
  "catchup.none": "You're all caught up",
  "catchup.show_all": "Show all {n}",
  "catchup.show_less": "Show less",
  "airing.title": "Airing this week",
  "airing.today": "Today",
  "airing.none": "Nothing airing in the next 7 days",
  "airing.show_all": "Show all {n}",
  "airing.show_less": "Show less",
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
  "fun.flights": "Enough time to fly around the world about {n} times",
  "fun.sleep_nights": "That's about {n} nights of sleep",
  "fun.sleep_years": "That's about {n} years of sleep at 8 hours a night",
  "fun.movies": "That's about {n} average movies back to back",
  "fun.seasons": "That's about {n} full 22-episode TV seasons",
  "fun.marathons": "Enough time to run about {n} marathons",
  "fun.moon": "Enough for about {n} one-way trips to the Moon",
  "fun.imdb": "Enough to watch the whole IMDb Top 250 about {n} times",
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
