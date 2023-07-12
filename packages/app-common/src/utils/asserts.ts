/**
 * @param value The input that is checked for being truthy.
 */
export function assert(value: unknown): asserts value {
    if (!value) {
        throw new Error('Assertion Error');
    }
}

export function assertIsString(value: unknown, varName: string): asserts value is string {
    if (typeof value !== 'string') {
        throw new Error(`Assertion Error: ${varName} should be string`);
    }
}

export function assertIsNumber(value: unknown, varName: string): asserts value is number {
    if (typeof value !== 'number') {
        throw new Error(`Assertion Error: ${varName} should be number`);
    }
}

export function assertIsBoolean(value: unknown, varName: string): asserts value is boolean {
    if (typeof value !== 'boolean') {
        throw new Error(`Assertion Error: ${varName} should be boolean`);
    }
}
