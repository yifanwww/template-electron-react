# template-electron-create-react-app

A template project for developing electron application by react (create-react-app), with using redux and typescript.

You can create your own project by importing this template project.

## Configure Development Environment

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

### Install Packages

It's recommanded for you to use `yarn` to manage your packages, which is (a little) faster and more convenient than `npm`.

Use `yarn install` to install the packages this template project needs:
- dependencies:
    - @reduxjs/toolkit
    - immer
    - lodash
    - react
    - react-dom
    - react-redux
    - react-scripts
    - react-scrollbars-custom
- development dependencies:
    - @testing-library/jest-dom
    - @testing-library/react
    - @testing-library/user-event
    - @types/jest
    - @types/lodash
    - @types/node
    - @types/react
    - @types/react-dom
    - @types/react-redux
    - @typescript-eslint/eslint-plugin
    - electron
    - electron-builder
    - eslint-config-airbnb-typescript
    - eslint-config-react-app
    - eslint-plugin-jest
    - eslint-plugin-node
    - eslint-plugin-prettier
    - react-app-rewired
    - speed-measure-webpack-plugin
    - ts-jest
    - ts-loader
    - typescript
    - webpack-cli

When installing `electron` package, it will download a compressed pack, `electron-v11.1.0-win32-x64.zip`, directly from Github by its own download tool [electron/get](https://github.com/electron/get). It may take a long time if you do not have a fast network connection to Github.

Fortunately, the download tool `electron/get` will check its cache before downloading. So you could download the compressed pack from Github manually, then copy it to where the cache files placed.

You have this steps to do:
1. Download `electron-v11.1.0-win32-x64.zip` from Github:
   [https://github.com/electron/electron/releases/download/v11.1.0/electron-v11.1.0-win32-x64.zip](https://github.com/electron/electron/releases/download/v11.1.0/electron-v11.1.0-win32-x64.zip).
2. Open `File Explorer` at `%localappdata%`, create `electron/Cache` folder.
3. Create `httpsgithub.comelectronelectronreleasesdownloadv11.1.0electron-v11.1.0-win32-x64.zip` folder, and then copy the zip file into it.
4. Now you can `yarn install` in this project, `electron/get` will find the existing zip file and use it to install electron.

### Use Visual Studio Code as Your Editor

It's recommanded for you to use `Visual Studio Code` to develop your electron application.

After you creating your own project, you need to rename the `template-electron-create-react-app.code-workspace` file to `<YouProjectName>.code-workspace`, and then use vscode to open it.

The vscode project configurations need to be set in `.vscode/settings.json`. I have provided a very simple `settings~.json`, you can copy and edit it.

For git, the `settings.json` file is ignored but the `settings~.json` file is not. For you can set some personal project settings which are probobly not suit for other developers. You should edit the `settings~.json` file and inform others, if you have changed some communal project settings.

## Build This Application
### `yarn build:main`

Builds electron main process code in `production` mode. These code will be compiled into a file `electron.js` in `build`.

### `yarn build:renderer`

Builds electron renderer process code, which is actually the react code, in `production` mode.

`react-scripts build` controls how these code will be compiled. It correctly bundles React in `production` mode and optimizes the build for the best performance. The build is minified and the filenames include the hashes. See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

But I actually use `react-app-rewired build`, for which I can modify some `react-scripts build` configurations through.

### `yarn build`

This script will first run script `yarn build:renderer` and then run script `yarn build:main`.

Do not change this order, for `yarn build:renderer` (`react-scripts build`) will clear the old files in `./build` and then put the new compiled files into it. If you run script `yarn build:main` first, the new compiled `electron.js` file will be cleared when you run script `yarn build:renderer`.

### `yarn installer`

Builds a windows installer for application.

You should run script `yarn build` before running script `yarn installer`.

## Develop this application
### `yarn build:dev`

Builds electron main process code in `development` mode. These code will be compiled into a file `electron.js` in `build`.

### `yarn app:web`

Build the renderer process code in the `development` mode, and automatically open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.

You will also see any lint errors in the console.

### `yarn test:react`

Launches the test runner in the interactive watch mode.

This script possibly fails to work, for I didn't consider this script when modifying the configurations.

See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn test`

This script will use `jest` to do some unit test for this application.

## Execute this application
### `yarn app`

Execute this electron application in `production` mode.

You should run script `yarn build` before running script `yarn app`.

### `yarn app:dev`

Execute this electron application in `development` mode, which will load the ui from the url [http://localhost:3000](http://localhost:3000).

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

To modify this project configurations, check out the [How to modify this project configurations](./configs/README.md).
