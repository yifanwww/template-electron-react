import { AssertionError } from 'node:assert';

/**
 * The function for asserting whether a value's type is `never`.
 */
export function assertIsNever(value: never): never {
    throw new AssertionError({ message: `"${String(value)}" should be "never" type.` });
}
