// Used for `react-scripts` 4.0.3
// For more information about how to override default configs of `react-scripts`
// visit: https://github.com/timarney/react-app-rewired

// - paths.js:
//   https://github.com/facebook/create-react-app/blob/v4.0.3/packages/react-scripts/config/paths.js
// - webpack.config.js:
//   https://github.com/facebook/create-react-app/blob/v4.0.3/packages/react-scripts/config/webpack.config.js

import { Configuration } from 'webpack';

import { pathsRenderer } from './webpack.base.config';

interface CRAPaths {
    dotenv: string;
    appPath: string;
    appBuild: string;
    appPublic: string;
    appHtml: string;
    appIndexJs: string;
    appPackageJson: string;
    appSrc: string;
    appTsConfig: string;
    appJsConfig: string;
    yarnLockFile: string;
    testsSetup: string;
    proxySetup: string;
    appNodeModules: string;
    swSrc: string;
    publicUrlOrPath: string;
    ownPath: string;
    pwnNodeModules: string;
    appTypeDeclarations: string;
    ownTypeDeclarations: string;
}

/**
 * Override paths configurations.
 *
 * The paths config to use when compiling your react app for development or production.
 */
function overridePathsConfigs(paths: CRAPaths): CRAPaths {
    paths.appBuild = pathsRenderer.appBuild;
    paths.appHtml = pathsRenderer.appHtml;
    paths.appIndexJs = pathsRenderer.appIndexTs;
    paths.appPath = pathsRenderer.appPath;
    paths.appPublic = pathsRenderer.appPublic;
    paths.appSrc = pathsRenderer.appSrc;
    paths.appTsConfig = pathsRenderer.appTsConfig;
    paths.appTypeDeclarations = pathsRenderer.appTypeDeclarations;
    paths.proxySetup = pathsRenderer.proxySetup;
    paths.swSrc = pathsRenderer.swSrc;
    paths.testsSetup = pathsRenderer.testsSetup;

    return paths;
}

/**
 * Override webpack configurations.
 *
 * The Webpack config to use when compiling your react app for development or production.
 */
function overrideWebpackConfigs(webpack: Configuration): Configuration {
    // Set target.
    webpack.target = 'electron-renderer';

    return webpack;
}

export = {
    webpack: overrideWebpackConfigs,
    paths: overridePathsConfigs,
};
