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


def test_backlog_shows_carry_their_next_episode():
    item = show("Lupin", 9, 7)
    item["aired_episodes"] = 20
    item["next_episode"] = {"season": 3, "number": 1, "name": "Chapter 1", "aired": True, "episode_tmdb_id": 99,
                            "is_season_premiere": True, "is_season_finale": False, "is_mid_season_finale": False}
    row = a.build_backlog([item, show("Plain", 3, 8)], {}, None)["shows"][0]
    assert row["title"] == "Lupin" and row["aired_episodes"] == 20
    assert row["next_episode"] == {"season": 3, "number": 1, "name": "Chapter 1", "aired": True,
                                   "is_season_premiere": True, "is_season_finale": False, "is_mid_season_finale": False}
    plain = a.build_backlog([show("Plain", 3, 8)], {}, None)["shows"][0]
    assert plain["next_episode"] is None and plain["aired_episodes"] is None
    broken = show("Broken", 3, 9)
    broken["next_episode"] = {"season": 1}
    assert a.build_backlog([broken], {}, None)["shows"][0]["next_episode"] is None


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


def test_change_needs_a_fair_baseline():
    now = eps(*range(0, -14, -1))  # 14 viewings now
    assert a.weekly_stats(now, [], TODAY)["change_percent"] is None
    three = eps(-29, -30, -31)  # only 3 before: too few to compare against
    assert a.weekly_stats(now + three, [], TODAY)["change_percent"] is None
    four = eps(-29, -30, -31, -32)
    assert a.weekly_stats(now + four, [], TODAY)["change_percent"] == 250
    assert a.MIN_BASELINE_ITEMS == 4


# ------------------------------------------------------------ still to finish


def lib(kind, status, title, tmdb, anime=False, **extra):
    return {"type": kind, "status": status, "title": title, "is_anime": anime, "ids": {"refract": f"r-{tmdb}", "tmdb": tmdb}, **extra}


def test_finish_counts_movies_and_shows_and_splits_started_from_not_started():
    library = [
        lib("movie", "planned", "M1", 1),
        lib("movie", "planned", "M2", 2),
        lib("movie", "completed", "Seen", 3),
        lib("show", "in_progress", "Going", 10),
        lib("show", "planned", "Later", 11, aired_episodes=10),
        lib("show", "planned", "Counted", 12, progress={"total_episodes": 20}),
        lib("show", "dropped", "Dropped", 13, aired_episodes=99),
        lib("show", "up_to_date", "Caught up", 14),
        lib("show", "on_hold", "Paused", 15, progress={"last_watched_at": "2026-01-01T00:00:00Z"}),
        lib("show", "planned", "Cartoon", 16, anime=True, aired_episodes=12),
    ]
    up_next = [{"show": {"title": "Going", "ids": {"refract": "r-10", "tmdb": 10}}, "remaining_episodes": 6}]
    out = a.build_finish(library, up_next, episode_minutes=40.0, movie_minutes=100.0)
    assert out["movies"] == {"count": 2, "minutes": 200}
    # Going: 6 remaining (started). Later 10 + Counted 20 (not started). Paused: started, no count known.
    assert out["shows"] == {"count": 4, "minutes": (6 + 10 + 20) * 40, "episodes": 36, "not_started": 2, "started": 2, "unknown_episodes": 1}
    assert out["anime"] == {"count": 1, "minutes": 12 * 40, "episodes": 12, "not_started": 1, "started": 0, "unknown_episodes": 0}
    assert out["minutes"] == 200 + 36 * 40 + 12 * 40
    assert out["estimated"] is True
    assert out["unknown_episode_shows"] == 1


def test_finish_uses_real_runtimes_when_refract_provides_them():
    library = [
        lib("movie", "planned", "Long", 1, runtime_minutes=180),
        lib("show", "planned", "Hour-long", 2, aired_episodes=10, runtime=60),
    ]
    out = a.build_finish(library, [], episode_minutes=None, movie_minutes=None)
    assert out["movies"]["minutes"] == 180 and out["shows"]["minutes"] == 600
    assert out["minutes"] == 780 and out["estimated"] is False


def test_finish_without_any_runtime_data_keeps_the_counts_but_no_time():
    library = [lib("movie", "planned", "M", 1), lib("show", "in_progress", "S", 2)]
    up_next = [{"show": {"ids": {"tmdb": 2}}, "remaining_episodes": 4}]
    out = a.build_finish(library, up_next, None, None)
    assert out["movies"] == {"count": 1, "minutes": None}
    assert out["shows"]["count"] == 1 and out["shows"]["episodes"] == 4 and out["shows"]["minutes"] is None
    assert out["minutes"] is None


def test_finish_with_nothing_left_is_zero_not_unknown():
    out = a.build_finish([lib("movie", "completed", "Done", 1)], [], 40.0, 100.0)
    assert out["minutes"] == 0 and out["movies"]["count"] == 0
    assert out["estimated"] is False and out["unknown_episode_shows"] == 0
    assert a.build_finish([], [], None, None)["minutes"] == 0


# ------------------------------------------------- still to finish: TMDB fallback


def test_tmdb_tv_info_counts_aired_episodes_and_skips_specials_and_unaired_seasons():
    body = {
        "seasons": [
            {"season_number": 0, "episode_count": 5},
            {"season_number": 1, "episode_count": 10},
            {"season_number": 2, "episode_count": 8},
            {"season_number": 3, "episode_count": 9},
        ],
        "last_episode_to_air": {"season_number": 2, "episode_number": 6, "runtime": 47},
        "episode_run_time": [],
    }
    assert a.tmdb_tv_info(body) == {"episodes": 10 + 6, "runtime": 47}
    assert a.tmdb_tv_info({**body, "episode_run_time": [40, 50]})["runtime"] == 45


def test_tmdb_tv_info_handles_unaired_ended_and_unusable_shows():
    unaired = {"last_episode_to_air": None, "seasons": [{"season_number": 1, "episode_count": 8}], "next_episode_to_air": {"runtime": 55}}
    assert a.tmdb_tv_info(unaired) == {"episodes": 0, "runtime": 55}
    ended = {"status": "Ended", "number_of_episodes": 24, "seasons": []}
    assert a.tmdb_tv_info(ended) == {"episodes": 24, "runtime": None}
    assert a.tmdb_tv_info({"name": "no usable fields"}) is None
    assert a.tmdb_tv_info(None) is None


def test_tmdb_movie_info():
    assert a.tmdb_movie_info({"runtime": 128}) == {"runtime": 128}
    assert a.tmdb_movie_info({"runtime": 0}) is None
    assert a.tmdb_movie_info([]) is None


def test_finish_lookups_only_asks_about_what_is_unfinished_and_missing():
    library = [
        lib("movie", "planned", "Needs runtime", 1),
        lib("movie", "planned", "Has runtime", 2, runtime_minutes=90),
        lib("movie", "completed", "Seen", 3),
        lib("show", "planned", "Later", 10),
        lib("show", "in_progress", "Going", 11),
        lib("show", "dropped", "Dropped", 12),
        {"type": "show", "status": "planned", "title": "No id", "ids": {}},
    ]
    assert a.finish_lookups(library) == ([10, 11], [1])


def test_finish_takes_episode_counts_and_runtimes_from_tmdb_when_the_library_has_none():
    library = [
        lib("movie", "planned", "Film", 1),
        lib("show", "planned", "Later", 10),
        lib("show", "planned", "Later anime", 11, anime=True),
        lib("show", "planned", "Unaired", 12),
        lib("show", "in_progress", "Going", 13),
        lib("show", "on_hold", "Paused", 14, progress={"last_watched_at": "2026-01-01T00:00:00Z", "watched_episodes": 7}),
        lib("show", "planned", "Unknown to TMDB", 15),
    ]
    up_next = [{"show": {"ids": {"refract": "r-13", "tmdb": 13}}, "remaining_episodes": 3}]
    details = {
        "movie:1": {"runtime": 120},
        "tv:10": {"episodes": 20, "runtime": 50},
        "tv:11": {"episodes": 12, "runtime": 24},
        "tv:12": {"episodes": 0, "runtime": 45},
        "tv:13": {"episodes": 40, "runtime": 30},
        "tv:14": {"episodes": 10},
    }
    out = a.build_finish(library, up_next, episode_minutes=40.0, movie_minutes=100.0, details=details)
    assert out["movies"] == {"count": 1, "minutes": 120}
    # Later 20x50, Unaired 0, Going 3 remaining x30 (up next wins over TMDB), Paused 10-7=3 x 40 (no runtime: average)
    assert out["shows"]["episodes"] == 20 + 0 + 3 + 3
    assert out["shows"]["minutes"] == 20 * 50 + 3 * 30 + 3 * 40
    assert out["shows"]["unknown_episodes"] == 1  # the one TMDB doesn't know
    assert out["anime"]["minutes"] == 12 * 24 and out["anime"]["episodes"] == 12
    assert out["unknown_episode_shows"] == 1


def test_finish_library_values_win_over_tmdb():
    library = [lib("show", "planned", "Counted", 10, aired_episodes=5, runtime=30)]
    out = a.build_finish(library, [], None, None, {"tv:10": {"episodes": 99, "runtime": 99}})
    assert out["shows"]["episodes"] == 5 and out["shows"]["minutes"] == 150


# ------------------------------------------------------------ most watched


MOVIE_BODY = {
    "release_date": "1994-09-23",
    "runtime": 142,
    "genres": [{"id": 18, "name": "Drama"}, {"id": 80, "name": "Crime"}],
    "production_countries": [{"iso_3166_1": "US", "name": "United States of America"}],
    "credits": {
        "cast": [
            {"id": 504, "name": "Tim Robbins", "profile_path": "/tim.jpg", "order": 0},
            {"id": 192, "name": "Morgan Freeman", "profile_path": None, "order": 1},
        ],
        "crew": [
            {"id": 4027, "name": "Frank Darabont", "profile_path": "/frank.jpg", "job": "Director"},
            {"id": 4027, "name": "Frank Darabont", "profile_path": "/frank.jpg", "job": "Screenplay"},
            {"id": 1, "name": "Someone Else", "profile_path": None, "job": "Gaffer"},
        ],
    },
}
SHOW_BODY = {
    "first_air_date": "2008-01-20",
    "episode_run_time": [45, 47],
    "number_of_episodes": 62,
    "genres": [{"id": 18, "name": "Drama"}],
    "origin_country": ["US"],
    "created_by": [{"id": 66633, "name": "Vince Gilligan", "profile_path": "/vince.jpg"}],
    "aggregate_credits": {
        "cast": [
            {"id": 17419, "name": "Bryan Cranston", "profile_path": "/bryan.jpg", "order": 0},
            {"id": 84497, "name": "Aaron Paul", "profile_path": "/aaron.jpg", "order": 1},
        ],
        "crew": [
            {"id": 66633, "name": "Vince Gilligan", "profile_path": "/vince.jpg", "jobs": [{"job": "Director", "episode_count": 3}, {"job": "Writer", "episode_count": 9}]},
            {"id": 2, "name": "Editor Person", "profile_path": None, "jobs": [{"job": "Editor", "episode_count": 62}]},
        ],
    },
}


def test_tmdb_profile_movie_and_show():
    movie = a.tmdb_profile(MOVIE_BODY, "movie")
    assert movie["year"] == 1994 and movie["runtime"] == 142
    assert movie["genres"] == ["Drama", "Crime"]
    assert movie["countries"] == [["US", "United States of America"]]
    assert [p[1] for p in movie["cast"]] == ["Tim Robbins", "Morgan Freeman"]
    assert movie["cast"][0] == [504, "Tim Robbins", "/tim.jpg"] and movie["cast"][1][2] is None
    assert [p[1] for p in movie["directors"]] == ["Frank Darabont"]
    assert [p[1] for p in movie["writers"]] == ["Frank Darabont"], "a person listed twice counts once"

    show = a.tmdb_profile(SHOW_BODY, "show")
    assert show["year"] == 2008 and show["runtime"] == 46 and show["episodes"] == 62
    assert show["countries"] == [["US", "US"]], "falls back to the origin country code"
    assert [p[1] for p in show["directors"]] == ["Vince Gilligan"]
    assert [p[1] for p in show["writers"]] == ["Vince Gilligan"], "creator and writer credit are the same person"
    assert a.tmdb_profile("nope", "movie") is None
    assert a.tmdb_profile({}, "movie")["cast"] == []


def test_watch_counts_from_history_payloads():
    episodes = [
        {"show": {"title": "A", "ids": {"tmdb": 100}}, "episode": {"season": 1, "number": 1}},
        {"show": {"title": "A", "ids": {"tmdb": 100}}, "episode": {"season": 1, "number": 2}},
        {"show": {"title": "B"}, "episode": {"season": 1, "number": 1}},
    ]
    movies = [{"movie": {"ids": {"tmdb": 7}}, "kind": "first_watch"}, {"movie": {"ids": {"tmdb": 7}}, "kind": "rewatch"}]
    assert a.watch_counts(episodes, "show") == {100: 2}
    assert a.watch_counts(movies, "movie") == {7: 2}
    assert a.watch_counts({"unexpected": 1}, "movie") == {}


def lib_item(kind, status, tmdb, **extra):
    return {"type": kind, "status": status, "title": f"{kind}{tmdb}", "ids": {"tmdb": tmdb}, **extra}


def test_pick_candidates_prefer_history_and_skip_the_unwatched():
    library = [
        lib_item("movie", "completed", 1),
        lib_item("movie", "planned", 2),
        lib_item("show", "completed", 3),
        lib_item("show", "in_progress", 4),
        lib_item("show", "in_progress", 5, progress={"watched_episodes": 6}),
        lib_item("show", "planned", 6),
        {"type": "movie", "status": "completed", "title": "no id"},
    ]
    got = {c["key"]: c for c in a.pick_candidates(library, {3: 20, 4: 4}, {1: 2, 9: 1})}
    assert got["movie:1"]["count"] == 2, "plays from the history"
    assert "movie:2" not in got and "show:6" not in got, "watchlist only"
    assert got["show:3"]["count"] == 20 and got["show:4"]["count"] == 4
    assert got["show:5"]["count"] == 6, "library says six episodes were watched"
    assert got["movie:9"]["count"] == 1, "the history knows a title the library doesn't"
    nohist = {c["key"]: c for c in a.pick_candidates(library, {}, {})}
    assert nohist["movie:1"]["count"] == 1
    assert nohist["show:3"]["assume_all"] is True and nohist["show:3"]["count"] is None
    assert "show:4" not in nohist, "in progress with no amount watched"
    ordered = [c["key"] for c in a.pick_candidates(library, {3: 20, 4: 4}, {1: 2})]
    assert ordered.index("show:3") < ordered.index("show:4") < ordered.index("movie:1")


def test_build_top_picks_ranks_by_minutes_watched():
    movie, show = a.tmdb_profile(MOVIE_BODY, "movie"), a.tmdb_profile(SHOW_BODY, "show")
    candidates = [
        {"key": "show:1", "kind": "show", "id": 1, "count": 10, "assume_all": False},  # 10 x 46 = 460 min
        {"key": "movie:2", "kind": "movie", "id": 2, "count": 1, "assume_all": False},  # 142 min
        {"key": "movie:3", "kind": "movie", "id": 3, "count": 1, "assume_all": False},  # no profile yet
        {"key": "movie:4", "kind": "movie", "id": 4, "count": 1, "assume_all": False},  # TMDB doesn't know it
        {"key": "show:5", "kind": "show", "id": 5, "count": None, "assume_all": True},  # all 62 episodes
    ]
    profiles = {"show:1": show, "movie:2": movie, "movie:4": {"missing": True}, "show:5": show}
    top = a.build_top_picks(candidates, profiles, image_base="https://img")
    assert (top["titles"], top["total"], top["pending"]) == (3, 5, 1)
    # the two leads of the show are tied, so the order is alphabetical
    assert [r["name"] for r in top["actor"]][:2] == ["Aaron Paul", "Bryan Cranston"]
    assert top["actor"][1]["photo"] == "https://img/bryan.jpg"
    assert top["actor"][0]["hours"] == round((460 + 62 * 46) / 60, 1) and top["actor"][0]["titles"] == 2
    assert top["director"][0]["name"] == "Vince Gilligan" and top["writer"][0]["name"] == "Vince Gilligan"
    assert top["decade"][0] == {"name": "2000s", "titles": 2, "decade": 2000, "hours": top["decade"][0]["hours"]}
    assert top["genre"][0]["name"] == "Drama" and top["genre"][0]["titles"] == 3
    assert top["country"][0]["code"] == "US" and top["country"][0]["titles"] == 3
    assert top["actor"][-1]["name"] in ("Tim Robbins", "Morgan Freeman") and len(top["actor"]) == 3
    assert a.build_top_picks([], {})["actor"] == []


def test_build_top_picks_uses_default_runtimes_and_skips_what_it_cannot_time():
    bare = {"cast": [[1, "A", None]], "genres": [], "countries": [], "directors": [], "writers": [], "year": None, "runtime": None, "episodes": None}
    movie = {"key": "movie:1", "kind": "movie", "id": 1, "count": 2, "assume_all": False}
    show = {"key": "show:2", "kind": "show", "id": 2, "count": 3, "assume_all": False}
    profiles = {"movie:1": bare, "show:2": bare}
    none = a.build_top_picks([movie, show], profiles)
    assert none["titles"] == 0 and none["actor"] == []
    top = a.build_top_picks([movie, show], profiles, episode_minutes=40, movie_minutes=100)
    assert top["titles"] == 2 and top["actor"][0]["hours"] == round((200 + 120) / 60, 1)
    assert top["decade"] == [], "no release year, no decade"
