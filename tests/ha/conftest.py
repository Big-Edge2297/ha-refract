"""Fixtures to run the Refract integration in Home Assistant's test setup."""

from __future__ import annotations

import re
from unittest.mock import MagicMock, patch

import pytest
from homeassistant.config_entries import ConfigEntryState
from homeassistant.core import HomeAssistant
from pytest_homeassistant_custom_component.common import MockConfigEntry
from pytest_homeassistant_custom_component.test_util.aiohttp import AiohttpClientMocker

from custom_components.refract.const import CONF_API_KEY, DOMAIN

from .refract_data import (
    API, EPISODES, KEY, LIBRARY, ME, MOVIES, STATS, TMDB, UP_NEXT, page, tmdb_movie, tmdb_show,
)


@pytest.fixture(autouse=True)
def auto_enable_custom_integrations(enable_custom_integrations):
    yield


@pytest.fixture(autouse=True)
def no_card_files(hass: HomeAssistant):
    """The dashboard card is a static file served through `http` and `frontend`: not needed in tests."""
    hass.config.components.update({"http", "frontend"})
    hass.http = MagicMock()
    with patch("custom_components.refract.async_register_card"):
        yield


@pytest.fixture
def refract_api(aioclient_mock: AiohttpClientMocker) -> AiohttpClientMocker:
    """A working Refract and TMDB."""
    mock_refract(aioclient_mock)
    mock_tmdb(aioclient_mock)
    return aioclient_mock


def mock_refract(mock: AiohttpClientMocker, **overrides) -> None:
    routes = {
        "/me": ME, "/library": page(LIBRARY), "/up-next": page(UP_NEXT), "/stats": STATS,
        "/calendar": {"data": []}, "/history/episodes": page(EPISODES), "/history/movies": page(MOVIES),
    }
    routes.update(overrides)
    for path, body in routes.items():
        mock.get(f"{API}{path}", json=body)


def mock_tmdb(mock: AiohttpClientMocker, status: int = 200) -> None:
    if status != 200:
        mock.get(f"{TMDB}/configuration", status=status, json={"status_message": "Invalid API key"})
        mock.get(f"{TMDB}/movie/361743", status=status, json={})
        for tmdb in (96677, 63247, 153312):
            mock.get(f"{TMDB}/tv/{tmdb}", status=status, json={})
        return
    mock.get(f"{TMDB}/configuration", json={"images": {}})
    mock.get(f"{TMDB}/movie/361743", json=tmdb_movie(361743))
    for tmdb, name in ((96677, "Lupin"), (63247, "Westworld"), (153312, "Tulsa King")):
        mock.get(f"{TMDB}/tv/{tmdb}", json=tmdb_show(tmdb, name))
    # any other title
    mock.get(re.compile(rf"{re.escape(TMDB)}/movie/\d+"), json=tmdb_movie(1))
    mock.get(re.compile(rf"{re.escape(TMDB)}/tv/\d+"), json=tmdb_show(1, "Another show"))


@pytest.fixture
async def entry(hass: HomeAssistant):
    config = MockConfigEntry(domain=DOMAIN, unique_id="user-1", title="Codex", data={CONF_API_KEY: KEY}, options={})
    config.add_to_hass(hass)
    yield config
    # no timers or tasks may outlive a test
    if config.state is ConfigEntryState.LOADED:
        await hass.config_entries.async_unload(config.entry_id)
        await hass.async_block_till_done()


async def setup_entry(hass: HomeAssistant, config: MockConfigEntry) -> None:
    assert await hass.config_entries.async_setup(config.entry_id)
    await hass.async_block_till_done()
