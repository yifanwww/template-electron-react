import path from 'node:path';
import { EsbuildPlugin } from 'esbuild-loader';
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import { createEnvironmentHash } from './configs/webpack/createEnvironmentHash.mjs';
import { ReloadElectronWebpackPlugin } from './configs/webpack/reloadElectronWebpackPlugin.mjs';
import { WebpackStatsPrettifyPlugin } from './configs/webpack/webpackStatsPrettifyPlugin.mjs';

const root = import.meta.dirname;
const workingDir = path.join(root, 'working');
const srcDir = path.join(root, 'src');

const NODE_TARGET = 'node24.11';

const locations = {
    mainIndexTs: path.join(srcDir, 'main/index.ts'),
    preloadIndexTs: path.join(srcDir, 'preload/index.ts'),
    tsBuildInfoFile: path.join(root, 'node_modules/.cache/tsconfig.tsbuildinfo'),
    tsConfig: path.join(root, 'tsconfig.json'),
    build: path.join(root, 'build'),
    webpackCache: path.join(root, 'node_modules/.cache'),
};

const alias = {
    '@main': path.join(srcDir, 'main'),
    '@preload': path.join(srcDir, 'preload'),
    '@shared': path.join(srcDir, 'shared'),
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
            electron: locations.mainIndexTs,
            preload: locations.preloadIndexTs,
        },

        output: {
            path: locations.build,
            // Add /* filename */ comments to generated require()s in the output.
            pathinfo: isDevelopment,
            filename: '[name].js',
            chunkFilename: '[name].[contenthash:8].chunk.js',
        },

        cache: {
            type: 'filesystem',
            version: createEnvironmentHash({ NODE_ENV: isDevelopment ? 'development' : 'production' }),
            cacheDirectory: locations.webpackCache,
            store: 'pack',
            buildDependencies: {
                defaultWebpack: ['webpack/lib/'],
                config: [import.meta.filename],
                tsconfig: [locations.tsConfig],
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
            alias,
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
                                tsBuildInfoFile: locations.tsBuildInfoFile,
                            },
                        },
                        context: root,
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
