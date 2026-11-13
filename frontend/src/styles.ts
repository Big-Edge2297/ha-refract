import { css } from "lit";

export const cardStyles = css`
  :host {
    display: block;
  }
  ha-card {
    --c-movies: var(--refract-color-movies, #2a78d6);
    --c-shows: var(--refract-color-shows, #eb6834);
    --c-anime: var(--refract-color-anime, #1baf7a);
    --c-accent: var(--refract-color-accent, #6250d6);
    --c-completed: var(--refract-color-completed, #6c5ce7);
    --c-up-to-date: var(--refract-color-up-to-date, #1dbf73);
    --c-watchlist: var(--refract-color-watchlist, #3b9ae1);
    --c-in-progress: var(--refract-color-in-progress, #f6c453);
    --c-on-hold: var(--refract-color-on-hold, #e57256);
    --c-dropped: var(--refract-color-dropped, #d9393a);
    --track: var(--divider-color, rgba(127, 127, 127, 0.3));
    --tile-bg: var(--refract-tile-background, var(--secondary-background-color, rgba(127, 127, 127, 0.12)));
    --hero-font: var(--refract-hero-font, "Iowan Old Style", "Palatino Linotype", Palatino, Georgia, serif);
    padding: 16px;
    display: flex;
    flex-direction: column;
    gap: 16px;
    container-type: inline-size;
    overflow: hidden;
    color: var(--primary-text-color);
  }
  .muted {
    color: var(--secondary-text-color);
  }
  .label {
    font-size: 12px;
    color: var(--secondary-text-color);
  }
  button {
    font: inherit;
    color: inherit;
  }

  /* header */
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 12px;
  }
  .brand {
    display: flex;
    align-items: center;
    gap: 8px;
    min-width: 0;
  }
  .brand ha-icon {
    --mdc-icon-size: 20px;
    color: var(--c-accent);
    flex: none;
  }
  .brand .name {
    font-size: 16px;
    font-weight: 500;
  }
  .brand .sub {
    font-size: 12px;
    color: var(--secondary-text-color);
  }
  .last {
    font-size: 12px;
    color: var(--secondary-text-color);
    text-align: right;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    min-width: 0;
  }

  /* hero */
  .hero {
    display: flex;
    flex-wrap: wrap;
    gap: 14px 20px;
    align-items: flex-end;
  }
  .hero-main {
    flex: 1 1 200px;
  }
  .big {
    display: flex;
    align-items: baseline;
    flex-wrap: wrap;
    gap: 0 12px;
  }
  .big .part {
    display: flex;
    align-items: baseline;
    gap: 6px;
  }
  .big .num {
    font-family: var(--hero-font);
    font-size: 52px;
    line-height: 1.1;
    font-variant-numeric: tabular-nums lining-nums;
  }
  .big .num.second {
    font-size: 30px;
  }
  .big .unit {
    font-size: 14px;
    color: var(--secondary-text-color);
  }
  .tiles {
    display: flex;
    gap: 8px;
    flex: 1 1 240px;
  }
  .tile {
    flex: 1;
    min-width: 0;
    background: var(--tile-bg);
    border-radius: 8px;
    padding: 10px;
  }
  .tile .value {
    font-size: 20px;
    font-weight: 500;
    font-variant-numeric: tabular-nums;
  }
  /* most watched */
  .panel.picks {
    container-type: inline-size;
    container-name: picks;
  }
  .picks-grid {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 12px 14px;
  }
  /* narrow cards (phones): the same two columns, with smaller tiles */
  @container picks (max-width: 400px) {
    .panel.picks .picks-grid {
      gap: 10px 10px;
    }
    .panel.picks .pick {
      gap: 7px;
    }
    .panel.picks .pick-avatar {
      width: 36px;
      height: 36px;
      --mdc-icon-size: 18px;
    }
    .panel.picks .pick-avatar .flag {
      font-size: 20px;
    }
    .panel.picks .pick-avatar .initials {
      font-size: 12px;
    }
    .panel.picks .pick-label,
    .panel.picks .pick-sub {
      font-size: 10.5px;
    }
    .panel.picks .pick-name {
      font-size: 13px;
    }
    .panel.picks .pick-chevron {
      --mdc-icon-size: 16px;
    }
    .panel.picks .pick-avatar.small {
      width: 28px;
      height: 28px;
    }
  }
  .picks-grid {
    align-items: start;
  }
  .pick-cell {
    min-width: 0;
  }
  .pick {
    display: flex;
    align-items: center;
    gap: 10px;
    min-width: 0;
    width: 100%;
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    border: 0;
    background: none;
    color: inherit;
    font: inherit;
    text-align: start;
  }
  button.pick {
    cursor: pointer;
    border-radius: 12px;
  }
  button.pick:focus-visible {
    outline: 2px solid var(--c-accent);
    outline-offset: 2px;
  }
  .pick-chevron {
    flex: none;
    margin: -3px 0;
    color: var(--secondary-text-color);
    --mdc-icon-size: 18px;
  }
  .pick-runners {
    list-style: none;
    margin: 8px 0 0;
    padding: 0 0 0 4px;
    display: flex;
    flex-direction: column;
    gap: 8px;
  }
  .pick-runners li {
    display: flex;
    align-items: center;
    gap: 8px;
    min-width: 0;
  }
  .pick-runners .pick-name {
    font-size: 13px;
  }
  .pick-rank {
    flex: none;
    width: 14px;
    text-align: center;
    font-size: 12px;
    color: var(--secondary-text-color);
  }
  .pick-avatar.small {
    width: 32px;
    height: 32px;
    --mdc-icon-size: 18px;
  }
  .pick-avatar.small .flag {
    font-size: 18px;
  }
  .pick-avatar.small .initials {
    font-size: 11px;
  }
  .picks-progress {
    margin-top: 12px;
    height: 6px;
    border-radius: 3px;
    background: color-mix(in srgb, var(--c-accent) 18%, transparent);
    overflow: hidden;
  }
  .picks-progress > span {
    display: block;
    height: 100%;
    border-radius: 3px;
    background: var(--c-accent);
    transition: width 0.4s ease;
  }
  .pick-avatar {
    flex: none;
    display: grid;
    place-items: center;
    width: 48px;
    height: 48px;
    border-radius: 50%;
    overflow: hidden;
    background: color-mix(in srgb, var(--c-accent) 16%, transparent);
    color: var(--c-accent);
    --mdc-icon-size: 24px;
  }
  .pick-avatar img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  .pick-avatar .flag {
    font-family: "Twemoji Country Flags", "Apple Color Emoji", "Segoe UI Emoji", "Noto Color Emoji", sans-serif;
    font-size: 26px;
    line-height: 1;
  }
  .pick-avatar .initials {
    font-size: 15px;
    font-weight: 600;
  }
  .pick-text {
    display: flex;
    flex-direction: column;
    min-width: 0;
    line-height: 1.3;
  }
  .pick-label {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 4px;
    font-size: 12px;
    color: var(--secondary-text-color);
  }
  .pick-name {
    font-size: 15px;
    font-weight: 600;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .pick-sub {
    font-size: 12px;
    color: var(--secondary-text-color);
    font-variant-numeric: tabular-nums;
  }
  /* monthly wrap */
  .wrap-nav {
    display: inline-flex;
    gap: 4px;
  }
  .wrap-arrow {
    display: grid;
    place-items: center;
    width: 32px;
    height: 32px;
    padding: 0;
    border: 0;
    border-radius: 50%;
    background: var(--tile-bg);
    color: var(--primary-text-color);
    cursor: pointer;
    --mdc-icon-size: 20px;
  }
  .wrap-arrow:disabled {
    opacity: 0.35;
    cursor: default;
  }
  .wrap-arrow:focus-visible,
  .wrap-tab:focus-visible {
    outline: 2px solid var(--c-accent);
    outline-offset: 2px;
  }
  .wrap-month {
    font-size: 22px;
    font-weight: 600;
    line-height: 1.2;
  }
  .wrap-tabs {
    display: flex;
    gap: 6px;
    margin: 12px 0;
    overflow-x: auto;
  }
  .wrap-tab {
    flex: none;
    padding: 5px 12px;
    border: 0;
    border-radius: 14px;
    background: var(--tile-bg);
    color: var(--secondary-text-color);
    font: inherit;
    font-size: 13px;
    cursor: pointer;
  }
  .wrap-tab.active {
    background: color-mix(in srgb, var(--c-accent) 18%, transparent);
    color: var(--c-accent);
    font-weight: 600;
  }
  .wrap-hero {
    display: flex;
    flex-wrap: wrap;
    align-items: baseline;
    gap: 6px 10px;
    margin-bottom: 10px;
  }
  .wrap-hours {
    font-size: 40px;
    font-weight: 500;
    line-height: 1;
    font-variant-numeric: tabular-nums;
  }
  .wrap-unit {
    color: var(--secondary-text-color);
  }
  .wrap-tiles {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(72px, 1fr));
    gap: 8px;
    margin-top: 8px;
  }
  .wrap-tiles.two {
    grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
  }
  .wrap-section {
    margin: 14px 0 6px;
    font-size: 12px;
    letter-spacing: 0.04em;
    text-transform: uppercase;
    color: var(--secondary-text-color);
  }
  .wrap-split {
    display: flex;
    height: 14px;
    gap: 2px;
    border-radius: 7px;
    overflow: hidden;
  }
  .wrap-genres {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }
  .wrap-genre {
    display: grid;
    grid-template-columns: minmax(90px, 36%) 1fr auto;
    align-items: center;
    gap: 10px;
  }
  .wrap-genre-name {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .wrap-genre-bar {
    height: 8px;
    border-radius: 4px;
    background: var(--tile-bg);
    overflow: hidden;
  }
  .wrap-genre-bar > span {
    display: block;
    height: 100%;
    border-radius: 4px;
    background: var(--c-accent);
  }
  .wrap-days {
    display: flex;
    align-items: flex-end;
    gap: 2px;
    height: 90px;
  }
  .wrap-day {
    flex: 1 1 0;
    min-width: 2px;
    border-radius: 2px;
    background: var(--c-shows);
  }
  .wrap-day.empty {
    background: var(--tile-bg);
  }
  .wrap-day.peak {
    background: var(--c-accent);
  }
  .wrap-axis {
    display: flex;
    justify-content: space-between;
    margin-top: 2px;
    font-size: 11px;
    color: var(--secondary-text-color);
  }
  .wrap-top {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }
  .wrap-top-row {
    display: flex;
    align-items: center;
    gap: 10px;
    min-width: 0;
  }
  .wrap-top-row img,
  .wrap-noposter {
    flex: none;
    width: 40px;
    height: 58px;
    border-radius: 6px;
    object-fit: cover;
    background: var(--tile-bg);
  }
  .wrap-noposter {
    display: grid;
    place-items: center;
    color: var(--secondary-text-color);
  }
  /* single-section cards */
  ha-card.single {
    padding: 14px;
  }
  ha-card.single > .panel,
  ha-card.single > .next {
    flex: none;
    border: 0;
    padding: 0;
    background: none;
  }
  .single-title {
    margin-bottom: 8px;
    font-size: 16px;
    font-weight: 500;
  }
  ha-card.single-monthly_wrap:has(.wrap-pages) {
    padding: 0;
    overflow: hidden;
  }
  ha-card.single-monthly_wrap:has(.wrap-pages) > .single-title {
    padding: 14px 16px 0;
  }
  ha-card.single-monthly_wrap .wrap-pages {
    border-radius: 0;
  }

  /* monthly wrap as app-style pages */
  .wrap-pages {
    --p1: #7b68ee;
    --p2: #5b46dc;
    --p3: #231d52;
    position: relative;
    display: flex;
    flex-direction: column;
    min-height: 560px;
    padding: 14px 16px 18px;
    border: 0;
    border-radius: 20px;
    overflow: hidden;
    color: #fff;
    background: linear-gradient(180deg, var(--p1) 0%, var(--p2) 52%, var(--p3) 100%);
    touch-action: pan-y;
    user-select: none;
    outline: none;
  }
  .wrap-pages:focus-visible {
    box-shadow: inset 0 0 0 2px rgba(255, 255, 255, 0.75);
  }
  .wrap-pages.page-tastes {
    --p1: #ec4899;
    --p2: #b8307a;
    --p3: #3a1730;
  }
  .wrap-pages.page-patterns {
    --p1: #22b8d8;
    --p2: #0f7f9c;
    --p3: #11333f;
  }
  .wrap-pages.page-moments {
    --p1: #f5a623;
    --p2: #b7761a;
    --p3: #35250f;
  }
  .wrap-pages .muted,
  .wrap-pages .pick-sub,
  .wrap-pages .pick-label,
  .wrap-pages .picks-foot,
  .wrap-pages .wrap-section,
  .wrap-pages .empty {
    color: rgba(255, 255, 255, 0.74);
  }
  .wrap-progress {
    display: flex;
    gap: 5px;
    margin-bottom: 14px;
    position: relative;
    z-index: 3;
  }
  .wrap-seg {
    flex: 1;
    height: 4px;
    padding: 0;
    border: 0;
    border-radius: 2px;
    background: rgba(255, 255, 255, 0.3);
    cursor: pointer;
  }
  .wrap-seg.done {
    background: #fff;
  }
  .wrap-brand {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 14px;
    font-weight: 600;
    position: relative;
    z-index: 3;
  }
  .wrap-brand-name {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    --mdc-icon-size: 22px;
  }
  .wrap-brand-user {
    font-weight: 400;
    color: rgba(255, 255, 255, 0.8);
  }
  .wrap-kicker-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: relative;
    z-index: 3;
  }
  .wrap-kicker {
    font-size: 12px;
    font-weight: 600;
    letter-spacing: 0.22em;
    text-transform: uppercase;
    color: rgba(255, 255, 255, 0.82);
  }
  .wrap-pages .wrap-arrow {
    background: rgba(255, 255, 255, 0.18);
    color: #fff;
  }
  .wrap-title {
    margin: 4px 0 12px;
    font-size: 30px;
    font-weight: 700;
    line-height: 1.1;
    letter-spacing: -0.01em;
  }
  .wrap-insight {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 8px;
    padding: 12px 14px;
    border: 1px solid rgba(255, 255, 255, 0.22);
    border-radius: 14px;
    background: rgba(255, 255, 255, 0.14);
    font-size: 15px;
    --mdc-icon-size: 22px;
  }
  .wrap-insight ha-icon {
    flex: none;
    color: #ffd25e;
  }
  .wrap-body {
    position: relative;
    z-index: 1;
    flex: 1;
    display: flex;
    flex-direction: column;
  }
  .wrap-pages .wrap-hero {
    flex: 1;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 6px;
    margin: 0;
    padding: 8px 0 14px;
    text-align: center;
  }
  .wrap-pages .tile {
    background: rgba(255, 255, 255, 0.14);
    border: 1px solid rgba(255, 255, 255, 0.2);
    color: #fff;
  }
  .wrap-pages .value {
    color: #fff;
  }
  .wrap-pages .badge,
  .wrap-pages .badge.accent {
    background: rgba(255, 255, 255, 0.2);
    color: #fff;
  }
  .wrap-pages .wrap-hours {
    font-size: 84px;
    font-weight: 700;
    line-height: 1;
  }
  .wrap-pages .wrap-unit {
    font-size: 14px;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: rgba(255, 255, 255, 0.78);
  }
  .wrap-pages .wrap-genre-bar {
    background: rgba(255, 255, 255, 0.2);
  }
  .wrap-pages .wrap-genre-bar > span {
    background: #f4e9ee;
  }
  .wrap-pages .wrap-day {
    background: rgba(255, 255, 255, 0.88);
  }
  .wrap-pages .wrap-day.empty {
    background: rgba(255, 255, 255, 0.16);
  }
  .wrap-pages .wrap-day.peak {
    background: #ffc83d;
  }
  .wrap-pages .wrap-axis {
    color: rgba(255, 255, 255, 0.7);
  }
  .wrap-pages .swatch {
    box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.35);
  }
  .wrap-pages .wrap-top-row {
    padding: 8px;
    border: 1px solid rgba(255, 255, 255, 0.18);
    border-radius: 14px;
    background: rgba(255, 255, 255, 0.12);
  }
  .wrap-pages .wrap-noposter {
    background: rgba(255, 255, 255, 0.18);
    color: #fff;
  }
  .wrap-pages .pick-avatar {
    background: rgba(255, 255, 255, 0.2);
    color: #fff;
  }
  .wrap-tap {
    position: absolute;
    top: 150px;
    bottom: 0;
    z-index: 2;
    width: 28%;
    padding: 0;
    border: 0;
    background: none;
    cursor: pointer;
    -webkit-tap-highlight-color: transparent;
  }
  .wrap-tap[hidden] {
    display: none;
  }
  .wrap-tap.prev {
    left: 0;
  }
  .wrap-tap.next {
    right: 0;
  }
  .picks-foot {
    margin-top: 12px;
    font-size: 12px;
    color: var(--secondary-text-color);
  }
  .picks-foot a {
    color: inherit;
  }
  .fun {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    margin-top: 12px;
    padding: 8px 12px;
    border-radius: 12px;
    font-size: 14px;
    font-weight: 500;
    line-height: 1.35;
    background: color-mix(in srgb, var(--c-accent) 14%, transparent);
    color: var(--primary-text-color);
  }
  .fun ha-icon {
    --mdc-icon-size: 18px;
    flex: none;
    color: var(--c-accent);
  }

  /* panels */
  .grid {
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
  }
  .panel {
    border: 1px solid var(--divider-color);
    border-radius: 12px;
    padding: 14px;
    min-width: 0;
  }
  .panel.streak,
  .panel.average {
    flex: 1 1 190px;
    display: flex;
    flex-direction: column;
    gap: 6px;
  }
  .metric {
    font-size: 32px;
    font-weight: 600;
    line-height: 1.15;
    font-variant-numeric: tabular-nums;
  }
  .metric .unit {
    font-size: 15px;
    font-weight: 400;
    color: var(--secondary-text-color);
  }
  .metric .approx {
    font-weight: 400;
    color: var(--secondary-text-color);
    margin-right: 2px;
  }
  .avg-mid {
    flex: 1;
    display: flex;
    align-items: center;
  }
  .avg-items {
    font-size: 13px;
    color: var(--secondary-text-color);
  }
  /* sits on the bottom row, level with the streak's "Longest: ..." line */
  .trend {
    font-size: 12px;
    line-height: 1.4;
    font-weight: 500;
    color: var(--secondary-text-color);
  }
  .trend.up {
    color: var(--success-color, #1b8a5a);
  }
  .trend.down {
    color: var(--error-color, #db4437);
  }
  .panel-head {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    margin-bottom: 8px;
  }
  .swatch {
    width: 10px;
    height: 10px;
    border-radius: 2px;
    flex: none;
  }
  .swatch.sm {
    width: 8px;
    height: 8px;
  }
  .legend-row span,
  .status-legend span {
    display: flex;
    align-items: center;
    gap: 6px;
  }
  svg .track {
    stroke: var(--track);
  }
  .status-bar,
  .stack {
    display: flex;
    gap: 2px;
    border-radius: 4px;
    overflow: hidden;
  }
  .status-bar {
    height: 12px;
    border-radius: 6px;
  }
  .stack {
    height: 14px;
  }
  .status-bar > span,
  .stack > span {
    min-width: 3px;
  }
  .status-legend {
    display: flex;
    flex-wrap: wrap;
    gap: 6px 14px;
    margin-top: 10px;
    font-size: 12px;
    color: var(--secondary-text-color);
  }

  /* breakdown lists (library_style / watch_time_style: list) */
  .status-bar.spaced,
  .stack.spaced {
    margin-bottom: 6px;
  }
  .stat-row {
    display: grid;
    grid-template-columns: 10px 1fr auto 3.2em;
    align-items: center;
    column-gap: 12px;
    padding: 9px 0;
    font-size: 15px;
  }
  .stat-dot {
    width: 10px;
    height: 10px;
    border-radius: 50%;
  }
  .stat-count {
    font-variant-numeric: tabular-nums;
    text-align: right;
  }
  .stat-pct {
    text-align: right;
    font-size: 13px;
    color: var(--secondary-text-color);
    font-variant-numeric: tabular-nums;
  }

  /* streak */
  .streak-foot {
    font-size: 12px;
    line-height: 1.4;
    color: var(--secondary-text-color);
  }
  .dots {
    display: flex;
    gap: 8px;
    margin: 6px 0 4px;
  }
  .dot-col {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 4px;
    font-size: 11px;
    color: var(--secondary-text-color);
  }
  .dot-col.today {
    color: var(--primary-text-color);
    font-weight: 500;
  }
  .dot {
    width: 20px;
    height: 20px;
    box-sizing: border-box;
    border-radius: 50%;
    border: 2px solid var(--track);
  }
  .dot.filled {
    background: var(--c-accent);
    border-color: var(--c-accent);
  }
  .dot.open.today {
    border-style: dashed;
    border-color: var(--secondary-text-color);
  }

  /* still to finish */
  /* the total reuses the hero's .big numbers unchanged, so it looks exactly like Total watch time */
  .finish-big {
    margin-top: 4px;
  }
  .finish-rows {
    margin-top: 10px;
  }
  .finish-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    padding: 10px 0;
  }
  .finish-row + .finish-row {
    border-top: 1px solid var(--divider-color);
  }
  .finish-name {
    font-size: 15px;
  }
  .finish-time {
    flex: none;
    font-size: 15px;
    font-weight: 600;
    font-variant-numeric: tabular-nums;
  }

  /* watch time */
  .watch-cols {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    margin-top: 10px;
  }
  .watch-col {
    flex: 1 1 110px;
    min-width: 0;
  }
  .watch-col .row {
    display: flex;
    align-items: center;
    gap: 6px;
    font-size: 12px;
    color: var(--secondary-text-color);
  }
  .watch-col .value {
    font-size: 15px;
    font-weight: 500;
    font-variant-numeric: tabular-nums;
  }

  /* next up */
  .panel.next {
    border-color: var(--c-accent);
    display: flex;
    gap: 14px;
  }
  .next-body {
    flex: 1;
    min-width: 0;
  }
  .next-head {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 4px 8px;
  }
  .next-main {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    gap: 12px;
    margin-top: 6px;
  }
  .next-title {
    font-size: 18px;
    font-weight: 500;
    display: flex;
    align-items: baseline;
    flex-wrap: wrap;
    gap: 4px 8px;
  }
  .next-title .year {
    font-size: 13px;
    font-weight: 400;
    color: var(--secondary-text-color);
  }
  .next-ep {
    font-size: 14px;
    color: var(--secondary-text-color);
    margin-top: 2px;
  }
  .progress {
    height: 6px;
    border-radius: 3px;
    background: var(--track);
    overflow: hidden;
  }
  .progress.thin {
    height: 4px;
    border-radius: 2px;
  }
  .progress > span {
    display: block;
    height: 100%;
    background: var(--c-accent);
  }
  .next .progress {
    margin-top: 12px;
  }
  .poster {
    position: relative;
    flex: none;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
    background: var(--tile-bg);
    color: var(--secondary-text-color);
    font-weight: 600;
  }
  .poster.lg {
    width: 84px;
    height: 126px;
    border-radius: 10px;
    font-size: 32px;
  }
  .poster.sm {
    width: 28px;
    height: 42px;
    border-radius: 5px;
    font-size: 13px;
  }
  .poster img {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  .next-foot {
    display: flex;
    justify-content: space-between;
    gap: 8px;
    font-size: 12px;
    color: var(--secondary-text-color);
    margin-top: 6px;
  }
  .action {
    all: unset;
    cursor: pointer;
    flex: none;
    display: inline-flex;
    align-items: center;
    gap: 4px;
    font-size: 13px;
    padding: 6px 12px;
    border-radius: 8px;
    border: 1px solid var(--divider-color);
    color: var(--primary-text-color);
  }
  .action:hover {
    background: var(--tile-bg);
  }
  .action:focus-visible {
    outline: 2px solid var(--c-accent);
  }
  .action[data-state="confirm"] {
    border-color: var(--c-accent);
    color: var(--c-accent);
  }
  .action[data-state="busy"] {
    opacity: 0.6;
    pointer-events: none;
  }
  .action[data-state="error"] {
    border-color: var(--error-color, #db4437);
    color: var(--error-color, #db4437);
  }
  .action ha-icon {
    --mdc-icon-size: 16px;
  }
  .badge {
    font-size: 11px;
    line-height: 1.4;
    padding: 1px 8px;
    border-radius: 8px;
    white-space: nowrap;
    background: var(--tile-bg);
    color: var(--secondary-text-color);
  }
  .badge.accent {
    background: color-mix(in srgb, var(--c-accent) 16%, transparent);
    color: var(--c-accent);
  }
  .badge.warn {
    background: color-mix(in srgb, var(--c-watchlist) 22%, transparent);
    color: var(--warning-color, #b37400);
  }

  /* last 7 days */
  .bars {
    display: flex;
    gap: 8px;
    margin-top: 4px;
  }
  .day {
    flex: 1;
    min-width: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 6px;
  }
  .slot {
    height: 104px;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: center;
    gap: 4px;
  }
  .day-count {
    font-size: 12px;
    font-weight: 600;
    line-height: 1;
    font-variant-numeric: tabular-nums;
  }
  .bar {
    align-self: stretch;
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 2px;
  }
  .bar.empty {
    border-radius: 2px;
    background: var(--track);
  }
  .seg {
    min-height: 5px;
    border-radius: 6px;
  }
  .seg.shows {
    background: var(--c-shows);
  }
  .seg.movies {
    background: var(--c-movies);
  }
  .day-label {
    font-size: 12px;
    color: var(--secondary-text-color);
  }
  .day.today .day-label {
    color: var(--primary-text-color);
    font-weight: 600;
  }
  .legend-row {
    display: flex;
    flex-wrap: wrap;
    gap: 6px 16px;
    margin-top: 12px;
    font-size: 13px;
    color: var(--secondary-text-color);
  }
  .legend-row span {
    display: flex;
    align-items: center;
    gap: 6px;
  }
  .legend-row b {
    color: var(--primary-text-color);
  }

  /* catch-up backlog */
  .catch-line {
    display: flex;
    align-items: baseline;
    flex-wrap: wrap;
    gap: 2px 10px;
    margin: 4px 0 12px;
  }
  .c-row {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 5px 0;
  }
  .c-row.pickable {
    margin: 0 -8px;
    padding: 5px 8px;
    border-radius: 10px;
    cursor: pointer;
  }
  .c-row.pickable:hover {
    background: color-mix(in srgb, var(--c-accent) 8%, transparent);
  }
  .c-row.pickable.selected {
    background: color-mix(in srgb, var(--c-accent) 16%, transparent);
  }
  .c-row.pickable:focus-visible {
    outline: 2px solid var(--c-accent);
  }
  .c-name {
    flex: 0 0 38%;
    min-width: 0;
    font-size: 14px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .c-row .progress {
    flex: 1;
    height: 8px;
    border-radius: 4px;
  }
  .c-count {
    flex: none;
    min-width: 28px;
    text-align: right;
    font-size: 14px;
    font-variant-numeric: tabular-nums;
  }
  .link {
    all: unset;
    cursor: pointer;
    display: inline-block;
    margin-top: 8px;
    font-size: 12px;
    color: var(--c-accent);
  }
  .link:focus-visible {
    outline: 2px solid var(--c-accent);
  }

  /* airing this week */
  .a-row {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 5px 0;
    font-size: 14px;
  }
  .a-day {
    flex: none;
    min-width: 52px;
    text-align: center;
    font-size: 12px;
    font-weight: 600;
    padding: 5px 0;
    border-radius: 8px;
    background: var(--tile-bg);
    color: var(--secondary-text-color);
  }
  .a-day.today {
    background: color-mix(in srgb, var(--c-accent) 16%, transparent);
    color: var(--c-accent);
  }
  .a-time {
    flex: none;
    font-size: 12px;
    color: var(--secondary-text-color);
    font-variant-numeric: tabular-nums;
  }
  .a-row .badge {
    flex: none;
  }
  .a-name {
    flex: 1;
    min-width: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .empty {
    padding: 8px 0;
    font-size: 14px;
    color: var(--secondary-text-color);
  }

  @container (max-width: 440px) {
    .big .num {
      font-size: 44px;
    }
    .c-name {
      flex-basis: 34%;
    }
    .poster.lg {
      width: 68px;
      height: 102px;
    }
    .last {
      max-width: 55%;
    }
  }
`;

export const editorStyles = css`
  .wrap {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }
  ha-alert {
    display: block;
  }
  .order {
    display: flex;
    flex-direction: column;
    gap: 2px;
    padding: 8px 12px 12px;
  }
  .order .hint {
    color: var(--secondary-text-color);
    font-size: 12px;
    padding-bottom: 6px;
  }
  .order-row {
    display: flex;
    align-items: center;
    border-bottom: 1px solid var(--divider-color);
  }
  .order-name {
    flex: 1;
    min-width: 0;
  }
  .order-reset {
    align-self: flex-start;
    margin-top: 8px;
    padding: 6px 12px;
    border: 1px solid var(--divider-color);
    border-radius: 8px;
    background: none;
    color: var(--primary-color);
    font: inherit;
    cursor: pointer;
  }
`;
