# @tecra-config/tsconfigs

Typescript configurations for tecra.

## Usage

Your typescript configurations can be extended from
- `@tecra-config/tsconfigs/tsconfig.base.json`
- `@tecra-config/tsconfigs/tsconfig.eslint.node.json`
- `@tecra-config/tsconfigs/tsconfig.eslint.react.json`
- `@tecra-config/tsconfigs/tsconfig.node.json`
- `@tecra-config/tsconfigs/tsconfig.node.cjs.json`
- `@tecra-config/tsconfigs/tsconfig.node.esm.json`
- `@tecra-config/tsconfigs/tsconfig.node.types.json`
- `@tecra-config/tsconfigs/tsconfig.react.json`
- `@tecra-config/tsconfigs/tsconfig.react.cjs.json`
- `@tecra-config/tsconfigs/tsconfig.react.esm.json`
- `@tecra-config/tsconfigs/tsconfig.react.types.json`

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
    "extends": "@tecra-config/tsconfigs/tsconfig.react.json",
    "compilerOptions": {
        "baseUrl": "...",
        "rootDir": "..."
    },
    "include": [],
    "exclude": []
}
```
