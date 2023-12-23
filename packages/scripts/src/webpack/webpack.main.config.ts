import { EsbuildPlugin } from 'esbuild-loader';
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import { createRequire } from 'node:module';
import path from 'node:path';
import url from 'node:url';
import type { Configuration, WebpackPluginInstance } from 'webpack';

import { getElectronNodeTarget } from '../electron.js';
import { paths } from '../utils/index.js';

import { createEnvironmentHash } from './utils/createEnvironmentHash.js';
import { ReloadElectronWebpackPlugin } from './utils/reloadElectronWebpackPlugin.js';
import { WebpackStatsPrettifyPlugin } from './utils/webpackStatsPrettifyPlugin.js';

const _filename = url.fileURLToPath(import.meta.url);
const require = createRequire(import.meta.url);

const resolveAppMain = (relative: string) => path.resolve(paths.electronMain, relative);

const appMainPaths = {
    mainIndexTs: resolveAppMain('src/main/index.ts'),
    preloadIndexTs: resolveAppMain('src/preload/index.ts'),
    appPath: resolveAppMain('.'),
    appSrc: resolveAppMain('src'),
    appTsBuildInfoFile: resolveAppMain('node_modules/.cache/tsconfig.tsbuildinfo'),
    appTsConfig: resolveAppMain('tsconfig.json'),
    build: paths.build,
    webpackCache: resolveAppMain('node_modules/.cache'),
};

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
    const isDevelopment = argv.mode === 'development';
    const isProduction = argv.mode === 'production';

    const webpack: Configuration = {
        target: 'electron-main',
        // Webpack noise constrained to errors and warnings
        stats: 'errors-warnings',
        mode: isProduction ? 'production' : 'development',
        // Stop compilation early in production
        bail: isProduction,
        devtool: isProduction ? 'source-map' : 'cheap-module-source-map',
        entry: {
            electron: appMainPaths.mainIndexTs,
            preload: appMainPaths.preloadIndexTs,
        },

        output: {
            path: appMainPaths.build,
            // Add /* filename */ comments to generated require()s in the output.
            pathinfo: isDevelopment,
            filename: '[name].js',
            chunkFilename: '[name].[contenthash:8].chunk.js',
        },

        cache: {
            type: 'filesystem',
            version: createEnvironmentHash({ NODE_ENV: isDevelopment ? 'development' : 'production' }),
            cacheDirectory: appMainPaths.webpackCache,
            store: 'pack',
            buildDependencies: {
                defaultWebpack: ['webpack/lib/'],
                config: [_filename],
                tsconfig: [appMainPaths.appTsConfig],
            },
        },

        infrastructureLogging: {
            level: 'none',
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
                        {
                            test: /\.[cm]?[jt]s$/,
                            loader: require.resolve('esbuild-loader'),
                            options: {
                                target: getElectronNodeTarget(),
                            },
                        },
                    ],
                },
            ],
        },

        optimization: {
            minimize: isProduction,
            minimizer: [new EsbuildPlugin({ target: getElectronNodeTarget() })],
        },

        plugins: [
            new EsbuildPlugin({
                define: {
                    'process.env.NODE_ENV': JSON.stringify(isDevelopment ? 'development' : 'production'),
                },
            }),
            isDevelopment && new ReloadElectronWebpackPlugin(paths.repository, paths.working),
            // TypeScript type checking
            isDevelopment &&
                new ForkTsCheckerWebpackPlugin({
                    async: isDevelopment,
                    typescript: {
                        typescriptPath: require.resolve('typescript'),
                        configOverwrite: {
                            compilerOptions: {
                                sourceMap: isProduction || isDevelopment,
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
                    },
                }),
            new WebpackStatsPrettifyPlugin(),
        ].filter(Boolean) as WebpackPluginInstance[],

        performance: {
            hints: 'warning',
        },

        watch: isDevelopment,
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

export default factory;
