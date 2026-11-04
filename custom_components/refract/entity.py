"""Shared base entity."""

from __future__ import annotations

from homeassistant.helpers.device_registry import DeviceEntryType, DeviceInfo
from homeassistant.helpers.update_coordinator import CoordinatorEntity

from .const import DOMAIN
from .coordinator import RefractCoordinator


class RefractEntity(CoordinatorEntity[RefractCoordinator]):
    """Base class: one Refract device per account."""

    _attr_has_entity_name = True

    def __init__(self, coordinator: RefractCoordinator, key: str) -> None:
        super().__init__(coordinator)
        uid = coordinator.config_entry.unique_id or coordinator.config_entry.entry_id
        me = (coordinator.data or {}).get("me") or {}
        self._attr_unique_id = f"{uid}_{key}"
        self._attr_device_info = DeviceInfo(
            identifiers={(DOMAIN, uid)},
            name=f"Refract ({me.get('display_name') or me.get('username') or 'account'})",
            manufacturer="Refract",
            entry_type=DeviceEntryType.SERVICE,
            configuration_url="https://getrefract.app",
        )
