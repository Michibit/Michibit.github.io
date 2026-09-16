"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useSyncExternalStore,
  type ReactNode,
} from "react";

import { LANG_TAG, type Lang } from "./config";
import { getDictionary } from "./dictionary";
import { languageStore } from "./store";

interface LanguageContextValue {
  lang: Lang;
  setLang: (lang: Lang) => void;
  toggleLang: () => void;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  // No effect and no cascading render: React reads the store directly and falls
  // back to the server snapshot during hydration.
  const lang = useSyncExternalStore(
    languageStore.subscribe,
    languageStore.getSnapshot,
    languageStore.getServerSnapshot,
  );

  // Keep the document metadata in sync with the active language. Next's route
  // `metadata` is baked at build time from the default language, so the browser
  // tab title and the screen-reader language have to be updated here.
  useEffect(() => {
    document.documentElement.lang = LANG_TAG[lang];
    document.documentElement.dataset.lang = lang;
    document.title = getDictionary(lang).meta.title;
  }, [lang]);

  const setLang = useCallback((next: Lang) => languageStore.set(next), []);

  const toggleLang = useCallback(
    () => languageStore.set(lang === "en" ? "it" : "en"),
    [lang],
  );

  const value = useMemo<LanguageContextValue>(
    () => ({ lang, setLang, toggleLang }),
    [lang, setLang, toggleLang],
  );

  return (
    <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
  );
}

export function useLanguage(): LanguageContextValue {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error("useLanguage must be used inside <LanguageProvider>.");
  }
  return ctx;
}
