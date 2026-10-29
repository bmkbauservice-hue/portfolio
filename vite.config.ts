import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  // Live unter https://mkdirdesign.com/ (eigener Server)
  base: '/',
  plugins: [react(), tailwindcss()],
})
