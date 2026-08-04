import type { UserConfig } from 'vite';
import { defineConfig } from 'vitest/config';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig((): UserConfig => ({
  build: {
    target: 'node24.15',
  },
  plugins: [tsconfigPaths()],
  test: {
    include: ['src/main/**/*.{spec,test}.ts', 'src/preload/**/*.{spec,test}.ts', 'src/shared/**/*.{spec,test}.ts'],
    environment: 'node',

    coverage: {
      include: ['src/main/**/*.ts', 'src/preload/**/*.ts', 'src/shared/**/*.ts'],
      exclude: ['src/**/__mocks__/**/*.ts', 'src/**/__tests__/**/*.ts', 'src/**/*.{spec,test}.ts', 'src/**/*.d.ts'],
    },

    // https://vitest.dev/config/mockreset.html
    mockReset: true,
    // https://vitest.dev/config/restoremocks.html
    restoreMocks: true,
  },
}));
