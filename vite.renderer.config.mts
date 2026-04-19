import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import { checker } from 'vite-plugin-checker';
import tsconfigPaths from 'vite-tsconfig-paths';

const BROWSER_TARGET = 'chrome144';

// https://vitejs.dev/config/
export default defineConfig(() => ({
    plugins: [react(), tsconfigPaths(), checker({ enableBuild: false, typescript: true })],
    build: {
        outDir: './build',
        target: BROWSER_TARGET,
        cssTarget: BROWSER_TARGET,
        assetsDir: 'renderer-chunks',
        emptyOutDir: false,
        modulePreload: { polyfill: false },
    },
    server: {
        port: 4321,
    },
}));
