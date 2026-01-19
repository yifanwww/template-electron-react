import { defineConfig } from 'eslint/config';
import reactHooks from 'eslint-plugin-react-hooks';

export default defineConfig([
    {
        name: '@app-config/eslint-config/rules-react-hooks',
        plugins: {
            // @ts-ignore
            'react-hooks': reactHooks,
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
