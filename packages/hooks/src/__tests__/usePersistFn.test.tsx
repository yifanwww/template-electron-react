import { validateHookValueNotChanged } from '@tecra-pkg/utils-test';
import { act, render } from '@testing-library/react';
import { noop } from 'lodash';
import { useState } from 'react';

import { usePersistFn } from '../usePersistFn';

describe(`Test react hook \`${usePersistFn.name}\``, () => {
    validateHookValueNotChanged('should return the same callbacks', () => [usePersistFn(noop)]);

    it('should call the latest non-persist function', () => {
        let count: Optional<number> = null;
        let increaseCount: Optional<() => void> = null;
        expect(count).toBeNull();
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

        for (let i = 1; i <= 10; i++) {
            act(increaseCount!);
            expect(count).toBe(i);
        }
    });
});
