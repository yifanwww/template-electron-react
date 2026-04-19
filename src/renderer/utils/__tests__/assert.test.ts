import { describe, expect, it } from '@jest/globals';
import { assertIsDefined, assertIsNever } from '../assert';

describe(`Test fn \`${assertIsNever.name}\``, () => {
    it('should throw an error', () => {
        expect(() => assertIsNever('hello world' as never)).toThrow(
            new Error('The value should be `never`, but received "hello world"'),
        );
    });
});

describe(`Test fn \`${assertIsDefined.name}\``, () => {
    it('should throw an error if assertion failes', () => {
        let variable: unknown;

        variable = null;
        expect(() => assertIsDefined(variable)).toThrow(
            new Error('Expected `value` to be defined, but received `null`'),
        );

        variable = undefined;
        expect(() => assertIsDefined(variable, 'variable')).toThrow(
            new Error('Expected `variable` to be defined, but received `undefined`'),
        );
    });
});
