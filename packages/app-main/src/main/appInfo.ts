import { app } from 'electron';
import path from 'node:path';

export class AppInfo {
    private static _instance?: AppInfo;

    private readonly _appPath: string;
    private readonly _srcPath: string;
    private readonly _userDataPath: string;

    private readonly _startedTime: number;

    private constructor() {
        this._srcPath = __dirname;
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

    static get INSTANCE() {
        AppInfo.init();
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        return AppInfo._instance!;
    }

    static init() {
        AppInfo._instance ??= new AppInfo();
    }

    get appPath(): string {
        return this._appPath;
    }

    get srcPath(): string {
        return this._srcPath;
    }

    get userDataPath(): string {
        return this._userDataPath;
    }

    get startedTime(): number {
        return this._startedTime;
    }
}
