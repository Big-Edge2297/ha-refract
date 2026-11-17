"""Setting up, re-authenticating and the options, as a user does it."""

from __future__ import annotations

from homeassistant.config_entries import SOURCE_REAUTH, SOURCE_USER
from homeassistant.data_entry_flow import FlowResultType
from pytest_homeassistant_custom_component.common import MockConfigEntry

from custom_components.refract.const import CONF_API_KEY, CONF_FETCH_HISTORY, CONF_SCAN_INTERVAL, CONF_TMDB_API_KEY, DOMAIN

from .conftest import mock_refract, mock_tmdb, setup_entry
from .refract_data import API, KEY, ME, TMDB, TMDB_KEY


async def test_the_user_enters_a_key_and_gets_an_account(hass, refract_api) -> None:
    form = await hass.config_entries.flow.async_init(DOMAIN, context={"source": SOURCE_USER})
    assert form["type"] is FlowResultType.FORM and form["step_id"] == "user"
    result = await hass.config_entries.flow.async_configure(form["flow_id"], {CONF_API_KEY: f"  {KEY}  "})
    assert result["type"] is FlowResultType.CREATE_ENTRY
    assert result["data"] == {CONF_API_KEY: KEY}, "the key is stored without stray spaces"
    entry = result["result"]
    assert entry.unique_id == "user-1"
    await hass.async_block_till_done()
    await hass.config_entries.async_unload(entry.entry_id)


async def test_bad_keys_are_explained(hass, aioclient_mock) -> None:
    async def submit(key: str) -> dict:
        form = await hass.config_entries.flow.async_init(DOMAIN, context={"source": SOURCE_USER})
        return await hass.config_entries.flow.async_configure(form["flow_id"], {CONF_API_KEY: key})

    assert (await submit("not-a-refract-key"))["errors"] == {"base": "invalid_key_format"}
    aioclient_mock.get(f"{API}/me", status=401, json={"error": "unauthorized"})
    assert (await submit("rfk_revoked"))["errors"] == {"base": "invalid_auth"}
    aioclient_mock.clear_requests()
    aioclient_mock.get(f"{API}/me", status=503, text="down")
    assert (await submit("rfk_whatever"))["errors"] == {"base": "cannot_connect"}


async def test_the_same_account_cannot_be_added_twice(hass, refract_api, entry) -> None:
    form = await hass.config_entries.flow.async_init(DOMAIN, context={"source": SOURCE_USER})
    result = await hass.config_entries.flow.async_configure(form["flow_id"], {CONF_API_KEY: "rfk_another_key_for_same_account"})
    assert result["type"] is FlowResultType.ABORT and result["reason"] == "already_configured"


async def test_reauthentication_takes_a_new_key_for_the_same_account(hass, refract_api, entry) -> None:
    await setup_entry(hass, entry)
    result = await entry.start_reauth_flow(hass)
    assert result["type"] is FlowResultType.FORM and result["step_id"] == "reauth_confirm"
    # a key of another account is refused
    refract_api.clear_requests()
    refract_api.get(f"{API}/me", json={**ME, "id": "someone-else"})
    other = await hass.config_entries.flow.async_configure(result["flow_id"], {CONF_API_KEY: "rfk_someone_elses_key"})
    assert other["type"] is FlowResultType.ABORT and other["reason"] == "wrong_account"
    # the right account: the key is replaced
    result = await entry.start_reauth_flow(hass)
    refract_api.clear_requests()
    mock_refract(refract_api)
    done = await hass.config_entries.flow.async_configure(result["flow_id"], {CONF_API_KEY: "rfk_a_fresh_key"})
    await hass.async_block_till_done()
    assert done["type"] is FlowResultType.ABORT and done["reason"] == "reauth_successful"
    assert entry.data[CONF_API_KEY] == "rfk_a_fresh_key"


async def test_options_check_the_tmdb_key_before_saving_it(hass, refract_api, entry) -> None:
    await setup_entry(hass, entry)
    form = await hass.config_entries.options.async_init(entry.entry_id)
    assert form["type"] is FlowResultType.FORM

    refract_api.clear_requests()
    from .conftest import mock_refract
    mock_refract(refract_api)
    refract_api.get(f"{TMDB}/configuration", status=401, json={})
    bad = await hass.config_entries.options.async_configure(
        form["flow_id"], {CONF_SCAN_INTERVAL: 20, CONF_FETCH_HISTORY: True, CONF_TMDB_API_KEY: "rejected"}
    )
    assert bad["type"] is FlowResultType.FORM and bad["errors"] == {CONF_TMDB_API_KEY: "invalid_tmdb_key"}

    refract_api.clear_requests()
    mock_refract(refract_api)
    mock_tmdb(refract_api)
    good = await hass.config_entries.options.async_configure(
        form["flow_id"], {CONF_SCAN_INTERVAL: 20, CONF_FETCH_HISTORY: False, CONF_TMDB_API_KEY: f" {TMDB_KEY} "}
    )
    await hass.async_block_till_done()
    assert good["type"] is FlowResultType.CREATE_ENTRY
    assert entry.options == {CONF_SCAN_INTERVAL: 20, CONF_FETCH_HISTORY: False, CONF_TMDB_API_KEY: TMDB_KEY}
    assert hass.states.get("sensor.refract_codex_top_picks") is not None, "saving options reloaded the integration"
    assert hass.states.get("sensor.refract_codex_last_7_days") is None or hass.states.get("sensor.refract_codex_last_7_days").state == "unavailable", "history is off now"
