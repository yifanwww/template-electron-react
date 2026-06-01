import react from '@vitejs/plugin-react';
import { defineConfig } from 'electron-vite';
import tsconfigPaths from 'vite-tsconfig-paths';

const NODE_TARGET = 'node24.11';
const BROWSER_TARGET = 'chrome144';

export default defineConfig({
    main: {
        build: {
            target: NODE_TARGET,
            outDir: './build/main',
            lib: {
                entry: 'src/main/index.ts',
                formats: ['cjs'],
            },
            externalizeDeps: false,
            rollupOptions: {
                external: ['better-sqlite3'],
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
