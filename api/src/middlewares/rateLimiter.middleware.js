"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const config_1 = require("../config");
const DEFAULT_WINDOW_MS = parseInt((0, config_1.envConfig)("RATE_LIMIT_WINDOW_MS")) || 30 * 60 * 1000; // 30 minutes
const DEFAULT_MAX = parseInt((0, config_1.envConfig)("RATE_LIMIT_MAX")) || 100; // 100 requests
const createRateLimitMessage = (windowMs) => `Too many requests from this IP, please try again after ${windowMs / (1000 * 60)} minutes`;
const rateLimiterMiddleware = (options = {}) => {
    var _a, _b;
    const windowMs = (_a = options.windowMs) !== null && _a !== void 0 ? _a : DEFAULT_WINDOW_MS;
    const max = (_b = options.max) !== null && _b !== void 0 ? _b : DEFAULT_MAX;
    return (0, express_rate_limit_1.default)(Object.assign({ windowMs,
        max, message: createRateLimitMessage(windowMs) }, options));
};
exports.default = rateLimiterMiddleware;
