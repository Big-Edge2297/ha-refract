"""Constants for the Refract integration."""

from logging import getLogger

DOMAIN = "refract"
LOGGER = getLogger(__package__)

API_BASE = "https://getrefract.app/v1"
USER_AGENT = "ha-refract/0.1.0 (+https://github.com/Big-Edge2297/ha-refract)"
REQUEST_TIMEOUT = 30
MAX_PAGES = 100

CONF_API_KEY = "api_key"
CONF_SCAN_INTERVAL = "scan_interval"
CONF_FETCH_HISTORY = "fetch_history"
CONF_TMDB_API_KEY = "tmdb_api_key"
DEFAULT_SCAN_INTERVAL = 15  # minutes
MIN_SCAN_INTERVAL = 5
MAX_SCAN_INTERVAL = 240

# Permission groups (the app's toggles map onto these scopes)
SCOPE_PROFILE = "profile"
SCOPE_LIBRARY = "library"
SCOPE_HISTORY = "history"

# History (weekly stats) is heavy, so it is refreshed less often than the rest.
HISTORY_REFRESH_MINUTES = 60

TMDB_API_BASE = "https://api.themoviedb.org/3"
TMDB_IMAGE_BASE = "https://image.tmdb.org/t/p/w185"  # posters and profile photos
