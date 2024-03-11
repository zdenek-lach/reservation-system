import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import svgr from 'vite-plugin-svgr';
import tsconfigPaths from 'vite-tsconfig-paths';
import fs from 'fs';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tsconfigPaths(),
    svgr({
      include: '**/*.svg?react',
    }),
  ],
  server: {
    port: 443,
    https: {
      key: fs.readFileSync(`./src/security/key.key`),
      cert: fs.readFileSync(`./src/security/cert.crt`),
    },
  },
});
