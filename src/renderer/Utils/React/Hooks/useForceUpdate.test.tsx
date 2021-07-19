import { render } from '@testing-library/react';
import { useEffect } from 'react';

import { validateHookValueNotChanged } from './testUtils';
import { useForceUpdate } from './useForceUpdate';

describe('Test react hook `useForceUpdate`', () => {
    test('updates component when called', async () => {
        let renderCount = 0;
        function TestComponent() {
            const forceUpdate = useForceUpdate();
            useEffect(forceUpdate, [forceUpdate]);

            renderCount++;
            return <>Test-Component</>;
        }

        render(<TestComponent />);
        expect(renderCount).toBe(2);
    });

    validateHookValueNotChanged('returns the same callback each time', () => [useForceUpdate()]);
});
