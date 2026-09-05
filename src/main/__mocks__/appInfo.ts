import path from 'node:path';

const sourcePath = path.resolve(__dirname, '../..');
const userDataPath = path.resolve(__dirname, '../../../working');
const resourcesPath = path.resolve(__dirname, '../../../resources');

export const appInfo = {
  get sourcePath(): string {
    return sourcePath;
  },

  get userDataPath(): string {
    return userDataPath;
  },

  get resourcesPath(): string {
    return resourcesPath;
  },
};
