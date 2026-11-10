# Changelog

## 0.5.5

- **New:** tap a *Most watched* tile with an arrow to see places 2 and 3; a progress bar while TMDB details are collected
- **Changed:** flags use an embedded *Twemoji Country Flags* font (a woff2 in `src/assets`, bundled as a data URL), so they also show on Windows. The bundle grows by about 105 KB. Credit in the README

## 0.5.4

- **Changed:** *Most watched* is ranked by number of titles (hours break ties), TV directors and writers need a quarter of a show's episodes, and TV genres use the movie names. The card itself is unchanged

## 0.5.3

- **Changed:** the *Most watched* tiles (`top_picks_items`) only apply to the Custom layout and are only in the editor for Custom (under **Sections**). Full shows all six tiles; Compact hides the section. A card with `top_picks_items` and no `layout` is read as Custom

## 0.5.2

- **Fixed:** the card finds the *Most watched* sensor under its old id `sensor.*_most_watched` too (Home Assistant keeps the id registered by 0.5.0). Update the card, hard-refresh, no renaming needed

## 0.5.1

- **Fixed:** the *Most watched* section never appeared because the integration's sensor was called `most_watched` instead of `top_picks`. The card is unchanged; update the integration and restart

## 0.5.0

- **New:** the *Most watched* section (top actor, director, writer, decade, genre and country with photos, a flag and icons), built from TMDB. New options `show_top_picks` and `top_picks_items`
- Default order: after *Last 7 days*; a custom `section_order` gets it at the end
- Needs the TMDB key of the integration; the section hides itself without the `top_picks` sensor

## 0.4.6

- **New:** seven more fun stats (`flights`, `sleep`, `movies`, `seasons`, `marathons`, `moon`, `imdb`); `rotate` cycles through all ten
- **Changed:** *Watch time* and *Library* default to the breakdown list instead of the compact bar. Set `watch_time_style` / `library_style` to `bar` to keep the bar
- The screenshot shows the breakdown lists

## 0.4.5

- **Changed:** with the Custom layout, the editor shows **Section order** directly under **Sections**

## 0.4.4

- **New:** `layout: custom`. *Layout* is now Full, Compact or Custom
- **Changed:** Full shows every section; Compact shows *Total watch time*, *Still to finish* and *Next up*. The `show_*` switches and `section_order` only apply to Custom, and the editor shows the **Sections** switches and **Section order** only for Custom
- **Changed:** *Library* bar legend reads **Watched · 803**; *Watch time* bar reads **TV shows · 78%** (no brackets)
- Cards with no `layout` that hide sections or set a `section_order` are treated as Custom, so existing dashboards look the same

## 0.4.3

- **Changed:** *Still to finish* shows only the total and the movies / TV shows (and anime) counters: the hours line, the "Not counting N shows..." note and the episodes / started / not started line are removed
- **Changed:** the card settings are ordered *Layout*, *Duration format*, *Watch time style*, *Library style*, then the catch-up and airing rows
- Needs integration 0.4.3 for the corrected *Still to finish* figures (shows without an episode count now come from TMDB)

## 0.4.2

- **Changed:** the *Still to finish* total looks exactly like *Total watch time*: same size and color, written out as 26 days 5 hours
- **Changed:** *Still to finish* moves below *Library* and above *Streak* in the default section order (a configured `section_order` is unaffected)
- **Removed:** the "Estimate: shifts as episodes air..." note under the *Still to finish* total

## 0.4.1

- **Changed:** the *Still to finish* total uses the same font as *Total watch time*, written as 26d 5h

## 0.4.0

- **New:** *Still to finish* section (needs the integration's new `still_to_finish` sensor): estimated time left for the movies and shows you haven't finished, with rows for movies, TV shows and anime. Switch: `show_still_to_finish`; it is part of *Section order*
- **New:** `watch_time_style: list` shows the watch time split as a breakdown list (bar plus one row per kind with time and percentage). Selectable in the card settings
- Older integrations still work: the new section simply doesn't appear until the sensor exists

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
