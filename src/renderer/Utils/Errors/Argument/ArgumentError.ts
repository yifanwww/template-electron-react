import { InternalError } from '../InternalError';

export class ArgumentError extends InternalError {
    protected _argument?: string;

    public constructor();
    public constructor(message: string);
    public constructor(message: string, innerError: Error);
    public constructor(message: string, argument: string);
    public constructor(message: string, argument: string, innerError: Error);

    public constructor(message?: string, arg1?: string | Error, arg2?: Error) {
        // message + argument + innerError?
        if (typeof arg1 === 'string') {
            message! += ` (Parameter '${arg1})`;

            super(message, arg2);

            this._argument = arg1;
        }

        // message? + innerError?
        else {
            super(message, arg1);
        }
    }

    get argument() {
        return this._argument;
    }
}
