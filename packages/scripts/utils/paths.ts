import electron from 'electron';
import path from 'path';

const repository = path.resolve(__dirname, '../../..');

const build = path.resolve(repository, 'build');
const nodeModules = path.resolve(repository, 'node_modules');
const packages = path.resolve(repository, 'packages');

const scripts = path.resolve(packages, 'scripts');

export const paths = {
    repository,

    // node_modules

    nodeModules,
    electron: electron as unknown as string,

    // packages

    packages,
    tecraElectronMain: path.resolve(packages, 'electron-main'),

    // compilation

    build,
    unpacked: path.resolve(repository, 'release/win-unpacked/tecra.exe'),

    webpackMainConfig: path.resolve(scripts, 'webpack/webpack.main.config.js'),

    appTsBuildInfoFile: path.resolve(nodeModules, '.cache/tsconfig.tsbuildinfo'),
    webpackCache: path.resolve(nodeModules, '.cache'),

    // working

    working: path.resolve(repository, 'working'),
};
