import "./refract-stats-card";
import "./editor";
import "./section-cards";
import { SECTION_CARDS } from "./section-cards";
import { CARD_TYPE, DOCS_URL, VERSION } from "./const";
import { t } from "./localize";

declare global {
  interface Window {
    customCards?: Array<Record<string, unknown>>;
  }
}

window.customCards = window.customCards || [];
if (!window.customCards.some((c) => c.type === CARD_TYPE)) {
  window.customCards.push({
    type: CARD_TYPE,
    name: t(undefined, "card.name"),
    description: t(undefined, "card.description"),
    preview: true,
    documentationURL: DOCS_URL,
  });
}

for (const info of SECTION_CARDS) {
  if (!window.customCards.some((c) => c.type === info.type)) {
    window.customCards.push({ type: info.type, name: info.name, description: info.description, preview: true, documentationURL: DOCS_URL });
  }
}

console.info(
  `%c REFRACT-STATS-CARD %c v${VERSION} `,
  "color:white;background:#6250d6;font-weight:500;border-radius:3px 0 0 3px",
  "color:#6250d6;background:#eee;font-weight:500;border-radius:0 3px 3px 0",
);
