import { defineConfig, globalIgnores } from 'eslint/config';
import { recommended } from '../../configs/eslint/index.mjs';

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
