/**
 * Theme store — a two-state dark/light switch, consumed through
 * `useSyncExternalStore` (same pattern as the language store, for the same
 * reasons: no effect, no cascading render, no hydration mismatch).
 *
 * First visit follows the operating system; after that the explicit choice wins
 * and is remembered.
 */

export const THEME_STORAGE_KEY = "mm-theme";

export type Theme = "dark" | "light";

let current: Theme | null = null;
const listeners = new Set<() => void>();

function read(): Theme {
  if (current !== null) return current;
  try {
    const stored = window.localStorage.getItem(THEME_STORAGE_KEY);
    if (stored === "dark" || stored === "light") {
      current = stored;
      return current;
    }
  } catch {
    // Storage can be blocked (private mode, third-party cookie policy).
  }
  current = window.matchMedia("(prefers-color-scheme: light)").matches
    ? "light"
    : "dark";
  return current;
}

function emit() {
  for (const listener of listeners) listener();
}

function apply(theme: Theme) {
  const root = document.documentElement;
  root.dataset.theme = theme;
  // Ask the browser for matching form controls, scrollbars and UI chrome.
  root.style.colorScheme = theme;
  // Keep the mobile browser chrome in step with the page.
  const meta = document.querySelector<HTMLMetaElement>('meta[name="theme-color"]');
  if (meta) meta.content = theme === "light" ? "#fbfaf8" : "#08090b";
}

export const themeStore = {
  subscribe(listener: () => void): () => void {
    listeners.add(listener);
    // Another tab switching theme should update this one too.
    window.addEventListener("storage", listener);
    return () => {
      listeners.delete(listener);
      window.removeEventListener("storage", listener);
    };
  },

  getSnapshot: read,

  /** Rendered on the server and during hydration; the bootstrap script and the
   *  store both correct it before the first paint. */
  getServerSnapshot: (): Theme => "dark",

  set(theme: Theme): void {
    current = theme;
    try {
      window.localStorage.setItem(THEME_STORAGE_KEY, theme);
    } catch {
      // Non-fatal: the session simply will not remember the choice.
    }
    apply(theme);
    emit();
  },

  toggle(): void {
    themeStore.set(read() === "dark" ? "light" : "dark");
  },

  /** Sync the DOM with the stored value. Called once on mount. */
  sync(): void {
    apply(read());
  },
};
