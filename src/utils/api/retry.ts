const delay = (ms: number) => new Promise(resolve => setTimeout(() => resolve(null), ms));

export const retryRequest = async <T,>(
  fn: () => Promise<T>,
  retries: number = 3,
  delayMs: number = 1000
): Promise<T> => {
  try {
    return await fn();
  } catch (error) {
    if (retries > 0) {
      await delay(delayMs * (4 - retries));
      return retryRequest(fn, retries - 1, delayMs);
    }
    throw error;
  }
};

export const exponentialBackoff = (
  attemptNumber: number,
  maxDelay: number = 30000
): number => {
  return Math.min(1000 * Math.pow(2, attemptNumber), maxDelay);
};
