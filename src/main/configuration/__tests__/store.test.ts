import fs from 'node:fs';
import path from 'node:path';
import { describe, expect, it, vi } from 'vitest';
import { Store, type IStoreLocation } from '../store';
import type { IWindowState } from '../window';

vi.mock('../../appInfo');

interface MockStore extends Omit<Store, '_getSettingsStoreLocation' | '_getAppStateStoreLocation'> {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  _getSettingsStoreLocation(): IStoreLocation;
  // eslint-disable-next-line @typescript-eslint/naming-convention
  _getAppStateStoreLocation(): IStoreLocation;
}

const FIXTURES_DIR = path.join(import.meta.dirname, './stores');

function readJson(filePath: string): Record<string, unknown> | null {
  if (!fs.existsSync(filePath)) {
    return null;
  }
  return JSON.parse(fs.readFileSync(filePath, 'utf8')) as Record<string, unknown>;
}

describe('reading and writing settings.json', () => {
  it('loads and writes values from a valid settings file', () => {
    vi.spyOn(Store.prototype as unknown as MockStore, '_getSettingsStoreLocation').mockReturnValue({
      name: 'settings-valid',
      cwd: FIXTURES_DIR,
    });

    const defaultValidRestoreLastWindowState = false;

    const store = new Store();

    expect(store.getRestoreLastWindowState()).toBe(defaultValidRestoreLastWindowState);

    {
      store.setRestoreLastWindowState(true);

      const settings = readJson(path.join(FIXTURES_DIR, 'settings-valid.json'));
      expect(settings?.restoreLastWindowState).toBe(true);
    }

    {
      store.setRestoreLastWindowState(defaultValidRestoreLastWindowState);

      const settings = readJson(path.join(FIXTURES_DIR, 'settings-valid.json'));
      expect(settings?.restoreLastWindowState).toBe(defaultValidRestoreLastWindowState);
    }
  });

  it('rejects an invalid settings file', () => {
    vi.spyOn(Store.prototype as unknown as MockStore, '_getSettingsStoreLocation').mockReturnValue({
      name: 'settings-invalid',
      cwd: FIXTURES_DIR,
    });

    expect(() => new Store()['settingsStore']).toThrow(/Config schema violation/);
  });

  it('applies defaults when no settings file exists', () => {
    vi.spyOn(Store.prototype as unknown as MockStore, '_getSettingsStoreLocation').mockReturnValue({
      name: 'settings-empty',
      cwd: FIXTURES_DIR,
    });

    const store = new Store();

    expect(store.getRestoreLastWindowState()).toBe(true);

    fs.rmSync(path.join(FIXTURES_DIR, 'settings-empty.json'), { force: true });
  });
});

describe('reading and writing app-state.json', () => {
  function windowState(overrides: Partial<IWindowState> = {}): IWindowState {
    return {
      x: 0,
      y: 0,
      width: 1280,
      height: 720,
      maximized: false,
      fullScreen: false,
      ...overrides,
    };
  }

  it('loads and writes window state from a valid app-state file', () => {
    vi.spyOn(Store.prototype as unknown as MockStore, '_getAppStateStoreLocation').mockReturnValue({
      name: 'app-state-valid',
      cwd: FIXTURES_DIR,
    });

    const defaultValidWindowState = {
      x: 10,
      y: 20,
      width: 1280,
      height: 720,
      maximized: false,
      fullScreen: false,
    };

    const store = new Store();

    expect(store.getWindowState('main')).toStrictEqual(defaultValidWindowState);

    {
      const state = windowState({ x: 1, y: 2, width: 800, height: 600 });
      store.setWindowState('main', state);
      store.setWindowState('another', windowState({ x: 1 }));

      const appState = readJson(path.join(FIXTURES_DIR, 'app-state-valid.json'));
      expect(appState?.window).toStrictEqual({
        main: state,
        another: windowState({ x: 1 }),
      });
    }

    {
      store.setWindowState('main', defaultValidWindowState);
      store.setWindowState('another', undefined);

      const appState = readJson(path.join(FIXTURES_DIR, 'app-state-valid.json'));
      expect(appState?.window).toStrictEqual({ main: defaultValidWindowState });
    }
  });

  it('rejects an invalid app-state file', () => {
    vi.spyOn(Store.prototype as unknown as MockStore, '_getAppStateStoreLocation').mockReturnValue({
      name: 'app-state-invalid',
      cwd: FIXTURES_DIR,
    });

    expect(() => new Store()['appStateStore']).toThrow(/Config schema violation/);
  });

  it('returns undefined when no app-state file exists', () => {
    vi.spyOn(Store.prototype as unknown as MockStore, '_getAppStateStoreLocation').mockReturnValue({
      name: 'app-state-empty',
      cwd: FIXTURES_DIR,
    });

    const store = new Store();

    expect(store.getWindowState('main')).toBeUndefined();

    fs.rmSync(path.join(FIXTURES_DIR, 'app-state-empty.json'), { force: true });
  });
});
