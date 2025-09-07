import { NextFunction, Response, Request } from "express";
import jwt from "jsonwebtoken";
import { envConfig } from "../config";
import { ApiError } from "../utils";

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const authToken = req.headers?.authorization?.split(" ")[1];
  const accessToken = req.cookies?.[envConfig("COOKIE_NAME")] || authToken;

  try {
    const decoded = jwt.verify(accessToken, envConfig("JWT_ACCESS_TOKEN"));
    // req.auth = { id: (decoded as unknown as { id: string }).id };
    req.auth = { ...req.auth, id: decoded as string };
    if (!req.auth.id) {
      throw new ApiError({
        statusCode: 401,
        code: "UNAUTHORIZED",
        message: "Invalid or expires access token. Please try to log in.",
      });
    }

    next();
  } catch (error) {
    throw new ApiError({
      statusCode: 401,
      code: "UNAUTHORIZED",
      message: "You are not logged in.",
    });
  }
};

export default authMiddleware;
