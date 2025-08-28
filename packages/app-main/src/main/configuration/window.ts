import { WindowType } from '@ter/app-common/apis/app';
import type { BrowserWindow } from 'electron';
import { screen } from 'electron';

import { ConfigurationKey, store } from './store';

export interface IWindowState {
    x: number;
    y: number;
    width: number;
    height: number;
    maximized: boolean;
    fullScreen: boolean;
}

const EVENT_HANDLING_DELAY = 100;

type WindowStateKeys = ConfigurationKey.MAIN_WINDOW_STATE;

const keyMap: Record<WindowType, WindowStateKeys> = {
    [WindowType.MAIN]: ConfigurationKey.MAIN_WINDOW_STATE,
};

function checkWindowVisible(state: IWindowState) {
    const checkWindowPosition = (bounds: Electron.Rectangle) => {
        return (
            state.x >= bounds.x &&
            state.y >= bounds.y &&
            state.x + state.width <= bounds.x + bounds.width &&
            state.y + state.height <= bounds.y + bounds.height
        );
    };

    const allDisplays = screen.getAllDisplays();
    const visible = allDisplays.some((display) => checkWindowPosition(display.bounds));
    return visible;
}

function getWindowState(type: WindowType): IWindowState | null {
    const prevState = store.get(keyMap[type]);
    if (prevState) {
        const visible = checkWindowVisible(prevState);
        if (visible) {
            return prevState;
        }
    }

    return null;
}

interface IWindowStateKeeperOptions {
    width?: number;
    height?: number;
    maximized?: boolean;
    fullScreen?: boolean;
    ignorePrevious?: boolean;
}

export class WindowStateKeeper {
    private readonly _type: WindowType;

    private readonly _state: IWindowState;
    private _stateChangeTimer?: NodeJS.Timeout;
    private _windowRef?: BrowserWindow;

    private readonly _defaultWidth: number;
    private readonly _defaultHeight: number;
    private readonly _defaultMaximized: boolean;
    private readonly _defaultFullScreen: boolean;

    constructor(type: WindowType, options?: IWindowStateKeeperOptions) {
        this._type = type;

        this._defaultWidth = options?.width ?? 1280;
        this._defaultHeight = options?.height ?? 720;
        this._defaultMaximized = options?.maximized ?? false;
        this._defaultFullScreen = options?.fullScreen ?? false;

        this._state = this._getDefaultWindowState();

        if (!options?.ignorePrevious) {
            const prevState = getWindowState(type);
            if (prevState) {
                this._state = prevState;
            }
        }
    }

    get x() {
        return this._state.x;
    }

    get y() {
        return this._state.y;
    }

    get width() {
        return this._state.width;
    }

    get height() {
        return this._state.height;
    }

    get maximized() {
        return this._state.maximized;
    }

    get fullScreen() {
        return this._state.fullScreen;
    }

    private _getDefaultWindowState(): IWindowState {
        const { workAreaSize } = screen.getPrimaryDisplay();

        return {
            x: Math.round((workAreaSize.width - this._defaultWidth) / 2),
            y: Math.round((workAreaSize.height - this._defaultHeight) / 2),
            width: this._defaultWidth,
            height: this._defaultHeight,
            maximized: this._defaultMaximized,
            fullScreen: this._defaultFullScreen,
        };
    }

    private _updateState = () => {
        const window = this._windowRef;
        if (!window) return;

        try {
            if (!window.isMaximized() && !window.isMinimized() && !window.isFullScreen()) {
                const bounds = window.getBounds();
                this._state.x = bounds.x;
                this._state.y = bounds.y;
                this._state.width = bounds.width;
                this._state.height = bounds.height;
            }
            this._state.maximized = window.isMaximized();
            this._state.fullScreen = window.isFullScreen();
        } catch {
            // Don't throw an error when window was closed
        }
    };

    private _saveState() {
        store.set(keyMap[this._type], this._state);
    }

    private _handleStateChange = () => {
        if (this._stateChangeTimer) {
            clearTimeout(this._stateChangeTimer);
        }
        this._stateChangeTimer = setTimeout(this._updateState, EVENT_HANDLING_DELAY);
    };

    private _handleClose = () => {
        this._updateState();
    };

    private _handleClosed = () => {
        this._removeListeners();
        this._saveState();
    };

    registerHandlers(window: BrowserWindow) {
        window.on('move', this._handleStateChange);
        window.on('resize', this._handleStateChange);
        window.on('close', this._handleClose);
        window.on('closed', this._handleClosed);
        this._windowRef = window;
    }

    private _removeListeners() {
        this._windowRef?.removeListener('move', this._handleStateChange);
        this._windowRef?.removeListener('resize', this._handleStateChange);
        if (this._stateChangeTimer) {
            clearTimeout(this._stateChangeTimer);
            this._stateChangeTimer = undefined;
        }
        this._windowRef?.removeListener('close', this._handleClose);
        this._windowRef?.removeListener('closed', this._handleClosed);
        this._windowRef = undefined;
    }
}
