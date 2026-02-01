import electron from 'electron';
import path from 'node:path';

// `..` points to `<repo>/packages/scripts/src`
// `../..` points to `<repo>/packages/scripts`
// `../../..` points to `<repo>/packages`
// `../../../..` points to `<repo>`
const repository = path.resolve(import.meta.dirname, '../../../..');

const build = path.resolve(repository, 'build');
const rootNodeModules = path.resolve(repository, 'node_modules');

const pkgs = path.resolve(repository, 'packages');

const scriptsDist = path.resolve(pkgs, 'scripts/dist');

export const paths = {
    repository,
    electron: electron as unknown as string,

    // packages

    electronMain: path.resolve(pkgs, 'app-main'),
    electronRenderer: path.resolve(pkgs, 'app-renderer'),

    // compilation

    build,
    unpackedWinDir: path.resolve(repository, 'release/win-unpacked'),

    webpackMainConfig: path.resolve(scriptsDist, 'webpack/webpack.main.config.js'),

    // working

    working: path.resolve(repository, 'working'),

    // test

    jestCache: path.resolve(rootNodeModules, '.cache/jest'),
    jestConfig: path.resolve(scriptsDist, 'jest/jest.config.js'),
};
