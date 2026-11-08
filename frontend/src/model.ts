import type { RefractKey } from "./const";
import { accountName, splitAccountName, type Discovery } from "./discovery";
import { isUsable, parseNum } from "./format";
import { PICK_KINDS, type HomeAssistant, type PickKind, type RefractCardConfig } from "./types";

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

/** Identifies a show across sensors: TMDB id first, then Refract id, then the title. */
export function showKey(x: { tmdbId?: number; refractId?: string; title: string }): string {
  if (x.tmdbId !== undefined) return `tmdb:${x.tmdbId}`;
  if (x.refractId) return `refract:${x.refractId}`;
  return `title:${x.title.toLowerCase()}`;
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
  refractId?: string;
  posterUrl?: string;
  /** The next episode of this show, when the integration provides it. Lets the card mark it watched. */
  next?: ShowItem;
}
export interface FinishGroup {
  count: number;
  minutes?: number;
  /** Episodes left to watch; absent for movies. */
  episodes?: number;
  notStarted?: number;
  started?: number;
  /** Shows Refract gave no episode count for: counted, but not part of the episodes or the time. */
  unknown?: number;
}
export interface Finish {
  minutes?: number;
  movies: FinishGroup;
  shows: FinishGroup;
  anime: FinishGroup;
  estimated: boolean;
  unknownShows: number;
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

/** One entry of a "most watched" ranking. */
export interface TopPick {
  name: string;
  hours: number;
  titles: number;
  /** Profile photo of a person. */
  photoUrl?: string;
  /** ISO 3166 country code. */
  code?: string;
  decade?: number;
}
export interface TopPicks {
  /** Titles the figures are based on, of `total` watched titles. */
  titles: number;
  total: number;
  /** Titles still waiting for their details from TMDB. */
  pending: number;
  /** Best first. */
  picks: Partial<Record<PickKind, TopPick[]>>;
}

export interface StatusCount {
  /** Normalised status key: completed, up_to_date, in_progress, planned, on_hold, dropped, or anything else Refract adds. */
  key: string;
  count: number;
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
    /** Every status with at least one title, when the integration reports them. */
    statuses?: StatusCount[];
  };
  moviesWatched?: number;
  episodesWatched?: number;
  streak?: { current: number; longest: number };
  next: NextUp;
  last7?: Last7;
  topPicks?: TopPicks;
  average?: Average;
  catchup?: Catchup;
  /** Movies and shows still to finish; undefined when the sensor doesn't exist. */
  finish?: Finish;
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

const STATUS_ORDER = ["completed", "up_to_date", "in_progress", "planned", "on_hold", "dropped"];
const STATUS_ALIASES: Record<string, string> = { watchlist: "planned", paused: "on_hold", onhold: "on_hold", abandoned: "dropped" };

/** `by_status` from the library total sensor -> counts in a stable order, known statuses first. */
export function parseStatuses(raw: unknown): StatusCount[] | undefined {
  if (!raw || typeof raw !== "object" || Array.isArray(raw)) return undefined;
  const merged = new Map<string, number>();
  for (const [name, value] of Object.entries(raw as Record<string, unknown>)) {
    const count = num(value);
    if (count === undefined || count <= 0) continue;
    const normal = name.trim().toLowerCase().replace(/[\s-]+/g, "_");
    const key = STATUS_ALIASES[normal] ?? normal;
    merged.set(key, (merged.get(key) ?? 0) + count);
  }
  if (!merged.size) return undefined;
  const rank = (key: string) => {
    const i = STATUS_ORDER.indexOf(key);
    return i === -1 ? STATUS_ORDER.length : i;
  };
  return [...merged.entries()]
    .map(([key, count]) => ({ key, count }))
    .sort((a, b) => rank(a.key) - rank(b.key) || a.key.localeCompare(b.key));
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
  const statuses = parseStatuses(ent("library_total")?.attributes?.by_status);

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

  // most watched actor, director, writer, decade, genre and country
  let topPicks: TopPicks | undefined;
  const picksState = ent("top_picks");
  if (isUsable(picksState)) {
    const a = picksState.attributes;
    const picks: TopPicks["picks"] = {};
    for (const kind of PICK_KINDS) {
      const rows: TopPick[] = (Array.isArray(a[kind]) ? a[kind] : [])
        .map((r: any): TopPick | undefined =>
          typeof r?.name === "string" && num(r?.hours) !== undefined
            ? {
                name: r.name,
                hours: r.hours,
                titles: num(r.titles) ?? 0,
                photoUrl: typeof r.photo === "string" && r.photo ? r.photo : undefined,
                code: typeof r.code === "string" && r.code ? r.code : undefined,
                decade: num(r.decade),
              }
            : undefined,
        )
        .filter((x: TopPick | undefined): x is TopPick => !!x);
      if (rows.length) picks[kind] = rows;
    }
    topPicks = { titles: parseNum(picksState) ?? 0, total: num(a.total) ?? 0, pending: num(a.pending) ?? 0, picks };
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
    // Older integration versions don't put the next episode on the backlog rows;
    // the "shows waiting" sensor has it for the first few shows.
    const waiting = new Map<string, ShowItem>();
    const waitingState = ent("shows_waiting");
    if (waitingState && Array.isArray(waitingState.attributes.items)) {
      for (const entry of waitingState.attributes.items) {
        const parsed = parseShowItem(entry);
        if (parsed) waiting.set(showKey(parsed), parsed);
      }
    }
    const shows = raw
      .map((r: any): CatchupShow | undefined => {
        const remaining = num(r?.remaining);
        if (typeof r?.title !== "string" || remaining === undefined) return undefined;
        const posterUrl = typeof r.poster_url === "string" && r.poster_url ? r.poster_url : undefined;
        const refractId = typeof r.refract_id === "string" && r.refract_id ? r.refract_id : undefined;
        const row = {
          title: r.title,
          year: num(r.year),
          remaining,
          isAnime: !!r.is_anime,
          tmdbId: num(r.tmdb_id),
          refractId,
          posterUrl,
        };
        let next: ShowItem | undefined = parseShowItem(
          {
            show: { title: r.title, year: r.year, is_anime: r.is_anime, ids: { tmdb: r.tmdb_id, refract: refractId } },
            next_episode: r.next_episode,
            aired_episodes: r.aired_episodes,
            remaining_episodes: remaining,
            poster_url: posterUrl,
          },
        );
        if (next && (next.season === undefined || next.number === undefined)) next = undefined;
        next ??= waiting.get(showKey(row));
        if (next && (next.season === undefined || next.number === undefined)) next = undefined;
        if (next) next = { ...next, posterUrl: posterUrl ?? next.posterUrl, remaining: next.remaining ?? remaining };
        return { ...row, next };
      })
      .filter((x): x is CatchupShow => !!x);
    catchup = { total, minutes: num(catchState.attributes.estimated_minutes), showCount: num(catchState.attributes.show_count) ?? shows.length, shows };
  }

  // still to finish
  let finish: Finish | undefined;
  const finishState = ent("still_to_finish");
  if (isUsable(finishState)) {
    const a = finishState.attributes;
    const group = (raw: any): FinishGroup => ({
      count: Math.max(0, num(raw?.count) ?? 0),
      minutes: num(raw?.minutes),
      episodes: num(raw?.episodes),
      notStarted: num(raw?.not_started),
      started: num(raw?.started),
      unknown: num(raw?.unknown_episodes),
    });
    finish = {
      minutes: parseNum(finishState),
      movies: group(a.movies),
      shows: group(a.shows),
      anime: group(a.anime),
      estimated: a.estimated !== false,
      unknownShows: num(a.unknown_episode_shows) ?? 0,
    };
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
    library: { total, movies, shows, anime, completed, inProgress, upToDate, watchlist, other, statuses },
    moviesWatched: n("stats_movies_watched"),
    episodesWatched: sum([n("stats_shows_episodes_watched"), n("stats_anime_episodes_watched")]),
    streak: current !== undefined ? { current, longest: Math.max(longest ?? current, current) } : undefined,
    next,
    last7,
    topPicks,
    average,
    catchup,
    finish,
    airing,
    hasPosters,
  };
}
