import { AuthController } from "../../controllers";
import { Router } from "express";
import {
  registerSchema,
  loginSchema,
  verifyEmailSchema,
  emailSchema,
} from "../../validation/auth";
import { rateLimiterMiddleware, validateMiddleware } from "../../middlewares";

const controller = new AuthController();

const router = Router();
const rateLimitRouter = Router();
const validate = validateMiddleware;

router.post("/register", validate(registerSchema), controller.handleRegister);
rateLimitRouter.post(
  "/verify-email",
  validate(verifyEmailSchema),
  controller.handleVerifyEmail
);
rateLimitRouter.post(
  "/resend-verify-email",
  validate(emailSchema),
  controller.handleResendVerifyEmail
);
router.use(
  rateLimiterMiddleware({
    windowMs: 6 * 60 * 60 * 1000,
    limit: 10,
  }),
  rateLimitRouter
);
router.post("/login", validate(loginSchema), controller.handleLogin);

export default router;
