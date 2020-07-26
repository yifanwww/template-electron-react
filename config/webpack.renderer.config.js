const Base = require('./webpack.base.config')

// Write configurations as json data into file, for debugging.
// function WriteConfigs(config, filename) {
//     const configStr = JSON.stringify(config, '', '    ');
//     fs.writeFileSync(filename, configStr);
// }

// Override webpack configurations.
// The Webpack config to use when compiling your react app for development or production.
function OverrideWebpackConfigs(config, env) {
    config.module.rules[1].include = [Base.Paths.AppSrcRenderer, Base.Paths.AppSrcUtils];
    config.module.rules[2].oneOf[1].include = [Base.Paths.AppSrcRenderer, Base.Paths.AppSrcUtils];

    // WriteConfigs(config, 'webpack.json');

    return config;
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

    // WriteConfigs(paths, 'paths.json');

    return paths;
}

module.exports = {
    webpack: OverrideWebpackConfigs,
    paths: OverridePathsConfigs
}
