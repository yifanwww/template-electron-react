import { getElectronChromeTarget } from '@ter/scripts';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import { checker } from 'vite-plugin-checker';
import tsconfigPaths from 'vite-tsconfig-paths';

// https://vitejs.dev/config/
export default defineConfig(({ command }) => ({
    plugins: [react(), tsconfigPaths(), command === 'serve' && checker({ typescript: true })],
    build: {
        outDir: '../../build',
        target: getElectronChromeTarget(),
        assetsDir: 'renderer-chunks',
        emptyOutDir: false,
        modulePreload: { polyfill: false },
    },
    server: {
        port: 4321,
    },
}));
