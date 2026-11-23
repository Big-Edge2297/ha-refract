# Changelog

All notable changes to the Refract integration and its dashboard card.

## 0.9.3

### Fixed
- **In the monthly wrap, the legend under *What you watched* (Shows · 67%, Movies · 33%) was grey and hard to read on the colored page.** It now uses the same light text as the rest of the page

### Changed
- **The monthly wrap no longer puts a "~" before the hours of an estimated month.** The hours are a plain number, and the note *Hours are estimated from average runtimes* under the tiles still says when they are an estimate

### Notes
- No change in the integration itself, the sensors or the options

## 0.9.2

### Changed
- **The *Time spent* and *Library* bars are one smooth pill where the colors flow into each other,** instead of separate boxes with gaps. It is a single gradient, so there are no gaps, seams or thin outlines at any display scaling. The colors are blended in the OKLab color space where the browser supports it, and in plain RGB in older browsers. A very small slice still gets a visible share of the bar
- **The last tile under the total watch time is called *Episodes* instead of *Episodes watched*,** so it always fits on one line on a phone and the six tiles stay the same height. Translated in the seven languages (Folgen, Episodios, Épisodes, Episodi, Afleveringen, Odcinki, Episódios)

### Notes
- No change in the integration itself, the sensors or the options

## 0.9.1

### Fixed
- **Last 7 days: a movie had no number above its bar.** The number above a bar counted only episodes, so a day with just a movie showed none, and a day with episodes and a movie showed only the episodes while the bar was as tall as both. The number is now everything watched that day, episodes and movies, and every day with a bar has one. Days with nothing watched still show none

### Changed
- **Durations are written in months, days and hours.** The total watch time, the times in *Time spent*, *Still to finish* and the catch-up estimate now read like **8mo 23d 2h** instead of 266 days 14 hours. A month is an average month of 30.4375 days, the one the fun stat counts too, so "8mo 23d" and "about 8.8 months" agree. A time under a month reads like before (26d 5h, 21h). The big totals show the units as short letters right behind the number. Other languages use their own abbreviations (*Mon.*, *mois*, *mnd*, *mies.*)
- The setting *Duration format* has a new first choice, **Months, days and hours**, which is the new default. *Days and hours*, *Hours only* and *Automatic* are unchanged, and a card that sets one of them keeps its look

### Notes
- There is no years part: 14 months stay 14mo
- Nothing changes in the integration, only in the card

## 0.9.0

### Added
- **Games.** Refract now tracks games, and the integration already reports them (*Stats games played*, *Stats games finished* and *Stats games play minutes*). The card shows the games you have played in a new *Games* tile
- **Games in Time spent.** The bars, the list and the percentages of *Time spent* now include the time you played games, from *Stats games play minutes*, with their own color (`color_games`, default `#d6409f`, also in the card settings). A row for games only shows when there is time played, so nothing changes for an account without games
- **TV Shows and Anime tiles.** Two more tiles under the total watch time show how many different TV shows and how many different anime you have watched (from *Stats shows titles* and *Stats anime titles*). The six tiles are now Titles, Movies, TV Shows, Anime, Games and Episodes watched, in rows of three. *Episodes watched* still counts episodes

### Changed
- The *Watch time* section is now called **Time spent** (in the card, the editor, the single-section card *Refract: Time spent* and all seven languages). The settings keep their names (`show_watch_time`, `watch_time_style`), so nothing in an existing configuration changes
- The *Library* tile is now called **Titles**, and *Movies seen* is called **Movies**. The *Library* section (the status breakdown) keeps its name
- The new tiles are translated into German, French, Spanish, Italian, Dutch, Portuguese and Polish

### Notes
- A tile whose figure Refract doesn't report is left out, so nothing changes for an account without games
- No change in the integration itself, the sensors for games came with Refract's update

## 0.8.1

### Fixed
- **hassfest failed on the TMDB repair.** The text of the repair *TMDB rejected your API key* had the address of TMDB's API settings written into the translated text, which hassfest does not allow. The address is now a `{tmdb_url}` placeholder that the repair itself provides, in English and in the seven translations. The repair looks the same. A new test fails when any translated text contains a URL
- **The Tests workflow failed** ("exit code 2"). It ran the Home Assistant tests in `tests/ha` without Home Assistant installed. They now have their own jobs, on the oldest Home Assistant the integration supports (2025.1) and on the newest, and the plain job leaves them out
- The files `.github/dependabot.yml` and `.github/workflows/audit.yml`, which 0.8.0 describes, were missing from the repository and are added

### Notes
- Nothing changes in the sensors, the card or the options. This release only fixes the checks
- The oldest-Home-Assistant job pins `pycares` below 4.9: newer versions start a background thread that the test checks of Home Assistant 2025.1 do not expect. `docs/development.md` says what to change when the oldest supported Home Assistant changes

## 0.8.0

### Added
- **Tests that run the integration inside Home Assistant.** 21 tests load the integration for real with a mocked Refract and TMDB: the sensors and what they say (Next up skipping a fully watched show, the running month of the wrap, Most watched), an outage and its recovery, a rejected or revoked key, the setup, re-authentication and options flows, the diagnostics and the repair. One of them fails when a sensor gets an entity id the dashboard card does not look for. They run in CI on the oldest Home Assistant the integration supports (2025.1) and on the newest
- **Diagnostics download** (Settings → Devices & services → Refract → ⋮ → Download diagnostics): the library by status and type, the up-next shows, how much history there is, how far the TMDB lookups are, the leaders of *Most watched* and the months of the wrap. Your keys, your name and the titles of your library are left out
- **A repair for a rejected TMDB key.** When TMDB refuses the key, a repair *TMDB rejected your API key* appears under Settings → System → Repairs, instead of posters and *Most watched* quietly disappearing. Open it, enter a new key (it is checked first) or leave the field empty to turn TMDB off, and the integration applies it right away. It is shown per account and goes away when the key works
- **A friendlier unavailable state in the card.** When every Refract sensor is unavailable the card says *Refract can't be reached* (with a *Check the integration* button for administrators) instead of showing an empty card, and *Waiting for Refract* before the first update after a start. It returns by itself. The single-section cards show it too
- **Dependabot and a dependency audit.** Weekly pull requests for newer npm packages of the card and newer versions of the GitHub actions, and a weekly audit that fails if a library bundled into the card has a known vulnerability (the build tools are only reported). `docs/development.md` explains the tests, the updates and what to do with a Dependabot pull request, because a card update needs a rebuild
- Translations of the new texts (the repair and the card states) in all seven languages

### Fixed
- The TMDB cache wrote its files on a timer that could still be pending when the integration unloaded or reloaded. They are now written when the integration unloads
- The README and the card documentation no longer say that the monthly wrap waits for a month to finish, and the README's test command no longer tries to collect the Home Assistant tests

### Notes
- A rejected TMDB key is noticed when TMDB is asked for something. While everything is already cached, a revoked key shows up at the first title that needs a lookup
- Home Assistant keeps a sensor that is no longer provided (such as *Top picks* after you turn TMDB off) as "unavailable"; the card leaves that section out

## 0.7.4

### Added
- **The running month in the monthly wrap.** The first wrap is now the current month, in **light green** with a *So far* label and the title *Your month so far*. It has the same four pages as the finished months, for the days that have passed: items and hours per day and the active days count only those days, the days to come are faded in the daily bars, and there is no comparison with the month before. The month before keeps its own colors, and the arrows go back through the months as before
- **Poster backdrops.** A blurred, faded poster sits behind the Next up tile and behind the *Your moments* wrap page, so the card feels less flat. The new option `show_backdrops` (a switch in the editor, default on) turns it off; it needs posters
- **Year heatmap.** A new card section, a calendar of the last 12 months like GitHub's activity graph: a square for each day, a column for each week, darker for a busier day, with the month names above, a legend, and tiles for the items, the days you watched something and your best streak. On a phone the squares keep a readable size and the calendar scrolls sideways, starting at the latest weeks. It is built from the monthly wrap's per-day data, so it needs watch history and no TMDB key. Switch in the Custom layout: `show_year_heatmap`. Also available as its own card, `refract-year-heatmap-card`
- Translations of the new texts in all seven languages, with tests

### Changed
- The `months` attribute of `sensor.*_monthly_wrap` now starts with the running month (`partial: true`, `elapsed_days`). The sensor's state is still the number of items of the newest *finished* month
- The default section order puts *Year heatmap* after *Monthly wrap*. Cards with a custom `section_order` get it at the end

## 0.7.3

### Changed
- **Most watched is side by side again on phones.** The tiles stay in two columns on narrow cards and get smaller there (a smaller photo and text), so names and numbers still fit in English, German, Polish and the other languages. Wide cards look as before
- **The first wrap page, *Your month, wrapped*, has no dead space at the bottom any more.** The hours now take the free space in the middle of the page in large type, with the tiles at the bottom

## 0.7.2

### Added
- **App-style wrap pages**: the monthly wrap now looks like the wraps in the Refract app. Four colored pages (purple *Your month, wrapped*, pink *Your tastes*, teal *Your patterns*, orange *Your moments*) with a story bar on top, one highlight sentence per page, and translucent tiles on a gradient. Turn the pages with a tap on the left or right side, a swipe, the arrow keys or by tapping the story bar. The month arrows stay. The overview page gained items per day, the weekend share and the best streak. The new option `wrap_style` chooses `pages` (default) or `tabs`, the compact look of 0.7.0
- **Single-section cards**: every section is also a card of its own, to place separately in Sections or masonry dashboards. Twelve new cards in the card picker named *Refract: ...* (`refract-next-up-card`, `refract-monthly-wrap-card`, `refract-most-watched-card`, `refract-catch-up-card`, `refract-airing-card`, `refract-streak-card` and so on). They show only their section, without the header, take the same `entity`, an optional `name` as the title and the settings of that section, and have a card editor trimmed to those settings
- Translations of the new texts in all seven languages, and tests for the pages, the cards and their editor
- The demo page has a switch for the wrap style, and the docs have a section on the single-section cards

### Changed
- **The monthly wrap changes look by default.** Cards that show it now get the pages. Set `wrap_style: tabs` to keep the compact tabs
- The genre list in the wrap has a wider name column, and the *Most watched* tile choice (`top_picks_items`) also works on its own card

## 0.7.1

### Fixed
- **Next up offered a show with nothing left to watch.** Refract keeps a fully watched show in its up-next list, for instance while it waits for its next episode, and the first one was shown as "Next up" with "0 remaining". Next up now takes the first show that has an aired episode to watch, and says "Nothing up next" when there is none. The card also passes over such a show when the integration is older
- **The *Shows waiting* sensor counted fully watched shows** too. It now counts only shows with episodes waiting
- **The Catch-up bars could look full while episodes were pending.** The bar was the size of the backlog next to the biggest one, so the biggest was always full, while the Next up bar shows progress. Now every catch-up bar shows how many of the show's aired episodes you have watched, so it is never full while something is waiting. Without the aired count (older integration) it keeps the old size comparison, and hovering a bar names the numbers

### Changed
- The poster of Next up follows the same rule: the first show with episodes waiting

## 0.7.0

### Added
- **Monthly wrap**: a new card section with a summary of every completed month (up to the last 12), like the wraps in the Refract app. Go through the months with the arrows and switch between four tabs: **Overview** (hours with the change against the month before, episodes, movies, shows, anime), **Tastes** (shows, anime and movies as a share of the titles, top genres, first watches against rewatches), **Patterns** (items and hours per day, a bar for each day with the busiest day highlighted, the share on weekends, best streak, active days) and **Moments** (the three most watched titles with posters, and the countries you watched a title from for the first time)
- New sensor `sensor.*_monthly_wrap` (state: items in the newest completed month; the `months` attribute has every month) for your own cards and automations
- The card option `show_monthly_wrap` (Custom layout, with a switch in the editor). The section is part of the Full layout and not shown in Compact
- Translations of the new section in all seven languages, with tests

### Changed
- The cached TMDB details are fetched again once, because they now also keep the poster of each title. The most watched titles and the titles of the last months come first
- The options text of *Fetch watch history* now mentions the monthly wrap, in all languages
- The default section order puts *Monthly wrap* after *Most watched*. Cards with a custom `section_order` get it at the end

### Notes
- The wrap needs **Fetch watch history**. Genres, posters and the first countries need the TMDB key too; without it everything else works
- Refract's history only has the day of each watch, so there is no peak hour or hourly chart, and the API has no community rank or ratings. Hours use the runtimes in the history where they exist and average runtimes otherwise (a `~` marks estimates)

## 0.6.0

### Added
- **Translations**: the dashboard card and the integration (setup and re-authentication screens, options, errors, service names and descriptions) are now available in **German, French, Spanish, Italian, Dutch, Portuguese (Brazilian) and Polish**. Home Assistant picks the language from your profile, anything not translated shows in English
- Plurals follow the rules of each language ("1 dzień", "2 dni", "5 dni", "1,5 dnia" in Polish), also for the unit after a number, the fun stats and the counts in *Still to finish*
- Short duration units follow the language: `j` for days in French, `g` in Italian, `u` for hours in Dutch
- A language selector in the demo page, and a guide for fixing a text or adding a language: `docs/translations.md`
- Tests that every translation has all the texts of English with the same placeholders, and that the integration's texts name the card sections the way the card does

### Changed
- **Most watched** tiles switch to one column on narrow cards instead of squeezing long names and translations, and the hours no longer wrap away from their number
- The options text now says the TMDB key is also used for *Most watched*, not only for posters
- A fun stat of exactly one month, day or year now reads "1 month" instead of "1 months"

### Not translated
- The card editor, and the entity names (they stay English because the card finds its sensors by them)

## 0.5.5

### Added
- **Runners-up in Most watched**: a tile with a small arrow opens when you tap it and shows places 2 and 3 of that ranking, with photos, titles and hours
- **Progress bar for TMDB**: while the details are still being collected, Most watched shows a bar and *Collecting details from TMDB · 812 of 896 titles*. It turns into *Based on 812 of 896 titles* when done

### Changed
- **Flags are drawn by a small flag font built into the card**, so the Country tile shows a real flag on Windows too (it showed the letters "US" before). Nothing is loaded from the internet for it. The card file grows from about 84 KB to about 190 KB because of it
- The README credits the font and the Twemoji artwork (CC-BY 4.0)

## 0.5.4

### Changed
- **Most watched is ranked by number of titles**, like the Refract app, instead of by hours. The hours are still shown and break ties. A long series no longer outranks someone in many films
- **Directors and writers of a TV show** only count when they made at least a quarter of its episodes, and the creators always count as writers. Before, someone who directed a single episode got credit for the whole show
- **TV genres use the movie names**: *Action & Adventure* counts as Action and Adventure, *Sci-Fi & Fantasy* as Science Fiction and Fantasy, *War & Politics* as War. Before, Action could never beat Drama because shows and movies named it differently

### Upgrading
- The cached TMDB details are fetched again so the new rules apply (about 100 titles per update, the most watched first). Until that is done the section shows the numbers of the old rules for the titles not yet refreshed

## 0.5.3

### Changed
- **Most watched tiles** can only be chosen with the **Custom** layout. **Full** always shows all six tiles and **Compact** doesn't show the section. In the editor, *Most watched shows* moved into **Sections** and only appears for Custom
- A card that has `top_picks_items` but no `layout` is read as Custom, so it keeps its tiles. A card with `layout: full` or `compact` now ignores `top_picks_items`

## 0.5.2

### Fixed
- **Most watched still did not show up after 0.5.1** if you had run 0.5.0 before: Home Assistant keeps the entity id it registered, so the sensor stayed `sensor.*_most_watched` and the card didn't look for that name. The card now finds the sensor under either name, so nothing needs renaming. New installs get `sensor.*_top_picks`

## 0.5.1

### Fixed
- **Most watched did not show up**: the new sensor was named *Most watched*, so its entity id was `sensor.*_most_watched` and the card never found it. It is now named *Top picks* (`sensor.*_top_picks`).

### Added
- A test that checks every sensor name matches a sensor key the card looks for

## 0.5.0

### Added
- **Most watched**: a new card section with your top **actor**, **director**, **writer**, **decade**, **genre** and **country**. People have their TMDB profile photo, countries a flag, and every tile shows the titles and hours behind it. It is worked out from TMDB (Refract doesn't provide it), weighting each title by the time you spent on it, and needs the TMDB API key that is already used for posters
- New sensor `sensor.*_top_picks` with the top 3 of each ranking in its attributes, usable in your own cards and automations
- Card options `show_top_picks` (Custom layout, with a switch in the editor) and `top_picks_items` to pick and order the tiles
- The card documentation explains how the numbers are counted, and the README has the TMDB notice

### Changed
- The default section order puts *Most watched* after *Last 7 days*. Cards with a custom `section_order` get it at the end

### Notes
- The first lookups run over the next few updates (100 titles each, the most watched first). The section says *Still building* until it is done. Details are cached on disk
- The numbers are our own calculation from TMDB, so they can differ from what the Refract app shows. TMDB has less writer data for TV than for movies

## 0.4.6

### Added
- **Seven more fun stats**: flights around the world, nights or years of sleep, average movies back to back, full TV seasons, marathons run, one-way trips to the Moon and runs through the IMDb Top 250. Pick one in the editor (*Fun stat*) with `fun_stat_mode`, or let `rotate` cycle through all ten. The comparisons are approximations, explained in the card documentation

### Changed
- **Watch time** and **Library** are now shown as the breakdown list by default (`watch_time_style: list`, `library_style: list`). The compact bar is still available in the editor and with `bar`
- The card screenshot shows the breakdown lists

### Upgrading
- Cards that never set `watch_time_style` or `library_style` switch from the compact bar to the list. To keep the bar, set the style to `bar` in the editor or in YAML

## 0.4.5

### Changed
- In the card editor with the **Custom** layout, **Section order** now sits directly under **Sections**, above Posters and the other settings

## 0.4.4

### Added
- **Custom layout**: *Layout* now offers **Full**, **Compact** and **Custom** (`layout: custom`)

### Changed
- **Full** always shows every section in the default order, and **Compact** shows only *Total watch time*, *Still to finish* and *Next up* (the streak is no longer part of it). Neither uses the section switches or *Section order* any more
- In the card editor, the **Sections** switches and **Section order** only appear when **Custom** is selected, where you choose the sections and their order. *Posters* is now always shown with the other settings
- **Library** (bar style): the count now follows the status after a dot, for example **Watched · 803**
- **Watch time** (bar style): the brackets are gone and the share follows the title after a dot, for example **TV shows · 78%**
- README and the card documentation now describe the three layouts, and the card screenshot is updated

### Upgrading
- Cards without a `layout` that hide sections (`show_*: false`) or set a `section_order` are treated as `custom` automatically, so they look the same as before. The editor shows them as **Custom**
- A card that sets `layout: full` in YAML now shows everything even if it also hides sections. Use `layout: custom` to keep hiding them
- A card with `layout: compact` no longer shows the streak, and ignores `section_order` and the `show_*` switches

## 0.4.3

### Fixed
- **Still to finish** now matches the Refract app. Refract's library doesn't say how many episodes a show you haven't started has, so those shows were left out and the total came out far too low (about 82 hours instead of 630). The integration now looks up the aired episode count and the runtime on TMDB for these shows, and the real runtime for movies, and adds them up. Results are cached on disk, and episode counts are refreshed every few days as episodes air. **This needs the TMDB API key from the integration options**, the one that adds posters. Without a key, or for a title TMDB doesn't know, the old behavior stays: the show is counted but not timed
- Started shows that Refract doesn't list under *Up next* use the TMDB episode count minus the episodes you've watched, when Refract gives a watched count

### Changed
- **Still to finish** shows only the total time and the movies and TV shows counters. The "630 hours of non-stop watching" line, the "Not counting N shows without an episode count" note and the episodes / started / not started line under TV shows are gone. The sensor still has all of them as attributes (including `unknown_episode_shows`)
- Card settings reordered: *Layout* and *Duration format* on the first row, *Watch time style* and *Library style* on the second, *Catch-up rows* and *Airing rows* on the third

## 0.4.2

### Changed
- **Still to finish**: the total now looks exactly like *Total watch time*: same size and color, with the units written out as **26 days 5 hours** instead of 26d 5h
- **Still to finish** moves below *Library* and above *Streak* in the default order. Cards that set their own `section_order` keep it
- **Still to finish** no longer shows the "Estimate: shifts as episodes air and runtime data improves" note. The note about shows that are missing an episode count stays
- README: the card screenshot now shows *Streak* and *Average per week* side by side, as they appear in a normal-width dashboard card, and follows the new section order

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
