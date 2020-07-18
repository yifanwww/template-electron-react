// The version of `react-scripts` is 3.4.1
// For more information about how to override default configs of `react-scripts`
// visit: https://github.com/timarney/react-app-rewired

const fs = require('fs');
const path = require('path');

// Copied from `node_modules/react-scripts/config/path.js`, line 17
const appDirectory = fs.realpathSync(process.cwd());
const ResolveApp = relativePath => path.resolve(appDirectory, relativePath);

// Copied from `node_modules/react-scripts/config/path.js`, line 32
const moduleFileExtensions = [
    'web.mjs',
    'mjs',
    'web.js',
    'js',
    'web.ts',
    'ts',
    'web.tsx',
    'tsx',
    'json',
    'web.jsx',
    'jsx',
];

// Copied from `node_modules/react-scripts/config/path.js`, line 47
const ResolveModule = (resolveFn, filePath) => {
    const extension = moduleFileExtensions.find(extension =>
        fs.existsSync(resolveFn(`${filePath}.${extension}`))
    );

    if (extension) {
        return resolveFn(`${filePath}.${extension}`);
    }

    return resolveFn(`${filePath}.js`);
};

// Edited from `node_modules/react-scripts/config/path.js`, line 60
const appPublic = ResolveApp('src/public');
const appHtml = ResolveApp('src/public/index.html');
const appIndexJs = ResolveModule(ResolveApp, 'src/renderer/index');
const appSrcRenderer = ResolveApp('src/renderer');
const appSrcUtils = ResolveApp('src/utils');
const appTsConfig = ResolveApp('config/tsconfig.renderer.json');
const testsSetup = ResolveModule(ResolveApp, 'src/renderer/setupTests');
const proxySetup = ResolveApp('src/renderer/setupProxy.js');

// Write configurations as json data into file, for debugging.
// function WriteConfigs(config, filename) {
//     const configStr = JSON.stringify(config, '', '    ');
//     fs.writeFileSync(filename, configStr);
// }

// Override webpack configurations.
// The Webpack config to use when compiling your react app for development or production.
function OverrideWebpackConfigs(config, env) {
    config.module.rules[1].include = [appSrcRenderer, appSrcUtils];
    config.module.rules[2].oneOf[1].include = [appSrcRenderer, appSrcUtils];

    // WriteConfigs(config, 'webpack.json');

    return config;
}

// Override paths configurations.
function OverridePathsConfigs(paths, env) {
    paths.appPublic = appPublic;
    paths.appHtml = appHtml;
    paths.appIndexJs = appIndexJs;
    paths.appSrc = appSrcRenderer;
    paths.appTsConfig = appTsConfig;
    paths.testsSetup = testsSetup;
    paths.proxySetup = proxySetup;

    // WriteConfigs(paths, 'paths.json');

    return paths;
}

module.exports = {
    webpack: OverrideWebpackConfigs,
    paths: OverridePathsConfigs
}
