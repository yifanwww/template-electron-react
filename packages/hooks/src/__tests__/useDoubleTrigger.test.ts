import { validateHookValueNotChanged } from '@tecra/utils-test';
import { act, renderHook } from '@testing-library/react-hooks';

import { useDoubleTrigger } from '../useDoubleTrigger';

const noop = () => {};

describe(`Test react hook \`${useDoubleTrigger.name}\``, () => {
    validateHookValueNotChanged('returns the same function', () => [useDoubleTrigger(noop)]);

    let dateTime = 1_000;
    let intervalId: number;

    beforeAll(() => {
        jest.useFakeTimers();

        intervalId = setInterval(() => {
            dateTime++;
        }, 1) as never;
    });

    afterAll(() => {
        jest.useRealTimers();

        clearInterval(intervalId);
    });

    beforeEach(() => {
        jest.spyOn(Date, 'now').mockImplementation(() => dateTime);
    });

    afterEach(() => {
        dateTime = 1_000;
    });

    test('trigger only once', () => {
        const fn = jest.fn(noop);
        const { result } = renderHook(() => useDoubleTrigger(fn, 100));
        expect(fn).toHaveBeenCalledTimes(0);

        act(() => result.current());
        expect(fn).toHaveBeenCalledTimes(0);
    });

    test('trigger multiple times', () => {
        const fn = jest.fn(noop);
        const { result } = renderHook(() => useDoubleTrigger(fn, 250));
        expect(fn).toHaveBeenCalledTimes(0);

        act(() => result.current());
        expect(fn).toHaveBeenCalledTimes(0);

        jest.advanceTimersByTime(50);
        act(() => result.current());
        expect(fn).toHaveBeenCalledTimes(1);

        jest.advanceTimersByTime(50);
        act(() => result.current());
        expect(fn).toHaveBeenCalledTimes(1);

        jest.advanceTimersByTime(50);
        act(() => result.current());
        expect(fn).toHaveBeenCalledTimes(2);
    });

    test('test with no delay function', () => {
        const { result } = renderHook(() => useDoubleTrigger());
        act(() => result.current());
    });
});
