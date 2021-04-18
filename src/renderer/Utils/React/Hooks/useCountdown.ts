import { useCallback, useEffect, useState } from 'react';

type SetCountdown = (countdown: number) => void;

export function useCountdown(countdown: number): [number, SetCountdown] {
    const [targetTime, setTargetTime] = useState(Math.round(Date.now() / 1000 + countdown));
    const [currentTime, setCurrentTime] = useState(Math.round(Date.now() / 1000));

    const setCountdown = useCallback<SetCountdown>(
        (_countdown) => setTargetTime(Math.round(Date.now() / 1000 + _countdown)),
        [setTargetTime],
    );

    useEffect(() => {
        const interval = setInterval(() => {
            const ts = Math.round(Date.now() / 1000);
            if (currentTime !== ts) {
                setCurrentTime(ts);
            }
        });

        return () => clearInterval(interval);
    }, [currentTime]);

    return [targetTime - currentTime, setCountdown];
}
