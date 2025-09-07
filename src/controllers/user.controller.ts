import { Request, Response } from "express";
import { UserService } from "../services";
import { response, signCookie } from "../utils";
import { envConfig } from "../config";

class UserController extends UserService {
  constructor() {
    super();
  }

  handleRegister = async (req: Request, res: Response) => {
    const { apiKey } = req.auth;
    const data = req.body;
    const user = await this.register(apiKey, data);
    response(res, 201, {
      message: "User created. Please verify your email.",
      user,
    });
  };

  handleLogin = async (req: Request, res: Response) => {
    const { apiKey } = req.auth;
    const data = req.body;
    const user = await this.login(apiKey, data);
    user.accessToken = signCookie(res, user.id);
    response(res, 200, { user });
  };

  handleGetUser = async (req: Request, res: Response) => {
    const { apiKey, id } = req.auth;
    const user = await this.getById(apiKey, id);
    response(res, 200, { user });
  };

  handleUpdateUser = async (req: Request, res: Response) => {
    const { apiKey } = req.auth;
    const { id } = req.auth;
    const data = req.body;
    const user = await this.updateById(apiKey, id, data);
    response(res, 200, { user });
  };

  handleDeleteUser = async (req: Request, res: Response) => {
    const { apiKey } = req.auth;
    const { id } = req.auth;
    await this.deleteById(apiKey, id);
    res.clearCookie(envConfig("COOKIE_NAME"));
    response(res, 200, { message: "Account deleted successfully." });
  };

  handleLogoutUser = async (req: Request, res: Response) => {
    const { apiKey, id } = req.auth;
    res.clearCookie(envConfig("COOKIE_NAME"));
    response(res, 200, { message: "Logged out successfully." });
  };
}

export default UserController;
