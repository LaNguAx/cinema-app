import { useEffect, useState } from 'react';

interface TimerProps {
  startTimestamp: number;
  duration?: number;
}

export default function Timer({
  startTimestamp,
  duration = 15 * 60 * 1000,
}: TimerProps) {
  const [timeLeft, setTimeLeft] = useState(duration);

  useEffect(() => {
    const interval = setInterval(() => {
      const elapsed = Date.now() - startTimestamp;
      const remaining = duration - elapsed;
      setTimeLeft(remaining > 0 ? remaining : 0);
    }, 1000);

    return () => clearInterval(interval);
  }, [startTimestamp, duration]);

  const minutes = Math.floor(timeLeft / 60000);
  const seconds = Math.floor((timeLeft % 60000) / 1000)
    .toString()
    .padStart(2, '0');

  return (
    <div className="bg-yellow-100 border border-yellow-400 text-yellow-800 text-sm rounded px-3 py-2 mt-3 max-w-sm">
      ⏳ Seats held for:{' '}
      <strong>
        {minutes}:{seconds}
      </strong>{' '}
      minutes remaining
    </div>
  );
}
