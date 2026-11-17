"""Load the integration for real and check the entities it makes and what they say."""

from __future__ import annotations

import re
from pathlib import Path

from freezegun import freeze_time
from homeassistant.config_entries import ConfigEntryState
from homeassistant.core import HomeAssistant
from homeassistant.helpers import entity_registry as er
from pytest_homeassistant_custom_component.common import MockConfigEntry

from custom_components.refract.const import CONF_TMDB_API_KEY, DOMAIN

from .conftest import setup_entry
from .refract_data import KEY, TMDB_KEY

TODAY = "2026-11-14 12:00:00+00:00"
CARD_KEYS = set(re.findall(r'^\s+"([a-z0-9_]+)",$', (Path(__file__).parents[2] / "frontend/src/const.ts").read_text(), re.M))


def sensors(hass: HomeAssistant, entry: MockConfigEntry) -> dict[str, str]:
    registry = er.async_get(hass)
    return {e.entity_id: e.unique_id for e in er.async_entries_for_config_entry(registry, entry.entry_id) if e.domain == "sensor"}


async def test_the_integration_loads_and_every_sensor_is_one_the_card_looks_for(hass, refract_api, entry) -> None:
    await setup_entry(hass, entry)
    assert entry.state is ConfigEntryState.LOADED
    found = sensors(hass, entry)
    assert "sensor.refract_codex_next_up" in found
    assert "sensor.refract_codex_monthly_wrap" in found
    # the entity id of every sensor, without its account prefix, is a key of the dashboard card
    prefix = "sensor.refract_codex_"
    missing = sorted(e[len(prefix):] for e in found if e[len(prefix):] not in CARD_KEYS and not e[len(prefix):].startswith("stats_"))
    assert not missing, f"sensors the card does not look for: {missing}"
    assert hass.states.get("calendar.refract_codex_upcoming_episodes")
    assert hass.states.get("todo.refract_codex_watchlist")


async def test_next_up_skips_a_fully_watched_show_and_shows_waiting_counts_only_shows_with_episodes(hass, refract_api, entry) -> None:
    await setup_entry(hass, entry)
    next_up = hass.states.get("sensor.refract_codex_next_up")
    assert next_up.state == "Westworld", "Lupin is in Refract's up-next list with nothing left to watch"
    assert next_up.attributes["remaining_episodes"] == 30
    assert hass.states.get("sensor.refract_codex_shows_waiting").state == "2", "Westworld and Tulsa King, not Lupin"


async def test_library_counts(hass, refract_api, entry) -> None:
    await setup_entry(hass, entry)
    assert hass.states.get("sensor.refract_codex_library_total") or hass.states.get("sensor.refract_codex_watchlist")
    assert hass.states.get("sensor.refract_codex_watchlist").state == "1", "one planned movie"
    assert hass.states.get("sensor.refract_codex_completed").state == "1"
    assert hass.states.get("sensor.refract_codex_in_progress").state == "2"


async def test_the_monthly_wrap_starts_with_the_running_month(hass, refract_api, entry) -> None:
    with freeze_time(TODAY):
        await setup_entry(hass, entry)
    wrap = hass.states.get("sensor.refract_codex_monthly_wrap")
    assert wrap.state == "4", "the state is the newest finished month: October, 3 episodes and a movie"
    months = wrap.attributes["months"]
    assert [m["month"] for m in months] == ["2026-11", "2026-10"]
    running, october = months
    assert running["partial"] is True and running["elapsed_days"] == 14 and running["items"] == 2
    assert "partial" not in october and october["items"] == 4 and october["movies"] == 1
    assert len(running["days"]) == 30 and running["days"][9] == 1 and running["days"][11] == 1


async def test_there_is_no_most_watched_without_a_tmdb_key_and_there_is_with_one(hass, refract_api, entry) -> None:
    await setup_entry(hass, entry)
    assert hass.states.get("sensor.refract_codex_top_picks") is None

    config = MockConfigEntry(domain=DOMAIN, unique_id="user-2", data={"api_key": KEY}, options={CONF_TMDB_API_KEY: TMDB_KEY})
    config.add_to_hass(hass)
    await hass.config_entries.async_remove(entry.entry_id)
    await hass.async_block_till_done()
    with freeze_time(TODAY):
        await setup_entry(hass, config)
    picks = hass.states.get("sensor.refract_codex_top_picks")
    assert picks is not None, "the sensor needs the key"
    assert picks.attributes["total"] >= 1
    await hass.config_entries.async_unload(config.entry_id)
    await hass.async_block_till_done()


async def test_most_watched_is_worked_out_from_the_history_and_tmdb(hass, refract_api) -> None:
    config = MockConfigEntry(domain=DOMAIN, unique_id="user-1", data={"api_key": KEY}, options={CONF_TMDB_API_KEY: TMDB_KEY})
    config.add_to_hass(hass)
    with freeze_time(TODAY):
        await setup_entry(hass, config)
    picks = hass.states.get("sensor.refract_codex_top_picks")
    assert picks.attributes["pending"] == 0, "every title has its TMDB details"
    # every show in the fake TMDB has the same cast, so the show actor leads: 3 shows watched, and Top Gun for Tom Cruise
    actor = picks.attributes["actor"][0]
    assert actor["name"] == "Evan Rachel Wood" and actor["titles"] == 3
    genres = [g["name"] for g in picks.attributes["genre"]]
    assert genres[:3] == ["Drama", "Fantasy", "Science Fiction"], "TV genre names are mapped to the movie names"
    assert "Sci-Fi & Fantasy" not in genres
    assert picks.attributes["country"][0]["code"] == "US"
    assert picks.attributes["decade"][0]["name"] == "2010s"
    await hass.config_entries.async_unload(config.entry_id)
