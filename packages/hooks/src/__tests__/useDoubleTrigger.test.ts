import { act, renderHook } from '@testing-library/react-hooks';

import { useDoubleTrigger } from '../useDoubleTrigger';
import { validateHookValueNotChanged, wait } from './utils.test';

const emptyfn = () => {};

describe('Test react hook `useDoubleTrigger`', () => {
    validateHookValueNotChanged('returns the same function', () => [useDoubleTrigger(emptyfn)]);

    test('trigger only once', async () => {
        const fn = jest.fn(() => {});
        const { result } = renderHook(() => useDoubleTrigger(fn, 100));
        expect(fn).toHaveBeenCalledTimes(0);

        act(() => result.current());
        expect(fn).toHaveBeenCalledTimes(0);
    });

    test('trigger multiple times', async () => {
        const fn = jest.fn(() => {});
        const { result } = renderHook(() => useDoubleTrigger(fn, 250));
        expect(fn).toHaveBeenCalledTimes(0);

        act(() => result.current());
        expect(fn).toHaveBeenCalledTimes(0);

        await wait(50);
        act(() => result.current());
        expect(fn).toHaveBeenCalledTimes(1);

        await wait(50);
        act(() => result.current());
        expect(fn).toHaveBeenCalledTimes(1);

        await wait(50);
        act(() => result.current());
        expect(fn).toHaveBeenCalledTimes(2);
    });

    test('test with no delay function', () => {
        const { result } = renderHook(() => useDoubleTrigger());
        act(() => result.current());
    });
});
