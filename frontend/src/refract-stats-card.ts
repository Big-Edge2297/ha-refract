import { LitElement, html, nothing, type PropertyValues, type TemplateResult } from "lit";
import { property, state } from "lit/decorators.js";
import { defineOnce } from "./define";
import { styleMap } from "lit/directives/style-map.js";
import { CARD_TYPE, DOMAIN, EDITOR_TYPE } from "./const";
import { discover, type Discovery } from "./discovery";
import { durationParts, durationText, fmtNumber, funStatText, isoDay, shares, streakDots, timeOfDay, weekdayName } from "./format";
import { languageOf, t } from "./localize";
import { buildModel, showKey, type CatchupShow, type Model, type ShowItem } from "./model";
import { cardStyles } from "./styles";
import { DEFAULT_CONFIG, resolveSectionOrder, type HomeAssistant, type RefractCardConfig, type SectionId } from "./types";

type ResolvedConfig = RefractCardConfig & Required<Pick<RefractCardConfig, keyof typeof DEFAULT_CONFIG>>;
type ActionState = "idle" | "confirm" | "busy" | "done" | "error";

@defineOnce(CARD_TYPE)
export class RefractStatsCard extends LitElement {
  static styles = cardStyles;

  @property({ attribute: false }) public hass!: HomeAssistant;

  @state() private _config?: RefractCardConfig;
  @state() private _catchupExpanded = false;
  @state() private _airingExpanded = false;
  @state() private _actionState: ActionState = "idle";
  @state() private _actionError = "";

  private _cfg!: ResolvedConfig;
  private _disc?: Discovery;
  private _discFor?: { config: RefractCardConfig; entities: unknown; devices: unknown };
  private _actionTimer?: number;
  /** Show picked in the catch-up backlog to take over the Next up tile. Not persisted. */
  private _selected?: string;
  /** Which episode the confirm / busy state belongs to, so it can't leak onto another one. */
  private _actionTarget = "";

  // ------------------------------------------------------------ HA hooks

  public static async getConfigElement(): Promise<HTMLElement> {
    return document.createElement(EDITOR_TYPE);
  }

  public static getStubConfig(hass: HomeAssistant): Partial<RefractCardConfig> {
    const registry = hass?.entities ?? {};
    const ids = Object.keys(registry).filter((id) => id.startsWith("sensor.") && registry[id].platform === DOMAIN);
    const fallback = Object.keys(hass?.states ?? {}).filter((id) => id.startsWith("sensor.refract_"));
    const pool = ids.length ? ids : fallback;
    const entity = pool.find((id) => id.endsWith("_next_up")) ?? pool[0] ?? "";
    return { entity };
  }

  public setConfig(config: RefractCardConfig): void {
    if (!config || typeof config !== "object") throw new Error("Invalid configuration");
    const clean: Record<string, unknown> = Object.fromEntries(
      Object.entries(config).filter(([, v]) => v !== undefined && v !== null),
    );
    // `show_queue` was renamed to `show_catchup`; old configs keep working.
    if (clean.show_queue !== undefined && clean.show_catchup === undefined) clean.show_catchup = clean.show_queue;
    this._config = config;
    this._cfg = { ...DEFAULT_CONFIG, ...clean } as ResolvedConfig;
    this._disc = undefined;
  }

  public getCardSize(): number {
    if (!this._cfg) return 12;
    const c = this._cfg;
    const full = c.layout === "full";
    let size = 1;
    if (c.show_hero) size += 3;
    if (full && c.show_watch_time) size += 2;
    if (full && c.show_library) size += 2;
    if (full && c.show_still_to_finish) size += 3;
    if (c.show_streak) size += 3;
    if (full && c.show_last_7_days) size += 3;
    if (c.show_next_up) size += 3;
    if (full && c.show_catchup) size += 2 + Math.min(c.queue_length, 5);
    if (full && c.show_airing) size += 2 + Math.min(c.airing_length, 5);
    return size;
  }

  public getGridOptions() {
    return { columns: 12, min_columns: 6, rows: "auto" as const };
  }

  // -------------------------------------------------------- lifecycle

  protected shouldUpdate(changed: PropertyValues): boolean {
    if (!this._config || !this.hass) return false;
    const keys = [...changed.keys()];
    if (keys.some((k) => k !== "hass")) return true;
    const old = changed.get("hass") as HomeAssistant | undefined;
    if (!old) return true;
    if (old.locale !== this.hass.locale || old.entities !== this.hass.entities || old.devices !== this.hass.devices) return true;
    for (const id of Object.values(this._discovery().entities)) {
      if (old.states[id] !== this.hass.states[id]) return true;
    }
    return false;
  }

  public disconnectedCallback(): void {
    super.disconnectedCallback();
    window.clearTimeout(this._actionTimer);
  }

  private _discovery(): Discovery {
    const h = this.hass;
    const cfg = this._config!;
    const stale =
      !this._disc ||
      !this._discFor ||
      this._discFor.config !== cfg ||
      this._discFor.entities !== h.entities ||
      this._discFor.devices !== h.devices ||
      Object.keys(this._disc.entities).length === 0;
    if (stale) {
      this._disc = discover(h, cfg);
      this._discFor = { config: cfg, entities: h.entities, devices: h.devices };
    }
    return this._disc!;
  }

  // ------------------------------------------------------------ render

  protected render(): TemplateResult | typeof nothing {
    if (!this._config || !this.hass) return nothing;
    const c = this._cfg;
    if (!c.entity && !c.device_id && !c.entities) return this._message(t(this.hass, "empty.no_entity"));

    const discovery = this._discovery();
    const m = buildModel(this.hass, discovery, c);
    if (!m.found) {
      return this._message(t(this.hass, "empty.not_found", { entity: c.entity ?? c.device_id ?? "" }));
    }

    const compact = c.layout === "compact";
    const posters = c.show_posters && m.hasPosters;
    const sections: Record<SectionId, TemplateResult | typeof nothing> = {
      hero: c.show_hero ? this._hero(m) : nothing,
      watch_time: !compact && c.show_watch_time ? this._watchTime(m) : nothing,
      still_to_finish: !compact && c.show_still_to_finish ? this._finish(m) : nothing,
      library: !compact && c.show_library ? this._library(m) : nothing,
      streak: c.show_streak && m.streak ? this._streak(m) : nothing,
      average: !compact && c.show_average ? this._average(m) : nothing,
      last_7_days: !compact && c.show_last_7_days ? this._last7(m) : nothing,
      next_up: c.show_next_up ? this._next(m, posters) : nothing,
      catchup: !compact && c.show_catchup ? this._catchup(m, posters) : nothing,
      airing: !compact && c.show_airing ? this._airing(m) : nothing,
    };

    // Streak and average share a row when they end up next to each other.
    const body: Array<TemplateResult | typeof nothing> = [];
    let row: TemplateResult[] = [];
    const flush = () => {
      if (row.length) body.push(html`<div class="grid">${row}</div>`);
      row = [];
    };
    for (const id of resolveSectionOrder(c.section_order)) {
      const part = sections[id];
      if (part === nothing) continue;
      if (id === "streak" || id === "average") {
        row.push(part);
      } else {
        flush();
        body.push(part);
      }
    }
    flush();

    return html`<ha-card style=${styleMap(this._colorVars())}> ${this._header(m)} ${body} </ha-card>`;
  }

  private _message(text: string): TemplateResult {
    return html`<ha-card><div class="empty" style="padding:16px">${text}</div></ha-card>`;
  }

  private _colorVars(): Record<string, string> {
    const c = this._cfg;
    const vars: Record<string, string> = {};
    if (c.color_movies) vars["--refract-color-movies"] = c.color_movies;
    if (c.color_shows) vars["--refract-color-shows"] = c.color_shows;
    if (c.color_anime) vars["--refract-color-anime"] = c.color_anime;
    if (c.color_accent) vars["--refract-color-accent"] = c.color_accent;
    return vars;
  }

  // ------------------------------------------------------------ header

  private _header(m: Model): TemplateResult {
    const last = m.last;
    const episode =
      last?.season !== undefined && last?.episode !== undefined ? ` S${last.season} E${last.episode}` : "";
    return html`<div class="header">
      <div class="brand">
        <ha-icon icon="mdi:chart-donut"></ha-icon>
        <span class="name">${m.accountMain}</span>
        ${m.accountSub ? html`<span class="sub">${m.accountSub}</span>` : nothing}
      </div>
      ${last
        ? html`<span class="last" title="${t(this.hass, "header.last_watched")}">
            ${last.title ? html`${last.title}${episode} · ` : nothing}<ha-relative-time
              .hass=${this.hass}
              .datetime=${last.iso}
            ></ha-relative-time>
          </span>`
        : nothing}
    </div>`;
  }

  // -------------------------------------------------------------- hero

  private _hero(m: Model): TemplateResult | typeof nothing {
    const lang = languageOf(this.hass);
    const c = this._cfg;
    const total = m.minutes.total;
    const tiles: Array<[string, number | undefined]> = [
      [t(this.hass, "hero.library"), m.library.total],
      [t(this.hass, "hero.movies_seen"), m.moviesWatched],
      [t(this.hass, "hero.episodes"), m.episodesWatched],
    ];
    const visibleTiles = tiles.filter(([, v]) => v !== undefined) as Array<[string, number]>;
    if (total === undefined && visibleTiles.length === 0) return nothing;

    const fun = c.fun_stat && total !== undefined ? funStatText(this.hass, total, c.fun_stat_mode) : undefined;
    return html`<div>
      <div class="hero">
        ${total !== undefined
          ? html`<div class="hero-main">
              <div class="label">${t(this.hass, "hero.total")}</div>
              <div class="big">
                ${durationParts(total, c.duration_format, lang).map(
                  (p, i) =>
                    html`<span class="part"
                        ><span class="num ${i > 0 ? "second" : ""}">${p.value}</span>
                        <span class="unit">${t(this.hass, p.unit)}</span></span
                      >
                    `,
                )}
              </div>
              ${fun ? html`<div class="fun"><ha-icon icon="mdi:shimmer"></ha-icon><span>${fun}</span></div>` : nothing}
            </div>`
          : nothing}
        ${visibleTiles.length
          ? html`<div class="tiles">
              ${visibleTiles.map(
                ([label, value]) =>
                  html`<div class="tile">
                    <div class="label">${label}</div>
                    <div class="value">${fmtNumber(value, lang)}</div>
                  </div>`,
              )}
            </div>`
          : nothing}
      </div>
    </div>`;
  }

  // ----------------------------------------------------------- library

  private _library(m: Model): TemplateResult | typeof nothing {
    const lang = languageOf(this.hass);
    const lib = m.library;
    const COLORS: Record<string, string> = {
      completed: "var(--c-completed)",
      up_to_date: "var(--c-up-to-date)",
      in_progress: "var(--c-in-progress)",
      planned: "var(--c-watchlist)",
      on_hold: "var(--c-on-hold)",
      dropped: "var(--c-dropped)",
    };
    const LABELS: Record<string, string> = { planned: "status.watchlist" };
    const labelOf = (key: string): string => {
      const i18n = LABELS[key] ?? `status.${key}`;
      const known = t(this.hass, i18n);
      if (known !== i18n) return known;
      const words = key.replace(/_/g, " ");
      return words.charAt(0).toUpperCase() + words.slice(1);
    };
    // Every status Refract reports; without that data, the four known ones plus "Other".
    const statuses: Array<[string, number, string]> = lib.statuses
      ? lib.statuses.map((x): [string, number, string] => [labelOf(x.key), x.count, COLORS[x.key] ?? "var(--track)"])
      : (
          [
            ["status.completed", lib.completed, "var(--c-completed)"],
            ["status.up_to_date", lib.upToDate, "var(--c-up-to-date)"],
            ["status.in_progress", lib.inProgress, "var(--c-in-progress)"],
            ["status.watchlist", lib.watchlist, "var(--c-watchlist)"],
            ["status.other", lib.other && lib.other > 0 ? lib.other : undefined, "var(--track)"],
          ] as Array<[string, number | undefined, string]>
        )
          .filter(([, v]) => v !== undefined)
          .map(([k, v, color]): [string, number, string] => [t(this.hass, k), v as number, color]);
    if (!statuses.length) return nothing;

    const list = this._cfg.library_style === "list";
    const total = statuses.reduce((sum, [, v]) => sum + v, 0);
    const bar = html`<div
      class="status-bar ${list ? "spaced" : ""}"
      role="img"
      aria-label=${statuses.map(([label, v]) => `${label} ${v}`).join(", ")}
    >
      ${statuses.map(([, v, color]) => html`<span style="flex:${v} 1 0; background:${color}"></span>`)}
    </div>`;

    return html`<div class="panel library">
      <div class="label" style="margin-bottom:${list ? 12 : 10}px">${t(this.hass, "library.title")}</div>
      ${bar}
      ${list
        ? html`<div class="stat-list">
            ${statuses.map(
              ([label, v, color]) => html`<div class="stat-row">
                <span class="stat-dot" style="background:${color}"></span>
                <span class="stat-name">${label}</span>
                <b class="stat-count">${fmtNumber(v, lang)}</b>
                <span class="stat-pct">${total ? Math.round((v / total) * 100) : 0}%</span>
              </div>`,
            )}
          </div>`
        : html`<div class="status-legend">
            ${statuses.map(
              ([label, v, color]) =>
                html`<span><span class="swatch sm" style="background:${color}"></span>${label} ${fmtNumber(v, lang)}</span>`,
            )}
          </div>`}
    </div>`;
  }

  // ------------------------------------------------------------ streak

  private _timeZone(): string | undefined {
    return this.hass.locale?.time_zone === "server" ? this.hass.config?.time_zone : undefined;
  }

  private _hour12(): boolean | undefined {
    const format = this.hass.locale?.time_format;
    return format === "12" ? true : format === "24" ? false : undefined;
  }

  private _streak(m: Model): TemplateResult {
    const lang = languageOf(this.hass);
    const streak = m.streak!;
    const unit = t(this.hass, streak.current === 1 ? "unit.day" : "unit.days");
    const dots = streakDots({ now: new Date(), lastWatchedIso: m.last?.iso, current: streak.current, timeZone: this._timeZone(), lang });
    const foot =
      streak.current === 0
        ? t(this.hass, "streak.none")
        : [
            t(this.hass, "streak.longest", {
              n: streak.longest,
              unit: t(this.hass, streak.longest === 1 ? "unit.day" : "unit.days"),
            }),
            dots.stillTimeToday ? t(this.hass, "streak.still_time") : "",
          ]
            .filter(Boolean)
            .join(" · ");

    return html`<div class="panel streak">
      <div class="label">${t(this.hass, "streak.title")}</div>
      <div class="metric">${fmtNumber(streak.current, lang)} <span class="unit">${unit}</span></div>
      <div class="dots" role="img" aria-label="${streak.current} ${unit}">
        ${dots.days.map(
          (d) =>
            html`<div class="dot-col ${d.today ? "today" : ""}">
              <span class="dot ${d.filled ? "filled" : "open"} ${d.today ? "today" : ""}"></span>${d.label}
            </div>`,
        )}
      </div>
      <div class="streak-foot">${foot}</div>
    </div>`;
  }

  private _average(m: Model): TemplateResult | typeof nothing {
    const a = m.average;
    if (!a) return nothing;
    const lang = languageOf(this.hass);
    let value: TemplateResult;
    if (a.hours !== undefined) {
      value = html`${fmtNumber(a.hours, lang, 1)} <span class="unit">${t(this.hass, "unit.h")}</span>`;
    } else if (a.itemsPerWeek !== undefined) {
      value = html`${fmtNumber(a.itemsPerWeek, lang, 1)} <span class="unit">${t(this.hass, "avg.items_unit")}</span>`;
    } else {
      return nothing;
    }
    const pct = a.changePct;
    const trend =
      pct === null || pct === undefined
        ? nothing
        : html`<div class="trend ${pct > 0 ? "up" : pct < 0 ? "down" : ""}">
            ${pct > 0 ? "▲" : pct < 0 ? "▼" : "–"} ${Math.abs(pct)}% ${t(this.hass, "avg.vs_previous")}
          </div>`;
    return html`<div class="panel average">
      <div class="label">${t(this.hass, "avg.title")}</div>
      <div class="metric" title=${a.estimated && a.hours !== undefined ? t(this.hass, "avg.estimated") : ""}>
        ${a.hours !== undefined && a.estimated ? html`<span class="approx">~</span>` : nothing}${value}
      </div>
      <div class="avg-mid">
        ${a.hours !== undefined && a.itemsPerWeek !== undefined
          ? html`<div class="avg-items">
              ${a.itemsPerWeek === 1
                ? t(this.hass, "avg.items_line_one")
                : t(this.hass, "avg.items_line", { n: fmtNumber(a.itemsPerWeek, lang, 1) })}
            </div>`
          : nothing}
      </div>
      ${trend}
    </div>`;
  }

  private _last7(m: Model): TemplateResult | typeof nothing {
    const w = m.last7;
    if (!w) return nothing;
    const lang = languageOf(this.hass);
    const today = isoDay(new Date(), this._timeZone());
    const totals = w.days.map((d) => d.episodes + d.movies);
    const max = Math.max(1, ...totals);
    const SLOT = 84;
    const busiest = w.busiest ? weekdayName(w.busiest.date, lang, "long") : undefined;
    const aria = `${t(this.hass, "days7.episodes")} ${w.episodes}, ${t(this.hass, "days7.movies")} ${w.movies}`;

    return html`<div class="panel last7">
      <div class="panel-head">
        <span class="label">${t(this.hass, "days7.title")}</span>
        ${busiest ? html`<span class="badge accent">${t(this.hass, "days7.busiest", { day: busiest })}</span>` : nothing}
      </div>
      <div class="bars" role="img" aria-label=${aria}>
        ${w.days.map((d, i) => {
          const total = totals[i];
          const height = total === 0 ? 3 : Math.max(8, Math.round((total / max) * SLOT));
          return html`<div class="day ${d.date === today ? "today" : ""}">
            <div class="slot">
              ${d.episodes > 0 ? html`<span class="day-count">${fmtNumber(d.episodes, lang)}</span>` : nothing}
              <div class="bar ${total === 0 ? "empty" : ""}" style="height:${height}px">
                ${d.movies ? html`<span class="seg movies" style="flex:${d.movies} 1 0"></span>` : nothing}
                ${d.episodes ? html`<span class="seg shows" style="flex:${d.episodes} 1 0"></span>` : nothing}
              </div>
            </div>
            <span class="day-label">${weekdayName(d.date, lang, "narrow")}</span>
          </div>`;
        })}
      </div>
      <div class="legend-row">
        <span><span class="swatch" style="background:var(--c-shows)"></span>${t(this.hass, "days7.episodes")} <b>${fmtNumber(w.episodes, lang)}</b></span>
        <span><span class="swatch" style="background:var(--c-movies)"></span>${t(this.hass, "days7.movies")} <b>${fmtNumber(w.movies, lang)}</b></span>
      </div>
      ${w.episodes + w.movies === 0 ? html`<div class="empty">${t(this.hass, "days7.none")}</div>` : nothing}
    </div>`;
  }

  // -------------------------------------------------------- watch time

  private _watchTime(m: Model): TemplateResult | typeof nothing {
    const lang = languageOf(this.hass);
    const fmt = this._cfg.duration_format;
    const cats = [
      { key: "library.shows", minutes: m.minutes.shows, color: "var(--c-shows)" },
      { key: "library.movies", minutes: m.minutes.movies, color: "var(--c-movies)" },
      { key: "library.anime", minutes: m.minutes.anime, color: "var(--c-anime)" },
    ].filter((x) => x.minutes !== undefined) as Array<{ key: string; minutes: number; color: string }>;
    if (!cats.length) return nothing;
    const pct = shares(cats.map((x) => x.minutes));

    const list = this._cfg.watch_time_style === "list";
    return html`<div class="panel">
      <div class="label" style="margin-bottom:${list ? 12 : 8}px">${t(this.hass, "watch.title")}</div>
      <div
        class="stack ${list ? "spaced" : ""}"
        role="img"
        aria-label=${cats.map((x, i) => `${t(this.hass, x.key)} ${pct[i]}%`).join(", ")}
      >
        ${cats.map((x) => html`<span style="flex:${Math.max(x.minutes, 0)} 1 0; background:${x.color}"></span>`)}
      </div>
      ${list
        ? html`<div class="stat-list">
            ${cats.map(
              (x, i) => html`<div class="stat-row">
                <span class="stat-dot" style="background:${x.color}"></span>
                <span class="stat-name">${t(this.hass, x.key)}</span>
                <b class="stat-count">${durationText(x.minutes, fmt, lang)}</b>
                <span class="stat-pct">${pct[i]}%</span>
              </div>`,
            )}
          </div>`
        : html`<div class="watch-cols">
            ${cats.map(
              (x, i) =>
                html`<div class="watch-col">
                  <div class="row"><span class="swatch" style="background:${x.color}"></span>${t(this.hass, x.key)} (${pct[i]}%)</div>
                  <div class="value">${durationText(x.minutes, fmt, lang)}</div>
                </div>`,
            )}
          </div>`}
    </div>`;
  }

  // ---------------------------------------------------- still to finish

  private _finish(m: Model): TemplateResult | typeof nothing {
    const f = m.finish;
    if (!f) return nothing;
    const lang = languageOf(this.hass);
    const fmt = this._cfg.duration_format;
    const many = (key: string, n: number) => t(this.hass, n === 1 ? `${key}_one` : key, { n: fmtNumber(n, lang) });
    const timeOf = (minutes?: number) => (minutes === undefined ? "" : durationText(minutes, fmt, lang));

    const rows = [
      { key: "finish.movies", group: f.movies, color: "var(--c-movies)" },
      { key: "finish.shows", group: f.shows, color: "var(--c-shows)" },
      { key: "finish.anime", group: f.anime, color: "var(--c-anime)" },
    ].filter((r) => r.group.count > 0);

    const total = f.minutes;
    return html`<div class="panel finish">
      <div class="label">${t(this.hass, "finish.title")}</div>
      ${rows.length
        ? html`${total !== undefined && total > 0
              ? html`<div class="big finish-big">
                    ${durationParts(total, fmt, lang).map(
                      (p, i) =>
                        html`<span class="part"
                            ><span class="num ${i > 0 ? "second" : ""}">${p.value}</span>
                            <span class="unit">${t(this.hass, p.unit)}</span></span
                          >
                        `,
                    )}
                  </div>`
              : nothing}
            <div class="finish-rows">
              ${rows.map((r) => {
                const g = r.group;
                return html`<div class="finish-row">
                  <div class="finish-name">${many(r.key, g.count)}</div>
                  ${g.minutes !== undefined && g.minutes > 0
                    ? html`<span class="finish-time" style="color:${r.color}">${timeOf(g.minutes)}</span>`
                    : nothing}
                </div>`;
              })}
            </div>`
        : html`<div class="empty">${t(this.hass, "finish.none")}</div>`}
    </div>`;
  }

  // ----------------------------------------------------------- next up

  private _poster(url: string | undefined, title: string, size: "lg" | "sm"): TemplateResult {
    const initial = (title.trim()[0] ?? "?").toUpperCase();
    // The initial sits underneath, so it shows when there's no poster or the image fails to load.
    return html`<div class="poster ${size}" aria-hidden="true">
      <span>${initial}</span>
      ${url
        ? html`<img
            src=${url}
            alt=""
            loading="lazy"
            referrerpolicy="no-referrer"
            @error=${(e: Event) => ((e.target as HTMLImageElement).style.display = "none")}
          />`
        : nothing}
    </div>`;
  }

  /** The catch-up show picked to replace the default next up, if it still has an episode to mark. */
  private _pickedShow(m: Model): CatchupShow | undefined {
    if (!this._selected) return undefined;
    const picked = m.catchup?.shows.find((x) => showKey(x) === this._selected && x.next);
    const defaultKey = m.next.kind === "item" ? showKey(m.next.item) : undefined;
    if (!picked || !this._cfg.show_next_up || showKey(picked) === defaultKey) {
      this._selected = undefined; // finished, hidden or already the default: go back to normal
      return undefined;
    }
    return picked;
  }

  private _selectShow(x: CatchupShow, defaultKey?: string): void {
    if (!x.next) return;
    const key = showKey(x);
    // Tapping the show the tile started with, or the one already shown, goes back to the default.
    this._selected = key === defaultKey || this._selected === key ? undefined : key;
    this._clearAction();
    this.requestUpdate();
    if (this._selected) {
      void this.updateComplete.then(() => {
        const tile = this.renderRoot.querySelector(".panel.next") as HTMLElement | null;
        tile?.scrollIntoView?.({ block: "nearest", behavior: "smooth" });
      });
    }
  }

  private _clearAction(): void {
    window.clearTimeout(this._actionTimer);
    this._actionState = "idle";
    this._actionError = "";
    this._actionTarget = "";
  }

  private _next(m: Model, posters: boolean): TemplateResult | typeof nothing {
    const picked = this._pickedShow(m);
    const nextUp = picked ? ({ kind: "item", item: picked.next! } as const) : m.next;
    if (nextUp.kind === "hidden") return nothing;
    if (nextUp.kind === "empty") {
      return html`<div class="panel next">
        <div class="label">${t(this.hass, "next.title")}</div>
        <div class="empty">${t(this.hass, "empty.nothing_up_next")}</div>
      </div>`;
    }
    const item = nextUp.item;
    const lang = languageOf(this.hass);
    const episode = item.season !== undefined && item.number !== undefined ? `S${item.season} E${item.number}` : "";
    const sub = [episode, item.episodeName].filter(Boolean).join(" · ");
    const aired = item.airedEpisodes;
    const watched = aired !== undefined && item.remaining !== undefined ? Math.max(0, aired - item.remaining) : undefined;
    const pct = aired && watched !== undefined ? Math.min(100, (watched / aired) * 100) : undefined;

    return html`<div class="panel next ${posters ? "with-poster" : ""}">
      ${posters ? this._poster(item.posterUrl, item.title, "lg") : nothing}
      <div class="next-body">
        <div class="next-head">
          <span class="label">${t(this.hass, "next.title")}</span>
          ${item.isAnime ? html`<span class="badge">${t(this.hass, "badge.anime")}</span>` : nothing} ${this._badge(item)}
        </div>
        <div class="next-main">
          <div>
            <div class="next-title">
              <span>${item.title}</span>
              ${item.year ? html`<span class="year">${item.year}</span>` : nothing}
            </div>
            ${sub ? html`<div class="next-ep">${sub}</div>` : nothing}
          </div>
          ${this._actionButton(item)}
        </div>
        ${pct !== undefined
          ? html`<div class="progress" role="img" aria-label="${watched} / ${aired}"><span style="width:${pct}%"></span></div>
              <div class="next-foot">
                <span>${t(this.hass, "next.progress", { watched: fmtNumber(watched!, lang), aired: fmtNumber(aired!, lang) })}</span>
                ${item.remaining !== undefined
                  ? html`<span>${t(this.hass, "next.remaining", { n: fmtNumber(item.remaining, lang) })}</span>`
                  : nothing}
              </div>`
          : nothing}
      </div>
    </div>`;
  }

  private _badge(item: ShowItem): TemplateResult | typeof nothing {
    if (!item.aired) return html`<span class="badge">${t(this.hass, "badge.not_aired")}</span>`;
    if (item.premiere) return html`<span class="badge accent">${t(this.hass, "badge.premiere")}</span>`;
    if (item.finale) return html`<span class="badge warn">${t(this.hass, "badge.finale")}</span>`;
    if (item.midFinale) return html`<span class="badge warn">${t(this.hass, "badge.mid_finale")}</span>`;
    return nothing;
  }

  // ------------------------------------------------------ mark watched

  private _canMarkWatched(item: ShowItem): boolean {
    return (
      this._cfg.show_actions &&
      !!this.hass.services?.[DOMAIN]?.mark_episode_watched &&
      item.aired &&
      item.season !== undefined &&
      item.number !== undefined &&
      (item.tmdbId !== undefined || !!item.refractId)
    );
  }

  private _actionButton(item: ShowItem): TemplateResult | typeof nothing {
    if (!this._canMarkWatched(item)) return nothing;
    const s = this._actionState;
    const icon = { idle: "mdi:check", confirm: "mdi:help-circle-outline", busy: "mdi:loading", done: "mdi:check-circle", error: "mdi:alert-circle-outline" }[s];
    const label = {
      idle: "next.mark",
      confirm: "next.confirm",
      busy: "next.busy",
      done: "next.done",
      error: "next.error",
    }[s];
    return html`<button class="action" data-state=${s} title=${this._actionError} @click=${() => this._markWatched(item)}>
      <ha-icon icon=${icon}></ha-icon>${t(this.hass, label)}
    </button>`;
  }

  private _resetActionLater(ms: number): void {
    window.clearTimeout(this._actionTimer);
    this._actionTimer = window.setTimeout(() => {
      this._actionState = "idle";
      this._actionError = "";
    }, ms);
  }

  private async _configEntryId(): Promise<string | undefined> {
    if (this._cfg.config_entry_id) return this._cfg.config_entry_id;
    const anchor = this._discovery().entities.next_up ?? this._cfg.entity;
    if (!anchor) return undefined;
    try {
      const entry = await this.hass.callWS<{ config_entry_id?: string }>({ type: "config/entity_registry/get", entity_id: anchor });
      return entry?.config_entry_id;
    } catch {
      return undefined; // non-admin users can't read the registry; the service works without it for a single account
    }
  }

  private async _markWatched(item: ShowItem): Promise<void> {
    if (this._actionState === "busy") return;
    const target = `${showKey(item)}:${item.season}:${item.number}`;
    if (this._cfg.confirm_actions && (this._actionState !== "confirm" || this._actionTarget !== target)) {
      this._actionTarget = target;
      this._actionState = "confirm";
      this._resetActionLater(3000);
      return;
    }
    window.clearTimeout(this._actionTimer);
    this._actionState = "busy";
    try {
      const data: Record<string, unknown> = { season: item.season, number: item.number };
      if (item.tmdbId !== undefined) data.tmdb_id = item.tmdbId;
      else data.refract_id = item.refractId;
      const entryId = await this._configEntryId();
      if (entryId) data.config_entry_id = entryId;
      await this.hass.callService(DOMAIN, "mark_episode_watched", data);
      this._actionState = "done";
      this._resetActionLater(2500);
      this._refreshSensors();
    } catch (err) {
      this._actionError = err instanceof Error ? err.message : String(err);
      this._actionState = "error";
      this._resetActionLater(4000);
    }
  }

  /** Ask HA to poll Refract again instead of waiting for the next scheduled update. */
  private _refreshSensors(): void {
    const e = this._discovery().entities;
    const ids = [e.next_up, e.shows_waiting, e.catch_up, e.last_7_days, e.average_per_week, e.last_watched, e.stats_streak_current_days].filter(Boolean) as string[];
    if (!ids.length) return;
    this.hass.callService("homeassistant", "update_entity", { entity_id: ids }).catch(() => undefined);
  }

  // ----------------------------------------------------------- catch-up

  private _catchup(m: Model, posters: boolean): TemplateResult | typeof nothing {
    const c = m.catchup;
    if (!c) return nothing;
    const lang = languageOf(this.hass);
    const limit = this._cfg.queue_length;
    const expandable = c.shows.length > limit;
    const rows = this._catchupExpanded ? c.shows : c.shows.slice(0, limit);
    const max = Math.max(1, ...c.shows.map((x) => x.remaining));
    const defaultKey = m.next.kind === "item" ? showKey(m.next.item) : undefined;
    const about =
      c.minutes !== undefined && c.total > 0
        ? `, ${t(this.hass, "catchup.about", { time: durationText(c.minutes, this._cfg.duration_format, lang) })}`
        : "";

    return html`<div class="panel catchup">
      <div class="panel-head">
        <span class="label">${t(this.hass, "catchup.title")}</span>
      </div>
      ${c.total > 0
        ? html`<div class="catch-line">
            <span class="metric">${fmtNumber(c.total, lang)}</span>
            <span class="muted">${t(this.hass, "catchup.waiting")}${about}</span>
          </div>`
        : html`<div class="empty">${t(this.hass, "catchup.none")}</div>`}
      ${rows.map((x) => this._catchupRow(x, max, posters, lang, defaultKey))}
      ${expandable
        ? html`<button class="link" @click=${() => (this._catchupExpanded = !this._catchupExpanded)}>
            ${this._catchupExpanded
              ? t(this.hass, "catchup.show_less")
              : t(this.hass, "catchup.show_all", { n: fmtNumber(c.shows.length, lang) })}
          </button>`
        : nothing}
    </div>`;
  }

  private _catchupRow(x: CatchupShow, max: number, posters: boolean, lang: string, defaultKey?: string): TemplateResult {
    const key = showKey(x);
    // The default show is already in the Next up tile, so it only becomes tappable (to go back to it)
    // while another show has taken over the tile.
    const pickable = this._cfg.show_next_up && !!x.next && (key !== defaultKey || this._selected !== undefined);
    const selected = pickable && this._selected === key;
    const body = html`${posters ? this._poster(x.posterUrl, x.title, "sm") : nothing}
      <span class="c-name" title=${x.title}>${x.title}</span>
      <div class="progress" role="img" aria-label="${x.remaining}"><span style="width:${(x.remaining / max) * 100}%"></span></div>
      <b class="c-count">${fmtNumber(x.remaining, lang)}</b>`;
    if (!pickable) return html`<div class="c-row">${body}</div>`;
    return html`<div
      class="c-row pickable ${selected ? "selected" : ""}"
      role="button"
      tabindex="0"
      aria-pressed=${selected ? "true" : "false"}
      title=${t(this.hass, "catchup.pick", { title: x.title })}
      @click=${() => this._selectShow(x, defaultKey)}
      @keydown=${(ev: KeyboardEvent) => {
        if (ev.key === "Enter" || ev.key === " ") {
          ev.preventDefault();
          this._selectShow(x, defaultKey);
        }
      }}
    >
      ${body}
    </div>`;
  }

  // ------------------------------------------------------------- airing

  private _airing(m: Model): TemplateResult | typeof nothing {
    const items = m.airing;
    if (!items) return nothing;
    const lang = languageOf(this.hass);
    const today = isoDay(new Date(), this._timeZone());
    const limit = this._cfg.airing_length;
    const expandable = items.length > limit;
    const rows = this._airingExpanded ? items : items.slice(0, limit);

    return html`<div class="panel airing">
      <div class="panel-head"><span class="label">${t(this.hass, "airing.title")}</span></div>
      ${rows.length
        ? rows.map((x) => {
            const ep = x.season !== undefined && x.number !== undefined ? `S${x.season} · E${x.number}` : "";
            const time = x.airAt ? timeOfDay(x.airAt, lang, this._timeZone(), this._hour12()) : undefined;
            return html`<div class="a-row">
              <span class="a-day ${x.date === today ? "today" : ""}">${x.date === today ? t(this.hass, "airing.today") : weekdayName(x.date, lang, "short")}</span>
              <span class="swatch" style="background:${x.isAnime ? "var(--c-anime)" : "var(--c-shows)"}"></span>
              <span class="a-name"><b>${x.show}</b>${ep ? html` <span class="muted">${ep}</span>` : nothing}</span>
              ${x.premiere
                ? html`<span class="badge accent">${t(this.hass, "badge.premiere")}</span>`
                : x.finale
                  ? html`<span class="badge warn">${t(this.hass, "badge.finale")}</span>`
                  : nothing}
              ${time ? html`<span class="a-time">${time}</span>` : nothing}
            </div>`;
          })
        : html`<div class="empty">${t(this.hass, "airing.none")}</div>`}
      ${expandable
        ? html`<button class="link" @click=${() => (this._airingExpanded = !this._airingExpanded)}>
            ${this._airingExpanded
              ? t(this.hass, "airing.show_less")
              : t(this.hass, "airing.show_all", { n: fmtNumber(items.length, lang) })}
          </button>`
        : nothing}
    </div>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "refract-stats-card": RefractStatsCard;
  }
}
