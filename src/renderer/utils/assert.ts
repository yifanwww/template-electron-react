/**
 * The function for asserting whether a value's type is `never`.
 */
export function assertIsNever(value: never): never {
    throw new Error(`The value should be \`never\`, but received "${String(value)}"`);
}

/**
 * The function for asserting whether a value is defined (!== `undefined` && !== `null`).
 */
export function assertIsDefined<T>(value: T, varName = 'value'): asserts value is NonNullable<T> {
    if (value === undefined || value === null) {
        throw new Error(`Expected \`${varName}\` to be defined, but received \`${value as null | undefined}\``);
    }
}
