# NPM Scripts
## public npm scripts
### `build`

This script will build all packages, then build `@tecra/electron-renderer` (where electron renderer process code is) and finally build `@tecra/electron-main` (where electron main process code is).

### `build:app`

This script will only build `@tecra/electron-renderer` and then build `@tecra/electron-main`.

Do not change this order, we actually use `react-scripts build` to build the electron renderer process code, and this command will clear folder `build` first.
If `@tecra/electron-main` is built before `@tecra/electron-renderer`, when building `@tecra/electron-renderer` the compiled files of `@tecra/electron-main` will be deleted.

### `build:main`

Build `@tecra/electron-main` in `production` mode. These code will be compiled into a file `electron.js` in `build`.

### `build:renderer`

Build `@tecra/electron-renderer`.

`react-scripts build` controls how these code will be compiled. It correctly bundles React in `production` mode and optimizes the build for the best performance. The build is minified and the filenames include the hashes. See the section about [deployment] for more information.

But this script actually use `react-app-rewired build`, for which can modify some `react-scripts build` configurations through.

### `build:renderer-profile`

Build `@tecra/electron-renderer` and enable profiling for better debugging production build.

For more information see [profiling production build].

### `build-packages`

Build all packages (except those packages which no need to be compiled, and electron related packages `@tecra/electron-main` and `@tecra/electron-renderer`).

### `build-profile`

This script will only build `@tecra/electron-renderer` and then build `@tecra/electron-main`.

When building `@tecra/electron-renderer`, profiling will be enabled for better debugging production build.

For more information see [profiling production build].

### `build-scripts`

The scripts are code by typescript, you should compile them before developing, building or testing this application.

**NOTE**: You don't need to run script `build-script` manually if you just want to run scripts [`build`] or [`dev`].

### `clean`

Clean all compiled files, test result files, some cache files and some building related files (such `*.tsbuildinfo`).

### `dev`

This script will build all packages, then build `@tecra/electron-main` and `@tecra/electron-renderer` in development concurrently.

You can use this script to debug this application.

### `dev:main`

Build `@tecra/electron-main` in development mode and enable electron hot reload. These code will be compiled into a file `electron.js` in `build`.

After compilation, `webpack-electron-reload` plugin (implemented in [webpack-electron-reload.js]) will start an electron process to execute this application, which will load the ui from the url [http://localhost:4321].

### `dev:renderer`

Build `@tecra/electron-renderer` in development mode and enable css, javascript hot reload.

`react-scripts start` controls how these code will be compiled. But this script actually use `react-app-rewired start`, for which can modify some `react-scripts start` configurations through.

You will also see any compile errors in the console.

### `format`

Format all files by `prettier`.

### `gen-installer`

Generate this application installers.

This script now only support to generate a windows installer.

You should run script [`build`] before running script `gen-installer`.

### `lint`

Use ESLint to lint all Typescript code and use `StyleLint` to lint all css / scss code.

### `post-install`

Check in git hook scripts.

### `pre-commit`

Lint edited files before you git commit your changes.

### `run-build`

Execute this electron application in `production` mode.

**NOTE**: You should run script `npm run build` before running script `npm run run-build`.

### `test`

You cannot run this script in project root but in some packages.

This script will launch the test runner in the interactive watch mode.

See the section about [running tests] for more information.

### `test-full`

Do full coverage test in all packages.

<!-- link list -->

[`build`]: #build
[`dev`]: #dev

[deployment]: https://facebook.github.io/create-react-app/docs/deployment
[profiling production build]: https://create-react-app.dev/docs/production-build/#profiling
[running tests]: https://facebook.github.io/create-react-app/docs/running-tests

[http://localhost:4321]: http://localhost:4321
[webpack-electron-reload.js]: ../configs/webpack-electron-reload.js
