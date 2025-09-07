import { hash, verify } from "argon2";
import { Document } from "mongoose";
import { Developer } from "../models";
import { ApiError } from "../utils";

class AuthService {
  constructor() {}

  private sanitize(user: Document) {
    const { _id, passwordHash, __v, updatedAt, createdAt, ...sanitizedUser } =
      user?.toJSON?.() || user?.toObject?.() || user;
    sanitizedUser.id = String(_id);
    return sanitizedUser;
  }

  private async hashPassword(password: string): Promise<string> {
    return await hash(password);
  }

  private async verifyPassword(
    hashPass: string,
    password: string
  ): Promise<boolean> {
    return await verify(hashPass, password);
  }

  private async checkUniqueEmail(email: string): Promise<boolean> {
    const isUser = await Developer.findOne({ email });
    if (isUser) {
      throw new ApiError({
        statusCode: 409,
        code: "CONFLICT",
        message: "Email already exists.",
      });
    }
    return true;
  }

  public async register(data: any) {
    await this.checkUniqueEmail(data.email);

    const passwordHash = await this.hashPassword(data.password);
    delete data.password;
    const newUser = await Developer.create({
      ...data,
      passwordHash,
    });

    return this.sanitize(newUser);
  }

  public async login(data: any) {
    const findDev = await Developer.findOne({ email: data.email });
    if (!findDev || !findDev._id || !findDev?.passwordHash) {
      throw new ApiError({
        statusCode: 404,
        code: "NOT_FOUND",
        message: "Account not found.",
      });
    }

    const isVerified = await this.verifyPassword(
      findDev?.passwordHash,
      data.password
    );
    if (!isVerified) {
      throw new ApiError({
        statusCode: 401,
        code: "UNAUTHORIZED",
        message: "Invalid credentials.",
      });
    }

    return this.sanitize(findDev);
  }
}

export default AuthService;
