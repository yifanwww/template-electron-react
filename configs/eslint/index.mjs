import pretter from 'eslint-plugin-prettier/recommended';
import { defineConfig, globalIgnores } from 'eslint/config';
import globals from 'globals';

import eslint from './rules.eslint.mjs';
import $import from './rules.import.mjs';
import jest from './rules.jest.mjs';
import react from './rules.react.mjs';
import reactHooks from './rules.react-hooks.mjs';
import typescript from './rules.typescript.mjs';

export const recommended = {
    basic: defineConfig([
        globalIgnores(['**/*.cjs', '**/*.js', '**/*.mjs'], 'app-eslint-config/ignores'),
        {
            name: 'app-eslint-config/basic',
            extends: [eslint, typescript, $import, jest, pretter],
        },
    ]),
    node: defineConfig([
        globalIgnores(['**/*.cjs', '**/*.js', '**/*.mjs'], 'app-eslint-config/ignores'),
        {
            name: 'app-eslint-config/node',
            extends: [eslint, typescript, $import, jest, pretter],
            languageOptions: {
                globals: globals.node,
            },
        },
    ]),
    react: defineConfig([
        globalIgnores(['**/*.cjs', '**/*.js', '**/*.mjs'], 'app-eslint-config/ignores'),
        {
            name: 'app-eslint-config/react',
            extends: [eslint, typescript, $import, jest, react, reactHooks, pretter],
            languageOptions: {
                globals: globals.browser,
            },
        },
    ]),
};
