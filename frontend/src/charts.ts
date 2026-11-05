import { html, svg, type TemplateResult } from "lit";

export interface Segment {
  value: number;
  /** Any CSS color, usually a custom property such as `var(--refract-c-movies)`. */
  color: string;
}

const DONUT_R = 40;
const DONUT_C = 2 * Math.PI * DONUT_R;
const SEGMENT_GAP = 1.2;
const MIN_SEGMENT = 1.5;

/** Ring chart. Tiny non-zero segments stay visible with a minimum arc length. */
export function donut(segments: Segment[], centerValue: string, centerLabel: string, ariaLabel: string): TemplateResult {
  const live = segments.filter((s) => s.value > 0);
  const total = live.reduce((sum, s) => sum + s.value, 0);
  let offset = 0;
  const arcs = live.map((s) => {
    const len = (s.value / total) * DONUT_C;
    const dash = live.length > 1 ? Math.max(len - SEGMENT_GAP, MIN_SEGMENT) : len;
    const arc = svg`<circle cx="52" cy="52" r="${DONUT_R}" fill="none" stroke-width="14"
      style="stroke:${s.color}" stroke-dasharray="${dash} ${DONUT_C}" stroke-dashoffset="${-offset}"
      transform="rotate(-90 52 52)"></circle>`;
    offset += len;
    return arc;
  });
  return html`<svg class="donut" viewBox="0 0 104 104" role="img" aria-label=${ariaLabel}>
    <circle cx="52" cy="52" r="${DONUT_R}" fill="none" stroke-width="14" class="track"></circle>
    ${arcs}
    <text x="52" y="53" text-anchor="middle" class="donut-value">${centerValue}</text>
    <text x="52" y="67" text-anchor="middle" class="donut-label">${centerLabel}</text>
  </svg>`;
}

const GAUGE_LEN = Math.PI * 60;

/** Semicircle gauge: `value` out of `max`, with the number in the middle. */
export function gauge(value: number, max: number, centerValue: string, centerLabel: string, ariaLabel: string): TemplateResult {
  const frac = max > 0 ? Math.min(Math.max(value / max, 0), 1) : 0;
  const filled = frac * GAUGE_LEN;
  return html`<svg class="gauge" viewBox="0 0 160 96" role="img" aria-label=${ariaLabel}>
    <path d="M20 84 A60 60 0 0 1 140 84" fill="none" stroke-width="12" stroke-linecap="round" class="track"></path>
    ${filled > 0
      ? svg`<path d="M20 84 A60 60 0 0 1 140 84" fill="none" stroke-width="12" stroke-linecap="round"
          class="gauge-fill" stroke-dasharray="${filled} ${GAUGE_LEN + 1}"></path>`
      : ""}
    <text x="80" y="72" text-anchor="middle" class="gauge-value">${centerValue}</text>
    <text x="80" y="90" text-anchor="middle" class="gauge-label">${centerLabel}</text>
  </svg>`;
}
