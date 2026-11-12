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


def has_episodes_waiting(item: dict[str, Any]) -> bool:
    """Whether an up-next entry still has an aired episode to watch.

    Refract's up-next list can keep a show that is fully watched (0 remaining), for instance while
    it waits for its next episode. A show without the count is kept, as before.
    """
    remaining = item.get("remaining_episodes")
    return not (isinstance(remaining, (int, float)) and not isinstance(remaining, bool) and remaining <= 0)


def first_waiting(up_next: list[dict[str, Any]]) -> dict[str, Any] | None:
    """The first up-next entry with something to watch: what "Next up" shows."""
    return next((item for item in up_next if has_episodes_waiting(item)), None)


def count_waiting(up_next: list[dict[str, Any]]) -> int:
    """How many shows have aired episodes waiting."""
    return sum(1 for item in up_next if has_episodes_waiting(item))


def poster_candidates(up_next: list[dict[str, Any]], limit: int = 10) -> list[int]:
    """TMDB ids worth a poster: the next-up show, the biggest backlogs, then the rest."""
    ordered: list[dict[str, Any]] = []
    if (first := first_waiting(up_next)) is not None:
        ordered.append(first)
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


# -------------------------------------------------------- still to finish

# Statuses that still have something left to watch. "Up to date" and "completed" don't,
# "dropped" is given up on. Paused shows stay in: they are not finished.
FINISH_STATUSES = ("planned", "in_progress", "on_hold")
_EPISODE_COUNT_KEYS = ("aired_episodes", "total_episodes", "episode_count", "episodes_count", "number_of_episodes")
_RUNTIME_KEYS = ("runtime_minutes", "runtime", "episode_runtime_minutes", "episode_runtime")
_WATCHED_KEYS = ("watched_episodes", "episodes_watched", "watched_count")


def _positive(item: dict[str, Any], keys: tuple[str, ...]) -> float | None:
    """First positive number under any of `keys`, on the item or in its `progress` block."""
    for source in (item, item.get("progress")):
        if not isinstance(source, dict):
            continue
        for key in keys:
            value = source.get(key)
            if isinstance(value, (int, float)) and not isinstance(value, bool) and value > 0:
                return value
    return None


def _item_ids(item: dict[str, Any]) -> list[str]:
    ids = item.get("ids") or (item.get("show") or {}).get("ids") or {}
    return [str(ids[key]) for key in ("refract", "tmdb") if ids.get(key) is not None]


def _tmdb_id_of(item: dict[str, Any]) -> int | None:
    ids = item.get("ids") or (item.get("show") or {}).get("ids") or {}
    value = ids.get("tmdb")
    return value if isinstance(value, int) and not isinstance(value, bool) else None


def tmdb_tv_info(body: Any) -> dict[str, Any] | None:
    """Aired episodes and a typical episode runtime from a TMDB `/tv/{id}` response.

    Aired episodes are every regular season before the last aired one, plus the last aired
    episode's number; specials (season 0) are left out. A show that hasn't aired anything has 0.
    """
    if not isinstance(body, dict):
        return None
    last = body.get("last_episode_to_air")
    aired: int | None = None
    if isinstance(last, dict) and isinstance(last.get("season_number"), int) and isinstance(last.get("episode_number"), int):
        last_season = last["season_number"]
        aired = last["episode_number"] if last_season > 0 else 0
        for season in body.get("seasons") or []:
            number, count = season.get("season_number"), season.get("episode_count")
            if isinstance(number, int) and isinstance(count, int) and 0 < number < last_season:
                aired += count
    elif body.get("status") in ("Ended", "Canceled") and isinstance(body.get("number_of_episodes"), int):
        aired = body["number_of_episodes"]
    elif last is None and "last_episode_to_air" in body:
        aired = 0
    runtimes = [r for r in body.get("episode_run_time") or [] if isinstance(r, (int, float)) and r > 0]
    runtime: float | None = sum(runtimes) / len(runtimes) if runtimes else None
    for key in ("last_episode_to_air", "next_episode_to_air"):
        value = body.get(key)
        if runtime is None and isinstance(value, dict) and isinstance(value.get("runtime"), (int, float)) and value["runtime"] > 0:
            runtime = value["runtime"]
    if aired is None and runtime is None:
        return None
    return {"episodes": aired, "runtime": runtime}


def tmdb_movie_info(body: Any) -> dict[str, Any] | None:
    """The runtime from a TMDB `/movie/{id}` response."""
    runtime = body.get("runtime") if isinstance(body, dict) else None
    if isinstance(runtime, (int, float)) and not isinstance(runtime, bool) and runtime > 0:
        return {"runtime": runtime}
    return None


def finish_lookups(library: list[dict[str, Any]]) -> tuple[list[int], list[int]]:
    """TMDB ids (shows, movies) whose episode counts or runtimes the library itself doesn't give."""
    shows: list[int] = []
    movies: list[int] = []
    for item in library:
        if item.get("status") not in FINISH_STATUSES:
            continue
        tmdb = _tmdb_id_of(item)
        if tmdb is None:
            continue
        if item.get("type") == "show" and tmdb not in shows:
            shows.append(tmdb)
        elif item.get("type") == "movie" and _positive(item, _RUNTIME_KEYS) is None and tmdb not in movies:
            movies.append(tmdb)
    return shows, movies


def build_finish(
    library: list[dict[str, Any]],
    up_next: list[dict[str, Any]],
    episode_minutes: float | None,
    movie_minutes: float | None,
    details: dict[str, dict[str, Any]] | None = None,
) -> dict[str, Any]:
    """What is left to watch: movies and shows not finished yet, with an estimated time.

    Shows being watched take their remaining aired episodes from `up_next`. Shows not started
    take an episode count from the library item, or else from `details` (TMDB lookups keyed
    `tv:<id>` and `movie:<id>`, see `tmdb_tv_info`); without either they are counted but left out
    of the episodes and the time (`unknown_episodes`), instead of guessing. Runtimes come from the
    item when Refract provides one, then from `details`, otherwise from the average runtime in the
    profile stats, and then the figure is marked as an estimate.
    """
    details = details or {}
    remaining: dict[str, int] = {}
    for entry in up_next:
        value = entry.get("remaining_episodes")
        if isinstance(value, int):
            for key in _item_ids({"show": entry.get("show")}):
                remaining[key] = value

    def blank() -> dict[str, Any]:
        return {
            "count": 0,
            "episodes": 0,
            "not_started": 0,
            "started": 0,
            "unknown_episodes": 0,
            "minutes": 0.0,
            "minutes_known": True,
        }

    groups = {"movies": blank(), "shows": blank(), "anime": blank()}
    estimated = False

    for item in library:
        if item.get("status") not in FINISH_STATUSES:
            continue
        kind = item.get("type")
        if kind == "movie":
            group = groups["movies"]
            group["count"] += 1
            runtime = _positive(item, _RUNTIME_KEYS) or details.get(f"movie:{_tmdb_id_of(item)}", {}).get("runtime")
            if runtime is None:
                runtime = movie_minutes
                estimated = estimated or runtime is not None
            if runtime is None:
                group["minutes_known"] = False
            else:
                group["minutes"] += runtime
        elif kind == "show":
            group = groups["anime" if item.get("is_anime") else "shows"]
            group["count"] += 1
            ids = _item_ids(item)
            waiting = next((remaining[i] for i in ids if i in remaining), None)
            started = (
                item.get("status") == "in_progress"
                or waiting is not None
                or bool((item.get("progress") or {}).get("last_watched_at"))
            )
            group["started" if started else "not_started"] += 1
            info = details.get(f"tv:{_tmdb_id_of(item)}", {})
            aired = info.get("episodes")
            if started:
                episodes = waiting if waiting is not None else _positive(item, ("remaining_episodes",))
                watched = _positive(item, _WATCHED_KEYS)
                if episodes is None and aired is not None and watched is not None:
                    episodes = max(0, aired - watched)
            else:
                episodes = _positive(item, _EPISODE_COUNT_KEYS)
                if episodes is None:
                    episodes = aired
            if episodes is None:
                group["unknown_episodes"] += 1
                continue
            group["episodes"] += int(episodes)
            runtime = _positive(item, _RUNTIME_KEYS) or info.get("runtime")
            if runtime is None:
                runtime = episode_minutes
                estimated = estimated or (runtime is not None and episodes > 0)
            if runtime is None:
                group["minutes_known"] = False
            else:
                group["minutes"] += episodes * runtime

    result: dict[str, Any] = {}
    total: float | None = 0
    for name, group in groups.items():
        minutes = round(group["minutes"]) if group["minutes_known"] else None
        if group["count"] and minutes is None:
            total = None  # a group with titles but no way to time them: no honest total
        elif total is not None:
            total += minutes or 0
        entry = {"count": group["count"], "minutes": minutes}
        if name != "movies":
            entry.update(
                episodes=group["episodes"],
                not_started=group["not_started"],
                started=group["started"],
                unknown_episodes=group["unknown_episodes"],
            )
        result[name] = entry

    return {
        "minutes": total,
        **result,
        "estimated": estimated,
        "unknown_episode_shows": sum(g["unknown_episodes"] for g in groups.values()),
    }


# ------------------------------------------------------------ most watched
#
# The "most watched" actor, director, writer, decade, genre and country are worked out here from
# TMDB (Refract doesn't provide them). Every title counts for the minutes watched of it, so a long
# series you finished weighs more than a movie you saw once.

# Statuses that mean the title has been watched, at least in part.
WATCHED_STATUSES = ("completed", "up_to_date", "in_progress", "on_hold", "dropped")
_WRITER_JOBS = frozenset({"Writer", "Screenplay", "Story", "Teleplay", "Creator"})
_CAST_LIMIT = 10
# A director or writer of a TV show counts when they made at least this share of its episodes (or created it):
# TMDB lists everyone who worked on any single episode, which would credit a one-episode guest with the whole show.
_CREW_SHARE = 0.25
# TMDB names TV genres differently from movie genres; use the movie names so both count together.
_TV_GENRES = {
    "Action & Adventure": ["Action", "Adventure"],
    "Sci-Fi & Fantasy": ["Science Fiction", "Fantasy"],
    "War & Politics": ["War"],
}
_PEOPLE_LIMIT = 6
TOP_LIMIT = 3


def watch_counts(payload: Any, kind: str) -> dict[int, int]:
    """Entries per TMDB id in a history payload: episodes watched per show, or plays per movie.

    `kind` is `show` for /history/episodes (each entry has a `show`) and `movie` for /history/movies.
    """
    counts: dict[int, int] = {}

    def visit(node: Any) -> None:
        if isinstance(node, list):
            for entry in node:
                visit(entry)
        elif isinstance(node, dict):
            obj = node.get(kind)
            ids = obj.get("ids") if isinstance(obj, dict) else None
            tmdb = ids.get("tmdb") if isinstance(ids, dict) else None
            if isinstance(tmdb, int) and not isinstance(tmdb, bool):
                counts[tmdb] = counts.get(tmdb, 0) + 1
                return
            for value in node.values():
                if isinstance(value, (list, dict)):
                    visit(value)

    visit(payload)
    return counts


def pick_candidates(
    library: list[dict[str, Any]], episode_counts: dict[int, int], movie_counts: dict[int, int]
) -> list[dict[str, Any]]:
    """Titles that have been watched, heaviest first, with how much of each.

    The history is the best source: episodes watched per show and plays per movie. Without it a
    watched movie counts once, and a show counts the episodes Refract says were watched, or all of
    them when it is completed or up to date. Anything else has no usable amount and is left out.
    Titles on the watchlist only count when the history shows they were watched.
    """
    out: dict[str, dict[str, Any]] = {}
    for item in library:
        tmdb = _tmdb_id_of(item)
        kind = item.get("type")
        if tmdb is None or kind not in ("movie", "show") or item.get("status") not in WATCHED_STATUSES:
            continue
        status = item.get("status")
        if kind == "movie":
            count: int | None = movie_counts.get(tmdb) or (1 if status in ("completed", "up_to_date") else None)
            assume_all = False
        else:
            count = episode_counts.get(tmdb) or None
            if count is None:
                watched = _positive(item, _WATCHED_KEYS)
                count = int(watched) if watched else None
            assume_all = count is None and status in ("completed", "up_to_date")
        if count or assume_all:
            out[f"{kind}:{tmdb}"] = {"key": f"{kind}:{tmdb}", "kind": kind, "id": tmdb, "count": count, "assume_all": assume_all}
    # History can know titles the library doesn't (removed, or not synced yet).
    for tmdb, count in movie_counts.items():
        out.setdefault(f"movie:{tmdb}", {"key": f"movie:{tmdb}", "kind": "movie", "id": tmdb, "count": count, "assume_all": False})
    for tmdb, count in episode_counts.items():
        out.setdefault(f"show:{tmdb}", {"key": f"show:{tmdb}", "kind": "show", "id": tmdb, "count": count, "assume_all": False})
    return sorted(out.values(), key=lambda c: (-(c["count"] or 0), c["key"]))


def _person(entry: Any) -> list[Any] | None:
    """`[tmdb id, name, profile path]` of a TMDB cast or crew entry."""
    if not isinstance(entry, dict):
        return None
    ident, name = entry.get("id"), entry.get("name")
    if not isinstance(ident, int) or isinstance(ident, bool) or not isinstance(name, str) or not name:
        return None
    path = entry.get("profile_path")
    return [ident, name, path if isinstance(path, str) and path else None]


def _unique(people: Iterable[list[Any] | None], limit: int) -> list[list[Any]]:
    seen: set[int] = set()
    out: list[list[Any]] = []
    for person in people:
        if person and person[0] not in seen:
            seen.add(person[0])
            out.append(person)
        if len(out) >= limit:
            break
    return out


def _genres(body: dict[str, Any], movie: bool) -> list[str]:
    names: list[str] = []
    for g in body.get("genres") or []:
        if isinstance(g, dict) and isinstance(g.get("name"), str):
            for name in [g["name"]] if movie else _TV_GENRES.get(g["name"], [g["name"]]):
                if name not in names:
                    names.append(name)
    return names


def tmdb_profile(body: Any, kind: str) -> dict[str, Any] | None:
    """What the "most watched" numbers need from a TMDB `/movie/{id}` or `/tv/{id}` response.

    The response has to come with `append_to_response=credits` (movies) or `aggregate_credits`
    (shows). People are kept as `[id, name, profile path]`: the top billed cast, the directors, and
    the writers (including the creators of a show).
    """
    if not isinstance(body, dict):
        return None
    movie = kind == "movie"
    stamp = body.get("release_date") if movie else body.get("first_air_date")
    year = int(stamp[:4]) if isinstance(stamp, str) and stamp[:4].isdigit() else None

    credits = body.get("credits" if movie else "aggregate_credits")
    credits = credits if isinstance(credits, dict) else {}
    cast_raw = [c for c in credits.get("cast") or [] if isinstance(c, dict)]
    cast_raw.sort(key=lambda c: c["order"] if isinstance(c.get("order"), int) else 10_000)
    crew = [c for c in credits.get("crew") or [] if isinstance(c, dict)]

    series_episodes = body.get("number_of_episodes")
    enough = (
        max(1.0, _CREW_SHARE * series_episodes)
        if isinstance(series_episodes, (int, float)) and not isinstance(series_episodes, bool)
        else 1.0
    )

    def jobs(member: dict[str, Any], wanted: Iterable[str]) -> bool:
        """Whether the person had one of the jobs, on enough episodes when it is a show."""
        if movie:
            return member.get("job") in wanted
        for j in member.get("jobs") or []:
            if isinstance(j, dict) and j.get("job") in wanted:
                count = j.get("episode_count")
                if not isinstance(count, (int, float)) or isinstance(count, bool) or count >= enough:
                    return True
        return False

    directors = _unique((_person(c) for c in crew if jobs(c, ("Director",))), _PEOPLE_LIMIT)
    writers = _unique(
        [_person(c) for c in crew if jobs(c, _WRITER_JOBS)]
        + ([_person(c) for c in body.get("created_by") or []] if not movie else []),
        _PEOPLE_LIMIT,
    )

    runtime: float | None = None
    if movie:
        value = body.get("runtime")
        runtime = float(value) if isinstance(value, (int, float)) and not isinstance(value, bool) and value > 0 else None
    else:
        times = [r for r in body.get("episode_run_time") or [] if isinstance(r, (int, float)) and r > 0]
        last = body.get("last_episode_to_air")
        last_runtime = last.get("runtime") if isinstance(last, dict) else None
        if times:
            runtime = sum(times) / len(times)
        elif isinstance(last_runtime, (int, float)) and last_runtime > 0:
            runtime = float(last_runtime)
    episodes = body.get("number_of_episodes")

    countries: list[list[str]] = []
    for c in body.get("production_countries") or []:
        if isinstance(c, dict) and isinstance(c.get("iso_3166_1"), str):
            countries.append([c["iso_3166_1"], c.get("name") if isinstance(c.get("name"), str) else c["iso_3166_1"]])
    if not countries:
        countries = [[c, c] for c in body.get("origin_country") or [] if isinstance(c, str)]

    return {
        "year": year,
        "poster": body.get("poster_path") if isinstance(body.get("poster_path"), str) and body.get("poster_path") else None,
        "runtime": runtime,
        "episodes": episodes if isinstance(episodes, int) and not isinstance(episodes, bool) else None,
        "genres": _genres(body, movie),
        "countries": countries,
        "cast": _unique((_person(c) for c in cast_raw), _CAST_LIMIT),
        "directors": directors,
        "writers": writers,
    }


def build_top_picks(
    candidates: list[dict[str, Any]],
    profiles: dict[str, dict[str, Any]],
    episode_minutes: float | None = None,
    movie_minutes: float | None = None,
    image_base: str = "",
) -> dict[str, Any]:
    """Actor, director, writer, decade, genre and country with the most watch time.

    Every title counts once for each of its credited people, genres and countries and gives them its
    watched minutes. The ranking is by number of titles, like the Refract app, with the hours as the
    tie-break (the top billed cast of a title are equal). `profiles` is keyed `movie:<id>` / `show:<id>`;
    titles with no profile yet are counted as `pending`, and titles TMDB doesn't know are skipped. Each ranking keeps its best `TOP_LIMIT`.
    """
    boards: dict[str, dict[Any, dict[str, Any]]] = {
        name: {} for name in ("actor", "director", "writer", "decade", "genre", "country")
    }
    used = 0
    pending = 0

    def credit(board: str, ident: Any, label: str, minutes: float, **extra: Any) -> None:
        row = boards[board].setdefault(ident, {"name": label, "minutes": 0.0, "titles": 0, **extra})
        row["minutes"] += minutes
        row["titles"] += 1

    for cand in candidates:
        profile = profiles.get(cand["key"])
        if profile is None:
            pending += 1
            continue
        if profile.get("missing"):
            continue  # TMDB doesn't know this title
        if cand["kind"] == "movie":
            runtime = profile.get("runtime") or movie_minutes
            minutes = (cand["count"] or 1) * runtime if runtime else None
        else:
            runtime = profile.get("runtime") or episode_minutes
            episodes = cand["count"] or (profile.get("episodes") if cand["assume_all"] else None)
            minutes = episodes * runtime if episodes and runtime else None
        if not minutes:
            continue
        used += 1
        for person_id, name, path in profile.get("cast") or []:
            credit("actor", person_id, name, minutes, photo=f"{image_base}{path}" if path else None, id=person_id)
        for board, field in (("director", "directors"), ("writer", "writers")):
            for person_id, name, path in profile.get(field) or []:
                credit(board, person_id, name, minutes, photo=f"{image_base}{path}" if path else None, id=person_id)
        if profile.get("year"):
            decade = profile["year"] // 10 * 10
            credit("decade", decade, f"{decade}s", minutes, decade=decade)
        for genre in profile.get("genres") or []:
            credit("genre", genre, genre, minutes)
        for code, name in profile.get("countries") or []:
            credit("country", code, name, minutes, code=code)

    def top(rows: dict[Any, dict[str, Any]]) -> list[dict[str, Any]]:
        ranked = sorted(rows.values(), key=lambda r: (-r["titles"], -r["minutes"], r["name"]))[:TOP_LIMIT]
        return [{**{k: v for k, v in r.items() if k != "minutes"}, "hours": round(r["minutes"] / 60, 1)} for r in ranked]

    return {
        "titles": used,
        "total": len(candidates),
        "pending": pending,
        **{name: top(rows) for name, rows in boards.items()},
    }


# ------------------------------------------------------------ monthly wrap
#
# One summary per completed month, built from the watch history. Refract's history only has the
# day of each watch (no time of day), so the wrap is about days, titles and amounts, not hours of
# the day. Genres, countries and posters come from the TMDB details when a key is set.

WRAP_MONTHS = 12
_WRAP_TOP_GENRES = 5
_WRAP_TOP_TITLES = 3
_WRAP_FIRSTS = 3


def iter_watch_records(episodes: Any, movies: Any) -> list[dict[str, Any]]:
    """One record per watched episode or played movie: day, title, TMDB id, rewatch, known minutes."""
    out: list[dict[str, Any]] = []

    def collect(payload: Any, kind: str) -> None:
        if isinstance(payload, list):
            for entry in payload:
                collect(entry, kind)
            return
        if not isinstance(payload, dict):
            return
        found = _first_date(payload, _WATCH_KEYS)
        obj = payload.get(kind)
        if found and isinstance(obj, dict):
            ids = obj.get("ids")
            tmdb = ids.get("tmdb") if isinstance(ids, dict) else None
            tmdb = tmdb if isinstance(tmdb, int) and not isinstance(tmdb, bool) else None
            title = obj.get("title") if isinstance(obj.get("title"), str) else ""
            if kind == "movie":
                rewatch = payload.get("kind") == "rewatch"
                minutes = None
            else:
                count = payload.get("rewatch_count")
                rewatch = isinstance(count, (int, float)) and not isinstance(count, bool) and count > 0
                runtime = payload.get("runtime_minutes")
                minutes = float(runtime) if isinstance(runtime, (int, float)) and not isinstance(runtime, bool) and runtime > 0 else None
            out.append(
                {
                    "day": found.isoformat(),
                    "kind": kind,
                    "id": tmdb,
                    "key": f"{kind}:{tmdb}" if tmdb is not None else f"{kind}:?:{title}",
                    "title": title,
                    "anime": bool(obj.get("is_anime")),
                    "rewatch": bool(rewatch),
                    "minutes": minutes,
                }
            )

    collect(episodes, "show")
    collect(movies, "movie")
    return out


def _best_streak(days: list[int]) -> int:
    best = run = 0
    for count in days:
        run = run + 1 if count else 0
        best = max(best, run)
    return best


def _previous_months(today: date, count: int) -> list[tuple[int, int]]:
    """The `count` completed months before today's, newest first, as (year, month)."""
    year, month = today.year, today.month
    out: list[tuple[int, int]] = []
    for _ in range(count):
        month -= 1
        if month == 0:
            year, month = year - 1, 12
        out.append((year, month))
    return out


def build_wraps(
    records: list[dict[str, Any]],
    profiles: dict[str, dict[str, Any]],
    today: date,
    episode_minutes: float | None = None,
    movie_minutes: float | None = None,
    image_base: str = "",
    months: int = WRAP_MONTHS,
) -> dict[str, Any]:
    """A summary per completed month (newest first, only months with something watched).

    Each month has the amounts (items, episodes, movies, titles, minutes), the day by day activity,
    the share on weekends, the best streak, first watches against rewatches, the most watched
    titles and, with TMDB details, the top genres, and the countries seen for the first time.
    `pending` counts titles of those months still waiting for their TMDB details; the countries
    "firsts" need every title of the whole history, so they only show once nothing is pending there.
    """
    wanted = _previous_months(today, months)
    in_window = set(wanted)
    by_month: dict[tuple[int, int], list[dict[str, Any]]] = {}
    first_seen: dict[str, str] = {}
    for rec in records:
        day = rec["day"]
        if rec["key"] not in first_seen or day < first_seen[rec["key"]]:
            first_seen[rec["key"]] = day
        ym = (int(day[:4]), int(day[5:7]))
        if ym in in_window:
            by_month.setdefault(ym, []).append(rec)

    def profile_of(rec: dict[str, Any]) -> dict[str, Any] | None:
        if rec["id"] is None:
            return None
        found = profiles.get(rec["key"])
        return None if not found or found.get("missing") else found

    # Titles of the whole history without details: "first from a country" can't be said yet.
    history_pending = {
        k for k in first_seen if not k.split(":")[1] == "?" and k not in profiles
    }
    # Earliest day each country appears in the history.
    country_first: dict[str, tuple[str, str, str]] = {}
    for key, day in first_seen.items():
        prof = profiles.get(key)
        if not prof or prof.get("missing"):
            continue
        for code, name in prof.get("countries") or []:
            if code not in country_first or day < country_first[code][0]:
                country_first[code] = (day, name, key)
    titles_by_key = {rec["key"]: rec["title"] for rec in records}

    out: list[dict[str, Any]] = []
    window_pending: set[str] = set()
    for year, month in wanted:
        recs = by_month.get((year, month))
        if not recs:
            continue
        days_in_month = (date(year + (month == 12), month % 12 + 1, 1) - date(year, month, 1)).days
        days = [0] * days_in_month
        minutes = 0.0
        estimated = False
        weekend = 0
        rewatches = 0
        titles: dict[str, dict[str, Any]] = {}
        genres: dict[str, set[str]] = {}
        for rec in recs:
            day_index = int(rec["day"][8:10]) - 1
            days[day_index] += 1
            if date.fromisoformat(rec["day"]).weekday() >= 5:
                weekend += 1
            if rec["rewatch"]:
                rewatches += 1
            prof = profile_of(rec)
            if rec["id"] is not None and rec["key"] not in profiles:
                window_pending.add(rec["key"])
            if rec["kind"] == "movie":
                runtime = (prof or {}).get("runtime") or movie_minutes
                if (prof or {}).get("runtime") is None:
                    estimated = True
            else:
                runtime = rec["minutes"] or (prof or {}).get("runtime") or episode_minutes
                if not rec["minutes"]:
                    estimated = True
            if runtime:
                minutes += runtime
            row = titles.setdefault(
                rec["key"],
                {"title": rec["title"], "kind": rec["kind"], "anime": rec["anime"], "id": rec["id"], "count": 0, "minutes": 0.0, "poster": None},
            )
            row["count"] += 1
            row["minutes"] += runtime or 0
            if prof and prof.get("poster"):
                row["poster"] = f"{image_base}{prof['poster']}"
            for genre in (prof or {}).get("genres") or []:
                genres.setdefault(genre, set()).add(rec["key"])

        shows = [r for r in titles.values() if r["kind"] == "show"]
        busiest_index = max(range(days_in_month), key=lambda i: (days[i], -i))
        ranked = sorted(titles.values(), key=lambda r: (-r["count"], -r["minutes"], r["title"]))[:_WRAP_TOP_TITLES]
        month_info: dict[str, Any] = {
            "month": f"{year:04d}-{month:02d}",
            "items": len(recs),
            "episodes": sum(1 for r in recs if r["kind"] == "show"),
            "movies": sum(1 for r in recs if r["kind"] == "movie"),
            "titles": len(titles),
            "show_titles": sum(1 for r in shows if not r["anime"]),
            "anime_titles": sum(1 for r in shows if r["anime"]),
            "movie_titles": sum(1 for r in titles.values() if r["kind"] == "movie"),
            "minutes": round(minutes),
            "estimated": estimated,
            "days": days,
            "active_days": sum(1 for c in days if c),
            "weekend_share": round(100 * weekend / len(recs)),
            "best_streak": _best_streak(days),
            "busiest": {"day": f"{year:04d}-{month:02d}-{busiest_index + 1:02d}", "count": days[busiest_index]},
            "first_watch": len(recs) - rewatches,
            "rewatch": rewatches,
            "top": [
                {"title": r["title"], "kind": r["kind"], "anime": r["anime"], "count": r["count"], "poster": r["poster"]}
                for r in ranked
            ],
            "genres": [
                {"name": name, "titles": len(keys)}
                for name, keys in sorted(genres.items(), key=lambda kv: (-len(kv[1]), kv[0]))[:_WRAP_TOP_GENRES]
            ],
        }
        if not history_pending:
            firsts = []
            for key, row in titles.items():
                prof = profiles.get(key)
                for code, name in (prof or {}).get("countries") or []:
                    day, _, first_key = country_first.get(code, ("", "", ""))
                    if day[:7] == f"{year:04d}-{month:02d}" and first_key == key:
                        firsts.append({"code": code, "name": name, "title": titles_by_key.get(key, row["title"]), "day": day})
            month_info["firsts"] = sorted(firsts, key=lambda f: (f["day"], f["name"]))[:_WRAP_FIRSTS]
        out.append(month_info)

    return {"months": out, "pending": len(window_pending), "firsts_ready": not history_pending}


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
