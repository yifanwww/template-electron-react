declare function expectSnapshot<T = unknown>(actual: T): void;

declare function expectElementSnapshot(element: React.ReactElement): void;

declare module 'console' {
    global {
        interface Console {
            /**
             * The {@link console.testInfo} function is an alias for {@link console.info}, only used during test.
             */
            testInfo(message?: any, ...optionalParams: any[]): void;
            /**
             * The {@link console.testWarn} function is an alias for {@link console.warn}, only used during test.
             */
            testWarn(message?: any, ...optionalParams: any[]): void;
            /**
             * The {@link console.testError} function is an alias for {@link console.error}, only used during test.
             */
            testError(message?: any, ...optionalParams: any[]): void;
        }
    }
}
