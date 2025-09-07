"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const developerSchema = new mongoose_1.default.Schema({
    email: { type: String, unique: true, sparse: true },
    passwordHash: {
        type: String,
        required: true,
    },
    name: String,
    profileUrl: String,
}, { timestamps: true });
exports.default = mongoose_1.default.model("Developer", developerSchema);
