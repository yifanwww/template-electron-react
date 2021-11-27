import { validateHookValueNotChanged } from '@tecra/utils-test';
import { act, render } from '@testing-library/react';
import React, { useEffect, useState } from 'react';

import { useConstFn } from '../useConstFn';
import { useCountdown } from '../useCountdown';

describe(`Test react hook \`${useCountdown.name}\``, () => {
    validateHookValueNotChanged('returns the same function', () => [useCountdown()[1]]);

    let dateTime = 0;
    let intervalId: number;

    beforeAll(() => {
        jest.useFakeTimers();

        intervalId = window.setInterval(() => {
            dateTime++;
        }, 1);
    });

    afterAll(() => {
        jest.useRealTimers();

        clearInterval(intervalId);
    });

    beforeEach(() => {
        jest.spyOn(Date, 'now').mockImplementation(() => dateTime);
    });

    afterEach(() => {
        dateTime = 0;
    });

    function spyOnUseState() {
        const _useState = (initialState: unknown) => {
            const [state, setState] = useState(initialState);
            return [state, useConstFn((_) => act(() => setState(_)))];
        };

        jest.spyOn(React, 'useState').mockImplementation(_useState as never);
    }

    it('rerenders while counting down', () => {
        spyOnUseState();

        let renderCount = 0;

        function TestComponent() {
            const [, setCountdown] = useCountdown();
            useEffect(() => setCountdown(5), [setCountdown]);
            renderCount++;
            return <div />;
        }

        expect(renderCount).toBe(0);
        render(<TestComponent />);
        expect(renderCount).toBe(2);

        jest.advanceTimersByTime(1000);
        expect(renderCount).toBe(3);
        jest.advanceTimersByTime(1000);
        expect(renderCount).toBe(4);
        jest.advanceTimersByTime(1000);
        expect(renderCount).toBe(5);
        jest.advanceTimersByTime(1000);
        expect(renderCount).toBe(6);
        jest.advanceTimersByTime(1000);
        expect(renderCount).toBe(7);
        jest.advanceTimersByTime(1000);
        expect(renderCount).toBe(7);
    });

    it('does not rerender after unmount', () => {
        spyOnUseState();

        let renderCount = 0;

        function TestComponent() {
            const [, setCountdown] = useCountdown();
            useEffect(() => setCountdown(5_000), [setCountdown]);
            renderCount++;
            return <div />;
        }

        expect(renderCount).toBe(0);
        const { unmount } = render(<TestComponent />);
        expect(renderCount).toBe(2);

        jest.advanceTimersByTime(1000);
        expect(renderCount).toBe(3);
        jest.advanceTimersByTime(1000);
        expect(renderCount).toBe(4);
        jest.advanceTimersByTime(1000);
        expect(renderCount).toBe(5);

        unmount();

        jest.advanceTimersByTime(1000);
        expect(renderCount).toBe(5);
        jest.advanceTimersByTime(1000);
        expect(renderCount).toBe(5);
    });
});
