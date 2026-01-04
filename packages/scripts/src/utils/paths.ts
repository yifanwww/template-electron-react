import electron from 'electron';
import path from 'node:path';

// `..` points to `<repo>/packages/scripts/src`
// `../..` points to `<repo>/packages/scripts`
// `../../..` points to `<repo>/packages`
// `../../../..` points to `<repo>`
const repo = path.resolve(import.meta.dirname, '../../../..');

const build = path.resolve(repo, 'build');
const rootNodeModules = path.resolve(repo, 'node_modules');

const pkgs = path.resolve(repo, 'packages');

const scriptsDist = path.resolve(pkgs, 'scripts/dist');

export const paths = {
    repository: repo,

    // node_modules

    rootNodeModules,
    electron: electron as unknown as string,

    // packages

    electronMain: path.resolve(pkgs, 'app-main'),
    electronRenderer: path.resolve(pkgs, 'app-renderer'),

    // compilation

    build,
    unpacked: path.resolve(repo, 'release/win-unpacked/template-electron-react.exe'),

    webpackMainConfig: path.resolve(scriptsDist, 'webpack/webpack.main.config.js'),

    // working

    working: path.resolve(repo, 'working'),

    // test

    jestCache: path.resolve(rootNodeModules, '.cache/jest'),
    jestConfig: path.resolve(scriptsDist, 'jest/jest.config.js'),
};
