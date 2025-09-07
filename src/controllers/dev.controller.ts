import { Request, Response } from "express";
import { response } from "../utils";
import { envConfig } from "../config";
import { DevService } from "../services";

class DevController extends DevService {
  constructor() {
    super();
  }

  handleGetDev = async (req: Request, res: Response) => {
    const { id } = req.auth;
    const dev = await this.getById(id);
    response(res, 200, { dev });
  };

  handleUpdateDev = async (req: Request, res: Response) => {
    const { id } = req.auth;
    const data = req.body;
    const dev = await this.updateById(id, data);
    response(res, 200, { dev });
  };

  handleDeleteDev = async (req: Request, res: Response) => {
    const { id } = req.auth;
    await this.deleteById(id);
    res.clearCookie(envConfig("COOKIE_NAME"));
    response(res, 200, { message: "Account deleted successfully." });
  };

  handleLogoutDev = async (req: Request, res: Response) => {
    res.clearCookie(envConfig("COOKIE_NAME"));
    response(res, 200, { message: "Logged out successfully." });
  };
}

export default DevController;
