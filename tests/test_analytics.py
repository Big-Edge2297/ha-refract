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
    assert a.as_date("nope") is None
    assert a.as_date(None) is None


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


def test_weekly_stats_and_change():
    now = [d(-i) for i in range(0, 28, 2)]  # 14 in the last 28 days
    before = [d(-28 - i) for i in range(0, 14)]  # 14 in the 28 days before
    assert a.weekly_stats(now, [], TODAY)["items_per_week"] == 3.5
    assert a.weekly_stats(now, [], TODAY)["change_percent"] is None, "no baseline"
    flat = a.weekly_stats(now + before[:7], [], TODAY)
    assert flat["change_percent"] == 100
    assert a.weekly_stats(now, before, TODAY)["change_percent"] == 0


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


def test_parse_calendar_flat_grouped_by_day_and_by_show():
    flat = {"data": [{"show": {"title": "Flat", "ids": {"tmdb": 9}}, "season": 2, "number": 6, "air_date": "2026-11-06", "title": "Ep"}]}
    by_day = {"days": [{"date": "2026-11-07", "episodes": [{"show": {"title": "Day"}, "season": 1, "number": 3}]}]}
    by_show = [{"title": "Show", "episodes": [{"season": 1, "number": 4, "airs_at": "2026-11-08T20:00:00Z"}]}]
    assert a.parse_calendar(flat) == [
        {"date": "2026-11-06", "show": "Flat", "season": 2, "number": 6, "title": "Ep", "tmdb_id": 9}
    ]
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
