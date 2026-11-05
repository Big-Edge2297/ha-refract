/**
 * Class decorator that registers a custom element once.
 *
 * Someone may already have the card from the standalone HACS plugin. A plain
 * `customElements.define` would throw for the second copy, so the first copy
 * wins and the second one explains why it stepped aside.
 */
export const defineOnce =
  (name: string) =>
  (cls: CustomElementConstructor): void => {
    if (customElements.get(name)) {
      console.warn(
        `[refract-stats-card] <${name}> is already registered, probably by the standalone HACS card. ` +
          "Remove that copy to use the card that ships with the Refract integration.",
      );
      return;
    }
    customElements.define(name, cls);
  };
