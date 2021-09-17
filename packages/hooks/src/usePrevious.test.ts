import { renderHook } from '@testing-library/react-hooks';

import { usePrevious } from './usePrevious';

describe('Test react hook `usePrevious`', () => {
    test('returns previous value', () => {
        const { rerender, result } = renderHook(usePrevious);
        expect(result.current).toBeUndefined();

        rerender(0);
        expect(result.current).toBeUndefined();

        rerender(1);
        expect(result.current).toBe(0);

        rerender(2);
        expect(result.current).toBe(1);
    });
});
