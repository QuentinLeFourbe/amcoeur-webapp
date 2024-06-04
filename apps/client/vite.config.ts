import { ConfigEnv, UserConfig, defineConfig } from "vite";
import svgr from "vite-plugin-svgr";
import react from "@vitejs/plugin-react";
import mdx from "@mdx-js/rollup";

// https://vitejs.dev/config/
export default defineConfig((config: ConfigEnv) => {
  const baseConfig = {
    plugins: [
      { enforce: "pre", ...mdx(/* jsxImportSource: …, otherOptions… */) },
      react(),
      svgr(),
    ],
  } as UserConfig;

  if (config.mode === "development") {
    const devConfig = {
      server: {
        port: 3001,
        proxy: {
          "/api": {
            target: "http://localhost:3000",
            changeOrigin: true,
          },
        },
      },
      build: { sourcemap: true },
    };
    return { ...baseConfig, ...devConfig } as UserConfig;
  } else {
    return baseConfig as UserConfig;
  }
});
