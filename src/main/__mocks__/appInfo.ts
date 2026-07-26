import path from 'node:path';

const sourcePath = path.resolve(__dirname, '../..');
const userDataPath = path.resolve(__dirname, '../../../working');
const startedTime = 0;

export const appInfo = {
  get sourcePath(): string {
    return sourcePath;
  },

  get userDataPath(): string {
    return userDataPath;
  },

  get startedTime(): number {
    return startedTime;
  },
};
