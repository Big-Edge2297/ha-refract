# Refract for Home Assistant

Unofficial [Home Assistant](https://www.home-assistant.io) integration for [Refract](https://getrefract.app), the cross-media tracker for movies, TV and anime. It uses Refract's official [personal API keys](https://getrefract.app/developers).

- Sensors for your library, watch stats, what's up next and what you watched last
- A calendar of upcoming episodes for the shows you follow
- Your watchlist as a to-do list
- Actions to log what you watch from automations (mark an episode watched, log a movie, add to watchlist, ...)

> Not affiliated with Refract. Use at your own risk and keep your key private.

## Dashboard card

A matching dashboard card is available:
[Refract Stats Card](https://github.com/Big-Edge2297/ha-refract-card).
It shows your watch time, library breakdown, streak and what to watch next.
Install it through HACS as a custom repository (category **Dashboard**).

## Install with HACS (custom repository)

1. In Home Assistant open **HACS**, then the three-dot menu, then **Custom repositories**.
2. Add `https://github.com/Big-Edge2297/ha-refract` with category **Integration**.
3. Find **Refract** in HACS, click **Download**, then restart Home Assistant.
4. Go to **Settings > Devices & services > Add integration > Refract**.

## Create your API key

In the Refract app: **Integrations > Access and connected apps > Create a key**. The key starts with `rfk_` and is shown **once**.

Pick permissions for what you want Home Assistant to do. The integration only creates the entities and actions your key allows.

| Refract permission | What you get |
|---|---|
| See your public profile | Required. Used to validate the key; username sensor |
| See your library and the status of each title | Library count sensors, last watched, watchlist to-do, calendar |
| See what you watched and when | Stats sensors, "Shows waiting" and "Next up" |
| Add, remove and move titles in your library | `set_status`, `add_to_watchlist`, removing watchlist items |
| Mark episodes and movies as watched | `mark_episode_watched`, `log_movie_play`, `log_rewatch` |

Rating titles and editing lists aren't exposed yet because Refract's API doesn't offer them yet.

Keys can be revoked from the same screen. If a key is revoked, Home Assistant will ask you to re-authenticate.

## Entities

| Entity | Needs |
|---|---|
| `sensor.*_library_total`, `in_progress`, `watchlist`, `up_to_date`, `completed`, `movies`, `tv_shows`, `anime` | library |
| `sensor.*_last_watched` (timestamp, with title/season/episode) | library |
| `sensor.*_shows_waiting`, `sensor.*_next_up` | history |
| `sensor.*_stats_*` (one per numeric field from your profile stats) | history |
| `calendar.*_upcoming_episodes` | library |
| `todo.*_watchlist` (items can be removed) | library |
| `sensor.*_username` (diagnostic) | profile |

Data is refreshed every 15 minutes by default (change under the integration's **Configure**). The API allows 120 requests/minute and this integration uses a handful per refresh, using ETags to skip unchanged data.

## Actions

Every action takes one of `refract_id`, `tmdb_id`, `imdb_id` or `tvdb_id` (for shows, the **show's** id), and an optional `config_entry_id` if you have several accounts.

| Action | Extra fields |
|---|---|
| `refract.mark_episode_watched` | `season`, `number` (TMDB numbering), optional `watched_at`, `watched: false` to unmark |
| `refract.log_movie_play` | optional `watched_at` |
| `refract.log_rewatch` | `season`, `number`, optional `watched_at` |
| `refract.add_to_watchlist` | `media_type` (`movie`/`show`) |
| `refract.set_status` | `media_type`, `status` (`planned`, `in_progress`, `up_to_date`, `completed`) |

Example script:

```yaml
script:
  log_severance_s2e4:
    sequence:
      - action: refract.mark_episode_watched
        data:
          tmdb_id: 95396
          season: 2
          number: 4
```

Example: add a movie to your watchlist from a dashboard button or automation:

```yaml
action: refract.add_to_watchlist
data:
  media_type: movie
  imdb_id: tt1375666
```

To log playback from Plex, Jellyfin, Emby or Sonarr/Radarr, trigger these actions from their webhook/events. You need the title's TMDB/IMDb/TVDB id, which those tools provide.

## Notes and limitations

- Library counts need the whole library, fetched in pages of 200 and refreshed on each poll. Very large libraries (many thousands of titles) are better served by a longer update interval.
- The response shapes for `/v1/stats`, `/v1/up-next` and `/v1/calendar` are parsed defensively. If a sensor or the calendar looks wrong, please [open an issue](https://github.com/Big-Edge2297/ha-refract/issues) with a redacted sample response.
- Smart lists, ratings and list editing aren't available through Refract's API yet.

## Development

```bash
git clone https://github.com/Big-Edge2297/ha-refract
```

Copy `custom_components/refract` into your HA config's `custom_components/` folder (or symlink it), restart, and enable debug logs:

```yaml
logger:
  logs:
    custom_components.refract: debug
```

Releases: tag `vX.Y.Z` (matching `manifest.json`'s `version`); the release workflow publishes it and HACS picks it up.

## License

MIT
