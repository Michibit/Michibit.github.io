"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type ReactNode } from "react";

import { EaseDemo } from "@/components/style-tile/EaseDemo";
import { PipelineDemo } from "@/components/style-tile/PipelineDemo";
import { ArrowIcon, MagneticButton } from "@/components/ui/MagneticButton";
import { cn } from "@/lib/utils";

/* ==========================================================================
   STYLE TILE
   --------------------------------------------------------------------------
   A working design board, not a screenshot. Every value on this page is read
   from the live stylesheet, and the direction toggle works by swapping one
   attribute — which is the whole point of building the palette as tokens.

   Review artifact: excluded from search indexing, not linked from the site nav.
   ========================================================================== */

type Direction = "cloud" | "terminal";

const DIRECTIONS: { id: Direction; label: string; blurb: string }[] = [
  {
    id: "cloud",
    label: "B · Cloud-native",
    blurb: "Neutral near-black, one electric blue, restrained glow. Colour as information. Quiet on purpose.",
  },
  {
    id: "terminal",
    label: "A · Neon Terminal",
    blurb: "Green-cast black, phosphor bloom, monospace-dominant. Loud on purpose.",
  },
];

const PALETTE_TOKENS: { token: string; role: string }[] = [
  { token: "--color-void", role: "Page canvas" },
  { token: "--color-ink", role: "Raised panel" },
  { token: "--color-slate", role: "Inset / track" },
  { token: "--color-line", role: "Border" },
  { token: "--color-chalk", role: "Primary text" },
  { token: "--color-mute", role: "Secondary text" },
  { token: "--color-faint", role: "Tertiary / meta" },
  { token: "--color-accent", role: "Primary signal" },
  { token: "--color-accent-soft", role: "Signal pressed" },
  { token: "--color-signal", role: "Data-flow signal" },
  { token: "--color-live", role: "Healthy / up" },
];

const TYPE_SCALE = [
  { token: "text-mega", use: "Scene headline", spec: "clamp(3.25rem, 13.5vw, 15.5rem) · -0.045em" },
  { token: "text-giant", use: "Section heading", spec: "clamp(2.5rem, 8vw, 8.5rem) · -0.035em" },
  { token: "text-huge", use: "Node / card title", spec: "clamp(1.9rem, 4.6vw, 4.2rem)" },
  { token: "text-lead", use: "Intro paragraph", spec: "clamp(1.05rem, 1.5vw, 1.45rem) · /1.55" },
  { token: "text-label", use: "Eyebrow, chip, meta", spec: "0.6875rem · +0.14em · uppercase" },
];

export function StyleTile() {
  const [direction, setDirection] = useState<Direction>("cloud");
  const boardRef = useRef<HTMLDivElement>(null);

  // The site defaults to `cloud`; reflecting the choice on the board means the
  // toggle and the live site are driven by exactly the same mechanism.
  useEffect(() => {
    boardRef.current?.setAttribute("data-palette", direction);
  }, [direction]);

  const active = DIRECTIONS.find((d) => d.id === direction)!;

  return (
    <main
      id="main"
      ref={boardRef}
      data-palette={direction}
      className="min-h-svh bg-void text-chalk"
    >
      {/* ---- Board header ------------------------------------------------ */}
      <header className="sticky top-0 z-10 border-b border-line bg-void/85 backdrop-blur-xl">
        <div className="shell flex flex-wrap items-center justify-between gap-4 py-4">
          <div className="flex items-baseline gap-3">
            <span className="font-mono text-label uppercase tracking-[0.14em] text-accent">
              style tile
            </span>
            <span className="font-mono text-label uppercase tracking-[0.14em] text-faint">
              devops portfolio · v2
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {DIRECTIONS.map((d) => (
              <button
                key={d.id}
                type="button"
                onClick={() => setDirection(d.id)}
                aria-pressed={direction === d.id}
                className={cn(
                  "rounded-full border px-4 py-2 font-mono text-label uppercase tracking-[0.12em] transition-colors duration-500",
                  direction === d.id
                    ? "border-accent bg-accent text-void"
                    : "border-line text-mute hover:border-chalk hover:text-chalk",
                )}
              >
                {d.label}
              </button>
            ))}
            <Link
              href="/"
              className="rounded-full border border-line px-4 py-2 font-mono text-label uppercase tracking-[0.12em] text-mute transition-colors duration-500 hover:border-chalk hover:text-chalk"
            >
              ← site
            </Link>
          </div>
        </div>
      </header>

      <div className="shell flex flex-col gap-24 py-16 sm:gap-32 sm:py-24">
        {/* ---- Direction statement ---------------------------------------- */}
        <section className="grid gap-8 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <h1 className="font-display text-giant uppercase leading-[0.9] tracking-[-0.035em]">
              Architecting
              <br />
              scalability
            </h1>
          </div>
          <div className="flex flex-col justify-end gap-4 lg:col-span-5">
            <p className="font-mono text-label uppercase tracking-[0.14em] text-accent">
              {active.label}
            </p>
            <p className="text-lead text-mute">{active.blurb}</p>
            <p className="font-mono text-[0.625rem] uppercase tracking-[0.14em] text-faint">
              switching the toggle rewrites --color-* and --glow-* on this subtree.
              no component changes.
            </p>
          </div>
        </section>

        {/* ---- 01 Typography ---------------------------------------------- */}
        <TileSection
          index="01"
          title="Typography"
          note="Archivo for structure, JetBrains Mono for the engineer's voice, Instrument Serif reserved for a single editorial accent."
        >
          <div className="flex flex-col gap-8">
            <div className="overflow-hidden rounded-[var(--radius-card)] border border-line bg-ink p-6 sm:p-10">
              <p className="eyebrow mb-6">display · archivo</p>
              <p className="font-display text-mega uppercase leading-[0.82] tracking-[-0.045em] optical-trim">
                Scale
              </p>
              <p className="mt-6 font-display text-huge uppercase leading-[1.02]">
                Infrastructure that holds under load
              </p>
              <p className="mt-6 max-w-[60ch] text-mute">
                Body copy runs on the same family at a tighter optical size, so the
                page never sounds like two different documents.{" "}
                <span className="font-serif italic text-chalk">
                  Accents in serif italic
                </span>{" "}
                carry the one editorial note the layout can afford.
              </p>
            </div>

            <div className="overflow-hidden rounded-[var(--radius-card)] border border-line bg-ink p-6 sm:p-10">
              <p className="eyebrow mb-6">monospace · jetbrains mono</p>
              <div className="flex flex-col gap-3 font-mono text-sm">
                <p className="text-faint">
                  <span className="text-accent">➜</span> terraform plan -out=tfplan
                </p>
                <p className="text-mute">
                  Plan: <span className="text-live">3 to add</span>, 0 to change, 0 to destroy.
                </p>
                <p className="text-faint">
                  <span className="text-accent">➜</span> kubectl rollout status deploy/api{" "}
                  <span className="text-signal">--watch</span>
                </p>
                <p className="text-live">
                  {`deployment "api" successfully rolled out`}
                </p>
              </div>
            </div>

            {/* Scale table */}
            <ul className="divide-y divide-line-soft border-y border-line-soft">
              {TYPE_SCALE.map((row) => (
                <li
                  key={row.token}
                  className="grid grid-cols-1 gap-1 py-4 sm:grid-cols-12 sm:items-baseline sm:gap-4"
                >
                  <span className="font-mono text-xs text-accent sm:col-span-3">
                    {row.token}
                  </span>
                  <span className="text-sm text-chalk sm:col-span-4">{row.use}</span>
                  <span className="font-mono text-[0.625rem] uppercase tracking-[0.1em] text-faint sm:col-span-5">
                    {row.spec}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </TileSection>

        {/* ---- 02 Colour -------------------------------------------------- */}
        <TileSection
          index="02"
          title="Colour"
          note="Hex values below are read from the live cascade, so they always match the active direction."
        >
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
            {PALETTE_TOKENS.map((item) => (
              <Swatch
                // Remount on direction change so the resolved value is re-read.
                key={`${direction}-${item.token}`}
                token={item.token}
                role={item.role}
              />
            ))}
          </div>

          {/* Surface stack */}
          <div className="mt-8 grid gap-3 sm:grid-cols-4">
            {[
              { cls: "bg-void border-line", label: "void" },
              { cls: "bg-ink border-line", label: "ink" },
              { cls: "bg-slate border-line", label: "slate" },
              { cls: "bg-accent border-accent", label: "accent" },
            ].map((s) => (
              <div
                key={s.label}
                className={cn(
                  "flex h-24 items-end rounded-[var(--radius-card)] border p-3",
                  s.cls,
                )}
              >
                <span
                  className={cn(
                    "font-mono text-[0.625rem] uppercase tracking-[0.14em]",
                    s.label === "accent" ? "text-void" : "text-mute",
                  )}
                >
                  {s.label}
                </span>
              </div>
            ))}
          </div>
        </TileSection>

        {/* ---- 03 Components --------------------------------------------- */}
        <TileSection
          index="03"
          title="Components"
          note="Real production components — these are the same Button, chip and badge primitives the site ships."
        >
          <div className="grid gap-8 lg:grid-cols-2">
            <Panel label="actions · magnetic">
              <div className="flex flex-wrap items-center gap-3">
                <MagneticButton variant="solid" size="lg" icon={<ArrowIcon />}>
                  Initiate connection
                </MagneticButton>
                <MagneticButton variant="outline" size="lg">
                  Read the runbook
                </MagneticButton>
                <MagneticButton variant="ghost" size="lg">
                  Skip
                </MagneticButton>
              </div>
            </Panel>

            <Panel label="states">
              <div className="flex flex-wrap items-center gap-3">
                <MagneticButton variant="solid" size="md">
                  Default
                </MagneticButton>
                <MagneticButton variant="outline" size="md" className="glow-accent">
                  Focused
                </MagneticButton>
                <MagneticButton variant="solid" size="md" disabled>
                  Disabled
                </MagneticButton>
                <span className="inline-flex h-11 items-center gap-2 rounded-full border border-line px-5 font-mono text-[0.8125rem] uppercase tracking-[0.12em] text-mute">
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-accent" />
                  Deploying
                </span>
              </div>
            </Panel>

            <Panel label="status + metric">
              <div className="flex flex-col gap-4">
                <div className="flex flex-wrap items-center gap-2">
                  <StatusChip tone="live" label="all systems operational" />
                  <StatusChip tone="signal" label="deploy 1m ago" />
                  <StatusChip tone="mute" label="p99 84ms" />
                </div>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { v: "99.99%", l: "uptime" },
                    { v: "412", l: "pipelines" },
                    { v: "0", l: "p1 incidents" },
                  ].map((m) => (
                    <div
                      key={m.l}
                      className="rounded-xl border border-line bg-void px-3 py-4"
                    >
                      <p className="font-display text-huge leading-none text-chalk">
                        {m.v}
                      </p>
                      <p className="mt-2 font-mono text-[0.625rem] uppercase tracking-[0.14em] text-faint">
                        {m.l}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </Panel>

            <Panel label="node card · blueprint">
              <div className="blueprint-grid rounded-xl border border-line bg-void p-4">
                <div className="glow-accent inline-flex items-center gap-3 rounded-lg border border-line bg-ink px-4 py-3">
                  <span className="h-2 w-2 rounded-full bg-live" />
                  <span className="font-mono text-xs text-chalk">
                    k8s-prod-eu-1
                  </span>
                  <span className="font-mono text-[0.625rem] uppercase tracking-[0.12em] text-faint">
                    ready 12/12
                  </span>
                </div>
              </div>
            </Panel>
          </div>
        </TileSection>

        {/* ---- 04 Motion -------------------------------------------------- */}
        <TileSection
          index="04"
          title="Motion"
          note="Tokens are imported from src/lib/motion.ts — the board cannot drift from the build."
        >
          <div className="grid gap-8 lg:grid-cols-2">
            <EaseDemo />
            <PipelineDemo />
          </div>
        </TileSection>

      </div>
    </main>
  );
}

/* ==========================================================================
   LOCAL BUILDING BLOCKS
   ========================================================================== */

function TileSection({
  index,
  title,
  note,
  children,
}: {
  index: string;
  title: string;
  note: string;
  children: ReactNode;
}) {
  return (
    <section className="flex flex-col gap-8">
      <header className="flex flex-col gap-3 border-t border-line pt-6 lg:flex-row lg:items-baseline lg:justify-between lg:gap-12">
        <div className="flex items-baseline gap-5">
          <span className="font-mono text-label uppercase tracking-[0.14em] text-accent">
            {index}
          </span>
          <h2 className="font-display text-huge uppercase leading-none tracking-tight">
            {title}
          </h2>
        </div>
        <p className="max-w-[52ch] text-sm text-mute lg:text-right">{note}</p>
      </header>
      {children}
    </section>
  );
}

function Panel({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="overflow-hidden rounded-[var(--radius-card)] border border-line bg-ink">
      <div className="border-b border-line-soft px-4 py-2.5">
        <span className="eyebrow">{label}</span>
      </div>
      <div className="p-5">{children}</div>
    </div>
  );
}

/** Reads its own resolved token value from the live cascade. */
function Swatch({ token, role }: { token: string; role: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [value, setValue] = useState("——");

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const resolved = getComputedStyle(el).getPropertyValue(token).trim();
    if (resolved) setValue(resolved.toUpperCase());
  }, [token]);

  return (
    <div className="overflow-hidden rounded-xl border border-line bg-ink">
      <div
        ref={ref}
        className="h-20 w-full border-b border-line-soft"
        style={{ background: `var(${token})` }}
      />
      <div className="flex flex-col gap-1 p-3">
        <span className="font-mono text-[0.625rem] uppercase tracking-[0.1em] text-chalk">
          {value}
        </span>
        <span className="font-mono text-[0.5625rem] uppercase tracking-[0.1em] text-faint">
          {token.replace("--color-", "")}
        </span>
        <span className="text-[0.6875rem] text-mute">{role}</span>
      </div>
    </div>
  );
}

function StatusChip({
  tone,
  label,
}: {
  tone: "live" | "signal" | "mute";
  label: string;
}) {
  const tones = {
    live: "border-live/40 text-live",
    signal: "border-signal/40 text-signal",
    mute: "border-line text-mute",
  } as const;

  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full border px-3 py-1.5 font-mono text-[0.625rem] uppercase tracking-[0.12em]",
        tones[tone],
      )}
    >
      <span className="h-1 w-1 rounded-full bg-current" />
      {label}
    </span>
  );
}

