import { useState } from "react";

export function useTimer() {
  const [accumulatedTime, setAccumulatedTime] = useState(0);
  const [startTime, setStartTime] = useState(-1);

  function reset() {
    setAccumulatedTime(0);
    setStartTime(new Date().getTime());
  }

  function pause() {
    if (startTime < 0) return;

    const currentTime = new Date().getTime();
    const elapsedTime = currentTime - startTime;
    setAccumulatedTime((accumulatedTime) => accumulatedTime + elapsedTime);
    setStartTime(-1);
  }

  function resume() {
    if (startTime >= 0) return;
    setStartTime(new Date().getTime());
  }

  function getElapsedTime() {
    const currentTime = new Date().getTime();
    const elapsedTime = startTime < 0 ? 0 : currentTime - startTime;
    return accumulatedTime + elapsedTime;
  }

  const isPaused = startTime < 0;

  return { reset, pause, resume, getElapsedTime, isPaused };
}
