import { Document } from "mongoose";
import { randomBytes } from "crypto";
import { Application } from "../models";
import { ApiError } from "../utils";

class AppService {
  constructor() {}

  private sanitize(
    app: Document,
    [key, value]: [string | null, string | null] = [null, null]
  ) {
    const { _id, __v, dev, apiKey, ...sanitizedApp } =
      app?.toJSON?.() || app?.toObject?.() || app;
    sanitizedApp.id = String(_id);

    if (key && value) {
      sanitizedApp[key] = value;
    }

    return sanitizedApp;
  }

  private async generateAppApiKey(): Promise<string> {
    const ts = Date.now().toString(36).toLowerCase();
    const rand = randomBytes(12).toString("hex").toLowerCase();
    const apiKey = "ak_live_" + ts + rand;
    const isUniqueKey = await Application.findOne({ apiKey });
    if (isUniqueKey) {
      return await this.generateAppApiKey();
    }
    return apiKey;
  }

  private async checkUniqueApp(dev: string, name: string) {
    const isApp = await Application.findOne({ dev, name });
    if (isApp) {
      throw new ApiError({
        statusCode: 409,
        code: "CONFLICT",
        message: "App already exists.",
      });
    }
    return true;
  }

  public async createApp(dev: string, data: any) {
    await this.checkUniqueApp(dev, data.name);

    const apiKey = await this.generateAppApiKey();
    const newApp = await Application.create({ dev, name: data.name, apiKey });
    return this.sanitize(newApp, ["apiKey", apiKey]);
  }

  public async getAppsByOwner(dev: string) {
    const apps = await Application.find({ dev }).select("-apiKey -dev");
    return apps?.map((app) => this.sanitize(app));
  }

  public async getAppById(dev: string, appId: string) {
    const app = await Application.findOne({ dev, _id: appId });
    if (!app || !app?._id) {
      throw new ApiError({
        statusCode: 404,
        code: "NOT_FOUND",
        message: "App not found",
      });
    }

    return this.sanitize(app);
  }

  public async deleteAppById(dev: string, appId: string) {
    const isDeleted = await Application.findOneAndDelete({ dev, _id: appId });
    if (!isDeleted || !isDeleted?._id) {
      throw new ApiError({
        statusCode: 404,
        code: "NOT_FOUND",
        message: "App not found",
      });
    }

    return this.sanitize(isDeleted);
  }

  public async rotateAppById(dev: string, appId: string) {
    const apiKey = await this.generateAppApiKey();
    const updatedApp = await Application.findOneAndUpdate(
      { dev, _id: appId },
      { apiKey },
      { new: true }
    );
    if (!updatedApp || !updatedApp?._id) {
      throw new ApiError({
        statusCode: 404,
        code: "NOT_FOUND",
        message: "App not found",
      });
    }

    return this.sanitize(updatedApp, ["apiKey", apiKey]);
  }

  public async validateApiKey(apiKey: string) {
    const app = await Application.findOne({ apiKey, revoked: false });
    if (!app || !app?._id) {
      throw new ApiError({
        statusCode: 401,
        code: "UNAUTHORIZED",
        message: "Invalid or expires access ApiKey.",
      });
    }

    return this.sanitize(app);
  }
}

export default AppService;
