import mongoose from "mongoose";

const customerApiKeySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Customer",
      required: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    websiteUrl: {
      type: String,
      required: true,
    },
    key: {
      type: String,
      required: true,
      unique: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("CustomerApiKey", customerApiKeySchema);
