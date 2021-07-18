import { StyleUtils } from './StyleUtils';

describe('Test `Styleutils`', () => {
    test("test method 'genMargin'", () => {
        expect(StyleUtils.genMargin({ margin: 1 })).toStrictEqual({ top: 1, right: 1, bottom: 1, left: 1 });
        expect(StyleUtils.genMargin({ horizontal: 1, vertical: 2 })).toStrictEqual({
            top: 2,
            right: 1,
            bottom: 2,
            left: 1,
        });
        expect(StyleUtils.genMargin({ top: 1, right: 2, bottom: 3, left: 4 })).toStrictEqual({
            top: 1,
            right: 2,
            bottom: 3,
            left: 4,
        });
    });

    test("test method 'genMarginStr'", () => {
        expect(StyleUtils.genMarginStr({ margin: 2 })).toBe('2px 2px 2px 2px');
        expect(StyleUtils.genMarginStr({ horizontal: 2, vertical: 3 })).toBe('3px 2px 3px 2px');
        expect(StyleUtils.genMarginStr({ top: 1, right: 2, bottom: 4, left: 8 })).toBe('1px 2px 4px 8px');
    });

    test("test method 'mergeToGridTemplate'", () =>
        expect(StyleUtils.mergeToGridTemplate([1, 2, 4, '3px'])).toBe('1px 2px 4px 3px'));
});
