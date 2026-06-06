---
name: jest-module-mocking
description: How to mock modules in Jest when jest is imported from @jest/globals (no auto-hoisting). Use this skill whenever writing or debugging Jest tests that call jest.mock() in a project where jest comes from @jest/globals rather than the global environment — especially when mocking dependencies of the module under test or working with singleton modules.
---

# Jest Module Mocking with `@jest/globals`

## The Core Problem: No Hoisting

In the classic Jest setup (global `jest`), `jest.mock()` calls are hoisted above all `import` statements by the babel/SWC transform. Every static import in the file gets the mocked version.

When `jest` is explicitly imported from `@jest/globals`, hoisting is disabled. The compiled output looks roughly like:

```js
const globals = require('@jest/globals'); // ← static imports run first
const dep = require('../dep'); //   (real module, mock not registered yet)
const sut = require('../module-under-test'); //   (gets real dep, not the mock)

globals.jest.mock('../dep', factory); // ← only NOW does the mock register
```

So any module that is statically imported and transitively depends on `'../dep'` will have already loaded the **real** dep before the mock is ever registered.

### Why singletons are especially affected

A singleton module creates its instance once at load time and exports it. Once the module is evaluated, the instance is fixed — re-registering a mock for one of its dependencies has no effect because the singleton already captured the real dependency during initialization.

With `@jest/globals` and no hoisting, any static import of the singleton evaluates it before `jest.mock()` runs, permanently baking the real dependency into the instance for the lifetime of the test module. Using `await import()` (with `jest.mock()` registered first at module level) ensures the singleton is evaluated _after_ the mock is in place.

## The Pattern

### 1. Keep `jest.mock()` at module level

`jest.mock()` must still be at module level — not inside `beforeAll` or `describe`. Even without hoisting, module-level statements run in declaration order, so `jest.mock()` executes before any `beforeAll`/`it` callbacks fire. The mock is registered before any `await import()` calls in test hooks.

Set the mock's values directly in the factory — there is no reason to use a null stub and mutate it later:

```ts
import { jest } from '@jest/globals';

jest.mock('../dep', () => ({
  SomeSingleton: { value: 42 },
}));
```

### 2. Use `await import()` to get the mocked modules

`await import()` goes through Jest's module registry where the mock is already registered. There are two places to do this:

**In `beforeAll`** — share imports across all tests in the suite. Declare `let` variables with type annotations at module level (type-only, no runtime cost), then populate them once:

```ts
let myFn: typeof import('../module-under-test').myFn;

beforeAll(async () => {
  ({ myFn } = await import('../module-under-test'));
});
```

**Inline in each test** — import directly inside `it` or `describe`. Simpler for small suites or when each test needs a fresh reference:

```ts
it('should do something', async () => {
  const { myFn } = await import('../module-under-test');
  expect(myFn()).toEqual(value);
});
```

### 3. Import the mock itself when setup is needed

If the mock object needs side-effectful setup (e.g. calling an init method) that can't go in the factory, import it before the module under test:

```ts
beforeAll(async () => {
  const { SomeSingleton } = await import('../dep');

  SomeSingleton.init();
});
```

## Building Real Objects in the Mock Factory

When the mock needs to be a fully constructed object rather than a plain stub, build it inside the factory. The factory runs synchronously at mock-registration time, so any value constructable without async is fair game:

```ts
jest.mock('../service', () => ({
  client: new SomeClient({ endpoint: 'http://localhost' }),
}));

let client: SomeClient;
let doWork: typeof import('../worker').doWork;

beforeAll(async () => {
  ({ client } = await import('../service'));
  ({ doWork } = await import('../worker'));

  // configure the real instance
  client.setup();
});

afterAll(() => client.teardown());
```

Modules referenced inside the factory body are resolved through the real module registry at mock-registration time — they are not themselves mocked by this call.

## Quick Reference

| To get the mock, use…                     | Hoisted `jest.mock` (global) | `@jest/globals` (no hoisting) |
| ----------------------------------------- | ---------------------------- | ----------------------------- |
| Static import of mocked module            | ✅                           | ❌ gets real module           |
| Static import of module depending on mock | ✅                           | ❌ gets real dep              |
| `await import()` of mocked module         | ✅                           | ✅                            |
| `jest.mock()` placement                   | module level                 | module level                  |

## Checklist When Writing a Test

- [ ] `jest` imported from `@jest/globals`
- [ ] `jest.mock(path, factory)` at module level
- [ ] `await import()` used to get the mocked module and anything that depends on it (in `beforeAll` or inline in each test)
- [ ] Mocked module imported before the module under test
