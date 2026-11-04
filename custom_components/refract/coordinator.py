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

from .api import (
    RefractApiClient,
    RefractAuthError,
    RefractError,
    RefractRateLimitError,
    RefractScopeError,
)
from .const import (
    CONF_SCAN_INTERVAL,
    DEFAULT_SCAN_INTERVAL,
    DOMAIN,
    LOGGER,
    SCOPE_HISTORY,
    SCOPE_LIBRARY,
    SCOPE_PROFILE,
)


class RefractCoordinator(DataUpdateCoordinator[dict[str, Any]]):
    """Polls Refract and shares the result with every entity."""

    config_entry: ConfigEntry

    def __init__(self, hass: HomeAssistant, entry: ConfigEntry, api: RefractApiClient) -> None:
        minutes = entry.options.get(CONF_SCAN_INTERVAL, DEFAULT_SCAN_INTERVAL)
        super().__init__(
            hass,
            LOGGER,
            config_entry=entry,
            name=DOMAIN,
            update_interval=timedelta(minutes=minutes),
        )
        self.api = api

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
            today = dt_util.now().date().isoformat()
            calendar = await guard(
                SCOPE_LIBRARY, lambda: self.api.get_calendar(today, 31), None
            )
            up_next = await guard(SCOPE_HISTORY, self.api.get_up_next, [])
            stats = await guard(SCOPE_HISTORY, self.api.get_stats, {})
        except RefractAuthError as err:
            raise ConfigEntryAuthFailed("Refract API key rejected") from err
        except RefractRateLimitError as err:
            raise UpdateFailed(str(err)) from err
        except RefractError as err:
            raise UpdateFailed(str(err)) from err

        if isinstance(stats, dict) and set(stats) == {"data"} and isinstance(stats["data"], dict):
            stats = stats["data"]

        return {
            "scopes": scopes,
            "me": me,
            "library": library or [],
            "watchlist": [i for i in (library or []) if i.get("status") == "planned"],
            "calendar": calendar,
            "up_next": up_next or [],
            "stats": stats or {},
        }


@dataclass
class RefractData:
    """Runtime data stored on the config entry."""

    api: RefractApiClient
    coordinator: RefractCoordinator


type RefractConfigEntry = ConfigEntry[RefractData]
