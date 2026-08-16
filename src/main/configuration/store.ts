import ElectronStore from 'electron-store';
import { appInfo } from '../appInfo';
import type { IWindowState } from './window';

interface IAppConfiguration {
  window?: Record<string, IWindowState | undefined>;
  restoreLastWindowState: boolean;
}

class Store {
  private _store = new ElectronStore<IAppConfiguration>({
    name: 'settings',
    fileExtension: 'json',
    cwd: appInfo.userDataPath,
    serialize: (value) => JSON.stringify(value, null, 4),
    schema: {
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
      restoreLastWindowState: {
        type: 'boolean',
        default: true,
      },
    },
  });

  getWindowState(key: string): IWindowState | undefined {
    return this._store.get(`window.${key}`);
  }

  setWindowState(key: string, value: IWindowState | undefined) {
    if (value) {
      this._store.set(`window.${key}`, value);
    } else {
      this._store.delete(`window.${key}`);
    }
  }

  getRestoreLastWindowState(): boolean {
    return this._store.get('restoreLastWindowState');
  }

  setRestoreLastWindowState(value: boolean | undefined) {
    if (value !== undefined) {
      this._store.set('restoreLastWindowState', value);
    } else {
      this._store.delete('restoreLastWindowState');
    }
  }
}

export const store = new Store();
