# CHANGELOG

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
