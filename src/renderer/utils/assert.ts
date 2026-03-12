export class AssertionError extends Error {}

/**
 * @param value The input that is checked for being truthy.
 */
export function assert(value: unknown, message?: string): asserts value {
    if (!value) {
        throw new AssertionError(message ?? 'Assertion Error.');
    }
}

/**
 * The function for asserting whether a value's type is `never`.
 */
export function assertIsNever(value: never): never {
    throw new AssertionError(`${String(value)} should be "never" type.`);
}
