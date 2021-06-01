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
const paths = {
    appBuild: ResolveProject('build'),
    appHtml: ResolveProject('src/public/index.html'),
    appIndexTsMain: ResolveProject('src/main/app.ts'),
    appIndexTsRenderer: ResolveProject('src/renderer/index.tsx'),
    appPublic: ResolveProject('src/public'),
    appSrc: ResolveProject('src'),
    appSrcMain: ResolveProject('src/main'),
    appSrcRenderer: ResolveProject('src/renderer'),
    appSrcShared: ResolveProject('src/shared'),
    appTsConfigMain: ResolveProject('configs/tsconfig.main.json'),
    appTsConfigRenderer: ResolveProject('configs/tsconfig.renderer.json'),
    proxySetup: ResolveProject('src/renderer/setupProxy.js'),
    testsSetup: ResolveProject('src/renderer/setupTests.ts'),
};

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
    paths,
};
