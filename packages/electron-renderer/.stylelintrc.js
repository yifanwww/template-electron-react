module.exports = {
    extends: ['stylelint-config-sass-guidelines', 'stylelint-config-recess-order'],
    ignoreFiles: ['build/**/*', 'coverage/**/*', 'node_modules/**/*'],
    rules: {
        // https://stylelint.io/user-guide/rules/indentation/
        indentation: 4,

        // https://stylelint.io/user-guide/rules/max-nesting-depth/
        'max-nesting-depth': null,

        // https://stylelint.io/user-guide/rules/selector-class-pattern/
        'selector-class-pattern': null,

        // https://stylelint.io/user-guide/rules/selector-max-id/
        'selector-max-id': null,

        // https://github.com/hudochenkov/stylelint-order/blob/master/rules/properties-alphabetical-order/README.md
        'order/properties-alphabetical-order': null,
    },
};
