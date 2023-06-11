import type { ClassStaticMethods } from '@tecra-pkg/utils-type';

import { ColorTransformer } from '../colorTransformer';

function testColorTransformer() {
    const $class = ColorTransformer;

    const testStaticMethod = (method: ClassStaticMethods<typeof $class>) => {
        describe(`Test static method \`${$class.name}.${$class[method].name}\``, () => {
            it('should convert color to translucent color', () => {
                if (method === 'translucent') {
                    expect($class[method]('#123456', '78')).toBe('#12345678');
                } else {
                    expect($class[method]('#123456')).toBe(`#123456${method.slice(-2).toLowerCase()}`);
                }
            });
        });
    };

    testStaticMethod('translucent');
    testStaticMethod('translucent00');
    testStaticMethod('translucent10');
    testStaticMethod('translucent20');
    testStaticMethod('translucent30');
    testStaticMethod('translucent40');
    testStaticMethod('translucent50');
    testStaticMethod('translucent60');
    testStaticMethod('translucent70');
    testStaticMethod('translucent80');
    testStaticMethod('translucent90');
    testStaticMethod('translucentA0');
    testStaticMethod('translucentB0');
    testStaticMethod('translucentC0');
    testStaticMethod('translucentD0');
    testStaticMethod('translucentE0');
    testStaticMethod('translucentF0');
}

testColorTransformer();
