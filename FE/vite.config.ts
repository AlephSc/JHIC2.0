import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

// FE statis murni (dist/) agar 1 artefak bisa deploy ke
// L0 framework host + L1 Vercel + CF Pages + L2 GitHub Pages.
// HashRouter dipakai di App agar tidak butuh rewrite server.
export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: './',
  server: { port: 5173, host: true },
  preview: { port: 4173, host: true },
  build: {
    outDir: 'dist',
    sourcemap: false,
    chunkSizeWarningLimit: 800,
  },
});
