# template-electron-react

A template project for developing Electron application, using React and TypeScript.

You can create your own project by importing this template project.

## Use Visual Studio Code as Your Editor

It's recommanded for you to use `Visual Studio Code` to develop your Electron application.

After creating your own project, you will need to rename the `template-electron-react.code-workspace` file to `<YouProjectName>.code-workspace`, then open it in vscode.

## Build This Application

You're required to use `pnpm` to manage the npm dependencies, please install the specific version of `pnpm` (check the `packageManager` field in package.json).

If you have `corepack` installed, run `corepack enable pnpm` then you don't need to care about the `pnpm` versions.

Run these commands to prepare the environment:

```sh
pnpm install
pnpm run prepare-env
```

Then you can build this application:

```sh
pnpm run build
pnpm run gen-installer
```

## Development

After preparing the environment, run these commands to launch this application in development mode with HMR support:

```sh
pnpm run build-libs
pnpm run dev
```

Run these commands to perform the type checking, linting and unit testing:

```sh
pnpm run typecheck
pnpm run lint
pnpm run test-full
```
