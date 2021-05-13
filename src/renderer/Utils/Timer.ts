export class Timer {
    private _trigger: () => void;

    private _autoReset: boolean;
    private _id: number | NodeJS.Timeout | null;
    private _interval: number;

    constructor(trigger: () => {}, interval: number = 1000) {
        this._trigger = trigger;

        this._autoReset = false;
        this._id = null;
        this._interval = interval;
    }

    private _timeoutTrigger() {
        this._id = null;
        this._trigger();
    }

    public start(autoReset: boolean = false, interval?: number): void {
        if (this._id) return;

        if (interval) this._interval = interval;

        this._autoReset = autoReset;
        if (autoReset) {
            this._id = setInterval(this._trigger, this._interval);
        } else {
            this._id = setTimeout(this._timeoutTrigger, this._interval);
        }
    }

    public stop(): void {
        if (this._id) {
            if (this._autoReset) {
                clearInterval(this._id as any);
            } else {
                clearTimeout(this._id as any);
            }

            this._id = null;
        }
    }
}
