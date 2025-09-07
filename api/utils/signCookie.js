"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../config");
const oneDay = 1000 * 60 * 60 * 24;
const signCookie = (res, secret, options = {}) => {
    const token = jsonwebtoken_1.default.sign(secret, (0, config_1.envConfig)("JWT_ACCESS_TOKEN"));
    const httpOptions = Object.assign({ httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: "none" }, options);
    res.cookie((0, config_1.envConfig)("COOKIE_NAME"), token, httpOptions);
    return token;
};
exports.default = signCookie;
