// Used for `react-scripts` 4.0.3
// For more information about how to override default configs of `react-scripts`
// visit: https://github.com/timarney/react-app-rewired

import path from 'path';

import { paths } from '../utils/paths';

const resolveMain = (relative: string) => path.resolve(paths.tecraElectronMain, relative);

export const pathsMain = {
    build: paths.build,
    appIndexTs: resolveMain('src/app.ts'),
    appSrc: resolveMain('src'),
    appTsConfig: resolveMain('tsconfig.json'),
};

const resolveRenderer = (relative: string) => path.resolve(paths.tecraElectronRenderer, relative);

// Edited from `https://github.com/facebook/create-react-app/blob/v4.0.3/packages/react-scripts/config/paths.js`
// Line 62-79
// eslint-disable-next-line @typescript-eslint/naming-convention
export const pathsRenderer = {
    appBuild: paths.build,
    appHtml: resolveRenderer('public/index.html'),
    appIndexTs: resolveRenderer('src/index.tsx'),
    appNodeModules: paths.nodeModules,
    appPath: paths.tecraElectronRenderer,
    appPublic: resolveRenderer('public'),
    appSrc: resolveRenderer('src'),
    appTsConfig: resolveRenderer('tsconfig.json'),
    appTypeDeclarations: resolveRenderer('src/global.d.ts'),
    proxySetup: resolveRenderer('src/setupProxy.js'),
    swSrc: resolveRenderer('src/serviceWorker.js'),
    testsSetup: resolveRenderer('src/test.setup.ts'),
};
