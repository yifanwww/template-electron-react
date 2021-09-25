import { app } from 'electron';

export class AppInfo {
    private _name: string;
    private _version: string;

    private _chrome: string;
    private _electron: string;
    private _nodejs: string;
    private _v8: string;

    public constructor() {
        this._name = app.getName();
        this._version = app.getVersion();

        this._chrome = process.versions.chrome;
        this._electron = process.versions.electron;
        this._nodejs = process.versions.node;
        this._v8 = process.versions.v8;
    }

    public get name() {
        return this._name;
    }

    public get version() {
        return this._version;
    }

    public get chrome() {
        return this._chrome;
    }

    public get electron() {
        return this._electron;
    }

    public get nodejs() {
        return this._nodejs;
    }

    public get v8() {
        return this._v8;
    }
}

export const appInfo = new AppInfo();
