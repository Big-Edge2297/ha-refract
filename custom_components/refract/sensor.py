"""Refract sensors."""

from __future__ import annotations

from collections.abc import Callable
from dataclasses import dataclass
from datetime import datetime
from typing import Any

from homeassistant.components.sensor import (
    SensorDeviceClass,
    SensorEntity,
    SensorEntityDescription,
    SensorStateClass,
)
from homeassistant.const import EntityCategory
from homeassistant.core import HomeAssistant
from homeassistant.helpers.entity_platform import AddEntitiesCallback
from homeassistant.util import dt as dt_util

from .const import SCOPE_HISTORY, SCOPE_LIBRARY, SCOPE_PROFILE
from .coordinator import RefractConfigEntry, RefractCoordinator
from .entity import RefractEntity
from .util import flatten_numbers, item_title

PARALLEL_UPDATES = 0


def _count(status: str | None = None, *, kind: str | None = None, anime: bool | None = None):
    def fn(data: dict[str, Any]) -> int:
        items = data["library"]
        if status:
            items = [i for i in items if i.get("status") == status]
        if kind:
            items = [i for i in items if i.get("type") == kind]
        if anime is not None:
            items = [i for i in items if bool(i.get("is_anime")) is anime]
        return len(items)

    return fn


def _last_watched(data: dict[str, Any]) -> dict[str, Any] | None:
    watched = [i for i in data["library"] if (i.get("progress") or {}).get("last_watched_at")]
    if not watched:
        return None
    return max(watched, key=lambda i: i["progress"]["last_watched_at"])


def _last_watched_value(data: dict[str, Any]) -> datetime | None:
    item = _last_watched(data)
    return dt_util.parse_datetime(item["progress"]["last_watched_at"]) if item else None


def _last_watched_attrs(data: dict[str, Any]) -> dict[str, Any]:
    item = _last_watched(data)
    if not item:
        return {}
    last = item["progress"].get("last_watched") or {}
    return {
        "title": item.get("title"),
        "season": last.get("season"),
        "episode": last.get("number"),
        "tmdb_id": (item.get("ids") or {}).get("tmdb"),
        "is_anime": item.get("is_anime"),
    }


def _by_status(data: dict[str, Any]) -> dict[str, Any]:
    counts: dict[str, int] = {}
    for item in data["library"]:
        counts[item.get("status", "unknown")] = counts.get(item.get("status", "unknown"), 0) + 1
    return {"by_status": counts}


def _up_next_attrs(data: dict[str, Any]) -> dict[str, Any]:
    return {"items": data["up_next"][:10]}


def _next_up_value(data: dict[str, Any]) -> str | None:
    return item_title(data["up_next"][0]) if data["up_next"] else None


def _next_up_attrs(data: dict[str, Any]) -> dict[str, Any]:
    if not data["up_next"]:
        return {}
    first = dict(data["up_next"][0])
    tmdb = ((first.get("show") or {}).get("ids") or {}).get("tmdb")
    poster = data["posters"].get(tmdb) if tmdb is not None else None
    if poster:
        first["poster_url"] = poster
    return first


def _analytics(data: dict[str, Any]) -> dict[str, Any] | None:
    return data.get("analytics")


def _last_7_value(data: dict[str, Any]) -> int | None:
    info = _analytics(data)
    return info["episodes"] + info["movies"] if info else None


def _last_7_attrs(data: dict[str, Any]) -> dict[str, Any]:
    info = _analytics(data)
    if not info:
        return {}
    return {
        "days": info["days"],
        "episodes": info["episodes"],
        "movies": info["movies"],
        "busiest_day": info["busiest"],
    }


def _average_value(data: dict[str, Any]) -> float | None:
    info = _analytics(data)
    return info["average"]["hours_per_week"] if info else None


def _average_attrs(data: dict[str, Any]) -> dict[str, Any]:
    info = _analytics(data)
    return dict(info["average"]) if info else {}


@dataclass(frozen=True, kw_only=True)
class RefractSensorDescription(SensorEntityDescription):
    """Describes a Refract sensor."""

    scope: str
    value_fn: Callable[[dict[str, Any]], Any]
    attrs_fn: Callable[[dict[str, Any]], dict[str, Any]] | None = None
    needs_history: bool = False


def _library_sensor(key: str, name: str, icon: str, fn, attrs=None) -> RefractSensorDescription:
    return RefractSensorDescription(
        key=key,
        name=name,
        icon=icon,
        scope=SCOPE_LIBRARY,
        native_unit_of_measurement="titles",
        state_class=SensorStateClass.MEASUREMENT,
        value_fn=fn,
        attrs_fn=attrs,
    )


SENSORS: tuple[RefractSensorDescription, ...] = (
    _library_sensor("library_total", "Library total", "mdi:bookshelf", lambda d: len(d["library"]), _by_status),
    _library_sensor("in_progress", "In progress", "mdi:play-circle-outline", _count("in_progress")),
    _library_sensor("planned", "Watchlist", "mdi:bookmark-outline", _count("planned")),
    _library_sensor("up_to_date", "Up to date", "mdi:check-circle-outline", _count("up_to_date")),
    _library_sensor("completed", "Completed", "mdi:check-all", _count("completed")),
    _library_sensor("movies", "Movies", "mdi:movie-outline", _count(kind="movie")),
    _library_sensor("shows", "TV shows", "mdi:television-classic", _count(kind="show", anime=False)),
    _library_sensor("anime", "Anime", "mdi:star-four-points-outline", _count(anime=True)),
    RefractSensorDescription(
        key="last_watched",
        name="Last watched",
        icon="mdi:history",
        device_class=SensorDeviceClass.TIMESTAMP,
        scope=SCOPE_LIBRARY,
        value_fn=_last_watched_value,
        attrs_fn=_last_watched_attrs,
    ),
    RefractSensorDescription(
        key="up_next_count",
        name="Shows waiting",
        icon="mdi:playlist-play",
        scope=SCOPE_HISTORY,
        native_unit_of_measurement="shows",
        value_fn=lambda d: len(d["up_next"]),
        attrs_fn=_up_next_attrs,
    ),
    RefractSensorDescription(
        key="next_up",
        name="Next up",
        icon="mdi:television-play",
        scope=SCOPE_HISTORY,
        value_fn=_next_up_value,
        attrs_fn=_next_up_attrs,
    ),
    RefractSensorDescription(
        key="catch_up",
        name="Catch up",
        icon="mdi:playlist-check",
        scope=SCOPE_HISTORY,
        native_unit_of_measurement="episodes",
        state_class=SensorStateClass.MEASUREMENT,
        value_fn=lambda d: d["backlog"]["total"],
        attrs_fn=lambda d: {k: v for k, v in d["backlog"].items() if k != "total"},
    ),
    RefractSensorDescription(
        key="still_to_finish",
        name="Still to finish",
        icon="mdi:timer-sand",
        device_class=SensorDeviceClass.DURATION,
        native_unit_of_measurement="min",
        state_class=SensorStateClass.MEASUREMENT,
        scope=SCOPE_LIBRARY,
        value_fn=lambda d: d["finish"]["minutes"],
        attrs_fn=lambda d: {k: v for k, v in d["finish"].items() if k != "minutes"},
    ),
    RefractSensorDescription(
        key="last_7_days",
        name="Last 7 days",
        icon="mdi:chart-bar",
        scope=SCOPE_HISTORY,
        native_unit_of_measurement="views",
        state_class=SensorStateClass.MEASUREMENT,
        value_fn=_last_7_value,
        attrs_fn=_last_7_attrs,
        needs_history=True,
    ),
    RefractSensorDescription(
        key="average_per_week",
        name="Average per week",
        icon="mdi:calendar-week",
        scope=SCOPE_HISTORY,
        device_class=SensorDeviceClass.DURATION,
        native_unit_of_measurement="h",
        state_class=SensorStateClass.MEASUREMENT,
        value_fn=_average_value,
        attrs_fn=_average_attrs,
        needs_history=True,
    ),
    RefractSensorDescription(
        key="airing_this_week",
        name="Airing this week",
        icon="mdi:calendar-star",
        scope=SCOPE_LIBRARY,
        native_unit_of_measurement="episodes",
        value_fn=lambda d: len(d["airing"]),
        attrs_fn=lambda d: {"episodes": d["airing"]},
    ),
    RefractSensorDescription(
        key="username",
        name="Username",
        icon="mdi:account",
        entity_category=EntityCategory.DIAGNOSTIC,
        scope=SCOPE_PROFILE,
        value_fn=lambda d: (d["me"] or {}).get("username"),
        attrs_fn=lambda d: {
            k: (d["me"] or {}).get(k) for k in ("display_name", "country", "timezone", "profile_url")
        },
    ),
)


async def async_setup_entry(
    hass: HomeAssistant, entry: RefractConfigEntry, async_add_entities: AddEntitiesCallback
) -> None:
    coordinator = entry.runtime_data.coordinator
    scopes = coordinator.data["scopes"]

    history_on = coordinator.data["history_enabled"]
    entities: list[SensorEntity] = [
        RefractSensor(coordinator, desc)
        for desc in SENSORS
        if scopes.get(desc.scope) and (history_on or not desc.needs_history)
    ]
    # Stats: one sensor per numeric field, so new fields appear automatically.
    if scopes.get(SCOPE_HISTORY):
        entities += [
            RefractStatsSensor(coordinator, key)
            for key, _ in flatten_numbers(coordinator.data["stats"])
        ]
    async_add_entities(entities)


class RefractSensor(RefractEntity, SensorEntity):
    """Sensor driven by a description."""

    entity_description: RefractSensorDescription
    _unrecorded_attributes = frozenset({"items", "days", "shows", "episodes"})

    def __init__(self, coordinator: RefractCoordinator, description: RefractSensorDescription) -> None:
        super().__init__(coordinator, description.key)
        self.entity_description = description

    @property
    def native_value(self) -> Any:
        return self.entity_description.value_fn(self.coordinator.data)

    @property
    def extra_state_attributes(self) -> dict[str, Any] | None:
        fn = self.entity_description.attrs_fn
        return fn(self.coordinator.data) if fn else None


class RefractStatsSensor(RefractEntity, SensorEntity):
    """A numeric field from /v1/stats."""

    _attr_state_class = SensorStateClass.MEASUREMENT
    _attr_icon = "mdi:chart-box-outline"

    def __init__(self, coordinator: RefractCoordinator, field: str) -> None:
        super().__init__(coordinator, f"stats_{field}")
        self._field = field
        self._attr_name = f"Stats {field.replace('_', ' ')}"
        lowered = field.lower()
        if "minute" in lowered:
            self._attr_native_unit_of_measurement = "min"
        elif "hour" in lowered:
            self._attr_native_unit_of_measurement = "h"
        elif "second" in lowered:
            self._attr_native_unit_of_measurement = "s"

    @property
    def native_value(self) -> float | None:
        return dict(flatten_numbers(self.coordinator.data["stats"])).get(self._field)
