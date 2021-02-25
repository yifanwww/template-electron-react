# Infos About NPM Scripts
## `npm run app`

Execute this electron application in `production` mode.

**NOTE**: You should run script `npm run build` before running script `npm run app`.

## `npm run build`

This script will first run script `npm run build:renderer` and then run script `npm run build:main`.

Do not change this order, for `npm run build:renderer` (`react-scripts build`) will clear the old files in `build` and then put the new compiled files into it. If you run script `npm run build:main` first, the new compiled `electron.js` file will be cleared when you run script `npm run build:renderer`.

## `npm run build:main`

Builds electron main process code in `production` mode. These code will be compiled into a file `electron.js` in `build`.

## `npm run build:renderer`

Builds electron renderer process code, which is actually the react code, in `production` mode.

`react-scripts build` controls how these code will be compiled. It correctly bundles React in `production` mode and optimizes the build for the best performance. The build is minified and the filenames include the hashes. See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

But this script actually use `react-app-rewired build`, for which can modify some `react-scripts build` configurations through.

## `npm run dev`

Execute `npm run dev:main` and `npm run dev:renderer` concurrently, you can use this script to debug this application.

## `npm run dev:main`

Builds electron main process code in `development` mode. These code will be compiled into a file `electron.js` in `build`.

After compilation, `webpack-electron-reload` plugin (implemented in [webpack-electron-reload.js](../configs/webpack-electron-reload.js)) will start an electron process to execute this application, which will load the ui from the url [http://localhost:3000](http://localhost:3000).

## `npm run dev:renderer`

Build the renderer process code in `development` mode, you can open [http://localhost:3000](http://localhost:3000) to view it in the browser.

`react-scripts start` controls how these code will be compiled. But this script actually use `react-app-rewired start`, for which can modify some `react-scripts start` configurations through.

You will also see any lint errors in the console.

## `npm run installer`

Builds a windows installer for application.

This script possibly fails to work, there are some work to do with this issue.

You should run script `npm run build` before running script `npm run installer`.

## `npm run test:react`

Launches the test runner in the interactive watch mode.

This script possibly fails to work, there are some work to do with this issue.

See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

## `npm run test`

This script will use `jest` to do some unit test for this application.
