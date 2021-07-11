import { useCallback, useRef } from 'react';

/**
 * Hook to generate a dual trigger event.
 * A dual trigger event will be triggered if it is triggered twice in a short time. For example, double click.
 *
 * @param dualTriggerEvent A callback function to be triggered as the dual trigger event.
 * @param delayLimit The delay limit in microseconds. A dual trigger event will be triggered if the time difference
 * between the current trigger time and the last trigger time is less than the delay limit. Default is `500`.
 * @returns The trigger.
 */
export function useDualTriggerEvent(dualTriggerEvent?: () => void, delayLimit: number = 500): () => void {
    const timeRef = useRef(0);

    const _delayLimit = delayLimit >= 0 ? delayLimit : 0;

    const trigger = useCallback(() => {
        if (dualTriggerEvent) {
            const currTime = Date.now();
            if (currTime - timeRef.current < _delayLimit) {
                timeRef.current = 0;
                dualTriggerEvent();
            } else {
                timeRef.current = currTime;
            }
        }
    }, [_delayLimit, dualTriggerEvent]);

    return trigger;
}
