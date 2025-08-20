import { describe, expect, it } from '@jest/globals';

import { AssertionError, assert, assertIsNever } from '../assert';

describe(`Test fn \`${assert.name}\``, () => {
    it('should assert an expression', () => {
        const str = 'hello world';

        expect(() => assert(typeof str === 'string')).not.toThrow();
        expect(() => assert(typeof str === 'number')).toThrow(AssertionError);
        expect(() => assert(typeof str === 'number')).toThrowErrorMatchingSnapshot();
    });
});

describe(`Test fn \`${assertIsNever.name}\``, () => {
    it('should throw an error', () => {
        expect(() => assertIsNever('hello world' as never)).toThrow(AssertionError);
        expect(() => assertIsNever('hello world' as never)).toThrowErrorMatchingSnapshot();
    });
});
