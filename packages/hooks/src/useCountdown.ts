import { useEffect, useState } from 'react';

import { useConstFn } from './useConstFn';
import { useSimpleInterval } from './useSimpleInterval';

export type ISetCountdownUpdater = (countdown: number) => void;

export function useCountdown(): [number, ISetCountdownUpdater] {
    const [currentTime, setCurrentTime] = useState(0);
    const [targetTime, setTargetTime] = useState(0);

    const { clearInterval, setInterval } = useSimpleInterval();

    const setCountdown = useConstFn((_countdown: number) => {
        const _currentTime = Date.now() / 1000;
        const _targetTime = _currentTime + _countdown;
        setCurrentTime(_currentTime);
        setTargetTime(_targetTime);

        clearInterval();

        if (_countdown > 0) {
            setInterval(() => {
                const curr = Date.now() / 1000;
                setCurrentTime(curr);

                if (curr >= _targetTime) clearInterval();
            }, 50);
        }
    });

    // Cleanup function.
    useEffect(() => {
        // Here runs only when this component did unmount. Clear the interval timer if it exists.
        return clearInterval;
        // useSimpleInterval ensures this will never change, but `react-hooks/exhaustive-deps` doesn't know that.
    }, [clearInterval]);

    return [Math.max(0, Math.ceil(targetTime - currentTime)), setCountdown];
}
