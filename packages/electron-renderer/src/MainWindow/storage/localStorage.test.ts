import { LocalStorage } from './localStorage';

// Mocks will be restored before every test because option `resetMocks` is turned on in `jest.config.ts`.
beforeEach(() => {
    let store: Record<string, string> = {};

    const storagePrototype = Reflect.getPrototypeOf(window.localStorage) as typeof window.localStorage;

    jest.spyOn(storagePrototype, 'getItem').mockImplementation((key) => (key in store ? store[key] : null));
    jest.spyOn(storagePrototype, 'setItem').mockImplementation((key, value) => {
        store[key] = value;
    });
    jest.spyOn(storagePrototype, 'clear').mockImplementation(() => {
        store = {};
    });
});

describe('Test `LocalStorage`', () => {
    test('no methods', () => {
        expect(Reflect.ownKeys(LocalStorage).length).toBe(3);
        expect(Reflect.ownKeys(new LocalStorage())).toStrictEqual([]);
    });
});
