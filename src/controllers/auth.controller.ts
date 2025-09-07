import { Request, Response } from "express";
import { AuthService } from "../services";
import { response, signCookie } from "../utils";

class AuthController extends AuthService {
  constructor() {
    super();
  }

  handleRegister = async (req: Request, res: Response) => {
    const data = req.body;
    const user = await this.register(data);
    response(res, 201, { user });
  };

  handleLogin = async (req: Request, res: Response) => {
    const data = req.body;
    const user = await this.login(data);
    const accessToken = signCookie(res, user.id);
    response(res, 200, { user, accessToken });
  };
}

export default AuthController;
