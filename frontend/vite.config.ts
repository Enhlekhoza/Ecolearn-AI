import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  root: '.',
  base: '/',
  server: {
    host: "::",
    port: 8080,
    configureServer: (app) => {
      app.middlewares.use((req, res, next) => {
        // If the request is for a file (has an extension) or an API call, let it pass
        if (req.url.includes('.') || req.url.startsWith('/api')) {
          return next();
        }
        // Otherwise, rewrite to index.html
        req.url = '/index.html';
        next();
      });
    },
  },
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});