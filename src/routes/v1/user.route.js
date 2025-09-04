import { Router } from "express";
import { UserController } from "../../controllers/index.js";
import { authGuard, validateRequest } from "../../middlewares/index.js";
import {
  createSchema,
  loginSchema,
  updateSchema,
} from "../../validation/user.js";

const userController = new UserController();

const router = Router();
const valid = validateRequest;

router.post("/signup", valid(createSchema), userController.handleSignup);
router.post("/login", valid(loginSchema), userController.handleLogin);
router.get("/me", authGuard, userController.handleGetUser);
router.patch(
  "/me",
  authGuard,
  valid(updateSchema),
  userController.handleUpdateUser
);
router.delete("/me", authGuard, userController.handleDeleteUser);
router.post("/logout", authGuard, userController.handleLogoutUser);

export default router;
