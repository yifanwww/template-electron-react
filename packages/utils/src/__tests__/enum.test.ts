import { EnumUtil } from '../enum';
import { ObjectUtil } from '../object';

describe(`Test static method ${EnumUtil.name}.${EnumUtil.is.name}`, () => {
    it('should check if a value is a string enum value', () => {
        enum StrEnum {
            FOO = 'foo',
            BAR = 'bar',
        }

        expect(EnumUtil.is('foo', StrEnum)).toBeTruthy();
        expect(EnumUtil.is('bar', StrEnum)).toBeTruthy();

        expect(EnumUtil.is('FOO', StrEnum)).toBeFalsy();
        expect(EnumUtil.is('BAR', StrEnum)).toBeFalsy();
        expect(EnumUtil.is('hello', StrEnum)).toBeFalsy();
        expect(EnumUtil.is('world', StrEnum)).toBeFalsy();
        expect(EnumUtil.is('', StrEnum)).toBeFalsy();
    });

    it('should check if a value is a number enum value', () => {
        enum NumEnum {
            FOO,
            BAR,
        }

        expect(EnumUtil.is(0, NumEnum)).toBeTruthy();
        expect(EnumUtil.is(1, NumEnum)).toBeTruthy();

        expect(EnumUtil.is('FOO', NumEnum)).toBeFalsy();
        expect(EnumUtil.is('BAR', NumEnum)).toBeFalsy();
        expect(EnumUtil.is(2, NumEnum)).toBeFalsy();
    });
});

describe(`Test static method ${EnumUtil.name}.${EnumUtil.reverseKeyValue.name}`, () => {
    beforeEach(() => {
        jest.spyOn(ObjectUtil, 'reverseKeyValue');
    });

    it(`should call ${ObjectUtil.name}.${ObjectUtil.reverseKeyValue.name}`, () => {
        enum Enum {
            A = 'asdf',
            B = 'asdf',
            C = 'asdf',
        }
        expect(ObjectUtil.reverseKeyValue).toHaveBeenCalledTimes(0);
        EnumUtil.reverseKeyValue(Enum);
        expect(ObjectUtil.reverseKeyValue).toHaveBeenCalledTimes(1);
    });
});
