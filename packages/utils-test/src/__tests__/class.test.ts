import { createClassJestHelper } from '../class';

describe(`Test fn \`${createClassJestHelper.name}\``, () => {
    class Example {
        static staticFoo() {}
        static staticBar() {}
        foo() {}
        bar() {}
    }

    it('should build full name of a method', () => {
        const { buildMethodName } = createClassJestHelper(Example);

        expect(buildMethodName('bar')).toBe('Example.prototype.bar');
        expect(buildMethodName('foo')).toBe('Example.prototype.foo');
    });

    it('should build full name of a static method', () => {
        const { buildStaticMethodName } = createClassJestHelper(Example);

        expect(buildStaticMethodName('staticBar')).toBe('Example.staticBar');
        expect(buildStaticMethodName('staticFoo')).toBe('Example.staticFoo');
    });
});
