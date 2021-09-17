import path from 'path';

const project = path.join(__dirname, '../../..');
const build = path.join(project, 'build');
const nodeModules = path.join(project, 'node_modules');
const packages = path.join(project, 'packages');

// const scripts = path.join(packages, 'scripts');

export const paths = {
    build,
    nodeModules,
    packages,
    project,

    appTsBuildInfoFile: path.join(nodeModules, '.cache/tsconfig.tsbuildinfo'),
    webpackCache: path.join(nodeModules, '.cache'),
};
