import { IOError } from './IOError';

export class DirectoryNotFoundError extends IOError {
    private _directory?: string;

    public constructor();
    public constructor(message: string);
    public constructor(message: string, innerError: Error);
    public constructor(message: string, directory: string);
    public constructor(message: string, directory: string, innerError: Error);

    public constructor(message?: string, arg1?: string | Error, arg2?: Error) {
        // message + directory + innerError?
        if (typeof arg1 === 'string') {
            super(message, arg2);

            this._directory = arg1;
        }

        // message? + innerError?
        else {
            super(message, arg1);
        }
    }

    get directory() {
        return this._directory;
    }
}
