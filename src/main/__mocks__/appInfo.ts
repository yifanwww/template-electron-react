import path from 'node:path';

class AppInfo {
  readonly sourcePath = path.resolve(__dirname, '../..');
  readonly userDataPath = path.resolve(__dirname, '../../../working');
  readonly startedTime = 0;
}

export const appInfo = new AppInfo();
