# CHANGELOG

## [v0.2.0] template-electron-cra [UNRELEASED]
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

## [v0.1.0-fluentui] template-electron-cra [2020-12-30]
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

## [v0.1.0] template-electron-cra [2020-12-30]
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
