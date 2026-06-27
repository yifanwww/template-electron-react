import { defineConfig } from 'eslint/config';
import pluginReactHooks from 'eslint-plugin-react-hooks';

export default defineConfig([
  {
    name: 'app-eslint-config/rules-react-hooks',
    plugins: {
      // @ts-ignore
      'react-hooks': pluginReactHooks,
    },
    languageOptions: {
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    rules: {
      // https://react.dev/reference/eslint-plugin-react-hooks/lints/rules-of-hooks
      'react-hooks/rules-of-hooks': 'error',

      // https://react.dev/reference/eslint-plugin-react-hooks/lints/exhaustive-deps
      'react-hooks/exhaustive-deps': ['error', { additionalHooks: 'use[a-zA-Z]+Effect' }],

      // TODO: more rules, https://react.dev/reference/eslint-plugin-react-hooks
    },
  },
]);
