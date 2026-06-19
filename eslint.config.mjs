import typescriptParser from '@typescript-eslint/parser';
import pluginImport from 'eslint-plugin-import';
import prettierConfig from 'eslint-plugin-prettier/recommended';
import { defineConfig, globalIgnores } from 'eslint/config';
import globals from 'globals';
import eslintConfig from './configs/eslint/rules.eslint.mjs';
import importConfig from './configs/eslint/rules.import.mjs';
import jestConfig from './configs/eslint/rules.jest.mjs';
import reactConfig from './configs/eslint/rules.react.mjs';
import reactHooksConfig from './configs/eslint/rules.react-hooks.mjs';
import typescriptConfig from './configs/eslint/rules.typescript.mjs';

export default defineConfig([
  globalIgnores(
    ['**/*.cjs', '**/*.js', '**/*.mjs', '.agents/', 'build/', 'coverage/', 'release/', 'scripts/', 'working/'],
    'app-eslint/ignores',
  ),
  defineConfig([
    {
      name: 'app-eslint/main',
      files: ['src/main/**/*.ts', 'src/preload/**/*.ts'],
      extends: [eslintConfig, typescriptConfig, importConfig, jestConfig, prettierConfig],
      languageOptions: {
        globals: globals.node,
      },
    },
  ]),
  defineConfig([
    {
      name: 'app-eslint/renderer',
      files: ['src/renderer/**/*.{ts,tsx}'],
      extends: [
        eslintConfig,
        typescriptConfig,
        importConfig,
        jestConfig,
        reactConfig,
        reactHooksConfig,
        prettierConfig,
      ],
      languageOptions: {
        globals: globals.browser,
      },
    },
  ]),
  defineConfig([
    {
      name: 'app-eslint/shared',
      files: ['src/shared/**/*.ts'],
      extends: [eslintConfig, typescriptConfig, importConfig, jestConfig, prettierConfig],
    },
  ]),
  defineConfig([
    {
      name: 'app-eslint/architectural-boundaries',
      files: ['src/**/*.ts'],
      languageOptions: {
        parser: typescriptParser,
      },
      settings: {
        'import/resolver': {
          typescript: {
            project: './tsconfig.json',
          },
        },
      },
      plugins: {
        import: pluginImport,
      },
      rules: {
        // https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/no-restricted-paths.md
        // Enforces ARCHITECTURE.md process-layer import boundaries:
        //   main     → shared only (no renderer, no preload)
        //   renderer → shared only (no main, no preload)
        //   preload  → shared only (no main, no renderer)
        //   shared   → nothing from src/
        'import/no-restricted-paths': [
          'error',
          {
            zones: [
              // main cannot import from renderer or preload
              {
                target: './src/main',
                from: './src/{preload,renderer}/**/*',
                message: 'Main process files cannot import from renderer or preload files.',
              },
              // renderer cannot import from main or preload
              {
                target: './src/renderer',
                from: './src/{main,preload}/**/*',
                message: 'Renderer process files cannot import from main or preload files.',
              },
              // preload cannot import from main or renderer
              {
                target: './src/preload',
                from: './src/{main,renderer}/**/*',
                message: 'Preload process files cannot import from main or renderer files.',
              },
              // shared cannot import from main, renderer, or preload
              {
                target: './src/shared',
                from: './src/{main,preload,renderer}/**/*',
                message: 'Shared files cannot import from main, preload, or renderer files.',
              },
            ],
          },
        ],
      },
    },
  ]),
]);
