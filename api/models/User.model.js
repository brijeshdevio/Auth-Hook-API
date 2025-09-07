"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const userSchema = new mongoose_1.default.Schema({
    email: { type: String, unique: true, sparse: true },
    app: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "Application",
        required: true,
    },
    passwordHash: { type: String, required: true },
    name: String,
    profileUrl: String,
}, { timestamps: true });
exports.default = mongoose_1.default.model("User", userSchema);
