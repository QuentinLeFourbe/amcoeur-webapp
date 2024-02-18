import { defineConfig, defineGlobalStyles } from "@pandacss/dev";
import { theme } from "./src/theme/theme";

const globalCss = defineGlobalStyles({
  "html, body": {
    fontFamily: "body",
  },
  h2: {
    fontFamily: "heading",
    fontSize: "subHeader",
  },
});

export default defineConfig({
  // Whether to use css reset
  preflight: true,

  // Where to look for your css declarations
  include: ["./src/**/*.{js,jsx,ts,tsx}", "./pages/**/*.{js,jsx,ts,tsx}"],

  // Files to exclude
  exclude: [],

  // Useful for theme customization
  theme,

  // The output directory for your css system
  outdir: "styled-system",
  globalCss,
});
