import { AuthController } from "../../controllers";
import { Router } from "express";
import { registerSchema, loginSchema } from "../../validation/auth";
import { validateMiddleware } from "../../middlewares";

const controller = new AuthController();

const router = Router();

const validate = validateMiddleware;
router.post("/register", validate(registerSchema), controller.handleRegister);
router.post("/login", validate(loginSchema), controller.handleLogin);

export default router;
