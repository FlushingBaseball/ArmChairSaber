import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import mdx from "@mdx-js/rollup";

export default defineConfig({
  plugins: [react(), mdx()],
  server: {
  /*dev Flask backend, not included in prod build*/
    proxy: {
      "/": "http://localhost:5555" 
    }
  }
});


