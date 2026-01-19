import { defineConfig } from 'eslint/config';
import react from 'eslint-plugin-react';

export default defineConfig([
    {
        name: '@app-config/eslint-config/rules-react',
        plugins: {
            react,
        },
        languageOptions: {
            parserOptions: {
                ecmaFeatures: {
                    jsx: true,
                },
            },
        },
        settings: {
            react: {
                pragma: 'React',
                version: 'detect',
            },
        },
        rules: {
            // https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/jsx-boolean-value.md
            'react/jsx-boolean-value': ['error', 'never', { always: [] }],

            // https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/jsx-no-bind.md
            'react/jsx-no-bind': [
                'error',
                {
                    ignoreRefs: true,
                    allowArrowFunctions: true,
                    allowFunctions: false,
                    allowBind: false,
                    ignoreDOMComponents: true,
                },
            ],

            // https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/jsx-pascal-case.md
            'react/jsx-pascal-case': [
                'error',
                {
                    allowAllCaps: true,
                    ignore: [],
                },
            ],

            // https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/no-deprecated.md
            'react/no-deprecated': 'error',

            // https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/self-closing-comp.md
            'react/self-closing-comp': 'error',

            // https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/jsx-no-target-blank.md
            'react/jsx-no-target-blank': ['error', { enforceDynamicLinks: 'always' }],

            // https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/jsx-no-comment-textnodes.md
            'react/jsx-no-comment-textnodes': 'error',

            // https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/no-danger-with-children.md
            'react/no-danger-with-children': 'error',

            // https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/no-children-prop.md
            'react/no-children-prop': 'error',

            // https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/no-array-index-key.md
            'react/no-array-index-key': 'error',

            // https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/void-dom-elements-no-children.md
            'react/void-dom-elements-no-children': 'error',

            // https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/jsx-curly-brace-presence.md
            'react/jsx-curly-brace-presence': ['error', { props: 'never', children: 'never' }],

            // https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/jsx-fragments.md
            'react/jsx-fragments': ['error', 'syntax'],

            // https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/jsx-no-constructed-context-values.md
            'react/jsx-no-constructed-context-values': 'error',

            // https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/no-unstable-nested-components.md
            'react/no-unstable-nested-components': 'error',

            // https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/no-namespace.md
            'react/no-namespace': 'error',

            // https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/no-invalid-html-attribute.md
            'react/no-invalid-html-attribute': 'error',

            // https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/iframe-missing-sandbox.md
            'react/iframe-missing-sandbox': 'error',

            // https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/jsx-no-leaked-render.md
            'react/jsx-no-leaked-render': 'error',

            // https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/no-object-type-as-default-prop.md
            'react/no-object-type-as-default-prop': 'error',

            // https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/forward-ref-uses-ref.md
            'react/forward-ref-uses-ref': 'error',
        },
    },
]);
