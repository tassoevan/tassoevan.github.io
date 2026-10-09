import { resolve } from "node:path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: [["babel-plugin-react-compiler"]],
      },
    }),
    tailwindcss(),
  ],
  build: {
    rollupOptions: {
      // Multi-page: the root (/), the teacher area (/edu/) and its pages are independent entries.
      input: {
        main: resolve(import.meta.dirname, "index.html"),
        edu: resolve(import.meta.dirname, "edu/index.html"),
        carrute: resolve(import.meta.dirname, "edu/carrute/index.html"),
      },
    },
  },
});
