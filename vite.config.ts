import { defineConfig } from "vite";
import path from "path";
import react from "@vitejs/plugin-react-swc";
import envCompatiblePlugin from "vite-plugin-env-compatible";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), envCompatiblePlugin(/* options */)],
  define: {
    "process.env": process.env, // process.env를 전달
  },
  resolve: {
    alias: {
      "@assets": path.resolve(__dirname, "./src/assets"),
      "@components": path.resolve(__dirname, "./src/components"),
      "@containers": path.resolve(__dirname, "./src/containers"),
      "@styles": path.resolve(__dirname, "./src/styles"),
      "@pages": path.resolve(__dirname, "./src/pages"),
      "@atoms": path.resolve(__dirname, "./src/atoms"),
      "@constants": path.resolve(__dirname, "./src/constants"),
      "@tools": path.resolve(__dirname, "./src/tools"),
      "@api": path.resolve(__dirname, "./src/api"),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "./tailwind.css";`,
      },
    },
  },
});
