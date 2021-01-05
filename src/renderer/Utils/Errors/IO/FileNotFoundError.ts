import { IOError } from './IOError';

export class FileNotFoundError extends IOError {
    private _fileName?: string;

    public constructor();
    public constructor(message: string);
    public constructor(message: string, innerError: Error);
    public constructor(message: string, fileName: string);
    public constructor(message: string, fileName: string, innerError: Error);

    public constructor(message?: string, arg1?: string | Error, arg2?: Error) {
        // message + fileName + innerError?
        if (typeof arg1 === 'string') {
            super(message, arg2);

            this._fileName = arg1;
        }

        // message? + innerError?
        else {
            super(message, arg1);
        }
    }

    get fileName() {
        return this._fileName;
    }
}
