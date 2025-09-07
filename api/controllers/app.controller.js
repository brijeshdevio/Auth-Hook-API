"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../utils");
const services_1 = require("../services");
class AppController extends services_1.AppService {
    constructor() {
        super();
        this.handleCreateApp = async (req, res) => {
            const { id } = req.auth;
            const data = req.body;
            const app = await this.createApp(id, data);
            (0, utils_1.response)(res, 201, { app });
        };
        this.handleGetApps = async (req, res) => {
            const { id } = req.auth;
            const apps = await this.getAppsByOwner(id);
            (0, utils_1.response)(res, 200, { apps });
        };
        this.handleGetApp = async (req, res) => {
            const { id } = req.auth;
            const { appId } = req.params;
            const app = await this.getAppById(id, appId);
            (0, utils_1.response)(res, 200, { app });
        };
        this.handleDeleteApp = async (req, res) => {
            const { id } = req.auth;
            const { appId } = req.params;
            await this.deleteAppById(id, appId);
            (0, utils_1.response)(res, 200, { message: "Application deleted successfully." });
        };
        this.handleRotateApp = async (req, res) => {
            const { id } = req.auth;
            const { appId } = req.params;
            const app = await this.rotateAppById(id, appId);
            (0, utils_1.response)(res, 200, { app });
        };
    }
}
exports.default = AppController;
