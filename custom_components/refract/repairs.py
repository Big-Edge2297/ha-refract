"""Repair flow: fix a rejected TMDB API key without leaving the repairs page."""

from __future__ import annotations

import voluptuous as vol
from homeassistant import data_entry_flow
from homeassistant.components.repairs import RepairsFlow
from homeassistant.core import HomeAssistant
from homeassistant.helpers.aiohttp_client import async_get_clientsession

from .const import CONF_TMDB_API_KEY
from .tmdb import async_validate_key


class TmdbKeyRepairFlow(RepairsFlow):
    """Ask for a new TMDB key, check it, and save it (or turn TMDB off with an empty one)."""

    def __init__(self, entry_id: str) -> None:
        self._entry_id = entry_id

    async def async_step_init(self, user_input: dict[str, str] | None = None) -> data_entry_flow.FlowResult:
        return await self.async_step_confirm()

    async def async_step_confirm(self, user_input: dict[str, str] | None = None) -> data_entry_flow.FlowResult:
        errors: dict[str, str] = {}
        if user_input is not None:
            key = (user_input.get(CONF_TMDB_API_KEY) or "").strip()
            if key:
                error = await async_validate_key(async_get_clientsession(self.hass), key)
                if error:
                    errors[CONF_TMDB_API_KEY] = error
            if not errors:
                entry = self.hass.config_entries.async_get_entry(self._entry_id)
                if entry is not None:
                    options = {k: v for k, v in entry.options.items() if k != CONF_TMDB_API_KEY}
                    if key:
                        options[CONF_TMDB_API_KEY] = key
                    # the integration reloads when its options change, which clears this issue
                    self.hass.config_entries.async_update_entry(entry, options=options)
                return self.async_create_entry(data={})
        return self.async_show_form(
            step_id="confirm",
            data_schema=vol.Schema({vol.Optional(CONF_TMDB_API_KEY): str}),
            errors=errors,
        )


async def async_create_fix_flow(
    hass: HomeAssistant, issue_id: str, data: dict[str, str | int | float | None] | None
) -> RepairsFlow:
    """Create the flow of a repair issue."""
    return TmdbKeyRepairFlow(str((data or {}).get("entry_id", "")))
