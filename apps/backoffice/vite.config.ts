// .storybook/vite.config.ts
import mdx from "@mdx-js/rollup";
import react from "@vitejs/plugin-react";
import { ConfigEnv, defineConfig,UserConfig } from "vite";
import mkcert from "vite-plugin-mkcert";
import svgr from "vite-plugin-svgr";

// https://vitejs.dev/config/
export default defineConfig((config: ConfigEnv) => {
  const baseConfig = {
    plugins: [
      { enforce: "pre", ...mdx(/* jsxImportSource: …, otherOptions… */) },
      react(),
      svgr(),
      mkcert(),
    ],
  } as UserConfig;

  if (config.mode === "development") {
    const devConfig = {
      server: {
        https: true,
        port: 3002,
        proxy: {
          "/api": {
            target: "https://localhost:3000",
            changeOrigin: true,
            rewrite: (path: string) => path.replace(/^\/api/, ""),
            secure: false,
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
