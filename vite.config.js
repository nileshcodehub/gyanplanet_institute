import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/gyanplanet_institute/',
  server: {
    port: 3000,
    open: true,
  },
  build: {
    outDir: 'build',
  },
});
