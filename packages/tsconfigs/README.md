# @tecra/tsconfigs

Typescript configurations for tecra.

## Usage

Your typescript configurations can be extended from
- `@tecra/tsconfigs/tsconfig.base.json`
- `@tecra/tsconfigs/tsconfig.bundler.json`
- `@tecra/tsconfigs/tsconfig.bundler.react.json`
- `@tecra/tsconfigs/tsconfig.bundler.types.json`
- `@tecra/tsconfigs/tsconfig.eslint.bundler.json`
- `@tecra/tsconfigs/tsconfig.node.cjs.json`

Then you need to specify the following options if need
- `compilerOptions`
  - `baseUrl`
  - `outDir`
  - `rootDir`
- `include`
- `exclude`

For example:

```json
{
    "extends": "@tecra/tsconfigs/tsconfig.react.json",
    "compilerOptions": {
        "baseUrl": "...",
        "rootDir": "..."
    },
    "include": [],
    "exclude": []
}
```
