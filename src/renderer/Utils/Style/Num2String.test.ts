import { num2pt, num2px, percent2string } from './Num2String';

describe('Test `Num2String` functions', () => {
    test("test function 'num2pt'", () => expect(num2pt(123)).toBe('123pt'));
    test("test function 'num2px'", () => expect(num2px(123)).toBe('123px'));
    test("test function 'percent2string'", () => expect(percent2string(123)).toBe('123%'));
});
