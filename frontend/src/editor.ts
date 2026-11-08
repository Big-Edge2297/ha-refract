import { LitElement, html, nothing, type TemplateResult } from "lit";
import { property, state } from "lit/decorators.js";
import { defineOnce } from "./define";
import { DOMAIN, EDITOR_TYPE } from "./const";
import { editorStyles } from "./styles";
import { DEFAULT_CONFIG, SECTION_IDS, resolveSectionOrder, type HomeAssistant, type RefractCardConfig, type SectionId } from "./types";

const LABELS: Record<string, string> = {
  entity: "Refract entity",
  name: "Name (optional)",
  layout: "Layout",
  library_style: "Library style",
  watch_time_style: "Watch time style",
  duration_format: "Duration format",
  queue_length: "Catch-up rows",
  airing_length: "Airing rows",
  fun_stat: "Show fun stat",
  fun_stat_mode: "Fun stat",
  show_hero: "Watch time summary",
  show_watch_time: "Watch time split",
  show_library: "Library",
  show_still_to_finish: "Still to finish",
  show_streak: "Streak",
  show_average: "Average per week",
  show_last_7_days: "Last 7 days",
  show_next_up: "Next up",
  show_catchup: "Catch-up backlog",
  show_airing: "Airing this week",
  show_posters: "Posters",
  show_actions: "Show “Mark watched” button",
  confirm_actions: "Ask before marking watched",
  color_movies: "Movies color",
  color_shows: "TV shows color",
  color_anime: "Anime color",
  color_accent: "Accent color",
};

const SECTION_NAMES: Record<SectionId, string> = {
  hero: LABELS.show_hero,
  watch_time: LABELS.show_watch_time,
  library: LABELS.show_library,
  still_to_finish: LABELS.show_still_to_finish,
  streak: LABELS.show_streak,
  average: LABELS.show_average,
  last_7_days: LABELS.show_last_7_days,
  next_up: LABELS.show_next_up,
  catchup: LABELS.show_catchup,
  airing: LABELS.show_airing,
};

const HELPERS: Record<string, string> = {
  entity: "Pick any entity of your Refract account. The card finds the rest.",
  show_actions: "Needs an API key that can mark episodes watched.",
  show_posters: "Needs a TMDB API key in the Refract integration options.",
  show_last_7_days: "Needs watch history turned on in the integration options.",
  show_average: "Needs watch history turned on in the integration options.",
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
      {
        name: "duration_format",
        selector: select([option("days_hours", "Days and hours"), option("hours", "Hours only"), option("auto", "Automatic")]),
      },
      { name: "watch_time_style", selector: select([option("bar", "Compact bar"), option("list", "Breakdown list")]) },
      { name: "library_style", selector: select([option("bar", "Compact bar"), option("list", "Breakdown list")]) },
      { name: "queue_length", selector: { number: { min: 1, max: 20, mode: "box" } } },
      { name: "airing_length", selector: { number: { min: 1, max: 20, mode: "box" } } },
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
          { name: "show_watch_time", selector: { boolean: {} } },
          { name: "show_library", selector: { boolean: {} } },
          { name: "show_still_to_finish", selector: { boolean: {} } },
          { name: "show_streak", selector: { boolean: {} } },
          { name: "show_average", selector: { boolean: {} } },
          { name: "show_last_7_days", selector: { boolean: {} } },
          { name: "show_next_up", selector: { boolean: {} } },
          { name: "show_catchup", selector: { boolean: {} } },
          { name: "show_airing", selector: { boolean: {} } },
          { name: "show_posters", selector: { boolean: {} } },
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
    const data: Record<string, unknown> = { ...DEFAULT_CONFIG, ...this._config };
    if (this._config.show_queue !== undefined && this._config.show_catchup === undefined) data.show_catchup = this._config.show_queue;
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
      ${this._orderPanel()}
      ${actionMissing
        ? html`<ha-alert alert-type="warning">
            The button stays hidden until the <code>refract.mark_episode_watched</code> action is available. Check
            that your Refract API key allows marking episodes and movies as watched.
          </ha-alert>`
        : nothing}
    </div>`;
  }

  private _orderPanel(): TemplateResult {
    const order = resolveSectionOrder(this._config?.section_order);
    const isDefault = order.every((id, i) => id === SECTION_IDS[i]);
    return html`<ha-expansion-panel outlined header="Section order" .leftChevron=${true}>
      <div class="order">
        <div class="hint">Use the arrows to move a section up or down. The header always stays on top.</div>
        ${order.map(
          (id, i) => html`<div class="order-row">
            <span class="order-name">${SECTION_NAMES[id]}</span>
            <ha-icon-button
              label="Move up"
              aria-label="Move ${SECTION_NAMES[id]} up"
              ?disabled=${i === 0}
              @click=${() => this._move(i, -1)}
              ><ha-icon icon="mdi:arrow-up"></ha-icon
            ></ha-icon-button>
            <ha-icon-button
              label="Move down"
              aria-label="Move ${SECTION_NAMES[id]} down"
              ?disabled=${i === order.length - 1}
              @click=${() => this._move(i, 1)}
              ><ha-icon icon="mdi:arrow-down"></ha-icon
            ></ha-icon-button>
          </div>`,
        )}
        ${isDefault
          ? nothing
          : html`<button class="order-reset" @click=${this._resetOrder}>Reset to default order</button>`}
      </div>
    </ha-expansion-panel>`;
  }

  private _move(index: number, delta: number): void {
    const order = resolveSectionOrder(this._config?.section_order);
    const to = index + delta;
    if (to < 0 || to >= order.length) return;
    [order[index], order[to]] = [order[to], order[index]];
    this._setOrder(order);
  }

  private _resetOrder = (): void => this._setOrder([...SECTION_IDS]);

  private _setOrder(order: SectionId[]): void {
    if (!this._config) return;
    const out: Record<string, unknown> = { ...(this._config as unknown as Record<string, unknown>) };
    // The default order is not stored, so the YAML stays clean.
    if (order.every((id, i) => id === SECTION_IDS[i])) delete out.section_order;
    else out.section_order = order;
    this._config = out as unknown as RefractCardConfig;
    this.dispatchEvent(new CustomEvent("config-changed", { detail: { config: out }, bubbles: true, composed: true }));
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
    // retired options are dropped once the card is edited
    delete out.streak_style;
    delete out.show_streak_toggle;
    delete out.show_queue;
    const cfg = this._config as unknown as Record<string, unknown>;
    for (const key of ["device_id", "config_entry_id", "entities", "section_order"]) {
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
