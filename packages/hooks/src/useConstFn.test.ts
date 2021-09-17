import { renderHook } from '@testing-library/react-hooks';

import { validateHookValueNotChanged } from './testUtils';
import { useConstFn } from './useConstFn';

describe('Test react hook `useConstFn`', () => {
    validateHookValueNotChanged('returns the same function', () => [useConstFn(() => 'hi')]);

    test('does not call the callback', () => {
        const fn = jest.fn(() => 'hi');
        renderHook(() => useConstFn(fn));
        expect(fn).toHaveBeenCalledTimes(0);
    });
});
