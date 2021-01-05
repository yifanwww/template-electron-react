import { IOError } from './IOError';

export class DriveNotFoundError extends IOError {
    private _drive?: string;

    public constructor();
    public constructor(message: string);
    public constructor(message: string, innerError: Error);
    public constructor(message: string, drive: string);
    public constructor(message: string, drive: string, innerError: Error);

    public constructor(message?: string, arg1?: string | Error, arg2?: Error) {
        // message + drive + innerError?
        if (typeof arg1 === 'string') {
            super(message, arg2);

            this._drive = arg1;
        }

        // message? + innerError?
        else {
            super(message, arg1);
        }
    }

    get drive() {
        return this._drive;
    }
}
