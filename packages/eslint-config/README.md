# @tecra/eslint-config

ESLint configurations for tecra.

## Usage
### 1. Configure ESLint

Add `"extends": "@tecra/eslint-config"` to your ESLint config file.

For example `.eslintrc.json`:
```json
{
    "extends": "@tecra/eslint-config"
}
```

### 2. Configure the ESLint TypeScript parser

This config requires knowledge of your TypeScript config.

In your ESLint config, set [parserOptions.project] to the path of your `tsconfig.json`.

For example:
```json
{
    "extends": "@tecra/eslint-config",
    "parserOptions": {
        "project": "./tsconfig.json"
    }
}
```

[parserOptions.project]: https://github.com/typescript-eslint/typescript-eslint/tree/master/packages/parser#parseroptionsproject
