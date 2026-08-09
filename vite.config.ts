import { defineConfig } from "vite";
import path from "node:path";
import { fileURLToPath } from "node:url";
import react from "@vitejs/plugin-react";

const projectRoot = path.dirname(fileURLToPath(import.meta.url));
const rendererRoot = path.resolve(projectRoot, "src/renderer");

export default defineConfig({
  root: rendererRoot,
  plugins: [react()],
  server: {
    host: "127.0.0.1",
    port: 5173
  },
  resolve: {
    alias: {
      srcDir: rendererRoot,
    },
  },
  build: {
    outDir: path.resolve(projectRoot, "dist/renderer"),
    emptyOutDir: true,
  }
});