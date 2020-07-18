const fs = require('fs');
const path = require('path');

const isDevMode = process.env.mode === 'development' ? true : false;

// Copied from `node_modules/react-scripts/config/path.js`, line 17 (react-scripts@3.4.1)
const appDirectory = fs.realpathSync(process.cwd());
const ResolveApp = relativePath => path.resolve(appDirectory, relativePath);

// Predefined paths.
const appBuild = ResolveApp('build');
const appIndexJs = ResolveApp('src/main/app');
const appSrcMain = ResolveApp('src/main');
const appSrcUtils = ResolveApp('src/utils');
const appTsConfig = ResolveApp('config/tsconfig.main.json');

module.exports = {
    target: 'electron-main',
    mode: isDevMode ? 'development' : 'production',
    entry: appIndexJs,
    output: {
        filename: 'electron.js',
        path: appBuild
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                loader: 'ts-loader',
                include: [appSrcMain, appSrcUtils],
                options: {
                    configFile: appTsConfig
                }
            }
        ]
    },
    resolve: {
        extensions: ['.ts', '.js'],
    },
    node: {
        __dirname: false,
        __filename: false
    }
}
