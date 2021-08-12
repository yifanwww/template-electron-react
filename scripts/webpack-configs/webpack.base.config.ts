// Used for `react-scripts` 4.0.3
// For more information about how to override default configs of `react-scripts`
// visit: https://github.com/timarney/react-app-rewired

import _path from 'path';

// Edited from `https://github.com/facebook/create-react-app/blob/v4.0.3/packages/react-scripts/config/paths.js`
// Line 17-18
const projectDir = _path.resolve(__dirname, '../..');
const resolveProject = (relativePath: string) => _path.resolve(projectDir, relativePath);

// Edited from `https://github.com/facebook/create-react-app/blob/v4.0.3/packages/react-scripts/config/paths.js`
// Line 62-79
export const paths = {
    appBuild: resolveProject('build'),
    appHtml: resolveProject('src/public/index.html'),
    appIndexTsMain: resolveProject('src/main/app.ts'),
    appIndexTsRenderer: resolveProject('src/renderer/index.tsx'),
    appPublic: resolveProject('src/public'),
    appSrcCommon: resolveProject('src/common'),
    appSrcMain: resolveProject('src/main'),
    appSrcRenderer: resolveProject('src/renderer'),
    appTsConfigMain: resolveProject('src/main/tsconfig.json'),
    appTsConfigRenderer: resolveProject('src/renderer/tsconfig.json'),
    appTypeDeclarations: resolveProject('src/renderer/renderer.d.ts'),
    proxySetup: resolveProject('src/renderer/setupProxy.js'),
    swSrc: resolveProject('src/renderer/service-worker.js'),
    testsSetup: resolveProject('src/renderer/test.setup.ts'),
};

// webpack path aliases
export const aliases = {
    // common
    '#Common': resolveProject('src/common'),
    // main
    '#MUtils': resolveProject('src/main/Utils'),
    // renderer
    '#Assets': resolveProject('src/renderer/Assets'),
    '#RUtils': resolveProject('src/renderer/Utils'),
};

const resolveJest = (relativePath: string) => `<rootDir>/${relativePath}$1`;

// jest path aliases
export const jestAliases = {
    // common
    '#Common(.*)$': resolveJest('src/common'),
    // main
    '#MUtils(.*)$': resolveJest('src/main/Utils'),
    // renderer
    '#Assets(.*)$': resolveJest('src/renderer/Assets'),
    '#RUtils(.*)$': resolveJest('src/renderer/Utils'),
};
