"""Pure helpers for history, backlog and calendar data.

This module deliberately imports nothing from Home Assistant so it can be unit
tested on its own. Refract's response shapes for history and the calendar are
parsed defensively: unknown layouts yield nothing rather than raising.
"""

from __future__ import annotations

from collections import Counter
from collections.abc import Iterable, Iterator
from datetime import date, timedelta
from typing import Any

_WATCH_KEYS = ("watched_at", "watched_on", "watched_date", "date", "day")
_EPISODE_KEYS = ("season", "number", "episode", "episode_number")
_AIR_KEYS = ("airs_at", "air_date", "aired_at", "air_datetime", "airdate", "aired", "date")


def as_date(value: Any) -> date | None:
    """`YYYY-MM-DD` or an ISO datetime -> date, keeping the date as written."""
    if isinstance(value, str) and len(value) >= 10:
        try:
            return date.fromisoformat(value[:10])
        except ValueError:
            return None
    return None


def _first_date(obj: dict[str, Any], keys: tuple[str, ...]) -> date | None:
    for key in keys:
        found = as_date(obj.get(key))
        if found:
            return found
    return None


# --------------------------------------------------------------- history


def iter_episode_dates(payload: Any) -> Iterator[date]:
    """Dates on which episodes were watched, from any nesting of the history."""
    if isinstance(payload, list):
        for entry in payload:
            yield from iter_episode_dates(entry)
    elif isinstance(payload, dict):
        found = _first_date(payload, _WATCH_KEYS)
        if found and any(key in payload for key in _EPISODE_KEYS):
            yield found
            return
        for value in payload.values():
            if isinstance(value, (list, dict)):
                yield from iter_episode_dates(value)


def iter_play_dates(payload: Any) -> Iterator[date]:
    """Dates on which movies were played."""
    if isinstance(payload, list):
        for entry in payload:
            yield from iter_play_dates(entry)
    elif isinstance(payload, dict):
        found = _first_date(payload, _WATCH_KEYS)
        if found:
            yield found
            return
        for value in payload.values():
            if isinstance(value, (list, dict)):
                yield from iter_play_dates(value)


def daily_counts(
    episodes: Iterable[date], movies: Iterable[date], today: date, days: int = 7
) -> list[dict[str, Any]]:
    """Episodes and movies per day for the `days` days ending today (oldest first)."""
    ep, mv = Counter(episodes), Counter(movies)
    out = []
    for back in range(days - 1, -1, -1):
        day = today - timedelta(days=back)
        out.append({"date": day.isoformat(), "episodes": ep.get(day, 0), "movies": mv.get(day, 0)})
    return out


def busiest_day(days: list[dict[str, Any]]) -> dict[str, Any] | None:
    """The day with the most viewings; the latest one wins a tie."""
    best = None
    for day in days:
        total = day["episodes"] + day["movies"]
        if total > 0 and (best is None or total >= best["count"]):
            best = {"date": day["date"], "count": total}
    return best


def weekly_stats(
    episodes: Iterable[date], movies: Iterable[date], today: date, window: int = 28
) -> dict[str, Any]:
    """Viewings per week over the last `window` days, against the window before."""
    dates = list(episodes) + list(movies)

    def count(offset: int) -> int:
        end = today - timedelta(days=offset)
        start = end - timedelta(days=window - 1)
        return sum(1 for d in dates if start <= d <= end)

    current, previous = count(0), count(window)
    change = None if previous == 0 else round((current - previous) / previous * 100)
    return {
        "items_per_week": round(current / (window / 7), 1),
        "change_percent": change,
        "window_days": window,
    }


def average_minutes(flat_stats: dict[str, float]) -> tuple[float | None, float | None]:
    """Average runtime per watched item and per episode, from the profile stats."""
    total = flat_stats.get("watch_time_total_minutes")
    episodes = flat_stats.get("shows_episodes_watched", 0) + flat_stats.get("anime_episodes_watched", 0)
    movies = flat_stats.get("movies_watched", 0)
    per_item = total / (episodes + movies) if total and (episodes + movies) > 0 else None
    episode_minutes = flat_stats.get("watch_time_shows_minutes", 0) + flat_stats.get(
        "watch_time_anime_minutes", 0
    )
    per_episode = episode_minutes / episodes if episodes and episode_minutes else None
    return per_item, per_episode


# --------------------------------------------------------------- backlog


def _tmdb_id(item: dict[str, Any]) -> int | None:
    value = ((item.get("show") or {}).get("ids") or {}).get("tmdb")
    return value if isinstance(value, int) else None


def poster_candidates(up_next: list[dict[str, Any]], limit: int = 10) -> list[int]:
    """TMDB ids worth a poster: the next-up show, the biggest backlogs, then the rest."""
    ordered: list[dict[str, Any]] = []
    if up_next:
        ordered.append(up_next[0])
    ordered += sorted(
        (i for i in up_next if isinstance(i.get("remaining_episodes"), int)),
        key=lambda i: -i["remaining_episodes"],
    )
    ordered += up_next
    ids: list[int] = []
    for item in ordered:
        tmdb = _tmdb_id(item)
        if tmdb is not None and tmdb not in ids:
            ids.append(tmdb)
        if len(ids) >= limit:
            break
    return ids


def build_backlog(
    up_next: list[dict[str, Any]],
    posters: dict[int, str],
    per_episode_minutes: float | None,
    limit: int = 20,
) -> dict[str, Any]:
    """Aired episodes waiting across every show being watched."""
    shows: list[dict[str, Any]] = []
    total = 0
    for item in up_next:
        remaining = item.get("remaining_episodes")
        if not isinstance(remaining, int) or remaining <= 0:
            continue
        show = item.get("show") or {}
        tmdb = _tmdb_id(item)
        total += remaining
        shows.append(
            {
                "title": show.get("title"),
                "year": show.get("year"),
                "is_anime": bool(show.get("is_anime")),
                "remaining": remaining,
                "tmdb_id": tmdb,
                "refract_id": (show.get("ids") or {}).get("refract"),
                "poster_url": posters.get(tmdb) if tmdb is not None else None,
            }
        )
    shows.sort(key=lambda s: (-s["remaining"], str(s["title"]).lower()))
    return {
        "total": total,
        "show_count": len(shows),
        "estimated_minutes": round(total * per_episode_minutes) if per_episode_minutes else None,
        "shows": shows[:limit],
    }


# -------------------------------------------------------------- calendar


def _show_title(obj: dict[str, Any]) -> str | None:
    show = obj.get("show")
    if isinstance(show, dict):
        return show.get("title") or show.get("name")
    return obj.get("show_title") or obj.get("series_title")


def iter_calendar_entries(
    obj: Any, when: str | None = None, show: str | None = None
) -> Iterator[tuple[dict[str, Any], str, str | None]]:
    """Yield (episode, air date string, show title) from any calendar layout."""
    if isinstance(obj, list):
        for entry in obj:
            yield from iter_calendar_entries(entry, when, show)
    elif isinstance(obj, dict):
        own = next((obj[k] for k in _AIR_KEYS if isinstance(obj.get(k), str) and obj[k]), None)
        show = _show_title(obj) or show
        if "episodes" in obj and obj.get("title"):
            show = obj["title"]
        is_episode = any(k in obj for k in ("number", "episode_number", "season"))
        if is_episode and (own or when):
            yield obj, own or when, show
            return
        for value in obj.values():
            if isinstance(value, (list, dict)):
                yield from iter_calendar_entries(value, own or when, show)


def parse_calendar(payload: Any) -> list[dict[str, Any]]:
    """Calendar payload -> episodes with a plain date, sorted by date."""
    out = []
    for entry, when, show in iter_calendar_entries(payload):
        day = as_date(when)
        if day is None:
            continue
        number = entry.get("number", entry.get("episode_number"))
        title = entry.get("episode_title") or (entry.get("title") if show else None)
        ids = ((entry.get("show") or {}).get("ids") or {}) if isinstance(entry.get("show"), dict) else {}
        out.append(
            {
                "date": day.isoformat(),
                "show": show or entry.get("title") or "Episode",
                "season": entry.get("season") if isinstance(entry.get("season"), int) else None,
                "number": number if isinstance(number, int) else None,
                "title": title,
                "tmdb_id": ids.get("tmdb") if isinstance(ids.get("tmdb"), int) else None,
            }
        )
    out.sort(key=lambda e: (e["date"], str(e["show"]).lower()))
    return out


def upcoming(
    episodes: list[dict[str, Any]], today: date, days: int = 7, anime_titles: set[str] | None = None
) -> list[dict[str, Any]]:
    """Episodes airing from today for `days` days, flagged as anime when known."""
    end = today + timedelta(days=days - 1)
    anime_titles = anime_titles or set()
    result = []
    for ep in episodes:
        day = as_date(ep["date"])
        if day and today <= day <= end:
            result.append({**ep, "is_anime": str(ep["show"]).lower() in anime_titles})
    return result
