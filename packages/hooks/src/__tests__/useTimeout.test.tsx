import { validateHookValueNotChanged } from '@tecra/utils-test';
import { render } from '@testing-library/react';
import { createRef, forwardRef, useImperativeHandle, useRef } from 'react';

import { useTimeout } from '../useTimeout';

describe(`Test react hook \`${useTimeout.name}\``, () => {
    validateHookValueNotChanged('returns the same callbacks each time', () => {
        const { setTimeout, clearTimeout } = useTimeout();
        return [setTimeout, clearTimeout];
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

    const TestComponent = forwardRef((props: unknown, ref: React.Ref<{ clearTimeout: () => void }>) => {
        const { setTimeout, clearTimeout } = useTimeout();
        const { current: state } = useRef<{ id: number }>({ id: 0 });

        useImperativeHandle(
            ref,
            () => ({
                clearTimeout: () => clearTimeout(state.id),
            }),
            [clearTimeout, state],
        );

        state.id = setTimeout(() => {
            timesCalled++;
        }, 0);

        return <div />;
    });

    it('updates value when mounted', () => {
        render(<TestComponent />);
        expect(timesCalled).toStrictEqual(0);

        jest.runOnlyPendingTimers();
        expect(timesCalled).toStrictEqual(1);

        jest.runOnlyPendingTimers();
        expect(timesCalled).toStrictEqual(1);
    });

    it('does not execute the timeout when unmounted', () => {
        const { unmount } = render(<TestComponent />);
        expect(timesCalled).toStrictEqual(0);

        unmount();

        jest.runOnlyPendingTimers();
        expect(timesCalled).toStrictEqual(0);
    });

    it('can cancel timeout', () => {
        const ref = createRef<{ clearTimeout: () => void }>();
        render(<TestComponent ref={ref} />);

        jest.runOnlyPendingTimers();
        expect(timesCalled).toStrictEqual(1);

        ref.current!.clearTimeout();

        jest.runOnlyPendingTimers();
        expect(timesCalled).toStrictEqual(1);
    });
});
