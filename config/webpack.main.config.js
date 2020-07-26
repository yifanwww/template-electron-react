const Base = require('./webpack.base.config');

module.exports = {
    target: 'electron-main',
    mode: Base.IsDevMode ? 'development' : 'production',
    entry: Base.Paths.AppIndexJsMain,
    output: {
        filename: 'electron.js',
        path: Base.Paths.AppBuild
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                loader: 'ts-loader',
                include: [Base.Paths.AppSrcMain, Base.Paths.AppSrcUtils],
                options: {
                    configFile: Base.Paths.AppTsConfigMain
                }
            }
        ]
    },
    resolve: {
        extensions: ['.ts', '.js'],
        alias: Base.Alias
    },
    node: {
        __dirname: false,
        __filename: false
    }
}
