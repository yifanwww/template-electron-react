// Used for `react-scripts` 4.0.3
// For more information about how to override default configs of `react-scripts`
// visit: https://github.com/timarney/react-app-rewired

// - paths.js:
//   https://github.com/facebook/create-react-app/blob/v4.0.3/packages/react-scripts/config/paths.js
// - webpack.config.js:
//   https://github.com/facebook/create-react-app/blob/v4.0.3/packages/react-scripts/config/webpack.config.js

// const fs = require('fs');

const SpeedMeasurePlugin = require('speed-measure-webpack-plugin');

const BaseWebpack = require('./webpack.base.config');

// Write configurations as json data into file, for debugging.
// function WriteConfigs(config, filename) {
//     const configStr = JSON.stringify(config, '', '  ');
//     fs.writeFileSync(filename, configStr);
// }

// Override webpack configurations.
// The Webpack config to use when compiling your react app for development or production.
function OverrideWebpackConfigs(webpack, env) {
    const isEnvProduction = webpack.mode === 'production';

    // 1. Set target to "electron-renderer"

    webpack.target = 'electron-renderer';

    // 2. Set the correct directories where the source code should be compiled.

    // WriteConfigs(webpack.module.rules, 'webpack.json');
    webpack.module.rules[1].oneOf[2].include = [BaseWebpack.paths.appSrcRenderer, BaseWebpack.paths.appSrcShared];

    // 3. Use custom aliases.

    webpack.resolve.alias = BaseWebpack.alias;

    // Finish.

    return isEnvProduction ? new SpeedMeasurePlugin({ outputFormat: 'humanVerbose' }).wrap(webpack) : webpack;
}

// Override paths configurations.
function OverridePathsConfigs(paths, env) {
    paths.appPublic = BaseWebpack.paths.appPublic;
    paths.appHtml = BaseWebpack.paths.appHtml;
    paths.appIndexJs = BaseWebpack.paths.appIndexTsRenderer;
    paths.appSrc = BaseWebpack.paths.appSrc;
    paths.appTsConfig = BaseWebpack.paths.appTsConfigRenderer;
    paths.testsSetup = BaseWebpack.paths.testsSetup;
    paths.proxySetup = BaseWebpack.paths.proxySetup;

    // WriteConfigs(paths, 'paths.json');

    return paths;
}

module.exports = {
    webpack: OverrideWebpackConfigs,
    paths: OverridePathsConfigs,
};
