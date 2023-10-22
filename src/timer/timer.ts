type TimerStatus = "STOPPED" | "PAUSED" | "RUNNING";

export interface Timer {
  status: TimerStatus;
  accumulatedTime: number;
  intervalStart: number;
}

export function makeNewTimer(): Timer {
  return {
    status: "STOPPED",
    accumulatedTime: 0,
    intervalStart: 0,
  };
}

export function startTimer(timer: Timer): Timer {
  if (timer.status === "RUNNING") {
    return timer;
  }
  return { ...timer, intervalStart: Date.now(), status: "RUNNING" };
}

export function pauseTimer(timer: Timer): Timer {
  if (timer.status !== "RUNNING") {
    return timer;
  }
  const interval = Date.now() - timer.intervalStart;
  return {
    status: "PAUSED",
    accumulatedTime: timer.accumulatedTime + interval,
    intervalStart: 0,
  };
}

export function stopTimer(timer: Timer): Timer {
  if (timer.status === "STOPPED") {
    return timer;
  }
  const interval = Date.now() - timer.intervalStart;
  return {
    status: "STOPPED",
    accumulatedTime: timer.accumulatedTime + interval,
    intervalStart: 0,
  };
}

export function getTimerMillis(timer: Timer): number {
  let interval = 0;
  if (timer.status === "RUNNING") {
    interval = Date.now() - timer.intervalStart;
  }
  return timer.accumulatedTime + interval;
}
