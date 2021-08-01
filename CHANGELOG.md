# CHANGELOG

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
