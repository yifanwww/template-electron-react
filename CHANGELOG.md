# CHANGELOG
## tecra v0.10.0 (2023-06-20)
### Features

- Support saving/remember window states

### Bug Fixes

- [`Typescript`] fix typescript-plugin-css-modules load paths to resolve imports based on baseUrl

### Breaking Changes

I previously put collected utilities into this project. In this version, I removed them because I already had another project for them.

- Remove all unused/useless/unnecessary util functions.
- Refactor packages structure. Now we only have 6 packages:
  - `@tecra/electron-common`
  - `@tecra/electron-main`
  - `@tecra/electron-renderer`
  - `@tecra/eslint-config`
  - `@tecra/scripts`
  - `@tecra/tsconfigs`
- [`Electron`] For security reasons, enable `contextIsolation` and disable `nodeIntegration`, use preload scripts

### Notable Changes

- [`Lint`] Enable ESLint rule `no-param-reassign`
- [`Lint`] Disable ESLint rule `no-await-in-loop`
- [`Lint`] Disable StyleLint rule `max-nesting-depth`
- [`Hooks`] Delete useless hook `useConstFn`
- [`Types`] Split global-types entries into
  - `@tecra-config/global-types/types/index.node`
  - `@tecra-config/global-types/types/index.react`

### Dependency Changes

- New
  - `electron-store`                            v8.1.0
- Upgrade
  - `@babel/core`                               v7.19.6   -> v7.22.5
  - `@babel/plugin-syntax-flow`                 v7.18.6   -> v7.22.5
  - `@babel/plugin-transform-react-jsx`         v7.19.0   -> v7.22.5
  - `@reduxjs/toolkit`                          v1.8.6    -> v1.9.5
  - `@testing-library/dom`                      v8.19.0   -> v8.20.0
  - `@types/jest`                               v29.2.3   -> v29.5.2
  - `@types/lodash`                             v4.14.189 -> v4.14.195
  - `@types/node`                               v16.11.68 -> v18.16.18
  - `@types/react`                              v17.0.50  -> v17.0.62
  - `@types/react-dom`                          v17.0.17  -> v17.0.20
  - `@types/testing-library__jest-dom`          v5.14.5   -> v5.14.6
  - `browserslist`                              v4.21.4   -> v4.21.9
  - `concurrently`                              v7.4.0    -> v7.6.0
  - `electron`                                  v19.0.11  -> v24.5.0
  - `electron-builder`                          v23.6.0   -> v24.4.0
  - `eslint`                                    v8.24.0   -> v8.42.0
  - `eslint-config-prettier`                    v8.5.0    -> v8.8.0
  - `eslint-plugin-import`                      v2.26.0   -> v2.27.5
  - `eslint-plugin-jest`                        v27.1.3   -> v27.2.1
  - `eslint-plugin-jsx-a11y`                    v6.6.1    -> v6.7.1
  - `eslint-plugin-react`                       v7.31.10  -> v7.32.2
  - `fork-ts-checker-webpack-plugin`            v6.5.2    -> v6.5.3
  - `huksy`                                     v8.0.1    -> v8.0.3
  - `immer`                                     v9.0.15   -> v9.0.21
  - `lint-staged`                               v13.0.3   -> v13.2.2
  - `postcss`                                   v8.4.18   -> v8.4.24
  - `prettier`                                  v2.7.1    -> v2.8.8
  - `react-redux`                               v8.0.4    -> v8.1.0
  - `react-router`                              v6.4.2    -> v6.13.0
  - `react-router-dom`                          v6.4.2    -> v6.13.0
  - `sass`                                      v1.55.0   -> v1.63.4
  - `stylelint`                                 v14.14.0  -> v14.16.1
  - `stylelint-cofnig-recess-order`             v3.0.0    -> v3.1.0
  - `terser-webpack-plugin`                     v5.3.6    -> v5.3.9
  - `type-fest`                                 v3.2.0    -> v3.12.0
  - `typescript`                                v4.8.4    -> v5.1.3
  - `typescript-plugin-css-modules`             v3.4.0    -> v5.0.1
  - `web-vitals`                                v3.0.4    -> v3.3.2
  - `webpack`                                   v5.74.0   -> v5.87.0

## tecra v0.9.0 (2023-06-11)
### Notable Changes

- [`Build`] Speed up compilation with parallel builds
- [`Build`] Set `webpackChunkName`
- [`Build`] Use babel to compile electron main process code
- [`Build`] Turn on `inlineSources` for debugging
- [`Build`] Make webpack support `declare` syntax
- [`CI/CD`] Run `test` on multiple os
- [`NPM`] Add new NPM script `typecheck`
- [`Test`] Store jest caches inside this project
- [`Test`] Change the scope of collecting coverage files
- [`Lint`] Enable rules `import/order`, `@typescript-eslint/require-await`
- [`Lint`] Disable rule `react/require-default-props`
- [`Lint`] Enable rule `@typescript-eslint/consistent-type-exports`, `@typescript-eslint/consistent-type-imports`
- [`Lint`] Sort imports in `case-insensitive` mode
- [`Lint`] Enable rule `@typescript-eslint/no-empty-interface`
- [`Lint`] Allow private/protected/index-signature property access in test files
- [`Lint`] Change naming convention configurations
- [`Lint`] Enable rule `@typescript-eslint/no-floating-promises`, `@typescript-eslint/no-misused-promises`

### Bug Fixes

- [`Hooks`] Fix return type of `useDelayFn`

### Breaking Changes

- **Use `pnpm` instead of `npm` as the package manager**

- [`Lint`] Change enum member naming convention to `UPPER_CASE`
- [`Hooks`] Change `useIsMounted` to return a function to get the state
- [`NPM`] Rename npm script `test-coverage` to `test-full`
- [`TS`] Enable rule `useDefineForClassFields`
- [`TS`] Disabled `namedExports` of plugin `typescript-plugin-css-modules`
- [`Types`] Change type utils for picking keys and props
  - `PickNullableKeys`
  - `PickNonNullableKeys`
  - `PickUndefinableKeys`
  - `PickNonUndefinableKeys`
  - `PickNullishKeys`
  - `PickNonNullishKeys`
  - `PickNullableProps`
  - `OmitNullableProps`
  - `PickNonNullableProps`
  - `OmitNonNullableProps`
  - `PickUndefinableProps`
  - `OmitUndefinableProps`
  - `PickNonUndefinableProps`
  - `OmitNonUndefinableProps`
  - `PickNullishProps`
  - `OmitNullishProps`
  - `PickNonNullishProps`
  - `OmitNonNullishProps`
- [`Types`] Move some global types into `@tecra-pkg/utils-type`
- [`Utils/React`] Delete `ReactImmerReducer`

### Package Changes

- New
  - `@tecra-pkg/utils`
  - `@tecra-pkg/utils-react-router`
- Rename
  - `@tecra/assets` -> `@tecra-pkg/assets`
  - `@tecra/electron-common` -> `@tecra-pkg/electron-common`
  - `@tecra/electron-main` (packages/electron-main) -> `@tecra-app/electron-main` (app/electron-main)
  - `@tecra/electron-renderer` (packages/electron-renderer) -> `@tecra-app/electron-renderer` (app/electron-renderer)
  - `@tecra/eslint-config` (packages/eslint-config) -> `@tecra-config/eslint-config` (configs/eslint-config)
  - `@tecra/global-types` (packages/global-types) -> `@tecra-config/global-types` (configs/global-types)
  - `@tecra/hooks` -> `@tecra-pkg/hooks`
  - `@tecra/scripts` (packages/scripts) -> `@tecra-config/scripts` (configs/scripts)
  - `@tecra/stylelint-config` (packages/stylelint-config) -> `@tecra-config/stylelint-config` (configs/stylelint-config)
  - `@tecra/tsconfigs` (packages/tsconfigs) -> `@tecra-config/tsconfigs` (configs/tsconfigs)
  - `@tecra/utils-react` -> `@tecra-pkg/utils-react`
  - `@tecra/utils-redux` -> `@tecra-pkg/utils-redux`
  - `@tecra/utils-test` -> `@tecra-pkg/utils-test`
  - `@tecra/utils-type` -> `@tecra-pkg/utils-type`
- Remove
  - `@tecra/utils-fluentui`

### Dependency Changes

- New
  - `@babel/core`                               v7.22.5
  - `@babel/plugin-syntax-flow`                 v7.18.6
  - `@babel/plugin-transform-react-jsx`         v7.19.0
  - `@testing-library/dom`                      v8.19.0
  - `@types/testing-library__jest-dom`          v5.14.5
  - `@typescript-eslint/utils`                  v5.40.1
  - `fork-ts-checker-webpack-plugin`            v6.5.2
  - `identity-obj-proxy`                        v3.0.0
  - `jest-environment-jsdom`                    v29.5.0
  - `jest-resolve`                              v29.5.0
  - `postcss`                                   v8.4.18
  - `terser-webpack-plugin`                     v5.3.6
  - `type-fest`                                 v3.2.0
  - `webpack`                                   v5.74.0
- Upgrade
  - `@jest/types`                               v27.5.1   -> v29.5.0
  - `@reduxjs/toolkit`                          v1.6.1    -> v1.8.6
  - `@testing-library/jest-dom`                 v5.14.1   -> v5.16.5
  - `@testing-library/react`                    v12.1.1   -> v12.1.5
  - `@testing-library/react-host`               v7.0.2    -> v8.0.1
  - `@testing-library/user-event`               v13.2.1   -> v14.4.3
  - `@types/electron-devtools-installer`        v2.2.1    -> v2.2.2
  - `@types/jest`                               v27.0.2   -> v29.5.2
  - `@types/node`                               v16.10.2  -> v16.11.68
  - `@types/react`                              v17.0.26  -> v17.0.50
  - `@types/react-dom`                          v17.0.9   -> v17.0.17
  - `@types/react-test-renderer`                v17.0.1   -> v17.0.2
  - `@typescript-eslint/eslint-plugin`          v5.4.0    -> v5.40.1
  - `@typescript-eslint/experimental-utils`     v5.4.0    -> v5.40.1
  - `@typescript-eslint/parser`                 v5.4.0    -> v5.40.1
  - `@typescript-eslint/scope-manager`          v5.4.0    -> v5.40.1
  - `@typescript-eslint/types`                  v5.4.0    -> v5.40.1
  - `@typescript-eslint/typescript-estree`      v5.4.0    -> v5.40.1
  - `@typescript-eslint/visitor-keys`           v5.4.0    -> v5.40.1
  - `babel-jest`                                v27.2.4   -> v29.5.0
  - `browserslist`                              v4.17.2   -> v4.21.4
  - `clsx`                                      v1.1.1    -> v1.2.1
  - `concurrently`                              v6.2.2    -> v7.4.0
  - `error-oop`                                 v0.4.0    -> v0.6.0
  - `electron`                                  v16.0.6   -> v19.0.11
  - `electron-builder`                          v22.11.7  -> v23.6.0
  - `eslint`                                    v8.2.0    -> v8.25.0
  - `eslint-config-airbnb`                      v19.0.0   -> v19.0.4
  - `eslint-config-airbnb-typescript`           v16.1.0   -> v17.0.0
  - `eslint-config-prettier`                    v8.3.0    -> v8.5.0
  - `eslint-plugin-import`                      v2.25.3   -> v2.26.0
  - `eslint-plugin-jest`                        v25.2.4   -> v27.1.3
  - `eslint-plugin-jsx-a11y`                    v6.5.1    -> v6.6.1
  - `eslint-plugin-prettier`                    v4.0.0    -> v4.2.1
  - `eslint-plugin-react`                       v7.27.0   -> v7.31.10
  - `eslint-plugin-react-hooks`                 v4.3.0    -> v4.6.0
  - `husky`                                     v7.0.4    -> v8.0.1
  - `immer`                                     v9.0.6    -> v9.0.15
  - `jest`                                      v27.2.4   -> v29.5.0
  - `jest-watch-typeahead`                      v1.0.0    -> v2.2.2
  - `lint-staged`                               v11.1.2   -> v13.0.3
  - `prettier`                                  v2.4.1    -> v2.7.1
  - `react-app-rewired`                         v2.1.8    -> v2.1.9
  - `react-redux`                               v7.2.5    -> v8.0.4
  - `react-router`                              v6.0.1    -> v6.4.2
  - `react-router-dom`                          v6.0.1    -> v6.4.2
  - `react-scripts`                             v4.0.3    -> v5.0.1
  - `sass`                                      v1.42.1   -> v1.55.0
  - `stylelint`                                 v14.1.0   -> v14.14.0
  - `ts-loader`                                 v8.3.0    -> v9.2.6
  - `typescript`                                v4.4.2    -> v4.8.4
  - `use-immer`                                 v0.6.0    -> v0.7.0
  - `web-vitals`                                v2.1.0    -> v3.0.4
  - `webpack-cli`                               v4.8.0    -> v4.10.0
- Remove
  - `@fluentui/react`                           v8.36.0
  - `@types/lodash`                             v4.14.175
  - `@types/react-redux`                        v7.1.21
  - `error-oop`                                 v0.6.0
  - `jest-circus`                               v27.2.4
  - `lodash`                                    v4.17.21
  - `react-scrollbars-custom`                   v4.0.27
  - `ts-essentials`                             v9.0.0

## tecra v0.8.0 (2022-01-04)
### Features

- Support to open links in external default browser
- [Github] Use cache in CI
- [Hooks] Add parameter `initialValue` into `usePrevious`, parameter `initialValue` of `useBoolean` now is optional
- [Hooks] Add new hooks `useIsMounted` and `usePersistFn`
- [Hooks] Improve `usePrevious`, only re-run effect when value changes
- [Hooks] Improve `useCountdown` to avoid unnecessary re-renders
- [Hooks] Add tests for hooks `useCountdown`, `useInterval`, `useSimpleInterval`, `useSimpleTimeout`, `useTimeout` and `useWhyDidYouUpdate`
- [IPC] Add `IpcServer` and `IpcClient`
- [Lint] When in stage `pre-commit` only lint changed files
- [Lint] Use `stylelint-config-recess-order` to lint css properties order
- [Lint] Disable stylelint rule `selector-max-id`
- [NPM] Add `--if-present` in npm scripts
- [NPM] Add npm script `dev` in not-react packages
- [Renderer] Display app details in the Introduction UI
- [Renderer] Use `react-router` to route urls
- [Test] Support package own `setup.test.ts`
- [Test] Support to pass `--verbose` when do unit test
- [Types] Add global types `PickProp`, `AnyFn`, `UnknownFn` and `VoidReturn`
- [Utils/React] Add utils for callback prop `onRenderXXX`: `defaultOnRender` and `renderFactory`
- [Utils/React] Add type `ReactImmerReducer`
- [Utils/Test] Add `mockLocalStorage` and `mockSessionStorage` to help mock local storage and session storage
- [Utils/Test] Add test utils: `expectElementSnapshot`, `expectSnapshot`, `mockConsoleToMatchSnapshot`
- [Utils/Type] Add base type utilities: `LowerAlpha`, `UpperAlpha`, `Alpha`, `Digit` and `HexDigit`
- [Utils/Type] Add type utilities for hex color: `IsHexColor` and `MakeHexColor`
- [Utils/Type] Add type utilities:
  - `OmitNonNullableProps`
  - `OmitNullableProps`
  - `OmitUndefinableProps`
  - `PickNonNullableKeys`
  - `PickNonNullableProps`
  - `PickNullableKeys`
  - `PickNullableProps`
  - `PickUndefinableKeys`
  - `PickUndefinableProps`

### Changes

- Change local webpack server port to `4321`
- [Git] Use `husky` to execute pre-commit scripts
- [Hooks] Simplify `useConstFn`, use `useConstFn` to create updater actions
- [Test] Fix mocks setup in test for local storage and session storage
- [Test] Set jest environment to `jest-environment-jsdom`
- [Utils/FluenUI] Fix `FluentuiProvider` css class

### Bugfixes

- [Hooks] Clear timeout when unmount in `useDelayFn`

### Breaking Changes

- [Hooks] Rename `useSimpleInterval` to `useSingleInterval`, rename `useSimpleTimeout` to `useSingleTimeout`
- [Hooks] `useKey` is longer supported
- [IPC] `IpcMainWrapper` and `IpcRendererWrapper` are no longer supported
- [Renderer] `KeyboardCaptor` is longer supported
- [Types] Delete type `IChildrenElementProps`
- [Utils/Redux] `createTypedSelector` is no longer supported, use `react-redux` `TypedUseSelectorHook` instead.
- [Utils/Redux] `WritableDraft` won't be re-exported from `immer`
- [Uitls/Type] Move some global types into `@tecra/utils-type`:
  - `Contain`
  - `Contained`
  - `ExcludeFunction`
  - `ExcludeUnderscorePrefix`
  - `ExtractFunction`
  - `OmitUnderscorePrefix`

- Rename type declarations, here only list the (maybe) important changes
  - [Hooks]
    - `IUseBooleanUpdaters`             -> `UseBooleanActions`
    - `ISetCountdownUpdater`            -> `SetCountdown`
    - `IUseIntervalUpdaters`            -> `UseIntervalActions`
    - `IUseSimpleIntervalUpdaters`      -> `UseSingleIntervalActions`
    - `IUseSimpleTimeoutUpdaters`       -> `UseSingleTimeoutActions`
    - `IUseTimeoutUpdaters`             -> `UseTimeoutActions`
    - `IUseToggleUpdaters`              -> `UseToggleActions`
  - [Types]
    - `IChildrenProps`          -> `ReactChildrenProps`
    - `IClientAreaSize`         -> `ClientAreaSize`
  - [Utils/Redux]
    - `IActions`                -> `ReduxActions`
    - `IDispatchingActions`     -> `DispatchingActions`
    - `IDispatchingThunks`      -> `DispatchingThunks`
    - `IReducer`                -> `ReduxReducer`
    - `IThunks`                 -> `ReduxThunks`
    - `IThunk`                  -> `ThunkFn`
    - `IThunkAction`            -> `ThunkAction`
    - `IThunkActionWithArgs`    -> deleted

### Packages Changes

- New
  - `@tecra/utils-react`
  - `@tecra/utils-test`

### Dependency Changes

- New
  - `babel-jest`                                v27.2.4
  - `eslint`                                    v8.2.0
  - `husky`                                     v7.0.4
  - `immer`                                     v9.0.6
  - `jest`                                      v27.2.4
  - `jest-circus`                               v27.2.4
  - `jest-watch-typeahead`                      v1.0.0
  - `react-router`                              v6.0.1
  - `react-router-dom`                          v6.0.1
  - `stylelint-config-recess-order`             v2.5.0
  - `ts-essentials`                             v9.0.0
  - `use-immer`                                 v0.6.0
- Upgrade
  - `@fluentui/react`                           v8.28.2   -> v8.36.0
  - `@testing-library/react`                    v12.0.0   -> v12.1.1
  - `@testing-library/react-hooks`              v7.0.1    -> v7.0.2
  - `@types/jest`                               v26.0.24  -> v27.0.2
  - `@types/lodash`                             v4.14.172 -> v4.14.175
  - `@types/node`                               v14.17.9  -> v16.10.2
  - `@types/react`                              v17.0.18  -> v17.0.26
  - `@typescript-eslint/eslint-plugin`          v4.30.0   -> v5.4.0
  - `@typescript-eslint/experimental-utils`     v4.30.0   -> v5.4.0
  - `@typescript-eslint/parser`                 v4.30.0   -> v5.4.0
  - `@typescript-eslint/scope-manager`          v4.30.0   -> v5.4.0
  - `@typescript-eslint/types`                  v4.30.0   -> v5.4.0
  - `@typescript-eslint/typescript-estree`      v4.30.0   -> v5.4.0
  - `@typescript-eslint/visitor-keys`           v4.30.0   -> v5.4.0
  - `browserslist`                              v4.16.7   -> v4.17.2
  - `concurrently`                              v6.2.1    -> v6.2.2
  - `electron`                                  v13.1.7   -> v15.0.0
  - `eslint-config-airbnb`                      v18.2.1   -> v19.0.0
  - `eslint-config-airbnb-typescript`           v14.0.0   -> v16.1.0
  - `eslint-plugin-import`                      v2.24.2   -> v2.25.3
  - `eslint-plugin-jest`                        v24.5.0   -> v25.2.4
  - `eslint-plugin-jsx-a11y`                    v6.4.1    -> v6.5.1
  - `eslint-plugin-prettier`                    v3.4.1    -> v4.0.0
  - `eslint-plugin-react`                       v7.26.1   -> v7.27.0
  - `eslint-plugin-react-hooks`                 v4.2.0    -> v4.3.0
  - `prettier`                                  v2.3.2    -> v2.4.1
  - `react-redux`                               v7.2.4    -> v7.2.5
  - `sass`                                      v1.38.0   -> v1.42.1
  - `stylelint`                                 v13.13.1  -> v14.1.0
  - `stylelint-config-recess-order`             v2.5.0    -> v3.0.0
  - `stylelint-config-sass-guidelines`          v8.0.0    -> v9.0.1
- Remove
  - `eslint-plugin-deprecation`                 v1.2.1

## tecra v0.7.0 (2021-10-01)
### Features

- [Code] Add class `SessionStorage`
- [Git] Lint code before git commit (in git pre-commit stage)
- [Github] Add issue templates
- [Fluentui] Add `FluentuiProvider` and use it in `Window`
- [Workspaces] Use NPM workspaces to manage source code
- [Test] Use custom jest configurations to do unit test

### Changes

- [Code] Remove premature performance optimization
- [ESlint] Add new extended configuration `airbnb/hooks`
- [ESlint] Add rule `@typescript-eslint/no-empty-function`
- [ESlint] Only enable object variable declarator
- [ESlint] Change rule `@typescript-eslint/naming-convening`
- [ESlint] Disable rule `react/destructuring-assignment`
- [ESlint] Disable rule `react/jsx-props-no-spreading`
- [Github] Use action `setup-node@v2`
- [Types] These type declarations are moved into global declaration
  - `ReactStyleFunc`
  - `IClientAreaSize`
  - `IElementPositionSize`
  - `IElementSize`

### Breaking Changes

- Rename root project name to `tecra`
- [Deps] Bump lock file to v2
- [Webpack] Delete support for custom path alias (use NPM workspaces instead).
- [Workspaces] Use NPM workspaces to manage source code

### Packages

- New
  - `@tecra/assets`
  - `@tecra/electron-common`
  - `@tecra/electron-main`
  - `@tecra/electron-renderer`
  - `@tecra/eslint-config`
  - `@tecra/hooks`
  - `@tecra/global-types`
  - `@tecra/scripts`
  - `@tecra/stylelint-config`
  - `@tecra/tsconfigs`
  - `@tecra/utils-fluentui`
  - `@tecra/utils-redux`

### Dependency Changes

- New
  - `error-oop`                                 v0.4.0
  - `eslint-config-airbnb`                      v18.2.1
  - `lint-staged`                               v11.1.2
  - `stylelint`                                 v13.13.1
  - `stylelint-config-sass-guidelines`          v8.0.0
  - `typescript-plugin-css-modules`             v3.4.0
- Upgrade
  - `@fluentui/react`                           v8.21.1   -> v8.28.2
  - `@reduxjs/toolkit`                          v1.6.0    -> v1.6.1
  - `@testing-library/user-event`               v13.1.9   -> v13.2.1
  - `@types/jest`                               v26.0.23  -> v26.0.24
  - `@types/lodash`                             v4.14.170 -> v4.14.172
  - `@types/node`                               v14.17.4  -> v14.17.9
  - `@types/react`                              v17.0.11  -> v17.0.18
  - `@types/react-dom`                          v17.0.8   -> v17.0.9
  - `@types/react-redux`                        v7.1.16   -> v7.1.18
  - `@typescript-eslint/eslint-plugin`          v4.28.1   -> v4.30.0
  - `@typescript-eslint/experimental-utils`     v4.28.1   -> v4.30.0
  - `@typescript-eslint/parser`                 v4.28.1   -> v4.30.0
  - `@typescript-eslint/scope-manager`          v4.28.1   -> v4.30.0
  - `@typescript-eslint/types`                  v4.28.1   -> v4.30.0
  - `@typescript-eslint/typescript-estree`      v4.28.1   -> v4.30.0
  - `@typescript-eslint/visitor-keys`           v4.28.1   -> v4.30.0
  - `browserslist`                              v4.16.6   -> v4.16.7
  - `chalk`                                     v4.1.1    -> v4.1.2
  - `concurrently`                              v6.2.0    -> v6.2.1
  - `eslint-config-airbnb-typescript`           v12.3.1   -> v14.0.0
  - `eslint-plugin-import`                      v2.23.4   -> v2.24.2
  - `eslint-plugin-jest`                        v24.3.6   -> v24.4.0
  - `eslint-plugin-prettier`                    v3.4.0    -> v3.4.1
  - `eslint-plugin-react`                       v7.24.0   -> v7.25.1
  - `react-scrollbars-custom`                   v4.0.25   -> v4.0.27
  - `sass`                                      v1.35.1   -> v1.38.0
  - `typescript`                                v4.3.5    -> v4.4.2
  - `web-vitals`                                v2.0.1    -> v2.1.0
  - `webpack-cli`                               v4.7.2    -> v4.8.0
- Remove
  - `@types/speed-measure-webpack-plugin`       v1.3.3
  - `node-errors-pro`                           v0.2.0
  - `speed-measure-webpack-plugin`              v1.5.0
  - `typed-css-modules`                         v0.6.8

## tecra v0.6.0 (2021-08-01)
### Features

- [Common]
    - Add new type `Optional<T>`
    - Add util `wait` to wait for some time
    - Add declaration file `common.d.ts`
- [Build]
    - Add internal npm scripts `_cra-build`, `_cra-dev`, `_cra-test`, `_main-build` and `_main-dev`
    - Add new npm script `run-unpacked` to execute the unpacked electron application built by `electron-builder`
- [Github-Actions]
    - Build windows installer and publish it if need
    - Do coverage tests
- [IPC] Add new IPC wrapper `IpcMainWrapper` and `IpcRendererWrapper`
- [RUtils] - DOM
    - Improve the performance of `CanvasUtils`
    - Add new methods in `CanvasUtils`: `createLinePainter`, `createRectPainter`
- [RUtils/React]
    - New React Hooks with tests
        - `useBoolean`
        - `useConst`
        - `useConstFn`
        - `useDelayFn`
        - `useDoubleTrigger`
        - `useForceUpdate`
        - `useImmediateFocus`
        - `useInterval`
        - `useIsFocused`
        - `useIsHovered`
        - `useMount`
        - `usePrevious`
        - `useSimpleInterval`
        - `useSimpleTimeout`
        - `useTimeout`
        - `useToggle`
        - `useUnmount`
        - `useWhyDidYouUpdate`
    - Add interface `ReactChildrenProp`
- [RUtils/Fluentui]
    - Add namespaces `FluentuiEvents` and `FluentuiStyles`
    - Add namespaces `FluentuiStyleFunctions`, `FluentuiTokens` and `FluentuiTokenFunctions`
- [RUtils/Redux]
    - Add `thunkCreattorFactory` to create thunks
- [UI] - Main Window
    - Add tests for react components
    - Add tests for redux reducers
    - Add css properties `overflow` and `user-select` into container `ClientArea`
- Add `AppInfo` to collect applicatio infomation
- Add declaration file `renderer.d.ts`

### Changes

- [Build] Create folder `working` before `build` or `dev`
- [Build] Only do incremental building for scripts
- [Build] Change `browserslist` to 'last 9 chrome versions'
- [Build] Typescript: do not skip lib check
- [Eslint] Set rule `@typescript-eslint/no-explicit-any` to warn level in order to enable stricter type limitation
- [Eslint] Set rule `prefer-destructuring` to disable the prefer of array destructuring
- [Redux] Fix `useDispatchingThunks` not correctly pass arguments
- [Test] Fix test for react
- [Test] Ignore messages we output
- [Test] Rename setupTest.ts to `test.setup.ts`, rename reportWebVitals.ts to `report-web-vitals.ts`
- [UI] Improve ui performance, rename `InfoDisplay` to `Introduction` which will be displayed only after prepared
- [UI] Change `LocalStorage` to be a class

### Breaking Changes

- [Common] Rename 'src/shared' to 'src/common', change import path aliases
- [Public] Change public assets, add `icon.ico`
- [RUtils] Delete `options` argument in old `CanvasUtils` methods
- [RUtils] Delete `IStrictStyle` and `mergeStrictStyles`, move fluentui default theme into `RUtils/Fluentui`

### Dependencies

- New
    - `@testing-library/react-hooks`            v7.0.1
    - `@types/react-test-renderer`              v17.0.1
    - `@typescript-eslint/experimental-utils`   v4.28.1
    - `@typescript-eslint/scope-manager`        v4.28.1
    - `@typescript-eslint/types`                v4.28.1
    - `@typescript-eslint/typescript-estree`    v4.28.1
    - `@typescript-eslint/visitor-keys`         v4.28.1
    - `eslint-plugin-deprecation`               v1.2.1
    - `react-test-renderer`                     v17.0.2
- Upgrade
    - `@fluentui/react`                         v8.14.13  -> v8.21.1
    - `@reduxjs/toolkit`                        v1.5.0    -> v1.6.1
    - `@testing-library/jest-dom`               v5.11.4   -> v5.14.1
    - `@testing-library/react`                  v11.1.0   -> v12.0.0
    - `@testing-library/user-event`             v12.1.10  -> v13.1.9
    - `@types/jest`                             v26.0.21  -> v26.0.23
    - `@types/lodash`                           v4.14.169 -> v4.14.170
    - `@types/node`                             v14.17.3  -> v14.17.4
    - `@types/react-dom`                        v17.0.7   -> v17.0.8
    - `@typescript-eslint/eslint-plugin`        v4.24.0   -> v4.28.1
    - `@typescript-eslint/parser`               v4.24.0   -> v4.28.1
    - `concurrently`                            v6.1.0    -> v6.2.0
    - `electron`                                v13.1.1   -> v13.1.7
    - `electron-builder`                        v22.10.5  -> v22.11.7
    - `eslint-plugin-import`                    v2.23.3   -> v2.23.4
    - `eslint-plugin-react`                     v7.23.2   -> v7.24.0
    - `prettier`                                v2.3.1    -> v2.3.2
    - `react-redux`                             v7.2.3    -> v7.2.4
    - `sass`                                    v1.34.0   -> v1.35.1
    - `ts-jest`                                 v26.5.4   -> v26.5.6
    - `ts-loader`                               v8.0.18   -> v8.3.0
    - `typed-css-modules`                       v0.6.5    -> v0.6.8
    - `typescript`                              v4.3.3    -> v4.3.5
    - `webpack-cli`                             v4.5.0    -> v4.7.2
- Remove
    - `ts-jest`                                 v26.5.6

## tecra v0.5.0 (2021-06-15)
### Features

- Main Process
    - Add `AppPaths` to get appPath and srcPath
- Main Window
    - Add `prepared` property into main redux store and its `usePrepared` hook
    - Dispatch `prepare` thunk when the app start
    - Delete serviceWorker, add reportWebVitals to use `web-vitals`
- Shared
    - Add `Timer`
    - Improve type util `DeepReadonly` to support making more structures deep readonly
    - Add type util `ExcludeUnderscorePrefix`
    - Add type util `OmitUnderscorePrefix`
- Redux
    - Add `IThunk` and `IAsyncThunk` type definitions
    - Re-export `WritableDraft` from `immer/dist/types/types-external`
- Utils
    - Add `IMargin` and `IMarginInfo`, and their transformer, add `mergeToGridTemplate`

### Changes

- Compile
    - Make typescript more strict
    - Rename npm script `build-profile` to `build:profile`
    - Enable typescript incremental compilation
    - Move webpack plugins into scripts, rename them and use typescript to code them
    - Set SMP's format to `human`
    - Fix npm script `build:profile` to enable profiling in the production build
    - Fix aliases of renderer webpack
    - Delete `custom-gitconfig.ts`
    - Move webpack configs into scripts, and use typescript to code them
    - Move typescript configs into scripts
    - Change electron-builder configs to build smaller installer
- Main Window
    - Change redux store structure
    - Simplify the exports from redux
    - Rename `MainPromiseThunk` to `MainAsyncThunk`
- Eslint
    - Allow enum member to be PascalCase style
    - Add rule `@typescript-eslint/return-await` at `in-try-catch`
    - Add rule `import/no-default-export` at `error`
    - Add rule `import/no-deprecated` at `warn`
    - Set rule `import/no-cycle` to `error`

### Breaking Changes

- Move `IDotPosition` and `IRectPosition` into Utils/DOM
- Use typescript to write scripts, compile them before build or dev
- Redux
    - Delete `ReduxHooksFactory`, use `createTypedSelector`, `useDispatchingActions` and `useDispatchingThunks` instead
    - Support to only export non-internal actions out of redux
- Delete `windowIpc`, use `mainIpc` and `rendererIpc` instead

### Dependencies

- Use `lodash` rather than `lodash-es`
- New
    - `@typescript-eslint/parser`           v4.24.0
    - `web-vitals`                          v2.0.1
    - `@types/speed-measure-webpack-plugin` v1.3.3
- Upgrade
    - `@fluentui/react`                     from v8.8.0 to v8.14.13
    - `@reduxjs/toolkit`                    from v1.5.0 to v1.5.1
    - `@testing-library/jest-dom`           from v4.2.4 to v5.11.4
    - `@testing-library/react`              from v9.3.2 to v11.1.0
    - `@testing-library/user-event`         from v7.1.2 to v12.1.10
    - `@typescript-eslint/eslint-plugin`    from v4.19.0 to v4.24.0
    - `@types/node`                         from v14.14.32 to v14.17.3
    - `@types/react`                        from v17.0.3 to v17.0.11
    - `@types/react-dom`                    from v17.0.3 to v17.0.7
    - `chalk`                               from v4.1.0 to v4.1.1
    - `concurrently`                        from v6.0.0 to v6.1.0
    - `electron`                            from v12.0.5 to v13.1.1
    - `electron-devtools-installer`         from v3.1.1 to v3.2.0
    - `eslint-config-prettier`              from v8.1.0 to v8.3.0
    - `eslint-plugin-import`                from v2.22.1 to v2.23.3
    - `eslint-plugin-jest`                  from v24.3.2 to v24.3.6
    - `eslint-plugin-prettier`              from v3.3.1 to v3.4.0
    - `eslint-plugin-react`                 from v7.23.1 to v7.23.2
    - `prettier`                            from v2.2.1 to v2.3.1
    - `sass`                                from v1.32.8 to v1.34.0
    - `speed-measure-webpack-plugin`        from v1.4.2 to v1.5.0
- Remove
    - `immer`                               v9.0.1
- Move dependency `react-scripts` to be a dev dependency

## tecra v0.4.0 (2021-05-09)
### Features

- NPM
    - Add npm script `pretty` to use prettier to format all code
- Redux
    - Add `useReduxDispatchedActions` and `useReduxDispatchedThunks` hooks, the dispatched actions and dispatched thunks will be cached in `ReduxHooksFactory`
    - Add `Components` and `Containers` folders
    - Add `MainPromiseThunk` type
    - Add support to infer the return type of async thunks while using `useReduxDispatchedThunks`
- Types
    - Add new types utils `Object`, `ObjectStr` and `ObjectNum`
    - Add new types for renderer
        - `IClientAreaSize`
        - `IDotPosition`
        - `IElementPosition`
        - `IElementSize`
        - `IOffset`
        - `IRectPosition`
- Frameless Window
    - Now only provide an initial `FramelessWindow` and `TitleBar`, the client area size will be provided from `TitleBar`
- Fluent UI
    - Add event type alias for the following components, see `src/renderer/Utils/Fluentui/EventsInProps.ts`:
        - ChoiceGroup
        - ComboBox
        - ContextualMenu
        - Dropdown
        - List
        - Pivot
        - TextField
        - Toggle
- Hooks
    - New hooks:
        - `useClientAreaSize`
        - `useCountdown`
- DOM
    - Add `CanvasUtils` to operate canvas dom, it contains the following methods:
        - `drawLines`
        - `drawLinesOffset`
        - `fillRects`
        - `fillRectsOffset`

### Changes

- Git
    - Ignore *.cjs, *.js and *.mjs in src
- Compilation
    - Disable `eslint-webpack-plugin` completely
- Eslint
    - Disable `no-bitwise` rule
    - Disable `no-constant-condition` rule
- Redux
    - Rename type `Reducer` to `MainReducer`
    - Rename type `Thunk` to `MainThunk`
    - Disable `immutableCheck` and `serializableCheck` when in development

### Breaking Changes

- Move `ColorTransformer`, `npm2px` and `npm2pt` into `#RUtils/Theme`
- Move `WindowIpc` into `#MUtils/Ipc`
- Rename `src/renderer/Main` to `src/renderer/MainWindow`
- Rename `src/renderer/MainWindow/redux` to `src/renderer/MainWindow/Redux`
- Delete interface `ClientAreaSize`
- Delete `AbstractClientArea`, now your own client-area containers should not be inherited from `AbstractClientArea`
- Delete custom hook `useReduxDispatch`, please use `useReduxDispatchedActions` or `useReduxDispatchedThunks` instead
- Delete `mapMainDispatchToProps`

### Dependencies

- Upgrade
    - Update 'electron' from v12.0.0 to v12.0.5

## tecra v0.3.0 (2021-04-06)
### Features

- Compilation
    - Add new NPM script `build-profile` to enable profiling in production build
- React
    - Set environment variable `INLINE_RUNTIME_CHUNK` as `false` to disable the runtime chunk inlining
    - Set environment variable `PUBLIC_URL` as `./` to avoid react loading the `homepage` value of package.json while compiling
- Redux
    - Add `configureGlobalStore` util function to help creating a global store
- Eslint
    - Add `eslint-plugin-node` into eslint configs
    - Set `root` to `true`
- Add css id `ThemeProvider` for fluentui's ThemeProvider
- Add `Contain` and `Contained` type util definitions
- Use SCSS instead of fluentui css-in-js to apply CSS styles

### Changes

- Git
    - Update .gitattributes
- Compilation
    - Refactor base webpack configs
    - Stop hacking eslint configs in renderer webpack configs
    - Update typescript configs

### Breaking Changes

- Use npm instead of yarn to manage repository
- Change user name from 'YSoftwareTech' to 'YSoftwareRepo'

### Dependencies

- New
    - Add 'eslint-config-prettier' v8.1.0
    - Add 'prettier' v2.2.1
    - Add 'sass' v1.32.8
    - Add 'typed-css-modules' v0.6.5
- Upgrade
    - Update '@fluentui/react' from v8.0.0-beta.49 to v8.8.0
    - Update '@types/jest' from v24.0.0 to v26.0.21
    - Update '@types/node' from v12.19.9 to v14.14.32
    - Update '@types/react' from v17.0.0 to v17.0.3
    - Update '@types/react-dom' from v17.0.0 to v17.0.3
    - Update '@types/react-redux' from v7.1.15 to v7.1.16
    - Update '@typescript-eslint/eslint-plugin' from v4.14.1 to v4.19.0
    - Update 'concurrently' from v5.3.0 to v6.0.0
    - Update 'electron' from v11.2.1 to v12.0.0
    - Update 'electron-builder' from v22.9.1 to v22.10.5
    - Update 'eslint-plugin-jest' from v24.1.3 to v24.3.2
    - Update 'eslint-plugin-prettier' from v3.3.0 to v3.3.1
    - Update 'eslint-plugin-react' from v7.21.5 to v7.23.1
    - Update 'immer' from v8.0.0 to v9.0.1
    - Update 'react' from v17.0.1 to v17.0.2
    - Update 'react-app-rewired' from v2.1.6 to v2.1.8
    - Update 'react-dom' from v17.0.1 to v17.0.2
    - Update 'react-redux' from v7.2.2 to v7.2.3
    - Update 'react-scripts' from v4.0.1 to v4.0.3
    - Update 'speed-measure-webpack-plugin' from v1.3.3 to v1.4.2
    - Update 'ts-jest' from v26.1.3 to v26.5.4
    - Update 'ts-loader' from v8.0.1 to v8.0.18
    - Update 'typescript' from v4.1.5 to v4.2.3
    - Update 'webpack-cli' from v3.3.12 to v4.5.0

## tecra v0.2.0 (2021-02-19)
### Features

- Compilation
    - Add source map when compiling main code by webpack
    - Add npm scripts hooks `prebuild` and `predev`, to edit git configs to only permit fast-forward pull
    - Add `electron-devtools-installer` to install extensions in development mode
- Environment
    - Add dependency `node-errors-pro` to support more kinds of errors
- Redux
    - Add `global-state` to improving the performance of redux
    - Add `createGlobalEntityAdapter` to use adapters in global state, the adapters created by `createEntityAdapter` (provided by `@reduxjs/toolkit`) cannot be used out of redux store
    - Add `ReduxHooksFactory`, it returns `useReduxDispatch` and `useReduxSelector`
        - `useReduxDispatch`
          an custom hook to use dispatch in functional containers, pass actions and thunks as the second parameter
        - `useReduxSelector`
          an custom hook to use the global state in functional containers
    - Add `IExactlyActionsDestructuring` and `IExactlyThunksDestructuring` to do a strict type check for `mapMainDispatchToProps` and `useReduxDispatch`
- Fluentui
    - Add `IStrictStyle` to do a strict type check for styles
    - Add `mergeStrictStyles` to use `IStrictStyle`
    - Use `ThemeProvider` to provide theme
- Transformer
    - Add `num2px` and `num2pt` utils
- WindowManager
    - Add `WindowManager` to manage multi windows
    - Delete the old window managing solution

### Changes

- Ipc
    - Delete all ipc wrappers
- Environment
    - Restructure project, change path aliases
    - Update dependency `@fluentui/react` from v7.157.1 to v8.0.0-beta.49
    - Update dev dependency `eslint-config-airbnb-typescript` from v12.0.0 to v12.3.1
    - Change line length limit, from 100 to 120
- Fluentui
    - Update fluentui styles and render utils
- Redux
    - Rename `IMapActionsToProps` to `IActionsDestructuring`
    - Rename `IMapThunksToProps` to `IThunksDestructuring`
- Eslint
    - Allow 'PascalCase' naming for variable
    - Disable `prefer-arrow-callback`
    - Enable `react-hooks/rules-of-hooks` and `react-hooks/exhaustive-deps`
- Scripts
    - Delete 'utils.mjs', move the util functions into 'app.mjs'

### Dependencies

- dependencies
    - @fluentui/react: ^8.0.0-beta.49
    - @reduxjs/toolkit: ^1.5.0
    - immer: ^8.0.0
    - node-errors-pro: ^0.2.0
    - react: ^17.0.1
    - react-dom: ^17.0.1
    - react-redux: ^7.2.2
    - react-scripts: 4.0.1
    - react-scrollbars-custom: ^4.0.25
- dev dependencies
    - @testing-library/jest-dom: ^4.2.4
    - @testing-library/react: ^9.3.2
    - @testing-library/user-event: ^7.1.2
    - @types/electron-devtools-installer: ^2.2.0
    - @types/jest: ^24.0.0
    - @types/lodash-es: ^4.17.4
    - @types/node: ^12.19.9
    - @types/react: ^17.0.0
    - @types/react-dom: ^17.0.0
    - @types/react-redux: ^7.1.15
    - @typescript-eslint/eslint-plugin: ^4.14.1
    - chalk: ^4.1.0
    - concurrently: ^5.3.0
    - electron: 11.2.1
    - electron-builder: ^22.9.1
    - electron-devtols-installer: ^3.1.1
    - eslint-config-airbnb-typescript: ^12.3.1
    - eslint-plugin-import: ^2.22.1
    - eslint-plugin-jest: ^24.1.3
    - eslint-plugin-jsx-a11y: ^6.4.1
    - eslint-plugin-node: ^11.1.0
    - eslint-plugin-prettier: ^3.3.0
    - eslint-plugin-react: ^7.21.5
    - eslint-plugin-react-hooks: ^4.2.0
    - lodash-es: ^4.17.20
    - react-app-rewired: ^2.1.6
    - rimraf: ^3.0.2
    - speed-measure-webpack-plugin: ^1.3.3
    - ts-jest: ^26.1.3
    - ts-loader: ^8.0.1
    - typescript: ^4.1.3
    - webpack-cli: ^3.3.12

## tecra v0.1.0-fluentui (2020-12-30)
### Main Info of Environment

- create-react-app@4.0.1
- electron@11.1.0
- fluentui@7.155.3
- react@^17.0.1
- typescript@^4.1.3

### Features

- custom eslint configurations
- custom webpack features
    - concurrently build main process code and renderer process code in development compiling mode
    - build main process code firstly and build renderer process code secondly in production compiling mode
    - support automatically reloading electron process in development compiling mode
    - support path alias in both in main process code and renderer process code
    - support compiling common code when compiling main process code or renderer process code, the common code should be placed in `src/shared`
    - use `speed-measure-webpack-plugin` to show the timecost info in production compiling mode
- custom webpack plugins
    - [webpack-electron-reload]
      Automatically restart electron process after updating code, and set the cwd to the `working` folder
    - [webpack-mkdir]
      Automatically create working directory before starting electron process
- custom type definitions
    - ReactStyleFunc
    - IReducer, IMapActionsToProps and IMapThunkToProps
    - type definitions for fluentui props and fluentui styles

## tecra v0.1.0 (2020-12-30)
### Main Info of Environment

- create-react-app@4.0.1
- electron@11.1.0
- react@^17.0.1
- typescript@^4.1.3

### Features

- custom eslint configurations
- custom webpack features
    - concurrently build main process code and renderer process code in development compiling mode
    - build main process code firstly and build renderer process code secondly in production compiling mode
    - support automatically reloading electron process in development compiling mode
    - support path alias in both in main process code and renderer process code
    - support compiling common code when compiling main process code or renderer process code, the common code should be placed in `src/shared`
    - use `speed-measure-webpack-plugin` to show the timecost info in production compiling mode
- custom webpack plugins
    - [webpack-electron-reload]
      Automatically restart electron process after updating code, and set the cwd to the `working` folder
    - [webpack-mkdir]
      Automatically create working directory before starting electron process
- custom type definitions
    - ReactStyleFunc
    - IReducer, IMapActionsToProps and IMapThunkToProps
