import { validateHookValueNotChanged } from '@tecra/utils-test';
import { render } from '@testing-library/react';
import { createRef, forwardRef, useImperativeHandle } from 'react';

import { useSingleInterval } from '../useSingleInterval';

const time = 10;

describe(`Test react hook \`${useSingleInterval.name}\``, () => {
    validateHookValueNotChanged('returns the same callbacks each time', () => {
        const { setInterval, clearInterval } = useSingleInterval();
        return [setInterval, clearInterval];
    });

    // Initialization
    let timesCalled = 0;

    beforeAll(() => {
        jest.useFakeTimers();
    });

    afterAll(() => {
        jest.useRealTimers();
    });

    afterEach(() => {
        timesCalled = 0;
    });

    const TestComponent = forwardRef((props: unknown, ref: React.Ref<{ clearInterval: () => void }>) => {
        const { setInterval, clearInterval } = useSingleInterval();

        useImperativeHandle(ref, () => ({ clearInterval }), [clearInterval]);

        setInterval(() => {
            timesCalled++;
        }, time);

        return <div />;
    });

    test('updates value when mounted', () => {
        render(<TestComponent />);
        expect(timesCalled).toStrictEqual(0);

        jest.advanceTimersByTime(time);
        expect(timesCalled).toStrictEqual(1);

        jest.advanceTimersByTime(time);
        expect(timesCalled).toStrictEqual(2);
    });

    test('does not execute the interval when unmounted', () => {
        const { unmount } = render(<TestComponent />);
        expect(timesCalled).toStrictEqual(0);

        unmount();

        jest.runOnlyPendingTimers();
        expect(timesCalled).toStrictEqual(0);
    });

    test('can cancel intervals', () => {
        const ref = createRef<{ clearInterval: () => void }>();
        render(<TestComponent ref={ref} />);

        jest.advanceTimersByTime(time);
        expect(timesCalled).toStrictEqual(1);

        ref.current!.clearInterval();

        jest.runOnlyPendingTimers();
        expect(timesCalled).toStrictEqual(1);
    });
});
