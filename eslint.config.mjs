import prettier from 'eslint-plugin-prettier/recommended';
import { defineConfig, globalIgnores } from 'eslint/config';
import globals from 'globals';
import eslint from './configs/eslint/rules.eslint.mjs';
import $import from './configs/eslint/rules.import.mjs';
import jest from './configs/eslint/rules.jest.mjs';
import react from './configs/eslint/rules.react.mjs';
import reactHooks from './configs/eslint/rules.react-hooks.mjs';
import typescript from './configs/eslint/rules.typescript.mjs';

export default defineConfig([
    globalIgnores(
        ['**/*.cjs', '**/*.js', '**/*.mjs', 'build/', 'coverage/', 'release/', 'scripts/', 'working/'],
        'app-eslint/ignores',
    ),
    defineConfig([
        {
            name: 'app-eslint/main',
            files: ['src/main/**/*.ts', 'src/preload/**/*.ts'],
            extends: [eslint, typescript, $import, jest, prettier],
            languageOptions: {
                globals: globals.node,
            },
        },
    ]),
    defineConfig([
        {
            name: 'app-eslint/renderer',
            files: ['src/renderer/**/*.{ts,tsx}'],
            extends: [eslint, typescript, $import, jest, react, reactHooks, prettier],
            languageOptions: {
                globals: globals.browser,
            },
        },
    ]),
    defineConfig([
        {
            name: 'app-eslint/shared',
            files: ['src/shared/**/*.ts'],
            extends: [eslint, typescript, $import, jest, prettier],
        },
    ]),
]);
