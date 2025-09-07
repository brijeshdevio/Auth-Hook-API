import { NextFunction, Response, Request } from "express";
import { AppService } from "../services";
import { envConfig } from "../config";

const appService = new AppService();

const apiKeyMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const apiKey = req.headers?.[envConfig("X_API_KEY")] as string;
  const { id } = await appService.validateApiKey(apiKey);
  req.auth = { ...req.auth, apiKey: id };
  next();
};

export default apiKeyMiddleware;
