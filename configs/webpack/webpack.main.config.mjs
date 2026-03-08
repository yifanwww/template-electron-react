import path from 'node:path';
import { EsbuildPlugin } from 'esbuild-loader';
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import { createEnvironmentHash } from './createEnvironmentHash.mjs';
import { ReloadElectronWebpackPlugin } from './reloadElectronWebpackPlugin.mjs';
import { WebpackStatsPrettifyPlugin } from './webpackStatsPrettifyPlugin.mjs';

const root = path.resolve(import.meta.dirname, '../..');
const buildDir = path.resolve(root, 'build');
const workingDir = path.resolve(root, 'working');
const mainPkgDir = path.resolve(root, 'packages', 'main');

const NODE_TARGET = 'node24.11'

const resolveAppMain = (relative) => path.resolve(mainPkgDir, relative);

const appMainPaths = {
    mainIndexTs: resolveAppMain('src/main/index.ts'),
    preloadIndexTs: resolveAppMain('src/preload/index.ts'),
    appPath: resolveAppMain('.'),
    appSrc: resolveAppMain('src'),
    appTsBuildInfoFile: resolveAppMain('node_modules/.cache/tsconfig.tsbuildinfo'),
    appTsConfig: resolveAppMain('tsconfig.json'),
    build: buildDir,
    webpackCache: resolveAppMain('node_modules/.cache'),
};

/**
 *
 * @param {string | Record<string, boolean | number | string> | undefined} env
 * @param {{ mode?: import('webpack').Configuration['mode'] }} argv
 */
function factory(env, argv) {
    const isDevelopment = argv.mode === 'development';
    const isProduction = argv.mode === 'production';

    /**
     * @type {import('webpack').Configuration}
     */
    const webpack = {
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
                config: [import.meta.filename],
                tsconfig: [appMainPaths.appTsConfig],
            },
        },

        infrastructureLogging: {
            level: 'none',
        },

        resolve: {
            extensions: ['.ts', '.js'],
            extensionAlias: {
                '.js': ['.js', '.ts'],
            },
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
                    loader: 'source-map-loader',
                },
                {
                    oneOf: [
                        {
                            test: /\.[cm]?[jt]s$/,
                            loader: 'esbuild-loader',
                            options: {
                                target: NODE_TARGET,
                            },
                        },
                    ],
                },
            ],
        },

        optimization: {
            minimize: isProduction,
            minimizer: [new EsbuildPlugin({ target: NODE_TARGET })],
        },

        plugins: [
            new EsbuildPlugin({
                define: {
                    'process.env.NODE_ENV': JSON.stringify(isDevelopment ? 'development' : 'production'),
                },
            }),
            isDevelopment && new ReloadElectronWebpackPlugin(root, workingDir),
            // TypeScript type checking
            isDevelopment &&
                new ForkTsCheckerWebpackPlugin({
                    async: isDevelopment,
                    typescript: {
                        typescriptPath: 'typescript',
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
        ].filter(Boolean),

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
}

export default factory;
