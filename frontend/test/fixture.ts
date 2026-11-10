import { isoDay } from "../src/format";
import type { HassEntity, HomeAssistant } from "../src/types";

export const PREFIX = "refract_codex_";

const show = (title: string, year: number, ids: { refract: string; tmdb: number }) => ({
  type: "show",
  is_anime: false,
  ids: { ...ids, imdb: "tt0", tvdb: 1 },
  title,
  original_title: title,
  year,
});

export const westworld = {
  show: show("Westworld", 2016, { refract: "357ebd89-90fc-4964-9bf3-bdcea8974b06", tmdb: 63247 }),
  status: "in_progress",
  next_episode: {
    season: 1,
    number: 7,
    episode_tmdb_id: 1226012,
    name: "Trompe L'Oeil",
    aired: true,
    is_season_premiere: false,
    is_season_finale: false,
    is_mid_season_finale: false,
  },
  aired_episodes: 36,
  remaining_episodes: 30,
  revisit: null,
  last_watched_at: "2026-11-03T16:38:27.292Z",
};

export const lupin = {
  show: show("Lupin", 2021, { refract: "f65e21d1-101d-4f22-8d4f-8c7cd56fbffd", tmdb: 96677 }),
  status: "in_progress",
  next_episode: { season: 3, number: 1, name: "Chapter 1", aired: true, is_season_premiere: true, is_season_finale: false, is_mid_season_finale: false },
  aired_episodes: 20,
  remaining_episodes: 9,
};

const entity = (key: string, state: string, attributes: Record<string, unknown> = {}, domain = "sensor"): [string, HassEntity] => {
  const entity_id = `${domain}.${PREFIX}${key}`;
  return [entity_id, { entity_id, state, attributes: { friendly_name: `Refract (Codex) ${key}`, ...attributes } }];
};

const dayOffset = (n: number): string => isoDay(new Date(Date.now() + n * 86_400_000), "UTC");

/** Sample "last 7 days": 8 episodes and 3 movies, busiest day three days ago. */
export const last7Days = [
  { date: dayOffset(-6), episodes: 1, movies: 0 },
  { date: dayOffset(-5), episodes: 0, movies: 0 },
  { date: dayOffset(-4), episodes: 2, movies: 1 },
  { date: dayOffset(-3), episodes: 3, movies: 1 },
  { date: dayOffset(-2), episodes: 0, movies: 0 },
  { date: dayOffset(-1), episodes: 2, movies: 1 },
  { date: dayOffset(0), episodes: 0, movies: 0 },
];

export const catchUpShows = [
  { title: "Westworld", year: 2016, is_anime: false, remaining: 30, aired_episodes: 36, next_episode: westworld.next_episode, tmdb_id: 63247, refract_id: westworld.show.ids.refract, poster_url: null },
  { title: "Lupin", year: 2021, is_anime: false, remaining: 9, aired_episodes: 20, next_episode: lupin.next_episode, tmdb_id: 96677, refract_id: lupin.show.ids.refract, poster_url: null },
];

export const airingEpisodes = [
  { date: dayOffset(0), show: "Westworld", season: 1, number: 10, title: "The Bicameral Mind", is_anime: false, premiere: false, finale: true, air_at: `${dayOffset(0)}T08:00:00.000Z` },
  { date: dayOffset(2), show: "Frieren", season: 1, number: 3, title: null, is_anime: true, premiere: true, finale: false, air_at: null },
];

export const states: Record<string, HassEntity> = Object.fromEntries([
  entity("library_total", "896"),
  entity("completed", "803"),
  entity("in_progress", "3"),
  entity("watchlist", "63"),
  entity("up_to_date", "23"),
  entity("movies", "693"),
  entity("tv_shows", "202"),
  entity("anime", "1"),
  entity("last_watched", "2026-11-03T16:38:27+00:00", { title: "Westworld", season: 1, episode: 6, tmdb_id: 63247 }),
  entity("shows_waiting", "20", { items: [westworld, lupin] }),
  entity("next_up", "Westworld", westworld),
  entity("stats_anime_episodes_watched", "291"),
  entity("stats_anime_titles", "1"),
  entity("stats_movies_watched", "661"),
  entity("stats_shows_episodes_watched", "7668"),
  entity("stats_shows_titles", "171"),
  entity("stats_streak_current_days", "6"),
  entity("stats_streak_longest_days", "24"),
  entity("stats_watch_time_anime_minutes", "7322"),
  entity("stats_watch_time_movies_minutes", "78542"),
  entity("stats_watch_time_shows_minutes", "298044"),
  entity("stats_watch_time_total_minutes", "383908"),
  entity("catch_up", "39", { show_count: 2, estimated_minutes: 1755, shows: catchUpShows }),
  entity("last_7_days", "11", { days: last7Days, episodes: 8, movies: 3, busiest_day: { date: dayOffset(-3), count: 4 } }),
  entity("average_per_week", "2.5", { items_per_week: 2.8, change_percent: 12, window_days: 28, estimated: true }),
  entity("airing_this_week", "2", { episodes: airingEpisodes }),
  entity("top_picks", "812", {
    total: 896,
    pending: 0,
    actor: [
      { name: "Bryan Cranston", hours: 120.5, titles: 4, id: 17419, photo: "https://image.tmdb.org/t/p/w185/bryan.jpg" },
      { name: "Aaron Paul", hours: 110, titles: 3, id: 84497, photo: "https://image.tmdb.org/t/p/w185/aaron.jpg" },
      { name: "Dean Norris", hours: 60, titles: 1, id: 1, photo: null },
    ],
    director: [{ name: "Vince Gilligan", hours: 98.4, titles: 2, id: 66633, photo: "https://image.tmdb.org/t/p/w185/vince.jpg" }],
    writer: [{ name: "Jonathan Nolan", hours: 61, titles: 1, id: 7, photo: null }],
    decade: [{ name: "2010s", hours: 1450, titles: 312, decade: 2010 }],
    genre: [{ name: "Drama", hours: 2800, titles: 401 }],
    country: [{ name: "United States of America", hours: 3900, titles: 640, code: "US" }],
  }),
  entity("still_to_finish", "37770", {
    movies: { count: 26, minutes: 3000 },
    shows: { count: 37, minutes: 34770, episodes: 701, not_started: 32, started: 5, unknown_episodes: 0 },
    anime: { count: 0, minutes: 0, episodes: 0, not_started: 0, started: 0, unknown_episodes: 0 },
    estimated: true,
    unknown_episode_shows: 0,
  }),
  entity("watchlist", "63", {}, "todo"),
]);

export function makeHass(overrides: Partial<HomeAssistant> = {}): HomeAssistant {
  return {
    states,
    locale: { language: "en", time_zone: "server" },
    config: { time_zone: "UTC" },
    callService: async () => undefined,
    callWS: async () => {
      throw new Error("not admin");
    },
    ...overrides,
  } as HomeAssistant;
}
