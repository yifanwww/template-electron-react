# @tecra/hooks

React hooks for tecra.

## Usage

It's very easy to use these custom React hooks.

Here is an example about how to use hook `useIsHovered`.

```ts
import { useIsHovered } from '@tecra/hooks';

export function Component(): React.ReactElement {
    const ref = useRef<SubComponent>(null);

    const isHovered = useIsHovered(ref);

    return <SubComponent className={isHovered ? 'sub-component-hover' : 'sub-component'} ref={ref} />;
}
```

## Develop this package

You need to build package `@tecra/scripts` before building or testing this package.

### Build this package

Execute `npm run build` or `yarn build` to build this package.

### Do coverage test

- Execute `npm run test` or `yarn test` to watch test.
- Execute `npm run test-coverage` or `yarn test-coverage` to do coverage test.
