# Changelog

All notable changes to the Refract integration and its dashboard card.

## 0.4.1

### Changed
- **Still to finish**: the total now uses the same serif font as *Total watch time*, with the days and hours written as **26d 5h**
- README: the intro mentions the optional TMDB API key for posters and links to TMDB's API settings page

## 0.4.0

### Added
- **Still to finish**: a new section like the Refract app's *Still to finish* stat. It shows the estimated time left to watch everything you haven't finished (Plan to Watch, Watching and On Hold) as a total and in hours, with a row for movies and one for TV shows (and anime when you have some) showing how many titles, how many episodes, and how many shows are started or not started. It has its own switch, `show_still_to_finish`, and takes part in *Section order*
- **Still to finish sensor**: `sensor.*_still_to_finish` (minutes, with counts, episodes and started / not started per kind in its attributes)
- **Watch time breakdown list**: new card option `watch_time_style: list` shows the watch time split like the library list, a bar plus one row per kind with its time and percentage. The default `bar` keeps the compact bar with the percentage after each title. Both are selectable in the card settings

### Notes
- Episodes for shows you haven't started, and exact runtimes, depend on what Refract's API returns for your library. Where it doesn't, the card says how many shows are missing from the total, and times are estimated from your average runtime. Turn on debug logging for `custom_components.refract` to log which fields a library item has (names only)

## 0.3.9

### Added
- **Library breakdown list**: new card option `library_style: list` shows the library like the Refract app's *Status breakdown*, with a bar plus one row per status with its count and percentage. The default `bar` keeps the compact bar with a legend. Both are selectable in the card settings
- **Last 7 days** shows the number of episodes watched above each bar

### Changed
- Library statuses use the Refract app's names and colors: **Watched**, **Up to Date**, **Watching**, **Plan to Watch**, **On Hold**, **Dropped** (previously Completed, Up to date, In progress, Watchlist, On hold). Custom `--refract-color-*` values keep working
- **Average per week**: the change against the previous 4 weeks moves to the bottom row of the tile, level with the streak's *Longest* line, and the episodes-and-movies line is centered between the hours and that row
- **Catch-up backlog**: the *Back to up next* link is gone. While another show is in *Next up*, tap the original show's row in the backlog (or the picked row again) to go back

## 0.3.8

### Added
- **Mark an episode of any show you're watching**: tap a show in the *Catch-up backlog* to put it in the *Next up* tile, then use **Mark watched** on its next episode. The tile stays on that show and moves to its following episode after you mark one; **Back to up next** (or tapping the row again) returns to the default. Needs *Next up* to be shown and works with the existing `show_actions` and `confirm_actions` options
- The `catch_up` sensor's `shows` attribute now includes each show's `next_episode` and `aired_episodes`

### Changed
- The "Ready now" badge is gone from the *Catch-up backlog*
- A pending "Mark watched?" confirmation now belongs to one episode and is cancelled when the tile switches to another show or the episode changes underneath it

## 0.3.7

### Added
- **Section order**: change the order of the card's sections in the card settings (new *Section order* panel with up/down arrows) or with `section_order` in YAML. Sections you leave out follow in their default position, and the `show_*` switches still apply

## 0.3.6

### Changed
- The summary tile on the card now reads **Episodes watched** instead of just "Episodes"
- In **Watch time**, the share of each category now sits next to its title, e.g. *TV shows (78%)*, *Movies (20%)*, *Anime (2%)*, instead of on its own line below the duration

## 0.3.5

### Fixed
- Fixed: empty manifest in 0.3.4

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
