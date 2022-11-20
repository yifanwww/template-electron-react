import { fireEvent, render } from '@testing-library/react';
import { useRef } from 'react';

import { useIsFocused } from '../useIsFocused';

describe(`Test react hook \`${useIsFocused.name}\``, () => {
    it('should return whether the component is focused', () => {
        let isFocused: Optional<boolean> = null;
        function TestComponent() {
            const ref = useRef<HTMLDivElement>(null);
            isFocused = useIsFocused(ref);
            return <div ref={ref}>Test-Component</div>;
        }

        expect(isFocused).toBeNull();
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

    it('should not work if disabled', () => {
        let isFocused: Optional<boolean> = null;
        function TestComponent() {
            const ref = useRef<HTMLDivElement>(null);
            isFocused = useIsFocused(ref, false);
            return <div ref={ref}>Test-Component</div>;
        }

        expect(isFocused).toBeNull();
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
