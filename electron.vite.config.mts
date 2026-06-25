import react from '@vitejs/plugin-react';
import { defineConfig } from 'electron-vite';
import tsconfigPaths from 'vite-tsconfig-paths';

const NODE_TARGET = 'node24.15';
const BROWSER_TARGET = 'chrome148';

export default defineConfig({
  main: {
    build: {
      target: NODE_TARGET,
      outDir: './build/main',
      lib: {
        entry: 'src/main/index.ts',
        formats: ['cjs'],
      },
      externalizeDeps: {
        // https://electron-vite.org/guide/dependency-handling#customizing
        // pure-ESM modules cannot be externalized, we need to bundle them,
        // until we can use native ESM in Electron main process
        exclude: ['electron-store'],
      },
    },
    plugins: [tsconfigPaths()],
  },
  preload: {
    build: {
      target: NODE_TARGET,
      outDir: './build/preload',
      lib: {
        entry: 'src/preload/index.ts',
        formats: ['cjs'],
      },
      // https://www.electronjs.org/docs/latest/tutorial/sandbox#preload-scripts
      // in sandbox mode, preload scripts run in a separate context,
      // `require` function is a polyfill with limited functionality,
      // we need to bundle all dependencies in preload scripts
      externalizeDeps: false,
    },
    plugins: [tsconfigPaths()],
  },
  renderer: {
    build: {
      target: BROWSER_TARGET,
      outDir: './build/renderer',
      rollupOptions: {
        input: 'src/renderer/index.html',
      },
      copyPublicDir: true,
    },
    plugins: [react(), tsconfigPaths()],
  },
});
