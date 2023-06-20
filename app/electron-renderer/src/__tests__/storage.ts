/**
 * Mock implementation of local storage.
 */
export function mockLocalStorage(): void {
    // Mocks will be restored before every test because Jest option `resetMocks` is turned on.
    beforeEach(() => {
        let store: Record<string, string> = {};

        const prototype = Reflect.getPrototypeOf(window.localStorage) as typeof window.localStorage;

        jest.spyOn(prototype, 'getItem').mockImplementation((key) => (key in store ? store[key] : null));
        jest.spyOn(prototype, 'setItem').mockImplementation((key, value) => {
            store[key] = value;
        });
        jest.spyOn(prototype, 'clear').mockImplementation(() => {
            store = {};
        });
    });
}

/**
 * Mock implementation of session storage.
 */
export function mockSessionStorage(): void {
    // Mocks will be restored before every test because Jest option `resetMocks` is turned on.
    beforeEach(() => {
        let store: Record<string, string> = {};

        const prototype = Reflect.getPrototypeOf(window.sessionStorage) as typeof window.sessionStorage;

        jest.spyOn(prototype, 'getItem').mockImplementation((key) => (key in store ? store[key] : null));
        jest.spyOn(prototype, 'setItem').mockImplementation((key, value) => {
            store[key] = value;
        });
        jest.spyOn(prototype, 'clear').mockImplementation(() => {
            store = {};
        });
    });
}
