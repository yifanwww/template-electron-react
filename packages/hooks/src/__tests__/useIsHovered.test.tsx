import { fireEvent, render } from '@testing-library/react';
import { useRef } from 'react';

import { useIsHovered } from '../useIsHovered';

describe(`Test react hook \`${useIsHovered.name}\``, () => {
    test('test is hovered when hover event appears', () => {
        let isHovered: Optional<boolean> = null;
        function TestComponent() {
            const ref = useRef<HTMLDivElement>(null);
            isHovered = useIsHovered(ref);
            return <div ref={ref}>Test-Component</div>;
        }

        expect(isHovered).toBeNull();
        const { getByText } = render(<TestComponent />);
        expect(isHovered).toBeFalsy();

        const component = getByText('Test-Component');

        fireEvent.mouseOver(component);
        expect(isHovered).toBeTruthy();

        fireEvent.mouseOut(component);
        expect(isHovered).toBeFalsy();

        fireEvent.mouseEnter(component);
        expect(isHovered).toBeTruthy();
    });

    test('test if not enabled', () => {
        let isFocused: Optional<boolean> = null;
        function TestComponent() {
            const ref = useRef<HTMLDivElement>(null);
            isFocused = useIsHovered(ref, false);
            return <div ref={ref}>Test-Component</div>;
        }

        expect(isFocused).toBeNull();
        const { getByText } = render(<TestComponent />);
        expect(isFocused).toBeFalsy();

        const component = getByText('Test-Component');

        fireEvent.mouseOver(component);
        expect(isFocused).toBeFalsy();

        fireEvent.mouseOut(component);
        expect(isFocused).toBeFalsy();

        fireEvent.mouseEnter(component);
        expect(isFocused).toBeFalsy();
    });
});
