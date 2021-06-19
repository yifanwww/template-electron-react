import { useEffect, useRef, useState } from 'react';

import { useConstFn } from './useConstFn';

export type ISetCountdownAction = (countdown: number) => void;

export function useCountdown(): [number, ISetCountdownAction] {
    const intervalIdRef = useRef<number>();

    const [currentTime, setCurrentTime] = useState(0);
    const [targetTime, setTargetTime] = useState(0);

    const setCountdown = useConstFn((_countdown: number) => {
        const _currentTime = Date.now() / 1000;
        const _targetTime = _currentTime + _countdown;
        setCurrentTime(_currentTime);
        setTargetTime(_targetTime);

        clearInterval(intervalIdRef.current);
        intervalIdRef.current = setInterval(() => {
            const curr = Date.now() / 1000;
            setCurrentTime(curr);

            if (curr >= _targetTime) {
                clearInterval(intervalIdRef.current);
                intervalIdRef.current = undefined;
            }
        }, 50) as unknown as number;
    });

    // Cleanup function.
    useEffect(() => {
        // Here runs only when this component did unmount. Clear the interval timer if it exists.
        return () => clearInterval(intervalIdRef.current);
    }, []);

    return [Math.max(0, Math.ceil(targetTime - currentTime)), setCountdown];
}
