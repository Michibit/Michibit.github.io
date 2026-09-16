import nextCoreWebVitals from "eslint-config-next/core-web-vitals";
import nextTypescript from "eslint-config-next/typescript";

/**
 * ESLint flat config (ESLint v9+).
 *
 * `core-web-vitals` layers in the Next.js rules that map to real ranking and
 * UX signals — no `<img>` where `next/image` belongs, no blocking scripts in a
 * `<head>`, no layout-shifting `next/script` usage.
 */
const config = [
  ...nextCoreWebVitals,
  ...nextTypescript,
  {
    ignores: [
      ".next/**",
      "node_modules/**",
      "next-env.d.ts",
      "public/**",
    ],
  },
  {
    rules: {
      // Placeholder props are a normal part of composing layout primitives.
      "react/jsx-props-no-spreading": "off",
    },
  },
];

export default config;
