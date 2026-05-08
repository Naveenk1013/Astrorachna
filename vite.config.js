import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    include: ['@pdfme/generator', '@pdfme/common']
  },
  build: {
    // Production optimizations
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true, // Remove console.log in production
        drop_debugger: true,
      },
    },
    // Code splitting for better caching
    rollupOptions: {
      output: {
        manualChunks: {
          // Separate vendor code
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          // Separate data files
          'tarot-data': [
            './src/data/majorArcana.json', 
            './src/data/minorArcana.json'
          ],
        },
      },
    },
    // Chunk size warnings
    chunkSizeWarningLimit: 600,
  },
  // Performance optimizations for dev
  server: {
    hmr: {
      overlay: true,
    },
  },
})
