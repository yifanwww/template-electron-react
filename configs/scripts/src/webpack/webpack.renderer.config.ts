// Used for `react-scripts` 5.0.1
// For more information about how to override default configs of `react-scripts`
// please visit https://github.com/timarney/react-app-rewired

/* eslint-disable no-param-reassign */

import type { Configuration } from 'webpack';

import { appRendererPaths } from './webpack.base.config';

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
    appWebpackCache: string;
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
 *
 * Check https://github.com/facebook/create-react-app/blob/v5.0.1/packages/react-scripts/config/paths.js
 */
function overridePathsConfigs(paths: CRAPaths): CRAPaths {
    paths.appBuild = appRendererPaths.appBuild;
    paths.appHtml = appRendererPaths.appHtml;
    paths.appIndexJs = appRendererPaths.appIndexTs;
    paths.appPath = appRendererPaths.appPath;
    paths.appPublic = appRendererPaths.appPublic;
    paths.appSrc = appRendererPaths.appSrc;
    paths.appTsConfig = appRendererPaths.appTsConfig;
    paths.appTypeDeclarations = appRendererPaths.appTypeDeclarations;
    paths.appWebpackCache = appRendererPaths.webpackCache;
    paths.proxySetup = appRendererPaths.proxySetup;
    paths.swSrc = appRendererPaths.swSrc;
    paths.testsSetup = appRendererPaths.testsSetup;

    return paths;
}

/**
 * Override webpack configurations.
 *
 * The Webpack config to use when compiling your react app for development or production.
 *
 * Check https://github.com/facebook/create-react-app/blob/v5.0.1/packages/react-scripts/config/webpack.config.js
 */
function overrideWebpackConfigs(webpack: Configuration): Configuration {
    // We cannot set `webpack.target` to `electron-renderer` in our situation.
    //
    // `electron-renderer` actually can work, but we're using React.
    // We will get `global is not defined` error in both development dev and production build.
    // We can set `webpack.output.globalObject = 'this'` or add `<script>var global = global || window;</script>` in
    // index.html to fix the error,
    // see https://stackoverflow.com/questions/69747455/updating-electron-issue-uncaught-referenceerror-global-is-not-defined
    //
    // However, after we doing that, we will get a new error `require is not defined` only in development dev.
    // The reason is that, in development dev we use a dev server to serve the renderer resouces and to support
    // React-Fast-Refresh feature, which causes that in the renderer process it calls `require` to require resources.
    //
    // Therefore, we set `webpack.target` to `web`, it just works. See
    // https://github.com/webpack/webpack/issues/10035#issuecomment-1077875771
    // https://github.com/webpack/webpack/issues/10035#issuecomment-1312686562

    webpack.target = 'web';

    // @ts-ignore
    webpack.module.rules[1].oneOf[3].options.presets.push([
        '@babel/preset-typescript',
        {
            // Can omit this setting when babel is upgrade above v8
            // https://github.com/babel/babel/issues/10746
            allowDeclareFields: true,
        },
    ]);

    return webpack;
}

export = {
    paths: overridePathsConfigs,
    webpack: overrideWebpackConfigs,
};
