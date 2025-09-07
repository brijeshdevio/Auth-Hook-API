"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.envConfig = exports.connectDB = void 0;
const db_config_1 = __importDefault(require("./db.config"));
exports.connectDB = db_config_1.default;
const env_config_1 = __importDefault(require("./env.config"));
exports.envConfig = env_config_1.default;
