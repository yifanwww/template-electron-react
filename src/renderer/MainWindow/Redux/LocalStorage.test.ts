import { LocalStorage } from './LocalStorage';

beforeEach(() => {
    let store: Record<string, string> = {};

    // eslint-disable-next-line @typescript-eslint/naming-convention
    const storage_prototype = Object.getPrototypeOf(window.localStorage) as typeof window.localStorage;

    jest.spyOn(storage_prototype, 'getItem').mockImplementation((key: string) => (key in store ? store[key] : null));
    jest.spyOn(storage_prototype, 'setItem').mockImplementation((key, value) => {
        store[key] = value;
    });
    jest.spyOn(storage_prototype, 'clear').mockImplementation(() => {
        store = {};
    });
});

afterAll(() => jest.restoreAllMocks());

describe('Test `LocalStorage`', () => {
    test('no methods', () => {
        expect(Reflect.ownKeys(LocalStorage).length).toBe(3);
        expect(Reflect.ownKeys(new LocalStorage())).toStrictEqual([]);
    });
});
