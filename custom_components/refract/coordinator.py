"""Data update coordinator for Refract."""

from __future__ import annotations

from dataclasses import dataclass
from datetime import timedelta
from typing import Any

from homeassistant.config_entries import ConfigEntry
from homeassistant.core import HomeAssistant
from homeassistant.exceptions import ConfigEntryAuthFailed
from homeassistant.helpers.update_coordinator import DataUpdateCoordinator, UpdateFailed
from homeassistant.util import dt as dt_util

from .analytics import (
    average_minutes,
    build_backlog,
    busiest_day,
    daily_counts,
    iter_episode_dates,
    iter_play_dates,
    parse_calendar,
    poster_candidates,
    upcoming,
    weekly_stats,
)
from .api import (
    RefractApiClient,
    RefractAuthError,
    RefractError,
    RefractRateLimitError,
    RefractScopeError,
)
from .const import (
    CONF_FETCH_HISTORY,
    CONF_SCAN_INTERVAL,
    DEFAULT_SCAN_INTERVAL,
    DOMAIN,
    HISTORY_REFRESH_MINUTES,
    LOGGER,
    SCOPE_HISTORY,
    SCOPE_LIBRARY,
    SCOPE_PROFILE,
)
from .tmdb import TmdbClient
from .util import flatten_numbers


class RefractCoordinator(DataUpdateCoordinator[dict[str, Any]]):
    """Polls Refract and shares the result with every entity."""

    config_entry: ConfigEntry

    def __init__(
        self,
        hass: HomeAssistant,
        entry: ConfigEntry,
        api: RefractApiClient,
        tmdb: TmdbClient | None = None,
    ) -> None:
        minutes = entry.options.get(CONF_SCAN_INTERVAL, DEFAULT_SCAN_INTERVAL)
        super().__init__(
            hass,
            LOGGER,
            config_entry=entry,
            name=DOMAIN,
            update_interval=timedelta(minutes=minutes),
        )
        self.api = api
        self.tmdb = tmdb
        self._history: dict[str, Any] | None = None
        self._history_stale = False

    def invalidate_history(self) -> None:
        """Fetch the watch history again on the next refresh (after a write)."""
        self._history_stale = True

    async def _async_history(self, has_scope: bool) -> dict[str, Any] | None:
        """Watch history, refreshed at most hourly because it is many pages."""
        if not self.config_entry.options.get(CONF_FETCH_HISTORY, True) or not has_scope:
            return None
        now = dt_util.utcnow()
        if (
            self._history
            and not self._history_stale
            and now - self._history["at"] < timedelta(minutes=HISTORY_REFRESH_MINUTES)
        ):
            return self._history
        try:
            episodes = await self.api.get_episode_history()
            movies = await self.api.get_movie_history()
        except RefractAuthError:
            raise
        except RefractError as err:
            LOGGER.debug("Could not refresh the watch history, keeping the last copy: %s", err)
            return self._history
        self._history = {
            "episodes": list(iter_episode_dates(episodes)),
            "movies": list(iter_play_dates(movies)),
            "at": now,
        }
        self._history_stale = False
        return self._history

    async def _async_update_data(self) -> dict[str, Any]:
        scopes: dict[str, bool] = {}

        async def guard(scope: str, func, default):
            """Run a call; a 403 means the key simply lacks that permission."""
            try:
                result = await func()
            except RefractScopeError:
                scopes.setdefault(scope, False)
                return default
            scopes[scope] = True
            return result

        try:
            me = await guard(SCOPE_PROFILE, self.api.get_me, None)
            library = await guard(SCOPE_LIBRARY, self.api.get_library, [])
            today = dt_util.now().date()
            calendar = await guard(
                SCOPE_LIBRARY, lambda: self.api.get_calendar(today.isoformat(), 31), None
            )
            up_next = await guard(SCOPE_HISTORY, self.api.get_up_next, [])
            stats = await guard(SCOPE_HISTORY, self.api.get_stats, {})
            history = await self._async_history(bool(scopes.get(SCOPE_HISTORY)))
        except RefractAuthError as err:
            raise ConfigEntryAuthFailed("Refract API key rejected") from err
        except RefractRateLimitError as err:
            raise UpdateFailed(str(err)) from err
        except RefractError as err:
            raise UpdateFailed(str(err)) from err

        if isinstance(stats, dict) and set(stats) == {"data"} and isinstance(stats["data"], dict):
            stats = stats["data"]
        library = library or []
        up_next = up_next or []
        flat = dict(flatten_numbers(stats)) if isinstance(stats, dict) else {}
        per_item, per_episode = average_minutes(flat)

        # Posters (optional, needs the user's own TMDB key)
        posters: dict[int, str] = {}
        if self.tmdb and up_next:
            wanted = poster_candidates(up_next)
            await self.tmdb.async_lookup(wanted)
            posters = {i: url for i in wanted if (url := self.tmdb.poster_url(i))}

        # Weekly numbers from the cached history
        analytics = None
        if history:
            days = daily_counts(history["episodes"], history["movies"], today)
            week = weekly_stats(history["episodes"], history["movies"], today)
            hours = round(week["items_per_week"] * per_item / 60, 1) if per_item else None
            analytics = {
                "days": days,
                "episodes": sum(d["episodes"] for d in days),
                "movies": sum(d["movies"] for d in days),
                "busiest": busiest_day(days),
                "average": {
                    **week,
                    "hours_per_week": hours,
                    "avg_minutes_per_item": round(per_item) if per_item else None,
                    "estimated": True,
                },
            }

        anime_titles = {
            str(i.get("title")).lower() for i in library if i.get("is_anime") and i.get("title")
        }
        return {
            "scopes": scopes,
            "me": me,
            "library": library,
            "watchlist": [i for i in library if i.get("status") == "planned"],
            "calendar": calendar,
            "airing": upcoming(parse_calendar(calendar), today, 7, anime_titles),
            "up_next": up_next,
            "stats": stats or {},
            "posters": posters,
            "backlog": build_backlog(up_next, posters, per_episode),
            "analytics": analytics,
            "history_enabled": bool(self.config_entry.options.get(CONF_FETCH_HISTORY, True)),
        }


@dataclass
class RefractData:
    """Runtime data stored on the config entry."""

    api: RefractApiClient
    coordinator: RefractCoordinator


type RefractConfigEntry = ConfigEntry[RefractData]
