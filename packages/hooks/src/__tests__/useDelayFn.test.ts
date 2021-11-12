import { validateHookValueNotChanged } from '@tecra/utils-test';
import { act, renderHook } from '@testing-library/react-hooks';
import { noop } from 'ts-essentials';

import { useDelayFn } from '../useDelayFn';

describe(`Test react hook \`${useDelayFn.name}\``, () => {
    validateHookValueNotChanged('returns the same function', () => [useDelayFn(noop)]);

    beforeAll(() => {
        jest.useFakeTimers();
    });

    afterAll(() => {
        jest.useRealTimers();
    });

    it('triggers only once', () => {
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

    it('triggers multiple times', () => {
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

    it('works with no delay function', () => {
        const { result } = renderHook(() => useDelayFn());
        act(() => result.current());
    });
});
