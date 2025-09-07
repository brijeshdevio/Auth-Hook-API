import express from "express";
import cors from "cors";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import routes from "./routes";
import { errorMiddleware, rateLimiterMiddleware } from "./middlewares";
import { ApiError } from "./utils";

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
app.use(rateLimiterMiddleware());

app.get("/", (req, res) => {
  res.json({
    message: "Welcome to the Auth-Hook API",
    version: "1.0.0",
    status: "active",
    timestamp: new Date().toISOString()
  });
});

// Health check endpoint for monitoring
app.get("/health", (req, res) => {
  res.json({
    status: "ok",
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || "development",
    uptime: process.uptime()
  });
});

app.use("/api", routes);

app.use(errorMiddleware);
export default app;
