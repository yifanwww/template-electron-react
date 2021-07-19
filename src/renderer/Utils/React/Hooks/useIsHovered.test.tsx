import { fireEvent, render } from '@testing-library/react';
import { useRef } from 'react';

import { useIsHovered } from './useIsHovered';

describe('Test react hook `useIsHovered`', () => {
    test('test is hovered when hover event appears', async () => {
        let isHovered: boolean | undefined;
        function TestComponent() {
            const ref = useRef<HTMLDivElement>(null);
            isHovered = useIsHovered(ref);
            return <div ref={ref}>Test Component</div>;
        }

        expect(isHovered).toBeUndefined();
        const { getByText } = render(<TestComponent />);
        expect(isHovered).toBeFalsy();

        const component = getByText('Test Component');

        fireEvent.mouseOver(component);
        expect(isHovered).toBeTruthy();

        fireEvent.mouseOut(component);
        expect(isHovered).toBeFalsy();

        fireEvent.mouseEnter(component);
        expect(isHovered).toBeTruthy();
    });

    test('test if not enabled', async () => {
        let isFocused: boolean | undefined;
        function TestComponent() {
            const ref = useRef<HTMLDivElement>(null);
            isFocused = useIsHovered(ref, false);
            return <div ref={ref}>Test Component</div>;
        }

        expect(isFocused).toBeUndefined();
        const { getByText } = render(<TestComponent />);
        expect(isFocused).toBeFalsy();

        const component = getByText('Test Component');

        fireEvent.mouseOver(component);
        expect(isFocused).toBeFalsy();

        fireEvent.mouseOut(component);
        expect(isFocused).toBeFalsy();

        fireEvent.mouseEnter(component);
        expect(isFocused).toBeFalsy();
    });
});
