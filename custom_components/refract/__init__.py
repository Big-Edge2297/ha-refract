"""The Refract integration."""

from __future__ import annotations

from homeassistant.const import Platform
from homeassistant.core import HomeAssistant
from homeassistant.helpers import config_validation as cv
from homeassistant.helpers.aiohttp_client import async_get_clientsession
from homeassistant.helpers.typing import ConfigType

from .api import RefractApiClient
from .const import CONF_API_KEY, DOMAIN
from .coordinator import RefractConfigEntry, RefractCoordinator, RefractData
from .services import async_setup_services

PLATFORMS = [Platform.SENSOR, Platform.CALENDAR, Platform.TODO]
CONFIG_SCHEMA = cv.config_entry_only_config_schema(DOMAIN)


async def async_setup(hass: HomeAssistant, config: ConfigType) -> bool:
    """Register actions (once, not per account)."""
    async_setup_services(hass)
    return True


async def async_setup_entry(hass: HomeAssistant, entry: RefractConfigEntry) -> bool:
    api = RefractApiClient(async_get_clientsession(hass), entry.data[CONF_API_KEY])
    coordinator = RefractCoordinator(hass, entry, api)
    await coordinator.async_config_entry_first_refresh()

    entry.runtime_data = RefractData(api=api, coordinator=coordinator)
    await hass.config_entries.async_forward_entry_setups(entry, PLATFORMS)
    entry.async_on_unload(entry.add_update_listener(_async_reload))
    return True


async def async_unload_entry(hass: HomeAssistant, entry: RefractConfigEntry) -> bool:
    return await hass.config_entries.async_unload_platforms(entry, PLATFORMS)


async def _async_reload(hass: HomeAssistant, entry: RefractConfigEntry) -> None:
    await hass.config_entries.async_reload(entry.entry_id)
