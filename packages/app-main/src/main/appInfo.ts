import { app } from 'electron';
import path from 'node:path';

export class AppInfo {
    private static _instance?: AppInfo;

    private readonly _appPath: string;
    private readonly _srcPath: string;
    private readonly _userDataPath: string;

    private readonly _startedTime: number;

    private constructor() {
        const isInASAR = __dirname.includes('.asar');

        this._srcPath = __dirname;
        this._appPath = isInASAR
            ? // The path to folder `resources` in installation root.
              path.resolve(__dirname, '../..')
            : // The path to folder `build` in project root.
              __dirname;

        this._userDataPath = app.getPath('userData');

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

    get useDataPath(): string {
        return this._userDataPath;
    }

    get startedTime(): number {
        return this._startedTime;
    }
}
