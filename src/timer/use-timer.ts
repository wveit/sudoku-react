import { useState } from "react";
import * as t from "./timer";

export function useTimer() {
  const [timer, setTimer] = useState(t.makeNewTimer());

  return {
    reset: () => setTimer(t.makeNewTimer()),
    resume: () => setTimer(t.startTimer),
    pause: () => setTimer(t.pauseTimer),
    stop: () => setTimer(t.stopTimer),
    getElapsedTime: () => t.getTimerMillis(timer),
    isRunning: timer.status === "RUNNING",
    isPaused: timer.status === "PAUSED",
    isStopped: timer.status === "STOPPED",
  };
}
