"""Watchlist as a to-do list."""

from __future__ import annotations

from homeassistant.components.todo import (
    TodoItem,
    TodoItemStatus,
    TodoListEntity,
    TodoListEntityFeature,
)
from homeassistant.core import HomeAssistant
from homeassistant.exceptions import HomeAssistantError
from homeassistant.helpers.entity_platform import AddEntitiesCallback

from .api import RefractError, RefractScopeError
from .const import SCOPE_LIBRARY
from .coordinator import RefractConfigEntry, RefractCoordinator
from .entity import RefractEntity

PARALLEL_UPDATES = 0


async def async_setup_entry(
    hass: HomeAssistant, entry: RefractConfigEntry, async_add_entities: AddEntitiesCallback
) -> None:
    coordinator = entry.runtime_data.coordinator
    if coordinator.data["scopes"].get(SCOPE_LIBRARY):
        async_add_entities([RefractWatchlist(coordinator)])


class RefractWatchlist(RefractEntity, TodoListEntity):
    """Titles with status 'planned'. Items can be removed from Home Assistant.

    Adding is done with the refract.add_to_watchlist action, because the API
    adds titles by id rather than by free-text name.
    """

    _attr_name = "Watchlist"
    _attr_icon = "mdi:bookmark-multiple-outline"
    _attr_supported_features = TodoListEntityFeature.DELETE_TODO_ITEM

    def __init__(self, coordinator: RefractCoordinator) -> None:
        super().__init__(coordinator, "watchlist")

    @property
    def todo_items(self) -> list[TodoItem]:
        items = []
        for entry in self.coordinator.data["watchlist"]:
            ref = (entry.get("ids") or {}).get("refract")
            if not ref:
                continue
            year = f" ({entry['year']})" if entry.get("year") else ""
            items.append(
                TodoItem(
                    uid=ref,
                    summary=f"{entry.get('title', 'Untitled')}{year}",
                    status=TodoItemStatus.NEEDS_ACTION,
                    description=("Anime " if entry.get("is_anime") else "") + str(entry.get("type", "")),
                )
            )
        return sorted(items, key=lambda i: (i.summary or "").lower())

    async def async_delete_todo_items(self, uids: list[str]) -> None:
        try:
            for uid in uids:
                await self.coordinator.api.remove_from_watchlist(uid)
        except RefractScopeError as err:
            raise HomeAssistantError(
                "Your Refract key needs the 'Add, remove and move titles in your library' permission."
            ) from err
        except RefractError as err:
            raise HomeAssistantError(f"Refract: {err}") from err
        await self.coordinator.async_request_refresh()
