import { defineConfig } from "vite";
import { resolve } from "node:path";

export default defineConfig({
  root: resolve(__dirname, "src/renderer"),
  server: {
    host: "127.0.0.1",
    port: 5173
  },
  build: {
    outDir: resolve(__dirname, "dist/renderer"),
    emptyOutDir: true,
    rollupOptions: {
      input: resolve(__dirname, "src/renderer/html/index.html")
    }
  }
});