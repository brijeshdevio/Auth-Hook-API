"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = __importDefault(require("./auth"));
const user_1 = __importDefault(require("./user"));
const application_1 = __importDefault(require("./application"));
const dev_1 = __importDefault(require("./dev"));
const middlewares_1 = require("../../middlewares");
const router = (0, express_1.Router)();
router.use("/auth", auth_1.default);
router.use("/dev", middlewares_1.authMiddleware, dev_1.default);
router.use("/apps", middlewares_1.authMiddleware, application_1.default);
router.use("/users", middlewares_1.apiKeyMiddleware, user_1.default);
exports.default = router;
