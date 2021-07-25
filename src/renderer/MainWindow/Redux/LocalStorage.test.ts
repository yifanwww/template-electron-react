import { LocalStorage } from './LocalStorage';

beforeEach(() => {
    let store: Record<string, string> = {};

    jest.spyOn(Object.getPrototypeOf(window.localStorage) as typeof window.localStorage, 'getItem').mockImplementation(
        (key: string) => (key in store ? store[key] : null),
    );
    jest.spyOn(Object.getPrototypeOf(window.localStorage) as typeof window.localStorage, 'setItem').mockImplementation(
        (key, value) => {
            store[key] = value;
        },
    );
    jest.spyOn(Object.getPrototypeOf(window.localStorage) as typeof window.localStorage, 'clear').mockImplementation(
        () => {
            store = {};
        },
    );
});

afterAll(() => jest.restoreAllMocks());

describe('Test `LocalStorage`', () => {
    test('no methods', () => {
        expect(Reflect.ownKeys(LocalStorage)).toStrictEqual(['length', 'prototype', 'name']);
        expect(Reflect.ownKeys(new LocalStorage())).toStrictEqual([]);
    });
});
