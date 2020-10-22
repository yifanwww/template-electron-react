# template-electron-create-react-app

A template project for developing electron application by react (create-react-app), redux and typescript.

You can create your own project by importing this template project.

## Build Development Environment

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

### Install Packages

I recommand you using `yarn` to manage your packages, which is (a little) faster and more convenient than `npm`.

Then you need to use `yarn install` to install the packages this template project needs:
- dependencies:
    - @reduxjs/toolkit
    - react
    - react-dom
    - react-redux
    - react-scripts
- development dependencies:
    - @testing-library/jest-dom
    - @testing-library/react
    - @testing-library/user-event
    - @types/jest
    - @types/node
    - @types/react
    - @types/react-dom
    - @types/react-redux
    - cross-env
    - electron
    - electron-builder
    - react-app-rewired
    - ts-jest
    - ts-loader
    - typescript
    - webpack-cli

When installing electron package, it will download a compressed pack directly from `github`, for example `electron-v10.1.1-win32-x64.zip`.

It may take a long time for a bad network connection to `github`. It doesn't work to set a proxy tool for npm or yarn, because the downloading process doesn't download the pack through npm or yarn, but a download tool [`electron/get`](https://github.com/electron/get).

Fortunately, the download tool `electron/get` will check its cache before downloading. So you could download the compressed pack from `github` manually, then copy it to where the cache files placed.

For example, if you need to install electron 9.1.0 in 64-bit windows:
1. Download `electron-v10.1.1-win32-x64.zip` from `github`.
2. Open `file explorer` at `%localappdata%`, create `./electron/Cache` folder.
3. In cache, create `httpsgithub.comelectronelectronreleasesdownloadv10.1.1electron-v10.1.1-win32-x64.zip` folder, then copy the zip file into this folder.
4. Now you can `yarn install` in this project, `electron/get` will find the existing zip file in cache and use it to install electron.

### Use Visual Studio Code

It's recommanded for you to use `visual studio code` to develop your electron application.

After you creating your own project, you need to rename the `template-electron-create-react-app.code-workspace` file to `<YouProjectName>.code-workspace`, and then use vscode open it.

The vscode project configurations need to be set in `./.vscode/settings.json`. I have provided a very simple `settings~.json`, you can copy and edit it.

In git, the `settings.json` file is ignored but the `settings~.json` file is not. For you can set some personal project settings which are probobly not suit for other developers. You should edit the `settings~.json` file and inform others, if you have changed some communal project settings.

## Build This Application

To build this application, you have these scripts to execute:

### `yarn build:main`

Builds electron main process code in `production` mode. These code will be compiled into a file `electron.js` in `./build`.

### `yarn build:renderer`

Builds electron renderer process code in `production` mode, which is actually the react code.

`react-scripts build` controls how these code will be compiled. It correctly bundles React in `production` mode and optimizes the build for the best performance. The build is minified and the filenames include the hashes. See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

But I actually use `react-app-rewired build`, for which I can modify some `react-scripts build` configurations through.

### `yarn build`

This script will first run script `yarn build:renderer` and then run script `yarn build:main`.

Do not change this order, for `yarn build:renderer` (`react-scripts build`) will clear the old files in `./build` and then put the new compiled files into it. If you run script `yarn build:main` first, the new compiled `electron.js` file will be cleared when you run script `yarn build:renderer`.

### `yarn app`

Runs the app in the `production` mode.

You should run script `yarn build` before running script `yarn app`.

### `yarn installer`

Builds a windows installer for application.

You should run script `yarn build` before running script `yarn installer`.

## Develop this application

To develop this application, you have these scripts to execute:

### `yarn web`

Runs the app in the `development` mode, and open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.

You will also see any lint errors in the console.

### `yarn main`

After running script `yarn web`, runs this script to execute the electorn app which will load the ui from the url [http://localhost:3000](http://localhost:3000).

### `yarn test:react`

Launches the test runner in the interactive watch mode.

This script possibly fails to work, for I didn't consider this script when modifying the configurations.

See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn test`

This script will use `jest` to do some unit test for this application.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

To modify this project configurations, check out the [How to modify this project configurations](./configs/README.md).

I also provide some utils for you to develop applications easier:
- [@Electron](./src/utils/Electron/README.md)
- [@Utils](./src/utils/Utils/README.md)
