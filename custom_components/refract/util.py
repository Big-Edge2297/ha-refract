"""Helpers for response shapes that are parsed defensively."""

from __future__ import annotations

from collections.abc import Iterator
from datetime import date, datetime, timedelta
from typing import Any

from homeassistant.components.calendar import CalendarEvent
from homeassistant.util import dt as dt_util

from .analytics import iter_calendar_entries


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


def build_events(payload: Any) -> list[CalendarEvent]:
    """Turn a /v1/calendar payload into calendar events."""
    events: list[CalendarEvent] = []
    for entry, when, show in iter_calendar_entries(payload):
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
