import electron from 'electron';
import path from 'path';

const repository = path.resolve(__dirname, '..');

export const paths = {
    electron: electron as unknown as string,
    unpacked: path.resolve(repository, 'release/win-unpacked/tecra.exe'),
    working: path.resolve(repository, 'working'),
};
