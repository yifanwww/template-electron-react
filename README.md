# template-electron-cra

A template project for developing electron application by react (CRA), with using redux and typescript. 
This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

You can create your own project by importing this template project.

## Use Visual Studio Code as Your Editor

It's recommanded for you to use `Visual Studio Code` to develop your electron application.

After you creating your own project, you need to rename the `template-electron-create-react-app.code-workspace` file to `<YouProjectName>.code-workspace`, and then use vscode to open it.

The vscode project configurations need to be set in `.vscode/settings.json`. I have provided a very simple `settings~.json`, you can copy and edit it.
For git, the `settings.json` file is ignored but the `settings~.json` file is not. For you can set some personal project settings which are probobly not suit for other developers. You should edit the `settings~.json` file and inform others, if you have changed some communal project settings.

You need to install two vscode package: `ESLint` and `Prettier - Code formatter`.

## More Information

- If the installation of electron tooks too much time, or it fails to install electron, check out the [Infos About The Installation Of Electron](./docs/install-electron.md).
- Check out the [Infos About NPM Scripts](./docs/npm-scripts.md) to know how to use the existing `npm` scripts.
- You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).
- To learn React, check out the [React documentation](https://reactjs.org/).
- To modify this project configurations, check out the [How To Modify This Project Configurations](./docs/modify-project-configurations.md).
