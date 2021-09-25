import { Configuration, ConfigurationFactory } from 'webpack';

import { paths } from '../utils';
import { ReloadElectronWebpackPlugin } from './plugins/reloadElectronWebpackPlugin';
import { pathsMain } from './webpack.base.config';

const factory: ConfigurationFactory = (env, argv) => {
    const isEnvDevelopment = argv.mode === 'development';
    const isEnvProduction = argv.mode === 'production';

    const webpack: Configuration = {
        target: 'electron-main',
        entry: pathsMain.appIndexTs,

        output: {
            filename: 'electron.js',
            path: pathsMain.build,
        },

        devtool: isEnvProduction ? 'source-map' : 'cheap-module-source-map',

        module: {
            rules: [
                {
                    test: /\.ts$/,
                    loader: 'ts-loader',
                    include: [pathsMain.appSrc],
                    options: { configFile: pathsMain.appTsConfig },
                },
            ],
        },

        plugins: isEnvDevelopment ? [new ReloadElectronWebpackPlugin(paths.repository, paths.working)] : [],

        resolve: {
            extensions: ['.js', 'mjs', '.ts'],
            alias: {
                src: pathsMain.appSrc,
            },
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

    return webpack;
};

export = factory;
