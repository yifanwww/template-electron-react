import { validateHookValueNotChanged } from '@tecra-pkg/utils-test';
import { renderHook } from '@testing-library/react-hooks';

import { useConstFn } from '../useConstFn';

describe(`Test react hook \`${useConstFn.name}\``, () => {
    validateHookValueNotChanged('should return the same function', () => [useConstFn(() => 'hi')]);

    it('should call the function', () => {
        const fn = jest.fn(() => 'hi');
        const { result } = renderHook(() => useConstFn(fn));
        expect(fn).toHaveBeenCalledTimes(0);

        result.current();
        expect(fn).toHaveBeenCalledTimes(1);

        result.current();
        expect(fn).toHaveBeenCalledTimes(2);
    });
});
