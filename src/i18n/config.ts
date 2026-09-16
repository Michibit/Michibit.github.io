export const LANGS = ["en", "it"] as const;

export type Lang = (typeof LANGS)[number];

export const DEFAULT_LANG: Lang = "en";

/** Short label used by the language switch in the header. */
export const LANG_LABEL: Record<Lang, string> = {
  en: "EN",
  it: "IT",
};

/** BCP-47 tags for the <html lang> attribute. */
export const LANG_TAG: Record<Lang, string> = {
  en: "en-GB",
  it: "it-IT",
};

export const STORAGE_KEY = "mm-lang";

/** A value that exists in every supported language. */
export type Localized<T> = Record<Lang, T>;

export function isLang(value: unknown): value is Lang {
  return typeof value === "string" && (LANGS as readonly string[]).includes(value);
}
