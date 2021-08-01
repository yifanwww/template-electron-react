import { render } from '@testing-library/react';

import { useMount } from './useMount';

describe('Test react hook `useMount`', () => {
    test('fires a callback', () => {
        const onMount = jest.fn();

        function TestComponent() {
            useMount(() => onMount());

            return <>Test-Component</>;
        }

        expect(onMount).toBeCalledTimes(0);
        const { unmount } = render(<TestComponent />);
        expect(onMount).toBeCalledTimes(1);
        unmount();
        expect(onMount).toBeCalledTimes(1);
    });
});
