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
