import { SessionStorage } from './sessionStorage';

beforeAll(() => {
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

afterEach(() => window.sessionStorage.clear());

afterAll(() => jest.restoreAllMocks());

describe('Test `SessionStorage`', () => {
    test('no methods', () => {
        expect(Reflect.ownKeys(SessionStorage)).toStrictEqual(['length', 'prototype', 'name']);
        expect(Reflect.ownKeys(new SessionStorage())).toStrictEqual([]);
    });
});
