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
        // ── Original drenched plum/brown scheme ─────────────────────────────
        primary: "#472D2D", // drench base
        secondary: "#553939", // raised surfaces / cards
        light: "#704F4F", // borders / hover
        lightest: "#A77979", // muted rose text
        accent: "#7FB7BE", // teal accent
        // additions that stay in the family
        deep: "#2E1C1C", // deepest — sidebar / wells
        cream: "#F4E7DF", // high-contrast headings / display text
      },
      fontFamily: {
        sans: ["var(--font-inter)", "ui-sans-serif", "system-ui", "sans-serif"],
        display: ["var(--font-fraunces)", "ui-serif", "Georgia", "serif"],
        mono: ["var(--font-mono)", "ui-monospace", "SFMono-Regular", "monospace"],
      },
      boxShadow: {
        drench: "0 10px 30px -12px rgba(0,0,0,0.5)",
        lift: "0 18px 48px -18px rgba(0,0,0,0.6)",
        glow: "0 0 0 1px rgba(127,183,190,0.25), 0 12px 40px -12px rgba(127,183,190,0.35)",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(14px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "pulse-glow": {
          "0%,100%": { opacity: "0.5" },
          "50%": { opacity: "0.9" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.7s cubic-bezier(0.22,1,0.36,1) both",
        marquee: "marquee 26s linear infinite",
        "pulse-glow": "pulse-glow 4s ease-in-out infinite",
      },
    },
  },
  plugins: [],
});
export default config;
