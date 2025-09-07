import mongoose from "mongoose";
import envConfig from "./env.config";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(envConfig("MONGO_URI"));
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

export default connectDB;

