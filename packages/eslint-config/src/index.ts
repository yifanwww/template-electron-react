import pretter from 'eslint-plugin-prettier/recommended';
import { defineConfig, globalIgnores } from 'eslint/config';
import globals from 'globals';

import eslint from './rules/eslint.js';
import $import from './rules/import.js';
import jest from './rules/jest.js';
import react from './rules/react.js';
import reactHooks from './rules/react-hooks.js';
import typescript from './rules/typescript.js';

export const recommended = {
    basic: defineConfig([
        globalIgnores(['**/*.cjs', '**/*.js', '**/*.mjs'], '@app-config/eslint-config/ignores'),
        {
            name: '@app-config/eslint-config/basic',
            extends: [eslint, typescript, $import, jest, pretter],
        },
    ]),
    node: defineConfig([
        globalIgnores(['**/*.cjs', '**/*.js', '**/*.mjs'], '@app-config/eslint-config/ignores'),
        {
            name: '@app-config/eslint-config/node',
            extends: [eslint, typescript, $import, jest, pretter],
            languageOptions: {
                globals: globals.node,
            },
        },
    ]),
    react: defineConfig([
        globalIgnores(['**/*.cjs', '**/*.js', '**/*.mjs'], '@app-config/eslint-config/ignores'),
        {
            name: '@app-config/eslint-config/react',
            extends: [eslint, typescript, $import, jest, react, reactHooks, pretter],
            languageOptions: {
                globals: globals.browser,
            },
        },
    ]),
};
