const _path = require('path');

const SpeedMeasurePlugin = require('speed-measure-webpack-plugin');
const WebpackElectronReload = require('./webpack-electron-reload');
const WebpackMkdir = require('./webpack-mkdir');

const Base = require('./webpack.base.config');

const _projectDir = _path.join(__dirname, '..');
const _workingDir = _path.join(_projectDir, 'working');

module.exports = (env, argv) => {
    const isEnvDevelopment = argv.mode === 'development';
    const isEnvProduction = argv.mode === 'production';

    const webpack = {
        target: 'electron-main',
        entry: Base.Paths.AppIndexJsMain,
        output: {
            filename: 'electron.js',
            path: Base.Paths.AppBuild,
        },
        module: {
            rules: [
                {
                    test: /\.ts$/,
                    loader: 'ts-loader',
                    include: [Base.Paths.AppSrcMain, Base.Paths.AppSrcShared],
                    options: {
                        configFile: Base.Paths.AppTsConfigMain,
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
            alias: Base.Alias,
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

    return isEnvProduction
        ? new SpeedMeasurePlugin({ outputFormat: 'humanVerbose' }).wrap(webpack)
        : webpack;
};
