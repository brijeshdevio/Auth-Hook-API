import jwt from "jsonwebtoken";

const oneDay = 1000 * 60 * 60 * 24;

const signCookie = (res, secret, options = {}) => {
  const token = jwt.sign(secret, process.env.JWT_SECRET, {
    expiresIn: parseInt(process.env.JWT_EXPIRES_IN) * oneDay || oneDay * 7,
  });

  const httpOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    expiresIn: parseInt(process.env.JWT_EXPIRES_IN) * oneDay || oneDay * 7,
    ...options,
  };

  res.cookie(process.env.COOKIE_NAME, token, httpOptions);
  return token;
};

export default signCookie;
