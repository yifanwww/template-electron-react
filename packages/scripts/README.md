# @app-config/scripts

Scripts for template-electron-react.

## Binary

This package contains the following binaries:

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
