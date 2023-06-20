export interface IWindowState {
    x: number;
    y: number;
    width: number;
    height: number;
    maximized: boolean;
    fullScreen: boolean;
}

export enum ConfigurationKey {
    MAIN_WINDOW_STATE = 'mainWindowState',
}
