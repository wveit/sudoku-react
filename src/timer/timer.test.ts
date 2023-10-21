import { expect, it } from "vitest";
import { Timer } from "./timer";

it("create a timer", async () => {
  const timer = new Timer();

  expect(timer.getMillis()).toBe(0);
  expect(timer.getStatus()).toBe("STOPPED");

  timer.start();
  expect(timer.getStatus()).toBe("RUNNING");

  await wait(20);
  timer.pause();
  let elapsedTime = timer.getMillis();
  expect(elapsedTime).toBeGreaterThanOrEqual(20);
  expect(elapsedTime).toBeLessThan(30);

  timer.start();
  expect(timer.getStatus()).toBe("RUNNING");

  await wait(20);
  timer.pause();
  elapsedTime = timer.getMillis();
  expect(elapsedTime).toBeGreaterThanOrEqual(40);
  expect(elapsedTime).toBeLessThan(50);

  timer.reset();
  expect(timer.getStatus()).toBe("STOPPED");
  expect(timer.getMillis()).toBe(0);
});

function wait(millis: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, millis);
  });
}
