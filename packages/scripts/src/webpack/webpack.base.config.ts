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

// Check https://github.com/facebook/create-react-app/blob/v4.0.3/packages/react-scripts/config/paths.js
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
    proxySetup: resolveRenderer('src/setup.proxy.js'),
    swSrc: resolveRenderer('src/serviceWorker.js'),
    testsSetup: resolveRenderer('src/setup.test.ts'),
};
