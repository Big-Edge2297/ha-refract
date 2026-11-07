"""Helpers for response shapes that are parsed defensively."""

from __future__ import annotations

from collections.abc import Iterator
from datetime import date, datetime, timedelta
from typing import Any

from homeassistant.components.calendar import CalendarEvent
from homeassistant.util import dt as dt_util

from .analytics import parse_calendar


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
    """Turn a /v1/calendar payload into calendar events (timed when Refract knows the time)."""
    events: list[CalendarEvent] = []
    for ep in parse_calendar(payload):
        code = ""
        if isinstance(ep["season"], int) and isinstance(ep["number"], int):
            code = f" S{ep['season']:02d}E{ep['number']:02d}"

        start: date | datetime
        end: date | datetime
        air_at = dt_util.parse_datetime(ep["air_at"]) if ep["air_at"] else None
        if air_at is not None:
            start = air_at if air_at.tzinfo else air_at.replace(tzinfo=dt_util.UTC)
            end = start + timedelta(hours=1)
        else:
            start = date.fromisoformat(ep["date"])
            end = start + timedelta(days=1)

        events.append(
            CalendarEvent(start=start, end=end, summary=f"{ep['show']}{code}", description=ep["title"])
        )
    events.sort(key=lambda e: e.start_datetime_local)
    return events
