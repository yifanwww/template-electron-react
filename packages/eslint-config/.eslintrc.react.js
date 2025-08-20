module.exports = {
    env: {
        browser: true,
        es2020: true,
        jest: true,
    },
    extends: [
        'airbnb',
        'airbnb/hooks',
        'plugin:@typescript-eslint/recommended-type-checked',
        // TODO: may extends stricter rule configurations in the future
        // 'plugin:@typescript-eslint/strict-type-checked',
        'plugin:@typescript-eslint/stylistic-type-checked',
        'prettier',
        'prettier/prettier',
        'plugin:jest/recommended',
        'plugin:jest/style',
        './.eslintrc.basic.js',
    ],
    ignorePatterns: ['*.cjs', '*.js', '*.mjs'],
    plugins: ['@typescript-eslint', 'import', 'jest', 'jsx-a11y', 'prettier', 'react', 'react-hooks'],

    rules: {
        // -------------------- Eslint-Plugin-React Rules --------------------

        // https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/destructuring-assignment.md
        'react/destructuring-assignment': 'off',

        // https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/function-component-definition.md
        'react/function-component-definition': 'off',

        // Append 'tsx' to Airbnb 'react/jsx-filename-extension' rule
        // Original: ['.jsx']
        // https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/jsx-filename-extension.md
        'react/jsx-filename-extension': ['error', { extensions: ['.jsx', '.tsx'] }],

        // https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/jsx-no-useless-fragment.md
        'react/jsx-no-useless-fragment': 'off',

        // https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/jsx-one-expression-per-line.md
        'react/jsx-one-expression-per-line': 'off',

        // https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/jsx-props-no-spreading.md
        'react/jsx-props-no-spreading': 'off',

        // https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/no-unescaped-entities.md
        'react/no-unescaped-entities': 'off',

        // Disable because we only use TypeScript to write components, no need to use `prop-types`
        // https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/prop-types.md
        'react/prop-types': 'off',

        // Disable this rule for using new JSX transform from React 17.
        // https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/react-in-jsx-scope.md
        'react/react-in-jsx-scope': 'off',

        // https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/require-default-props.md
        'react/require-default-props': 'off',

        // -------------------- Eslint-Plugin-React-Hooks Rules --------------------

        // https://github.com/facebook/react/tree/main/packages/eslint-plugin-react-hooks
        'react-hooks/exhaustive-deps': ['error', { additionalHooks: 'use[a-zA-Z]+Effect' }],
    },
};
