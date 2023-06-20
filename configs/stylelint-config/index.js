module.exports = {
    extends: ['stylelint-config-sass-guidelines', 'stylelint-config-recess-order'],
    rules: {
        indentation: 4,
        // https://stylelint.io/user-guide/rules/max-nesting-depth/
        'max-nesting-depth': null,
        'selector-class-pattern': null,
        'selector-max-id': null,

        'order/properties-alphabetical-order': null,
    },
};
