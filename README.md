# Michele Menzione — Portfolio

A single-page portfolio for a DevOps & System Engineer. Built to feel like a
product, not a template: a choreographed page loader, masked typographic reveals,
a measured CI/CD diagram that draws itself, dark and light themes, and smooth
scrolling that actually stays in sync with the animation timeline.

**Stack:** Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS v4 ·
GSAP 3.15 (ScrollTrigger, SplitText) · Lenis

---

## Getting started

```bash
npm install
npm run dev        # http://localhost:3000
```

| Script | Purpose |
| --- | --- |
| `npm run dev` | Dev server with Turbopack |
| `npm run build` | Production build |
| `npm run start` | Serve the production build |
| `npm run typecheck` | `tsc --noEmit` |
| `npm run lint` | ESLint |

---

## The one thing worth reading: Lenis + GSAP

Smooth scrolling and scroll-driven animation are two clocks that have to agree.
If they don't, the page scrolls beautifully and every animation trails one frame
behind it. Three conditions make them agree — miss any one and you get that bug.

All three live in `src/providers/SmoothScrollProvider.tsx`:

1. **Lenis must not own a frame loop.** Lenis is constructed with
   `autoRaf: false` and driven from `gsap.ticker`, so the entire site shares a
   single `requestAnimationFrame` loop. Animations are then sampled against the
   same frame as the scroll position they react to.

   ```ts
   const tick = (time: number) => lenis.raf(time * 1000);
   gsap.ticker.add(tick);
   ```

2. **Every Lenis scroll event must update ScrollTrigger**, or ScrollTrigger's
   cached scroll position silently drifts from the real one.

   ```ts
   lenis.on("scroll", () => ScrollTrigger.update());
   ```

3. **GSAP's lag smoothing must be off.** By default GSAP advances time in jumps
   after a slow frame; combined with Lenis that shows up as a visible hitch.

   ```ts
   gsap.ticker.lagSmoothing(0);
   ```

Triggers are also recalculated once `document.fonts.ready` resolves, because web
fonts land after first paint and move every start/end position.

In-page anchors are handled by a single delegated document listener in the same
provider, so any `<a href="#section">` anywhere on the site inherits the same
glide as the wheel — no per-link wiring, no prop drilling, and modified clicks
(new tab, middle-click) are left to the browser.

---

## Project structure

```
src/
├── app/
│   ├── layout.tsx          Root shell: fonts, metadata, providers, chrome
│   ├── page.tsx            Home — composes sections
│   ├── globals.css         Design tokens (@theme), palettes, base, utilities
│   └── icon.svg            Favicon
├── components/
│   ├── layout/             Header (nav, language + theme switch, clock), Footer
│   ├── sections/           Hero, Skills, WorkIndex, Experience, About,
│   │                       PipelineDiagram
│   └── ui/                 Preloader, MagneticButton, Reveal, RevealText,
│                           Grain, ThemeToggle
├── content/                All copy and data (profile, projects, sections)
├── hooks/                  useLocalTime
├── i18n/                   Language config, dictionary, store, provider
├── lib/                    gsap (plugin registration), lenis, motion,
│                           theme-store, utils
└── providers/              SmoothScrollProvider, IntroProvider, AppProviders
```

**Where to edit content:** `src/content/profile.ts` (identity, links,
experience, education, certifications, stack) and `src/content/projects.ts`
(case studies). Nothing is hard-coded in components.

---

## How the animations are organised

### `src/lib/motion.ts` — one source of truth

Every duration and easing lives here. Retuning the whole site's feel is a
one-line change, and the site keeps feeling like one object instead of a pile of
one-off tweens.

### Page loader — `IntroProvider` + `Preloader`

A three-phase state machine, not a boolean:

| Phase | Meaning |
| --- | --- |
| `loading` | Curtain up, page inert, scroll locked |
| `revealing` | Curtain lifting — **the hero animates now** |
| `done` | Curtain gone, scroll unlocked, ScrollTrigger refreshed |

The hero deliberately waits for `revealing`, not `done`. The content animates
*underneath* the rising curtain, so the intro reads as one continuous motion
rather than a loading screen followed by a page.

The curtain is four columns lifting with a stagger — a hard edge moving through
the frame reads far more premium than a uniform fade. `document.fonts.ready` is
raced against a 3 second timeout, so a stalled font request can never leave the
curtain up permanently.

### Hero — `Hero.tsx`

The name is the headline, and the section plays once on a normal timeline cued by
the preloader. Two things to know before editing it:

- The hidden state is established with `gsap.set()` and animated with `gsap.to()`,
  never a paused `gsap.from()`. A paused `from()` records the *hidden* values as
  its target when the effect re-runs, so the content animates from invisible to
  invisible and never appears. This is the single most common way an intro
  sequence silently fails.
- The terminal's typing effect is a `clip-path: inset()` wipe per line, not
  character splitting. On a monospace face a linear wipe is indistinguishable
  from typing, for six tweens instead of hundreds.

### Text reveals — `RevealText.tsx`

Built on GSAP SplitText. Per-character reveals use `type: "lines,chars"` with
`mask: "lines"`: masking *characters* gives every glyph its own overflow box and
clips descenders, while masking *lines* and animating the characters inside them
gives the same stagger with correct typographic clipping.

`autoSplit: true` re-splits on resize and re-runs the animation, so a reveal
survives a window resize instead of leaving stale, broken lines behind.

> **Implementation note.** Intro-mode reveals use `gsap.set()` + `gsap.to()`,
> never a paused `gsap.from()`. A paused `from()` puts elements into the hidden
> state; when the intro flips and the effect re-runs, a second `from()` records
> those hidden values as its *end* state — so the reveal animates from invisible
> to invisible and the content never appears. An explicit start/end pair is
> immune to that and idempotent on re-run.

### Scroll staggers — `Reveal.tsx`

Animates its direct DOM children, so you keep writing plain semantic markup and
add one wrapper. `once: true` means triggers deregister as the user passes them
instead of accumulating.

### Magnetic buttons — `MagneticButton.tsx`

The label travels further than the shell (0.55 vs 0.32 of the pointer offset) —
that parallax is what reads as "magnetic". Offsets are measured from the
element's *centre*; measuring from the corner makes the button bolt away from
the cursor.

---

## Performance

- Only `opacity` and `transform` are animated — both compositor-only.
- `gsap.quickTo()` where a value is written at pointer frequency (magnetism): it
  reuses one tween instead of allocating a new one per event.
- Scroll-driven cosmetic state is written to `dataset`, not React state, so the
  header does not re-render on every scroll event.
- `ScrollTrigger.config({ ignoreMobileResize: true })` — without it, mobile
  browsers recalculate every trigger when the URL bar hides.
- `will-change` is applied only where it earns its compositor layer.

## Accessibility

- **`prefers-reduced-motion` is honoured everywhere.** Lenis is not initialised,
  SplitText never runs, the curtain lifts immediately, counters show their final
  values at once, and every tween is skipped — content is never left in a hidden
  from-state.
- **The system cursor is left alone.** A custom cursor is the fastest way to make
  a site feel broken: even a well-built one invites comparison against the
  pointer the visitor has used for twenty years, and it loses.
- Split headlines keep their words readable: the visual lines sit under a
  `sr-only` heading, and SplitText receives `aria: "auto"` so fragmented text is
  not read letter by letter.
- Skip-to-content link, visible focus rings, Escape closes the mobile menu, and
  the decorative loader is `aria-hidden` so a 60fps counter never floods a
  screen reader.
- Without JavaScript the curtain is removed via `<noscript>` and all content
  renders normally.

## Internationalisation

English and Italian, switchable from the header. UI copy lives in
`src/i18n/dictionary.ts` as a typed object, so a missing translation is a
compile error rather than a blank space. The choice persists to `localStorage`
and is applied before first paint by an inline bootstrap script, so there is no
visible language flip.

---

## Art direction

Three complete directions ship in the codebase, defined as token overrides in
`src/app/globals.css`. **Switching is one word** in `src/app/layout.tsx`:

```tsx
<html data-palette="hybrid">   {/* "cloud" | "terminal" */}
```

| | `hybrid` (shipping) | `cloud` | `terminal` |
| --- | --- | --- | --- |
| Canvas | `#08090b` neutral | `#08090b` neutral | `#04070a` green-cast |
| Accent | `#10b981` emerald | `#4f8cff` electric blue | `#00ff9c` phosphor |
| Data signal | `#2dd4bf` teal | `#a78bfa` violet | `#35e0ff` cyan |
| Glow alpha | `42%` | `38%` | `85%` |
| Reads as | neutral surfaces, quiet emerald accent | quiet product surface | loud terminal session |

`hybrid` is the shipping direction and it is a deliberate split: **structure stays
quiet** — neutral near-black, white text, hairline borders, generous whitespace —
while **the accent carries intent** — buttons, links, data flow, metrics. An
emerald, deliberately held back: a saturated neon reads as a gaming rig, the same
hue desaturated reads as instrumentation.

Because every Tailwind utility compiles to `var(--color-*)`, redefining the
custom properties on a subtree re-skins every component inside it. No duplicate
classes and no variant props threaded through the tree — the same
`<MagneticButton variant="solid">` is a blue pill in one direction and a glowing
green one in another.

**Review board: `/style-tile`** — a live design board with a direction toggle,
the type scale, every palette token with its resolved hex, component states, the
easing board and the pipeline demo. It is `noindex` and unlinked from the site
nav.

## Structure

A classic portfolio: every section scrolls normally. There is no pinning, no
scroll hijacking and no scene the visitor has to sit through. Motion reveals
content as it arrives; it never gates it.

| Section | File | What it does |
| --- | --- | --- |
| Hero | `sections/Hero.tsx` | The name as the headline, role, live local time, a prominent availability banner, the two Azure certifications, CTAs, and a terminal whose lines type themselves in via a clip-path wipe |
| Skills | `sections/Skills.tsx` | The toolkit grouped by purpose — cloud, IaC, systems, virtualisation, development, observability |
| Work | `sections/WorkIndex.tsx` | Editorial index of the case studies |
| Experience | `sections/Experience.tsx` | Roles, achievements, stack, education |
| About | `sections/About.tsx` | The pipeline diagram plus four working rules |
| Contact | `layout/Footer.tsx` | Email, CV, certifications, social links |

Two techniques in here are worth reading before editing them:

**The typing effect is a clip-path wipe, not character splitting.** A monospace
face sits on a uniform character grid, so a linear `clip-path: inset()` wipe is
visually indistinguishable from typing — for the cost of six tweens instead of
hundreds of character spans. See the note at the top of `Hero.tsx`.

**The pipeline geometry is measured, never hard-coded.** The node row is laid
out by the browser (flex, `vw` gaps, font-dependent widths), so fixed SVG
coordinates would drift the moment a label wrapped. The lanes are measured from
the real layout with `offsetLeft`/`offsetWidth`, and the `viewBox` is set to the
measured pixel size so 1 SVG unit is always 1 CSS pixel and strokes never
distort. The measurement re-runs on `refreshInit`. Below `lg` the row wraps, so
the lanes are hidden rather than drawn across rows.

## Dark / light theme

A two-state switch in the header (`src/components/ui/ThemeToggle.tsx`, backed by
`src/lib/theme-store.ts`). First visit follows the OS via
`prefers-color-scheme`; after that the explicit choice is stored and wins.

Light is a real palette, not an inversion filter. A phosphor accent on white is
unreadable and a bloom reads as a smudge, so `[data-theme="light"]` in
`globals.css` makes its own decisions: warm off-white surfaces, near-black text,
a deep green accent, and glow dialled down to a hairline ring. Measured contrast
is **17.2:1** for body text and **6.07:1** for muted text — both comfortably above
WCAG AA.

Three details that stop it feeling cheap:

- The stored theme is applied by an inline script in the root layout **before the
  first paint**, so a light-mode visitor never sees a dark frame.
- `color-scheme` and the `theme-color` meta are kept in sync, so form controls,
  scrollbars and the mobile browser chrome follow the choice.
- The grain overlay's opacity and the decorative washes come from tokens
  (`--grain-opacity`, `--decor-opacity`), so light mode tones them down without
  any component knowing which theme is active.

> **Token names.** `--color-void` is always the page canvas and `--color-chalk`
> is always the primary text. In light mode they hold inverted *values*. That is
> the point: components ask for roles, never for colours.

And the switch is a real `role="switch"` with `aria-checked`, so a screen reader
announces "Light mode, switch, on" rather than leaving an icon to be guessed at.

## Deployment

Static-friendly; the home route prerenders. For Vercel: import the repository and
deploy — no environment variables required.

Before going live:

1. **Replace `public/cv/michele-menzione-cv.pdf`** with the latest CV.
2. **Add real outcome numbers** to `src/content/projects.ts`. The current
   outcomes are qualitative; "cut incident triage from 40 minutes to 5" outperforms
   any adjective.
3. **Confirm client naming.** Cases marked `confidential: true` describe clients
   by sector. Swap in real names wherever you are cleared to publish them.
4. **Check the date overlap in `src/content/profile.ts`.** The Europass CV lists
   DigitalPlatforms (01/2026–) and System Management (06/2024–) both as current;
   two "Present" entries in one timeline reads as a mistake. Close one of them.
5. **Delete `/style-tile`** (or keep it — it is genuinely useful as living
   documentation) once the direction is locked.
6. Set the production domain in `metadataBase` (`src/app/layout.tsx`) for
   correct Open Graph URLs.

## Roadmap

- [ ] Case-study route `/work/[slug]` — the content is already modelled in
      `src/content/projects.ts` and the index rows are waiting to become links
- [ ] Project imagery, once screenshots can be published
- [ ] Custom 404
