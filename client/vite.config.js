import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    /*Flask backend */
    proxy: {
      "/": "http://localhost:5555" 
    }
  }
});