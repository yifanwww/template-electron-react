import type { Nullable, Optional } from '@ter/app-common/types';
import { act, render } from '@testing-library/react';
import { useState } from 'react';

import { validateHookValueNotChanged } from 'src/__tests__/hook';
import { assert } from 'src/utils/assert';

import { usePersistFn } from '../usePersistFn';

describe(`Test react hook \`${usePersistFn.name}\``, () => {
    validateHookValueNotChanged('should return the same callbacks', () => [usePersistFn(() => {})]);

    it('should call the latest non-persist function', () => {
        let count: Optional<number>;
        let increaseCount = null as Nullable<() => void>;
        expect(count).toBeUndefined();
        expect(increaseCount).toBeNull();

        function TestComponent() {
            const [_count, _setCount] = useState(0);
            count = _count;
            increaseCount = usePersistFn(() => _setCount(_count + 1));
            return <div />;
        }

        render(<TestComponent />);
        expect(count).toBe(0);
        expect(increaseCount).toBeInstanceOf(Function);
        assert(typeof increaseCount === 'function');

        for (let i = 1; i <= 10; i++) {
            const increaseCountRef = increaseCount;
            act(() => increaseCountRef());
            expect(count).toBe(i);
        }
    });
});
