import mongoose from "mongoose";

const applicationSchema = new mongoose.Schema(
  {
    dev: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Developer",
      required: true,
    },
    name: { type: String, required: true },
    apiKey: { type: String, unique: true, required: true },
    expiresAt: Date,
    revoked: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default mongoose.model("Application", applicationSchema);
