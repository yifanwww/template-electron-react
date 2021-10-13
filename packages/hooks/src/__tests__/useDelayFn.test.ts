import { act, renderHook } from '@testing-library/react-hooks';

import { useDelayFn } from '../useDelayFn';

const noop = () => {};

describe(`Test react hook \`${useDelayFn.name}\``, () => {
    validateHookValueNotChanged('returns the same function', () => [useDelayFn(noop)]);

    beforeAll(() => {
        jest.useFakeTimers();
    });

    afterAll(() => {
        jest.useRealTimers();
    });

    test('trigger only once', () => {
        const fn = jest.fn(noop);
        const { result } = renderHook(() => useDelayFn(fn, 500));
        expect(fn).toHaveBeenCalledTimes(0);

        act(() => result.current());

        expect(fn).toHaveBeenCalledTimes(0);
        jest.advanceTimersByTime(500);
        expect(fn).toHaveBeenCalledTimes(1);
        jest.advanceTimersByTime(500);
        expect(fn).toHaveBeenCalledTimes(1);
    });

    test('trigger multiple times', () => {
        const fn = jest.fn(noop);
        const { result } = renderHook(() => useDelayFn(fn, 500));
        expect(fn).toHaveBeenCalledTimes(0);

        act(() => result.current());

        expect(fn).toHaveBeenCalledTimes(0);
        jest.advanceTimersByTime(250);
        expect(fn).toHaveBeenCalledTimes(0);

        act(() => result.current());

        expect(fn).toHaveBeenCalledTimes(0);
        jest.advanceTimersByTime(500);
        expect(fn).toHaveBeenCalledTimes(1);
        jest.advanceTimersByTime(500);
        expect(fn).toHaveBeenCalledTimes(1);
    });

    test('test with no delay function', () => {
        const { result } = renderHook(() => useDelayFn());
        act(() => result.current());
    });
});
