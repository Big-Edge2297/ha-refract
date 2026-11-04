"""Helpers for response shapes that are parsed defensively."""

from __future__ import annotations

from collections.abc import Iterator
from datetime import date, datetime, timedelta
from typing import Any

from homeassistant.components.calendar import CalendarEvent
from homeassistant.util import dt as dt_util

_DATE_KEYS = ("airs_at", "air_date", "aired_at", "air_datetime", "airdate", "aired", "date")


def item_title(item: dict[str, Any]) -> str | None:
    """Best-effort title of a library / up-next item."""
    if item.get("title"):
        return item["title"]
    show = item.get("show")
    if isinstance(show, dict):
        return show.get("title") or show.get("name")
    return item.get("show_title")


def flatten_numbers(obj: dict[str, Any], prefix: str = "", depth: int = 0) -> Iterator[tuple[str, float]]:
    """Yield (key, number) for numeric leaves, one nested level deep."""
    for key, value in obj.items():
        full = f"{prefix}_{key}" if prefix else key
        if isinstance(value, bool):
            continue
        if isinstance(value, (int, float)):
            yield full, value
        elif isinstance(value, dict) and depth < 1:
            yield from flatten_numbers(value, full, depth + 1)


def _air_value(obj: dict[str, Any]) -> str | None:
    for key in _DATE_KEYS:
        value = obj.get(key)
        if isinstance(value, str) and value:
            return value
    return None


def _show_title(obj: dict[str, Any]) -> str | None:
    show = obj.get("show")
    if isinstance(show, dict):
        return show.get("title") or show.get("name")
    return obj.get("show_title") or obj.get("series_title")


def _iter_entries(
    obj: Any, when: str | None = None, show: str | None = None
) -> Iterator[tuple[dict[str, Any], str, str | None]]:
    if isinstance(obj, list):
        for entry in obj:
            yield from _iter_entries(entry, when, show)
    elif isinstance(obj, dict):
        own = _air_value(obj)
        show = _show_title(obj) or show
        if "episodes" in obj and obj.get("title"):
            show = obj["title"]
        is_episode = any(k in obj for k in ("number", "episode_number", "season"))
        if is_episode and (own or when):
            yield obj, own or when, show
            return
        for value in obj.values():
            if isinstance(value, (list, dict)):
                yield from _iter_entries(value, own or when, show)


def build_events(payload: Any) -> list[CalendarEvent]:
    """Turn a /v1/calendar payload into calendar events."""
    events: list[CalendarEvent] = []
    for entry, when, show in _iter_entries(payload):
        season = entry.get("season")
        number = entry.get("number", entry.get("episode_number"))
        title = show or entry.get("title") or "Episode"
        code = ""
        if isinstance(season, int) and isinstance(number, int):
            code = f" S{season:02d}E{number:02d}"
        episode_name = entry.get("episode_title") or (entry.get("title") if show else None)

        start: date | datetime
        end: date | datetime
        if len(when) == 10:
            try:
                start = date.fromisoformat(when)
            except ValueError:
                continue
            end = start + timedelta(days=1)
        else:
            parsed = dt_util.parse_datetime(when)
            if parsed is None:
                continue
            start = parsed if parsed.tzinfo else parsed.replace(tzinfo=dt_util.UTC)
            end = start + timedelta(hours=1)

        events.append(
            CalendarEvent(
                start=start,
                end=end,
                summary=f"{title}{code}",
                description=episode_name,
            )
        )
    events.sort(key=lambda e: (e.start_datetime_local))
    return events
