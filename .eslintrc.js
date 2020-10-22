module.exports = {
    extends: ['airbnb-typescript/base'],
    plugins: [
        '@typescript-eslint',
        'flowtype',
        'import',
        'jest',
        'jsx-a11y',
        'only-warn',
        'prettier',
        'react',
        'react-hooks',
    ],
    parserOptions: {
        project: './tsconfig.json',
    },
    env: {
        browser: true,
        es2017: true,
        jest: true,
        node: true,
    },
    rules: {
        '@typescript-eslint/comma-dangle': 'off',

        // Failed for some generic type definitions
        '@typescript-eslint/indent': 'off',

        '@typescript-eslint/lines-between-class-members': 'off',

        '@typescript-eslint/naming-convention': [
            'error',
            // The accessor names shouldn't be the same as some fields
            { selector: 'accessor', format: ['PascalCase'] },
            { selector: 'class', format: ['PascalCase'] },
            { selector: 'enum', format: ['PascalCase'] },
            { selector: 'enumMember', format: ['camelCase'] },
            // react function components
            { selector: 'function', format: ['camelCase', 'PascalCase'] },
            { selector: 'interface', format: ['PascalCase'] },
            { selector: 'method', format: ['camelCase'] },
            { selector: 'parameter', format: ['camelCase'] },
            { selector: 'property', format: ['camelCase'] },
            { selector: 'typeAlias', format: ['PascalCase'] },
            { selector: 'typeParameter', format: ['PascalCase'] },
            // react components from react-redux.connect, constant variables
            { selector: 'variable', format: ['camelCase', 'PascalCase', 'UPPER_CASE'] },
        ],

        '@typescript-eslint/no-shadow': ['error', { allow: ['props', 'resolve', 'theme'] }],

        // Disabled for prettier
        'arrow-body-style': 'off',

        'class-methods-use-this': 'off',

        // XXX
        'guard-for-in': 'off',

        'implicit-arrow-linebreak': 'off',

        // Seems not working for tsx extension
        'import/extensions': 'off',
        // 'import/extensions': [
        //     'error',
        //     'always',
        //     { js: 'never', jsx: 'never', ts: 'never', tsx: 'never' },
        // ],

        // Disable for redux
        'import/no-cycle': 'off',

        // Disabled for import-statement of 'electron'
        'import/no-extraneous-dependencies': 'off',

        'import/prefer-default-export': 'off',

        'max-len': ['error', { code: 100 }],

        'no-continue': 'off',

        'no-console': ['error', { allow: ['warn', 'error'] }],

        'no-else-return': 'off',

        'no-param-reassign': 'off',

        'no-restricted-syntax': 'off',

        // Disabled for JSX.Element
        'no-undef': 'off',

        // Disabled for import-statement
        'object-curly-newline': 'off',

        // Disabled for prettier
        'operator-linebreak': 'off',
    },
};
