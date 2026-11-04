"""Refract actions (services) for logging what you watch."""

from __future__ import annotations

import uuid
from collections.abc import Awaitable, Callable
from typing import Any

import voluptuous as vol

from homeassistant.core import HomeAssistant, ServiceCall
from homeassistant.exceptions import HomeAssistantError, ServiceValidationError
from homeassistant.helpers import config_validation as cv
from homeassistant.util import dt as dt_util

from .api import RefractError, RefractScopeError
from .const import DOMAIN
from .coordinator import RefractData

ID_KEYS = ("refract_id", "tmdb_id", "imdb_id", "tvdb_id")

_BASE = {
    vol.Optional("config_entry_id"): cv.string,
    vol.Optional("refract_id"): cv.string,
    vol.Optional("tmdb_id"): vol.Coerce(int),
    vol.Optional("imdb_id"): cv.string,
    vol.Optional("tvdb_id"): vol.Coerce(int),
}
_WATCHED_AT = {vol.Optional("watched_at"): cv.datetime}
_EPISODE = {
    vol.Required("season"): vol.All(vol.Coerce(int), vol.Range(min=0)),
    vol.Required("number"): vol.All(vol.Coerce(int), vol.Range(min=1)),
}


def _schema(extra: dict) -> vol.Schema:
    return vol.All(vol.Schema({**_BASE, **extra}), cv.has_at_least_one_key(*ID_KEYS))


def _runtime(hass: HomeAssistant, call: ServiceCall) -> RefractData:
    entries = hass.config_entries.async_loaded_entries(DOMAIN)
    if entry_id := call.data.get("config_entry_id"):
        entries = [e for e in entries if e.entry_id == entry_id]
    if not entries:
        raise ServiceValidationError("No loaded Refract account found")
    return entries[0].runtime_data


def _iso(call: ServiceCall) -> str | None:
    value = call.data.get("watched_at")
    return dt_util.as_local(value).isoformat() if value else None


async def _resolve(data: RefractData, call: ServiceCall, media_type: str) -> str:
    """Turn whichever id the caller gave into a Refract id."""
    if call.data.get("refract_id"):
        return call.data["refract_id"]
    for id_type in ("tmdb", "imdb", "tvdb"):
        value = call.data.get(f"{id_type}_id")
        if value is not None:
            found = await data.api.find_refract_id(id_type, str(value), media_type)
            if found:
                return found
            raise ServiceValidationError(f"Refract has no {media_type} with {id_type} id {value}")
    raise ServiceValidationError("Provide refract_id, tmdb_id, imdb_id or tvdb_id")


def _action(
    hass: HomeAssistant,
    media_type_for: Callable[[ServiceCall], str],
    run: Callable[[RefractData, ServiceCall, str], Awaitable[Any]],
):
    async def handler(call: ServiceCall) -> None:
        data = _runtime(hass, call)
        try:
            refract_id = await _resolve(data, call, media_type_for(call))
            await run(data, call, refract_id)
        except RefractScopeError as err:
            raise HomeAssistantError(
                "Your Refract API key doesn't have the permission this action needs. "
                "Create a new key in the app with the matching write permission."
            ) from err
        except RefractError as err:
            raise HomeAssistantError(f"Refract: {err}") from err
        await data.coordinator.async_request_refresh()

    return handler


def async_setup_services(hass: HomeAssistant) -> None:
    """Register all actions."""

    async def add_to_watchlist(d: RefractData, c: ServiceCall, rid: str) -> None:
        await d.api.add_to_watchlist(rid)

    async def set_status(d: RefractData, c: ServiceCall, rid: str) -> None:
        await d.api.set_library_status(rid, c.data["status"])

    async def mark_episode(d: RefractData, c: ServiceCall, rid: str) -> None:
        await d.api.set_episode_watched(
            rid,
            c.data["season"],
            c.data["number"],
            watched=c.data.get("watched", True),
            watched_at=_iso(c),
        )

    async def log_movie(d: RefractData, c: ServiceCall, rid: str) -> None:
        await d.api.log_movie_play(rid, str(uuid.uuid4()), _iso(c))

    async def log_rewatch(d: RefractData, c: ServiceCall, rid: str) -> None:
        await d.api.log_rewatch(rid, c.data["season"], c.data["number"], str(uuid.uuid4()), _iso(c))

    media = {vol.Required("media_type"): vol.In(["movie", "show"])}
    show = lambda _c: "show"  # noqa: E731
    movie = lambda _c: "movie"  # noqa: E731
    by_field = lambda c: c.data["media_type"]  # noqa: E731

    hass.services.async_register(
        DOMAIN, "add_to_watchlist", _action(hass, by_field, add_to_watchlist), _schema(media)
    )
    hass.services.async_register(
        DOMAIN,
        "set_status",
        _action(hass, by_field, set_status),
        _schema({**media, vol.Required("status"): cv.string}),
    )
    hass.services.async_register(
        DOMAIN,
        "mark_episode_watched",
        _action(hass, show, mark_episode),
        _schema({**_EPISODE, **_WATCHED_AT, vol.Optional("watched", default=True): cv.boolean}),
    )
    hass.services.async_register(
        DOMAIN, "log_movie_play", _action(hass, movie, log_movie), _schema(_WATCHED_AT)
    )
    hass.services.async_register(
        DOMAIN,
        "log_rewatch",
        _action(hass, show, log_rewatch),
        _schema({**_EPISODE, **_WATCHED_AT}),
    )
