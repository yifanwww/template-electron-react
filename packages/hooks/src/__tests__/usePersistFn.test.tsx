import { act, render } from '@testing-library/react';
import { useState } from 'react';

import { usePersistFn } from '../usePersistFn';

describe(`Test react hook \`${usePersistFn.name}\``, () => {
    validateHookValueNotChanged('returns the same callbacks', () => [usePersistFn(() => {})]);

    test('test non-persist fn triggered when trigger persist fn', () => {
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
            // eslint-disable-next-line @typescript-eslint/no-loop-func
            act(() => increaseCount!());
            expect(count).toBe(i);
        }
    });
});
