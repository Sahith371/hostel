import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0', // Make it accessible to Render
    port: Number(process.env.PORT) || 5173, // Use Render's PORT
    allowedHosts: ['hostel-wsdx.onrender.com'], // 👈 Allow your Render domain
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
        secure: false,
      },
    },
  },
  preview: {
    host: '0.0.0.0',
    port: Number(process.env.PORT) || 5173,
    allowedHosts: ['hostel-wsdx.onrender.com'], // 👈 Add here too
  },
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});
