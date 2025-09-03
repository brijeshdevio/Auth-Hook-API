import jwt from "jsonwebtoken";
import { ApiError } from "../utils/index.js";

const authGuard = (req, res, next) => {
  const authHeader = req.headers?.authorization?.split(" ")[1];
  const token = req.cookies?.[process.env.COOKIE_NAME] || authHeader;
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.auth = { ...req.auth, ...decoded };
    if (!req.auth.id) {
      throw new ApiError({
        statusCode: 401,
        code: "UNAUTHORIZED",
        message: "Invalid or expired token.",
        details: null,
      });
    }
    next();
  } catch (error) {
    throw new ApiError({
      statusCode: 401,
      code: "UNAUTHORIZED",
      message: "You are not logged in.",
      details: null,
    });
  }
};

export default authGuard;
