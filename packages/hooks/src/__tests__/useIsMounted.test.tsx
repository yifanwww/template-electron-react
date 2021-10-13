import { render } from '@testing-library/react';

import { useIsMounted } from '../useIsMounted';

describe(`Test react hook \`${useIsMounted.name}\``, () => {
    test('test is mounted after mounting and unmounting', () => {
        let isMounted: Optional<React.MutableRefObject<boolean>> = null;
        function TestComponent() {
            isMounted = useIsMounted();
            return <div />;
        }

        expect(isMounted).toBeNull();
        const { unmount } = render(<TestComponent />);
        expect(isMounted!.current).toBeTruthy();

        unmount();
        expect(isMounted!.current).toBeFalsy();
    });
});
