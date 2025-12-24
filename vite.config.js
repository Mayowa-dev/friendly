import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite' // The new v4 way

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
})