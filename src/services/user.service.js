import argon2 from "argon2";
import { User } from "../models/index.js";
import { ApiError } from "../utils/index.js";

class UserService {
  sanitize(user) {
    const { _id, customer, password, __v, updatedAt, ...sanitizedUser } =
      user?.toJSON?.() || user;
    sanitizedUser.id = _id;
    return sanitizedUser;
  }

  async checkIsUser(customer, email) {
    const user = await User.findOne({ customer, email });
    if (user) {
      throw new ApiError({
        statusCode: 409,
        code: "CONFLICT",
        message: "User already exists",
      });
    }
  }

  async hashedPassword(password) {
    return await argon2.hash(password);
  }

  async verifyPassword(hash, password) {
    return await argon2.verify(hash, password);
  }

  async createUser(customer, data) {
    await this.checkIsUser(customer, data.email);
    data.customer = customer;
    data.password = await this.hashedPassword(data.password);
    const user = await User.create(data);
    return this.sanitize(user);
  }

  async loginUser(customer, data) {
    const user = await User.findOne({ customer, email: data.email }).select(
      "-customer"
    );
    if (!user) {
      throw new ApiError({
        statusCode: 404,
        code: "NOT_FOUND",
        message: "User not found",
      });
    }

    const isValid = await this.verifyPassword(user.password, data.password);
    if (!isValid) {
      throw new ApiError({
        statusCode: 401,
        code: "UNAUTHORIZED",
        message: "Invalid credentials",
      });
    }
    return this.sanitize(user);
  }

  async getUser(customer, id) {
    const user = await User.findOne({ customer, _id: id }).select("-customer");
    if (!user) {
      throw new ApiError({
        statusCode: 404,
        code: "NOT_FOUND",
        message: "User not found",
      });
    }
    return this.sanitize(user);
  }

  async updateUser(customer, id, data) {
    const user = await User.findOneAndUpdate({ customer, _id: id }, data, {
      new: true,
    }).select("-customer");
    if (!user) {
      throw new ApiError({
        statusCode: 404,
        code: "NOT_FOUND",
        message: "User not found",
      });
    }
    return this.sanitize(user);
  }

  async deleteUser(customer, id) {
    const user = await User.findOneAndDelete({ customer, _id: id });
    if (!user) {
      throw new ApiError({
        statusCode: 404,
        code: "NOT_FOUND",
        message: "User not found",
      });
    }
    return this.sanitize(user);
  }
}

export default UserService;
