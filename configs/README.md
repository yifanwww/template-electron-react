# How to modify this project configurations

There are some configuration files in the current folder:
- [electron-builder.yml](./electron-builder.yml)
- [eslintrc.js](./eslintrc.js)
- [jest.config.js](./jest.config.js)
- [tsconfig.base.json](./tsconfig.base.json)
- [tsconfig.main.json](./tsconfig.main.json)
- [tsconfig.renderer.json](./tsconfig.renderer.json)
- [webpack.base.config.js](./webpack.base.config.js)
- [webpack.main.config.js](./webpack.main.config.js)
- [webpack.renderer.config.js](./webpack.renderer.config.js)

## electron-builder.yml

In this configuration file, this configuration about how electron-builder packs this application.

<!-- TODO -->

## eslintrc.js

In this configuration file, this configuration about how eslint lints this application's code.

<!-- TODO -->

## jest.config.js

In this configuration file, there is a jest's configuration.

<!-- TODO -->

## tsconfig.base.json

This configuration, which only contains path aliases, is only used to extend the configurations in 'tsconfig.main.json' and 'tsconfig.renderer.json'.

Setting some path aliases in `paths` can control how typescript analyzes import path.

**Note**: These path aliases cannot be used for babel, we need to set the path aliases in webpack.

## tsconfig.main.json

This configuration is used for electron main process code, the same as [tsconfig.json](../tsconfig.json).

## tsconfig.renderer.json

This configuration is used for electron renderer process code. It's under control of react-scripts, we can only change a few settings.

**Note**: react-scripts doesn't allow us to add path aliases in tsconfig, and it will generate a new configuration to replace the current one if we have added some path aliases. But using `extends` to extends this tsconfig won't over limit.

## webpack.base.config.js

This configuration is the common part of the configurations in electron main process webpack and electron renderer process webpack.

It contains some function and data copied from react-scripts, and customizes some path, path aliases, compiling mode and eslint rule configuration path.

## webpack.main.config.js

This configuration is used for webpacking electron main process, configing some settings, such as target, mode, entry, output and etc.

**Note**: electron-builder limits the output file, it's not sure that setting the output file to 'electron.js' has some bad influences on packing this application or not.

## webpack.renderer.config.js

This configuration is used for webpacking electron renderer process.

We will use react-app-rewired to use this configuration to change some default behaviors of react-scripts, such as changing some default paths and adding path aliases.

## Some Existing Problems

How to totally control eslint in webpack is still unknown, to some extent we only just close the eslint checking, to avoid some errors when checking some three-part packages which should not be token place.
