"""A small Refract and TMDB for the tests: what the APIs return for a made-up account."""

from __future__ import annotations

from typing import Any

API = "https://getrefract.app/v1"
TMDB = "https://api.themoviedb.org/3"
KEY = "rfk_test_secret_key_123456"
TMDB_KEY = "tmdb_test_secret_key_abcdef"

ME = {"id": "user-1", "username": "codex", "display_name": "Codex", "country": "CY", "timezone": "Asia/Nicosia", "profile_url": "https://getrefract.app/@codex"}


def show(title: str, year: int, tmdb: int, anime: bool = False) -> dict[str, Any]:
    return {"type": "show", "title": title, "year": year, "is_anime": anime, "ids": {"refract": f"r-{tmdb}", "tmdb": tmdb}}


def movie(title: str, year: int, tmdb: int) -> dict[str, Any]:
    return {"type": "movie", "title": title, "year": year, "is_anime": False, "ids": {"refract": f"r-{tmdb}", "tmdb": tmdb}}


LUPIN, WESTWORLD, TULSA = show("Lupin", 2021, 96677), show("Westworld", 2016, 63247), show("Tulsa King", 2022, 153312)
TOP_GUN = movie("Top Gun: Maverick", 2022, 361743)

LIBRARY: list[dict[str, Any]] = [
    {**LUPIN, "status": "up_to_date"},
    {**WESTWORLD, "status": "in_progress"},
    {**TULSA, "status": "in_progress"},
    {**TOP_GUN, "status": "completed"},
    {**movie("Planned Movie", 2024, 999001), "status": "planned"},
]


def up_next_item(s: dict[str, Any], aired: int, remaining: int) -> dict[str, Any]:
    return {
        "show": s,
        "status": "in_progress",
        "aired_episodes": aired,
        "remaining_episodes": remaining,
        "next_episode": {"season": 1, "number": aired - remaining + 1, "name": "Next", "aired": remaining > 0},
    }


# Lupin is fully watched (0 remaining) but still in Refract's up-next list, as it is in real life
UP_NEXT = [up_next_item(LUPIN, 25, 0), up_next_item(WESTWORLD, 36, 30), up_next_item(TULSA, 8, 4)]

STATS = {
    "watch_time": {"total_minutes": 384000, "shows_minutes": 300000, "movies_minutes": 80000, "anime_minutes": 4000},
    "library": {"movies_watched": 661, "episodes_watched": 7959},
}


def episode(s: dict[str, Any], day: str, season: int, number: int, runtime: int | None = 50, rewatch: int = 0) -> dict[str, Any]:
    entry: dict[str, Any] = {"show": s, "episode": {"season": season, "number": number}, "watched_at": {"local": day, "tz": "Asia/Nicosia"}, "rewatch_count": rewatch}
    if runtime:
        entry["runtime_minutes"] = runtime
    return entry


# Today in the tests is 2026-11-14. October has 3 watches, November 2 so far.
EPISODES = [
    episode(WESTWORLD, "2026-10-04", 1, 1),
    episode(WESTWORLD, "2026-10-05", 1, 2),
    episode(TULSA, "2026-10-20", 1, 1),
    episode(WESTWORLD, "2026-11-10", 1, 3),
    episode(WESTWORLD, "2026-11-12", 1, 4),
]
MOVIES = [{"movie": TOP_GUN, "kind": "first_watch", "watched_at": {"local": "2026-10-31", "tz": "Asia/Nicosia"}}]


def page(items: list[Any]) -> dict[str, Any]:
    return {"data": items, "has_more": False, "next_cursor": None}


def tmdb_movie(tmdb: int) -> dict[str, Any]:
    return {
        "id": tmdb, "release_date": "2022-05-24", "runtime": 131, "poster_path": "/topgun.jpg",
        "genres": [{"id": 28, "name": "Action"}, {"id": 18, "name": "Drama"}],
        "production_countries": [{"iso_3166_1": "US", "name": "United States of America"}],
        "credits": {
            "cast": [{"id": 500, "name": "Tom Cruise", "profile_path": "/tom.jpg", "order": 0}],
            "crew": [{"id": 600, "name": "Joseph Kosinski", "profile_path": None, "job": "Director"}],
        },
    }


def tmdb_show(tmdb: int, name: str = "Westworld") -> dict[str, Any]:
    return {
        "id": tmdb, "name": name, "first_air_date": "2016-10-02", "episode_run_time": [60], "number_of_episodes": 36,
        "poster_path": f"/{tmdb}.jpg", "genres": [{"id": 18, "name": "Drama"}, {"id": 10765, "name": "Sci-Fi & Fantasy"}],
        "origin_country": ["US"], "created_by": [{"id": 700, "name": "Jonathan Nolan", "profile_path": "/jon.jpg"}],
        "aggregate_credits": {
            "cast": [{"id": 800, "name": "Evan Rachel Wood", "profile_path": "/evan.jpg", "order": 0, "total_episode_count": 36}],
            "crew": [{"id": 700, "name": "Jonathan Nolan", "profile_path": None, "jobs": [{"job": "Writer", "episode_count": 12}]}],
        },
    }
