import { DOMAIN, SENSOR_KEYS, type RefractKey } from "./const";
import type { HomeAssistant, RefractCardConfig } from "./types";

const KEYS_LONGEST_FIRST = [...SENSOR_KEYS].sort((a, b) => b.length - a.length);
const KEY_SET = new Set<string>(SENSOR_KEYS);

export interface Discovery {
  deviceId?: string;
  /** Entity id object prefix shared by the account, e.g. `refract_codex_`. */
  prefix?: string;
  entities: Partial<Record<RefractKey, string>>;
}

/**
 * Entity ids an older integration version registered. Home Assistant keeps an entity's id when the
 * integration later renames it, so these still exist: 0.5.0 called the "Top picks" sensor `most_watched`.
 */
const LEGACY_IDS: Record<string, RefractKey> = { most_watched: "top_picks" };
const LEGACY_LONGEST_FIRST = Object.keys(LEGACY_IDS).sort((a, b) => b.length - a.length);

/** Match an entity object id (the part after the domain) to a Refract key. */
export function matchKey(objectId: string): { key: RefractKey; prefix: string } | undefined {
  for (const key of KEYS_LONGEST_FIRST) {
    if (objectId === key) return { key, prefix: "" };
    if (objectId.endsWith(`_${key}`)) {
      return { key, prefix: objectId.slice(0, objectId.length - key.length) };
    }
  }
  for (const legacy of LEGACY_LONGEST_FIRST) {
    if (objectId === legacy) return { key: LEGACY_IDS[legacy], prefix: "" };
    if (objectId.endsWith(`_${legacy}`)) {
      return { key: LEGACY_IDS[legacy], prefix: objectId.slice(0, objectId.length - legacy.length) };
    }
  }
  return undefined;
}

const objectIdOf = (entityId: string): string => entityId.slice(entityId.indexOf(".") + 1);

/**
 * Finds the sensors of one Refract account.
 *
 * 1. Device registry: every sensor on the same device as the chosen entity.
 * 2. Name prefix: `sensor.<prefix><key>` built from the chosen entity's id.
 * 3. Manual overrides from the `entities` config option.
 */
export function discover(hass: HomeAssistant, config: Pick<RefractCardConfig, "entity" | "device_id" | "entities">): Discovery {
  const result: Discovery = { entities: {} };
  const registry = hass.entities;
  const anchor = config.entity;

  result.deviceId = config.device_id;
  if (anchor && registry?.[anchor]?.device_id) {
    result.deviceId = registry[anchor].device_id;
  }

  if (result.deviceId && registry) {
    for (const [entityId, entry] of Object.entries(registry)) {
      if (entry.device_id !== result.deviceId || !entityId.startsWith("sensor.")) continue;
      if (entry.platform && entry.platform !== DOMAIN) continue;
      const fromTranslation =
        entry.translation_key && KEY_SET.has(entry.translation_key) ? (entry.translation_key as RefractKey) : undefined;
      const hit = fromTranslation ? { key: fromTranslation, prefix: undefined } : matchKey(objectIdOf(entityId));
      if (!hit) continue;
      if (!result.entities[hit.key]) result.entities[hit.key] = entityId;
      if (result.prefix === undefined && hit.prefix !== undefined) result.prefix = hit.prefix;
    }
  }

  if (anchor) {
    const hit = matchKey(objectIdOf(anchor));
    if (hit) {
      result.prefix ??= hit.prefix;
      for (const key of SENSOR_KEYS) {
        const id = `sensor.${hit.prefix}${key}`;
        if (!result.entities[key] && hass.states[id]) result.entities[key] = id;
      }
      for (const [legacy, key] of Object.entries(LEGACY_IDS)) {
        const id = `sensor.${hit.prefix}${legacy}`;
        if (!result.entities[key] && hass.states[id]) result.entities[key] = id;
      }
    }
  }

  for (const [key, id] of Object.entries(config.entities ?? {})) {
    if (KEY_SET.has(key) && typeof id === "string") result.entities[key as RefractKey] = id;
  }
  return result;
}

/** "Refract (Codex)" -> { main: "Refract", sub: "Codex" } */
export function splitAccountName(raw?: string): { main: string; sub?: string } {
  if (!raw) return { main: "Refract" };
  const m = raw.match(/^(.*?)\s*\(([^)]*)\)\s*$/);
  if (m && m[1]) return { main: m[1], sub: m[2] || undefined };
  return { main: raw };
}

export function accountName(hass: HomeAssistant, discovery: Discovery): string | undefined {
  const device = discovery.deviceId ? hass.devices?.[discovery.deviceId] : undefined;
  const fromDevice = device?.name_by_user || device?.name;
  if (fromDevice) return fromDevice;
  for (const id of Object.values(discovery.entities)) {
    const friendly = hass.states[id]?.attributes?.friendly_name as string | undefined;
    const m = friendly?.match(/^(.*?\([^)]*\))/);
    if (m) return m[1];
  }
  return undefined;
}
