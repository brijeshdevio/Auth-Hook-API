import express from "express";
import cors from "cors";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import routes from "./routes/index.js";
import { errorHandler, rateLimiter } from "./middlewares/index.js";
import { ApiError } from "./utils/index.js";

const app = express();

const ALLOWED_ORIGINS = (process.env.CORS_ORIGINS || "")
  .split(",")
  .map((o) => o.trim());

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || ALLOWED_ORIGINS.includes(origin)) {
        callback(null, true);
      } else {
        callback(
          new ApiError({
            statusCode: 403,
            code: "FORBIDDEN",
            message: "Forbidden by CORS policy",
          })
        );
      }
    },
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
