import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
// import tailwindcss from '@tailwindcss/vite'; // This is not needed with postcss.config.js

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'], // Removed tailwindcss() call
  },
  server: {
    port: 5173, // Default Vite port
    // open: true, // Can be re-enabled if desired
  }
});