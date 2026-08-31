import ElectronStore, { type Schema } from 'electron-store';
import { appInfo } from '../appInfo';
import type { IWindowState } from './window';

interface IAppSettings {
  restoreLastWindowState: boolean;
}

interface IAppState {
  window?: Record<string, IWindowState | undefined>;
}

export interface IStoreLocation {
  name: string;
  cwd: string;
}

export class Store {
  private _settingsStore?: ElectronStore<IAppSettings>;
  private _appStateStore?: ElectronStore<IAppState>;

  private readonly _settingsSchema: Schema<IAppSettings> = {
    restoreLastWindowState: {
      type: 'boolean',
      default: true,
    },
  };

  private readonly _appStateSchema: Schema<IAppState> = {
    window: {
      type: 'object',
      additionalProperties: {
        type: 'object',
        properties: {
          x: { type: 'number' },
          y: { type: 'number' },
          width: { type: 'number', minimum: 1 },
          height: { type: 'number', minimum: 1 },
          maximized: { type: 'boolean' },
          fullScreen: { type: 'boolean' },
        },
        required: ['x', 'y', 'width', 'height', 'maximized', 'fullScreen'],
      },
    },
  };

  private _getSettingsStoreLocation(): IStoreLocation {
    return {
      name: 'settings',
      cwd: appInfo.userDataPath,
    };
  }

  private _getAppStateStoreLocation(): IStoreLocation {
    return {
      name: 'app-state',
      cwd: appInfo.userDataPath,
    };
  }

  private get settingsStore(): ElectronStore<IAppSettings> {
    this._settingsStore ??= new ElectronStore<IAppSettings>({
      ...this._getSettingsStoreLocation(),
      fileExtension: 'json',
      serialize: (value: unknown) => `${JSON.stringify(value, null, 2)}\n`,
      schema: this._settingsSchema,
    });
    return this._settingsStore;
  }

  private get appStateStore(): ElectronStore<IAppState> {
    this._appStateStore ??= new ElectronStore<IAppState>({
      ...this._getAppStateStoreLocation(),
      fileExtension: 'json',
      serialize: (value: unknown) => `${JSON.stringify(value, null, 2)}\n`,
      schema: this._appStateSchema,
    });
    return this._appStateStore;
  }

  // ── Window state (app-state.json) ─────────────────────────────────────────

  getWindowState(key: string): IWindowState | undefined {
    return this.appStateStore.get(`window.${key}`);
  }

  setWindowState(key: string, value: IWindowState | undefined) {
    if (value) {
      this.appStateStore.set(`window.${key}`, value);
    } else {
      this.appStateStore.delete(`window.${key}`);
    }
  }

  // ── Settings (settings.json) ──────────────────────────────────────────────

  getRestoreLastWindowState(): boolean {
    return this.settingsStore.get('restoreLastWindowState');
  }

  setRestoreLastWindowState(value: boolean) {
    this.settingsStore.set('restoreLastWindowState', value);
  }
}

export const store = new Store();
