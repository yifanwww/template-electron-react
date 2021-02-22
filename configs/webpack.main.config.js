const _path = require('path');

const SpeedMeasurePlugin = require('speed-measure-webpack-plugin');
const WebpackElectronReload = require('./webpack-electron-reload');
const WebpackMkdir = require('./webpack-mkdir');

const BaseWebpack = require('./webpack.base.config');

const _projectDir = _path.resolve(__dirname, '..');
const _workingDir = _path.resolve(_projectDir, 'working');

module.exports = (env, argv) => {
    const isEnvDevelopment = argv.mode === 'development';
    const isEnvProduction = argv.mode === 'production';

    const webpack = {
        target: 'electron-main',
        entry: BaseWebpack.paths.appIndexTsMain,
        output: {
            filename: 'electron.js',
            path: BaseWebpack.paths.appBuild,
        },
        devtool: isEnvProduction ? 'source-map' : 'cheap-module-source-map',
        module: {
            rules: [
                {
                    test: /\.ts$/,
                    loader: 'ts-loader',
                    include: [BaseWebpack.paths.appSrcMain, BaseWebpack.paths.appSrcShared],
                    options: {
                        configFile: BaseWebpack.paths.appTsConfigMain,
                    },
                },
            ],
        },
        plugins: [
            new WebpackMkdir(_workingDir),
            isEnvDevelopment && new WebpackElectronReload(_projectDir, _workingDir),
        ].filter(Boolean),
        resolve: {
            extensions: ['.js', 'mjs', '.ts'],
            alias: BaseWebpack.alias,
        },
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

    return isEnvProduction ? new SpeedMeasurePlugin({ outputFormat: 'humanVerbose' }).wrap(webpack) : webpack;
};
