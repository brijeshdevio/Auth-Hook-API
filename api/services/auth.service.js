"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
const argon2_1 = require("argon2");
const models_1 = require("../models");
const utils_1 = require("../utils");
class AuthService {
    constructor() { }
    sanitize(user) {
        var _a, _b;
        const _c = ((_a = user === null || user === void 0 ? void 0 : user.toJSON) === null || _a === void 0 ? void 0 : _a.call(user)) || ((_b = user === null || user === void 0 ? void 0 : user.toObject) === null || _b === void 0 ? void 0 : _b.call(user)) || user, { _id, passwordHash, __v, updatedAt, createdAt } = _c, sanitizedUser = __rest(_c, ["_id", "passwordHash", "__v", "updatedAt", "createdAt"]);
        sanitizedUser.id = String(_id);
        return sanitizedUser;
    }
    async hashPassword(password) {
        return await (0, argon2_1.hash)(password);
    }
    async verifyPassword(hashPass, password) {
        return await (0, argon2_1.verify)(hashPass, password);
    }
    async checkUniqueEmail(email) {
        const isUser = await models_1.Developer.findOne({ email });
        if (isUser) {
            throw new utils_1.ApiError({
                statusCode: 409,
                code: "CONFLICT",
                message: "Email already exists.",
            });
        }
        return true;
    }
    async register(data) {
        await this.checkUniqueEmail(data.email);
        const passwordHash = await this.hashPassword(data.password);
        delete data.password;
        const newUser = await models_1.Developer.create(Object.assign(Object.assign({}, data), { passwordHash }));
        return this.sanitize(newUser);
    }
    async login(data) {
        const findDev = await models_1.Developer.findOne({ email: data.email });
        if (!findDev || !findDev._id || !(findDev === null || findDev === void 0 ? void 0 : findDev.passwordHash)) {
            throw new utils_1.ApiError({
                statusCode: 404,
                code: "NOT_FOUND",
                message: "Account not found.",
            });
        }
        const isVerified = await this.verifyPassword(findDev === null || findDev === void 0 ? void 0 : findDev.passwordHash, data.password);
        if (!isVerified) {
            throw new utils_1.ApiError({
                statusCode: 401,
                code: "UNAUTHORIZED",
                message: "Invalid credentials.",
            });
        }
        return this.sanitize(findDev);
    }
}
exports.default = AuthService;
