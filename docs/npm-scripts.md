# Information About NPM Scripts
## public npm scripts
### `build`

This script will first run script [`_cra-build`] and then run script [`_main-build`].

Do not change this order, for script [`_cra-build`] (`react-scripts build`) will clear the old files in folder `build` and then put the new compiled files into it. If you run script [`_main-build`] first, the new compiled `electron.js` file will be cleared when running script [`_cra-build`].

### `build:main`

Only calls script [`_main-build`].

### `build:renderer`

Only calls script [`_cra-build`].

### `build-profile`

Enable profiling for better debugging production build.

For more information see [profiling production build].

### `build-scripts`

The scripts are code by typescript, you should compile them before developing, building or testing this application.

**NOTE**: You don't need to run script `build-script` manually if you just want to run scripts [`build`] or [`dev`].

### `dev`

Execute scripts [`_cra-dev`] and [`_main-dev`] concurrently, you can use this script to debug this application.

### `dev:main`

Only calls script [`_main-dev`].

### `dev:renderer`

Only calls script [`_cra-dev`].

### `gen-installer`

Builds a windows installer for application.

This script possibly fails to work, there are some work to do with this issue.

You should run script [`build`] before running script `gen-installer`.

### `run-build`

### `run-unpacked`

Execute this electron application in `production` mode.

**NOTE**: You should run script `npm run build` before running script `npm run run-build`.

### `test`

Only calls script [`_cra-test`] with argument `--coverage`.

### `test-coverage`

Only calls script [`_cra-test`] with arguments `--coverage` and `--watchAll=false` (to disable watch mode).

## internal npm scripts
### `_cra-build`

Builds electron renderer process code, which is actually the react code, in `production` mode.

`react-scripts build` controls how these code will be compiled. It correctly bundles React in `production` mode and optimizes the build for the best performance. The build is minified and the filenames include the hashes. See the section about [deployment] for more information.

But this script actually use `react-app-rewired build`, for which can modify some `react-scripts build` configurations through.

### `_cra-dev`

Build the renderer process code in `development` mode, you can open [http://localhost:3000] to view it in the browser.

`react-scripts start` controls how these code will be compiled. But this script actually use `react-app-rewired start`, for which can modify some `react-scripts start` configurations through.

You will also see any lint errors in the console.

### `_cra-test`

Launches the test runner in the interactive watch mode.

This script possibly fails to work, there are some work to do with this issue.

See the section about [running tests] for more information.

### `_main-build`

Builds electron main process code in `production` mode. These code will be compiled into a file `electron.js` in `build`.

### `_main-dev`

Builds electron main process code in `development` mode. These code will be compiled into a file `electron.js` in `build`.

After compilation, `webpack-electron-reload` plugin (implemented in [webpack-electron-reload.js]) will start an electron process to execute this application, which will load the ui from the url [http://localhost:3000].

<!-- link list -->

[`_cra-build`]: #_cra-build
[`_cra-dev`]: #_cra-dev
[`_cra-test`]: #_cra-test
[`_main-build`]: #_cra-build
[`_main-dev`]: #_cra-dev
[`build`]: #build
[`dev`]: #dev

[deployment]: https://facebook.github.io/create-react-app/docs/deployment
[profiling production build]: https://create-react-app.dev/docs/production-build/#profiling
[running tests]: https://facebook.github.io/create-react-app/docs/running-tests

[http://localhost:3000]: http://localhost:3000
[webpack-electron-reload.js]: ../configs/webpack-electron-reload.js
