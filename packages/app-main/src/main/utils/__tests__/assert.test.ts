import { AssertionError } from 'node:assert';

import { assertIsNever } from '../assert';

describe(`Test fn \`${assertIsNever.name}\``, () => {
    it('should throw an error', () => {
        expect(() => assertIsNever('hello world' as never)).toThrow(AssertionError);
        expect(() => assertIsNever('hello world' as never)).toThrowErrorMatchingSnapshot();
    });
});
