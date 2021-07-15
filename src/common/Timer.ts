import { Optional } from './TypeUtils';

export class Timer {
    private _trigger: () => void;

    private _autoReset: boolean;
    private _interval: number;

    private _id: Optional<ReturnType<typeof setInterval>>;

    constructor(trigger: () => void, interval: number = 1000) {
        this._trigger = trigger;

        this._autoReset = false;
        this._interval = interval;

        this._id = null;
    }

    get isTiming() {
        return this._id !== null;
    }

    private _timeoutTrigger = () => {
        this._id = null;
        this._trigger();
    };

    public start = (autoReset: boolean = false, interval?: number): void => {
        if (this._id === null) {
            if (interval) this._interval = interval;

            this._autoReset = autoReset;
            if (autoReset) {
                this._id = setInterval(this._trigger, this._interval);
            } else {
                this._id = setTimeout(this._timeoutTrigger, this._interval);
            }
        }
    };

    public stop = (): void => {
        if (this._id) {
            if (this._autoReset) {
                clearInterval(this._id);
            } else {
                clearTimeout(this._id);
            }

            this._id = null;
        }
    };
}
