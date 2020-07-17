const path = require('path');

const isDevMode = process.env.mode === 'development' ? true : false;

function GetPath(relativePath) {
    return path.resolve(__dirname, relativePath);
}

module.exports = {
    target: 'electron-main',
    mode: isDevMode ? 'development' : 'production',
    entry: GetPath('../electron/app.ts'),
    output: {
        filename: 'electron.js',
        path: GetPath('../build')
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                loader: 'ts-loader',
                include: GetPath('../electron'),
                options: {
                    configFile: GetPath('tsconfig.main.json')
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
