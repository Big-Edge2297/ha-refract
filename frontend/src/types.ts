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
export type FunStatMode = "rotate" | "months" | "workweeks" | "lotr";
export type Layout = "full" | "compact";

/** Sections that can be shown, hidden and reordered. The header always stays on top. */
export const SECTION_IDS = [
  "hero",
  "watch_time",
  "library",
  "streak",
  "average",
  "last_7_days",
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

export interface RefractCardConfig {
  type: string;
  /** Any entity of the Refract account. Siblings are discovered from it. */
  entity?: string;
  /** Alternative to `entity`: a Refract device id. */
  device_id?: string;
  /** Overrides the account name shown in the header. */
  name?: string;
  layout?: Layout;
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
  show_streak?: boolean;
  show_average?: boolean;
  show_last_7_days?: boolean;
  show_next_up?: boolean;
  show_catchup?: boolean;
  show_airing?: boolean;
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
  duration_format: "days_hours",
  fun_stat: true,
  fun_stat_mode: "rotate",
  queue_length: 5,
  airing_length: 5,
  show_hero: true,
  show_watch_time: true,
  show_library: true,
  show_streak: true,
  show_average: true,
  show_last_7_days: true,
  show_next_up: true,
  show_catchup: true,
  show_airing: true,
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
