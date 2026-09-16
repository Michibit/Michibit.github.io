import type { Metadata, Viewport } from "next";
import { Archivo, Instrument_Serif, JetBrains_Mono } from "next/font/google";

import { Preloader } from "@/components/ui/Preloader";
import { site } from "@/content/profile";
import { DEFAULT_LANG, LANG_TAG, STORAGE_KEY } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionary";
import { THEME_STORAGE_KEY } from "@/lib/theme-store";
import { AppProviders } from "@/providers/AppProviders";

import "./globals.css";

/* ==========================================================================
   FONTS
   Three families, each with one job:

   • Archivo      — display and body. One variable family keeps the pairing
                    coherent and the payload down (two static weights of two
                    families would already cost more).
   • JetBrains    — the "engineer" voice: eyebrows, metadata, stack chips.
     Mono
   • Instrument   — a serif reserved for the rare editorial accent. Mixing one
     Serif          serif into a grotesk system is the cheapest way to look
                    considered rather than templated.

   next/font self-hosts all three at build time: no third-party request, no
   layout shift, no render-blocking stylesheet.
   ========================================================================== */

const archivo = Archivo({
  subsets: ["latin"],
  variable: "--font-archivo",
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
});

const instrument = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-instrument",
  display: "swap",
});

const dict = getDictionary(DEFAULT_LANG);

export const metadata: Metadata = {
  title: {
    default: dict.meta.title,
    template: `%s — ${site.name}`,
  },
  description: dict.meta.description,
  authors: [{ name: site.name, url: site.githubPages }],
  creator: site.name,
  keywords: [
    "DevOps Engineer",
    "System Engineer",
    "Azure",
    "Kubernetes",
    "Ansible",
    "Infrastructure as Code",
    "Disaster Recovery",
    "Michele Menzione",
  ],
  openGraph: {
    type: "website",
    locale: LANG_TAG[DEFAULT_LANG],
    title: dict.meta.title,
    description: dict.meta.description,
    siteName: site.name,
  },
  twitter: {
    card: "summary_large_image",
    title: dict.meta.title,
    description: dict.meta.description,
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#08090b",
  // Both are declared; the store sets the exact one on <html> so form controls,
  // scrollbars and the mobile browser chrome follow the visitor's choice.
  colorScheme: "dark light",
  width: "device-width",
  initialScale: 1,
};

/**
 * Runs before the first paint, and therefore before anything is visible.
 *
 * Three jobs, all of which would otherwise cause a visible flash:
 *   • lift the preloader curtain for users with no JavaScript to lift it
 *   • apply the stored language, so the page never switches language on screen
 *   • apply the stored theme, so a light-mode visitor never sees a dark frame
 */
const bootstrapScript = `
(function () {
  var root = document.documentElement;
  try {
    var lang = localStorage.getItem(${JSON.stringify(STORAGE_KEY)});
    if (lang === "it") root.lang = "it-IT";
    else if (lang === "en") root.lang = "en-GB";
  } catch (error) {}
  try {
    var theme = localStorage.getItem(${JSON.stringify(THEME_STORAGE_KEY)});
    if (theme !== "light" && theme !== "dark") {
      theme = window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
    }
    root.dataset.theme = theme;
    root.style.colorScheme = theme;
    var meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.content = theme === "light" ? "#fbfaf8" : "#08090b";
  } catch (error) {}
})();
`;

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang={LANG_TAG[DEFAULT_LANG]}
      data-lang={DEFAULT_LANG}
      /* The active art direction. Swap this single word to re-skin the entire
         site: `hybrid` (shipping) is neutral cloud-native surfaces with a
         phosphor live layer, `cloud` is restrained throughout, `terminal` is
         neon throughout. All three are defined in globals.css. */
      data-palette="hybrid"
      /* Dark is the shipping default; the bootstrap script and the theme store
         correct this from localStorage or the OS preference before first paint. */
      data-theme="dark"
      className={`${archivo.variable} ${jetbrains.variable} ${instrument.variable}`}
      suppressHydrationWarning
    >
      <body className="bg-void text-chalk antialiased">
        <script dangerouslySetInnerHTML={{ __html: bootstrapScript }} />

        {/* Without JS the curtain can never lift — remove it from the start. */}
        <noscript>
          <style>{`.js-preloader{display:none !important}`}</style>
        </noscript>

        <AppProviders>
          {/*
           * The intro curtain lives at the root so any route — including the
           * internal /style-tile board — shares it. It must stay here: the
           * Preloader is what advances the intro state machine, and a route that
           * omitted it would leave scrolling locked forever.
           *
           * Site chrome (header, footer, grain) lives in the (site) route group
           * so review artifacts are not wrapped in navigation.
           */}
          <Preloader />
          {children}
        </AppProviders>
      </body>
    </html>
  );
}
