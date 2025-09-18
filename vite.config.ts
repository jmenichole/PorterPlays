import path from 'path';
import { defineConfig, loadEnv } from 'vite';

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, '.', '');
    return {
      base: process.env.NODE_ENV === 'production' ? '/PorterPlays/' : '/',
      // Avoid inlining secrets into the client bundle. If needed, use server-side proxies.
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '.'),
        }
      }
    };
});
