import { StyleUtil } from './styleUtils';

describe(`Test static method \`${StyleUtil.name}.${StyleUtil.genMargin.name}\``, () => {
    it('should generate margin', () => {
        expect(StyleUtil.genMargin({ margin: 1 })).toStrictEqual({ top: 1, right: 1, bottom: 1, left: 1 });
        expect(StyleUtil.genMargin({ horizontal: 1, vertical: 2 })).toStrictEqual({
            top: 2,
            right: 1,
            bottom: 2,
            left: 1,
        });
        expect(StyleUtil.genMargin({ top: 1, right: 2, bottom: 3, left: 4 })).toStrictEqual({
            top: 1,
            right: 2,
            bottom: 3,
            left: 4,
        });
    });
});

describe(`Test static method \`${StyleUtil.name}.${StyleUtil.genMarginStr.name}\``, () => {
    it('should generate margin string', () => {
        expect(StyleUtil.genMarginStr({ margin: 2 })).toBe('2px 2px 2px 2px');
        expect(StyleUtil.genMarginStr({ horizontal: 2, vertical: 3 })).toBe('3px 2px 3px 2px');
        expect(StyleUtil.genMarginStr({ top: 1, right: 2, bottom: 4, left: 8 })).toBe('1px 2px 4px 8px');
    });
});

describe(`Test static method \`${StyleUtil.name}.${StyleUtil.mergeToGridTemplate.name}\``, () => {
    it('should convert input to grid template', () => {
        expect(StyleUtil.mergeToGridTemplate([1, 2, 4, '3px'])).toBe('1px 2px 4px 3px');
    });
});
