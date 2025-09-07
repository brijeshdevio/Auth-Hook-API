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
const crypto_1 = require("crypto");
const models_1 = require("../models");
const utils_1 = require("../utils");
class AppService {
    constructor() { }
    sanitize(app, [key, value] = [null, null]) {
        var _a, _b;
        const _c = ((_a = app === null || app === void 0 ? void 0 : app.toJSON) === null || _a === void 0 ? void 0 : _a.call(app)) || ((_b = app === null || app === void 0 ? void 0 : app.toObject) === null || _b === void 0 ? void 0 : _b.call(app)) || app, { _id, __v, dev, apiKey } = _c, sanitizedApp = __rest(_c, ["_id", "__v", "dev", "apiKey"]);
        sanitizedApp.id = String(_id);
        if (key && value) {
            sanitizedApp[key] = value;
        }
        return sanitizedApp;
    }
    async generateAppApiKey() {
        const ts = Date.now().toString(36).toLowerCase();
        const rand = (0, crypto_1.randomBytes)(12).toString("hex").toLowerCase();
        const apiKey = "ak_live_" + ts + rand;
        const isUniqueKey = await models_1.Application.findOne({ apiKey });
        if (isUniqueKey) {
            return await this.generateAppApiKey();
        }
        return apiKey;
    }
    async checkUniqueApp(dev, name) {
        const isApp = await models_1.Application.findOne({ dev, name });
        if (isApp) {
            throw new utils_1.ApiError({
                statusCode: 409,
                code: "CONFLICT",
                message: "App already exists.",
            });
        }
        return true;
    }
    async createApp(dev, data) {
        await this.checkUniqueApp(dev, data.name);
        const apiKey = await this.generateAppApiKey();
        const newApp = await models_1.Application.create({ dev, name: data.name, apiKey });
        return this.sanitize(newApp, ["apiKey", apiKey]);
    }
    async getAppsByOwner(dev) {
        const apps = await models_1.Application.find({ dev }).select("-apiKey -dev");
        return apps === null || apps === void 0 ? void 0 : apps.map((app) => this.sanitize(app));
    }
    async getAppById(dev, appId) {
        const app = await models_1.Application.findOne({ dev, _id: appId });
        if (!app || !(app === null || app === void 0 ? void 0 : app._id)) {
            throw new utils_1.ApiError({
                statusCode: 404,
                code: "NOT_FOUND",
                message: "App not found",
            });
        }
        return this.sanitize(app);
    }
    async deleteAppById(dev, appId) {
        const isDeleted = await models_1.Application.findOneAndDelete({ dev, _id: appId });
        if (!isDeleted || !(isDeleted === null || isDeleted === void 0 ? void 0 : isDeleted._id)) {
            throw new utils_1.ApiError({
                statusCode: 404,
                code: "NOT_FOUND",
                message: "App not found",
            });
        }
        return this.sanitize(isDeleted);
    }
    async rotateAppById(dev, appId) {
        const apiKey = await this.generateAppApiKey();
        const updatedApp = await models_1.Application.findOneAndUpdate({ dev, _id: appId }, { apiKey }, { new: true });
        if (!updatedApp || !(updatedApp === null || updatedApp === void 0 ? void 0 : updatedApp._id)) {
            throw new utils_1.ApiError({
                statusCode: 404,
                code: "NOT_FOUND",
                message: "App not found",
            });
        }
        return this.sanitize(updatedApp, ["apiKey", apiKey]);
    }
    async validateApiKey(apiKey) {
        const app = await models_1.Application.findOne({ apiKey, revoked: false });
        if (!app || !(app === null || app === void 0 ? void 0 : app._id)) {
            throw new utils_1.ApiError({
                statusCode: 401,
                code: "UNAUTHORIZED",
                message: "Invalid or expires access ApiKey.",
            });
        }
        return this.sanitize(app);
    }
}
exports.default = AppService;
