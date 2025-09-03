import zod from "zod";

const name = zod
  .string({
    error: "",
  })
  .min(3, { message: "Name must be at least 3 characters long" })
  .max(100, { message: "Name must be at most 100 characters long" });

const websiteUrl = zod
  .string({
    error: "",
  })
  .url({ message: "Invalid url" });

export const createSchema = zod
  .object({
    name,
    websiteUrl,
  })
  .strict();

export const updateSchema = zod
  .object({
    name: name.optional(),
    websiteUrl: websiteUrl.optional(),
  })
  .strict();
