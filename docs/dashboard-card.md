# Refract Stats Card

The dashboard card that ships with the [Refract integration](https://github.com/Big-Edge2297/ha-refract). It turns your Refract sensors into a readable card: how long you've watched, what's in your library, your streak, and what to watch next.

![Refract Stats Card](dashboard-card.png)

## What it shows

| Section | What you see | Needs |
|---|---|---|
| **Watch time** | Total time as days and hours, a library/movies/episodes watched summary, and the fun stat in a highlighted pill ("about 8.8 months of nonstop viewing") | profile stats |
| **Watch time split** | Shows, movies and anime as a stacked bar with readable durations and shares. Shown as a breakdown list by default, with the time and share on one row per kind. Choose a compact bar instead, with the share after each title (TV shows · 78%) | profile stats |
| **Library** | Every status you use, named and colored as in the Refract app: Watched, Up to Date, Watching, Plan to Watch, On Hold, Dropped (and any other status Refract adds). Shown as the full breakdown list with counts and percentages by default. Choose a compact bar instead, with a legend (Watched · 803) | library |
| **Still to finish** | The time left to watch the movies and shows you haven't finished (Plan to Watch, Watching and On Hold), as in the Refract app: the total, and one row each for movies, TV shows and anime (only when you have anime to finish) with the number of titles and the time left | library |
| **Streak** | Current streak in big numbers, seven day dots and your longest streak | profile stats |
| **Average per week** | Estimated hours per week over the last 4 weeks, how many episodes and movies that is, and the change against the 4 weeks before | watch history |
| **Last 7 days** | Episodes and movies per day as stacked bars, with the busiest day named | watch history |
| **Most watched** | Your top actor, director, writer, decade, genre and country, each with a profile photo (people), a flag (country) or an icon, and the number of titles and hours behind it. Worked out from TMDB, see [Most watched](#most-watched) | library + TMDB key |
| **Monthly wrap** | One page per completed month with four tabs: Overview, Tastes, Patterns and Moments. See [Monthly wrap](#monthly-wrap) | watch history |
| **Next up** | The show (with poster), episode number and name, progress through aired episodes, premiere or finale badges and an optional **Mark watched** button. A show with nothing left to watch is skipped. Tap a show in the catch-up backlog to show it here instead | history |
| **Catch-up backlog** | How many aired episodes are waiting across all your shows, an estimate of the time, and a row for each backlog. The bar shows how many of that show's aired episodes you have already watched, like the Next up bar, so it is never full while episodes are waiting; the number is how many are waiting | history |
| **Airing this week** | Episodes airing in the next 7 days for the shows you follow, with premiere and finale pills and the air time when Refract knows it | library |

Sections hide themselves when their sensors don't exist, so a read-only API key still gives a clean card.

## Languages

The card shows in the language of your Home Assistant profile: German, French, Spanish, Italian, Dutch, Portuguese and Polish, or English for any other language. The units follow the language too (days, hours, and the short forms such as `j` for jours in French). The card editor itself stays in English. See [Translations](translations.md).

## Monthly wrap

The *Monthly wrap* section is the integration's own version of the wraps in the Refract app: one summary for each completed month, up to the last 12. Use the arrows to go back through the months, and the tabs to switch between the pages:

- **Overview**: the hours watched, with the change against the month before, and how many episodes, movies, shows and anime.
- **Tastes**: shows, anime and movies as a share of the titles you watched, your top genres, and how much was a first watch and how much a rewatch.
- **Patterns**: items and hours per day, a bar for every day of the month with the busiest day highlighted, the share watched on weekends, your best streak and the days you watched something.
- **Moments**: the three most watched titles with their posters, and the countries you watched a title from for the first time.

It is built from your watch history, so it needs **Fetch watch history** turned on in the integration options. Genres, posters and the first countries also need the TMDB API key, and show up as the TMDB details come in (the same details *Most watched* uses). Without a key you still get everything else.

Differences from the Refract app, because the API doesn't provide them: there is **no time of day** (the history only has the day, so no peak hour or hourly chart), **no community rank** and **no ratings**. The hours use the runtimes in your history where they exist, and average runtimes otherwise; a `~` before the hours says they are partly estimated. A rewatch is counted when Refract says so for a movie, or an episode has been rewatched. The "first from a country" needs the TMDB details of every title in your history, so it says *Still collecting details from TMDB* until they are all there. The newest month is the last one that has finished, so the current month appears on the 1st of next month.

The section is part of the Full layout and not shown in Compact. In the Custom layout, `show_monthly_wrap` switches it on or off. The sensor is `sensor.*_monthly_wrap`: its state is the number of items in the newest month, and the `months` attribute has all the months for your own cards.

## Most watched

The Refract API doesn't say which actors, directors, genres or countries you watch most, so the integration works it out with [TMDB](https://www.themoviedb.org). It needs the same free TMDB API key as the posters. Without a key the section doesn't appear.

- **How it counts.** Every watched title counts once for each of its actors, directors, writers, genres and countries, and the one with the most titles wins, like in the Refract app. When two are level, the one with more hours wins. The hours are the time you spent on those titles: a movie for its runtime times the times you played it, a show for the episodes you watched times the episode runtime. The decade comes from the release year (the first air date for shows). Titles on your watchlist that you haven't watched don't count.
- **Actors** are the top billed cast of each title (10 people), so a guest appearance doesn't count. **Directors** and **writers** of a show only count when they made at least a quarter of its episodes (TMDB lists everyone who worked on a single episode), and the creators of a show always count as writers. TMDB has less writing data for TV than for movies. **Genres** use the movie names, so TMDB's TV genres *Action & Adventure* and *Sci-Fi & Fantasy* count as Action and Adventure, and as Science Fiction and Fantasy.
- **It fills in over time.** The first time, the integration asks TMDB for the credits of every title you watched, the most watched ones first, a batch on each update. The section says *Still building* and shows a progress bar with *Collecting details from TMDB · 812 of 896 titles* until it is done (then *Based on 812 of 896 titles*), and the leaders are already right for the titles that count most. Details are cached on disk and looked at again only after about six months, so later updates cost nothing.
- **It can differ from the Refract app.** This is our own calculation from TMDB's data, so the numbers and some names may not match what the app shows. Titles TMDB doesn't know are left out.
- **Runners-up.** A tile with a small arrow next to its title opens when you tap it and shows places 2 and 3 of that ranking, with their titles and hours. Tap again to close it. Tiles with no runners-up have no arrow.
- **Photos** are loaded by your browser from `image.tmdb.org`, like the posters. A person without a photo shows their initials.
- **Flags** are drawn with a small flag font built into the card, so they look the same on Windows, which has no flag emoji, and everywhere else. Nothing is loaded for them from the internet.
- **Layouts.** The Full layout shows all six tiles and Compact doesn't show this section. Only the Custom layout lets you pick which tiles to show, and in which order, with `top_picks_items` (for example `[actor, director, writer, decade]`), and hide the whole section with `show_top_picks`. In the editor both are under **Sections**.

## Posters

Posters appear beside **Next up** and in the **Catch-up backlog** when you add a free [TMDB](https://www.themoviedb.org) API key to the integration: **Settings → Devices & services → Refract → Configure → TMDB API key**. Without a key the card shows no posters and nothing changes. A show without a poster shows its first letter instead.

Turn posters off in the card with `show_posters: false`.

## Installation

Nothing to install separately. The card is bundled with the integration and loads automatically.

1. Install or update the Refract integration (through HACS).
2. Restart Home Assistant.
3. Hard-refresh your browser (Ctrl+Shift+R, or Cmd+Shift+R on a Mac). In the mobile app, use **Settings → Companion app → Troubleshooting → Reset frontend cache**.
4. Edit a dashboard, choose **Add card** and search for **Refract stats**.

No dashboard resource needs to be added by hand.

Requires Home Assistant 2025.1 or newer.

### Coming from the standalone card?

Earlier versions of this card were a separate HACS download (`Big-Edge2297/ha-refract-card`). Your existing cards keep working with the same configuration. To avoid two copies loading:

1. In HACS, open **Refract Stats Card** under **Dashboard** and choose **Remove**.
2. Under **Settings → Dashboards → ⋮ → Resources**, delete any `refract-stats-card.js` entry that's still listed.
3. Restart Home Assistant and hard-refresh the browser.

If both copies are present, the first one loaded wins and the browser console shows a warning.

## Adding the card

Use the visual editor: **Edit dashboard → Add card → Refract stats**, then pick any entity from your Refract account. The card finds the rest on its own.

Or in YAML:

```yaml
type: custom:refract-stats-card
entity: sensor.refract_<username>_next_up
```

Replace `<username>` with your own: the entity ID is whatever your Refract entities are called in Home Assistant (check **Settings → Devices & services → Entities**). Any Refract entity works as the `entity`, and the card finds the other sensors of the same account. The visual editor avoids typing it at all.

### Layouts

The `layout` option decides which sections the card shows:

| Layout | What it shows |
|---|---|
| `full` (default) | Every section, in the default order |
| `compact` | Total watch time, still to finish and next up |
| `custom` | Only the sections you switch on, in the order you choose |

`full` and `compact` ignore the `show_*` switches and `section_order`. In the visual editor, the **Sections** switches and **Section order** appear only when **Custom** is selected.

```yaml
type: custom:refract-stats-card
entity: sensor.refract_<username>_next_up
layout: compact
```

### Custom layout

Set `layout: custom`, then switch sections on or off and put them in the order you like. For example, a slimmer card without the weekly charts and the airing list:

```yaml
type: custom:refract-stats-card
entity: sensor.refract_<username>_next_up
layout: custom
show_average: false
show_last_7_days: false
show_airing: false
```

Change the order of the sections in the editor under **Section order** (arrows move a section up or down), or in YAML with `section_order`. The header always stays on top. Sections you leave out of the list follow in their default position, and the `show_*` switches still decide what is shown.

```yaml
type: custom:refract-stats-card
entity: sensor.refract_<username>_next_up
layout: custom
section_order:
  - next_up
  - airing
  - hero
```

The default order is `hero`, `watch_time`, `library`, `still_to_finish`, `streak`, `average`, `last_7_days`, `top_picks`, `monthly_wrap`, `next_up`, `catchup`, `airing`. `streak` and `average` share a row when they are next to each other.

Cards from before 0.4.4 that have no `layout` but hide sections or set a `section_order` are treated as `custom`, so they keep looking the same. A card that sets `layout: full` explicitly now always shows everything.

## Configuration

| Option | Default | Description |
|---|---|---|
| `entity` | | **Required.** Any entity of the Refract account |
| `name` | from the device | Overrides the account name in the header |
| `layout` | `full` | `full` (every section), `compact` (total watch time, still to finish and next up) or `custom` (use `show_*` and `section_order`) |
| `watch_time_style` | `list` | `list` (a bar plus one row per kind with its time and percentage, like the library list) or `bar` (a stacked bar with the share after each title; shorter) |
| `library_style` | `list` | `list` (the Refract app's status breakdown: a bar plus one row per status with its count and percentage) or `bar` (a status bar with a legend; shorter) |
| `duration_format` | `days_hours` | `days_hours` (206 d 23 h), `hours` (4,967 h) or `auto` (picks the unit by size) |
| `fun_stat` | `true` | Show the fun stat pill under the watch time |
| `fun_stat_mode` | `rotate` | `rotate` (changes daily through every comparison that applies), or pick one: `months`, `workweeks`, `lotr`, `flights`, `sleep`, `movies`, `seasons`, `marathons`, `moon` or `imdb` |
| `queue_length` | `5` | Catch-up rows shown before "Show all" |
| `airing_length` | `5` | "Airing this week" rows shown before "Show all" |
| `section_order` | see above | Order of the sections under the header (list of section names). Only used by `layout: custom` |
| `show_hero` | `true` | Watch time summary and fun stat |
| `show_watch_time` | `true` | Watch time split |
| `show_library` | `true` | Library (status bar or breakdown list, see `library_style`) |
| `show_still_to_finish` | `true` | Still to finish |
| `show_streak` | `true` | Streak |
| `show_average` | `true` | Average per week |
| `show_last_7_days` | `true` | Last 7 days chart and busiest day |
| `show_top_picks` | `true` | Most watched (needs a TMDB key in the integration options) |
| `show_monthly_wrap` | `true` | Monthly wrap (needs watch history) |
| `show_next_up` | `true` | Next up tile |
| `show_catchup` | `true` | Catch-up backlog |
| `show_airing` | `true` | Airing this week |
| `top_picks_items` | all six | Tiles of Most watched, in order: `actor`, `director`, `writer`, `decade`, `genre`, `country`. Only used by `layout: custom` |
| `show_posters` | `true` | Posters (needs a TMDB key in the integration options) |
| `show_actions` | `false` | Show the "Mark watched" button on the next up tile |
| `confirm_actions` | `true` | Ask for a second tap before marking watched |
| `config_entry_id` | | Only for "Mark watched" with several Refract accounts when you're not an admin |
| `color_movies` | `#2a78d6` | Movies color, used in every chart |
| `color_shows` | `#eb6834` | TV shows color |
| `color_anime` | `#1baf7a` | Anime color |
| `color_accent` | `#6250d6` | Progress bars, streak and next up highlight |
| `entities` | | Manual overrides for discovery, see below |

The `show_*` section switches (`show_hero` to `show_airing`) only apply to `layout: custom`. `show_posters`, `show_actions` and `confirm_actions` work in every layout.

### Options from earlier versions

| Option | What happens now |
|---|---|
| `show_queue` | Still works as an alias for `show_catchup` (unless `show_catchup` is also set) |
| `streak_style`, `show_streak_toggle` | Ignored. The streak is always shown as dots; the gauge is gone |

## Mark watched

The next up tile can mark the shown episode as watched. It is **off by default**, because it changes data in your Refract account.

Turn it on in the editor under **Next up actions**, or in YAML:

```yaml
type: custom:refract-stats-card
entity: sensor.refract_<username>_next_up
show_actions: true
```

The button calls the integration's `refract.mark_episode_watched` action. It stays hidden when that action isn't available (for example when the API key can't write) or when the next episode hasn't aired yet. The editor warns you in that case.

### Marking an episode of another show

Next up normally shows one show. To mark an episode of a different show you're watching, tap its row in the **Catch-up backlog**. The Next up tile switches to that show and its next episode, and the **Mark watched** button works on it. After you mark it, the tile stays on that show and moves on to its following episode, so you can mark several in a row. To return to the show the tile started with, tap its row in the backlog (it becomes tappable while another show is shown), or tap the picked row again. The tile also returns by itself once the show has nothing left in the backlog.

Rows can be tapped only while **Next up** is shown, and only when the integration knows the show's next episode. The show already in Next up can't be tapped, because it is already there. The choice is not saved: reloading the dashboard returns to the default show. This needs integration 0.3.8 or newer for every row; with an older integration only the first few shows in the backlog can be picked.

With `confirm_actions` on (the default), the first tap changes the button to "Mark watched?" for three seconds and the second tap does it. After a successful call the card asks Home Assistant to refresh the Refract sensors; they update as soon as Refract responds.

## How the card finds your sensors

The card takes the entity you chose and finds the other Refract sensors of the same account:

1. Through the device registry: every Refract sensor on the same device.
2. By name: `sensor.<prefix><key>`, where the prefix comes from the entity you chose (for `sensor.refract_<username>_next_up` the prefix is `refract_<username>_`).

Sensors you renamed keep working through the first method. If something still isn't picked up, point the card at it directly:

```yaml
type: custom:refract-stats-card
entity: sensor.refract_<username>_next_up
entities:
  completed: sensor.my_completed_titles
  stats_streak_current_days: sensor.my_streak
```

The keys are `library_total`, `completed`, `in_progress`, `watchlist`, `up_to_date`, `movies`, `tv_shows`, `anime`, `last_watched`, `shows_waiting`, `next_up`, `catch_up`, `last_7_days`, `average_per_week`, `airing_this_week`, `top_picks`, `monthly_wrap`, `stats_watch_time_total_minutes`, `stats_watch_time_shows_minutes`, `stats_watch_time_movies_minutes`, `stats_watch_time_anime_minutes`, `stats_shows_episodes_watched`, `stats_anime_episodes_watched`, `stats_movies_watched`, `stats_streak_current_days` and `stats_streak_longest_days`.

### Several accounts

Add one card per account and pick an entity from each.

## Good to know

- **Streak dots are inferred.** The sensors have no per-day history, so the seven dots are worked out from the streak length and the time of your last watch. If you watched yesterday but not yet today, today's dot is dashed and the card says there's still time. Days follow the time zone preference in your Home Assistant profile (browser or server).
- **Average per week is an estimate.** Refract's history gives dates but not runtimes, so the hours are the number of episodes and movies you watched in the last 4 weeks, multiplied by your average runtime per item (total watch time divided by titles watched). It's marked with a `~`. The percentage compares the last 4 weeks with the 4 weeks before, and is left out unless that earlier period had at least 4 viewings, so a quiet stretch doesn't make a normal month look like a huge jump.
- **Air times** follow your Home Assistant time zone and 12/24 hour setting. The day chip uses the day Refract reports, so for a show airing late in the evening it can differ from your local day if your Home Assistant time zone differs from the one in your Refract profile.
- **Last 7 days** counts the days Refract has on record. Episodes watched with no date recorded can't appear in it. The busiest day is the day with the most episodes and movies in those seven days (the latest day wins a tie).
- **Watch history is refreshed hourly**, and straight after you mark something watched through Home Assistant. Turn it off in the integration options if you don't want the extra requests; the two sections that need it then disappear.
- **Next up** is the first show in Refract's up-next list that still has an aired episode to watch. Refract can keep a show you have fully watched in that list, for instance while it waits for a new season, and those are skipped, so *Shows waiting* counts only shows with episodes waiting.
- **The catch-up backlog** counts aired episodes you haven't watched across every show you're watching, including the one shown as next up. The time is an estimate from your average episode length.
- **The library** lists every status that has at least one title, taken from the `by_status` attribute of the library total sensor. Statuses are named as in the Refract app (Watched, Up to Date, Watching, Plan to Watch, On Hold, Dropped) and ordered the same way; any other status Refract adds follows with a readable name, and "paused" counts as on hold. Percentages in the list are each status's share of the titles listed. If the `by_status` attribute is missing, for example with an older integration version, the card shows the four main statuses plus **Other**, the difference between your library total and their sum, so the bar always adds up. The app's *Rewatched* line isn't shown, because the integration doesn't have that number yet.
- **Last 7 days** shows the number of episodes watched above each bar (days with no episodes show no number); movies are the blue part of the bar.
- **Episodes watched** in the summary is TV episodes plus anime episodes.
- **Still to finish** adds up the titles in your library that are *Plan to Watch*, *Watching* or *On Hold*; completed, up to date and dropped titles don't count. For shows you've started, the episodes are the aired ones you haven't watched (the same numbers as the catch-up backlog). For shows you haven't started, Refract's library doesn't say how many episodes there are, so the integration asks TMDB for the number of aired episodes and the episode runtime, and for movies the runtime. **This needs a TMDB API key in the integration options** (the same one used for posters); results are cached on disk, and episode counts are refreshed every few days as episodes air. Without a key, or for a title TMDB doesn't know, the show is counted but left out of the episodes and the time, and the `unknown_episode_shows` attribute of the sensor says how many. Where there is no runtime, your average runtime per movie or episode is used. It may differ a little from the Refract app, and it changes as episodes air.
- **The fun stat** needs at least a day of watch time. In `rotate` mode it changes once a day. The comparisons are approximations:

  | Mode | Comparison | Based on |
  |---|---|---|
  | `months` | Days, months or years of nonstop viewing | your total time |
  | `workweeks` | Full-time work weeks | 40 hours a week |
  | `lotr` | The extended Lord of the Rings trilogy | 12 hours 6 minutes |
  | `flights` | Flights around the world | about 44.5 hours at airliner speed |
  | `sleep` | Nights or years of sleep | 8 hours a night |
  | `movies` | Average movies back to back | 100 minutes each |
  | `seasons` | Full TV seasons | 22 episodes of 42 minutes |
  | `marathons` | Marathons run | 4 hours 30 minutes each |
  | `moon` | One-way trips to the Moon | 3 days, as the Apollo missions |
  | `imdb` | Watching the whole IMDb Top 250 | 250 films of about 130 minutes |

  A comparison that would come out below 2 is skipped, in `rotate` mode and when you pick it.

## Styling

The card follows your Home Assistant theme. These optional theme variables override its defaults:

| Variable | Used for |
|---|---|
| `--refract-color-movies`, `--refract-color-shows`, `--refract-color-anime` | Category colors |
| `--refract-color-accent` | Progress, streak, next up |
| `--refract-color-completed`, `--refract-color-up-to-date`, `--refract-color-in-progress`, `--refract-color-watchlist`, `--refract-color-on-hold`, `--refract-color-dropped` | Library colors for Watched, Up to Date, Watching, Plan to Watch, On Hold and Dropped. The defaults match the Refract app |
| `--refract-tile-background` | Summary tiles |
| `--refract-hero-font` | The large watch time numbers |

## Troubleshooting

**The card isn't in the card picker, or "Custom element doesn't exist: refract-stats-card"**: restart Home Assistant after updating the integration, then hard-refresh the browser. The file is served from `/refract_card/refract-stats-card.js`; opening that address while logged in should show JavaScript. If it's missing, check the Home Assistant log for "Refract card file not found".

**"Couldn't find any Refract entities"**: the chosen entity isn't from the Refract integration, or its sensors are unavailable. Pick an entity from the Refract device, or use the `entities` option.

**A section is missing**: its sensors don't exist for your API key, or are unavailable. Check Developer Tools → States for the sensor. *Last 7 days* and *Average per week* also need **Fetch watch history** turned on in the integration options.

**No Monthly wrap section**: it needs **Fetch watch history** in the integration options, and shows once a month has finished with something watched in it. The sensor is `sensor.*_monthly_wrap`. Genres, posters and firsts need the TMDB key.

**No Most watched section** (the sensor is `sensor.*_top_picks`, or `sensor.*_most_watched` if you first installed 0.5.0; the card finds both): it needs a TMDB API key under **Settings → Devices & services → Refract → Configure**, the library permission on your Refract key, and `show_top_picks` not set to `false` in the Custom layout. Right after adding the key it shows *Still building* for a while.

**No posters**: add a TMDB API key under **Settings → Devices & services → Refract → Configure**, wait for the next update (up to the update interval), and check that `show_posters` isn't `false`. Posters are loaded from `image.tmdb.org` by your browser, so an ad blocker or a restrictive network can hide them; the card then shows the first letter of the title.

**No "Mark watched" button**: `show_actions` is off (the default), the `refract.mark_episode_watched` action isn't available, or the next episode hasn't aired.

## Development

The card's source lives in `frontend/`. The built file is committed at `custom_components/refract/www/refract-stats-card.js`, which is what Home Assistant serves.

```bash
cd frontend
npm install
npm run typecheck   # TypeScript
npm test            # unit and DOM tests
npm run build       # writes ../custom_components/refract/www/refract-stats-card.js
npm run demo        # preview with sample data at http://localhost:5173
```

The demo page has a theme switch, a width slider, a posters switch and options for layout and duration format. It replaces Home Assistant's own elements with simple stand-ins, so fonts and icons look slightly different from the real thing.

After changing anything in `frontend/src`, run `npm run build` and commit the updated file in `www/`. CI fails if it doesn't match the source. The card version is the `version` in `frontend/package.json`; the browser cache is busted by the integration's own version, so bump `manifest.json` for each release.

### Translations

All text is in `frontend/src/localize.ts`. To add a language, add a dictionary keyed by the two-letter language code and register it in `dictionaries`. Missing keys fall back to English.

## License

Same as the integration.
