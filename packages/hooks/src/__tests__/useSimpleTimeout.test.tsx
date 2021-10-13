import { render } from '@testing-library/react';
import { createRef, forwardRef, useImperativeHandle } from 'react';

import { useSimpleTimeout } from '../useSimpleTimeout';

describe(`Test react hook \`${useSimpleTimeout.name}\``, () => {
    validateHookValueNotChanged('returns the same callbacks each time', () => {
        const { setTimeout, clearTimeout } = useSimpleTimeout();
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
        const { setTimeout, clearTimeout } = useSimpleTimeout();

        useImperativeHandle(ref, () => ({ clearTimeout }), [clearTimeout]);

        setTimeout(() => {
            timesCalled++;
        }, 0);

        return <div />;
    });

    test('updates value when mounted', () => {
        render(<TestComponent />);
        expect(timesCalled).toStrictEqual(0);

        jest.runOnlyPendingTimers();
        expect(timesCalled).toStrictEqual(1);

        jest.runOnlyPendingTimers();
        expect(timesCalled).toStrictEqual(1);
    });

    test('does not execute the timeout when unmounted', () => {
        const { unmount } = render(<TestComponent />);
        expect(timesCalled).toStrictEqual(0);

        unmount();

        jest.runOnlyPendingTimers();
        expect(timesCalled).toStrictEqual(0);
    });

    test('can cancel timeout', () => {
        const ref = createRef<{ clearTimeout: () => void }>();
        render(<TestComponent ref={ref} />);

        jest.runOnlyPendingTimers();
        expect(timesCalled).toStrictEqual(1);

        ref.current!.clearTimeout();

        jest.runOnlyPendingTimers();
        expect(timesCalled).toStrictEqual(1);
    });
});
