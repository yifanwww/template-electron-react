# @ter/tsconfigs

Typescript configurations for ter.

## Usage

Your typescript configurations can be extended from
- `@ter/tsconfigs/tsconfig.base.json`
- `@ter/tsconfigs/tsconfig.bundler.json`
- `@ter/tsconfigs/tsconfig.bundler.react.json`
- `@ter/tsconfigs/tsconfig.bundler.types.json`
- `@ter/tsconfigs/tsconfig.eslint.bundler.json`
- `@ter/tsconfigs/tsconfig.node.cjs.json`

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
    "extends": "@ter/tsconfigs/tsconfig.react.json",
    "compilerOptions": {
        "baseUrl": "...",
        "rootDir": "..."
    },
    "include": [],
    "exclude": []
}
```
