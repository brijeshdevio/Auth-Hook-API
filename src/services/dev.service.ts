import { Document } from "mongoose";
import { Developer } from "../models";
import { ApiError } from "../utils";

class DevService {
  private sanitize(dev: Document) {
    const { _id, passwordHash, __v, updatedAt, ...sanitizedDev } =
      dev?.toJSON?.() || dev?.toObject?.() || dev;
    sanitizedDev.id = String(_id);
    return sanitizedDev;
  }

  public async getById(_id: string) {
    const dev = await Developer.findById(_id);
    if (!dev || !dev?._id) {
      throw new ApiError({
        statusCode: 401,
        code: "UNAUTHORIZED",
        message: "You are not logged in.",
      });
    }
    return this.sanitize(dev);
  }

  public async updateById(_id: string, data: any) {
    const updatedDev = await Developer.findByIdAndUpdate({ _id }, data, {
      new: true,
    });
    if (!updatedDev || !updatedDev?._id) {
      throw new ApiError({
        statusCode: 401,
        code: "UNAUTHORIZED",
        message: "You are not logged in.",
      });
    }
    return this.sanitize(updatedDev);
  }

  public async deleteById(_id: string) {
    const isDeleted = await Developer.findByIdAndDelete(_id);
    if (!isDeleted || !isDeleted?._id) {
      throw new ApiError({
        statusCode: 401,
        code: "UNAUTHORIZED",
        message: "You are not logged in.",
      });
    }
    return this.sanitize(isDeleted);
  }
}

export default DevService;
