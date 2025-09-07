import { CookieOptions, Response } from "express";
import jwt from "jsonwebtoken";
import { envConfig } from "../config";

const oneDay = 1000 * 60 * 60 * 24;

const signCookie = (
  res: Response,
  secret: string,
  options: CookieOptions = {}
) => {
  const token = jwt.sign(secret, envConfig("JWT_ACCESS_TOKEN"));

  const httpOptions: CookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "none",
    ...options,
  };

  res.cookie(envConfig("COOKIE_NAME"), token, httpOptions);
  return token;
};

export default signCookie;
