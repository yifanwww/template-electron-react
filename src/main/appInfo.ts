import path from 'node:path';
import { app } from 'electron';

class AppInfo {
    private readonly _appPath: string;
    private readonly _userDataPath: string;

    private readonly _startedTime: number;

    constructor() {
        this._appPath = app.isPackaged
            ? // use installation directory in production env
              path.resolve(__dirname, '../../..')
            : // use `working` directory in development env
              path.resolve('.');

        this._userDataPath = app.isPackaged
            ? // use user data directory in production env
              app.getPath('userData')
            : // use `working` directory in development env
              path.resolve('.');

        this._startedTime = Date.now();
    }

    get appPath(): string {
        return this._appPath;
    }

    /**
     * The path where the app's source code resides. This is used as the base path for loading resources and modules.
     *
     * In development environment, `sourcePath` points to the build output directory (e.g., `<repo>/build/`)
     * where the compiled main process code is located.
     *
     * In production environment, `sourcePath` points to the `resources/app.asar/build/` directory
     * inside the installation directory.
     */
    get sourcePath(): string {
        return __dirname;
    }

    get userDataPath(): string {
        return this._userDataPath;
    }

    get startedTime(): number {
        return this._startedTime;
    }
}

export const appInfo = new AppInfo();
