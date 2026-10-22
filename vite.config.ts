import { dirname, relative, resolve } from "node:path";
import type { Connect, Plugin } from "vite";
import { defineConfig } from "vite";
import react, { reactCompilerPreset } from "@vitejs/plugin-react";
import babel from "@rolldown/plugin-babel";
import tailwindcss from "@tailwindcss/vite";

// Multi-page: the root (/), the teacher area (/edu/) and its pages are independent entries.
const pages = {
  main: resolve(import.meta.dirname, "index.html"),
  edu: resolve(import.meta.dirname, "edu/index.html"),
  carrute: resolve(import.meta.dirname, "edu/carrute/index.html"),
  cv: resolve(import.meta.dirname, "cv/index.html"),
  indi: resolve(import.meta.dirname, "indi/index.html"),
};

// On GitHub Pages, `public/<name>.html` redirects `/<name>` to `/<name>/`. The dev and preview
// servers don't do that on their own, so this plugin mirrors it for every page in a directory.
function trailingSlashRedirect(): Plugin {
  const directories = new Set(
    Object.values(pages)
      .map((file) => `/${relative(import.meta.dirname, dirname(file))}`)
      .filter((path) => path !== "/"),
  );

  const redirect: Connect.NextHandleFunction = (req, res, next) => {
    const [path, query] = (req.url ?? "").split("?");
    if (!directories.has(path)) return next();
    res.statusCode = 301;
    res.setHeader("Location", `${path}/${query ? `?${query}` : ""}`);
    res.end();
  };

  return {
    name: "trailing-slash-redirect",
    configureServer: (server) => void server.middlewares.use(redirect),
    configurePreviewServer: (server) => void server.middlewares.use(redirect),
  };
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    babel({ presets: [reactCompilerPreset()] }),
    tailwindcss(),
    trailingSlashRedirect(),
  ],
  build: {
    rolldownOptions: {
      input: pages,
    },
  },
});
