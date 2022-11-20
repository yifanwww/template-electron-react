import { validateHookValueNotChanged } from '@tecra-pkg/utils-test';
import { act, renderHook } from '@testing-library/react-hooks';

import { useBoolean } from '../useBoolean';

describe(`Test react hook \`${useBoolean.name}\``, () => {
    validateHookValueNotChanged('should return the same callbacks', () => {
        const [, { setFalse, setTrue, toggle }] = useBoolean(true);
        return [setFalse, setTrue, toggle];
    });

    function useBooleanWrapper(initialValue?: boolean) {
        const result = useBoolean(initialValue);
        return { value: result[0], ...result[1] };
    }

    it('should return initial value', () => {
        {
            const { result } = renderHook(() => useBooleanWrapper());
            expect(result.current.value).toBeFalsy();
        }

        {
            const { result } = renderHook(() => useBooleanWrapper(false));
            expect(result.current.value).toBeFalsy();
        }

        {
            const { result } = renderHook(() => useBooleanWrapper(true));
            expect(result.current.value).toBeTruthy();
        }
    });

    it('should update the value', () => {
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
