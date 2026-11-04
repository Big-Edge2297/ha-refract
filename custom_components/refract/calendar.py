"""Calendar of upcoming episodes."""

from __future__ import annotations

from datetime import date, datetime, time, timedelta

from homeassistant.components.calendar import CalendarEntity, CalendarEvent
from homeassistant.core import HomeAssistant
from homeassistant.helpers.entity_platform import AddEntitiesCallback
from homeassistant.util import dt as dt_util

from .api import RefractError
from .const import LOGGER, SCOPE_LIBRARY
from .coordinator import RefractConfigEntry, RefractCoordinator
from .entity import RefractEntity
from .util import build_events

PARALLEL_UPDATES = 0


def _end_as_datetime(event: CalendarEvent) -> datetime:
    if isinstance(event.end, datetime):
        return event.end
    return datetime.combine(event.end, time.min, tzinfo=dt_util.DEFAULT_TIME_ZONE)


async def async_setup_entry(
    hass: HomeAssistant, entry: RefractConfigEntry, async_add_entities: AddEntitiesCallback
) -> None:
    coordinator = entry.runtime_data.coordinator
    if coordinator.data["scopes"].get(SCOPE_LIBRARY):
        async_add_entities([RefractCalendar(coordinator)])


class RefractCalendar(RefractEntity, CalendarEntity):
    """Episodes airing for the shows you track."""

    _attr_name = "Upcoming episodes"
    _attr_icon = "mdi:calendar-star"

    def __init__(self, coordinator: RefractCoordinator) -> None:
        super().__init__(coordinator, "calendar")

    @property
    def event(self) -> CalendarEvent | None:
        now = dt_util.now()
        for event in build_events(self.coordinator.data.get("calendar")):
            if _end_as_datetime(event) > now:
                return event
        return None

    async def async_get_events(
        self, hass: HomeAssistant, start_date: datetime, end_date: datetime
    ) -> list[CalendarEvent]:
        start: date = dt_util.as_local(start_date).date()
        days = max(1, min(31, (dt_util.as_local(end_date).date() - start).days + 1))
        try:
            payload = await self.coordinator.api.get_calendar(start.isoformat(), days)
        except RefractError as err:
            LOGGER.warning("Could not fetch Refract calendar: %s", err)
            return []
        return [
            ev
            for ev in build_events(payload)
            if ev.start_datetime_local < end_date and _end_as_datetime(ev) > start_date
        ]
