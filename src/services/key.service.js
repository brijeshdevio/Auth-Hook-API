import { CustomerApiKey as Key } from "../models/index.js";
import crypto from "node:crypto";
import { ApiError } from "../utils/index.js";

class KeyService {
  sanitize(key) {
    const { _id, __v, createdAt, ...sanitizedKey } = key?.toJSON?.() || key;
    sanitizedKey.id = _id;
    return sanitizedKey;
  }

  async checkIsName(customer, name) {
    const key = await Key.findOne({ customer, name });
    if (key) {
      throw new ApiError({
        statusCode: 409,
        code: "CONFLICT",
        message: "Key name already exists",
      });
    }
  }

  async generateKey() {
    const ts = Date.now().toString(36).toLowerCase();
    const rand = crypto.randomBytes(12).toString("hex").toLowerCase();
    const key = "sk_live_" + ts + rand;
    const uniqueKey = await Key.findOne({ key });
    if (uniqueKey) {
      return this.generateKey();
    }
    return key;
  }

  async createKey(customer, data) {
    data.customer = customer;
    await this.checkIsName(customer, data.name);

    data.key = await this.generateKey();
    const key = await Key.create(data);
    return this.getKeyById(customer, key._id);
  }

  async getKeysByCustomer(customer) {
    const keys = await Key.find({ customer })
      .select("-customer")
      .sort({ createdAt: -1 });
    return keys.map(this.sanitize);
  }

  async getKeyById(customer, id) {
    const key = await Key.findOne({ customer, _id: id }).select("-customer");
    if (!key) {
      throw new ApiError({
        statusCode: 404,
        code: "NOT_FOUND",
        message: "Key not found",
      });
    }
    return this.sanitize(key);
  }

  async updateKeyById(customer, id, data) {
    if (data.name) {
      await this.checkIsName(customer, data.name);
    }
    const key = await Key.findOneAndUpdate({ customer, _id: id }, data, {
      new: true,
    }).select("-customer");
    if (!key) {
      throw new ApiError({
        statusCode: 404,
        code: "NOT_FOUND",
        message: "Key not found",
      });
    }

    return this.sanitize(key);
  }

  async deleteKeyById(customer, id) {
    const key = await Key.findOneAndDelete({ customer, _id: id });
    if (!key) {
      throw new ApiError({
        statusCode: 404,
        code: "NOT_FOUND",
        message: "Key not found",
      });
    }
    return this.sanitize(key);
  }

  async checkKey(key) {
    const validKey = await Key.findOne({ key, isActive: true }).select(
      "customer"
    );
    if (!validKey) {
      throw new ApiError({
        statusCode: 403,
        code: "FORBIDDEN",
        message: "Invalid key",
      });
    }
    return this.sanitize(validKey);
  }
}

export default KeyService;
