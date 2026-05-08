import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import tailwindcss from '@tailwindcss/vite';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: './', // Crucial for Extension relative paths
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        main: 'index.html',
        background: 'src/background.ts', // <--- ADD THIS LINE ONLY
      },
      output: {
        entryFileNames: '[name].js', // Keeps the name background.js
      }
    },
  },
});
