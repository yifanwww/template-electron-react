import path from 'node:path';
import { app } from 'electron';

const sourcePath = path.join(app.getAppPath(), 'out');
const userDataPath = app.isPackaged ? app.getPath('userData') : path.resolve('working');
const resourcesPath = app.isPackaged ? process.resourcesPath : path.resolve('resources');

export const appInfo = {
  /**
   * The path where the app's source code resides. This is used as the base path for loading resources and modules.
   *
   * `sourcePath` points to different directory in different environments:
   * - in packaged app: `<installation>/resources/app.asar/out/`
   * - in unpackaged app: `<repo>/out/`
   * - in test environment: `<repo>/src/`
   */
  get sourcePath(): string {
    return sourcePath;
  },

  /**
   * The path where the app can store user data, such as settings and databases.
   *
   * `userDataPath` points to different directory in different environments:
   * - in packaged app: `app.getPath('userData')`
   * - in unpackaged app: `<repo>/working/`
   * - in test environment: `<repo>/working/`
   */
  get userDataPath(): string {
    return userDataPath;
  },

  /**
   * The path where the app resources are, use this with electron-builder's `extraResources` settings.
   *
   * `resourcesPath` points to different directory in different environments:
   * - in packaged app: `process.resourcesPath`
   * - in unpackaged app: `<repo>/resources/`
   * - in test environment: `<repo>/resources/`
   */
  get resourcesPath(): string {
    return resourcesPath;
  },
};
