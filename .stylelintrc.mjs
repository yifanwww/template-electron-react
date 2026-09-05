export default {
  extends: ['stylelint-config-standard'],
  ignoreFiles: ['.agents/**/*', 'coverage/**/*', 'node_modules/**/*', 'out/**/*', 'release/**/*'],
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
  },
};
