import { render } from '@testing-library/react';
import { useEffect } from 'react';

import { useForceUpdate } from '../useForceUpdate';

describe(`Test react hook \`${useForceUpdate.name}\``, () => {
    validateHookValueNotChanged('returns the same callback each time', () => [useForceUpdate()]);

    test('updates component when called', () => {
        let renderCount = 0;
        function TestComponent() {
            const forceUpdate = useForceUpdate();
            useEffect(forceUpdate, [forceUpdate]);
            renderCount++;
            return <div />;
        }

        render(<TestComponent />);
        expect(renderCount).toBe(2);
    });
});
