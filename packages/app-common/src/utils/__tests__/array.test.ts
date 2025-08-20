import { describe, expect, it } from '@jest/globals';

import { ArrayUtil } from '../array.js';

describe(`Test static method \`${ArrayUtil.name}.${ArrayUtil.filterFalsy.name}\``, () => {
    it('should filter falsy values', () => {
        expect(ArrayUtil.filterFalsy([])).toStrictEqual([]);
        expect(ArrayUtil.filterFalsy([undefined])).toStrictEqual([]);
        expect(ArrayUtil.filterFalsy([null])).toStrictEqual([]);
        expect(ArrayUtil.filterFalsy([false])).toStrictEqual([]);
        expect(ArrayUtil.filterFalsy([{ a: 'asdf' }, { b: 'qwer' }, {}, undefined, null, false])).toStrictEqual([
            { a: 'asdf' },
            { b: 'qwer' },
            {},
        ]);
    });
});
