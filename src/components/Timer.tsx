import { useEffect, useState } from "react";

interface TimerProps {
  pause: () => void;
  resume: () => void;
  getElapsedTime: () => number;
  isPaused: boolean;
}

export function Timer({ pause, resume, getElapsedTime, isPaused }: TimerProps) {
  const [time, setTime] = useState(0);

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setTime(getElapsedTime());
    }, 1000);
    return () => {
      clearInterval(timer);
    };
  }, [isPaused, getElapsedTime]);

  const totalSeconds = Math.floor(time / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds - minutes * 60;
  const formattedSeconds = (seconds < 10 ? "0" : "") + seconds;

  return (
    <div>
      Timer: {minutes}:{formattedSeconds}{" "}
      <button onClick={isPaused ? resume : pause}>
        {isPaused ? "resume" : "pause"}
      </button>
    </div>
  );
}
