import { Types } from "mongoose";
import { ApiError } from "../utils/index.js";

const validateRequest =
  (schema, source = "body") =>
  async (req, res, next) => {
    const data = req[source];
    await schema.parseAsync(data);
    next();
  };

const isValidId =
  (source = "params", key, resource) =>
  (req, res, next) => {
    const ID = req?.[source]?.[key];
    if (!Types.ObjectId.isValid(ID)) {
      throw new ApiError({
        statusCode: 400,
        code: "BAD_REQUEST",
        message: `${resource} id is not valid`,
      });
    }
    next();
  };

validateRequest.isValid = isValidId;

export default validateRequest;
