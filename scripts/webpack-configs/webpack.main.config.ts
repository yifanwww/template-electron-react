import _path from 'path';
import { ConfigurationFactory } from 'webpack';

import { MkdirWebpackPlugin } from '../webpack-plugins/mkdir-webpack-plugin';
import { ReloadElectronWebpackPlugin } from '../webpack-plugins/reload-electron-webpack-plugin';
import { alias, paths } from './webpack.base.config';

const SpeedMeasurePlugin = require('speed-measure-webpack-plugin');

const projectDir = _path.resolve(__dirname, '../..');
const workingDir = _path.resolve(projectDir, 'working');

const factory: ConfigurationFactory = (env, argv) => {
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
            alias,
        },
        watch: isEnvDevelopment,
        watchOptions: {
            aggregateTimeout: 500,
            // poll: 10_000,
        },
        node: {
            // eslint-disable-next-line @typescript-eslint/naming-convention
            __dirname: false,
            // eslint-disable-next-line @typescript-eslint/naming-convention
            __filename: false,
        },
    };

    return isEnvProduction ? new SpeedMeasurePlugin({ outputFormat: 'human' }).wrap(webpack) : webpack;
};

module.exports = factory;
