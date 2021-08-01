# How To Modify This Project Configurations

There are some configuration scripts in this project:
- `.eslintrc.json`: [.eslintrc.json](../.eslintrc.json)
- `electron-builder.json`: [/scripts/electron/electron-builder.json](../scripts/electron/electron-builder.json)
- `tsconfig.base.json`: [/scripts/tsconfigs/tsconfig.base.json](../scripts/tsconfigs/tsconfig.base.json)
- `tsconfig.main.json`: [/scripts/tsconfigs/tsconfig.main.json](../scripts/tsconfigs/tsconfig.main.json)
- `tsconfig.renderer.json`: [/scripts/tsconfigs/tsconfig.renderer.json](../scripts/tsconfigs/tsconfig.renderer.json)
- `webpack.base.config.ts`: [/scripts/webpack-configs/webpack.base.config.ts](../scripts/webpack-configs/webpack.base.config.ts)
- `webpack.main.config.ts`: [/scripts/webpack-configs/webpack.main.config.ts](../scripts/webpack-configs/webpack.main.config.ts)
- `webpack.renderer.config.ts`: [/scripts/webpack-configs/webpack.renderer.config.ts](../scripts/webpack-configs/webpack.renderer.config.ts)
- `reload-electron-webpack-plugin.ts`: [/scripts/webpack-plugins/reload-electron-webpack-plugin.ts](../scripts/webpack-plugins/reload-electron-webpack-plugin.ts)

## electron-builder.json

This configuration is about how electron-builder builds this application.

<!-- TODO -->

## tsconfig.base.json

This configuration, which only contains path aliases, is only used to extend the configurations in 'tsconfig.main.json' and 'tsconfig.renderer.json'.

Setting some path aliases in `paths` can control how typescript analyzes import path.

**Note**: These path aliases cannot be used for babel, we need to set the path aliases in webpack.

## tsconfig.main.json

This configuration is used for electron main process code.

## tsconfig.renderer.json

This configuration is used for electron renderer process code. It's under control of react-scripts, we can only change a few settings.

**Note**: react-scripts doesn't allow us to add path aliases in tsconfig, and it will generate a new configuration to replace the current one if we have added some path aliases. But using `extends` to extends this tsconfig won't over limit.

## webpack.base.config.ts

This configuration is the common part of the configurations in electron main process webpack and electron renderer process webpack.

It contains some function and data copied from react-scripts, and customizes some path, path aliases, compiling mode and eslint rule configuration path.

## webpack.main.config.ts

This configuration is used for webpacking electron main process, configing some settings, such as target, mode, entry, output and etc.

**Note**: electron-builder limits the output file, it's not sure that setting the output file to 'electron.ts' has some bad influences on packing this application or not.

## webpack.renderer.config.ts

This configuration is used for webpacking electron renderer process.

We will use react-app-rewired to use this configuration to change some default behaviors of react-scripts, such as changing some default paths and adding path aliases.
