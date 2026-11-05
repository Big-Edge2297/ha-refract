import { LitElement, html, nothing, type TemplateResult } from "lit";
import { property, state } from "lit/decorators.js";
import { defineOnce } from "./define";
import { DOMAIN, EDITOR_TYPE } from "./const";
import { editorStyles } from "./styles";
import { DEFAULT_CONFIG, type HomeAssistant, type RefractCardConfig } from "./types";

const LABELS: Record<string, string> = {
  entity: "Refract entity",
  name: "Name (optional)",
  layout: "Layout",
  streak_style: "Streak style",
  show_streak_toggle: "Show streak style switch",
  duration_format: "Duration format",
  queue_length: "Queue rows",
  fun_stat: "Show fun stat",
  fun_stat_mode: "Fun stat",
  show_hero: "Watch time summary",
  show_library: "Library",
  show_watch_time: "Watch time split",
  show_streak: "Streak",
  show_next_up: "Next up",
  show_queue: "Queue",
  show_actions: "Show “Mark watched” button",
  confirm_actions: "Ask before marking watched",
  color_movies: "Movies color",
  color_shows: "TV shows color",
  color_anime: "Anime color",
  color_accent: "Accent color",
};

const HELPERS: Record<string, string> = {
  entity: "Pick any entity of your Refract account. The card finds the rest.",
  show_actions: "Needs an API key that can mark episodes watched.",
  color_movies: "Hex color such as #2a78d6. Leave empty for the default.",
};

const option = (value: string, label: string) => ({ value, label });
const select = (options: Array<{ value: string; label: string }>) => ({ select: { mode: "dropdown", options } });

const SCHEMA = [
  { name: "entity", required: true, selector: { entity: { integration: DOMAIN, domain: "sensor" } } },
  { name: "name", selector: { text: {} } },
  {
    type: "grid",
    name: "",
    schema: [
      { name: "layout", selector: select([option("full", "Full"), option("compact", "Compact")]) },
      { name: "streak_style", selector: select([option("gauge", "Gauge"), option("dots", "Dots")]) },
      {
        name: "duration_format",
        selector: select([option("days_hours", "Days and hours"), option("hours", "Hours only"), option("auto", "Automatic")]),
      },
      { name: "queue_length", selector: { number: { min: 1, max: 20, mode: "box" } } },
    ],
  },
  {
    type: "expandable",
    name: "",
    title: "Sections",
    icon: "mdi:view-dashboard-outline",
    schema: [
      {
        type: "grid",
        name: "",
        schema: [
          { name: "show_hero", selector: { boolean: {} } },
          { name: "show_library", selector: { boolean: {} } },
          { name: "show_watch_time", selector: { boolean: {} } },
          { name: "show_streak", selector: { boolean: {} } },
          { name: "show_streak_toggle", selector: { boolean: {} } },
          { name: "show_next_up", selector: { boolean: {} } },
          { name: "show_queue", selector: { boolean: {} } },
        ],
      },
    ],
  },
  {
    type: "expandable",
    name: "",
    title: "Fun stat",
    icon: "mdi:shimmer",
    schema: [
      { name: "fun_stat", selector: { boolean: {} } },
      {
        name: "fun_stat_mode",
        selector: select([
          option("rotate", "Rotate daily"),
          option("months", "Months of nonstop viewing"),
          option("workweeks", "Full-time work weeks"),
          option("lotr", "Lord of the Rings marathons"),
        ]),
      },
    ],
  },
  {
    type: "expandable",
    name: "",
    title: "Next up actions",
    icon: "mdi:gesture-tap-button",
    schema: [
      { name: "show_actions", selector: { boolean: {} } },
      { name: "confirm_actions", selector: { boolean: {} } },
    ],
  },
  {
    type: "expandable",
    name: "",
    title: "Colors",
    icon: "mdi:palette-outline",
    schema: [
      {
        type: "grid",
        name: "",
        schema: [
          { name: "color_movies", selector: { text: {} } },
          { name: "color_shows", selector: { text: {} } },
          { name: "color_anime", selector: { text: {} } },
          { name: "color_accent", selector: { text: {} } },
        ],
      },
    ],
  },
];

@defineOnce(EDITOR_TYPE)
export class RefractStatsCardEditor extends LitElement {
  static styles = editorStyles;

  @property({ attribute: false }) public hass!: HomeAssistant;
  @state() private _config?: RefractCardConfig;

  public setConfig(config: RefractCardConfig): void {
    this._config = config;
  }

  protected render(): TemplateResult | typeof nothing {
    if (!this.hass || !this._config) return nothing;
    const data = { ...DEFAULT_CONFIG, ...this._config };
    const actionMissing = !!this._config.show_actions && !this.hass.services?.[DOMAIN]?.mark_episode_watched;
    return html`<div class="wrap">
      <ha-form
        .hass=${this.hass}
        .data=${data}
        .schema=${SCHEMA}
        .computeLabel=${(s: { name: string }) => LABELS[s.name] ?? s.name}
        .computeHelper=${(s: { name: string }) => HELPERS[s.name]}
        @value-changed=${this._valueChanged}
      ></ha-form>
      ${actionMissing
        ? html`<ha-alert alert-type="warning">
            The button stays hidden until the <code>refract.mark_episode_watched</code> action is available. Check
            that your Refract API key allows marking episodes and movies as watched.
          </ha-alert>`
        : nothing}
    </div>`;
  }

  private _valueChanged(ev: CustomEvent): void {
    ev.stopPropagation();
    if (!this._config) return;
    const value = ev.detail.value as Record<string, unknown>;
    const defaults = DEFAULT_CONFIG as Record<string, unknown>;
    const out: Record<string, unknown> = { type: this._config.type };
    for (const [key, v] of Object.entries(value)) {
      if (v === "" || v === undefined || v === null) continue;
      if (key in defaults && v === defaults[key]) continue;
      out[key] = v;
    }
    const cfg = this._config as unknown as Record<string, unknown>;
    for (const key of ["device_id", "config_entry_id", "entities"]) {
      if (cfg[key] !== undefined && out[key] === undefined) out[key] = cfg[key];
    }
    this._config = out as unknown as RefractCardConfig;
    this.dispatchEvent(new CustomEvent("config-changed", { detail: { config: out }, bubbles: true, composed: true }));
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "refract-stats-card-editor": RefractStatsCardEditor;
  }
}
