import { defineConfig } from "vite";
import reactRefresh from "@vitejs/plugin-react"
import svgrPlugin from 'vite-plugin-svgr'


export default defineConfig({
  //This changes the output dir from dist to build
  // dont think i'll need this but considering it

  // build:{
  //   outDir: 'build',
  // },

  server: {
    open: true,
    port: 4000
  },

  plugins: [
    reactRefresh(),
    svgrPlugin({
      svgrOptions: {
        // icon: true,
        // //svgr options ("https://react-svgr.com/docs/options")
      },
    }),
  ],
})