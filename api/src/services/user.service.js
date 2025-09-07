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
const models_1 = require("../models");
const utils_1 = require("../utils");
const argon2_1 = require("argon2");
class UserService {
    sanitize(user) {
        var _a, _b;
        const _c = ((_a = user === null || user === void 0 ? void 0 : user.toJSON) === null || _a === void 0 ? void 0 : _a.call(user)) || ((_b = user === null || user === void 0 ? void 0 : user.toObject) === null || _b === void 0 ? void 0 : _b.call(user)) || user, { _id, passwordHash, __v, app, updatedAt } = _c, sanitizedUser = __rest(_c, ["_id", "passwordHash", "__v", "app", "updatedAt"]);
        sanitizedUser.id = String(_id);
        return sanitizedUser;
    }
    async hashPassword(password) {
        return await (0, argon2_1.hash)(password);
    }
    async verifyPassword(hashPass, password) {
        return await (0, argon2_1.verify)(hashPass, password);
    }
    async checkUniqueEmail(app, email) {
        const isUser = await models_1.User.findOne({ email, app });
        if (isUser) {
            throw new utils_1.ApiError({
                statusCode: 409,
                code: "CONFLICT",
                message: "Email already exists.",
            });
        }
        return true;
    }
    async register(app, data) {
        await this.checkUniqueEmail(app, data.email);
        const passwordHash = await this.hashPassword(data.password);
        delete data.password;
        const newUser = await models_1.User.create(Object.assign(Object.assign({}, data), { passwordHash,
            app }));
        return this.sanitize(newUser);
    }
    async login(app, data) {
        const findUser = await models_1.User.findOne({ app, email: data.email });
        if (!findUser || !findUser._id || !(findUser === null || findUser === void 0 ? void 0 : findUser.passwordHash)) {
            throw new utils_1.ApiError({
                statusCode: 404,
                code: "NOT_FOUND",
                message: "Account not found.",
            });
        }
        const isVerified = await this.verifyPassword(findUser === null || findUser === void 0 ? void 0 : findUser.passwordHash, data.password);
        if (!isVerified) {
            throw new utils_1.ApiError({
                statusCode: 401,
                code: "UNAUTHORIZED",
                message: "Invalid credentials.",
            });
        }
        return this.sanitize(findUser);
    }
    async getById(app, userId) {
        const user = await models_1.User.findOne({ app, _id: userId });
        if (!user || !(user === null || user === void 0 ? void 0 : user._id)) {
            throw new utils_1.ApiError({
                statusCode: 401,
                code: "UNAUTHORIZED",
                message: "You are not logged in.",
            });
        }
        return this.sanitize(user);
    }
    async updateById(app, _id, data) {
        const updatedUser = await models_1.User.findOneAndUpdate({ app, _id }, data, {
            new: true,
        });
        if (!updatedUser || !(updatedUser === null || updatedUser === void 0 ? void 0 : updatedUser._id)) {
            throw new utils_1.ApiError({
                statusCode: 401,
                code: "UNAUTHORIZED",
                message: "You are not logged in.",
            });
        }
        return this.sanitize(updatedUser);
    }
    async deleteById(app, _id) {
        const isDeleted = await models_1.User.findOneAndDelete({ app, _id });
        if (!isDeleted || !(isDeleted === null || isDeleted === void 0 ? void 0 : isDeleted._id)) {
            throw new utils_1.ApiError({
                statusCode: 401,
                code: "UNAUTHORIZED",
                message: "You are not logged in.",
            });
        }
        return this.sanitize(isDeleted);
    }
}
exports.default = UserService;
