import { num2pt, num2px, percent2string } from '../num2string';

describe(`Test fn ${num2pt.name}`, () => {
    it('should convert num to pt', () => expect(num2pt(123)).toBe('123pt'));
});

describe(`Test fn ${num2px.name}`, () => {
    it('should convert num to px', () => expect(num2px(123)).toBe('123px'));
});

describe(`Test fn ${percent2string.name}`, () => {
    it('should convert percent num to string', () => expect(percent2string(123)).toBe('123%'));
});
