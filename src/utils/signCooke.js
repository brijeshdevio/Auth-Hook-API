import jwt from "jsonwebtoken";

const signCookie = (res, secret, options = {}) => {
  const token = jwt.sign(secret, process.env.JWT_SECRET, { expiresIn: "1d" });

  const httpOptions = {
    httpOnly: true,
    sameSite: "none",
    secure: process.env.NODE_ENV === "production",
    ...options,
  };

  res.cookie(process.env.COOKIE_NAME, token, httpOptions);
  return token;
};

export default signCookie;
