import { Types } from "mongoose";
import { ApiError } from "../utils";
import { Schema } from "zod";
import { NextFunction, Response, Request } from "express";

type Source = "body" | "params" | "query";
const validateMiddleware =
  (schema: Schema, source: Source = "body") =>
  async (req: Request, res: Response, next: NextFunction) => {
    const data = req[source];
    await schema.parseAsync(data);
    next();
  };

const isValidId =
  (source: Source = "params", key: string, resource?: string) =>
  (req: Request, res: Response, next: NextFunction) => {
    const ID = req?.[source]?.[key];
    if (!Types.ObjectId.isValid(ID)) {
      throw new ApiError({
        statusCode: 400,
        code: "BAD_REQUEST",
        message: `${resource ? resource : key} ID is not valid`,
      });
    }
    next();
  };

validateMiddleware.isValid = isValidId;

export default validateMiddleware;
