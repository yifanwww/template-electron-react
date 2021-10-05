import { renderHook } from '@testing-library/react-hooks';

import { useConstFn } from '../useConstFn';
import { validateHookValueNotChanged } from './utils.test';

describe('Test react hook `useConstFn`', () => {
    validateHookValueNotChanged('returns the same function', () => [useConstFn(() => 'hi')]);

    test('does not call the callback', () => {
        const fn = jest.fn(() => 'hi');
        renderHook(() => useConstFn(fn));
        expect(fn).toHaveBeenCalledTimes(0);
    });
});
