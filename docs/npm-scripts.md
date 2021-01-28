# Infos About NPM Scripts
## `yarn app`

Execute this electron application in `production` mode.

**NOTE**: You should run script `yarn build` before running script `yarn app`.

## `yarn build`

This script will first run script `yarn build:renderer` and then run script `yarn build:main`.

Do not change this order, for `yarn build:renderer` (`react-scripts build`) will clear the old files in `build` and then put the new compiled files into it. If you run script `yarn build:main` first, the new compiled `electron.js` file will be cleared when you run script `yarn build:renderer`.

## `yarn build:main`

Builds electron main process code in `production` mode. These code will be compiled into a file `electron.js` in `build`.

## `yarn build:renderer`

Builds electron renderer process code, which is actually the react code, in `production` mode.

`react-scripts build` controls how these code will be compiled. It correctly bundles React in `production` mode and optimizes the build for the best performance. The build is minified and the filenames include the hashes. See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

But this script actually use `react-app-rewired build`, for which can modify some `react-scripts build` configurations through.

## `yarn dev`

Execute `yarn dev:main` and `yarn dev:renderer` concurrently, you can use this script to debug this application.

## `yarn dev:main`

Builds electron main process code in `development` mode. These code will be compiled into a file `electron.js` in `build`.

After compilation, `webpack-electron-reload` plugin (implemented in [webpack-electron-reload.js](../configs/webpack-electron-reload.js)) will start an electron process to execute this application, which will load the ui from the url [http://localhost:3000](http://localhost:3000).

## `yarn dev:renderer`

Build the renderer process code in `development` mode, you can open [http://localhost:3000](http://localhost:3000) to view it in the browser.

`react-scripts start` controls how these code will be compiled. But this script actually use `react-app-rewired start`, for which can modify some `react-scripts start` configurations through.

You will also see any lint errors in the console.

## `yarn installer`

Builds a windows installer for application.

This script possibly fails to work, there are some work to do with this issue.

You should run script `yarn build` before running script `yarn installer`.

## `yarn test:react`

Launches the test runner in the interactive watch mode.

This script possibly fails to work, there are some work to do with this issue.

See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

## `yarn test`

This script will use `jest` to do some unit test for this application.
