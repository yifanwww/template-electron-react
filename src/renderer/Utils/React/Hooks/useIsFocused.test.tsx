import { fireEvent, render } from '@testing-library/react';
import { useRef } from 'react';

import { useIsFocused } from './useIsFocused';

describe('Test react hook `useIsFocused`', () => {
    test('test is focused when focus event appears', async () => {
        let isFocused: boolean | undefined;
        function TestComponent() {
            const ref = useRef<HTMLDivElement>(null);
            isFocused = useIsFocused(ref);
            return (
                <div tabIndex={0} ref={ref}>
                    Test-Component
                </div>
            );
        }

        expect(isFocused).toBeUndefined();
        const { getByText } = render(<TestComponent />);
        expect(isFocused).toBeFalsy();

        const component = getByText('Test-Component');

        fireEvent.focus(component);
        expect(isFocused).toBeTruthy();

        fireEvent.focusOut(component);
        expect(isFocused).toBeFalsy();

        fireEvent.focusIn(component);
        expect(isFocused).toBeTruthy();
    });

    test('test if not enabled', async () => {
        let isFocused: boolean | undefined;
        function TestComponent() {
            const ref = useRef<HTMLDivElement>(null);
            isFocused = useIsFocused(ref, false);
            return (
                <div tabIndex={0} ref={ref}>
                    Test-Component
                </div>
            );
        }

        expect(isFocused).toBeUndefined();
        const { getByText } = render(<TestComponent />);
        expect(isFocused).toBeFalsy();

        const component = getByText('Test-Component');

        fireEvent.focus(component);
        expect(isFocused).toBeFalsy();

        fireEvent.focusOut(component);
        expect(isFocused).toBeFalsy();

        fireEvent.focusIn(component);
        expect(isFocused).toBeFalsy();
    });
});