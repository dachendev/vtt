export const throttle = <T extends (...args: any[]) => void>(
  fn: T,
  delay: number
) => {
  let lastCall = 0;
  return (...args: Parameters<T>): void => {
    const now = performance.now();
    if (now - lastCall >= delay) {
      lastCall = now;
      fn(...args);
    }
  };
};
