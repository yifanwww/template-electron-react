const SpeedMeasurePlugin = require('speed-measure-webpack-plugin');
const smp = new SpeedMeasurePlugin({ outputFormat: 'humanVerbose' });

const Base = require('./webpack.base.config');

module.exports = smp.wrap({
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
    resolve: {
        extensions: ['.js', '.ts'],
        alias: Base.Alias,
    },
    node: {
        __dirname: false,
        __filename: false,
    },
});
