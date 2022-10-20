# @tecra-config/scripts

Scripts for tecra.

## Binary

This package contains several binary which can be called via `npx` (or `yarn`) directly:

- `build-packages`
  Build all packages except `@tecra/electron-main` and `@tecra/electron-renderer`.
- `electron-main`
  - `electron-main build`
    Build package `@tecra/electron-main`.
  - `electron-main dev`
    Dev package `@tecra/electron-main`.
- `electron-renderer`
  - `electron-renderer build`
    Build package `@tecra/electron-renderer`.
  - `electron-renderer build-profile`
    Build package `@tecra/electron-renderer` with profiling enabled. See [React Profiling].
  - `electron-renderer dev`
    Dev package `@tecra/electron-renderer`.
- `format-code`
  Format source code by `prettier`.
- `mkdir-working`
  Make working directory.
- `post-install`
  Do some stuff after NPM installing. In this script will register git hooks directory.
- `run-build`
  Start electron application via the generated Javascript production file.
- `run-unpacked`
  Start electron application via the generated binary executable file.
- `unit-test`
  Do coverage unit test by default, if called in NPM script `test` will start unit test in watch mode.

## Configurations

## Build

You will need to build this package before building other packages.

<!-- links -->

[react profiling]: https://create-react-app.dev/docs/production-build/#profiling
