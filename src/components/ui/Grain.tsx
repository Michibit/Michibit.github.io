/**
 * Filmic grain overlay.
 *
 * A single fixed layer of SVG turbulence at very low opacity. It costs one
 * composited layer and no JavaScript, and it removes the "flat vector" look
 * that pure-CSS dark themes otherwise have. `mix-blend-mode: overlay` makes it
 * lift the shadows rather than sit on top of them like a grey haze.
 *
 * Server component: no hooks, no client bundle.
 */
export function Grain() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-90 mix-blend-overlay"
      // Opacity comes from a token, so the light theme can dial the grain back
      // without this component needing to know which theme is active.
      style={{
        opacity: "var(--grain-opacity)",
        backgroundImage:
          "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='160' height='160' filter='url(%23n)'/%3E%3C/svg%3E\")",
        backgroundRepeat: "repeat",
        backgroundSize: "160px 160px",
      }}
    />
  );
}
