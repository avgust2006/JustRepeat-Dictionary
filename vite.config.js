import react from '@vitejs/plugin-react'
import { defineConfig, transformWithOxc } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  server: {
    // Эта машина блокирует IPv6-loopback (localhost -> [::1]),
    // поэтому всегда слушаем IPv4.
    host: '127.0.0.1',
  },
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
