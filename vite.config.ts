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
      // Multi-page: the root (/) and the teacher area (/edu/) are independent entries.
      input: {
        main: resolve(import.meta.dirname, "index.html"),
        edu: resolve(import.meta.dirname, "edu/index.html"),
      },
    },
  },
});
