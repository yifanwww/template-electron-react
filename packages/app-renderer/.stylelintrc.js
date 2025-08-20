export default {
    extends: [
        'stylelint-config-standard',
        'stylelint-config-standard-scss',
        'stylelint-config-sass-guidelines',
        'stylelint-config-recess-order',
    ],
    rules: {
        // https://stylelint.io/user-guide/rules/max-nesting-depth/
        'max-nesting-depth': null,

        // https://stylelint.io/user-guide/rules/selector-class-pattern/
        'selector-class-pattern': null,

        // https://stylelint.io/user-guide/rules/selector-max-id/
        'selector-max-id': null,

        // https://stylelint.io/user-guide/rules/selector-pseudo-class-no-unknown/
        // https://github.com/stylelint/stylelint/issues/2208#issuecomment-269245751
        'selector-pseudo-class-no-unknown': [
            true,
            {
                ignorePseudoClasses: ['global'],
            },
        ],

        // https://github.com/stylelint-stylistic/stylelint-stylistic/blob/main/lib/rules/indentation/README.md
        '@stylistic/indentation': 4,

        // https://github.com/hudochenkov/stylelint-order/blob/master/rules/properties-alphabetical-order/README.md
        'order/properties-alphabetical-order': null,

        // https://github.com/stylelint-scss/stylelint-scss/tree/master/src/rules/dollar-variable-colon-space-after
        'scss/dollar-variable-colon-space-after': 'always-single-line',
    },
};
