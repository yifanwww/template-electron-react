# @tecra/tsconfigs

Typescript configurations for tecra.

## Usage

Your typescript configurations can be extended from
- `@tecra/tsconfigs/tsconfig.base.json`
- `@tecra/tsconfigs/tsconfig.eslint.json`
- `@tecra/tsconfigs/tsconfig.node.json`
- `@tecra/tsconfigs/tsconfig.node.cjs.json`
- `@tecra/tsconfigs/tsconfig.node.esm.json`
- `@tecra/tsconfigs/tsconfig.node.types.json`
- `@tecra/tsconfigs/tsconfig.react.json`
- `@tecra/tsconfigs/tsconfig.react.cjs.json`
- `@tecra/tsconfigs/tsconfig.react.esm.json`
- `@tecra/tsconfigs/tsconfig.react.types.json`

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
