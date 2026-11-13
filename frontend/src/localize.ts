import type { HomeAssistant } from "./types";
import { de } from "./translations/de";
import { es } from "./translations/es";
import { fr } from "./translations/fr";
import { it } from "./translations/it";
import { nl } from "./translations/nl";
import { pl } from "./translations/pl";
import { pt } from "./translations/pt";

export type Dict = Record<string, string>;

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
  "unit.day": "days",
  "unit.day_one": "day",
  "unit.hour": "hours",
  "unit.hour_one": "hour",
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
  "picks.title": "Most watched",
  "picks.actor": "Actor",
  "picks.director": "Director",
  "picks.writer": "Writer",
  "picks.decade": "Decade",
  "picks.genre": "Genre",
  "picks.country": "Country",
  "picks.sub": "{n} titles · {time}",
  "picks.sub_one": "{n} title · {time}",
  "picks.based_on": "Based on {n} of {total} titles",
  "picks.building": "Still building",
  "picks.progress": "Collecting details from TMDB · {n} of {total} titles",
  "picks.progress_label": "Details collected from TMDB",
  "picks.more": "Show places 2 and 3",
  "picks.less": "Hide places 2 and 3",
  "picks.waiting": "Collecting details from TMDB. This fills in over the next few updates.",
  "picks.none": "Nothing to show yet.",
  "wrap.title": "Monthly wrap",
  "wrap.older": "Older month",
  "wrap.newer": "Newer month",
  "wrap.items": "{n} items watched",
  "wrap.items_one": "1 item watched",
  "wrap.tab.overview": "Overview",
  "wrap.tab.tastes": "Tastes",
  "wrap.tab.patterns": "Patterns",
  "wrap.tab.moments": "Moments",
  "wrap.hours": "Hours",
  "wrap.episodes": "Episodes",
  "wrap.movies": "Movies",
  "wrap.shows": "Shows",
  "wrap.anime": "Anime",
  "wrap.vs": "{change} vs {month}",
  "wrap.estimated": "Hours are estimated from average runtimes",
  "wrap.split": "What you watched",
  "wrap.genres": "Top genres",
  "wrap.genres_none": "Genres appear once TMDB details are available",
  "wrap.discovery": "Discovery",
  "wrap.first_watch": "First watch",
  "wrap.rewatch": "Rewatch",
  "wrap.new": "{n} new",
  "wrap.revisited": "{n} revisited",
  "wrap.items_day": "Items / day",
  "wrap.hours_day": "Hours / day",
  "wrap.daily": "Daily activity",
  "wrap.day": "{day}: {n}",
  "wrap.busiest": "Busiest day: {day} · {n} items",
  "wrap.busiest_one": "Busiest day: {day} · 1 item",
  "wrap.weekend": "On weekends",
  "wrap.streak": "Best streak",
  "wrap.active": "Active days",
  "wrap.active_value": "{n} of {total}",
  "wrap.most_watched": "Most watched",
  "wrap.episodes_n": "{n} episodes",
  "wrap.episodes_n_one": "1 episode",
  "wrap.movie_once": "Movie",
  "wrap.plays": "{n} plays",
  "wrap.firsts": "Firsts",
  "wrap.first_from": "First title from {country}",
  "wrap.firsts_none": "No new countries this month",
  "wrap.firsts_waiting": "Still collecting details from TMDB",
  "wrap.none": "No completed month with watches yet",
  "wrap.page.overview": "Your month, wrapped",
  "wrap.page.tastes": "Your tastes",
  "wrap.page.patterns": "Your patterns",
  "wrap.page.moments": "Your moments",
  "wrap.prev_page": "Previous page",
  "wrap.next_page": "Next page",
  "wrap.insight_new": "{pct}% of your watches were brand new",
  "wrap.insight_weekday": "Your busiest day of the week was {weekday}",
  "wrap.insight_top": "{title} was your most watched title",
  "empty.section": "Nothing to show here yet",
  "fun.months": "That's about {n} months of nonstop viewing",
  "fun.months_one": "That's about {n} month of nonstop viewing",
  "fun.years": "That's about {n} years of nonstop viewing",
  "fun.days": "That's about {n} days of nonstop viewing",
  "fun.days_one": "That's about {n} day of nonstop viewing",
  "fun.workweeks": "That's about {n} full-time work weeks",
  "fun.lotr": "Enough for the extended Lord of the Rings trilogy about {n} times",
  "fun.flights": "Enough time to fly around the world about {n} times",
  "fun.sleep_nights": "That's about {n} nights of sleep",
  "fun.sleep_years": "That's about {n} years of sleep at 8 hours a night",
  "fun.sleep_years_one": "That's about {n} year of sleep at 8 hours a night",
  "fun.movies": "That's about {n} average movies back to back",
  "fun.seasons": "That's about {n} full 22-episode TV seasons",
  "fun.marathons": "Enough time to run about {n} marathons",
  "fun.moon": "Enough for about {n} one-way trips to the Moon",
  "fun.imdb": "Enough to watch the whole IMDb Top 250 about {n} times",
};

/** Translations other than English. A missing key falls back to English. */
const dictionaries: Record<string, Dict> = { en, de, fr, es, it, nl, pt, pl };

/** Languages the card is translated into. */
export const LANGUAGES = Object.keys(dictionaries);

export { en as ENGLISH };

export function languageOf(hass?: HomeAssistant): string {
  return hass?.locale?.language || hass?.language || "en";
}

function dictionaryOf(hass: HomeAssistant | undefined): Dict {
  return dictionaries[languageOf(hass).split("-")[0]] ?? en;
}

function fill(text: string, vars: Record<string, string | number>): string {
  for (const [name, value] of Object.entries(vars)) {
    text = text.split(`{${name}}`).join(String(value));
  }
  return text;
}

export function t(hass: HomeAssistant | undefined, key: string, vars: Record<string, string | number> = {}): string {
  return fill(dictionaryOf(hass)[key] ?? en[key] ?? key, vars);
}

const pluralRules = new Map<string, Intl.PluralRules>();

/** The plural form of a number in a language: `zero`, `one`, `two`, `few`, `many` or `other`. */
export function pluralCategory(lang: string, n: number): Intl.LDMLPluralRule {
  try {
    let rules = pluralRules.get(lang);
    if (!rules) pluralRules.set(lang, (rules = new Intl.PluralRules(lang)));
    return rules.select(n);
  } catch {
    return n === 1 ? "one" : "other";
  }
}

/**
 * Like `t`, for a text that depends on a number. The key holds the general form, and `key_one`,
 * `key_few`, `key_many`, `key_two` or `key_zero` hold the others, as far as the language needs them.
 */
export function tn(
  hass: HomeAssistant | undefined,
  key: string,
  n: number,
  vars: Record<string, string | number> = {},
): string {
  const category = pluralCategory(languageOf(hass).split("-")[0], n);
  const dict = dictionaryOf(hass);
  const pick = (d: Dict) => (category === "other" ? d[key] : (d[`${key}_${category}`] ?? d[key]));
  return fill(pick(dict) ?? pick(en) ?? en[key] ?? key, vars);
}
