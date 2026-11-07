"""Async client for the Refract API (https://getrefract.app/developers)."""

from __future__ import annotations

import asyncio
from typing import Any

import aiohttp

from .const import API_BASE, MAX_PAGES, REQUEST_TIMEOUT, USER_AGENT


class RefractError(Exception):
    """Base error."""


class RefractConnectionError(RefractError):
    """Could not reach Refract."""


class RefractAuthError(RefractError):
    """Key missing, expired or revoked (401)."""


class RefractScopeError(RefractError):
    """Key lacks the permission for this call (403)."""


class RefractRateLimitError(RefractError):
    """Too many requests (429)."""

    def __init__(self, retry_after: int | None) -> None:
        super().__init__(f"Rate limited, retry in {retry_after or '?'}s")
        self.retry_after = retry_after


class RefractRequestError(RefractError):
    """Any other API error, with the problem-details code when present."""

    def __init__(self, status: int, code: str | None, detail: str | None) -> None:
        super().__init__(detail or code or f"HTTP {status}")
        self.status = status
        self.code = code


class RefractApiClient:
    """Thin wrapper around the Refract REST API."""

    def __init__(self, session: aiohttp.ClientSession, api_key: str) -> None:
        self._session = session
        self._api_key = api_key
        self._etag_cache: dict[tuple, tuple[str, Any]] = {}

    # ------------------------------------------------------------------ core
    async def _request(
        self,
        method: str,
        path: str,
        *,
        params: dict[str, Any] | None = None,
        json: dict[str, Any] | None = None,
        headers: dict[str, str] | None = None,
        use_etag: bool = False,
    ) -> Any:
        hdrs = {
            "Authorization": f"Bearer {self._api_key}",
            "Accept": "application/json",
            "User-Agent": USER_AGENT,
        }
        if headers:
            hdrs.update(headers)

        cache_key = None
        cached = None
        if use_etag and method == "GET":
            cache_key = (path, tuple(sorted((params or {}).items())))
            cached = self._etag_cache.get(cache_key)
            if cached:
                hdrs["If-None-Match"] = cached[0]

        try:
            async with asyncio.timeout(REQUEST_TIMEOUT):
                async with self._session.request(
                    method, f"{API_BASE}{path}", params=params, json=json, headers=hdrs
                ) as resp:
                    if resp.status == 304 and cached:
                        return cached[1]
                    if resp.status == 204:
                        return None
                    if resp.status < 400:
                        data = await resp.json(content_type=None)
                        etag = resp.headers.get("ETag")
                        if cache_key and etag:
                            self._etag_cache[cache_key] = (etag, data)
                        return data
                    await self._raise_for_error(resp)
        except (aiohttp.ClientError, TimeoutError) as err:
            raise RefractConnectionError(f"Cannot reach Refract: {err}") from err

    @staticmethod
    async def _raise_for_error(resp: aiohttp.ClientResponse) -> None:
        code = detail = None
        try:
            body = await resp.json(content_type=None)
            if isinstance(body, dict):
                code = body.get("code")
                detail = body.get("detail") or body.get("title")
        except (aiohttp.ClientError, ValueError):
            pass

        if resp.status == 401:
            raise RefractAuthError(detail or "Invalid API key")
        if resp.status == 403:
            raise RefractScopeError(detail or "Missing permission")
        if resp.status == 429:
            retry = resp.headers.get("Retry-After", "")
            raise RefractRateLimitError(int(retry) if retry.isdigit() else None)
        raise RefractRequestError(resp.status, code, detail)

    async def _paginate(
        self, path: str, params: dict[str, Any] | None = None, page_size: int = 200
    ) -> list[dict]:
        query = dict(params or {})
        query["limit"] = page_size
        items: list[dict] = []
        for _ in range(MAX_PAGES):
            page = await self._request("GET", path, params=query)
            items.extend(page.get("data", []))
            if not page.get("has_more") or not page.get("next_cursor"):
                break
            query["cursor"] = page["next_cursor"]
        return items

    # ----------------------------------------------------------------- reads
    async def get_me(self) -> dict[str, Any]:
        return await self._request("GET", "/me", use_etag=True)

    async def get_library(self) -> list[dict[str, Any]]:
        return await self._paginate("/library")

    async def get_up_next(self) -> list[dict[str, Any]]:
        """Every show being watched (the API pages at 50)."""
        return await self._paginate("/up-next", page_size=50)

    async def get_episode_history(self) -> list[dict[str, Any]]:
        return await self._paginate("/history/episodes")

    async def get_movie_history(self) -> list[dict[str, Any]]:
        return await self._paginate("/history/movies")

    async def get_stats(self) -> dict[str, Any]:
        return await self._request("GET", "/stats", use_etag=True)

    async def get_calendar(self, start: str, days: int) -> Any:
        return await self._request(
            "GET", "/calendar", params={"start": start, "days": days}, use_etag=True
        )

    async def find_refract_id(self, id_type: str, ext_id: str, media_type: str) -> str | None:
        """Resolve a TMDB / IMDb / TVDB id to a Refract id."""
        res = await self._request(
            "GET", f"/search/{id_type}/{ext_id}", params={"type": media_type}
        )
        data = res.get("data") if isinstance(res, dict) else None
        if isinstance(data, dict):
            data = [data]
        if not data:
            return None
        return (data[0].get("ids") or {}).get("refract")

    # ---------------------------------------------------------------- writes
    async def set_library_status(self, refract_id: str, status: str) -> Any:
        return await self._request("PUT", f"/library/{refract_id}", json={"status": status})

    async def add_to_watchlist(self, refract_id: str) -> Any:
        return await self._request("PUT", f"/watchlist/{refract_id}")

    async def remove_from_watchlist(self, refract_id: str) -> Any:
        return await self._request("DELETE", f"/watchlist/{refract_id}")

    async def set_episode_watched(
        self,
        show_id: str,
        season: int,
        number: int,
        *,
        watched: bool = True,
        watched_at: str | None = None,
    ) -> Any:
        path = f"/history/episodes/{show_id}/{season}/{number}"
        if not watched:
            return await self._request("DELETE", path)
        body = {"watched_at": watched_at} if watched_at else None
        return await self._request("PUT", path, json=body)

    async def log_movie_play(
        self, movie_id: str, idempotency_key: str, watched_at: str | None = None
    ) -> Any:
        body: dict[str, Any] = {"movie_id": movie_id}
        if watched_at:
            body["watched_at"] = watched_at
        return await self._request(
            "POST", "/history/movies", json=body, headers={"Idempotency-Key": idempotency_key}
        )

    async def log_rewatch(
        self,
        show_id: str,
        season: int,
        number: int,
        idempotency_key: str,
        watched_at: str | None = None,
    ) -> Any:
        body: dict[str, Any] = {"show_id": show_id, "season": season, "number": number}
        if watched_at:
            body["watched_at"] = watched_at
        return await self._request(
            "POST",
            "/history/rewatches",
            json=body,
            headers={"Idempotency-Key": idempotency_key},
        )
