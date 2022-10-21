import { ColorTransformer } from './colorTransformer';

describe('Test class `ColorTransformer`', () => {
    type StaticMethods = ClassStaticMethods<typeof ColorTransformer>;

    function _it(methodName: StaticMethods): void {
        it(`tests method '${methodName}'`, () => {
            if (methodName === 'translucent') {
                expect(ColorTransformer[methodName]('#123456', '78')).toBe('#12345678');
            } else {
                expect(ColorTransformer[methodName]('#123456')).toBe(`#123456${methodName.slice(-2).toLowerCase()}`);
            }
        });
    }

    Reflect.ownKeys(ColorTransformer)
        .filter((method): method is StaticMethods => typeof method === 'string' && method.startsWith('translucent'))
        .forEach(_it);
});