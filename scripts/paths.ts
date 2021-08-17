import path from 'path';

const project = path.join(__dirname, '..');
const nodeModules = path.join(project, 'node_modules');

const working = path.join(project, 'working');

const unpacked = path.join(project, 'release/win-unpacked/tecra.exe');

const electron = path.join(nodeModules, 'electron/dist/electron.exe');

export const paths = {
    electron,
    nodeModules,
    project,
    unpacked,
    working,
};
