# @tecra/utils-react

React utils for tecra.

## Usage
### `clns`

```tsx
import { clns } from '@tecra/utils-react';

function Component() {
    return <div classNames={clns('class-a', 'class-b')} />;
}
```

## Develop this package

You need to build package `@tecra/scripts` before building or testing this package.

### Build this package

Execute `npm run build` or `yarn build` to build this package.

### Do coverage test

- Execute `npm run test` or `yarn test` to watch test.
- Execute `npm run test-coverage` or `yarn test-coverage` to do coverage test.
