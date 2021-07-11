/* eslint-disable @typescript-eslint/naming-convention */

import _path from 'path';
import SpeedMeasurePlugin from 'speed-measure-webpack-plugin';
import { Configuration, ConfigurationFactory } from 'webpack';

import { ReloadElectronWebpackPlugin } from '../webpack-plugins/reload-electron-webpack-plugin';
import { alias, paths } from './webpack.base.config';

const projectDir = _path.resolve(__dirname, '../..');
const workingDir = _path.resolve(projectDir, 'working');

const factory: ConfigurationFactory = (env, argv) => {
    const isEnvDevelopment = argv.mode === 'development';
    const isEnvProduction = argv.mode === 'production';

    const webpack: Configuration = {
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
        plugins: isEnvDevelopment ? [new ReloadElectronWebpackPlugin(projectDir, workingDir)] : [],
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
            __dirname: false,
            __filename: false,
        },
    };

    return isEnvProduction ? new SpeedMeasurePlugin({ outputFormat: 'human' }).wrap(webpack) : webpack;
};

module.exports = factory;
