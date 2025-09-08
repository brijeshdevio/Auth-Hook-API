import { hash, verify } from "argon2";
import { Document } from "mongoose";
import { Developer, Temporary } from "../models";
import { ApiError } from "../utils";
import { verificationEmail } from "../email-templates";

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

  private generateVerificationCode(length = 8) {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let code = "";
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * chars.length);
      code += chars[randomIndex];
    }
    return code;
  }

  private async checkUniqueEmail(email: string): Promise<boolean> {
    const isUser = await Temporary.findOne({ email });
    if (isUser) {
      throw new ApiError({
        statusCode: 409,
        code: "CONFLICT",
        message: "Email already exists.",
      });
    }
    return true;
  }

  private async checkVerifiedEmail(email: string): Promise<boolean> {
    const isUser = await Temporary.findOne({ email, verified: true });
    if (isUser) {
      throw new ApiError({
        statusCode: 409,
        code: "CONFLICT",
        message: "Email already verified.",
      });
    }
    return true;
  }

  public async register(data: any) {
    await this.checkUniqueEmail(data.email);

    const code = this.generateVerificationCode();
    await verificationEmail(data.name, data.email, code);

    const passwordHash = await this.hashPassword(data.password);
    delete data.password;
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000);
    const newUser = await Temporary.create({
      ...data,
      passwordHash,
      code,
      expiresAt,
    });

    return this.sanitize(newUser);
  }

  public async verifyEmail(data: any) {
    await this.checkVerifiedEmail(data.email);

    const findDev = await Temporary.findOne({
      email: data.email,
      code: data.code,
      verified: false,
      expiresAt: { $gt: new Date() },
    });
    if (!findDev || !findDev._id || findDev.code !== data.code) {
      throw new ApiError({
        statusCode: 404,
        code: "NOT_FOUND",
        message: "Invalid or expired code.",
      });
    }
    findDev.verified = true;
    await findDev.save();
    const { name, email, passwordHash } = findDev;
    const newDev = await Developer.create({
      name,
      email,
      passwordHash,
      verified: true,
    });
    return this.sanitize(newDev);
  }

  public async resendVerifyEmail(data: any) {
    await this.checkVerifiedEmail(data.email);

    const findDev = await Temporary.findOne({ email: data.email });
    if (!findDev || !findDev._id) {
      throw new ApiError({
        statusCode: 404,
        code: "NOT_FOUND",
        message: "Account not found.",
      });
    }
    const code = this.generateVerificationCode();
    await verificationEmail(findDev.name, data.email, code);
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000);
    findDev.code = code;
    findDev.expiresAt = expiresAt;
    await findDev.save();
    return this.sanitize(findDev);
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
