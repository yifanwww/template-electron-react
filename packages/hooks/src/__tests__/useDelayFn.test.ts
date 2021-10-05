import { act, renderHook } from '@testing-library/react-hooks';

import { useDelayFn } from '../useDelayFn';
import { validateHookValueNotChanged, wait } from './utils.test';

const emptyfn = () => {};

describe('Test react hook `useDelayFn`', () => {
    validateHookValueNotChanged('returns the same function', () => [useDelayFn(emptyfn)]);

    test('trigger only once', async () => {
        const fn = jest.fn(() => {});
        const { result } = renderHook(() => useDelayFn(fn, 500));
        expect(fn).toHaveBeenCalledTimes(0);

        act(() => result.current());
        await wait(0);
        expect(fn).toHaveBeenCalledTimes(0);
        await wait(0);
        expect(fn).toHaveBeenCalledTimes(0);

        await wait(550);
        expect(fn).toHaveBeenCalledTimes(1);
        await wait(100);
        expect(fn).toHaveBeenCalledTimes(1);
    });

    test('trigger multiple times', async () => {
        const fn = jest.fn(() => {});
        const { result } = renderHook(() => useDelayFn(fn, 500));
        expect(fn).toHaveBeenCalledTimes(0);

        act(() => result.current());
        await wait(0);
        expect(fn).toHaveBeenCalledTimes(0);
        await wait(0);
        expect(fn).toHaveBeenCalledTimes(0);

        await wait(250);
        act(() => result.current());
        await wait(0);
        expect(fn).toHaveBeenCalledTimes(0);
        await wait(0);
        expect(fn).toHaveBeenCalledTimes(0);

        await wait(550);
        expect(fn).toHaveBeenCalledTimes(1);
        await wait(100);
        expect(fn).toHaveBeenCalledTimes(1);
    });

    test('test with no delay function', () => {
        const { result } = renderHook(() => useDelayFn());
        act(() => result.current());
    });
});
