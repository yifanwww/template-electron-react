import path from 'path';

import { paths } from '../utils/paths';

const resolveAppMain = (relative: string) => path.resolve(paths.tecraElectronMain, relative);

export const pathsMain = {
    appIndexTs: resolveAppMain('src/app.ts'),
    appPath: resolveAppMain('.'),
    appSrc: resolveAppMain('src'),
    appTsBuildInfoFile: resolveAppMain('node_modules/.cache/tsconfig.tsbuildinfo'),
    appTsConfig: resolveAppMain('tsconfig.json'),
    build: paths.build,
    webpackCache: resolveAppMain('node_modules/.cache'),
};

const resolveAppRenderer = (relative: string) => path.resolve(paths.tecraElectronRenderer, relative);

// Check https://github.com/facebook/create-react-app/blob/v5.0.1/packages/react-scripts/config/paths.js
export const pathsRenderer = {
    appBuild: paths.build,
    appHtml: resolveAppRenderer('public/index.html'),
    appIndexTs: resolveAppRenderer('src/index.tsx'),
    // FIXME: not all dependencies are in root node_modules
    appNodeModules: paths.rootNodeModules,
    appPath: paths.tecraElectronRenderer,
    appPublic: resolveAppRenderer('public'),
    appSrc: resolveAppRenderer('src'),
    appTsConfig: resolveAppRenderer('tsconfig.json'),
    appTypeDeclarations: resolveAppRenderer('src/global.d.ts'),
    proxySetup: resolveAppRenderer('src/setup.proxy.js'),
    swSrc: resolveAppRenderer('src/serviceWorker.js'),
    testsSetup: resolveAppRenderer('src/setup.test.ts'),
    webpackCache: resolveAppRenderer('node_modules/.cache'),
};