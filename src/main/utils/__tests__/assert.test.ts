import { AssertionError } from 'node:assert';
import { describe, expect, it } from '@jest/globals';
import { assertIsNever } from '../assert';

function getThrowedError(fn: () => void) {
    let err: AssertionError;
    try {
        fn();
    } catch (error) {
        err = error as AssertionError;
    }
    expect(err!).toBeDefined();
    return err!;
}

describe(`Test fn \`${assertIsNever.name}\``, () => {
    it('should throw an error', () => {
        expect(() => assertIsNever('hello world' as never)).toThrow(
            new AssertionError({ message: '"hello world" should be `never` type' }),
        );
        expect(getThrowedError(() => assertIsNever('hello world' as never)).actual).toBe('hello world');
    });
});
