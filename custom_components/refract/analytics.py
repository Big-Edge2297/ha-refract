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
    """`YYYY-MM-DD`, an ISO datetime or Refract's `{"local": "YYYY-MM-DD", "tz": ...}`.

    The day is kept as written: Refract records it on the member's own calendar.
    """
    if isinstance(value, dict):
        value = value.get("local") or value.get("date")
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


def iter_episode_watches(payload: Any) -> Iterator[tuple[date, int | None]]:
    """(day watched, runtime in minutes if Refract knows it) for every watched episode."""
    if isinstance(payload, list):
        for entry in payload:
            yield from iter_episode_watches(entry)
    elif isinstance(payload, dict):
        found = _first_date(payload, _WATCH_KEYS)
        if found and any(key in payload for key in _EPISODE_KEYS):
            runtime = payload.get("runtime_minutes")
            yield found, runtime if isinstance(runtime, (int, float)) and runtime > 0 else None
            return
        for value in payload.values():
            if isinstance(value, (list, dict)):
                yield from iter_episode_watches(value)


def iter_episode_dates(payload: Any) -> Iterator[date]:
    """Just the days, for callers that don't need runtimes."""
    for day, _ in iter_episode_watches(payload):
        yield day


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


# The change needs at least this many viewings in the earlier period, otherwise a quiet
# stretch makes any normal month look like a huge jump.
MIN_BASELINE_ITEMS = 4


def weekly_stats(
    episodes: Iterable[tuple[date, int | None]],
    movies: Iterable[date],
    today: date,
    window: int = 28,
    episode_default: float | None = None,
    movie_default: float | None = None,
) -> dict[str, Any]:
    """Viewings (and hours, when runtimes are known) per week over the last `window` days.

    Episodes use Refract's runtime when it has one, otherwise `episode_default`; movies
    use `movie_default`. The change compares against the `window` days before that, and is
    left out when that earlier period has fewer than MIN_BASELINE_ITEMS viewings.
    """
    eps, movs = list(episodes), list(movies)

    def pick(offset: int) -> tuple[list[tuple[date, int | None]], list[date]]:
        end = today - timedelta(days=offset)
        start = end - timedelta(days=window - 1)
        return (
            [e for e in eps if start <= e[0] <= end],
            [m for m in movs if start <= m <= end],
        )

    def minutes(chosen: tuple[list[tuple[date, int | None]], list[date]]) -> float | None:
        total = 0.0
        for _, runtime in chosen[0]:
            per = runtime or episode_default
            if per is None:
                return None
            total += per
        if chosen[1]:
            if movie_default is None:
                return None
            total += movie_default * len(chosen[1])
        return total

    now, before = pick(0), pick(window)
    items_now, items_before = len(now[0]) + len(now[1]), len(before[0]) + len(before[1])
    minutes_now, minutes_before = minutes(now), minutes(before)
    weeks = window / 7

    change: int | None = None
    if items_before >= MIN_BASELINE_ITEMS:
        if minutes_now is not None and minutes_before:
            change = round((minutes_now - minutes_before) / minutes_before * 100)
        else:
            change = round((items_now - items_before) / items_before * 100)
    return {
        "items_per_week": round(items_now / weeks, 1),
        "hours_per_week": round(minutes_now / 60 / weeks, 1) if minutes_now is not None else None,
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


def average_movie_minutes(flat_stats: dict[str, float]) -> float | None:
    """Average movie runtime from the profile stats."""
    minutes = flat_stats.get("watch_time_movies_minutes")
    count = flat_stats.get("movies_watched", 0)
    return minutes / count if minutes and count else None


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


_NEXT_EPISODE_KEYS = ("season", "number", "name", "aired", "is_season_premiere", "is_season_finale", "is_mid_season_finale")


def _next_episode(item: dict[str, Any]) -> dict[str, Any] | None:
    """The next unwatched episode of a show, so a card can offer to mark it watched."""
    episode = item.get("next_episode")
    if not isinstance(episode, dict) or episode.get("season") is None or episode.get("number") is None:
        return None
    return {key: episode[key] for key in _NEXT_EPISODE_KEYS if key in episode}


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
                "aired_episodes": item.get("aired_episodes") if isinstance(item.get("aired_episodes"), int) else None,
                "next_episode": _next_episode(item),
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
        is_episode = any(k in obj for k in ("number", "episode_number", "season")) or isinstance(
            obj.get("episode"), dict
        )
        if is_episode and (own or when):
            yield obj, own or when, show
            return
        for value in obj.values():
            if isinstance(value, (list, dict)):
                yield from iter_calendar_entries(value, own or when, show)


def parse_calendar(payload: Any) -> list[dict[str, Any]]:
    """Calendar payload -> episodes with a plain date, sorted by date.

    Understands Refract's layout (`show`, `episode: {season, number}`, `name`, `air_date`,
    `air_time: {kind, at}`, season premiere/finale flags) and a few simpler ones.
    """
    out = []
    for entry, when, show in iter_calendar_entries(payload):
        day = as_date(when)
        if day is None:
            continue
        ep = entry["episode"] if isinstance(entry.get("episode"), dict) else entry
        season = ep.get("season")
        number = ep.get("number", ep.get("episode_number"))
        show_obj = entry.get("show") if isinstance(entry.get("show"), dict) else {}
        ids = show_obj.get("ids") or {}
        air_time = entry.get("air_time")
        air_at = (
            air_time["at"]
            if isinstance(air_time, dict) and air_time.get("kind") == "instant" and isinstance(air_time.get("at"), str)
            else None
        )
        out.append(
            {
                "date": day.isoformat(),
                "air_at": air_at,
                "show": show or entry.get("title") or "Episode",
                "season": season if isinstance(season, int) else None,
                "number": number if isinstance(number, int) else None,
                "title": entry.get("name") or entry.get("episode_title") or ep.get("name") or (entry.get("title") if show else None),
                "tmdb_id": ids.get("tmdb") if isinstance(ids.get("tmdb"), int) else None,
                "is_anime": show_obj.get("is_anime") if isinstance(show_obj.get("is_anime"), bool) else None,
                "premiere": bool(entry.get("is_season_premiere")),
                "finale": bool(entry.get("is_season_finale") or entry.get("is_mid_season_finale")),
                "watched": bool(entry.get("watched")),
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
            is_anime = ep["is_anime"] if isinstance(ep.get("is_anime"), bool) else str(ep["show"]).lower() in anime_titles
            result.append({**ep, "is_anime": is_anime})
    return result
