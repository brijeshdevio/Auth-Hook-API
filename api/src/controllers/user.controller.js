"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const services_1 = require("../services");
const utils_1 = require("../utils");
const config_1 = require("../config");
class UserController extends services_1.UserService {
    constructor() {
        super();
        this.handleRegister = async (req, res) => {
            const { apiKey } = req.auth;
            const data = req.body;
            const user = await this.register(apiKey, data);
            (0, utils_1.response)(res, 201, {
                message: "User created. Please verify your email.",
                user,
            });
        };
        this.handleLogin = async (req, res) => {
            const { apiKey } = req.auth;
            const data = req.body;
            const user = await this.login(apiKey, data);
            user.accessToken = (0, utils_1.signCookie)(res, user.id);
            (0, utils_1.response)(res, 200, { user });
        };
        this.handleGetUser = async (req, res) => {
            const { apiKey, id } = req.auth;
            const user = await this.getById(apiKey, id);
            (0, utils_1.response)(res, 200, { user });
        };
        this.handleUpdateUser = async (req, res) => {
            const { apiKey } = req.auth;
            const { id } = req.auth;
            const data = req.body;
            const user = await this.updateById(apiKey, id, data);
            (0, utils_1.response)(res, 200, { user });
        };
        this.handleDeleteUser = async (req, res) => {
            const { apiKey } = req.auth;
            const { id } = req.auth;
            await this.deleteById(apiKey, id);
            res.clearCookie((0, config_1.envConfig)("COOKIE_NAME"));
            (0, utils_1.response)(res, 200, { message: "Account deleted successfully." });
        };
        this.handleLogoutUser = async (req, res) => {
            const { apiKey, id } = req.auth;
            res.clearCookie((0, config_1.envConfig)("COOKIE_NAME"));
            (0, utils_1.response)(res, 200, { message: "Logged out successfully." });
        };
    }
}
exports.default = UserController;
