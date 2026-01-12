import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  // Use process.cwd() if available, otherwise fallback to empty string
  // This avoids build-time errors in environments where process might be partially defined
  const root = typeof process !== 'undefined' && typeof process.cwd === 'function' ? process.cwd() : '';
  const env = loadEnv(mode, root, '');

  return {
    plugins: [react()],
    define: {
      'process.env.API_KEY': JSON.stringify(env.API_KEY),
    },
    server: {
      port: 3000,
      host: true
    },
    build: {
      outDir: 'dist',
      emptyOutDir: true,
      sourcemap: false,
      rollupOptions: {
        output: {
          manualChunks: {
            vendor: ['react', 'react-dom', 'recharts'],
            supabase: ['@supabase/supabase-js'],
            gemini: ['@google/genai']
          }
        }
      }
    },
    publicDir: 'public'
  };
});