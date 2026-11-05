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
  locale?: { language: string; time_zone?: string };
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

export interface RefractCardConfig {
  type: string;
  /** Any entity of the Refract account. Siblings are discovered from it. */
  entity?: string;
  /** Alternative to `entity`: a Refract device id. */
  device_id?: string;
  /** Overrides the account name shown in the header. */
  name?: string;
  layout?: Layout;
  streak_style?: StreakStyle;
  show_streak_toggle?: boolean;
  duration_format?: DurationFormat;
  fun_stat?: boolean;
  fun_stat_mode?: FunStatMode;
  queue_length?: number;
  show_hero?: boolean;
  show_library?: boolean;
  show_watch_time?: boolean;
  show_streak?: boolean;
  show_next_up?: boolean;
  show_queue?: boolean;
  show_actions?: boolean;
  confirm_actions?: boolean;
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
  streak_style: "gauge",
  show_streak_toggle: true,
  duration_format: "days_hours",
  fun_stat: true,
  fun_stat_mode: "rotate",
  queue_length: 5,
  show_hero: true,
  show_library: true,
  show_watch_time: true,
  show_streak: true,
  show_next_up: true,
  show_queue: true,
  show_actions: false,
  confirm_actions: true,
} as const;

export const DEFAULT_COLORS = {
  movies: "#2a78d6",
  shows: "#eb6834",
  anime: "#1baf7a",
  accent: "#6250d6",
} as const;
