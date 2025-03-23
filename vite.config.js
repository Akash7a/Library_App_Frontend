import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

const apiUrl = import.meta.VITE_API_URL || "http://localhost:3000";

// https://vite.dev/config/
export default defineConfig({
  server: {
    host: true, // Expose server to the network
    proxy: {
      '/api': apiUrl, // Proxy API requests to backend server
    }
  },
  plugins: [react()],
});