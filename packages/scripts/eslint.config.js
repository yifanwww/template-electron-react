import { recommended } from '@app-config/eslint-config';
import { defineConfig, globalIgnores } from 'eslint/config';

export default defineConfig([
    globalIgnores(['dist/']),
    recommended.node,
    {
        rules: {
            // https://eslint.org/docs/latest/rules/no-console
            'no-console': 'off',
        },
    },
]);
