# Development

## The pieces

| Folder | What it is |
|---|---|
| `custom_components/refract` | The Home Assistant integration (Python) and the built card in `www/` |
| `frontend` | The dashboard card (TypeScript, Lit) and its demo page |
| `tests` | Tests of the analytics and the translations (plain pytest) |
| `tests/ha` | Tests that run the integration inside Home Assistant |

## Running the tests

```
# the card: typecheck, tests, and rebuild custom_components/refract/www/refract-stats-card.js
cd frontend && npm ci && npm run typecheck && npm test && npm run build

# the analytics and translations
pip install pytest && python -m pytest -q tests --ignore=tests/ha

# the integration inside Home Assistant (a recent Python is needed)
pip install -r tests/ha/requirements.txt
python -m pytest -p pytest_homeassistant_custom_component -q tests/ha
```

The Home Assistant tests mock Refract and TMDB (`tests/ha/refract_data.py`): they set the integration up for real, read its sensors, make the API fail, and walk through the setup, re-authentication and repair flows. The card is checked against them too: a test fails when a sensor gets an entity id the card does not look for.

The *Tests* workflow runs them on the oldest Home Assistant the integration supports (the version in `hacs.json`) and on the newest.

## Dependency updates

Dependabot opens a pull request every Monday for newer npm packages of the card and newer versions of the GitHub actions (`.github/dependabot.yml`). The *Dependency audit* workflow checks the packages every Monday and when `package.json` or its lock file change:

- the libraries bundled into the card (`lit`) must have no known vulnerability, or the workflow fails;
- the build tools (`esbuild`, `typescript`, ...) are reported without failing, because they don't ship in the card. The audit currently lists a moderate advisory about the development server of `esbuild`, which the build does not use.

**An npm update changes the card file.** The *Frontend* workflow fails when `custom_components/refract/www/refract-stats-card.js` is not what the source builds to, so a Dependabot pull request for the card stays red until the card is rebuilt:

```
gh pr checkout <number>
cd frontend && npm ci && npm test && npm run build
git add -A && git commit -m "Rebuild the card" && git push
```

Merge it once the checks are green, then make a release as usual, because HACS users get the new card only through a release.
