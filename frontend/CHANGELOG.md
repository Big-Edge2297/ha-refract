# Changelog

## 0.3.9

- **New:** `library_style: list` shows the library like the Refract app's status breakdown (bar plus one row per status with count and percentage); `bar` stays the default
- **New:** episodes watched are shown above each bar in *Last 7 days*
- **Changed:** library statuses use the app's wording and colors (Watched, Up to Date, Watching, Plan to Watch, On Hold, Dropped)
- **Changed:** in *Average per week* the percentage sits on the bottom row beside the streak's *Longest* line, and the episodes-and-movies line is centered
- **Changed:** removed *Back to up next*; the original show's row in the backlog takes you back while another show is pinned

## 0.3.8

- **New:** tap a show in the catch-up backlog to show it in Next up and mark its next episode watched. **Back to up next** returns to the default; the tile follows the show to its next episode after marking
- **Changed:** removed the "Ready now" badge from the catch-up backlog
- **Changed:** a pending "Mark watched?" confirmation is cancelled when the tile switches to another show or episode
- Older integrations still work: the next episode is then read from the *Shows waiting* sensor, which covers the first few shows

## 0.3.7

- **New:** change the order of the sections in the card settings (*Section order*) or with `section_order` in YAML. The header stays on top, streak and average share a row when they are neighbours, and the compact layout follows the same order

## 0.3.6

- **Changed:** the summary tile says **Episodes watched** instead of "Episodes"
- **Changed:** *Watch time* shows the percentage after each title, e.g. *TV shows (78%)*, *Movies (20%)*, *Anime (2%)*, rather than on a separate line

## 0.3.4

- **New:** the library bar shows every status you use, including **On hold** and **Dropped**, instead of lumping them into "Other". Other statuses Refract may add appear with a readable name
- New styling variables `--refract-color-on-hold` and `--refract-color-dropped`
- With an older integration version (no `by_status` data) the bar keeps the four main statuses plus "Other"

## 0.3.3

- **Fixed:** durations under a day no longer show a zero ("about 21 h" instead of "about 0 d 21 h"), including in the watch-time split
- **New:** *Average per week* shows how many episodes and movies that is, under the hours
- **New:** *Airing this week* shows Premiere and Finale pills and the air time (in your time zone and 12/24 hour setting) when Refract knows it
- The percentage under *Average per week* is hidden unless the earlier period was a fair baseline (see the integration changelog)

## 0.3.0

A redesigned card with new sections.

- **New:** Last 7 days (episodes and movies per day, with the busiest day), Average per week (estimated hours with the change against the previous 4 weeks), Catch-up backlog, Airing this week
- **New:** poster beside Next up and in the catch-up backlog, with the first letter as a fallback (needs a TMDB key in the integration options)
- **New:** each section has its own switch: `show_average`, `show_last_7_days`, `show_catchup`, `show_airing`, `show_posters`, plus `airing_length`
- **Changed:** the fun stat is a highlighted pill under the big watch time number
- **Changed:** the library is a status bar (the donut is gone) and sits below the watch time split
- **Changed:** the streak is a new tile with seven dots and your longest streak; the gauge and its switch are gone
- **Changed:** the waiting queue is now the catch-up backlog; `show_queue` keeps working as an alias for `show_catchup`
- `streak_style` and `show_streak_toggle` are ignored

## 0.2.0

The card now ships inside the Refract integration instead of as a separate HACS plugin.

- Built into `custom_components/refract/www/` and loaded by the integration
- Safe to load alongside the old standalone copy: the first one wins and a console warning explains
- No changes to configuration or behavior

## 0.1.1

- README screenshot and generic examples
- GitHub Actions validation (HACS and build checks)
- No changes to the card itself

## 0.1.0

First release.

- Watch time summary in days and hours, with a rotating fun stat
- Library donut and status bar (completed, up to date, watchlist, in progress, other)
- Watch time split by TV shows, movies and anime
- Streak as a gauge or as seven day dots, switchable on the card
- Next up tile with episode progress and premiere/finale badges
- Waiting queue from the Shows waiting sensor
- Optional "Mark watched" button (off by default)
- Visual editor, automatic entity discovery, compact layout, color options
