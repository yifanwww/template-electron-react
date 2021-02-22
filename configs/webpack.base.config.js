// Used for `react-scripts` 4.0.1
// For more information about how to override default configs of `react-scripts`
// visit: https://github.com/timarney/react-app-rewired

const _fs = require('fs');
const _path = require('path');

// Copied from `node_modules/react-scripts/config/path.js`, line 17-18
const appDirectory = _fs.realpathSync(_path.join(__dirname, '..'));
const ResolveApp = (relativePath) => _path.resolve(appDirectory, relativePath);

// Copied from `node_modules/react-scripts/config/path.js`, line 32-44
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

// Copied from `node_modules/react-scripts/config/path.js`, line 47-57
const ResolveModule = (resolveFn, filePath) => {
    const extension = moduleFileExtensions.find((extension) => _fs.existsSync(resolveFn(`${filePath}.${extension}`)));

    if (extension) {
        return resolveFn(`${filePath}.${extension}`);
    }

    return resolveFn(`${filePath}.js`);
};

// Edited from `node_modules/react-scripts/config/path.js`, line 60-76
const appBuild = ResolveApp('build');
const appHtml = ResolveApp('src/public/index.html');
const appIndexJsMain = ResolveApp('src/main/app');
const appIndexJsRenderer = ResolveModule(ResolveApp, 'src/renderer/index');
const appPublic = ResolveApp('src/public');
const appSrc = ResolveApp('src');
const appSrcMain = ResolveApp('src/main');
const appSrcRenderer = ResolveApp('src/renderer');
const appSrcShared = ResolveApp('src/shared');
const appTsConfigMain = ResolveApp('configs/tsconfig.main.json');
const appTsConfigRenderer = ResolveApp('configs/tsconfig.renderer.json');
const proxySetup = ResolveApp('src/renderer/setupProxy.js');
const testsSetup = ResolveModule(ResolveApp, 'src/renderer/setupTests');

// Alias
const alias = {
    '#shared': ResolveApp('src/shared'),
    // main
    '#MUtils': ResolveApp('src/main/Utils'),
    // renderer
    '#Assets': ResolveApp('src/renderer/Assets'),
    '#RUtils': ResolveApp('src/renderer/Utils'),
};

// Eslint rc path
const eslintConfigPath = ResolveApp('configs/.eslintrc.js');

module.exports = {
    alias,
    eslintConfigPath,
    paths: {
        appBuild,
        appHtml,
        appIndexJsMain,
        appIndexJsRenderer,
        appPublic,
        appSrc,
        appSrcMain,
        appSrcRenderer,
        appSrcShared,
        appTsConfigMain,
        appTsConfigRenderer,
        proxySetup,
        testsSetup,
    },
};
