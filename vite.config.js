import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'https://ifso.arashorangi.ir', // دامنه اصلی بدون ifsoapi
        changeOrigin: true,
        secure: false, // چون HTTPS است
        rewrite: (path) => path.replace(/^\/api/, '/ifsoapi'),
        // مسیر /api/... را به /ifsoapi/... روی سرور واقعی تبدیل می‌کند
      },
    },
  },
})
