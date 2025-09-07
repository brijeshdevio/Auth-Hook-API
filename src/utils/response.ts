import { Response } from "express";
const response = <T>(
  res: Response,
  status: number,
  data?: T & { message?: string }
) => {
  const message = data?.message || "Success";
  if (data) {
    delete data.message;
  }

  return res.status(status).json({
    success: true,
    status,
    message,
    ...data,
  });
};

export default response;
