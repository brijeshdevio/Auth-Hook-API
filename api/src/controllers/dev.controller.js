"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../utils");
const config_1 = require("../config");
const services_1 = require("../services");
class DevController extends services_1.DevService {
    constructor() {
        super();
        this.handleGetDev = async (req, res) => {
            const { id } = req.auth;
            const dev = await this.getById(id);
            (0, utils_1.response)(res, 200, { dev });
        };
        this.handleUpdateDev = async (req, res) => {
            const { id } = req.auth;
            const data = req.body;
            const dev = await this.updateById(id, data);
            (0, utils_1.response)(res, 200, { dev });
        };
        this.handleDeleteDev = async (req, res) => {
            const { id } = req.auth;
            await this.deleteById(id);
            res.clearCookie((0, config_1.envConfig)("COOKIE_NAME"));
            (0, utils_1.response)(res, 200, { message: "Account deleted successfully." });
        };
        this.handleLogoutDev = async (req, res) => {
            res.clearCookie((0, config_1.envConfig)("COOKIE_NAME"));
            (0, utils_1.response)(res, 200, { message: "Logged out successfully." });
        };
    }
}
exports.default = DevController;
