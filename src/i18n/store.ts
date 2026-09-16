import { DEFAULT_LANG, STORAGE_KEY, isLang, type Lang } from "./config";

/* ==========================================================================
   LANGUAGE STORE
   --------------------------------------------------------------------------
   A tiny external store, consumed through React's `useSyncExternalStore`.

   Reading `localStorage` into `useState` from inside an effect means a
   cascading render on every page load: render with the default, then render
   again with the stored value. `useSyncExternalStore` is the API React provides
   for exactly this — it renders with `getServerSnapshot` during hydration and
   then re-reads the live value, with no effect and no extra render pass.
   ========================================================================== */

let current: Lang | null = null;
const listeners = new Set<() => void>();

function read(): Lang {
  if (current !== null) return current;
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    current = isLang(stored) ? stored : DEFAULT_LANG;
  } catch {
    // Storage can be blocked (private mode, third-party cookie policy).
    current = DEFAULT_LANG;
  }
  return current;
}

function emit() {
  for (const listener of listeners) listener();
}

export const languageStore = {
  subscribe(listener: () => void): () => void {
    listeners.add(listener);
    // Another tab changing the language should update this one too.
    window.addEventListener("storage", listener);
    return () => {
      listeners.delete(listener);
      window.removeEventListener("storage", listener);
    };
  },

  /** Live value on the client. */
  getSnapshot: read,

  /** Value used for server rendering and hydration. */
  getServerSnapshot: (): Lang => DEFAULT_LANG,

  set(next: Lang): void {
    if (current === next) return;
    current = next;
    try {
      window.localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // Non-fatal: the session simply will not remember the choice.
    }
    emit();
  },
};
