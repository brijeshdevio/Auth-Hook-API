import rateLimit from "express-rate-limit";

const DEFAULT_WINDOW_MS =
  parseInt(process.env.RATE_LIMIT_WINDOW_MS) || 30 * 60 * 1000; // 30 minutes
const DEFAULT_MAX = parseInt(process.env.RATE_LIMIT_MAX) || 100; // 100 requests

const createRateLimitMessage = (windowMs) =>
  `Too many requests from this IP, please try again after ${
    windowMs / (1000 * 60)
  } minutes`;

const rateLimiter = (options = {}) => {
  const windowMs = options.windowMs ?? DEFAULT_WINDOW_MS;
  const max = options.max ?? DEFAULT_MAX;

  return rateLimit({
    windowMs,
    max,
    message: createRateLimitMessage(windowMs),
    ...options,
  });
};

export default rateLimiter;
