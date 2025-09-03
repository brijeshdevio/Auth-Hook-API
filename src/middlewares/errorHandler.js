import { ZodError } from "zod";
import { MongooseError } from "mongoose";
import { ApiError, logger } from "../utils/index.js";

const formateZodError = (issues) => {
  return issues.map((issue) => {
    return {
      field: issue.path[0],
      message: issue.message,
    };
  });
};

const errorFormat = (res, err) => {
  res.status(err.statusCode).json({
    success: false,
    status: err.statusCode,
    error: {
      code: err.code,
      message: err.message,
      details: err.details,
    },
  });
};

const errorHandler = (err, req, res, next) => {
  if (err instanceof ApiError) {
    return errorFormat(res, err);
  } else if (err instanceof ZodError) {
    return errorFormat(res, {
      statusCode: 400,
      code: "BAD_REQUEST",
      message: "Validation Error",
      details: formateZodError(err.issues),
    });
  } else if (err instanceof MongooseError) {
    return errorFormat(res, {
      statusCode: 500,
      code: "SERVER_ERROR",
      message: "Internal Server Error",
      details: err.message,
    });
  }
  logger.error(
    `[${req.method}] ${req.path} - ${err instanceof Error ? err.stack : err}`
  );
  console.log(err);
  return errorFormat(res, {
    statusCode: 500,
    code: "SERVER_ERROR",
    message: "Internal Server Error",
    details: process.env.NODE_ENV === "development" ? err.name : undefined,
  });
};

export default errorHandler;
