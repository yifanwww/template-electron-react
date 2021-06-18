import { useCallback, useState } from 'react';

/**
 * Hook to generate a dual trigger event.
 * A dual trigger event will be triggered if it is triggered twice in a short time. For example, double click.
 *
 * @param dualTriggerEvent A callback function to be triggered as the dual trigger event.
 * @param delayLimit The delay limit in microseconds. A dual trigger event will be triggered if the time difference
 * between the current trigger time and the last trigger time is less than the delay limit.
 * @returns The trigger.
 */
export function useDualTriggerEvent(dualTriggerEvent: () => void, delayLimit: number): () => void {
    const [lastTriggerTime, setTriggerTime] = useState(0);

    const _delayLimit = delayLimit >= 0 ? delayLimit : 0;

    const trigger = useCallback(() => {
        const currTriggerTime = new Date().getTime();
        if (currTriggerTime - lastTriggerTime < _delayLimit) {
            setTriggerTime(0);
            dualTriggerEvent();
        } else {
            setTriggerTime(new Date().getTime());
        }
    }, [_delayLimit, dualTriggerEvent, lastTriggerTime]);

    return trigger;
}
