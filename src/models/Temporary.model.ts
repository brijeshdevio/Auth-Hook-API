import mongoose from "mongoose";

const tempSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    passwordHash: { type: String, required: true },
    code: { type: String, required: true },
    verified: { type: Boolean, default: false },
    expiresAt: Date,
  },
  { timestamps: true }
);

export default mongoose.model("Temporary", tempSchema);
