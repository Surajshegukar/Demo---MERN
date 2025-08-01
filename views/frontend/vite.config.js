import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),tailwindcss(),],
  base:  process.env.NODE_ENV === 'production' ? '/center/' : '/',
  server: {
    proxy: {
      '/api': {
        target: process.env.VITE_APP_API_URL || 'http://localhost:3000',
        changeOrigin: true,
        secure: false,
      },
    },
  },
})
