"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const services_1 = require("../services");
const utils_1 = require("../utils");
class AuthController extends services_1.AuthService {
    constructor() {
        super();
        this.handleRegister = async (req, res) => {
            const data = req.body;
            const user = await this.register(data);
            (0, utils_1.response)(res, 201, { user });
        };
        this.handleLogin = async (req, res) => {
            const data = req.body;
            const user = await this.login(data);
            const accessToken = (0, utils_1.signCookie)(res, user.id);
            (0, utils_1.response)(res, 200, { user, accessToken });
        };
    }
}
exports.default = AuthController;
