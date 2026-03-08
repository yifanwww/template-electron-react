import path from 'node:path';
import electron from 'electron';

// `..` points to `<repo>/packages/scripts/src`
// `../..` points to `<repo>/packages/scripts`
// `../../..` points to `<repo>/packages`
// `../../../..` points to `<repo>`
const repository = path.resolve(import.meta.dirname, '../../../..');

export const paths = {
    repository,
    electron: electron as unknown as string,

    // compilation

    unpackedWinDir: path.resolve(repository, 'release/win-unpacked'),

    // working

    working: path.resolve(repository, 'working'),
};
