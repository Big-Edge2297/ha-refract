export const CARD_TYPE = "refract-stats-card";
export const EDITOR_TYPE = "refract-stats-card-editor";
export const DOMAIN = "refract";
export const DOCS_URL = "https://github.com/Big-Edge2297/ha-refract/blob/main/docs/dashboard-card.md";

declare const __VERSION__: string;
export const VERSION = typeof __VERSION__ === "string" ? __VERSION__ : "dev";

/** Sensor keys exposed by the Refract integration (entity id suffixes). */
export const SENSOR_KEYS = [
  "library_total",
  "completed",
  "in_progress",
  "watchlist",
  "up_to_date",
  "movies",
  "tv_shows",
  "anime",
  "last_watched",
  "shows_waiting",
  "next_up",
  "username",
  "catch_up",
  "last_7_days",
  "average_per_week",
  "airing_this_week",
  "top_picks",
  "monthly_wrap",
  "still_to_finish",
  "stats_anime_episodes_watched",
  "stats_anime_titles",
  "stats_movies_watched",
  "stats_shows_episodes_watched",
  "stats_shows_titles",
  "stats_streak_current_days",
  "stats_streak_longest_days",
  "stats_watch_time_anime_minutes",
  "stats_watch_time_movies_minutes",
  "stats_watch_time_shows_minutes",
  "stats_watch_time_total_minutes",
] as const;

export type RefractKey = (typeof SENSOR_KEYS)[number];
