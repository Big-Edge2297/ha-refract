"""Tests for the pure helpers in custom_components/refract/analytics.py.

The module is loaded by path because importing the package would pull in Home Assistant.
"""

import importlib.util
from datetime import date
from pathlib import Path

SPEC = importlib.util.spec_from_file_location(
    "refract_analytics",
    Path(__file__).resolve().parents[1] / "custom_components" / "refract" / "analytics.py",
)
a = importlib.util.module_from_spec(SPEC)
SPEC.loader.exec_module(a)

TODAY = date(2026, 11, 6)  # a Friday


def d(offset: int) -> date:
    return date.fromordinal(TODAY.toordinal() + offset)


def test_as_date_keeps_the_written_day():
    assert a.as_date("2026-11-04") == date(2026, 11, 4)
    assert a.as_date("2026-11-04T23:30:00-05:00") == date(2026, 11, 4)
    assert a.as_date({"local": "2024-04-03", "tz": "Asia/Nicosia"}) == date(2024, 4, 3)
    assert a.as_date({"tz": "Asia/Nicosia"}) is None
    assert a.as_date("nope") is None
    assert a.as_date(None) is None


REAL_EPISODES = [
    {
        "show": {"type": "show", "is_anime": False, "ids": {"refract": "x", "tmdb": 100088}, "title": "The Last of Us", "year": 2023},
        "episode": {"season": 0, "number": 1},
        "episode_tmdb_id": None,
        "watched_at": {"local": "2024-04-03", "tz": "Asia/Nicosia"},
        "rewatch_count": 0,
        "is_special": True,
        "runtime_minutes": None,
    },
    {
        "show": {"type": "show", "is_anime": False, "ids": {"refract": "x", "tmdb": 100088}, "title": "The Last of Us", "year": 2023},
        "episode": {"season": 1, "number": 2},
        "watched_at": {"local": "2026-11-04", "tz": "Asia/Nicosia"},
        "rewatch_count": 1,
        "is_special": False,
        "runtime_minutes": 52,
    },
]
REAL_MOVIES = [
    {"id": "1", "movie": {"title": "Top Gun: Maverick", "ids": {"tmdb": 361743}}, "kind": "first_watch",
     "watched_at": {"local": "2022-11-17", "tz": "Asia/Nicosia"}},
    {"id": "2", "movie": {"title": "How to Make a Killing"}, "kind": "rewatch",
     "watched_at": {"local": "2026-03-30", "tz": "Asia/Nicosia"}},
]


def test_real_refract_history_payloads():
    assert list(a.iter_episode_watches(REAL_EPISODES)) == [(date(2024, 4, 3), None), (date(2026, 11, 4), 52)]
    assert list(a.iter_episode_dates(REAL_EPISODES)) == [date(2024, 4, 3), date(2026, 11, 4)]
    assert list(a.iter_play_dates(REAL_MOVIES)) == [date(2022, 11, 17), date(2026, 3, 30)]


def test_episode_dates_flat_and_grouped():
    flat = [{"season": 1, "number": 2, "watched_at": "2026-11-05"}]
    grouped = [
        {"show": {"title": "A"}, "episodes": [
            {"season": 1, "number": 1, "watched_on": "2026-11-04T18:00:00Z"},
            {"season": 1, "number": 2},  # watched, but no day recorded
        ]}
    ]
    assert list(a.iter_episode_dates(flat)) == [date(2026, 11, 5)]
    assert list(a.iter_episode_dates(grouped)) == [date(2026, 11, 4)]
    assert list(a.iter_episode_dates({"unexpected": "shape"})) == []


def test_play_dates():
    plays = [{"movie": {"title": "M"}, "watched_at": "2026-11-03"}, {"movie": {"title": "N"}}]
    assert list(a.iter_play_dates(plays)) == [date(2026, 11, 3)]


def test_daily_counts_window_and_order():
    days = a.daily_counts([d(0), d(0), d(-6), d(-7)], [d(-1)], TODAY)
    assert [x["date"] for x in days] == [d(-6 + i).isoformat() for i in range(7)]
    assert days[0]["episodes"] == 1 and days[6]["episodes"] == 2 and days[5]["movies"] == 1
    assert sum(x["episodes"] for x in days) == 3, "the day outside the window is excluded"


def test_busiest_day_latest_wins_a_tie_and_none_when_empty():
    days = a.daily_counts([d(-3), d(-3), d(-1), d(-1)], [], TODAY)
    assert a.busiest_day(days) == {"date": d(-1).isoformat(), "count": 2}
    assert a.busiest_day(a.daily_counts([], [], TODAY)) is None


def eps(*offsets, runtime=None):
    return [(d(o), runtime) for o in offsets]


def test_weekly_stats_items_and_change():
    now = eps(*range(0, -28, -2))  # 14 in the last 28 days
    before = eps(*range(-28, -42, -1))  # 14 in the 28 days before
    assert a.weekly_stats(now, [], TODAY)["items_per_week"] == 3.5
    assert a.weekly_stats(now, [], TODAY)["change_percent"] is None, "no baseline"
    assert a.weekly_stats(now + before[:7], [], TODAY)["change_percent"] == 100
    assert a.weekly_stats(now, [d(-30)] * 14, TODAY)["change_percent"] == 0
    assert a.weekly_stats(now, [], TODAY)["hours_per_week"] is None, "no runtimes and no defaults"


def test_weekly_hours_use_real_runtimes_then_defaults():
    # 4 episodes of 60 min, 4 unknown (default 30), 2 movies (default 120)
    week = a.weekly_stats(eps(0, -1, -2, -3, runtime=60) + eps(-4, -5, -6, -7), [d(-8), d(-9)], TODAY,
                          episode_default=30, movie_default=120)
    assert week["items_per_week"] == 2.5  # 10 items over 4 weeks
    assert week["hours_per_week"] == round((4 * 60 + 4 * 30 + 2 * 120) / 60 / 4, 1)  # 2.5 h
    # the change compares hours when it can: 4 x 30 min before vs 2 x 60 min now
    both = a.weekly_stats(eps(0, -1, runtime=60), [], TODAY, episode_default=30)
    assert both["hours_per_week"] == 0.5
    more = a.weekly_stats(eps(0, -1, runtime=60) + eps(-29, -30, -31, -32, runtime=30), [], TODAY, episode_default=30)
    assert more["change_percent"] == 0, "120 min now vs 120 min before"


def test_weekly_hours_unknown_when_a_runtime_is_missing_and_there_is_no_default():
    assert a.weekly_stats(eps(0, runtime=None), [], TODAY)["hours_per_week"] is None
    assert a.weekly_stats([], [d(0)], TODAY)["hours_per_week"] is None
    assert a.weekly_stats([], [d(0)], TODAY, movie_default=100)["hours_per_week"] == round(100 / 60 / 4, 1)


def test_average_movie_minutes():
    assert a.average_movie_minutes({"watch_time_movies_minutes": 1200, "movies_watched": 10}) == 120
    assert a.average_movie_minutes({}) is None


def test_average_minutes():
    stats = {
        "watch_time_total_minutes": 6000,
        "watch_time_shows_minutes": 4000,
        "watch_time_anime_minutes": 500,
        "shows_episodes_watched": 90,
        "anime_episodes_watched": 10,
        "movies_watched": 10,
    }
    per_item, per_episode = a.average_minutes(stats)
    assert round(per_item) == 55 and per_episode == 45
    assert a.average_minutes({}) == (None, None)


def show(title, remaining, tmdb, anime=False):
    return {
        "show": {"title": title, "year": 2020, "is_anime": anime, "ids": {"refract": f"r-{tmdb}", "tmdb": tmdb}},
        "remaining_episodes": remaining,
    }


UP_NEXT = [show("Newest", 2, 1), show("Big", 30, 2), show("Mid", 12, 3), show("Done", 0, 4), show("Anime", 9, 5, True)]


def test_poster_candidates_prioritise_next_up_then_biggest_backlogs():
    assert a.poster_candidates(UP_NEXT, limit=4) == [1, 2, 3, 5]
    assert a.poster_candidates([], 5) == []


def test_backlog_totals_sorting_and_posters():
    result = a.build_backlog(UP_NEXT, {2: "https://img/2.jpg"}, 45.0)
    assert result["total"] == 53 and result["show_count"] == 4
    assert [s["title"] for s in result["shows"]] == ["Big", "Mid", "Anime", "Newest"]
    assert result["shows"][0]["poster_url"] == "https://img/2.jpg"
    assert result["shows"][1]["poster_url"] is None
    assert result["estimated_minutes"] == round(53 * 45)
    assert a.build_backlog(UP_NEXT, {}, None)["estimated_minutes"] is None
    assert len(a.build_backlog(UP_NEXT, {}, None, limit=2)["shows"]) == 2


def _show(title, tmdb, anime=False):
    return {"type": "show", "is_anime": anime, "ids": {"refract": "r", "tmdb": tmdb}, "title": title, "year": 2026}


# the shape GET /v1/calendar really returns
REAL_CALENDAR = {
    "start": "2026-11-07",
    "end": "2026-11-13",
    "timezone": "Asia/Nicosia",
    "data": [
        {"show": _show("VisionQuest", 213375), "episode": {"season": 1, "number": 8}, "episode_tmdb_id": 7063227,
         "name": "Forever", "air_date": "2026-11-10", "air_time": {"kind": "instant", "at": "2026-11-10T08:00:00.000Z"},
         "is_season_premiere": False, "is_season_finale": True, "is_mid_season_finale": False, "watched": False},
        {"show": _show("Frieren", 1, anime=True), "episode": {"season": 2, "number": 5}, "episode_tmdb_id": 1,
         "name": None, "air_date": "2026-11-13", "air_time": {"kind": "date"},
         "is_season_premiere": True, "is_season_finale": False, "is_mid_season_finale": False, "watched": True},
    ],
}


def test_parse_real_refract_calendar():
    first, second = a.parse_calendar(REAL_CALENDAR)
    assert first == {
        "date": "2026-11-10", "air_at": "2026-11-10T08:00:00.000Z", "show": "VisionQuest", "season": 1, "number": 8,
        "title": "Forever", "tmdb_id": 213375, "is_anime": False, "premiere": False, "finale": True, "watched": False,
    }
    assert second["show"] == "Frieren" and second["is_anime"] is True and second["premiere"] is True
    assert second["air_at"] is None, "only an exact instant counts as a time"
    assert second["watched"] is True and second["title"] is None


def test_parse_calendar_simpler_layouts():
    flat = {"data": [{"show": {"title": "Flat", "ids": {"tmdb": 9}}, "season": 2, "number": 6, "air_date": "2026-11-06", "title": "Ep"}]}
    by_day = {"days": [{"date": "2026-11-07", "episodes": [{"show": {"title": "Day"}, "season": 1, "number": 3}]}]}
    by_show = [{"title": "Show", "episodes": [{"season": 1, "number": 4, "airs_at": "2026-11-08T20:00:00Z"}]}]
    f = a.parse_calendar(flat)[0]
    assert (f["date"], f["show"], f["season"], f["number"], f["title"], f["tmdb_id"]) == ("2026-11-06", "Flat", 2, 6, "Ep", 9)
    assert a.parse_calendar(by_day)[0]["show"] == "Day" and a.parse_calendar(by_day)[0]["date"] == "2026-11-07"
    assert a.parse_calendar(by_show)[0]["show"] == "Show" and a.parse_calendar(by_show)[0]["number"] == 4
    assert a.parse_calendar({"nothing": "here"}) == []


def test_upcoming_window_and_anime_flag():
    eps = [
        {"date": d(-1).isoformat(), "show": "Past"},
        {"date": d(0).isoformat(), "show": "Today"},
        {"date": d(6).isoformat(), "show": "Last Day"},
        {"date": d(7).isoformat(), "show": "Too Late"},
    ]
    out = a.upcoming(eps, TODAY, 7, {"last day"})
    assert [e["show"] for e in out] == ["Today", "Last Day"]
    assert out[1]["is_anime"] is True and out[0]["is_anime"] is False


def test_upcoming_prefers_the_anime_flag_from_the_calendar():
    parsed = a.parse_calendar(REAL_CALENDAR)
    out = a.upcoming(parsed, date(2026, 11, 7), 7, anime_titles=set())
    assert [(e["show"], e["is_anime"]) for e in out] == [("VisionQuest", False), ("Frieren", True)]
