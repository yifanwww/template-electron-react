import { LocalStorage } from './localStorage';

beforeAll(() => {
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

afterEach(() => window.localStorage.clear());

afterAll(() => jest.restoreAllMocks());

describe('Test `LocalStorage`', () => {
    test('no methods', () => {
        expect(Reflect.ownKeys(LocalStorage).length).toBe(3);
        expect(Reflect.ownKeys(new LocalStorage())).toStrictEqual([]);
    });
});
