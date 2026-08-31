/// <reference types="vitest/config" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// The Czech National Bank endpoint does not send CORS headers, so during local
// development we proxy requests to it. In production the same path is proxied by
// nginx (see nginx.conf).
export default defineConfig({
  server: {
    proxy: {
      '/cs': {
        target: 'https://www.cnb.cz',
        changeOrigin: true,
        secure: true,
      },
    },
  },
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/setupTests.ts',
    css: true,
  },
});
