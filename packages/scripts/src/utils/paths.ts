import electron from 'electron';
import path from 'path';

// `..` points to `<repo>/packages/scripts/src`
// `../..` points to `<repo>/packages/scripts`
// `../../..` points to `<repo>/packages`
// `../../../..` points to `<repo>`
const repository = path.resolve(__dirname, '../../../..');

const build = path.resolve(repository, 'build');
const nodeModules = path.resolve(repository, 'node_modules');
const packages = path.resolve(repository, 'packages');

const scriptsDist = path.resolve(packages, 'scripts/dist');

export const paths = {
    repository,

    // node_modules

    nodeModules,
    electron: electron as unknown as string,

    // packages

    packages,
    tecraElectronMain: path.resolve(packages, 'electron-main'),
    tecraElectronRenderer: path.resolve(packages, 'electron-renderer'),

    // compilation

    build,
    unpacked: path.resolve(repository, 'release/win-unpacked/tecra.exe'),

    webpackMainConfig: path.resolve(scriptsDist, 'webpack/webpack.main.config.js'),
    webpackRendererConfig: path.resolve(scriptsDist, 'webpack/webpack.renderer.config.js'),

    // working

    working: path.resolve(repository, 'working'),

    // test

    jestCache: path.resolve(nodeModules, '.cache/jest'),

    jestConfig: path.resolve(scriptsDist, 'jest/jest.config.js'),
    testSetup: path.resolve(packages, 'utils-test/src/setup.ts'),
    transforms: {
        babel: path.resolve(scriptsDist, 'jest/transform.babel.js'),
        css: path.resolve(scriptsDist, 'jest/transform.css.js'),
        file: path.resolve(scriptsDist, 'jest/transform.file.js'),
    },
};
