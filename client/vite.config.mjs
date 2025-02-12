import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import mdx from "@mdx-js/rollup";

export default defineConfig({
  // root: './client',
  // publicDir: 'public',
  plugins: [react(), mdx()],
  // /*Flask backend */
  // server: {
  //   proxy: {
  //     "/": "http://localhost:5555" 
  //   }
  // }
});