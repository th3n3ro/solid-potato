import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    include: ["skia"],
  },
  build: {
    commonjsOptions: {
      include: [/skia/, /node_modules/], // Убедитесь, что CommonJS пакеты обрабатываются
    },
  },
  resolve: {
    alias: {
      skia: resolve(__dirname, "libs/skia"),
    },
  },
});
