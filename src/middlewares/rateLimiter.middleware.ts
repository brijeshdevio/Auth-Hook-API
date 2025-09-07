import rateLimit, { Options, RateLimitInfo } from "express-rate-limit";
import { envConfig } from "../config";

const DEFAULT_WINDOW_MS =
  parseInt(envConfig("RATE_LIMIT_WINDOW_MS")) || 30 * 60 * 1000; // 30 minutes
const DEFAULT_MAX = parseInt(envConfig("RATE_LIMIT_MAX")) || 100; // 100 requests

const createRateLimitMessage = (windowMs: number) =>
  `Too many requests from this IP, please try again after ${
    windowMs / (1000 * 60)
  } minutes`;

const rateLimiterMiddleware = (options: Partial<Options> = {}) => {
  const windowMs = options.windowMs ?? DEFAULT_WINDOW_MS;
  const max = options.max ?? DEFAULT_MAX;

  return rateLimit({
    windowMs,
    max,
    message: createRateLimitMessage(windowMs),
    ...options,
  });
};

export default rateLimiterMiddleware;
