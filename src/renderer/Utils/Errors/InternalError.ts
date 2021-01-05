export class InternalError extends Error {
    protected _name: string;
    protected _message: string;
    protected _stack?: string;

    public constructor(message?: string, innerError?: Error) {
        const _err: Error = super(message) as any;

        this._name = this.constructor.name;
        this._message = _err.message;
        this._stack = _err.stack;

        if (innerError && innerError.stack) {
            this._stack = `${this._stack ?? ''}\n--- inner error ---\n${innerError.stack}`;
        }
    }

    get name() {
        return this._name;
    }

    get message() {
        return this._message;
    }

    get stack() {
        return this._stack;
    }
}
