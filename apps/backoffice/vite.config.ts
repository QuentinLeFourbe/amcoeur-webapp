// .storybook/vite.config.ts
import { ConfigEnv, UserConfig, defineConfig } from "vite";
import svgr from "vite-plugin-svgr";
import react from "@vitejs/plugin-react";
import mdx from "@mdx-js/rollup";
import mkcert from "vite-plugin-mkcert";

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
