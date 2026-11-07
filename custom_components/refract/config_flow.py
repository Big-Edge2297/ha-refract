"""Config flow: paste a personal API key."""

from __future__ import annotations

from collections.abc import Mapping
from typing import Any

import voluptuous as vol

from homeassistant.config_entries import ConfigFlow, ConfigFlowResult, OptionsFlow
from homeassistant.core import callback
from homeassistant.helpers.aiohttp_client import async_get_clientsession
from homeassistant.helpers.selector import (
    BooleanSelector,
    NumberSelector,
    NumberSelectorConfig,
    NumberSelectorMode,
    TextSelector,
    TextSelectorConfig,
    TextSelectorType,
)

from .api import (
    RefractApiClient,
    RefractAuthError,
    RefractConnectionError,
    RefractError,
    RefractScopeError,
)
from .const import (
    CONF_API_KEY,
    CONF_FETCH_HISTORY,
    CONF_SCAN_INTERVAL,
    CONF_TMDB_API_KEY,
    DEFAULT_SCAN_INTERVAL,
    DOMAIN,
    LOGGER,
    MAX_SCAN_INTERVAL,
    MIN_SCAN_INTERVAL,
)
from .tmdb import async_validate_key

KEY_SCHEMA = vol.Schema(
    {vol.Required(CONF_API_KEY): TextSelector(TextSelectorConfig(type=TextSelectorType.PASSWORD))}
)


class RefractConfigFlow(ConfigFlow, domain=DOMAIN):
    """Handle setup and re-authentication."""

    VERSION = 1

    async def _validate(self, key: str) -> tuple[dict[str, Any] | None, str | None]:
        key = key.strip()
        if not key.startswith("rfk_"):
            return None, "invalid_key_format"
        api = RefractApiClient(async_get_clientsession(self.hass), key)
        try:
            return await api.get_me(), None
        except RefractAuthError:
            return None, "invalid_auth"
        except RefractScopeError:
            return None, "missing_profile_scope"
        except RefractConnectionError:
            return None, "cannot_connect"
        except RefractError:
            return None, "cannot_connect"
        except Exception:  # noqa: BLE001
            LOGGER.exception("Unexpected error validating Refract key")
            return None, "unknown"

    async def async_step_user(self, user_input: dict[str, Any] | None = None) -> ConfigFlowResult:
        errors: dict[str, str] = {}
        if user_input is not None:
            me, error = await self._validate(user_input[CONF_API_KEY])
            if error:
                errors["base"] = error
            else:
                await self.async_set_unique_id(me["id"])
                self._abort_if_unique_id_configured()
                return self.async_create_entry(
                    title=me.get("display_name") or me.get("username") or "Refract",
                    data={CONF_API_KEY: user_input[CONF_API_KEY].strip()},
                )
        return self.async_show_form(step_id="user", data_schema=KEY_SCHEMA, errors=errors)

    async def async_step_reauth(self, entry_data: Mapping[str, Any]) -> ConfigFlowResult:
        return await self.async_step_reauth_confirm()

    async def async_step_reauth_confirm(
        self, user_input: dict[str, Any] | None = None
    ) -> ConfigFlowResult:
        errors: dict[str, str] = {}
        if user_input is not None:
            me, error = await self._validate(user_input[CONF_API_KEY])
            if error:
                errors["base"] = error
            else:
                await self.async_set_unique_id(me["id"])
                self._abort_if_unique_id_mismatch(reason="wrong_account")
                return self.async_update_reload_and_abort(
                    self._get_reauth_entry(),
                    data_updates={CONF_API_KEY: user_input[CONF_API_KEY].strip()},
                )
        return self.async_show_form(
            step_id="reauth_confirm", data_schema=KEY_SCHEMA, errors=errors
        )

    @staticmethod
    @callback
    def async_get_options_flow(config_entry) -> RefractOptionsFlow:
        return RefractOptionsFlow()


class RefractOptionsFlow(OptionsFlow):
    """Polling interval, watch history and the optional TMDB poster key."""

    async def async_step_init(self, user_input: dict[str, Any] | None = None) -> ConfigFlowResult:
        errors: dict[str, str] = {}
        options = self.config_entry.options
        if user_input is not None:
            tmdb_key = (user_input.get(CONF_TMDB_API_KEY) or "").strip()
            if tmdb_key and tmdb_key != options.get(CONF_TMDB_API_KEY):
                error = await async_validate_key(async_get_clientsession(self.hass), tmdb_key)
                if error:
                    errors[CONF_TMDB_API_KEY] = error
            if not errors:
                data: dict[str, Any] = {
                    CONF_SCAN_INTERVAL: int(user_input[CONF_SCAN_INTERVAL]),
                    CONF_FETCH_HISTORY: bool(user_input[CONF_FETCH_HISTORY]),
                }
                if tmdb_key:
                    data[CONF_TMDB_API_KEY] = tmdb_key
                return self.async_create_entry(data=data)

        current = options.get(CONF_SCAN_INTERVAL, DEFAULT_SCAN_INTERVAL)
        schema = vol.Schema(
            {
                vol.Required(CONF_SCAN_INTERVAL, default=current): NumberSelector(
                    NumberSelectorConfig(
                        min=MIN_SCAN_INTERVAL,
                        max=MAX_SCAN_INTERVAL,
                        step=1,
                        mode=NumberSelectorMode.BOX,
                        unit_of_measurement="min",
                    )
                ),
                vol.Required(
                    CONF_FETCH_HISTORY, default=options.get(CONF_FETCH_HISTORY, True)
                ): BooleanSelector(),
                vol.Optional(
                    CONF_TMDB_API_KEY,
                    description={"suggested_value": options.get(CONF_TMDB_API_KEY, "")},
                ): TextSelector(TextSelectorConfig(type=TextSelectorType.PASSWORD)),
            }
        )
        return self.async_show_form(step_id="init", data_schema=schema, errors=errors)
