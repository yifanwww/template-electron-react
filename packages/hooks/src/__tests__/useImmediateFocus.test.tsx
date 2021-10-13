import { render } from '@testing-library/react';
import { useEffect, useRef } from 'react';

import { useImmediateFocus } from '../useImmediateFocus';

describe(`Test react hook \`${useImmediateFocus.name}\``, () => {
    test('test is immediately focused', () => {
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

    test('test but not enabled', () => {
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
