import zod from "zod";

const name = zod
  .string({
    error: "",
  })
  .min(3, { message: "Name must be at least 3 characters long" })
  .max(50, { message: "Name must be at most 50 characters long" });

const email = zod
  .string({
    error: "",
  })
  .email({ message: "Invalid email" });

const password = zod
  .string({
    error: "",
  })
  .min(6, { message: "Password must be at least 6 characters long" })
  .max(50, { message: "Password must be at most 50 characters long" });

export const registerSchema = zod
  .object({
    name,
    email,
    password,
  })
  .strict();

export const loginSchema = zod
  .object({
    email,
    password,
  })
  .strict();

export const updateSchema = zod
  .object({
    name: name.optional(),
  })
  .strict();

export const verifyEmailSchema = zod
  .object({
    email,
    code: zod
      .string({ error: "Code is required" })
      .length(8, { message: "Code must be 8 characters long" }),
  })
  .strict();

export const emailSchema = zod
  .object({
    email,
  })
  .strict();
