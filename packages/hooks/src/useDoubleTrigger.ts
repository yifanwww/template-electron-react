import { useCallback, useRef } from 'react';

/**
 * Hook to generate a double trigger event.
 * A double trigger event will be triggered if it is triggered twice in a short time. For example, double click.
 *
 * @param doubleTrigger A callback function to be triggered as the double trigger event.
 * @param delayLimit The delay limit in microseconds. A double trigger event will be triggered if the time difference
 * between the current trigger time and the last trigger time is less than the delay limit. Default is `500`.
 * @returns The trigger.
 */
export function useDoubleTrigger<T extends UnknownFn>(doubleTrigger?: T, delayLimit: number = 500): VoidReturn<T> {
    const timeRef = useRef(0);

    const trigger = useCallback(
        (...args: never[]) => {
            if (doubleTrigger) {
                const currTime = Date.now();
                if (currTime - timeRef.current < delayLimit) {
                    timeRef.current = 0;
                    doubleTrigger(...args);
                } else {
                    timeRef.current = currTime;
                }
            }
        },
        [delayLimit, doubleTrigger],
    );

    return trigger as T;
}
