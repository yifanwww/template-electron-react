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
export function useDoubleTrigger(doubleTrigger?: () => void, delayLimit: number = 500): () => void {
    const timeRef = useRef(0);

    const _delayLimit = delayLimit >= 0 ? delayLimit : 0;

    const trigger = useCallback(() => {
        if (doubleTrigger) {
            const currTime = Date.now();
            if (currTime - timeRef.current < _delayLimit) {
                timeRef.current = 0;
                doubleTrigger();
            } else {
                timeRef.current = currTime;
            }
        }
    }, [_delayLimit, doubleTrigger]);

    return trigger;
}
