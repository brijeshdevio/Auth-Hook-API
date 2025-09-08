import { Request, Response } from "express";
import { AuthService } from "../services";
import { response, signCookie } from "../utils";

class AuthController extends AuthService {
  constructor() {
    super();
  }

  handleRegister = async (req: Request, res: Response) => {
    const data = req.body;
    await this.register(data);
    response(res, 201, { message: "User created. Please verify your email." });
  };

  handleVerifyEmail = async (req: Request, res: Response) => {
    const data = req.body;
    await this.verifyEmail(data);
    response(res, 200, { message: "Email verified successfully" });
  };

  handleResendVerifyEmail = async (req: Request, res: Response) => {
    const data = req.body;
    await this.resendVerifyEmail(data);
    response(res, 200, { message: "Email sent successfully" });
  };

  handleLogin = async (req: Request, res: Response) => {
    const data = req.body;
    const user = await this.login(data);
    const accessToken = signCookie(res, user.id);
    response(res, 200, { user, accessToken });
  };
}

export default AuthController;
