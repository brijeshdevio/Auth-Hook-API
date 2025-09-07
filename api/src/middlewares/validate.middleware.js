"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const utils_1 = require("../utils");
const validateMiddleware = (schema, source = "body") => async (req, res, next) => {
    const data = req[source];
    await schema.parseAsync(data);
    next();
};
const isValidId = (source = "params", key, resource) => (req, res, next) => {
    var _a;
    const ID = (_a = req === null || req === void 0 ? void 0 : req[source]) === null || _a === void 0 ? void 0 : _a[key];
    if (!mongoose_1.Types.ObjectId.isValid(ID)) {
        throw new utils_1.ApiError({
            statusCode: 400,
            code: "BAD_REQUEST",
            message: `${resource ? resource : key} ID is not valid`,
        });
    }
    next();
};
validateMiddleware.isValid = isValidId;
exports.default = validateMiddleware;
