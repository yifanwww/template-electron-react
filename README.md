# template-electron-react

A template project for developing Electron application, using React and TypeScript.

You can create your own project by importing this template project. Once finished, you need to search for "template-electron-react" and replace all of them with your application name.

## Use VSCode as Your Editor

It's recommanded for you to use VSCode to develop your Electron application.

Rename `template-electron-react.code-workspace` to `<YouProjectName>.code-workspace`, then open it in VSCode.

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
