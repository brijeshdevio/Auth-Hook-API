import { ApiError } from "../utils/index.js";
import { KeyService } from "../services/index.js";

const keyService = new KeyService();

const keyGuard = async (req, res, next) => {
  const keyToken = req.headers?.[process.env.X_API_KEY];

  const { customer } = await keyService.checkKey(keyToken);

  req.auth = { customer };

  if (!req.auth.customer) {
    throw new ApiError({
      statusCode: 403,
      code: "FORBIDDEN",
      message: "Invalid key",
      details: null,
    });
  }
  next();
};

export default keyGuard;
