import mdx from "@mdx-js/rollup";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import svgr from "vite-plugin-svgr";
import { nxViteTsPaths } from "@nx/vite/plugins/nx-tsconfig-paths.plugin";
import { nxCopyAssetsPlugin } from "@nx/vite/plugins/nx-copy-assets.plugin";

export default defineConfig(({ mode }) => ({
  root: import.meta.dirname,
  cacheDir: "../../node_modules/.vite/apps/backoffice",

  server: {
    port: 3002,
    host: "localhost",
    proxy: {
      "/api": {
        target: "http://localhost:3000",
        changeOrigin: true,
        rewrite: (path: string) => path.replace(/^\/api/, ""),
        secure: false,
      },
    },
  },

  preview: {
    port: 3002,
    host: "localhost",
  },

  plugins: [
    { enforce: "pre", ...mdx() },
    react(),
    nxViteTsPaths(),
    nxCopyAssetsPlugin(["*.md"]),
    svgr(),
  ],

  // Uncomment this if you are using workers.
  // worker: {
  //  plugins: () => [ nxViteTsPaths() ],
  // },

  build: {
    outDir: "../../dist/apps/backoffice",
    emptyOutDir: true,
    reportCompressedSize: true,
    commonjsOptions: {
      transformMixedEsModules: true,
    },
    sourcemap: mode === "development",
  },

  test: {
    name: "backoffice",
    watch: false,
    globals: true,
    environment: "jsdom",
    include: ["{src,tests}/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}"],
    reporters: ["default"],
    coverage: {
      reportsDirectory: "../../coverage/apps/backoffice",
      provider: "v8" as const,
    },
  },
}));
