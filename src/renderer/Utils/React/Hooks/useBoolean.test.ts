import { act, renderHook } from '@testing-library/react-hooks';

import { validateHookValueNotChanged } from './testUtils';
import { useBoolean } from './useBoolean';

describe('Test react hook `useBoolean`', () => {
    function useBooleanWrapper(initialValue: boolean) {
        const result = useBoolean(initialValue);
        return { value: result[0], ...result[1] };
    }

    test('test initial value', () => {
        const { result: result1 } = renderHook(() => useBooleanWrapper(false));
        expect(result1.current.value).toBeFalsy();

        const { result: result2 } = renderHook(() => useBooleanWrapper(true));
        expect(result2.current.value).toBeTruthy();
    });

    validateHookValueNotChanged('returns the same callbacks', () => {
        const [, { setFalse, setTrue, toggle }] = useBoolean(true);
        return [setFalse, setTrue, toggle];
    });

    test('updates the value', () => {
        const { result } = renderHook(() => useBooleanWrapper(false));

        act(() => result.current.setTrue());
        expect(result.current.value).toBeTruthy();

        act(() => result.current.setFalse());
        expect(result.current.value).toBeFalsy();

        act(() => result.current.setFalse());
        expect(result.current.value).toBeFalsy();

        act(() => result.current.setTrue());
        expect(result.current.value).toBeTruthy();

        act(() => result.current.toggle());
        expect(result.current.value).toBeFalsy();

        act(() => result.current.toggle());
        expect(result.current.value).toBeTruthy();
    });
});
