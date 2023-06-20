import CaseSensitivePathsPlugin from 'case-sensitive-paths-webpack-plugin';
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import TerserPlugin from 'terser-webpack-plugin';
import type { Configuration, WebpackPluginInstance } from 'webpack';

import { paths } from '../utils';

import { ReloadElectronWebpackPlugin } from './plugins/reloadElectronWebpackPlugin';
import { createEnvironmentHash } from './utils/createEnvironmentHash';
import { getCacheIdentifier } from './utils/getCacheIdentifier';
import { appMainPaths } from './webpack.base.config';

interface CliConfigOptions {
    config?: string;
    mode?: Configuration['mode'];
    env?: string;
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'config-register'?: string;
    configRegister?: string;
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'config-name'?: string;
    configName?: string;
}

type ConfigurationFactory = (
    env: string | Record<string, boolean | number | string> | undefined,
    args: CliConfigOptions,
) => Configuration | Promise<Configuration>;

const factory: ConfigurationFactory = (env, argv) => {
    const isEnvDevelopment = argv.mode === 'development';
    const isEnvProduction = argv.mode === 'production';

    const webpack: Configuration = {
        target: 'electron-main',
        // Webpack noise constrained to errors and warnings
        stats: { logging: 'info' },
        mode: isEnvProduction ? 'production' : 'development',
        // Stop compilation early in production
        bail: isEnvProduction,
        devtool: isEnvProduction ? 'source-map' : 'cheap-module-source-map',
        entry: {
            electron: appMainPaths.mainIndexTs,
            preload: appMainPaths.preloadIndexTs,
        },

        output: {
            path: appMainPaths.build,
            // Add /* filename */ comments to generated require()s in the output.
            pathinfo: isEnvDevelopment,
            filename: '[name].js',
            chunkFilename: '[name].[contenthash:8].chunk.js',
        },

        cache: {
            type: 'filesystem',
            version: createEnvironmentHash({ NODE_ENV: process.env.NODE_ENV || 'development' }),
            cacheDirectory: appMainPaths.webpackCache,
            store: 'pack',
            buildDependencies: {
                defaultWebpack: ['webpack/lib/'],
                config: [__filename],
                tsconfig: [appMainPaths.appTsConfig],
            },
        },

        infrastructureLogging: {
            level: 'none',
        },

        optimization: {
            minimize: isEnvProduction,
            minimizer: [
                // This is only used in production mode
                new TerserPlugin({
                    terserOptions: {
                        parse: {
                            // We want terser to parse ecma 8 code. However, we don't want it to apply any minification
                            // steps that turns valid ecma 5 code into invalid ecma 5 code. This is why the 'compress'
                            // and 'output' sections only apply transformations that are ecma 5 safe.
                            // https://github.com/facebook/create-react-app/pull/4234
                            ecma: 2017,
                        },
                        compress: {
                            ecma: 5,
                            // Disabled because of an issue with Uglify breaking seemingly valid code:
                            // https://github.com/facebook/create-react-app/issues/2376
                            // Pending further investigation:
                            // https://github.com/mishoo/UglifyJS2/issues/2011
                            comparisons: false,
                            // Disabled because of an issue with Terser breaking valid code:
                            // https://github.com/facebook/create-react-app/issues/5250
                            // Pending further investigation:
                            // https://github.com/terser-js/terser/issues/120
                            inline: 2,
                        },
                        output: {
                            ecma: 5,
                            comments: false,
                            // Turned on because emoji and regex is not minified properly using default
                            // https://github.com/facebook/create-react-app/issues/2488
                            ascii_only: true,
                        },
                    },
                }),
            ],
        },

        resolve: {
            extensions: ['.js', 'mjs', '.ts'],
            alias: {
                src: appMainPaths.appSrc,
            },
        },

        module: {
            parser: {
                javascript: {
                    exportsPresence: 'error',
                },
            },
            rules: [
                // Handle node_modules packages that contain sourcemaps
                {
                    enforce: 'pre',
                    exclude: /@babel(?:\/|\\{1,2})runtime/,
                    test: /\.(js|mjs|ts)$/,
                    loader: require.resolve('source-map-loader'),
                },
                {
                    oneOf: [
                        // Process application JS with Babel.
                        // The preset includes JSX, Flow, TypeScript, and some ESnext features.
                        {
                            test: /\.(js|mjs|ts)$/,
                            include: appMainPaths.appSrc,
                            loader: require.resolve('babel-loader'),
                            options: {
                                customize: require.resolve('babel-preset-react-app/webpack-overrides'),
                                // TODO: Maybe can change presets
                                presets: [[require.resolve('babel-preset-react-app'), { runtime: 'automatic' }]],
                                babelrc: false,
                                configFile: false,
                                // Make sure we have a unique cache identifier, erring on the side of caution.
                                cacheIdentifier: getCacheIdentifier(isEnvProduction ? 'production' : 'development', [
                                    'babel-plugin-named-asset-import',
                                    'babel-preset-react-app',
                                ]),
                                // This is a feature of `babel-loader` for webpack (not Babel itself).
                                // It enables caching results in ./node_modules/.cache/babel-loader/
                                // directory for faster rebuilds.
                                cacheDirectory: true,
                                // See #6846 for context on why cacheCompression is disabled
                                cacheCompression: false,
                                compact: isEnvProduction,
                            },
                        },
                        // Process any JS outside of the app with Babel.
                        // Unlike the application JS, we only compile the standard ES features.
                        {
                            test: /\.(js|mjs)$/,
                            exclude: /@babel(?:\/|\\{1,2})runtime/,
                            loader: require.resolve('babel-loader'),
                            options: {
                                babelrc: false,
                                configFile: false,
                                compact: false,
                                // TODO: Maybe can change presets
                                presets: [[require.resolve('babel-preset-react-app/dependencies'), { helpers: true }]],
                                cacheDirectory: true,
                                // See #6846 for context on why cacheCompression is disabled
                                cacheCompression: false,
                                cacheIdentifier: getCacheIdentifier(isEnvProduction ? 'production' : 'development', [
                                    'babel-plugin-named-asset-import',
                                    'babel-preset-react-app',
                                ]),
                                // Babel sourcemaps are needed for debugging into node_modules code.
                                // Without the options below, debuggers like VSCode show incorrect code and set
                                // breakpoints on the wrong lines.
                                sourceMaps: true,
                                inputSourceMap: true,
                            },
                        },
                    ],
                },
            ],
        },

        plugins: [
            isEnvDevelopment && new ReloadElectronWebpackPlugin(paths.repository, paths.working),
            // Watcher doesn't work well if you mistype casing in a path,
            // so we use a plugin that prints an error when you attempt to do this.
            isEnvDevelopment && new CaseSensitivePathsPlugin(),
            // TypeScript type checking
            new ForkTsCheckerWebpackPlugin({
                async: isEnvDevelopment,
                typescript: {
                    typescriptPath: require.resolve('typescript'),
                    configOverwrite: {
                        compilerOptions: {
                            sourceMap: isEnvProduction || isEnvDevelopment,
                            skipLibCheck: true,
                            inlineSourceMap: false,
                            declarationMap: false,
                            noEmit: true,
                            incremental: true,
                            tsBuildInfoFile: appMainPaths.appTsBuildInfoFile,
                        },
                    },
                    context: appMainPaths.appPath,
                    diagnosticOptions: {
                        syntactic: true,
                    },
                    mode: 'write-references',
                    // profile: true,
                },
            }),
        ].filter(Boolean) as WebpackPluginInstance[],

        watch: isEnvDevelopment,
        watchOptions: {
            aggregateTimeout: 500,
            // poll: 10_000,
        },

        node: {
            __dirname: false,
            __filename: false,
        },
    };

    return webpack;
};

export = factory;
