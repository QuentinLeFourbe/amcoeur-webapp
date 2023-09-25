import { defineConfig } from "vite";
import svgr from "vite-plugin-svgr";
import react from "@vitejs/plugin-react";
import mdx from "@mdx-js/rollup";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    { enforce: "pre", ...mdx(/* jsxImportSource: …, otherOptions… */) },
    react(),
    svgr(),
  ],
});
