// import * as path from 'path';
import react from "@vitejs/plugin-react";
import vitApp from "@vitjs/vit";
import { visualizer } from "rollup-plugin-visualizer";
import autoImport from "unplugin-auto-import/vite";
import { defineConfig } from "vite";
import vitePluginImp from "vite-plugin-imp";
import windiCSS from "vite-plugin-windicss";
import tsconfigPaths from "vite-tsconfig-paths";
import svgx from "@svgx/vite-plugin-react";

import routes from "./config/routes";

// https://vitejs.dev/config/
export default defineConfig({
  base: "/",
  plugins: [
    react({
      babel: {
        parserOpts: {
          plugins: ["decorators-legacy"],
        },
      },
    }),
    tsconfigPaths(),
    autoImport({
      imports: [
        "react",
        {
          react: [
            "createElement",
            "cloneElement",
            "createContext",
            "useLayoutEffect",
            "forwardRef",
          ],
        },
      ],
    }),
    vitePluginImp({
      libList: [
        {
          libName: "antd",
          style: (name) => `antd/es/${name}/style`,
        },
      ],
    }),
    vitApp({
      routes,
      dynamicImport: {
        loading: "./components/PageLoading",
      },
      exportStatic: {},
    }),
    windiCSS(),
    visualizer(),
    svgx(),
  ],
  server: {
    // open: true,
    port: 8000,
  },
  resolve: {
    preserveSymlinks: true,
    alias: [
      // { find: '@', replacement: path.resolve(__dirname, 'src') },
      // fix less import by: @import ~
      // https://github.com/vitejs/vite/issues/2185#issuecomment-784637827
      { find: /^~/, replacement: "" },
    ],
  },
  css: {
    modules: {
      localsConvention: "camelCaseOnly",
    },
    preprocessorOptions: {
      less: {
        // modifyVars: { 'primary-color': '#13c2c2' },
        // modifyVars: getThemeVariables({
        //   // dark: true, // 开启暗黑模式
        //   // compact: true, // 开启紧凑模式
        // }),
        javascriptEnabled: true,
      },
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          "react-venders": ["react", "react-dom", "@vitjs/runtime"],
        },
      },
    },
  },
});
