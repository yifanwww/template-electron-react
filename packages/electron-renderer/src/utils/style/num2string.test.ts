import { num2pt, num2px, percent2string } from './num2string';

it("tests function 'num2pt'", () => expect(num2pt(123)).toBe('123pt'));
it("tests function 'num2px'", () => expect(num2px(123)).toBe('123px'));
it("tests function 'percent2string'", () => expect(percent2string(123)).toBe('123%'));
