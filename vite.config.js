import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0', // 👈 makes it accessible externally (Render needs this)
    port: Number(process.env.PORT) || 5173, // 👈 use Render's port or fallback
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
        secure: false,
      },
    },
  },
  preview: {
    host: '0.0.0.0', // 👈 also needed for vite preview on Render
    port: Number(process.env.PORT) || 5173,
  },
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});
