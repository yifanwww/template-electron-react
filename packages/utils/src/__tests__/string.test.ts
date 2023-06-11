import { StringUtil } from '../string';

describe(`Test static method ${StringUtil.name}.${StringUtil.isNilOrEmpty.name}`, () => {
    it('should return true when checks null or undefined', () => {
        expect(StringUtil.isNilOrEmpty(null)).toBeTruthy();
        expect(StringUtil.isNilOrEmpty(undefined)).toBeTruthy();
    });

    it('should return true when checks an empty string', () => {
        expect(StringUtil.isNilOrEmpty('')).toBeTruthy();
    });

    it('should return false when checks a string which is not empty', () => {
        expect(StringUtil.isNilOrEmpty('a')).toBeFalsy();
        expect(StringUtil.isNilOrEmpty('abcd')).toBeFalsy();
    });
});
