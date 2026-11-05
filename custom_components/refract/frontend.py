"""Serve the Refract dashboard card and load it in the Home Assistant frontend."""

from __future__ import annotations

import logging
from pathlib import Path

from homeassistant.components.frontend import add_extra_js_url
from homeassistant.components.http import StaticPathConfig
from homeassistant.core import HomeAssistant
from homeassistant.loader import async_get_integration

_LOGGER = logging.getLogger(__name__)

# Kept local so this module doesn't depend on const.py.
_DOMAIN = "refract"

CARD_FILENAME = "refract-stats-card.js"
CARD_URL_PATH = f"/{_DOMAIN}_card/{CARD_FILENAME}"
_CARD_FILE = Path(__file__).parent / "www" / CARD_FILENAME
_REGISTERED_KEY = f"{_DOMAIN}_card_registered"


async def async_register_card(hass: HomeAssistant) -> None:
    """Expose the bundled card over HTTP and add it to the frontend.

    Safe to call more than once (for example on every config entry setup):
    the card is registered a single time per Home Assistant run.
    """
    if hass.data.get(_REGISTERED_KEY):
        return

    # Checking for the file does blocking I/O, so keep it off the event loop.
    if not await hass.async_add_executor_job(_CARD_FILE.is_file):
        _LOGGER.warning("Refract card file not found at %s; the dashboard card won't be available", _CARD_FILE)
        return

    integration = await async_get_integration(hass, _DOMAIN)
    await hass.http.async_register_static_paths(
        [StaticPathConfig(CARD_URL_PATH, str(_CARD_FILE), cache_headers=False)]
    )
    # The version in the query string makes browsers fetch the new file after an update.
    add_extra_js_url(hass, f"{CARD_URL_PATH}?v={integration.version}")
    hass.data[_REGISTERED_KEY] = True
    _LOGGER.debug("Registered Refract dashboard card %s", integration.version)
