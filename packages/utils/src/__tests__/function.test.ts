import { abstractAsyncFn, abstractFn } from '../function';

describe(`Test fn ${abstractFn.name}`, () => {
    it('should throw an error', () => {
        expect(() => abstractFn()).toThrow('Not Implemented');
    });
});

describe(`Test fn ${abstractAsyncFn.name}`, () => {
    it('should throw an error', () => {
        void expect((): Promise<never> => abstractAsyncFn()).rejects.toThrow('Not Implemented');
    });
});
