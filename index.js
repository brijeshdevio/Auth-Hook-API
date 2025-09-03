import "dotenv/config";
import app from "./src/app.js";
import { connectDB } from "./src/config/index.js";

const PORT = process.env.PORT || 3000;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});
