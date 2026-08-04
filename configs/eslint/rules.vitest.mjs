import { defineConfig } from 'eslint/config';
import pluginVitest from '@vitest/eslint-plugin';

export default defineConfig([
  {
    name: 'easy-config-eslint/rules-vitest',
    extends: [pluginVitest.configs.recommended],
    rules: {
      // https://github.com/vitest-dev/eslint-plugin-vitest/blob/main/docs/rules/expect-expect.md
      'vitest/expect-expect': ['error', { assertFunctionNames: ['expect', 'expect*'] }],

      // https://github.com/vitest-dev/eslint-plugin-vitest/blob/main/docs/rules/no-commented-out-tests.md
      'vitest/no-commented-out-tests': 'off',

      // https://github.com/vitest-dev/eslint-plugin-vitest/blob/main/docs/rules/prefer-strict-equal.md
      'vitest/prefer-strict-equal': 'error',
    },
  },
]);
