"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = exports.DevController = exports.AuthController = exports.AppController = void 0;
const app_controller_1 = __importDefault(require("./app.controller"));
exports.AppController = app_controller_1.default;
const auth_controller_1 = __importDefault(require("./auth.controller"));
exports.AuthController = auth_controller_1.default;
const dev_controller_1 = __importDefault(require("./dev.controller"));
exports.DevController = dev_controller_1.default;
const user_controller_1 = __importDefault(require("./user.controller"));
exports.UserController = user_controller_1.default;
