import app from "./src/app";
import { connectDB, envConfig } from "./src/config";

// Initialize database connection for Vercel
connectDB();

// For local development
if (process.env.NODE_ENV !== 'production') {
  const PORT = envConfig("PORT") || 3000;
  app.listen(PORT, () => {
    console.warn(`Server is listening port ${PORT}`);
  });
}

// Export for Vercel
export default app;
