import { render } from '@testing-library/react';
import { useEffect, useRef } from 'react';

import { useImmediateFocus } from '../useImmediateFocus';

describe(`Test react hook \`${useImmediateFocus.name}\``, () => {
    it('should immediately focus the component', () => {
        let isFocused: boolean = false;

        function TestComponent() {
            const ref = useRef<HTMLDivElement>(null);

            // eslint-disable-next-line no-return-assign
            useEffect(() => ref.current!.addEventListener('focusin', () => (isFocused = true)), []);

            useImmediateFocus(ref);

            return (
                // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
                <div tabIndex={0} ref={ref} />
            );
        }

        expect(isFocused).toBeFalsy();
        render(<TestComponent />);
        expect(isFocused).toBeTruthy();
    });

    it('should not focus the component if `focus` is `false`', () => {
        let isFocused: boolean = false;

        function TestComponent() {
            const ref = useRef<HTMLDivElement>(null);

            // eslint-disable-next-line no-return-assign
            useEffect(() => ref.current!.addEventListener('focusin', () => (isFocused = true)), []);

            useImmediateFocus(ref, false);

            return (
                // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
                <div tabIndex={0} ref={ref} />
            );
        }

        expect(isFocused).toBeFalsy();
        render(<TestComponent />);
        expect(isFocused).toBeFalsy();
    });
});
