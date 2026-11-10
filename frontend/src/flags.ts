import flagFont from "./assets/TwemojiCountryFlags.woff2";

/** Font family that draws country flags, also where the system has none (Windows). */
export const FLAG_FONT = "Twemoji Country Flags";
const STYLE_ID = "refract-flag-font";

/**
 * Makes the flag font available to the page. A font declared inside a card's shadow DOM isn't
 * picked up by browsers, so it goes into the document once, limited to the flag characters.
 */
export function ensureFlagFont(doc: Document = document): void {
  if (!doc.head || doc.getElementById(STYLE_ID)) return;
  const style = doc.createElement("style");
  style.id = STYLE_ID;
  style.textContent =
    `@font-face{font-family:"${FLAG_FONT}";font-display:swap;` +
    `unicode-range:U+1F1E6-1F1FF,U+1F3F4,U+E0062-E007F;src:url(${flagFont}) format("woff2")}`;
  doc.head.appendChild(style);
}

/** The flag emoji of a two-letter country code, or undefined for anything else. */
export function flagEmoji(code?: string): string | undefined {
  return code && /^[A-Za-z]{2}$/.test(code)
    ? String.fromCodePoint(...[...code.toUpperCase()].map((ch) => 0x1f1e6 + ch.charCodeAt(0) - 65))
    : undefined;
}
