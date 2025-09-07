import { UserController } from "../../controllers";
import { Router } from "express";
import { authMiddleware, validateMiddleware } from "../../middlewares";
import {
  registerSchema,
  loginSchema,
  updateSchema,
} from "../../validation/auth";
const controller = new UserController();

const router = Router();

const authRouter = Router();

const validate = validateMiddleware;

authRouter.get("/me", controller.handleGetUser);
authRouter.patch("/me", validate(updateSchema), controller.handleUpdateUser);
authRouter.post("/logout", controller.handleLogoutUser);
authRouter.delete("/delete", controller.handleDeleteUser);

router.post("/register", validate(registerSchema), controller.handleRegister);
router.post("/login", validate(loginSchema), controller.handleLogin);

router.use(authMiddleware, authRouter);

export default router;
