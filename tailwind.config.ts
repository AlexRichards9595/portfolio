import type { Config } from "tailwindcss";
const withMT = require("@material-tailwind/react/utils/withMT");


const config: Config = withMT({
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#472D2D',
        secondary: '#553939',
        light: '#704F4F',
        lightest: '#A77979',
        accent: '#7FB7BE'
      }
    },
  },
  plugins: [],
});
export default config;
