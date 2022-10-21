# @tecra-pkg/utils-type

Type utilities.

## Usage
### `IsHexColor` && `MakeHexColor`

```ts
type A = IsHexColor<'#1A3B5C'>;  // true
type B = IsHexColor<'1A3B5C'>;  // false
type C = IsHexColor<'#12345Z'>;  // false
```

```ts
function fn<Color extends string>(color: MakeHexColor<Color>) {
    // do something.
}

fn('#123456');  // succeed
fn('#1234')  // Error: Argument of type 'string' is not assignable to parameter of type 'never'.
```

## Develop this package

You need to build package `@tecra-config/scripts` before building or testing this package.

### Build this package

Execute `pnpm run build` to build this package.

### Do coverage test

- Execute `pnpm run test` to watch test.
- Execute `pnpm run test-full` to do full coverage test.
