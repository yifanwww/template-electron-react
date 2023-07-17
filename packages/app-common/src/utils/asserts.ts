/**
 * @param value The input that is checked for being truthy.
 */
export function assert(value: unknown): asserts value {
    if (!value) {
        throw new Error('Assertion Error');
    }
}

/**
 * The function for asserting whether a value's type is `never` at compile time.
 */
export function assertIsNever(value: never): never {
    throw new Error(`Assertion Error: ${String(value)} should be "never" type.`);
}
