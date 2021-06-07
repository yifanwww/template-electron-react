// Used for `react-scripts` 4.0.3
// For more information about how to override default configs of `react-scripts`
// visit: https://github.com/timarney/react-app-rewired

// - paths.js:
//   https://github.com/facebook/create-react-app/blob/v4.0.3/packages/react-scripts/config/paths.js
// - webpack.config.js:
//   https://github.com/facebook/create-react-app/blob/v4.0.3/packages/react-scripts/config/webpack.config.js

// const fs = require('fs');

import { alias as _alias, paths as _paths } from './webpack.base.config';

const SpeedMeasurePlugin = require('speed-measure-webpack-plugin');

// Write configurations as json data into file, for debugging.
// function WriteConfigs(config, filename) {
//     const configStr = JSON.stringify(config, '', '  ');
//     fs.writeFileSync(filename, configStr);
// }

// Override webpack configurations.
// The Webpack config to use when compiling your react app for development or production.
function OverrideWebpackConfigs(webpack: any) {
    const isEnvProduction = webpack.mode === 'production';

    // 1. Set target to "electron-renderer"

    webpack.target = 'electron-renderer';

    // 2. Set the correct directories where the source code should be compiled.

    // WriteConfigs(webpack.module.rules, 'webpack.json');
    webpack.module.rules[1].oneOf[2].include = [_paths.appSrcRenderer, _paths.appSrcShared];

    // 3. Add custom aliases.

    const { alias } = webpack.resolve;
    webpack.resolve.alias = {
        ...alias,
        ..._alias,
    };

    // Finish.

    return isEnvProduction ? new SpeedMeasurePlugin({ outputFormat: 'human' }).wrap(webpack) : webpack;
}

// Override paths configurations.
function OverridePathsConfigs(paths: any) {
    paths.appHtml = _paths.appHtml;
    paths.appIndexJs = _paths.appIndexTsRenderer;
    paths.appPublic = _paths.appPublic;
    paths.appTsConfig = _paths.appTsConfigRenderer;
    paths.appTypeDeclarations = _paths.appTypeDeclarations;
    paths.proxySetup = _paths.proxySetup;
    paths.swSrc = _paths.swSrc;
    paths.testsSetup = _paths.testsSetup;

    return paths;
}

module.exports = {
    webpack: OverrideWebpackConfigs,
    paths: OverridePathsConfigs,
};
