import { SECTION_EDITOR_TYPE } from "./const";
import { defineOnce } from "./define";
import { RefractStatsCard } from "./refract-stats-card";
import type { SectionId } from "./types";

export interface SectionCardInfo {
  section: SectionId;
  /** The card type, without the `custom:` prefix. */
  type: string;
  name: string;
  description: string;
}

/** One card for each section of the Refract card, so each can be placed on its own. */
export const SECTION_CARDS: SectionCardInfo[] = [
  { section: "hero", type: "refract-total-watch-time-card", name: "Refract: Total watch time", description: "Your total watch time, with the library, movie and episode counts and a fun comparison." },
  { section: "watch_time", type: "refract-watch-time-card", name: "Refract: Watch time", description: "Watch time split between TV shows, movies and anime." },
  { section: "library", type: "refract-library-card", name: "Refract: Library", description: "Your library by status." },
  { section: "still_to_finish", type: "refract-still-to-finish-card", name: "Refract: Still to finish", description: "Time left to finish the movies and shows you started." },
  { section: "streak", type: "refract-streak-card", name: "Refract: Streak", description: "Your current and longest streak of days." },
  { section: "average", type: "refract-average-card", name: "Refract: Average per week", description: "Your weekly average and how it compares with the weeks before." },
  { section: "last_7_days", type: "refract-last-7-days-card", name: "Refract: Last 7 days", description: "Episodes and movies of the last seven days." },
  { section: "top_picks", type: "refract-most-watched-card", name: "Refract: Most watched", description: "Your top actor, director, writer, decade, genre and country." },
  { section: "monthly_wrap", type: "refract-monthly-wrap-card", name: "Refract: Monthly wrap", description: "A wrap of every completed month, as app-style pages." },
  { section: "year_heatmap", type: "refract-year-heatmap-card", name: "Refract: Year heatmap", description: "A calendar of the last 12 months, shaded by how much you watched each day." },
  { section: "next_up", type: "refract-next-up-card", name: "Refract: Next up", description: "The next episode to watch, with progress and a button to mark it watched." },
  { section: "catchup", type: "refract-catch-up-card", name: "Refract: Catch-up backlog", description: "Aired episodes waiting for you, by show." },
  { section: "airing", type: "refract-airing-card", name: "Refract: Airing this week", description: "The shows airing in the next seven days." },
];

for (const info of SECTION_CARDS) {
  const section = info.section;
  class SectionCard extends RefractStatsCard {
    constructor() {
      super();
      this._only = section;
    }

    public static async getConfigElement(): Promise<HTMLElement> {
      const editor = document.createElement(SECTION_EDITOR_TYPE) as HTMLElement & { section?: SectionId };
      editor.section = section;
      return editor;
    }
  }
  defineOnce(info.type)(SectionCard);
}
