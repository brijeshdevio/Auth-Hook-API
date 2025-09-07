import app from "./app";
import { connectDB, envConfig } from "./config";

// Initialize database connection for Vercel
connectDB();

// For local development
const PORT = envConfig("PORT") || 3000;
if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.warn(`Server is listening on port ${PORT}`);
  });
}

// ======== EXPORT FOR VERCEL ========
export default app;
