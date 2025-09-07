"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateSchema = exports.loginSchema = exports.registerSchema = void 0;
const zod_1 = __importDefault(require("zod"));
const name = zod_1.default
    .string({
    error: "",
})
    .min(3, { message: "Name must be at least 3 characters long" })
    .max(50, { message: "Name must be at most 50 characters long" });
const email = zod_1.default
    .string({
    error: "",
})
    .email({ message: "Invalid email" });
const password = zod_1.default
    .string({
    error: "",
})
    .min(6, { message: "Password must be at least 6 characters long" })
    .max(50, { message: "Password must be at most 50 characters long" });
exports.registerSchema = zod_1.default
    .object({
    name,
    email,
    password,
})
    .strict();
exports.loginSchema = zod_1.default
    .object({
    email,
    password,
})
    .strict();
exports.updateSchema = zod_1.default
    .object({
    name: name.optional(),
})
    .strict();
