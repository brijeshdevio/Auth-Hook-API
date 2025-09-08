import mongoose from "mongoose";

const developerSchema = new mongoose.Schema(
  {
    email: { type: String, unique: true, sparse: true },
    passwordHash: {
      type: String,
      required: true,
    },
    name: String,
    profileUrl: String,
    verified: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default mongoose.model("Developer", developerSchema);
