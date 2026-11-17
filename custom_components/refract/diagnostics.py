"""Diagnostics: what the integration sees and has worked out, without keys or personal details."""

from __future__ import annotations

from collections import Counter
from typing import Any

from homeassistant.components.diagnostics import async_redact_data
from homeassistant.core import HomeAssistant
from homeassistant.loader import async_get_integration

from .analytics import count_waiting
from .const import CONF_API_KEY, CONF_TMDB_API_KEY, DOMAIN
from .coordinator import RefractConfigEntry

# Keys, and anything that names the account.
TO_REDACT = {CONF_API_KEY, CONF_TMDB_API_KEY, "api_key", "tmdb_api_key", "username", "name", "display_name", "email", "id", "refract"}

_LEADERS = ("actor", "director", "writer", "decade", "genre", "country")


def _summary(coordinator: Any) -> dict[str, Any]:
    data = coordinator.data or {}
    library = data.get("library") or []
    up_next = data.get("up_next") or []
    history = getattr(coordinator, "_history", None) or {}
    top = data.get("top_picks")
    wraps = data.get("wraps") or {}
    return {
        "last_update_success": coordinator.last_update_success,
        "update_interval_minutes": coordinator.update_interval.total_seconds() / 60 if coordinator.update_interval else None,
        "scopes": data.get("scopes"),
        "history_enabled": data.get("history_enabled"),
        "library": {"items": len(library), "by_status": dict(Counter(i.get("status") for i in library)), "by_type": dict(Counter(i.get("type") for i in library))},
        "up_next": {"shows": len(up_next), "with_episodes_waiting": count_waiting(up_next)},
        "watch_history": {
            "episode_entries": len(history.get("episodes") or []),
            "movie_entries": len(history.get("movies") or []),
            "records": len(history.get("records") or []),
        },
        "stats_fields": len(data.get("stats") or {}),
        "most_watched": None
        if not top
        else {
            "titles_used": top.get("titles"),
            "titles_total": top.get("total"),
            "titles_pending": top.get("pending"),
            # the leaders are public figures and genres; individual titles are left out
            "leaders": {k: {f: top[k][0].get(f) for f in ("name", "titles", "hours")} for k in _LEADERS if top.get(k)},
        },
        "monthly_wrap": None
        if not wraps
        else {
            "pending": wraps.get("pending"),
            "firsts_ready": wraps.get("firsts_ready"),
            "months": [
                {k: m.get(k) for k in ("month", "items", "episodes", "movies", "minutes", "active_days", "partial", "elapsed_days", "estimated")}
                for m in wraps.get("months") or []
            ],
        },
    }


async def async_get_config_entry_diagnostics(hass: HomeAssistant, entry: RefractConfigEntry) -> dict[str, Any]:
    """Return diagnostics for a config entry."""
    integration = await async_get_integration(hass, DOMAIN)
    coordinator = entry.runtime_data.coordinator
    return {
        "integration_version": str(integration.version),
        "entry": {
            "title": "**REDACTED**",
            "data": async_redact_data(dict(entry.data), TO_REDACT),
            "options": async_redact_data(dict(entry.options), TO_REDACT),
        },
        "tmdb": coordinator.tmdb.stats() if coordinator.tmdb else {"enabled": False},
        "coordinator": _summary(coordinator),
    }
