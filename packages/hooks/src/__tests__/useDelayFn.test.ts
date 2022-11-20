import { validateHookValueNotChanged } from '@tecra-pkg/utils-test';
import { act, renderHook } from '@testing-library/react-hooks';
import { noop } from 'lodash';

import { useDelayFn } from '../useDelayFn';

describe(`Test react hook \`${useDelayFn.name}\``, () => {
    validateHookValueNotChanged('should return the same function', () => [useDelayFn(noop)]);

    beforeAll(() => {
        jest.useFakeTimers();
    });

    afterAll(() => {
        jest.useRealTimers();
    });

    it('should trigger only once', () => {
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

    it('should trigger multiple times', () => {
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

    it('should work with no delay function', () => {
        const { result } = renderHook(() => useDelayFn());
        act(() => result.current());
    });

    it('should not execute fn after unmount', () => {
        const fn = jest.fn(noop);
        const { result, unmount } = renderHook(() => useDelayFn(fn, 500));

        act(() => result.current());
        expect(fn).toHaveBeenCalledTimes(0);

        jest.advanceTimersByTime(250);
        unmount();
        jest.advanceTimersByTime(250);

        expect(fn).toHaveBeenCalledTimes(0);
        jest.advanceTimersByTime(100);
        expect(fn).toHaveBeenCalledTimes(0);
    });
});
