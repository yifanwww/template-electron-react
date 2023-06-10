import { render } from '@testing-library/react';
import { useEffect, useRef } from 'react';

import { useImmediateFocus } from '../useImmediateFocus';

describe(`Test react hook \`${useImmediateFocus.name}\``, () => {
    it('should immediately focus the component', () => {
        let isFocused: boolean = false;

        function TestComponent() {
            const ref = useRef<HTMLDivElement>(null);

            useEffect(() => {
                ref.current!.addEventListener('focusin', () => {
                    isFocused = true;
                });
            }, []);

            useImmediateFocus(ref);

            // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
            return <div tabIndex={0} ref={ref} />;
        }

        expect(isFocused).toBeFalsy();
        render(<TestComponent />);
        expect(isFocused).toBeTruthy();
    });

    it('should not focus the component if `focus` is `false`', () => {
        let isFocused: boolean = false;

        function TestComponent() {
            const ref = useRef<HTMLDivElement>(null);

            useEffect(() => {
                ref.current!.addEventListener('focusin', () => {
                    isFocused = true;
                });
            }, []);

            useImmediateFocus(ref, false);

            // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
            return <div tabIndex={0} ref={ref} />;
        }

        expect(isFocused).toBeFalsy();
        render(<TestComponent />);
        expect(isFocused).toBeFalsy();
    });
});
