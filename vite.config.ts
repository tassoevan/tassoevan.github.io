import { resolve } from "node:path";
import { defineConfig } from "vite";
import react, { reactCompilerPreset } from "@vitejs/plugin-react";
import babel from "@rolldown/plugin-babel";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    babel({ presets: [reactCompilerPreset()] }),
    tailwindcss(),
  ],
  build: {
    rolldownOptions: {
      // Multi-page: the root (/), the teacher area (/edu/) and its pages are independent entries.
      input: {
        main: resolve(import.meta.dirname, "index.html"),
        edu: resolve(import.meta.dirname, "edu/index.html"),
        carrute: resolve(import.meta.dirname, "edu/carrute/index.html"),
      },
    },
  },
});
