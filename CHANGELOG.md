# Changelog

All notable changes to the Refract integration and its dashboard card.

## 0.3.4

### Changed
- The library bar on the card shows every status, including **On hold** and **Dropped**, instead of "Other"

## 0.3.3

### Fixed
- Durations under a day no longer show a zero: the catch-up estimate reads "about 21 h" rather than "about 0 d 21 h"

### Changed
- *Average per week* shows the number of episodes and movies behind the hours
- *Airing this week* shows Premiere and Finale pills and the air time
- The change against the previous 4 weeks is only shown when that earlier period had at least 4 viewings, so a quiet stretch no longer produces an inflated percentage

## 0.3.2

### Fixed
- **Airing this week** and the **calendar** now read Refract's real calendar layout: episode names, the anime flag per show, season premiere/finale flags and the exact air time (calendar events are timed instead of all-day when Refract knows the time)

## 0.3.1

### Fixed
- **Last 7 days** and **Average per week** were always empty: Refract reports the day watched as `{"local": "2026-11-04", "tz": "..."}` and the parser only understood plain dates
- *Average per week* now uses the real episode runtimes Refract provides, and your average runtime only for the episodes and movies without one. The change against the previous 4 weeks is compared in hours when possible

### Added
- With `custom_components.refract: debug` logging, the log says how many history entries were read and how many had a usable date. If Refract returns history but no dates can be read, a warning with a redacted-safe sample is logged
- Tests built from real Refract history responses

## 0.3.0

### Added
- **Last 7 days**: sensor `last_7_days` with episodes and movies per day and the busiest day
- **Average per week**: sensor `average_per_week`, an estimate of hours watched per week over the last 4 weeks, with the change against the 4 weeks before
- **Catch-up backlog**: sensor `catch_up` with the aired episodes waiting across every show, per-show counts and an estimate of the time
- **Airing this week**: sensor `airing_this_week` with the episodes airing in the next 7 days
- **Posters** (optional): add your own free TMDB API key in the integration options to get poster images for next up and the backlog. Lookups are cached on disk
- **Options**: *Fetch watch history* switch, and the TMDB key
- Dashboard card redesign with the new sections, the fun stat as a highlighted pill, a library status bar and a new streak tile. See [the card docs](docs/dashboard-card.md) and the [card changelog](frontend/CHANGELOG.md)
- Unit tests for the new history, backlog and calendar logic (`tests/`), run in CI

### Changed
- *Shows waiting* now counts every show you're watching, not just the first 20
- Watch history is fetched at most once an hour, and again right after an action marks something watched
- Calendar parsing moved to a module without Home Assistant imports so it can be tested

### Card
- The streak gauge and its switch are gone; `streak_style` and `show_streak_toggle` are ignored
- `show_queue` is now `show_catchup` (the old name still works)

### Notes
- Requires Home Assistant 2025.1 or newer
- Large libraries: the history is many requests (200 per page). Turn off *Fetch watch history* in the options if you don't want them; *Last 7 days* and *Average per week* are then unavailable

## 0.2.0

- The dashboard card now ships inside the integration (served from the integration, loaded automatically)
- New `frontend` and `http` dependencies

## 0.1.1

- README, badges and HACS validation fixes

## 0.1.0

First release: sensors, calendar, watchlist to-do and actions to log what you watch.
