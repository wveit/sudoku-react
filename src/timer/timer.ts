type TimerStatus = "STOPPED" | "PAUSED" | "RUNNING";

export class Timer {
  private status = "STOPPED" as TimerStatus;
  private startTime = 0;
  private accumulatedTime = 0;

  getMillis = () => {
    let currentInterval = 0;
    if (this.startTime !== 0) {
      currentInterval = Date.now() - this.startTime;
    }
    return this.accumulatedTime + currentInterval;
  };

  getStatus = () => this.status;

  start = () => {
    if (this.status === "RUNNING") {
      return;
    }

    if (this.status === "STOPPED") {
      this.accumulatedTime = 0;
    }

    this.startTime = Date.now();
    this.status = "RUNNING";
  };

  pause = () => {
    const currentInterval = Date.now() - this.startTime;
    this.accumulatedTime += currentInterval;
    this.startTime = 0;
    this.status = "PAUSED";
  };

  stop = () => {
    const currentInterval = Date.now() - this.startTime;
    this.accumulatedTime += currentInterval;
    this.startTime = 0;
    this.status = "STOPPED";
  };

  reset = () => {
    this.accumulatedTime = 0;
    this.startTime = 0;
    this.status = "STOPPED";
  };
}
