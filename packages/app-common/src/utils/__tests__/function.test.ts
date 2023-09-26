import { makeFn } from '../function.js';

describe(`Test fn \`${makeFn.name}\``, () => {
    it('should return the fn that it receives', () => {
        const fn = () => {};
        expect(makeFn(fn)).toBe(fn);
    });
});
