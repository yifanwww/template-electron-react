import { ArrayUtil } from '../array';

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

describe(`Test static method \`${ArrayUtil.name}.${ArrayUtil.includes.name}\``, () => {
    it('should check if array includes search element', () => {
        const spy = jest.spyOn(Array.prototype, 'includes');

        expect(spy).toHaveBeenCalledTimes(0);

        expect(ArrayUtil.includes([], undefined)).toBe(false);
        expect(ArrayUtil.includes([], null)).toBe(false);
        expect(ArrayUtil.includes([undefined, null], undefined)).toBe(true);
        expect(ArrayUtil.includes([undefined, null], null)).toBe(true);

        expect(spy).toHaveBeenCalledTimes(4);
    });
});
