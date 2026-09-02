import react from '@vitejs/plugin-react'
import { defineConfig, transformWithOxc } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    {
      name: 'js-jsx-transform',
      enforce: 'pre',
      async transform(code, id) {
        if (!id.includes('/src/') || !id.endsWith('.js')) {
          return null
        }

        return transformWithOxc(code, id, {
          lang: 'jsx',
          jsx: { runtime: 'automatic' },
        })
      },
    },
    react(),
  ],
})
