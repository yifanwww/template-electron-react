const _path = require('path');

const SpeedMeasurePlugin = require('speed-measure-webpack-plugin');

const MkdirWebpackPlugin = require('../scripts/mkdir-webpack-plugin');
const ReloadElectronWebpackPlugin = require('../scripts/reload-electron-webpack-plugin');
const { alias, paths } = require('./webpack.base.config');

const projectDir = _path.resolve(__dirname, '..');
const workingDir = _path.resolve(projectDir, 'working');

module.exports = (env, argv) => {
    const isEnvDevelopment = argv.mode === 'development';
    const isEnvProduction = argv.mode === 'production';

    const webpack = {
        target: 'electron-main',
        entry: paths.appIndexTsMain,
        output: {
            filename: 'electron.js',
            path: paths.appBuild,
        },
        devtool: isEnvProduction ? 'source-map' : 'cheap-module-source-map',
        module: {
            rules: [
                {
                    test: /\.ts$/,
                    loader: 'ts-loader',
                    include: [paths.appSrcMain, paths.appSrcShared],
                    options: { configFile: paths.appTsConfigMain },
                },
            ],
        },
        plugins: [
            new MkdirWebpackPlugin(workingDir),
            isEnvDevelopment && new ReloadElectronWebpackPlugin(projectDir, workingDir),
        ].filter(Boolean),
        resolve: {
            extensions: ['.js', 'mjs', '.ts'],
            alias: alias,
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

    return isEnvProduction ? new SpeedMeasurePlugin({ outputFormat: 'human' }).wrap(webpack) : webpack;
};
