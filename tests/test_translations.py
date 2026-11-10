"""The integration's translations must match English: same structure, nothing empty, nothing lost."""

import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1] / "custom_components" / "refract"
TRANSLATIONS = ROOT / "translations"
LANGUAGES = ["de", "es", "fr", "it", "nl", "pl", "pt"]


def paths(node, prefix=()):
    if isinstance(node, dict):
        for key, value in node.items():
            yield from paths(value, prefix + (key,))
    else:
        yield prefix, node


def load(name):
    return json.loads((TRANSLATIONS / f"{name}.json").read_text(encoding="utf-8"))


def test_strings_json_is_the_english_translation():
    assert json.loads((ROOT / "strings.json").read_text(encoding="utf-8")) == load("en")


def test_every_language_file_exists_and_nothing_else_is_there():
    assert sorted(p.stem for p in TRANSLATIONS.glob("*.json")) == sorted(["en", *LANGUAGES])


def test_every_translation_has_the_same_structure_as_english():
    english = dict(paths(load("en")))
    for language in LANGUAGES:
        translated = dict(paths(load(language)))
        assert translated.keys() == english.keys(), language
        for path, text in translated.items():
            assert isinstance(text, str) and text.strip() == text and text, f"{language}: {'.'.join(path)}"


def test_values_that_must_not_be_translated_survive():
    english = dict(paths(load("en")))
    must_keep = {
        "rfk_": "Refract keys start with rfk_.",
        "tt...": "The title's IMDb id (tt...).",
        "planned, in_progress, up_to_date": "planned, in_progress, up_to_date or completed.",
    }
    for language in LANGUAGES:
        translated = " ".join(text for _, text in paths(load(language)))
        for token in must_keep:
            assert token in translated, f"{language} lost {token!r}"
        # product names are kept as they are
        for name in ("TMDB", "IMDb", "TheTVDB", "Refract", "Home Assistant"):
            assert name in translated, f"{language} lost {name}"
    assert len(english) > 100


def test_the_options_texts_agree_with_the_card_names_in_each_language():
    """The history option names two sections of the card; they must be called the same in the card."""
    card = ROOT.parents[1] / "frontend" / "src" / "translations"
    for language in LANGUAGES:
        source = (card / f"{language}.ts").read_text(encoding="utf-8")
        description = load(language)["options"]["step"]["init"]["data_description"]["fetch_history"]
        for key in ("days7.title", "avg.title"):
            line = next(l for l in source.splitlines() if f'"{key}"' in l)
            name = line.split(": ", 1)[1].strip().rstrip(",").strip('"')
            assert name in description, f"{language}: the card calls it {name!r}"
