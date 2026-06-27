import { defineConfig } from 'eslint/config';
import pluginImport from 'eslint-plugin-import';

const TYPESCRIPT_EXTENSIONS = ['.cts', '.mts', '.ts', '.tsx'];
const ALL_EXTENSIONS = [...TYPESCRIPT_EXTENSIONS, '.cjs', '.mjs', '.js', '.jsx'];

export default defineConfig([
  {
    name: 'app-eslint-config/rules-periodic',
    plugins: {
      import: pluginImport,
    },
    settings: {
      'import/extensions': ALL_EXTENSIONS,
      'import/parsers': {
        '@typescript-eslint/parser': TYPESCRIPT_EXTENSIONS,
      },
      'import/resolver': {
        node: {
          extensions: [...ALL_EXTENSIONS, '.json'],
        },
      },
    },
    rules: {
      // https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/no-cycle.md
      'import/no-cycle': [
        'error',
        {
          // scc pre-processing is more expensive than the actual cycle detection
          disableScc: true,
          ignoreExternal: true,
          maxDepth: '∞',
        },
      ],
    },
  },
]);
