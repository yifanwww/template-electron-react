import { useEffect, useRef } from 'react';

import { useConstFn } from './useConstFn';
import { useForceUpdate } from './useForceUpdate';
import { useSingleInterval } from './useSingleInterval';

/**
 * @param countdown The unit is `second`. If the parameter `countdown` is less than `0`, will stop the countdown.
 */
export type SetCountdown = (countdown: number) => void;

export function useCountdown(): [Integer, SetCountdown] {
    const targetTimeRef = useRef(0);
    const remainTimeRef = useRef(0);

    const forceUpdate = useForceUpdate();
    const { clearInterval, setInterval } = useSingleInterval();

    const setCountdown = useConstFn((countdown: number) => {
        // Stop the countdown
        clearInterval();

        if (countdown <= 0) {
            // Forcely update if need
            if (remainTimeRef.current !== 0) {
                remainTimeRef.current = 0;
                forceUpdate();
            }
        } else {
            targetTimeRef.current = Date.now() / 1000 + countdown;

            const remainTime = Math.max(0, Math.ceil(countdown));
            if (remainTime !== remainTimeRef.current) {
                remainTimeRef.current = remainTime;
                forceUpdate();
            }

            setInterval(() => {
                const newRemainTime = Math.max(0, Math.ceil(targetTimeRef.current - Date.now() / 1000));
                if (newRemainTime !== remainTimeRef.current) {
                    remainTimeRef.current = newRemainTime;
                    forceUpdate();
                }

                if (remainTimeRef.current === 0) clearInterval();
            }, 50);
        }
    });

    // Cleanup function.
    useEffect(() => {
        // Here runs only when this component did unmount. Clear the interval timer if it exists.
        return clearInterval;
        // useSimpleInterval ensures this will never change, but `react-hooks/exhaustive-deps` doesn't know that.
    }, [clearInterval]);

    return [remainTimeRef.current, setCountdown];
}
