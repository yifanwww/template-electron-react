# NPM Scripts
## public npm scripts
### `build`

This script builds all the code.

### `build-app`

This script only build the app. Build order: `@tecra/app-common` -> `@tecra/app-renderer` -> `@tecra/app-main`.

Do not change this order, we actually use `react-scripts build` to build the electron renderer process code, and this command will clear folder `build` first.
If `@tecra/app-main` is built before `@tecra/app-renderer`, when building `@tecra/app-renderer` the compiled files of `@tecra/app-main` will be deleted.

### `build-app:renderer`

Build `@tecra/app-renderer`.

`react-scripts build` controls how these code will be compiled. It correctly bundles React in `production` mode and optimizes the build for the best performance. The build is minified and the filenames include the hashes. See the section about [deployment] for more information.

But this script actually use `react-app-rewired build`, for which can modify some `react-scripts build` configurations through.

### `build-app:renderer-profile`

Build `@tecra/app-renderer` and enable profiling for better debugging production build.

For more information see [profiling production build].

### `build-scripts`

The scripts are code by typescript, you should compile them before developing, building or testing this application.

**NOTE**: You don't need to run script `build-script` manually if you just want to run scripts [`build`] or [`dev`].

### `clean`

Clean all compiled files, test result files, some cache files and some building related files (such `*.tsbuildinfo`).

### `dev`

This script will build all packages, then build `@tecra/app-main` and `@tecra/app-renderer` in development concurrently.

You can use this script to debug this application.

### `dev:main`

Build `@tecra/app-main` in development mode and enable electron hot reload.

After compilation, `ReloadElectronWebpackPlugin` will start an electron process to execute this application, which will load the ui from the url [http://localhost:4321].

### `dev:renderer`

Build `@tecra/app-renderer` in development mode and enable css, javascript hot reload.

`react-scripts start` controls how these code will be compiled. But this script actually use `react-app-rewired start`, for which can modify some `react-scripts start` configurations through.

You will also see any compile errors in the console.

### `format`

Format all files by `prettier`.

### `gen-installer`

Generate this application installers.

This script now only support to generate a windows installer.

You should run script [`build`] before running script `gen-installer`.

### `lint`

Use `ESLint` to lint all Typescript code and use `StyleLint` to lint all css / scss code.

### `pre-commit`

Lint edited files before you git commit your changes.

### `run-build`

Execute this electron application in `production` mode.

**NOTE**: You should run script `npm run build` before running script `npm run run-build`.

### `run-unpacked`

After `gen-installer`, can use this script to run the executable binary.

### `test-full`

Do full coverage test in all packages.

<!-- link list -->

[`build`]: #build
[`dev`]: #dev

[deployment]: https://facebook.github.io/create-react-app/docs/deployment
[profiling production build]: https://create-react-app.dev/docs/production-build/#profiling

[http://localhost:4321]: http://localhost:4321
