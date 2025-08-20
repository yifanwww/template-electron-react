import { expect, it } from '@jest/globals';
import { renderHook } from '@testing-library/react';

/**
 * Validate that value(s) returned by a hook do not change in identity.
 * @param testDescription Custom test description.
 * @param useHook Function to invoke the hook and return an array of return values which should not change.
 * @param useHookAgain If you want to verify that the return value doesn't change when hook parameters change,
 * you can pass this second callback which calls the hook differently.
 */
// eslint-disable-next-line jest/no-export
export function validateHookValueNotChanged<TValues extends unknown[]>(
    testDescription: string,
    useHook: () => TValues,
    useHookAgain?: () => TValues,
): void {
    // eslint-disable-next-line jest/valid-title
    it(testDescription, () => {
        let callCount = 0;

        function hookWrapper() {
            callCount++;
            // eslint-disable-next-line react-hooks/rules-of-hooks
            return callCount === 1 ? useHook() : (useHookAgain ?? useHook)();
        }

        const { rerender, result } = renderHook(hookWrapper);
        expect(callCount).toBe(1);
        const firstValues = result.current;
        expect(firstValues).toBeDefined();

        rerender();
        expect(callCount).toBe(2);
        const latestValues = result.current;
        expect(latestValues).toBeDefined();
        expect(latestValues).toHaveLength(firstValues.length);

        for (let i = 0; i < latestValues.length; i++) {
            try {
                expect(latestValues[i]).toBe(firstValues[i]);
            } catch {
                // Make a more informative error message
                // eslint-disable-next-line jest/no-conditional-expect
                expect('').toBe(
                    `Identity of value at index ${i} has changed. ` +
                        `This might help identify it:\n${String(latestValues[i])}`,
                );
            }
        }
    });
}
