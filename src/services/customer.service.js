import argon2 from "argon2";
import { Customer } from "../models/index.js";
import { ApiError } from "../utils/index.js";

class CustomerService {
  sanitize(customer) {
    const { _id, password, __v, updatedAt, createdAt, ...sanitizedCustomer } =
      customer?.toJSON?.() || customer;
    sanitizedCustomer.id = _id;
    return sanitizedCustomer;
  }

  async checkIsCustomer(email) {
    const customer = await Customer.findOne({ email });
    if (customer) {
      throw new ApiError({
        statusCode: 409,
        code: "CONFLICT",
        message: "Customer already exists",
      });
    }
  }

  async hashedPassword(password) {
    return await argon2.hash(password);
  }

  async verifyPassword(hash, password) {
    return await argon2.verify(hash, password);
  }

  async createCustomer(data) {
    await this.checkIsCustomer(data.email);

    data.password = await this.hashedPassword(data.password);
    const customer = await Customer.create(data);
    return this.sanitize(customer);
  }

  async loginCustomer(data) {
    const customer = await Customer.findOne({ email: data.email });
    if (!customer) {
      throw new ApiError({
        statusCode: 404,
        code: "NOT_FOUND",
        message: "Customer not found",
      });
    }

    const isValid = await this.verifyPassword(customer.password, data.password);
    if (!isValid) {
      throw new ApiError({
        statusCode: 401,
        code: "UNAUTHORIZED",
        message: "Invalid credentials",
      });
    }
    return this.sanitize(customer);
  }

  async getCustomer(id) {
    const customer = await Customer.findById(id);
    if (!customer) {
      throw new ApiError({
        statusCode: 404,
        code: "NOT_FOUND",
        message: "Customer not found",
      });
    }
    return this.sanitize(customer);
  }
}

export default CustomerService;
