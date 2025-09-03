import express from "express";
import cors from "cors";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import routes from "./routes/index.js";
import { errorHandler, rateLimiter } from "./middlewares/index.js";

const app = express();

app.use(
  cors({
    credentials: true,
  })
);
app.use(helmet());
app.use(cookieParser());
app.use(morgan("dev"));
app.use(express.json());
app.use(rateLimiter());

app.get("/", (req, res) => {
  res.send("Welcome to the Auth-Hook API");
});

app.use("/api", routes);

app.use(errorHandler);

export default app;
