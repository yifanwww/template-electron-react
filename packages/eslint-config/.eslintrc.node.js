module.exports = {
    env: {
        es2020: true,
        jest: true,
        node: true,
    },
    extends: ['./.eslintrc.basic.js'],
    ignorePatterns: ['*.cjs', '*.js', '*.mjs'],
    plugins: ['@typescript-eslint', 'import', 'jest', 'n', 'prettier'],

    rules: {},
};
