export type WindowType = 'main';

export interface AppDetails {
    name: string;
    version: string;
    release?: {
        commit: string;
        date: string;
    };
    module: {
        chrome: string;
        electron: string;
        node: string;
        v8: string;
    };
}
