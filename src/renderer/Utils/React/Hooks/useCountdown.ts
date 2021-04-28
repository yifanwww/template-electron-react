import { useCallback, useEffect, useState } from 'react';

type SetCountdown = (countdown: number) => void;

const getCurrentTime = () => Math.round(Date.now() / 1000);
const getTargetTime = (countdown: number) => Math.round(Date.now() / 1000 + countdown);

export function useCountdown(countdown: number): [number, SetCountdown] {
    const [targetTime, setTargetTime] = useState(getTargetTime(countdown));
    const [currentTime, setCurrentTime] = useState(getCurrentTime());

    const setCountdown = useCallback((_countdown: number) => setTargetTime(getTargetTime(_countdown)), [setTargetTime]);

    useEffect(() => {
        const interval = setInterval(() => {
            const _currentTime = getCurrentTime();
            if (currentTime !== _currentTime) {
                setCurrentTime(_currentTime);
            }
        });

        return () => clearInterval(interval);
    }, [currentTime]);

    return [targetTime - currentTime >= 0 ? targetTime - currentTime : 0, setCountdown];
}
