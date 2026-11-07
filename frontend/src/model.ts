import type { RefractKey } from "./const";
import { accountName, splitAccountName, type Discovery } from "./discovery";
import { isUsable, parseNum } from "./format";
import type { HomeAssistant, RefractCardConfig } from "./types";

export interface ShowItem {
  title: string;
  year?: number;
  isAnime: boolean;
  status?: string;
  season?: number;
  number?: number;
  episodeName?: string;
  aired: boolean;
  premiere: boolean;
  finale: boolean;
  midFinale: boolean;
  airedEpisodes?: number;
  remaining?: number;
  refractId?: string;
  tmdbId?: number;
  posterUrl?: string;
}

export type NextUp = { kind: "hidden" } | { kind: "empty" } | { kind: "item"; item: ShowItem };

export interface DayCount {
  date: string;
  episodes: number;
  movies: number;
}
export interface Last7 {
  days: DayCount[];
  episodes: number;
  movies: number;
  busiest?: { date: string; count: number };
}
export interface Average {
  hours?: number;
  itemsPerWeek?: number;
  changePct?: number | null;
  estimated: boolean;
}
export interface CatchupShow {
  title: string;
  year?: number;
  remaining: number;
  isAnime: boolean;
  tmdbId?: number;
  posterUrl?: string;
}
export interface Catchup {
  total: number;
  minutes?: number;
  showCount: number;
  shows: CatchupShow[];
}
export interface AiringItem {
  date: string;
  show: string;
  season?: number;
  number?: number;
  title?: string;
  isAnime: boolean;
  premiere: boolean;
  finale: boolean;
  /** ISO instant, only when Refract knows the exact time. */
  airAt?: string;
}

export interface Model {
  found: boolean;
  accountMain: string;
  accountSub?: string;
  last?: { iso: string; title?: string; season?: number; episode?: number };
  minutes: { total?: number; shows?: number; movies?: number; anime?: number };
  library: {
    total?: number;
    movies?: number;
    shows?: number;
    anime?: number;
    completed?: number;
    inProgress?: number;
    upToDate?: number;
    watchlist?: number;
    other?: number;
  };
  moviesWatched?: number;
  episodesWatched?: number;
  streak?: { current: number; longest: number };
  next: NextUp;
  last7?: Last7;
  average?: Average;
  catchup?: Catchup;
  /** undefined when the sensor doesn't exist; empty when nothing airs. */
  airing?: AiringItem[];
  hasPosters: boolean;
}

const num = (v: unknown): number | undefined => (typeof v === "number" && Number.isFinite(v) ? v : undefined);
const sum = (values: Array<number | undefined>): number | undefined => {
  const defined = values.filter((v): v is number => v !== undefined);
  return defined.length ? defined.reduce((a, b) => a + b, 0) : undefined;
};

/** Parses the shape shared by `next_up` attributes and `shows_waiting.items[]`. */
export function parseShowItem(obj: any, fallbackTitle?: string): ShowItem | undefined {
  const show = obj?.show ?? {};
  const title: string | undefined = show.title ?? fallbackTitle;
  if (!title) return undefined;
  const ep = obj?.next_episode ?? {};
  return {
    title,
    year: num(show.year),
    isAnime: !!show.is_anime,
    status: typeof obj?.status === "string" ? obj.status : undefined,
    season: num(ep.season),
    number: num(ep.number),
    episodeName: typeof ep.name === "string" ? ep.name : undefined,
    aired: ep.aired !== false,
    premiere: !!ep.is_season_premiere,
    finale: !!ep.is_season_finale,
    midFinale: !!ep.is_mid_season_finale,
    airedEpisodes: num(obj?.aired_episodes),
    remaining: num(obj?.remaining_episodes),
    refractId: typeof show.ids?.refract === "string" ? show.ids.refract : undefined,
    tmdbId: num(show.ids?.tmdb),
    posterUrl: typeof obj?.poster_url === "string" && obj.poster_url ? obj.poster_url : undefined,
  };
}

export function buildModel(hass: HomeAssistant, discovery: Discovery, config: RefractCardConfig): Model {
  const ent = (key: RefractKey) => {
    const id = discovery.entities[key];
    return id ? hass.states[id] : undefined;
  };
  const n = (key: RefractKey) => parseNum(ent(key));

  const found = Object.keys(discovery.entities).length > 0;
  const name = splitAccountName(config.name ?? accountName(hass, discovery));

  const movies = n("movies");
  const shows = n("tv_shows");
  const anime = n("anime");
  const total = n("library_total") ?? sum([movies, shows, anime]);
  const completed = n("completed");
  const inProgress = n("in_progress");
  const upToDate = n("up_to_date");
  const watchlist = n("watchlist");
  const statusSum = sum([completed, inProgress, upToDate, watchlist]);
  const other = total !== undefined && statusSum !== undefined ? Math.max(0, total - statusSum) : undefined;

  const showsMin = n("stats_watch_time_shows_minutes");
  const moviesMin = n("stats_watch_time_movies_minutes");
  const animeMin = n("stats_watch_time_anime_minutes");
  const totalMin = n("stats_watch_time_total_minutes") ?? sum([showsMin, moviesMin, animeMin]);

  const lastState = ent("last_watched");
  const last = isUsable(lastState)
    ? {
        iso: lastState.state,
        title: typeof lastState.attributes.title === "string" ? lastState.attributes.title : undefined,
        season: num(lastState.attributes.season),
        episode: num(lastState.attributes.episode),
      }
    : undefined;

  const current = n("stats_streak_current_days");
  const longest = n("stats_streak_longest_days");

  const nextState = ent("next_up");
  let next: NextUp = { kind: "hidden" };
  if (nextState && nextState.state !== "unavailable") {
    const item = isUsable(nextState) ? parseShowItem(nextState.attributes, nextState.state) : undefined;
    next = item ? { kind: "item", item } : { kind: "empty" };
  }

  const nextItem = next.kind === "item" ? next.item : undefined;

  // last 7 days
  let last7: Last7 | undefined;
  const last7State = ent("last_7_days");
  if (isUsable(last7State) && Array.isArray(last7State.attributes.days)) {
    const days: DayCount[] = last7State.attributes.days
      .map((d: any) => ({ date: String(d?.date ?? ""), episodes: num(d?.episodes) ?? 0, movies: num(d?.movies) ?? 0 }))
      .filter((d: DayCount) => /^\d{4}-\d{2}-\d{2}$/.test(d.date));
    if (days.length) {
      const b = last7State.attributes.busiest_day;
      last7 = {
        days,
        episodes: days.reduce((a, d) => a + d.episodes, 0),
        movies: days.reduce((a, d) => a + d.movies, 0),
        busiest: typeof b?.date === "string" && num(b?.count) ? { date: b.date, count: b.count } : undefined,
      };
    }
  }

  // average per week
  let average: Average | undefined;
  const avgState = ent("average_per_week");
  if (avgState && avgState.state !== "unavailable") {
    const hours = parseNum(avgState);
    const perWeek = num(avgState.attributes.items_per_week);
    if (hours !== undefined || perWeek !== undefined) {
      const change = avgState.attributes.change_percent;
      average = {
        hours,
        itemsPerWeek: perWeek,
        changePct: typeof change === "number" ? change : null,
        estimated: avgState.attributes.estimated !== false,
      };
    }
  }

  // catch-up backlog
  let catchup: Catchup | undefined;
  const catchState = ent("catch_up");
  if (catchState && catchState.state !== "unavailable" && catchState.state !== "unknown") {
    const total = parseNum(catchState) ?? 0;
    const raw: unknown[] = Array.isArray(catchState.attributes.shows) ? catchState.attributes.shows : [];
    const shows = raw
      .map((r: any): CatchupShow | undefined => {
        const remaining = num(r?.remaining);
        if (typeof r?.title !== "string" || remaining === undefined) return undefined;
        return {
          title: r.title,
          year: num(r.year),
          remaining,
          isAnime: !!r.is_anime,
          tmdbId: num(r.tmdb_id),
          posterUrl: typeof r.poster_url === "string" && r.poster_url ? r.poster_url : undefined,
        };
      })
      .filter((x): x is CatchupShow => !!x);
    catchup = { total, minutes: num(catchState.attributes.estimated_minutes), showCount: num(catchState.attributes.show_count) ?? shows.length, shows };
  }

  // airing this week
  let airing: AiringItem[] | undefined;
  const airState = ent("airing_this_week");
  if (airState && airState.state !== "unavailable" && airState.state !== "unknown") {
    const raw: unknown[] = Array.isArray(airState.attributes.episodes) ? airState.attributes.episodes : [];
    airing = raw
      .map((r: any): AiringItem | undefined =>
        typeof r?.show === "string" && /^\d{4}-\d{2}-\d{2}$/.test(String(r?.date))
          ? { date: r.date, show: r.show, season: num(r.season), number: num(r.number), title: typeof r.title === "string" ? r.title : undefined, isAnime: !!r.is_anime, premiere: !!r.premiere, finale: !!r.finale, airAt: typeof r.air_at === "string" && r.air_at ? r.air_at : undefined }
          : undefined,
      )
      .filter((x): x is AiringItem => !!x);
  }

  const hasPosters = !!nextItem?.posterUrl || !!catchup?.shows.some((x) => x.posterUrl);

  return {
    found,
    accountMain: name.main,
    accountSub: name.sub,
    last,
    minutes: { total: totalMin, shows: showsMin, movies: moviesMin, anime: animeMin },
    library: { total, movies, shows, anime, completed, inProgress, upToDate, watchlist, other },
    moviesWatched: n("stats_movies_watched"),
    episodesWatched: sum([n("stats_shows_episodes_watched"), n("stats_anime_episodes_watched")]),
    streak: current !== undefined ? { current, longest: Math.max(longest ?? current, current) } : undefined,
    next,
    last7,
    average,
    catchup,
    airing,
    hasPosters,
  };
}
