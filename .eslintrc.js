module.exports = {
    env: {
        browser: true,
        es2017: true,
        jest: true,
        node: true,
    },
    extends: ['airbnb-typescript/base'],
    ignorePatterns: ['*.js', '*.d.ts'],
    parserOptions: {
        project: 'tsconfig.json',
    },
    plugins: [
        '@typescript-eslint',
        'flowtype',
        'import',
        'jest',
        'jsx-a11y',
        'prettier',
        'react',
        'react-hooks',
    ],
    rules: {
        'arrow-body-style': 'off', // Disabled for prettier
        'class-methods-use-this': 'off',
        'consistent-return': 'off',
        'guard-for-in': 'off',
        'implicit-arrow-linebreak': 'off',
        'max-len': ['error', { code: 100 }],
        'no-continue': 'off',
        'no-console': ['error', { allow: ['info', 'warn', 'error'] }],
        'no-else-return': 'off',
        'no-param-reassign': 'off',
        'no-plusplus': 'off',
        'no-restricted-syntax': 'off',
        'no-undef': 'off', // Disabled for JSX.Element
        'no-underscore-dangle': 'off', // Disabled for leading-underscore options of '@typescript-eslint/naming-convention'
        'object-curly-newline': 'off', // Disabled for prettier
        'operator-linebreak': 'off', // Disabled for prettier

        '@typescript-eslint/comma-dangle': 'off',
        '@typescript-eslint/indent': 'off', // Failed for some generic type definitions
        '@typescript-eslint/lines-between-class-members': 'off',
        '@typescript-eslint/naming-convention': [
            'error',
            { selector: 'accessor', format: ['PascalCase'] }, // The accessor names shouldn't be the same as properties
            { selector: 'class', format: ['PascalCase'] },
            { selector: 'enum', format: ['PascalCase'] },
            { selector: 'enumMember', format: ['camelCase'] },
            {
                // 'PascalCase' for react function components
                selector: 'function',
                format: ['camelCase', 'PascalCase'],
                leadingUnderscore: 'allow',
            },
            { selector: 'interface', format: ['PascalCase'] },
            { selector: 'method', format: ['camelCase'], leadingUnderscore: 'allow' },
            { selector: 'parameter', format: ['camelCase'], leadingUnderscore: 'allow' },
            { selector: 'property', format: ['camelCase'], leadingUnderscore: 'allow' },
            { selector: 'typeAlias', format: ['PascalCase'] },
            { selector: 'typeParameter', format: ['PascalCase'] },
            {
                // HACK: 'PascalCase' for react components from react-redux.connect, 'UPPER_CASE' for constant variables
                selector: 'variable',
                format: ['camelCase', 'PascalCase', 'UPPER_CASE'],
                leadingUnderscore: 'allow',
            },
        ],

        'import/extensions': 'off', // Seems not working for tsx extension
        // 'import/extensions': [
        //     'error',
        //     'always',
        //     { js: 'never', jsx: 'never', ts: 'never', tsx: 'never' },
        // ],
        'import/no-cycle': 'off', // HACK: Disabled for redux
        'import/no-extraneous-dependencies': 'off', // Disabled for import-statement of 'electron'
        'import/prefer-default-export': 'off',
    },
};
