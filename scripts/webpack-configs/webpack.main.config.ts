import SpeedMeasurePlugin from 'speed-measure-webpack-plugin';
import { Configuration, ConfigurationFactory } from 'webpack';

import { paths } from '../paths';
import { ReloadElectronWebpackPlugin } from '../webpack-plugins/reload-electron-webpack-plugin';
import { aliases, cra_paths } from './webpack.base.config';

const factory: ConfigurationFactory = (env, argv) => {
    const isEnvDevelopment = argv.mode === 'development';
    const isEnvProduction = argv.mode === 'production';

    const webpack: Configuration = {
        target: 'electron-main',
        entry: cra_paths.appIndexTsMain,

        output: {
            filename: 'electron.js',
            path: cra_paths.appBuild,
        },

        devtool: isEnvProduction ? 'source-map' : 'cheap-module-source-map',

        module: {
            rules: [
                {
                    test: /\.ts$/,
                    loader: 'ts-loader',
                    include: [cra_paths.appSrcCommon, cra_paths.appSrcMain],
                    options: { configFile: cra_paths.appTsConfigMain },
                },
            ],
        },

        plugins: isEnvDevelopment ? [new ReloadElectronWebpackPlugin(paths.project, paths.working)] : [],

        resolve: {
            extensions: ['.js', 'mjs', '.ts'],
            alias: aliases,
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
