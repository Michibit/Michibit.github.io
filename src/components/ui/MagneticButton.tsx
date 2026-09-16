"use client";

import { useRef, type ReactNode, type RefObject } from "react";
import { useGSAP } from "@gsap/react";

import { gsap } from "@/lib/gsap";
import { hasFinePointer, prefersReducedMotion } from "@/lib/motion";
import { cn } from "@/lib/utils";

/* ==========================================================================
   MAGNETIC BUTTON
   --------------------------------------------------------------------------
   The element leans toward the pointer while it is inside, and glides home when
   it leaves.

   Two details make this feel good rather than gimmicky:

   • The label moves further than the shell (0.55 vs 0.32 of the pointer offset).
     That small parallax between chrome and text is what reads as "magnetic"
     instead of "slightly broken position".

   • The offset is measured from the element's *centre*, so the pull is
     symmetric. Measuring from the top-left corner — the common mistake — makes
     the button bolt away from the cursor.
   ========================================================================== */

export type MagneticVariant = "solid" | "outline" | "ghost";
export type MagneticSize = "md" | "lg";

export interface MagneticButtonProps {
  children: ReactNode;
  /** Renders an <a> instead of a <button>. */
  href?: string;
  onClick?: () => void;
  variant?: MagneticVariant;
  size?: MagneticSize;
  className?: string;
  /** Fraction of the pointer offset applied to the shell. */
  strength?: number;
  /** Force target="_blank" + rel="noreferrer". Inferred from href otherwise. */
  external?: boolean;
  type?: "button" | "submit";
  disabled?: boolean;
  /** Accessible name when the visible label is not descriptive enough. */
  ariaLabel?: string;
  /** Trailing icon (rendered in a group so it can react to hover). */
  icon?: ReactNode;
}

const VARIANT_CLASSES: Record<MagneticVariant, string> = {
  solid:
    "bg-accent text-void border border-accent hover:border-chalk hover:bg-chalk",
  outline:
    "bg-transparent text-chalk border border-line hover:border-accent hover:text-void",
  ghost:
    "bg-transparent text-chalk border border-transparent hover:text-void",
};

const SIZE_CLASSES: Record<MagneticSize, string> = {
  md: "h-11 px-5 text-[0.8125rem]",
  lg: "h-14 px-7 text-sm sm:h-16 sm:px-9 sm:text-base",
};

/** Whether the variant uses the accent fill sweep on hover. */
const HAS_SWEEP: Record<MagneticVariant, boolean> = {
  solid: false,
  outline: true,
  ghost: true,
};

export function useMagnetic<T extends HTMLElement>(
  shellStrength = 0.32,
  labelStrength = 0.55,
) {
  const shellRef = useRef<T>(null);
  const labelRef = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      const shell = shellRef.current;
      const label = labelRef.current;
      if (!shell || !label) return;

      // A magnetic pull is meaningless with a finger, and actively unpleasant
      // for anyone who has asked for reduced motion.
      if (!hasFinePointer() || prefersReducedMotion()) return;

      const shellX = gsap.quickTo(shell, "x", { duration: 0.45, ease: "power3" });
      const shellY = gsap.quickTo(shell, "y", { duration: 0.45, ease: "power3" });
      const labelX = gsap.quickTo(label, "x", { duration: 0.45, ease: "power3" });
      const labelY = gsap.quickTo(label, "y", { duration: 0.45, ease: "power3" });

      const onPointerMove = (event: PointerEvent) => {
        const rect = shell.getBoundingClientRect();
        // Offset from the centre of the element, not its corner.
        const offsetX = event.clientX - (rect.left + rect.width / 2);
        const offsetY = event.clientY - (rect.top + rect.height / 2);

        shellX(offsetX * shellStrength);
        shellY(offsetY * shellStrength);
        labelX(offsetX * labelStrength);
        labelY(offsetY * labelStrength);
      };

      const onPointerLeave = () => {
        // quickTo's own easing glides it home; no elastic overshoot needed —
        // the parallax between shell and label already supplies the life.
        shellX(0);
        shellY(0);
        labelX(0);
        labelY(0);
      };

      shell.addEventListener("pointermove", onPointerMove);
      shell.addEventListener("pointerleave", onPointerLeave);

      return () => {
        shell.removeEventListener("pointermove", onPointerMove);
        shell.removeEventListener("pointerleave", onPointerLeave);
        gsap.killTweensOf([shell, label]);
      };
    },
    { dependencies: [shellStrength, labelStrength] },
  );

  return { shellRef, labelRef };
}

export function MagneticButton({
  children,
  href,
  onClick,
  variant = "solid",
  size = "lg",
  className,
  strength = 0.32,
  external,
  type = "button",
  disabled = false,
  ariaLabel,
  icon,
}: MagneticButtonProps) {
  const { shellRef, labelRef } = useMagnetic<HTMLElement>(strength, strength * 1.7);

  const isExternal = external ?? (href ? /^https?:\/\//.test(href) : false);

  const classes = cn(
    "group relative inline-flex select-none items-center justify-center overflow-hidden rounded-full",
    "font-mono uppercase tracking-[0.12em]",
    "transition-colors duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
    "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent",
    VARIANT_CLASSES[variant],
    SIZE_CLASSES[size],
    disabled && "pointer-events-none opacity-40",
    className,
  );

  const inner = (
    <>
      {/* Accent fill sweep: scaleY on the compositor, origin pinned to the base
          so the fill rises out of the bottom edge. */}
      {HAS_SWEEP[variant] && (
        <span
          aria-hidden="true"
          className="absolute inset-0 origin-bottom scale-y-0 bg-accent transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-y-100 group-focus-visible:scale-y-100"
        />
      )}
      <span
        ref={labelRef}
        className={cn(
          "relative z-10 inline-flex items-center gap-2.5 whitespace-nowrap",
          HAS_SWEEP[variant] && "transition-colors duration-500",
        )}
      >
        {children}
        {icon !== undefined ? (
          <span className="transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1">
            {icon}
          </span>
        ) : null}
      </span>
    </>
  );

  const shared = { className: classes };

  if (href) {
    return (
      <a
        ref={shellRef as unknown as RefObject<HTMLAnchorElement>}
        href={href}
        onClick={onClick}
        aria-label={ariaLabel}
        {...(isExternal ? { target: "_blank", rel: "noreferrer noopener" } : {})}
        {...shared}
      >
        {inner}
      </a>
    );
  }

  return (
    <button
      ref={shellRef as unknown as RefObject<HTMLButtonElement>}
      type={type}
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
      {...shared}
    >
      {inner}
    </button>
  );
}

/** Small helper for the arrow glyph used across CTAs. */
export function ArrowIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
      className={cn("h-3.5 w-3.5", className)}
    >
      <path
        d="M2 8h11M9 4l4 4-4 4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="square"
      />
    </svg>
  );
}
