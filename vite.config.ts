import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  server: {
    allowedHosts: ['doe-timing-loud-displayed.trycloudflare.com']
  },
  plugins: [
    tailwindcss(),
    react()
  ],
  base: '/frontend/'
})
