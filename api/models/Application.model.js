"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const applicationSchema = new mongoose_1.default.Schema({
    dev: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "Developer",
        required: true,
    },
    name: { type: String, required: true },
    apiKey: { type: String, unique: true, required: true },
    expiresAt: Date,
    revoked: { type: Boolean, default: false },
}, { timestamps: true });
exports.default = mongoose_1.default.model("Application", applicationSchema);
