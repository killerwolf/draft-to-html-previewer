import path from "node:path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  base: "/draft-to-html-previewer/",
  server: {
    port: 3000,
    host: "0.0.0.0",
  },
  build: {
    sourcemap: false,
    outDir: "dist",
    assetsDir: "assets",
  },
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "."),
    },
  },
});
