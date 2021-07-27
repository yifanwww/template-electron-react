import { render } from '@testing-library/react';
import { useEffect, useRef } from 'react';

import { useImmediateFocus } from './useImmediateFocus';

describe('Test react hook `useImmediateFocus`', () => {
    test('test is immediately focused', async () => {
        let isFocused: boolean = false;

        function TestComponent() {
            const ref = useRef<HTMLDivElement>(null);

            // eslint-disable-next-line no-return-assign
            useEffect(() => ref.current!.addEventListener('focusin', () => (isFocused = true)), []);

            useImmediateFocus(ref);

            return (
                <div tabIndex={0} ref={ref}>
                    Test-Component
                </div>
            );
        }

        expect(isFocused).toBeFalsy();
        render(<TestComponent />);
        expect(isFocused).toBeTruthy();
    });

    test('test but not enabled', async () => {
        let isFocused: boolean = false;

        function TestComponent() {
            const ref = useRef<HTMLDivElement>(null);

            // eslint-disable-next-line no-return-assign
            useEffect(() => ref.current!.addEventListener('focusin', () => (isFocused = true)), []);

            useImmediateFocus(ref, false);

            return (
                <div tabIndex={0} ref={ref}>
                    Test-Component
                </div>
            );
        }

        expect(isFocused).toBeFalsy();
        render(<TestComponent />);
        expect(isFocused).toBeFalsy();
    });
});