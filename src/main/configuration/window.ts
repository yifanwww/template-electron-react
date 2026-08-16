import type { BrowserWindow } from 'electron';
import { screen } from 'electron';
import { store } from './store';

export interface IWindowState {
  x: number;
  y: number;
  width: number;
  height: number;
  maximized: boolean;
  fullScreen: boolean;
}

const EVENT_HANDLING_DELAY = 100;

interface IWindowStateKeeperOptions {
  defaultWidth: number;
  defaultHeight: number;
  defaultMaximized: boolean;
  defaultFullScreen: boolean;
}

export class WindowStateKeeper {
  private readonly _key: string;
  private _enabled: boolean;
  private readonly _state: IWindowState;
  private _stateChangeTimer?: NodeJS.Timeout;
  private _windowRef?: BrowserWindow;
  private _registered = false;

  constructor(key: string, enabled: boolean, options: IWindowStateKeeperOptions) {
    this._key = key;
    this._enabled = enabled;

    const { workAreaSize } = screen.getPrimaryDisplay();
    const { defaultFullScreen, defaultHeight, defaultMaximized, defaultWidth } = options;
    this._state = {
      x: Math.round((workAreaSize.width - defaultWidth) / 2),
      y: Math.round((workAreaSize.height - defaultHeight) / 2),
      width: defaultWidth,
      height: defaultHeight,
      maximized: defaultMaximized,
      fullScreen: defaultFullScreen,
    };

    if (this._enabled) {
      const prevState = getWindowState(key);
      if (prevState) {
        this._state = prevState;
      }
    }
  }

  set enabled(value: boolean) {
    this._enabled = value;
    if (this._enabled && this._windowRef && !this._registered) {
      this.register(this._windowRef);
    } else if (!this._enabled) {
      this._removeListeners();
      this._saveState();
    }
  }

  get enabled() {
    return this._enabled;
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
    if (this._enabled) {
      store.setWindowState(this._key, this._state);
    } else {
      store.setWindowState(this._key, undefined);
    }
  }

  private _handleStateChange = () => {
    if (this._stateChangeTimer) {
      clearTimeout(this._stateChangeTimer);
    }
    this._stateChangeTimer = setTimeout(() => {
      this._stateChangeTimer = undefined;
      this._updateState();
    }, EVENT_HANDLING_DELAY);
  };

  private _handleClose = () => {
    this._updateState();
  };

  private _handleClosed = () => {
    this._removeListeners();
    this._windowRef = undefined;
    this._saveState();
  };

  register(window: BrowserWindow) {
    this._windowRef = window;

    if (this._enabled && !this._registered) {
      this._registered = true;
      window.on('move', this._handleStateChange);
      window.on('resize', this._handleStateChange);
      window.on('close', this._handleClose);
      window.on('closed', this._handleClosed);
    }
  }

  private _removeListeners() {
    this._registered = false;
    this._windowRef?.removeListener('move', this._handleStateChange);
    this._windowRef?.removeListener('resize', this._handleStateChange);
    if (this._stateChangeTimer) {
      clearTimeout(this._stateChangeTimer);
      this._stateChangeTimer = undefined;
    }
    this._windowRef?.removeListener('close', this._handleClose);
    this._windowRef?.removeListener('closed', this._handleClosed);
  }
}

function getWindowState(key: string): IWindowState | null {
  const prevState = store.getWindowState(key);
  if (prevState) {
    const visible = checkWindowVisible(prevState);
    if (visible) {
      return prevState;
    }
  }

  return null;
}

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
