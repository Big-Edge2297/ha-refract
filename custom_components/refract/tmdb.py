"""Optional poster lookup through TMDB.

Posters are only fetched when the user has added their own TMDB API key in the
integration options. Lookups are cached on disk so each show is asked for once.
"""

from __future__ import annotations

from typing import Any

import aiohttp

from homeassistant.core import HomeAssistant
from homeassistant.helpers.storage import Store

from .const import DOMAIN, LOGGER, TMDB_API_BASE, TMDB_IMAGE_BASE, USER_AGENT

_STORE_VERSION = 1
_LOOKUPS_PER_REFRESH = 15


def _auth(api_key: str) -> tuple[dict[str, str], dict[str, str]]:
    """A v4 read-access token is a long JWT; a v3 key is a short hex string."""
    headers = {"Accept": "application/json", "User-Agent": USER_AGENT}
    if len(api_key) > 40:
        headers["Authorization"] = f"Bearer {api_key}"
        return headers, {}
    return headers, {"api_key": api_key}


async def async_validate_key(session: aiohttp.ClientSession, api_key: str) -> str | None:
    """None when the key works, otherwise an error code for the options form."""
    headers, params = _auth(api_key)
    try:
        async with session.get(
            f"{TMDB_API_BASE}/configuration", headers=headers, params=params, timeout=aiohttp.ClientTimeout(total=15)
        ) as resp:
            if resp.status in (401, 403):
                return "invalid_tmdb_key"
            return None if resp.status == 200 else "tmdb_unreachable"
    except (aiohttp.ClientError, TimeoutError):
        return "tmdb_unreachable"


class TmdbClient:
    """Poster paths for shows, cached across restarts."""

    def __init__(self, hass: HomeAssistant, session: aiohttp.ClientSession, api_key: str) -> None:
        self._session = session
        self._api_key = api_key
        self._store: Store[dict[str, str]] = Store(hass, _STORE_VERSION, f"{DOMAIN}_posters")
        self._cache: dict[str, str] = {}
        self._disabled = False

    async def async_load(self) -> None:
        self._cache = await self._store.async_load() or {}

    def poster_url(self, tmdb_id: int | None) -> str | None:
        path = self._cache.get(str(tmdb_id)) if tmdb_id is not None else None
        return f"{TMDB_IMAGE_BASE}{path}" if path else None

    async def async_lookup(self, tmdb_ids: list[int]) -> None:
        """Fetch posters for ids we haven't asked about yet (a few per refresh)."""
        missing = [i for i in tmdb_ids if str(i) not in self._cache]
        if self._disabled or not missing:
            return
        headers, params = _auth(self._api_key)
        changed = False
        for tmdb_id in missing[:_LOOKUPS_PER_REFRESH]:
            try:
                async with self._session.get(
                    f"{TMDB_API_BASE}/tv/{tmdb_id}",
                    headers=headers,
                    params=params,
                    timeout=aiohttp.ClientTimeout(total=15),
                ) as resp:
                    if resp.status in (401, 403):
                        LOGGER.warning("TMDB rejected the API key; posters are turned off until it is fixed")
                        self._disabled = True
                        break
                    if resp.status == 429:
                        break
                    if resp.status == 404:
                        self._cache[str(tmdb_id)] = ""
                        changed = True
                        continue
                    if resp.status != 200:
                        continue
                    body: dict[str, Any] = await resp.json(content_type=None)
                    self._cache[str(tmdb_id)] = body.get("poster_path") or ""
                    changed = True
            except (aiohttp.ClientError, TimeoutError, ValueError) as err:
                LOGGER.debug("TMDB lookup for %s failed: %s", tmdb_id, err)
                break
        if changed:
            self._store.async_delay_save(lambda: self._cache, 10)
