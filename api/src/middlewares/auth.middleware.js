"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../config");
const utils_1 = require("../utils");
const authMiddleware = (req, res, next) => {
    var _a, _b, _c;
    const authToken = (_b = (_a = req.headers) === null || _a === void 0 ? void 0 : _a.authorization) === null || _b === void 0 ? void 0 : _b.split(" ")[1];
    const accessToken = ((_c = req.cookies) === null || _c === void 0 ? void 0 : _c[(0, config_1.envConfig)("COOKIE_NAME")]) || authToken;
    try {
        const decoded = jsonwebtoken_1.default.verify(accessToken, (0, config_1.envConfig)("JWT_ACCESS_TOKEN"));
        // req.auth = { id: (decoded as unknown as { id: string }).id };
        req.auth = Object.assign(Object.assign({}, req.auth), { id: decoded });
        if (!req.auth.id) {
            throw new utils_1.ApiError({
                statusCode: 401,
                code: "UNAUTHORIZED",
                message: "Invalid or expires access token. Please try to log in.",
            });
        }
        next();
    }
    catch (error) {
        throw new utils_1.ApiError({
            statusCode: 401,
            code: "UNAUTHORIZED",
            message: "You are not logged in.",
        });
    }
};
exports.default = authMiddleware;
