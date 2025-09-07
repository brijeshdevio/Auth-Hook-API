"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const services_1 = require("../services");
const config_1 = require("../config");
const appService = new services_1.AppService();
const apiKeyMiddleware = async (req, res, next) => {
    var _a;
    const apiKey = (_a = req.headers) === null || _a === void 0 ? void 0 : _a[(0, config_1.envConfig)("X_API_KEY")];
    const { id } = await appService.validateApiKey(apiKey);
    req.auth = Object.assign(Object.assign({}, req.auth), { apiKey: id });
    next();
};
exports.default = apiKeyMiddleware;
