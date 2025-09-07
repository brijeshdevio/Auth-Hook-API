import { Document } from "mongoose";
import { User } from "../models";
import { ApiError } from "../utils";
import { hash, verify } from "argon2";

class UserService {
  private sanitize(user: Document) {
    const { _id, passwordHash, __v, app, updatedAt, ...sanitizedUser } =
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

  private async checkUniqueEmail(app: string, email: string): Promise<boolean> {
    const isUser = await User.findOne({ email, app });
    if (isUser) {
      throw new ApiError({
        statusCode: 409,
        code: "CONFLICT",
        message: "Email already exists.",
      });
    }
    return true;
  }

  public async register(app: string, data: any) {
    await this.checkUniqueEmail(app, data.email);

    const passwordHash = await this.hashPassword(data.password);
    delete data.password;
    const newUser = await User.create({
      ...data,
      passwordHash,
      app,
    });

    return this.sanitize(newUser);
  }

  public async login(app: string, data: any) {
    const findUser = await User.findOne({ app, email: data.email });
    if (!findUser || !findUser._id || !findUser?.passwordHash) {
      throw new ApiError({
        statusCode: 404,
        code: "NOT_FOUND",
        message: "Account not found.",
      });
    }

    const isVerified = await this.verifyPassword(
      findUser?.passwordHash,
      data.password
    );
    if (!isVerified) {
      throw new ApiError({
        statusCode: 401,
        code: "UNAUTHORIZED",
        message: "Invalid credentials.",
      });
    }

    return this.sanitize(findUser);
  }

  public async getById(app: string, userId: string) {
    const user = await User.findOne({ app, _id: userId });
    if (!user || !user?._id) {
      throw new ApiError({
        statusCode: 401,
        code: "UNAUTHORIZED",
        message: "You are not logged in.",
      });
    }
    return this.sanitize(user);
  }

  public async updateById(app: string, _id: string, data: any) {
    const updatedUser = await User.findOneAndUpdate({ app, _id }, data, {
      new: true,
    });
    if (!updatedUser || !updatedUser?._id) {
      throw new ApiError({
        statusCode: 401,
        code: "UNAUTHORIZED",
        message: "You are not logged in.",
      });
    }
    return this.sanitize(updatedUser);
  }

  public async deleteById(app: string, _id: string) {
    const isDeleted = await User.findOneAndDelete({ app, _id });
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

export default UserService;
