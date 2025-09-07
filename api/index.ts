import app from "../src/app";
import { connectDB } from "../src/config";

// Initialize database connection
connectDB();

// Export the Express app for Vercel
export default app;
