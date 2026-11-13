export interface HassEntity {
  entity_id: string;
  state: string;
  attributes: Record<string, any>;
  last_changed?: string;
  last_updated?: string;
}

export interface EntityRegistryDisplayEntry {
  entity_id: string;
  device_id?: string;
  platform?: string;
  translation_key?: string;
  name?: string;
}

export interface DeviceRegistryEntry {
  id: string;
  name?: string | null;
  name_by_user?: string | null;
}

export interface HomeAssistant {
  states: Record<string, HassEntity>;
  entities?: Record<string, EntityRegistryDisplayEntry>;
  devices?: Record<string, DeviceRegistryEntry>;
  services?: Record<string, Record<string, unknown>>;
  locale?: { language: string; time_zone?: string; time_format?: string };
  config?: { time_zone?: string };
  language?: string;
  callService(
    domain: string,
    service: string,
    data?: Record<string, unknown>,
    target?: Record<string, unknown>,
  ): Promise<unknown>;
  callWS<T>(msg: { type: string; [key: string]: unknown }): Promise<T>;
}

export type StreakStyle = "gauge" | "dots";
export type DurationFormat = "days_hours" | "hours" | "auto";
export type FunStatMode =
  | "rotate"
  | "months"
  | "workweeks"
  | "lotr"
  | "flights"
  | "sleep"
  | "movies"
  | "seasons"
  | "marathons"
  | "moon"
  | "imdb";
/** `full`: every section. `compact`: watch time, still to finish and next up. `custom`: you pick the sections and their order. */
export type Layout = "full" | "compact" | "custom";
/** `bar`: compact bar with a legend. `list`: the breakdown the Refract app shows, one row per entry. */
export type BreakdownStyle = "bar" | "list";
export type LibraryStyle = BreakdownStyle;
export type WatchTimeStyle = BreakdownStyle;

/** What the "Most watched" section can show, one tile each. */
export const PICK_KINDS = ["actor", "director", "writer", "decade", "genre", "country"] as const;
export type PickKind = (typeof PICK_KINDS)[number];

/** Sections that can be shown, hidden and reordered. The header always stays on top. */
export const SECTION_IDS = [
  "hero",
  "watch_time",
  "library",
  "still_to_finish",
  "streak",
  "average",
  "last_7_days",
  "top_picks",
  "monthly_wrap",
  "next_up",
  "catchup",
  "airing",
] as const;
export type SectionId = (typeof SECTION_IDS)[number];

/**
 * Turns a configured order into a complete one: unknown and duplicate entries are
 * dropped and any section the list leaves out follows in its default position.
 */
export function resolveSectionOrder(order: unknown): SectionId[] {
  const out: SectionId[] = [];
  if (Array.isArray(order)) {
    for (const id of order) {
      if ((SECTION_IDS as readonly unknown[]).includes(id) && !out.includes(id as SectionId)) out.push(id as SectionId);
    }
  }
  for (const id of SECTION_IDS) if (!out.includes(id)) out.push(id);
  return out;
}

/** Sections the `compact` layout shows. */
export const COMPACT_SECTIONS: readonly SectionId[] = ["hero", "still_to_finish", "next_up"];

/** Whether the config switches a section off or reorders them, i.e. was set up for what is now the `custom` layout. */
export function hasSectionCustomization(config: object | undefined): boolean {
  const c = (config ?? {}) as Record<string, unknown>;
  if (c.section_order !== undefined && c.section_order !== null) return true;
  if (c.show_queue === false) return true;
  if (c.top_picks_items !== undefined && c.top_picks_items !== null) return true;
  return SECTION_IDS.some((id) => c[`show_${id}`] === false);
}

/**
 * The layout a config really uses. Cards from before the `custom` layout existed have no `layout`
 * but hide or reorder sections: those keep working as `custom`.
 */
export function resolveLayout(config: object | undefined): Layout {
  const layout = (config as { layout?: unknown } | undefined)?.layout;
  if (layout === "full" || layout === "compact" || layout === "custom") return layout;
  return hasSectionCustomization(config) ? "custom" : "full";
}

/** Sections to render, in order, for a layout. Only `custom` follows the switches and `section_order`. */
export function layoutSections(layout: Layout, config: RefractCardConfig & Record<string, any>): SectionId[] {
  if (layout === "full") return [...SECTION_IDS];
  if (layout === "compact") return SECTION_IDS.filter((id) => COMPACT_SECTIONS.includes(id));
  const on = (id: SectionId): boolean => {
    const flag = config[`show_${id}`];
    return flag === undefined ? DEFAULT_CONFIG[`show_${id}` as keyof typeof DEFAULT_CONFIG] !== false : flag !== false;
  };
  return resolveSectionOrder(config.section_order).filter(on);
}

export interface RefractCardConfig {
  type: string;
  /** Any entity of the Refract account. Siblings are discovered from it. */
  entity?: string;
  /** Alternative to `entity`: a Refract device id. */
  device_id?: string;
  /** Overrides the account name shown in the header. */
  name?: string;
  layout?: Layout;
  library_style?: LibraryStyle;
  watch_time_style?: WatchTimeStyle;
  duration_format?: DurationFormat;
  fun_stat?: boolean;
  fun_stat_mode?: FunStatMode;
  /** Rows listed in the catch-up backlog. */
  queue_length?: number;
  /** Rows listed in "Airing this week". */
  airing_length?: number;
  /** Order of the sections below the header. Sections left out follow in their default order. */
  section_order?: SectionId[];
  show_hero?: boolean;
  show_watch_time?: boolean;
  show_library?: boolean;
  show_still_to_finish?: boolean;
  show_streak?: boolean;
  show_average?: boolean;
  show_last_7_days?: boolean;
  show_top_picks?: boolean;
  show_monthly_wrap?: boolean;
  /** Monthly wrap look: colored app-style pages, or the compact tabs. */
  wrap_style?: "pages" | "tabs";
  show_next_up?: boolean;
  show_catchup?: boolean;
  show_airing?: boolean;
  /** Tiles of the "Most watched" section, in order. */
  top_picks_items?: PickKind[];
  /** Poster images (needs a TMDB key in the integration options). */
  show_posters?: boolean;
  show_actions?: boolean;
  confirm_actions?: boolean;
  /** @deprecated The streak is always shown as dots. Ignored. */
  streak_style?: StreakStyle;
  /** @deprecated Ignored. */
  show_streak_toggle?: boolean;
  /** @deprecated Renamed to `show_catchup`; still honoured when `show_catchup` is not set. */
  show_queue?: boolean;
  /** Needed only for "Mark watched" when several Refract accounts exist. */
  config_entry_id?: string;
  color_movies?: string;
  color_shows?: string;
  color_anime?: string;
  color_accent?: string;
  /** Manual overrides for discovery, keyed by sensor key. */
  entities?: Record<string, string>;
}

export const DEFAULT_CONFIG = {
  layout: "full",
  library_style: "list",
  watch_time_style: "list",
  duration_format: "days_hours",
  fun_stat: true,
  fun_stat_mode: "rotate",
  queue_length: 5,
  airing_length: 5,
  show_hero: true,
  show_watch_time: true,
  show_library: true,
  show_still_to_finish: true,
  show_streak: true,
  show_average: true,
  show_last_7_days: true,
  show_top_picks: true,
  show_monthly_wrap: true,
  wrap_style: "pages" as "pages" | "tabs",
  show_next_up: true,
  show_catchup: true,
  show_airing: true,
  top_picks_items: [...PICK_KINDS] as PickKind[],
  show_posters: true,
  show_actions: false,
  confirm_actions: true,
} as const;

export const DEFAULT_COLORS = {
  movies: "#2a78d6",
  shows: "#eb6834",
  anime: "#1baf7a",
  accent: "#6250d6",
} as const;
