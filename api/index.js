"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const config_1 = require("./config");
// Initialize database connection for Vercel
(0, config_1.connectDB)();
// For local development
const PORT = (0, config_1.envConfig)("PORT") || 3000;
if (process.env.NODE_ENV !== 'production') {
    app_1.default.listen(PORT, () => {
        console.warn(`Server is listening on port ${PORT}`);
    });
}
// ======== EXPORT FOR VERCEL ========
exports.default = app_1.default;
