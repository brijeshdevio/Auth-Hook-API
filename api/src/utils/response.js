"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const response = (res, status, data) => {
    const message = (data === null || data === void 0 ? void 0 : data.message) || "Success";
    if (data) {
        delete data.message;
    }
    return res.status(status).json(Object.assign({ success: true, status,
        message }, data));
};
exports.default = response;
