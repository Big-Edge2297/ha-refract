"""The diagnostics download: useful numbers, no keys, no names of the account."""

from __future__ import annotations

import json

from freezegun import freeze_time
from pytest_homeassistant_custom_component.common import MockConfigEntry

from custom_components.refract.const import CONF_TMDB_API_KEY, DOMAIN
from custom_components.refract.diagnostics import async_get_config_entry_diagnostics

from .conftest import setup_entry
from .refract_data import KEY, TMDB_KEY


async def test_diagnostics_have_the_numbers_and_none_of_the_secrets(hass, refract_api) -> None:
    entry = MockConfigEntry(domain=DOMAIN, unique_id="user-1", title="Codex", data={"api_key": KEY}, options={CONF_TMDB_API_KEY: TMDB_KEY})
    entry.add_to_hass(hass)
    with freeze_time("2026-11-14 12:00:00+00:00"):
        await setup_entry(hass, entry)
    diag = await async_get_config_entry_diagnostics(hass, entry)
    text = json.dumps(diag, default=str)
    for secret in (KEY, TMDB_KEY, "codex", "Codex", "user-1", "getrefract.app/@"):
        assert secret not in text, f"{secret!r} must not be in the diagnostics"
    assert diag["entry"]["data"]["api_key"] == "**REDACTED**"
    assert diag["entry"]["options"][CONF_TMDB_API_KEY] == "**REDACTED**"
    assert diag["integration_version"]

    summary = diag["coordinator"]
    assert summary["last_update_success"] is True
    assert summary["library"] == {"items": 5, "by_status": {"up_to_date": 1, "in_progress": 2, "completed": 1, "planned": 1}, "by_type": {"show": 3, "movie": 2}}
    assert summary["up_next"] == {"shows": 3, "with_episodes_waiting": 2}
    assert summary["watch_history"] == {"episode_entries": 5, "movie_entries": 1, "records": 6}
    assert [m["month"] for m in summary["monthly_wrap"]["months"]] == ["2026-11", "2026-10"]
    assert summary["monthly_wrap"]["months"][0]["partial"] is True
    assert "top_picks_titles" not in text and "Lupin" not in text, "titles of the account's library stay out"
    assert summary["most_watched"]["titles_total"] >= 1
    assert diag["tmdb"]["rejected"] is False and diag["tmdb"]["profiles"] >= 1
    await hass.config_entries.async_unload(entry.entry_id)


async def test_diagnostics_without_a_tmdb_key(hass, refract_api, entry) -> None:
    await setup_entry(hass, entry)
    diag = await async_get_config_entry_diagnostics(hass, entry)
    assert diag["tmdb"] == {"enabled": False}
    assert diag["coordinator"]["most_watched"] is None
