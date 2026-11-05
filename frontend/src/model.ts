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
}

export type NextUp = { kind: "hidden" } | { kind: "empty" } | { kind: "item"; item: ShowItem };

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
  queue: ShowItem[];
  waiting?: number;
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
  };
}

const sameShow = (a: ShowItem, b: ShowItem): boolean =>
  a.refractId && b.refractId ? a.refractId === b.refractId : a.title === b.title && a.year === b.year;

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

  const waitingState = ent("shows_waiting");
  const rawItems: unknown[] = Array.isArray(waitingState?.attributes?.items) ? waitingState!.attributes.items : [];
  const nextItem = next.kind === "item" ? next.item : undefined;
  const queue = rawItems
    .map((raw) => parseShowItem(raw))
    .filter((item): item is ShowItem => !!item && !(nextItem && sameShow(item, nextItem)));

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
    queue,
    waiting: parseNum(waitingState),
  };
}
