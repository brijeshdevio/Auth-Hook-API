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
class DevService {
    sanitize(dev) {
        var _a, _b;
        const _c = ((_a = dev === null || dev === void 0 ? void 0 : dev.toJSON) === null || _a === void 0 ? void 0 : _a.call(dev)) || ((_b = dev === null || dev === void 0 ? void 0 : dev.toObject) === null || _b === void 0 ? void 0 : _b.call(dev)) || dev, { _id, passwordHash, __v, updatedAt } = _c, sanitizedDev = __rest(_c, ["_id", "passwordHash", "__v", "updatedAt"]);
        sanitizedDev.id = String(_id);
        return sanitizedDev;
    }
    async getById(_id) {
        const dev = await models_1.Developer.findById(_id);
        if (!dev || !(dev === null || dev === void 0 ? void 0 : dev._id)) {
            throw new utils_1.ApiError({
                statusCode: 401,
                code: "UNAUTHORIZED",
                message: "You are not logged in.",
            });
        }
        return this.sanitize(dev);
    }
    async updateById(_id, data) {
        const updatedDev = await models_1.Developer.findByIdAndUpdate({ _id }, data, {
            new: true,
        });
        if (!updatedDev || !(updatedDev === null || updatedDev === void 0 ? void 0 : updatedDev._id)) {
            throw new utils_1.ApiError({
                statusCode: 401,
                code: "UNAUTHORIZED",
                message: "You are not logged in.",
            });
        }
        return this.sanitize(updatedDev);
    }
    async deleteById(_id) {
        const isDeleted = await models_1.Developer.findByIdAndDelete(_id);
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
exports.default = DevService;
