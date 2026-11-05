# Refract Stats Card

The dashboard card that ships with the [Refract integration](https://github.com/Big-Edge2297/ha-refract). It turns your Refract sensors into a readable card: how long you've watched, what's in your library, your streak, and what to watch next.

![Refract Stats Card](dashboard-card.png)

## What it shows

| Section | What you see |
|---|---|
| **Watch time** | Total time as days and hours, a library/movies/episodes summary, and a rotating fun stat ("about 8.8 months of nonstop viewing") |
| **Library** | A donut of movies, TV shows and anime, plus a status bar for completed, up to date, watchlist, in progress and other |
| **Watch time split** | Shows, movies and anime as a stacked bar with readable durations and shares |
| **Streak** | Current streak against your longest, as a gauge or as seven day dots. Switch between the two on the card |
| **Next up** | The show, episode number and name, progress through aired episodes, and premiere or finale badges |
| **Queue** | The rest of your waiting shows with progress bars |

Sections hide themselves when their sensors don't exist, so a read-only API key still gives a clean card.

## Installation

Nothing to install separately. The card is bundled with the integration and loads automatically.

1. Install or update the Refract integration (through HACS).
2. Restart Home Assistant.
3. Hard-refresh your browser (Ctrl+Shift+R, or Cmd+Shift+R on a Mac). In the mobile app, use **Settings → Companion app → Troubleshooting → Reset frontend cache**.
4. Edit a dashboard, choose **Add card** and search for **Refract stats**.

No dashboard resource needs to be added by hand.

Requires Home Assistant 2024.7 or newer.

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

### Compact layout

```yaml
type: custom:refract-stats-card
entity: sensor.refract_<username>_next_up
layout: compact
streak_style: dots
```

## Configuration

| Option | Default | Description |
|---|---|---|
| `entity` | | **Required.** Any entity of the Refract account |
| `name` | from the device | Overrides the account name in the header |
| `layout` | `full` | `full`, or `compact` (watch time, streak and next up only) |
| `streak_style` | `gauge` | `gauge` or `dots`. Viewers can switch on the card and the choice is remembered in their browser |
| `show_streak_toggle` | `true` | Show the gauge/dots switch |
| `duration_format` | `days_hours` | `days_hours` (206 d 23 h), `hours` (4,967 h) or `auto` (picks the unit by size) |
| `fun_stat` | `true` | Show the fun stat under the watch time summary |
| `fun_stat_mode` | `rotate` | `rotate` (changes daily), `months`, `workweeks` or `lotr` |
| `queue_length` | `5` | Queue rows shown before "Show all" |
| `show_hero` | `true` | Watch time summary |
| `show_library` | `true` | Library donut and status bar |
| `show_watch_time` | `true` | Watch time split |
| `show_streak` | `true` | Streak |
| `show_next_up` | `true` | Next up tile |
| `show_queue` | `true` | Waiting queue |
| `show_actions` | `false` | Show the "Mark watched" button on the next up tile |
| `confirm_actions` | `true` | Ask for a second tap before marking watched |
| `config_entry_id` | | Only for "Mark watched" with several Refract accounts when you're not an admin |
| `color_movies` | `#2a78d6` | Movies color, used in every chart |
| `color_shows` | `#eb6834` | TV shows color |
| `color_anime` | `#1baf7a` | Anime color |
| `color_accent` | `#6250d6` | Progress bars, streak and next up highlight |
| `entities` | | Manual overrides for discovery, see below |

The compact layout ignores `show_library`, `show_watch_time` and `show_queue`.

## Mark watched

The next up tile can mark the shown episode as watched. It is **off by default**, because it changes data in your Refract account.

Turn it on in the editor under **Next up actions**, or in YAML:

```yaml
type: custom:refract-stats-card
entity: sensor.refract_<username>_next_up
show_actions: true
```

The button calls the integration's `refract.mark_episode_watched` action. It stays hidden when that action isn't available (for example when the API key can't write) or when the next episode hasn't aired yet. The editor warns you in that case.

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

The keys are `library_total`, `completed`, `in_progress`, `watchlist`, `up_to_date`, `movies`, `tv_shows`, `anime`, `last_watched`, `shows_waiting`, `next_up`, `stats_watch_time_total_minutes`, `stats_watch_time_shows_minutes`, `stats_watch_time_movies_minutes`, `stats_watch_time_anime_minutes`, `stats_shows_episodes_watched`, `stats_anime_episodes_watched`, `stats_movies_watched`, `stats_streak_current_days` and `stats_streak_longest_days`.

### Several accounts

Add one card per account and pick an entity from each.

## Good to know

- **Streak dots are inferred.** The sensors have no per-day history, so the seven dots are worked out from the streak length and the time of your last watch. If you watched yesterday but not yet today, today's dot is dashed and the card says there's still time. Days follow the time zone preference in your Home Assistant profile (browser or server).
- **"Other" in the library bar** is the difference between your library total and the sum of the status counts, so the bar always adds up.
- **Episodes** in the summary is TV episodes plus anime episodes.
- **The queue** hides the show that's already shown as next up.
- **The fun stat** needs at least a day of watch time. In `rotate` mode it changes once a day.

## Styling

The card follows your Home Assistant theme. These optional theme variables override its defaults:

| Variable | Used for |
|---|---|
| `--refract-color-movies`, `--refract-color-shows`, `--refract-color-anime` | Category colors |
| `--refract-color-accent` | Progress, streak, next up |
| `--refract-color-completed`, `--refract-color-up-to-date`, `--refract-color-watchlist`, `--refract-color-in-progress` | Library status bar |
| `--refract-tile-background` | Summary tiles |
| `--refract-hero-font` | The large watch time numbers |

## Troubleshooting

**The card isn't in the card picker, or "Custom element doesn't exist: refract-stats-card"**: restart Home Assistant after updating the integration, then hard-refresh the browser. The file is served from `/refract_card/refract-stats-card.js`; opening that address while logged in should show JavaScript. If it's missing, check the Home Assistant log for "Refract card file not found".

**"Couldn't find any Refract entities"**: the chosen entity isn't from the Refract integration, or its sensors are unavailable. Pick an entity from the Refract device, or use the `entities` option.

**A section is missing**: its sensors don't exist for your API key, or are unavailable. Check Developer Tools → States for the sensor.

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

The demo page has a theme switch, a width slider and options for layout, streak style and duration format. It replaces Home Assistant's own elements with simple stand-ins, so fonts and icons look slightly different from the real thing.

After changing anything in `frontend/src`, run `npm run build` and commit the updated file in `www/`. CI fails if it doesn't match the source. The card version is the `version` in `frontend/package.json`; the browser cache is busted by the integration's own version, so bump `manifest.json` for each release.

### Translations

All text is in `frontend/src/localize.ts`. To add a language, add a dictionary keyed by the two-letter language code and register it in `dictionaries`. Missing keys fall back to English.

## License

Same as the integration.
