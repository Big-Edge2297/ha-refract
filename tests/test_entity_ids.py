"""Entity ids come from sensor names, and the dashboard card finds sensors by those ids.

Every sensor named in sensor.py must turn into an id the card knows (SENSOR_KEYS in the card's
const.ts), or the card never finds it.
"""

import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]


def slug(name: str) -> str:
    return re.sub(r"[^a-z0-9]+", "_", name.lower()).strip("_")


def test_every_sensor_name_is_a_key_the_card_looks_for():
    source = (ROOT / "custom_components" / "refract" / "sensor.py").read_text()
    names = re.findall(r'^\s+name="([^"]+)"', source, re.M)
    names += re.findall(r'_library_sensor\(\s*"[a-z0-9_]+",\s*"([^"]+)"', source)
    assert len(names) >= 15, names
    card = (ROOT / "frontend" / "src" / "const.ts").read_text()
    keys = set(re.findall(r'^\s+"([a-z0-9_]+)",$', card, re.M))
    missing = sorted(slug(n) for n in names if slug(n) not in keys)
    assert not missing, f"sensor names the card does not look for: {missing}"
