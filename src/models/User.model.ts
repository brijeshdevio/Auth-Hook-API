import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    email: { type: String, unique: true, sparse: true },
    app: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Application",
      required: true,
    },
    passwordHash: { type: String, required: true },
    name: String,
    profileUrl: String,
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
