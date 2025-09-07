"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ApiError extends Error {
    constructor(err) {
        super(err.message);
        this.statusCode = err.statusCode;
        this.code = err.code;
        this.details = err.details;
        Error.captureStackTrace(this, this.constructor);
    }
}
exports.default = ApiError;
