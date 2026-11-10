# Translations

The card and the integration are translated into German (`de`), French (`fr`), Spanish (`es`), Italian (`it`), Dutch (`nl`), Portuguese (`pt`, Brazilian) and Polish (`pl`). English is the source. The translations were written without native review, so fixes are welcome. Open an issue or a pull request.

## What is translated

| Part | Where | What |
|---|---|---|
| Dashboard card | `frontend/src/translations/<language>.ts` | Everything the card shows |
| Integration | `custom_components/refract/translations/<language>.json` | Setup and re-authentication screens, options, error messages, service names and descriptions |

Not translated: the card editor and the entity names. The entity ids come from the English names and the card finds its sensors by them, so translating the names would break the card.

## Fix a text

1. Find the text in the language's file and change it. Keep placeholders such as `{n}`, `{time}` and `{entity}` exactly as they are, and keep product names (Refract, TMDB, IMDb, TheTVDB) and the words `planned`, `in_progress`, `up_to_date` and `completed`.
2. For the card, run `npm test` in `frontend` (and `npm run build` to rebuild `custom_components/refract/www/refract-stats-card.js`). For the integration, run `python -m pytest tests`. Both check that the file still has every text of the English version.

## Plurals

Counts such as "1 day" and "2 days" use the plural rules of the language. A text has a general form (`unit.day`: "days") and extra forms with a suffix: `_one`, and for languages that need them `_few`, `_many`, `_two` or `_zero` (`unit.day_one`: "day"). English, German, French, Spanish, Italian, Dutch and Portuguese need only the general form and `_one`. Polish also has `_few` (2-4, 22-24, ...) and `_many` (0, 5-21, ...), and its general form is used for fractions ("2,5 dnia"). The [CLDR plural rules](https://cldr.unicode.org/index/cldr-spec/plural-rules) list the forms of each language.

## Add a language

1. Copy `frontend/src/translations/de.ts` to `<language>.ts`, rename the export to the language code and translate the values. Add the plural forms the language needs.
2. Register it in `frontend/src/localize.ts`: import it and add it to `dictionaries`. Add it to the list in `frontend/test/localize.test.ts`.
3. Copy `custom_components/refract/translations/de.json` to `<language>.json` and translate the values, and add the code to `LANGUAGES` in `tests/test_translations.py`.
4. Make the options text agree with the card: the description of *Fetch watch history* names the sections *Last 7 days* and *Average per week* the way the card calls them (`days7.title` and `avg.title`). A test checks it.
5. Run the tests and rebuild the card.

A language that isn't translated, or a text that is missing from a translation, shows in English.
