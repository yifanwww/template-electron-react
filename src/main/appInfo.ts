import path from 'node:path';
import { app } from 'electron';

class AppInfo {
    private readonly _sourcePath: string;
    private readonly _userDataPath: string;

    private readonly _startedTime: number;

    constructor() {
        this._sourcePath = path.resolve(__dirname, '..');

        this._userDataPath = app.isPackaged
            ? // use user data directory in production env
              app.getPath('userData')
            : // use `working` directory in development env
              path.resolve('working');

        this._startedTime = Date.now();
    }

    /**
     * The path where the app's source code resides. This is used as the base path for loading resources and modules.
     *
     * In development environment, `sourcePath` points to the build output directory (e.g., `<repo>/build/`)
     * where the compiled main process code is located.
     *
     * In production environment, `sourcePath` points to the `resources/app.asar/build/` directory
     * inside the installation directory.
     *
     * In test environment, `sourcePath` points to the `src/` directory of the project.
     */
    get sourcePath(): string {
        return this._sourcePath;
    }

    /**
     * The path where the app can store user data, such as logs, settings, and databases.
     *
     * In production environment, this is determined by Electron's `app.getPath('userData')` method.
     *
     * In development environment and test environment, this defaults to a `working` directory.
     */
    get userDataPath(): string {
        return this._userDataPath;
    }

    get startedTime(): number {
        return this._startedTime;
    }
}

export const appInfo = new AppInfo();
