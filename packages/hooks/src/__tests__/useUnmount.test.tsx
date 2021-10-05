import { render } from '@testing-library/react';

import { useUnmount } from '../useUnmount';

describe('Test react hook `useUnmount`', () => {
    test('fires a callback', () => {
        const onUnmount = jest.fn();

        function TestComponent() {
            useUnmount(() => onUnmount());

            return <>Test-Component</>;
        }

        expect(onUnmount).toBeCalledTimes(0);
        const { unmount } = render(<TestComponent />);
        expect(onUnmount).toBeCalledTimes(0);
        unmount();
        expect(onUnmount).toBeCalledTimes(1);
    });
});
