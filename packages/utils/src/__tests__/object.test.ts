import { ObjectUtil } from '../object';

describe(`Test static method ${ObjectUtil.name}.${ObjectUtil.reverseKeyValue.name}`, () => {
    it('should reverse an empty object', () => {
        expect(ObjectUtil.reverseKeyValue({})).toStrictEqual({});
    });

    it('should reverse Record<string, string>', () => {
        expect(ObjectUtil.reverseKeyValue({ a: 'a', b: 'c', c: 'd', d: 'asdf' })).toStrictEqual({
            a: 'a',
            c: 'b',
            d: 'c',
            asdf: 'd',
        });

        expect(ObjectUtil.reverseKeyValue({ a: 'asdf', b: 'qwer', c: 'asdf', d: 'qwer' })).toStrictEqual({
            asdf: 'c',
            qwer: 'd',
        });
    });

    it('should be able to reverse any plain objects but not recommend', () => {
        expect(ObjectUtil.reverseKeyValue({ a: undefined, b: null, c: 0, d: true, e: false })).toStrictEqual({
            undefined: 'a',
            null: 'b',
            0: 'c',
            true: 'd',
            false: 'e',
        });

        expect(ObjectUtil.reverseKeyValue(['asdf', true, false, undefined, null, 6, 5])).toStrictEqual({
            asdf: '0',
            true: '1',
            false: '2',
            undefined: '3',
            null: '4',
            5: '6',
            6: '5',
        });
    });

    it('should do nothing to empty enums', () => {
        enum Enum {}
        expect(ObjectUtil.reverseKeyValue(Enum)).toStrictEqual({});
    });

    it('should reverse string enums', () => {
        enum Enum1 {
            A = 'a',
            B = 'b',
            C = 'c',
        }
        expect(ObjectUtil.reverseKeyValue(Enum1)).toStrictEqual({ a: 'A', b: 'B', c: 'C' });

        enum Enum2 {
            A = 'asdf',
            B = 'asdf',
            C = 'asdf',
        }
        expect(ObjectUtil.reverseKeyValue(Enum2)).toStrictEqual({ asdf: 'C' });
    });

    it('should reverse number enums', () => {
        enum Enum1 {
            A,
            B,
            C,
        }
        expect(ObjectUtil.reverseKeyValue(Enum1)).toStrictEqual({
            A: '0',
            B: '1',
            C: '2',
            0: 'A',
            1: 'B',
            2: 'C',
        });

        enum Enum2 {
            A = 1,
            B = 1,
            C = 2,
            D = 300,
        }
        expect(ObjectUtil.reverseKeyValue(Enum2)).toStrictEqual({
            B: '1',
            C: '2',
            D: '300',
            1: 'B',
            2: 'C',
            300: 'D',
        });
    });
});
