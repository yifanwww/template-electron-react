import react from '@vitejs/plugin-react';
import type { UserConfig } from 'vite';
import { defineConfig } from 'vitest/config';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig((): UserConfig => ({
  build: {
    target: 'chrome148',
  },
  plugins: [react(), tsconfigPaths()],
  test: {
    setupFiles: ['./src/test-jsdom.setup.ts'],

    include: ['src/renderer/**/*.{spec,test}.{ts,tsx}'],
    environment: 'jsdom',

    coverage: {
      include: ['src/renderer/**/*.{ts,tsx}'],
      exclude: [
        'src/**/__mocks__/**/*.{ts,tsx}',
        'src/**/__tests__/**/*.{ts,tsx}',
        'src/**/*.{spec,test}.{ts,tsx}',
        'src/**/*.d.ts',
      ],
    },

    // https://vitest.dev/config/mockreset.html
    mockReset: true,
    // https://vitest.dev/config/restoremocks.html
    restoreMocks: true,
  },
}));
