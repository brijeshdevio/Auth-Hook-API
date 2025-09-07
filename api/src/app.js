"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const morgan_1 = __importDefault(require("morgan"));
const routes_1 = __importDefault(require("./routes"));
const middlewares_1 = require("./middlewares");
const utils_1 = require("./utils");
const app = (0, express_1.default)();
const ALLOWED_ORIGINS = (process.env.CORS_ORIGINS || "")
    .split(",")
    .map((o) => o.trim());
app.use((0, cors_1.default)({
    origin: function (origin, callback) {
        if (!origin || ALLOWED_ORIGINS.includes(origin)) {
            callback(null, true);
        }
        else {
            callback(new utils_1.ApiError({
                statusCode: 403,
                code: "FORBIDDEN",
                message: "Forbidden by CORS policy",
            }));
        }
    },
    credentials: true,
}));
app.use((0, helmet_1.default)());
app.use((0, cookie_parser_1.default)());
app.use((0, morgan_1.default)("dev"));
app.use(express_1.default.json());
app.use((0, middlewares_1.rateLimiterMiddleware)());
app.get("/", (req, res) => {
    res.json({
        message: "Welcome to the Auth-Hook API",
        version: "1.0.0",
        status: "active",
        timestamp: new Date().toISOString()
    });
});
// Health check endpoint for monitoring
app.get("/health", (req, res) => {
    res.json({
        status: "ok",
        timestamp: new Date().toISOString(),
        environment: process.env.NODE_ENV || "development",
        uptime: process.uptime()
    });
});
app.use("/api", routes_1.default);
app.use(middlewares_1.errorMiddleware);
exports.default = app;
