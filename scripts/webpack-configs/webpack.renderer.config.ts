// Used for `react-scripts` 4.0.3
// For more information about how to override default configs of `react-scripts`
// visit: https://github.com/timarney/react-app-rewired

// - paths.js:
//   https://github.com/facebook/create-react-app/blob/v4.0.3/packages/react-scripts/config/paths.js
// - webpack.config.js:
//   https://github.com/facebook/create-react-app/blob/v4.0.3/packages/react-scripts/config/webpack.config.js

import { Config } from '@jest/types';
import SpeedMeasurePlugin from 'speed-measure-webpack-plugin';
import { Configuration } from 'webpack';

import { aliases, jestAliases, paths as _paths } from './webpack.base.config';

interface CRAPaths {
    dotent: string;
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
    paths.appHtml = _paths.appHtml;
    paths.appIndexJs = _paths.appIndexTsRenderer;
    paths.appPublic = _paths.appPublic;
    paths.appTsConfig = _paths.appTsConfigRenderer;
    paths.appTypeDeclarations = _paths.appTypeDeclarations;
    paths.proxySetup = _paths.proxySetup;
    paths.swSrc = _paths.swSrc;
    paths.testsSetup = _paths.testsSetup;

    return paths;
}

/**
 * Override webpack configurations.
 *
 * The Webpack config to use when compiling your react app for development or production.
 */
function overrideWebpackConfigs(webpack: Configuration): Configuration {
    const isEnvProduction = webpack.mode === 'production';

    // 1. Set target to "electron-renderer"

    webpack.target = 'electron-renderer';

    // 2. Set the correct directories where the source code should be compiled.

    webpack.module!.rules[1].oneOf![2].include = [_paths.appSrcCommon, _paths.appSrcRenderer];

    // 3. Add custom path aliases.

    webpack.resolve!.alias = {
        ...webpack.resolve!.alias,
        ...aliases,
    };

    // Finish.

    return isEnvProduction ? new SpeedMeasurePlugin({ outputFormat: 'human' }).wrap(webpack) : webpack;
}

/**
 * Override jest configurations.
 *
 * The Jest config to use when running your jest tests - note that the normal rewires do not work here.
 */
function overrideJestConfigs(config: Config.InitialOptions): Config.InitialOptions {
    // 1. The option `setupFilesAfterEnv` is `<rootDir>/src/setupTests.${setupTestsFileExtension}`, change it.

    config.setupFilesAfterEnv = [_paths.testsSetup];

    // 2. The option `roots` is `['<rootDir>/src']`, change it.

    config.roots = ['<rootDir>/src/common', '<rootDir>/src/renderer'];

    // 3. The option `collectCoverageFrom` is `['src/**/*.{js,jsx,ts,tsx}', '!src/**/*.d.ts']`, change it.

    config.collectCoverageFrom = ['src/common/**/*.{ts,tsx}', 'src/renderer/**/*.{ts,tsx}', '!src/**/*.d.ts'];

    // 4. Change the option `testMatch`.

    config.testMatch = [
        '<rootDir>/src/common/**/__tests__/**/*.{ts,tsx}',
        '<rootDir>/src/common/**/*.{spec,test}.{ts,tsx}',
        '<rootDir>/src/renderer/**/__tests__/**/*.{ts,tsx}',
        '<rootDir>/src/renderer/**/*.{spec,test}.{ts,tsx}',
    ];

    // 5. Add custom path aliases.

    config.moduleNameMapper = {
        ...config.moduleNameMapper,
        ...jestAliases,
    };

    return config;
}

module.exports = {
    webpack: overrideWebpackConfigs,
    paths: overridePathsConfigs,
    jest: overrideJestConfigs,
};
