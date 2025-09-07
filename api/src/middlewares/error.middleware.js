"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const mongoose_1 = require("mongoose");
const utils_1 = require("../utils");
const config_1 = require("../config");
const formateZodError = (issues) => {
    return issues.map((issue) => {
        return {
            field: issue.path[0],
            message: issue.message,
        };
    });
};
const errorFormat = (res, err) => {
    res.status(err.statusCode).json({
        success: false,
        status: err.statusCode,
        error: {
            code: err.code,
            message: err.message,
            details: err.details,
        },
    });
};
const errorMiddleware = (err, req, res, next) => {
    if (err instanceof utils_1.ApiError) {
        return errorFormat(res, err);
    }
    else if (err instanceof zod_1.ZodError) {
        return errorFormat(res, {
            statusCode: 400,
            code: "BAD_REQUEST",
            message: "Validation Error",
            details: formateZodError(err.issues),
        });
    }
    else if (err instanceof mongoose_1.MongooseError) {
        return errorFormat(res, {
            statusCode: 500,
            code: "SERVER_ERROR",
            message: "Internal Server Error",
            details: err.message,
        });
    }
    utils_1.logger.error(`[${req.method}] ${req.path} - ${err instanceof Error ? err.stack : err}`);
    return errorFormat(res, {
        statusCode: 500,
        code: "SERVER_ERROR",
        message: "Internal Server Error",
        details: (0, config_1.envConfig)("NODE_ENV") === "development" ? err.name : undefined,
    });
};
exports.default = errorMiddleware;
