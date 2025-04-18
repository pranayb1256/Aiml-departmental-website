import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      '/api': {
        target: 'https://aiml-departmental-website-n.onrender.com',  // Your backend server
        changeOrigin: true,  // Changes the origin of the host header to the target URL
        secure: false,       // Set to false if your backend is using HTTP (not HTTPS)
        rewrite: (path) => path.replace(/^\/api/, '')  // Removes '/api' prefix before forwarding
      },
    },
  },
})
