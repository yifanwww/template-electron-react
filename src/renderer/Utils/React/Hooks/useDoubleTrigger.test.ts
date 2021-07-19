import { act, renderHook } from '@testing-library/react-hooks';

import { wait } from '#Common/Utils';

import { validateHookValueNotChanged } from './testUtils';
import { useConstFn } from './useConstFn';
import { useDoubleTrigger } from './useDoubleTrigger';

describe('Test react hook `useDoubleTrigger`', () => {
    validateHookValueNotChanged('returns the same function', () => [useDoubleTrigger(useConstFn(() => {}))]);

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
