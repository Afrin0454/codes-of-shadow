import { useState, useEffect, useCallback } from 'react';

const useTimer = (startTime) => {
    const [elapsed, setElapsed] = useState(0);

    const calculateElapsed = useCallback(() => {
        if (!startTime) return 0;
        return Math.floor((Date.now() - startTime) / 1000);
    }, [startTime]);

    useEffect(() => {
        if (!startTime) return;

        // Set initial elapsed
        setElapsed(calculateElapsed());

        const interval = setInterval(() => {
            setElapsed(calculateElapsed());
        }, 1000);

        return () => clearInterval(interval);
    }, [startTime, calculateElapsed]);

    const formatTime = (seconds) => {
        const h = Math.floor(seconds / 3600);
        const m = Math.floor((seconds % 3600) / 60);
        const s = seconds % 60;
        return [h, m, s]
            .map(v => v < 10 ? "0" + v : v)
            .filter((v, i) => v !== "00" || i > 0)
            .join(":");
    };

    return { elapsed, formatTime: formatTime(elapsed) };
};

export default useTimer;
