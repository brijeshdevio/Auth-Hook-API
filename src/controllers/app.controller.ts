import { Request, Response } from "express";
import { response } from "../utils";
import { AppService } from "../services";

class AppController extends AppService {
  constructor() {
    super();
  }

  handleCreateApp = async (req: Request, res: Response) => {
    const { id } = req.auth;
    const data = req.body;
    const app = await this.createApp(id, data);
    response(res, 201, { app });
  };

  handleGetApps = async (req: Request, res: Response) => {
    const { id } = req.auth;
    const apps = await this.getAppsByOwner(id);
    response(res, 200, { apps });
  };

  handleGetApp = async (req: Request, res: Response) => {
    const { id } = req.auth;
    const { appId } = req.params;
    const app = await this.getAppById(id, appId);
    response(res, 200, { app });
  };

  handleDeleteApp = async (req: Request, res: Response) => {
    const { id } = req.auth;
    const { appId } = req.params;
    await this.deleteAppById(id, appId);
    response(res, 200, { message: "Application deleted successfully." });
  };

  handleRotateApp = async (req: Request, res: Response) => {
    const { id } = req.auth;
    const { appId } = req.params;
    const app = await this.rotateAppById(id, appId);
    response(res, 200, { app });
  };
}

export default AppController;
