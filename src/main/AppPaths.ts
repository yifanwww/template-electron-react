import path from 'path';

export class AppPaths {
    private _app: string;
    private _src: string;

    public constructor() {
        const isInASAR = __dirname.includes('.asar');

        this._src = __dirname;
        this._app = isInASAR
            ? // The path to folder `resources` in installation root.
              path.resolve(__dirname, '../..')
            : // The path to folder `build` in project root.
              __dirname;
    }

    public get app() {
        return this._app;
    }

    public get src() {
        return this._src;
    }
}

export const appPaths = new AppPaths();
