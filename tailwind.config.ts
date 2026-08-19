import type { Config } from "tailwindcss";
const withMT = require("@material-tailwind/react/utils/withMT");

const config: Config = withMT({
  content: [
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // ── Cream + plum system ─────────────────────────────────────────────
        cream: "#F4ECE0", // page background — warm cream
        paper: "#FFFCF7", // elevated surfaces / cards
        ink: "#2A1A33", // primary text — deep plum-black
        muted: "#6E5D77", // secondary text — mauve-gray
        line: "#E7DBCB", // hairline borders on cream
        plum: {
          DEFAULT: "#4A2B5C", // deep plum — dark surfaces (sidebar)
          deep: "#34203F", // deeper plum
          mid: "#603A75", // plum hover / mid
        },
        grape: {
          DEFAULT: "#9A4DBB", // vibrant accent — links, highlights
          soft: "#EEE1F6", // accent tint background
        },
        gold: "#C99A46", // warm secondary micro-accent

        // ── Back-compat aliases (old token names → new palette) ──────────────
        primary: "#34203F",
        secondary: "#4A2B5C",
        light: "#603A75",
        lightest: "#C7ADD6",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "ui-sans-serif", "system-ui", "sans-serif"],
        display: ["var(--font-fraunces)", "ui-serif", "Georgia", "serif"],
      },
      boxShadow: {
        soft: "0 2px 8px rgba(42,26,51,0.06), 0 12px 32px -12px rgba(42,26,51,0.12)",
        lift: "0 6px 18px rgba(42,26,51,0.10), 0 24px 56px -18px rgba(42,26,51,0.24)",
      },
      borderRadius: {
        "2xl": "1.125rem",
        "3xl": "1.5rem",
      },
    },
  },
  plugins: [],
});
export default config;
