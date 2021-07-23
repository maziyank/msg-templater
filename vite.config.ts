import { defineConfig } from 'vite'
import reactRefresh from '@vitejs/plugin-react-refresh'
import svgr from 'vite-plugin-svgr'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [reactRefresh(), svgr(), 
    VitePWA({
    mode: 'development',
    registerType: 'autoUpdate',
    includeAssets: ['/favicon.png'], 
    manifest: {
      name: 'Messsage Templater',
      short_name: 'Message Templater',
      start_url: ".",
      display: "standalone",
      theme_color: 'black',
      icons: [
        {
          src: 'icon-192x192.png', 
          sizes: '192x192',
          type: 'image/png',
        },
        {
          src: 'icon-512x512.png', 
          sizes: '512x512',
          type: 'image/png',
        },
        {
          src: 'icon-512x512.png', 
          sizes: '512x512',
          type: 'image/png',
          purpose: 'any maskable',
        }]
      }})],
})
