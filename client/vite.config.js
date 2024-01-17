import { defineConfig } from "vite";
import react from "@vitejs/plugin-react"
import svgrPlugin from 'vite-plugin-svgr'


export default defineConfig({
  //This changes the output dir from dist to build
  // dont think i'll need this but considering it

  // build:{
  //   outDir: 'build',
  // },

  server: {
    open: true,
    port: 4000,
    cors:true
  },

  plugins: [
    react(),
    svgrPlugin({
      svgrOptions: {
        // icon: true,
        // //svgr options ("https://react-svgr.com/docs/options")
      },
    }),
  ],
})