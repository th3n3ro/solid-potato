import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";
import { homepage } from "./package.json";

export default defineConfig({
  base: process.env.NODE_ENV === "production" ? homepage : `/assets/`,
  plugins: [react()],
  optimizeDeps: {
    include: ["skia"],
  },
  build: {
    commonjsOptions: {
      include: [/skia/, /node_modules/],
    },
  },
  resolve: {
    alias: {
      skia: resolve(__dirname, "libs/skia"),
    },
  },
});
