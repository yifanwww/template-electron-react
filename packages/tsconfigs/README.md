# @app-config/tsconfigs

Typescript configurations for template-electron-react.

## Usage

Your typescript configurations can be extended from this package.

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
    "extends": "@app-config/tsconfigs/tsconfig.node.json",
    "compilerOptions": {
        "baseUrl": "...",
        "rootDir": "..."
    },
    "include": [],
    "exclude": []
}
```
