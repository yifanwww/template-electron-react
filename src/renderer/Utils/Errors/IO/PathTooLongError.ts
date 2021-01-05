import { IOError } from './IOError';

export class PathTooLongError extends IOError {
    private _path?: string;

    public constructor();
    public constructor(message: string);
    public constructor(message: string, innerError: Error);
    public constructor(message: string, path: string);
    public constructor(message: string, path: string, innerError: Error);

    public constructor(message?: string, arg1?: string | Error, arg2?: Error) {
        // message + path + innerError?
        if (typeof arg1 === 'string') {
            super(message, arg2);

            this._path = arg1;
        }

        // message? + innerError?
        else {
            super(message, arg1);
        }
    }

    get path() {
        return this._path;
    }
}
