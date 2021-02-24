// Used for `react-scripts` 4.0.3
// For more information about how to override default configs of `react-scripts`
// visit: https://github.com/timarney/react-app-rewired

const _path = require('path');

// Edited from `https://github.com/facebook/create-react-app/blob/v4.0.3/packages/react-scripts/config/paths.js`
// Line 17-18
const _projectDir = _path.resolve(__dirname, '..');
const ResolveProject = (relativePath) => _path.resolve(_projectDir, relativePath);

// Edited from `https://github.com/facebook/create-react-app/blob/v4.0.3/packages/react-scripts/config/paths.js`
// Line 62-79
const appBuild = ResolveProject('build');
const appHtml = ResolveProject('src/public/index.html');
const appIndexTsMain = ResolveProject('src/main/app.ts');
const appIndexTsRenderer = ResolveProject('src/renderer/index.tsx');
const appPublic = ResolveProject('src/public');
const appSrc = ResolveProject('src');
const appSrcMain = ResolveProject('src/main');
const appSrcRenderer = ResolveProject('src/renderer');
const appSrcShared = ResolveProject('src/shared');
const appTsConfigMain = ResolveProject('configs/tsconfig.main.json');
const appTsConfigRenderer = ResolveProject('configs/tsconfig.renderer.json');
const proxySetup = ResolveProject('src/renderer/setupProxy.js');
const testsSetup = ResolveProject('src/renderer/setupTests.ts');

// Alias
const alias = {
    '#shared': ResolveProject('src/shared'),
    // main
    '#MUtils': ResolveProject('src/main/Utils'),
    // renderer
    '#Assets': ResolveProject('src/renderer/Assets'),
    '#RUtils': ResolveProject('src/renderer/Utils'),
};

module.exports = {
    alias,
    paths: {
        appBuild,
        appHtml,
        appIndexTsMain,
        appIndexTsRenderer,
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
