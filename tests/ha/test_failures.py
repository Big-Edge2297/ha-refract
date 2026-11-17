"""What happens when Refract can't be reached or refuses the key."""

from __future__ import annotations

from homeassistant.config_entries import SOURCE_REAUTH, ConfigEntryState
from homeassistant.helpers import issue_registry as ir

from .conftest import mock_refract, setup_entry
from .refract_data import API


async def test_an_outage_makes_the_entities_unavailable_and_they_come_back(hass, refract_api, entry) -> None:
    await setup_entry(hass, entry)
    coordinator = entry.runtime_data.coordinator
    assert hass.states.get("sensor.refract_codex_next_up").state == "Westworld"

    refract_api.clear_requests()
    refract_api.get(f"{API}/me", status=503, text="down")
    await coordinator.async_refresh()
    await hass.async_block_till_done()
    assert coordinator.last_update_success is False
    assert hass.states.get("sensor.refract_codex_next_up").state == "unavailable"
    assert hass.states.get("sensor.refract_codex_shows_waiting").state == "unavailable"
    assert entry.state is ConfigEntryState.LOADED, "an outage is not a setup error"

    refract_api.clear_requests()
    mock_refract(refract_api)
    await coordinator.async_refresh()
    await hass.async_block_till_done()
    assert hass.states.get("sensor.refract_codex_next_up").state == "Westworld"


async def test_a_rejected_key_at_setup_asks_for_a_new_one(hass, aioclient_mock, entry) -> None:
    aioclient_mock.get(f"{API}/me", status=401, json={"error": "unauthorized"})
    await hass.config_entries.async_setup(entry.entry_id)
    await hass.async_block_till_done()
    assert entry.state is ConfigEntryState.SETUP_ERROR
    flows = hass.config_entries.flow.async_progress_by_handler("refract")
    assert [f["context"]["source"] for f in flows] == [SOURCE_REAUTH]


async def test_a_key_revoked_later_starts_reauthentication(hass, refract_api, entry) -> None:
    await setup_entry(hass, entry)
    refract_api.clear_requests()
    refract_api.get(f"{API}/me", status=401, json={"error": "unauthorized"})
    await entry.runtime_data.coordinator.async_refresh()
    await hass.async_block_till_done()
    assert hass.states.get("sensor.refract_codex_next_up").state == "unavailable"
    flows = hass.config_entries.flow.async_progress_by_handler("refract")
    assert [f["context"]["source"] for f in flows] == [SOURCE_REAUTH]
    ours = [issue for (domain, _), issue in ir.async_get(hass).issues.items() if domain == "refract"]
    assert not ours, "a Refract key problem is a reauthentication (Home Assistant's own notice), not one of our repairs"
