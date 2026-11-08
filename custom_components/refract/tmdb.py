"""Optional poster lookup through TMDB.

Posters are only fetched when the user has added their own TMDB API key in the
integration options. Lookups are cached on disk so each show is asked for once.
"""

from __future__ import annotations

import asyncio
from datetime import date, timedelta
from typing import Any

import aiohttp

from homeassistant.core import HomeAssistant
from homeassistant.helpers.storage import Store

from .analytics import tmdb_movie_info, tmdb_profile, tmdb_tv_info
from .const import DOMAIN, LOGGER, TMDB_API_BASE, TMDB_IMAGE_BASE, USER_AGENT

_STORE_VERSION = 1
_LOOKUPS_PER_REFRESH = 15
# Episode counts and runtimes for "Still to finish". A show's count changes as episodes air, so it is
# looked up again after a few days; a movie's runtime doesn't change.
_DETAILS_PER_REFRESH = 80
_DETAILS_CONCURRENCY = 6
_SHOW_DETAILS_DAYS = 3
# Credits, genres and countries for "Most watched". A title is fetched once and kept: its credits
# hardly change, so it is only looked at again after a long time. The heaviest titles come first.
_PROFILES_PER_REFRESH = 100
_PROFILE_DAYS = 180


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
        self._details_store: Store[dict[str, dict[str, Any]]] = Store(hass, _STORE_VERSION, f"{DOMAIN}_tmdb_details")
        self._details: dict[str, dict[str, Any]] = {}
        self._profile_store: Store[dict[str, dict[str, Any]]] = Store(hass, _STORE_VERSION, f"{DOMAIN}_tmdb_profiles")
        self._profiles: dict[str, dict[str, Any]] = {}
        self._disabled = False

    async def async_load(self) -> None:
        self._cache = await self._store.async_load() or {}
        self._details = await self._details_store.async_load() or {}
        self._profiles = await self._profile_store.async_load() or {}

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

    async def async_details(self, show_ids: list[int], movie_ids: list[int]) -> dict[str, dict[str, Any]]:
        """Episodes aired and runtimes for `tv:<id>` / `movie:<id>`, cached on disk.

        Whatever is missing or out of date is fetched now (a bounded number per refresh); anything
        that can't be fetched keeps its last known value, or is left out.
        """
        wanted = [(f"tv:{i}", f"/tv/{i}") for i in show_ids] + [(f"movie:{i}", f"/movie/{i}") for i in movie_ids]
        today = date.today()

        def fresh(key: str) -> bool:
            entry = self._details.get(key)
            if entry is None:
                return False
            if key.startswith("movie:"):
                return True
            try:
                return date.fromisoformat(entry.get("day", "")) + timedelta(days=_SHOW_DETAILS_DAYS) > today
            except ValueError:
                return False

        todo = [w for w in wanted if not fresh(w[0])][:_DETAILS_PER_REFRESH]
        if todo and not self._disabled:
            headers, params = _auth(self._api_key)
            gate = asyncio.Semaphore(_DETAILS_CONCURRENCY)

            async def fetch(key: str, path: str) -> None:
                if self._disabled:
                    return
                async with gate:
                    try:
                        async with self._session.get(
                            f"{TMDB_API_BASE}{path}", headers=headers, params=params, timeout=aiohttp.ClientTimeout(total=15)
                        ) as resp:
                            if resp.status in (401, 403):
                                LOGGER.warning("TMDB rejected the API key; posters and runtimes are turned off until it is fixed")
                                self._disabled = True
                                return
                            if resp.status == 404:
                                self._details[key] = {"day": today.isoformat()}
                                return
                            if resp.status != 200:
                                return
                            body = await resp.json(content_type=None)
                    except (aiohttp.ClientError, TimeoutError, ValueError) as err:
                        LOGGER.debug("TMDB lookup %s failed: %s", path, err)
                        return
                info = tmdb_tv_info(body) if key.startswith("tv:") else tmdb_movie_info(body)
                self._details[key] = {**(info or {}), "day": today.isoformat()}

            await asyncio.gather(*(fetch(key, path) for key, path in todo))
            self._details_store.async_delay_save(lambda: self._details, 10)

        return {
            key: {k: v for k, v in self._details[key].items() if k in ("episodes", "runtime") and v is not None}
            for key, _ in wanted
            if key in self._details
        }

    async def async_profiles(self, wanted: list[tuple[str, int]]) -> dict[str, dict[str, Any]]:
        """Credits, genres, countries and years for `(kind, tmdb id)` pairs, cached on disk.

        `kind` is `movie` or `show`; results are keyed `movie:<id>` / `show:<id>`. Whatever is
        missing or very old is fetched now, a bounded number per refresh and in the order given
        (so put the most watched titles first); anything that can't be fetched keeps its last
        value, or is left out until a later refresh.
        """
        today = date.today()

        def fresh(key: str) -> bool:
            entry = self._profiles.get(key)
            if entry is None:
                return False
            try:
                return date.fromisoformat(entry.get("day", "")) + timedelta(days=_PROFILE_DAYS) > today
            except ValueError:
                return False

        todo = [(f"{kind}:{i}", kind, i) for kind, i in wanted if not fresh(f"{kind}:{i}")][:_PROFILES_PER_REFRESH]
        if todo and not self._disabled:
            headers, params = _auth(self._api_key)
            gate = asyncio.Semaphore(_DETAILS_CONCURRENCY)

            async def fetch(key: str, kind: str, tmdb_id: int) -> None:
                if self._disabled:
                    return
                path = f"/movie/{tmdb_id}" if kind == "movie" else f"/tv/{tmdb_id}"
                extra = {"append_to_response": "credits" if kind == "movie" else "aggregate_credits"}
                async with gate:
                    try:
                        async with self._session.get(
                            f"{TMDB_API_BASE}{path}",
                            headers=headers,
                            params={**params, **extra},
                            timeout=aiohttp.ClientTimeout(total=20),
                        ) as resp:
                            if resp.status in (401, 403):
                                LOGGER.warning("TMDB rejected the API key; posters, runtimes and most watched are turned off until it is fixed")
                                self._disabled = True
                                return
                            if resp.status == 404:
                                self._profiles[key] = {"missing": True, "day": today.isoformat()}
                                return
                            if resp.status != 200:
                                return
                            body = await resp.json(content_type=None)
                    except (aiohttp.ClientError, TimeoutError, ValueError) as err:
                        LOGGER.debug("TMDB lookup %s failed: %s", path, err)
                        return
                profile = tmdb_profile(body, kind)
                if profile is not None:
                    self._profiles[key] = {**profile, "day": today.isoformat()}

            await asyncio.gather(*(fetch(*t) for t in todo))
            self._profile_store.async_delay_save(lambda: self._profiles, 10)

        return {
            f"{kind}:{i}": self._profiles[f"{kind}:{i}"]
            for kind, i in wanted
            if f"{kind}:{i}" in self._profiles
        }
