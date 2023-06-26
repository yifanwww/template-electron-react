# @tecra/scripts

Scripts for tecra.

## Binary

This package contains several binary which can be called via `npx` (or `yarn`) directly:

- `app-main`
  - `app-main build`
    Build package `@tecra/app-main`.
  - `app-main dev`
    Dev package `@tecra/app-main`.
- `app-renderer`
  - `app-renderer build`
    Build package `@tecra/app-renderer`.
  - `app-renderer build-profile`
    Build package `@tecra/app-renderer` with profiling enabled. See [React Profiling].
  - `app-renderer dev`
    Dev package `@tecra/app-renderer`.
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
