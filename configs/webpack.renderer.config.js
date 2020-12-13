// Used for `react-scripts` 4.0.0
// For more information about how to override default configs of `react-scripts`
// visit: https://github.com/timarney/react-app-rewired

// paths.js: https://github.com/facebook/create-react-app/blob/master/packages/react-scripts/config/paths.js
// webpack.config.js: https://github.com/facebook/create-react-app/blob/master/packages/react-scripts/config/webpack.config.js

// const fs = require("fs");

const SpeedMeasurePlugin = require('speed-measure-webpack-plugin');
const smp = new SpeedMeasurePlugin({ outputFormat: 'humanVerbose' });

const Base = require('./webpack.base.config');

// Write configurations as json data into file, for debugging.
// function WriteConfigs(config, filename) {
//     const configStr = JSON.stringify(config, "", "  ");
//     fs.writeFileSync(filename, configStr);
// }

// Override webpack configurations.
// The Webpack config to use when compiling your react app for development or production.
function OverrideWebpackConfigs(webpack, env) {
    // 1. Set the correct directories where the source code should be compiled.

    // WriteConfigs(webpack.module.rules, "webpack.json");
    webpack.module.rules[1].oneOf[2].include = [Base.Paths.AppSrcRenderer, Base.Paths.AppSrcShared];

    // 2. Use custom aliases.

    // WriteConfigs(webpack.resolve.alias, "webpack.json");
    for (let index in Base.Alias) {
        webpack.resolve.alias[index] = Base.Alias[index];
    }

    // 3. Use custom eslint rc.
    // TODO: It seems now `react-scripts` will detect if `.eslintrc.js` exists or not.

    // WriteConfigs([webpack.plugins[8], webpack.plugins[9]], "webpack.json");

    return smp.wrap(webpack);
}

// Override paths configurations.
function OverridePathsConfigs(paths, env) {
    paths.appPublic = Base.Paths.AppPublic;
    paths.appHtml = Base.Paths.AppHtml;
    paths.appIndexJs = Base.Paths.AppIndexJsRenderer;
    paths.appSrc = Base.Paths.AppSrc;
    paths.appTsConfig = Base.Paths.AppTsConfigRenderer;
    paths.testsSetup = Base.Paths.TestsSetup;
    paths.proxySetup = Base.Paths.ProxySetup;

    // WriteConfigs(paths, "paths.json");

    return paths;
}

module.exports = {
    webpack: OverrideWebpackConfigs,
    paths: OverridePathsConfigs,
};
