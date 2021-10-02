import { SessionStorage } from './sessionStorage';

// Mocks will be restored before every test because option `resetMocks` is turned on in `jest.config.ts`.
beforeEach(() => {
    let store: Record<string, string> = {};

    const storagePrototype = Reflect.getPrototypeOf(window.sessionStorage) as typeof window.sessionStorage;

    jest.spyOn(storagePrototype, 'getItem').mockImplementation((key) => (key in store ? store[key] : null));
    jest.spyOn(storagePrototype, 'setItem').mockImplementation((key, value) => {
        store[key] = value;
    });
    jest.spyOn(storagePrototype, 'clear').mockImplementation(() => {
        store = {};
    });
});

describe('Test `SessionStorage`', () => {
    test('no methods', () => {
        expect(Reflect.ownKeys(SessionStorage).length).toBe(3);
        expect(Reflect.ownKeys(new SessionStorage())).toStrictEqual([]);
    });
});
