// Used for `react-scripts` 3.4.1
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
const appBuild = ResolveApp('build');
const appHtml = ResolveApp('src/public/index.html');
const appIndexJsMain = ResolveApp('src/main/app');
const appIndexJsRenderer = ResolveModule(ResolveApp, 'src/renderer/index');
const appPublic = ResolveApp('src/public');
const appSrc = ResolveApp('src');
const appSrcMain = ResolveApp('src/main');
const appSrcRenderer = ResolveApp('src/renderer');
const appSrcUtils = ResolveApp('src/utils');
const appTsConfigMain = ResolveApp('configs/tsconfig.main.json');
const appTsConfigRenderer = ResolveApp('configs/tsconfig.renderer.json');
const proxySetup = ResolveApp('src/renderer/setupProxy.js');
const testsSetup = ResolveModule(ResolveApp, 'src/renderer/setupTests');

// Alias
const alias = {
    '@ClientArea': ResolveApp('src/renderer/ClientArea'),
    '@Electron': ResolveApp('src/utils/Electron'),
    '@RendererTypes': ResolveApp('src/renerer/Types'),
    '@Utils': ResolveApp('src/utils'),
};

// Eslint rc path
const eslintConfigPath = ResolveApp('configs/eslintrc.js');

module.exports = {
    Alias: alias,
    EslintConfigPath: eslintConfigPath,
    Paths: {
        AppBuild: appBuild,
        AppHtml: appHtml,
        AppIndexJsMain: appIndexJsMain,
        AppIndexJsRenderer: appIndexJsRenderer,
        AppPublic: appPublic,
        AppSrc: appSrc,
        AppSrcMain: appSrcMain,
        AppSrcRenderer: appSrcRenderer,
        AppSrcUtils: appSrcUtils,
        AppTsConfigMain: appTsConfigMain,
        AppTsConfigRenderer: appTsConfigRenderer,
        ProxySetup: proxySetup,
        TestsSetup: testsSetup,
    },
};
