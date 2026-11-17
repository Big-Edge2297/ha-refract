"""A rejected TMDB key shows up as a repair that can be fixed in place."""

from __future__ import annotations

import pytest
from homeassistant.config_entries import ConfigEntryState
from homeassistant.helpers import issue_registry as ir
from pytest_homeassistant_custom_component.common import MockConfigEntry

from custom_components.refract.const import CONF_API_KEY, CONF_TMDB_API_KEY, DOMAIN, tmdb_issue_id
from custom_components.refract.repairs import async_create_fix_flow

from .conftest import mock_refract, mock_tmdb
from .refract_data import KEY, TMDB, TMDB_KEY

NEW_KEY = "tmdb_new_valid_key_999"


@pytest.fixture
async def rejected(hass, aioclient_mock):
    """An account whose TMDB key TMDB refuses."""
    mock_refract(aioclient_mock)
    mock_tmdb(aioclient_mock, status=401)
    entry = MockConfigEntry(domain=DOMAIN, unique_id="user-1", title="Codex", data={CONF_API_KEY: KEY}, options={CONF_TMDB_API_KEY: TMDB_KEY})
    entry.add_to_hass(hass)
    assert await hass.config_entries.async_setup(entry.entry_id)
    await hass.async_block_till_done()
    yield entry
    if entry.state is ConfigEntryState.LOADED:
        await hass.config_entries.async_unload(entry.entry_id)
        await hass.async_block_till_done()


def issue_of(hass, entry):
    return ir.async_get(hass).async_get_issue(DOMAIN, tmdb_issue_id(entry.entry_id))


async def start_flow(hass, entry):
    issue = issue_of(hass, entry)
    flow = await async_create_fix_flow(hass, issue.issue_id, issue.data)
    flow.hass, flow.handler, flow.flow_id = hass, DOMAIN, "test-flow"
    return flow


async def test_a_rejected_tmdb_key_raises_a_fixable_repair(hass, rejected) -> None:
    assert rejected.state is ConfigEntryState.LOADED, "the integration still works without TMDB"
    issue = issue_of(hass, rejected)
    assert issue is not None
    assert issue.is_fixable and issue.translation_key == "tmdb_key_rejected"
    assert issue.severity is ir.IssueSeverity.ERROR
    assert issue.data == {"entry_id": rejected.entry_id}
    assert hass.states.get("sensor.refract_codex_next_up").state == "Westworld"


async def test_the_repair_checks_the_new_key_and_saves_it(hass, rejected, aioclient_mock) -> None:
    flow = await start_flow(hass, rejected)
    form = await flow.async_step_init()
    assert form["type"] == "form" and form["step_id"] == "confirm"
    # a URL can't be in the translated text (hassfest), so the form brings it as a placeholder
    assert form["description_placeholders"] == {"tmdb_url": "https://www.themoviedb.org/settings/api"}

    aioclient_mock.clear_requests()
    mock_refract(aioclient_mock)
    aioclient_mock.get(f"{TMDB}/configuration", status=401, json={})
    result = await flow.async_step_confirm({CONF_TMDB_API_KEY: "wrong"})
    assert result["type"] == "form" and result["errors"] == {CONF_TMDB_API_KEY: "invalid_tmdb_key"}
    assert rejected.options[CONF_TMDB_API_KEY] == TMDB_KEY, "a rejected new key is not saved"

    aioclient_mock.clear_requests()
    mock_refract(aioclient_mock)
    aioclient_mock.get(f"{TMDB}/configuration", status=500, text="down")
    result = await flow.async_step_confirm({CONF_TMDB_API_KEY: "whatever"})
    assert result["errors"] == {CONF_TMDB_API_KEY: "tmdb_unreachable"}

    aioclient_mock.clear_requests()
    mock_refract(aioclient_mock)
    mock_tmdb(aioclient_mock)
    result = await flow.async_step_confirm({CONF_TMDB_API_KEY: f"  {NEW_KEY}  "})
    await hass.async_block_till_done()
    assert result["type"] == "create_entry"
    assert rejected.options[CONF_TMDB_API_KEY] == NEW_KEY
    assert rejected.state is ConfigEntryState.LOADED, "the integration reloaded with the new key"
    assert issue_of(hass, rejected) is None, "the repair is gone once the new key works"
    assert hass.states.get("sensor.refract_codex_top_picks") is not None


async def test_an_empty_key_turns_tmdb_off_and_clears_the_repair(hass, rejected, aioclient_mock) -> None:
    flow = await start_flow(hass, rejected)
    aioclient_mock.clear_requests()
    mock_refract(aioclient_mock)
    result = await flow.async_step_confirm({})
    await hass.async_block_till_done()
    assert result["type"] == "create_entry"
    assert CONF_TMDB_API_KEY not in rejected.options
    assert issue_of(hass, rejected) is None
    # the sensor is no longer provided: Home Assistant keeps it as "unavailable", and the card hides the section
    gone = hass.states.get("sensor.refract_codex_top_picks")
    assert gone is None or (gone.state == "unavailable" and gone.attributes.get("restored"))


async def test_the_repair_comes_back_if_tmdb_still_refuses_the_lookups(hass, rejected, aioclient_mock) -> None:
    flow = await start_flow(hass, rejected)
    aioclient_mock.clear_requests()
    mock_refract(aioclient_mock)
    aioclient_mock.get(f"{TMDB}/configuration", json={"images": {}})  # the new key passes the check...
    mock_tmdb(aioclient_mock, status=403)  # ...but lookups are refused
    await flow.async_step_confirm({CONF_TMDB_API_KEY: NEW_KEY})
    await hass.async_block_till_done()
    assert rejected.options[CONF_TMDB_API_KEY] == NEW_KEY
    assert issue_of(hass, rejected) is not None, "still rejected: the repair is raised again"


def test_every_error_the_repair_can_give_is_translated() -> None:
    import json
    from pathlib import Path

    root = Path(__file__).parents[2] / "custom_components" / "refract"
    for name in ("strings.json", *(f"translations/{p.name}" for p in (root / "translations").glob("*.json"))):
        issue = json.loads((root / name).read_text(encoding="utf-8"))["issues"]["tmdb_key_rejected"]
        assert set(issue["fix_flow"]["error"]) == {"invalid_tmdb_key", "tmdb_unreachable"}, name
        assert "tmdb_api_key" in issue["fix_flow"]["step"]["confirm"]["data"], name
