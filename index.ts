import app from "./src/app";
import { connectDB, envConfig } from "./src/config";

const PORT = envConfig("PORT") || 3000;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.warn(`Server is listening port ${PORT}`);
  });
});
