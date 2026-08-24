export default {
  extends: ['stylelint-config-standard', 'stylelint-config-recess-order'],
  ignoreFiles: ['.agents/**/*', 'build/**/*', 'coverage/**/*', 'node_modules/**/*', 'release/**/*'],
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

    // https://github.com/hudochenkov/stylelint-order/blob/master/rules/properties-alphabetical-order/README.md
    'order/properties-alphabetical-order': null,
  },
};
