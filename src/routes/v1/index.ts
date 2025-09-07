import { Router } from "express";
import authRouter from "./auth";
import userRouter from "./user";
import appRouter from "./application";
import devRouter from "./dev";
import { apiKeyMiddleware, authMiddleware } from "../../middlewares";

const router = Router();

router.use("/auth", authRouter);
router.use("/dev", authMiddleware, devRouter);
router.use("/apps", authMiddleware, appRouter);
router.use("/users", apiKeyMiddleware, userRouter);

export default router;
